/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 空港を理解する','Part 1 首都圏','Part 2 釜山・済州'],ko:['Part 0 공항을 이해하다','Part 1 수도권','Part 2 부산·제주'],en:['Part 0 Understanding Korea’s Airports','Part 1 The Seoul Area','Part 2 Busan and Jeju']};
var S={ja:'主要空港ガイド・韓国',ko:'주요 공항 가이드 · 한국',en:'Guide to Major Airports: Korea'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_韓国の主要空港.html';a.meta.from=a.meta.from||'ICN';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
