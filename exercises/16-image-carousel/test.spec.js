const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('16 — Image Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('shows the first slide and dot on load', async ({ page }) => {
    await expect(page.locator('.slide').nth(0)).toHaveClass(/active/);
    await expect(page.locator('.slide.active')).toHaveCount(1);
    await expect(page.locator('.dot').nth(0)).toHaveClass(/active/);
  });

  test('Next and Prev move between slides', async ({ page }) => {
    await page.locator('#next').click();
    await expect(page.locator('.slide').nth(1)).toHaveClass(/active/);
    await expect(page.locator('.slide').nth(0)).not.toHaveClass(/active/);
    await page.locator('#prev').click();
    await expect(page.locator('.slide').nth(0)).toHaveClass(/active/);
  });

  test('dots jump to a specific slide', async ({ page }) => {
    await page.locator('.dot').nth(2).click();
    await expect(page.locator('.slide').nth(2)).toHaveClass(/active/);
    await expect(page.locator('.dot').nth(2)).toHaveClass(/active/);
  });

  test('navigation wraps around at the ends', async ({ page }) => {
    await page.locator('.dot').nth(3).click();
    await expect(page.locator('.slide').nth(3)).toHaveClass(/active/);
    await page.locator('#next').click();
    await expect(page.locator('.slide').nth(0)).toHaveClass(/active/);
    await page.locator('#prev').click();
    await expect(page.locator('.slide').nth(3)).toHaveClass(/active/);
  });
});
