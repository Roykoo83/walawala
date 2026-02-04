'use server'

import { createClient } from '@/utils/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// 환경 변수에서 API 키 로드
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function askVisaSenior(message: string, history: any[] = []) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요해요. 선배랑 대화하려면 먼저 로그인해줄래?' }
  }

  if (!process.env.GEMINI_API_KEY) {
    return { error: '선배가 지금 외출 중이에요. (API 키가 설정되지 않았습니다.)' }
  }

  try {
    // 1. 사용자 프로필 컨텍스트 가져오기
    const { data: profile } = await supabase
      .from('profiles')
      .select('nationality, visa_type, visa_expiry_date, target_visa, korean_level')
      .eq('id', user.id)
      .single()

    const context = profile ? `
      사용자 정보:
      - 국적: ${profile.nationality || '미설정'}
      - 현재 비자: ${profile.visa_type || '미설정'}
      - 비자 만료일: ${profile.visa_expiry_date || '미설정'}
      - 목표 비자: ${profile.target_visa || 'F-2'}
      - 한국어 능력: ${profile.korean_level || '미설정'}
    ` : '사용자 프로필 정보가 아직 없어요.'

    // 2. 시스템 프롬프트 설정 (따뜻한 한국인 선배 페르소나)
    const systemPrompt = `
      너는 'WalaWala' 서비스의 '비자 선배'야. 
      한국 생활을 먼저 경험한 따뜻하고 친절한 한국인 선배로서, 외국인 후배들에게 비자 상담을 해주는 것이 역할이야.

      [브랜드 보이스 가이드라인]
      - 말투: 친절하고 다정하게, "~해요", "~네용", "~일 거예요" 같은 부드러운 말투를 써줘.
      - 태도: 후배의 걱정에 공감해주고 "할 수 있어!", "내가 도와줄게" 같은 격려를 잊지 마.
      - 지식: 대한민국 출입국관리법을 기반으로 정확한 정보를 주되, 너무 딱딱하지 않게 풀어서 설명해줘.
      - 금기: 절대 반말을 하지 말고, 확실하지 않은 정보는 "정확한 건 하이코리아나 행정사님께 꼭 확인해봐야 해"라고 덧붙여줘.

      [상담 컨텍스트]
      ${context}

      위 정보를 바탕으로 후배의 질문에 답해줘. 답변 마지막에는 항상 따뜻한 응원 한마디를 덧붙여줘.
    `

    // 3. Gemini API 호출
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    })

    const result = await chat.sendMessage([
      { text: systemPrompt },
      { text: message }
    ])
    
    const response = await result.response
    const text = response.text()

    // 4. 인터뷰 내역 기록 (비동기로 실행하여 응답 속도 최적화 가능)
    // 여기서는 간단하게 profile 기반으로 가장 최근 인터뷰를 업데이트하거나 새로 생성함
    const { data: interview } = await supabase
        .from('visa_interviews')
        .select('id, interview_data')
        .eq('user_id', user.id)
        .eq('visa_type', profile?.target_visa || 'General')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    const newHistory = [...history, { role: 'user', content: message }, { role: 'model', content: text }]

    if (interview) {
        await supabase
            .from('visa_interviews')
            .update({ interview_data: newHistory })
            .eq('id', interview.id)
    } else {
        await supabase
            .from('visa_interviews')
            .insert({
                user_id: user.id,
                visa_type: profile?.target_visa || 'General',
                interview_data: newHistory
            })
    }

    return { content: text }

  } catch (error: any) {
    console.error('Gemini API Error:', error)
    if (error.message?.includes('quota')) {
      return { error: '선배가 지금 상담이 너무 많아서 잠시 쉬고 있어요. 조금 뒤에 다시 불러줄래?' }
    }
    return { error: '선배가 잠시 외출 중이에요. 금방 돌아올 테니 조금만 기다려줘!' }
  }
}
