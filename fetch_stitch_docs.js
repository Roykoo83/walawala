const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Stitch docs...');
    await page.goto('https://stitch.withgoogle.com/docs/mcp/setup', { waitUntil: 'networkidle' });
    
    // 페이지 제목과 본문 텍스트 추출
    const title = await page.title();
    const content = await page.evaluate(() => document.body.innerText);
    
    console.log('--- Page Title ---');
    console.log(title);
    console.log('--- Page Content ---');
    console.log(content);
    
  } catch (error) {
    console.error('Error fetching docs:', error);
  } finally {
    await browser.close();
  }
})();
