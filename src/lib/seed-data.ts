// MIR팀 협업용: DB 시딩 데이터
// Supabase Schema: public.profiles, public.posts
// Last Updated: 2026-02-03 (Voice Remastered)

// 1. 프로필 시딩 데이터
export const SEED_PROFILES = [
  {
    id: 'user_min_uuid_placeholder', 
    email: 'min@walawala.kr',
    nickname: 'Min',
    nationality: 'Vietnam 🇻🇳',
    visa_type: 'D-2',
    avatar_url: null,
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

// 2. 게시글 시딩 데이터 (Voice Remastered: TOPIK Level & Cultural Nuance Applied)
export const SEED_POSTS = [
  // --- Min (TOPIK 4, Intermediate, Emotional, Emoji heavy) ---
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'visa',
    title: '선배님들~ 😭 D-2 비자 연장 잔고 증명 도와주세요! (급해요)',
    content: `안녕하세요! 이번에 3학년 올라가는데 비자 연장 때문에 머리 너무 아파요 🤯
보통 2000만원 있어야 한다는데... 이거 진짜인가요? (Troi oi.. 너무 비싸요 ㅠㅠ)
엄마가 베트남에서 송금해주신 내역만 되나요? 제가 편의점 알바해서 모은 돈은 안 쳐주나요?
행정사님은 너무 비싸서 혼자 해보고 싶은데 팁 좀 주세요 제발~~ 🙏☕️ 커피 쏠게요!`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'housing',
    title: '🏠 2026년 월세 구하기.. 전세사기 너무 무서워요 ㄷㄷ',
    content: `요즘 뉴스 보면 전세사기 이야기 너무 많아서 월세 구하기도 겁나요 ㅠㅠ
부동산 아저씨가 "외국인은 괜찮다"고 하는데 믿어도 되나요?
등기부등본? 그거 꼭 보라는데 한글 너무 어려워서 뭔 말인지 모르겠어요...
계약할 때 '특약' 넣으라는데 뭐라고 써야 해요? 보증금 지키고 싶어요 💸`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'jobs',
    title: '편의점 사장님이 한국어 못한다고 면접 떨어뜨렸어요.. 😢',
    content: `저 TOPIK 4급인데 말하기는 좀 버벅거려서...
사장님이 "손님이랑 대화 안 되면 안 된다"고 바로 탈락시켰어요. 힝...
야간 알바는 좀 괜찮을까요? 신촌 근처에서 알바 구해보신 선배님들 팁 좀!
(열심히 할 수 있는데 기회를 안 주네요 Hic hic)`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'meetup',
    title: '주말에 홍대에서 수다 떨 사람! (언어교환) ☕️',
    content: `한국어 공부하다가 머리 터질 거 같아서 놀고 싶어요 ㅋㅋ
베트남어 궁금한 분이나 그냥 한국어로 수다 떨 분?
남녀 상관없고 편하게 커피 마셔요~ 댓글 고고! 👇👇`,
    images: []
  },

  // --- Sophia (TOPIK 6, Advanced, Professional, Logical) ---
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'visa',
    title: '🚨 [속보] 2026년 E-7 비자 GNI 요건 3,112만원으로 상향 확정',
    content: `안녕하세요, 소피아입니다.
법무부 공지사항 확인 결과, 2026년 2월 1일부로 E-7 비자 발급을 위한 전년도 GNI 80% 기준이 기존 2,867만원에서 3,112만원으로 상향 조정되었습니다.
현재 연봉 협상 중이신 분들은 이 수치를 반드시 근로계약서에 반영하셔야 비자 변경/연장에 불이익이 없을 것으로 판단됩니다.
1월 31일까지 접수분은 종전 기준이 적용되니 서두르시기 바랍니다. 
필요하신 분들을 위해 공문 링크 첨부합니다.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'travel',
    title: '🏝️ 2026년 한국 숨은 여행지 분석: 안동 & 순천',
    content: `매번 서울, 부산만 방문하시는 분들께 색다른 선택지를 제안합니다.
이번 연휴에 다녀온 '안동 하회마을'은 상업화되지 않은 한국의 전통을 경험하기에 적합했습니다. (교통편은 다소 불편하니 자차 추천)
'순천만'은 생태학적 가치가 높고 사진 촬영하기에 최적의 조도였습니다.
번잡한 도시를 벗어나고 싶은 분들께 합리적인 대안이 될 것입니다.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'visa',
    title: 'E-7 → F-2-7 점수제 비자 변경 성공 사례 및 전략 공유',
    content: `드디어 F-2 거주 비자를 취득했습니다. 준비 기간은 약 3개월 소요되었습니다.
가장 큰 변수는 '소득 점수'와 '한국어 능력'이었습니다.
특히 KIIP 5단계 이수증이 점수 배점이 크므로, 직장인이라도 주말반을 통해 반드시 이수하실 것을 권장합니다.
궁금하신 점 댓글 남겨주시면 아는 범위 내에서 답변 드리겠습니다. (祝好!)`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'meetup',
    title: '강남역 주말 Python/React 스터디원 모집 (중급 이상)',
    content: `판교 소재 IT 기업 재직 중입니다.
실무 위주의 코드 리뷰와 사이드 프로젝트를 진행할 스터디원을 모집합니다.
국적 불문이나, 기술적 소통이 원활해야 합니다. (한국어/영어/중국어 가능)
관심 있으신 분은 깃허브 링크와 함께 쪽지 부탁드립니다.`,
    images: []
  },

  // --- Amar (TOPIK 2, Beginner, Polite but simple, Authentic) ---
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'daily',
    title: '쓰레기 봉투 색깔 몰라요. 도와주세요.',
    content: `안녕하세요. 저는 안산 사는 아마르입니다.
마포구 살다가 이사 왔어요. 근데 쓰레기 봉투 색깔 달라요?
편의점 아저씨가 이거 아니라고 화냈어요... 무서웠어요.
재활용 어떻게 해요? 한국 너무 어려워요. (Namaste 🙏)`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'daily',
    title: '네팔 음식 먹고 싶어요. 식당 추천해주세요.',
    content: `한국 온 지 1년 됐습니다. 고향 음식 그립습니다.
친구들이 안산역 가면 많다고 했습니다.
진짜 맛있는 곳 있습니까? 가격 싼 곳 좋아요.
주말에 친구랑 갑니다. 감사합니다.`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'jobs',
    title: '퇴직금 계산 궁금합니다.',
    content: `공장에서 1년 10개월 일했습니다. 이제 그만둡니다.
월급 280만원입니다. 퇴직금 얼마 받아요?
사장님이 보험 이야기 하는데 무슨 말인지 모릅니다.
도와주세요 형님들.`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'daily',
    title: '난방비 너무 비싸요... 추워요.',
    content: `가스비 15만원 나왔습니다. 깜짝 놀랐습니다.
네팔보다 한국 더 추워요.
보일러 어떻게 쓰면 싸요? '외출' 눌러요?
돈 아껴야 고향에 보냅니다. 알려주세요.`,
    images: []
  },

  // --- Mixed Personas (Adding Variety) ---
  // English Speaker (Awkward Korean Translation)
  {
    author_id: 'user_sophia_uuid_placeholder', // Placeholder ID re-use for variation
    category: 'daily',
    title: 'Hi guys! 토스 뱅크 외국인 만들 수 있나요?',
    content: `Hello! 질문이 있습니다.
Kakao Bank는 있는데 Toss Bank 만들고 싶어요.
근데 외국인은 안 된다고 들었어요. (Is it true?)
혹시 성공한 사람 있나요? Please let me know!`,
    images: []
  },
  // Koryo-saram (Uzbekistan - Distinct tone)
  {
    author_id: 'user_min_uuid_placeholder', // Placeholder ID re-use
    category: 'visa',
    title: 'H-2 비자 변경 관련 문의드림다.',
    content: `안녕하심까. 저는 우즈벡에서 온 고려인입니다.
이번에 F-4로 변경하고 싶은데 자격증 뭐가 필요합니까?
현장에서 일하고 있는데 시간이 별로 없슴다.
빠른 방법 아시는 분 답변 부탁드림다.`,
    images: []
  },
  // Urgent/Panic Mode (Short sentences)
  {
    author_id: 'user_min_uuid_placeholder', 
    category: 'visa',
    title: '여권 잃어버렸어요!!! ㅠㅠㅠ',
    content: `어떡해요?? 술 마시다가 가방 잃어버렸어요 ㅠㅠ
여권이랑 외국인등록증 다 들어있는데...
당장 신고해야 하나요? 추방당하는 거 아니죠?
진짜 미치겠네... 아시는 분 제발요 ㅠㅠ`,
    images: []
  },
  
  // --- Continuing with Batch to reach 50 ---
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'visa',
    title: '😰 D-10 구직비자 2차 연장... 거절될까봐 떨려요',
    content: `6개월 지났는데 아직 취업 못했어요 ㅠㅠ (죄송해요 엄마..)
이번에 2차 연장하러 가는데 사람인 이력서만 가져가도 될까요?
담당자가 깐깐하면 안 해준다는데...
팁 있나요? 웃으면서 하면 될까요? ㅎㅎ`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'visa',
    title: 'F-2-7 점수 계산 시 한국어 유효기간 관련 팩트 체크',
    content: `TOPIK 성적 유효기간(2년)이 만료된 경우, 점수 인정이 불가합니다.
단, 사회통합프로그램(KIIP) 사전평가 점수는 유효기간이 없으므로 대체 가능할 수 있습니다.
정확한 건 1345에 확인해봤는데 상담원마다 말이 다르네요.
최근 규정집 확인해보신 분 계신가요?`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'jobs',
    title: '사장님이 자꾸 욕해요. 신고 돼요?',
    content: `일 못한다고 욕합니다. '야' 라고 합니다.
기분 나쁩니다. 머리 아파요.
녹음했습니다. 노동청 가면 처벌 됩니까?
사업장 바꾸고 싶습니다.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'jobs',
    title: '프리랜서 3.3% 세금 환급 (종합소득세) 신청 방법',
    content: `5월은 종합소득세 신고의 달입니다.
