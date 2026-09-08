const {test} = require('node:test');
const assert = require('node:assert/strict');
const SC = require('../core');require('../sources');require('../environment');require('../response');require('../hunting');require('../references');

test('sesiones antiguas conservan preguntas y notas sin atribuir dominio a reemplazos',()=>{
  const q=SC.bank.find(q=>q.id==='hunt-067'), old=SC.previousQuestions[q.id];
  const raw=SC.blank();delete raw.bankRevision;
  raw.active=SC.session('study',[q],1);delete raw.active.bankRevision;
  raw.active.answers[q.id]=[...old.correct];
  raw.stats[q.id]={seen:1,right:1,lastCorrect:true};raw.bookmarks=[q.id,'hunt-001'];
  const clean=SC.validate(JSON.parse(JSON.stringify(raw)));
  assert.equal(SC.questionFor(clean.active,q.id).prompt,old.prompt);
  assert.match(SC.questionFor(clean.active,q.id).prompt,/consumo de ingesta/);
  assert.equal(SC.result(clean.active).percent,100);
  assert.equal(clean.stats[q.id],undefined);
  assert.deepEqual(clean.bookmarks,['hunt-001']);
  SC.finish(clean);assert.equal(clean.history.length,1);assert.equal(clean.stats[q.id],undefined);
  assert.equal(SC.result(SC.validate(clean).history[0]).percent,100);
  const fresh=SC.session('study',[q],1);
  assert.match(SC.questionFor(fresh,q.id).prompt,/dispositivo origen/);
});

test('la revisión mantiene KQL y referencias específicas de MDI y grafos',()=>{
  assert.equal(SC.bank.filter(q=>q.code).length,20);
  for(const id of ['env-042','response-084'])assert.deepEqual(SC.bank.find(q=>q.id===id).sources,['mdiactions']);
  assert.match(SC.bank.find(q=>q.id==='env-042').prompt,/v3.x/);
  assert.match(SC.bank.find(q=>q.id==='response-084').prompt,/v2.x/);
  assert.equal(SC.bank.filter(q=>q.sources.includes('huntinggraph')).length,6);
  assert.equal(SC.bank.filter(q=>q.domain==='hunt'&&q.sources.includes('incidents')).length,4);
  assert.ok(SC.bank.some(q=>q.sources.includes('sentinelgraph')));
  assert.ok(SC.bank.some(q=>q.sources.includes('graphvisual')));
  const raw=SC.blank();raw.bankRevision=999;assert.throws(()=>SC.validate(raw));
});

