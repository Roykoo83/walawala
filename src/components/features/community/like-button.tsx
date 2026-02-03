'use client'

import { toggleLike } from '@/actions/post'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useOptimistic, useTransition } from 'react'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
    postId: string
    initialLikesCount: number
    initialIsLiked: boolean
}

export function LikeButton({ postId, initialLikesCount, initialIsLiked }: LikeButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [optimisticState, setOptimisticState] = useOptimistic(
        { likesCount: initialLikesCount, isLiked: initialIsLiked },
        (state) => ({
            likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
            isLiked: !state.isLiked
        })
    )

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault() // Link 클릭 방지
        e.stopPropagation()
        
        startTransition(async () => {
            setOptimisticState({ likesCount: optimisticState.likesCount, isLiked: optimisticState.isLiked })
            await toggleLike(postId)
        })
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
                "flex items-center gap-1 hover:text-pink-500 hover:bg-pink-50 px-2 h-8",
                optimisticState.isLiked ? "text-pink-500" : "text-gray-400"
            )}
        >
            <Heart 
                className={cn("w-4 h-4", optimisticState.isLiked && "fill-current")} 
            />
            <span className="text-xs font-medium">{optimisticState.likesCount}</span>
        </Button>
    )
}
