const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

const bodyBg = (page) =>
  page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor);

test.describe('09 — Dark-Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('starts in light mode', async ({ page }) => {
    await expect(page.locator('body')).not.toHaveClass(/dark/);
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'false');
  });

  test('clicking switches to dark mode and changes the background', async ({ page }) => {
    const before = await bodyBg(page);
    await page.locator('#theme-toggle').click();
    await expect(page.locator('body')).toHaveClass(/dark/);
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'true');
    const after = await bodyBg(page);
    expect(after).not.toBe(before);
  });

  test('clicking again returns to light mode', async ({ page }) => {
    const before = await bodyBg(page);
    await page.locator('#theme-toggle').click();
    await page.locator('#theme-toggle').click();
    await expect(page.locator('body')).not.toHaveClass(/dark/);
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'false');
    // Wait for the CSS transition to settle back to the original colour.
    await expect.poll(() => bodyBg(page)).toBe(before);
  });
});
