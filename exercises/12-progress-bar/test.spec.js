const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('12 — Progress Bar + Spinner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('starts at 0%', async ({ page }) => {
    await expect(page.locator('#progress-label')).toHaveText('0%');
  });

  test('animates to 100% when started', async ({ page }) => {
    await page.locator('#start').click();
    await expect(page.locator('#progress-label')).toHaveText('100%');
    await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '100');

    const track = await page.locator('.progress').boundingBox();
    await expect
      .poll(async () => (await page.locator('#progress-bar').boundingBox()).width)
      .toBeGreaterThanOrEqual(track.width - 2);
  });

  test('the spinner has a CSS animation', async ({ page }) => {
    const name = await page
      .locator('.spinner')
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(name).not.toBe('none');
  });
});
