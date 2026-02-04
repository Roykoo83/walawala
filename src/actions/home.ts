'use server'

import { createClient } from '@/utils/supabase/server'
import { getPostsWithCounts } from './post'
import { differenceInDays, parseISO } from 'date-fns'

export interface HomeData {
  user: any
  profile: any
  visaStatus: {
    type: string
    dDay: number
    isUrgent: boolean
    text: string
  } | null
  posts: any[]
  recommendedRoadmap: any | null
}

export async function getHomeData(): Promise<HomeData> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // 1. Get User Profile
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  // 2. Visa Status Logic
  let visaStatus = null
  if (profile?.visa_expiry_date) {
    const dDay = differenceInDays(parseISO(profile.visa_expiry_date), new Date())
    visaStatus = {
      type: profile.visa_type,
      dDay,
      isUrgent: dDay <= 90,
      text: dDay < 0 ? `Expired` : `D-${dDay}`
    }
  }

  // 3. Get Posts (Personalized Filter can be added here)
  const posts = await getPostsWithCounts(user?.id)

  // 4. Roadmap Recommendation (Mockup Logic based on Visa Type)
  let recommendedRoadmap = null
  if (profile?.visa_type === 'D-2') {
    recommendedRoadmap = {
      title: 'Graduate & Job Seeking',
      steps: ['D-2', 'D-10', 'E-7', 'F-2'],
      currentStep: 0
    }
  } else if (profile?.visa_type === 'E-9') {
    recommendedRoadmap = {
      title: 'Skilled Worker Visa',
      steps: ['E-9', 'E-7-4', 'F-2-99'],
      currentStep: 0
    }
  }

  return {
    user,
    profile,
    visaStatus,
    posts,
    recommendedRoadmap
  }
}
