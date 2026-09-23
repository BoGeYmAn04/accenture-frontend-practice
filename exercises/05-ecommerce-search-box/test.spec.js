const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('05 — E-commerce Search Box (the real Accenture question)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('renders all 8 products before typing', async ({ page }) => {
    await expect(page.locator('#results .result-item')).toHaveCount(8);
    await expect(page.locator('#count')).toContainText('8');
  });

  test('filters case-insensitively as the user types', async ({ page }) => {
    await page.fill('#search', 'APPLE');
    await expect(page.locator('#results .result-item')).toHaveCount(3);
    await expect(page.locator('#count')).toContainText('3');
    await expect(page.locator('#empty')).toBeHidden();
  });

  test('shows "No results found" for a non-matching query', async ({ page }) => {
    await page.fill('#search', 'zzzz');
    await expect(page.locator('#results .result-item')).toHaveCount(0);
    await expect(page.locator('#empty')).toBeVisible();
  });

  test('clearing the query restores all results', async ({ page }) => {
    await page.fill('#search', 'apple');
    await expect(page.locator('#results .result-item')).toHaveCount(3);
    await page.fill('#search', '');
    await expect(page.locator('#results .result-item')).toHaveCount(8);
    await expect(page.locator('#empty')).toBeHidden();
  });

  test('a partial query matches substrings', async ({ page }) => {
    await page.fill('#search', 'phone');
    await expect(page.locator('#results .result-item')).toHaveCount(2);
  });
});
