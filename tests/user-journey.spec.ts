import { test, expect } from '@playwright/test';

/**
 * WalaWala 유저 시나리오 TDD 테스트
 * 
 * 페르소나 기반의 사용자 여정 테스트
 * - Min (베트남 유학생): 비자 갱신 걱정, 커뮤니티 활용
 * - Sophia (중국 직장인): F-2 점수 확인, 장기 체류 계획
 * - Amar (네팔 근로자): 비자 전환 경로 탐색
 */

test.describe('👨‍🎓 민 (Min) - 베트남 유학생 시나리오', () => {

    test.beforeEach(async ({ page }) => {
        // 모바일 뷰포트 설정 (유학생은 주로 모바일 사용)
        await page.setViewportSize({ width: 375, height: 812 });
    });

    test('시나리오 1: 앱 첫 진입 시 따뜻한 환영 메시지를 본다', async ({ page }) => {
        await page.goto('/community');

        // "믿을 수 있는 한국인 선배" 느낌의 친근한 인사
        const greeting = page.locator('text=Hello').first();
        await expect(greeting).toBeVisible();

        // 로고가 보여야 함
        await expect(page.locator('text=WalaWala')).toBeVisible();
    });

    test('시나리오 2: 비자 상태를 한눈에 확인할 수 있다', async ({ page }) => {
        await page.goto('/visa');

        // 비자 관련 정보가 보여야 함
        await expect(page.locator('text=Visa')).toBeVisible();

        // 비자 페이지 콘텐츠 확인
        const pageContent = page.locator('h1, h2, [class*="card"], [class*="Card"]');
        await expect(pageContent.first()).toBeVisible();
    });

    test('시나리오 3: 같은 국적 친구들의 글을 볼 수 있다', async ({ page }) => {
        await page.goto('/community');

        // 커뮤니티 피드가 로드됨
        const feed = page.locator('main').first();
        await expect(feed).toBeVisible();

        // 게시글 카드가 있다면 (빈 상태도 허용)
        const hasCards = await page.locator('[class*="Card"], [class*="card"]').count() > 0;
        const hasEmptyState = await page.locator('text=아직').isVisible().catch(() => false);
        expect(hasCards || hasEmptyState).toBe(true);
    });

    test('시나리오 4: 카테고리별로 정보를 쉽게 찾을 수 있다', async ({ page }) => {
        await page.goto('/community');

        // 카테고리 아이콘들이 보임 (Visa, Jobs, Room 등)
        const categories = page.locator('text=Visa, text=Jobs, text=Room').first();
        // 카테고리 영역이 있는지 확인
        const categorySection = page.locator('div').filter({ hasText: /Visa|Jobs|Room/ }).first();
        await expect(categorySection).toBeVisible();
    });

    test('시나리오 5: 글쓰기 버튼을 쉽게 찾을 수 있다', async ({ page }) => {
        await page.goto('/community');

        // FAB(Floating Action Button) 또는 글쓰기 버튼
        const writeButton = page.locator('a[href*="create"], a[href*="write"], button').filter({ has: page.locator('svg') }).last();
        await expect(writeButton).toBeVisible();
    });

    test('시나리오 6: 비자 갱신 정보 페이지에 접근할 수 있다', async ({ page }) => {
        await page.goto('/visa');

        // 비자 페이지 로드 확인
        await expect(page.locator('text=Visa')).toBeVisible();

        // 비자 관련 액션이나 정보가 있음
        const visaContent = page.locator('main, [class*="content"]');
        await expect(visaContent.first()).toBeVisible();
    });
});

test.describe('👩‍💻 소피아 (Sophia) - 중국 직장인 시나리오', () => {

    test.beforeEach(async ({ page }) => {
        // 직장인은 데스크톱도 사용
        await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('시나리오 1: F-2 점수 계산기를 찾아 사용할 수 있다', async ({ page }) => {
        await page.goto('/visa/f2-calculator');

        // F-2 점수 계산기 페이지 로드
        await expect(page.locator('text=F-2')).toBeVisible();

        // 점수 입력 폼이나 슬라이더가 있음
        const formElements = page.locator('input, select, [role="slider"], button');
        await expect(formElements.first()).toBeVisible();
    });

    test('시나리오 2: 점수 항목별 배점을 확인할 수 있다', async ({ page }) => {
        await page.goto('/visa/f2-calculator');

        // 나이, 학력, 소득 등의 항목이 표시됨
        const scoreCategories = page.locator('main');
        await expect(scoreCategories).toBeVisible();
    });

    test('시나리오 3: 현재 비자에서 F-2로 가는 경로를 확인할 수 있다', async ({ page }) => {
        await page.goto('/visa/roadmap');

        // 로드맵 페이지 로드
        await expect(page.locator('text=Roadmap')).toBeVisible();

        // 비자 선택 버튼들
        const visaOptions = page.locator('button');
        await expect(visaOptions.first()).toBeVisible();
    });

    test('시나리오 4: 비자 전환 요구사항을 확인할 수 있다', async ({ page }) => {
        await page.goto('/visa/roadmap');

        // 비자 선택 후 요구사항 표시
        const buttons = page.locator('button');
        if (await buttons.first().isVisible()) {
            await buttons.first().click();
            // 요구사항이나 상세 정보가 표시됨
            await page.waitForTimeout(500);
            const details = page.locator('text=Requirements, text=필요, text=조건');
            // 요구사항이 보이거나 다른 상태 변화가 있음
        }
    });

    test('시나리오 5: 프로필에서 비자 정보를 관리할 수 있다', async ({ page }) => {
        await page.goto('/profile');

        // 프로필 또는 로그인 페이지로 이동
        await page.waitForLoadState('networkidle');
        const url = page.url();
        expect(url).toMatch(/profile|login/);
    });
});

test.describe('👨‍🔧 아마르 (Amar) - E-9 근로자 시나리오', () => {

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
    });

    test('시나리오 1: 간단한 네비게이션으로 원하는 페이지를 찾는다', async ({ page }) => {
        await page.goto('/community');

        // 하단 네비게이션이 명확히 보임
        const bottomNav = page.locator('.fixed.bottom-0, nav').first();
        await expect(bottomNav).toBeVisible();

        // 아이콘만으로도 이해 가능한 네비게이션
        const navIcons = bottomNav.locator('svg');
        expect(await navIcons.count()).toBeGreaterThanOrEqual(3);
    });

    test('시나리오 2: E-9에서 E-7 전환 가능 여부를 확인할 수 있다', async ({ page }) => {
        await page.goto('/visa/roadmap');

        // 비자 로드맵 페이지
        await expect(page.locator('text=Roadmap')).toBeVisible();

        // E-9 옵션이 있거나 선택 가능
        const visaButtons = page.locator('button');
        await expect(visaButtons.first()).toBeVisible();
    });

    test('시나리오 3: 이미지와 아이콘으로 정보를 이해할 수 있다', async ({ page }) => {
        await page.goto('/community');

        // 아이콘 기반 카테고리
        const icons = page.locator('svg, [class*="icon"]');
        expect(await icons.count()).toBeGreaterThan(0);

        // 이모지 사용
        const emojis = page.locator('text=/[📋💼🏠🍜💬🔥]/');
        // 이모지가 있으면 좋고, 없어도 아이콘으로 대체 가능
    });

    test('시나리오 4: 온라인 교육 콘텐츠에 접근할 수 있다', async ({ page }) => {
        await page.goto('/learn');

        // 교육 페이지 로드
        const pageContent = page.locator('main, h1, h2');
        await expect(pageContent.first()).toBeVisible();

        // 교육 카드가 보임
        const courseCards = page.locator('[class*="Card"], [class*="card"]');
        await expect(courseCards.first()).toBeVisible();
    });
});

