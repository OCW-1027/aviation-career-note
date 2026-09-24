/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['','Part 1 赴任の前','Part 2 到着後の2週間','Part 3 暮らし','Part 4 仕事','Part 5 お金と税金','Part 6 帰任'],
ko:['','Part 1 부임 전','Part 2 도착 후 2주','Part 3 생활','Part 4 업무','Part 5 돈과 세금','Part 6 귀임'],
en:['','Part 1 Before You Move','Part 2 Your First Two Weeks','Part 3 Daily Life','Part 4 Work','Part 5 Money and Taxes','Part 6 Returning Home']};
var S={ja:'外国企業の駐在員のための日本ガイド',ko:'외국 기업 주재원 일본 가이드',en:'Japan Guide for Expatriates of Foreign Companies'};
var DEF={ja:{voice:'日本14年目のひと言'},ko:{voice:'일본 14년 차 한마디'},en:{voice:'Advice from 14 Years in Japan'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_駐在員ガイド.html';a.meta.from=a.meta.from||'HND';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
