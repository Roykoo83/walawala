
import { render, screen } from '@testing-library/react'
import { BottomNav } from './bottom-nav'
import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/community',
}))

describe('BottomNav Component', () => {
  it('should render all 7 navigation items including Jobs and Learn', () => {
    render(<BottomNav />)

    const expectedLabels = ['Home', 'Explore', 'Post', 'Visa', 'Profile', 'Jobs', 'Learn']
    
    // 현재 구현에는 Jobs와 Learn이 없으므로 이 테스트는 실패해야 함 (Red)
    expectedLabels.forEach(label => {
      // "Post"는 아이콘만 있고 텍스트가 다를 수 있으나, 현재 코드상 span으로 label 출력 중.
      // 하지만 Post는 isPrimary라서 렌더링 방식이 다름. 
      // Home, Explore, Visa, Profile, Jobs, Learn은 일반 탭.
      const element = screen.getByText(label)
      expect(element).toBeInTheDocument()
    })
  })
})
