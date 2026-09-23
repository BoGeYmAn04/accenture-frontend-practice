const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('07 — Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('blocks an empty submission and shows all errors', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('#username-error')).not.toBeEmpty();
    await expect(page.locator('#email-error')).not.toBeEmpty();
    await expect(page.locator('#password-error')).not.toBeEmpty();
    await expect(page.locator('#form-msg')).toBeEmpty();
  });

  test('flags an invalid email format', async ({ page }) => {
    await page.fill('#username', 'ada');
    await page.fill('#email', 'not-an-email');
    await page.fill('#password', 'secret1');
    await page.click('button[type="submit"]');
    await expect(page.locator('#email-error')).not.toBeEmpty();
    await expect(page.locator('#form-msg')).toBeEmpty();
  });

  test('flags a short password', async ({ page }) => {
    await page.fill('#username', 'ada');
    await page.fill('#email', 'ada@example.com');
    await page.fill('#password', '123');
    await page.click('button[type="submit"]');
    await expect(page.locator('#password-error')).not.toBeEmpty();
  });

  test('accepts a valid submission', async ({ page }) => {
    await page.fill('#username', 'ada');
    await page.fill('#email', 'ada@example.com');
    await page.fill('#password', 'secret1');
    await page.click('button[type="submit"]');
    await expect(page.locator('#form-msg')).not.toBeEmpty();
    await expect(page.locator('#username-error')).toBeEmpty();
    await expect(page.locator('#email-error')).toBeEmpty();
    await expect(page.locator('#password-error')).toBeEmpty();
  });
});
