'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { Provider } from '@supabase/supabase-js'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

import { getURL } from '@/utils/get-url'

export async function signInWithOAuth(provider: Provider) {
  const supabase = await createClient()
  const redirectUrl = getURL('auth/callback')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (data.url) {
    redirect(data.url)
  }

  if (error) {
    return { error: error.message }
  }
}

export async function login(formData: FormData) {

  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedFields = authSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid email or password' }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/community')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedFields = authSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid email or password' }
  }

  const { data: authData, error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: getURL('auth/callback'),
    },
  })

  if (error) {
    return { error: error.message }
  }

  // [Bug Fix] 트리거 누락 대비: 프로필 수동 생성
  if (authData.user) {
    // 이미 존재하는지 확인 (중복 방지)
    const { data: existingProfile } = await supabase.from('profiles').select('id').eq('id', authData.user.id).single()

    if (!existingProfile) {
      await supabase.from('profiles').insert({
        id: authData.user.id,
        email: authData.user.email,
        nickname: authData.user.email?.split('@')[0] || 'New User',
        nationality: 'Global',
        visa_type: 'Unknown'
      })
    }
  }

  revalidatePath('/', 'layout')
  redirect('/community')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
