
import { searchPosts, getPostsByCategory } from '@/actions/post'
import { createClient } from '@/utils/supabase/server'

interface FetchCommunityDataParams {
  q?: string
  category?: string
  page?: number
}

export async function fetchCommunityData({ q, category = 'all', page = 0 }: FetchCommunityDataParams) {
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
    ? searchPosts(q, user?.id) // Search usually returns all matches or has its own logic
    : getPostsByCategory(category, user?.id, page)

  const [userProfile, posts] = await Promise.all([profilePromise, postsPromise])

  return {
    user,
    userProfile,
    posts
  }
}