작년에 아르바이트나 프리랜서로 일하고 3.3% 떼인 분들, '삼쩜삼'이나 홈택스에서 꼭 조회해보세요.
저는 작년에 15만원 돌려받았습니다. (치킨 7마리 이득! 🍗)
외국인도 가능하니 놓치지 마세요.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'daily',
    title: '다이소 5000원 꿀템 추천해드림!! 👍',
    content: `자취생 여러분 다이소는 사랑입니다 ❤️
1. 돌돌이 (머리카락 청소 끝판왕)
2. 전자레인지 밥 용기 (햇반 사지 마세요 비싸요)
3. 발 매트 (귀여움)
또 뭐 사야 돼요? 댓글로 추천 고고!`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'daily',
    title: '한국 미용실 너무 비싸요 ㅠㅠ 커트가 25,000원?',
    content: `남자 커트인데 25,000원 달래요... 베트남에선 2천원이면 하는데 ㅠㅠ
블루클럽 가라는데 거긴 좀 무섭고... ㅋㅋ
신촌 근처 싸고 잘하는 곳 없나요? 유학생 할인 되는 곳!!`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'housing',
    title: '이사 가려면 묵시적 갱신 주의하세요 (법적 조언)',
    content: `계약 만료 2개월 전까지 통보 안 하면 자동으로 동일 조건 연장됩니다(묵시적 갱신).
이 경우 해지 통보 후 3개월 뒤에 효력이 발생해서, 당장 이사 가고 싶어도 월세 3달치 더 내야 할 수도 있어요.
꼭 문자나 통화 녹음으로 "재계약 안 합니다" 증거 남기세요.`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'housing',
    title: '관리비 5만원 비싸요?',
    content: `월세 50에 관리비 5만원입니다.
근데 전기세 가스비 따로 냅니다.
관리비는 청소비랑 인터넷만 포함이라고 합니다.
원래 한국 다 이렇습니까? 친구는 관리비 없다고 합니다.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'travel',
    title: '🌸 서울 벚꽃 명소 추천 (여의도 제외)',
    content: `여의도는 사람이 너무 많아서 꽃보다 사람 구경 하게 됩니다.
