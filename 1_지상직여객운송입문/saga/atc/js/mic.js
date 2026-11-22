/* AIRLINE SAGA — ATC 마이크 관제(1단계): 브라우저 음성 인식(크롬 · 엣지)으로 들은 영어 관제 문구 → 지시
   - ATC.mic.norm(문장) → 낱말 목록(숫자 말 → 숫자, 「five thousand」 → 5000, 「flight level two four zero」 → fl240, 「three four left」 → 34L)
   - ATC.mic.parse(문장, sim, 고른 항공기) → { ac, cmds, sp(특별 송신), err, csSaid }
   - ATC.mic.score(말한 문장, 표준 문구) → { pct, miss }  (표준 문구와 얼마나 같은지 · 빠진 말)
   음성 인식 자체(마이크 · 버튼)는 ui.js가 맡음 */
(function () {
  'use strict';
  var G = typeof window !== 'undefined' ? window : globalThis, ATC = G.ATC, D = ATC.D;
  var NUM = { zero: '0', oh: '0', one: '1', won: '1', two: '2', too: '2', three: '3', tree: '3', four: '4', five: '5', fife: '5', six: '6', seven: '7', eight: '8', nine: '9', niner: '9' };
  var TENS = { ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };      /* 「ten thousand」 · 「twenty one」처럼 인식될 때 */
  var SIDE = { left: 'L', right: 'R', center: 'C', centre: 'C', l: 'L', r: 'R', c: 'C' };

  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j; if (!m) return n; if (!n) return m;
    for (i = 0; i <= m; i++) { d[i] = [i]; } for (j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function sim01(a, b) { var l = Math.max(a.length, b.length); return l ? 1 - lev(a, b) / l : 1; }

  function norm(text) {
    var s = String(text || '').toLowerCase()
      .replace(/(\d),(\d{3})/g, '$1$2').replace(/(\d)\.(\d)/g, '$1 decimal $2')
      .replace(/take[\s-]*off/g, 'takeoff').replace(/push[\s-]*back/g, 'pushback').replace(/go[\s-]+around/g, 'go around').replace(/read[\s-]*back/g, 'readback')
      .replace(/\bi\.?\s*l\.?\s*s\.?\b/g, 'ils').replace(/\bline[\s-]*up\b/g, 'line up').replace(/\bf\.?\s*l\.?\s*(\d)/g, 'fl$1').replace(/\bfower\b/g, 'four').replace(/[^a-z0-9 ]+/g, ' ');
    var t = s.split(/\s+/).filter(Boolean).map(function (w) { return NUM[w] || w; }), o = [], i;
    /* 「twenty one」 → 21, 「ten」 → 10 */
    for (i = 0; i < t.length; i++) { var tv = TENS[t[i]]; if (tv === undefined) { o.push(t[i]); continue; } if (tv >= 20 && /^[1-9]$/.test(t[i + 1] || '')) { tv += +t[i + 1]; i++; } o.push(String(tv)); }
    t = o; o = [];
    /* 붙어 있는 숫자 → 하나로(「2 7 0」 → 270, 「04」 그대로) */
    for (i = 0; i < t.length; i++) { if (/^\d$/.test(t[i]) && o.length && /^\d{1,4}$/.test(o[o.length - 1])) o[o.length - 1] += t[i]; else o.push(t[i]); }
    t = o; o = [];
    for (i = 0; i < t.length; i++) {
      var w = t[i];
      if (/^\d+$/.test(w) && t[i + 1] === 'thousand') { var v = +w * 1000; i++; if (/^\d+$/.test(t[i + 1] || '') && t[i + 2] === 'hundred') { v += +t[i + 1] * 100; i += 2; } o.push(String(v)); continue; }
      if (/^\d+$/.test(w) && t[i + 1] === 'hundred') { o.push(String(+w * 100)); i++; continue; }
      if (w === 'flight' && t[i + 1] === 'level' && /^\d+$/.test(t[i + 2] || '')) { o.push('fl' + (+t[i + 2])); i += 2; continue; }
      if (/^fl\d+$/.test(w)) { o.push(w); continue; }
      if (/^\d{1,2}$/.test(w) && SIDE[t[i + 1]] && (t[i - 1] === 'runway' || t[i - 2] === 'runway' || /^(ils|land|takeoff)$/.test(t[i - 1] || ''))) { o.push((w.length < 2 ? '0' : '') + w + SIDE[t[i + 1]]); i++; continue; }
      if (/^\d{1,2}[lrc]$/.test(w)) { o.push(w.slice(0, -1).padStart(2, '0') + w.slice(-1).toUpperCase()); continue; }
      o.push(w);
    }
    return o;
  }

  /* 호출부호 찾기: 앞쪽 낱말에서 「항공사 호출부호 + 편명 숫자」 */
  function findCs(T, sim) {
    var best = null;
    sim.acs.forEach(function (ac) {
      if (ac.gone || ac.owner === 'out') return;
      var W = String(ac.csWord || '').toLowerCase().split(/\s+/), code = ac.al && ac.al.code ? ac.al.code.toLowerCase() : '', j;
      for (j = 0; j < Math.min(T.length, 8); j++) {
        if (T[j] !== String(ac.num)) continue;
        var k = Math.max(0, j - W.length), sc = sim01(T.slice(k, j).join(' '), W.join(' ')), wj = W.join(''), n;
        for (n = 1; n <= 3 && j - n >= 0; n++) { var s2 = sim01(T.slice(j - n, j).join(''), wj); if (s2 > sc) { sc = s2; k = j - n; } }      /* 「air france」 ↔ AIRFRANS · 「speed bird」 ↔ SPEEDBIRD — 띄어쓰기를 빼고 비교 */
        if (T[j - 1] === code) { sc = 1; k = j - 1; }
        if (sc >= 0.55 && (!best || sc > best.sc)) best = { ac: ac, sc: sc, from: k, to: j + 1 + (T[j + 1] === 'heavy' ? 1 : 0) };
      }
    });
    return best;
  }
  function fixOf(words) {
    var cand = [words[0], (words[0] || '') + (words[1] || '')].filter(Boolean), best = null;
    Object.keys(D.fix || {}).forEach(function (f) { cand.forEach(function (c, n) { var s = sim01(c, f.toLowerCase()); if (s >= 0.6 && (!best || s > best.s)) best = { f: f, s: s, n: n + 1 }; }); });
    return best;
  }
  function sidOf(words, sim) {
    var list = sim.sidList ? sim.sidList() : [], said = words.join(' '), best = null;
    list.forEach(function (x) { var s = sim01(said, x.toLowerCase()); if (s >= 0.6 && (!best || s > best.s)) best = { sid: x, s: s }; });
    return best && best.sid;
  }
  var HO = { tower: 'TWR', ground: 'GND', approach: 'APP', departure: 'DEP', control: 'ACC', center: 'ACC', centre: 'ACC', radar: 'APP', delivery: 'DEL' };

  function parse(text, sim, selAc) {
    var T = norm(text), r = { heard: text, T: T, cmds: [], err: null, sp: null, csSaid: false }, cs = findCs(T, sim), ac = cs ? cs.ac : selAc, R;
    if (cs) { r.csSaid = true; R = T.slice(0, cs.from).concat(T.slice(cs.to)); } else R = T.slice();
    var s = ' ' + R.join(' ') + ' ', m;
    r.ac = ac || null;
    if (/ say again /.test(s)) { r.sp = 'sayagain'; return r; }
    if (!ac) { r.err = ATC.T('호출부호를 알아듣지 못했습니다 — 「호출부호 + 편명 숫자」로 시작하거나 항공기를 먼저 고르세요.'); return r; }
    if (/ negative /.test(s) && sim.pendWrong && sim.pendWrong.some(function (p) { return p.ac.id === ac.id; })) { r.sp = 'correct'; return r; }
    var C = r.cmds, used = {};
    function add(c) { if (!used[c.k]) { used[c.k] = 1; C.push(c); } }
    function rwyChk(said) { if (said && ac.rwy && said !== ac.rwy) r.err = ATC.T('말한 활주로 {0} ≠ 이 항공기의 활주로 {1} — 다시 말하세요.', said, ac.rwy); return ac.rwy || said; }
    /* 출발 허가(허가중계) */
    if ((m = / cleared to (.+?) (?:airport )?via (.+?) departure(.*)/.exec(s))) {
      var sid = sidOf(m[2].split(' '), sim), rest = m[3], ma = / maintain (fl\d+|\d{4,5}) /.exec(rest + ' '), sq = / squawk (\d{4}) /.exec(rest + ' ');
      if (!sid) { r.err = ATC.T('SID 이름을 알아듣지 못했습니다: 「{0}」', m[2]); return r; }
      if (sq && ac.squawk && sq[1] !== String(ac.squawk)) { r.err = ATC.T('말한 스쿼크 {0} ≠ 배정 스쿼크 {1}', sq[1], ac.squawk); return r; }
      var cq = { k: 'clr', destName: ac.destName, sid: sid, alt: ma ? (ma[1][0] === 'f' ? +ma[1].slice(2) * 100 : +ma[1]) : 0, sq: ac.squawk };
      if (/ transition /.test(rest + ' ')) { var flat = rest.replace(/\s+/g, ''), tl = Object.keys((D.sidTrans || {})[ac.gate] || {}), tf = tl.filter(function (t) { return flat.indexOf(t.toLowerCase()) >= 0; })[0] || tl.filter(function (t) { return new RegExp(' ' + t[0].toLowerCase() + '[a-z ]* transition ').test(rest + ' '); })[0]; if (tf) cq.trans = tf; }      /* SID 뒤 transition */
      add(cq);
      return r;
    }
    if (/ readback correct /.test(s)) add({ k: 'rbok' });
    if ((m = / information ([a-z]+) (?:is )?(?:now )?current /.exec(s)) && sim.atis) add({ k: 'atis', v: sim.atis });
    if ((m = / (?:turn )?(left|right) (?:heading )?(\d{1,3}) /.exec(s)) && !/ knots/.test(s.slice(m.index + m[0].length - 1, m.index + m[0].length + 7))) add({ k: 'hdg', v: Math.round(+m[2] / 5) * 5 || 360, dir: SIDE[m[1]] });
    else if ((m = / heading (\d{1,3}) /.exec(s))) add({ k: 'hdg', v: Math.round(+m[1] / 5) * 5 || 360, dir: null });
    if ((m = / expedite (climb|descent) (?:to )?(fl\d+|\d{3,5}) /.exec(s))) add({ k: 'alt', v: m[2][0] === 'f' ? +m[2].slice(2) * 100 : +m[2], exp: true });
    else if ((m = / climb via (?:the )?(?:sid|s i d|said|cid|seed|sit|sids) (?:to )?(fl\d+|\d{3,5}) /.exec(s))) { r.verb = 'climb'; add({ k: 'alt', v: m[1][0] === 'f' ? +m[1].slice(2) * 100 : +m[1], via: true }); }      /* SID 고도 제한을 지키며 상승 */
    else if ((m = / (climb|descend)(?: and maintain| to)? (fl\d+|\d{3,5}) /.exec(s))) { r.verb = m[1]; add({ k: 'alt', v: m[2][0] === 'f' ? +m[2].slice(2) * 100 : +m[2] }); }
    else if ((m = / maintain (fl\d+|\d{4,5}) (?!knots)/.exec(s))) add({ k: 'alt', v: m[1][0] === 'f' ? +m[1].slice(2) * 100 : +m[1] });
    if (/ resume normal speed /.test(s)) add({ k: 'spd', v: 0 });
    else if (/ minimum approach speed /.test(s)) add({ k: 'minspd' });
    else if ((m = / speed (?:to )?(\d{3}) /.exec(s)) || (m = / (\d{3}) knots /.exec(s))) add({ k: 'spd', v: +m[1] });
    if ((m = / direct (?:to )?([a-z]+)(?: ([a-z]+))? /.exec(s))) { var fx = fixOf([m[1], m[2]]); if (fx) add({ k: 'dct', fix: fx.f }); else { r.err = ATC.T('지점 이름을 알아듣지 못했습니다: 「{0}」', m[1]); return r; } }
    if ((m = / ils (?:approach )?(?:runway )?(\d{2}[lrc]?) /i.exec(s))) add({ k: 'ils', rwy: m[1].toUpperCase().replace(/^(\d)$/, '0$1') });
    if ((m = / contact (?:[a-z]+ )*?(tower|ground|approach|departure|control|center|centre|radar|delivery) /.exec(s))) {
      var to = HO[m[1]]; if (to === 'ACC' && sim.mode === 'ACC' && sim.nextSector) to = sim.nextSector(ac); add({ k: 'ho', to: to });
    }
    var rw = / runway (\d{2}[lrc]?) /i.exec(s), said = rw ? rw[1].toUpperCase() : null;
    if (/ line up and wait /.test(s)) add({ k: 'luaw', rwy: rwyChk(said), at: ac.inter ? ac.hp : null });
    if (/ cancel takeoff clearance /.test(s)) add({ k: 'cancelto' });
    else if (/ cleared (?:for )?takeoff /.test(s)) add({ k: 'cto', rwy: rwyChk(said) });
    if (/ cleared to land /.test(s)) add({ k: 'ctl', rwy: rwyChk(said) });
    if (/ go around /.test(s)) add({ k: 'ga' });
    if (/ continue approach /.test(s)) add({ k: 'cont' });
    if ((m = / hold short (?:of )?(?:runway )?(\d{2}[lrc]?) /i.exec(s))) add({ k: 'hs', rwy: m[1].toUpperCase() });
    if ((m = / cross (?:runway )?(\d{2}[lrc]?) /i.exec(s))) add({ k: 'cross', rwy: m[1].toUpperCase() });
    if ((m = / pushback approved(?: (?:face|facing))?(?: (north|south|east|west))? /.exec(s))) {
      var sd = D.stands && ac.stand ? D.stands[ac.stand] : null, faces = sd && sd.faces || [], face = m[1] && faces.indexOf(m[1]) >= 0 ? m[1] : null;
      if (m[1] && faces.length && !face) { r.err = ATC.T('이 주기장에서는 {0} 방향으로만 밀 수 있습니다.', faces.join(' · ')); return r; }
      add({ k: 'push', face: face || (sd && (sd.faceRec && faces.indexOf(sd.faceRec) >= 0 ? sd.faceRec : faces[0])) || undefined });
    }
    else if (/ hold position /.test(s) && !used.cancelto) add({ k: 'holdpos' });
    if (/ continue taxi/.test(s)) add({ k: 'conttaxi' });
    if (!C.length && / roger /.test(s)) add({ k: 'ack' });
    if (!C.length && !r.err) r.err = ATC.T('지시를 알아듣지 못했습니다 — 표준 문구로 다시 말해 보세요(지상 이동 경로 지시는 단추로).');
    return r;
  }

  /* 표준 문구와 비교: 바람 · 주파수 · 공항 이름은 빼고, 순서를 지킨 같은 낱말의 비율 */
  function core(T) { var o = [], i; for (i = 0; i < T.length; i++) { if (T[i] === 'wind') { i += 3; continue; } if (T[i] === 'decimal') { o.pop(); i++; continue; } o.push(T[i]); } return o; }
  function score(spoken, std) {
    var a = core(norm(spoken)), b = core(norm(std)), n = a.length, k = b.length, L = [], i, j;
    for (i = 0; i <= n; i++) { L[i] = []; for (j = 0; j <= k; j++) L[i][j] = !i || !j ? 0 : a[i - 1] === b[j - 1] ? L[i - 1][j - 1] + 1 : Math.max(L[i - 1][j], L[i][j - 1]); }
    var miss = [], hit = {}; i = n; j = k;
    while (i && j) { if (a[i - 1] === b[j - 1]) { hit[j - 1] = 1; i--; j--; } else if (L[i - 1][j] >= L[i][j - 1]) i--; else j--; }
    for (j = 0; j < k; j++) if (!hit[j]) miss.push(b[j]);
    return { pct: n + k ? Math.round(200 * L[n][k] / (n + k)) : 100, miss: miss };
  }
  ATC.mic = { norm: norm, parse: parse, score: score, supported: function () { return !!(G.SpeechRecognition || G.webkitSpeechRecognition); } };
})();
