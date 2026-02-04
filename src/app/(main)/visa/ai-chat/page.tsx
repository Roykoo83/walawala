'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Send, Bot, User, Sparkles, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: Date
}

export default function AiVisaChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 저는 왈라왈라의 AI 비자 선배입니다. 🌏\n비자 변경이나 갱신에 대해 궁금한 점이 있으신가요? 차근차근 도와드릴게요.',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '질문을 잘 이해했어요. 현재 비자 타입과 목표하시는 비자 타입을 알려주시면 더 정확한 점수 계산과 서류 준비를 도와드릴 수 있습니다!',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/visa">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              AI 비자 선배
              <Sparkles className="w-4 h-4 text-brand-accent" />
            </h1>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Online & Secured</span>
            </div>
          </div>
        </div>
        <div className="bg-brand-accent/10 p-2 rounded-full">
          <ShieldCheck className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm",
                  msg.role === 'assistant' ? "bg-brand-primary text-white" : "bg-white border text-slate-400"
                )}>
                  {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="space-y-1">
                  <div className={cn(
                    "px-4 py-3 rounded-[1.5rem] text-[15px] leading-relaxed font-medium shadow-sm",
                    msg.role === 'assistant' 
                      ? "bg-white text-slate-800 rounded-tl-none border border-slate-100" 
                      : "bg-brand-primary text-white rounded-tr-none"
                  )}>
                    {msg.content}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold text-slate-300 uppercase px-1",
                    msg.role === 'user' && "text-right block"
                  )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t safe-area-pb">
        <div className="flex gap-2 items-center bg-slate-50 p-1 rounded-full border border-slate-200 pr-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="비자 선배에게 질문하기..."
            className="border-none bg-transparent focus-visible:ring-0 shadow-none h-10 font-medium text-slate-600"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon" 
            className="rounded-full bg-brand-primary hover:bg-slate-800 transition-all shrink-0 w-10 h-10 shadow-lg shadow-slate-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-widest mt-3">
          AI guidance is for reference only. Always verify with official sources.
        </p>
      </footer>
    </div>
  )
}