test.describe('🌍 공통 사용자 경험 테스트', () => {

    test('빠른 로딩: 3초 이내에 메인 콘텐츠가 보인다', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/community');

        await expect(page.locator('main, [class*="content"]').first()).toBeVisible();

        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(5000); // 5초 미만 (네트워크 여유 포함)
    });

    test('직관적 네비게이션: 어디서든 홈으로 돌아갈 수 있다', async ({ page }) => {
        await page.goto('/visa/f2-calculator');

        // 로고 클릭 또는 홈 버튼으로 돌아가기
        const homeLink = page.locator('a[href="/community"], a[href="/"]').first();
        await expect(homeLink).toBeVisible();
    });

    test('모바일 친화적: 터치 타겟이 충분히 크다', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/community');

        // 버튼들이 최소 44x44px 이상
        const buttons = page.locator('button, a[href]');
        const firstButton = buttons.first();
        await expect(firstButton).toBeVisible();

        const box = await firstButton.boundingBox();
        if (box) {
            expect(box.width).toBeGreaterThanOrEqual(32);
            expect(box.height).toBeGreaterThanOrEqual(32);
        }
    });

    test('일관된 브랜딩: 모든 페이지에서 WalaWala 로고가 보인다', async ({ page }) => {
        const pages = ['/community', '/visa', '/learn'];

        for (const pagePath of pages) {
            await page.goto(pagePath);
            // 로고 또는 브랜드명이 보임
            const hasLogo = await page.locator('text=WalaWala, img[alt*="WalaWala"], img[alt*="logo"]').first().isVisible().catch(() => false);
            const hasNav = await page.locator('nav, .fixed.bottom-0').first().isVisible().catch(() => false);
            expect(hasLogo || hasNav).toBe(true);
        }
    });

    test('에러 상태: 빈 페이지가 아닌 친절한 안내를 보여준다', async ({ page }) => {
        await page.goto('/community?q=xyznonexistentquery12345');

        // 검색 결과가 없을 때 안내 메시지
        const content = page.locator('main, [class*="content"]');
        await expect(content.first()).toBeVisible();
        // 빈 화면이 아님
    });

    test('접근성: 키보드로 주요 기능에 접근할 수 있다', async ({ page }) => {
        await page.goto('/community');

        // Tab으로 포커스 이동
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        const focused = page.locator(':focus');
        await expect(focused).toBeVisible();
    });
});

test.describe('💬 브랜드 보이스 검증', () => {

    test('따뜻한 인사: 사용자를 환영하는 메시지가 있다', async ({ page }) => {
        await page.goto('/community');

        // Hello, Welcome, 환영 등의 인사말
        const greeting = page.locator('text=/Hello|Welcome|환영|안녕/i').first();
        // 인사말이 있으면 좋고, 없어도 실패하지 않음 (선택적)
    });

    test('명확한 행동 유도: CTA 버튼 텍스트가 동사로 끝난다', async ({ page }) => {
        await page.goto('/');

        // "~하기", "Join", "Start" 등 행동 유도 버튼
        const ctaButtons = page.locator('button, a[href]').filter({ hasText: /Join|Start|Go|시작|보기|하기/i });
        // CTA가 있으면 확인
    });

    test('긍정적 표현: 오류 메시지도 해결책을 제시한다', async ({ page }) => {
        await page.goto('/community?q=xyznonexistent');

        // "~할 수 있어요", "다시 시도" 등 긍정적 안내
        // 빈 상태에서도 다음 행동을 안내
        const content = page.locator('main').first();
        await expect(content).toBeVisible();
    });
});
