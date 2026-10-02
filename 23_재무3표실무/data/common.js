/* 共通設定（article.js より前に読み込む）— 日本語・한국어・English / 財務3表の実務 */
(function(){
var PARTS={ja:['Part 0 お金の流れと3つの表','Part 1 損益計算書','Part 2 貸借対照表','Part 3 キャッシュフロー計算書','Part 4 3つの表のつながり','Part 5 航空会社の財務','Part 6 財務分析','Part 7 投資検討の実務','Part 8 日本と韓国の会計'],
 ko:['Part 0 돈의 흐름과 세 가지 재무제표','Part 1 손익계산서','Part 2 재무상태표','Part 3 현금흐름표','Part 4 세 가지 재무제표의 연결','Part 5 항공사의 재무','Part 6 재무 분석','Part 7 투자 검토 실무','Part 8 한국과 일본의 회계'],
 en:['Part 0 Where the Money Flows: the Three Statements','Part 1 The Income Statement','Part 2 The Balance Sheet','Part 3 The Cash Flow Statement','Part 4 How the Three Connect','Part 5 Airline Finances','Part 6 Financial Analysis','Part 7 Investment Appraisal in Practice','Part 8 Accounting in Japan and Korea']};
var S={ja:'数字で読む会社 ― 財務諸表の基礎から投資の判断まで',ko:'숫자로 읽는 회사 — 재무제표 기초부터 투자 판단까지',en:'Reading a Company Through Its Numbers: From the Basics of Financial Statements to Investment Decisions'};
var DEF={ja:{voice:'財務担当のひとこと'},ko:{voice:'재무 담당의 한마디'},en:{voice:'From the Finance Desk'}};
for(var k in window.ARTS){var a=window.ARTS[k],pn=+String(k).split('-')[0];
 a.meta.home=a.meta.home||'00_シリーズ全体_財務3表.html';a.meta.from=a.meta.from||'HND';
 a.meta.en={series:S.en,part:PARTS.en[pn]};
 ['ja','ko','en'].forEach(function(l){if(!a[l])return;a[l].series=a[l].series||S[l];a[l].part=a[l].part||PARTS[l][pn];
  if(DEF[l]&&typeof a[l].voice==='string')a[l].voice={h:DEF[l].voice,x:a[l].voice};});
 if(DEF.en)a.meta.en.voice=DEF.en.voice;}
})();
