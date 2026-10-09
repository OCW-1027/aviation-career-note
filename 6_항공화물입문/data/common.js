/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 全体像','Part 1 予約と書類','Part 2 倉庫とビルドアップ','Part 3 特殊な貨物','Part 4 搭載と運航','Part 5 営業と組織','Part 6 輸出・輸入・乗り継ぎ実務','Part 7 保安・危険物・クレーム・管理'],
ko:['Part 0 전체 그림','Part 1 예약과 서류','Part 2 창고와 빌드업','Part 3 특수 화물','Part 4 탑재와 운항','Part 5 영업과 조직','Part 6 수출·수입·환적 실무','Part 7 보안·위험물·클레임·조업사 관리'],
en:['Part 0 The Big Picture','Part 1 Booking and Documents','Part 2 Warehouse and Build-up','Part 3 Special Cargo','Part 4 Loading and Operations','Part 5 Sales and Organization','Part 6 Export, Import and Transfer','Part 7 Security, DG, Claims and Handler Management']};
var S={ja:'航空貨物実務',ko:'항공화물 실무',en:'Air Cargo Operations'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장 한마디'},en:{voice:'Voice from the Field'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_航空貨物入門.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
