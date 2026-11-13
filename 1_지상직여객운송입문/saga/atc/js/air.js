/* AIRLINE SAGA — ATC 공중 항공기 모델·레이더 분리 감시(접근관제·지역관제 공용) */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, D2R = Math.PI / 180;
  var GS_FT_NM = 318.4;   /* 3° 강하각: 1NM당 약 318ft */

  function Ac(sim, o) {
    this.id = sim.nextId++; this.sim = sim;
    for (var k in o) this[k] = o[k];
    this.perf = this.perf || D.types[this.type];
    this.tAlt = this.tAlt !== undefined ? this.tAlt : this.alt;
    this.tHdg = this.tHdg !== undefined ? this.tHdg : this.hdg;
    this.tIas = this.tIas !== undefined ? this.tIas : this.ias;
    this.spdAsg = this.spdAsg || 0;      /* 관제가 지정한 속도(0 = 제한 없음) */
    this.turnDir = 0; this.exp = false;
    this.nav = this.nav || { mode: 'hdg' };
    this.appr = null; this.hist = []; this.vs = 0; this.gs = this.ias;
    this.owner = this.owner || 'me';     /* in(이양 받는 중) / me / out(이양함) */
    this.born = sim.t;
  }
  Ac.prototype.tas = function () { return this.ias * (1 + this.alt / 1000 * 0.0165); };
  Ac.prototype.pos = function () { return { x: this.x, y: this.y }; };
  Ac.prototype.setRoute = function (fixes) { this.nav = { mode: 'route', route: fixes.slice(), i: 0 }; };
  Ac.prototype.nextFix = function () { return this.nav.mode === 'route' && this.nav.i < this.nav.route.length ? this.nav.route[this.nav.i] : null; };
  /* 활주로 접근 기하: d = 활주로 끝(시단)까지 남은 거리(NM), xtk = 중심선 오른쪽(+)/왼쪽(−) 편차(NM) */
  ATC.ilsGeom = function (p, end) {
    var dx = p.x - end.thr.x, dy = p.y - end.thr.y, cx = Math.sin(end.crs * D2R), cy = Math.cos(end.crs * D2R);
    return { d: -(dx * cx + dy * cy), xtk: dx * cy - dy * cx };
  };
  ATC.gsAlt = function (d) { return D.airport.elev + 50 + d * GS_FT_NM; };

  Ac.prototype.update = function (dt) {
    var sim = this.sim, p = this.perf, nav = this.nav, want, d, self = this;
    /* --- 항법 --- */
    if (nav.mode === 'route') {
      var fn = this.nextFix();
      if (fn) {
        var f = D.fix[fn]; d = U.dist(this, f);
        if (d < Math.max(0.7, this.gs / 3600 * 12)) {
          nav.i++; if (sim.onFix) sim.onFix(this, fn);
          if (nav.i >= nav.route.length) { nav.mode = 'hdg'; if (sim.onRouteEnd) sim.onRouteEnd(this, fn); }
        } else this.tHdg = U.brg(this, f);
      }
    } else if (nav.mode === 'hold') {
      var hf = D.fix[nav.fix]; nav.tm = (nav.tm || 0) + dt;
      if (nav.ph === 0) { this.tHdg = U.brg(this, hf); if (U.dist(this, hf) < 0.8) { nav.ph = 1; nav.inb = nav.inb !== undefined ? nav.inb : this.hdg; nav.tm = 0; this.tHdg = U.n360(nav.inb + 180); this.turnDir = 1; } }
      else if (nav.ph === 1) { if (nav.tm > 60 + 60) { nav.ph = 0; this.turnDir = 1; } }
    }
    /* --- ILS --- */
    var ap = this.appr;
    if (ap) {
      var end = D.ends[ap.rwy], g = ATC.ilsGeom(this, end); ap.d = g.d; ap.xtk = g.xtk;
      if (!ap.loc) {
        var ang = U.adiff(this.hdg, end.crs), r = this.gs / 188.5, lead = r * (1 - Math.cos(Math.min(Math.abs(ang), 89) * D2R)) + 0.08;
        var closing = (g.xtk > 0 && ang > 2) || (g.xtk < 0 && ang < -2) || Math.abs(g.xtk) < 0.15;
        var win = Math.max(lead, Math.abs(ang) < 12 ? 0.3 : 0);
        ap.minX = Math.min(ap.minX === undefined ? 99 : ap.minX, Math.abs(g.xtk));
        if (g.d > 1.5 && g.d < 25 && Math.abs(g.xtk) < win && Math.abs(ang) <= 60 && (closing || Math.abs(ang) < 12)) {
          ap.loc = true; nav.mode = 'loc'; ap.capAng = Math.abs(ang); ap.capD = g.d;
          if (sim.onLoc) sim.onLoc(this);
        } else if (!ap.fail && ((g.d < 1.2 && Math.abs(g.xtk) < 6) || (ap.minX < 0.6 && Math.abs(g.xtk) > ap.minX + 1.5))) {
          ap.fail = true; if (sim.onApprFail) sim.onApprFail(this, Math.abs(ang) > 60 ? 'angle' : 'miss');
        }
      }
      ap = this.appr;
      if (!ap) { /* 접근 취소됨 */ }
      else if (ap.loc) {
        this.tHdg = U.n360(end.crs - U.clamp(g.xtk * 45, -40, 40)); this.turnDir = 0;
        var ga = ATC.gsAlt(g.d);
        if (!ap.gs && this.alt <= ga + 80 && this.alt >= ga - 80) ap.gs = true;
        if (ap.gs) { if (this.alt > ga) this.alt = Math.max(ga, this.alt - 2200 / 60 * dt); else if (this.alt < ga - 80) ap.gs = false; this.tAlt = Math.min(this.tAlt, ga); }
        else if (this.alt > ga + 80) { this.tAlt = Math.min(this.tAlt, Math.max(ga, D.airport.elev)); this.descFast = true; }
        /* 속도 관리: 9NM 밖 210 이하, 9NM 안 180 이하, 4.6NM 안 최종 접근 속도 */
        var lim = g.d < 4.6 ? p.vapp : g.d < 9 ? 180 : 210;
        if (ap.minSpd) lim = p.vapp;
        var tg = (this.spdAsg && g.d >= 4.6) ? Math.min(lim, this.spdAsg) : lim;
        this.tIas = Math.max(p.vapp, tg);
        if (!ap.gs && g.d < 3.2 && this.alt > ga + 350 && !ap.failed) { ap.failed = true; if (sim.onApprFail) sim.onApprFail(this, 'high'); }
        if (g.d <= 0.05) { if (sim.onTouchdown) sim.onTouchdown(this); return; }
      }
    }
    /* --- 선회 --- */
    var rate = (this.alt > 20000 ? 1.6 : 3) * dt, df = U.adiff(this.hdg, this.tHdg);
    if (Math.abs(df) <= rate) { this.hdg = this.tHdg; this.turnDir = 0; }
    else {
      var dir = this.turnDir || (df > 0 ? 1 : -1);
      this.hdg = U.n360(this.hdg + dir * rate);
    }
    /* --- 고도 --- */
    var da = this.tAlt - this.alt;
    if (!(ap && ap.gs)) {
      if (Math.abs(da) > 1) {
        var vr = da > 0 ? p.climb * (this.alt > 28000 ? 0.45 : this.alt > 18000 ? 0.65 : this.alt > 10000 ? 0.85 : 1) : -p.desc * (this.alt < 10000 ? 0.8 : 1);
        if (this.exp || this.descFast) vr *= 1.5;
        var st = vr / 60 * dt; if (Math.abs(st) > Math.abs(da)) st = da;
        this.alt += st; this.vs = vr;
      } else { this.alt = this.tAlt; this.vs = 0; this.exp = false; }
    } else this.vs = -700;
    this.descFast = false;
    /* --- 속도 --- */
    var tgt = this.tIas;
    if (this.alt < 10000 && tgt > 250 && !this.fast) tgt = 250;
    var ds = tgt - this.ias, acc = (ds > 0 ? 1.6 : -1.3) * dt; if (Math.abs(acc) > Math.abs(ds)) acc = ds;
    this.ias += acc;
    /* --- 이동 --- */
    this.gs = this.tas();
    var mv = this.gs / 3600 * dt;
    this.x += Math.sin(this.hdg * D2R) * mv; this.y += Math.cos(this.hdg * D2R) * mv;
  };
  /* 레이더 갱신 주기마다 항적 점 기록 */
  Ac.prototype.blip = function () { this.hist.push({ x: this.x, y: this.y }); if (this.hist.length > 6) this.hist.shift(); this.rx = this.x; this.ry = this.y; this.ralt = this.alt; this.rgs = this.gs; this.rhdg = this.hdg; this.rvs = this.vs; };
  ATC.Ac = Ac;

  /* ---------- 레이더 관제 공통 ---------- */
  function RadarSim(o) {
    ATC.Sim.call(this, o);
    this.sweep = o.sweep || 4; this.sweepT = 0;
    this.minH = o.minH || 3; this.minV = 1000;
    this.pairs = {};     /* 분리 상태 */
    this.alerts = { ca: [], stca: [], msaw: [] };
  }
  ATC.extend(RadarSim, ATC.Sim);
  RadarSim.prototype.spawnAc = function (o) { var ac = new Ac(this, o); ac.blip(); this.acs.push(ac); this.total++; this.emit('spawn', ac); return ac; };
  RadarSim.prototype.moveAll = function (dt) {
    var i, acs = this.acs.slice();
    for (i = 0; i < acs.length; i++) if (!acs[i].gone) acs[i].update(dt);
    this.sweepT += dt;
    if (this.sweepT >= this.sweep) { this.sweepT = 0; for (i = 0; i < this.acs.length; i++) this.acs[i].blip(); this.sepCheck(); this.emit('sweep'); }
  };
  /* 분리 예외: 같은 ILS에 확립한 앞뒤 기체(후방난기류 기준 적용) · 평행 ILS 확립 · 이륙 직후 */
  /* 두 항공기에 적용할 분리 기준. null = 레이더 분리 판정에서 뺌(이 공항에 정한 절차상 분리가 있는 쌍만)
   *  ① 독립 평행 접근(D.indepParallel): 「서로 다른 물리 활주로 · 같은 운용 방향」의 로컬라이저에 둘 다 확립
   *  ② 관제탑 구역(D.twrZoneNM) 안의 활주로 분리 구간:
   *     - 이륙 직후(3,000ft 미만) ↔ 로컬라이저 확립기
   *     - 복행 직후(2,500ft 미만) ↔ 로컬라이저 확립기
   *     - 복행 직후 ↔ 이륙 직후는 서로 다른 물리 활주로일 때만(같은 활주로면 기본 분리)
   *  그 밖의 쌍은 모두 기본 분리. 같은 최종 접근로의 2.5NM은 둘 다 활주로 10NM 안일 때만(조건부 축소 분리) */
  function physRw(r) { var e = D.ends[r]; return e ? e.rw : r; }
  function inTwrZone(a) { return Math.sqrt(a.x * a.x + a.y * a.y) <= (D.twrZoneNM || 6); }
  RadarSim.prototype.pairRule = function (a, b) {
    if (a.onGround || b.onGround) return null;
    var la = a.appr && a.appr.loc, lb = b.appr && b.appr.loc, std = { h: this.minH, v: this.minV };
    if (la && lb) {
      var ea = D.ends[a.appr.rwy], eb = D.ends[b.appr.rwy];
      if (a.appr.rwy !== b.appr.rwy) { var sm = this.flow && this.flow.simul, ra = a.appr.rwy, rb = b.appr.rwy;   /* 동시 접근이 허용되는 쌍: 운용 방식에 적혀 있으면 그것, 없으면 나란한 활주로 */
          return (sm ? sm.some(function (p) { return p.indexOf(ra) >= 0 && p.indexOf(rb) >= 0; }) : D.indepParallel && D.rwRel(ra, rb) === 'parallel') ? null : std; }
      var lead = a.appr.d < b.appr.d ? a : b, fol = lead === a ? b : a;
      var w = (D.wakeNM[lead.wake] || {})[fol.wake] || 0, near = lead.appr.d < 10 && fol.appr.d < 10;
      return { h: Math.max(near ? 2.5 : this.minH, w), v: 1000, wake: w > 0, lead: lead, fol: fol, trail: true };
    }
    var da = a.justDep && a.alt < 3000 && inTwrZone(a), db = b.justDep && b.alt < 3000 && inTwrZone(b), ma = a.missed && a.alt < 2500 && inTwrZone(a), mb = b.missed && b.alt < 2500 && inTwrZone(b);
    if ((da && lb) || (db && la)) return null;
    if ((ma && lb) || (mb && la)) return null;
    if ((ma && db) || (mb && da)) return physRw(a.rwy) !== physRw(b.rwy) ? null : std;
    return std;
  };
  RadarSim.prototype.sepCheck = function () {
    var acs = this.acs, i, j, a, b, key, rule, dh, dv, st, ca = [], stca = [], look = this.level.stca;
    for (i = 0; i < acs.length; i++) for (j = i + 1; j < acs.length; j++) {
      a = acs[i]; b = acs[j]; key = a.id + '-' + b.id;
      if (a.owner === 'far' || b.owner === 'far') continue;
      rule = this.pairRule(a, b); if (!rule) { delete this.pairs[key]; continue; }
      dh = U.dist(a, b); dv = Math.abs(a.alt - b.alt);
      st = this.pairs[key] || (this.pairs[key] = { los: false, min: 99 });
      var viol = dh < rule.h - 0.02 && dv < rule.v - 100;
      if (viol) {
        ca.push([a, b]); st.min = Math.min(st.min, dh);
        if (!st.los) {
          st.los = true;
          if (rule.wake && dh >= 2.5) this.inc('wake', [rule.lead, rule.fol], ATC.T('{0}가 {1} {2} 뒤 {3}NM (기준 {4}NM)', rule.fol.cs, D.wakeName[rule.lead.wake], rule.lead.cs, dh.toFixed(1), rule.h));
          else this.inc('los', [a, b], ATC.T('{0} · {1} — {2}NM / {3}ft (기준 {4}NM 또는 {5}ft)', a.cs, b.cs, dh.toFixed(1), Math.round(dv / 100) * 100, rule.h, rule.v));
        }
        if (!st.nmac && dh < 0.6 && dv < 400) { st.nmac = true; this.inc('nmac', [a, b], ATC.T('{0} · {1} 충돌 직전까지 접근했습니다.', a.cs, b.cs)); }
      } else {
        if (st.los && (dh > rule.h + 0.3 || dv > rule.v)) st.los = false;
        if (!rule.trail && this.predict(a, b, rule, look)) stca.push([a, b]);
      }
    }
    this.alerts.ca = ca; this.alerts.stca = stca;
    /* MSAW: 최저 레이더 유도 고도 */
    var ms = [];
    for (i = 0; i < acs.length; i++) {
      a = acs[i]; if (a.onGround || (a.appr && a.appr.loc) || a.justDep && a.alt < 4000 || a.missed && a.alt < 3000 || a.owner !== 'me') continue;
      var need = this.mvaAt ? this.mvaAt(a) : 0;
      if (need && a.alt < need - 150) { ms.push(a); if (!a.msawHit) { a.msawHit = true; this.inc('terrain', [a], ATC.T('{0} {1}ft — 이 구역의 최저 고도는 {2}ft', a.cs, Math.round(a.alt / 100) * 100, need)); } }
      else if (need && a.alt >= need) a.msawHit = false;
    }
    this.alerts.msaw = ms;
  };
  RadarSim.prototype.predict = function (a, b, rule, secs) {
    var t, ax, ay, bx, by, aa, ba, sa = Math.sin(a.hdg * D2R), ca = Math.cos(a.hdg * D2R), sb = Math.sin(b.hdg * D2R), cb = Math.cos(b.hdg * D2R);
    for (t = 10; t <= secs; t += 10) {
      ax = a.x + sa * a.gs / 3600 * t; ay = a.y + ca * a.gs / 3600 * t; bx = b.x + sb * b.gs / 3600 * t; by = b.y + cb * b.gs / 3600 * t;
      aa = proj(a, t); ba = proj(b, t);
      if (Math.hypot(ax - bx, ay - by) < rule.h && Math.abs(aa - ba) < rule.v - 100) return true;
    }
    return false;
  };
  function proj(a, t) { var z = a.alt + a.vs / 60 * t; if (a.vs > 0) z = Math.min(z, a.tAlt); else if (a.vs < 0) z = Math.max(z, a.tAlt); return z; }
  /* 공통 지시 적용 */
  RadarSim.prototype.applyAir = function (ac, c) {
    switch (c.k) {
      case 'hdg': ac.nav = { mode: 'hdg' }; ac.tHdg = U.n360(c.v); ac.turnDir = c.dir === 'L' ? -1 : c.dir === 'R' ? 1 : 0; if (ac.appr && !c.keepAppr) ac.appr = ac.appr.loc ? null : ac.appr; ac.vec = true; return true;
      case 'alt': ac.tAlt = c.v; ac.exp = !!c.exp; ac.altAsgT = this.t; return true;
      case 'spd': ac.spdAsg = c.v || 0; ac.tIas = c.v || ac.normIas || 250; return true;
      case 'dct':
        var r = ac.fpRoute || [], i = r.indexOf(c.fix);
        ac.nav = { mode: 'route', route: i >= 0 ? r.slice(i) : [c.fix], i: 0 }; ac.turnDir = 0; if (ac.appr && !ac.appr.loc) { /* 접근 허가 유지 */ } return true;
      case 'ils': ac.appr = { rwy: c.rwy, loc: false, gs: false, clrT: this.t }; return true;
      case 'hold': ac.nav = { mode: 'hold', fix: c.fix, ph: 0 }; ac.holdT = this.t; return true;
      case 'xalt': ac.tAlt = c.v; ac.xalt = { fix: c.fix, v: c.v }; return true;
    }
    return false;
  };
  ATC.RadarSim = RadarSim;
})(typeof globalThis !== 'undefined' ? globalThis : this);
