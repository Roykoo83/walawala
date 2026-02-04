'use server'

import { createClient } from '@/utils/supabase/server'
import { generate100Personas } from '@/utils/generate-personas'

const SEED_POST_TEMPLATES = [
  { category: 'Visa', title: 'F-2-7 점수 계산기 돌려보신 분?', content: '이번에 소득 요건이 강화되어서 점수가 깎였네요 ㅠㅠ 다들 어떻게 점수 채우시나요?' },
  { category: 'Visa', title: 'E-9에서 E-7-4로 변경 성공했습니다!', content: '드디어 변경 허가가 났어요! 준비 과정 궁금하신 분들 댓글 남겨주시면 알려드릴게요.' },
  { category: 'Life', title: '안산 근처 맛있는 네팔 음식점 추천', content: '역 근처에 진짜 현지 맛 나는 곳 발견했어요. 주말에 같이 가실 분?' },
  { category: 'Life', title: '한국 건강보험료 너무 비싸지 않나요?', content: '유학생인데 이번에 보험료가 또 올랐네요. 혜택은 좋은데 부담되긴 해요.' },
  { category: 'Job', title: '한국어 잘하는 베트남어 통역사 구합니다', content: '단기 박람회 통역이고 페이는 협의 가능해요. 쪽지 주세요!' },
  { category: 'Job', title: 'IT 기업 면접 후기 (D-10 비자)', content: '기술 면접은 통과했는데 비자 스폰서십 이야기 나오니까 분위기가 좀 차가워지네요...' },
  { category: 'Meetup', title: '이번 주말 한강 피크닉 가요!', content: '다양한 나라 친구들 사귀고 싶어요. 각자 나라 음식 하나씩 가져오기!' },
  { category: 'Meetup', title: 'TOPIK 6급 스터디 모집 (강남역)', content: '고급 어휘 위주로 같이 공부하실 분들 모집합니다. 빡세게 하실 분만!' }
];

const COMMENT_TEMPLATES = [
  "좋은 정보 감사합니다! 👍",
  "와 진짜 대단하시네요. 축하드려요!",
  "저도 같은 고민 중인데 혹시 쪽지 드려도 될까요?",
  "대박... 저도 알려주세요!",
  "정보 공유 감사합니다. 큰 도움이 됐어요.",
  "오 저도 거기 가봤는데 진짜 좋더라구요 ㅎㅎ",
  "화이팅입니다! 할 수 있어요!",
  "오늘도 유익한 글 잘 보고 갑니다~"
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedVirtualResidents() {
  const supabase = await createClient()
  const personas = generate100Personas()
  const { error } = await supabase.from('profiles').upsert(personas, { onConflict: 'email' })
  if (error) return { success: false, error: error.message }
  return { success: true, count: personas.length }
}

export async function seedFullContents() {
  const supabase = await createClient()
  
  // 1. 100명의 주민 확보 (Upsert)
  const personas = generate100Personas()
  const { data: residents, error: resError } = await supabase
    .from('profiles')
    .upsert(personas, { onConflict: 'email' })
    .select('id')

  if (resError || !residents) return { success: false, error: resError?.message }
  const residentIds = residents.map(r => r.id)

  // 2. 50개 게시글 주입
  const postsToInsert = []
  for (let i = 0; i < 50; i++) {
    const template = getRandomElement(SEED_POST_TEMPLATES)
    postsToInsert.push({
      author_id: getRandomElement(residentIds),
      category: template.category,
      title: `${template.title} #${i + 1}`,
      content: template.content,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  const { data: createdPosts, error: postError } = await supabase
    .from('posts')
    .insert(postsToInsert)
    .select('id')

  if (postError || !createdPosts) return { success: false, error: postError?.message }

  // 3. 인터랙션 (좋아요, 댓글) 주입
  const likesToInsert: any[] = []
  const commentsToInsert: any[] = []

  for (const post of createdPosts) {
    const interactionCount = Math.floor(Math.random() * 8) + 3 // 3~10개
    const shuffledResidents = [...residentIds].sort(() => 0.5 - Math.random())
    const participants = shuffledResidents.slice(0, interactionCount)

    participants.forEach((userId, index) => {
      // 좋아요 추가 (80% 확률)
      if (Math.random() > 0.2) {
        likesToInsert.push({ user_id: userId, post_id: post.id })
      }
      // 댓글 추가 (50% 확률)
      if (Math.random() > 0.5) {
        commentsToInsert.push({
          author_id: userId,
          post_id: post.id,
          content: getRandomElement(COMMENT_TEMPLATES),
          created_at: new Date().toISOString()
        })
      }
    })
  }

  if (likesToInsert.length > 0) {
    await supabase.from('likes').insert(likesToInsert).select()
  }
  if (commentsToInsert.length > 0) {
    await supabase.from('comments').insert(commentsToInsert)
  }

  return {
    success: true,
    residents: residentIds.length,
    posts: createdPosts.length,
    likes: likesToInsert.length,
    comments: commentsToInsert.length
  }
}
