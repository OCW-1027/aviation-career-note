/* AIRLINE SAGA — ATC 교신 훈련소: 말하기 · 듣기 · 복창 대조 · 숫자 읽기(각 10문제) */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, st = null;
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = ri(0, i), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var fsim = { wind: { dir: 60, spd: 8 }, qnh: 1013 };
  function fakeAc() { var al = rnd(D.airlines.filter(function (a) { return !a.ga; })), type = rnd(al.types), num = String(ri(101, 899)); return { id: 1, cs: al.code + num, csWord: al.cs, num: num, type: type, hdg: ri(1, 36) * 10, alt: 8000, ias: 220, perf: D.types[type], al: al, wake: D.types[type].wake }; }
  var TYPES = {
    say: { t: ATC.T('말하기'), d: ATC.T('한국어 지시에 맞는 영어 관제 용어를 선택합니다.'), les: 'rt' },
    listen: { t: ATC.T('듣기'), d: ATC.T('무선 교신을 듣고 그 의미를 선택합니다. (음성이 켜져 있어야 합니다)'), les: 'rt' },
    rb: { t: ATC.T('복창 대조'), d: ATC.T('관제 지시와 조종사의 복창이 일치하는지 판별합니다.'), les: 'rb' },
    num: { t: ATC.T('숫자·문자 읽기'), d: ATC.T('고도 · 기수 · 주파수 · 활주로를 교신에서 읽는 방법을 선택합니다.'), les: 'rt' }
  };
  /* 지시 하나와 헷갈리는 지시 3개 */
  function genCmd(ac) {
    var k = rnd(['hdg', 'alt', 'spd', 'ils', 'twr', 'twr', 'gnd', 'ho', 'combo', 'taxi']), c, alts = [], v, r = rnd(['07L', '07R', '25L', '25R']);
    if (k === 'hdg') { v = ri(1, 36) * 10; var d = rnd(['L', 'R']), o = d === 'L' ? 'R' : 'L', v2 = U.r5(v + rnd([-30, 30, 100])); c = [{ k: 'hdg', v: v, dir: d }]; alts = [[{ k: 'hdg', v: v, dir: o }], [{ k: 'hdg', v: v2, dir: d }], [{ k: 'hdg', v: v2, dir: o }]]; }
    else if (k === 'alt') { var up = Math.random() < 0.4; v = up ? ri(10, 13) * 1000 : ri(3, 6) * 1000; c = [{ k: 'alt', v: v }]; alts = [[{ k: 'alt', v: v + (up ? -1000 : 1000) }], [{ k: 'alt', v: up ? v - 9000 + 0 : v + 10000 }], [{ k: 'alt', v: up ? 19000 : 2000 }]]; if (up) alts[1] = [{ k: 'alt', v: 24000 }]; }
    else if (k === 'spd') { v = rnd([160, 180, 200, 210]); c = [{ k: 'spd', v: v }]; alts = [[{ k: 'spd', v: v + 20 }], [{ k: 'spd', v: 250 }], [{ k: 'spd', v: 0 }]]; }
    else if (k === 'ils') { c = [{ k: 'ils', rwy: r }]; alts = ['07L', '07R', '25L', '25R'].filter(function (x) { return x !== r; }).map(function (x) { return [{ k: 'ils', rwy: x }]; }); }
    else if (k === 'twr') { var pool = shuffle([[{ k: 'luaw', rwy: r }], [{ k: 'cto', rwy: r }], [{ k: 'ctl', rwy: r }], [{ k: 'ga' }], [{ k: 'hs', rwy: r }], [{ k: 'cross', rwy: r }], [{ k: 'cont' }], [{ k: 'cancelto' }]]); c = pool[0]; alts = pool.slice(1, 4); }
    else if (k === 'gnd') { var pg = shuffle([[{ k: 'push', face: 'west' }], [{ k: 'push', face: 'east' }], [{ k: 'holdpos' }], [{ k: 'conttaxi' }], [{ k: 'pushhold' }], [{ k: 'hs', rwy: r }]]); c = pg[0]; alts = pg.slice(1, 4); }
    else if (k === 'ho') { var ph = shuffle(['TWR', 'GND', 'APP', 'DEP', 'ACC']); c = [{ k: 'ho', to: ph[0] }]; alts = ph.slice(1, 4).map(function (x) { return [{ k: 'ho', to: x }]; }); }
    else if (k === 'taxi') { c = [{ k: 'taxi', hp: 'B1', rwy: '07R', via: ['S', 'C', 'B'] }]; alts = [[{ k: 'taxi', hp: 'B1', rwy: '07R', via: ['S', 'Q1', 'B'] }], [{ k: 'taxi', hp: 'B2', rwy: '07R', via: ['S', 'C', 'B'] }], [{ k: 'taxi', stand: '104', via: ['A', 'P3', 'N'] }]]; }
    else { v = ri(1, 36) * 10; var a2 = ri(3, 6) * 1000, dd = rnd(['L', 'R']); c = [{ k: 'hdg', v: v, dir: dd }, { k: 'alt', v: a2 }]; alts = [[{ k: 'hdg', v: v, dir: dd === 'L' ? 'R' : 'L' }, { k: 'alt', v: a2 }], [{ k: 'hdg', v: v, dir: dd }, { k: 'alt', v: a2 + 1000 }], [{ k: 'hdg', v: U.r5(v + 100), dir: dd }, { k: 'alt', v: a2 }]]; }
    return { c: c, alts: alts };
  }
  function tens(n) { var o = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'], t = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']; return n < 20 ? (o[n] || 'zero') : t[Math.floor(n / 10)] + (n % 10 ? '-' + o[n % 10] : ''); }
  function dg(s) { return ATC.tts(String(s)); }
  function genNum() {
    var k = rnd(['fl', 'alt', 'hdg', 'fq', 'rwy', 'sq', 'atis']), a, b, c, q, ok, bad, why;
    if (k === 'fl') { a = ri(20, 40) * 10; q = 'FL' + a; ok = 'flight level ' + dg(a); bad = ['flight level ' + tens(Math.floor(a / 100)) + ' ' + tens(a % 100 || 0).replace('zero', 'hundred'), dg(a) + ' hundred', 'flight level ' + dg(a) + ' zero zero']; why = ATC.T('이 게임이 따르는 일본 · 한국식 교신에서는 비행고도(FL)를 "flight level" 뒤에 숫자를 한 자리씩 읽습니다. (유럽 등 일부 지역은 FL200처럼 100 단위로 떨어지는 값을 "two hundred"로 읽는 것도 허용합니다.)'); }
    else if (k === 'alt') { a = ri(10, 13); q = a + ',000ft'; ok = dg(a) + ' thousand'; bad = [tens(a) + ' thousand', dg(a * 1000), 'flight level ' + dg(a * 10)]; why = ATC.T('만 단위 고도도 한 자리씩: 12,000 = "one two thousand". 이 게임에서는 14,000ft 미만을 고도(feet)로, 14,000ft 이상을 FL로 부릅니다(경계는 나라와 공항마다 다름).'); }
    else if (k === 'hdg') { a = ri(1, 9) * 10; q = ATC.T('기수 0{0}', a); ok = 'heading ' + dg('0' + a); bad = ['heading ' + tens(a), 'heading ' + dg(a), 'heading zero ' + tens(a)]; why = ATC.T('기수는 항상 세 자리, 앞의 0도 읽습니다.'); }
    else if (k === 'fq') { a = ri(118, 135); b = rnd([1, 3, 5, 7]); q = ATC.T('주파수 {0}.{1}0', a, b); ok = dg(a) + ' decimal ' + dg(b); bad = ['one ' + tens(a % 100) + ' point ' + tens(b * 10), dg(a) + ' ' + dg(b) + ' zero', tens(Math.floor(a / 100)) + ' hundred ' + tens(a % 100) + ' decimal ' + dg(b)]; why = ATC.T('주파수는 한 자리씩, 소수점은 "decimal"(ICAO). 이 문제처럼 간격 25kHz 채널에서는 118.10을 "one one eight decimal one"으로 읽습니다(8.33kHz 간격 채널은 보통 여섯 자리를 모두 읽되, 끝 두 자리가 둘 다 0이면 앞 네 자리만 읽음).'); }
    else if (k === 'rwy') { a = rnd(['07L', '25R', '07R', '25L', '16L', '34R']); q = ATC.T('활주로 {0}', a); ok = 'runway ' + dg(a); c = { L: 'left', R: 'right' }[a[2]]; bad = ['runway ' + tens(+a.slice(0, 2)) + ' ' + c, 'runway ' + dg(a.slice(0, 2)) + ' ' + (a[2] === 'L' ? 'lima' : 'romeo'), 'runway ' + dg(a.slice(1, 2)) + ' ' + c]; why = ATC.T('활주로 번호는 한 자리씩, L/R은 "left"/"right"로 읽습니다.'); }
    else if (k === 'sq') { a = '' + ri(1, 6) + ri(0, 7) + ri(0, 7) + ri(1, 7); q = ATC.T('스쿼크 {0}', a); ok = 'squawk ' + dg(a); bad = ['squawk ' + tens(+a.slice(0, 2)) + ' ' + tens(+a.slice(2)), 'squawk ' + dg(a.slice(0, 1)) + ' thousand ' + dg(a.slice(1)), 'squawk ' + dg(a) + ' zero']; why = ATC.T('스쿼크(레이더 식별 부호)는 네 자리를 한 자리씩 읽습니다.'); }
    else { a = rnd(['C', 'D', 'F', 'K', 'M', 'Q', 'S', 'W']); q = ATC.T('ATIS 정보 {0}', a); ok = 'information ' + ATC.PH[a]; var others = shuffle(Object.keys(ATC.PH).filter(function (x) { return x !== a; })).slice(0, 2); bad = ['information ' + ATC.PH[others[0]], 'information ' + ATC.PH[others[1]], 'information ' + a.toLowerCase() + 'ee']; why = ATC.T('알파벳은 ICAO 음성 알파벳(Alfa, Bravo, Charlie …)으로 읽습니다.'); }
    return { q: ATC.T('{0} — 교신에서는 어떻게 읽을까요?', q), opts: shuffle([ok].concat(bad.slice(0, 3))), ok: ok, why: why };
  }
  function nextQ() {
    var ty = st.type, ac = fakeAc(), g, p, opts, q = {};
    if (ty === 'num') q = genNum();
    else if (ty === 'rb') {
      var kinds = rnd([[{ k: 'hdg', v: ri(1, 36) * 10, dir: rnd(['L', 'R']) }, { k: 'alt', v: ri(3, 6) * 1000 }], [{ k: 'alt', v: ri(3, 7) * 1000 }, { k: 'spd', v: rnd([180, 200, 210, 220]) }], [{ k: 'clr', destName: 'Tokyo Haneda', sid: 'NEVIS 1A', alt: 6000, sq: '' + ri(41, 46) + ri(1, 7) + ri(0, 7) }]]);
      var sim = new ATC.Sim({ seed: ri(1, 999999) }), wrong = Math.random() < 0.55 ? sim.mutate(ac, kinds) : null; p = ATC.phrase(fsim, ac, kinds);
      var rb = wrong ? ATC.phrase(fsim, ac, wrong).rb : p.rb;
      q = { q: ATC.T('관제 지시와 복창이 일치합니까?'), body: ATC.T('<div class="dq atc"><b>관제</b>{0}</div><div class="dq plt"><b>조종사</b>{1}</div>', esc(p.atc), esc(rb[0].toUpperCase() + rb.slice(1))), opts: [ATC.T('복창 일치 — "Readback correct"'), ATC.T('복창 오류 — "Negative"로 정정')], ok: wrong ? ATC.T('복창 오류 — "Negative"로 정정') : ATC.T('복창 일치 — "Readback correct"'), why: wrong ? ATC.T('지시: {0} / 복창: {1} — 수치가 다릅니다. 방치하면 조종사는 잘못된 수치대로 비행합니다.', p.atc, rb) : ATC.T('지시와 복창의 수치 · 방향이 모두 일치합니다.') };
    } else {
      g = genCmd(ac); p = ATC.phrase(fsim, ac, g.c); var alts = g.alts.map(function (c) { return ATC.phrase(fsim, ac, c).atc; }).filter(function (t, i, arr) { return t !== p.atc && arr.indexOf(t) === i; }).slice(0, 3);
      if (ty === 'say') q = { q: ATC.T('이 지시의 표준 영어 관제 용어는?'), body: '<div class="dq ko">' + esc(ATC.gloss(p.atc)) + '</div>', opts: shuffle([p.atc].concat(alts)), ok: p.atc, why: ATC.gloss(p.atc) + ' = ' + p.atc };
      else q = { q: ATC.T('방금 들은 교신의 의미는?'), audio: p.atc, body: ATC.T('<div class="dq"><button class="btn" data-d="play">▶ 다시 듣기</button></div>'), opts: shuffle([p.atc].concat(alts).map(ATC.gloss)), ok: ATC.gloss(p.atc), why: p.atc + ' = ' + ATC.gloss(p.atc) };
    }
    st.cur = q; st.ans = null; render(); if (q.audio) play(q.audio);
  }
  function play(t) { var d = 0; try { ATC.Radio.init(); if (ATC.app.vmode === 'radio' && ATC.D.voice !== false) { ATC.Radio.loadAll(); d = ATC.Radio.speak(t, 'atc', 'ATC', false); } } catch (e) { } if (!d && ATC.ui.tts) ATC.ui.tts({ who: 'atc', text: t, cs: 'ATC' }); }
  function menu() {
    st = null;
    ATC.ui.openModal(ATC.T('<div class="mhead"><span class="pen">RADIOTELEPHONY TRAINING</span><h2>교신 훈련</h2></div><div class="mbody"><p class="bsum">근무에 앞서 교신의 기본을 문제로 익힙니다. 유형별 10문제.</p><div class="dmenu">{0}</div></div><div class="mfoot"><button class="btn" data-m="learn" data-les="rt">학습 노트: 교신의 기본</button><span class="sp"></span><button class="btn pri" data-m="close">닫기</button></div>', Object.keys(TYPES).map(function (k) { return '<button class="dcard" data-d="start" data-t="' + k + '"><b>' + TYPES[k].t + '</b><span>' + TYPES[k].d + '</span></button>'; }).join('')));
  }
  /* 고른 답과 정답에서 달라진 낱말만 뽑아 보여 줌 */
  function diff(a, b) {
    var x = String(a).split(/\s+/), y = String(b).split(/\s+/), i = 0, j = 0;
    while (i < x.length && i < y.length && x[i] === y[i]) i++;
    while (j < x.length - i && j < y.length - i && x[x.length - 1 - j] === y[y.length - 1 - j]) j++;
    var da = x.slice(i, x.length - j).join(' '), db = y.slice(i, y.length - j).join(' ');
    if (!da && !db) return '';
    if (da.length > 60 || db.length > 60) return '';
    return ATC.T('<div class="ddiff">차이 — 선택한 답: <s>{0}</s> → 정답: <u>{1}</u></div>', esc(da || ATC.T('(없음)')), esc(db || ATC.T('(없음)')));
  }
  function render() {
    var q = st.cur, done = st.ans !== null, h = ATC.T('<div class="mhead"><span class="pen">교신 훈련 · {0}</span><h2>{1} / 10 <small>정답 {2}</small></h2></div><div class="mbody drill"><p class="dqt">{3}</p>{4}<div class="dopts">{5}</div>{6}</div><div class="mfoot"><button class="btn" data-d="menu">훈련 목록</button><span class="sp"></span>{7}</div>', TYPES[st.type].t, (st.n + 1), st.score, q.q, (q.body || ''), q.opts.map(function (o, i) { var cls = done ? (o === q.ok ? ' ok' : i === st.ans ? ' no' : '') : ''; return '<button class="dopt' + cls + '" data-d="ans" data-i="' + i + '"' + (done ? ' disabled' : '') + '>' + esc(o) + '</button>'; }).join(''), (done ? '<div class="dwhy ' + (q.opts[st.ans] === q.ok ? 'ok' : 'no') + '"><b>' + (q.opts[st.ans] === q.ok ? ATC.T('정답입니다.') : ATC.T('오답입니다.')) + '</b> ' + esc(q.why) + (q.opts[st.ans] === q.ok ? '' : diff(q.opts[st.ans], q.ok)) + '</div>' : ''), (done ? '<button class="btn pri" data-d="next">' + (st.n >= 9 ? ATC.T('결과 보기') : ATC.T('다음 문제')) + '</button>' : ''));
    ATC.ui.openModal(h);
  }
  function result() {
    var s = st.score, ty = TYPES[st.type];
    ATC.ui.openModal(ATC.T('<div class="mhead"><span class="pen">교신 훈련 · {0}</span><h2>결과 {1} / 10</h2></div><div class="mbody"><p class="bsum">{2}</p></div><div class="mfoot"><button class="btn" data-m="learn" data-les="{3}">학습 노트</button><span class="sp"></span><button class="btn" data-d="menu">훈련 목록</button><button class="btn pri" data-d="start" data-t="{4}">다시</button></div>', ty.t, s, (s >= 9 ? ATC.T('아주 좋습니다. 실제 근무에서 써 보세요.') : s >= 6 ? ATC.T('기본기는 갖춰졌습니다. 틀린 유형을 한 번 더 풀어 보세요.') : ATC.T('학습 노트를 읽고 다시 도전해 보세요.')), ty.les, st.type));
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-d]') : null; if (!b) return; var d = b.dataset.d;
    if (d === 'menu') menu();
    else if (d === 'start') { st = { type: b.dataset.t, n: 0, score: 0, cur: null, ans: null }; nextQ(); }
    else if (d === 'ans' && st && st.ans === null) { st.ans = +b.dataset.i; if (st.cur.opts[st.ans] === st.cur.ok) st.score++; render(); }
    else if (d === 'next' && st) { if (st.n >= 9) result(); else { st.n++; nextQ(); } }
    else if (d === 'play' && st && st.cur.audio) play(st.cur.audio);
  });
  ATC.drill = { open: menu };
})();