test('500 preguntas únicas, 50 grupos y distribución 210/190/100',()=>{
  assert.equal(SC.bank.length,500);assert.equal(SC.groups.length,50);
  assert.equal(new Set(SC.bank.map(q=>q.id)).size,500);assert.equal(new Set(SC.bank.map(q=>q.prompt)).size,500);
  for(const [d,n] of Object.entries({env:210,response:190,hunt:100}))assert.equal(SC.bank.filter(q=>q.domain===d).length,n);
});
test('cada pregunta tiene opciones distintas, respuesta y referencias oficiales válidas',()=>{
  for(const q of SC.bank){assert.ok(q.prompt.length>25,q.id);assert.ok(q.explanation.length>25,q.id);assert.ok(q.choices.length>=4,q.id);assert.equal(new Set(q.choices).size,q.choices.length,q.id);assert.ok(q.correct.length>0);assert.ok(q.correct.length<q.choices.length);assert.ok(q.correct.every(i=>Number.isInteger(i)&&q.choices[i]));assert.ok(q.sources.length);for(const k of q.sources)assert.match(SC.sourceURL(k),/^https:\/\/learn\.microsoft\.com\/en-us\/(?!undefined).+$/);}
});
test('100 simulacros equilibrados sin preguntas repetidas y con opciones permutadas',()=>{
  let shuffled=false;
  for(let i=0;i<100;i++){const s=SC.session('exam',SC.bank,50);assert.equal(s.ids.length,50);assert.equal(new Set(s.ids).size,50);for(const [d,n]of Object.entries(SC.weights))assert.equal(s.ids.filter(id=>id.startsWith(d+'-')).length,n);for(const id of s.ids){const q=SC.bank.find(q=>q.id===id);assert.deepEqual([...s.orders[id]].sort(),q.choices.map((_,i)=>i));if(s.orders[id][0]!==0)shuffled=true;}}
  assert.ok(shuffled);
});
test('la selección múltiple exige el conjunto exacto, sin crédito parcial',()=>{
  const q=SC.bank.find(q=>q.correct.length===2);assert.ok(q);assert.equal(SC.correct(q,[...q.correct].reverse()),true);assert.equal(SC.correct(q,[q.correct[0]]),false);assert.equal(SC.correct(q,[...q.correct,2]),false);assert.equal(SC.correct(q,undefined),false);
});
test('los resultados no cuentan una respuesta dos veces',()=>{
  const st=SC.blank();st.active=SC.session('study',[SC.bank[0]],1);const s=st.active,q=SC.bank[0];s.answers[q.id]=[...q.correct];SC.record(st,s,q.id);SC.record(st,s,q.id);assert.equal(st.stats[q.id].seen,1);SC.finish(st);SC.finish(st);assert.equal(st.stats[q.id].seen,1);assert.equal(st.history.length,1);assert.equal(SC.result(s).percent,100);
});
test('fallos desaparecen cuando el último intento es correcto',()=>{
  const st=SC.blank(),q=SC.bank[0];st.active=SC.session('study',[q],1);st.active.answers[q.id]=[1];SC.finish(st);assert.equal(st.stats[q.id].lastCorrect,false);st.active=SC.session('study',[q],1);st.active.answers[q.id]=[0];SC.finish(st);assert.equal(st.stats[q.id].seen,2);assert.equal(st.stats[q.id].right,1);assert.equal(st.stats[q.id].lastCorrect,true);
});
test('exportar e importar conserva reloj, orden, selección y resultado',()=>{
  const st=SC.blank();st.active=SC.session('exam',SC.bank,50);st.active.answers[st.active.ids[0]]=[1];st.active.index=3;st.bookmarks=[st.active.ids[0]];assert.deepEqual(SC.validate(JSON.parse(JSON.stringify(st))),st);SC.finish(st);assert.deepEqual(SC.validate(JSON.parse(JSON.stringify(st))),st);
});
test('rechaza copias inválidas y opciones ajenas al esquema',()=>{
  assert.throws(()=>SC.validate({}));const st=SC.blank();st.active=SC.session('study',[SC.bank[0]],1);
  for(const mutate of [s=>s.active.ids.push('unknown'),s=>s.active.orders[s.active.ids[0]]=[0,0,0,0],s=>s.active.answers[s.active.ids[0]]=[90],s=>s.bookmarks=['unknown'],s=>s.stats['env-001']={seen:1,right:2,lastCorrect:true},s=>s.active.index=99,s=>s.active.mode='invalid']){const copy=JSON.parse(JSON.stringify(st));mutate(copy);assert.throws(()=>SC.validate(copy));}
});
test('prioriza preguntas nuevas y respeta un pool pequeño',()=>{
  const pool=SC.bank.slice(0,10),stats=Object.fromEntries(pool.slice(0,5).map(q=>[q.id,{seen:2}]));const s=SC.session('study',pool,5,stats);assert.ok(s.ids.every(id=>!stats[id]));assert.equal(SC.session('study',pool,50).ids.length,10);assert.throws(()=>SC.session('study',[],10));
});
test('un examen en blanco puntúa cero y registra 50 fallos',()=>{
  const st=SC.blank();st.active=SC.session('exam',SC.bank,50);SC.finish(st);assert.equal(SC.result(st.active).percent,0);assert.equal(SC.result(st.active).answered,0);assert.equal(Object.keys(st.stats).length,50);assert.ok(Object.values(st.stats).every(v=>v.lastCorrect===false));
});
