// Offline browser checks. Uses local Chromium and playwright-core; no browser download.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile, mkdir} from 'node:fs/promises';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import {chromium} from 'playwright-core';
import {setTimeout as delay} from 'node:timers/promises';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const out = '/tmp/sc200-browser-results';
await mkdir(out, {recursive: true});
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.md':'text/plain'};
const server = createServer(async (req, res) => {
  try {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname).replace(/\/$/, '/index.html'));
    if (!file.startsWith(root + path.sep)) {res.writeHead(403).end(); return;}
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type': (mime[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8'}).end(data);
  } catch {res.writeHead(404).end();}
});
await new Promise((resolve, reject) => {server.once('error', reject); server.listen(0, '127.0.0.1', resolve);});
const url = `http://127.0.0.1:${server.address().port}/`;
const errors = [], external = [];
let browser;
const stored = page => page.evaluate(() => JSON.parse(localStorage.getItem('sc200lab:v1')));
async function navigate(page, hash = '') {await page.goto(url + hash); await page.waitForLoadState('networkidle');}
async function contains(locator, text) {assert.ok((await locator.textContent()).includes(text), `Missing text: ${text}`);}
async function count(locator, expected) {
  // Route changes render on hashchange, after the initiating click has returned.
  const deadline = Date.now() + 5000;
  while (await locator.count() !== expected && Date.now() < deadline) await delay(25);
  assert.equal(await locator.count(), expected);
}
async function screenshot(page, name) {await page.screenshot({path: `${out}/${name}.png`, fullPage:true});}
async function context(options = {}) {
  const ctx = await browser.newContext(options);
  await ctx.route('**/*', route => {
    const target = route.request().url();
    if (target.startsWith(url) || /^(file:|data:|blob:)/.test(target)) return route.continue();
    external.push(target); return route.abort();
  });
  ctx.on('page', page => page.on('pageerror', e => errors.push(String(e))));
  return ctx;
}
try {
  browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium', args:['--no-sandbox']});
  const ctx = await context({viewport:{width:1440,height:1000}, acceptDownloads:true});
  const page = await ctx.newPage();
  await navigate(page);
  await contains(page.locator('h1'), 'Entiende la decisión');
  assert.equal(await page.evaluate(() => SC.bank.length), 176);
  await screenshot(page, 'desktop-home');

  const legacyCtx = await context(), legacy = await legacyCtx.newPage();
  await navigate(legacy);
  await legacy.evaluate(() => {
    const q = SC.retiredQuestions['hunt-067'], raw = SC.blank();
    delete raw.bankRevision;
    raw.active = SC.session('study', [q], 1); delete raw.active.bankRevision;
    raw.active.answers[q.id] = [0]; raw.stats[q.id] = {seen:1,right:1,lastCorrect:true};
    localStorage.setItem('sc200lab:v1', JSON.stringify(raw));
  });
  await legacy.reload();
  await navigate(legacy, '#quiz');
  await contains(legacy.locator('.question'), 'consumo de ingesta');
  await legacy.locator('[data-action=check]').click();
  await contains(legacy.locator('.feedback'), 'Usage');
  await contains(legacy.locator('.info').first(), 'banco anterior');
  assert.equal((await stored(legacy)).stats['hunt-067'], undefined);
  await navigate(legacy, '#archive');
  await legacy.locator('#search').fill('hunt-067');
  await contains(legacy.locator('.bank-item'), 'dispositivo origen');
  await legacyCtx.close();
  console.log('PASS: home and archived legacy question');

  await navigate(page, '#study/env');
  await page.locator('#topic').selectOption('Permisos combinados y scopes');
  await page.locator('#count').selectOption('10');
  await page.locator('[data-action=start-study]').click();
  let index = (await stored(page)).active.ids.indexOf('env-216');
  await page.locator(`[data-action=jump][data-index="${index}"]`).click();
  await page.locator('input[name=answer][value="0"]').check();
  assert.ok(await page.locator('[data-action=check]').isDisabled());
  await page.locator('input[name=answer][value="1"]').check();
  await page.locator('[data-action=check]').click();
  await contains(page.locator('.feedback'), 'Correcto');
  await page.locator('[data-action=bookmark]').click();
  await page.locator('[data-action=flag]').click();
  await page.reload();
  await contains(page.locator('.feedback'), 'Correcto');
  assert.equal((await stored(page)).stats['env-216'].seen, 1);
  assert.ok((await stored(page)).bookmarks.includes('env-216'));
  await screenshot(page, 'desktop-feedback');
  index = (await stored(page)).active.ids.indexOf('env-215');
  await page.locator(`[data-action=jump][data-index="${index}"]`).click();
  await page.locator('input[name=answer][value="1"]').check();
  await page.locator('[data-action=check]').click();
  await count(page.locator('.feedback.wrong'), 1);
  await page.getByRole('button', {name:'Terminar sesión', exact:true}).click();
  await page.locator('#dialog-ok').click();
  assert.ok((await stored(page)).history[0].finished);
  await page.locator('#only-wrong').check();
  await count(page.locator('.review-item'), 9);
  await screenshot(page, 'desktop-results');

  await navigate(page, '#settings');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-action=export]').click();
  await (await downloadPromise).saveAs(`${out}/backup.json`);
  const expected = await stored(page);
  const other = await context(), second = await other.newPage();
  await navigate(second, '#settings');
  await second.locator('#import-file').setInputFiles(`${out}/backup.json`);
  await second.locator('#dialog-ok').click();
  assert.deepEqual(await stored(second), expected);
  await navigate(second, '#settings');
  await second.locator('#import-file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":1}')});
  await contains(second.locator('#notice'), 'no es una copia válida');
  assert.deepEqual(await stored(second), expected);

  console.log('PASS: study, scoring, bookmarks and export/import');
  await navigate(page, '#home');
  await page.locator('[data-action=start-exam]').click();
  const original = (await stored(page)).active;
  assert.equal(original.ids.length, 50);
  for (const [d,n] of [['env',21],['response',19],['hunt',10]]) assert.equal(original.ids.filter(id => id.startsWith(d + '-')).length, n);
  await page.locator('input[name=answer]').first().check();
  await count(page.locator('.feedback'), 0);
  const answered = (await stored(page)).active;
  await page.reload();
  const resumed = (await stored(page)).active;
  assert.equal(resumed.deadline, original.deadline);
  assert.deepEqual(resumed.orders, original.orders);
  assert.deepEqual(resumed.answers, answered.answers);
  await navigate(page, '#home');
  await page.getByRole('link', {name:'Continuar sesión'}).click();
  await page.evaluate(() => {const s = JSON.parse(localStorage.getItem('sc200lab:v1'));s.active.deadline=Date.now()-1;localStorage.setItem('sc200lab:v1',JSON.stringify(s));});
  await page.reload();
  await count(page.locator('.scorebox'), 1);
  assert.ok((await stored(page)).active.finished);
  assert.equal((await stored(page)).history.length, 2);
  console.log('PASS: balanced exam, resume and timer expiry');

  await navigate(page, '#bank');
  await page.locator('#search').fill('arg_max');
  assert.ok(!(await page.locator('#bank-count').textContent()).startsWith('0 preguntas'));
  await page.locator('.bank-item summary').first().click();
  await count(page.locator('.bank-item[open] .explanation'), 1);
  await page.locator('#search').fill('no-such-concept-9457');
  await contains(page.locator('#bank-count'), '0 preguntas');
  await page.locator('#search').fill('');
  await page.locator('[data-action=bank-next]').click();
  await contains(page.locator('#bank-count'), 'página 2');
  await page.locator('#search').fill('hunt-127');
  await page.locator('.bank-item summary').click();
  await contains(page.locator('pre'), 'parse_json(AdditionalFields)');
  await screenshot(page, 'desktop-kql');

  const mobile = await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const phone = await mobile.newPage();
  await navigate(phone, '#home');
  await screenshot(phone, 'mobile-home');
  assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await navigate(phone, '#study/hunt');
  await phone.locator('#count').selectOption('10');
  await phone.locator('[data-action=start-study]').click();
  await count(phone.locator('.question'), 1);
  assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await screenshot(phone, 'mobile-quiz');
  await navigate(phone, '#coverage');
  await count(phone.locator('.coverage-item'), 21);
  assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth));

  const restricted = await context(), noStorage = await restricted.newPage();
  await noStorage.addInitScript(() => {Storage.prototype.setItem = function(){throw new DOMException('disabled','SecurityError');};});
  await navigate(noStorage, '#study');
  await noStorage.locator('[data-action=start-study]').click();
  await count(noStorage.locator('.storage-warning'), 1);
  await count(noStorage.locator('.question'), 1);
  const offline = await context(), local = await offline.newPage();
  await local.goto(pathToFileURL(path.join(root,'index.html')).href);
  await local.waitForLoadState('networkidle');
  await contains(local.locator('h1'), 'Entiende la decisión');
  assert.equal(await local.evaluate(() => SC.bank.length), 176);
  console.log('PASS: bank, mobile, blocked storage and file://');

  const freshCtx = await context({viewport:{width:1280,height:900}}), fresh = await freshCtx.newPage();
  await navigate(fresh, '#study/env');
  await fresh.locator('#topic').selectOption('Permisos combinados y scopes');
  await fresh.locator('#count').selectOption('10');
  await fresh.locator('[data-action=start-study]').click();
  index = (await stored(fresh)).active.ids.indexOf('env-216');
  await fresh.locator(`[data-action=jump][data-index="${index}"]`).click();
  await count(fresh.locator('.option-review'), 0);
  await fresh.locator('input[name=answer][value="0"]').check();
  assert.ok(await fresh.locator('[data-action=check]').isDisabled());
  await fresh.locator('input[name=answer][value="1"]').check();
  await fresh.locator('[data-action=check]').click();
  await count(fresh.locator('.option-reasons li'), 4);
  await contains(fresh.locator('.note-sources'), 'SC-200.md');
  await contains(fresh.locator('.note-sources'), 'líneas');
  await count(fresh.locator('.feedback a[href^="https://"]'), 0);
  await fresh.reload();
  await count(fresh.locator('.option-reasons li'), 4);
  assert.equal((await stored(fresh)).stats['env-216'].seen, 1);
  await screenshot(fresh, 'notes-feedback');
  await fresh.getByRole('button', {name:'Terminar sesión', exact:true}).click();
  await fresh.locator('#dialog-ok').click();
  await fresh.locator('.review-item summary').first().click();
  await count(fresh.locator('.review-item[open] .option-reasons li'), 4);
  await navigate(fresh, '#bank');
  const ids = await fresh.evaluate(() => SC.bank.map(q => q.id));
  assert.equal(ids.length, 176);
  for (const id of ids) {
    await fresh.locator('#search').fill(id);
    await count(fresh.locator('.bank-item'), 1);
    await fresh.locator('.bank-item summary').click();
    await count(fresh.locator('.option-reasons li'), 4);
    await contains(fresh.locator('.note-sources'), 'SC-200.md');
  }
  await navigate(fresh, '#home');
  await contains(fresh.locator('.stat').first(), '176');
  await fresh.locator('[data-action=start-exam]').click();
  await count(fresh.locator('.option-review'), 0);
  await count(fresh.locator('.note-sources'), 0);
  console.log('PASS: all 176 active questions, explanations and source references');

  const oldCtx = await context(), oldPage = await oldCtx.newPage();
  await navigate(oldPage, '#settings');
  const fixture = path.join(root, 'tests/fixtures/revision4-progress.json');
  const raw = JSON.parse(await readFile(fixture, 'utf8'));
  await oldPage.locator('#import-file').setInputFiles(fixture);
  await oldPage.locator('#dialog-ok').click();
  const imported = await stored(oldPage);
  for (const key of ['active','history','bookmarks','stats']) assert.deepEqual(imported[key], raw[key]);
  await oldPage.getByRole('link', {name:'Continuar sesión'}).click();
  index = raw.active.ids.indexOf('hunt-081');
  await oldPage.locator(`[data-action=jump][data-index="${index}"]`).click();
  await contains(oldPage.locator('.question h1'), 'búsqueda histórica larga');
  await oldPage.locator('[data-action=check]').click();
  await contains(oldPage.locator('.feedback'), 'Correcto');
  await count(oldPage.locator('.note-sources'), 0);
  await navigate(oldPage, '#history');
  await oldPage.getByRole('link', {name:'Ver respuestas'}).first().click();
  await contains(oldPage.locator('.score-ring'), '100%');
  await navigate(oldPage, '#home');
  await contains(oldPage.locator('.stat').nth(1), '0');
  await navigate(oldPage, '#bank');
  await oldPage.locator('#search').fill('hunt-081');
  await contains(oldPage.locator('#bank-count'), '0 preguntas');
  await navigate(oldPage, '#archive');
  await oldPage.locator('#archive-bookmarks').check();
  await contains(oldPage.locator('#bank-count'), `${raw.bookmarks.length} preguntas`);
  await oldPage.locator('#search').fill('hunt-081');
  await count(oldPage.locator('.bank-item'), 1);
  await navigate(oldPage, '#settings');
  await contains(oldPage.locator('.settings-card').first(), 'Progreso del banco anterior');

  // Revision 5 export remains valid, including a retry of retired questions.
  const raw5 = JSON.parse(await readFile(path.join(root,'tests/fixtures/revision5-progress.json'),'utf8'));
  raw5.active = null;
  raw5.history[0].answers['env-004'] = [2];
  await oldPage.locator('#import-file').setInputFiles({name:'old5.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(raw5))});
  await oldPage.locator('#dialog-ok').click();
  assert.deepEqual((await stored(oldPage)).stats, raw5.stats);
  await navigate(oldPage, '#history');
  await oldPage.getByRole('link', {name:'Ver respuestas'}).first().click();
  await oldPage.locator('[data-action=retry-session]').click();
  await count(oldPage.locator('.question'), 1);
  assert.deepEqual((await stored(oldPage)).active.ids, ['env-004']);
  assert.equal((await stored(oldPage)).active.bankRevision, 5);
  await oldPage.locator('input[name=answer][value="0"]').check();
  await oldPage.locator('input[name=answer][value="1"]').check();
  await oldPage.locator('[data-action=check]').click();
  await contains(oldPage.locator('.feedback'), 'Correcto');
  const retest = await stored(oldPage);
  await oldPage.getByRole('button', {name:'Terminar sesión', exact:true}).click();
  await oldPage.locator('#dialog-ok').click();
  await contains(oldPage.locator('.score-ring'), '100%');
  assert.equal((await stored(oldPage)).stats['env-004'].seen, retest.stats['env-004'].seen);

  await navigate(phone, '#bank');
  await phone.locator('#search').fill('hunt-102');
  await phone.locator('.bank-item summary').click();
  await count(phone.locator('.option-reasons li'), 4);
  assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await screenshot(phone, 'mobile-notes-kql');

  assert.deepEqual(errors, [], 'JavaScript errors');
  assert.deepEqual(external, [], 'Unexpected external requests');
  console.log('PASS: desktop, mobile, all 176 active questions, source references, study, multiple answers, scoring, exam, resume, deadline, export/import, revision-4 progress, legacy questions, storage failure and file://. No JavaScript errors or external requests.');
  console.log('Screenshots:', out);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
