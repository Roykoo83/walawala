// MIR팀 협업용: DB 시딩 데이터
// Supabase Schema: public.profiles, public.posts

// 1. 프로필 시딩 데이터 (Min, Sophia + @)
export const SEED_PROFILES = [
  {
    // ID는 실제 DB Insert시 생성된 UUID로 교체 필요하거나, 미리 정해두고 사용
    id: 'user_min_uuid_placeholder', 
    email: 'min@walawala.kr',
    nickname: 'Min',
    nationality: 'Vietnam 🇻🇳',
    visa_type: 'D-2',
    avatar_url: null, // 추후 추가
  },
  {
    id: 'user_sophia_uuid_placeholder',
    email: 'sophia@walawala.kr',
    nickname: 'Sophia',
    nationality: 'China 🇨🇳',
    visa_type: 'E-7',
    avatar_url: null,
  },
  {
    id: 'user_amar_uuid_placeholder',
    email: 'amar@walawala.kr',
    nickname: 'Amar',
    nationality: 'Nepal 🇳🇵',
    visa_type: 'E-9',
    avatar_url: null,
  }
];

// 2. 게시글 시딩 데이터 (Schema: category, title, content, author_id)
export const SEED_POSTS = [
  {
    author_id: 'user_min_uuid_placeholder', // Min
    category: 'visa',
    title: 'D-2 비자 연장할 때 통장 잔고 증명 얼마나 필요한가요?',
    content: `안녕하세요, 이번에 3학년 올라가는데 비자 연장이 다가와서요.
보통 2000만원 정도 있어야 한다고 들었는데, 혹시 최근에 연장하신 분들 정확한 기준 아시나요?
그리고 부모님한테 송금받은 내역만 있으면 되는지, 제가 알바해서 모은 돈도 인정되는지 궁금합니다.
행정사 안 쓰고 혼자 해보려고 하는데 팁 좀 부탁드려요!`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder', // Min
    category: 'jobs',
    title: '편의점 알바 구할 때 한국어 능력 많이 보나요?',
    content: `지금 TOPIK 4급인데 말하기는 아직 좀 부족해요.
사장님들이 보통 면접 볼 때 어떤 거 물어보시나요?
야간 알바는 좀 더 구하기 쉽다고 하던데, 위험하지는 않을까요?
신촌 근처에서 알바 구해보신 선배님들 조언 부탁드립니다!`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder', // Sophia
    category: 'visa',
    title: 'E-7에서 F-2-7 점수제 비자 변경 성공 후기 공유합니다 🎉',
    content: `드디어 F-2 비자 받았습니다! 준비 기간만 3개월 걸렸네요.
가장 힘들었던 건 역시 소득 증명이었는데, 작년 원천징수영수증 떼는 게 회사랑 커뮤니케이션이 좀 걸렸어요.
KIIP 5단계 이수증이 점수 배점이 커서 주말반 겨우 수료한 게 신의 한 수였던 것 같습니다.
혹시 준비하시는 분들 궁금한 거 있으면 댓글 남겨주세요! 아는 선에서 답변 드릴게요.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder', // Sophia
    category: 'meetup',
    title: '강남역 근처 주말 코딩 스터디 모집합니다 (Python/React)',
    content: `안녕하세요, 판교 쪽 IT 회사 다니는 개발자입니다.
주말에 카페에서 같이 각자 공부하거나 프로젝트 하실 분 구해요.
국적 상관없고, 개발 이야기하면서 서로 동기부여 됐으면 좋겠습니다.
한국어, 영어, 중국어 다 가능해요! 
관심 있으신 분 쪽지 주세요 :)`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder', // Amar
    category: 'daily',
    title: '안산역 근처 맛있는 네팔 식당 추천해주세요',
    content: `한국 온 지 1년 됐는데 고향 음식이 너무 그립습니다.
친구들이 안산에 가면 많다고 하던데, 진짜 현지 맛 나는 곳 있나요?
주말에 가보려고 합니다. 가격도 너무 비싸지 않았으면 좋겠어요.
추천 부탁드립니다!`,
    images: []
  }
];
