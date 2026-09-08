require('../core');require('../sources');require('../environment');require('../response');require('../hunting');require('../references');
console.log(JSON.stringify({total:SC.bank.length,multiple:SC.bank.filter(q=>q.correct.length>1).length,domains:Object.fromEntries(Object.keys(SC.domains).map(d=>[d,SC.bank.filter(q=>q.domain===d).length])),groups:SC.groups},null,2));
