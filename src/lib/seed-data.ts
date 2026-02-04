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
  // --- 2026 Real-World Data Based Posts (Added) ---
  {
    author_id: 'user_sophia_uuid_placeholder', // Sophia
    category: 'travel',
    title: '🏝️ 2026년 한국 숨은 여행지 추천: 안동 & 순천 (서울 근교 말고!)',
    content: `매번 서울, 부산만 가는 친구들에게 추천해요!
이번 연휴에 다녀왔는데 '안동 하회마을'은 진짜 고즈넉하고 힐링됩니다. 편의점도 없는 진짜 시골 느낌? 📸
그리고 '순천만' 갈대밭도 지금 딱 예뻐요. KTX 타고 3시간이면 가니까 주말에 도전해보세요.
사람 너무 많은 핫플보다 이런 곳이 진짜 한국 느낌 나는 것 같아요.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder', // Min
    category: 'housing',
    title: '🏠 2026년 월세 구할 때 필수 체크! (전세사기 조심)',
    content: `요즘 서울 월세 구하기 진짜 힘드네요 ㅠㅠ
부동산 아저씨가 말해줬는데, 2026년부터는 외국인도 집 살 때 거주 요건이 까다로워졌대요.
우리는 월세 구하는 거지만, 집주인이 융자(Loan) 얼마나 있는지 꼭 등기부등본 확인하세요!
계약하기 전에 '특약' 넣는 거 잊지 마시고요. 보증금 절대 지켜!! 💸`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder', // Sophia
    category: 'visa',
    title: '🚨 [속보] 2026년 E-7 비자 연봉 기준 3,112만원으로 인상 확정',
    content: `다들 소식 들으셨나요? 
2026년 2월 1일부터 E-7 비자 발급을 위한 GNI 80% 기준 연봉이 3,112만원으로 오른다고 합니다.
기존 2,867만원에서 꽤 많이 올랐어요. 
지금 연봉 협상 시즌인 분들 이거 꼭 캡쳐해서 회사랑 이야기하세요!
1월 31일까지 접수하면 기존 기준 적용된다고 하니 서두르세요!`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder', // Amar
    category: 'daily',
    title: '🗑️ 이사 왔는데 쓰레기 봉투 색깔이 달라요? (벌금 조심)',
    content: `옆 동네(마포구)에서 서대문구로 이사 왔는데, 쓰레기 봉투 색깔이 다르네요?
편의점 갔더니 구마다 봉투가 다르대요! 
모르고 예전 동네 봉투 썼다가 수거 안 해가서 난감했습니다 😅
재활용도 깨끗이 씻어서 투명 봉투에 넣어야 한대요. 벌금 물지 않게 조심하세요!`,
    images: []
  },
  // ------------------------------------------------
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
  },
  // --- Content Factory Batch 2: Quantity Boost (31+ Posts) ---
  // Visa & Immigration (8)
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'visa',
    title: '😰 D-10 구직비자 2차 연장 거절될까봐 너무 무서워요',
    content: `벌써 6개월이 지났는데 아직 취업을 못했어요. 
이번에 2차 연장 신청하러 가는데, 구직 활동 증명서에 사람인 지원 내역만 뽑아가도 될까요?
담당자마다 다르다는 말이 있어서... 혹시 팁 있으신 분?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'visa',
    title: '💡 F-2-7 점수 계산할 때 한국어 능력 유효기간 있나요?',
    content: `TOPIK 성적표가 2년 지났는데, 사회통합프로그램(KIIP) 사전평가로 퉁칠 수 있나요?
점수가 간당간당해서 이거 인정 안 되면 큰일이라서요.
최근에 신청해보신 분 확인 부탁드려요!`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'visa',
    title: '여권 잃어버려서 재발급 받았는데 출입국에 신고해야 하나요?',
    content: `지난주에 여권 잃어버려서 대사관 가서 새로 받았습니다.
비자 스티커는 옛날 여권에 있는데, 이거 하이코리아에 따로 신고해야 하나요?
아니면 공항 가서 그냥 새 여권 보여주면 되나요?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'visa',
    title: '📝 하이코리아 방문 예약 꿀팁 공유합니다 (서울남부출입국)',
    content: `요즘 예약 진짜 빡세네요. 아침 9시 땡 하고 들어갔는데 대기 500명 실화?
팁 드리자면, 취소표는 보통 점심시간(12시~1시)이나 밤 11시에 종종 나옵니다.
급하신 분들 포기하지 말고 계속 새로고침 해보세요!`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'visa',
    title: '시간제 취업 허가(S-3) 안 받고 알바하다 걸리면 어떻게 되나요?',
    content: `친구가 급하게 며칠만 도와달라고 해서 했는데, 사장님이 신고한다고 협박해요 ㅠㅠ
현금으로 받았는데도 걸릴 수 있나요? 너무 무섭습니다.
혹시 벌금 얼마나 나오는지 아시는 분?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'visa',
    title: '👨‍👩‍👧 부모님 초청(F-1) 비자 소득 요건 질문',
    content: `부모님 한국에 모셔오고 싶은데, 제 연봉이 GNI 2배가 안 됩니다.
혹시 자산(전세 보증금)으로 소득 요건 대체 가능한가요?
행정사님은 반반이라고 하는데... 성공하신 분 있나요?`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'visa',
    title: 'E-9에서 E-7-4 변경 점수제 커트라인',
    content: `이번 분기 쿼터 얼마나 남았나요?
제 점수가 68점인데 가능성 있을까요?
뿌리산업 가점 받으면 70점 넘는데, 사장님이 추천서 써줄지 모르겠네요.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'visa',
    title: '외국인 등록증(ARC) 영문 이름 변경 가능한가요?',
    content: `여권이랑 등록증 스펠링이 한 글자 달라서 은행에서 자꾸 거절당해요.
이거 바꾸려면 수수료 드나요? 사진도 새로 가져가야 하나요?`,
    images: []
  },

  // Jobs & Part-time (8)
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'jobs',
    title: '😤 알바 주휴수당 안 준다고 하는데 신고 가능?',
    content: `주말 편의점 알바인데 주 15시간 넘게 일하거든요.
사장님이 "수습기간이라 없다"고 하는데 이거 불법 아닌가요?
노동청 신고하면 비자에 문제 생길까 봐 걱정돼요.`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'jobs',
    title: '퇴직금(Severance Pay) 계산 도와주세요',
    content: `공장에서 1년 10개월 일하고 그만둡니다.
월급이 280만원인데 퇴직금 대충 얼마나 나올까요?
사장님이 출국만기보험? 그거 신청하라고 하는데 그게 퇴직금인가요?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'jobs',
    title: '💼 한국 회사 면접 꿀팁! (복장, 질문)',
    content: `내일 첫 한국 회사 면접입니다! IT 스타트업인데 정장 입어야 하나요?
그리고 "마지막으로 하고 싶은 말" 물어볼 때 뭐라 하는 게 좋을까요?
너무 떨려요 응원 부탁드립니다!`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'jobs',
    title: '5월 종합소득세 신고, 프리랜서는 필수인가요?',
    content: `작년에 잠깐 번역 알바하고 3.3% 떼고 받았는데,
이거 5월에 신고하면 환급받을 수 있나요?
홈택스 들어가봤는데 너무 복잡해서 포기 직전입니다...`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'jobs',
    title: '이력서 사진 꼭 정장 입고 찍어야 하나요?',
    content: `한국 친구들이 이력서 사진 중요하다고 해서요.
그냥 깔끔한 셔츠 입고 셀카 찍어서 올리면 광탈인가요?
사진관 추천 좀 해주세요 (홍대/신촌)`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'jobs',
    title: '사장님이 욕을 너무 많이 해요...',
    content: `일 못한다고 뭐라 하는 건 이해하는데 자꾸 욕을 섞어서 합니다.
녹음해서 신고하면 처벌 가능한가요?
사업장 변경 사유 되나요? 스트레스 받아서 머리 빠져요.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'jobs',
    title: '한국 회사 회식 문화, 아직도 술 강요하나요?',
    content: `입사 확정됐는데 회식이 걱정입니다. 저 술 아예 못 마시거든요.
요즘은 강요 안 한다고 듣긴 했는데...
"사이다 마시겠습니다" 해도 분위기 안 깨질까요?`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'jobs',
    title: '야간 택배 상하차 알바 후기 (비추천 ❌)',
    content: `돈 급해서 하루 다녀왔는데 진짜 죽는 줄 알았습니다.
허리 끊어지는 줄... 약값이 더 나올 것 같아요.
유학생분들 절대 하지 마세요. 차라리 홀서빙 하세요 ㅠㅠ`,
    images: []
  },

  // Daily Life & Tips (8)
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'daily',
    title: '💊 주말에 문 여는 약국 찾는 법 (휴일지킴이약국)',
    content: `갑자기 배가 너무 아픈데 일요일이라 문 연 곳이 없네요.
편의점 약은 안 듣고... 
'휴일지킴이약국' 사이트 들어가면 문 연 곳 검색됩니다! 
모르시는 분들 참고하세요.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'daily',
    title: '다이소 꿀템 추천: 5000원의 행복',
    content: `자취 시작한 분들 다이소 꼭 가세요.
1. 돌돌이 (머리카락 청소 필수)
2. 전자레인지 용기 (밥 얼려두기 좋음)
3. 발 매트
또 추천할 거 있나요?`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'daily',
    title: '겨울 난방비 폭탄... 온돌 어떻게 써야 싸요?',
    content: `저번 달 가스비 15만원 나왔어요 미쳤나봐요 ㅠㅠ
'외출' 모드로 해두는 게 싼가요 아니면 껐다 켜는 게 싼가요?
한국 겨울 너무 춥고 비싸요...`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'daily',
    title: '🚅 KTX 예매 꿀팁: 힘내라 청춘 할인',
    content: `만 25세에서 33세 사이라면 '힘내라 청춘' 등록하세요!
최대 40%까지 할인됩니다. 
부산 갈 때 3만원대에 끊었어요. 코레일톡 앱에서 신청 가능!`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'daily',
    title: '알뜰폰 유심(SIM)으로 갈아탔는데 반값이에요',
    content: `SKT 쓰다가 알뜰폰으로 바꿨는데 데이터 무제한이 2만원대...
통화 품질 똑같고 약정도 없어서 너무 좋습니다.
편의점에서 유심 사서 바로 개통 가능해요!`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'daily',
    title: '음식물 쓰레기에 치킨 뼈 넣으면 안 되나요?',
    content: `아저씨가 봉투 뜯어보고 화내셨어요...
치킨 뼈, 달걀 껍질, 양파 껍질은 '일반 쓰레기'래요!
저만 몰랐나요? 벌금 물 뻔했습니다 휴.`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'daily',
    title: '한국 미용실 너무 비싸요... 커트 25,000원?',
    content: `남자 커트인데 25,000원 달라고 해서 깜짝 놀랐습니다.
블루클럽 가라는데 거긴 좀 그렇고...
학교 앞 저렴하고 잘 자르는 곳 추천 좀 해주세요.`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'daily',
    title: '당근마켓 무료나눔 받았습니다! 🥕',
    content: `전자레인지 필요했는데 무료나눔으로 득템했어요!
한국 사람들 진짜 정이 많은 것 같아요.
박카스 한 박스 사들고 가서 인사드렸습니다. 당근 최고!`,
    images: []
  },

  // Housing (5)
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'housing',
    title: '🚪 자취방 곰팡이 제거 어떻게 하시나요?',
    content: `반지하라서 그런지 여름 되니까 벽지에 곰팡이가...
락스 뿌려도 계속 생겨요. 제습기 사야 할까요?
집주인한테 말하면 도배 다시 해주나요?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'housing',
    title: '이사 가려면 언제 말해야 하나요? (묵시적 갱신)',
    content: `계약 만료 2개월 전에는 말해야 보증금 제때 받을 수 있대요.
