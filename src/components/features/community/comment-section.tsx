'use client'

import { createComment, deleteComment } from '@/actions/community'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'

interface Comment {
  id: string
  content: string
  created_at: string
  author_id: string
  profiles: {
    nickname: string | null
    email: string | null
  } | null
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  currentUserId?: string
}

export function CommentSection({ postId, comments, currentUserId }: CommentSectionProps) {
  const [state, action, isPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await createComment(formData)
  }, null)

  const handleDelete = async (commentId: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      await deleteComment(commentId, postId)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold">댓글 ({comments.length})</h3>

      {/* 댓글 작성 폼 */}
      <Card>
        <CardContent className="pt-6">
          <form action={action} className="flex gap-2">
            <input type="hidden" name="postId" value={postId} />
            <Input
              name="content"
              placeholder="댓글을 작성하세요..."
              required
              disabled={isPending}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? '작성 중...' : '작성'}
            </Button>
          </form>
          {state?.error && (
            <p className="text-sm text-red-500 mt-2">{state.error}</p>
          )}
        </CardContent>
      </Card>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-gray-50/50">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                  {comment.profiles?.nickname || comment.profiles?.email || 'Unknown'}
                </span>
                <span>•</span>
                <span suppressHydrationWarning>{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              {currentUserId === comment.author_id && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </Button>
              )}
            </CardHeader>
            <CardContent className="py-2 px-4 pb-4">
              <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
