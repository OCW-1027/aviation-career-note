/* AIRLINE SAGA — 조종사 체험: 조종석 소리(Web Audio로 그 자리에서 만듦, 소리 파일 없음 — 음성 안내만 assets/sfx/ck_callouts.js)
   - 엔진: 낮은 울림 + 넓은 소음 + 팬 고음(N1에 따라)   - 바람 소리: 속도²에 따라, 기어를 내리면 덜컹거림이 더해짐
   - 기어: 움직이는 동안 유압 소리, 끝에 쿵   - 플랩: 모터 소리   - 접지: 쿵 + 타이어 끽, 활주 중 역추력 굉음 · 바퀴 울림
   - 음성 안내(GPWS): 1000 · 500 · approaching minimums · minimums · 100 · 50 · 40 · 30 · 20 · 10, TOO LOW GEAR/FLAPS */
(function () {
  'use strict';
  var ATC = window.ATC;
  var BASE = (function () { var s = document.currentScript && document.currentScript.src || ''; return s.replace(/js\/ck_sound\.js.*$/, ''); })();
  var K = ATC.CkSnd = { on: false, mute: false };
  var A = null, g = {}, buf = {}, st0 = {}, loading = false;

  function ctx() { var c = ATC.Radio && (ATC.Radio.ctx || (ATC.Radio.init && ATC.Radio.init())); if (!c) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; c = new AC(); } return c; }
  function noise(c, sec, brown) {
    var n = Math.round(c.sampleRate * sec), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0), last = 0;
    for (var i = 0; i < n; i++) { var w = Math.random() * 2 - 1; if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w; }
    return b;
  }
  function loop(c, b) { var s = c.createBufferSource(); s.buffer = b; s.loop = true; s.start(); return s; }
  function gain(c, v, to) { var x = c.createGain(); x.gain.value = v; x.connect(to); return x; }
  function filt(c, type, f, q, to) { var x = c.createBiquadFilter(); x.type = type; x.frequency.value = f; if (q) x.Q.value = q; x.connect(to); return x; }
  function set(p, v, t) { if (p) p.setTargetAtTime(v, A.currentTime, t || 0.25); }

  function build() {
    var c = A, m = g.master = gain(c, 0, c.destination), wn = noise(c, 2.5, false), bn = noise(c, 3, true);
    /* 엔진 */
    g.rum = gain(c, 0, m); loop(c, bn).connect(filt(c, 'lowpass', 160, 0.7, g.rum));
    g.roar = gain(c, 0, m); var rf = g.roarF = filt(c, 'bandpass', 520, 0.6, g.roar); loop(c, wn).connect(rf);
    g.whine = gain(c, 0, m); var wf = g.whineF = filt(c, 'bandpass', 3200, 9, g.whine);
    g.o1 = c.createOscillator(); g.o1.type = 'sawtooth'; g.o1.frequency.value = 3200; g.o1.connect(wf); g.o1.start();
    g.o2 = c.createOscillator(); g.o2.type = 'sawtooth'; g.o2.frequency.value = 3215; g.o2.connect(wf); g.o2.start();
    /* 바람 · 기어 덜컹 */
    g.wind = gain(c, 0, m); var w1 = filt(c, 'highpass', 700, 0.5, filt(c, 'lowpass', 5200, 0.4, g.wind)); loop(c, wn).connect(w1);
    g.gearR = gain(c, 0, m); loop(c, bn).connect(filt(c, 'bandpass', 95, 1.2, g.gearR));
    /* 활주 바퀴 울림 */
    g.roll = gain(c, 0, m); loop(c, bn).connect(filt(c, 'lowpass', 90, 1, g.roll));
    /* 유압(기어) · 모터(플랩) */
    g.hyd = gain(c, 0, m); var ho = c.createOscillator(); ho.type = 'triangle'; ho.frequency.value = 410; ho.connect(filt(c, 'bandpass', 410, 4, g.hyd)); ho.start();
    g.flp = gain(c, 0, m); var fo = c.createOscillator(); fo.type = 'square'; fo.frequency.value = 180; fo.connect(filt(c, 'bandpass', 360, 3, g.flp)); fo.start();
    g.wn = wn; g.bn = bn;
  }
  /* 한 번 울리는 소리: 쿵(접지 · 기어 잠김) · 끽(타이어) */
  function thump(v, f) { var c = A, s = c.createBufferSource(); s.buffer = g.bn; var gg = c.createGain(), t = c.currentTime; gg.gain.setValueAtTime(v, t); gg.gain.exponentialRampToValueAtTime(0.001, t + 0.5); s.connect(filt(c, 'lowpass', f || 120, 1, gg)); gg.connect(g.master); s.start(t, Math.random()); s.stop(t + 0.6); }
  function chirp() { var c = A, s = c.createBufferSource(); s.buffer = g.wn; var gg = c.createGain(), t = c.currentTime; gg.gain.setValueAtTime(0.0001, t); gg.gain.exponentialRampToValueAtTime(0.35, t + 0.03); gg.gain.exponentialRampToValueAtTime(0.001, t + 0.35); s.connect(filt(c, 'bandpass', 1700, 3, gg)); gg.connect(g.master); s.start(t); s.stop(t + 0.4); }
  function loadCallouts() {
    if (loading) return; loading = true;
    function dec() { var L = ATC.CK_CALLOUTS || {}; Object.keys(L).forEach(function (k) { fetch(L[k]).then(function (r) { return r.arrayBuffer(); }).then(function (ab) { return A.decodeAudioData(ab); }).then(function (b) { buf[k] = b; }).catch(function () { }); }); }
    if (ATC.CK_CALLOUTS) return dec();
    var sc = document.createElement('script'); sc.src = BASE + 'assets/sfx/ck_callouts.js'; sc.onload = dec; document.head.appendChild(sc);
  }
  var lastSay = 0;
  function say(k) { var b = buf[k]; if (!b || !A) return; var s = A.createBufferSource(); s.buffer = b; var gg = A.createGain(); gg.gain.value = 0.9; s.connect(gg); gg.connect(A.destination); s.start(); lastSay = A.currentTime + b.duration; }

  K.start = function () {
    if (K.on) return; A = ctx(); if (!A) return;
    try { if (!g.master) build(); loadCallouts(); } catch (e) { return; }
    K.on = true; st0 = {}; set(g.master.gain, K.mute ? 0 : 0.55, 0.6);
  };
  K.stop = function () { if (!K.on) return; K.on = false; if (g.master) set(g.master.gain, 0, 0.2); };
  K.dbg = function () { return { clips: Object.keys(buf).length, ctx: A && A.state, on: K.on }; };
  K.toggle = function () { K.mute = !K.mute; if (g.master && K.on) set(g.master.gain, K.mute ? 0 : 0.55, 0.2); return !K.mute; };

  /* 매 프레임: st = 조종석 상태(cockpit3d), p = 조종사 체험 */
  K.update = function (st, p) {
    if (!K.on || !A || !st) return;
    if (A.state !== 'running' && A.resume) { try { A.resume(); } catch (e) { } }
    var n1 = (st.n1 && st.n1[0]) || 25, ias = st.ias || 0, ro = p.roll, cf = p.cfg, rt = ro ? (p.sim.t - ro.t0) : -1;
    var rev = ro && rt < 14 && st.ias > 60 ? Math.max(0, 1 - Math.abs(rt - 5) / 9) : 0;      /* 역추력: 접지 2초 뒤부터 커졌다가 줄어듦 */
    var e = Math.max(0, Math.min(1, (n1 - 20) / 75)) + rev * 0.8;
    set(g.rum.gain, 0.06 + e * 0.16); set(g.roar.gain, 0.012 + e * 0.07); set(g.roarF.frequency, 380 + e * 520);
    set(g.whine.gain, 0.0025 + e * 0.008); set(g.o1.frequency, 2300 + e * 1500, 0.6); set(g.o2.frequency, 2318 + e * 1500, 0.6); set(g.whineF.frequency, 2300 + e * 1500, 0.6);
    var v = Math.min(1.4, ias / 250); set(g.wind.gain, 0.02 + v * v * 0.07);
    set(g.gearR.gain, cf.gear === 'down' && !ro ? 0.05 * Math.min(1, ias / 180) : 0);
    set(g.roll.gain, ro ? 0.25 * Math.min(1, st.ias / 130) + 0.02 : 0, 0.1);
    set(g.hyd.gain, cf.gear === 'transit' ? 0.025 : 0, 0.15); set(g.flp.gain, Math.abs((cf.flapPos || 0) - (cf.flap || 0)) > 0.05 ? 0.012 : 0, 0.15);
    /* 한 번 울리는 소리 */
    if (st0.gear === 'transit' && cf.gear !== 'transit') thump(0.35, 160);
    if (ro && !st0.ro) { thump(0.9, 140); chirp(); setTimeout(function () { if (K.on) chirp(); }, 140); }
    /* 음성 안내: 내려가는 중에 고도를 지날 때 */
    var ra = st.ra, pr = st0.ra, mins = st.mins || 200;
    if (pr !== undefined && ra < pr && !ro && A.currentTime > lastSay - 0.15) {
      var marks = [[1000, '1000'], [500, '500'], [mins + 100, 'appmin'], [mins, 'min'], [100, '100'], [50, '50'], [40, '40'], [30, '30'], [20, '20'], [10, '10']];
      for (var i = 0; i < marks.length; i++) if (pr > marks[i][0] && ra <= marks[i][0]) { say(marks[i][1]); break; }
    }
    if (st.gpws && st.gpws !== st0.gpws) say(/GEAR/.test(st.gpws) ? 'gear' : /FLAP/.test(st.gpws) ? 'flaps' : /SINK/.test(st.gpws) ? 'sink' : /GLIDE/.test(st.gpws) ? 'gs' : '');
    st0 = { ra: ra, ro: !!ro, gear: cf.gear, gpws: st.gpws };
  };
})();
