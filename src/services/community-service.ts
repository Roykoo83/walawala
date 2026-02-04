
import { searchPosts, getPostsByCategory } from '@/actions/post'
import { createClient } from '@/utils/supabase/server'

interface FetchCommunityDataParams {
  q?: string
  category?: string
}

export async function fetchCommunityData({ q, category = 'all' }: FetchCommunityDataParams) {
  const supabase = await createClient()
  
  // Optimization: Fetch User first, then fetch Profile and Posts in parallel
  const { data: { user } } = await supabase.auth.getUser()

  const profilePromise = user 
    ? supabase
        .from('profiles')
        .select('visa_type, visa_expiry_date, nickname, avatar_url, nationality')
        .eq('id', user.id)
        .single()
        .then(res => res.data)
    : Promise.resolve(null)

  const postsPromise = q
    ? searchPosts(q, user?.id)
    : getPostsByCategory(category, user?.id)

  const [userProfile, posts] = await Promise.all([profilePromise, postsPromise])

  return {
    user,
    userProfile,
    posts
  }
}
