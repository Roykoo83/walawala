import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

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

const COMMENTS_TEMPLATES = [
  "진짜 공감되네요 👍",
  "와... 대박!",
  "저도 같은 고민 중이에요 ㅠㅠ",
  "꿀팁 감사합니다!!",
  "오늘도 화이팅하세요!",
  "덕분에 해결됐습니다 🙇‍♂️",
  "잘 보고 갑니다~",
  "혹시 궁금한 게 더 있는데 쪽지 드려도 될까요?",
  "추천 박고 갑니다!",
  "이건 진짜 널리 알려야 함 ㄷㄷ"
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
    // 1. 데이터 가져오기 (가상 유저 및 게시글)
    const [usersRes, postsRes] = await Promise.all([
      supabaseAdmin.from('profiles').select('id').limit(100),
      supabaseAdmin.from('posts').select('id').order('created_at', { ascending: false }).limit(20)
    ]);

    const userIds = usersRes.data?.map(u => u.id) || [];
    const postIds = postsRes.data?.map(p => p.id) || [];

    if (userIds.length === 0 || postIds.length === 0) {
      return NextResponse.json({ error: 'Not enough data to simulate' });
    }

    const newLikes = [];
    const newComments = [];

    // 2. 랜덤하게 인터랙션 생성 (회당 20~30개 내외)
    for (let i = 0; i < 30; i++) {
      const randomUser = getRandomElement(userIds);
      const randomPost = getRandomElement(postIds);
      const actionType = Math.random() > 0.4 ? 'like' : 'comment';

      if (actionType === 'like') {
        newLikes.push({
          user_id: randomUser,
          post_id: randomPost
        });
      } else {
        newComments.push({
          author_id: randomUser,
          post_id: randomPost,
          content: getRandomElement(COMMENTS_TEMPLATES)
        });
      }
    }

    // 3. DB 반영 (좋아요는 중복 무시)
    if (newLikes.length > 0) {
      await supabaseAdmin.from('likes').insert(newLikes).select(); // Unique constraint가 있어 중복은 자동 방지됨
    }

    if (newComments.length > 0) {
      await supabaseAdmin.from('comments').insert(newComments);
    }

    return NextResponse.json({
      success: true,
      addedLikes: newLikes.length,
      addedComments: newComments.length,
      message: "Simulation interaction successfully triggered."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
