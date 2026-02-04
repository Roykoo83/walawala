'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get('q') || ''

    const [query, setQuery] = useState(initialQuery)
    const [isOpen, setIsOpen] = useState(!!initialQuery)

    const handleSearch = useCallback((searchQuery: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim())
        } else {
            params.delete('q')
        }
        router.push(`/community?${params.toString()}`)
    }, [router, searchParams])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch(query)
    }

    const handleClear = () => {
        setQuery('')
        handleSearch('')
    }

    const toggleSearch = () => {
        if (isOpen && query) {
            handleClear()
        }
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex items-center gap-2">
            {isOpen ? (
                <form onSubmit={handleSubmit} className="flex items-center gap-2 animate-in slide-in-from-right-5 duration-200">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-40 sm:w-56 h-9 pr-8 text-sm bg-white/50 border-slate-200 focus:bg-white"
                            autoFocus
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className="p-2"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </Button>
                </form>
            ) : (
                <button
                    onClick={toggleSearch}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <Search className="w-5 h-5 text-slate-500" />
                </button>
            )}
        </div>
    )
}
