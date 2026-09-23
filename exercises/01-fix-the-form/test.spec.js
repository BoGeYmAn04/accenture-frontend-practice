const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('01 — Fix the Form (HTML semantics & accessibility)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('every field has an associated, non-empty label', async ({ page }) => {
    for (const id of ['fullname', 'email', 'phone', 'password']) {
      const label = page.locator(`label[for="${id}"]`);
      await expect(label, `label[for="${id}"] should exist`).toHaveCount(1);
      await expect(label, `label[for="${id}"] should have text`).not.toBeEmpty();
    }
  });

  test('inputs use the correct types', async ({ page }) => {
    await expect(page.locator('#email')).toHaveAttribute('type', 'email');
    await expect(page.locator('#phone')).toHaveAttribute('type', 'tel');
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  test('required fields are marked required', async ({ page }) => {
    for (const id of ['fullname', 'email', 'password']) {
      await expect(page.locator(`#${id}`), `#${id} should be required`).toHaveAttribute(
        'required',
        ''
      );
    }
  });

  test('fields are grouped in a fieldset with a legend', async ({ page }) => {
    await expect(page.locator('form fieldset')).toHaveCount(1);
    await expect(page.locator('form fieldset > legend')).toHaveCount(1);
    await expect(page.locator('form fieldset > legend')).not.toBeEmpty();
  });

  test('submitting shows a message containing the entered name', async ({ page }) => {
    await page.fill('#fullname', 'Ada Lovelace');
    await page.fill('#email', 'ada@example.com');
    await page.fill('#password', 'secret123');
    await page.click('button[type="submit"]');
    await expect(page.locator('#result')).toContainText('Ada Lovelace');
  });
});
