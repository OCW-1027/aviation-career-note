/* AIRLINE SAGA — 조종사 체험 2단계: 787식 계기 화면(2D 캔버스에 그림 → 3D 조종석의 화면에 붙임)
   PFD(주 비행 표시) · ND(항법 표시) · EICAS(엔진 · 경고) · MCP(자동조종 패널). 로고 · 상표 없이 배치 · 색 · 동작만 실제와 비슷하게
   st = cockpit3d.js가 매 프레임 만드는 상태값 */
(function () {
  'use strict';
  var ATC = window.ATC;
  var MAG = '#ff5cf0', GRN = '#32e05a', CYN = '#2ee6ff', AMB = '#ffb21e', WHT = '#f2f4f6', GRY = '#8d96a0', SKY = '#2f78c8', GND = '#7a4d23', RED = '#ff3030';
  var MONO = '"Consolas","Menlo","DejaVu Sans Mono",monospace';
  function font(px, b) { return (b ? 'bold ' : '') + Math.round(px) + 'px ' + MONO; }
  function txt(c, s, x, y, col, px, al, b) { c.fillStyle = col; c.font = font(px, b); c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(s, x, y); }
  function box(c, x, y, w, h, col, lw) { c.strokeStyle = col; c.lineWidth = lw || 1.5; c.strokeRect(x, y, w, h); }
  function line(c, x1, y1, x2, y2, col, lw) { c.strokeStyle = col; c.lineWidth = lw || 1.5; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }
  function n360(a) { a %= 360; return a < 0 ? a + 360 : a; }
  function adiff(a, b) { var d = n360(b - a); return d > 180 ? d - 360 : d; }

  /* ---------------- PFD ---------------- */
  function pfd(c, W, H, st) {
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    var cx = W * 0.47, cy = H * 0.47, aw = W * 0.40, ah = H * 0.52, ppd = ah / 36;      /* 자세계 중심 · 크기 · 1°당 픽셀 */
    /* 자세계 */
    c.save(); c.beginPath(); roundRect(c, cx - aw / 2, cy - ah / 2, aw, ah, 18); c.clip();
    c.translate(cx, cy); c.rotate(-st.bank * Math.PI / 180);
    var py = st.pitch * ppd;
    c.fillStyle = SKY; c.fillRect(-W, -H * 2 + py, W * 2, H * 2); c.fillStyle = GND; c.fillRect(-W, py, W * 2, H * 2);
    line(c, -W, py, W, py, WHT, 2);
    c.lineWidth = 1.6; c.strokeStyle = WHT;
    for (var p = -30; p <= 30; p += 2.5) {
      if (!p) continue; var y = py - p * ppd, l = p % 10 === 0 ? aw * 0.22 : p % 5 === 0 ? aw * 0.11 : aw * 0.05;
      if (Math.abs(y) > ah * 0.42) continue;
      line(c, -l, y, l, y, WHT, 1.6);
      if (p % 10 === 0) { txt(c, Math.abs(p), -l - 6, y, WHT, H * 0.032, 'right'); txt(c, Math.abs(p), l + 6, y, WHT, H * 0.032, 'left'); }
    }
    /* 비행 지시기(FD) */
    if (st.fd) {
      c.rotate(st.bank * Math.PI / 180);
      var fr = Math.max(-1, Math.min(1, st.fdRoll / 25)) * aw * 0.3, fp = Math.max(-1, Math.min(1, st.fdPitch / 8)) * ah * 0.3;
      line(c, fr, -ah * 0.3, fr, ah * 0.3, MAG, 3); line(c, -aw * 0.3, -fp, aw * 0.3, -fp, MAG, 3);
    }
    c.restore();
    /* 경사계(뱅크 눈금) */
    c.save(); c.translate(cx, cy); var r = ah * 0.47;
    c.strokeStyle = WHT; c.lineWidth = 2;
    [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60].forEach(function (a) { var t = (a - 90) * Math.PI / 180, l = a % 30 === 0 ? 14 : 8; if (Math.abs(a) === 45) l = 7; c.beginPath(); c.moveTo(Math.cos(t) * r, Math.sin(t) * r); c.lineTo(Math.cos(t) * (r + l), Math.sin(t) * (r + l)); c.stroke(); });
    c.rotate(-st.bank * Math.PI / 180);
    c.fillStyle = Math.abs(st.bank) > 35 ? AMB : WHT; c.beginPath(); c.moveTo(0, -r + 2); c.lineTo(-9, -r + 16); c.lineTo(9, -r + 16); c.closePath(); c.fill();
    c.fillRect(-10 + (st.slip || 0) * 12, -r + 19, 20, 5);
    c.restore();
    /* 항공기 표지 */
    c.fillStyle = '#000'; c.strokeStyle = WHT; c.lineWidth = 2;
    [[-1, 1], [1, -1]].forEach(function (s) { c.beginPath(); var x0 = cx + s[0] * aw * 0.33, x1 = cx + s[0] * aw * 0.12; c.moveTo(x0, cy - 4); c.lineTo(x1, cy - 4); c.lineTo(x1, cy + 16); c.lineTo(x1 - s[0] * 9, cy + 16); c.lineTo(x1 - s[0] * 9, cy + 4); c.lineTo(x0, cy + 4); c.closePath(); c.fill(); c.stroke(); });
    c.fillRect(cx - 5, cy - 5, 10, 10); c.strokeRect(cx - 5, cy - 5, 10, 10);
    /* ILS 편차 */
    if (st.ils && st.ils.tuned) {
      var ix = cx, iy = cy + ah / 2 - 16; c.strokeStyle = WHT; c.lineWidth = 1.5;
      for (var k = -2; k <= 2; k++) if (k) { c.beginPath(); c.arc(ix + k * aw * 0.12, iy, 4, 0, 7); c.stroke(); }
      line(c, ix, iy - 9, ix, iy + 9, WHT, 2);
      if (st.ils.loc !== null) diamond(c, ix + Math.max(-2.3, Math.min(2.3, st.ils.loc)) * aw * 0.12, iy, 8, MAG, Math.abs(st.ils.loc) > 2.3);
      var gx = cx + aw / 2 - 16; for (k = -2; k <= 2; k++) if (k) { c.beginPath(); c.arc(gx, cy + k * ah * 0.12, 4, 0, 7); c.stroke(); }
      line(c, gx - 9, cy, gx + 9, cy, WHT, 2);
      if (st.ils.gs !== null) diamond(c, gx, cy + Math.max(-2.3, Math.min(2.3, st.ils.gs)) * ah * 0.12, 8, MAG, Math.abs(st.ils.gs) > 2.3);
      txt(c, st.ils.ident + '/' + st.ils.crs + '°', cx - aw / 2 + 6, cy - ah / 2 + 14, WHT, H * 0.03);
      txt(c, 'DME ' + (st.ils.dme !== null ? st.ils.dme.toFixed(1) : '---'), cx - aw / 2 + 6, cy - ah / 2 + 34, WHT, H * 0.03);
    }
    /* 전파고도 · 결심고도 */
    if (st.ra < 2500) {
      var ram = st.ra < 10 ? Math.round(st.ra) : st.ra < 50 ? Math.round(st.ra / 5) * 5 : Math.round(st.ra / 10) * 10;
      txt(c, ram, cx, cy + ah * 0.36, st.ra < st.mins ? AMB : WHT, H * 0.055, 'center', true);
    }
    if (st.minAlert) txt(c, 'MINIMUMS', cx, cy - ah * 0.34, AMB, H * 0.05, 'center', true);
    if (st.gpws) txt(c, st.gpws, cx, cy + ah * 0.24, RED, H * 0.05, 'center', true);
    /* 속도 테이프 */
    var sx = W * 0.06, sw = W * 0.12, sy = cy - ah * 0.55, sh = ah * 1.1, kpp = sh / 120;
    c.fillStyle = '#3b4148'; c.fillRect(sx, sy, sw, sh);
    c.save(); c.beginPath(); c.rect(sx, sy, sw, sh); c.clip();
    for (var v = Math.floor((st.ias - 70) / 10) * 10; v <= st.ias + 70; v += 10) {
      if (v < 30) continue; var yy = cy - (v - st.ias) * kpp * 2;
      line(c, sx + sw - 10, yy, sx + sw, yy, WHT, 1.5); if (v % 20 === 0) txt(c, v, sx + sw - 14, yy, WHT, H * 0.036, 'right');
    }
    /* 최대 속도(빨강 · 검정 띠) · 최소 기동 속도(주황) */
    var vmax = st.vmax, vmin = st.vmin;
    for (var yb = cy - (vmax - st.ias) * kpp * 2; yb > sy - 20; yb -= 14) { c.fillStyle = RED; c.fillRect(sx + sw - 7, yb - 7, 7, 7); c.fillStyle = '#000'; c.fillRect(sx + sw - 7, yb - 14, 7, 7); }
    var ymn = cy - (vmin - st.ias) * kpp * 2; c.strokeStyle = AMB; c.lineWidth = 3; c.beginPath(); c.moveTo(sx + sw - 4, ymn); c.lineTo(sx + sw - 4, sy + sh + 50); c.stroke();
    /* 플랩 기동 속도 표시 */
    (st.flapSpd || []).forEach(function (f) { var y2 = cy - (f[1] - st.ias) * kpp * 2; line(c, sx + sw, y2, sx + sw + 8, y2, GRN, 2); txt(c, f[0], sx + sw + 10, y2, GRN, H * 0.028); });
    if (st.vref) { var yr = cy - (st.vref - st.ias) * kpp * 2; line(c, sx + sw, yr, sx + sw + 10, yr, GRN, 2); txt(c, 'REF', sx + sw + 12, yr, GRN, H * 0.028); }
    /* 추세 화살표(10초 뒤 속도) */
    if (Math.abs(st.trend) > 1) { var yt = cy - st.trend * kpp * 2; line(c, sx + sw - 2, cy, sx + sw - 2, yt, GRN, 2.5); }
    c.restore();
    /* 지정 속도 표지 */
    var ys = cy - (st.sel.spd - st.ias) * kpp * 2; ys = Math.max(sy + 6, Math.min(sy + sh - 6, ys));
    c.strokeStyle = MAG; c.lineWidth = 2.5; c.beginPath(); c.moveTo(sx + sw, ys - 9); c.lineTo(sx + sw + 9, ys - 9); c.lineTo(sx + sw + 9, ys + 9); c.lineTo(sx + sw, ys + 9); c.lineTo(sx + sw + 5, ys); c.closePath(); c.stroke();
    txt(c, st.sel.spd, sx + sw / 2, sy - 16, MAG, H * 0.045, 'center', true);
    readout(c, sx - 2, cy, sw + 2, Math.round(st.ias), 3, H);
    txt(c, 'GS ' + Math.round(st.gs), sx, sy + sh + 18, WHT, H * 0.034);
    /* 고도 테이프 */
    var axx = W * 0.79, aww = W * 0.13, fpp = sh / 1000;
    c.fillStyle = '#3b4148'; c.fillRect(axx, sy, aww, sh);
    c.save(); c.beginPath(); c.rect(axx, sy, aww, sh); c.clip();
    for (var a = Math.floor((st.alt - 700) / 100) * 100; a <= st.alt + 700; a += 100) {
      var ya = cy - (a - st.alt) * fpp * 1.3; line(c, axx, ya, axx + 10, ya, WHT, 1.5); if (a % 200 === 0) txt(c, a, axx + 14, ya, WHT, H * 0.034);
    }
    /* 지면(활주로 고도) 표시 */
    var yg = cy - (st.elev - st.alt) * fpp * 1.3; if (yg < sy + sh + 40) { c.fillStyle = AMB; for (var xg = axx; xg < axx + aww; xg += 10) { c.beginPath(); c.moveTo(xg, yg); c.lineTo(xg + 10, yg); c.lineTo(xg, yg + 10); c.fill(); } line(c, axx, yg, axx + aww, yg, AMB, 2); }
    c.restore();
    var yS = cy - (st.sel.alt - st.alt) * fpp * 1.3; yS = Math.max(sy + 6, Math.min(sy + sh - 6, yS));
    c.strokeStyle = MAG; c.lineWidth = 2.5; c.beginPath(); c.moveTo(axx, yS - 10); c.lineTo(axx - 8, yS - 10); c.lineTo(axx - 8, yS + 10); c.lineTo(axx, yS + 10); c.lineTo(axx - 4, yS); c.closePath(); c.stroke();
    txt(c, st.sel.alt, axx + aww / 2, sy - 16, MAG, H * 0.045, 'center', true);
    readout(c, axx, cy, aww + 6, Math.round(st.alt), 5, H, true);
    txt(c, st.baro, axx + aww / 2, sy + sh + 18, GRN, H * 0.034, 'center');
    txt(c, 'MINS ' + st.mins, axx + aww / 2, sy + sh + 40, st.ra < st.mins + 100 ? AMB : GRN, H * 0.03, 'center');
    /* 승강계 */
    var vx = W * 0.935, vh = ah * 0.9; c.fillStyle = '#3b4148'; c.beginPath(); c.moveTo(vx, cy - vh / 2); c.lineTo(vx + W * 0.04, cy - vh / 2 + 20); c.lineTo(vx + W * 0.04, cy + vh / 2 - 20); c.lineTo(vx, cy + vh / 2); c.closePath(); c.fill();
    function vsy(f) { var s = f < 0 ? -1 : 1, a2 = Math.abs(f); var k2 = a2 <= 1000 ? a2 / 1000 * 0.5 : a2 <= 2000 ? 0.5 + (a2 - 1000) / 1000 * 0.25 : Math.min(1, 0.75 + (a2 - 2000) / 4000 * 0.25); return cy - s * k2 * vh / 2; }
    [-6000, -2000, -1000, 0, 1000, 2000, 6000].forEach(function (f) { var y3 = vsy(f); line(c, vx + 2, y3, vx + 9, y3, WHT, 1.5); if (f) txt(c, Math.abs(f / 1000), vx + 11, y3, WHT, H * 0.026); });
    line(c, vx + W * 0.06, cy, vx + 4, vsy(st.vs), WHT, 2.5);
    if (Math.abs(st.vs) >= 400) txt(c, Math.round(st.vs / 50) * 50, vx + W * 0.02, st.vs > 0 ? cy - vh / 2 - 12 : cy + vh / 2 + 12, WHT, H * 0.03, 'center');
    /* 방위(아래쪽 나침반 원호) */
    var hx = cx, hy = H * 1.12, hr = H * 0.33;
    c.save(); c.beginPath(); c.rect(0, H * 0.79, W, H * 0.21); c.clip();
    c.fillStyle = '#2b3036'; c.beginPath(); c.arc(hx, hy, hr, 0, 7); c.fill();
    for (var h = 0; h < 360; h += 5) {
      var t2 = (adiff(st.hdg, h) - 90) * Math.PI / 180, l2 = h % 10 === 0 ? 12 : 6;
      c.strokeStyle = WHT; c.lineWidth = 1.5; c.beginPath(); c.moveTo(hx + Math.cos(t2) * hr, hy + Math.sin(t2) * hr); c.lineTo(hx + Math.cos(t2) * (hr - l2), hy + Math.sin(t2) * (hr - l2)); c.stroke();
      if (h % 30 === 0) { c.save(); c.translate(hx + Math.cos(t2) * (hr - 26), hy + Math.sin(t2) * (hr - 26)); c.rotate(t2 + Math.PI / 2); txt(c, h / 10, 0, 0, WHT, H * 0.034, 'center'); c.restore(); }
    }
    var tb = (adiff(st.hdg, st.sel.hdg) - 90) * Math.PI / 180; c.save(); c.translate(hx + Math.cos(tb) * hr, hy + Math.sin(tb) * hr); c.rotate(tb + Math.PI / 2); c.strokeStyle = MAG; c.lineWidth = 2.5; c.strokeRect(-8, -2, 16, 9); c.restore();
    c.restore();
    c.fillStyle = WHT; c.beginPath(); c.moveTo(hx, hy - hr - 2); c.lineTo(hx - 7, hy - hr - 14); c.lineTo(hx + 7, hy - hr - 14); c.closePath(); c.fill();
    txt(c, pad(Math.round(n360(st.hdg)) || 360, 3), hx, H * 0.775, WHT, H * 0.04, 'center', true); txt(c, 'MAG', hx + W * 0.06, H * 0.775, GRN, H * 0.03);
    txt(c, 'H ' + pad(st.sel.hdg, 3), hx - W * 0.16, H * 0.82, MAG, H * 0.032);
    /* 비행 모드 표시(FMA) */
    var fy = H * 0.045, fw = aw / 3;
    [['spd', st.fma.at], ['roll', st.fma.roll], ['pitch', st.fma.pitch]].forEach(function (f, i) {
      var fx = cx - aw / 2 + fw * i; if (i) line(c, fx, fy - 12, fx, fy + 30, WHT, 1.2);
      txt(c, f[1] || '', fx + fw / 2, fy, GRN, H * 0.04, 'center', true);
      var arm = { roll: st.fma.rollArm, pitch: st.fma.pitchArm }[f[0]]; if (arm) txt(c, arm, fx + fw / 2, fy + 24, WHT, H * 0.03, 'center');
      if (st.fmaNew && st.fmaNew[f[0]]) box(c, fx + 6, fy - 13, fw - 12, 26, GRN, 1.5);
    });
    txt(c, st.fma.ap, cx, cy - ah / 2 + 18, GRN, H * 0.045, 'center', true);
  }
  function readout(c, x, y, w, v, digits, H, alt) {
    var h = H * 0.075; c.fillStyle = '#000'; c.strokeStyle = WHT; c.lineWidth = 2;
    c.beginPath(); if (alt) { c.moveTo(x - 10, y); c.lineTo(x, y - h / 2); c.lineTo(x + w, y - h / 2); c.lineTo(x + w, y + h / 2); c.lineTo(x, y + h / 2); } else { c.moveTo(x, y - h / 2); c.lineTo(x + w, y - h / 2); c.lineTo(x + w + 10, y); c.lineTo(x + w, y + h / 2); c.lineTo(x, y + h / 2); } c.closePath(); c.fill(); c.stroke();
    var s = String(Math.abs(v)); if (alt && v < 0) s = '-' + s;
    if (alt && Math.abs(v) >= 100) { var hi = s.slice(0, -2), lo = s.slice(-2); txt(c, hi, x + w * 0.62, y, WHT, h * 0.75, 'right', true); txt(c, lo, x + w * 0.64, y, WHT, h * 0.55, 'left', true); }
    else txt(c, s, x + w / 2, y, WHT, h * 0.75, 'center', true);
  }
  function diamond(c, x, y, r, col, hollow) { c.beginPath(); c.moveTo(x, y - r); c.lineTo(x + r, y); c.lineTo(x, y + r); c.lineTo(x - r, y); c.closePath(); if (hollow) { c.strokeStyle = col; c.lineWidth = 2; c.stroke(); } else { c.fillStyle = col; c.fill(); } }
  function roundRect(c, x, y, w, h, r) { c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

  /* ---------------- ND(지도, 기수 위) ---------------- */
  function nd(c, W, H, st) {
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    var cx = W * 0.5, cy = H * 0.82, R = H * 0.66, rng = st.range, ppn = R / rng, hd = st.hdg;
    function sc(p) { var dx = p.x - st.pos.x, dy = p.y - st.pos.y, a = -hd * Math.PI / 180; return { x: cx + (dx * Math.cos(a) - dy * Math.sin(a)) * ppn, y: cy - (dx * Math.sin(a) + dy * Math.cos(a)) * ppn }; }
    c.save(); c.beginPath(); c.arc(cx, cy, R + 4, Math.PI, 0); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.clip();
    /* 거리 원 */
    c.strokeStyle = 'rgba(242,244,246,.5)'; c.lineWidth = 1; c.setLineDash([4, 6]); c.beginPath(); c.arc(cx, cy, R / 2, Math.PI, 0); c.stroke(); c.setLineDash([]);
    txt(c, rng / 2, cx - R / 2 + 4, cy - 10, WHT, H * 0.03);
    /* 활주로 · 최종 접근로 */
    (st.rwys || []).forEach(function (r) { var a = sc(r.a), b = sc(r.b); line(c, a.x, a.y, b.x, b.y, WHT, 4); });
    if (st.ils && st.ils.tuned && st.ils.thr) { var t1 = sc(st.ils.thr), far = { x: st.ils.thr.x - Math.sin(st.ils.crs * Math.PI / 180) * 15, y: st.ils.thr.y - Math.cos(st.ils.crs * Math.PI / 180) * 15 }, t2 = sc(far); c.setLineDash([10, 6]); line(c, t1.x, t1.y, t2.x, t2.y, WHT, 1.5); c.setLineDash([]); }
    /* 주변 지점 */
    (st.fixes || []).forEach(function (f) { var p = sc(f); if (Math.hypot(p.x - cx, p.y - cy) > R) return; c.strokeStyle = CYN; c.lineWidth = 1.5; c.beginPath(); c.moveTo(p.x, p.y - 6); c.lineTo(p.x + 5, p.y + 4); c.lineTo(p.x - 5, p.y + 4); c.closePath(); c.stroke(); txt(c, f.id, p.x + 8, p.y, CYN, H * 0.026); });
    /* 경로(자홍) */
    if (st.route && st.route.length) {
      c.strokeStyle = MAG; c.lineWidth = 2.5; c.beginPath(); var p0 = sc(st.pos); c.moveTo(p0.x, p0.y);
      st.route.forEach(function (f) { var p = sc(f); c.lineTo(p.x, p.y); }); c.stroke();
      st.route.forEach(function (f, i) { var p = sc(f); star(c, p.x, p.y, 8, i ? WHT : MAG); txt(c, f.id, p.x + 10, p.y - 10, i ? WHT : MAG, H * 0.032); });
    }
    /* 지정 방위선 */
    var sb = adiff(hd, st.sel.hdg) * Math.PI / 180; c.setLineDash([8, 6]); line(c, cx, cy, cx + Math.sin(sb) * R, cy - Math.cos(sb) * R, MAG, 1.5); c.setLineDash([]);
    /* 주변 항공기(TCAS) */
    (st.traffic || []).forEach(function (t) {
      var p = sc(t), dalt = Math.round((t.alt - st.alt) / 100); if (Math.hypot(p.x - cx, p.y - cy) > R) return;
      var near = Math.abs(dalt) < 12 && Math.hypot(t.x - st.pos.x, t.y - st.pos.y) < 6, col = near ? CYN : WHT;
      diamond(c, p.x, p.y, 7, col, !near);
      txt(c, (dalt >= 0 ? '+' : '-') + pad(Math.abs(dalt), 2), p.x, dalt >= 0 ? p.y - 15 : p.y + 15, col, H * 0.028, 'center');
      if (Math.abs(t.vs) > 500) txt(c, t.vs > 0 ? '↑' : '↓', p.x + 12, p.y, col, H * 0.03);
    });
    c.restore();
    /* 나침반 원호 */
    c.strokeStyle = WHT; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, R, Math.PI * 1.08, Math.PI * 1.92); c.stroke();
    for (var h = 0; h < 360; h += 5) {
      var d = adiff(hd, h); if (Math.abs(d) > 62) continue; var t = (d - 90) * Math.PI / 180, l = h % 10 === 0 ? 14 : 7;
      line(c, cx + Math.cos(t) * R, cy + Math.sin(t) * R, cx + Math.cos(t) * (R + l), cy + Math.sin(t) * (R + l), WHT, 1.5);
      if (h % 30 === 0) txt(c, h / 10, cx + Math.cos(t) * (R + 26), cy + Math.sin(t) * (R + 26), WHT, H * 0.036, 'center');
    }
    /* 지정 방위 표지(원호 위) */
    if (Math.abs(adiff(hd, st.sel.hdg)) < 62) { var tb = (adiff(hd, st.sel.hdg) - 90) * Math.PI / 180; c.save(); c.translate(cx + Math.cos(tb) * R, cy + Math.sin(tb) * R); c.rotate(tb + Math.PI / 2); c.strokeStyle = MAG; c.lineWidth = 2.5; c.strokeRect(-9, -11, 18, 11); c.restore(); }
    /* 기수 방위 상자 */
    box(c, cx - 34, cy - R - 58, 68, 30, WHT, 2); txt(c, pad(Math.round(n360(hd)) || 360, 3), cx, cy - R - 43, WHT, H * 0.045, 'center', true); txt(c, 'MAG', cx + 40, cy - R - 43, GRN, H * 0.03);
    /* 내 항공기 */
    c.strokeStyle = WHT; c.lineWidth = 3; c.beginPath(); c.moveTo(cx, cy - 18); c.lineTo(cx - 12, cy + 12); c.moveTo(cx, cy - 18); c.lineTo(cx + 12, cy + 12); c.moveTo(cx - 9, cy + 4); c.lineTo(cx + 9, cy + 4); c.stroke();
    /* 글자 */
    txt(c, 'GS', 12, 22, WHT, H * 0.03); txt(c, Math.round(st.gs), 44, 22, WHT, H * 0.042, 'left', true); txt(c, 'TAS', 110, 22, WHT, H * 0.03); txt(c, Math.round(st.tas), 148, 22, WHT, H * 0.042, 'left', true);
    txt(c, pad(st.wind.dir, 3) + '°/' + st.wind.spd, 12, 52, WHT, H * 0.036);
    var wa = (st.wind.dir + 180 - hd) * Math.PI / 180; c.save(); c.translate(36, 92); c.rotate(wa); line(c, 0, -18, 0, 18, WHT, 2); c.beginPath(); c.moveTo(0, 18); c.lineTo(-6, 8); c.lineTo(6, 8); c.closePath(); c.fillStyle = WHT; c.fill(); c.restore();
    if (st.next) { txt(c, st.next.id, W - 12, 22, MAG, H * 0.04, 'right', true); txt(c, st.next.eta, W - 12, 50, WHT, H * 0.034, 'right'); txt(c, st.next.d.toFixed(1) + ' NM', W - 12, 76, WHT, H * 0.034, 'right'); }
    if (st.ils && st.ils.tuned) txt(c, 'ILS ' + st.ils.rwy + ' ' + st.ils.freq, W - 12, H - 20, GRN, H * 0.032, 'right');
    txt(c, 'TFC', 12, H - 20, CYN, H * 0.03);
  }
  function star(c, x, y, r, col) { c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4, rr = i % 2 ? r * 0.35 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.stroke(); }

  /* ---------------- EICAS ---------------- */
  function eicas(c, W, H, st) {
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    [0, 1].forEach(function (e) { dial(c, W * (0.18 + e * 0.27), H * 0.2, H * 0.13, st.n1[e], 110, 'N1', st.n1[e].toFixed(1)); dial(c, W * (0.18 + e * 0.27), H * 0.52, H * 0.1, st.egt[e], 1000, 'EGT', Math.round(st.egt[e])); });
    txt(c, 'TAT ' + st.tat + 'c', W * 0.06, H * 0.04, CYN, H * 0.032);
    /* 경고 · 주의 문구 */
    var my = H * 0.08; (st.msgs || []).forEach(function (m) { txt(c, m[0], W * 0.62, my, m[1] === 'warn' ? RED : m[1] === 'caut' ? AMB : WHT, H * 0.04, 'left', true); my += H * 0.055; });
    /* 기어 */
    var gx = W * 0.64, gy = H * 0.62;
    txt(c, 'GEAR', gx + W * 0.12, gy - H * 0.06, CYN, H * 0.032, 'center');
    if (st.gear === 'down') { c.fillStyle = '#000'; box(c, gx, gy - H * 0.03, W * 0.24, H * 0.07, GRN, 2.5); txt(c, 'DOWN', gx + W * 0.12, gy + H * 0.005, GRN, H * 0.05, 'center', true); }
    else if (st.gear === 'transit') { c.fillStyle = '#fff'; c.save(); c.setLineDash([6, 4]); box(c, gx, gy - H * 0.03, W * 0.24, H * 0.07, WHT, 2); c.restore(); }
    else { box(c, gx, gy - H * 0.03, W * 0.24, H * 0.07, WHT, 2); txt(c, 'UP', gx + W * 0.12, gy + H * 0.005, WHT, H * 0.05, 'center', true); }
    /* 플랩 */
    var fx = W * 0.92, fy = H * 0.55, fh = H * 0.36, dets = [0, 1, 5, 15, 20, 25, 30];
    txt(c, 'FLAPS', fx, fy - H * 0.05, CYN, H * 0.032, 'center');
    box(c, fx - 9, fy, 18, fh, WHT, 1.5);
    var fpos = function (f) { var i = dets.indexOf(f); if (i < 0) { for (i = 0; i < dets.length - 1 && dets[i + 1] < f; i++); var k = (f - dets[i]) / (dets[i + 1] - dets[i]); return fy + (i + k) / 6 * fh; } return fy + i / 6 * fh; };
    c.fillStyle = WHT; var fyv = fpos(st.flapPos); c.fillRect(fx - 8, fy, 16, fyv - fy);
    line(c, fx - 18, fpos(st.flap), fx + 18, fpos(st.flap), MAG, 3);
    txt(c, st.flap ? st.flap : 'UP', fx - 26, fpos(st.flap), st.flapPos === st.flap ? GRN : MAG, H * 0.04, 'right', true);
    /* 연료 */
    txt(c, 'TOTAL FUEL', W * 0.08, H * 0.82, CYN, H * 0.032); txt(c, st.fuel.toFixed(1), W * 0.34, H * 0.82, WHT, H * 0.05, 'left', true); txt(c, 'KGS X 1000', W * 0.46, H * 0.82, CYN, H * 0.026);
    txt(c, 'GROSS WT ' + st.gw.toFixed(1), W * 0.08, H * 0.9, WHT, H * 0.032);
  }
  function dial(c, x, y, r, v, max, lab, s) {
    var a0 = Math.PI * 0.75, span = Math.PI * 1.25, a = a0 + span * Math.min(1, v / max);
    c.fillStyle = '#1b2026'; c.beginPath(); c.moveTo(x, y); c.arc(x, y, r, a0, a); c.closePath(); c.fill();
    c.strokeStyle = WHT; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r, a0, a0 + span); c.stroke();
    c.strokeStyle = RED; c.lineWidth = 4; c.beginPath(); c.arc(x, y, r, a0 + span * 0.96, a0 + span); c.stroke();
    line(c, x, y, x + Math.cos(a) * r, y + Math.sin(a) * r, WHT, 3);
    c.fillStyle = '#000'; c.fillRect(x + 4, y - r * 0.55, r * 1.05, r * 0.42); box(c, x + 4, y - r * 0.55, r * 1.05, r * 0.42, WHT, 1.5);
    txt(c, s, x + 4 + r * 0.98, y - r * 0.34, WHT, r * 0.32, 'right', true);
    txt(c, lab, x, y + r * 0.6, CYN, r * 0.24, 'center');
  }

  /* ---------------- MCP(눈가림판 위 자동조종 패널) ---------------- */
  /* 반환: 누를 수 있는 곳 [{x,y,w,h, act}] (0 ~ 1 비율) */
  function mcp(c, W, H, st) {
    var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#4b5158'); g.addColorStop(1, '#353a40'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    var hits = [];
    function win(x, w, lab, val, col) { txt(c, lab, x + w / 2, H * 0.17, WHT, H * 0.13, 'center'); c.fillStyle = '#05070a'; c.fillRect(x, H * 0.28, w, H * 0.3); txt(c, val, x + w / 2, H * 0.43, col || '#ffb43c', H * 0.22, 'center', true); }
    function knob(x, act) { var r = H * 0.16, y = H * 0.76; var gr = c.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#9aa1a8'); gr.addColorStop(1, '#2a2e33'); c.fillStyle = gr; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); txt(c, '−', x - r * 1.9, y, WHT, H * 0.2, 'center', true); txt(c, '+', x + r * 1.9, y, WHT, H * 0.2, 'center', true); hits.push({ x: (x - r * 2.6) / W, y: (y - r * 1.2) / H, w: r * 2.4 / W, h: r * 2.4 / H, act: act + '-' }); hits.push({ x: (x + r * 0.2) / W, y: (y - r * 1.2) / H, w: r * 2.4 / W, h: r * 2.4 / H, act: act + '+' }); }
    function btn(x, w, lab, on, act) { var y = H * 0.66, h = H * 0.24; c.fillStyle = '#23272c'; c.fillRect(x, y, w, h); c.strokeStyle = '#11141a'; c.strokeRect(x, y, w, h); if (on) { c.fillStyle = GRN; c.fillRect(x + w * 0.2, y + 3, w * 0.6, 4); } txt(c, lab, x + w / 2, y + h * 0.6, WHT, H * 0.12, 'center', true); hits.push({ x: x / W, y: y / H, w: w / W, h: h / H, act: act }); }
    var u = W / 100;
    btn(1.5 * u, 6 * u, 'A/T', st.at, 'at');
    win(9 * u, 10 * u, 'IAS/MACH', st.sel.spd); knob(14 * u, 'spd');
    btn(21 * u, 6 * u, 'LNAV', st.fma.roll === 'LNAV' || st.fma.rollArm === 'LNAV', 'lnav'); btn(28 * u, 6 * u, 'VNAV', false, 'vnav'); btn(35 * u, 6 * u, 'FLCH', st.fma.pitch === 'FLCH SPD', 'flch');
    win(43 * u, 10 * u, 'HEADING', pad(st.sel.hdg, 3)); knob(48 * u, 'hdg');
    btn(55 * u, 6 * u, 'HDG SEL', st.fma.roll === 'HDG SEL', 'hdgsel');
    win(63 * u, 10 * u, 'ALTITUDE', st.sel.alt); knob(68 * u, 'alt');
    btn(75 * u, 6 * u, 'ALT', false, 'altset');
    btn(83 * u, 6 * u, 'LOC', st.fma.roll === 'LOC' || st.fma.rollArm === 'LOC', 'loc'); btn(90 * u, 6 * u, 'APP', st.fma.pitch === 'G/S' || st.fma.pitchArm === 'G/S', 'app');
    txt(c, 'A/P', 97 * u, H * 0.2, WHT, H * 0.12, 'center'); c.fillStyle = st.ap ? GRN : '#555'; c.fillRect(95.5 * u, H * 0.3, 3 * u, H * 0.12);
    return hits;
  }
  ATC.CDisp = { pfd: pfd, nd: nd, eicas: eicas, mcp: mcp };
})();
