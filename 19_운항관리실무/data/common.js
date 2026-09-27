/* 共通設定（article.js より前に読み込む）— 運航管理の実務 */
(function(){
var PARTS={ja:['Part 0 運航管理とは','Part 1 航空法規'],ko:['Part 0 운항관리란','Part 1 항공법규'],en:['Part 0 What Is Flight Dispatch?','Part 1 Aviation Law']};
var S={ja:'運航管理の実務',ko:'운항관리 실무',en:'Flight Dispatch Operations'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_運航管理の実務.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
