const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

async function center(page, selector) {
  const box = await page.locator(selector).boundingBox();
  return { cx: box.x + box.width / 2, cy: box.y + box.height / 2 };
}

async function display(page, selector) {
  return page.locator(selector).evaluate((el) => getComputedStyle(el).display);
}

test.describe('04 — Center It (flexbox / grid / absolute)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 700 });
    await page.goto(url);
  });

  test('flex stage uses flexbox and centers the dot', async ({ page }) => {
    expect(await display(page, '#stage-flex')).toBe('flex');
    const stage = await center(page, '#stage-flex');
    const dot = await center(page, '#stage-flex .dot');
    expect(Math.abs(stage.cx - dot.cx)).toBeLessThanOrEqual(2);
    expect(Math.abs(stage.cy - dot.cy)).toBeLessThanOrEqual(2);
  });

  test('grid stage uses grid and centers the dot', async ({ page }) => {
    expect(await display(page, '#stage-grid')).toBe('grid');
    const stage = await center(page, '#stage-grid');
    const dot = await center(page, '#stage-grid .dot');
    expect(Math.abs(stage.cx - dot.cx)).toBeLessThanOrEqual(2);
    expect(Math.abs(stage.cy - dot.cy)).toBeLessThanOrEqual(2);
  });

  test('absolute stage uses absolute positioning and centers the dot', async ({ page }) => {
    const pos = await page
      .locator('#stage-abs .dot')
      .evaluate((el) => getComputedStyle(el).position);
    expect(pos).toBe('absolute');
    const stage = await center(page, '#stage-abs');
    const dot = await center(page, '#stage-abs .dot');
    expect(Math.abs(stage.cx - dot.cx)).toBeLessThanOrEqual(2);
    expect(Math.abs(stage.cy - dot.cy)).toBeLessThanOrEqual(2);
  });
});
