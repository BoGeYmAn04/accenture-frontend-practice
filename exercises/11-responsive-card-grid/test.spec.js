const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

async function columnCount(page) {
  const template = await page
    .locator('.grid')
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns);
  return template.split(' ').filter(Boolean).length;
}

test.describe('11 — Responsive Card Grid', () => {
  test('uses CSS grid with several columns on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.goto(url);
    const display = await page
      .locator('.grid')
      .evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('grid');
    expect(await columnCount(page)).toBeGreaterThanOrEqual(3);
  });

  test('reflows to a single column on a narrow screen', async ({ page }) => {
    await page.setViewportSize({ width: 420, height: 800 });
    await page.goto(url);
    expect(await columnCount(page)).toBe(1);
  });

  test('cards lift on hover', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.goto(url);
    const card = page.locator('.card').first();
    const before = await card.evaluate((el) => getComputedStyle(el).transform);
    await card.hover();
    await expect
      .poll(() => card.evaluate((el) => getComputedStyle(el).transform))
      .not.toBe(before);
  });
});
