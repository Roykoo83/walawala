'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, Heart, RefreshCw } from 'lucide-react'
import { ResidentBadge, AnimatedReaction } from './resident-elements'
import { getPostsByCategory, toggleLike } from '@/actions/post'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PostListProps {
    initialPosts: any[]
    userId?: string
}

export function PostList({ initialPosts, userId }: PostListProps) {
    const [posts, setPosts] = useState(initialPosts)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [hasMore, setHasMore] = useState(initialPosts.length >= 10)
    const [activeCategory, setActiveCategory] = useState('all')
    const observerTarget = useRef<HTMLDivElement>(null)

    // Pull to Refresh state
    const y = useMotionValue(0)
    const PULL_THRESHOLD = 120
    const rotate = useTransform(y, [0, PULL_THRESHOLD], [0, 360])
    const opacity = useTransform(y, [0, PULL_THRESHOLD], [0, 1])

    // Real-time listener
    useEffect(() => {
        const supabase = createClient()
        const channel = supabase
            .channel('public:posts_v2')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'posts' },
                () => {
                    toast.info('새로운 게시글이 올라왔습니다!', {
                        action: {
                            label: '새로고침',
                            onClick: () => handleRefresh()
                        }
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        const refreshedPosts = await getPostsByCategory(activeCategory, userId, 0)
        setPosts(refreshedPosts)
        setPage(1)
        setHasMore(refreshedPosts.length >= 10)
        setRefreshing(false)
        y.set(0)
    }, [activeCategory, userId, y])

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && !refreshing) {
                    setLoading(true)
                    const nextPosts = await getPostsByCategory(activeCategory, userId, page)
                    if (nextPosts.length < 10) {
                        setHasMore(false)
                    }
                    setPosts((prev) => [...prev, ...nextPosts])
                    setPage((prev) => prev + 1)
                    setLoading(false)
                }
            },
            { threshold: 0.1 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [page, hasMore, loading, refreshing, activeCategory, userId])

    // 카테고리 변경 처리
    useEffect(() => {
        if (page === 1 && posts === initialPosts) return // 초기 로드 무시

        const updateCategory = async () => {
            setLoading(true)
            const filteredPosts = await getPostsByCategory(activeCategory, userId, 0)
            setPosts(filteredPosts)
            setPage(1)
            setHasMore(filteredPosts.length >= 10)
            setLoading(false)
        }
        
        // 커스텀 이벤트나 상태 변경을 통해 카테고리 필터링이 일어날 때 호출
        // 현재는 window 이벤트를 예시로 들거나, 부모로부터 props를 받을 수 있음
        const handleCategoryChange = (e: any) => {
            setActiveCategory(e.detail)
        }
        window.addEventListener('categoryChange', handleCategoryChange)
        
        updateCategory()

        return () => window.removeEventListener('categoryChange', handleCategoryChange)
    }, [activeCategory, userId])

    return (
        <div className="relative overflow-visible">
            {/* Pull to Refresh Indicator */}
            <motion.div 
                style={{ y: y, opacity: opacity }}
                className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none z-0"
            >
                <motion.div style={{ rotate }} className="bg-white p-2 rounded-full shadow-lg border border-slate-100">
                    <RefreshCw className={cn("w-5 h-5 text-pink-500", refreshing && "animate-spin")} />
                </motion.div>
            </motion.div>

            <motion.div 
                style={{ y }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, info) => {
                    if (info.offset.y > PULL_THRESHOLD) {
                        handleRefresh()
                    } else {
                        y.set(0)
                    }
                }}
                className="space-y-6 z-10"
            >
                {posts.map((post: any, index: number) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index % 5 * 0.1 }}
                    >
                        <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500">
                            <CardHeader className="p-6 pb-0">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12 border-2 border-slate-50 ring-2 ring-pink-50">
                                            <AvatarImage src={post.profiles?.avatar_url} />
                                            <AvatarFallback className="bg-gradient-to-br from-pink-100 to-indigo-100 text-slate-500 font-black">
                                                {post.profiles?.nickname?.[0] || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-black text-sm text-slate-900 tracking-tight">
                                                {post.profiles?.nickname || 'Anonymous'}
                                            </span>
                                            <ResidentBadge 
                                                nationality={post.profiles?.nationality} 
                                                visaType={post.profiles?.visa_type} 
                                            />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 bg-slate-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                                        {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </CardHeader>
                            
                            <Link href={`/community/${post.id}`}>
                                <CardContent className="p-6">
                                    <h4 className="text-xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                                        {post.title}
                                    </h4>
                                    
                                    {post.images && post.images.length > 0 && (
                                        <div className="relative w-full aspect-[4/3] mb-5 rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
                                            <Image 
                                                src={post.images[0]} 
                                                alt={post.title} 
                                                fill 
                                                className="object-cover hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 500px"
                                            />
                                            {post.images.length > 1 && (
                                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                                                    +{post.images.length - 1} PHOTOS
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-slate-600 text-[15px] font-medium line-clamp-3 leading-relaxed mb-6">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-6 pt-2">
                                        <AnimatedReaction count={post.likes_count} active={post.is_liked}>
                                            <Heart className={cn("transition-all duration-300", post.is_liked ? "fill-pink-500 text-pink-500 scale-110" : "text-slate-300")} size={20} />
                                        </AnimatedReaction>
                                        <AnimatedReaction count={post.comments_count}>
                                            <MessageSquare className="text-slate-300" size={20} />
                                        </AnimatedReaction>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Infinite Scroll Trigger & Loading UI */}
            <div ref={observerTarget} className="py-12 flex flex-col items-center justify-center gap-3">
                {loading && (
                    <>
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                            <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-pink-200" />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] animate-pulse">Loading Stories</span>
                    </>
                )}
                {!hasMore && posts.length > 0 && (
                    <div className="flex flex-col items-center opacity-40">
                        <div className="w-1 h-1 bg-slate-300 rounded-full mb-2" />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">End of Square</span>
                    </div>
                )}
            </div>
        </div>
    )
}