'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { href: '/community', label: 'Home', icon: Home },
    { href: '/visa', label: 'Visa', icon: FileText },
    { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t safe-area-pb">
            <div className="max-w-md mx-auto flex justify-around items-center h-16">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center px-4 py-2 min-w-[64px] transition-colors",
                                isActive
                                    ? "text-brand-primary"
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 mb-1", isActive && "stroke-[2.5]")} />
                            <span className={cn("text-xs", isActive && "font-semibold")}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
