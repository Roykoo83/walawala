'use client'

import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { toggleBookmark } from '@/actions/post'

interface BookmarkButtonProps {
    postId: string
    isBookmarked: boolean
}

export function BookmarkButton({ postId, isBookmarked: initialIsBookmarked }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
    const [isLoading, setIsLoading] = useState(false)

    const handleBookmark = async () => {
        if (isLoading) return

        setIsLoading(true)
        setIsBookmarked(!isBookmarked) // Optimistic update

        const result = await toggleBookmark(postId)

        if (result.error) {
            setIsBookmarked(initialIsBookmarked) // Rollback on error
            alert(result.error)
        } else if (result.bookmarked !== undefined) {
            setIsBookmarked(result.bookmarked)
        }

        setIsLoading(false)
    }

    return (
        <button
            onClick={handleBookmark}
            disabled={isLoading}
            className={`p-1.5 rounded-full transition-all ${isBookmarked
                    ? 'text-yellow-500 bg-yellow-50'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
            <Bookmark
                className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
            />
        </button>
    )
}
