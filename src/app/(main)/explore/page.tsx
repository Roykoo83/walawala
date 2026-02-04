import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md pb-24">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="궁금한 것을 검색해보세요"
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 shadow-sm"
        />
      </div>

      <Link href="/learn">
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-xl shadow-indigo-200 flex items-center justify-between cursor-pointer transform transition-all active:scale-95">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">New</span>
              <h3 className="font-bold text-lg">한국어 & KIIP 정복하기</h3>
            </div>
            <p className="text-sm text-indigo-100">무료 강의 듣고 비자 점수 받자! 📚</p>
          </div>
          <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
            <span className="text-2xl">🎓</span>
          </div>
        </div>
      </Link>

      <h2 className="text-lg font-bold mb-4 text-gray-800">추천 키워드</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {['#비자연장', '#D-10전환', '#신촌맛집', '#알바구함', '#한국어공부', '#친구만들기'].map((tag) => (
          <span key={tag} className="px-3 py-1.5 bg-white border border-gray-100 rounded-full text-sm text-gray-600 shadow-sm">
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-4 text-gray-800">인기 모임</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-none shadow-md overflow-hidden">
            <div className="h-32 bg-gray-200 relative">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Image {i}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-wide">Language Exchange</span>
                  <h3 className="font-bold text-gray-900 mt-1">강남 주말 한국어 회화 모임</h3>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">D-3</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">한국 친구들과 자연스럽게 대화하며 실력을 늘려보세요.</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>📍 강남역 11번 출구</span>
                <span>👥 5/10명</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}