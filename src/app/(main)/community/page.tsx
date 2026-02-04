import { getHomeData } from '@/actions/home'
import Link from 'next/link'
import { PenSquare, MessageSquare, Search, Bell, Heart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LiveStatus } from '@/components/features/community/live-status'
import { ResidentBadge, AnimatedReaction } from '@/components/features/community/resident-elements'
import { Button } from '@/components/ui/button'

export default async function CommunityPage() {
  const { user, profile, visaStatus, posts } = await getHomeData()

  return (
    <div className="min-h-screen bg-slate-50 pb-24 relative">
      
      {/* Sticky Top Bar with Live Status */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-2">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter italic">WalaWala</h1>
          <LiveStatus count={100 + Math.floor(Math.random() * 20)} />
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-slate-400" />
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 pt-6">
        
        {/* User Context Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                Hello, {profile?.nickname || 'Friend'}! 🌍
              </h2>
              <p className="text-slate-500 text-sm">Welcome back to the square.</p>
            </div>
            {visaStatus && (
              <Link href="/visa">
                <div className={`px-3 py-1.5 rounded-2xl border ${visaStatus.isUrgent ? 'bg-red-50 border-red-100' : 'bg-indigo-50 border-indigo-100'} flex flex-col items-end`}>
                  <span className={`text-[10px] font-bold ${visaStatus.isUrgent ? 'text-red-500' : 'text-indigo-500'}`}>{visaStatus.type}</span>
                  <span className={`text-sm font-black ${visaStatus.isUrgent ? 'text-red-600' : 'text-indigo-600'}`}>{visaStatus.text}</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Square Categories */}
        <div className="flex gap-4 mb-10 overflow-x-auto no-scrollbar py-2">
           {[
             { label: 'Visa', icon: '📋', bg: 'bg-blue-500' },
             { label: 'Jobs', icon: '💼', bg: 'bg-indigo-500' },
             { label: 'Room', icon: '🏠', bg: 'bg-emerald-500' },
             { label: 'Food', icon: '🍜', bg: 'bg-orange-500' },
             { label: 'Talk', icon: '💬', bg: 'bg-pink-500' },
           ].map((cat) => (
             <div key={cat.label} className="flex flex-col items-center gap-2 min-w-[64px]">
               <div className={`${cat.bg} w-14 h-14 rounded-3xl flex items-center justify-center text-2xl shadow-lg shadow-${cat.bg.split('-')[1]}-200/50 text-white transform active:scale-90 transition-transform`}>
                 {cat.icon}
               </div>
               <span className="text-[11px] font-bold text-slate-500">{cat.label}</span>
             </div>
           ))}
        </div>

        {/* The Square Feed */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">The Square 🔥</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Newest First</span>
        </div>

        <div className="space-y-6">
          {posts.map((post: any) => (
            <Card key={post.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="p-5 pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-slate-50">
                      <AvatarImage src={post.profiles?.avatar_url} />
                      <AvatarFallback className="bg-slate-100 text-slate-400 font-bold">
                        {post.profiles?.nickname?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-900">
                        {post.profiles?.nickname || 'Anonymous'}
                      </span>
                      <ResidentBadge 
                        nationality={post.profiles?.nationality} 
                        visaType={post.profiles?.visa_type} 
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">
                    {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </CardHeader>
              
              <Link href={`/community/${post.id}`}>
                <CardContent className="p-5">
                  <h4 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight">
                    {post.title}
                  </h4>
                  
                  {post.images && post.images.length > 0 && (
                    <div className="relative w-full h-56 mb-4 rounded-3xl overflow-hidden">
                      <img src={post.images[0]} alt="" className="object-cover w-full h-full" />
                    </div>
                  )}

                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <AnimatedReaction count={post.likes_count} active={post.is_liked}>
                      <Heart className={post.is_liked ? "fill-current" : ""} size={18} />
                    </AnimatedReaction>
                    <AnimatedReaction count={post.comments_count}>
                      <MessageSquare size={18} />
                    </AnimatedReaction>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <Link href="/community/create">
        <Button className="fixed bottom-8 right-6 w-16 h-16 rounded-full bg-pink-600 hover:bg-pink-700 shadow-2xl shadow-pink-200 text-white p-0 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50">
          <PenSquare size={28} />
        </Button>
      </Link>

    </div>
  )
}
