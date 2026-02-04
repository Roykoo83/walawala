"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReactionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number
  isActive?: boolean
  type?: 'like' | 'comment'
  onToggle?: (newState: boolean) => void
}

export function ReactionButton({ 
  count: initialCount, 
  isActive: initialActive = false, 
  type = 'like',
  className,
  onToggle,
  ...props 
}: ReactionButtonProps) {
  const [isActive, setIsActive] = React.useState(initialActive)
  const [count, setCount] = React.useState(initialCount)
  const [isHovered, setIsHovered] = React.useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent parent link clicks if any
    
    const newState = !isActive
    setIsActive(newState)
    setCount(prev => newState ? prev + 1 : prev - 1)
    
    if (onToggle) {
      onToggle(newState)
    }
    
    if (props.onClick) {
      props.onClick(e)
    }
  }

  const Icon = type === 'like' ? Heart : MessageCircle
  const activeColor = type === 'like' ? 'text-red-500 fill-red-500' : 'text-blue-500 fill-blue-500'

  return (
    <motion.button
      className={cn(
        "group flex items-center gap-1.5 text-sm font-medium transition-colors outline-none",
        isActive ? activeColor : "text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.8 }}
      {...props}
    >
      <div className="relative">
        <motion.div
          animate={isActive ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Icon 
            className={cn(
              "h-5 w-5 transition-all",
              isActive && "fill-current"
            )} 
          />
        </motion.div>
        
        {/* Particle effect on activation (Simplified) */}
        <AnimatePresence>
          {isActive && type === 'like' && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 -z-10"
            />
          )}
        </AnimatePresence>
      </div>

      <span className="min-w-[1.5ch]">
         <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
