'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const nickname = formData.get('nickname') as string
    const visa_type = formData.get('visa_type') as string
    const visa_expiry_date = formData.get('visa_expiry_date') as string
    const nationality = formData.get('nationality') as string

    const updates = {
        nickname,
        visa_type,
        visa_expiry_date,
        nationality,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

    if (error) {
        console.error('Error updating profile:', error)
        return { error: 'Failed to update profile' }
    }

    revalidatePath('/community')
    revalidatePath('/visa')
    return { success: true }
}

export async function ensureProfile(userId: string, email?: string) {
    const supabase = await createClient()

    // Check if profile exists
    const { data: profile } = await supabase.from('profiles').select('id').eq('id', userId).single()

    if (profile) return true

    // Create profile if missing
    console.log(`[ensureProfile] Creating missing profile for user ${userId}`)

    const { error } = await supabase.from('profiles').insert({
        id: userId,
        email: email,
        nickname: email?.split('@')[0] || 'User',
        nationality: 'Global',
        visa_type: 'Unknown',
        created_at: new Date().toISOString()
    })

    if (error) {
        console.error('[ensureProfile] Failed to create profile:', error)
        return false
    }

    return true
}
