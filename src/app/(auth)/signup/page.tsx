'use client'

import { signup } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SignupPage() {
  const [state, action, isPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await signup(formData)
  }, null)

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>
            WalaWala와 함께 한국 생활을 시작해봐요.
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="grid gap-4">
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" disabled={isPending}>
              {isPending ? '가입 중...' : '가입하기'}
            </Button>
            <div className="text-center text-sm">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="underline">
                로그인
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    )
  }
