import { createClient } from '@/utils/supabase/server'
import { CommentSection } from '@/components/features/community/comment-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { LikeButton } from '@/components/features/community/like-button'
import { MessageSquare } from 'lucide-react'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 게시글 조회 (좋아요 수, 댓글 수 포함)
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, profiles(email, nickname)')
    .eq('id', id)
    .single()

  if (!post) {
    notFound()
  }

  // 좋아요 수 및 여부 조회
  const { count: likesCount } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id)
  
  let isLiked = false
  if (user) {
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .single()
    isLiked = !!data
  }

  // 댓글 조회
  const { data: comments, count: commentsCount } = await supabase
    .from('comments')
    .select('*, profiles(email, nickname)', { count: 'exact' })
    .eq('post_id', id)
    .order('created_at', { ascending: true })

  return (
    <div className="container mx-auto py-8 max-w-3xl px-4">
      <Link href="/community" className="mb-6 inline-block">
        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
          ← Back to Community
        </Button>
      </Link>

      <Card className="mb-8 border-gray-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">{post.title}</CardTitle>
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
                <div key={index} className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                  <Image 
                    src={url} 
                    alt={`Post image ${index + 1}`} 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Interaction Buttons */}
          <div className="flex gap-4 border-t border-gray-100 pt-4 mt-6">
            <LikeButton 
              postId={post.id} 
              initialLikesCount={likesCount || 0} 
              initialIsLiked={isLiked} 
            />
            <div className="flex items-center gap-1 text-gray-400 px-2 h-8 text-xs font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>{commentsCount || 0}</span>
            </div>
          </div>
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
