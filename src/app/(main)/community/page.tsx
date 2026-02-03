import { getPostsWithCounts } from '@/actions/post'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { PenSquare, MessageSquare } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { VisaCard } from '@/components/features/visa/visa-card'
import { LikeButton } from '@/components/features/community/like-button'

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const posts = await getPostsWithCounts(user?.id)
  
  let userProfile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('visa_type, visa_expiry_date, nickname')
      .eq('id', user.id)
      .single()
    userProfile = data
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md pb-20">
      {/* Visa Card Section */}
      {user && (
        <div className="mb-6">
          <VisaCard 
            visaType={userProfile?.visa_type} 
            expiryDate={userProfile?.visa_expiry_date}
            nickname={userProfile?.nickname || user.email?.split('@')[0]}
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <Button asChild size="sm" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-md">
          <Link href="/community/create">
            <PenSquare className="w-4 h-4 mr-2" />
            Write
          </Link>
        </Button>
      </div>

      {/* Categories (MVP Dummy) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
        {['ALL', 'VISA', 'JOBS', 'LIFE', 'Q&A'].map((cat) => (
          <Button key={cat} variant="outline" size="sm" className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100">
            {cat}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post: any) => (
            <Link key={post.id} href={`/community/${post.id}`} className="block">
              <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform">
                <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
                  <Avatar className="w-10 h-10 border bg-gray-50">
                    <AvatarImage src={post.profiles?.avatar_url} />
                    <AvatarFallback>{post.profiles?.nickname?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900">{post.profiles?.nickname || 'Anonymous'}</span>
                      <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                        {post.profiles?.nationality || 'Global'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full mr-2">
                      {post.category}
                    </span>
                    <h3 className="font-bold inline align-middle text-gray-900">{post.title}</h3>
                  </div>
                  
                  {post.images && post.images.length > 0 && (
                    <div className="relative w-full h-48 mb-3 overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
                      <img 
                        src={post.images[0]} 
                        alt="Post thumbnail" 
                        className="object-cover w-full h-full" 
                      />
                    </div>
                  )}

                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {post.content}
                  </p>
                  
                  {/* Interaction Buttons */}
                  <div className="flex gap-4 border-t border-gray-50 pt-3 mt-1">
                    <LikeButton 
                      postId={post.id} 
                      initialLikesCount={post.likes_count} 
                      initialIsLiked={post.is_liked} 
                    />
                    <div className="flex items-center gap-1 text-gray-400 px-2 h-8 text-xs font-medium">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}