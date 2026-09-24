/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['','Part 1 引き継ぎの土台','Part 2 分野ごとの引き継ぎ','Part 3 受け取る側'],ko:['','Part 1 인계의 토대','Part 2 분야별 인계','Part 3 받는 쪽'],en:['','Part 1 The Foundation','Part 2 Handover by Area','Part 3 The Incoming Manager']};
var S={ja:'管理者の引き継ぎ・着任ガイド',ko:'관리자 인수인계·부임 가이드',en:'Handing Over and Taking Over: A Guide for Managers'};
var DEF={ja:{voice:'引き継いだ人のひと言'},ko:{voice:'인계한 사람의 한마디'},en:{voice:'From Someone Who Handed Over'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_引き継ぎガイド.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
