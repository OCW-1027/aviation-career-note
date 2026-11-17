/* AIRLINE SAGA — ATC 조종사 체험 출발편(2-C, D1): 하네다 Vela Air 787 출발기의 조종사 — 비행계획 → Clearance Delivery
   D1 범위: 주기장 3D에서 시작 · 비행계획(자동 기본, 목적지 · SID · 순항 고도 바꾸기) · 허가 요청 · 허가 복창 · 트랜스폰더 설정 · 지상(Ground) 주파수로 바꾸기
   D2 ~ D4(푸시백 · 지상 이동 · 이륙 · 출발 · 지역관제)는 다음 판. 복창 · 첫 호출 · 주파수 처리는 도착편(ATC.Pilot)의 것을 그대로 씀 */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;
  var SQ_T = 40;
  var GZ = { T1: { n: 'Tokyo Ground', fq: '118.225' }, T3: { n: 'Tokyo Ground', fq: '121.625' } };      /* 주기장 구역별 Ground(AIP RJTT AD2-29 · AD2-39) */
  var GX = ['118.225', '121.625', '121.70', '121.975', '122.075'];      /* 트랜스폰더를 이 시간(초) 안에 넣지 않으면 부기장이 넣음 */

  function DepPilot(sim) {
    D = ATC.D; this.sim = sim; sim.pilot = this; this.dep = true; this.phase = 'fpl'; this.ver = 0;
    this.prompt = null; this.clr = null; this.asg = {}; this.cur = { hdg: null, alt: null, spd: null }; this.freq = 'DEL'; this.freqNow = 'DEL';
    this.done = false; this.nRb = 0; this.nRbOk = 0; this.rt = []; this.ci = false;
    this.cfg = { gear: 'down', gearT: 0, flap: 0, flapPos: 0 };
    this.fly = { mode: 'auto', on: false, used: true };
    this.xpdr = { code: '2000', set: null, entry: '' };
    var f = sim.mkFlight(function (a) { return a.code === 'VLA'; }, 'dep');
    f.type = 'B789'; if (D.types && D.types.B789) f.perf = D.types.B789; f.wake = 'H';
    this.f = f; this.fp = this.autoPlan();
    this.mkAc();
    sim.isFinished = function () { return this.pilot.done; };
    sim.sys(ATC.T('조종사 체험 출발편 — Vela Air 787의 조종사입니다. 관제는 AI가 합니다. 먼저 비행계획을 확인하고 Clearance Delivery에 허가를 요청하세요.'), 'info');
  }
  DepPilot.prototype = Object.create(ATC.Pilot.prototype);
  DepPilot.prototype.constructor = DepPilot;

  /* ---- 비행계획 ---- */
  DepPilot.prototype.gates = function () { var by = this.sim.flow.depBy || {}; return Object.keys(D.gateDest).filter(function (g) { return by[g]; }); };
  DepPilot.prototype.rwyFor = function (g) { return (this.sim.flow.depBy || {})[g] || this.sim.flow.dep; };
  DepPilot.prototype.flOpts = function () { var ceil = (this.f.perf && this.f.perf.ceil) || 43000, o = []; for (var v = 25000; v <= Math.min(41000, ceil); v += 1000) o.push(v); return o; };
  DepPilot.prototype.flFor = function (g) { var east = D.gateEast[g], o = this.flOpts().filter(function (v) { return ((v / 1000) % 2 === 1) === !!east; }); return o[Math.max(0, o.length - 4)] || o[o.length - 1]; };
  DepPilot.prototype.autoPlan = function () {
    var sim = this.sim, PF = D.planFlight ? D.planFlight(sim, this.f, 'dep') : null, gates = this.gates(), g = PF && gates.indexOf(PF.gate) >= 0 ? PF.gate : sim.rng.pick(gates);
    var dl = D.gateDest[g], dst = PF && PF.gate === g ? PF.ap : dl[sim.rng.int(0, dl.length - 1)];
    return { gate: g, dest: dst[0], destName: dst[1], rfl: this.flFor(g), grp: PF && PF.grp };
  };
  DepPilot.prototype.route = function (fp) { fp = fp || this.fp; var sid = D.sidName ? D.sidName(fp.gate) : fp.gate; return 'RJTT ' + this.rwyFor(fp.gate) + ' ' + sid + ' ' + fp.gate + ' … ' + fp.dest; };
  DepPilot.prototype.check = function (fp) {      /* 비행계획 검사: [{ok, t}] */
    fp = fp || this.fp; var o = [], east = !!D.gateEast[fp.gate], odd = (fp.rfl / 1000) % 2 === 1;
    o.push({ ok: D.gateDest[fp.gate].some(function (d) { return d[0] === fp.dest; }), t: ATC.T('목적지 {0}은(는) 출구 지점 {1} 쪽', fp.dest, fp.gate) });
    o.push({ ok: odd === east, t: east ? ATC.T('동쪽행 → 순항 고도는 홀수(FL 290 · 310 …)') : ATC.T('서쪽행 → 순항 고도는 짝수(FL 300 · 320 …)') });
    o.push({ ok: fp.rfl <= ((this.f.perf && this.f.perf.ceil) || 43000), t: ATC.T('787-9 최대 고도 이하') });
    return o;
  };
  DepPilot.prototype.setFp = function (k, v) {
    if (this.phase !== 'fpl') return; var fp = this.fp;
    if (k === 'gate') { fp.gate = v; var d0 = D.gateDest[v][0]; fp.dest = d0[0]; fp.destName = d0[1]; }
    else if (k === 'dest') { var d = D.gateDest[fp.gate].filter(function (x) { return x[0] === v; })[0]; if (d) { fp.dest = d[0]; fp.destName = d[1]; } }
    else if (k === 'rfl') fp.rfl = +v;
    else if (k === 'auto') { this.fp = this.autoPlan(); }
    this.mkAc(); this.bump();
  };
  /* 주기장에 선 내 항공기(비행계획에 맞는 터미널) */
  DepPilot.prototype.standFor = function () {
    var fp = this.fp, intl = D.isIntl ? D.isIntl(fp.dest) : false, pax = (D.standGroups && D.standGroups.pax) || [], want = intl ? ['T3'] : ['T1'];      /* 지원 주기장: T1(국내) · T3(국제) — AIP AD2-39 Ground 구역(118.225 · 121.625)이 분명한 곳만(GPT 14차 F14-01) */
    var ks = Object.keys(D.stands).filter(function (k) { return want.indexOf(D.stands[k].grp) >= 0; }); if (!ks.length) ks = Object.keys(D.stands).filter(function (k) { return pax.indexOf(D.stands[k].grp) >= 0; });
    if (!this.standK || ks.indexOf(this.standK) < 0) this.standK = ks[Math.floor(ks.length / 2)];
    return this.standK;
  };
  DepPilot.prototype.mkAc = function () {
    var sim = this.sim, f = this.f, fp = this.fp, sk = this.standFor(), s = D.stands[sk], p = D.uv2xy(s.u, s.v), ln = String(s.lane).split(','), q = D.uv2xy(+ln[0], +ln[1]);
    var hdg = Math.round(U.n360(Math.atan2(p.x - q.x, p.y - q.y) * 180 / Math.PI)) || 360, ac = this.ac;
    if (!ac) { ac = this.ac = { id: sim.nextId++, sim: sim, cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf, kind: 'dep', st: 'pre', owner: 'me', pilotMe: true, born: sim.t, ias: 0, gs: 0, vs: 0, alt: D.airport.elev || 0 }; this.cs = ac.cs; }
    ac.x = p.x; ac.y = p.y; ac.hdg = hdg; ac.stand = sk; ac.gate = fp.gate; ac.dest = fp.dest; ac.destName = fp.destName; ac.rfl = ac.rflFiled = fp.rfl; ac.rwy = this.rwyFor(fp.gate);
    ac.route = fp.gate + ' ' + fp.dest; ac.atisRep = sim.atis;
    this.gnd = GZ[D.stands[sk].grp] || { n: 'Tokyo Ground', fq: (D.freq.GND || {}).fq };
    this.mcp = { hdg: hdg, alt: D.sidInit || 9000, spd: 250 };
  };
  DepPilot.prototype.confirm = function () {      /* 비행계획 확정 → 허가 요청 차례 */
    if (this.phase !== 'fpl') return; var sim = this.sim, ac = this.ac, bad = this.check().filter(function (c) { return !c.ok; });
    if (bad.length) { sim.inc('p_fpl_bad', [ac], ATC.T('{0}: 비행계획에 맞지 않는 곳이 있습니다 — {1}', ac.cs, bad.map(function (c) { return c.t; }).join(' · '))); this.bump(); return false; }
    this.phase = 'del'; ac.st = 'req'; ac.squawk = sim.squawk(); ac.eobt = sim.utc() + 600; ac.reqT = sim.t; ac.atisRep = sim.atis;
    sim.acs.push(ac); sim.total++;
    this.onSay(D.freq.DEL.n + ', ' + ATC.csSay(ac) + ', stand ' + ac.stand + ', information ' + ATC.phon(sim.atis) + ', request IFR clearance to ' + ac.destName + '.', {});
    ac.waiting = 'clr';
    sim.sys(ATC.T('비행계획 확정: {0}. Delivery({1})에 허가를 요청하세요.', this.route(), D.freq.DEL.fq), 'info');
    this.bump(); return true;
  };

  /* ---- 복창한 지시 → 할 일 ---- */
  DepPilot.prototype.take = function (cmds) {
    var sim = this.sim, ac = this.ac, self = this;
    cmds.forEach(function (c) {
      if (c.k === 'ho') { var to = c.to.fq ? c.to : D.freq[c.to] || {}; self.freqTo = { to: c.key || c.to, n: to.n, fq: to.fq, t: sim.t }; return; }
      if (c.k === 'clr') { self.xpdr.want = c.sq; self.xpdr.t = sim.t; self.cur.alt = c.alt; self.mcp.alt = c.alt; self.sid = c.sid; }
      sim.applyAll(ac, [c]);
    });
    this.bump();
  };
  DepPilot.prototype.known = function () { return false; };
  DepPilot.prototype.onClr = function (cmds, o) {
    var self = this; if (this.prompt) return false;      /* 내 교신(준비 완료 보고 등)을 아직 보내지 않음 → 관제사는 기다림 */
    cmds = cmds.map(function (c) {
      if (c.k === 'ho' && c.to === 'GND') return { k: 'ho', to: self.gnd, key: 'GND' };
      if (c.k === 'rbok' && !self.depSaid && D.freq.DEP) { self.depSaid = true; self.depFq = D.freq.DEP.fq; return { k: 'rbok', then: 'departure frequency ' + D.freq.DEP.fq }; }      /* 출발 주파수는 미리 알려 줌(GPT 14차 R14-03) */
      return c;
    });
    return ATC.Pilot.prototype.onClr.call(this, cmds, o);
  };
  DepPilot.prototype.freqOpts = function () {
    var f = this.freqTo, o = [{ to: 'OK', n: f.n, fq: f.fq }], other = GX.filter(function (x) { return x !== f.fq; });
    o.push({ to: 'X1', n: f.n, fq: other[0] }); if (D.freq.TWR) o.push({ to: 'X2', n: D.freq.TWR.n, fq: D.freq.TWR.fq });
    return o.sort(function (a, b) { return a.fq < b.fq ? -1 : 1; });
  };
  DepPilot.prototype.revector = function () { };
  /* 트랜스폰더: 숫자 0 ~ 7 네 자리 */
  DepPilot.prototype.key = function (d) {
    var x = this.xpdr; if (d === 'clr') x.entry = ''; else if (x.entry.length < 4 && /^[0-7]$/.test(String(d))) x.entry += d;
    if (x.entry.length === 4) {
      x.code = x.entry; x.entry = '';
      if (x.want && !x.set) {
        if (x.code === x.want) { x.set = x.code; this.sim.inc('p_sq_ok', [this.ac], ATC.T('{0}: 트랜스폰더 {1} 설정.', this.ac.cs, x.code)); }
        else this.sim.inc('p_sq_bad', [this.ac], ATC.T('{0}: 트랜스폰더 {1} — 허가받은 스쿼크는 {2}입니다.', this.ac.cs, x.code, x.want));
      }
    }
    this.bump();
  };
  DepPilot.prototype.tune = function (to) {
    var sim = this.sim, ac = this.ac, f = this.freqTo; if (!f || f.sent) return;
    var pick = this.freqOpts().filter(function (q) { return q.to === to; })[0] || {};
    if (to !== 'OK' && to !== f.to) { sim.inc('p_freq_bad', [ac], ATC.T('{0}: 주파수를 잘못 맞췄습니다({1}) — 지시는 {2} {3}', ac.cs, pick.fq || '?', f.n, f.fq)); this.bump(); return; }
    f.sent = true; this.freqNow = f.to; this.freqNowFq = f.fq;
    if (this.xpdr.want && !this.xpdr.set) { this.xpdr.set = this.xpdr.code = this.xpdr.want; sim.inc('p_set_late', [ac], ATC.T('{0}: 트랜스폰더를 넣지 않아 부기장이 {1}을(를) 넣었습니다.', ac.cs, this.xpdr.want)); }
    sim.applyAll(ac, [{ k: 'ho', to: 'GND' }]);
    this.finish();
  };
  DepPilot.prototype.finish = function () {
    this.done = true; this.phase = 'end';
    this.sim.sys(ATC.T('Ground 주파수로 바꿨습니다 — 출발편 1단계(비행계획 · 허가) 끝. 푸시백 · 지상 이동 · 이륙은 다음 판에서 이어집니다.'), 'good'); this.bump();
  };
  DepPilot.prototype.gear = function () { };
  DepPilot.prototype.flap = function () { };
  DepPilot.prototype.cockpit = function () { };
  DepPilot.prototype.setFly = function () { };
  DepPilot.prototype.curText = function () { return this.sid ? this.sid + ' · ' + fmt.alt(this.cur.alt) : ATC.T('허가 전'); };
  DepPilot.prototype.tick = function () {
    var sim = this.sim, ac = this.ac, self = this;
    if (ATC.AI && !this.done && this.phase === 'del') ATC.AI.run(sim.mode, sim);
    if (!ac || this.done) return;
    var c = this.clr, RB_T = 14;
    if (c && c.t0 !== null && !c.late && sim.t - c.t0 > RB_T) { c.late = true; sim.inc('p_rb_late', [ac], ATC.T('{0}: 복창이 늦습니다 — 관제 지시에는 바로 복창합니다.', ac.cs)); }
    if (c && c.t0 !== null && sim.t - c.t0 > RB_T + 20 && !c.rep) { c.rep = true; c.opts = null; c.t0 = null; sim.enq({ who: 'atc', ac: ac, text: ac.csWord + ' ' + ac.num + ', I say again, ' + c.ph.atc.split(', ').slice(1).join(', '), onDone: function () { if (self.clr === c) { c.t0 = sim.t; c.opts = self.rbOpts(c.cmds, c.ph); self.bump(); } } }); this.bump(); }
    var x = this.xpdr; if (x.want && !x.set && sim.t - x.t > SQ_T && !x.late) { x.late = true; x.set = x.code = x.want; sim.inc('p_set_late', [ac], ATC.T('{0}: 트랜스폰더를 {1}초 안에 넣지 않아 부기장이 넣었습니다.', ac.cs, SQ_T)); this.bump(); }
    if (this.prompt && !this.prompt.late && sim.t - this.prompt.t0 > 40) { this.prompt.late = true; sim.inc('p_ci_late', [ac], ATC.T('{0}: 교신이 늦었습니다.', ac.cs)); }
    if (this.freqTo && !this.freqTo.sent && !this.freqTo.late && sim.t - this.freqTo.t > 30) { this.freqTo.late = true; sim.inc('p_freq_late', [ac], ATC.T('{0}: 주파수 바꾸기가 늦었습니다.', ac.cs)); }
  };
  ATC.INC.p_fpl_bad = { cat: 'P', pts: -3, t: ATC.T('맞지 않는 비행계획'), les: 'del' };
  ATC.INC.p_sq_ok = { cat: 'P', pts: 1, t: ATC.T('트랜스폰더 설정'), les: 'del' };
  ATC.INC.p_sq_bad = { cat: 'P', pts: -3, t: ATC.T('트랜스폰더 잘못 설정'), les: 'del' };
  ATC.DepPilot = DepPilot;
})();
