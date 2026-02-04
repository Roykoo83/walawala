'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getPosts() {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
      *,
      profiles (
        nickname,
        avatar_url,
        nationality,
        visa_type
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    return posts
}

export async function getPostsWithCounts(userId?: string, page: number = 0, limit: number = 10) {
    const supabase = await createClient()

    const from = page * limit
    const to = from + limit - 1

    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
      *,
      profiles (
        nickname,
        avatar_url,
        nationality,
        visa_type
      )
    `)
        .order('created_at', { ascending: false })
        .range(from, to)

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    // Fetch likes, comments counts, and is_liked status
    const postsWithCounts = await Promise.all(
        (posts || []).map(async (post) => {
            const queries: any[] = [
                supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
                supabase.from('comments').select('*', { count: 'exact', head: true }).eq('post_id', post.id)
            ]

            if (userId) {
                queries.push(
                    supabase.from('likes').select('id').eq('post_id', post.id).eq('user_id', userId).single()
                )
            }

            const results = await Promise.all(queries)
            const likesCount = results[0].count || 0
            const commentsCount = results[1].count || 0
            const isLiked = userId ? !!results[2].data : false

            return {
                ...post,
                likes_count: likesCount,
                comments_count: commentsCount,
                is_liked: isLiked
            }
        })
    )

    return postsWithCounts
}

export async function createPost(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    if (!title || !content || !category) {
        return { error: 'All fields are required' }
    }

    const { error } = await supabase.from('posts').insert({
        author_id: user.id,
        title,
        content,
        category,
        images: [] // Image upload to be handled separately or added later
    })

    if (error) {
        console.error('Error creating post:', error)
        return { error: 'Failed to create post' }
    }

    revalidatePath('/community')
    redirect('/community')
}

export async function toggleLike(postId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // Check if like exists
    const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

    if (existingLike) {
        // Unlike
        await supabase.from('likes').delete().eq('id', existingLike.id)
    } else {
        // Like
        await supabase.from('likes').insert({
            post_id: postId,
            user_id: user.id
        })
    }

    revalidatePath('/community')
    revalidatePath(`/community/${postId}`)
    return { success: true }
}

export async function searchPosts(query: string, userId?: string) {
    const supabase = await createClient()

    if (!query.trim()) {
        return getPostsWithCounts(userId)
    }

    const searchTerm = `%${query.trim()}%`

    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles (
                nickname,
                avatar_url,
                nationality,
                visa_type
            )
        `)
        .or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error searching posts:', error)
        return []
    }

    // Fetch likes, comments counts, and is_liked status
    const postsWithCounts = await Promise.all(
        (posts || []).map(async (post) => {
            const queries: any[] = [
                supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
                supabase.from('comments').select('*', { count: 'exact', head: true }).eq('post_id', post.id)
            ]

            if (userId) {
                queries.push(
                    supabase.from('likes').select('id').eq('post_id', post.id).eq('user_id', userId).single()
                )
            }

            const results = await Promise.all(queries)
            const likesCount = results[0].count || 0
            const commentsCount = results[1].count || 0
            const isLiked = userId ? !!results[2].data : false

            return {
                ...post,
                likes_count: likesCount,
                comments_count: commentsCount,
                is_liked: isLiked
            }
        })
    )

    return postsWithCounts
}

// 북마크 토글
export async function toggleBookmark(postId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: '북마크하려면 로그인이 필요합니다.' }
    }

    // 기존 북마크 확인
    const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

    if (existing) {
        // 북마크 해제
        await supabase.from('bookmarks').delete().eq('id', existing.id)
        revalidatePath('/community')
        return { bookmarked: false }
    } else {
        // 북마크 추가
        await supabase.from('bookmarks').insert({
            post_id: postId,
            user_id: user.id,
        })
        revalidatePath('/community')
        return { bookmarked: true }
    }
}

// 사용자 북마크 목록 조회
export async function getUserBookmarks() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data: bookmarks, error } = await supabase
        .from('bookmarks')
        .select(`
            post_id,
            posts (
                *,
                profiles (
                    nickname,
                    avatar_url,
                    nationality,
                    visa_type
                )
            )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching bookmarks:', error)
        return []
    }

    return bookmarks?.map(b => b.posts) || []
}

// 카테고리별 게시글 조회 (페이지네이션 지원)
export async function getPostsByCategory(category?: string, userId?: string, page: number = 0, limit: number = 10) {
    const supabase = await createClient()

    const from = page * limit
    const to = from + limit - 1

    let query = supabase
        .from('posts')
        .select(`
            *,
            profiles (
                nickname,
                avatar_url,
                nationality,
                visa_type
            )
        `)
        .order('created_at', { ascending: false })
        .range(from, to)

    if (category && category !== 'all') {
        query = query.eq('category', category)
    }

    const { data: posts, error } = await query

    if (error) {
        console.error('Error fetching posts by category:', error)
        return []
    }

    // Fetch likes, comments counts
    const postsWithCounts = await Promise.all(
        (posts || []).map(async (post) => {
            const [likesResult, commentsResult] = await Promise.all([
                supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
                supabase.from('comments').select('*', { count: 'exact', head: true }).eq('post_id', post.id)
            ])

            const likesCount = likesResult.count || 0
            const commentsCount = commentsResult.count || 0

            let isLiked = false
            let isBookmarked = false

            if (userId) {
                const [likeResult, bookmarkResult] = await Promise.all([
                    supabase.from('likes').select('id').eq('post_id', post.id).eq('user_id', userId).single(),
                    supabase.from('bookmarks').select('id').eq('post_id', post.id).eq('user_id', userId).single()
                ])
                isLiked = !!likeResult.data
                isBookmarked = !!bookmarkResult.data
            }

            return {
                ...post,
                likes_count: likesCount,
                comments_count: commentsCount,
                is_liked: isLiked,
                is_bookmarked: isBookmarked
            }
        })
    )

    return postsWithCounts
}
