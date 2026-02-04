'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Send, Bot, User, Sparkles, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { askVisaSenior } from '@/actions/visa-ai'

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
      content: '안녕! 나는 왈라왈라의 AI 비자 선배야. 🌏\n한국 생활하면서 비자 때문에 고민 많았지? 내가 차근차근 도와줄게. 무엇이든 물어봐!',
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

  const handleSend = async () => {
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

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const response = await askVisaSenior(input, history)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content || '미안해, 선배가 잠시 생각을 정리 중이야. 다시 말해줄래?',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI Error:', error)
    } finally {
      setIsTyping(false)
    }
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
            <h1 className="text-lg font-[1000] text-slate-900 tracking-tight flex items-center gap-1.5 italic">
              AI 비자 선배
              <Sparkles className="w-4 h-4 text-pink-500" />
            </h1>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Senior Online</span>
            </div>
          </div>
        </div>
        <div className="bg-pink-50 p-2 rounded-full border border-pink-100 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-pink-600" />
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
                  "w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md border-2 border-white",
                  msg.role === 'assistant' ? "bg-slate-900 text-white" : "bg-white text-slate-400"
                )}>
                  {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="space-y-1">
                  <div className={cn(
                    "px-4 py-3 rounded-[1.5rem] text-[15px] leading-relaxed font-semibold shadow-sm",
                    msg.role === 'assistant' 
                      ? "bg-white text-slate-800 rounded-tl-none border border-slate-100" 
                      : "bg-pink-600 text-white rounded-tr-none shadow-pink-100"
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
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center border-2 border-white shadow-md">
              <Bot size={20} />
            </div>
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t pb-8">
        <div className="flex gap-2 items-center bg-slate-50 p-1.5 rounded-[2rem] border border-slate-200 pr-2 focus-within:ring-2 focus-within:ring-pink-100 transition-all">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="선배, 나 궁금한 게 있는데..."
            className="border-none bg-transparent focus-visible:ring-0 shadow-none h-10 font-bold text-slate-700 placeholder:text-slate-300"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon" 
            className="rounded-full bg-slate-900 hover:bg-black transition-all shrink-0 w-10 h-10 shadow-lg shadow-slate-200"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
        <p className="text-[9px] text-center text-slate-300 font-black uppercase tracking-[0.2em] mt-4">
          WalaWala Intelligence Square • 2026 Edition
        </p>
      </footer>
    </div>
  )
}