const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('14 — Tab Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('the first tab is active on load', async ({ page }) => {
    await expect(page.locator('.tab').nth(0)).toHaveClass(/active/);
    await expect(page.locator('.panel[data-panel="overview"]')).toBeVisible();
    await expect(page.locator('.panel[data-panel="features"]')).toBeHidden();
    await expect(page.locator('.panel[data-panel="pricing"]')).toBeHidden();
  });

  test('clicking a tab shows its panel', async ({ page }) => {
    await page.locator('.tab[data-tab="features"]').click();
    await expect(page.locator('.panel[data-panel="features"]')).toBeVisible();
    await expect(page.locator('.panel[data-panel="overview"]')).toBeHidden();
  });

  test('the active tab and aria-selected stay in sync', async ({ page }) => {
    await page.locator('.tab[data-tab="pricing"]').click();
    await expect(page.locator('.tab[data-tab="pricing"]')).toHaveClass(/active/);
    await expect(page.locator('.tab[data-tab="pricing"]')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await expect(page.locator('.tab[data-tab="overview"]')).not.toHaveClass(/active/);
    await expect(page.locator('.tab[data-tab="overview"]')).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});
