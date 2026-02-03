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

export async function getPostsWithCounts(userId?: string) {
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
