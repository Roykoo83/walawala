import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // 1. 세션 업데이트 (쿠키 갱신)
  let response = await updateSession(request)

  // 2. 온보딩 체크 로직 추가
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 로그인은 되어 있는데 온보딩 중이 아니고, 정적 파일 요청이 아닐 때
  if (user && !request.nextUrl.pathname.startsWith('/onboarding') && !request.nextUrl.pathname.startsWith('/_next')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('nationality, visa_type')
      .eq('id', user.id)
      .single()

    // 국적이나 비자 정보가 없으면 온보딩으로 강제 이동
    if (!profile?.nationality || !profile?.visa_type) {
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}