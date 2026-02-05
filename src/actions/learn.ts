'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { ensureProfile } from './profile'

export interface Course {
    id: string
    title: string
    description: string
    category: 'kiip' | 'korean' | 'culture'
    content_type: 'video' | 'text' | 'document'
    content_url: string
    thumbnail_url: string
    duration: string
    level: 'beginner' | 'intermediate' | 'advanced'
    created_at: string
}

export interface CourseComment {
    id: string
    course_id: string
    author_id: string
    content: string
    created_at: string
    profiles?: {
        nickname: string
        avatar_url: string
        nationality: string
    }
}

// 강좌 목록 조회
export async function getCourses(category?: string) {
    const supabase = await createClient()

    let query = supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

    if (category && category !== 'all') {
        query = query.eq('category', category)
    }

    const { data: courses, error } = await query

    if (error) {
        console.error('Error fetching courses:', error)
        return []
    }

    return courses as Course[]
}

// 강좌 상세 조회
export async function getCourseById(id: string) {
    // UUID 형식이 아니면 DB 조회 없이 바로 null 반환 (샘플 데이터 대응)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        return null;
    }

    const supabase = await createClient()

    const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        // 데이터가 없는 경우는 에러 로그를 남기지 않음
        if (error.code !== 'PGRST116') {
            console.error('Error fetching course:', error)
        }
        return null
    }

    return course as Course
}

// 강좌 댓글 조회
export async function getCourseComments(courseId: string) {
    const supabase = await createClient()

    const { data: comments, error } = await supabase
        .from('course_comments')
        .select(`
            *,
            profiles (
                nickname,
                avatar_url,
                nationality
            )
        `)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching course comments:', error)
        return []
    }

    return comments as CourseComment[]
}

// 댓글 작성
export async function createCourseComment(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: '댓글을 작성하려면 로그인이 필요합니다.' }
    }

    // [Fix] 프로필 존재 보장
    await ensureProfile(user.id, user.email)

    const content = formData.get('content') as string
    const courseId = formData.get('courseId') as string

    if (!content?.trim()) {
        return { error: '댓글 내용을 입력해주세요.' }
    }

    const { error } = await supabase.from('course_comments').insert({
        course_id: courseId,
        author_id: user.id,
        content: content.trim(),
    })

    if (error) {
        console.error('Error creating comment:', error)
        return { error: '댓글 작성에 실패했습니다.' }
    }

    revalidatePath(`/learn/${courseId}`)
    return { success: true }
}

// 댓글 삭제
export async function deleteCourseComment(commentId: string, courseId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: '권한이 없습니다.' }
    }

    const { error } = await supabase
        .from('course_comments')
        .delete()
        .eq('id', commentId)
        .eq('author_id', user.id)

    if (error) {
        console.error('Error deleting comment:', error)
        return { error: '댓글 삭제에 실패했습니다.' }
    }

    revalidatePath(`/learn/${courseId}`)
    return { success: true }
}

