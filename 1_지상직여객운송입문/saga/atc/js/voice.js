/* AIRLINE SAGA — ATC 교신 음성: 문구를 「구절 조각」으로 나누기
   쉼표로 끊기는 구절 하나를 조각 하나로 녹음해 두고 이어 붙임(구절마다 「이어지는 억양 m」과 「끝맺는 억양 f」 두 가지).
   통째 조각이 없는 구절은 「앞말 조각 + 뒷말 조각」으로 나눔(예: squawk + 45 + 01, taxi to stand 104 via + Alfa).
   끝내 못 맞추면 null — 그 문구는 브라우저 음성으로 읽음 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D;
  var V = ATC.V = { GAP: 0.09, TIGHT: 0.015 };
  var DIG = { zero: 1, one: 1, two: 1, three: 1, four: 1, five: 1, six: 1, seven: 1, eight: 1, niner: 1 };
  V.hash = function (s) { var h = 7, i; for (i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 9973; return h; };
  /* 조종사 목소리 정하기: 편명마다 늘 같은 목소리(호출부호 조각은 그 목소리로만 녹음해 둠).
     p1 · p2 = 기준 목소리(남 · 여), p3 · p4 = 일본어 목소리(남 · 여) — 항공사 자료에 jp 표시가 있는 회사의 편만 */
  V.PILOTS = ['p1', 'p2', 'p3', 'p4'];
  V.voiceOf = function (cs) { var h = V.hash(cs || ''), al = D.alBy && D.alBy[String(cs || '').slice(0, 3)]; return 'p' + ((al && al.jp ? 3 : 1) + h % 2); };
  /* 문구 → 구절(쉼표·마침표 단위, 소리 나는 대로 풀어 쓴 소문자) */
  V.clauses = function (text) {
    var t = ATC.tts(text).toLowerCase().replace(/-/g, ' ');
    return t.split(/[,.;:!?]+/).map(function (c) { return c.replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); }).filter(function (c) { return c; });
  };
  /* 구절(낱말 배열) → 조각 이름 열. v = 'm'(뒤에 말이 이어짐) | 'f'(문장 끝). strict면 억양이 다른 조각으로 대신하지 않음 */
  V.res = function (w, v, has, depth, strict) {
    var c = w.join(' '), i, p, r, o = v === 'f' ? 'm' : 'f';
    if (has(c + '|' + v)) return [c + '|' + v];
    if (w.length === 4 && DIG[w[0]] && DIG[w[1]] && DIG[w[2]] && DIG[w[3]]) {          /* 숫자 네 자리(시각·스쿽·QNH)는 두 자리씩 */
      p = w[0] + ' ' + w[1] + '|m'; r = w[2] + ' ' + w[3] + '|';
      if (has(p) && has(r + v)) return [p, r + v];
      if (has(p) && !strict && has(r + o)) return [p, r + o];
    }
    if (depth < 3) for (i = w.length - 1; i >= 1; i--) {
      p = w.slice(0, i).join(' ') + '|m';
      if (has(p)) { r = V.res(w.slice(i), v, has, depth + 1, strict); if (r) return [p].concat(r); }
    }
    if (!strict && has(c + '|' + o)) return [c + '|' + o];
    return null;
  };
  /* 문구 → 재생 계획 [{k: 조각 이름} | {p: 쉼(초)}]. 조각이 모자라면 null(V.miss에 모자란 구절) */
  V.plan = function (text, has) {
    var cl = V.clauses(text), out = [], i, j, r;
    for (i = 0; i < cl.length; i++) {
      r = V.res(cl[i].split(' '), i === cl.length - 1 ? 'f' : 'm', has, 0, false);
      if (!r) { V.miss = cl[i]; return null; }
      if (i) out.push({ p: V.GAP });
      for (j = 0; j < r.length; j++) { if (j) out.push({ p: V.TIGHT }); out.push({ k: r[j] }); }
    }
    return out.length ? out : null;
  };
  /* 조각 이름 → 합성할 때 읽힐 글(이름은 첫 글자 대문자, 낱글자는 대문자) — 음성 만드는 도구에서 씀 */
  var names = null;
  function nameSet() {
    var s = {}, add = function (x) { String(x).toLowerCase().replace(/[^a-z ]+/g, ' ').split(' ').forEach(function (w) { if (w.length > 1) s[w] = 1; }); };
    D.airlines.forEach(function (a) { add(a.cs); }); Object.keys(D.fix).forEach(add); Object.keys(ATC.PH).forEach(function (k) { add(ATC.PH[k]); });
    [D.gateDest, D.gateOrig].forEach(function (g) { Object.keys(g).forEach(function (k) { g[k].forEach(function (d) { add(d[1]); }); }); });
    Object.keys(D.freq).forEach(function (k) { add(D.freq[k].n.split(' ')[0]); }); Object.keys(D.neighbor).forEach(function (k) { add(D.neighbor[k].n.split(' ')[0]); });
    add('mayday'); delete s.atis; delete s.ray;
    return s;
  }
  /* 합성기가 엉뚱하게 읽는 이름은 소리 나는 대로 고쳐 적음 */
  var RESPELL = { atis: 'A-tis', aozora: 'Ah-ozora', seira: 'Sayra', sra: 'Sayra', chitose: 'Chitoseh', gimhae: 'Gimhay', fukuoka: 'Fookoo-oka', suvarnabhumi: 'Soowannapoom', haneda: 'Hahnedda', pudong: 'Poodong',
    busan: 'Boosan', kumoi: 'Koomoy', fumin: 'Foomin', miran: 'Meeran', basor: 'Baysor', iruno: 'Eeroono', haneul: 'Hahnool' };
  V.say = function (key) {
    names = names || nameSet();
    return key.split('|')[0].split(' ').map(function (w) { return RESPELL[w] || (w.length === 1 ? w.toUpperCase() : names[w] ? w[0].toUpperCase() + w.slice(1) : w); }).join(' ')
      .replace(/\bpan pan\b/gi, 'pan-pan').replace(/\bstart up\b/g, 'start-up').replace(/\bX ray\b/gi, 'X-ray').replace(/\bifr\b/g, 'I F R').replace(/\breadback\b/g, 'read back');
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
