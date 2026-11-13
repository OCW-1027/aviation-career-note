/* AIRLINE SAGA — ATC 언어 틀: 문구는 모두 ATC.T('한국어 원문 {0}', 값)을 거침.
 * 한국어가 원문(열쇠)이고, 다른 언어는 js/lang/<언어>.js 가 ATC.LANGS.<언어> = { name, s: { '원문': '번역' } } 로 등록.
 * 언어는 주소의 ?lang=ja 또는 저장된 설정으로 정하며, 바꾸면 화면을 다시 읽음(문구가 처음 읽힐 때 정해지는 것이 있어서).
 * 긴 글(학습 노트·교신 풀이)은 문장 사전이 아니라 언어별 내용 묶음: ATC.pick({ ko: …, ja: … }) */
(function (G) {
  'use strict';
  var ATC = G.ATC = G.ATC || {};
  var LANGS = ATC.LANGS = ATC.LANGS || {};
  /* 그림 · 음성 파일 주소 앞에 붙일 경로: 사이트판에서 게임 문서가 본체 폴더 밖에 있을 때 window.ATC_SITE.base = 'saga/atc/' 처럼 줌 */
  ATC.base = (G.ATC_SITE && G.ATC_SITE.base) || '';
  var KEY = 'acn_atc_lang_v1', want = 'ko', miss = {};
  try { var m = /[?&]lang=([a-z]{2})\b/.exec(G.location ? G.location.search : ''); want = (m && m[1]) || (G.localStorage && G.localStorage.getItem(KEY)) || 'ko'; } catch (e) { want = 'ko'; }
  ATC.langWant = want;
  /* 지금 언어: 원하는 언어의 묶음이 등록돼 있을 때만 그 언어, 아니면 한국어 */
  ATC.lang = function () { return want !== 'ko' && LANGS[want] ? want : 'ko'; };
  ATC.langs = function () { return [{ id: 'ko', name: '한국어' }].concat(Object.keys(LANGS).map(function (k) { return { id: k, name: LANGS[k].name || k }; })); };
  ATC.setLang = function (id) { try { G.localStorage.setItem(KEY, id); } catch (e) { } if (G.location) { var u = G.location.href.replace(/([?&])lang=[a-z]{2}&?/, '$1').replace(/[?&]$/, ''); G.location.href = u; if (u === G.location.href) G.location.reload(); } };
  ATC.T = function (k) {
    var s = k, d;
    if (want !== 'ko' && (d = LANGS[want])) { s = d.s[k]; if (s === undefined) { miss[k] = 1; s = k; } }
    if (s.indexOf('{a') >= 0 || s.indexOf('{icao}') >= 0) { var ap = (ATC.D && ATC.D.airport) || {}; s = s.split('{aptName}').join(ap.ko || '').split('{apt}').join(ap.short || '').split('{aptEn}').join(ap.call || '').split('{icao}').join(ap.icao || ''); }   /* 공항 이름은 공항 자료에서 */
    if (arguments.length > 1) { var a = arguments; s = s.replace(/\{(\d+)\}/g, function (_, i) { return a[+i + 1]; }); }
    return s;
  };
  /* 언어별 내용 묶음에서 지금 언어 것을 고름(없으면 한국어) */
  ATC.pick = function (o) { var l = ATC.lang(); return o[l] !== undefined ? o[l] : o.ko; };
  /* 번역이 빠진 원문 목록(점검용) */
  ATC.i18nMissing = function () { return Object.keys(miss); };
})(typeof globalThis !== 'undefined' ? globalThis : this);
