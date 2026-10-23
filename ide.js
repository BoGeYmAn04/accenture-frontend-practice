const $ = id => document.getElementById(id);
const slug = new URLSearchParams(location.search).get('exercise');
const storageKey = `frontend-practice:draft:${slug}`;
let sources = {}, original = {}, active = 'index.html', revision = 0, busy = false, leaveEditor = false;
const names = { 'index.html': 'HTML', 'style.css': 'CSS', 'script.js': 'JavaScript' };
// Keep histories per file: assigning textarea.value when switching tabs clears
// the browser's native undo stack, and setRangeText does not create undo steps.
const histories = {};
let beforeEdit = null;
function snapshotEditor() {
  const editor = $('editor');
  return { value: editor.value, start: editor.selectionStart, end: editor.selectionEnd, direction: editor.selectionDirection };
}
function history() { return histories[active] ||= { undo: [], redo: [] }; }
function remember(before) {
  if (!before || before.value === $('editor').value) return;
  const stack = history();
  stack.undo.push(before);
  if (stack.undo.length > 200) stack.undo.shift();
  stack.redo = [];
}
function restoreEdit(redo = false) {
  const stack = history(), from = redo ? stack.redo : stack.undo, to = redo ? stack.undo : stack.redo;
  const state = from.pop();
  if (!state) return;
  to.push(snapshotEditor());
  $('editor').value = state.value;
  $('editor').setSelectionRange(state.start, state.end, state.direction);
  beforeEdit = null;
  save();
}
function indentSelection(outdent) {
  const editor = $('editor'), before = snapshotEditor();
  const { value, start, end } = before;
  if (start === end && !outdent) {
    editor.setRangeText('  ', start, end, 'end');
  } else {
    const first = start === 0 ? 0 : value.lastIndexOf('\n', start - 1) + 1;
    // A selection ending at the next line's start does not include that line.
    const last = end > start && value[end - 1] === '\n' ? end - 1 : end;
    const newline = value.indexOf('\n', last);
    const limit = newline === -1 ? value.length : newline;
    const lines = value.slice(first, limit).split('\n');
    let offset = first;
    const edits = lines.map(line => {
      const remove = outdent ? (line.match(/^( {1,2}|\t)/)?.[0].length || 0) : 0;
      const edit = { at: offset, remove, insert: outdent ? '' : '  ' };
      offset += line.length + 1;
      return edit;
    });
    function move(position) {
      return position + edits.reduce((delta, edit) => {
        if (edit.at > position) return delta;
        return delta + edit.insert.length - Math.min(edit.remove, position - edit.at);
      }, 0);
    }
    const replacement = lines.map((line, i) => edits[i].insert + line.slice(edits[i].remove)).join('\n');
    editor.setRangeText(replacement, first, limit, 'preserve');
    editor.setSelectionRange(move(start), move(end), before.direction);
  }
  remember(before);
  save();
}

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
  beforeEdit = null;
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
$('editor').addEventListener('beforeinput', event => {
  if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
    event.preventDefault(); restoreEdit(event.inputType === 'historyRedo'); return;
  }
  beforeEdit = snapshotEditor();
});
$('editor').addEventListener('input', () => {
  remember(beforeEdit || { value: sources[active], start: 0, end: 0, direction: 'none' });
  beforeEdit = null;
  save();
});
$('editor').addEventListener('scroll', () => { $('lines').scrollTop = $('editor').scrollTop; });
$('editor').addEventListener('click', position);
$('editor').addEventListener('keyup', position);
$('editor').addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && !event.altKey && (key === 'z' || key === 'y')) {
    event.preventDefault(); restoreEdit(key === 'y' || event.shiftKey); return;
  }
  if (event.key === 'Escape') { leaveEditor = true; return; }
  if (event.key === 'Tab' && !leaveEditor) { event.preventDefault(); indentSelection(event.shiftKey); }
  leaveEditor = false;
});
document.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !$('run').disabled) { event.preventDefault(); run(); } });
function showBrief(solution) {
  $('problem-panel').hidden = solution;
  $('solution-panel').hidden = !solution;
  $('problem-tab').setAttribute('aria-selected', String(!solution));
  $('solution-tab').setAttribute('aria-selected', String(solution));
  $('problem-tab').tabIndex = solution ? -1 : 0;
  $('solution-tab').tabIndex = solution ? 0 : -1;
  document.querySelector('aside').scrollTop = 0;
}
$('problem-tab').onclick = () => showBrief(false);
$('solution-tab').onclick = () => showBrief(true);
for (const id of ['problem-tab', 'solution-tab']) {
  $(id).onkeydown = event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const solution = event.key === 'End' || (event.key !== 'Home' && id === 'problem-tab');
    showBrief(solution);
    $(solution ? 'solution-tab' : 'problem-tab').focus();
  };
}
function loadQuestionInfo(exercise) {
  // An already-running server may still return the older API response.
  // Missing metadata is not proof that this is the last question.
  const catalog = typeof exercises === 'undefined' ? [] : exercises;
  const index = catalog.findIndex(item => item.slug === slug);
  const hasNavigation = Object.prototype.hasOwnProperty.call(exercise, 'next');
  const next = hasNavigation ? exercise.next : catalog[index + 1]?.slug;
  const known = hasNavigation || index >= 0;
  const number = exercise.number || (index >= 0 ? index + 1 : null);
  const total = exercise.total || catalog.length;
  if (number && total) $('question-number').textContent = 'Question ' + number + ' / ' + total;
  $('next-question').disabled = !known || !next;
  $('next-question').textContent = !known ? 'Navigation unavailable' : next ? 'Next question →' : 'Last question';
  $('next-question').onclick = () => {
    if (known && next) location.assign('/ide.html?exercise=' + encodeURIComponent(next));
  };
  $('solution-files').replaceChildren();
  for (const file of Object.keys(names)) {
    const heading = document.createElement('h3'); heading.textContent = file;
    const source = exercise.solution?.[file];
    const content = document.createElement(source ? 'pre' : 'p');
    content.textContent = source || 'No reference code for this file.';
    if (source) { content.tabIndex = 0; content.setAttribute('aria-label', names[file] + ' reference code'); }
    $('solution-files').append(heading, content);
  }
}
$('run').onclick = run;
$('preview-button').onclick = async () => { $('preview-button').disabled = true; try { await preview(); } catch (error) { showError(error); } finally { $('preview-button').disabled = false; } };
$('reset').onclick = () => { if (!confirm('Reset all three files to the original starter code? This replaces your saved draft.')) return; sources = { ...original }; Object.keys(histories).forEach(file => delete histories[file]); select(active); save(); $('results').replaceChildren(); $('score').textContent = 'Not run yet'; $('summary').textContent = 'Draft reset. Run Code to check the starter files.'; preview().catch(showError); };
(async () => {
  try {
    const exercise = await api('/api/exercise?slug=' + encodeURIComponent(slug));
    original = exercise.files; sources = { ...original };
    try { const saved = JSON.parse(localStorage.getItem(storageKey)); if (saved && Object.keys(names).every(file => typeof saved[file] === 'string')) sources = Object.fromEntries(Object.keys(names).map(file => [file, saved[file]])); } catch { /* Continue with starter files if storage is unavailable. */ }
    $('title').textContent = exercise.task.split('\n')[0].replace(/^#\s*/, ''); document.title = $('title').textContent + ' · Coding workspace';
    taskMarkdown(exercise.task); loadQuestionInfo(exercise); select(active);
    ['editor', 'run', 'reset', 'preview-button'].forEach(id => $(id).disabled = false);
    $('save-status').textContent = 'Drafts save in this browser';
    await preview();
  } catch (error) { $('title').textContent = 'Unable to load workspace'; showError(error); }
})();
