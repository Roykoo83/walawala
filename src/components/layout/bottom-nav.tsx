'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, PlusCircle, CreditCard, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/community', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Post', href: '/community/create', icon: PlusCircle, isMain: true },
    { label: 'Visa', href: '/visa', icon: CreditCard },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  // Hide on auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/onboarding')) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon

          if (item.isMain) {
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex flex-col items-center justify-center -mt-6">
                  <div className="bg-brand-accent hover:bg-brand-accent-dark text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] mt-1 font-medium text-gray-500">{item.label}</span>
                </div>
              </Link>
            )
          }

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className={cn(
                "flex flex-col items-center justify-center h-full space-y-1",
                isActive ? "text-brand-accent-dark" : "text-gray-400 hover:text-gray-600"
              )}>
                <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}