const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('18 — Fetch & Render', () => {
  test('starts with an empty list', async ({ page }) => {
    await page.goto(url);
    await expect(page.locator('#users li')).toHaveCount(0);
  });

  test('loads and renders the users', async ({ page }) => {
    await page.goto(url);
    await page.locator('#load').click();
    await expect(page.locator('#users .user')).toHaveCount(5);
    await expect(page.locator('#users .user').first()).toContainText('Ada Lovelace');
    await expect(page.locator('#status')).toBeEmpty();
  });

  test('shows an error message when the request fails', async ({ page }) => {
    await page.route('**/data.json', (route) => route.fulfill({ status: 500, body: 'boom' }));
    await page.goto(url);
    await page.locator('#load').click();
    await expect(page.locator('#status')).toContainText(/wrong|error|failed/i);
  });
});
