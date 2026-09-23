const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

const firstRowName = (page) =>
  page.locator('#table-body tr').first().locator('td').first().innerText();

test.describe('15 — Dynamic Table (render / filter / sort)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('renders all rows on load', async ({ page }) => {
    await expect(page.locator('#table-body tr')).toHaveCount(6);
    await expect(page.locator('#row-count')).toContainText('6');
  });

  test('filters by city, case-insensitively', async ({ page }) => {
    await page.fill('#filter', 'LONDON');
    await expect(page.locator('#table-body tr')).toHaveCount(1);
    await expect(page.locator('#table-body tr').first()).toContainText('Ada Lovelace');
  });

  test('a non-matching filter shows no rows', async ({ page }) => {
    await page.fill('#filter', 'zzzz');
    await expect(page.locator('#table-body tr')).toHaveCount(0);
  });

  test('sorts by name A-Z', async ({ page }) => {
    await page.locator('#sort-name').click();
    expect(await firstRowName(page)).toBe('Ada Lovelace');
  });

  test('sorts by age ascending', async ({ page }) => {
    await page.locator('#sort-age').click();
    expect(await firstRowName(page)).toBe('Margaret Hamilton');
  });
});
