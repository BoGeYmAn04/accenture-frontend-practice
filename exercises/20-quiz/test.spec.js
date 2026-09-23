const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

test.describe('20 — Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  async function answer(page, index) {
    await page.locator('#options .option').nth(index).click();
    await page.locator('#next').click();
  }

  test('shows the first question', async ({ page }) => {
    await expect(page.locator('#progress')).toHaveText('Question 1 of 3');
    await expect(page.locator('#options .option')).toHaveCount(3);
  });

  test('advances through the questions', async ({ page }) => {
    await answer(page, 0);
    await expect(page.locator('#progress')).toHaveText('Question 2 of 3');
    await answer(page, 1);
    await expect(page.locator('#progress')).toHaveText('Question 3 of 3');
  });

  test('scores a perfect run', async ({ page }) => {
    await answer(page, 0);
    await answer(page, 1);
    await answer(page, 1);
    await expect(page.locator('#score')).toBeVisible();
    await expect(page.locator('#score')).toContainText('3 / 3');
  });

  test('scores partial when an answer is wrong', async ({ page }) => {
    await answer(page, 1); // wrong for question 1
    await answer(page, 1);
    await answer(page, 1);
    await expect(page.locator('#score')).toContainText('2 / 3');
  });
});
