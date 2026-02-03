import { getPosts } from '@/actions/post'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { PenSquare } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { VisaCard } from '@/components/features/visa/visa-card'

export default async function CommunityPage() {
  const posts = await getPosts()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
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
        <h1 className="text-2xl font-bold text-brand-primary">Community</h1>
        <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold">
          <Link href="/community/write">
            <PenSquare className="w-4 h-4 mr-2" />
            Write
          </Link>
        </Button>
      </div>

      {/* Categories (MVP Dummy) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
        {['ALL', 'VISA', 'JOBS', 'LIFE', 'Q&A'].map((cat) => (
          <Button key={cat} variant="outline" size="sm" className="rounded-full border-brand-primary/20 text-brand-primary">
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
            <Card key={post.id} className="border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={post.profiles?.avatar_url} />
                  <AvatarFallback>{post.profiles?.nickname?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{post.profiles?.nickname || 'Anonymous'}</span>
                    <span className="text-xs text-brand-primary/60 bg-brand-primary/5 px-1.5 py-0.5 rounded">
                      {post.profiles?.nationality || 'Global'}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="mb-2">
                  <span className="text-xs font-medium text-brand-accent border border-brand-accent/30 px-2 py-0.5 rounded-full mr-2">
                    {post.category}
                  </span>
                  <h3 className="font-bold inline align-middle">{post.title}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap">
                  {post.content}
                </p>
                {/* Interaction Buttons (MVP Placeholder) */}
                <div className="mt-4 flex gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">❤️ 0</span>
                  <span className="flex items-center gap-1">💬 0</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
