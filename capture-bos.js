import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting screenshot automation...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Load the page
  console.log('Loading BOS at http://localhost:3033...');
  await page.goto('http://localhost:3033', { waitUntil: 'networkidle2' });

  // Wait for load to settle (longer wait for initial compile)
  await new Promise(r => setTimeout(r, 8000));

  // Take first screenshot (Command Center)
  console.log('Capturing Command Center...');
  await page.screenshot({ path: 'public/images/bos-command.png' });

  // Click on "Project On Going"
  console.log('Navigating to Projects...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside button'));
    const projBtn = buttons.find(b => b.textContent.trim().toLowerCase().includes('project'));
    if (projBtn) {
      projBtn.click();
      console.log('Clicked Project button');
    } else {
      console.log('Project button not found');
    }
  });
  // Wait for compile & render
  await new Promise(r => setTimeout(r, 8000));
  await page.screenshot({ path: 'public/images/bos-projects.png' });

  // Click on "OpenClaw"
  console.log('Navigating to OpenClaw...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside button'));
    const openclawBtn = buttons.find(b => b.textContent.trim().toLowerCase().includes('openclaw'));
    if (openclawBtn) {
      openclawBtn.click();
      console.log('Clicked OpenClaw button');
    } else {
      console.log('OpenClaw button not found');
    }
  });
  // Wait for compile & API load
  await new Promise(r => setTimeout(r, 10000));
  await page.screenshot({ path: 'public/images/bos-openclaw.png' });

  // Click on "Hermes"
  console.log('Navigating to Hermes...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside button'));
    const hermesBtn = buttons.find(b => b.textContent.trim().toLowerCase().includes('hermes'));
    if (hermesBtn) {
      hermesBtn.click();
      console.log('Clicked Hermes button');
    } else {
      console.log('Hermes button not found');
    }
  });
  // Wait for compile & API load
  await new Promise(r => setTimeout(r, 10000));
  await page.screenshot({ path: 'public/images/bos-hermes.png' });

  await browser.close();
  console.log('Automation complete! Screenshots saved to public/images/');
})().catch(err => {
  console.error('Automation failed:', err);
  process.exit(1);
});
