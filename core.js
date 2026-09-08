(function (root) {
  'use strict';
  const bank = [], groups = [];
  const domains = {env: 'Gestión del entorno SecOps', response: 'Respuesta a incidentes', hunt: 'Threat hunting'};
  const weights = {env: 21, response: 19, hunt: 10};
  // Compact authoring format: prompt | correct answer(s) | distractors | explanation.
  // Multiple correct answers are separated by ~; displayed options are always shuffled.
  function add(domain, topic, chapter, sources, rows) {
    const group = {domain, topic, chapter, sources, count: rows.length};
    groups.push(group);
    rows.forEach((row) => {
      const fields = row.split('¦');
      if (fields.length !== 6) throw Error('Invalid question: ' + row);
      const [prompt, right, a, b, c, explanation] = fields;
      const good = right.split('~');
      const choices = [...good, a, b, c].filter(Boolean);
      bank.push({id: domain + '-' + String(bank.filter(q => q.domain === domain).length + 1).padStart(3, '0'), domain, topic, chapter, sources, prompt, choices, correct: good.map((_, i) => i), explanation});
    });
  }
  function shuffle(items, random = Math.random) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]];}
    return a;
  }
  const correct = (q, selected) => Array.isArray(selected) && selected.length === q.correct.length && q.correct.every(i => selected.includes(i));
  function sample(pool, n, stats = {}) {
    // Prefer unseen questions without fixing their ordering across attempts.
    return shuffle(pool).sort((a, b) => (stats[a.id]?.seen || 0) - (stats[b.id]?.seen || 0)).slice(0, n);
  }
  function session(mode, pool, count, stats = {}, minutes = 90) {
    const questions = mode === 'exam' ? shuffle(Object.entries(weights).flatMap(([d,n]) => sample(bank.filter(q => q.domain === d), n, stats))) : sample(pool, count, stats);
    if (!questions.length) throw Error('No hay preguntas para estos filtros.');
    return {id: (globalThis.crypto?.randomUUID?.() || Date.now() + '-' + Math.random()), mode, started: Date.now(), deadline: mode === 'exam' ? Date.now() + minutes * 60000 : null, index: 0, ids: questions.map(q => q.id), orders: Object.fromEntries(questions.map(q => [q.id, shuffle(q.choices.map((_, i) => i))])), answers: {}, checked: [], flagged: [], finished: null};
  }
  const blank = () => ({version: 1, stats: {}, bookmarks: [], history: [], active: null});
  function result(s) {
    const byDomain = Object.fromEntries(Object.keys(domains).map(d => [d, {right: 0, total: 0}]));
    let right = 0, answered = 0;
    s.ids.forEach(id => {const q = bank.find(q => q.id === id); const good = correct(q, s.answers[id]); right += +good; answered += +(s.answers[id]?.length > 0); byDomain[q.domain].right += +good; byDomain[q.domain].total++;});
    return {right, total: s.ids.length, answered, percent: Math.round(right / s.ids.length * 100), byDomain};
  }
  function record(state, s, id) {
    if (s.checked.includes(id)) return;
    const q = bank.find(q => q.id === id), old = state.stats[id] || {seen: 0, right: 0};
    const good = correct(q, s.answers[id]);
    state.stats[id] = {seen: old.seen + 1, right: old.right + +good, lastCorrect: good};
    s.checked.push(id);
  }
  function finish(state) {
    const s = state.active;
    if (!s || s.finished) return;
    s.ids.forEach(id => record(state, s, id));
    s.finished = Date.now();
    state.history = [JSON.parse(JSON.stringify(s)), ...state.history.filter(h => h.id !== s.id)].slice(0, 50);
  }
  function validate(raw) {
    const fail = () => {throw Error('El archivo no es una copia válida de SC-200 Lab.');};
    if (!raw || raw.version !== 1 || !raw.stats || typeof raw.stats !== 'object' || Array.isArray(raw.stats) || !Array.isArray(raw.bookmarks) || !Array.isArray(raw.history)) fail();
    const ids = new Set(bank.map(q => q.id)), qs = new Map(bank.map(q => [q.id, q]));
    const list = (v, allowed = ids) => Array.isArray(v) && new Set(v).size === v.length && v.every(x => allowed.has(x));
    const nat = n => Number.isSafeInteger(n) && n >= 0 && n < 1e9;
    const validSession = s => {
      if (!s || typeof s.id !== 'string' || s.id.length > 100 || !['exam','study','errors','bookmarks'].includes(s.mode) || !list(s.ids) || !s.ids.length || !nat(s.index) || s.index >= s.ids.length || !Number.isFinite(s.started) || !(s.deadline === null || Number.isFinite(s.deadline)) || !(s.finished === null || Number.isFinite(s.finished))) return false;
      if (!list(s.checked, new Set(s.ids)) || !list(s.flagged, new Set(s.ids)) || !s.answers || !s.orders) return false;
      if (s.mode === 'exam' && (!s.deadline || s.ids.length !== 50 || Object.entries(weights).some(([d,n]) => s.ids.filter(id => qs.get(id).domain === d).length !== n))) return false;
      return Object.keys(s.answers).every(id => s.ids.includes(id)) && s.ids.every(id => {
        const n = qs.get(id).choices.length, allowed = new Set(Array.from({length:n}, (_,i) => i));
        return list(s.orders[id], allowed) && s.orders[id].length === n && (!s.answers[id] || list(s.answers[id], allowed));
      });
    };
    if (!list(raw.bookmarks) || raw.history.length > 50 || !raw.history.every(h => validSession(h) && h.finished) || (raw.active !== null && !validSession(raw.active))) fail();
    const clean = blank();
    for (const [id, v] of Object.entries(raw.stats)) {if (!ids.has(id) || !v || !nat(v.seen) || !nat(v.right) || v.right > v.seen || typeof v.lastCorrect !== 'boolean') fail(); clean.stats[id] = {seen:v.seen, right:v.right, lastCorrect:v.lastCorrect};}
    clean.bookmarks = [...raw.bookmarks]; clean.history = raw.history; clean.active = raw.active;
    return JSON.parse(JSON.stringify(clean));
  }
  const api = {bank, groups, domains, weights, add, shuffle, correct, session, blank, result, record, finish, validate};
  root.SC = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
