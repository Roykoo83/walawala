import { createClient } from '@/utils/supabase/server'
import { CommentSection } from '@/components/features/community/comment-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 게시글 조회
  const { data: post } = await supabase
    .from('posts')
    .select('*, profiles(email, nickname)')
    .eq('id', id)
    .single()

  if (!post) {
    notFound()
  }

  // 댓글 조회
  const { data: comments } = await supabase
    .from('comments')
    .select('*, profiles(email, nickname)')
    .eq('post_id', id)
    .order('created_at', { ascending: true })

  return (
    <div className="container mx-auto py-8 max-w-3xl px-4">
      <Link href="/community" className="mb-6 inline-block">
        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
          ← Back to Community
        </Button>
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <p className="text-gray-600 mt-2">
            Posted by {post.profiles?.nickname || post.profiles?.email || 'Unknown'}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
            {post.content}
          </div>
          
          {/* 이미지 갤러리 */}
          {post.images && post.images.length > 0 && (
            <div className="grid gap-4 mt-6">
              {post.images.map((url: string, index: number) => (
                <div key={index} className="relative w-full h-auto rounded-lg overflow-hidden border">
                  <img src={url} alt={`Post image ${index + 1}`} className="w-full h-auto object-contain" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CommentSection 
        postId={post.id} 
        comments={comments || []} 
        currentUserId={user?.id} 
      />
    </div>
  )
}
