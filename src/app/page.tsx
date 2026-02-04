'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, MessageCircle, ShieldCheck } from 'lucide-react'
import { LiveStatus } from '@/components/features/community/live-status'
import { ResidentBadge } from '@/components/ui/resident-badge'
import { ReactionButton } from '@/components/ui/reaction-button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border">
              <img src="/logo.jpg" alt="WalaWala Logo" className="object-cover w-full h-full" />
            </div>
            <span className="text-xl font-bold text-brand-primary">WalaWala</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <span className="text-sm font-medium text-gray-600 hover:text-brand-primary px-3 py-2">Login</span>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90 text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Live Indicator Overlay */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40">
        <LiveStatus count={102} />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-3xl flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src="/logo.jpg" alt="WalaWala Logo" className="object-cover w-full h-full" />
          </div>
          <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/20 text-brand-dark text-xs font-bold mb-6 tracking-wide text-brand-primary">
            FOR FOREIGNERS IN KOREA 🇰🇷
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Your Safe Playground <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              WalaWala
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Ask questions, manage your visa, and connect with friends who understand your journey in Korea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white h-12 px-8 text-lg shadow-lg shadow-brand-primary/20">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-lg">
                Browse Community
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8 text-brand-accent" />}
              title="Community"
              description="Share your stories and ask questions without language barriers."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-indigo-500" />}
              title="Visa Help"
              description="Keep track of your visa status and get reminders before it expires."
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-emerald-500" />}
              title="Connections"
              description="Meet international friends and locals in a safe environment."
            />
          </div>
        </div>
      </section>

      {/* Live Feed Preview Section */}
      <section className="py-20 bg-gray-50/50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Live from the Plaza</h2>
            <Link href="/community" className="text-sm font-medium text-brand-primary hover:underline">View all posts</Link>
          </div>
          
          <div className="space-y-6">
            <FeedCard 
              name="Minh" 
              country="VN" 
              visa="E-7" 
              content="드디어 E-7 비자 승인받았습니다! 서류 준비가 정말 힘들었지만 WalaWala 덕분에 무사히 통과했네요. 궁금한 점 있으면 물어보세요! 😊"
              likes={234}
              comments={45}
            />
            <FeedCard 
              name="Sarah" 
              country="US" 
              visa="D-2" 
              content="오늘 신촌에서 만날 분 계신가요? 한국어 연습도 하고 맛있는 것도 먹고 싶어요! 🍜"
              likes={12}
              comments={8}
            />
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-50 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>© 2026 WalaWala. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeedCard({ name, country, visa, content, likes, comments }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <Card className="border-none shadow-md overflow-hidden bg-white">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center font-bold text-brand-primary">
                {name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{name}</span>
                  <ResidentBadge countryCode={country} visaType={visa as any} />
                </div>
                <span className="text-xs text-gray-500">2 minutes ago</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {content}
          </p>
          <div className="flex items-center gap-6">
            <ReactionButton kind="like" count={likes} />
            <ReactionButton kind="comment" count={comments} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}