const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('06 — To-Do List (create / toggle / delete)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  async function add(page, text) {
    await page.fill('#todo-input', text);
    await page.click('#todo-form button[type="submit"]');
  }

  test('shows the empty message until a task is added', async ({ page }) => {
    await expect(page.locator('#empty')).toBeVisible();
    await add(page, 'Buy milk');
    await expect(page.locator('#empty')).toBeHidden();
    await expect(page.locator('#todo-list .todo-item')).toHaveCount(1);
    await expect(page.locator('#todo-list .todo-item').first()).toContainText('Buy milk');
  });

  test('ignores empty submissions', async ({ page }) => {
    await add(page, '   ');
    await expect(page.locator('#todo-list .todo-item')).toHaveCount(0);
  });

  test('toggling marks a task as completed', async ({ page }) => {
    await add(page, 'Task one');
    const item = page.locator('#todo-list .todo-item').first();
    await item.locator('.todo-toggle').click();
    await expect(item).toHaveClass(/completed/);
  });

  test('deleting removes the task', async ({ page }) => {
    await add(page, 'Task one');
    await add(page, 'Task two');
    await expect(page.locator('#todo-list .todo-item')).toHaveCount(2);
    await page.locator('#todo-list .todo-item').first().locator('.todo-delete').click();
    await expect(page.locator('#todo-list .todo-item')).toHaveCount(1);
    await expect(page.locator('#todo-list .todo-item').first()).toContainText('Task two');
  });

  test('empty message returns when all tasks are deleted', async ({ page }) => {
    await add(page, 'Only task');
    await page.locator('#todo-list .todo-item').first().locator('.todo-delete').click();
    await expect(page.locator('#empty')).toBeVisible();
  });
});
