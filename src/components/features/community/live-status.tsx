'use client'

import { motion } from 'framer-motion'

export function LiveStatus({ count = 102 }: { count?: number }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-[11px] font-bold text-slate-600 tracking-tight">
        {count} Residents Talking Live
      </span>
    </div>
  )
}