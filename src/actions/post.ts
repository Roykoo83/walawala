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
