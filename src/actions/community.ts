'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { ensureProfile } from './profile'

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
})

const commentSchema = z.object({
  content: z.string().min(1),
  postId: z.string().uuid(),
})

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '게시글을 작성하려면 로그인이 필요합니다.' }
  }

  // [Fix] 프로필 존재 보장
  await ensureProfile(user.id, user.email)

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const imageFiles = formData.getAll('images') as File[]

  const validatedFields = postSchema.safeParse({ title, content, category })

  if (!validatedFields.success) {
    return { error: '입력 값이 올바르지 않습니다.' }
  }

  const imageUrls: string[] = []

  // 이미지 업로드 처리
  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      if (file.size > 0) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, file)

        if (uploadError) {
          console.error('Image upload error:', uploadError)
          continue // 실패한 이미지는 건너뛰거나 에러 처리
        }

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName)

        imageUrls.push(publicUrl)
      }
    }
  }

  const { error } = await supabase.from('posts').insert({
    title,
    content,
    category,
    images: imageUrls,
    author_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/community')
  redirect('/community')
}

export async function createComment(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '댓글을 작성하려면 로그인이 필요합니다.' }
  }

  // [Fix] 프로필 존재 보장
  await ensureProfile(user.id, user.email)

  const data = {
    content: formData.get('content') as string,
    postId: formData.get('postId') as string,
  }

  const validatedFields = commentSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: '유효하지 않은 댓글 데이터입니다.' }
  }

  const { error } = await supabase.from('comments').insert({
    content: data.content,
    post_id: data.postId,
    author_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/community/${data.postId}`)
  return { success: true }
}

export async function getPosts(page: number = 0, limit: number = 10, category?: string) {
  const supabase = await createClient()

  // 게시글 정보와 함께 작성자 프로필, 댓글 수, 좋아요 수를 한 번에 조회
  let query = supabase
    .from('posts')
    .select(`
      *,
      profiles(nickname, avatar_url, nationality, visa_type),
      comments:comments(count),
      likes:likes(count)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return { data: [], count: 0 }
  }

  // 데이터 가공 (count 객체 구조를 단순 숫자로 변환)
  const formattedData = data?.map(post => ({
    ...post,
    comment_count: post.comments?.[0]?.count || 0,
    like_count: post.likes?.[0]?.count || 0
  }))

  return { data: formattedData, count }
}

export async function deletePost(postId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '권한이 없습니다.' }
  }

  // RLS가 설정되어 있지만, 서버 액션에서도 체크
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('author_id', user.id)

  if (error) {
    return { error: '게시글 삭제에 실패했습니다.' }
  }

  revalidatePath('/community')
  redirect('/community')
}

export async function deleteComment(commentId: string, postId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '권한이 없습니다.' }
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('author_id', user.id)

  if (error) {
    return { error: '댓글 삭제에 실패했습니다.' }
  }

  revalidatePath(`/community/${postId}`)
}

export async function toggleLike(postId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다.', liked: false }
  }

  // Check if already liked
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    // Unlike
    await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id)

    revalidatePath('/community')
    return { liked: false }
  } else {
    // Like
    // [Fix] 프로필 존재 보장
    await ensureProfile(user.id, user.email)

    await supabase
      .from('likes')
      .insert({ post_id: postId, user_id: user.id })

    revalidatePath('/community')
    return { liked: true }
  }
}