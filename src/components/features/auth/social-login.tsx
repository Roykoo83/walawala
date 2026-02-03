'use client'

import { signInWithOAuth } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Provider } from '@supabase/supabase-js'

export function SocialLogin() {
  const handleSocialLogin = async (provider: Provider) => {
    await signInWithOAuth(provider)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        onClick={() => handleSocialLogin('google')}
        type="button"
      >
        Google
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleSocialLogin('kakao')}
        type="button"
        className="bg-[#FEE500] text-black hover:bg-[#FEE500]/90 border-none"
      >
        Kakao
      </Button>
    </div>
  )
}
