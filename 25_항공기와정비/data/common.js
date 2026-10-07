/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English */
(function(){
var PARTS={ja:['Part 0 整備の全体像','Part 1 機体と系統','Part 2 整備プログラム','Part 3 MEL・CDL','Part 4 ライン整備の委託と支店','Part 5 AOGとイレギュラー','Part 6 資格とキャリア'],ko:['Part 0 정비의 전체 모습','Part 1 기체와 계통','Part 2 정비 프로그램','Part 3 MEL·CDL','Part 4 라인 정비 위탁과 지점','Part 5 AOG와 비정상','Part 6 자격과 커리어'],en:['Part 0 The Big Picture','Part 1 Airframe and Systems','Part 2 Maintenance Programmes','Part 3 MEL and CDL','Part 4 Contracted Line Maintenance and the Station','Part 5 AOG and Disruption','Part 6 Licences and Careers']};
var S={ja:'航空機と整備 ― B737とB787で学ぶ機体・整備・MEL',ko:'항공기와 정비 — B737과 B787로 배우는 기체·정비·MEL',en:'Aircraft and Maintenance: Airframes, Maintenance and the MEL through the B737 and B787'};
var DEF={ja:{voice:'現場のひと言'},ko:{voice:'현장의 한마디'},en:{voice:'From the Floor'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_航空機と整備.html';a.meta.from=a.meta.from||'NRT';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
