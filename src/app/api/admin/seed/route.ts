import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// ⚠️ 중요: 이 API는 로컬 개발 환경이나 관리자 권한이 있는 상태에서만 실행해야 합니다.
// .env.local 파일에 SUPABASE_SERVICE_ROLE_KEY가 있어야 합니다.

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase credentials are missing')
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

const NATIONALITIES = ['Vietnam', 'China', 'Nepal', 'Uzbekistan', 'Mongolia', 'Philippines', 'USA', 'Japan'];
const VISAS = ['D-2', 'D-10', 'E-7', 'E-9', 'F-2', 'F-4', 'H-2'];
const JOB_FIELDS = ['Manufacturing', 'IT/Tech', 'Service', 'Construction', 'Student', 'Education'];
const TARGET_VISAS = ['F-2', 'F-5', 'E-7'];

const SAMPLE_POST_TITLES = [
  "비자 연장 질문있습니다!",
  "한국 생활 꿀팁 공유해요",
  "맛집 추천 부탁드립니다",
  "주말에 같이 공부하실 분?",
  "E-7 비자 변경 성공 후기",
  "서울 집값 너무 비싸네요 ㅠㅠ",
  "한국어 공부 어떻게 하시나요?",
  "고향 음식이 너무 그리워요",
  "이번 주말 축구 모임 모집",
  "중고나라 거래 주의사항"
];

const SAMPLE_CONTENTS = [
  "안녕하세요, 한국 생활 1년차입니다. 비자 문제로 고민이 많네요. 다들 어떻게 해결하시나요?",
  "오늘 홍대 근처 맛집 다녀왔는데 정말 좋았어요. 추천합니다!",
  "비자 점수 계산하다가 멘붕왔습니다. 도와주세요.",
  "한국어 늘리려면 역시 한국 친구를 사귀는 게 최고인 것 같아요.",
  "날씨가 갑자기 추워졌네요. 다들 감기 조심하세요.",
  "이번에 월급 받으면 고향에 선물 보내려고요. 배송비가 얼마나 들까요?",
  "F-2 비자 준비하시는 분들 계신가요? 스터디 만들고 싶어요.",
  "한국 회식 문화 적응하기 힘드네요 ㅎㅎ",
  "주말에 알바 구하고 있는데 어디서 찾아야 할까요?",
  "편의점 도시락도 이제 질리네요. 요리 배우고 싶어요."
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY is missing' }, { status: 500 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  try {
    const createdUsers: string[] = [];

    // 1. Virtual Persona Seeding (100 Users)
    for (let i = 0; i < 100; i++) {
      const email = `virtual_user_${Date.now()}_${i}@walawala.test`;
      const password = 'password123';
      const nationality = getRandomElement(NATIONALITIES);
      const name = `${nationality}_User_${i + 1}`;

      const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          name,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        }
      });

      if (userError) {
        console.error(`Failed to create user ${i}:`, userError);
        continue;
      }

      if (user.user) {
        createdUsers.push(user.user.id);

        // Update additional profile info
        await supabaseAdmin.from('profiles').update({
          nationality,
          visa_type: getRandomElement(VISAS),
          job_field: getRandomElement(JOB_FIELDS),
          target_visa: getRandomElement(TARGET_VISAS),
          visa_expiry_date: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          korean_level: `TOPIK ${Math.floor(Math.random() * 6) + 1}`,
          nickname: name
        }).eq('id', user.user.id);
      }
    }

    // 2. Content Ingestion (50 Posts)
    const posts = [];
    for (let i = 0; i < 50; i++) {
      if (createdUsers.length === 0) break;

      const authorId = getRandomElement(createdUsers);
      const title = getRandomElement(SAMPLE_POST_TITLES);
      const content = getRandomElement(SAMPLE_CONTENTS);
      const category = getRandomElement(['Visa', 'Life', 'Job', 'Meetup']);

      posts.push({
        author_id: authorId,
        title,
        content,
        category,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Past 30 days
      });
    }

    if (posts.length > 0) {
      const { error: postError } = await supabaseAdmin.from('posts').insert(posts);
      if (postError) console.error('Post insert error:', postError);
    }

    // 3. Comments (100 Comments) - 로직 개선: 게시글 카테고리에 맞는 유저가 댓글을 달 확률을 높임
    const { data: createdPosts } = await supabaseAdmin.from('posts').select('id, category');

    if (createdPosts && createdPosts.length > 0) {
      const comments = [];
      const COMMENT_TEMPLATES = {
        Visa: ["정말 중요한 정보네요! 감사합니다.", "저도 어제 비자 센터 다녀왔는데 비슷했어요.", "혹시 서류 준비 기간은 얼마나 걸리셨나요?"],
        Life: ["와 여기 저도 가봤는데 진짜 맛있어요!", "한국 생활 적응하기 힘드네요 ㅠㅠ 같이 힘내요!", "이런 꿀팁이 있었다니.. 감사합니다."],
        Job: ["공고 링크 알 수 있을까요?", "비자 지원도 해주는 회사인가요?", "정보 공유 감사합니다. 지원해봐야겠네요!"],
        Meetup: ["저 참여하고 싶어요!", "장소가 어디인가요?", "주말이면 무조건 갑니다!"]
      };

      for (let i = 0; i < 150; i++) {
        const authorId = getRandomElement(createdUsers);
        const randomPost = getRandomElement(createdPosts);
        const category = randomPost.category as keyof typeof COMMENT_TEMPLATES;

        comments.push({
          post_id: randomPost.id,
          author_id: authorId,
          content: getRandomElement(COMMENT_TEMPLATES[category] || COMMENT_TEMPLATES.Life),
          created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }

      const { error: commentError } = await supabaseAdmin.from('comments').insert(comments);
      if (commentError) console.error('Comment insert error:', commentError);
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdUsers.length} users, ${posts.length} posts, and comments.`
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
