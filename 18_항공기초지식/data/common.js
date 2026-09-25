/* 共通設定（article.js より前に読み込む）— 航空の基礎知識 */
(function(){
var PARTS={ja:['Part 0 航空機を知る','Part 1 空と時間','Part 2 空港と空のルール','Part 3 航空の歩み','Part 4 これからの空港と航空'],ko:['Part 0 항공기를 알다','Part 1 하늘과 시간','Part 2 공항과 하늘의 규칙','Part 3 항공의 역사','Part 4 앞으로의 공항과 항공'],en:['Part 0 Knowing the Aircraft','Part 1 Sky and Time','Part 2 Airports and the Rules of the Sky','Part 3 Aviation History','Part 4 The Future of Airports and Aviation']};
var S={ja:'航空の基礎知識',ko:'항공 기초 지식',en:'Aviation Fundamentals'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_航空の基礎知識.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
