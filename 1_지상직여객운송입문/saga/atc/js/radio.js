/* AIRLINE SAGA — ATC 무선 음성: 구절 조각을 이어 붙이고 항공 무선(VHF) 음질을 입혀 재생
   조각 = assets/voice/<역할>_<번호>.js (8kHz μ-law). 역할: ctl(관제사 남) · ctlf(관제사 여) · p1 · p2(조종사) · p3 · p4(조종사, 일본어 목소리). 관제사는 고른 쪽 묶음만 읽음. 조각이 모자란 문구는 0을 돌려줘 브라우저 음성으로 넘김 */
(function () {
  'use strict';
  var ATC = window.ATC, V = ATC.V;
  var RD = ATC.Radio = { ctx: null, idx: { ctl: {}, ctlf: {}, p1: {}, p2: {}, p3: {}, p4: {} }, atc: 'ctl', state: {}, loaded: 0, total: 0, miss: {}, vol: 0.6, busyUntil: 0, blocked: false, err: '', fx: 'strong', rate: 1, cached: [] };
  /* 무선 처리 세기: 대역(Hz) · 찌그러짐 · 바탕 잡음 · 출력 */
  var FX = { strong: { lo: 430, hi: 2700, drive: 3.6, noise: 0.1, out: 0.5 }, weak: { lo: 300, hi: 3400, drive: 1.1, noise: 0.037, out: 1.1 } };
  var IMA_STEP = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767], IMA_IDX = [-1, -1, -1, -1, 2, 4, 6, 8];
  var MU = new Float32Array(256); (function () { for (var i = 0; i < 256; i++) { var y = i / 255 * 2 - 1; MU[i] = (y < 0 ? -1 : 1) * (Math.pow(256, Math.abs(y)) - 1) / 255; } })();
  RD.init = function () {
    if (RD.ctx) { RD.unlock(); return RD.ctx; }
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) { RD.err = 'no-audiocontext'; return null; }
    var c, i; try { c = RD.ctx = RD.mkctx ? RD.mkctx() : new AC(); } catch (e) { RD.err = String(e && e.message || e); return null; }
    /* 잡음 원본(2초) */
    var nb = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = nb.getChannelData(0); for (i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; RD.noise = nb;
    RD.master = c.createGain(); RD.master.gain.value = RD.vol;
    var lim = c.createDynamicsCompressor(); lim.threshold.value = -8; lim.knee.value = 4; lim.ratio.value = 20; lim.attack.value = 0.002; lim.release.value = 0.08;
    var og = c.createGain(); og.gain.value = 0.8; RD.master.connect(lim); lim.connect(og); og.connect(c.destination); RD.out = og;
    /* 무선 음질: 좁은 대역 → 찌그러짐 → 다시 대역 */
    function chain(f) {
      var inp = c.createGain(), h1 = c.createBiquadFilter(), h2 = c.createBiquadFilter(), l1 = c.createBiquadFilter(), l2 = c.createBiquadFilter(), ws = c.createWaveShaper(), h3 = c.createBiquadFilter(), l3 = c.createBiquadFilter(), out = c.createGain();
      h1.type = h2.type = h3.type = 'highpass'; h1.frequency.value = h2.frequency.value = h3.frequency.value = f.lo; l1.type = l2.type = l3.type = 'lowpass'; l1.frequency.value = l2.frequency.value = l3.frequency.value = f.hi;
      var n = 2048, cv = new Float32Array(n); for (var k = 0; k < n; k++) { var x = k / (n - 1) * 2 - 1; cv[k] = Math.tanh(x * f.drive) / Math.tanh(f.drive); } ws.curve = cv; ws.oversample = '2x';
      inp.connect(h1); h1.connect(h2); h2.connect(l1); l1.connect(l2); l2.connect(ws); ws.connect(h3); h3.connect(l3); l3.connect(out); out.connect(RD.master); out.gain.value = f.out;
      return inp;
    }
    RD.ch = { strong: chain(FX.strong), weak: chain(FX.weak) };
    RD.unlock();      /* 소리 장치를 만든 그 누름 안에서 바로 풀기(휴대폰은 누르는 순간에만 풀림) */
    return c;
  };
  /* 휴대폰: 이 방식의 소리(Web Audio)는 「벨소리」 쪽으로 잡혀 무음 스위치가 켜져 있으면 나지 않음 →
     ① 소리 종류를 「재생」으로 바꾸고(되는 기기만) ② 소리 없는 음원을 <audio>로 돌려 두어 매체 소리로 잡히게 함. 누르는 순간에만 시작할 수 있어 unlock에서 부름 */
  var SIL = 'data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==';
  RD.unmute = function () {
    if (RD.mkctx || typeof navigator === 'undefined') return;
    try { if (navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback'; } catch (e) { }
    if (!(navigator.maxTouchPoints > 0) || typeof Audio === 'undefined') return;
    try {
      var a = RD.sil; if (!a) { a = RD.sil = new Audio(); a.loop = true; a.preload = 'auto'; a.setAttribute('playsinline', ''); a.setAttribute('x-webkit-airplay', 'deny'); a.src = SIL; }
      if (a.paused) { var p = a.play(); if (p && p.then) p.then(function () { RD.silOn = true; }, function (e) { RD.silErr = String(e && e.name || e); }); }
    } catch (e) { RD.silErr = String(e && e.message || e); }
  };
  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', function () { if (document.hidden && RD.sil) { try { RD.sil.pause(); } catch (e) { } } });
  /* 브라우저가 소리를 막아 둔 상태(사용자 조작 전)면 풀기 — 누르기·키 입력 때마다 다시 시도 */
  RD.unlock = function () { var c = RD.ctx; RD.unmute(); if (c && c.state !== 'running' && c.resume) { try { var p = c.resume(); if (p && p.then) p.then(function () { RD.blocked = false; }, function () { }); } catch (e) { } } };
  if (typeof document !== 'undefined') ['mousedown', 'keydown', 'touchend', 'pointerup', 'click'].forEach(function (ev) { document.addEventListener(ev, function () { if (RD.ctx) RD.unlock(); }, true); });
  /* 지금 상태를 글로(소리 시험·문제 확인용) */
  RD.diag = function () { return { ctx: RD.ctx ? RD.ctx.state : 'none', rate: RD.ctx ? RD.ctx.sampleRate : 0, packs: RD.loaded + '/' + RD.total, blocked: RD.blocked, err: RD.err, miss: Object.keys(RD.miss).length, sil: RD.sil ? (RD.silOn ? 'on' : RD.silErr || 'wait') : 'none', ses: typeof navigator !== 'undefined' && navigator.audioSession ? navigator.audioSession.type : '-' }; };
  RD.playing = function () { return !!(RD.ctx && RD.ctx.state === 'running' && RD.ctx.currentTime < RD.busyUntil); };
  /* 음성 묶음 불러오기: 한 번에 하나씩 차례로(화면이 멈칫하지 않게). 불러온 조각부터 바로 씀 */
  function take(name) {
    var p = ATC.VPK && ATC.VPK[name]; if (!p || !p.b64) return false;
    var bin, n, u8, i, k, ix = RD.idx[p.role]; try { bin = atob(p.b64); n = bin.length; u8 = new Uint8Array(n); for (i = 0; i < n; i++) u8[i] = bin.charCodeAt(i); } catch (e) { RD.err = 'pack ' + name + ': ' + (e && e.message || e); return false; }
    for (k in p.idx) ix[k] = { u8: u8, sr: p.sr, ima: p.fmt === 'ima', pos: p.idx[k][0], len: p.idx[k][1], buf: null };
    p.b64 = null; RD.state[name] = 'ok'; RD.loaded++; return true;
  }
  /* 관제사 목소리 역할: 고른 쪽 묶음이 없으면 남자 목소리 */
  function atcRole() { return ATC.VPARTS && ATC.VPARTS[RD.atc] ? RD.atc : 'ctl'; }
  /* 받는 순서: 관제사 묶음을 먼저 다 받고, 조종사는 목소리 하나씩 차례로(한 목소리의 조각은 여러 파일에 흩어져 있어, 파일을 섞어 받으면 끝날 때까지 아무 목소리도 완성되지 않음).
     한 번에 두 파일씩 받음. 지금 말해야 하는데 아직 없는 목소리는 RD.want()로 앞당김 */
  RD.loadAll = function () {
    if (!RD.init()) return;
    var parts = ATC.VPARTS || {}, roles = [atcRole()].concat(V.PILOTS), i; RD.queue = RD.queue || []; RD.queued = RD.queued || {};
    roles.forEach(function (r) { for (i = 1; i <= (parts[r] || 0); i++) { var nm = r + '_' + i; if (!RD.queued[nm]) { RD.queued[nm] = 1; RD.queue.push(nm); } } });
    RD.total = Object.keys(RD.queued).length; pump();
  };
  RD.want = function (role) { var q = RD.queue, a = q.filter(function (n) { return n.split('_')[0] === role; }); if (a.length && q[0].split('_')[0] !== role) RD.queue = a.concat(q.filter(function (n) { return n.split('_')[0] !== role; })); };
  RD.roleReady = function (role) { var n = (ATC.VPARTS || {})[role] || 0, i; for (i = 1; i <= n; i++) if (RD.state[role + '_' + i] !== 'ok') return false; return n > 0; };
  function pump() { while ((RD.busy || 0) < 2 && RD.queue.length) next(RD.queue.shift()); }
  function next(name) {
    if (take(name)) { setTimeout(pump, 0); return; }
    RD.state[name] = 'loading'; RD.busy = (RD.busy || 0) + 1;
    var fin = function (ok) { RD.busy--; if (!ok || !take(name)) { RD.state[name] = 'none'; RD.failed = (RD.failed || 0) + 1; } setTimeout(pump, 30); };
    var s = document.createElement('script'); s.src = (ATC.base || '') + (ATC.D.voice && ATC.D.voice.dir || 'assets/voice/') + name + '.js' + (function (v) { v = v && v.ver && v.ver[name.split('_')[0]]; return '?v=f2' + (v ? '-' + v : ''); })(ATC.D.voice);      /* f2 = 절반 크기 형식(ADPCM)으로 바꾼 묶음 */      /* 다시 녹음한 역할만 주소를 바꿈 — 나머지 묶음은 받아 둔 것을 그대로 씀 */
    s.onload = function () { fin(true); }; s.onerror = function () { fin(false); }; document.head.appendChild(s);
  }
  RD.ready = function () { return RD.total > 0 && RD.loaded + (RD.failed || 0) >= RD.total; };
  RD.has = function () { return RD.loaded > 0; };
  function ubuf(c, e) {
    if (e.buf) return e.buf;
    var b = c.createBuffer(1, Math.max(1, e.len), e.sr), d = b.getChannelData(0), u8 = e.u8, p = e.pos, i;
    if (e.ima && e.len > 0) {      /* IMA ADPCM(4비트): 머리 3바이트(첫 표본 · 단계 번호) 뒤로 표본마다 반 바이트 — tools/voice_compact.js 가 만든 형식 */
      var pred = u8[p] | (u8[p + 1] << 8), index = u8[p + 2], q = p + 3, hi = false, byte = 0, code, step, dd; if (pred > 32767) pred -= 65536; d[0] = pred / 32768;
      for (i = 1; i < e.len; i++) {
        if (!hi) { byte = u8[q++]; code = byte & 15; hi = true; } else { code = byte >> 4; hi = false; }
        step = IMA_STEP[index]; dd = step >> 3; if (code & 4) dd += step; if (code & 2) dd += step >> 1; if (code & 1) dd += step >> 2;
        pred += (code & 8) ? -dd : dd; if (pred > 32767) pred = 32767; else if (pred < -32768) pred = -32768;
        index += IMA_IDX[code & 7]; if (index < 0) index = 0; else if (index > 88) index = 88;
        d[i] = pred / 32768;
      }
    } else for (i = 0; i < e.len; i++) d[i] = MU[u8[p + i]];
    e.buf = b; RD.cached.push(e); if (RD.cached.length > 700) RD.cached.splice(0, 350).forEach(function (x) { x.buf = null; });
    return b;
  }
  RD._ubuf = ubuf;      /* 시험용: 단위 하나를 풀어 본 결과 */
  /* 지금 소리를 내고 있거나 예약된 음원 — RD.stop()이 한꺼번에 끊을 수 있게 적어 둠 */
  RD.act = []; RD.live = [];
  function track(s, end) { var n = RD.ctx.currentTime; if (RD.act.length > 60) RD.act = RD.act.filter(function (x) { return x.end > n; }); RD.act.push({ s: s, end: end }); }
  function burst(t, dur, lvl, freq, dest) {
    var c = RD.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = RD.noise; s.loop = true; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 0.7;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(lvl, t + 0.004); g.gain.setValueAtTime(lvl, t + dur - 0.01); g.gain.linearRampToValueAtTime(0, t + dur);
    s.connect(f); f.connect(g); g.connect(dest || RD.master); s.start(t, Math.random() * 1.5); s.stop(t + dur + 0.02); track(s, t + dur + 0.02);
  }
  /* 브라우저 음성 위에 얹는 무선 분위기: 송신 딸깍 + 말하는 동안 바탕 잡음 + 끝의 잡음 꼬리. 돌려주는 것의 stop()을 말이 끝날 때 부름.
     잡음 세기는 무선 음질 설정(거칠게 · 맑게)을 따르고, 끝남 알림이 오지 않아도 maxDur(초) 뒤에는 저절로 꺼짐 */
  RD.amb = function (who, cs, maxDur) {
    var c = RD.init(), none = { stop: function () { } }; if (!c || c.state !== 'running') return none;
    try {
      var h = V.hash(cs || 'ATC'), weak = who === 'atc' ? 0 : (h % 5) / 4, fx = FX[RD.fx] || FX.strong, lvl = fx.noise * (who === 'atc' ? 0.5 : 0.8 + weak * 0.4), t = c.currentTime + 0.01, cap = t + Math.min(20, maxDur || 8);
      var g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(lvl, t + 0.03); g.connect(RD.master);
      var srcs = [[1900, 1], [700, 0.5]].map(function (b) { var s = c.createBufferSource(), f = c.createBiquadFilter(), k = c.createGain(); s.buffer = RD.noise; s.loop = true; f.type = 'bandpass'; f.frequency.value = b[0]; f.Q.value = 0.7; k.gain.value = b[1]; s.connect(f); f.connect(k); k.connect(g); s.start(t, Math.random() * 1.5); s.stop(cap); return s; });
      burst(t, 0.022, 0.3, 2400);
      var done = false, hd = { stop: function (quiet) {
        if (done) return; done = true; var n = c.currentTime, ix = RD.live.indexOf(hd); if (ix >= 0) RD.live.splice(ix, 1);
        try { g.gain.cancelScheduledValues(n); g.gain.setValueAtTime(lvl, n); g.gain.linearRampToValueAtTime(0, n + 0.03); srcs.forEach(function (s) { s.stop(n + 0.08); }); if (!quiet && n < cap) { if (who !== 'atc') burst(n + 0.01, 0.11, lvl * 1.2, 2100); else burst(n, 0.02, 0.2, 2400); } } catch (e) { }
      } };
      RD.live.push(hd); setTimeout(function () { hd.stop(true); }, (cap - c.currentTime) * 1000 + 50);
      return hd;
    } catch (e) { RD.err = String(e && e.message || e); return none; }
  };
  /* 문구 하나를 무선 음성으로 재생. 돌려주는 값 = 실제 길이(초), 재생할 수 없으면 0 */
  RD.speak = function (text, who, cs, fast) {
    var c = RD.init(); if (!c) return 0;
    if (c.state !== 'running' && !RD.mkctx) { RD.blocked = true; return 0; }
    RD.blocked = false;
    try { return speak1(c, text, who, cs, fast); } catch (e) { RD.err = String(e && e.message || e); return 0; }
  };
  RD.plan = function (text, who, cs) { var ix = RD.idx[who === 'atc' ? atcRole() : V.voiceOf(cs)]; return V.plan(text, function (k) { return ix[k]; }); };
  function speak1(c, text, who, cs, fast) {
    var role = who === 'atc' ? atcRole() : V.voiceOf(cs), ix = RD.idx[role], h = V.hash(cs || 'ATC'), fx = FX[RD.fx] || FX.strong;
    var plan = V.plan(text, function (k) { return ix[k]; }), i, u;
    if (!plan) { if (!RD.roleReady(role)) RD.want(role);      /* 아직 받지 못한 목소리면 그 묶음을 앞당겨 받음 */
      if (RD.ready() && !RD.miss[V.miss]) { RD.miss[V.miss] = 1; if (window.console) console.warn(ATC.T('[ATC voice] 조각 없음:'), role, V.miss); } return 0; }
    var rate = RD.rate * (who === 'atc' ? 1 : 0.96 + (h % 5) * 0.02) * (fast ? 1.12 : 1), weak = who === 'atc' ? 0 : (h % 5) / 4;
    var t0 = c.currentTime + 0.05, t = t0, dest = c.createGain(); dest.gain.value = who === 'atc' ? 1 : 1 - weak * 0.25; dest.connect(RD.ch[RD.fx] || RD.ch.strong);
    burst(t, 0.022, 0.4, 2400); t += 0.05;                       /* 송신 키 딸깍 */
    for (i = 0; i < plan.length; i++) {
      u = plan[i]; if (u.p) { t += u.p / rate; continue; }
      var e = ix[u.k], src = c.createBufferSource(); src.buffer = ubuf(c, e); src.playbackRate.value = rate; src.connect(dest);
      src.start(t); t += e.len / e.sr / rate; track(src, t);
    }
    /* 바탕 잡음(말하는 동안) + 끝의 잡음 꼬리(조종사 쪽) */
    var lvl = fx.noise * (who === 'atc' ? 1 : 1 + weak * 0.6);
    burst(t0, t - t0 + 0.02, lvl, 1900); burst(t0, t - t0 + 0.02, lvl * 0.5, 700);
    if (who !== 'atc') burst(t + 0.01, 0.11, 0.16, 2100); else burst(t, 0.02, 0.25, 2400);
    RD.busyUntil = t + 0.15;
    return t - c.currentTime + (who === 'atc' ? 0.06 : 0.16);
  }
  /* 모든 소리를 바로 끊음(근무 종료 · 로비로 나감 · 음성 끔): 바탕 잡음 · 예약된 조각까지 */
  RD.stop = function () {
    RD.live.slice().forEach(function (h) { h.stop(true); });
    RD.act.forEach(function (x) { try { x.s.stop(); } catch (e) { } }); RD.act = [];
    if (RD.ctx && RD.master) { RD.master.gain.setValueAtTime(0, RD.ctx.currentTime); RD.master.gain.linearRampToValueAtTime(RD.vol, RD.ctx.currentTime + 0.4); RD.busyUntil = 0; }
  };
})();
