/* AIRLINE SAGA — ATC 조종사 체험 2-B: 직접 조종(수동 비행) · 착륙 평가
   - 조종 방식: auto(자동조종 · 자동 착륙) / last(1,000ft에서 자동조종이 풀림 → 직접 착륙) / full(처음부터 직접)
   - 비행 움직임: 787-9 착륙 무게(190t) 기준 질점 모델 — 양력 · 항력(플랩 · 기어) · 추력(엔진 반응 지연) · 바람.
     게임 단순화: 조종간을 놓으면 기수 각 · 경사를 그대로 유지(실제 787은 속도 안정 · 비행경로 보상 — GPT ATC-13차 F13-01)
   - 비행 지시기(FD): 지정 기수/경로 · 고도, ILS(로컬라이저 · 활공각), 50ft 아래 플레어 안내
   - 착륙 평가: 접지 충격(ft/min) · 중심선 · 접지 거리 · 속도 · 기수 각 · 경사 · 옆 미끄러짐, 활주로 밖 접지는 사고
   조작: 키보드(방향키 · W/S 추력 · Z 자동조종 · T 자동추력), 게임패드, 화면 조종간(3D 조종석) */
(function () {
  'use strict';
  var ATC = window.ATC, D = ATC.D, U = ATC.U, D2R = Math.PI / 180, G = 9.81, KT = 0.5144, NM = 1852, FT = 0.3048;
  var MASS = 190000, AREA = 360, CLA = 0.095, KI = 0.05, TMAX = 2 * 320000;
  var FL = [0, 1, 5, 15, 20, 25, 30], CL0 = [0.25, 0.42, 0.58, 0.75, 0.86, 0.98, 1.1], CDF = [0, 0.004, 0.01, 0.022, 0.03, 0.042, 0.055];
  var M = { MODES: ['auto', 'last', 'full'] };
  function tab(a, f) { for (var i = 1; i < FL.length; i++) if (f <= FL[i]) return a[i - 1] + (a[i] - a[i - 1]) * (f - FL[i - 1]) / (FL[i] - FL[i - 1]); return a[a.length - 1]; }
  function sig(h) { return Math.pow(Math.max(0.2, 1 - 6.875e-6 * h), 4.256); }
  function aero(cf, ias, alpha, ra) {
    var cl = tab(CL0, cf.flapPos) + CLA * Math.min(alpha, 15) - (alpha > 15 ? 0.07 * (alpha - 15) : 0);
    var gd = cf.gear === 'down' ? 0.02 : cf.gear === 'transit' ? 0.012 : 0, ge = ra < 120 ? 1 - 0.35 * (1 - Math.max(0, ra) / 120) : 1;      /* 지면 효과: 30m(날개폭 절반) 아래 유도 항력 감소 */
    var cd = 0.022 + tab(CDF, cf.flapPos) + gd + KI * cl * cl * ge, q = 0.5 * 1.225 * Math.pow(ias * KT, 2);
    return { L: q * AREA * cl * (ra < 120 ? 1 + 0.06 * (1 - Math.max(0, ra) / 120) : 1), Dr: q * AREA * cd };
  }
  function thrust(thr, alt) { return TMAX * Math.pow(Math.max(0, thr), 1.5) * Math.pow(sig(alt), 0.7); }
  function trim(ias, alt, cf, gam) {
    var q = 0.5 * 1.225 * Math.pow(ias * KT, 2), W = MASS * G, a = U.clamp((W * Math.cos(gam) / (q * AREA) - tab(CL0, cf.flapPos)) / CLA, -2, 14);
    var T = aero(cf, ias, a, 9999).Dr + W * Math.sin(gam);
    return { alpha: a, thr: Math.pow(U.clamp(T / thrust(1, alt), 0, 1), 1 / 1.5) };
  }
  M.pref = function (m) { var K = 'acn_atc_fly_v1'; try { if (m) localStorage.setItem(K, m); else m = localStorage.getItem(K); } catch (e) { } return M.MODES.indexOf(m) >= 0 ? m : 'auto'; };
  M.newFly = function () { return { mode: 'auto', on: false, used: false, at: true, k: { pitch: 0, roll: 0, thr: 0, rud: 0 }, t: { pitch: 0, roll: 0, rud: 0 }, in: { pitch: 0, roll: 0 }, th: 0.3, thr: 0.3, pitch: 0, bank: 0, gam: 0, alpha: 3, dev: {} }; };

  /* 자동조종 해제 → 직접 조종: 지금 비행 상태 그대로(받음각 · 추력 균형) 넘겨받음 */
  M.engage = function (p, why) {
    var ac = p.ac, F = p.fly, sim = p.sim; if (!ac || ac.gone || F.on || p.roll || p.done) return;
    var vt = Math.max(60, ac.ias * (1 + ac.alt / 1000 * 0.0165)) * KT, gam = Math.asin(U.clamp((ac.vs || 0) * FT / 60 / vt, -0.3, 0.3)), tr = trim(ac.ias, ac.alt, p.cfg, gam);
    var vis = ATC.Cockpit && ATC.Cockpit.dbg && ATC.Cockpit.on ? ATC.Cockpit.dbg().vis : null;
    F.on = true; F.used = true; F.gam = gam; F.alpha = tr.alpha; F.pitch = gam / D2R + tr.alpha; F.bank = vis ? U.clamp(vis.bank, -25, 25) : 0; F.th = F.thr = tr.thr; F.trk = ac.hdg; F.beta = 0; F.t0 = sim.t; F.dev = {};
    if (why === 'last' || ac.appr && ac.appr.loc) { p.mcp.spd = ac.perf.vapp; F.at = true; }
    ac.man = F; p.apOff = (p.apOff || 0) + 1;
    sim.sys(why === 'last' ? ATC.T('{0}: 1,000ft — 자동조종 해제. 직접 착륙하세요(방향키 · 화면 조종간). 자동추력이 접근 속도 {1}kt를 지킵니다.', ac.cs, ac.perf.vapp) : ATC.T('{0}: 자동조종 해제 — 직접 조종합니다(방향키 · 화면 조종간 · 게임패드).', ac.cs), 'alert');
    if (!p.flyTip) { p.flyTip = true; sim.sys(ATC.T('게임에서는 조종간을 놓으면 지금 자세를 유지합니다(실제 787은 속도 안정과 비행경로 보상을 함께 합니다). 자홍색 막대는 게임 조종 도움 표시로, 실제 FD와 다릅니다.'), 'info'); }
    if (ATC.CkSnd && ATC.CkSnd.wail) ATC.CkSnd.wail();
    p.bump();
  };
  /* 자동조종 다시 연결: MCP에 넣어 둔 기수 · 고도 · 속도(ILS가 잡혀 있으면 접근)를 따라감 */
  M.release = function (p) {
    var ac = p.ac, F = p.fly; if (!F.on || !ac || p.roll) return;
    F.on = false; ac.man = null; ac.tIas = p.mcp.spd || ac.ias; if (p.gaPh && F.mode === 'last') F.used = false;      /* 복행 중에 A/P 연결 → 재접근 때 다시 1,000ft부터 직접 */ if (ac.nav && ac.nav.mode === 'hdg' && !(ac.appr && ac.appr.loc)) ac.tHdg = p.mcp.hdg;
    p.sim.sys(ATC.T('{0}: 자동조종 연결 — MCP 설정대로 비행합니다.', ac.cs), 'info'); p.bump();
  };
  M.toggleAP = function (p) { if (p.fly.on) M.release(p); else M.engage(p, 'btn'); };
  M.toggleAT = function (p) { var F = p.fly; F.at = !F.at; if (!F.at) F.atOffT = p.sim.t; p.sim.sys(F.at ? ATC.T('자동추력(A/T) 연결 — MCP 속도 {0}kt', p.mcp.spd) : ATC.T('자동추력(A/T) 해제 — 추력을 직접 조절하세요(W/S · 추력 레버)'), 'info'); p.bump(); };

  /* 게임패드: 왼쪽 스틱 = 조종간(당기면 기수 올림), RT/LT = 추력, A = 자동조종, Y = 기어, LB/RB = 플랩 */
  function pad(F, p) {
    var o = { pitch: 0, roll: 0, thr: 0, rud: 0 }; if (typeof navigator === 'undefined' || !navigator.getGamepads) return o;
    var gs = navigator.getGamepads(), g = null; for (var i = 0; gs && i < gs.length; i++) if (gs[i] && gs[i].connected) { g = gs[i]; break; }
    if (!g) return o; var dz = function (v) { return Math.abs(v) < 0.12 ? 0 : (v - Math.sign(v) * 0.12) / 0.88; };
    o.roll = dz(g.axes[0] || 0); o.pitch = dz(g.axes[1] || 0); o.rud = dz(g.axes[2] || 0);      /* 오른쪽 스틱 좌우 = 러더 */
    var b = g.buttons, bv = function (i) { return b[i] ? (b[i].value !== undefined ? b[i].value : b[i].pressed ? 1 : 0) : 0; };
    o.thr = bv(7) - bv(6);
    var pr = F.gpPrev || {}, now = { a: bv(0) > 0.5, y: bv(3) > 0.5, lb: bv(4) > 0.5, rb: bv(5) > 0.5 };
    if (now.a && !pr.a) M.toggleAP(p); if (now.y && !pr.y) p.gear(); if (now.lb && !pr.lb) p.flap(-1); if (now.rb && !pr.rb) p.flap(1);
    F.gpPrev = now; F.gp = true; return o;
  }
  function runwayAt(x, y, hdg) {      /* (x, y)가 있는 활주로: { e: 착륙 방향 끝(기수와 같은 쪽), len, along, xtk } */
    var best = null;
    Object.keys(D.rw || {}).forEach(function (k) {
      var r = D.rw[k], a = D.ends[r.a], b = D.ends[r.b]; if (!a || !b || !a.thr || !b.thr) return;
      var len = Math.hypot(a.thr.x - b.thr.x, a.thr.y - b.thr.y), hw = (r.width || 45) / 2 / NM;
      [a, b].forEach(function (e) { if (hdg !== undefined && Math.abs(U.adiff(hdg, e.crs)) > 90) return; var g = ATC.ilsGeom({ x: x, y: y }, e), al = -g.d; if (al > -0.03 && al < len + 0.03 && Math.abs(g.xtk) < hw && (!best || Math.abs(g.xtk) < Math.abs(best.xtk))) best = { e: e, len: len, along: al, xtk: g.xtk, hw: hw }; });
    });
    return best;
  }

  M.step = function (ac, dt) { var n = Math.max(1, Math.ceil(dt / 0.1 - 1e-6)), h = dt / n; for (var i = 0; i < n && ac.man && !ac.gone; i++) sub(ac, h); };
  function sub(ac, dt) {
    var F = ac.man, sim = ac.sim, p = sim.pilot, cf = p.cfg, elev = D.airport.elev, ra = ac.alt - elev, gp = pad(F, p);
    var ip = U.clamp(F.k.pitch + F.t.pitch + gp.pitch, -1, 1), ir = U.clamp(F.k.roll + F.t.roll + gp.roll, -1, 1); F.in.pitch = ip; F.in.roll = ir;
    /* 자세: 조종간 → 기수 각 · 경사 변화율(놓으면 유지) */
    F.pitch = U.clamp(F.pitch + ip * 3 * dt, -12, 22);
    if (Math.abs(ir) > 0.02) F.bank = U.clamp(F.bank + ir * 12 * dt, -60, 60);
    else if (Math.abs(F.bank) > 35) F.bank -= Math.sign(F.bank) * 4 * dt;      /* 경사 보호(게임 단순화): 35°를 넘긴 채 놓으면 30°대로 돌아옴 */
    else if (Math.abs(F.bank) > 30 && F.bankBack) F.bank -= Math.sign(F.bank) * 4 * dt;
    else if (Math.abs(F.bank) < 1) F.bank *= Math.max(0, 1 - dt * 0.4);
    F.bankBack = Math.abs(ir) <= 0.02 && (Math.abs(F.bank) > 35 || F.bankBack && Math.abs(F.bank) > 30);
    /* 추력 */
    var thIn = U.clamp(F.k.thr + gp.thr, -1, 1);
    if (thIn) { if (F.at) { F.at = false; F.atOffT = sim.t; sim.sys(ATC.T('자동추력(A/T) 해제 — 추력을 직접 조절합니다.'), 'info'); p.bump(); } F.th = U.clamp(F.th + thIn * 0.35 * dt, 0, 1); }
    var gam = F.gam, alpha = F.pitch - gam / D2R, ae = aero(cf, ac.ias, alpha, ra), W = MASS * G;
    if (F.at) {
      if (ra < 25 && ac.appr) F.th = 0;      /* 플레어: 자동추력이 25ft에서 아이들로(RETARD) */
      else { var vt0 = p.mcp.spd || ac.perf.vapp; if (ac.appr && ac.appr.loc && ac.appr.d !== undefined) vt0 = Math.min(vt0, Math.max(ac.perf.vapp, ac.appr.d < 4.6 ? ac.perf.vapp : ac.appr.d < 9 ? 180 : 210)); var ades = U.clamp((vt0 - ac.ias) * 0.12, -1.5, 0.8) * KT;      /* 최종 접근에서는 자동조종 때와 같은 속도 계획(9NM 180 · 4.6NM 접근 속도) */ F.th = Math.pow(U.clamp((ae.Dr + W * Math.sin(gam) + MASS * ades) / thrust(1, ac.alt), 0, 1), 1 / 1.5); }
    }
    F.thr += (F.th - F.thr) * Math.min(1, dt * (F.th > F.thr ? 0.45 : 0.8));      /* 엔진 반응 지연 */
    var T = thrust(F.thr, ac.alt), vt = Math.max(30, ac.ias * (1 + ac.alt / 1000 * 0.0165)) * KT, nz = ae.L / W;
    gam = U.clamp(gam + G / vt * (nz * Math.cos(F.bank * D2R) - Math.cos(gam)) * dt, -0.45, 0.45);
    /* 러더(게임 단순화): 옆미끄럼각 β만큼 기수만 돌림 — 비행 방향(공기에 대한 진행 방향 ψ)은 경사로만 바뀜. 옆바람 접지 직전 디크랩용 */
    var ru = U.clamp((F.k.rud || 0) + (F.t.rud || 0) + (gp.rud || 0), -1, 1), b0 = F.beta || 0, psi = U.n360(ac.hdg - b0), bt = ra < 2500 ? ru * 12 : ru * 4;
    F.beta = b0 + U.clamp(bt - b0, -8 * dt, 8 * dt); F.ru = ru;
    psi = U.n360(psi + G / vt * nz * Math.sin(F.bank * D2R) / Math.cos(gam) * dt / D2R); ac.hdg = U.n360(psi + F.beta);
    ac.ias = Math.max(70, ac.ias + ((T - ae.Dr) / MASS - G * Math.sin(gam)) / KT * dt);
    F.gam = gam; F.alpha = alpha; F.nz = nz;
    var vsm = vt * Math.sin(gam); ac.vs = vsm / FT * 60; ac.alt += vsm / FT * dt;
    var w = sim.wind || { dir: 0, spd: 0 }, hv = vt / KT * Math.cos(gam) * Math.cos(F.beta * D2R), vx = Math.sin(psi * D2R) * hv - Math.sin(w.dir * D2R) * w.spd, vy = Math.cos(psi * D2R) * hv - Math.cos(w.dir * D2R) * w.spd;
    ac.x += vx / 3600 * dt; ac.y += vy / 3600 * dt; ac.gs = Math.hypot(vx, vy); F.trk = U.n360(Math.atan2(vx, vy) / D2R);
    ac.tHdg = ac.tHdg || ac.hdg;
    /* 경로(LNAV): 지점을 지나면 다음 지점(FD 안내용) */
    var nav = ac.nav; if (nav && nav.mode === 'route') { var fn = ac.nextFix(); if (fn && U.dist(ac, D.fix[fn]) < 1.2) { nav.i++; if (sim.onFix) sim.onFix(ac, fn); if (nav.i >= nav.route.length) { nav.mode = 'hdg'; p.mcp.hdg = Math.round(ac.hdg / 5) * 5 || 360; if (sim.onRouteEnd) sim.onRouteEnd(ac, fn); } } }      /* 경로 끝: 지금 기수를 MCP에(시작 때 기수로 되돌아가지 않게) */
    /* ILS 포착 표시(관제탑 이양 흐름용) — 자동조종처럼 끌어가지는 않음 */
    var ap = ac.appr; ra = ac.alt - elev;
    if (ap) { var e = D.ends[ap.rwy], g = ATC.ilsGeom(ac, e); ap.d = g.d; ap.xtk = g.xtk; if (!ap.loc && g.d > 0.5 && g.d < 25 && Math.abs(g.xtk) < 0.4 && Math.abs(U.adiff(ac.hdg, e.crs)) < 35) { ap.loc = true; nav.mode = 'loc'; if (sim.onLoc) sim.onLoc(ac); } if (ap.loc) { var ga = ATC.gsAlt(g.d); ap.gs = Math.abs(ac.alt - ga) < 150; } }
    /* 접지 · 지나침 */
    if (ra <= 0) { touch(ac, F, p); return; }
    if (ap && ap.loc && ap.d < -0.3 && ra >= 400) { end(p, 'p_ld_miss', ATC.T('{0}: 활주로 위를 {1}ft 높이로 지나쳤습니다 — 착륙 실패(활공각을 따라 내려와야 합니다).', ac.cs, Math.round(ra / 10) * 10)); return; }
    var dA = Math.hypot(ac.x, ac.y); F.minD = Math.min(F.minD === undefined ? dA : F.minD, dA);
    if (ap && dA > 35 && dA > F.minD + 15) { end(p, 'p_ld_miss', ATC.T('{0}: 공항에서 35NM 넘게 멀어졌습니다 — 착륙 실패.', ac.cs)); return; }      /* 접근 허가 뒤 가장 가까웠던 곳에서 15NM 넘게 멀어진 경우만(먼 곳에서 시작해 들어오는 중은 아님 — 29차 결과) */
    var er = D.ends[ap ? ap.rwy : ac.rwy];
    if (er && ra < 400) { var rr = runwayAt(ac.x, ac.y, ac.hdg); if (rr && rr.e === er && rr.along > rr.len - 0.05) { end(p, 'p_ld_miss', ATC.T('{0}: 활주로 끝까지 접지하지 못하고 지나쳤습니다 — 착륙 실패.', ac.cs)); return; } }
  }
  function xwind(sim, e) { var w = sim.wind || { dir: 0, spd: 0 }; return w.spd * Math.sin(U.adiff(w.dir, e.crs) * D2R); }
  function end(p, code, text) { var ac = p.ac, sim = p.sim; sim.inc(code, [ac], text); p.fly.on = false; ac.man = null; p.crash = code === 'p_ld_crash'; sim.remove(ac, true); p.done = true; sim.sys(text, 'alert'); p.bump(); }
  function touch(ac, F, p) {
    var sim = p.sim, r = runwayAt(ac.x, ac.y, ac.hdg), want = D.ends[ac.appr ? ac.appr.rwy : ac.rwy];
    ac.alt = D.airport.elev;
    if (!r) { end(p, 'p_ld_crash', ATC.T('{0}: 활주로 밖에 접지했습니다 — 사고(기체 손상).', ac.cs)); return; }
    var td = { vs: Math.round(ac.vs), cl: Math.round(r.xtk * NM / FT), dist: Math.round(r.along * NM / FT), ias: Math.round(ac.ias), vref: ac.perf.vapp - 5, pitch: Math.round(F.pitch * 10) / 10, bank: Math.round(F.bank * 10) / 10, crab: Math.round(U.adiff(ac.hdg, r.e.crs)), xw: Math.round(xwind(sim, r.e)), rwy: r.e.id, wrong: want && r.e.id !== want.id, gp: !!F.gp };
    p.land = td; F.on = false; ac.man = null;
    if (ac.appr) ac.appr.rwy = r.e.id; else ac.rwy = r.e.id;
    p.touchdown(); M.grade(p, td);
  }
  /* 착륙 평가 */
  M.grade = function (p, td) {
    var sim = p.sim, ac = p.ac, cs = ac.cs, s = -td.vs, w;
    if (td.wrong) sim.inc('p_ld_wrong', [ac], ATC.T('{0}: 허가받은 활주로가 아닌 {1}에 착륙했습니다.', cs, td.rwy));
    if (s <= 240) { w = ATC.T('아주 부드러운 착륙'); sim.inc('p_ld_soft', [ac], ATC.T('{0}: 아주 부드러운 접지 — {1}ft/min.', cs, s)); }
    else if (s <= 420) { w = ATC.T('좋은 착륙'); sim.inc('p_ld_ok', [ac], ATC.T('{0}: 좋은 접지 — {1}ft/min.', cs, s)); }
    else if (s <= 600) { w = ATC.T('단단한 착륙'); sim.inc('p_ld_firm', [ac], ATC.T('{0}: 단단한 접지 — {1}ft/min(승객이 느낄 정도).', cs, s)); }
    else if (s <= 900) { w = ATC.T('거친 착륙'); sim.inc('p_ld_hard', [ac], ATC.T('{0}: 거친 착륙 — {1}ft/min. 게임의 거친 착륙 등급입니다(실제 점검 여부는 조종사 보고와 기종별 정비 절차로 판단).', cs, s)); }
    else { w = ATC.T('매우 거친 착륙'); sim.inc('p_ld_hard2', [ac], ATC.T('{0}: 매우 거친 착륙 — {1}ft/min. 게임의 가장 낮은 착륙 등급입니다(실제 점검 여부는 조종사 보고와 기종별 정비 절차로 판단).', cs, s)); }
    if (td.pitch > 9.5) sim.inc('p_ld_tail', [ac], ATC.T('{0}: 기수 {1}°로 접지 — 게임의 테일 스트라이크 위험 기준(9.5°)을 넘었습니다.', cs, td.pitch));
    else if (td.pitch < 0) sim.inc('p_ld_nose', [ac], ATC.T('{0}: 기수를 낮춘 위험한 접지 자세(기수 {1}°) — 플레어가 부족합니다.', cs, td.pitch));
    if (Math.abs(td.bank) > 7) sim.inc('p_ld_wing', [ac], ATC.T('{0}: 경사 {1}°로 접지 — 날개 끝 · 엔진이 활주로에 닿을 위험.', cs, Math.abs(td.bank)));
    if (Math.abs(td.cl) > 35) sim.inc('p_ld_cl', [ac], ATC.T('{0}: 중심선에서 {1}ft 벗어나 접지했습니다.', cs, Math.abs(td.cl)));
    else if (Math.abs(td.cl) > 15) sim.inc('p_ld_cl2', [ac], ATC.T('{0}: 중심선에서 {1}ft 벗어나 접지했습니다.', cs, Math.abs(td.cl)));
    if (td.dist < 500) sim.inc('p_ld_short', [ac], ATC.T('{0}: 활주로 시단에서 {1}ft — 게임의 목표 접지 위치(1,000 ~ 2,500ft)보다 일찍 접지했습니다.', cs, td.dist));
    else if (td.dist > 3500) sim.inc('p_ld_long', [ac], ATC.T('{0}: 시단에서 {1}ft — 접지 구역(시단부터 3,000ft)을 지나 접지했습니다(남은 활주로가 줄어듦).', cs, td.dist));
    else if (td.dist > 2500) sim.inc('p_ld_long2', [ac], ATC.T('{0}: 시단에서 {1}ft — 게임의 목표 접지 위치보다 조금 늦게 접지했습니다.', cs, td.dist));
    if (td.ias < td.vref - 5) sim.inc('p_ld_slow', [ac], ATC.T('{0}: 접지 속도 {1}kt — 기준 속도(Vref {2}kt)보다 느립니다.', cs, td.ias, td.vref));
    else if (td.ias > td.vref + 20) sim.inc('p_ld_fast', [ac], ATC.T('{0}: 접지 속도 {1}kt — 기준 속도(Vref {2}kt)보다 많이 빠릅니다.', cs, td.ias, td.vref));
    if (Math.abs(td.crab) > 6) sim.inc('p_ld_crab', [ac], ATC.T('{0}: 접지 때 기수와 활주로 방향 차이 {1}° — 옆바람에서는 접지 직전에 러더(Q · E 키 · 화면 러더 버튼)로 기수를 활주로 방향에 맞춥니다(디크랩). 그대로 접지하면 바퀴 · 착륙장치에 옆으로 힘이 걸립니다.', cs, Math.abs(td.crab)));
    else if (Math.abs(td.xw) >= 15 && Math.abs(td.crab) <= 4) sim.inc('p_ld_decrab', [ac], ATC.T('{0}: 옆바람 {1}kt에서 기수를 활주로 방향에 맞춰 접지했습니다(디크랩).', cs, Math.abs(td.xw)));
    td.word = w; p.bump();
  };
  /* 직접 조종 중 확인: 지정 고도 · 기수 벗어남, 500ft 안정 접근 */
  M.check = function (p) {
    var F = p.fly, ac = p.ac, sim = p.sim; if (!F.on || !ac || ac.gone) return;
    var dv = F.dev, ap = ac.appr, onApp = ap && ap.loc, ra = ac.alt - D.airport.elev, c = p.cur;
    if (c.alt && !onApp) {
      var da = Math.abs(ac.alt - c.alt); if (dv.altV !== c.alt) { dv.altV = c.alt; dv.altIn = false; dv.altT = null; }
      if (da < 150) { dv.altIn = true; dv.altT = null; } else if (dv.altIn && da > 300) { if (dv.altT === null) dv.altT = sim.t; else if (sim.t - dv.altT > 15) { sim.inc('p_dev', [ac], ATC.T('{0}: 지정 고도 {1}에서 {2}ft 벗어났습니다.', ac.cs, ATC.fmt.alt(c.alt), Math.round(da / 10) * 10)); dv.altIn = false; dv.altT = null; } }
    }
    if (c.hdg && ac.nav && ac.nav.mode === 'hdg' && !ap) {      /* 접근 허가 뒤(로컬라이저로 돌아 들어가는 중)는 보지 않음 */
      var dh = Math.abs(U.adiff(F.trk || ac.hdg, c.hdg)); if (dv.hdgV !== c.hdg) { dv.hdgV = c.hdg; dv.hdgIn = false; dv.hdgT = null; }
      if (dh < 10) { dv.hdgIn = true; dv.hdgT = null; } else if (dv.hdgIn && dh > 25) { if (dv.hdgT === null) dv.hdgT = sim.t; else if (sim.t - dv.hdgT > 20) { sim.inc('p_dev', [ac], ATC.T('{0}: 지정 기수 {1}에서 {2}° 벗어났습니다.', ac.cs, ATC.fmt.hdg(c.hdg), Math.round(dh))); dv.hdgIn = false; dv.hdgT = null; } }
    }
    if (onApp && ra < 2500 && !dv.spdTip && (p.mcp.spd || 0) > ac.perf.vapp + 25) { dv.spdTip = true; sim.sys(ATC.T('{0}: 최종 접근 — 착륙 플랩을 내리고 MCP 속도를 접근 속도 {1}kt로 줄이세요(자동추력이 따라감).', ac.cs, ac.perf.vapp), 'info'); }
    var gate = sim.lvp || sim.pwx && sim.pwx.k === 'lowvis' ? 1000 : 500;      /* 안정 접근 기준 높이: 계기 기상(저시정) 1,000ft · 시계 기상 500ft(FSF ALAR) */
    if (onApp && ra < gate && ra > 50) {
      var e = D.ends[ap.rwy], g = ATC.ilsGeom(ac, e), gsd = (ac.alt - ATC.gsAlt(g.d)) / Math.max(40, g.d * 50), lcd = g.xtk / (0.6 * Math.max(0.15, g.d) / 10 + 0.02), vref = ac.perf.vapp - 5, why = [];
      if (ac.ias < vref || ac.ias > vref + 20) why.push(ATC.T('속도 {0}kt', Math.round(ac.ias)));
      if (Math.abs(gsd) > 1) why.push(ATC.T('활공각 {0}', gsd > 0 ? ATC.T('높음') : ATC.T('낮음')));
      if (Math.abs(lcd) > 1) why.push(ATC.T('로컬라이저 벗어남'));
      if (ac.vs < -1000) why.push(ATC.T('강하율 {0}ft/min', Math.round(-ac.vs)));
      if (p.cfg.gear !== 'down' || p.cfg.flapPos < 24.5) why.push(ATC.T('착륙 형태 미완'));
      if (!dv.st500) {      /* 기준 높이에서 처음 판정 */
        dv.st500 = true;
        if (why.length) { dv.unst = true; sim.inc('p_ld_unst', [ac], ATC.T('{0}: {1}ft에서 불안정 접근({2}) — 실제로는 복행(TO/GA)해야 합니다.', ac.cs, gate, why.join(' · '))); }
        else sim.inc('p_ld_stab', [ac], ATC.T('{0}: {1}ft 게임 안정 접근 검사 통과 — 실제 운항 기준 전체를 검사한 것은 아닙니다.', ac.cs, gate));
      } else if (why.length && !dv.unst) {      /* 기준 높이 아래에서 다시 불안정해짐 — 실제 권고는 바로 복행 */
        dv.unst = true; sim.inc('p_ld_unst', [ac], ATC.T('{0}: 기준 높이 아래에서 불안정해졌습니다({1}) — 실제로는 바로 복행(TO/GA)해야 합니다.', ac.cs, why.join(' · ')));
      }
    }
  };
  /* 복행(TO/GA): 조종사 체험(pilot.js goAround)이 맡음 — 공시 복행 절차 · 관제 보고 · 재접근 */
  M.goAround = function (p) { return p.goAround ? p.goAround('pilot') : false; };

  /* 비행 지시기: 목표 경사 · 기수 각과 지금의 차이(°) */
  M.fd = function (ac, p) {
    if (p.toFd) { var tf = p.toFd(ac); if (tf) return tf; }      /* 출발편 직접 이륙 */
    var F = p.fly, man = F.on, bank = man ? F.bank : (ATC.Cockpit && ATC.Cockpit.on && ATC.Cockpit.dbg().vis ? ATC.Cockpit.dbg().vis.bank : 0), trk = man ? F.trk : ac.hdg;
    var ap = ac.appr, e = D.ends[ap ? ap.rwy : ac.rwy], ra = ac.alt - D.airport.elev, tT, tb, gt, mode = 'HDG';
    var g = e ? ATC.ilsGeom(ac, e) : null, nav = ac.nav || {};
    if (ap && g && g.d > -0.5 && (ap.loc || Math.abs(g.xtk) < 1.6 && Math.abs(U.adiff(ac.hdg, e.crs)) < 70)) { tT = U.n360(e.crs - U.clamp(g.xtk * 60, -35, 35)); mode = 'LOC'; }
    else if (p.gaPh && !p.gaPh.vec && !ap) { tT = p.gaHdg(ra); mode = p.gaPh.turned ? 'LNAV' : 'TO/GA'; }      /* 복행: 공시 복행 경로(Approach가 기수를 줄 때까지) */
    else if (nav.mode === 'route' && ac.nextFix()) { tT = U.brg(ac, D.fix[ac.nextFix()]); mode = 'LNAV'; }
    else if (ap && g && !ap.loc && nav.mode !== 'route' && !p.asg.hdg && (!p.cur.hdg || Math.abs(g.xtk) < 6)) {      /* 접근 허가 뒤 경로가 끝났는데 아직 로컬라이저 밖: 최종 접근로로 들어가는 길 안내 */
      var cx = Math.sin(e.crs * D2R), cy = Math.cos(e.crs * D2R), dq = Math.max(6, g.d - 3), q = { x: e.thr.x - cx * dq, y: e.thr.y - cy * dq };
      tT = U.brg(ac, q); if (Math.abs(g.xtk) < 4 && g.d > 3) { var lim = 45, a = U.adiff(e.crs, tT); if (Math.abs(a) > lim) tT = U.n360(e.crs + Math.sign(a) * lim); }
      mode = 'LOC';
    }
    else tT = p.mcp.hdg || ac.hdg;
    tb = U.clamp(U.adiff(trk, tT) * 1.6, -25, 25);
    var vt = Math.max(60, ac.ias * (1 + ac.alt / 1000 * 0.0165)) * KT, gam = man ? F.gam / D2R : Math.atan2((ac.vs || 0) * FT / 60, vt) / D2R, vmode = 'ALT';
    if (ap && g && (ap.gs || (ap.loc && ac.alt - ATC.gsAlt(g.d) < 1500 && ac.alt - ATC.gsAlt(g.d) > -400))) { gt = -3 + U.clamp((ATC.gsAlt(g.d) - ac.alt) * 0.02, -1.5, 3); vmode = 'G/S';      /* 위에서 잡을 때도 최대 4.5° — 더 가파르면 속도가 붙음 */ if (ra < 45) { gt = -3 + (45 - Math.max(0, ra)) / 45 * 2.6; vmode = 'FLARE'; } }
    else { var err = (p.mcp.alt || ac.alt) - ac.alt, vs = U.clamp(err * 2.5, -2500, 2000); gt = Math.asin(U.clamp(vs * FT / 60 / vt, -0.3, 0.3)) / D2R; if (p.gaPh && err > 300) vmode = 'TO/GA'; }
    return { roll: U.clamp(tb - bank, -25, 25), pitch: U.clamp((gt - gam) * 1.6, -8, 8), lat: mode, ver: vmode };
  };

  /* ---- 화면: 키보드 · 화면 조종간 · 추력 레버 ---- */
  function cur() { var s = ATC.ui && ATC.ui.sim ? ATC.ui.sim() : null; return s && s.pilot && s.pilot.ac && !s.pilot.done ? s.pilot : null; }
  if (typeof window !== 'undefined' && window.addEventListener && typeof document !== 'undefined') {
    var keys = {};
    var KMAP = { arrowup: 1, arrowdown: 1, arrowleft: 1, arrowright: 1, w: 1, s: 1, q: 1, e: 1 };
    function sync(p) { var F = p.fly; F.k.pitch = (keys.arrowdown ? 1 : 0) - (keys.arrowup ? 1 : 0); F.k.roll = (keys.arrowright ? 1 : 0) - (keys.arrowleft ? 1 : 0); F.k.thr = (keys.w ? 1 : 0) - (keys.s ? 1 : 0); F.k.rud = (keys.e ? 1 : 0) - (keys.q ? 1 : 0); }
    window.addEventListener('keydown', function (e) {
      var t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      var p = cur(); if (!p) return; var k = e.key.toLowerCase();
      if (p.manKey) { if (p.manKey(k)) { e.preventDefault(); return; } if (k === 'z' || k === 't') return; }      /* 출발편 지상: Z = 지상 이동 직접 조종 */
      if (k === 'z') { M.toggleAP(p); e.preventDefault(); return; }
      if (k === 'd' && p.dhAsk && p.dhAsk()) { p.dhDecide('land'); e.preventDefault(); return; }      /* D = 결심 고도 「Landing」 */
      if (k === 'g' && p.gKeyGa && p.gKeyGa()) { p.goAround('pilot'); e.preventDefault(); return; }      /* G = TO/GA 복행(최종 접근 중 · 기어가 내려가 있을 때). 그 밖에는 ui.js가 기어로 처리 */
      if (k === 't' && p.fly.on) { M.toggleAT(p); return; }
      if (KMAP[k] && p.fly.on) { keys[k] = true; sync(p); e.preventDefault(); }
    }, true);
    window.addEventListener('keyup', function (e) { var k = e.key.toLowerCase(); if (!KMAP[k]) return; keys[k] = false; var p = cur(); if (p) sync(p); }, true);
    window.addEventListener('blur', function () { keys = {}; var p = cur(); if (p) sync(p); });
  }
  /* 3D 조종석 위 조종간 · 추력 레버(직접 조종 중에만 보임) */
  M.ui = function (host, p) {
    if (!host || typeof document === 'undefined') return;
    var F = p.fly, el = host.querySelector('.ckman');
    if (!el) {
      el = document.createElement('div'); el.className = 'ckman';
      el.innerHTML = '<div class="ckstick"><i></i><small>' + ATC.T('↓ 당기면 기수 올림') + '</small></div><div class="ckthr"><b></b><i></i><small>' + ATC.T('추력') + '</small></div><div class="ckhint"></div><div class="ckrud"><button type="button" data-r="-1">◀ ' + ATC.T('러더') + '</button><button type="button" data-r="1">' + ATC.T('러더') + ' ▶</button></div>';
      host.appendChild(el);
      var st = el.querySelector('.ckstick'), kn = st.querySelector('i'), drag = null;
      st.addEventListener('pointerdown', function (e) { e.stopPropagation(); e.preventDefault(); st.setPointerCapture(e.pointerId); drag = st.getBoundingClientRect(); mv(e); });
      function mv(e) { if (!drag) return; var r = drag.width / 2, dx = U.clamp((e.clientX - drag.left - r) / r, -1, 1), dy = U.clamp((e.clientY - drag.top - r) / r, -1, 1), q = cur(); kn.style.transform = 'translate(' + dx * r * 0.6 + 'px,' + dy * r * 0.6 + 'px)'; if (q) { q.fly.t.roll = dx * Math.abs(dx); q.fly.t.pitch = dy * Math.abs(dy); } }
      st.addEventListener('pointermove', function (e) { e.stopPropagation(); mv(e); });
      function up(e) { drag = null; kn.style.transform = ''; var q = cur(); if (q) { q.fly.t.roll = 0; q.fly.t.pitch = 0; } }
      st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
      var th = el.querySelector('.ckthr'), td = null;
      function tv(e) { var r = th.getBoundingClientRect(), v = U.clamp(1 - (e.clientY - r.top) / r.height, 0, 1), q = cur(); if (q) { if (q.noThr && q.noThr()) return; if (q.fly.at) M.toggleAT(q); q.fly.th = v; } }
      th.addEventListener('pointerdown', function (e) { e.stopPropagation(); e.preventDefault(); th.setPointerCapture(e.pointerId); td = 1; tv(e); });
      th.addEventListener('pointermove', function (e) { e.stopPropagation(); if (td) tv(e); });
      th.addEventListener('pointerup', function () { td = null; });
      [].forEach.call(el.querySelectorAll('.ckrud button'), function (b) {      /* 화면 러더: 누르고 있는 동안만 */
        function on(e) { e.stopPropagation(); e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) { } var q = cur(); if (q) q.fly.t.rud = +b.dataset.r; b.classList.add('on'); }
        function off(e) { var q = cur(); if (q) q.fly.t.rud = 0; b.classList.remove('on'); }
        b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
      });
    }
    el.hidden = !F.on;
    var sl = el.querySelector('.ckstick small'), slt = p.stickLbl ? p.stickLbl() : p.taxiHint ? ATC.T('좌우 방향 · ↓ 브레이크') : ATC.T('↓ 당기면 기수 올림'); if (sl.textContent !== slt) sl.textContent = slt;
    if (F.on) { var lv = el.querySelector('.ckthr i'); lv.style.bottom = (F.th * 100).toFixed(0) + '%'; el.querySelector('.ckthr b').style.height = (F.thr * 100).toFixed(0) + '%'; el.querySelector('.ckthr').classList.toggle('at', !!F.at); var h = el.querySelector('.ckhint'), ht = F.gp ? ATC.T('게임패드 · 스틱 조종 · RT/LT 추력 · A 자동조종') : window.matchMedia && matchMedia('(pointer: coarse)').matches ? ATC.T('왼쪽 조종간을 끌어 조종 · 오른쪽 레버로 추력 · 자홍색 게임 조종 도움 막대를 따라가세요(실제 FD와 다름)') : ATC.T('방향키 조종간 · W/S 추력 · Z 자동조종 · T 자동추력 · G 기어 · [ ] 플랩'); if (p.taxiHint) ht = p.taxiHint();
      var ac = p.ac, ap = ac && ac.appr, er = ap && D.ends[ap.rwy], cr = er ? U.adiff(ac.hdg, er.crs) : 0, rra = ac ? ac.alt - D.airport.elev : 9999;
      if (ap && ap.loc && rra < 200 && Math.abs(cr) > 4) ht = cr < 0 ? ATC.T('디크랩 — 왼쪽 러더(Q · ◀ 러더)로 기수를 활주로 방향에') : ATC.T('디크랩 — 오른쪽 러더(E · 러더 ▶)로 기수를 활주로 방향에');
      if (h.textContent !== ht) h.textContent = ht;
      var rd = el.querySelector('.ckrud'), rs = !p.dep && !!(ap || (p.sim.wind || {}).spd >= 10); if (rd.hidden === rs) rd.hidden = !rs; }
  };

  ATC.INC.p_ld_soft = { cat: 'P', pts: 2, t: ATC.T('아주 부드러운 착륙'), les: 'app' };
  ATC.INC.p_ld_ok = { cat: 'P', pts: 2, t: ATC.T('좋은 착륙'), les: 'app' };
  ATC.INC.p_ld_firm = { cat: 'S', pts: -2, t: ATC.T('단단한 착륙'), les: 'app' };
  ATC.INC.p_ld_hard = { cat: 'S', pts: -10, t: ATC.T('거친 착륙'), les: 'app' };
  ATC.INC.p_ld_hard2 = { cat: 'S', pts: -25, t: ATC.T('매우 거친 착륙'), les: 'app' };
  ATC.INC.p_ld_tail = { cat: 'S', pts: -15, t: ATC.T('테일 스트라이크 위험'), les: 'app' };
  ATC.INC.p_ld_nose = { cat: 'S', pts: -8, t: ATC.T('기수 낮은 접지'), les: 'app' };
  ATC.INC.p_ld_wing = { cat: 'S', pts: -12, t: ATC.T('큰 경사로 접지'), les: 'app' };
  ATC.INC.p_ld_cl = { cat: 'S', pts: -5, t: ATC.T('중심선에서 크게 벗어난 접지'), les: 'app' };
  ATC.INC.p_ld_cl2 = { cat: 'E', pts: -2, t: ATC.T('중심선에서 벗어난 접지'), les: 'app' };
  ATC.INC.p_ld_short = { cat: 'S', pts: -6, t: ATC.T('목표보다 이른 접지'), les: 'app' };
  ATC.INC.p_ld_long = { cat: 'S', pts: -6, t: ATC.T('긴 접지'), les: 'app' };
  ATC.INC.p_ld_long2 = { cat: 'E', pts: -2, t: ATC.T('조금 긴 접지'), les: 'app' };
  ATC.INC.p_ld_slow = { cat: 'S', pts: -4, t: ATC.T('접지 속도 부족'), les: 'app' };
  ATC.INC.p_ld_fast = { cat: 'E', pts: -3, t: ATC.T('접지 속도 과다'), les: 'app' };
  ATC.INC.p_ld_decrab = { cat: 'P', pts: 2, t: ATC.T('옆바람 디크랩 접지'), les: 'app' };
  ATC.INC.p_ld_crab = { cat: 'E', pts: -3, t: ATC.T('접지 시 기수 정렬각 큼'), les: 'app' };
  ATC.INC.p_ld_unst = { cat: 'S', pts: -5, t: ATC.T('불안정 접근'), les: 'app' };
  ATC.INC.p_ld_stab = { cat: 'P', pts: 2, t: ATC.T('게임 안정 접근 검사 통과'), les: 'app' };
  ATC.INC.p_ld_wrong = { cat: 'S', pts: -30, t: ATC.T('다른 활주로에 착륙'), les: 'app' };
  ATC.INC.p_ld_miss = { cat: 'S', pts: -20, t: ATC.T('착륙 실패(활주로 지나침)'), les: 'app' };
  ATC.INC.p_ld_crash = { cat: 'S', pts: -60, t: ATC.T('활주로 밖 접지(사고)'), les: 'app' };
  ATC.Manual = M;
})();
