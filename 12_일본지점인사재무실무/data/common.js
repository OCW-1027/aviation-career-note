/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 はじめて学ぶ会社のお金と人','Part 1 雇用','Part 2 給与と保険','Part 3 人事の運営','Part 4 資金','Part 5 税務','Part 6 決算と予算','Part 7 規程と保存'],
ko:['Part 0 처음 배우는 회사의 돈과 사람','Part 1 고용','Part 2 급여와 보험','Part 3 인사 운영','Part 4 자금','Part 5 세무','Part 6 결산과 예산','Part 7 규정과 보존'],
en:['Part 0 Money and People: First Steps','Part 1 Employment','Part 2 Payroll and Insurance','Part 3 HR Operations','Part 4 Cash Management','Part 5 Tax','Part 6 Closing and Budgeting','Part 7 Policies and Records']};
var S={ja:'会社の人事・総務・財務の実務 ― 日本支店から一般企業まで',ko:'회사의 인사·총무·재무 실무 — 일본 지점부터 일반 기업까지',en:'HR, General Affairs and Finance in Practice: From a Japan Branch to Any Company'};
var DEF={ja:{voice:'実務のひと言'},ko:{voice:'실무 한마디'},en:{voice:'Practical Tip'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_人事財務実務.html';a.meta.from=a.meta.from||'TYO';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
