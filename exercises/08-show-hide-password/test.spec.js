const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('08 — Show / Hide Password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('starts masked with a "Show" button', async ({ page }) => {
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    await expect(page.locator('#toggle-password')).toHaveText(/show/i);
  });

  test('reveals the password on click and updates the label', async ({ page }) => {
    await page.locator('#toggle-password').click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'text');
    await expect(page.locator('#toggle-password')).toHaveText(/hide/i);
  });

  test('hides the password again on the second click', async ({ page }) => {
    await page.locator('#toggle-password').click();
    await page.locator('#toggle-password').click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    await expect(page.locator('#toggle-password')).toHaveText(/show/i);
  });

  test('keeps aria-pressed in sync', async ({ page }) => {
    await page.locator('#toggle-password').click();
    await expect(page.locator('#toggle-password')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#toggle-password').click();
    await expect(page.locator('#toggle-password')).toHaveAttribute('aria-pressed', 'false');
  });
});
