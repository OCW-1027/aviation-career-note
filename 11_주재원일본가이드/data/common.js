/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 はじめに','Part 1 在留資格の基本','Part 2 在留資格の種類','Part 3 制度の変化','Part 4 着いてから14日','Part 5 住まい','Part 6 お金と税金','Part 7 暮らし','Part 8 駐在員編','Part 9 新しい街で始める','Part 10 災害への備え','Part 11 困ったとき'],
ko:['Part 0 시작하기','Part 1 재류자격의 기초','Part 2 재류자격의 종류','Part 3 제도의 변화','Part 4 도착 후 14일','Part 5 집','Part 6 돈과 세금','Part 7 생활','Part 8 주재원 편','Part 9 새 도시에서 시작하기','Part 10 재난 대비','Part 11 곤란할 때'],
en:['Part 0 Getting Started','Part 1 Residence Status Basics','Part 2 Types of Residence Status','Part 3 What Is Changing','Part 4 Your First 14 Days','Part 5 Housing','Part 6 Money and Tax','Part 7 Daily Life','Part 8 For Expatriates','Part 9 Starting in a New City','Part 10 Disaster Preparedness','Part 11 When You Need Help']};
var S={ja:'日本の暮らしガイド ― 外国人・駐在員・新しい土地で始める人へ',ko:'일본 생활 가이드 — 외국인·주재원·새 출발하는 사람을 위해',en:'Living in Japan: For Newcomers, Expatriates and Anyone Starting Out'};
var DEF={ja:{voice:'参考'},ko:{voice:'참고사항'},en:{voice:'For reference'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_駐在員ガイド.html';a.meta.from=a.meta.from||'HND';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
