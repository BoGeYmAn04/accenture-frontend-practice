const $ = id => document.getElementById(id);
const slug = new URLSearchParams(location.search).get('exercise');
const storageKey = `frontend-practice:draft:${slug}`;
let sources = {}, original = {}, active = 'index.html', revision = 0, busy = false, leaveEditor = false;
const names = { 'index.html': 'HTML', 'style.css': 'CSS', 'script.js': 'JavaScript' };
async function api(url, data) {
  const response = await fetch(url, data ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) } : {});
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Request failed.');
  return result;
}
function position() {
  const before = $('editor').value.slice(0, $('editor').selectionStart).split('\n');
  $('position').textContent = `Ln ${before.length}, Col ${before.at(-1).length + 1}`;
  $('lines').textContent = Array.from({ length: $('editor').value.split('\n').length }, (_, i) => i + 1).join('\n');
  $('lines').scrollTop = $('editor').scrollTop;
}
function save() {
  sources[active] = $('editor').value; revision++;
  try { localStorage.setItem(storageKey, JSON.stringify(sources)); $('save-status').textContent = 'Draft saved locally'; }
  catch { $('save-status').textContent = 'Storage unavailable — keep this tab open'; }
  if ($('results').children.length) $('summary').textContent = 'Code changed since the last run. Run Code again to update results.';
  position();
}
function select(file) {
  active = file; $('editor').value = sources[file]; $('filename').textContent = file;
  $('editor').setAttribute('aria-label', names[file] + ' code');
  document.querySelectorAll('[data-file]').forEach(button => { button.setAttribute('aria-selected', String(button.dataset.file === file)); button.tabIndex = button.dataset.file === file ? 0 : -1; });
  position();
}
function taskMarkdown(text) {
  // Render the repository brief as text, never as executable HTML.
  let code = null;
  for (const line of text.split('\n')) {
    if (line.startsWith('```')) { if (code) code = null; else { code = document.createElement('pre'); $('task').append(code); } continue; }
    if (code) { code.textContent += line + '\n'; continue; }
    if (!line.trim()) continue;
    const heading = line.match(/^(#{1,3})\s+(.*)/);
    const el = document.createElement(heading ? (heading[1].length === 1 ? 'h2' : 'h3') : 'p');
    const content = heading ? heading[2] : line;
    for (const part of content.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)) {
      const node = document.createElement(part.startsWith('`') ? 'code' : part.startsWith('**') ? 'strong' : 'span');
      node.textContent = part.startsWith('`') ? part.slice(1, -1) : part.startsWith('**') ? part.slice(2, -2) : part;
      el.append(node);
    }
    $('task').append(el);
  }
}
async function preview(snapshot = { ...sources }) {
  const result = await api('/api/preview', { slug, files: snapshot });
  $('preview').src = result.url;
}
function showError(error) { $('summary').textContent = error.message; $('summary').className = 'error'; }
async function run() {
  if (busy) return;
  busy = true; $('run').disabled = true; $('run').textContent = 'Running tests…';
  $('results').replaceChildren(); $('score').textContent = 'Running'; $('summary').className = '';
  $('summary').textContent = 'Checking your submission against the exercise test cases. This may take a moment.';
  const submittedRevision = revision, snapshot = { ...sources };
  try {
    // Preview failures must not prevent the grader from testing a submission.
    preview(snapshot).catch(() => {});
    const report = await api('/api/run', { slug, files: snapshot });
    $('score').textContent = `${report.passed} / ${report.total} passed`;
    $('summary').textContent = (report.passed === report.total ? 'All test cases passed. Well done!' : `${report.total - report.passed} test case(s) did not pass. Review the details below.`) + (submittedRevision !== revision ? ' Your code changed during this run; run again to test the latest edits.' : '');
    report.results.forEach(result => {
      const li = document.createElement('li'); li.className = result.status;
      const label = document.createElement('span'); label.textContent = `${result.status === 'passed' ? '✓ PASS' : result.status.toUpperCase()} · ${result.title}`; li.append(label);
      if (result.error) { const details = document.createElement('details'), summary = document.createElement('summary'), pre = document.createElement('pre'); summary.textContent = 'View test feedback'; pre.textContent = result.error; details.append(summary, pre); li.append(details); }
      $('results').append(li);
    });
  } catch (error) { $('score').textContent = 'Run unavailable'; showError(error); }
  finally { busy = false; $('run').disabled = false; $('run').textContent = '▶ Run Code'; }
}
document.querySelectorAll('[data-file]').forEach(button => {
  button.onclick = () => select(button.dataset.file);
  button.onkeydown = event => { if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return; event.preventDefault(); const tabs = [...document.querySelectorAll('[data-file]')]; const next = tabs[(tabs.indexOf(button) + (event.key === 'ArrowRight' ? 1 : 2)) % 3]; next.click(); next.focus(); };
});
$('editor').addEventListener('input', save);
$('editor').addEventListener('scroll', () => { $('lines').scrollTop = $('editor').scrollTop; });
$('editor').addEventListener('click', position);
$('editor').addEventListener('keyup', position);
$('editor').addEventListener('keydown', event => {
  if (event.key === 'Escape') { leaveEditor = true; return; }
  if (event.key === 'Tab' && !leaveEditor && !event.shiftKey) { event.preventDefault(); $('editor').setRangeText('  ', $('editor').selectionStart, $('editor').selectionEnd, 'end'); save(); }
  leaveEditor = false;
});
document.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !$('run').disabled) { event.preventDefault(); run(); } });
$('run').onclick = run;
$('preview-button').onclick = async () => { $('preview-button').disabled = true; try { await preview(); } catch (error) { showError(error); } finally { $('preview-button').disabled = false; } };
$('reset').onclick = () => { if (!confirm('Reset all three files to the original starter code? This replaces your saved draft.')) return; sources = { ...original }; select(active); save(); $('results').replaceChildren(); $('score').textContent = 'Not run yet'; $('summary').textContent = 'Draft reset. Run Code to check the starter files.'; preview().catch(showError); };
(async () => {
  try {
    const exercise = await api('/api/exercise?slug=' + encodeURIComponent(slug));
    original = exercise.files; sources = { ...original };
    try { const saved = JSON.parse(localStorage.getItem(storageKey)); if (saved && Object.keys(names).every(file => typeof saved[file] === 'string')) sources = Object.fromEntries(Object.keys(names).map(file => [file, saved[file]])); } catch { /* Continue with starter files if storage is unavailable. */ }
    $('title').textContent = exercise.task.split('\n')[0].replace(/^#\s*/, ''); document.title = $('title').textContent + ' · Coding workspace';
    taskMarkdown(exercise.task); select(active);
    ['editor', 'run', 'reset', 'preview-button'].forEach(id => $(id).disabled = false);
    $('save-status').textContent = 'Drafts save in this browser';
    await preview();
  } catch (error) { $('title').textContent = 'Unable to load workspace'; showError(error); }
})();
