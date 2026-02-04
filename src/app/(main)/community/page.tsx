import { getHomeData } from '@/actions/home'
import Link from 'next/link'
import { PenSquare, Search, Bell } from 'lucide-react'
import { LiveStatus } from '@/components/features/community/live-status'
import { PostList } from '@/components/features/community/post-list'
import { Button } from '@/components/ui/button'

export default async function CommunityPage() {
  const { user, profile, visaStatus, posts } = await getHomeData()

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 relative selection:bg-pink-100 selection:text-pink-900">

      {/* Sticky Top Bar: The Hub of Activity */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 py-3 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Link href="/community" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
              <img src="/logo.jpg" alt="WalaWala Logo" className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="text-xl font-[1000] text-slate-900 tracking-tighter italic">WalaWala</h1>
              <div className="h-1 w-6 bg-pink-500 rounded-full" />
            </div>
          </Link>
          <LiveStatus count={100 + Math.floor(Math.random() * 20)} />
          <div className="flex gap-3">
            <div className="bg-slate-50 p-2 rounded-full border border-slate-100">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <div className="bg-slate-50 p-2 rounded-full border border-slate-100 relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 pt-8">

        {/* Personalized Welcome & Visa Alert */}
        <div className="mb-10">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                Hello, {profile?.nickname || 'Friend'}!
              </h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.1em]">
                {profile?.nationality || 'Global'} Resident
              </p>
            </div>
            {visaStatus && (
              <Link href="/visa">
                <div className={`px-4 py-2 rounded-[1.5rem] border shadow-sm transform active:scale-95 transition-all ${visaStatus.isUrgent ? 'bg-red-50 border-red-100' : 'bg-indigo-50 border-indigo-100'}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${visaStatus.isUrgent ? 'text-red-400' : 'text-indigo-400'}`}>{visaStatus.type}</p>
                  <p className={`text-lg font-[1000] leading-none ${visaStatus.isUrgent ? 'text-red-600' : 'text-indigo-600'}`}>{visaStatus.text}</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Dynamic Category Chips */}
        <div className="flex gap-4 mb-12 overflow-x-auto no-scrollbar py-2 px-1">
          {[
            { label: 'Visa', icon: '📋', bg: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-200', href: '/visa' },
            { label: 'Jobs', icon: '💼', bg: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-200', href: '/explore' },
            { label: 'Room', icon: '🏠', bg: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-200', href: '/explore' },
            { label: 'Food', icon: '🍜', bg: 'from-orange-500 to-orange-600', shadow: 'shadow-orange-200', href: '/explore' },
            { label: 'Study', icon: '🎓', bg: 'from-violet-500 to-violet-600', shadow: 'shadow-violet-200', href: '/learn' },
            { label: 'Talk', icon: '💬', bg: 'from-pink-500 to-pink-600', shadow: 'shadow-pink-200', href: '/community' },
          ].map((cat) => (
            <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-3 min-w-[72px]">
              <div className={`bg-gradient-to-br ${cat.bg} w-16 h-16 rounded-[2rem] flex items-center justify-center text-3xl shadow-xl ${cat.shadow} text-white transform active:scale-90 transition-all hover:rotate-3 cursor-pointer`}>
                {cat.icon}
              </div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{cat.label}</span>
            </Link>
          ))}
        </div>

        {/* The Living Square: Dynamic Feed */}
        <div className="flex justify-between items-end mb-8 px-1">
          <div>
            <h3 className="text-2xl font-[1000] text-slate-900 tracking-tighter">The Square</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Live Activity</p>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-slate-200 rounded-full" />
            <div className="w-2 h-2 bg-slate-200 rounded-full" />
          </div>
        </div>

        {/* Post List Component with Infinite Scroll & Real-time */}
        <PostList initialPosts={posts} userId={user?.id} />

      </main>

      {/* Floating Action Button: Premium Style */}
      <Link href="/community/create">
        <Button className="fixed bottom-10 right-6 w-16 h-16 rounded-[2rem] bg-pink-600 hover:bg-pink-700 shadow-[0_15px_30px_rgba(236,72,153,0.3)] text-white p-0 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 group border-4 border-white">
          <PenSquare size={28} className="group-hover:rotate-12 transition-transform" />
        </Button>
      </Link>

    </div>
  )
}