const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

const display = (page, sel) =>
  page.locator(sel).evaluate((el) => getComputedStyle(el).display);

test.describe('10 — Responsive Navbar', () => {
  test('desktop shows horizontal links and hides the toggle', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 700 });
    await page.goto(url);
    await expect(page.locator('#nav-links')).toBeVisible();
    expect(await display(page, '#nav-links')).toBe('flex');
    await expect(page.locator('#nav-toggle')).toBeHidden();
  });

  test('mobile hides links until the toggle is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 420, height: 700 });
    await page.goto(url);
    await expect(page.locator('#nav-toggle')).toBeVisible();
    await expect(page.locator('#nav-links')).toBeHidden();
  });

  test('toggling on mobile reveals a vertical menu', async ({ page }) => {
    await page.setViewportSize({ width: 420, height: 700 });
    await page.goto(url);
    await page.locator('#nav-toggle').click();
    await expect(page.locator('#nav-links')).toBeVisible();
    await expect(page.locator('#nav-toggle')).toHaveAttribute('aria-expanded', 'true');
    const dir2 = await page
      .locator('#nav-links')
      .evaluate((el) => getComputedStyle(el).flexDirection);
    expect(dir2).toBe('column');
  });
});