저 1주일 남기고 말했다가 다음 세입자 구해질 때까지 못 나갈 뻔...
문자나 통화 녹음으로 증거 꼭 남기세요!`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'housing',
    title: '관리비에 전기세 포함인가요?',
    content: `월세 50에 관리비 5만원인데, 고지서가 따로 날아왔어요.
보통 관리비는 청소비랑 인터넷만 포함인가요?
계약서 다시 봐야겠네요... 다들 얼마나 나오세요?`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'housing',
    title: '고시원 vs 쉐어하우스 어디가 나을까요?',
    content: `보증금이 없어서 원룸은 무리인데...
고시원은 밥 줘서 좋고 쉐어하우스는 친구 사귀기 좋고.
살아보신 분들 장단점 알려주세요!`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'housing',
    title: '전입신고 안 하면 보증금 보호 못 받나요?',
    content: `집주인이 전입신고 하지 말라고 하는데 (아마 세금 때문인 듯)
그럼 보증금 떼여도 법적으로 보호 못 받나요?
조건으로 월세 5만원 깎아준다는데 위험한가요?`,
    images: []
  },

  // Travel & Meetup (8)
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'travel',
    title: '🌸 벚꽃 구경, 여의도 말고 어디가 좋아요?',
    content: `여의도는 사람 구경하러 가는 것 같아서요...
