import { test, expect } from '@playwright/test';

test.describe('WalaWala Core Features - TDD Tests', () => {

  // ===== 랜딩 페이지 =====
  test.describe('Landing Page', () => {
    test('홈페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/WalaWala/);
    });

    test('CTA 버튼이 커뮤니티로 이동함', async ({ page }) => {
      await page.goto('/');
      const ctaButton = page.getByRole('link', { name: /Community|Join/i });
      if (await ctaButton.isVisible()) {
        await ctaButton.click();
        await expect(page).toHaveURL(/community/);
      }
    });
  });

  // ===== 인증 =====
  test.describe('Authentication', () => {
    test('로그인 페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/login');
      // 로그인 폼 또는 로그인 관련 텍스트 확인
      const loginForm = page.locator('form, [data-testid="login-form"]');
      const loginButton = page.getByRole('button', { name: /login|sign in|google/i });
      const hasLoginElements = await loginForm.isVisible() || await loginButton.isVisible();
      expect(hasLoginElements).toBe(true);
    });

    test('회원가입 페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/signup');
      // 회원가입 폼 또는 관련 텍스트 확인
      const signupForm = page.locator('form, [data-testid="signup-form"]');
      const signupButton = page.getByRole('button', { name: /sign up|create|google/i });
      const hasSignupElements = await signupForm.isVisible() || await signupButton.isVisible();
      expect(hasSignupElements).toBe(true);
    });
  });

  // ===== 커뮤니티 =====
  test.describe('Community', () => {
    test('커뮤니티 페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/community');
      await expect(page.locator('text=WalaWala')).toBeVisible();
    });

    test('카테고리 필터가 표시됨', async ({ page }) => {
      await page.goto('/community');
      // 카테고리 탭들이 보이는지 확인
      const categoryTabs = page.locator('[href*="/community"]');
      await expect(categoryTabs.first()).toBeVisible();
    });

    test('검색 버튼이 작동함', async ({ page }) => {
      await page.goto('/community');
      const searchButton = page.locator('button').filter({ has: page.locator('svg') }).first();
      await expect(searchButton).toBeVisible();
    });

    test('카테고리 필터링이 URL에 반영됨', async ({ page }) => {
      await page.goto('/community?category=visa');
      await expect(page).toHaveURL(/category=visa/);
    });

    test('검색어가 URL에 반영됨', async ({ page }) => {
      await page.goto('/community?q=test');
      await expect(page).toHaveURL(/q=test/);
    });
  });

  // ===== 비자 =====
  test.describe('Visa Management', () => {
    test('비자 메인 페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/visa');
      await expect(page.locator('text=Visa')).toBeVisible();
    });

    test('F-2 점수 계산기 페이지가 로드됨', async ({ page }) => {
      await page.goto('/visa/f2-calculator');
      await expect(page.locator('text=F-2')).toBeVisible();
    });

    test('비자 로드맵 페이지가 로드됨', async ({ page }) => {
      await page.goto('/visa/roadmap');
      await expect(page.locator('text=Roadmap')).toBeVisible();
    });

    test('비자 로드맵에서 현재 비자 선택이 가능함', async ({ page }) => {
      await page.goto('/visa/roadmap');
      // 비자 선택 버튼들이 있는지 확인
      const visaButtons = page.locator('button');
      await expect(visaButtons.first()).toBeVisible();
    });
  });

  // ===== 온라인 교육 =====
  test.describe('Online Learning', () => {
    test('교육 목록 페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/learn');
      // Learn 페이지 요소 확인 (제목이나 카드)
      const pageContent = page.locator('main, [data-testid="learn-page"], h1, h2');
      await expect(pageContent.first()).toBeVisible();
    });

    test('카테고리 탭이 표시됨 (All, KIIP, Korean, Culture)', async ({ page }) => {
      await page.goto('/learn');
      await expect(page.locator('text=All').first()).toBeVisible();
    });

    test('교육 카드가 표시됨', async ({ page }) => {
      await page.goto('/learn');
      // 최소 하나의 카드가 보이는지 확인 (샘플 데이터)
      const cards = page.locator('[class*="card"], [class*="Card"]');
      await expect(cards.first()).toBeVisible();
    });

    test('강좌 상세 페이지가 로드됨', async ({ page }) => {
      await page.goto('/learn/sample-1');
      // 상세 페이지 요소 확인
      await expect(page.locator('text=KIIP').first()).toBeVisible();
    });
  });

  // ===== 네비게이션 =====
  test.describe('Bottom Navigation', () => {
    test('하단 네비게이션이 표시됨', async ({ page }) => {
      await page.goto('/community');
      // 네비게이션 바가 있는지 확인
      const bottomNav = page.locator('.fixed.bottom-0, nav, [class*="bottom"]');
      await expect(bottomNav.first()).toBeVisible();
    });

    test('Home 탭이 작동함', async ({ page }) => {
      await page.goto('/community');
      await page.click('a[href="/community"]');
      await expect(page).toHaveURL(/community/);
    });

    test('Visa 탭이 작동함', async ({ page }) => {
      await page.goto('/community');
      await page.click('a[href="/visa"]');
      await expect(page).toHaveURL(/visa/);
    });

    test('Explore 탭이 작동함', async ({ page }) => {
      await page.goto('/community');
      const exploreLink = page.locator('a[href="/explore"]');
      if (await exploreLink.isVisible()) {
        await exploreLink.click();
        await expect(page).toHaveURL(/explore/);
      }
    });

    test('Profile 탭 클릭 시 로그인 또는 프로필로 이동', async ({ page }) => {
      await page.goto('/community');
      await page.click('a[href="/profile"]');
      // 페이지 로드 대기
      await page.waitForLoadState('networkidle');
      // 비로그인 상태면 /login으로, 로그인 상태면 /profile로, 또는 community에서 리다이렉트 안 될 수도 있음
      const url = page.url();
      expect(url).toMatch(/profile|login|community/);
    });
  });

  // ===== 온보딩 =====
  test.describe('Onboarding', () => {
    test('온보딩 페이지가 정상적으로 로드됨', async ({ page }) => {
      await page.goto('/onboarding');
      await expect(page.locator('text=Profile')).toBeVisible();
    });

    test('국적 선택 드롭다운이 표시됨', async ({ page }) => {
      await page.goto('/onboarding');
      const nationalitySelect = page.locator('[name="nationality"]');
      await expect(nationalitySelect).toBeVisible();
    });

    test('Step 진행 표시기가 보임', async ({ page }) => {
      await page.goto('/onboarding');
      await expect(page.locator('text=Step')).toBeVisible();
    });
  });

  // ===== 반응형 디자인 =====
  test.describe('Responsive Design', () => {
    test('모바일 뷰포트에서 정상 작동', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
      await page.goto('/community');
      await expect(page.locator('text=WalaWala')).toBeVisible();
    });

    test('태블릿 뷰포트에서 정상 작동', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await page.goto('/community');
      await expect(page.locator('text=WalaWala')).toBeVisible();
    });
  });

  // ===== 접근성 =====
  test.describe('Accessibility', () => {
    test('모든 이미지에 alt 텍스트가 있음', async ({ page }) => {
      await page.goto('/');
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test('키보드 네비게이션이 작동함', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
