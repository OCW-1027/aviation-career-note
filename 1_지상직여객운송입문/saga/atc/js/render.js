/* AIRLINE SAGA — ATC 화면 그리기: 레이더 스코프 · 지상 감시 화면 */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D, U = ATC.U, fmt = ATC.fmt, D2R = Math.PI / 180, NM = 1852;
  var R = ATC.R = {};
  var MONO = '"Roboto Mono","DejaVu Sans Mono","Consolas","Menlo",monospace';
  var C = R.C = {
    bg: '#05090e', ring: '#132030', map: '#1d3044', fix: '#4a6a86', fixT: '#6c8aa6', rwy: '#c8d6e4', loc: '#2f5273',
    mine: '#dff5e4', inn: '#ffd24a', out: '#647a8c', emg: '#ff6b6b', sel: '#4fd8ff', ca: '#ff3b3b', stca: '#ffae2b', dep: '#bfe0ff', arr: '#f7efc4',
    grass: '#18261b', grass2: '#1c2c1f', pave: '#3a4047', apron: '#474e56', rw: '#23272c', line: '#d2a92a', white: '#e9edf1', bld: '#70787f', bld2: '#8a939b'
  };

  /* 표지(라벨) 자리 잡기: 다른 표지·항공기 그림·고정 표시와 가장 덜 겹치는 자리를 고름. 한 번 정한 자리는 겹칠 때만 옮김 */
  function ov(ax, ay, aw, ah, bx, by, bw, bh) { var w = Math.min(ax + aw, bx + bw) - Math.max(ax, bx), h = Math.min(ay + ah, by + bh) - Math.max(ay, by); return w > 0 && h > 0 ? w * h : 0; }
  R.place = function (items, W, H, obs, selId) {
    var placed = [], order = items.slice().sort(function (a, b) { return (b.id === selId) - (a.id === selId) || a.id - b.id; }), BASE = [0, 30, 60, 30, 90, 90, 130, 130, 240, 270, 300, 270];
    order.forEach(function (it) {
      var g = it.g, w = it.w, h = it.h, px = it.px, py = it.py, f = 2.1, best = -1, bc = 1e12, c, i, k, x, y, cost;
      var cand = [[px + g, py - g - h], [px + g, py + g], [px - g - w, py + g], [px - g - w, py - g - h], [px + g + 8, py - h / 2], [px - g - 8 - w, py - h / 2], [px - w / 2, py - g - 10 - h], [px - w / 2, py + g + 10],
        [px + g * f, py - g * f - h], [px + g * f, py + g * f], [px - g * f - w, py + g * f], [px - g * f - w, py - g * f - h]];
      for (c = 0; c < cand.length; c++) {
        x = cand[c][0]; y = cand[c][1]; cost = BASE[c] + (c === it.prev ? 0 : 420);
        cost += 6 * (w * h - ov(x, y, w, h, 2, 2, W - 4, H - 4));
        for (i = 0; i < placed.length; i++) cost += 4 * ov(x, y, w, h, placed[i].x - 2, placed[i].y - 2, placed[i].w + 4, placed[i].h + 4);
        for (i = 0; i < items.length; i++) { k = items[i]; if (k !== it) cost += 3 * ov(x, y, w, h, k.px - k.r, k.py - k.r, k.r * 2, k.r * 2); }
        for (i = 0; i < obs.length; i++) cost += (obs[i].wt || 2) * ov(x, y, w, h, obs[i].x, obs[i].y, obs[i].w, obs[i].h);
        if (cost < bc) { bc = cost; best = c; }
      }
      it.pos = best; it.x = cand[best][0]; it.y = cand[best][1]; placed.push(it);
    });
  };
  function leader(ctx, it, col) { var tx = U.clamp(it.px, it.x, it.x + it.w), ty = U.clamp(it.py, it.y, it.y + it.h), d = Math.hypot(tx - it.px, ty - it.py) || 1, r0 = Math.min(it.r * 0.6, d); ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(it.px + (tx - it.px) / d * r0, it.py + (ty - it.py) / d * r0); ctx.lineTo(tx, ty); ctx.stroke(); }

  /* ================= 주변 지리(js/geo/<공항>.js — tools/gen_geo.py가 만듦) =================
     육지 다각형 · 해안선을 레이더 좌표(NM)로 Path2D에 한 번 담아 두고, 레이더 · 지상 화면에서 변환만 바꿔 그림 */
  var geoP = null, geoC = null, GEO = null;
  R.loadGeo = function (url) { if (typeof document === 'undefined' || !url) return; var el = document.createElement('script'); el.src = url; el.onload = geoSet; document.head.appendChild(el); };
  function geoSet() {
    var g = ATC.GEO && ATC.GEO[ATC.aptId]; if (!g || typeof Path2D === 'undefined') return;
    var pp = new Path2D(), cc = new Path2D();
    g.land.forEach(function (pg) { pg.forEach(function (r) { pp.moveTo(r[0], r[1]); for (var i = 2; i < r.length; i += 2) pp.lineTo(r[i], r[i + 1]); pp.closePath(); }); });
    g.coast.forEach(function (l) { cc.moveTo(l[0], l[1]); for (var i = 2; i < l.length; i += 2) cc.lineTo(l[i], l[i + 1]); });
    geoP = pp; geoC = cc; GEO = g;
  }
  R.geoReady = function () { return !!geoP; };
  /* m = [a, b, c, d, e, f]: 레이더 좌표(NM) → 화면 · k = NM 하나가 화면에서 몇 px인지(선 굵기 맞춤) */
  function seaVeil(ctx, m, col) { ctx.save(); ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]); var p = new Path2D(); p.rect(-600, -600, 1200, 1200); p.addPath(geoP); ctx.fillStyle = col; ctx.fill(p, 'evenodd'); ctx.restore(); }
  function geoFill(ctx, m, k, land, coast, cw) { ctx.save(); ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]); ctx.fillStyle = land; ctx.fill(geoP, 'nonzero'); if (coast) { ctx.strokeStyle = coast; ctx.lineWidth = cw / k; ctx.lineJoin = 'round'; ctx.stroke(geoC); } ctx.restore(); }
  /* 지명: 겹치면 덜 중요한 것을 뺌 · toS = 레이더 좌표 → 화면 */
  function geoLabels(ctx, toS, W, H, k, col) {
    if (!GEO || !GEO.lab) return; var used = [], rank = { city: 0, apt: 1, peak: 1, sea: 2, town: 3 };
    ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    GEO.lab.slice().sort(function (a, b) { return rank[a[3]] - rank[b[3]]; }).forEach(function (t) {
      if (t[3] === 'town' && k < 1.6) return;
      var p = toS(t[1], t[2]); if (p[0] < -80 || p[0] > W + 80 || p[1] < -20 || p[1] > H + 20) return;
      var tx = t[3] === 'peak' ? '▲ ' + t[0] : t[3] === 'apt' ? '✈ ' + t[0] : t[0], sz = t[3] === 'city' ? 11 : t[3] === 'sea' ? 11 : 10;
      ctx.font = (t[3] === 'sea' ? 'italic ' : t[3] === 'city' ? '600 ' : '') + sz + 'px ' + MONO; var w = ctx.measureText(tx).width + 8;
      for (var i = 0; i < used.length; i++) { var q = used[i]; if (Math.abs(q[0] - p[0]) * 2 < q[2] + w && Math.abs(q[1] - p[1]) < sz + 4) return; }
      used.push([p[0], p[1], w]); ctx.fillStyle = t[3] === 'sea' ? col[1] : col[0]; ctx.fillText(tx, p[0], p[1]);
    });
    ctx.restore();
  }
  R.geoRadar = function (ctx, v, W, H) { if (!geoP) return; var k = v.scale; geoFill(ctx, [k, 0, 0, -k, W / 2 - v.cx * k, H / 2 + v.cy * k], k, '#0a1513', '#1a3530', 1); };
  /* 지도 자료 출처(실제 지형을 쓴 공항만) — 화면 오른쪽 아래에 작게 */
  R.geoCredit = function (ctx, W, H, col) { if (!geoP || !GEO.src) return; ctx.save(); ctx.font = '9px ' + MONO; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = col; ctx.fillText(GEO.src, W - 8, H - 5); ctx.restore(); };
  R.geoRadarLabels = function (ctx, v, W, H) { if (!geoP) return; geoLabels(ctx, function (x, y) { return rs(v, W, H, { x: x, y: y }); }, W, H, v.scale, ['#26433c', '#1d3848']); };

  /* ================= 레이더 ================= */
  /* 공항 묶음이 처음 보일 범위(D.appView · D.accView = 가운데와 폭 · 높이, NM)를 정했으면 그것에 맞춤 */
  R.radarView = function (mode) { var pv = mode === 'ACC' ? D.accView : D.appView, c = pv || { cx: 0, cy: 0 }; return mode === 'ACC' ? { cx: c.cx, cy: c.cy, scale: 3.1, min: 0.6, max: 14 } : { cx: c.cx, cy: c.cy, scale: 8.2, min: 1, max: 40 }; };
  R.fitRadar = function (v, W, H, mode) { var pv = mode === 'ACC' ? D.accView : D.appView, ext = pv ? [pv.w, pv.h] : mode === 'ACC' ? [286, 216] : [98, 98]; v.scale = Math.min(W / ext[0], H / ext[1]); v.cx = pv ? pv.cx : 0; v.cy = pv ? pv.cy : 0; };
  function poly(ctx, v, W, H, pts) { ctx.beginPath(); pts.forEach(function (pt, ix) { var pp = rs(v, W, H, pt); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.closePath(); }
  function path(ctx, v, W, H, names) { ctx.beginPath(); names.forEach(function (n, ix) { var pp = rs(v, W, H, D.fix[n]); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.stroke(); }
  function rs(v, W, H, p) { return [W / 2 + (p.x - v.cx) * v.scale, H / 2 - (p.y - v.cy) * v.scale]; }
  R.radarToWorld = function (v, W, H, sx, sy) { return { x: (sx - W / 2) / v.scale + v.cx, y: -(sy - H / 2) / v.scale + v.cy }; };
  R.rs = rs;

  R.drawRadar = function (ctx, W, H, app) {
    var sim = app.sim, v = app.view, acc = sim.mode === 'ACC', i, p, q, k, now = performance.now();
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    R.geoRadar(ctx, v, W, H); R.geoRadarLabels(ctx, v, W, H); R.geoCredit(ctx, W, H, 'rgba(120,150,160,.55)');                                  /* 주변 육지 · 해안선 · 지명(맨 아래 층) */
    ctx.lineWidth = 1; ctx.font = '10px ' + MONO; ctx.textBaseline = 'middle';
    var o = rs(v, W, H, { x: 0, y: 0 });
    /* 거리 원 */
    ctx.strokeStyle = C.ring; var step = acc ? 50 : 10, maxR = acc ? 200 : 60;
    for (i = step; i <= maxR; i += step) { ctx.beginPath(); ctx.arc(o[0], o[1], i * v.scale, 0, 7); ctx.stroke(); ctx.fillStyle = '#22364a'; ctx.fillText(i, o[0] + 3, o[1] - i * v.scale + 7); }
    if (acc) {
      /* 구역 경계 · 항로 · TMA */
      var B = D.acc, a = rs(v, W, H, { x: B.x1, y: B.y2 }), b = rs(v, W, H, { x: B.x2, y: B.y1 });
      ctx.strokeStyle = '#2c5a7c'; ctx.setLineDash([10, 5]); ctx.lineWidth = 1.4; ctx.strokeRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); ctx.setLineDash([]);
      ctx.fillStyle = '#2c5a7c'; ctx.font = '11px ' + MONO; if (D.accLabel) ctx.fillText(D.accLabel, a[0] + 8, b[1] - 10); else ctx.fillText('SEIRA FIR / ACC', a[0] + 8, a[1] + 12);
      [['W', B.x1 - 2, 0, 'right'], ['E', B.x2 + 2, 0, 'left'], ['N', 0, B.y2 + 5, 'center'], ['S', 0, B.y1 - 5, 'center']].forEach(function (s) { var pp = rs(v, W, H, { x: s[1], y: s[2] }); ctx.textAlign = s[3]; ctx.fillStyle = '#35556f'; ctx.fillText(D.neighbor[s[0]].n.toUpperCase(), pp[0], pp[1]); }); ctx.textAlign = 'left';
      ctx.strokeStyle = C.map; ctx.lineWidth = 1;
      D.airways.forEach(function (aw) { ctx.beginPath(); aw.f.forEach(function (n, ix) { var pp = rs(v, W, H, D.fix[n]); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.stroke(); var m0 = D.fix[aw.f[0]], m1 = D.fix[aw.f[1]], mm = rs(v, W, H, { x: (m0.x * 2 + m1.x) / 3, y: (m0.y * 2 + m1.y) / 3 }); ctx.fillStyle = '#2b4860'; ctx.fillText(aw.n, mm[0] + 4, mm[1] - 6); });
      Object.keys(D.accArr).forEach(function (g) { D.accArr[g].forEach(function (bf) { if (bf.join) return; line(ctx, rs(v, W, H, D.fix[bf]), rs(v, W, H, D.fix[g]), '#172a3a', [3, 5]); }); });      /* 경로 전체를 적은 묶음은 항로 선으로 이미 그려짐 */
      Object.keys(D.accDep).forEach(function (g) { D.accDep[g].forEach(function (bf) { if (bf.join) return; line(ctx, rs(v, W, H, D.fix[g]), rs(v, W, H, D.fix[bf]), '#172a3a', [3, 5]); }); });
      ctx.strokeStyle = '#27506e'; ctx.setLineDash([4, 4]); if (D.tmaPoly) poly(ctx, v, W, H, D.tmaPoly); else { ctx.beginPath(); ctx.arc(o[0], o[1], D.tmaR * v.scale, 0, 7); } ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#27506e'; if (D.tmaPoly) { ctx.textAlign = 'center'; ctx.fillText(D.tmaName || D.airport.call.toUpperCase() + ' TMA', o[0], o[1] + 16); ctx.fillText(D.tmaLabel || 'SFC-' + ATC.fmt.alt(D.tmaTop), o[0], o[1] + 29); ctx.textAlign = 'left'; } else ctx.fillText(D.airport.call.toUpperCase() + ' TMA  SFC-' + ATC.fmt.alt(D.tmaTop), o[0] - 58, o[1] + D.tmaR * v.scale - 9);
      var rp = D.restricted.pts; ctx.beginPath(); rp.forEach(function (pt, ix) { var pp = rs(v, W, H, pt); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.closePath();
      if (sim.rActive) { ctx.fillStyle = 'rgba(255,70,70,.13)'; ctx.fill(); ctx.strokeStyle = '#ff5b5b'; } else ctx.strokeStyle = '#3a3140';
      ctx.setLineDash([5, 3]); ctx.stroke(); ctx.setLineDash([]); p = rs(v, W, H, rp[3]); ctx.fillStyle = sim.rActive ? '#ff7b7b' : '#4b4152'; ctx.fillText(D.restricted.n + (sim.rActive ? ' ACTIVE SFC-' + ATC.fmt.alt(D.restricted.top) : ''), p[0] + 4, p[1] + 10);
    } else {
      ctx.strokeStyle = '#27506e'; ctx.setLineDash([8, 5]); ctx.lineWidth = 1.3; if (D.tmaPoly) poly(ctx, v, W, H, D.tmaPoly); else { ctx.beginPath(); ctx.arc(o[0], o[1], D.tmaR * v.scale, 0, 7); } ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
      /* STAR · SID */
      var sts = [D.star[sim.flow.id]]; if (sim.rwChg) sts = [D.star[sim.rwChg.from.id], D.star[sim.rwChg.to.id]];      /* 활주로 전환 중에는 두 방향의 STAR를 모두 그림 */
      sts.forEach(function (st) { (sim.gates || Object.keys(st)).forEach(function (g) { if (!st[g]) return; ctx.strokeStyle = '#1b3348'; ctx.beginPath(); st[g].forEach(function (n, ix) { var pp = rs(v, W, H, D.fix[n]); if (ix) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }); ctx.stroke(); }); });
      var de = D.ends[sim.flow.dep], d3 = D.off(de.end, de.crs, 3);
      if (D.sidRoute) { ctx.strokeStyle = '#17304a'; ctx.setLineDash([2, 5]); ATC.depGates(sim.flow).forEach(function (g) { var rw = D.depRwyFor(sim.flow, g), e2 = D.ends[rw], sr = D.sidRoute(rw, g, sim), q0 = rs(v, W, H, D.off(e2.end, e2.crs, 1.2)); ctx.beginPath(); ctx.moveTo(q0[0], q0[1]); sr.forEach(function (n) { var pp = rs(v, W, H, D.fix[n]); ctx.lineTo(pp[0], pp[1]); }); ctx.stroke(); }); ctx.setLineDash([]); }
      else Object.keys(D.gateDest).forEach(function (g) { line(ctx, rs(v, W, H, d3), rs(v, W, H, D.fix[g]), '#15283a', [2, 5]); });
      /* MVA */
      D.mva.forEach(function (m) { var c = rs(v, W, H, m.c); ctx.strokeStyle = '#5a4a2a'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(c[0], c[1], m.r * v.scale, 0, 7); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#8a7340'; ctx.fillText('MVA ' + (m.alt / 100), c[0] - 18, c[1]); ctx.fillStyle = '#5a4a2a'; ctx.fillText('▲' + m.peak, c[0] - 16, c[1] + 12); });
      /* 로컬라이저(연장 중심선 15NM, 1NM 눈금) */
      Object.keys(D.ends).forEach(function (id) {
        var e = D.ends[id], act = (sim.rwys || []).indexOf(id) >= 0, LL = e.locLen || 16, t0 = rs(v, W, H, e.thr), t1 = rs(v, W, H, D.off(e.thr, e.crs + 180, LL));
        if (!act && id !== sim.flow.dep) return;
        if (act) { line(ctx, t0, t1, C.loc, [9, 4]); for (k = 2; k <= LL; k += 2) { var tp = D.off(e.thr, e.crs + 180, k), l1 = rs(v, W, H, D.off(tp, e.crs + 90, k % 10 === 0 ? 0.7 : 0.35)), l2 = rs(v, W, H, D.off(tp, e.crs - 90, k % 10 === 0 ? 0.7 : 0.35)); line(ctx, l1, l2, C.loc); } }
      });
    }
    /* 활주로 */
    ctx.strokeStyle = C.rwy; ctx.lineWidth = Math.max(1.6, v.scale * 0.05);
    Object.keys(D.rw).forEach(function (id) { var r = D.rw[id], a2 = rs(v, W, H, D.uv2xy(r.ua, r.va)), b2 = rs(v, W, H, D.uv2xy(r.ub, r.vb)); ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke(); });
    ctx.lineWidth = 1;
    /* 지점 */
    ctx.font = '10px ' + MONO;
    var fnames = Object.keys(D.fix), fdone = [];
    if (D.flyBy) { var rank = function (n) { var f = D.fix[n]; return f.k === 'in' || f.k === 'out' ? 0 : f.k === 'if' || f.k === 'faf' || f.k === 'bd' ? 1 : D.starAlt && D.starAlt[n] ? 2 : 3; }; fnames.sort(function (a, b) { return rank(a) - rank(b); }); }
    fnames.forEach(function (n) {
      var f = D.fix[n]; f._on = false; f._sx = undefined; if (acc ? (f.k === 'if' || f.k === 'faf' || f.k === 'base' || f.k === 'dw' || f.k === 'wp' || f.k === 'tt') : (f.k === 'bd' || f.k === 'en')) return;
      if (f.k === 'trn' && !(acc && (sim.pilot ? sim.pilot.ac && sim.pilot.ac.fpRoute && sim.pilot.ac.fpRoute.indexOf(n) >= 0 : true))) return;      /* transition 지점(BRUCE · LEWIS · SILVA): 지역관제 화면에만 — 조종사 체험에서는 내 경로에 있을 때만 */
      if (!acc && sim.fixUse && (f.k === 'wp' || f.k === 'tt') && !sim.fixUse[n]) return;      /* 이번 근무의 경로에 없는 지점은 그리지 않음 */
      if (!acc && (f.k === 'if' || f.k === 'faf')) { var own = Object.keys(D.ends).filter(function (id) { return D.ends[id].IF === n || D.ends[id].FAF === n; })[0]; if ((sim.rwys || []).indexOf(own) < 0) return; }
      if (!acc && (f.k === 'base' || f.k === 'dw')) { var used = false; (sim.rwChg ? [D.star[sim.rwChg.from.id], D.star[sim.rwChg.to.id]] : [D.star[sim.flow.id]]).forEach(function (ss) { Object.keys(ss).forEach(function (g) { if (ss[g].indexOf(n) >= 0) used = true; }); }); if (!used) return; }
      var pp = rs(v, W, H, f); if (pp[0] < -40 || pp[0] > W + 40 || pp[1] < -20 || pp[1] > H + 20) return;
      var col = f.k === 'in' ? '#7d8f4e' : f.k === 'out' ? '#4e7f8f' : C.fix; ctx.strokeStyle = col; ctx.fillStyle = col;
      if (f.k === 'tt') { ctx.beginPath(); ctx.arc(pp[0], pp[1], 1.6, 0, 7); ctx.fill(); f._sx = pp[0]; f._sy = pp[1]; if (app.hoverFix === n) { ctx.fillStyle = C.sel; ctx.fillText(n, pp[0] + 7, pp[1] - 6); } return; }      /* 이름 없는 경유점(TT…): 점만, 가리키면 이름 */
      ctx.beginPath(); if (f.k === 'vor') { ctx.arc(pp[0], pp[1], 4, 0, 7); } else { ctx.moveTo(pp[0], pp[1] - 4); ctx.lineTo(pp[0] + 4, pp[1] + 3); ctx.lineTo(pp[0] - 4, pp[1] + 3); ctx.closePath(); } ctx.stroke();
      var fy = pp[1] + (f.k === 'faf' ? 9 : -6), fw = n.length * 6.2 + 2, hid = false, li;
      if (app.hoverFix !== n && R._lab) for (li = 0; li < R._lab.length; li++) if (ov(pp[0] + 6, fy - 6, fw, 12, R._lab[li].x - 2, R._lab[li].y - 2, R._lab[li].w + 4, R._lab[li].h + 4) > 0) { hid = true; break; }
      if (D.flyBy) { if (app.hoverFix !== n && !hid) for (li = 0; li < fdone.length; li++) if (ov(pp[0] + 2, fy - 7, fw + 6, 14, fdone[li][0], fdone[li][1], fdone[li][2], 14) > 0) { hid = true; break; } if (!hid) fdone.push([pp[0] + 2, fy - 7, fw + 6 + (!acc && D.starAlt && D.starAlt[n] ? 22 : 0)]); }
      if (!hid) { ctx.fillStyle = app.hoverFix === n ? C.sel : (f.k === 'in' ? '#9bb062' : f.k === 'out' ? '#62a0b4' : C.fixT); ctx.fillText(n, pp[0] + 7, fy); if (!acc && D.starAlt && D.starAlt[n] && v.scale > 4.5) { ctx.fillStyle = '#3f6a54'; ctx.fillText(String(D.starAlt[n] / 100), pp[0] + 9 + fw, fy); } }      /* STAR의 고도 제한(백 ft) */
      f._sx = pp[0]; f._sy = pp[1]; f._on = !hid;
    });
    /* 악기상 */
    (sim.wx || []).forEach(function (w) { var c0 = rs(v, W, H, w), r2 = w.r * v.scale * 2.2, g2 = ctx.createRadialGradient(c0[0], c0[1], r2 * 0.3, c0[0], c0[1], r2); g2.addColorStop(0, 'rgba(60,200,90,.20)'); g2.addColorStop(1, 'rgba(60,200,90,0)'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(c0[0], c0[1], r2, 0, 7); ctx.fill(); });      /* 비구름 가장자리(약한 강수 — 녹색) */
    (sim.wx || []).forEach(function (w) { var c = rs(v, W, H, w), rr = w.r * v.scale, g = ctx.createRadialGradient(c[0], c[1], rr * 0.15, c[0], c[1], rr); g.addColorStop(0, 'rgba(255,60,60,.55)'); g.addColorStop(0.55, 'rgba(255,170,40,.32)'); g.addColorStop(1, 'rgba(240,220,60,.05)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c[0], c[1], rr, 0, 7); ctx.fill(); ctx.fillStyle = '#ffb347'; ctx.fillText('CB', c[0] - 6, c[1]); });
    /* 선택 항공기의 예정 경로 · 분리 원 */
    var sel = sim.byId(app.sel);
    if (sel && !sel.gone) {
      p = rs(v, W, H, { x: sel.rx, y: sel.ry });
      if (sel.nav.mode === 'route') { ctx.strokeStyle = 'rgba(79,216,255,.55)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(p[0], p[1]); for (i = sel.nav.i; i < sel.nav.route.length; i++) { q = rs(v, W, H, D.fix[sel.nav.route[i]]); ctx.lineTo(q[0], q[1]); } ctx.stroke(); ctx.setLineDash([]); }
      else { q = rs(v, W, H, D.off({ x: sel.rx, y: sel.ry }, sel.tHdg, sel.gs / 60 * 3)); line(ctx, p, q, 'rgba(79,216,255,.5)', [4, 4]); }
      if (sel.sidR && sel.sidVia && sel.nav.mode === 'route') { ctx.font = '10px ' + MONO; ctx.fillStyle = '#ffd166'; sel.sidR.forEach(function (r) { if (r.st || !D.fix[r.fix] || sel.nav.route.indexOf(r.fix, sel.nav.i) < 0) return; var fq = rs(v, W, H, D.fix[r.fix]); ctx.fillText((r.min !== undefined && r.min === r.max ? '' : r.min !== undefined ? '≥' : '≤') + U.pad(Math.round((r.min !== undefined ? r.min : r.max) / 100), 3), fq[0] + 7, fq[1] + 11); }); }      /* 고른 출발기의 남은 SID 고도 제한(백 ft) */
      ctx.strokeStyle = 'rgba(79,216,255,.35)'; ctx.beginPath(); ctx.arc(p[0], p[1], sim.minH * v.scale, 0, 7); ctx.stroke();
      if (app.hdgAim) { q = [app.mx, app.my]; line(ctx, p, q, C.sel); var wq = R.radarToWorld(v, W, H, app.mx, app.my), hh = U.r5(U.brg({ x: sel.rx, y: sel.ry }, wq)); ctx.fillStyle = C.sel; ctx.font = 'bold 12px ' + MONO; ctx.fillText('HDG ' + fmt.hdg(hh), q[0] + 10, q[1] - 10); ctx.font = '10px ' + MONO; }
    }
    /* 충돌 경고선 */
    sim.alerts.stca.forEach(function (pr) { line(ctx, rs(v, W, H, { x: pr[0].rx, y: pr[0].ry }), rs(v, W, H, { x: pr[1].rx, y: pr[1].ry }), C.stca, [3, 3]); });
    sim.alerts.ca.forEach(function (pr) { line(ctx, rs(v, W, H, { x: pr[0].rx, y: pr[0].ry }), rs(v, W, H, { x: pr[1].rx, y: pr[1].ry }), C.ca); });
    /* 표적 */
    var blink = Math.floor(now / 450) % 2 === 0, caSet = {}, stSet = {};
    sim.alerts.ca.forEach(function (pr) { caSet[pr[0].id] = caSet[pr[1].id] = 1; }); sim.alerts.stca.forEach(function (pr) { stSet[pr[0].id] = stSet[pr[1].id] = 1; });
    var msaw = {}; sim.alerts.msaw.forEach(function (a) { msaw[a.id] = 1; });
    app.hit = [];
    var items = [], fobs = [];
    Object.keys(D.fix).forEach(function (n) { var f = D.fix[n]; if (f._sx !== undefined && f._on) fobs.push({ x: f._sx + 5, y: f._sy - 12, w: n.length * 6.2 + 4, h: 12, wt: 0.8 }); });
    fobs.push({ x: 0, y: 0, w: 350, h: 44, wt: 3 });
    sim.acs.forEach(function (a) {
      var pp = rs(v, W, H, { x: a.rx, y: a.ry }), col = a.emg ? C.emg : a.owner === 'in' ? C.inn : a.owner === 'out' ? C.out : (a.kind === 'dep' ? C.dep : a.kind === 'arr' ? C.arr : C.mine);
      if (a.owner === 'in' && !blink) col = '#8a7430';
      var tr = a.rvs > 200 ? '↑' : a.rvs < -200 ? '↓' : '=', l1 = a.cs + (a.wake === 'H' ? ' H' : a.wake === 'L' ? ' L' : '') + (a.squawk === '7700' ? ' 7700' : a.squawk === '7600' ? ' 7600' : ''), l2, l3;
      var asg = a.appr && a.appr.gs ? 'ILS' : U.pad(Math.round(a.tAlt / 100), 3);
      if (a.sidR && a.vcap !== undefined && a.vcap < a.tAlt) asg = U.pad(Math.round(a.vcap / 100), 3) + '›' + asg;      /* SID 「이하」 · 「그 고도」 제한에서 잠깐 멈춤: 제한 고도 › 허가 고도 */
      l2 = U.pad(Math.round(a.ralt / 100), 3) + tr + asg + (a.appr && !a.appr.gs ? (a.appr.loc ? ' LOC' : ' APP') : '');
      l3 = U.pad(Math.round(a.rgs / 10), 2) + ' ' + a.type + ' ' + (acc ? (a.kind === 'arr' || a.divert ? a.gate : a.exitFix || '') : (a.kind === 'arr' ? a.rwy : a.gate));
      ctx.font = (a.id === app.sel ? 'bold ' : '') + '11px ' + MONO;
      var tw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width, ctx.measureText(l3).width) + 8;
      items.push({ id: a.id, a: a, px: pp[0], py: pp[1], w: tw, h: 42, r: 9, g: 20, prev: a._lp, col: col, l: [l1, l2, l3] });
    });
    R.place(items, W, H, fobs, app.sel);
    R._lab = items.map(function (it) { return { x: it.x, y: it.y, w: it.w, h: it.h }; });
    items.forEach(function (it) {
      var a = it.a, pp = [it.px, it.py], col = it.col, bx = it.x, by = it.y, tw = it.w; a._lp = it.pos;
      /* 항적 */
      for (k = 0; k < a.hist.length - 1; k++) { var hp = rs(v, W, H, a.hist[k]); ctx.fillStyle = col; ctx.globalAlpha = 0.18 + 0.1 * k; ctx.fillRect(hp[0] - 1.2, hp[1] - 1.2, 2.4, 2.4); } ctx.globalAlpha = 1;
      /* 속도 벡터(1분) */
      var vq = rs(v, W, H, D.off({ x: a.rx, y: a.ry }, a.rhdg, a.rgs / 60)); line(ctx, pp, vq, col);
      ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.strokeRect(pp[0] - 3.5, pp[1] - 3.5, 7, 7); ctx.lineWidth = 1;
      if (caSet[a.id] && blink) { ctx.strokeStyle = C.ca; ctx.lineWidth = 2; ctx.strokeRect(pp[0] - 8, pp[1] - 8, 16, 16); ctx.lineWidth = 1; }
      leader(ctx, it, col);
      var hot = a.id === app.sel || stSet[a.id] || caSet[a.id] || msaw[a.id];
      ctx.fillStyle = hot ? 'rgba(5,9,14,.9)' : 'rgba(5,9,14,.62)'; ctx.fillRect(bx, by, tw, it.h);
      if (hot) { ctx.strokeStyle = caSet[a.id] || msaw[a.id] ? C.ca : stSet[a.id] ? C.stca : C.sel; ctx.strokeRect(bx - 0.5, by - 0.5, tw + 1, it.h + 1); }
      ctx.font = (a.id === app.sel ? 'bold ' : '') + '11px ' + MONO;
      ctx.fillStyle = col; ctx.fillText(it.l[0], bx + 4, by + 8); ctx.fillText(it.l[1], bx + 4, by + 21); ctx.fillStyle = a.id === app.sel ? col : shade(col); ctx.fillText(it.l[2], bx + 4, by + 34);
      if (a.waiting && a.owner === 'me') { ctx.fillStyle = a.emg ? C.emg : C.inn; ctx.beginPath(); ctx.arc(bx + tw - 5, by + 7, 3, 0, 7); ctx.fill(); }
      if (msaw[a.id]) { ctx.fillStyle = C.ca; ctx.fillText('LOW ALT', bx + 4, by + it.h + 8); }
      app.hit.push({ id: a.id, x0: bx - 2, y0: by - 2, x1: bx + tw + 2, y1: by + it.h + 2, px: pp[0], py: pp[1] });
    });
    /* 축척 · 정보 */
    ctx.fillStyle = '#35556f'; ctx.font = '10px ' + MONO; var sb = (acc ? 20 : 5) * v.scale; ctx.fillRect(14, H - 16, sb, 2); ctx.fillText((acc ? 20 : 5) + ' NM', 18 + sb, H - 15);
    ctx.fillText('RADAR UPDATE ' + sim.sweep + 's · SEP ' + sim.minH + 'NM/1000ft', 14, H - 30);
  };
  function shade(c) { return c === C.emg ? '#c75252' : c === C.out ? '#4c5f6f' : '#9fb3a6'; }
  function line(ctx, a, b, col, dash) { ctx.strokeStyle = col; if (dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); if (dash) ctx.setLineDash([]); }
  /* 데이터 블록 위치: 주변 표적이 적은 쪽으로 */
  R.placeLabels = function (sim) {
    var acs = sim.acs, i, j;
    for (i = 0; i < acs.length; i++) {
      var a = acs[i], cnt = [0, 0, 0, 0];
      for (j = 0; j < acs.length; j++) if (i !== j) { var b = acs[j], dx = b.rx - a.rx, dy = b.ry - a.ry, d = Math.hypot(dx, dy), lim = sim.mode === 'ACC' ? 30 : 9; if (d < lim) { var qd = dx >= 0 ? (dy >= 0 ? 0 : 1) : (dy >= 0 ? 3 : 2); cnt[qd] += (lim - d); } }
      var best = a.lblQ || 0; for (j = 0; j < 4; j++) if (cnt[j] < cnt[best] - 0.5) best = j; a.lblQ = best;
    }
  };

  /* ================= 지상 ================= */
  /* 지상 화면을 처음 열 때의 범위: 공항 묶음의 D.view = { cu, cv, w, h }(m)가 있으면 그것으로 */
  R.groundView = function () { return { cu: 0, cv: 60, scale: 0.2, min: 0.004, max: 1.6 }; };   /* 아주 작게 줄이면 주변 지리까지(약 150NM) */
  /* 좁은 화면(휴대폰)의 위쪽 띠: 이동 단추 · 도착 표 · 작은 레이더를 띠 안에 모으고 지도는 그 아래에 맞춤 — 지도와 겹치지 않게.
     side = 단추 옆에 도착 표를 둘 자리가 있음(가로 화면) / 없으면 단추 아래 줄에 */
  R.hud = function (W, H) {
    if (!(W < 700 || H < 400)) return null;
    var g = G.document && G.document.getElementById('gnav'), gw = g && !g.hidden && g.offsetWidth ? g.offsetWidth + 18 : 12, low = H < 300, r = low ? 27 : 30, rw = 2 * r + 20, side = W - gw - rw >= 150, n = side ? 4 : low ? 2 : 3;   /* low = 가로로 든 휴대폰(높이가 낮음) → 띠를 더 낮게 */
    return { r: r, fx: side ? gw : 8, fy: side ? 5 : 39, fw: (side ? W - gw : W - 8) - rw, h: side ? 2 * r + 12 : 39 + n * 14.5 + 3, lines: n };
  };
  R.hudTop = function (W, H) { var hd = R.hud(W, H); return hd ? hd.h : 0; };
  R.fitBox = function (W, H, b) { var w = b[2] - b[0], h = b[3] - b[1], top = R.hudTop(W, H), sc = Math.min(W / w, (H - top) / h); return { cu: (b[0] + b[2]) / 2, cv: (b[1] + b[3]) / 2 + top / 2 / sc, scale: sc }; };   /* [u1, v1, u2, v2]가 화면에 꽉 차게 */
  R.fitScale = function (W, H) { var V = D.view || { w: 4300, h: 2440 }; return Math.min(W / V.w, (H - R.hudTop(W, H)) / V.h); };
  R.fitGround = function (v, W, H) { var V = D.view || { cu: 0, cv: 250, w: 4300, h: 2440 }, top = R.hudTop(W, H); v.scale = Math.min(W / V.w, (H - top) / V.h); v.cu = V.cu; v.cv = V.cv + top / 2 / v.scale; };
  function gs(v, W, H, u, w) { return [W / 2 + (u - v.cu) * v.scale, H / 2 - (w - v.cv) * v.scale]; }
  R.gs = gs;
  R.groundToUV = function (v, W, H, sx, sy) { return { u: (sx - W / 2) / v.scale + v.cu, v: -(sy - H / 2) / v.scale + v.cv }; };
  var satImg = null, satOk = false;
  /* 바탕 사진은 가장자리를 투명하게 흐려 둠 → 그 바깥의 주변 지리(육지 · 바다)와 이어져 보이게 */
  function feather(im) {
    try { var cv = document.createElement('canvas'), w = cv.width = im.naturalWidth, h = cv.height = im.naturalHeight, x = cv.getContext('2d'), f = Math.round(Math.min(w, h) * 0.05), g;
      x.drawImage(im, 0, 0); x.globalCompositeOperation = 'destination-out';
      [[0, 0, f, 0, 0, 0, f, h], [w, 0, w - f, 0, w - f, 0, f, h], [0, 0, 0, f, 0, 0, w, f], [0, h, 0, h - f, 0, h - f, w, f]].forEach(function (e) { g = x.createLinearGradient(e[0], e[1], e[2], e[3]); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(e[4], e[5], e[6], e[7]); });
      return cv; } catch (e) { return im; }
  }
  R.loadSat = function (url) { if (typeof Image === 'undefined') return; var im = new Image(); im.onload = function () { satImg = feather(im); satOk = true; }; im.onerror = function () { satOk = false; }; im.src = url; };
  R.SAT = D.sat || { u1: -2400, u2: 2400, v1: -1500, v2: 1500 };   /* 바탕 그림이 덮는 범위(m) — 공항 자료에서 옴 */

  function rectUV(ctx, v, W, H, u1, v1, u2, v2, col) { var a = gs(v, W, H, u1, v2), b = gs(v, W, H, u2, v1); ctx.fillStyle = col; ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); }
  function sign(ctx, x, y, t, s) { ctx.font = 'bold ' + s + 'px ' + MONO; var w = ctx.measureText(t).width + 5; if (R._tags) R._tags.push({ x: x - w / 2 - 1, y: y - s * 0.62 - 1, w: w + 2, h: s * 1.24 + 2, wt: 1.6 }); ctx.fillStyle = '#0c0c0c'; ctx.fillRect(x - w / 2, y - s * 0.62, w, s * 1.24); ctx.fillStyle = '#f2c230'; ctx.textAlign = 'center'; ctx.fillText(t, x, y + 0.5); ctx.textAlign = 'left'; }

  /* ================= 밤 · 날씨(지상 화면) =================
     밤: 공항 현지 시각(D.tz, 기본 UTC+9)으로 어둡게 하고 활주로 가장자리등 · 진입등 · 유도로 중심선등을 켬
     안개: 저시정(LVP)이면 흰 안개 · 비: sim.rain이면 빗줄기 */
  R.nightK = function (sim) { var h = ((sim.utc() / 3600 + (D.tz !== undefined ? D.tz : 9)) % 24 + 24) % 24; return h < 5 || h >= 19.5 ? 1 : h < 6.5 ? (6.5 - h) / 1.5 : h >= 17.5 ? (h - 17.5) / 2 : 0; };
  R.groundWx = function (ctx, W, H, app) {
    var sim = app.sim, v = app.view, s = v.scale, k = R.nightK(sim), N = D.gN, now = performance.now();
    if (k > 0.02) {
      ctx.fillStyle = 'rgba(2,6,18,' + (0.55 * k).toFixed(3) + ')'; ctx.fillRect(0, 0, W, H);
      if (k > 0.25 && s > 0.02) {
        var dot = function (u, w, col, r) { var p = gs(v, W, H, u, w); if (p[0] < -4 || p[0] > W + 4 || p[1] < -4 || p[1] > H + 4) return; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 7); ctx.fill(); };
        var a = Math.min(1, k * 1.2), rr = Math.max(1, Math.min(2.6, 3 * s));
        ctx.save(); ctx.globalAlpha = a;
        Object.keys(D.ends).forEach(function (id) {      /* 활주로: 가장자리등(흰색 · 60m) · 시단등(녹색) · 진입등(흰색 · 900m) */
          var e = D.ends[id], r0 = D.rw[e.rw], hw = (r0 && r0.width || 45) / 2 + 3, nu = -e.dv, nv = e.du, i, L = e.len || 3000;
          for (i = 0; i <= L / 2; i += 60) { dot(e.thrU + e.du * i + nu * hw, e.thrV + e.dv * i + nv * hw, '#fff7e0', rr); dot(e.thrU + e.du * i - nu * hw, e.thrV + e.dv * i - nv * hw, '#fff7e0', rr); }
          for (i = -hw; i <= hw; i += 9) dot(e.thrU + nu * i, e.thrV + nv * i, '#52ff8a', rr);
          for (i = 30; i <= 900; i += 30) dot(e.thrU - e.du * i, e.thrV - e.dv * i, i % 300 === 0 ? '#fffbe8' : 'rgba(255,250,230,.75)', i % 300 === 0 ? rr * 1.3 : rr * 0.9);
          [-1, 1].forEach(function (sd) { for (var j = 6; j <= 30; j += 6) dot(e.thrU - e.du * 300 + nu * j * sd, e.thrV - e.dv * 300 + nv * j * sd, '#fffbe8', rr * 0.9); });
        });
        if (s > 0.06) D.gE.forEach(function (ed) {      /* 유도로 중심선등(녹색 · 30m) */
          if (ed.kind === 'rwy' || ed.kind === 'stand') return; var A = N[ed.a], B = N[ed.b], L = Math.hypot(B.u - A.u, B.v - A.v), n = Math.floor(L / 30), j;
          for (j = 0; j <= n; j++) dot(A.u + (B.u - A.u) * j / Math.max(1, n), A.v + (B.v - A.v) * j / Math.max(1, n), '#3dff86', rr * 0.7);
        });
        ctx.restore();
      }
    }
    if (sim.lvp) { var fg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.15, W / 2, H / 2, Math.max(W, H) * 0.7); fg.addColorStop(0, 'rgba(205,212,220,' + (0.18 + 0.1 * (1 - k)) + ')'); fg.addColorStop(1, 'rgba(205,212,220,' + (0.42 + 0.12 * (1 - k)) + ')'); ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H); }
    if (sim.rain) {
      ctx.fillStyle = 'rgba(10,18,30,' + (0.12 * sim.rain) + ')'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(190,210,235,' + (0.18 + 0.14 * sim.rain) + ')'; ctx.lineWidth = 1; ctx.beginPath();
      var n2 = Math.round(90 * sim.rain * (W * H) / 900000), off = (now / 4) % 40, q;
      for (q = 0; q < n2; q++) { var x0 = ((q * 7919) % W + off * 3) % W, y0 = ((q * 104729) % H + off * 9) % H; ctx.moveTo(x0, y0); ctx.lineTo(x0 - 3, y0 + 11); }
      ctx.stroke();
    }
  };
  R.drawGround = function (ctx, W, H, app) {
    R.tOk = false;
    var sim = app.sim, v = app.view, s = v.scale, i, a, b, N = D.gN, now = performance.now();
    ctx.fillStyle = C.grass; ctx.fillRect(0, 0, W, H); ctx.textBaseline = 'middle';
    if (satOk) {
      a = gs(v, W, H, R.SAT.u1, R.SAT.v2); b = gs(v, W, H, R.SAT.u2, R.SAT.v1);
      var gc = D.geoCol || {}, px = D.xy2uv(1, 0), py = D.xy2uv(0, 1), kk = s * 1852;
      if (geoP) { ctx.fillStyle = gc.sea || '#3e5261'; ctx.fillRect(0, 0, W, H); geoFill(ctx, [s * px.u, -s * px.v, s * py.u, -s * py.v, W / 2 - v.cu * s, H / 2 + v.cv * s], kk, gc.land || R.SAT.edge || '#60634a', s < 0.05 ? 'rgba(214,220,196,.35)' : null, 1.2); }   /* 사진 바깥: 실제(하네다) · 가상(세이라 · 아스테라) 주변 지리 */
      else { ctx.fillStyle = R.SAT.edge || '#60634a'; ctx.fillRect(0, 0, W, H); }
      R.tOk = false; var tOk = !app.guide && ATC.Tiles && ATC.Tiles.draw2D(ctx, W, H, function (x, y) { var q = D.xy2uv(x, y); return gs(v, W, H, q.u, q.v); }, function (sx, sy) { var q = R.groundToUV(v, W, H, sx, sy); return D.uv2xy(q.u, q.v); }, s);      /* 공항 둘레 실제 항공사진(실시간 · 확대할수록 선명한 단계) */
      if (tOk && geoP && ATC.aptId === 'RJTT') seaVeil(ctx, [s * px.u, -s * px.v, s * py.u, -s * py.v, W / 2 - v.cu * s, H / 2 + v.cv * s], 'rgba(28,47,60,.74)');      /* 바다는 한 색으로 고르게(항공사진의 바다 무늬 · 조각 차이를 덮음) — 하네다만(해안선이 실제와 맞음) */
      if (!ATC.dbgNoSat) ctx.drawImage(satImg, a[0], a[1], b[0] - a[0], b[1] - a[1]);                              /* 가장자리는 흐려 둔 사진(feather) */
      ctx.fillStyle = tOk ? 'rgba(5,9,14,.20)' : 'rgba(5,9,14,.30)'; ctx.fillRect(0, 0, W, H);
      R.tOk = tOk;      /* 사진 출처는 작은 지도까지 그린 뒤 R.tileCredit에서(가려지지 않게) */
      if (geoP) R.geoCredit(ctx, W, H, 'rgba(230,236,240,.6)');
      if (geoP && s < 0.03) geoLabels(ctx, function (x, y) { var q = D.xy2uv(x, y); return gs(v, W, H, q.u, q.v); }, W, H, kk, ['rgba(236,240,226,.72)', 'rgba(190,214,236,.6)']);
    }
    else {
      /* 잔디 무늬 · 계류장 · 건물 */
      ctx.fillStyle = C.grass2; for (i = Math.floor(Math.min(-2600, R.SAT.u1) / 240) * 240; i < Math.max(2600, R.SAT.u2); i += 240) { a = gs(v, W, H, i, 1700); ctx.fillRect(a[0], 0, 120 * s, H); }
      if (D.decor) D.decor(function (u1, v1, u2, v2, col) { rectUV(ctx, v, W, H, u1, v1, u2, v2, col); }, C);
    }
    ctx.lineCap = 'butt';
    /* 유도로 포장 */
    function strip(e, w, col) { var A = N[e.a], B = N[e.b], p = gs(v, W, H, A.u, A.v), q = gs(v, W, H, B.u, B.v); ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.5, w * s); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
    if (!satOk) { ctx.lineCap = 'round'; D.gE.forEach(function (e) { if (e.kind !== 'rwy') strip(e, e.kind === 'stand' ? 30 : e.kind === 'lane' ? 44 : 38, e.kind === 'stand' || e.kind === 'lane' ? C.apron : C.pave); }); ctx.lineCap = 'butt'; }
    /* 활주로 */
    Object.keys(D.rw).forEach(function (id) {
      /* 활주로마다 a쪽 시단을 원점으로, 활주로 방향을 가로축으로 돌려 놓고 그림(어느 방향 활주로든 같은 코드) */
      var r = D.rw[id], pa = gs(v, W, H, r.ua, r.va), pb = gs(v, W, H, r.ub, r.vb), Lr = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]);
      var p = [-60 * s, -r.width / 2 * s], q = [Lr + 60 * s, r.width / 2 * s], cy = 0, closed = sim.rwClosed && sim.rwClosed[id] > sim.t;
      ctx.save(); ctx.translate(pa[0], pa[1]); ctx.rotate(Math.atan2(pb[1] - pa[1], pb[0] - pa[0]));
      if (!satOk) { ctx.fillStyle = C.rw; ctx.fillRect(p[0], p[1], q[0] - p[0], q[1] - p[1]); }
      ctx.strokeStyle = C.white; ctx.lineWidth = Math.max(0.6, 1.2 * s);
      if (!satOk) { ctx.strokeRect(p[0] + 60 * s, p[1] + 1, q[0] - p[0] - 120 * s, q[1] - p[1] - 2); ctx.setLineDash([30 * s, 22 * s]); ctx.lineWidth = Math.max(0.7, 1 * s); ctx.beginPath(); ctx.moveTo(p[0] + 150 * s, cy); ctx.lineTo(q[0] - 150 * s, cy); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = C.white; for (var k = 0; k < 8; k++) { var yy = p[1] + (4 + k * 6.8) * s; ctx.fillRect(p[0] + 66 * s, yy, 34 * s, 3.4 * s); ctx.fillRect(q[0] - 100 * s, yy, 34 * s, 3.4 * s); }
        [300, 450, 600].forEach(function (dd) { ctx.fillRect(p[0] + (60 + dd) * s, cy - 14 * s, 22 * s, 6 * s); ctx.fillRect(p[0] + (60 + dd) * s, cy + 8 * s, 22 * s, 6 * s); ctx.fillRect(q[0] - (82 + dd) * s, cy - 14 * s, 22 * s, 6 * s); ctx.fillRect(q[0] - (82 + dd) * s, cy + 8 * s, 22 * s, 6 * s); }); }
      var fs = Math.max(9, 34 * s), rnum = s >= 0.045; ctx.font = 'bold ' + fs + 'px ' + MONO; ctx.fillStyle = satOk ? '#ffffff' : C.white; ctx.textAlign = 'center';
      if (rnum) { ctx.save(); ctx.translate(p[0] + 135 * s, cy); ctx.rotate(Math.PI / 2); ctx.fillText(r.a, 0, 0); ctx.restore();
      ctx.save(); ctx.translate(q[0] - 135 * s, cy); ctx.rotate(-Math.PI / 2); ctx.fillText(r.b, 0, 0); ctx.restore(); } ctx.textAlign = 'left';   /* 아주 작게 볼 때는 활주로 번호 생략 */
      if (closed) { ctx.fillStyle = 'rgba(255,60,60,' + (0.16 + 0.1 * Math.sin(now / 250)) + ')'; ctx.fillRect(p[0], p[1], q[0] - p[0], q[1] - p[1]); ctx.fillStyle = '#ff8a8a'; ctx.font = 'bold 13px ' + MONO; ctx.fillText((sim.insp && sim.insp.why === 'drone' ? 'RWY CLOSED — DRONE ' : 'RWY CLOSED — INSPECTION ') + U.mmss(sim.rwClosed[id] - sim.t), (p[0] + q[0]) / 2 - 110, cy - 26 * s - 10);
        var fr = (sim.t - sim.insp.t0) / (sim.insp.t1 - sim.insp.t0), cp = [Lr * fr, 0]; ctx.fillStyle = '#ffd24a'; ctx.fillRect(cp[0] - 5, cp[1] - 3, 10, 6); ctx.fillStyle = Math.floor(now / 300) % 2 ? '#ff9a1f' : '#fff'; ctx.fillRect(cp[0] - 2, cp[1] - 5, 4, 2); }
      ctx.restore();
    });
    /* 유도로 중심선 · 폐쇄 · 표지 */
    D.gE.forEach(function (e) {
      if (e.kind === 'rwy') return; var A = N[e.a], B = N[e.b], p = gs(v, W, H, A.u, A.v), q = gs(v, W, H, B.u, B.v), cl = sim.net && sim.net.closed[e.i];
      ctx.strokeStyle = cl ? '#ff4a4a' : e.kind === 'stand' ? 'rgba(210,169,42,.5)' : C.line; ctx.lineWidth = cl ? Math.max(3, 20 * s) : Math.max(0.8, 1.4 * s); if (cl) ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.setLineDash([]);
    });
    /* 정지선 */
    /* 정지선: 활주로로 들어가는 구간과 직각으로(실선), 활주로 반대쪽에 점선 */
    Object.keys(N).forEach(function (id) {
      var n = N[id]; if (!n.hold) return; var p = gs(v, W, H, n.u, n.v), r = null, k;
      for (k = 0; k < n.adj.length; k++) if (n.adj[k].e.kind === 'entry') r = N[n.adj[k].to];
      var q = r ? gs(v, W, H, r.u, r.v) : [p[0], p[1] - 1], m = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1, dx = (q[0] - p[0]) / m, dy = (q[1] - p[1]) / m, hx = -dy * 22 * s, hy = dx * 22 * s, ox = -dx * 5 * s, oy = -dy * 5 * s;
      ctx.strokeStyle = '#f2c230'; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.beginPath(); ctx.moveTo(p[0] - hx, p[1] - hy); ctx.lineTo(p[0] + hx, p[1] + hy); ctx.stroke();
      ctx.setLineDash([4 * s + 1, 3 * s + 1]); ctx.beginPath(); ctx.moveTo(p[0] - hx + ox, p[1] - hy + oy); ctx.lineTo(p[0] + hx + ox, p[1] + hy + oy); ctx.stroke(); ctx.setLineDash([]);
    });
    R.groundWx(ctx, W, H, app);      /* 밤 · 안개 · 비 */
    if (app.guide) return;
    R._tags = []; var tiny = s < 0.045;                                                          /* 아주 작게 볼 때는 표지 · 주기장 번호를 생략 */
    var ss = Math.max(9, Math.min(15, 46 * s));
    /* 작게 볼 때(휴대폰 · 넓은 공항의 전체 보기): 이름표끼리 겹치면 뒤의 것은 그리지 않음 — 확대하면 다 보임 */
    var thin = s < 0.12, used = [];
    function free(x, y, w, h) { if (!thin) return true; for (var i = 0; i < used.length; i++) { var q = used[i]; if (x < q[0] + q[2] && q[0] < x + w && y < q[1] + q[3] && q[1] < y + h) return false; } used.push([x, y, w, h]); return true; }
    function sg(p, t, z) { var w = t.length * z * 0.64 + 6; if (free(p[0] - w / 2, p[1] - z / 2 - 2, w, z + 4)) sign(ctx, p[0], p[1], t, z); }
    /* 터미널 · 구역 이름(공항 묶음의 D.gText): 건물 위에 옅은 글자로 */
    if (D.gText && !tiny) { ctx.save(); ctx.font = '700 ' + Math.max(10, Math.min(26, 150 * s)) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(226,236,244,.62)'; D.gText.forEach(function (t) { var q = gs(v, W, H, t[1], t[2]); ctx.fillText(t[0], q[0], q[1]); }); ctx.restore(); }
    if (!tiny) {
    (D.gLabels || []).forEach(function (t) { sg(gs(v, W, H, t[1], t[2]), t[0], ss); });
    Object.keys(D.holds).forEach(function (h) { var o = D.holds[h]; sg(gs(v, W, H, o.lu, o.lv), h, ss * 0.92); });
    var pe = gs(v, W, H, -438, 652); sign(ctx, pe[0], pe[1], 'E', ss * 0.92);
    }
    /* 주기장 번호 */
    ctx.font = 'bold ' + Math.max(8, Math.min(13, 40 * s)) + 'px ' + MONO; ctx.textAlign = 'center';
    var sf = Math.max(8, Math.min(13, 40 * s));
    if (!tiny) Object.keys(D.stands).forEach(function (n) { var st = D.stands[n], p = gs(v, W, H, st.u + st.lab[0], st.v + st.lab[1]); if (!free(p[0] - n.length * sf * 0.32 - 1, p[1] - sf / 2, n.length * sf * 0.64 + 2, sf)) return; ctx.fillStyle = app.hoverStand === n ? C.sel : '#d9dfe5'; ctx.fillText(n, p[0], p[1]); R._tags.push({ x: p[0] - 13, y: p[1] - 7, w: 26, h: 14, wt: 1.2 }); });
    ctx.textAlign = 'left';
    /* 관제탑 */
    var tp = gs(v, W, H, 0, 0); ctx.fillStyle = '#2c3238'; ctx.beginPath(); ctx.arc(tp[0], tp[1], Math.max(4, 16 * s), 0, 7); ctx.fill(); ctx.strokeStyle = '#9fd0ff'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#9fd0ff'; ctx.font = '9px ' + MONO; ctx.fillText('TWR', tp[0] - 9, tp[1] + Math.max(4, 16 * s) + 8);
    /* 경로 미리보기 · 선택기의 남은 경로 */
    function path(nodes, col, wd, dash, from) { if (!nodes || nodes.length < 1) return; ctx.strokeStyle = col; ctx.lineWidth = wd; if (dash) ctx.setLineDash(dash); ctx.lineCap = 'round'; ctx.beginPath(); var st0 = 0; if (from) { var f = gs(v, W, H, from.u, from.v); ctx.moveTo(f[0], f[1]); } nodes.forEach(function (id, ix) { var p = gs(v, W, H, N[id].u, N[id].v); if (ix === 0 && !from) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); }); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap = 'butt'; }
    var sel = sim.byId(app.sel);
    if (sel && sel.path && sel.pi < sel.path.length && (sel.st === 'taxi' || sel.st === 'athold')) path(sel.path.slice(sel.pi), 'rgba(90,230,140,.75)', Math.max(2, 9 * s), null, sel);
    if (app.routePrev) path(app.routePrev.nodes, 'rgba(79,216,255,.9)', Math.max(2.5, 11 * s), [8, 6]);
    /* 항공기 */
    app.hit = [];
    var list = sim.acs.slice().sort(function (x, y) { return (x.alt || 0) - (y.alt || 0); }), items = [], obs = R.finalLayout(app, W, H); if (obs[0] && obs[0].compact) obs = [{ x: 0, y: 0, w: W, h: R.hudTop(W, H), wt: 3 }];   /* 좁은 화면: 위쪽 띠 전체를 이름표가 피함 */
    if (sim.mode === 'TWR' || sim.mode === 'GND') { var mr = Math.min(78, W * 0.11); obs.push({ x: (sim.flow.mini !== 'L' ? W - mr * 2 - 20 : 4), y: 4, w: mr * 2 + 16, h: mr * 2 + 16, wt: 3 }); }
    list.forEach(function (ac) {
      var p = gs(v, W, H, ac.u, ac.v); if (p[0] < -60 || p[0] > W + 60 || p[1] < -60 || p[1] > H + 60) return;   /* 화면 안이면 먼 최종 접근 · 이륙 항공기도 그림(줄여 보면 10NM 밖까지) */
      var k = Math.max(s * 1.3, 21 / ac.perf.len) * (1 + Math.min(0.35, (ac.alt || 0) / 6000));
      var own = ac.owner === 'me', col = ac.emg ? C.emg : own ? (ac.kind === 'dep' ? C.dep : C.arr) : '#8496a6', l1 = ac.cs + (ac.st === 'taxi' && ac.spd < 0.3 && ac.blk ? ' STOP' : ac.halt ? ' HOLD' : ''), l2 = (ac.st === 'final' || ac.st === 'air') ? R.dblk(ac) + (ac.st === 'final' ? ' ' + ac.rwy : '') : ac.type + (ac.wake === 'H' ? '/H' : ac.wake === 'L' ? '/L' : '') + ' ' + (ac.kind === 'dep' ? (ac.hp || ac.rwy || '') : (ac.st === 'land' ? ac.rwy : ac.stand || ''));      /* 공중의 항공기: 고도(100ft) · 상승/강하 · 속도(kt) — 출발기 이양 · 착륙기 확인용 */
      ctx.font = (ac.id === app.sel ? 'bold ' : '') + '11px ' + MONO; var tw = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width) + 9;
      var rr = Math.max(11, Math.max(ac.perf.len, ac.perf.span) * k * 0.5);
      items.push({ id: ac.id, ac: ac, px: p[0], py: p[1], w: tw, h: 29, r: rr, g: rr * 0.72 + 3, prev: ac._lp, col: col, own: own, k: k, l: [l1, l2] });
    });
    if (R._tags) obs = obs.concat(R._tags);
    R.place(items, W, H, obs, app.sel);
    /* 그림 먼저, 표지는 그 위에 */
    items.forEach(function (it) {
      var ac = it.ac, k = it.k, ang = Math.atan2(ac.du, ac.dv);
      if (ac.alt > 20) { ctx.save(); ctx.translate(it.px + ac.alt * 0.012 + 3, it.py + ac.alt * 0.012 + 3); ctx.rotate(ang); ctx.globalAlpha = 0.25; R.plane(ctx, ac.perf, '#000', k, true); ctx.restore(); ctx.globalAlpha = 1; }
      if (satOk) { ctx.save(); ctx.translate(it.px, it.py); ctx.rotate(ang); ctx.globalAlpha = 0.8; R.plane(ctx, ac.perf, '#070a0e', k * 1.16, true); ctx.restore(); ctx.globalAlpha = 1; }   /* 밝은 바닥 위에서도 보이게 어두운 테두리 */
      ctx.save(); ctx.translate(it.px, it.py); ctx.rotate(ang); R.plane(ctx, ac.perf, ac.al.col, k); ctx.restore();
      if (ac.st === 'push') { ctx.fillStyle = '#ffd24a'; var tq = gs(v, W, H, ac.u + ac.du * (ac.perf.len / 2 + 9), ac.v + ac.dv * (ac.perf.len / 2 + 9)); ctx.fillRect(tq[0] - 3, tq[1] - 2, 6, 4); }
      if (ac.id === app.sel) { ctx.strokeStyle = C.sel; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.arc(it.px, it.py, it.r + 4, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
    });
    items.forEach(function (it) {
      var ac = it.ac, col = it.col, bx = it.x, by = it.y, tw = it.w; ac._lp = it.pos;
      leader(ctx, it, col);
      ctx.fillStyle = ac.id === app.sel ? 'rgba(10,40,58,.94)' : 'rgba(8,12,17,.84)'; ctx.fillRect(bx, by, tw, it.h);
      ctx.strokeStyle = ac.id === app.sel ? C.sel : (ac.waiting && it.own && Math.floor(now / 500) % 2 ? C.inn : 'rgba(255,255,255,.16)'); ctx.lineWidth = 1; ctx.strokeRect(bx - 0.5, by - 0.5, tw + 1, it.h + 1);
      ctx.font = (ac.id === app.sel ? 'bold ' : '') + '11px ' + MONO;
      ctx.fillStyle = / (STOP|HOLD)$/.test(it.l[0]) ? C.stca : col; ctx.fillText(it.l[0], bx + 4, by + 8); ctx.fillStyle = it.own ? '#b9c7d3' : '#6f7f8d'; ctx.fillText(it.l[1], bx + 4, by + 21);
      app.hit.push({ id: ac.id, x0: bx - 2, y0: by - 2, x1: bx + tw + 2, y1: by + it.h + 2, px: it.px, py: it.py, r: it.r + 2 });
    });
    /* 북쪽 화살표 */
    ctx.save(); ctx.translate(W - 34, H - 38); ctx.rotate((90 - D.gridHdg) * D2R); ctx.strokeStyle = '#9fb3c8'; ctx.fillStyle = '#9fb3c8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(0, -14); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(5, -10); ctx.lineTo(-5, -10); ctx.closePath(); ctx.fill(); ctx.font = 'bold 10px ' + MONO; ctx.fillText('N', -3.5, -28); ctx.restore();
    /* 최종 접근 표시(화면 밖 항공기) + 타워 레이더 */
    if (sim.lvp) { ctx.fillStyle = 'rgba(176,188,198,.34)'; ctx.fillRect(0, 0, W, H); }      /* 저시정: 지도 전체에 안개 */
    var hd = R.hud(W, H);
    if (hd) { ctx.fillStyle = 'rgba(6,10,15,.93)'; ctx.fillRect(0, 0, W, hd.h); ctx.fillStyle = '#22384d'; ctx.fillRect(0, hd.h, W, 1); }
    R.finalBars(ctx, W, H, app);
    if (sim.mode === 'TWR' || sim.mode === 'GND') R.miniRadar(ctx, W, H, app);
    R.miniMap(ctx, W, H, app);
    R.tileCredit(ctx, W, H);
  };
  /* 위에서 본 항공기(코가 위쪽) */
  R.plane = function (ctx, perf, col, k, shadow) {
    var L = perf.len * k, Wd = perf.span * k, fw = Math.max(2.4, L * 0.105), body = shadow ? '#000' : '#f1f4f7', wing = shadow ? '#000' : '#cdd5dc';
    ctx.fillStyle = wing; ctx.beginPath();
    if (perf.k === 'tp') { ctx.rect(-Wd / 2, -L * 0.1, Wd, L * 0.1); }
    else { ctx.moveTo(-fw / 2, -L * 0.13); ctx.lineTo(-Wd / 2, L * 0.1); ctx.lineTo(-Wd / 2, L * 0.17); ctx.lineTo(-fw / 2, L * 0.1); ctx.lineTo(fw / 2, L * 0.1); ctx.lineTo(Wd / 2, L * 0.17); ctx.lineTo(Wd / 2, L * 0.1); ctx.lineTo(fw / 2, -L * 0.13); }
    ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-fw / 2, L * 0.36); ctx.lineTo(-Wd * 0.19, L * 0.46); ctx.lineTo(-Wd * 0.19, L * 0.5); ctx.lineTo(Wd * 0.19, L * 0.5); ctx.lineTo(Wd * 0.19, L * 0.46); ctx.lineTo(fw / 2, L * 0.36); ctx.closePath(); ctx.fill();
    if (!shadow) { ctx.fillStyle = '#8d979f'; var ey = perf.k === 'tp' ? -L * 0.14 : -L * 0.04, ex = Wd * (perf.wake === 'H' ? 0.17 : 0.2); ctx.fillRect(-ex - fw * 0.22, ey, fw * 0.44, L * 0.1); ctx.fillRect(ex - fw * 0.22, ey, fw * 0.44, L * 0.1); }
    ctx.fillStyle = body; ctx.beginPath(); ctx.moveTo(0, -L / 2); ctx.quadraticCurveTo(fw / 2, -L * 0.43, fw / 2, -L * 0.34); ctx.lineTo(fw / 2, L * 0.3); ctx.lineTo(fw * 0.16, L / 2); ctx.lineTo(-fw * 0.16, L / 2); ctx.lineTo(-fw / 2, L * 0.3); ctx.lineTo(-fw / 2, -L * 0.34); ctx.quadraticCurveTo(-fw / 2, -L * 0.43, 0, -L / 2); ctx.closePath(); ctx.fill();
    if (!shadow) { ctx.fillStyle = col; ctx.fillRect(-fw * 0.5, L * 0.2, fw, L * 0.12); ctx.fillRect(-fw * 0.14, L * 0.3, fw * 0.28, L * 0.2); ctx.fillStyle = '#2b3a48'; ctx.fillRect(-fw * 0.3, -L * 0.44, fw * 0.6, L * 0.025); }
  };
  /* 활주로 접근 끝 쪽의 도착 목록(자리 계산 → 그리기) */
  R.finalLayout = function (app, W, H) {
    var sim = app.sim, v = app.view, out = [], hd = R.hud(W, H);
    if (hd) {   /* 좁은 화면: 위쪽 띠 안에 가까운 순서로 한 줄씩 */
      var all = []; Object.keys(D.ends).forEach(function (id) { (sim.finals ? sim.finals(id) : []).forEach(function (a) { all.push(a); }); });
      all.sort(function (a, b) { return a.d - b.d; });
      return [{ compact: true, x: hd.fx, y: hd.fy, w: hd.fw, h: hd.h - hd.fy, list: all.slice(0, hd.lines), more: Math.max(0, all.length - hd.lines), wt: 0 }];
    }
    Object.keys(D.ends).forEach(function (id) {
      var fl = sim.finals ? sim.finals(id) : []; if (!fl.length) return; var e = D.ends[id], p = gs(v, W, H, e.thrU - e.du * 330, e.thrV - e.dv * 330), hh = fl.length * 17 + 20, x = e.du > 0 ? Math.max(8, p[0] - 196) : Math.min(W - 196, p[0] + 10), y = p[1] + (e.thrV > 0 ? -18 - hh : 20);
      y = Math.max(6, Math.min(y, H - hh - 6)); out.push({ id: id, x: x, y: y - 3, w: 188, h: hh, list: fl, wt: 3 });
    });
    return out;
  };
  R.finalBars = function (ctx, W, H, app) {
    var sim = app.sim; ctx.font = '11px ' + MONO;
    R.finalLayout(app, W, H).forEach(function (b) {
      var x = b.x, y = b.y + 3;
      if (b.compact) {
        ctx.font = '10.5px ' + MONO; ctx.textBaseline = 'middle';
        if (!b.list.length) { ctx.fillStyle = '#4d6377'; ctx.fillText('FINAL —', x, b.y + 8); }
        b.list.forEach(function (a, ix) {
          var yy = b.y + 8 + ix * 14.5, own = a.owner === 'me', nar = b.w < 185;
          ctx.fillStyle = '#6c8aa6'; ctx.fillText(a.rwy, x, yy);
          ctx.fillStyle = a.emg ? C.emg : a.id === app.sel ? C.sel : own ? C.arr : '#8496a6'; ctx.fillText(a.cs + (a.wake === 'H' ? ' H' : ''), x + 26, yy); ctx.fillText((a.d / NM).toFixed(1) + (nar ? '' : 'NM'), x + 92, yy);
          ctx.fillStyle = a.clr ? '#6fe08d' : '#ffb347'; ctx.fillText(a.clr ? 'CLRD' : (sim.mode === 'TWR' ? (nar ? 'NO' : 'NO CLR') : ''), x + (nar ? 120 : 140), yy);
          app.hit.push({ id: a.id, x0: x - 2, y0: yy - 7, x1: x + b.w, y1: yy + 7, px: -99, py: -99, r: 0 });
        });
        if (b.more) { ctx.fillStyle = '#6c8aa6'; ctx.fillText('+' + b.more, x + b.w - 18, b.y + 8); }
        ctx.font = '11px ' + MONO; return;
      }
      ctx.fillStyle = 'rgba(6,10,15,.88)'; ctx.fillRect(x, b.y, b.w, b.h); ctx.strokeStyle = '#2b4a66'; ctx.strokeRect(x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
      ctx.fillStyle = '#6c8aa6'; ctx.fillText('FINAL ' + b.id + '  ILS', x + 6, y + 6);
      b.list.forEach(function (a, ix) { var yy = y + 23 + ix * 17, own = a.owner === 'me'; ctx.fillStyle = a.emg ? C.emg : a.id === app.sel ? C.sel : own ? C.arr : '#8496a6'; ctx.fillText(a.cs + (a.wake === 'H' ? ' H' : ''), x + 6, yy); ctx.fillText((a.d / NM).toFixed(1) + 'NM', x + 82, yy); ctx.fillStyle = a.clr ? '#6fe08d' : '#ffb347'; ctx.fillText(a.clr ? 'CLRD' : (sim.mode === 'TWR' ? 'NO CLR' : ''), x + 136, yy); app.hit.push({ id: a.id, x0: x, y0: yy - 8, x1: x + 186, y1: yy + 8, px: -99, py: -99, r: 0 }); });
    });
  };
  /* 작은 전체 지도: 확대해 있을 때 왼쪽 아래에 공항 전체와 지금 보는 범위를 보여 줌(눌러서 이동) */
  /* 실제 항공사진 출처 — 작은 지도 오른쪽(없으면 왼쪽 아래), 좁으면 두 줄 · 작은 글씨. CC BY 4.0(아스테라)은 늘 보여야 함(30차 결과) */
  R.tileCredit = function (ctx, W, H) {
    if (!R.tOk || !ATC.Tiles) return; var tc = ATC.Tiles.cfg(); if (!tc) return; var t = tc.attr(), mb = R.miniBox, x = mb ? mb.x + mb.w + 10 : 8, avail = W - x - 64, fs = 10, lines = [t];
    ctx.save(); ctx.font = fs + 'px ' + MONO;
    if (ctx.measureText(t).width > avail) { var i = t.indexOf('('), a = i > 0 ? t.slice(0, i) : t, b = i > 0 ? t.slice(i) : ''; lines = b ? [a, b] : [t]; while (fs > 8 && Math.max.apply(null, lines.map(function (l) { return ctx.measureText(l).width; })) > avail) { fs--; ctx.font = fs + 'px ' + MONO; } if (Math.max.apply(null, lines.map(function (l) { return ctx.measureText(l).width; })) > avail && mb) x = 8; }
    var lh = fs + 3, wmax = Math.max.apply(null, lines.map(function (l) { return ctx.measureText(l).width; })), y0 = H - 6 - (lines.length - 1) * lh, by = mb && x === 8 ? mb.y - 6 - (lines.length - 1) * lh : y0;
    ctx.fillStyle = 'rgba(4,8,12,.55)'; ctx.fillRect(x - 4, by - fs - 2, wmax + 8, lines.length * lh + 3);
    ctx.fillStyle = 'rgba(236,240,244,.9)'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; lines.forEach(function (l, k) { ctx.fillText(l, x, by + k * lh); }); ctx.restore();
  };
  R.miniBox = null;
  R.miniMap = function (ctx, W, H, app) {
    var v = app.view, sim = app.sim; R.miniBox = null;
    if (v.scale < R.fitScale(W, H) * 1.3 || W < 360) return;
    var B = D.sat && D.sat.img ? D.sat : (function (V) { V = D.view || { cu: 0, cv: 250, w: 4300, h: 2440 }; return { u1: V.cu - V.w / 2, u2: V.cu + V.w / 2, v1: V.cv - V.h / 2, v2: V.cv + V.h / 2 }; })();
    var mw = Math.round(U.clamp(W * 0.22, 130, 230)), mh = Math.round(mw * (B.v2 - B.v1) / (B.u2 - B.u1));
    if (mh > H * 0.42) { mh = Math.round(H * 0.42); mw = Math.round(mh * (B.u2 - B.u1) / (B.v2 - B.v1)); }
    var x = 10, y = H - mh - 10, k = mw / (B.u2 - B.u1);
    function mp(u, w) { return [x + (u - B.u1) * k, y + (B.v2 - w) * k]; }
    ctx.save(); ctx.fillStyle = 'rgba(4,8,12,.92)'; ctx.fillRect(x - 3, y - 3, mw + 6, mh + 6);
    ctx.beginPath(); ctx.rect(x, y, mw, mh); ctx.clip();
    if (satOk) { ctx.globalAlpha = 0.85; ctx.drawImage(satImg, x, y, mw, mh); ctx.globalAlpha = 1; }
    else { ctx.fillStyle = C.grass; ctx.fillRect(x, y, mw, mh); ctx.strokeStyle = C.pave; ctx.lineWidth = 1; D.gE.forEach(function (e) { if (e.kind === 'rwy' || e.kind === 'stand') return; var a = mp(D.gN[e.a].u, D.gN[e.a].v), b = mp(D.gN[e.b].u, D.gN[e.b].v); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }); }
    ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 2; Object.keys(D.rw).forEach(function (id) { var r = D.rw[id], a = mp(r.ua, r.va), b = mp(r.ub, r.vb); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); });
    sim.acs.forEach(function (a) {
      if (a.u === undefined || a.st === 'air' || a.st === 'gone') return; var p = mp(a.u, a.v); if (p[0] < x - 4 || p[0] > x + mw + 4 || p[1] < y - 4 || p[1] > y + mh + 4) return;
      ctx.fillStyle = a.id === app.sel ? C.sel : a.emg ? C.emg : a.st === 'final' || a.kind === 'arr' ? C.arr : C.dep; ctx.fillRect(p[0] - 2, p[1] - 2, 4, 4);
      if (a.id === app.sel) { ctx.strokeStyle = C.sel; ctx.lineWidth = 1; ctx.strokeRect(p[0] - 4.5, p[1] - 4.5, 9, 9); }
    });
    var t0 = R.groundToUV(v, W, H, 0, 0), t1 = R.groundToUV(v, W, H, W, H), q0 = mp(t0.u, t0.v), q1 = mp(t1.u, t1.v);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.strokeRect(q0[0], q0[1], q1[0] - q0[0], q1[1] - q0[1]);
    ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(q0[0], q0[1], q1[0] - q0[0], q1[1] - q0[1]);
    ctx.restore(); ctx.strokeStyle = '#2b4a66'; ctx.lineWidth = 1; ctx.strokeRect(x - 2.5, y - 2.5, mw + 5, mh + 5);
    R.miniBox = { x: x, y: y, w: mw, h: mh, toUV: function (sx, sy) { return { u: B.u1 + (sx - x) / k, v: B.v2 - (sy - y) / k }; } };
  };
  /* 데이터 블록 둘째 줄: 042↑ 180 = 4,200ft 상승 중 · 180kt */
  R.dblk = function (ac) { var al = Math.max(0, ac.alt || 0), vs = ac.st === 'final' && al > 30 ? -1 : ac.st === 'air' && al < (ac.maxAlt || 6000) - 10 ? 1 : 0,   /* 화살표는 실제 고도 변화로(수평 비행이면 없음 — GPT 9차 F9-02) */ kt = Math.round((ac.spd || 0) / 0.514444); return U.pad(Math.round(al / 100), 3) + (vs > 0 ? '↑' : vs < 0 ? '↓' : ' ') + ' ' + kt; };
  R.miniRadar = function (ctx, W, H, app) {
    var sim = app.sim, hd = R.hud(W, H), r = hd ? hd.r : Math.min(78, W * 0.11), cx = hd ? W - r - 8 : sim.flow.mini !== 'L' ? W - r - 12 : r + 12, cy = hd ? r + 6 : r + 12, sc = r / 13, i;
    ctx.fillStyle = 'rgba(4,8,12,.9)'; ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, 7); ctx.fill(); ctx.strokeStyle = '#2b4a66'; ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = '#132030'; [5, 10].forEach(function (d) { ctx.beginPath(); ctx.arc(cx, cy, d * sc, 0, 7); ctx.stroke(); });
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r + 3, 0, 7); ctx.clip();
    function mp(u, w) { return [cx + u / NM * sc, cy - w / NM * sc]; }
    ctx.strokeStyle = C.rwy; ctx.lineWidth = 2; Object.keys(D.rw).forEach(function (id) { var rw = D.rw[id], a = mp(rw.ua, rw.va), b = mp(rw.ub, rw.vb); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); });
    ctx.lineWidth = 1; ctx.font = '9px ' + MONO;
    var mb = [];
    sim.acs.forEach(function (a) {
      if (a.st !== 'final' && a.st !== 'air') return; var p = mp(a.u, a.v), col = a.emg ? C.emg : a.st === 'air' ? C.dep : C.arr; ctx.strokeStyle = col; ctx.strokeRect(p[0] - 2.5, p[1] - 2.5, 5, 5);
      var l2 = R.dblk(a), tw = Math.max(a.cs.length, l2.length) * 5.5, cs = [[p[0] - tw / 2, p[1] - 24], [p[0] - tw / 2, p[1] + 5], [p[0] - tw / 2, p[1] - 35], [p[0] - tw / 2, p[1] + 16], [p[0] + 6, p[1] - 10], [p[0] - tw - 6, p[1] - 10]], bi = 0, bc = 1e9, i, j, c;
      for (i = 0; i < cs.length; i++) { c = i * 2; for (j = 0; j < mb.length; j++) c += ov(cs[i][0], cs[i][1], tw, 20, mb[j].x - 1, mb[j].y - 1, mb[j].w + 2, mb[j].h + 2); if (c < bc) { bc = c; bi = i; } }
      mb.push({ x: cs[bi][0], y: cs[bi][1], w: tw, h: 20 }); mb.push({ x: p[0] - 4, y: p[1] - 4, w: 8, h: 8 });
      ctx.fillStyle = col; ctx.fillText(a.cs, cs[bi][0], cs[bi][1] + 5); ctx.fillStyle = '#9fb3c8'; ctx.fillText(l2, cs[bi][0], cs[bi][1] + 15);
    });
    ctx.restore(); ctx.fillStyle = '#6c8aa6'; ctx.font = '9px ' + MONO; if (hd) ctx.fillText('13NM', cx - 11, cy + r - 3); else ctx.fillText('TWR RADAR 13NM', cx - 40, cy + r - 6);
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