개인적으로 추천하는 곳:
1. 안양천 (길게 뻗어서 산책하기 좋음)
2. 서울숲 (사슴도 보고 피크닉 가능)
3. 정독도서관 (고즈넉한 분위기)
이번 주말이 절정일 것 같네요. 카메라 챙기세요! 📸`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'meetup',
    title: '배드민턴 치실 분?! 🏸 (초보 환영)',
    content: `저 진짜 못 치는데 운동은 하고 싶어서요 ㅋㅋ
강남이나 서초 쪽에서 같이 칠 분 구해요!
라켓은 제가 빌려드릴 수 있어요~
끝나고 치맥도 해요! 🍻`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'travel',
    title: '겨울 스키장 싸게 가는 법 있나요? 🏂',
    content: `친구들이랑 스키장 가고 싶은데 비발디파크 너무 비싸요 ㅠㅠ
리프트권 할인받는 법 아시는 분?
셔틀버스 공짜인 곳 추천해주세요! (학생이라 돈이 없어요 흑흑)`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'travel',
    title: '추석에 갈 곳 추천해주세요.',
    content: `공장 4일 쉽니다. 근데 갈 곳이 없습니다.
친구들 다 고향 갔거나 여행 갔습니다.
서울 구경 가고 싶은데 문 엽니까?
경복궁 무료라고 들었습니다. 맞습니까?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'meetup',
    title: '독립영화 좋아하시는 분 계신가요? 🎬',
    content: `홍대 상상마당이나 아트하우스 모모 자주 갑니다.
상업 영화 말고 잔잔한 영화 보고 이야기 나누는 거 좋아해요.
이번 주말에 '패스트 라이브즈' 같이 보러 가실 분 쪽지 주세요.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'travel',
    title: '제주도 비행기 표 언제 제일 싸요?',
    content: `방학 때 가려고 보니까 왕복 20만원... ㄷㄷ
