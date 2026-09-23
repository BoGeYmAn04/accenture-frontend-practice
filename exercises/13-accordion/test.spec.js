const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('13 — Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('all panels start closed', async ({ page }) => {
    const bodies = page.locator('.accordion-body');
    const count = await bodies.count();
    for (let i = 0; i < count; i += 1) {
      await expect(bodies.nth(i)).toBeHidden();
    }
  });

  test('clicking a header opens its panel', async ({ page }) => {
    await page.locator('.accordion-header').nth(0).click();
    await expect(page.locator('.accordion-body').nth(0)).toBeVisible();
    await expect(page.locator('.accordion-header').nth(0)).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  test('opening one panel closes the others', async ({ page }) => {
    await page.locator('.accordion-header').nth(0).click();
    await expect(page.locator('.accordion-body').nth(0)).toBeVisible();
    await page.locator('.accordion-header').nth(1).click();
    await expect(page.locator('.accordion-body').nth(0)).toBeHidden();
    await expect(page.locator('.accordion-body').nth(1)).toBeVisible();
  });

  test('clicking an open header closes it again', async ({ page }) => {
    await page.locator('.accordion-header').nth(1).click();
    await expect(page.locator('.accordion-body').nth(1)).toBeVisible();
    await page.locator('.accordion-header').nth(1).click();
    await expect(page.locator('.accordion-body').nth(1)).toBeHidden();
  });
});
