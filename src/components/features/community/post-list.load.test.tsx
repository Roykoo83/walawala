
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { PostList } from './post-list'
import { createClient } from '@/utils/supabase/client'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
})
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)

// Mock Supabase
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(() => ({
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis()
    })),
    removeChannel: vi.fn()
  }))
}))

// Mock actions
vi.mock('@/actions/post', () => ({
  getPostsWithCounts: vi.fn(),
  getPostsByCategory: vi.fn()
}))

describe('PostList High-Load Mocking & Memory Check', () => {
  it('should handle 100 posts without crashing and cleanup properly', () => {
    const mockPosts = Array.from({ length: 100 }, (_, i) => ({
      id: `post-${i}`,
      title: `High Load Test Post ${i}`,
      content: 'Testing performance with large data sets.',
      created_at: new Date().toISOString(),
      category: 'Visa',
      profiles: { nickname: `User ${i}`, avatar_url: null, nationality: 'Global', visa_type: 'D-2' },
      likes_count: 0,
      comments_count: 0,
      is_liked: false
    }))

    const startMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    console.log(`Initial Memory: ${startMemory} MB`)

    // 1. 대량 데이터 렌더링
    const { unmount } = render(<PostList initialPosts={mockPosts} />)
    
    const renderedPosts = screen.getAllByRole('heading', { level: 4 })
    expect(renderedPosts).toHaveLength(100)
    
    const midMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    console.log(`Memory after rendering 100 posts: ${midMemory} MB`)

    // 2. 언마운트 시 메모리 정리 확인
    unmount()
    cleanup()
    
    // Node.js 환경에서 가비지 컬렉션이 즉시 일어나지는 않으므로 수치로만 참고
    const endMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    console.log(`Memory after cleanup: ${endMemory} MB`)
  })
})
