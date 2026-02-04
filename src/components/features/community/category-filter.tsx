'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FileText, Home, Briefcase, Users, MessageCircle, Sparkles } from 'lucide-react'

const CATEGORIES = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'visa', label: 'Visa', icon: FileText },
    { id: 'housing', label: 'Housing', icon: Home },
    { id: 'job', label: 'Job', icon: Briefcase },
    { id: 'life', label: 'Life', icon: MessageCircle },
    { id: 'meetup', label: 'Meetup', icon: Users },
]

export function CategoryFilter() {
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category') || 'all'
    const currentQuery = searchParams.get('q') || ''

    const buildHref = (categoryId: string) => {
        const params = new URLSearchParams()
        if (categoryId !== 'all') {
            params.set('category', categoryId)
        }
        if (currentQuery) {
            params.set('q', currentQuery)
        }
        const queryString = params.toString()
        return `/community${queryString ? `?${queryString}` : ''}`
    }

    return (
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-1">
            {CATEGORIES.map((cat) => {
                const isActive = currentCategory === cat.id
                const Icon = cat.icon

                return (
                    <Link
                        key={cat.id}
                        href={buildHref(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-all ${isActive
                                ? 'bg-slate-800 text-white shadow-md'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="font-medium">{cat.label}</span>
                    </Link>
                )
            })}
        </div>
    )
}
