
import { describe, it, expect, vi } from 'vitest'

// Mock dependencies
const mockSearchPosts = vi.fn()
const mockGetPostsByCategory = vi.fn()
const mockGetUser = vi.fn()
const mockGetProfile = vi.fn()

// Service function to test (We will implement this next)
import { fetchCommunityData } from '@/services/community-service'

// Mocking module imports - 실제 구현 전에 인터페이스 정의를 위한 테스트
vi.mock('@/actions/post', () => ({
  searchPosts: (...args: any[]) => mockSearchPosts(...args),
  getPostsByCategory: (...args: any[]) => mockGetPostsByCategory(...args),
}))

vi.mock('@/utils/supabase/server', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: mockGetProfile
        })
      })
    })
  })
}))

describe('fetchCommunityData (Optimization Test)', () => {
  it('should fetch user, profile, and posts', async () => {
    // Setup Mocks
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123' } } })
    mockGetProfile.mockResolvedValue({ data: { nickname: 'Tester', visa_type: 'D-10' } })
    mockGetPostsByCategory.mockResolvedValue([{ id: 1, title: 'Post 1' }])

    // Execute
    const result = await fetchCommunityData({ category: 'all' })

    // Verify Data Structure
    expect(result.user).toBeDefined()
    expect(result.userProfile).toBeDefined()
    expect(result.posts).toHaveLength(1)
    
    // Verify Calls
    expect(mockGetUser).toHaveBeenCalled()
    expect(mockGetProfile).toHaveBeenCalled() // Should be called because user exists
    expect(mockGetPostsByCategory).toHaveBeenCalledWith('all', 'user-123')
  })
})
