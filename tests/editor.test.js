const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

test('editor preserves selected lines and supports independent undo/redo per file', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const initial = 'first\nsecond\nthird';
    await page.route('http://ide.test/**', route => {
      const pathname = new URL(route.request().url()).pathname;
      if (pathname === '/api/exercise') return route.fulfill({ json: { task: '# Test task', files: { 'index.html': initial, 'style.css': 'body {}', 'script.js': '' } } });
      if (pathname === '/api/preview') return route.fulfill({ json: { url: 'about:blank' } });
      const name = pathname.slice(1);
      if (!['ide.html', 'ide.js', 'ide.css'].includes(name)) return route.abort();
      return route.fulfill({ body: fs.readFileSync(path.join(__dirname, '..', name)), contentType: name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html' });
    });
    await page.goto('http://ide.test/ide.html?exercise=test');
    await page.waitForFunction(() => !document.getElementById('editor').disabled);
    const editor = page.locator('#editor');
    await editor.focus();
    await editor.press('Control+a'); await editor.press('Tab');
    assert.equal(await editor.inputValue(), '  first\n  second\n  third');
    await editor.press('Control+z'); assert.equal(await editor.inputValue(), initial);
    await editor.press('Control+y'); assert.equal(await editor.inputValue(), '  first\n  second\n  third');
    await editor.press('Shift+Tab'); assert.equal(await editor.inputValue(), initial);
    await editor.press('Control+z'); assert.equal(await editor.inputValue(), '  first\n  second\n  third');
    await editor.press('Control+Shift+z'); assert.equal(await editor.inputValue(), initial);
    // Do not indent the following line when selection ends at its first column.
    await editor.evaluate(el => el.setSelectionRange(0, 6));
    await editor.press('Tab'); assert.equal(await editor.inputValue(), '  first\nsecond\nthird');
    await editor.press('Control+z');
    await editor.press('Control+End'); await editor.press('Tab');
    assert.equal(await editor.inputValue(), initial + '  ');
    await editor.press('Control+z'); assert.equal(await editor.inputValue(), initial);
    // Native typing, deletion and replacement must also use the same history.
    await editor.press('Control+End'); await editor.press('x');
    await editor.press('Backspace'); assert.equal(await editor.inputValue(), initial);
    await editor.press('Control+z'); assert.equal(await editor.inputValue(), initial + 'x');
    await page.getByRole('tab', { name: 'CSS', exact: true }).click();
    await editor.focus(); await editor.press('Control+End'); await editor.press('y');
    await page.getByRole('tab', { name: 'HTML', exact: true }).click();
    await editor.focus(); await editor.press('Control+z'); assert.equal(await editor.inputValue(), initial);
    await page.getByRole('tab', { name: 'CSS', exact: true }).click();
    await editor.focus(); await editor.press('Control+z'); assert.equal(await editor.inputValue(), 'body {}');
    await editor.press('Control+a'); await page.keyboard.insertText('replacement\ntext');
    await editor.press('Control+z'); assert.equal(await editor.inputValue(), 'body {}');
    await editor.press('Control+y'); assert.equal(await editor.inputValue(), 'replacement\ntext');
    await editor.press('Control+z'); await editor.press('Control+End'); await editor.press('!');
    await editor.press('Control+y'); assert.equal(await editor.inputValue(), 'body {}!');
    const draft = await page.evaluate(() => JSON.parse(localStorage.getItem('frontend-practice:draft:test')));
    assert.equal(draft['style.css'], 'body {}!');
    await editor.press('Escape'); await editor.press('Tab');
    assert.equal(await editor.evaluate(el => el === document.activeElement), false);
  } finally { await browser.close(); }
});
