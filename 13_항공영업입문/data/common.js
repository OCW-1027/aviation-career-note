/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['','Part 1 市場','Part 2 販売チャネル','Part 3 旅行会社への営業','Part 4 運賃と収入','Part 5 広報','Part 6 計画','Part 7 レベニューマネジメント（収益管理）'],
ko:['','Part 1 시장','Part 2 판매 채널','Part 3 여행사 영업','Part 4 운임과 수익','Part 5 홍보','Part 6 계획','Part 7 레비뉴 매니지먼트(수익관리)'],
en:['','Part 1 The Market','Part 2 Sales Channels','Part 3 Working with Travel Agencies','Part 4 Fares and Revenue','Part 5 Public Relations','Part 6 Planning','Part 7 Revenue Management']};
var S={ja:'航空営業の実務',ko:'항공 영업 실무',en:'Airline Sales Operations'};
var DEF={ja:{voice:'営業の現場のひと言'},ko:{voice:'영업 현장 한마디'},en:{voice:'From the Sales Floor'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_航空営業入門.html';a.meta.from=a.meta.from||'TYO';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
