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
    if (!(want !== 'ko' && LANGS[want]) && s.indexOf('(') >= 0) s = ATC.josa(s);
    return s;
  };
  /* 한국어 조사 고르기: 「VLA301이(가)」 → 「VLA301이」, 「07R(으)로」 → 「07R로」. 앞말의 끝소리(받침)로 정함 —
     한글은 글자에서, 숫자는 읽는 소리(0 영 · 1 일 · 3 삼 · 6 육 · 7 칠 · 8 팔에 받침), 로마자는 글자 이름(L · M · N · R에 받침)으로. 닫는 괄호 · 낫표는 건너뜀 */
  var JOSA = { '이(가)': ['이', '가'], '을(를)': ['을', '를'], '은(는)': ['은', '는'], '과(와)': ['과', '와'], '와(과)': ['과', '와'], '(으)로': ['으로', '로'] };
  function batchim(ch) {      /* 0 = 받침 없음, 1 = 받침 있음, 2 = ㄹ 받침 */
    var c = ch.charCodeAt(0);
    if (c >= 0xAC00 && c <= 0xD7A3) { var j = (c - 0xAC00) % 28; return j === 0 ? 0 : j === 8 ? 2 : 1; }
    if (ch >= '0' && ch <= '9') return '178'.indexOf(ch) >= 0 ? 2 : '036'.indexOf(ch) >= 0 ? 1 : 0;
    ch = ch.toUpperCase(); if (ch === 'L' || ch === 'R') return 2; if (ch === 'M' || ch === 'N') return 1; return 0;
  }
  ATC.josa = function (s) {
    return s.replace(/(이\(가\)|을\(를\)|은\(는\)|과\(와\)|와\(과\)|\(으\)로)/g, function (m, _g, at) {
      var i = at - 1; while (i >= 0 && /[\s)\]」』"'’”>]/.test(s[i])) i--;
      if (i < 0) return m; var b = batchim(s[i]), f = JOSA[m];
      return m === '(으)로' ? (b === 1 ? f[0] : f[1]) : (b ? f[0] : f[1]);
    });
  };
  /* 언어별 내용 묶음에서 지금 언어 것을 고름(없으면 한국어) */
  ATC.pick = function (o) { var l = ATC.lang(); return o[l] !== undefined ? o[l] : o.ko; };
  /* 번역이 빠진 원문 목록(점검용) */
  ATC.i18nMissing = function () { return Object.keys(miss); };
})(typeof globalThis !== 'undefined' ? globalThis : this);
