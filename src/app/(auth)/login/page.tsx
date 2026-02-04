'use client'

import { SocialLogin } from '@/components/features/auth/social-login'
import { login } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await login(formData)
  }, null)

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm border-none shadow-2xl shadow-pink-100/50 rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-10 pb-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-4 transform -rotate-3">
            <img src="/logo.jpg" alt="WalaWala Logo" className="object-cover w-full h-full" />
          </div>
          <CardTitle className="text-3xl font-[1000] text-slate-900 tracking-tighter italic">WalaWala</CardTitle>
          <CardDescription className="text-center font-bold text-slate-400 mt-2">
            외국인을 위한 가장 따뜻한 광장
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SocialLogin />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                또는 소셜 계정으로 시작
              </span>
            </div>
          </div>
          <form action={action} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
            <Button className="w-full" disabled={isPending}>
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="underline">
              회원가입
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