서울 안에 좀 조용하고 예쁜 벚꽃 명소 있을까요?
석촌호수도 사람 많겠죠?`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'meetup',
    title: '이번 주말 홍대에서 언어교환 모임 하실 분!',
    content: `한국어-영어-베트남어 교환해요!
카페에서 커피 마시면서 편하게 수다 떨어요.
관심 있으신 분 댓글이나 쪽지 주세요~`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'travel',
    title: '부산 여행 1박 2일 코스 추천 좀요 (뚜벅이)',
    content: `처음 가보는데 해운대랑 광안리 멀나요?
돼지국밥 맛집이랑 바다 보이는 카페 가고 싶어요.
운전 못 하는데 버스로 다니기 편한가요?`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'meetup',
    title: '🏸 배드민턴 동호회 찾습니다 (강남/서초)',
    content: `실력은 초보인데 운동하고 싶어서요.
외국인 받아주는 클럽 있을까요?
장비는 라켓이랑 신발 다 있습니다!`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'travel',
    title: '겨울 스키장 어디가 제일 싸요? 🏂',
    content: `친구들이랑 스키장 가고 싶은데 비발디파크는 너무 비싸서...
셔틀버스 있고 렌탈 싼 곳 추천해주세요.
평일에 가면 사람 없겠죠?`,
    images: []
  },
  {
    author_id: 'user_amar_uuid_placeholder',
    category: 'travel',
    title: '추석 연휴에 혼자 뭐 하면 좋을까요?',
    content: `공장도 쉬고 친구들은 다 여행 갔어요.
