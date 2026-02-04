'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const onboardingSchema = z.object({
  nationality: z.string().min(1),
  visaType: z.string().min(1),
  visaExpiryDate: z.string().date(),
})

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const data = {
    nationality: formData.get('nationality') as string,
    visaType: formData.get('visaType') as string,
    visaExpiryDate: formData.get('visaExpiryDate') as string,
  }

  const validatedFields = onboardingSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid data' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      nationality: data.nationality,
      visa_type: data.visaType,
      visa_expiry_date: data.visaExpiryDate,
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile')
  redirect('/community')
}