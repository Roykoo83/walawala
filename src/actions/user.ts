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

  // 1. 프로필 및 관련 데이터 병렬 조회
  const [profileResult, postsResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single(),
    supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  if (profileResult.error) {
    return { error: '프로필을 불러올 수 없습니다.' }
  }

  const profile = profileResult.data
  const posts = postsResult.data || []

  // 2. 비자 알림 로직 (Personalization)
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

  // 3. 로드맵 추천 로직 (Simple Rule-based)
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
    // Default Roadmap
    roadmap = [
      { step: 1, title: '비자 정보 등록', status: 'current', description: '현재 비자 상태를 입력하세요' },
      { step: 2, title: '목표 설정', status: 'upcoming', description: '최종 정착 목표를 설정하세요' },
    ]
  }

  // 4. 관련 게시글 필터링 (In-memory filtering for better relevance if DB filter is weak)
  // 실제로는 DB 쿼리 레벨에서 필터링하는 것이 좋음. 여기서는 예시로 작성.
  const relevantPosts = posts.filter(post => {
    if (!profile.nationality && !profile.visa_type) return true;
    // 간단한 매칭 로직: 제목이나 내용에 국적/비자가 포함되면 우선순위 (실제 검색엔진 아님)
    return true; 
  })

  return {
    profile,
    notifications,
    relatedPosts: relevantPosts,
    roadmap
  }
}
