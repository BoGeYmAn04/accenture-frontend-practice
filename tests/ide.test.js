const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..');
const origin = 'http://127.0.0.1:4181';
function files(slug, solution = false) {
  return Object.fromEntries(['index.html', 'style.css', 'script.js'].map(name => {
    const file = path.join(root, 'exercises', slug, solution ? 'solution' : '', name);
    return [name, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''];
  }));
}
test('browser IDE grades actual submissions and preserves drafts and starter files', { timeout: 180000 }, async () => {
  const server = spawn(process.execPath, ['server.js'], { cwd: root, env: { ...process.env, PORT: '4181' }, windowsHide: true });
  let browser;
  try {
    await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); server.once('exit', code => reject(new Error(`Server exited: ${code}`))); });
    const post = (endpoint, value) => fetch(origin + endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
    const slug = '03-click-counter', starter = files(slug);
    let response = await post('/api/run', { slug: '../bad', files: starter }); assert.equal(response.status, 400);
    response = await fetch(origin + '/api/run', { method: 'POST', headers: { Origin: 'https://example.com' } }); assert.equal(response.status, 403);
    response = await fetch(origin + '/.git/config'); assert.equal(response.status, 404);
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(origin);
    await page.getByRole('link', { name: 'Start coding' }).nth(2).click();
    await page.waitForFunction(() => !document.getElementById('run').disabled);
    await page.getByRole('button', { name: 'Run Code', exact: false }).click();
    await page.waitForFunction(() => /passed/.test(document.getElementById('score').textContent), null, { timeout: 60000 });
    assert.notEqual(await page.locator('#score').textContent(), '4 / 4 passed');
    const solution = files(slug, true);
    for (const [file, label] of [['index.html', 'HTML'], ['style.css', 'CSS'], ['script.js', 'JavaScript']]) {
      await page.getByRole('tab', { name: label, exact: true }).click();
      await page.locator('#editor').fill(solution[file]);
    }
    await page.reload(); await page.waitForFunction(() => !document.getElementById('run').disabled);
    await page.getByRole('tab', { name: 'JavaScript', exact: true }).click();
    assert.equal(await page.locator('#editor').inputValue(), solution['script.js'].replace(/\r\n/g, '\n'));
    await page.getByRole('button', { name: 'Run Code', exact: false }).click();
    await page.waitForFunction(() => document.getElementById('score').textContent === '4 / 4 passed', null, { timeout: 60000 });
    assert.equal(await page.locator('#results li').count(), 4);
    assert.deepEqual(files(slug), starter);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    for (const example of ['02-style-the-profile-card', '18-fetch-and-render', '19-persistent-todo']) {
      const result = await (await post('/api/run', { slug: example, files: files(example, true) })).json();
      assert.ok(result.total > 0, JSON.stringify(result)); assert.equal(result.passed, result.total, JSON.stringify(result));
    }
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Reset draft' }).click();
    assert.equal(await page.locator('#editor').inputValue(), starter['script.js'].replace(/\r\n/g, '\n'));
  } finally { await browser?.close(); server.kill(); }
});
