/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 世界の空港を理解する','Part 1 東アジア','Part 2 東南アジア・南アジア','Part 3 中東・トルコ','Part 4 欧州','Part 5 米州・オセアニア'],ko:['Part 0 세계 공항을 이해하다','Part 1 동아시아','Part 2 동남아·남아시아','Part 3 중동·튀르키예','Part 4 유럽','Part 5 미주·오세아니아'],en:['Part 0 Understanding the World’s Airports','Part 1 East Asia','Part 2 Southeast and South Asia','Part 3 Middle East and Türkiye','Part 4 Europe','Part 5 The Americas and Oceania']};
var S={ja:'主要空港ガイド・世界',ko:'주요 공항 가이드 · 세계',en:'Guide to Major Airports: World'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_世界の主要空港.html';a.meta.from=a.meta.from||'ICN';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
