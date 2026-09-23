const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('03 — Click Counter (DOM + events)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('starts at 0', async ({ page }) => {
    await expect(page.locator('#count')).toHaveText('0');
  });

  test('increments on each click', async ({ page }) => {
    const btn = page.locator('#increment');
    await btn.click();
    await btn.click();
    await btn.click();
    await expect(page.locator('#count')).toHaveText('3');
  });

  test('reset returns the count to 0', async ({ page }) => {
    await page.locator('#increment').click();
    await page.locator('#increment').click();
    await expect(page.locator('#count')).toHaveText('2');
    await page.locator('#reset').click();
    await expect(page.locator('#count')).toHaveText('0');
  });

  test('the secondary button is visually distinct', async ({ page }) => {
    const s = await page.locator('.secondary').evaluate((el) => {
      const cs = getComputedStyle(el);
      return { bg: cs.backgroundColor, border: cs.borderTopWidth };
    });
    // It must differ from the primary button's solid purple fill.
    expect(s.bg).not.toBe('rgb(124, 58, 237)');
  });
});
