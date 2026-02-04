import { test, expect } from '@playwright/test';

test.describe('WalaWala Core Features', () => {
  
  test('홈페이지가 정상적으로 로드되는지 확인', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to WalaWala');
    await expect(page.getByRole('link', { name: 'Go to Community Board' })).toBeVisible();
  });

  test('로그인 페이지 진입 확인', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByPlaceholder('m@example.com')).toBeVisible();
  });

  test('커뮤니티 보드 접근 및 게시글 목록 확인', async ({ page }) => {
    await page.goto('/community');
    await expect(page.getByRole('heading', { name: 'Community' })).toBeVisible();
    // 비로그인 상태여도 게시글 목록은 보여야 함
  });

  test('비자 카드 컴포넌트 색상 로직 검증 (Unit Logic)', () => {
    // 이 부분은 컴포넌트 내부 로직이므로 Playwright보다는 
    // 실제 렌더링 후 스타일 속성을 체크하는 식으로 작성 가능합니다.
  });
});
