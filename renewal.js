/* Revision 6: the active bank contains only original questions derived from SC-200.md.
 * The 500 inherited questions remain addressable exclusively for older progress.
 */
(() => {
  'use strict';
  SC.retiredQuestions = Object.fromEntries(SC.bank.filter(q => !q.addedInRevision).map(q => [q.id, q]));
  const originals = SC.bank.filter(q => q.addedInRevision === 5);
  SC.bank.splice(0, SC.bank.length, ...originals);
  SC.groups.splice(0);
  function regroup(q) {
    let g = SC.groups.find(g => g.domain === q.domain && g.topic === q.topic);
    if (!g) {g = {domain:q.domain, topic:q.topic, chapter:q.chapter, sources:[], count:0};SC.groups.push(g);}
    g.count++;
  }
  originals.forEach(regroup);
  SC.freshQuestion = function(id, topic, refs, prompt, options, correct = [0], code, revision = 6) {
    if (SC.bank.some(q => q.id === id) || SC.retiredQuestions[id]) throw Error('ID duplicado: ' + id);
    if (options.length < 4 || refs.some(r => !SC.noteSections[r])) throw Error('Pregunta incompleta: ' + id);
    const q = {id, domain:id.split('-')[0], topic, chapter:SC.noteSections[refs[0]].chapter,
      sources:[], noteRefs:refs, prompt, choices:options.map(o => o[0]), correct,
      optionExplanations:options.map(o => o[1]), explanation:correct.map(i => options[i][1]).join(' '), addedInRevision:revision};
    if (code) q.code = code;
    SC.bank.push(q);regroup(q);
  };
})();
