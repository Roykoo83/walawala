import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { getURL } from '@/utils/get-url'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // next 파라미터가 있으면 사용하되, 앞의 슬래시를 제거하고 getURL에 넘김
  let next = searchParams.get('next') ?? '/community'

  if (code) {
    console.log(`[AUTH_CALLBACK] Exchanging code: ${code.substring(0, 5)}...`);
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[AUTH_CALLBACK_EXCHANGE_ERROR]', {
        message: error.message,
        status: error.status,
        name: error.name
      });
    }

    if (!error) {
      // 로그인 성공 시 지정된 페이지로 리다이렉트
      return NextResponse.redirect(getURL(next))
    }
  }

  // 로그인 실패 시 로그인 페이지로 돌아가며 에러 메시지 전달
  return NextResponse.redirect(getURL(`login?error=auth-callback-failed`))
}
