'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ResidentBadgeProps {
  nationality: string | null
  visaType: string | null
  className?: string
}

const VISA_COLORS: Record<string, string> = {
  'D-2': 'bg-blue-100 text-blue-700 border-blue-200',
  'D-10': 'bg-orange-100 text-orange-700 border-orange-200',
  'E-7': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'E-9': 'bg-green-100 text-green-700 border-green-200',
  'F-2': 'bg-purple-100 text-purple-700 border-purple-200',
  'default': 'bg-slate-100 text-slate-600 border-slate-200'
}

const NATIONALITY_FLAGS: Record<string, string> = {
  'Vietnam': '🇻🇳',
  'China': '🇨🇳',
  'Uzbekistan': '🇺🇿',
  'Nepal': '🇳🇵',
  'Indonesia': '🇮🇩',
  'USA': '🇺🇸',
  'Global': '🌐'
}

export function ResidentBadge({ nationality, visaType, className }: ResidentBadgeProps) {
  const flag = NATIONALITY_FLAGS[nationality || 'Global'] || '🌐'
  const colorClass = VISA_COLORS[visaType || 'default'] || VISA_COLORS['default']

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="text-sm">{flag}</span>
      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md border tracking-wider uppercase", colorClass)}>
        {visaType || 'VISITOR'}
      </span>
    </div>
  )
}

export function AnimatedReaction({ children, count, active }: { children: React.ReactNode, count: number, active?: boolean }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer",
        active ? "bg-pink-50 text-pink-600" : "hover:bg-slate-100 text-slate-400"
      )}
    >
      {children}
      <motion.span 
        key={count}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xs font-bold"
      >
        {count}
      </motion.span>
    </motion.div>
  )
}
