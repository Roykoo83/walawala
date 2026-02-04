'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getPosts } from '@/actions/community'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const CATEGORIES = [
  'All', 'General', 'Visa', 'Jobs', 'Housing', 'Meetup', 'Market', 'Tips', 'News'
]

export function PostList({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [newPostsAvailable, setNewPostsAvailable] = useState(false)
  
  const loader = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // 1. 실시간 이벤트 구독 (Interaction Channel)
  useEffect(() => {
    const channel = supabase
      .channel('community-feed')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'posts' 
      }, (payload) => {
        setNewPostsAvailable(true)
        // 선택사항: 자동으로 리스트 상단에 추가하거나, 사용자에게 알림 버튼을 띄움
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  // 2. 무한 스크롤 데이터 로드 (Virtualized Feed 기법의 기초)
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    const nextPage = page + 1
    const { data } = await getPosts(nextPage, 10, activeCategory)
    
    if (data && data.length > 0) {
      setPosts(prev => [...prev, ...data])
      setPage(nextPage)
      if (data.length < 10) setHasMore(false)
    } else {
      setHasMore(false)
    }
    setLoading(false)
  }, [page, loading, hasMore, activeCategory])

  // 3. Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts()
        }
      },
      { threshold: 1.0 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [loadMorePosts, hasMore])

  // 4. 카테고리 변경 처리
  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category)
    setPage(0)
    setHasMore(true)
    setLoading(true)
    const { data } = await getPosts(0, 10, category)
    setPosts(data || [])
    setLoading(false)
  }

  // 5. 새 글 새로고침
  const refreshFeed = async () => {
    setLoading(true)
    const { data } = await getPosts(0, 10, activeCategory)
    setPosts(data || [])
    setPage(0)
    setHasMore(true)
    setNewPostsAvailable(false)
    setLoading(false)
  }

  return (
    <div className="space-y-6 pb-20">
      {/* 카테고리 칩 (Content Context IA 재점검) */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className="cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap transition-all"
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* 새 글 알림 버튼 */}
      {newPostsAvailable && (
        <Button 
          variant="outline" 
          className="w-full bg-brand-accent/10 border-brand-accent text-brand-accent-dark animate-bounce"
          onClick={refreshFeed}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          새로운 게시글이 올라왔어요!
        </Button>
      )}

      {/* 게시글 리스트 */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow border-none shadow-sm bg-gray-50/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="text-[10px] uppercase font-bold text-gray-400 bg-white">
                  {post.category}
                </Badge>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
              </div>
              <CardTitle className="text-xl font-bold mt-2 leading-tight">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-brand-accent/20 flex items-center justify-center text-[10px] text-brand-primary font-bold">
                  {(post.profiles?.nickname || 'U')[0]}
                </div>
                <span className="text-sm font-medium">
                  {post.profiles?.nickname || post.profiles?.email || 'Anonymous'}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                {post.content}
              </p>
            </CardContent>
            {/* 썸네일 표시 로직 (이미지가 있는 경우를 가정) */}
            {post.image_url && (
              <div className="px-6 pb-4">
                <div className="aspect-video w-full rounded-lg bg-gray-200 overflow-hidden relative">
                  <img src={post.image_url} alt={post.title} className="object-cover w-full h-full" />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* 로딩 인디케이터 / 무한 스크롤 트리거 */}
      <div ref={loader} className="py-8 flex justify-center">
        {loading && <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />}
        {!hasMore && posts.length > 0 && (
          <p className="text-sm text-gray-400 font-medium">모든 소식을 확인했어요 🌏</p>
        )}
        {posts.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400">이 카테고리에는 아직 소식이 없네요.</p>
            <Button variant="link" onClick={() => handleCategoryChange('All')}>전체 보기</Button>
          </div>
        )}
      </div>
    </div>
  )
}
