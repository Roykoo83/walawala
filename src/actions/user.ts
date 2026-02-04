'use server'

import { createClient } from '@/utils/supabase/server'
import { addDays, differenceInDays, format } from 'date-fns'

export interface HomeData {
  profile: any;
  notifications: Array<{
    type: 'warning' | 'info' | 'success';
    message: string;
    dDay?: number;
  }>;
  relatedPosts: any[];
  recommendedResidents: any[]; // 추가: 추천 이웃 (가상 주민)
  roadmap: Array<{
    step: number;
    title: string;
    status: 'completed' | 'current' | 'upcoming';
    description: string;
  }>;
}

export async function getHomeData(): Promise<HomeData | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다.' }
  }

  // 1. 프로필, 관련 게시글, 추천 이웃 데이터를 병렬 조회
  const [profileResult, postsResult, residentsResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single(),
    supabase
      .from('posts')
      .select('*, profiles(nickname, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(10), // 피드를 위해 더 많은 게시글 페칭
    supabase
      .from('profiles')
      .select('id, nickname, avatar_url, nationality, visa_type')
      .neq('id', user.id) // 본인 제외
      .limit(20) // 랜덤 추출을 위한 후보군
  ])

  if (profileResult.error) {
    return { error: '프로필을 불러올 수 없습니다.' }
  }

  const profile = profileResult.data
  const allPosts = postsResult.data || []
  const allResidents = residentsResult.data || []

  // 2. 추천 이웃 무작위 추출 (Shuffle)
  const recommendedResidents = allResidents
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)

  // 3. 게시글 무작위 섞기 (홈 화면의 다양성을 위해)
  const relatedPosts = allPosts
    .sort(() => 0.5 - Math.random())
    .slice(0, 6)

  // 4. 비자 알림 로직 (Personalization)
  const notifications: HomeData['notifications'] = []
  
  if (profile.visa_expiry_date) {
    const today = new Date()
    const expiryDate = new Date(profile.visa_expiry_date)
    const dDay = differenceInDays(expiryDate, today)

    if (dDay <= 90 && dDay > 0) {
      notifications.push({
        type: 'warning',
        message: `비자 만료가 ${dDay}일 남았습니다. 갱신 서류를 준비하세요.`,
        dDay
      })
    } else if (dDay <= 0) {
      notifications.push({
        type: 'warning',
        message: '비자가 만료되었습니다. 체류 자격을 확인하세요.',
        dDay
      })
    }
  } else {
    notifications.push({
      type: 'info',
      message: '비자 만료일을 등록하고 맞춤 알림을 받아보세요.',
    })
  }

  // 5. 로드맵 추천 로직
  let roadmap: HomeData['roadmap'] = []
  const currentVisa = profile.visa_type || 'Unknown'
  const target = profile.target_visa || 'F-2'

  if (currentVisa.startsWith('D-2')) {
    roadmap = [
      { step: 1, title: 'D-2 유학', status: 'current', description: '학점 관리 및 TOPIK 취득' },
      { step: 2, title: 'D-10 구직', status: 'upcoming', description: '인턴십 및 취업 준비' },
      { step: 3, title: 'E-7 전문취업', status: 'upcoming', description: '정규직 취업 성공' },
      { step: 4, title: target, status: 'upcoming', description: '점수제 거주 비자 취득' },
    ]
  } else if (currentVisa.startsWith('E-9')) {
    roadmap = [
      { step: 1, title: 'E-9 비전문취업', status: 'current', description: '성실 근로 및 한국어 학습' },
      { step: 2, title: 'E-7-4 숙련기능', status: 'upcoming', description: '점수 요건 충족 및 전환 신청' },
      { step: 3, title: target, status: 'upcoming', description: '장기 체류 자격 획득' },
    ]
  } else {
    roadmap = [
      { step: 1, title: '비자 정보 등록', status: 'current', description: '현재 비자 상태를 입력하세요' },
      { step: 2, title: '목표 설정', status: 'upcoming', description: '최종 정착 목표를 설정하세요' },
    ]
  }

  return {
    profile,
    notifications,
    relatedPosts,
    recommendedResidents,
    roadmap
  }
}
