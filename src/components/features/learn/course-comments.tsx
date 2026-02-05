'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Trash2, Send } from 'lucide-react'
import { createCourseComment, deleteCourseComment, type CourseComment } from '@/actions/learn'

interface CourseCommentsProps {
    courseId: string
    comments: CourseComment[]
    currentUserId?: string
}

export function CourseComments({ courseId, comments, currentUserId }: CourseCommentsProps) {
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim() || isSubmitting) return

        setIsSubmitting(true)
        const formData = new FormData()
        formData.append('content', content)
        formData.append('courseId', courseId)

        const result = await createCourseComment(formData)

        if (result.success) {
            setContent('')
            router.refresh()
        } else if (result.error) {
            alert(result.error)
        }
        setIsSubmitting(false)
    }

    const handleDelete = async (commentId: string) => {
        if (!confirm('댓글을 삭제하시겠습니까?')) return

        const result = await deleteCourseComment(commentId, courseId)
        if (result.success) {
            router.refresh()
        } else if (result.error) {
            alert(result.error)
        }
    }

    return (
        <div className="space-y-4">
            {/* Comment Form */}
            {currentUserId ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        disabled={isSubmitting}
                    />
                    <Button
                        type="submit"
                        size="sm"
                        className="rounded-full px-4"
                        disabled={!content.trim() || isSubmitting}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            ) : (
                <div className="text-center py-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">
                        댓글을 작성하려면{' '}
                        <a href="/login" className="text-brand-primary font-semibold hover:underline">
                            로그인
                        </a>
                        이 필요합니다.
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-3">
                {comments.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">아직 댓글이 없어요.</p>
                        <p className="text-gray-300 text-xs mt-1">첫 번째 댓글을 남겨보세요!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.profiles?.avatar_url} />
                                <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                                    {comment.profiles?.nickname?.[0] || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm text-gray-800">
                                        {comment.profiles?.nickname || 'Anonymous'}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        {comment.profiles?.nationality || ''}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        <span suppressHydrationWarning>
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{comment.content}</p>
                            </div>
                            {currentUserId === comment.author_id && (
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
