'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function completeOnboarding(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const nickname = formData.get('nickname') as string
    const visaType = formData.get('visaType') as string
    const expiryDate = formData.get('expiryDate') as string
    const nationality = formData.get('nationality') as string

    if (!nickname || !visaType || !expiryDate) {
        return { error: 'Please fill in all required fields.' }
    }

    // Insert or Update Profile
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            nickname,
            visa_type: visaType,
            visa_expiry_date: expiryDate,
            nationality: nationality || null,
            updated_at: new Date().toISOString()
        })

    if (error) {
        console.error('Onboarding Error:', error)
        return { error: 'Failed to save profile. Please try again.' }
    }

    // Redirect to community after success
    redirect('/community')
}
