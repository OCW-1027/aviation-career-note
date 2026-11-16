/* AIRLINE SAGA — ATC 조종사 체험(⑤ 1단계): 플레이어가 Vela Air 도착기의 조종사, 관제는 AI(ATC.AI).
   - 접근관제 주파수에서: 첫 호출(check-in) → 관제 지시를 듣고 복창(보기 고르기 또는 마이크) → 자동조종(MCP)에 기수 · 고도 · 속도 · 직행 · ILS 설정
     → 관제탑 이양 지시 → 주파수 바꾸기 → 관제탑 첫 호출로 끝
   - 채점(p_*): 복창 정확도 · 응답 시간 · 설정 정확도 · 허가 없는 변경 · 주파수 · 첫 호출. AI 관제사 쪽 감점은 세지 않음
   core.js의 say · command가 내 항공기 것이면 여기로 넘김 */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;
  var RB_T = 14, SET_T = 25, AUTO_T = 45;      /* 복창 기다림 · 설정 기다림 · 부기장이 대신 설정하는 시각(초) */

  function Pilot(sim) {
    this.sim = sim; sim.pilot = this; this.ac = null; this.cs = null; this.ver = 0;
    this.prompt = null;      /* 보낼 교신(첫 호출 등): { text, opts:[{t, ok, why}] } */
    this.clr = null;         /* 복창을 기다리는 지시: { cmds, ph, t0, opts, tries } */
    this.asg = {};           /* 받은 지시 중 아직 설정하지 않은 것: k → { c, t } */
    this.cur = { hdg: null, alt: null, spd: null };      /* 지금 유효한 허가(기수 · 고도 · 속도) */
    this.ilsOk = false; this.freq = null; this.done = false; this.nRb = 0; this.nRbOk = 0; this.rt = [];
    var s = sim.sched.filter(function (x) { return x.kind === 'arr' && !x.warm; }).sort(function (a, b) { return a.t - b.t; })[0];
    if (s) { s.pilot = true; s.warm = true; s.wi = 1; s.t = Math.min(s.t, sim.t + 20); sim.sched.sort(function (a, b) { return a.t - b.t; }); }      /* 경로 가운데쯤에서 시작(첫 지시까지 오래 기다리지 않게) */
    sim.isFinished = function () { return this.pilot.done; };
    sim.sys(ATC.T('조종사 체험 — 곧 나타나는 Vela Air 도착기의 조종사입니다. 관제는 AI가 합니다. 관제 지시를 듣고 복창한 뒤 자동조종(MCP)에 설정하세요.'), 'info');
  }
  Pilot.prototype.bump = function () { this.ver++; };
  /* 내 항공기가 처음 나타날 때 */
  Pilot.prototype.attach = function (ac) {
    this.ac = ac; this.cs = ac.cs; ac.pilotMe = true;
    this.mcp = { hdg: Math.round(ac.hdg / 5) * 5 || 360, alt: ac.tAlt, spd: Math.round((ac.tIas || ac.ias) / 10) * 10 };
    this.cur.alt = ac.tAlt; this.bump();
  };
  Pilot.prototype.mine = function (ac) { return !!(ac && this.ac && ac === this.ac); };

  /* ---- 내 항공기가 보낼 교신(첫 호출 · 요청): 보기 3개 중 고르기 ---- */
  function alter(text, sim, ac) {
    var o = [], m;
    if ((m = /(\d{1,2}),000/.exec(text))) o.push({ t: text.replace(m[0], (+m[1] + 1) + ',000'), why: ATC.T('고도가 다릅니다 — 지금 고도 · 지시받은 고도를 정확히') });
    if ((m = /information ([A-Z][a-z]+)/.exec(text))) { var ks = Object.keys(ATC.PH), i = ks.map(function (k) { return ATC.PH[k]; }).indexOf(m[1]), nx = ATC.PH[ks[(i + 1) % ks.length]]; o.push({ t: text.replace(m[0], 'information ' + nx), why: ATC.T('ATIS 기호가 다릅니다 — 받아 둔 최신 ATIS를') }); }
    var n = String(ac.num), sw = n.length > 1 ? n.slice(0, -2) + n.slice(-1) + n.slice(-2, -1) : n + '1'; if (sw === n) sw = String(+n + 1);
    o.push({ t: text.split(ac.csWord + ' ' + n).join(ac.csWord + ' ' + sw), why: ATC.T('호출부호(편명)가 다릅니다') });
    return o.filter(function (x) { return x.t !== text; });
  }
  Pilot.prototype.onSay = function (text, o) {
    if (this.prompt) { (this.pq = this.pq || []).push([text, o]); return; }      /* 앞의 교신을 아직 보내지 않음 → 줄 세움 */
    var w = alter(text, this.sim, this.ac).slice(0, 2);
    this.prompt = { text: text, o: o || {}, opts: shuffle([{ t: text, ok: true }].concat(w.map(function (x) { return { t: x.t, ok: false, why: x.why }; }))), t0: this.sim.t };
    this.bump();
  };
  Pilot.prototype.sendPrompt = function (i) {
    var p = this.prompt, sim = this.sim, ac = this.ac; if (!p) return; var c = p.opts[i]; this.prompt = null; this.ci = true; this.bump();
    if (this.pq && this.pq.length) { var nx = this.pq.shift(); this.onSay(nx[0], nx[1]); }
    sim.say(ac, c.t, { force: true, onDone: p.o.onDone, kind: p.o.kind });
    if (c.ok) sim.inc('p_ci_ok', [ac], ATC.T('{0}: 첫 호출 · 보고를 정확히 했습니다.', ac.cs));
    else sim.inc('p_ci_bad', [ac], ATC.T('{0}: 보낸 교신이 틀렸습니다 — {1}. 바른 문장: 「{2}」', ac.cs, c.why, p.text));
    if (this.freqTo && this.freqTo.sent) { this.finish(); }
  };

  /* ---- AI 관제사의 지시: 송신이 끝나면 복창 차례 ---- */
  Pilot.prototype.onClr = function (cmds, o) {
    var sim = this.sim, ac = this.ac, self = this;
    if (!this.ci) return false;      /* 첫 호출 전에는 지시하지 않음(AI가 나중에 다시) */
    if (this.clr) return false;      /* 앞의 복창이 끝나지 않음 */
    var ph = ATC.phrase(sim, ac, cmds);
    if (!ph.rb) { sim.enq({ who: 'atc', ac: ac, text: ph.atc, onDone: function () { self.take(cmds); } }, true); return true; }      /* 「radar contact」처럼 복창이 필요 없는 송신 */
    this.clr = { cmds: cmds, ph: ph, t0: null, tries: 0 };
    sim.enq({ who: 'atc', ac: ac, text: ph.atc, onDone: function () { if (self.clr && self.clr.cmds === cmds) { self.clr.t0 = sim.t; self.clr.opts = self.rbOpts(cmds, ph); self.bump(); } } }, true);
    this.bump();
    return true;
  };
  Pilot.prototype.rbOpts = function (cmds, ph) {
    var sim = this.sim, ac = this.ac, ok = cap(ph.rb || 'roger, ' + ac.csWord + ' ' + ac.num), o = [{ t: ok, ok: true }], seen = {}, w, k;
    seen[ok] = 1;
    for (k = 0; k < 6 && o.length < 3; k++) {
      w = sim.mutate(ac, cmds); var t = w ? cap(ATC.phrase(sim, ac, w).rb) : null;
      if (!t) {      /* 바꿀 숫자가 없는 지시: 활주로 · 주파수 · 「roger」 */
        var c0 = cmds[0];
        if (c0.k === 'ils') { var rws = Object.keys(D.ends).filter(function (x) { return x !== c0.rwy; }); t = cap(ATC.phrase(sim, ac, [{ k: 'ils', rwy: rws[k % rws.length] }]).rb); }
        else if (c0.k === 'ho') { var fs = ['TWR', 'GND', 'ACC', 'DEP'].filter(function (x) { return x !== c0.to && D.freq[x]; }); t = cap(ATC.phrase(sim, ac, [{ k: 'ho', to: fs[k % fs.length] }]).rb); }
        else if (c0.k === 'dct') { var fx = Object.keys(D.fix).filter(function (x) { return /^[A-Z]{5}$/.test(x) && x !== c0.fix; }); t = cap(ATC.phrase(sim, ac, [{ k: 'dct', fix: fx[(k * 7) % fx.length] }]).rb); }
        else t = 'Roger, ' + ac.csWord + ' ' + ac.num + '.';
      }
      if (t && !seen[t]) { seen[t] = 1; o.push({ t: t, ok: false }); }
    }
    if (o.length < 3 && !seen['Roger, ' + ac.csWord + ' ' + ac.num + '.']) o.push({ t: 'Roger, ' + ac.csWord + ' ' + ac.num + '.', ok: false });
    return shuffle(o);
  };
  Pilot.prototype.readback = function (i, said) {
    var c = this.clr, sim = this.sim, ac = this.ac, self = this; if (!c || !c.opts) return;
    var opt = said !== undefined ? said : c.opts[i], dt = sim.t - c.t0; this.nRb++;
    sim.say(ac, opt.t, { force: true });
    if (opt.ok) {
      this.nRbOk++; this.rt.push(dt);
      if (c.tries === 0) sim.inc('p_rb_ok', [ac], ATC.T('{0}: 정확히 복창했습니다({1}초).', ac.cs, Math.round(dt)));
      this.clr = null; this.take(c.cmds);
    } else {
      sim.inc('p_rb_bad', [ac], ATC.T('{0}: 복창이 지시와 다릅니다 — 관제사가 정정합니다. 지시: 「{1}」', ac.cs, c.ph.atc));
      c.tries++; c.opts = null; c.t0 = null;
      sim.enq({ who: 'atc', ac: ac, text: ac.csWord + ' ' + ac.num + ', negative, I say again, ' + c.ph.atc.split(', ').slice(1).join(', '), onDone: function () { if (self.clr === c) { c.t0 = sim.t; c.opts = self.rbOpts(c.cmds, c.ph); self.bump(); } } });
    }
    this.bump();
  };
  /* 복창한 지시 → 설정할 일 */
  var MCPK = { hdg: 1, alt: 1, spd: 1, dct: 1, ils: 1 };
  Pilot.prototype.take = function (cmds) {
    var sim = this.sim, ac = this.ac, self = this;
    cmds.forEach(function (c) {
      if (c.k === 'ho') { self.freqTo = { to: c.to, fq: (D.freq[c.to] || {}).fq, t: sim.t }; return; }
      if (MCPK[c.k]) { self.asg[c.k] = { c: c, t: sim.t }; if (c.k === 'hdg' || c.k === 'dct') { delete self.asg[c.k === 'hdg' ? 'dct' : 'hdg']; } if (c.k === 'ils') self.ilsOk = c.rwy; }
      else sim.applyAll(ac, [c]);      /* 체공 · 접근 계속 등: 자동조종이 그대로 따름 */
    });
    if (this.asg.hdg) { this.mcp.hdg = this.asg.hdg.c.v; } if (this.asg.alt) this.mcp.alt = this.asg.alt.c.v; if (this.asg.spd && this.asg.spd.c.v) this.mcp.spd = this.asg.spd.c.v;
    this.bump();
  };
  /* ---- 자동조종(MCP) 설정 ---- */
  Pilot.prototype.set = function (k) {
    var sim = this.sim, ac = this.ac, a = this.asg[k], v = k === 'ils' ? null : this.mcp[k], c;
    if (k === 'hdg') c = { k: 'hdg', v: v, dir: a && a.c.v === v ? a.c.dir : null };
    else if (k === 'alt') c = { k: 'alt', v: v };
    else if (k === 'spd') c = { k: 'spd', v: a && !a.c.v ? 0 : v };
    else if (k === 'dct') c = a ? a.c : null;
    else if (k === 'ils') c = { k: 'ils', rwy: this.ilsOk || ac.rwy };
    if (!c) return;
    var ok = !!a && (k === 'dct' || k === 'ils' || (k === 'spd' && !a.c.v) || a.c.v === v);
    var same = !a && k !== 'dct' && k !== 'ils' && this.cur[k] === v;      /* 지금 허가와 같은 값을 다시 설정 */
    if (same) { sim.applyAll(ac, [c]); this.bump(); return; }
    if (k === 'ils' && !this.ilsOk) sim.inc('p_dev', [ac], ATC.T('{0}: ILS 접근 허가 없이 접근 모드를 켰습니다.', ac.cs));
    else if (!a && (k !== 'spd' || this.cur.spd)) sim.inc('p_dev', [ac], ATC.T('{0}: 관제 허가 없이 {1}을(를) 바꿨습니다 — 지금 허가: {2}', ac.cs, { hdg: ATC.T('기수'), alt: ATC.T('고도'), dct: ATC.T('경로') }[k] || k, this.curText()));
    else if (a && !ok) sim.inc('p_set_bad', [ac], ATC.T('{0}: 지시와 다르게 설정했습니다 — 지시 {1}, 설정 {2}', ac.cs, a.c.v, v));
    else if (a && !a.auto && sim.t - a.t > SET_T) sim.inc('p_set_late', [ac], ATC.T('{0}: 설정이 늦었습니다({1}초).', ac.cs, Math.round(sim.t - a.t)));
    else if (a) sim.inc('p_set_ok', [ac], ATC.T('{0}: 지시대로 설정했습니다.', ac.cs));
    sim.applyAll(ac, [c]);
    if (ok) { delete this.asg[k]; if (k === 'hdg' || k === 'alt' || k === 'spd') this.cur[k] = c.v; if (k === 'dct') this.cur.hdg = null; }
    this.bump();
  };
  Pilot.prototype.curText = function () { var c = this.cur, o = []; if (c.hdg) o.push('HDG ' + fmt.hdg(c.hdg)); if (c.alt) o.push(fmt.alt(c.alt)); if (c.spd) o.push(c.spd + 'kt'); return o.join(' · ') || ATC.T('경로대로'); };
  /* ---- 주파수 바꾸기 → 관제탑 첫 호출 ---- */
  Pilot.prototype.freqOpts = function () { var to = this.freqTo.to, o = [to].concat(['TWR', 'GND', 'APP', 'DEP', 'ACC'].filter(function (x) { return x !== to && D.freq[x]; }).slice(0, 2)); return o.sort().map(function (x) { return { to: x, n: D.freq[x].n, fq: D.freq[x].fq }; }); };
  Pilot.prototype.tune = function (to) {
    var sim = this.sim, ac = this.ac, f = this.freqTo; if (!f || f.sent) return;
    if (to !== f.to) { sim.inc('p_freq_bad', [ac], ATC.T('{0}: 주파수를 잘못 맞췄습니다({1}) — 지시는 {2} {3}', ac.cs, D.freq[to].fq, D.freq[f.to].n, D.freq[f.to].fq)); this.bump(); return; }
    f.sent = true; sim.applyAll(ac, [{ k: 'ho', to: f.to }]);
        this.onSay(D.freq[f.to].n + ', ' + ATC.csSay(ac) + ', ILS runway ' + ac.rwy + '.', {});      /* 관제탑 근무 화면의 첫 호출과 같은 문장(녹음 있음) */
  };
  Pilot.prototype.finish = function () { this.done = true; this.sim.sys(ATC.T('관제탑과 교신을 시작했습니다 — 조종사 체험 끝.'), 'good'); this.bump(); };
  /* ---- 시간 흐름: 복창 · 설정 기다림, 부기장 대신 설정, AI 관제 ---- */
  Pilot.prototype.tick = function () {
    var sim = this.sim, ac = this.ac, k, self = this;
    if (!ac) { var f = sim.acs.filter(function (a) { return a.cs === self.cs; })[0]; if (f) this.attach(f); }
    if (ATC.AI && !this.done) ATC.AI.run(sim.mode, sim);
    if (!ac || this.done) return;
    if (ac.gone && !this.done) { this.done = true; return; }
    var c = this.clr;
    if (c && c.t0 !== null && !c.late && sim.t - c.t0 > RB_T) { c.late = true; sim.inc('p_rb_late', [ac], ATC.T('{0}: 복창이 늦습니다 — 관제 지시에는 바로 복창합니다.', ac.cs)); }
    if (c && c.t0 !== null && sim.t - c.t0 > RB_T + 20 && !c.rep) { c.rep = true; c.opts = null; c.t0 = null; sim.enq({ who: 'atc', ac: ac, text: ac.csWord + ' ' + ac.num + ', I say again, ' + c.ph.atc.split(', ').slice(1).join(', '), onDone: function () { if (self.clr === c) { c.t0 = sim.t; c.opts = self.rbOpts(c.cmds, c.ph); self.bump(); } } }); this.bump(); }
    for (k in this.asg) { var a = this.asg[k]; if (sim.t - a.t > AUTO_T) { sim.inc('p_set_late', [ac], ATC.T('{0}: 지시를 {1}초 안에 설정하지 않아 부기장이 대신 설정했습니다.', ac.cs, AUTO_T)); a.auto = true; if (a.c.v !== undefined) this.mcp[k] = a.c.v; this.set(k); } }
    if (this.prompt && !this.prompt.late && sim.t - this.prompt.t0 > 30) { this.prompt.late = true; sim.inc('p_ci_late', [ac], ATC.T('{0}: 교신이 늦었습니다 — 주파수에 들어오면 바로 첫 호출을 합니다.', ac.cs)); }
    if (this.freqTo && !this.freqTo.sent && !this.freqTo.late && sim.t - this.freqTo.t > 30) { this.freqTo.late = true; sim.inc('p_freq_late', [ac], ATC.T('{0}: 주파수 바꾸기가 늦었습니다.', ac.cs)); }
  };
  /* 마이크로 복창 · 첫 호출: 표준 문장과 80% 이상 같으면 그 보기를 고른 것으로 */
  Pilot.prototype.wantSpeech = function () { return !!(this.prompt || this.clr && this.clr.opts); };
  Pilot.prototype.speak = function (heard) {
    var opts = this.prompt ? this.prompt.opts : this.clr.opts, best = null, i;
    for (i = 0; i < opts.length; i++) { var s = ATC.mic.score(heard, opts[i].t).pct; if (!best || s > best.s) best = { i: i, s: s }; }
    var good = opts.filter(function (o) { return o.ok; })[0], sg = ATC.mic.score(heard, good.t).pct;
    var pick = sg >= 80 ? opts.indexOf(good) : best.i, said = sg >= 80 ? good : { t: heard, ok: false, why: ATC.T('표준 문장과 {0}%만 같습니다', sg) };
    if (this.prompt) { if (sg < 80) { this.prompt.opts.push(said); pick = this.prompt.opts.length - 1; } this.sendPrompt(pick); }
    else this.readback(pick, said);
    return sg;
  };
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

  ATC.INC.p_ci_ok = { cat: 'P', pts: 1, t: ATC.T('정확한 첫 호출 · 보고'), les: 'rt' };
  ATC.INC.p_ci_bad = { cat: 'P', pts: -3, t: ATC.T('틀린 교신'), les: 'rt' };
  ATC.INC.p_ci_late = { cat: 'E', pts: -2, t: ATC.T('늦은 첫 호출'), les: 'rt' };
  ATC.INC.p_rb_ok = { cat: 'P', pts: 1, t: ATC.T('정확한 복창'), les: 'rb' };
  ATC.INC.p_rb_bad = { cat: 'P', pts: -4, t: ATC.T('틀린 복창'), les: 'rb' };
  ATC.INC.p_rb_late = { cat: 'E', pts: -2, t: ATC.T('늦은 복창'), les: 'rb' };
  ATC.INC.p_set_ok = { cat: 'P', pts: 1, t: ATC.T('지시대로 설정'), les: 'app' };
  ATC.INC.p_set_bad = { cat: 'S', pts: -8, t: ATC.T('지시와 다른 설정'), les: 'app' };
  ATC.INC.p_set_late = { cat: 'E', pts: -3, t: ATC.T('늦은 설정'), les: 'app' };
  ATC.INC.p_dev = { cat: 'S', pts: -10, t: ATC.T('허가 없는 비행 변경'), les: 'app' };
  ATC.INC.p_freq_bad = { cat: 'P', pts: -3, t: ATC.T('주파수 잘못 맞춤'), les: 'rt' };
  ATC.INC.p_freq_late = { cat: 'E', pts: -2, t: ATC.T('늦은 주파수 바꾸기'), les: 'rt' };
  ATC.Pilot = Pilot;
})();
