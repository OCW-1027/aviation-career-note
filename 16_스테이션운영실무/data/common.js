/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['','Part 1 支店評価を知る','Part 2 ハンドリング会社を動かす','Part 3 総括の姿勢と判断','Part 4 本社の運送部門と働く'],ko:['','Part 1 지점 평가를 알다','Part 2 조업사를 움직이다','Part 3 총괄의 자세와 판단','Part 4 본사 운송 부서와 일하기'],en:['','Part 1 How Stations Are Evaluated','Part 2 Getting the Best from Your Handler','Part 3 The Duty Manager’s Judgment and Attitude','Part 4 Working with Head Office']};
var S={ja:'空港支店の運営の実務',ko:'공항 지점 운영 실무',en:'Airport Station Management in Practice'};
var DEF={ja:{voice:'総括のひと言'},ko:{voice:'총괄의 한마디'},en:{voice:'From the Duty Manager'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_ステーション運営.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
