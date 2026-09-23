const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('19 — Persistent Notes (localStorage)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  async function add(page, text) {
    await page.fill('#note-input', text);
    await page.click('#note-form button[type="submit"]');
  }

  test('adds notes', async ({ page }) => {
    await add(page, 'Task A');
    await expect(page.locator('#notes .note')).toHaveCount(1);
    await expect(page.locator('#notes .note').first()).toContainText('Task A');
  });

  test('persists notes across a reload', async ({ page }) => {
    await add(page, 'Task A');
    await add(page, 'Task B');
    await page.reload();
    await expect(page.locator('#notes .note')).toHaveCount(2);
    await expect(page.locator('#notes .note').first()).toContainText('Task A');
  });

  test('deleting a note persists', async ({ page }) => {
    await add(page, 'Task A');
    await add(page, 'Task B');
    await page.locator('#notes .note').first().locator('.note-delete').click();
    await page.reload();
    await expect(page.locator('#notes .note')).toHaveCount(1);
    await expect(page.locator('#notes .note').first()).toContainText('Task B');
  });

  test('clearing removes everything and persists', async ({ page }) => {
    await add(page, 'Task A');
    await page.locator('#clear').click();
    await expect(page.locator('#notes .note')).toHaveCount(0);
    await expect(page.locator('#empty')).toBeVisible();
    await page.reload();
    await expect(page.locator('#notes .note')).toHaveCount(0);
  });
});