서울에 문 여는 곳 있나요? 고궁 무료입장이라던데...
혼자 놀기 좋은 곳 추천받습니다!`,
    images: []
  },
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'meetup',
    title: '🎬 영화 좋아하시는 분? (독립영화관)',
    content: `홍대 상상마당이나 아트하우스 모모 자주 갑니다.
영화 보고 맥주 한잔하면서 이야기 나누실 분 구해요.
이번 주말에 '패스트 라이브즈' 보러 가요!`,
    images: []
  },
  {
    author_id: 'user_min_uuid_placeholder',
    category: 'travel',
    title: '제주도 비행기 표 언제 제일 싼가요?',
    content: `여름 방학 때 가려니까 왕복 20만원이 넘네요 ㄷㄷ
보통 화요일이나 수요일 출발이 싸다던데,
특가 뜨는 앱 따로 있나요? 스카이스캐너만 보고 있어요.`,
    images: []
  },
  // Future Expansion Slot
  {
    author_id: 'user_sophia_uuid_placeholder',
    category: 'daily',
    title: '외국인도 토스(Toss) 뱅크 만들 수 있나요?',
    content: `카카오뱅크는 되는데 토스는 안 된다고 들어서요.
최근에 규정 바뀌었나요? 송금할 때 토스가 편해 보여서...
외국인 등록증 있으면 비대면 개설 되나요?`,
    images: []
  }
];
