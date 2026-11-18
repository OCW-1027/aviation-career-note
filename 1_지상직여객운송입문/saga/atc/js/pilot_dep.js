/* AIRLINE SAGA — ATC 조종사 체험 출발편(2-C): 하네다 Vela Air 787 출발기의 조종사
   D1(비행허가 시뮬레이션): 주기장 3D · 비행계획(자동 기본, 목적지 · SID · 순항 고도 바꾸기) · 허가 요청 · 허가 복창 · 트랜스폰더 · Ground 주파수
   D2(지상관제 시뮬레이션으로 이어 달리기): 푸시백 요청 · 승인 복창 · 주차 브레이크 · 엔진 시동 · 플랩 · 지상 이동 요청 · 경로 복창 · 자동 지상 이동 · 활주로 앞 정지 · 횡단 · 대기 지점 · Tower 주파수
   D3 ~ D4(이륙 · 출발 · 지역관제)는 다음 판. 복창 · 첫 호출 처리는 도착편(ATC.Pilot)의 것을 그대로 씀.
   단계가 바뀌면 그 관제석의 시뮬레이션을 새로 띄우고(ATC.DepPilot.relay — ui.js가 정함) 비행계획 · 허가 · 점수를 넘김 */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt;
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
    if (c) { f = this.f = c.f; this.fp = c.fp; this.standK = c.standK; this.xpdr = c.xpdr; this.sid = c.sid; this.cur = c.cur; this.mcp = c.mcp; this.depFq = c.depFq; this.nRb = c.nRb; this.nRbOk = c.nRbOk; this.rt = c.rt; this.sq = c.ac.squawk; this.tAcc = (c.tAcc || 0) + c.sim.t; sim.usedCs[f.cs] = 1; }
    else {
      f = sim.mkFlight(function (a) { return a.code === 'VLA'; }, 'dep');
      f.type = 'B789'; if (D.types && D.types.B789) f.perf = D.types.B789; f.wake = 'H';
      this.f = f; this.fp = this.autoPlan();
    }
    sim.isFinished = function () { return this.pilot.done; };
    if (sim.mode === 'GND') { this.initGnd(!c); return; }
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
    this.setGnd();
    this.mcp = { hdg: hdg, alt: D.sidInit || 9000, spd: 250 };
  };
  DepPilot.prototype.note = function (t, k) { this.own = 1; this.sim.sys(t, k); this.own = 0; };
  DepPilot.prototype.setGnd = function () { this.gnd = GZ[D.stands[this.standK].grp] || { n: 'Tokyo Ground', fq: (D.freq.GND || {}).fq }; };
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
      if (c.k === 'push') { self.pushCmd = c; self.todoT = sim.t; return; }      /* 푸시백 승인 — 주차 브레이크를 풀어야 움직임 */
      if (c.k === 'taxi') { var vv = (c.via || []).slice(); if (vv[vv.length - 1] === c.hp) vv.pop(); self.taxi = { via: vv, hp: c.hp, rwy: c.rwy, hs: c.hs || '' }; }      /* 화면 표시용: 마지막 유도로 이름 = 대기 지점이면 한 번만 */
      sim.applyAll(ac, [c]);
    });
    this.bump();
  };
  DepPilot.prototype.known = function (cmds) {      /* 이미 복창하고 아직 하지 않았을 뿐인 지시는 다시 말하지 않음 */
    var c = cmds[0] || {};
    if (c.k === 'push') return !!this.pushCmd;
    if (c.k === 'ho') return !!(this.freqTo && !this.freqTo.sent);
    return false;
  };
  DepPilot.prototype.onClr = function (cmds, o) {
    var self = this, sim = this.sim, ac = this.ac;
    if (this.prompt || !this.ci) { ac.botT = sim.t - 34; return false; }      /* 내 교신(요청 · 보고)을 아직 보내지 않음 → 관제사는 기다렸다가 곧 다시 */
    cmds = cmds.map(function (c) {
      if (c.k === 'ho' && c.to === 'GND') return { k: 'ho', to: self.gnd, key: 'GND' };
      if (c.k === 'rbok' && !self.depSaid && D.freq.DEP) { self.depSaid = true; self.depFq = D.freq.DEP.fq; return { k: 'rbok', then: 'departure frequency ' + D.freq.DEP.fq }; }      /* 출발 주파수는 미리 알려 줌(GPT 14차 R14-03) */
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
    if (c0.k === 'push') ['north', 'south', 'east', 'west'].forEach(function (f) { if (f !== c0.face) alt.push(rb({ face: f })); });
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
    alt = shuffle(alt).filter(function (t) { if (!t || t === ok || seen[t]) return false; seen[t] = 1; return true; }).slice(0, 2);
    if (!alt.length) return ATC.Pilot.prototype.rbOpts.call(this, cmds, ph);
    return shuffle([{ t: ok, ok: true }].concat(alt.map(function (t) { return { t: t, ok: false }; })));
  };
  DepPilot.prototype.freqOpts = function () {
    var f = this.freqTo, o = [{ to: 'OK', n: f.n, fq: f.fq }], other = GX.filter(function (x) { return x !== f.fq; });
    if (f.to === 'TWR') { o.push({ to: 'X1', n: f.n, fq: '124.35' }); o.push({ to: 'X2', n: this.gnd.n, fq: this.gnd.fq }); }      /* 124.35도 실제 Tokyo Tower 주파수 — 이번에 지시받은 값이 아니라서 오답(GPT 15차 F15-02) */
    else { o.push({ to: 'X1', n: f.n, fq: other[0] }); if (D.freq.TWR) o.push({ to: 'X2', n: D.freq.TWR.n, fq: D.freq.TWR.fq }); }
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
    if (this.phase === 'gnd') { if (this.manUsed && !sim.incs.some(function (e) { return /^p_(taxi_off|taxi_fast|taxi_close|hold_bust)$/.test(e.code); })) sim.inc('p_taxi_ok', [ac], ATC.T('{0}: 직접 지상 이동 — 경로 · 정지 지점을 지켰습니다.', ac.cs)); if (this.fly.on) { this.fly.on = false; ac.manTaxi = false; } sim.applyAll(ac, [{ k: 'ho', to: 'TWR' }]); this.finish(2); return; }
    if (this.xpdr.want && !this.xpdr.set) { this.xpdr.set = this.xpdr.code = this.xpdr.want; sim.inc('p_set_late', [ac], ATC.T('{0}: 트랜스폰더를 넣지 않아 부기장이 {1}을(를) 넣었습니다.', ac.cs, this.xpdr.want)); }
    sim.applyAll(ac, [{ k: 'ho', to: 'GND' }]);
    if (DepPilot.relay) { this.phase = 'relay'; this.bump(); DepPilot.relay(this, 'GND'); } else this.finish(1);      /* 화면이 있으면 지상관제 시뮬레이션으로 이어 감 */
  };
  DepPilot.prototype.finish = function (stage) {
    this.done = true; this.phase = 'end'; this.stage = stage || 1;
    this.note(stage === 2 ? ATC.T('지정받은 Tower 주파수로 바꿨습니다 — 출발편 2단계(푸시백 · 지상 이동) 끝. 하네다 Tower는 활주로 · 시간대에 따라 주파수가 여럿이라, 늘 관제가 불러 준 값으로 맞춥니다(118.10은 이 게임의 이번 비행 값).') : ATC.T('Ground 주파수로 바꿨습니다 — 출발편 1단계(비행계획 · 허가) 끝. 푸시백 · 지상 이동 · 이륙은 다음 판에서 이어집니다.'), 'good'); this.bump();
  };

  /* ================= D2: 지상(푸시백 · 엔진 시동 · 지상 이동) ================= */
  DepPilot.prototype.initGnd = function (fresh) {
    var sim = this.sim, f = this.f, fp = this.fp, sk, sd, ac, d;
    if (fresh) { sk = this.standFor(); this.sid = D.sidName ? D.sidName(fp.gate, sim.flow) : fp.gate; this.sq = sim.squawk(); this.xpdr = { code: this.sq, set: this.sq, entry: '', want: this.sq }; this.cur.alt = D.sidInit || 9000; this.mcp = { hdg: 0, alt: D.sidInit || 9000, spd: 250 }; this.depFq = D.freq.DEP ? D.freq.DEP.fq : ''; }
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
    var sim = this.sim, KT = ATC.KT || 0.5144, R2D = 180 / Math.PI;
    sim.acs.forEach(function (a) {
      if (a.u === undefined) return;
      var p = D.uv2xy(a.u, a.v), q = D.uv2xy(a.u + a.du * 100, a.v + a.dv * 100), h = U.n360(Math.atan2(q.x - p.x, q.y - p.y) * R2D);
      if (a.hdg === undefined || !dt || a.manTaxi || a.st === 'final' || a.st === 'roll' || a.st === 'air' || a.st === 'land') a.hdg = h;
      else { var df = ((h - a.hdg + 540) % 360) - 180, mx = (a.st === 'push' || a.st === 'start' ? 7 : 16) * dt; a.hdg = U.n360(a.hdg + Math.max(-mx, Math.min(mx, df))); }
      a.x = p.x; a.y = p.y; a.agl = true; a.gs = a.ias = (a.spd || 0) / KT; a.vs = a.st === 'air' ? (a.perf.climb || 2000) : a.st === 'final' ? -700 : 0;
    });
  };
  /* 조종석에서 할 일(차례대로 하나씩) */
  DepPilot.prototype.todo = function () {
    var ac = this.ac, e = this.eng;
    if (this.phase !== 'gnd' || !ac) return null;
    if (this.pushCmd) return { k: 'brake', t: ATC.T('주차 브레이크 풀기 — 푸시백 시작'), why: ATC.T('푸시백 승인을 복창했습니다. 지상 요원에게 알리고 주차 브레이크를 풉니다.') };
    if ((ac.st === 'push' || ac.st === 'start') && e.st === 'off') return { k: 'eng', t: ATC.T('엔진 시동(양쪽)'), why: ATC.T('푸시백 중에 엔진을 겁니다. 787은 두 엔진을 함께 걸 수 있습니다.') };
    if (ac.st === 'start' && e.st === 'on' && this.cfg.flap !== 5) return { k: 'flap', t: ATC.T('플랩 5 — 이륙 형상'), why: ATC.T('지상 이동을 요청하기 전에 이륙 플랩을 맞춥니다.') };
    return null;
  };
  DepPilot.prototype.act = function (k, fo) {
    var sim = this.sim, ac = this.ac, td = this.todo(); if (!td || td.k !== k) return;
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
  DepPilot.prototype.manKey = function (k) { if (k === 'z' && this.phase === 'gnd') { this.manTaxi(); return true; } return false; };
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
    if (ac.st !== 'taxi') return ac.st === 'athold' ? ATC.T('정지 중 — 다음 허가를 기다립니다') : ATC.T('지상 이동 허가를 받으면 움직일 수 있습니다');
    var tn = N[ac.path[ac.pi]], prev = ac.pi > 0 ? N[ac.path[ac.pi - 1]] : N[ac.node], nx = ac.pi + 1 < ac.path.length ? N[ac.path[ac.pi + 1]] : null, t = Math.round(ac.spd / KT) + 'kt';
    var sd = 0, i, a, b, tw = ''; for (i = ac.pi; i < ac.path.length; i++) { a = i === ac.pi ? ac : N[ac.path[i - 1]]; b = N[ac.path[i]]; sd += Math.hypot(a.u - b.u, a.v - b.v); if (ac.hs[ac.path[i]] !== undefined || i === ac.path.length - 1) break; }
    if (tn && prev && nx) { var c = (tn.u - prev.u) * (nx.v - tn.v) - (tn.v - prev.v) * (nx.u - tn.u), dt2 = (tn.u - prev.u) * (nx.u - tn.u) + (tn.v - prev.v) * (nx.v - tn.v), ang = Math.atan2(c, dt2) * 180 / Math.PI; if (Math.abs(ang) > 25) { tn.adj.forEach(function (x) { if (x.to === nx.id) tw = x.e.name || ''; }); t += ' · ' + ATC.T('{0}m 앞 {1}{2}', Math.round(M.d || 0), ang > 0 ? ATC.T('왼쪽') : ATC.T('오른쪽'), tw ? ' ' + tw : ''); } }
    t += ' · ' + ATC.T('정지 지점까지 {0}m', Math.round(sd)); if (M.off > 18) t += ' · ' + ATC.T('경로에서 {0}m', Math.round(M.off));
    if (ac.spd < 0.2 && this.fly.th < 0.03) t += ' · ' + (this.fly.gp ? ATC.T('RT로 추력') : ATC.T('W · 추력 레버를 올리면 출발'));
    return t;
  };
  /* 3D에 그릴 남은 경로(해리 좌표) */
  DepPilot.prototype.routePts = function () {
    var ac = this.ac, N = D.gN; if (this.phase !== 'gnd' || !ac || !ac.path || ac.pi >= ac.path.length || !(ac.st === 'taxi' || ac.st === 'athold')) return null;
    var pts = [D.uv2xy(ac.u, ac.v)], i, n, stopI = -1; for (i = ac.pi; i < ac.path.length; i++) { n = N[ac.path[i]]; pts.push(D.uv2xy(n.u, n.v)); if (stopI < 0 && (ac.hs[ac.path[i]] !== undefined || i === ac.path.length - 1)) stopI = pts.length - 1; }
    return { key: ac.path.length + ':' + ac.pi + ':' + ac.st, pts: pts, stop: stopI };
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
  DepPilot.prototype.gear = function () { };
  DepPilot.prototype.flap = function () { };
  DepPilot.prototype.cockpit = function () { };
  DepPilot.prototype.setFly = function () { };
  DepPilot.prototype.curText = function () { if (this.phase === 'gnd') return this.gndText(); return this.sid ? this.sid + ' · ' + fmt.alt(this.cur.alt) : ATC.T('허가 전'); };
  DepPilot.prototype.tick = function () {
    var sim = this.sim, ac = this.ac, self = this, dt = Math.max(0, Math.min(2, sim.t - (this.lastT === undefined ? sim.t : this.lastT))); this.lastT = sim.t;
    if (ATC.AI && !this.done && (this.phase === 'del' || this.phase === 'gnd')) ATC.AI.run(sim.mode, sim);
    if (!ac || this.done) return;
    if (this.phase === 'gnd') this.tickGnd(dt);
    var c = this.clr, RB_T = 14;
    if (c && c.t0 !== null && !c.late && sim.t - c.t0 > RB_T) { c.late = true; sim.inc('p_rb_late', [ac], ATC.T('{0}: 복창이 늦습니다 — 관제 지시에는 바로 복창합니다.', ac.cs)); }
    if (c && c.t0 !== null && sim.t - c.t0 > RB_T + 20 && !c.rep) { c.rep = true; c.opts = null; c.t0 = null; sim.enq({ who: 'atc', ac: ac, text: ac.csWord + ' ' + ac.num + ', I say again, ' + c.ph.atc.split(', ').slice(1).join(', '), onDone: function () { if (self.clr === c) { c.t0 = sim.t; c.opts = self.rbOpts(c.cmds, c.ph); self.bump(); } } }); this.bump(); }
    var x = this.xpdr; if (x.want && !x.set && sim.t - x.t > SQ_T && !x.late) { x.late = true; x.set = x.code = x.want; sim.inc('p_set_late', [ac], ATC.T('{0}: 트랜스폰더를 {1}초 안에 넣지 않아 부기장이 넣었습니다.', ac.cs, SQ_T)); this.bump(); }
    if (this.prompt && !this.prompt.late && sim.t - this.prompt.t0 > 40) { this.prompt.late = true; sim.inc('p_ci_late', [ac], ATC.T('{0}: 교신이 늦었습니다.', ac.cs)); }
    if (this.freqTo && !this.freqTo.sent && !this.freqTo.late && sim.t - this.freqTo.t > 30) { this.freqTo.late = true; sim.inc('p_freq_late', [ac], ATC.T('{0}: 주파수 바꾸기가 늦었습니다.', ac.cs)); }
  };
  ATC.INC.p_taxi_off = { cat: 'E', pts: -5, t: ATC.T('지상 이동 경로 이탈'), les: 'gnd' };
  ATC.INC.p_taxi_fast = { cat: 'S', pts: -3, t: ATC.T('지상 이동 과속'), les: 'gnd' };
  ATC.INC.p_taxi_close = { cat: 'S', pts: -8, t: ATC.T('지상에서 다른 항공기에 접근'), les: 'gnd' };
  ATC.INC.p_hold_bust = { cat: 'S', pts: -15, t: ATC.T('정지선 통과'), les: 'gnd' };
  ATC.INC.p_taxi_ok = { cat: 'P', pts: 2, t: ATC.T('직접 지상 이동'), les: 'gnd' };
  ATC.INC.p_fpl_bad = { cat: 'P', pts: -3, t: ATC.T('맞지 않는 비행계획'), les: 'del' };
  ATC.INC.p_sq_ok = { cat: 'P', pts: 1, t: ATC.T('트랜스폰더 설정'), les: 'del' };
  ATC.INC.p_sq_bad = { cat: 'P', pts: -3, t: ATC.T('트랜스폰더 잘못 설정'), les: 'del' };
  ATC.DepPilot = DepPilot;
})();
