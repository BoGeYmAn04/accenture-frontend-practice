const { test, expect } = require('@playwright/test');
const path = require('path');

const dir = path.basename(__dirname);
const prefix = process.env.SOLUTION ? 'solution/' : '';
const url = `/exercises/${dir}/${prefix}index.html`;

const styles = (locator, props) =>
  locator.evaluate((el, props) => {
    const cs = getComputedStyle(el);
    return Object.fromEntries(props.map((p) => [p, cs[p]]));
  }, props);

test.describe('02 — Style the Profile Card (CSS fundamentals)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('card has rounded corners, padding and a shadow', async ({ page }) => {
    const s = await styles(page.locator('.profile-card'), [
      'borderTopLeftRadius',
      'paddingTop',
      'boxShadow',
      'backgroundColor',
    ]);
    expect(parseFloat(s.borderTopLeftRadius)).toBeGreaterThanOrEqual(12);
    expect(parseFloat(s.paddingTop)).toBeGreaterThanOrEqual(16);
    expect(s.boxShadow).not.toBe('none');
    expect(s.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('avatar is a circle', async ({ page }) => {
    const s = await styles(page.locator('.avatar'), [
      'width',
      'height',
      'borderTopLeftRadius',
    ]);
    const w = parseFloat(s.width);
    const h = parseFloat(s.height);
    expect(w).toBeGreaterThanOrEqual(64);
    expect(Math.abs(w - h)).toBeLessThanOrEqual(1);
    expect(parseFloat(s.borderTopLeftRadius)).toBeGreaterThanOrEqual(w / 2 - 1);
  });

  test('name is bold and role is muted', async ({ page }) => {
    const name = await styles(page.locator('.name'), ['fontWeight']);
    const role = await styles(page.locator('.role'), ['color']);
    expect(parseInt(name.fontWeight, 10)).toBeGreaterThanOrEqual(600);
    expect(role.color).not.toBe('rgb(15, 23, 42)');
  });

  test('tags render as styled chips in a row', async ({ page }) => {
    const list = await styles(page.locator('.tags'), ['listStyleType', 'display']);
    const tag = await styles(page.locator('.tag').first(), [
      'paddingTop',
      'backgroundColor',
      'borderTopLeftRadius',
    ]);
    expect(list.listStyleType).toBe('none');
    expect(list.display).toBe('flex');
    expect(parseFloat(tag.paddingTop)).toBeGreaterThan(0);
    expect(tag.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(parseFloat(tag.borderTopLeftRadius)).toBeGreaterThan(0);
  });

  test('follow button looks clickable', async ({ page }) => {
    const s = await styles(page.locator('.follow-btn'), [
      'cursor',
      'backgroundColor',
      'color',
      'paddingTop',
    ]);
    expect(s.cursor).toBe('pointer');
    expect(s.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(s.color).toBe('rgb(255, 255, 255)');
    expect(parseFloat(s.paddingTop)).toBeGreaterThan(0);
  });
});
