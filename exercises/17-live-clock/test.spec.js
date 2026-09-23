const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('17 — Live Digital Clock', () => {
  test('shows a zero-padded HH:MM:SS clock', async ({ page }) => {
    await page.goto(url);
    await expect(page.locator('#clock')).toHaveText(/^\d{2}:\d{2}:\d{2}$/);
  });

  test('matches the real current time', async ({ page }) => {
    await page.goto(url);
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const expected = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    await expect(page.locator('#clock')).toHaveText(new RegExp(`^${expected}:\\d{2}$`));
  });

  test('updates every second', async ({ page }) => {
    await page.goto(url);
    const first = await page.locator('#clock').innerText();
    await expect
      .poll(() => page.locator('#clock').innerText(), { timeout: 3000 })
      .not.toBe(first);
  });
});
