'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const visaSchema = z.object({
  visaType: z.enum(['D-2', 'D-4', 'D-10', 'E-7', 'E-9', 'F-2', 'F-2-R', 'F-5', 'Others']),
  expiryDate: z.string().date(), // YYYY-MM-DD format
})

export async function updateVisaInfo(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다.' }
  }

  const data = {
    visaType: formData.get('visaType') as string,
    expiryDate: formData.get('expiryDate') as string,
  }

  const validatedFields = visaSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: '유효하지 않은 데이터입니다.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      visa_type: data.visaType,
      visa_expiry_date: data.expiryDate,
    })
    .eq('id', user.id)

  if (error) {
    return { error: '비자 정보 업데이트 실패: ' + error.message }
  }

  revalidatePath('/profile')
  revalidatePath('/community') // 사이드바 등에 표시될 수 있으므로
  return { success: true }
}
