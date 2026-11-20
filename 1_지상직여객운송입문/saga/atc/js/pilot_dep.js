/* AIRLINE SAGA — ATC 조종사 체험 출발편(2-C): 하네다 Vela Air 787 출발기의 조종사
   D1(비행허가 시뮬레이션): 주기장 3D · 비행계획(자동 기본, 목적지 · SID · 순항 고도 바꾸기) · 허가 요청 · 허가 복창 · 트랜스폰더 · Ground 주파수
   D2(지상관제 시뮬레이션으로 이어 달리기): 푸시백 요청 · 승인 복창 · 주차 브레이크 · 엔진 시동 · 플랩 · 지상 이동 요청 · 경로 복창 · 자동 지상 이동 · 활주로 앞 정지 · 횡단 · 대기 지점 · Tower 주파수
   D3(관제탑 시뮬레이션): 대기 지점에서 Tower 첫 호출 · 「line up and wait」 · 이륙 허가 복창 · 이륙 추력 · 기수 올림(자동) · 기어 · 자동조종 · 플랩 · Departure 주파수
   D4(접근 · 지역관제 시뮬레이션): Departure 첫 호출 · 상승 지시 복창 · 자동조종(MCP) 설정 · 플랩 올림 · Tokyo Control로 이양 · 순항 고도까지
   하늘 단계(phase 'air')의 복창 · 설정 · 채점은 도착편(ATC.Pilot)의 것을 그대로 씀. 복창 · 첫 호출 처리는 도착편(ATC.Pilot)의 것을 그대로 씀.
   단계가 바뀌면 그 관제석의 시뮬레이션을 새로 띄우고(ATC.DepPilot.relay — ui.js가 정함) 비행계획 · 허가 · 점수를 넘김 */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;
  var HO_ALT = 1000, ACC_ALT = 1500;      /* Tower → Departure 이양 높이 · 가속을 시작하는 높이 — 둘 다 지면 기준 ft, 게임값 */
  var TAIL = 10, ROT = 2.5, ROT_OK = [1.5, 3.2];      /* 직접 이륙(GPT 17차): 기수 들기 목표 초당 2.5°(실제 787 참고값 약 2 ~ 2.5°/s — FCTM) · 채점 범위 1.5 ~ 3.2°/s · 테일 스트라이크 판정 10°는 게임값(실제 접촉각은 주 착륙장치 스트럿이 펴진 상태에서 약 9.7° — AAIB 11/2020, 787의 보호 기능은 재현하지 않음) */
  var F_OVER = 15;      /* 플랩을 제때 안 올리면 그 단계 속도 +15kt에서 가속을 멈춤 */
  /* 플랩을 올리는 속도(kt): 5 → 1은 V2+35 언저리(5kt 단위), 1 → UP은 거기서 +20 — 게임값. 실제는 그날 중량으로 계산한 플랩 단계별 기동 속도(지금 단계의 기동 속도에 이르러 가속 중일 때 다음 단계로) */
  function fSpd(v2, flap) { var f1 = Math.round((v2 + 36) / 5) * 5; return flap > 1 ? f1 : f1 + 20; }
  var TODO_T = 25;      /* 조종석 조작(주차 브레이크 · 엔진 시동 · 플랩)을 이 시간(초) 안에 하지 않으면 부기장이 함 */
  function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  var SQ_T = 40;
  var GZ = { T1: { n: 'Tokyo Ground', fq: '121.70' }, T3: { n: 'Tokyo Ground', fq: '121.625' } };      /* 주기장 구역별 Ground(AIP RJTT AD2-39 구역도): T1(W 유도로 쪽) = 121.7, T3 = 121.625. 118.225는 T2 쪽 구역(GPT 15차 F15-01) */
  var GX = ['118.225', '121.625', '121.70', '121.975', '122.075'];      /* 트랜스폰더를 이 시간(초) 안에 넣지 않으면 부기장이 넣음 */

  function DepPilot(sim, o) {      /* o.carry = 앞 단계의 조종사(이어 달리기) · o.from = 'gnd'(푸시백부터 시작) */
    o = o || {}; D = ATC.D; this.sim = sim; sim.pilot = this; this.dep = true; this.phase = 'fpl'; this.ver = 0;
    this.prompt = null; this.clr = null; this.asg = {}; this.cur = { hdg: null, alt: null, spd: null }; this.freq = 'DEL'; this.freqNow = 'DEL';
    this.done = false; this.nRb = 0; this.nRbOk = 0; this.rt = []; this.ci = false;
    this.cfg = { gear: 'down', gearT: 0, flap: 0, flapPos: 0 };
    this.fly = ATC.Manual ? ATC.Manual.newFly() : { mode: 'auto', on: false, k: { pitch: 0, roll: 0, thr: 0 }, t: { pitch: 0, roll: 0 } }; this.fly.used = true; this.fly.at = false; this.fly.th = this.fly.thr = 0;      /* fly.on = 지상 이동 직접 조종 중 */
    this.xpdr = { code: '2000', set: null, entry: '' };
    this.eng = { st: 'off', t0: 0, n1: 0 }; this.pbrake = true;
    var c = o.carry, f;
    if (c) { f = this.f = c.f; this.fp = c.fp; this.standK = c.standK; this.xpdr = c.xpdr; this.sid = c.sid; this.cur = c.cur; this.mcp = c.mcp; this.depFq = c.depFq; this.nRb = c.nRb; this.nRbOk = c.nRbOk; this.rt = c.rt; this.sq = c.ac.squawk; this.tAcc = (c.tAcc || 0) + c.sim.t; sim.usedCs[f.cs] = 1;
      if (c.eng) this.eng = c.eng; if (c.cfg) this.cfg = c.cfg; if (c.vs) this.vs = c.vs; this.apOn = c.apOn; this.accel = !!c.accel; this.taxi = c.taxi || null; this.manUsed = c.manUsed; this.pbrake = !!c.pbrake; this.to = c.to || null; this.sidR = c.sidR || null; this.capKey = c.capKey || ''; this.sidK = c.sidK || 'A';      /* 같은 제한 지점의 VNAV 안내는 관제석이 바뀌어도 한 번만(사이트 42차 결과) */ this.sidOn = c.sidOn !== false; this.sidVia = c.sidVia !== false; this.sidPlain = c.sidPlain; this.trn = c.trn; }
    else {
      f = sim.mkFlight(function (a) { return a.code === 'VLA'; }, 'dep');
      f.type = 'B789'; if (D.types && D.types.B789) f.perf = D.types.B789; f.wake = 'H';
      this.f = f; this.fp = this.autoPlan();
    }
    if (!c) this.sidK = D.sidSet ? D.sidSet(sim) : D.sidByRwy ? sim.flow.id : 'A';      /* 이륙 시각에 따른 SID(A · B · C) — 첫 단계에서 정해 끝까지 같음 */
    sim.isFinished = function () { return this.pilot.done; };
    if (!c && ATC.wxSay) ATC.wxSay(sim);      /* 날씨 · 시간 안내(첫 단계에서만) */
    if (sim.mode === 'GND') { this.initGnd(!c); return; }
    if (sim.mode === 'TWR') { this.initTwr(!c); return; }
    if (sim.mode === 'APP' || sim.mode === 'ACC') { this.initAir(c); return; }
    this.mkAc();
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
  DepPilot.prototype.route = function (fp) { fp = fp || this.fp; var sid = D.sidName ? D.sidName(fp.gate, this.sidK) : fp.gate, tn = this.transName(fp), t = tn && D.sidTrans[fp.gate][tn]; return ATC.aptId + ' ' + this.rwyFor(fp.gate) + ' ' + sid + ' ' + fp.gate + (t ? ' ' + tn + ' TRANSITION ' + t.route[t.route.length - 1] : '') + ' … ' + fp.dest; };
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
    this.sidR = null; this.mkAc(); this.bump();
  };
  /* 주기장에 선 내 항공기(비행계획에 맞는 터미널) */
  DepPilot.prototype.standFor = function () {
    var fp = this.fp, intl = D.isIntl ? D.isIntl(fp.dest) : false, pax = (D.standGroups && D.standGroups.pax) || [], want = intl ? ['T3'] : ['T1'];      /* 지원 주기장: T1(국내) · T3(국제) — AIP AD2-39 Ground 구역(118.225 · 121.625)이 분명한 곳만(GPT 14차 F14-01) */
    var ks = Object.keys(D.stands).filter(function (k) { return want.indexOf(D.stands[k].grp) >= 0; }); if (!ks.length) ks = Object.keys(D.stands).filter(function (k) { return pax.indexOf(D.stands[k].grp) >= 0; });
    if (D.pilotStands) { var ps = Object.keys(D.stands).filter(function (k) { return D.pilotStands.indexOf(D.stands[k].grp) >= 0; }).sort(function (a, b) { return a - b; }); if (ps.length) ks = ps; }      /* 인천: Vela Air = 제2여객터미널(게임 배정) */
    if (!this.standK || ks.indexOf(this.standK) < 0) this.standK = D.pilotStands ? ks[((this.sim.seed | 0) * 7 + 3) % ks.length] : ks[Math.floor(ks.length / 2)];
    return this.standK;
  };
  DepPilot.prototype.mkAc = function () {
    var sim = this.sim, f = this.f, fp = this.fp, sk = this.standFor(), s = D.stands[sk], p = D.uv2xy(s.u, s.v), ln = String(s.lane).split(','), q = D.uv2xy(+ln[0], +ln[1]);
    var hdg = Math.round(U.n360(Math.atan2(p.x - q.x, p.y - q.y) * 180 / Math.PI)) || 360, ac = this.ac;
    if (!ac) { ac = this.ac = { id: sim.nextId++, sim: sim, cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: f.perf, kind: 'dep', st: 'pre', owner: 'me', pilotMe: true, born: sim.t, ias: 0, gs: 0, vs: 0, alt: D.airport.elev || 0 }; this.cs = ac.cs; }
    ac.x = p.x; ac.y = p.y; ac.hdg = hdg; ac.stand = sk; ac.gate = fp.gate; ac.dest = fp.dest; ac.destName = fp.destName; ac.rfl = ac.rflFiled = fp.rfl; ac.rwy = this.rwyFor(fp.gate);
    ac.route = fp.gate + ' ' + fp.dest; ac.atisRep = sim.atis;
    this.setGnd();
    this.mcp = { hdg: hdg, alt: D.sidInit || 9000, spd: 250 };
  };
  DepPilot.prototype.note = function (t, k) { this.own = 1; this.sim.sys(t, k); this.own = 0; };
  DepPilot.prototype.fqR = function (to) { return ATC.fqOf(to, { rwy: this.rwyFor(this.fp.gate) }) || {}; };      /* 내 출발 활주로 쪽 주파수(인천 동 · 서) — 항공기가 만들어지기 전에도 맞게 */
  DepPilot.prototype.setGnd = function () { this.gnd = (ATC.aptId === 'RJTT' && GZ[D.stands[this.standK].grp]) || (function (q) { return { n: (q || {}).n, fq: (q || {}).fq }; })(this.fqR('GND')); };      /* 주기장 구역별 Ground는 하네다만(인천은 게임에서 지상관제 한 자리) */
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
    if (this.phase === 'air') { this.sidHeard(cmds); var rest = cmds.filter(function (c) { return c.k !== 'ho'; }); if (rest.length) ATC.Pilot.prototype.take.call(this, rest); cmds = cmds.filter(function (c) { return c.k === 'ho'; }); }      /* 기수 · 고도 · 속도는 도착편처럼 MCP에 설정해야 따라감 */
    cmds.forEach(function (c) {
      if (c.k === 'ho') { var to = c.to.fq ? c.to : ATC.fqOf(c.to, self.ac) || {}; self.freqTo = { to: c.key || c.to, n: to.n, fq: to.fq, t: sim.t }; return; }
      if (c.k === 'clr') { self.xpdr.want = c.sq; self.xpdr.t = sim.t; self.cur.alt = c.alt; self.mcp.alt = c.alt; self.sid = c.sid; self.trn = c.trans || ''; self.sidR = null; self.sidList(); }
      if (c.k === 'push') { self.pushCmd = c; self.todoT = sim.t; return; }      /* 푸시백 승인 — 주차 브레이크를 풀어야 움직임 */
      if (c.k === 'taxi') { var vv = (c.via || []).slice(); if (vv[vv.length - 1] === c.hp) vv.pop(); self.taxi = { via: vv, hp: c.hp, rwy: c.rwy, hs: c.hs || '' }; }      /* 화면 표시용: 마지막 유도로 이름 = 대기 지점이면 한 번만 */
      sim.applyAll(ac, [c]);
    });
    this.bump();
  };
  DepPilot.prototype.known = function (cmds) {      /* 이미 복창하고 아직 하지 않았을 뿐인 지시는 다시 말하지 않음 */
    var c = cmds[0] || {};
    if (this.phase === 'air' && c.k !== 'ho') return ATC.Pilot.prototype.known.call(this, cmds);
    if (c.k === 'push') return !!this.pushCmd;
    if (c.k === 'ho') return !!(this.freqTo && !this.freqTo.sent);
    return false;
  };
  DepPilot.prototype.onClr = function (cmds, o) {
    var self = this, sim = this.sim, ac = this.ac;
    if (this.prompt || !this.ci) { ac.botT = sim.t - 34; return false; }      /* 내 교신(요청 · 보고)을 아직 보내지 않음 → 관제사는 기다렸다가 곧 다시 */
    if (this.phase === 'twr' && cmds[0] && cmds[0].k === 'ho' && (ac.st !== 'air' || ac.alt < HO_ALT)) { ac.botT = sim.t - 21; return false; }
    if (this.phase === 'air' && sim.mode === 'ACC' && cmds[0] && cmds[0].k === 'ho' && ac.alt < this.fp.rfl - 150 && ac.exitFix && D.fix[ac.exitFix] && U.dist(ac, D.fix[ac.exitFix]) > 12) { ac.botT = sim.t - 5; return false; }      /* 다음 구역 이양은 순항 고도에 오르거나 구역 끝이 가까울 때만 받음 */
    cmds = cmds.map(function (c) {
      if (c.k === 'ho' && c.to === 'GND') { self.setGnd(); return { k: 'ho', to: self.gnd, key: 'GND' }; }
      if (c.k === 'rbok' && !self.depSaid && D.freq.DEP) { self.depSaid = true; self.depFq = D.freq.DEP.fq; return { k: 'rbok', then: 'departure frequency ' + D.freq.DEP.fq }; }      /* 출발 주파수는 미리 알려 줌(GPT 14차 R14-03) */
      if (c.k === 'clr' && self.sid && D.sidLetter && c.sid !== self.sid && D.sidLetter(c.sid) !== D.sidLetter(self.sid)) { var qs = {}, ks; for (ks in c) qs[ks] = c[ks]; qs.sid = self.sid; c = qs; }      /* 이 편의 SID 시간대(A · B · C)는 비행계획 단계에서 정한 것 — 시간대 경계에서 관제가 다른 글자를 고르지 않게 */
      if (c.k === 'clr' && !c.trans && self.transName()) { var q0 = {}, k0; for (k0 in c) q0[k0] = c[k0]; q0.trans = self.transName(); return q0; }      /* SID 뒤 transition을 허가에 넣음(GPT 14차 R14-04) */
      if (c.k === 'push' && !c.face) { var q = {}, k; for (k in c) q[k] = c[k]; q.face = (sim.multi && D.stands[ac.stand].faceRec) || sim.flow.push; return q; }      /* 기수 방향을 말로도 */
      if (c.k === 'cross' && !c.at && D.gN[ac.node] && D.gN[ac.node].hold) { var q3 = {}, k3; for (k3 in c) q3[k3] = c[k3]; q3.at = D.gN[ac.node].hold; return q3; }      /* 횡단 지점을 함께 말함(管制業務処理規程 Ⅲ2(14)b, GPT 15차 R15-02) */
      if (c.k === 'taxi' && c.nodes && !c.hs && sim.autoHolds) { var hs = sim.autoHolds(c.nodes), ks = Object.keys(hs); if (ks.length) { var q2 = {}, k2; for (k2 in c) q2[k2] = c[k2]; q2.hs = sim.flow.use[hs[ks[0]]] || hs[ks[0]]; return q2; } }      /* 경로가 활주로를 건너면 「hold short of runway」를 붙임 */
      return c;
    });
    return ATC.Pilot.prototype.onClr.call(this, cmds, o);
  };
  /* 지상 지시의 복창 보기(틀린 보기 = 기수 방향 · 대기 지점 · 활주로 · 경로가 다른 것) */
  DepPilot.prototype.rbOpts = function (cmds, ph) {
    var sim = this.sim, ac = this.ac, c0 = cmds[0], ok = cap(ph.rb), alt = [], seen = {};
    function rb(ch) { var q = {}, k; for (k in c0) q[k] = c0[k]; for (k in ch) q[k] = ch[k]; return cap(ATC.phrase(sim, ac, [q].concat(cmds.slice(1))).rb); }
    if (c0.k === 'luaw' || c0.k === 'cto') {      /* 다른 활주로 · 진입 대기와 이륙 허가를 뒤바꾼 복창 */
      Object.keys(D.ends).filter(function (r) { return r !== c0.rwy && D.ends[r].rw === (D.ends[c0.rwy] || {}).rw; }).concat((sim.depRw || []).filter(function (r) { return r !== c0.rwy; })).slice(0, 1).forEach(function (r) { alt.push(rb({ rwy: r })); });
      alt.push(cap('runway ' + c0.rwy + (c0.k === 'luaw' ? ', cleared for takeoff, ' : ', line up and wait, ') + ac.csWord + ' ' + ac.num + '.'));
    } else if (c0.k === 'push') ['north', 'south', 'east', 'west'].forEach(function (f) { if (f !== c0.face) alt.push(rb({ face: f })); });
    else if (c0.k === 'taxi' && c0.hp) {
      var e = D.ends[c0.rwy], hl = (e && e.holds || []).filter(function (h) { return h !== c0.hp; }), deps = (sim.flow.deps || []).filter(function (r) { return r !== c0.rwy; });
      if (hl.length) alt.push(rb({ hp: hl[0] }));
      if (deps.length) alt.push(rb({ rwy: deps[0] }));
      if (c0.via && c0.via.length > 1) alt.push(rb({ via: c0.via.slice(0, -2).concat([c0.via[c0.via.length - 1], c0.via[c0.via.length - 2]]) }));
      if (c0.hs) alt.push(rb({ hs: '' }));      /* 활주로 앞 정지를 빼먹은 복창 */
    } else if (c0.k === 'cross') {
      Object.keys(D.ends).filter(function (r) { return r !== c0.rwy && D.ends[r].rw !== (D.ends[c0.rwy] || {}).rw; }).slice(0, 1).forEach(function (r) { alt.push(rb({ rwy: r })); });
      if (c0.at) { var hl2 = []; Object.keys(D.gN).forEach(function (id) { var h = D.gN[id].hold; if (h && h !== c0.at && hl2.indexOf(h) < 0 && h[0] === c0.at[0]) hl2.push(h); }); if (hl2.length) alt.push(rb({ at: hl2[0] })); }      /* 다른 횡단 지점 */
      alt.push(cap('holding short runway ' + c0.rwy + ', ' + ac.csWord + ' ' + ac.num + '.'));
    }
    var swap = null, ai = -1;
    if (c0.k === 'clr' && c0.trans) { var ot = Object.keys((D.sidTrans || {})[ac.gate] || {}).filter(function (t) { return t !== c0.trans; }); if (ot.length) swap = rb({ trans: ot[0] }); }      /* 다른 transition을 말한 복창 */
    else if (this.phase === 'air' && this.sidPend().length) cmds.forEach(function (c, i) { if (c.k === 'alt' && c.v > ac.alt + 50 && !c.exp) ai = i; });
    if (ai >= 0) { var cm = cmds.slice(), q9 = {}, k9; for (k9 in cmds[ai]) q9[k9] = cmds[ai][k9]; q9.via = !q9.via; cm[ai] = q9; swap = cap(ATC.phrase(sim, ac, cm).rb); }      /* 「climb via SID to」 ↔ 「climb and maintain」를 뒤바꾼 복창 */
    if (swap && swap !== ok) { var bo = ATC.Pilot.prototype.rbOpts.call(this, cmds, ph).filter(function (o) { return o.ok || o.t !== swap; }), keep = bo.filter(function (o) { return o.ok; }).concat(bo.filter(function (o) { return !o.ok; }).slice(0, 1)); return shuffle(keep.concat([{ t: swap, ok: false }])); }
    alt = shuffle(alt).filter(function (t) { if (!t || t === ok || seen[t]) return false; seen[t] = 1; return true; }).slice(0, 2);
    if (!alt.length) return ATC.Pilot.prototype.rbOpts.call(this, cmds, ph);
    return shuffle([{ t: ok, ok: true }].concat(alt.map(function (t) { return { t: t, ok: false }; })));
  };
  DepPilot.prototype.freqOpts = function () {
    var f = this.freqTo, o = [{ to: 'OK', n: f.n, fq: f.fq }], other = GX.filter(function (x) { return x !== f.fq; });
    if (this.phase === 'air' && this.sim.mode === 'ACC') { o.push({ to: 'X1', n: D.freq.ACC.n, fq: D.freq.ACC.fq }); o.push({ to: 'X2', n: D.freq.DEP.n, fq: D.freq.DEP.fq }); }      /* 다음 구역으로 이양 */
    else if (f.to === 'ACC') { o.push({ to: 'X1', n: D.freq.DEP.n, fq: D.freq.DEP.fq }); o.push({ to: 'X2', n: D.freq.APP.n, fq: D.freq.APP.fq }); }
    else if (f.to === 'DEP') { if (D.freq.APP) o.push({ to: 'X1', n: D.freq.APP.n, fq: D.freq.APP.fq }); o.push({ to: 'X2', n: this.fqR('TWR').n, fq: this.fqR('TWR').fq }); }
    else if (f.to === 'TWR') { o.push({ to: 'X1', n: f.n, fq: D.twrAltFq && f.fq === D.twrAltFq ? D.freq.TWR.fq : D.twrAltFq || '124.35' }); o.push({ to: 'X2', n: this.gnd.n, fq: this.gnd.fq }); }      /* 124.35도 실제 Tokyo Tower 주파수 — 이번에 지시받은 값이 아니라서 오답(GPT 15차 F15-02) */
    else { o.push({ to: 'X1', n: f.n, fq: other[0] }); if (D.freq.TWR) o.push({ to: 'X2', n: this.fqR('TWR').n, fq: this.fqR('TWR').fq }); }
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
    if (to !== 'OK' && to !== f.to) { sim.inc('p_freq_bad', [ac], ATC.T('{0}: 지시받은 주파수가 아닙니다({1}) — 지시는 {2} {3}', ac.cs, pick.fq || '?', f.n, f.fq)); this.bump(); return; }
    f.sent = true; this.freqNow = f.to; this.freqNowFq = f.fq; this.freqNowN = f.n;
    if (this.phase === 'gnd') { if (this.manUsed && !sim.incs.some(function (e) { return /^p_(taxi_off|taxi_fast|taxi_close|hold_bust)$/.test(e.code); })) sim.inc('p_taxi_ok', [ac], ATC.T('{0}: 직접 지상 이동 — 경로 · 정지 지점을 지켰습니다.', ac.cs)); if (this.fly.on) { this.fly.on = false; ac.manTaxi = false; } sim.applyAll(ac, [{ k: 'ho', to: 'TWR' }]); if (DepPilot.relay) { this.phase = 'relay'; this.bump(); DepPilot.relay(this, 'TWR'); } else this.finish(2); return; }
    if (this.phase === 'twr') { var td, n = 0; while ((td = this.todo()) && td.k !== 'flap1' && td.k !== 'flapup' && n++ < 3) this.act(td.k, true);      /* 기어 · 자동조종을 미뤘으면 부기장이 */
      if (DepPilot.relay) { this.phase = 'relay'; this.bump(); DepPilot.relay(this, 'APP'); } else this.finish(3); return; }
    if (this.phase === 'air') { sim.applyAll(ac, [{ k: 'ho', to: f.to }]); if (sim.mode === 'APP' && DepPilot.relay) { this.phase = 'relay'; this.bump(); DepPilot.relay(this, 'ACC'); } else { this.endHow = sim.mode === 'ACC' ? 'ho' : ''; this.finish(4); } return; }
    if (this.xpdr.want && !this.xpdr.set) { this.xpdr.set = this.xpdr.code = this.xpdr.want; sim.inc('p_set_late', [ac], ATC.T('{0}: 트랜스폰더를 넣지 않아 부기장이 {1}을(를) 넣었습니다.', ac.cs, this.xpdr.want)); }
    sim.applyAll(ac, [{ k: 'ho', to: 'GND' }]);
    if (DepPilot.relay) { this.phase = 'relay'; this.bump(); DepPilot.relay(this, 'GND'); } else this.finish(1);      /* 화면이 있으면 지상관제 시뮬레이션으로 이어 감 */
  };
  DepPilot.prototype.finish = function (stage) {
    this.done = true; this.phase = 'end'; this.stage = stage || 1;
    this.note(stage === 4 && this.endHow === 'ho' ? ATC.T('{0} 주파수로 바꿨습니다 — 다음 구역에서 순항 고도 {1}까지 계속 올라갑니다. 조종사 체험 출발편 끝.', this.freqNowN, fmt.alt(this.fp.rfl)) : stage === 4 ? ATC.T('순항 고도 {0}에 올랐습니다 — 조종사 체험 출발편 끝. 주기장에서 순항까지 한 편을 마쳤습니다.', fmt.alt(this.fp.rfl)) : stage === 3 ? ATC.T('Departure 주파수로 바꿨습니다 — 출발편 3단계(이륙) 끝.') : stage === 2 ? (ATC.aptId === 'RJTT' ? ATC.T('지정받은 Tower 주파수로 바꿨습니다 — 출발편 2단계(푸시백 · 지상 이동) 끝. 하네다 Tower는 활주로 · 시간대에 따라 주파수가 여럿이라, 늘 관제가 불러 준 값으로 맞춥니다(118.10은 이 게임의 이번 비행 값).') : ATC.T('지정받은 Tower 주파수로 바꿨습니다 — 출발편 2단계(푸시백 · 지상 이동) 끝. {apt}은 동 · 서 활주로마다 Tower 주파수가 달라, 늘 관제가 불러 준 값으로 맞춥니다.')) : ATC.T('Ground 주파수로 바꿨습니다 — 출발편 1단계(비행계획 · 허가) 끝. 푸시백 · 지상 이동 · 이륙은 다음 판에서 이어집니다.'), 'good'); this.bump();
  };

  /* ================= D2: 지상(푸시백 · 엔진 시동 · 지상 이동) ================= */
  DepPilot.prototype.initGnd = function (fresh) {
    var sim = this.sim, f = this.f, fp = this.fp, sk, sd, ac, d;
    if (fresh) { sk = this.standFor(); this.sid = D.sidName ? D.sidName(fp.gate, this.sidK) : fp.gate; this.sq = sim.squawk(); this.xpdr = { code: this.sq, set: this.sq, entry: '', want: this.sq }; this.cur.alt = D.sidInit || 9000; this.mcp = { hdg: 0, alt: D.sidInit || 9000, spd: 250 }; this.depFq = D.freq.DEP ? D.freq.DEP.fq : ''; }
    sk = this.standK; sd = D.stands[sk]; this.setGnd(); this.phase = 'gnd'; this.freqNow = 'GND'; this.freqNowFq = this.gnd.fq; this.freqNowN = this.gnd.n;
    if (fresh) sim.log.length = 0;
    var sys0 = sim.sys, me = this; sim.sys = function (t, k) { if (me.own) sys0.call(this, t, k); }; sim.phone = function () { };      /* 지상관제 근무용 알림(관제탑 협조 · 다른 편 처리)은 조종사에게 보이지 않게 */
    sim.standBusy[sk] = 1; sim.events = [];      /* 내 편이 있는 판에는 비정상 상황을 넣지 않음 */
    ac = sim.mk({ f: f, kind: 'dep', st: 'gate', rwy: this.rwyFor(fp.gate), stand: sk, owner: 'me' });
    d = sim.standDir(sk); sim.place(ac, sd.node, d[0], d[1]);
    ac.dest = fp.dest; ac.destName = fp.destName; ac.gate = fp.gate; ac.squawk = this.sq; ac.pilotMe = true; ac.callT = sim.t + 2; ac.rfl = fp.rfl;
    this.ac = ac; this.cs = ac.cs; this.sync(0); this.mcp.hdg = Math.round(ac.hdg) || 360;
    this.note(fresh ? ATC.T('조종사 체험 출발편(푸시백부터) — Vela Air 787의 조종사입니다. 허가는 받았습니다({0} · {1} · 스쿼크 {2}). {3} {4}에 푸시백을 요청하세요.', this.sid, fmt.alt(this.cur.alt), this.sq, this.gnd.n, this.gnd.fq) : ATC.T('{0} {1} — 주기장 {2}. 푸시백을 요청하세요.', this.gnd.n, this.gnd.fq, sk), 'info');
  };
  /* 지상 좌표(u, v · 방향) → 3D · 계기가 쓰는 값(x, y, 기수, 속도). 기수는 부드럽게 돌림(푸시백 끝의 방향 전환 등) */
  DepPilot.prototype.sync = function (dt) {
    var sim = this.sim, KT = ATC.KT || 0.5144, R2D = 180 / Math.PI, me = this;
    sim.acs.forEach(function (a) {
      if (a.u === undefined) return;
      var p = D.uv2xy(a.u, a.v), q = D.uv2xy(a.u + a.du * 100, a.v + a.dv * 100), h = U.n360(Math.atan2(q.x - p.x, q.y - p.y) * R2D);
      if (a.hdg === undefined || !dt || a.manTaxi || a.st === 'final' || a.st === 'roll' || a.st === 'air' || a.st === 'land') a.hdg = h;
      else { var df = ((h - a.hdg + 540) % 360) - 180, mx = (a.st === 'push' || a.st === 'start' ? 7 : 16) * dt; a.hdg = U.n360(a.hdg + Math.max(-mx, Math.min(mx, df))); }
      a.x = p.x; a.y = p.y; a.agl = true; a.gs = a.ias = (a.spd || 0) / KT; a.vs = a.pilotMe && me.vsNow !== undefined && a.st === 'air' ? me.vsNow : a.st === 'air' ? (a.perf.climb || 2000) : a.st === 'final' ? -700 : 0;
    });
  };
  /* 조종석에서 할 일(차례대로 하나씩) */
  DepPilot.prototype.todo = function () {
    var ac = this.ac, e = this.eng;
    if (this.phase === 'twr' && ac) return this.todoTwr();
    if (this.phase === 'air' && ac) return this.flapTodo(ac.alt - D.airport.elev, ac.ias);
    if (this.phase !== 'gnd' || !ac) return null;
    if (this.pushCmd) return { k: 'brake', t: ATC.T('주차 브레이크 풀기 — 푸시백 시작'), why: ATC.T('푸시백 승인을 복창했습니다. 지상 요원에게 알리고 주차 브레이크를 풉니다.') };
    if ((ac.st === 'push' || ac.st === 'start') && e.st === 'off') return { k: 'eng', t: ATC.T('엔진 시동(양쪽)'), why: ATC.T('푸시백 중에 엔진을 겁니다. 787은 두 엔진을 함께 걸 수 있습니다.') };
    if (ac.st === 'start' && e.st === 'on' && this.cfg.flap !== 5) return { k: 'flap', t: ATC.T('플랩 5 — 이륙 형상'), why: ATC.T('지상 이동을 요청하기 전에 이륙 플랩을 맞춥니다.') };
    return null;
  };
  DepPilot.prototype.act = function (k, fo) {
    var sim = this.sim, ac = this.ac, td = this.todo(); if (!td || td.k !== k) return;
    if (this.phase === 'twr' || this.phase === 'air') { this.actTwr(k, fo, td); return; }
    if (k === 'brake') { var c = this.pushCmd; this.pushCmd = null; this.pbrake = false; sim.applyAll(ac, [c]); }
    else if (k === 'eng') { this.eng.st = 'start'; this.eng.t0 = sim.t; }
    else if (k === 'flap') this.cfg.flap = 5;
    if (fo) sim.inc('p_set_late', [ac], ATC.T('{0}: 「{1}」을(를) {2}초 안에 하지 않아 부기장이 했습니다.', ac.cs, td.t, TODO_T));
    this.todoT = sim.t; this.bump();
  };
  DepPilot.prototype.n1 = function () { return [this.eng.n1, this.eng.n1 ? this.eng.n1 + 0.3 : 0]; };
  DepPilot.prototype.tickGnd = function (dt) {
    var sim = this.sim, ac = this.ac, e = this.eng, cf = this.cfg;
    this.sync(dt);
    /* 엔진: 시동 45초 → 공회전 21.5%, 움직일 때 조금 더 */
    var tgt = e.st === 'off' ? 0 : e.st === 'start' ? Math.min(21.5, (sim.t - e.t0) / 45 * 21.5) : ac.manTaxi ? 21.5 + this.fly.th * 45 : (ac.st === 'taxi' || ac.st === 'cross') && !ac.blk && !ac.halt ? (ac.spd < 3 ? 33 : 25) : 21.5;
    if (e.st === 'start' && sim.t - e.t0 >= 45) { e.st = 'on'; this.todoT = sim.t; this.note(ATC.T('{0}: 두 엔진 시동 완료 · 안정.', ac.cs), 'info'); this.bump(); }
    e.n1 = e.st === 'start' ? tgt : e.n1 + (tgt - e.n1) * Math.min(1, dt * 0.6);
    if (cf.flapPos !== cf.flap) { cf.flapPos += Math.max(-dt * 1.2, Math.min(dt * 1.2, cf.flap - cf.flapPos)); if (Math.abs(cf.flapPos - cf.flap) < 0.02) { cf.flapPos = cf.flap; this.bump(); } }
    /* 푸시백이 끝나면 주차 브레이크를 걸고(견인차 분리), 엔진 · 플랩이 준비될 때까지 지상 이동 요청을 미룸 */
    if (ac.st === 'start') {
      if (!this.pbrake) { this.pbrake = true; this.todoT = sim.t; this.note(ATC.T('{0}: 푸시백 끝 — 주차 브레이크를 걸었습니다. 견인차 · 조향 핀을 떼고 지상 요원의 이동 가능 신호를 확인합니다.', ac.cs), 'info'); this.bump(); }
      var ready = e.st === 'on' && cf.flap === 5 && cf.flapPos === 5;
      if (!ready) ac.startT = sim.t + 4; else if (!this.rdy) { this.rdy = true; ac.startT = sim.t + 2; }
    }
    if ((ac.st === 'taxi' || ac.st === 'cross') && this.pbrake) { this.pbrake = false; this.bump(); }
    if (this.fly.on && ac.st !== 'taxi') { this.fly.th = Math.max(0, this.fly.th - dt * 0.6); this.fly.thr = this.fly.th; }      /* 서 있는 동안 추력 레버는 공회전으로 */
    var td = this.todo(); if (td && !(td.k === 'eng' && ac.st === 'push') && sim.t - (this.todoT || 0) > TODO_T) this.act(td.k, true);      /* 푸시백 중에는 엔진 시동을 재촉하지 않음(끝난 뒤 25초) */
    var sg = ac.st + '|' + (td ? td.k : '') + '|' + e.st; if (sg !== this.gSig) { this.gSig = sg; this.bump(); }
  };

  /* ---- 지상 이동 직접 조종(고르면 켜짐 · Z 키): 조향 = ←→ · 조종간 좌우 · 스틱 / 추력 = W · S · 레버 · RT / 브레이크 = ↓ · 조종간 아래 · LT
     허가받은 경로(초록 선)를 따라가고, 활주로 앞 정지 지점 · 대기 지점에서는 스스로 멈춤. 경로 이탈 · 정지선 통과 · 과속 · 접근은 감점 ---- */
  function gpad() {
    var o = { steer: 0, up: 0, brake: 0, on: false }; if (typeof navigator === 'undefined' || !navigator.getGamepads) return o;
    var gs = navigator.getGamepads(), g = null, i; for (i = 0; gs && i < gs.length; i++) if (gs[i] && gs[i].connected) { g = gs[i]; break; }
    if (!g) return o; var x = g.axes[0] || 0, b = g.buttons, bv = function (i) { return b[i] ? (b[i].value !== undefined ? b[i].value : b[i].pressed ? 1 : 0) : 0; };
    o.on = true; o.steer = Math.abs(x) < 0.12 ? 0 : (x - (x > 0 ? 0.12 : -0.12)) / 0.88; o.up = bv(7); o.brake = Math.max(bv(6), bv(1)); return o;
  }
  DepPilot.prototype.manOk = function () { var ac = this.ac; return this.phase === 'gnd' && !this.done && ac && (ac.st === 'taxi' || ac.st === 'athold' || ac.st === 'start' || ac.st === 'reqtaxi'); };
  DepPilot.prototype.manTaxi = function (on) {
    var ac = this.ac, F = this.fly; if (on === undefined) on = !F.on; if (on && !this.manOk()) return;
    F.on = !!on; ac.manTaxi = F.on; F.th = F.thr = 0; F.k.pitch = F.k.roll = F.k.thr = 0; F.t.pitch = F.t.roll = 0; this.mt = { off: 0, fast: 0, fastT: -99, closeT: -99 }; if (on) this.manUsed = true;
    this.note(on ? ATC.T('지상 이동 직접 조종 — 초록 선(허가받은 경로)을 따라가세요. 추력 레버를 조금 올리면 움직이고, 정지 지점에서는 스스로 멈춥니다.') : ATC.T('지상 이동을 자동으로 되돌렸습니다.'), 'info'); this.bump();
  };
  DepPilot.prototype.manKey = function (k) {
    if (k === 'z' && this.phase === 'gnd') { this.manTaxi(); return true; }
    if (k === 'z' && this.phase === 'twr') { var td = this.todo(); if (this.fly.on && this.ac.st === 'air') { if (td && td.k === 'ap') this.act('ap'); } else this.manTO(); return true; }      /* 관제탑 단계: Z = 직접 이륙 켜고 끄기, 떠오른 뒤에는 자동조종 */
    return false;
  };
  function segD(u, v, a, b) { var dx = b.u - a.u, dy = b.v - a.v, L2 = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((u - a.u) * dx + (v - a.v) * dy) / L2)); return { d: Math.hypot(u - a.u - dx * t, v - a.v - dy * t), t: t, u: a.u + dx * t, v: a.v + dy * t, du: dx / Math.sqrt(L2), dv: dy / Math.sqrt(L2) }; }
  DepPilot.prototype.manStep = function (ac, dt) {
    var N = D.gN, F = this.fly, sim = this.sim, M = this.mt, gp = gpad(), KT = ATC.KT || 0.5144;
    if (ac.pi >= ac.path.length) { ac.spd = 0; return 'end'; }
    var steer = Math.max(-1, Math.min(1, F.k.roll + F.t.roll + gp.steer)), brake = this.pbrake ? 1 : Math.max(F.k.pitch > 0 ? 1 : 0, F.t.pitch > 0.25 ? Math.min(1, F.t.pitch * 1.3) : 0, gp.brake);
    F.th = Math.max(0, Math.min(1, F.th + (F.k.thr + gp.up) * dt * 0.45 - brake * dt * 0.9)); F.thr = F.th; F.gp = gp.on;
    ac.spd = Math.max(0, ac.spd + (0.11 + F.th * 1.5 - 0.022 * ac.spd - 0.03 - brake * 2.6) * dt);
    var th = Math.atan2(ac.dv, ac.du) - steer / (22 + ac.spd * ac.spd * 1.1) * ac.spd * dt;      /* v축이 왼쪽 → 오른쪽으로 돌면 각이 줄어듦 */
    ac.du = Math.cos(th); ac.dv = Math.sin(th); ac.u += ac.du * ac.spd * dt; ac.v += ac.dv * ac.spd * dt; ac.blk = 0;
    var tn = N[ac.path[ac.pi]], prev = ac.pi > 0 ? N[ac.path[ac.pi - 1]] : N[ac.node] || tn, nx = ac.pi + 1 < ac.path.length ? N[ac.path[ac.pi + 1]] : null;
    var s0 = segD(ac.u, ac.v, prev, tn), s1 = nx ? segD(ac.u, ac.v, tn, nx) : null, off = Math.min(s0.d, s1 ? s1.d : 1e9), dist = Math.hypot(tn.u - ac.u, tn.v - ac.v);
    var stop = ac.hs[tn.id] !== undefined && ac.pi + 1 < ac.path.length ? 'hs' : ac.pi === ac.path.length - 1 ? 'end' : '', past = (ac.u - tn.u) * s0.du + (ac.v - tn.v) * s0.dv;
    M.d = dist; M.stop = stop; M.off = off;
    /* 과속(30kt) · 다른 항공기에 너무 가까움 */
    if (ac.spd > 30.5 * KT) { M.fast += dt; if (M.fast > 2 && sim.t - M.fastT > 30) { M.fastT = sim.t; sim.inc('p_taxi_fast', [ac], ATC.T('{0}: 지상 이동 속도 {1}kt — 직선에서도 30kt를 넘기지 않습니다.', ac.cs, Math.round(ac.spd / KT))); } } else M.fast = 0;
    if (sim.t - M.closeT > 25) for (var j = 0; j < sim.acs.length; j++) { var o = sim.acs[j]; if (o !== ac && o.u !== undefined && o.st !== 'gate' && sim.onGround(o) && Math.hypot(o.u - ac.u, o.v - ac.v) < 55) { M.closeT = sim.t; sim.inc('p_taxi_close', [ac], ATC.T('{0}: {1}에 너무 가깝게 다가갔습니다 — 앞 항공기와 간격을 두고 멈춥니다.', ac.cs, o.cs)); break; } }
    /* 정지 지점: 45m 안에서 멈추면 도착. 멈추지 않고 지나가면 정지선 통과 */
    if (stop) {
      if (past > 4 && s0.d < 40) { sim.inc('p_hold_bust', [ac], stop === 'hs' ? ATC.T('{0}: 「hold short」 지시를 받은 활주로 앞 정지선을 멈추지 않고 지났습니다.', ac.cs) : ATC.T('{0}: 대기 지점의 정지선을 멈추지 않고 지났습니다 — 이 뒤는 활주로입니다.', ac.cs)); ac.u = tn.u; ac.v = tn.v; ac.du = s0.du; ac.dv = s0.dv; ac.spd = 0; F.th = F.thr = 0; ac.node = tn.id; ac.pi++; return stop; }
      if (dist < 45 && past <= 4 && ac.spd < 0.3 && off < 30) { ac.spd = 0; F.th = F.thr = 0; ac.node = tn.id; ac.pi++; if (!M.bad) M.okN = (M.okN || 0) + 1; return stop; }
    } else if (dist < 20 || (past > 0 && s0.d < 45)) { ac.node = tn.id; ac.pi++; return 'node'; }
    /* 경로 이탈: 35m 넘게 벗어나 3초 → 감점하고 경로 위로 되돌림 */
    if (off > 35) { M.offT = (M.offT || 0) + dt; if (M.offT > 3) { var q = s1 && s1.d < s0.d ? s1 : s0; sim.inc('p_taxi_off', [ac], ATC.T('{0}: 허가받은 경로에서 {1}m 벗어났습니다 — 견인해 경로로 되돌렸습니다.', ac.cs, Math.round(off))); ac.u = q.u; ac.v = q.v; ac.du = q.du; ac.dv = q.dv; ac.spd = 0; F.th = F.thr = 0; M.offT = 0; M.bad = true; } } else M.offT = 0;
  };
  /* 화면 아래 안내 한 줄 */
  DepPilot.prototype.taxiHint = function () {
    var ac = this.ac, M = this.mt || {}, N = D.gN, KT = ATC.KT || 0.5144; if (!this.fly.on) return '';
    if (this.phase === 'twr') { var ia = Math.round(ac.spd / KT), vr = this.vs.vr, pp = Math.round(this.fly.pitch); return ac.st === 'air' ? ATC.T('기수 {0}° · {1}kt — V2+15 {2}kt를 지키세요(기수 약 15°) · 400ft 지나 Z = 자동조종', pp, ia, this.vs.v2 + 15) : ac.st === 'roll' && ia >= vr - 3 ? ATC.T('VR — ↓로 부드럽게 기수 올림 · 지금 {0}° · 땅에서 {1}°를 넘기지 마세요', pp, TAIL) : ac.st === 'roll' ? ATC.T('이륙 활주 {0}kt — VR {1}kt까지 기다림', ia, vr) : ATC.T('직접 이륙 준비 — 이륙 허가 · 이륙 추력 뒤 활주'); }
    if (ac.st !== 'taxi') return ac.st === 'athold' ? ATC.T('정지 중 — 다음 허가를 기다립니다') : ATC.T('지상 이동 허가를 받으면 움직일 수 있습니다');
    var tn = N[ac.path[ac.pi]], prev = ac.pi > 0 ? N[ac.path[ac.pi - 1]] : N[ac.node], nx = ac.pi + 1 < ac.path.length ? N[ac.path[ac.pi + 1]] : null, t = Math.round(ac.spd / KT) + 'kt';
    var sd = 0, i, a, b, tw = ''; for (i = ac.pi; i < ac.path.length; i++) { a = i === ac.pi ? ac : N[ac.path[i - 1]]; b = N[ac.path[i]]; sd += Math.hypot(a.u - b.u, a.v - b.v); if (ac.hs[ac.path[i]] !== undefined || i === ac.path.length - 1) break; }
    if (tn && prev && nx) { var c = (tn.u - prev.u) * (nx.v - tn.v) - (tn.v - prev.v) * (nx.u - tn.u), dt2 = (tn.u - prev.u) * (nx.u - tn.u) + (tn.v - prev.v) * (nx.v - tn.v), ang = Math.atan2(c, dt2) * 180 / Math.PI; if (Math.abs(ang) > 25) { tn.adj.forEach(function (x) { if (x.to === nx.id) tw = x.e.name || ''; }); t += ' · ' + ATC.T('{0}m 앞 {1}{2}', Math.round(M.d || 0), ang > 0 ? ATC.T('왼쪽') : ATC.T('오른쪽'), tw ? ' ' + tw : ''); } }
    t += ' · ' + ATC.T('정지 지점까지 {0}m', Math.round(sd)); if (M.off > 18) t += ' · ' + ATC.T('경로에서 {0}m', Math.round(M.off));
    if (ac.spd < 0.2 && this.fly.th < 0.03) t += ' · ' + (this.fly.gp ? ATC.T('RT로 추력') : ATC.T('W · 추력 레버를 올리면 출발'));
    return t;
  };
  /* 3D에 그릴 남은 경로(해리 좌표) */
  /* ---- 직접 이륙(선택, 3D 조종석): 이륙 추력은 자동(THR REF). 조종간으로 VR에서 기수를 들고, 떠오른 뒤 V2+15kt를 지키며 자동조종을 켤 때까지 ---- */
  DepPilot.prototype.manToOk = function () { var ac = this.ac; return this.phase === 'twr' && !this.done && !!ac && (ac.st === 'athold' || ac.st === 'lineup' || ac.st === 'linedup' || ac.st === 'roll'); };
  DepPilot.prototype.manTO = function (on) {
    var ac = this.ac, F = this.fly, sim = this.sim; if (on === undefined) on = !F.on; if (on && !this.manToOk()) return; if (!on && ac && ac.st === 'air') return;
    F.on = !!on; ac.man = F.on ? F : null; F.k.pitch = F.k.roll = F.k.thr = 0; F.t.pitch = F.t.roll = 0; F.at = true; F.t0 = -99; F.bank = 0;
    if (on) { F.pitch = this.pitch || 0; F.alpha = F.pitch; this.mto = this.mto || {}; this.mtoUsed = true; this.note(ATC.T('직접 이륙 — 피치(기수 각) 조작만 체험합니다. 이륙 추력과 좌우 방향은 게임이 맡고, 옆바람 · 방향타 · 엔진 고장 판단은 재현하지 않습니다. VR {0}kt에서 ↓(화면 조종간 · 게임패드 스틱 뒤로)로 부드럽게 기수를 드세요 — 게임 목표 초당 약 {3}°(실제 787 참고값 약 2 ~ 2.5°). 떠오르면 기수 15° 안팎으로 V2+15({2}kt)를 지키고, 400ft를 지나 자동조종을 켭니다.', this.vs.vr, TAIL, this.vs.v2 + 15, ROT), 'info'); this.note(ATC.T('자홍색 막대는 이 게임의 기수 들기 · 상승 도움 표시이며 실제 787의 FD와 다릅니다 — 실제 이륙에서는 땅에서 FD 막대를 따라 기수를 들지 않습니다. 바퀴가 닿은 채 {0}°를 넘으면 테일 스트라이크로 판정합니다(게임값 — 실제 접촉각은 착륙장치 상태에 따라 다르고, 787의 테일 스트라이크 보호 기능도 접촉을 완전히 막지는 못합니다. 이 게임은 보호 기능을 재현하지 않습니다).', TAIL), 'info'); }
    else { if (ac.st === 'roll' && (this.pitch || 0) > 0) this.rotT = sim.t - this.pitch / ROT; this.note(ATC.T('이륙 자동으로 — 부기장 조종(자동 회전)'), 'info'); }
    this.bump();
  };
  DepPilot.prototype.noThr = function () { return this.phase === 'twr' && this.fly.on; };
  DepPilot.prototype.stickLbl = function () { return this.phase === 'twr' ? ATC.T('↓ 당기면 기수 올림') : ATC.T('좌우 방향 · ↓ 브레이크'); };
  function stickIn(F) { var g = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : null, y = 0, i; for (i = 0; g && i < g.length; i++) if (g[i] && g[i].connected) { y = g[i].axes[1] || 0; y = Math.abs(y) < 0.12 ? 0 : (y - (y > 0 ? 0.12 : -0.12)) / 0.88; F.gp = true; break; } return Math.max(-1, Math.min(1, F.k.pitch * ROT / 4 + F.t.pitch + y)); }      /* 키보드는 꽉 눌러도 초당 2.5°(게임 목표) */
  /* 땅 위: VR 20kt 전부터 승강타가 들고, 떠오르는 기수 각은 속도가 붙을수록 낮아짐 */
  DepPilot.prototype.manRoll = function (ac, dt, thr) {
    var F = this.fly, sim = this.sim, M = this.mto, KT = ATC.KT || 0.5144, ias = ac.spd / KT, vr = this.vs.vr, ip = stickIn(F), e = D.ends[ac.rwy];
    F.th = F.thr = thr;
    if (ias >= vr - 20) F.pitch = Math.max(0, Math.min(TAIL + 0.5, F.pitch + ip * 4 * dt)); else F.pitch = Math.max(0, F.pitch - 2 * dt);
    if (F.pitch > 1 && M.rs === undefined) { M.rs = Math.round(ias); M.r0 = sim.t; }
    if (M.rs !== undefined && M.rs < vr - 3 && !M.early) { M.early = true; sim.inc('p_to_early', [ac], ATC.T('{0}: VR({1}kt) 전 {2}kt에서 기수를 들기 시작했습니다 — 떠오르기 전에 기수가 높아져 꼬리가 닿을 위험이 커집니다.', ac.cs, vr, M.rs)); }
    M.maxG = Math.max(M.maxG || 0, F.pitch);
    if (F.pitch > TAIL && !M.tail) { M.tail = true; sim.inc('p_to_tail', [ac], ATC.T('{0}: 바퀴가 땅에 닿은 채 기수가 {1}°를 넘었습니다 — 꼬리 접촉(테일 스트라이크, 게임 판정).', ac.cs, TAIL)); this.note(ATC.T('TAIL STRIKE — 기수를 더 들지 마세요'), 'alert'); }
    if (M.rs === undefined && ias >= vr + 25) {      /* 회전을 하지 않으면 부기장이 대신(감점) */
      M.help = true; M.rs = Math.round(ias); sim.inc('p_to_late', [ac], ATC.T('{0}: VR({1}kt)을 25kt 넘도록 기수를 들지 않아 부기장이 기수를 들었습니다.', ac.cs, vr)); this.note(ATC.T('부기장: 「Rotate!」 — 부기장이 기수를 듭니다'), 'alert');
      F.on = false; ac.man = null; this.rotT = sim.t; this.pitch = 0; this.bump(); return '';
    }
    var lp = Math.max(6, Math.min(11, 7 + (vr + 8 - ias) * 0.35)), r = '';      /* 초당 2.5°로 들면 VR+10kt 남짓 · 기수 6 ~ 7°에서 떠오름(게임 모형 — 실제 787-9의 이륙 순간 피치각은 대략 6 ~ 7.5°, AAIB 11/2020) */
    if (F.pitch >= lp && ias >= vr - 6) {
      ac.alt = 1; ac.liftT = sim.t; ac.st = 'air'; sim.lastDep[e.rw] = { t: sim.t, wake: ac.wake, full: !ac.inter, cs: ac.cs }; this.vsNow = 300; this.gam = 1.5; r = 'lift';
      var rate = (F.pitch - 1) / Math.max(0.3, sim.t - M.r0), T = this.to = { rs: M.rs, vr: vr, rate: Math.round(rate * 10) / 10, lofP: Math.round(F.pitch * 10) / 10, lofIas: Math.round(ias), maxG: Math.round(M.maxG * 10) / 10, v2: this.vs.v2, tail: !!M.tail, early: !!M.early };
      if (M.rs > vr + 8 && !M.help) sim.inc('p_to_late', [ac], ATC.T('{0}: VR({1}kt)보다 늦은 {2}kt에서 기수를 들기 시작했습니다.', ac.cs, vr, M.rs));
      if (rate > ROT_OK[1]) sim.inc('p_to_fast', [ac], ATC.T('{0}: 평균 초당 {1}°로 기수를 들었습니다 — 너무 빨라 꼬리가 닿을 위험이 커집니다(게임 목표 초당 약 {2}°).', ac.cs, T.rate, ROT));
      else if (rate < ROT_OK[0]) sim.inc('p_to_slowrot', [ac], ATC.T('{0}: 평균 초당 {1}°로 천천히 기수를 들어 활주 거리가 길어졌습니다(게임 목표 초당 약 {2}°).', ac.cs, T.rate, ROT));
      if (!M.early && !M.tail && M.rs <= vr + 8 && rate >= ROT_OK[0] && rate <= ROT_OK[1]) sim.inc('p_to_ok', [ac], ATC.T('{0}: 기수 들기 시작 {1}kt(VR {2}) · 평균 초당 {3}° · {4}°에서 떠오름', ac.cs, M.rs, vr, T.rate, T.lofP));
      M.lofT = sim.t; M.badT = 0; M.slowT = 0; M.minIas = ias; this.bump();
    }
    this.pitch = F.pitch; F.alpha = F.pitch;
    ac.u += e.du * ac.spd * dt; ac.v += e.dv * ac.spd * dt; return r;
  };
  /* 떠오른 뒤: 기수 각 − 받음각 = 상승각. 상승각이 크면 속도가 줄고, 작으면 늚(이륙 추력 · 플랩 5) */
  DepPilot.prototype.manAir = function (ac, dt) {
    var F = this.fly, sim = this.sim, M = this.mto, KT = ATC.KT || 0.5144, D2R = Math.PI / 180, ias = ac.spd / KT, vr = this.vs.vr, v2 = this.vs.v2, ip = stickIn(F), e = D.ends[ac.rwy];
    F.pitch = Math.max(-5, Math.min(25, F.pitch + ip * 3 * dt));
    var a = Math.max(2, Math.min(16, 7.5 * Math.pow((vr + 8) / Math.max(100, ias), 2))); F.alpha = a;
    this.gam += ((F.pitch - a) - this.gam) * Math.min(1, dt * 1.5);
    var ex = 2.9 + (this.cfg.gear === 'up' ? 0.5 : 0);
    ias = Math.max(100, ias + (ex - 19.07 * Math.sin(this.gam * D2R)) * dt); ac.spd = ias * KT;
    this.vsNow = ias * 101.27 * (1 + ac.alt / 1000 * 0.0165) * Math.sin(this.gam * D2R); ac.alt += this.vsNow / 60 * dt;
    if (ac.alt < 1) { ac.alt = 1; if (this.gam < 0) this.gam = 0; this.vsNow = Math.max(0, this.vsNow); if (!M.sink && sim.t - M.lofT > 2) { M.sink = true; sim.inc('p_to_sink', [ac], ATC.T('{0}: 이륙 후 고도가 낮아져 다시 활주로에 접지했습니다.', ac.cs)); } }
    if (!this.cPos && ac.alt > 35) { this.cPos = true; this.call = { t: 'POSITIVE RATE', at: sim.t }; }
    if (ac.alt > 35) { M.minIas = Math.min(M.minIas, ias); if (ias < v2 + 5 || ias > v2 + 35) M.badT += dt; if (ias < v2) M.slowT += dt; }
    if (M.slowT > 3 && !M.slow) { M.slow = true; sim.inc('p_to_slow', [ac], ATC.T('{0}: 이륙 후 V2({1}kt) 미만으로 3초 넘게 날았습니다 — 기수를 조금 낮추세요.', ac.cs, v2)); }
    if (a > 14) { M.stT = (M.stT || 0) + dt; if (M.stT > 1 && !M.stall) { M.stall = true; sim.inc('p_to_stall', [ac], ATC.T('{0}: 받음각이 커져 실속 경고가 울렸습니다.', ac.cs)); } }
    if (!M.help && (ias > fSpd(v2, 5) + 25 || ac.alt < 400 && sim.t - M.lofT > 45)) {      /* 플랩 5 속도를 크게 넘거나 45초가 지나도 400ft 아래면 부기장이 넘겨받음 */
      M.help = true; sim.inc('p_to_help', [ac], ATC.T('{0}: 초기 상승을 유지하지 못해 부기장이 조종을 인수했습니다.', ac.cs)); this.note(ATC.T('부기장: 「I have control」 — 부기장이 조종합니다'), 'alert'); this.manEnd(true); this.vsNow = Math.max(this.vsNow, 800); return;
    }
    this.pitch = F.pitch; this.lnav(ac, dt);
    var tb = Math.max(-25, Math.min(25, Math.atan(ac.spd * (this.turnRate || 0) * D2R / 9.81) / D2R)); F.bank += (tb - F.bank) * Math.min(1, dt * 1.5);      /* 좌우는 LNAV가 조종 — 선회 중 경사만 보여 줌 */
  };
  DepPilot.prototype.manEnd = function (help) {      /* 자동조종을 켜면 직접 조종 끝 — 초기 상승 속도 평가 */
    var F = this.fly, ac = this.ac, M = this.mto || {}; if (!F.on) return; F.on = false; ac.man = null; if (help) M.help = true;
    if (this.to) { this.to.minIas = Math.round(M.minIas || 0); this.to.badT = Math.round(M.badT || 0); }
    if (M.lofT !== undefined && !M.slow && !M.help && (M.badT || 0) < 5) this.sim.inc('p_to_climb', [ac], ATC.T('{0}: 자동조종을 켤 때까지 V2+5 ~ V2+35kt를 지켰습니다(가장 느린 속도 {1}kt).', ac.cs, Math.round(M.minIas)));
    this.bump();
  };
  /* 직접 이륙 중 게임 조종 도움 막대(실제 FD와 다름 — 실제는 땅에서 FD를 따라 기수를 들지 않음, GPT 17차 F17-01): 땅에서는 VR부터 초당 2.5°로 7.5°까지, 떠오른 뒤에는 V2+15kt가 되는 기수 각 */
  DepPilot.prototype.toFd = function (ac) {
    if (this.phase !== 'twr' || !this.fly.on) return null;
    var F = this.fly, KT = ATC.KT || 0.5144, ias = ac.spd / KT, v2 = this.vs.v2, t;
    if (ac.st !== 'air') t = this.rotT ? Math.min(7.5, (this.sim.t - this.rotT) * ROT) : 0; else t = Math.max(8, Math.min(20, 15 + (ias - (v2 + 15)) * 0.6));
    return { roll: 0, pitch: Math.max(-8, Math.min(8, t - F.pitch)), lat: 'TO/GA', ver: 'TO/GA' };
  };
  DepPilot.prototype.routePts = function () {
    var ac = this.ac, N = D.gN; if (this.phase !== 'gnd' || !ac || !ac.path || ac.pi >= ac.path.length || !(ac.st === 'taxi' || ac.st === 'athold')) return null;
    var pts = [D.uv2xy(ac.u, ac.v)], i, n, stopI = -1; for (i = ac.pi; i < ac.path.length; i++) { n = N[ac.path[i]]; pts.push(D.uv2xy(n.u, n.v)); if (stopI < 0 && (ac.hs[ac.path[i]] !== undefined || i === ac.path.length - 1)) stopI = pts.length - 1; }
    return { key: ac.path.length + ':' + ac.pi + ':' + ac.st, pts: pts, stop: stopI };
  };

  /* ================= D3: 관제탑(진입 대기 · 이륙 · Departure 이양) ================= */
  DepPilot.prototype.initTwr = function (fresh) {
    var sim = this.sim, f = this.f, fp = this.fp, sk, ac, rwy, hp, h, N = D.gN, me = this;
    if (fresh) { sk = this.standFor(); this.sid = D.sidName ? D.sidName(fp.gate, this.sidK) : fp.gate; this.sq = sim.squawk(); this.xpdr = { code: this.sq, set: this.sq, entry: '', want: this.sq }; this.cur.alt = D.sidInit || 9000; this.mcp = { hdg: 0, alt: D.sidInit || 9000, spd: 250 }; this.depFq = D.freq.DEP ? D.freq.DEP.fq : ''; sim.log.length = 0; }
    sk = this.standK; this.setGnd(); this.phase = 'twr'; this.freqNow = 'TWR'; this.freqNowFq = this.fqR('TWR').fq; this.freqNowN = this.fqR('TWR').n;
    this.eng = { st: 'on', t0: 0, n1: 21.5 }; this.pbrake = false; this.cfg.flap = this.cfg.flapPos = 5; this.cfg.gear = 'down'; this.cfg.gearT = 0; this.fly.on = false;
    var sys0 = sim.sys; sim.sys = function (t, k) { if (me.own) sys0.call(this, t, k); }; sim.phone = function () { }; sim.events = [];
    rwy = this.rwyFor(fp.gate); if (sim.depRw.indexOf(rwy) < 0) sim.depRw.push(rwy); sim.active[rwy] = 1;
    hp = this.taxi && D.holds[this.taxi.hp] && this.taxi.rwy === rwy ? this.taxi.hp : sim.holdsFor({ stand: sk }, rwy)[0]; h = D.holds[hp];
    ac = sim.mk({ f: f, kind: 'dep', st: 'athold', rwy: rwy, stand: sk, hp: hp, owner: 'me' });
    var a = N[h.node], b = N[h.rnode], L = Math.hypot(b.u - a.u, b.v - a.v) || 1; sim.place(ac, h.node, (b.u - a.u) / L, (b.v - a.v) / L);
    ac.holdKind = 'dep'; ac.readyT = sim.t; ac.waiting = 'dep'; ac.pilotMe = true; ac.dest = fp.dest; ac.destName = fp.destName; ac.gate = fp.gate; ac.squawk = this.sq; ac.rfl = fp.rfl;
    this.ac = ac; this.cs = ac.cs; this.sync(0); this.mcp.hdg = Math.round(D.ends[rwy].crs || ac.hdg); this.callT = sim.t + 2; this.vs = { v1: Math.round(ac.perf.vr / (ATC.KT || 0.5144)) - 5, vr: Math.round(ac.perf.vr / (ATC.KT || 0.5144)), v2: Math.round(ac.perf.vr / (ATC.KT || 0.5144)) + 5 };
    this.mcp.spd = this.vs.v2;      /* MCP 속도창은 V2 — 실제 초기 상승은 V2+15 ~ 25kt(GPT 16차 R16-01) */
    this.note(fresh ? ATC.T('조종사 체험 출발편(이륙부터) — Vela Air 787의 조종사입니다. 대기 지점 {0}, 활주로 {1}. {2} {3}에 이륙 준비 완료를 보고하세요.', hp, rwy, this.fqR('TWR').n, this.fqR('TWR').fq) : ATC.T('{0} {1} — 대기 지점 {2}, 활주로 {3}. 이륙 준비 완료를 보고하세요.', this.fqR('TWR').n, this.fqR('TWR').fq, hp, rwy), 'info');
  };
  DepPilot.prototype.todoTwr = function () {
    var ac = this.ac, cf = this.cfg;
    if (ac.st === 'linedup' && ac.cto && !this.toga) return { k: 'toga', t: ATC.T('이륙 추력(TO/GA)'), why: ATC.T('이륙 허가를 복창했습니다. 활주로 중심선에 섰는지 확인하고 이륙 추력을 넣습니다.'), lim: 20 };
    if (ac.st !== 'air') return null;
    if (cf.gear === 'down' && ac.alt > 35) return { k: 'gear', t: ATC.T('기어 올림'), why: ATC.T('「Positive rate」 — 상승을 확인했으면 기어를 올립니다.'), lim: 12 };
    if (!this.apOn && ac.alt >= 400) return { k: 'ap', t: ATC.T('자동조종 켜기(A/P)'), why: ATC.T('400ft를 지났습니다(게임에서 정한 높이 — 실제 하한은 기종 · 회사 절차마다 다름). LNAV · VNAV는 이륙 전에 걸어 둔 모드이고, 자동조종은 그 모드를 따라 조종하게 하는 것입니다.'), lim: TODO_T };
    return this.apOn ? this.flapTodo(ac.alt, ac.ias) : null;
  };
  /* 플랩 올림: 가속 높이를 지나 가속을 시작한 뒤, 속도가 붙는 대로 한 단계씩(5 → 1 → UP). agl = 지면 위 높이(ft), ias = 지금 속도(kt) */
  DepPilot.prototype.flapTodo = function (agl, ias) {
    var cf = this.cfg, v2 = this.vs.v2, need;
    if (!cf.flap || !this.accel || agl < ACC_ALT) return null;
    need = fSpd(v2, cf.flap); if (ias < need - 0.5) return null;
    return cf.flap > 1 ? { k: 'flap1', t: ATC.T('플랩 1'), why: ATC.T('가속 중 — {0}kt를 넘었습니다. 플랩을 5에서 1로 올립니다.', need), lim: TODO_T } : { k: 'flapup', t: ATC.T('플랩 UP'), why: ATC.T('가속 중 — {0}kt를 넘었습니다. 플랩을 1에서 UP으로 올립니다.', need), lim: TODO_T };
  };
  /* 플랩이 나와 있는 동안의 목표 속도(kt): 가속 높이 전 V2+15, 그 뒤에는 다음 플랩 단계 속도를 조금 넘는 데까지 */
  DepPilot.prototype.flapSpd = function (agl) {
    var cf = this.cfg, v2 = this.vs.v2;
    if (!this.accel && agl >= ACC_ALT) { this.accel = true; if (cf.flap > 0) this.note(ATC.T('가속 높이 {0}ft — 기수를 낮춰 가속합니다. {1}kt에서 플랩 1, {2}kt에서 플랩 UP(높이 · 속도는 게임값).', ACC_ALT.toLocaleString('en-US'), fSpd(v2, 5), fSpd(v2, 1)), 'info'); this.bump(); }
    return !this.accel ? v2 + 15 : fSpd(v2, cf.flap) + F_OVER;
  };
  DepPilot.prototype.actTwr = function (k, fo, td) {
    var sim = this.sim, ac = this.ac, cf = this.cfg;
    if (k === 'toga') { this.toga = true; this.togaT = sim.t; this.note(ATC.T('{0}: 이륙 추력 — V1 {1} · VR {2} · V2 {3}kt', ac.cs, this.vs.v1, this.vs.vr, this.vs.v2), 'info'); }
    else if (k === 'gear') { cf.gear = 'transit'; cf.gearT = sim.t + 8; cf.gearTo = 'up'; this.note(ATC.T('기어 업'), 'info'); }
    else if (k === 'ap') { this.apOn = true; this.manEnd(); }
    else if (k === 'flap1') { cf.flap = 1; this.note(ATC.T('플랩 1 — {0}kt에서 플랩 UP', fSpd(this.vs.v2, 1)), 'info'); }
    else if (k === 'flapup') { cf.flap = 0; this.mcp.spd = 250; if (ac.tIas !== undefined) ac.tIas = ac.normIas || 250; this.note(ATC.T('플랩 UP — 250kt까지 가속'), 'info'); }
    if (fo) sim.inc('p_set_late', [ac], ATC.T('{0}: 「{1}」을(를) {2}초 안에 하지 않아 부기장이 했습니다.', ac.cs, td.t, td.lim || TODO_T));
    this.todoT = sim.t; this.bump();
  };
  /* 이륙 활주 · 상승(내 편): 추력이 4초에 걸쳐 오르고, VR에서 기수를 들어 약 3초 뒤 떠오름. 떠오른 뒤 V2+15kt로 상승, 가속 높이부터 가속하며 플랩을 한 단계씩 올리고 250kt까지 */
  /* 이륙 뒤 방향(LNAV): 공시된 높이까지는 활주로 방위, 그 뒤 SID 첫 지점으로 직행 — 상공 통과 지점(TT501)은 그 위를 지난 뒤에 다음 지점으로.
     AIP SID 본문 「Climb on HDG ○○○° at or above ○○○FT, (turn left/right) direct to …」. 돌아간 각도만큼 3D 화면의 경사도 따라감 */
  DepPilot.prototype.lnav = function (ac, dt) {
    var e = D.ends[ac.rwy], leg = (D.sidLeg || {})[ac.rwy], rt = this.sidRt || (this.sidRt = D.sidRoute ? D.sidRoute(ac.rwy, this.fp.gate, this.sidK) : []), rate = 0;
    if (ac.trk === undefined) { var p0 = D.uv2xy(0, 0), p1 = D.uv2xy(e.du * 100, e.dv * 100); ac.trk = U.n360(Math.atan2(p1.x - p0.x, p1.y - p0.y) * 180 / Math.PI); ac.sidI = 0; }
    if (leg && ac.alt >= leg.alt && ac.sidI < rt.length && D.fix[rt[ac.sidI]]) {
      var p = D.uv2xy(ac.u, ac.v), n = rt[ac.sidI], f = D.fix[n], d = U.dist(p, f), df = U.adiff(ac.trk, U.brg(p, f));
      if (!this.lnavOn) { this.lnavOn = true; this.note(ATC.T('LNAV — {0}ft를 지났습니다. {1}(으)로 향합니다(SID: HDG {2}° · {0}ft 이상 → {1}).', leg.alt, n, U.pad(leg.hdg, 3)), 'info'); }
      if ((D.flyOver || {})[n] ? (d < 0.05 || d < 2 && Math.abs(df) > 90) : d < 0.7) { ac.sidI++; this.bump(); }
      else { var st = Math.max(-3 * dt, Math.min(3 * dt, df)); ac.trk = U.n360(ac.trk + st); rate = dt > 0 ? st / dt : 0; }
    }
    this.turnRate = rate;
    var h = ac.trk * Math.PI / 180, q = D.xy2uv(Math.sin(h), Math.cos(h)), L = Math.hypot(q.u, q.v) || 1; ac.du = q.u / L; ac.dv = q.v / L;
    ac.u += ac.du * ac.spd * dt; ac.v += ac.dv * ac.spd * dt;
  };
  DepPilot.prototype.rollStep = function (ac, dt) {
    var e = D.ends[ac.rwy], p = ac.perf, sim = this.sim, thr = Math.min(1, Math.max(0.15, (sim.t - (this.togaT || sim.t)) / 4)), KT = ATC.KT || 0.5144, r = '';
    ac.spd += p.acc * thr * dt;
    var man = this.fly.on && ac.man;
    if (!this.c80 && ac.spd >= 80 * KT) { this.c80 = true; this.call = { t: '80 KNOTS', at: sim.t }; }
    if (!this.cV1 && ac.spd >= this.vs.v1 * KT) { this.cV1 = true; this.call = { t: 'V1', at: sim.t }; }
    if (!this.rotT && ac.spd >= p.vr) { this.rotT = sim.t; this.call = { t: 'ROTATE', at: sim.t }; }
    if (man) return this.manRoll(ac, dt, thr);
    if (this.rotT) { this.pitch = Math.min(12, (sim.t - this.rotT) * ROT); if (this.pitch >= 7) { ac.alt = 1; ac.liftT = sim.t; ac.st = 'air'; sim.lastDep[e.rw] = { t: sim.t, wake: ac.wake, full: !ac.inter, cs: ac.cs }; this.vsNow = 700; r = 'lift'; } }
    ac.u += e.du * ac.spd * dt; ac.v += e.dv * ac.spd * dt; return r;
  };
  DepPilot.prototype.airStep = function (ac, dt) {
    if (this.fly.on && ac.man) return this.manAir(ac, dt);
    var e = D.ends[ac.rwy], p = ac.perf, KT = ATC.KT || 0.5144, clean = this.cfg.flap === 0, vt = (clean ? 250 : this.flapSpd(ac.alt)) * KT, acc = ac.spd < vt - 1;
    this.vsNow += (((clean || this.accel) && acc ? 1700 : p.climb + 300) - this.vsNow) * Math.min(1, dt * 0.45);
    ac.alt = Math.min(ac.maxAlt || 6000, ac.alt + this.vsNow / 60 * dt); if (ac.alt >= (ac.maxAlt || 6000)) this.vsNow = 0;
    ac.spd = ac.spd > vt ? Math.max(vt, ac.spd - 0.8 * dt) : Math.min(vt, ac.spd + (clean ? 1.0 : this.accel ? 0.8 : 0.7) * dt); this.pitch = 0;      /* 직접 조종에서 넘겨받을 때 목표보다 빠르면 천천히 줄임 */
    if (!this.cPos && ac.alt > 35) { this.cPos = true; this.call = { t: 'POSITIVE RATE', at: this.sim.t }; }
    this.lnav(ac, dt);
  };
  DepPilot.prototype.tickTwr = function (dt) {
    var sim = this.sim, ac = this.ac, e = this.eng, cf = this.cfg;
    this.sync(dt);
    if (!this.called && sim.t >= this.callT) { this.called = true; sim.say(ac, D.freq.TWR.n + ', ' + ATC.csSay(ac) + ', holding point ' + ATC.twySay([ac.hp]) + ', runway ' + ac.rwy + ', ready for departure.'); }
    if (ac.st === 'linedup' && ac.cto && !this.toga) ac.ctoT = sim.t;      /* 이륙 추력을 넣을 때까지 활주를 시작하지 않음 */
    var tgt = ac.st === 'roll' ? 21.5 + 76.5 * Math.min(1, (sim.t - (this.togaT || sim.t)) / 4) : ac.st === 'air' ? (cf.flap === 0 ? 91 : 98) : ac.st === 'lineup' && ac.spd > 0.3 ? 27 : 21.5;
    e.n1 += (tgt - e.n1) * Math.min(1, dt * (ac.st === 'roll' ? 2.5 : 0.7));
    if (cf.gearT && sim.t >= cf.gearT) { cf.gear = cf.gearTo; cf.gearT = 0; this.bump(); }
    if (cf.flapPos !== cf.flap) { cf.flapPos += Math.max(-dt * 0.5, Math.min(dt * 0.5, cf.flap - cf.flapPos)); if (Math.abs(cf.flapPos - cf.flap) < 0.02) { cf.flapPos = cf.flap; this.bump(); } }
    if (ac.st === 'air' && !this.aired) { this.aired = true; this.bump(); }
    var td = this.todo(), tk = td ? td.k : '';
    if (tk !== this.tdK) { this.tdK = tk; this.todoT = sim.t; this.bump(); }      /* 새 할 일이 생긴 때부터 시간을 잼 */
    else if (td && sim.t - this.todoT > (td.lim || TODO_T)) this.act(td.k, true);
    var sg = ac.st + '|' + cf.gear + '|' + (this.apOn ? 1 : 0) + '|' + (ac.cto ? 1 : 0); if (sg !== this.gSig) { this.gSig = sg; this.bump(); }
  };
  DepPilot.prototype.twrText = function () {
    var ac = this.ac;
    if (ac.st === 'athold') return ATC.T('대기 지점 {0} — 활주로 {1} 진입 허가 전', ac.hp, ac.rwy);
    if (ac.st === 'lineup') return ac.cto ? ATC.T('활주로 {0} 진입 중 — 이륙 허가 받음', ac.rwy) : ATC.T('활주로 {0} 진입 중 — 진입 뒤 대기', ac.rwy);
    if (ac.st === 'linedup') return ac.cto ? ATC.T('활주로 {0} — 이륙 허가 받음', ac.rwy) : ATC.T('활주로 {0}에서 대기 — 이륙 허가 전', ac.rwy);
    if (ac.st === 'roll') return ATC.T('이륙 활주 — V1 {0} · VR {1} · V2 {2}kt', this.vs.v1, this.vs.vr, this.vs.v2);
    var leg = (D.sidLeg || {})[ac.rwy], rt = this.sidRt || [];
    return leg ? (this.lnavOn ? ATC.T('상승 중 — LNAV {0} · {1}까지', rt[Math.min(ac.sidI || 0, rt.length - 1)] || '', fmt.alt(this.cur.alt || 9000)) : ATC.T('상승 중 — HDG {0}° · {1}ft 이상에서 {2}(으)로 · {3}까지', U.pad(leg.hdg, 3), leg.alt, rt[0] || '', fmt.alt(this.cur.alt || 9000))) : ATC.T('상승 중 — 활주로 방향 {0}° · {1}까지', Math.round(D.ends[ac.rwy].crs || ac.hdg), fmt.alt(this.cur.alt || 9000));
  };

  /* ================= SID 고도 제한 · transition =================
     자료: AIP RJTT AD2.24(지점별 제한 · 이륙 직후 구간 · transition), AIP ENR 1.5 3.1(SID/transition의 고도 제한) · 1.3.7.1, AIC 020/26(목적지별 표준 경로).
     · 「CLIMB VIA SID TO [고도]」 = 공시 고도 제한을 지키며 상승(3.1.2).
     · 비행 중 새 고도를 지시받거나(지금 고도 유지 지시 포함) 경로가 바뀌면(직행 포함) 공시 고도 제한은 모두 취소 — 관제가 다시 말한 것만 유효(3.1.3 · 1.3.7.1).
     · 허가 고도가 위쪽 제한보다 낮으면 허가 없이 그 위로 올라가지 않음(GPT 14차 R14-01).
     게임: 관제 지시를 복창한 뒤 「제한 유지 / 제한 취소」를 조종사가 골라 VNAV에 반영. 「이하」 · 「그 고도」 제한은 VNAV가 그 고도에서 잠깐 멈춤(ac.vcap) */
  var SID_T = 200, SID_ASK = 45;      /* 통과 고도 허용 오차(ft) · 제한 처리 선택 제한 시간(초) — 게임값 */
  DepPilot.prototype.transName = function (fp) { fp = fp || this.fp; return D.transFor ? D.transFor(fp.gate, fp.dest) : ''; };
  DepPilot.prototype.sidList = function () {
    if (!this.sidR) { var fp = this.fp; this.sidR = D.sidAltFor ? D.sidAltFor(this.rwyFor(fp.gate), fp.gate, fp.dest, this.sidK).map(function (r) { return { fix: r.fix, min: r.min, max: r.max, tr: r.tr || '', st: '', dMin: 99 }; }) : []; this.sidOn = true; this.sidVia = true; }
    return this.sidR;
  };
  DepPilot.prototype.sidPend = function () { return this.sidList().filter(function (r) { return !r.st; }); };
  DepPilot.rTxt = function (r) { return r.min !== undefined && r.min === r.max ? fmt.alt(r.min) : r.min !== undefined ? '≥' + fmt.alt(r.min) : '≤' + fmt.alt(r.max); };
  function rLong(r) { return r.min !== undefined && r.min === r.max ? ATC.T('{0} — {1}', r.fix, fmt.alt(r.min)) : r.min !== undefined ? ATC.T('{0} — {1} 이상', r.fix, fmt.alt(r.min)) : ATC.T('{0} — {1} 이하', r.fix, fmt.alt(r.max)); }
  /* 관제사가 상승 지시를 「climb via SID to」로 말할지(남은 제한이 있을 때).
     · 「이하」 · 「그 고도」 제한(SPOON ≤FL150 · LEWIS/SILVA FL170)이 남아 있으면 늘 via — 다른 흐름과 떼어 놓는 제한이라 그냥 풀지 않음(게임 설정)
     · 「이상」 제한만 남았으면 대개 via, 세 번에 한 번쯤은 새 고도만 지시(= 제한 취소 — 제한 없이 올라가도 되는 날)
     · 이미 「이하」 제한 위에 있으면 via로 말하지 않음. 지역관제는 transition의 제한이 남았을 때만 */
  DepPilot.prototype.viaFor = function () {
    var pend = this.sidPend(), ac = this.ac, k = this.sim.mode; if (!pend.length) return false;
    if (pend.some(function (r) { return r.max !== undefined && ac.alt > r.max + 300; })) return false;
    if (k === 'ACC' && !pend.some(function (r) { return r.tr; })) return false;
    if (pend.some(function (r) { return r.max !== undefined; })) return true;
    this.sidPlain = this.sidPlain || {};
    if (this.sidPlain[k] === undefined) this.sidPlain[k] = ((+ac.num || 0) + (this.sim.seed | 0) + (k === 'ACC' ? 1 : 0)) % 3 === 0;
    return !this.sidPlain[k];
  };
  /* 복창한 지시가 SID 제한에 미치는 영향(ENR 1.5 3.1.2 · 3.1.3) → 조종사가 고를 차례 */
  DepPilot.prototype.sidHeard = function (cmds) {
    var sim = this.sim, ac = this.ac, c = null, via;
    cmds.forEach(function (x) { if (x.k === 'alt' || x.k === 'hdg' || x.k === 'dct') c = c && c.k === 'alt' ? c : x; });
    if (!c || !this.sidPend().length) return;
    via = c.k === 'alt' && !!c.via && !cmds.some(function (x) { return x.k === 'hdg' || x.k === 'dct'; });
    if (via) this.sidList().forEach(function (r) { if (!r.st && r.max !== undefined && ac.alt > r.max + 300) r.st = 'x'; });      /* 이미 그 위에 있는 「이하」 제한은 지킬 수 없음 */
    var ph = ATC.phrase(sim, ac, cmds.filter(function (x) { return x.k !== 'ho' && x.k !== 'radar'; })); this.sidVia = via; this.sidAsk = { via: via, t: sim.t, k: c.k, said: cap(ph.rb || ph.atc || '').replace(/, [A-Za-z ]+ \d+\.?$/, '') };
  };
  DepPilot.prototype.sidAnswer = function (keep, fo) {
    var sim = this.sim, ac = this.ac, q = this.sidAsk; if (!q) return; this.sidAsk = null;
    var why = q.via ? ATC.T('「climb via SID to」 = 공시된 SID 고도 제한을 지키며 상승') : q.k === 'alt' ? ATC.T('비행 중 새 고도 지시(climb and maintain)는 SID 고도 제한을 모두 취소') : ATC.T('경로가 바뀌면(기수 · 직행 지시) SID 고도 제한은 모두 취소');
    if (fo) sim.inc('p_set_late', [ac], ATC.T('{0}: SID 고도 제한 처리를 {1}초 안에 고르지 않아 부기장이 했습니다 — {2}.', ac.cs, SID_ASK, why));
    else if (!!keep === q.via) sim.inc('p_sid_set', [ac], ATC.T('{0}: SID 고도 제한 — {1}. {2}.', ac.cs, q.via ? ATC.T('유지') : ATC.T('취소'), why));
    else sim.inc('p_sid_mode', [ac], ATC.T('{0}: SID 고도 제한을 반대로 처리했습니다 — 정답은 「{1}」. {2}(AIP ENR 1.5). 부기장이 바로잡았습니다.', ac.cs, q.via ? ATC.T('유지') : ATC.T('취소'), why));
    this.sidOn = q.via; this.bump();
  };
  /* 지점 통과 판정 · VNAV 고도 제한 · 선택 시간 */
  DepPilot.prototype.sidTick = function () {
    var sim = this.sim, ac = this.ac, L = this.sidList(), i, r = null, cap, me = this;
    for (i = 0; i < L.length; i++) if (!L[i].st) { r = L[i]; break; }
    if (r && D.fix[r.fix]) {
      var d = U.dist(ac, D.fix[r.fix]), nav = ac.nav, on = nav && nav.mode === 'route' && nav.route.indexOf(r.fix, nav.i) >= 0, later = sim.mode === 'APP' && D.depRouteFor && D.depRouteFor(this.fp.gate, this.fp.dest).indexOf(r.fix) > 0;
      if (d < r.dMin) { r.dMin = d; r.alt = ac.alt; }
      else if (r.dMin < 2.5 && d > r.dMin + 0.25) this.sidCross(r);
      else if (!on && !later && r.dMin >= 2.5) { r.st = this.sidVia ? 'skip' : 'x'; this.bump(); }      /* 경로에서 빠진 지점(직행 · 유도) — 제한 없음(ENR 1.5 1.3.7.2) */
    }
    cap = undefined;
    if (this.sidOn) L.forEach(function (q) { if (!q.st && q.max !== undefined && (cap === undefined || q.max <= cap)) { cap = q.max; me.capFix = q.fix; } });      /* 같은 고도가 이어지면(LEWIS · SILVA FL170) 마지막 지점까지 */
    if (cap !== undefined && ac.alt > cap + 300) cap = undefined;
    if (ac.vcap !== cap) { ac.vcap = cap; this.bump(); }
    if (cap !== undefined && this.capKey !== this.capFix + cap && ac.tAlt > cap && Math.abs(ac.alt - cap) < 60) { this.capKey = this.capFix + cap; this.note(ATC.T('VNAV: {0}까지 {1} 유지 — SID 고도 제한. 지나면 허가 고도 {2}까지 다시 오릅니다.', this.capFix, fmt.alt(cap), fmt.alt(ac.tAlt)), 'info'); }
    if (this.sidAsk && sim.t - this.sidAsk.t > SID_ASK) this.sidAnswer(this.sidAsk.via, true);
  };
  DepPilot.prototype.sidCross = function (r) {
    var sim = this.sim, ac = this.ac, a = r.alt, cl = this.asg.alt ? this.asg.alt.c.v : (this.cur.alt || ac.tAlt), t = DepPilot.rTxt(r);
    r.at = Math.round(a / 100) * 100;
    if (!this.sidVia) r.st = 'x';
    else if (r.max !== undefined && a > r.max + SID_T) { r.st = 'high'; sim.inc('p_sid_high', [ac], ATC.T('{0}: {1}을(를) {2}로 지났습니다 — 제한 {3}.', ac.cs, r.fix, fmt.alt(r.at), t)); }
    else if (r.min !== undefined && a < r.min - SID_T) {
      if (cl < r.min - SID_T) { r.st = 'clr'; this.note(ATC.T('{0}을(를) {1}로 지났습니다(제한 {2}) — 허가 고도가 {3}라 더 오를 수 없었습니다. 허가 없이 제한 고도로 올라가지 않습니다. 실제로는 지점에 닿기 전에 관제에 알려 더 높은 고도를 받습니다.', r.fix, fmt.alt(r.at), t, fmt.alt(cl)), 'info'); }
      else { r.st = 'low'; sim.inc('p_sid_low', [ac], ATC.T('{0}: {1}을(를) {2}로 지났습니다 — 제한 {3}. 허가 고도는 {4}였습니다(복창 · 설정이 늦으면 상승이 늦어집니다).', ac.cs, r.fix, fmt.alt(r.at), t, fmt.alt(cl))); }
    } else { r.st = 'ok'; sim.inc('p_sid_ok', [ac], ATC.T('{0}: {1} 통과 {2} — 제한 {3} 지킴.', ac.cs, r.fix, fmt.alt(r.at), t)); }
    this.bump();
  };
  /* 화면용: SID(+ transition) 지점 차례와 제한 · 통과 결과 */
  DepPilot.prototype.sidView = function () {
    var fp = this.fp, rwy = this.rwyFor(fp.gate), rt = D.sidRoute ? D.sidRoute(rwy, fp.gate, this.sidK) : [fp.gate], tn = this.transName(), t = tn && D.sidTrans[fp.gate][tn], by = {}, ac = this.ac, air = this.phase === 'air' && ac && ac.nextFix, nx = air ? ac.nextFix() : '', leg = (D.sidLeg || {})[rwy], me = this, pend = null;
    this.sidList().forEach(function (r) { by[r.fix] = r; if (!r.st && !pend) pend = r; });
    var fx = rt.map(function (n) { return { n: n, r: by[n] || null }; }).concat(t ? t.route.map(function (n) { return { n: n, r: by[n] || null, tr: true }; }) : []), pred = null;
    if (air && pend && D.fix[pend.fix] && ac.gs > 60) { var cl = Math.min(ac.tAlt, ac.vcap !== undefined ? ac.vcap : 1e9), z = Math.min(cl, ac.alt + (ac.vs > 0 ? ac.vs : 0) * U.dist(ac, D.fix[pend.fix]) / ac.gs * 60); pred = { fix: pend.fix, alt: Math.round(z / 100) * 100, low: me.sidVia && pend.min !== undefined && z < pend.min - SID_T }; }
    return { sid: D.sidName ? D.sidName(fp.gate, this.sidK) : fp.gate, sidK: this.sidK || 'A', rwy: rwy, trans: tn, leg: leg, first: rt[0], fixes: fx, next: nx, via: this.sidVia !== false, on: this.sidOn !== false, cap: ac && ac.vcap !== undefined ? { v: ac.vcap, fix: this.capFix } : null, pred: pred, any: this.sidList().length > 0 };
  };

  /* ================= D4: 하늘(Departure → Tokyo Control → 순항 고도) ================= */
  DepPilot.prototype.initAir = function (c) {
    var sim = this.sim, f = this.f, fp = this.fp, rwy = this.rwyFor(fp.gate), end = D.ends[rwy], ac, me = this, acc = sim.mode === 'ACC', KT = ATC.KT || 0.5144, first, o;
    if (!c) { this.standK = this.standFor(); this.sid = D.sidName ? D.sidName(fp.gate, this.sidK) : fp.gate; this.sq = sim.squawk(); this.xpdr = { code: this.sq, set: this.sq, entry: '', want: this.sq }; this.cur.alt = D.sidInit || 9000; this.mcp = { hdg: 0, alt: D.sidInit || 9000, spd: 250 }; this.depFq = D.freq.DEP ? D.freq.DEP.fq : ''; this.cfg.flap = this.cfg.flapPos = 0; sim.log.length = 0; }
    this.setGnd(); this.phase = 'air'; this.eng = { st: 'on', t0: 0, n1: 90 }; this.apOn = true; this.pbrake = false; this.cfg.gear = 'up'; this.cfg.gearT = 0; this.fly.on = false; this.asg = {}; this.ci = false; this.clr = null; this.prompt = null; this.freqTo = null;
    if (!this.vs) this.vs = { v1: Math.round(f.perf.vr / KT) - 5, vr: Math.round(f.perf.vr / KT), v2: Math.round(f.perf.vr / KT) + 5 };
    var sys0 = sim.sys; sim.sys = function (t, k) { if (me.own) sys0.call(this, t, k); }; sim.phone = function () { }; sim.events = [];
    var pf = {}, pk; for (pk in f.perf) pf[pk] = f.perf[pk]; pf.climb = Math.max(pf.climb, 2800);      /* 내 편의 상승률(게임값): 10,000ft 아래 2,800ft/min — SID의 「이상」 제한을 제때 설정하면 지킬 수 있게 */
    o = { cs: f.cs, csWord: f.csWord, num: f.num, al: f.al, type: f.type, wake: f.wake, perf: pf, kind: 'dep', gate: fp.gate, dest: fp.dest, destName: fp.destName, orig: D.airport.icao, squawk: this.sq, rwy: rwy, owner: 'me', rfl: fp.rfl, entT: sim.t };
    if (!acc) {
      var p0 = c ? { x: c.ac.x, y: c.ac.y } : D.off(end.end, end.crs, 1.2);
      o.x = p0.x; o.y = p0.y; o.alt = c ? c.ac.alt + (c.ac.agl ? D.airport.elev : 0) : 1300; o.hdg = c && c.ac.hdg !== undefined ? c.ac.hdg : end.crs; o.ias = c ? Math.max(160, c.ac.ias) : 180; o.tIas = this.cfg.flap > 0 ? this.flapSpd(o.alt - D.airport.elev) : 250; o.normIas = 250; o.tAlt = this.cur.alt || D.sidInit; o.fpRoute = D.sidRoute ? D.sidRoute(rwy, fp.gate, this.sidK) : [fp.gate]; o.justDep = true; o.sidT = sim.t;
      var f0 = D.flyOver && D.flyOver[o.fpRoute[0]] && D.fix[o.fpRoute[0]], hr = end.crs * Math.PI / 180;      /* 05 출발의 TT501(상공 통과 지점): 활주로 방위로 그 위를 이미 지났을 때만 뺌 — 지난 거리와 옆으로 벗어난 거리를 함께 봄(GPT 16차 F16-02) */
      if (c && c.ac.sidI) o.fpRoute = o.fpRoute.slice(Math.min(c.ac.sidI, o.fpRoute.length - 1));      /* 관제탑 주파수에 있는 동안 LNAV가 이미 지난 지점 */
      else if (f0 && (f0.x - o.x) * Math.sin(hr) + (f0.y - o.y) * Math.cos(hr) <= 0 && Math.abs((f0.x - o.x) * Math.cos(hr) - (f0.y - o.y) * Math.sin(hr)) < 0.3) o.fpRoute.shift();
      ac = sim.spawnAc(o); ac.sid = this.sid; this.freqNow = 'DEP'; this.freqNowFq = D.freq.DEP.fq; this.freqNowN = D.freq.DEP.n;
      first = D.freq.DEP.n + ', ' + ATC.csSay(ac) + ', passing ' + fmt.alt(Math.max(500, Math.round(ac.alt / 100) * 100)) + ', climbing ' + fmt.alt(ac.tAlt) + ', ' + ac.sid + ' departure.';
      this.note(c ? ATC.T('{0} {1} — 이륙 뒤 첫 호출을 하세요(지나는 고도 · 허가 고도 · SID).', D.freq.DEP.n, D.freq.DEP.fq) : ATC.T('조종사 체험 출발편(이륙 뒤부터) — {0} {1}에 첫 호출을 하세요.', D.freq.DEP.n, D.freq.DEP.fq), 'info');
    } else {
      var rt = D.depRouteFor ? D.depRouteFor(fp.gate, fp.dest) : D.accDep[fp.gate][0]; rt = rt.join ? rt : [fp.gate, rt];      /* 출구 지점 → (transition) → 경계 */
      o.x = c.ac.x; o.y = c.ac.y; o.alt = c.ac.alt; o.hdg = c.ac.hdg; o.ias = c.ac.ias; o.tAlt = c.ac.tAlt; o.fpRoute = rt; o.exitFix = rt[rt.length - 1]; o.normIas = sim.iasFor ? sim.iasFor(f.perf, fp.rfl) : 290; o.fast = true; o.east = !!D.gateEast[fp.gate];
      ac = sim.spawnAc(o); ac.setRoute(U.dist(ac, D.fix[rt[0]]) < 4 ? rt.slice(1) : rt); ac.waiting = 'climb'; ac.reqT = sim.t; this.freqNow = 'ACC'; this.freqNowFq = D.freq.ACC.fq; this.freqNowN = D.freq.ACC.n;
      var lv = c.ac.vcap !== undefined && c.ac.vcap < ac.tAlt && Math.abs(ac.alt - c.ac.vcap) < 100 ? c.ac.vcap : 0;      /* SID 제한 고도에서 잠깐 수평 비행 중 */
      first = D.freq.ACC.n + ', ' + ATC.csSay(ac) + ', ' + (Math.abs(ac.alt - ac.tAlt) < 100 ? 'maintaining ' + fmt.alt(ac.tAlt) : lv ? 'maintaining ' + fmt.alt(lv) + ', climbing ' + fmt.alt(ac.tAlt) : 'passing ' + fmt.alt(ac.alt >= 9950 && ac.alt < 23950 ? Math.round(ac.alt / 100) * 100 : Math.round(ac.alt / 1000) * 1000) + ', climbing ' + fmt.alt(ac.tAlt)) + ', request ' + fmt.alt(fp.rfl) + '.';
      this.note(ATC.T('{0} {1} — 첫 호출을 하세요(지나는 고도 · 허가 고도 · 요청 순항 고도).', D.freq.ACC.n, D.freq.ACC.fq), 'info');
    }
    ac.pilotMe = true; this.ac = ac; this.cs = ac.cs; this.callT = sim.t + 2; this.called = false; this.firstText = first; this.cur = { hdg: null, alt: ac.tAlt, spd: null };
    this.mcp = { hdg: Math.round(ac.hdg / 5) * 5 || 360, alt: ac.tAlt, spd: this.cfg.flap > 0 ? this.vs.v2 : Math.round((ac.tIas || ac.ias) / 10) * 10 };
  };
  DepPilot.prototype.tickAir = function (dt) {
    var sim = this.sim, ac = this.ac, cf = this.cfg, k;
    if (ac.gone) { this.done = true; this.phase = 'end'; this.stage = sim.mode === 'ACC' ? 4 : 3; this.note(ATC.T('관할 구역을 벗어났습니다 — 조종사 체험 출발편 끝.'), 'info'); this.bump(); return; }
    if (!this.called && sim.t >= this.callT) { this.called = true; sim.say(ac, this.firstText); }
    this.sidTick();
    if (cf.flapPos !== cf.flap) { cf.flapPos += Math.max(-dt * 0.5, Math.min(dt * 0.5, cf.flap - cf.flapPos)); if (Math.abs(cf.flapPos - cf.flap) < 0.02) { cf.flapPos = cf.flap; this.bump(); } }
    if (cf.flap > 0 && !this.cur.spd && !this.asg.spd) { var fs = this.flapSpd(ac.alt - D.airport.elev); if (ac.tIas !== fs) ac.tIas = fs; }      /* 플랩이 나와 있는 동안: 가속 높이부터 단계별 속도까지 가속 */
    var td = this.todo(), tk = td ? td.k : '';
    if (tk !== this.tdK) { this.tdK = tk; this.todoT = sim.t; this.bump(); } else if (td && sim.t - this.todoT > (td.lim || TODO_T)) this.act(td.k, true);
    if (this.knobK && sim.t - this.knobT > 1.2) { var kk = this.knobK; this.knobK = null; if (kk === 'spd' || (kk === 'hdg' && ac.nav && ac.nav.mode === 'hdg')) this.set(kk); }
    for (k in this.asg) { var a = this.asg[k]; if (sim.t - a.t > 45) { sim.inc('p_set_late', [ac], ATC.T('{0}: 지시를 {1}초 안에 설정하지 않아 부기장이 대신 설정했습니다.', ac.cs, 45)); a.auto = true; if (a.c.v !== undefined) this.mcp[k] = a.c.v; this.set(k); } }
    if (cf.flap === 0 && !this.cur.spd && !this.asg.spd) { var want = ac.alt < 10300 ? 250 : ac.alt < 28000 ? 290 : Math.round(290 - (ac.alt - 28000) / 1000 * 3.3);      /* 높은 고도에서는 지시 속도를 낮추는 게임용 상승 속도표(1,000ft마다 3.3kt — 마하를 계산한 값이 아님, FL340에서 약 270kt) */ if (ac.tIas !== want) { ac.tIas = want; this.mcp.spd = want; this.bump(); } }      /* 관제 속도 지시가 없으면: 10,000ft 아래 250kt, 그 위 상승 속도(게임값) */
    if (sim.mode === 'ACC' && ac.tAlt >= this.fp.rfl && ac.alt >= this.fp.rfl - 150) this.finish(4);      /* 순항 고도 도달 = 출발편 끝 */
  };
  /* 지금 받은 지상 허가 한 줄 */
  DepPilot.prototype.gndText = function () {
    var ac = this.ac, t = this.taxi;
    if (ac.st === 'gate' || ac.st === 'reqpush') return this.pushCmd ? ATC.T('푸시백 승인 — 주차 브레이크를 풀면 시작') : ATC.T('푸시백 승인 전');
    if (ac.st === 'push') return ATC.T('푸시백 중');
    if (ac.st === 'start' || ac.st === 'reqtaxi') return ATC.T('푸시백 끝 — 지상 이동 허가 전');
    if (!t) return '';
    return ATC.T('대기 지점 {0} · 활주로 {1} · 경로 {2}', t.hp, t.rwy, t.via.join(' → ')) + (ac.st === 'athold' && ac.holdKind === 'cross' ? ATC.T(' — 활주로 앞 정지 중') : ac.st === 'athold' ? ATC.T(' — 대기 지점 도착') : '');
  };
  DepPilot.prototype.gear = function () { };      /* 기어 · 플랩은 「조종석에서 할 일」 단추로만 */
  DepPilot.prototype.flap = function () { };
  DepPilot.prototype.cockpit = function () { };
  DepPilot.prototype.setFly = function () { };
  DepPilot.prototype.curText = function () { if (this.phase === 'gnd') return this.gndText(); if (this.phase === 'twr') return this.twrText(); if (this.phase === 'air') return ATC.Pilot.prototype.curText.call(this); return this.sid ? this.sid + ' · ' + fmt.alt(this.cur.alt) : ATC.T('허가 전'); };
  DepPilot.prototype.tick = function () {
    var sim = this.sim, ac = this.ac, self = this, dt = Math.max(0, Math.min(2, sim.t - (this.lastT === undefined ? sim.t : this.lastT))); this.lastT = sim.t;
    if (ATC.AI && !this.done && (this.phase === 'del' || this.phase === 'gnd' || this.phase === 'twr' || this.phase === 'air')) ATC.AI.run(sim.mode, sim);
    if (!ac || this.done) return;
    if (this.phase === 'gnd') this.tickGnd(dt); else if (this.phase === 'twr') this.tickTwr(dt); else if (this.phase === 'air') this.tickAir(dt);
    var c = this.clr, RB_T = 14;
    if (c && c.t0 !== null && !c.late && sim.t - c.t0 > RB_T) { c.late = true; sim.inc('p_rb_late', [ac], ATC.T('{0}: 복창이 늦습니다 — 관제 지시에는 바로 복창합니다.', ac.cs)); }
    if (c && c.t0 !== null && sim.t - c.t0 > RB_T + 20 && !c.rep) { c.rep = true; c.opts = null; c.t0 = null; sim.enq({ who: 'atc', ac: ac, text: ac.csWord + ' ' + ac.num + ', I say again, ' + c.ph.atc.split(', ').slice(1).join(', '), onDone: function () { if (self.clr === c) { c.t0 = sim.t; c.opts = self.rbOpts(c.cmds, c.ph); self.bump(); } } }); this.bump(); }
    var x = this.xpdr; if (x.want && !x.set && sim.t - x.t > SQ_T && !x.late) { x.late = true; x.set = x.code = x.want; sim.inc('p_set_late', [ac], ATC.T('{0}: 트랜스폰더를 {1}초 안에 넣지 않아 부기장이 넣었습니다.', ac.cs, SQ_T)); this.bump(); }
    if (this.prompt && !this.prompt.late && sim.t - this.prompt.t0 > 40) { this.prompt.late = true; sim.inc('p_ci_late', [ac], ATC.T('{0}: 교신이 늦었습니다.', ac.cs)); }
    if (this.freqTo && !this.freqTo.sent && !this.freqTo.late && sim.t - this.freqTo.t > 30) { this.freqTo.late = true; sim.inc('p_freq_late', [ac], ATC.T('{0}: 주파수 바꾸기가 늦었습니다.', ac.cs)); }
  };
  ATC.INC.p_sid_ok = { cat: 'P', pts: 1, t: ATC.T('SID 고도 제한 지킴'), les: 'app' };
  ATC.INC.p_sid_set = { cat: 'P', pts: 1, t: ATC.T('SID 고도 제한 처리'), les: 'app' };
  ATC.INC.p_sid_mode = { cat: 'P', pts: -3, t: ATC.T('SID 고도 제한 처리 틀림'), les: 'app' };
  ATC.INC.p_sid_low = { cat: 'E', pts: -5, t: ATC.T('SID 고도 제한 미달(이상 제한)'), les: 'app' };
  ATC.INC.p_sid_high = { cat: 'S', pts: -10, t: ATC.T('SID 고도 제한 초과(이하 제한)'), les: 'app' };
  ATC.INC.p_taxi_off = { cat: 'E', pts: -5, t: ATC.T('지상 이동 경로 이탈'), les: 'gnd' };
  ATC.INC.p_taxi_fast = { cat: 'S', pts: -3, t: ATC.T('지상 이동 과속'), les: 'gnd' };
  ATC.INC.p_taxi_close = { cat: 'S', pts: -8, t: ATC.T('지상에서 다른 항공기에 접근'), les: 'gnd' };
  ATC.INC.p_hold_bust = { cat: 'S', pts: -15, t: ATC.T('정지선 통과'), les: 'gnd' };
  ATC.INC.p_to_ok = { cat: 'P', pts: 2, t: ATC.T('좋은 기수 들기(rotation)'), les: 'app' };
  ATC.INC.p_to_climb = { cat: 'P', pts: 2, t: ATC.T('초기 상승 속도 유지'), les: 'app' };
  ATC.INC.p_to_early = { cat: 'S', pts: -5, t: ATC.T('이른 기수 들기(VR 이전)'), les: 'app' };
  ATC.INC.p_to_late = { cat: 'E', pts: -3, t: ATC.T('늦은 기수 들기'), les: 'app' };
  ATC.INC.p_to_fast = { cat: 'S', pts: -3, t: ATC.T('기수를 너무 빨리 듦'), les: 'app' };
  ATC.INC.p_to_slowrot = { cat: 'E', pts: -2, t: ATC.T('기수를 너무 천천히 듦'), les: 'app' };
  ATC.INC.p_to_tail = { cat: 'S', pts: -15, t: ATC.T('꼬리 접촉(테일 스트라이크)'), les: 'app' };
  ATC.INC.p_to_slow = { cat: 'S', pts: -6, t: ATC.T('초기 상승 속도 부족(V2 미만)'), les: 'app' };
  ATC.INC.p_to_stall = { cat: 'S', pts: -10, t: ATC.T('실속 경고'), les: 'app' };
  ATC.INC.p_to_help = { cat: 'S', pts: -5, t: ATC.T('부기장이 조종을 인수함'), les: 'app' };
  ATC.INC.p_to_sink = { cat: 'S', pts: -8, t: ATC.T('이륙 후 재접지'), les: 'app' };
  ATC.INC.p_taxi_ok = { cat: 'P', pts: 2, t: ATC.T('직접 지상 이동'), les: 'gnd' };
  ATC.INC.p_fpl_bad = { cat: 'P', pts: -3, t: ATC.T('맞지 않는 비행계획'), les: 'del' };
  ATC.INC.p_sq_ok = { cat: 'P', pts: 1, t: ATC.T('트랜스폰더 설정'), les: 'del' };
  ATC.INC.p_sq_bad = { cat: 'P', pts: -3, t: ATC.T('트랜스폰더 잘못 설정'), les: 'del' };
  ATC.DepPilot = DepPilot;
})();