화요일 출발이 싸다는데 맞나요?
특가 뜨는 앱 따로 있나요? 알려주시면 사랑합니다 🫶`,
    images: []
  },
  // Adding more variations to fill up...
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'housing',
    title: '전입신고의 중요성 (보증금 보호)',
    content: `집주인이 세금 문제로 전입신고 하지 말라고 하는 경우가 있습니다.
월세 깎아준다고 해도 절대 동의하지 마세요.
집이 경매로 넘어가면 보증금 한 푼도 못 받습니다. (대항력 상실)
법적 보호가 최우선입니다.`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'daily',
    title: '치킨 뼈 음식물 쓰레기 아닙니까?',
    content: `어제 쓰레기 버리는데 경비 아저씨한테 혼났습니다.
치킨 뼈는 일반 쓰레기라고 합니다.
계란 껍질도 일반입니까? 너무 헷갈립니다.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'jobs',
    title: '이력서 사진 셀카로 내면 안 되나요? ㅋㅋ',
    content: `사진관 가기 귀찮아서... 그냥 잘 나온 셀카 포토샵 해서 내면 안 될까요?
한국 친구들이 절대 안 된다고 기겁하네요 ㅋㅋ
역시 정장 입고 찍어야겠죠? ㅠㅠ 귀찮아...`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'jobs',
    title: '한국 회식 문화 질문 (술 강요?)',
    content: `다음 주부터 출근인데 회식이 잡혔습니다.
저 술을 아예 못 마시는데, 요즘도 강요하는 분위기인가요?
"사이다 마시겠습니다" 하면 예의 없어 보일까요?
IT 회사라 좀 자유로울 것 같긴 한데... 걱정되네요.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'jobs',
    title: '택배 상하차 알바 후기... (절대 하지 마세요)',
    content: `돈 급해서 하루 갔다 왔는데 몸살 났어요 🤕
허리 끊어지는 줄... 병원비가 더 나오겠어요.
유학생 여러분 그냥 편의점 하세요... 상하차는 지옥입니다. (살려줘)`,
    images: []
  }
];