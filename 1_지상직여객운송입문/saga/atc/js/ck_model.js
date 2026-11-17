/* 관제편 조종사 체험 — 3D 모형(32차): 바깥에서 보는 787 · 주기장 항공기 · 공항 건물 · 관제탑 · 하늘 · 바다
   좌표: 앞 = −Z, 위 = +Y, 오른쪽 = +X. 항공기 모형의 원점 = 바퀴가 땅에 닿는 점(동체 중심선은 5.0m 위) */
(function () {
  'use strict';
  var M = ATC.CkModel = {};
  var T = null, H = null, K = {};
  var CL = 5.0;      /* 땅에서 동체 중심선까지(m) */
  M.init = function (three, helpers) { if (T !== three) K = {}; T = three; H = helpers; };

  /* ---------- 도우미 ---------- */
  function tex(w, h, draw) { return H.canvasTex(w, h, draw); }
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function smooth(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
  function rnd(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

  /* 동체 반지름 · 중심선 높이(z = −29 기수 끝 ~ 29.5 꼬리 끝) */
  function fr(z) {
    if (z < -21) { var t = (z + 29) / 8; return 2.9 * Math.pow(Math.max(0, 1 - (1 - t) * (1 - t)), 0.5); }
    if (z <= 12) return 2.9;
    var u = (z - 12) / 17.5; return 0.45 + 2.45 * (1 - Math.pow(u, 1.5));
  }
  function fy(z) { if (z < -22) { var a = (-22 - z) / 7; return -0.85 * a * a; } if (z > 12) return 2.0 * Math.pow((z - 12) / 17.5, 1.7); return 0; }

  /* 날개 · 꼬리날개(익형 단면을 이어 붙인 판) — st: [{s 폭 방향 좌표, le 앞전 z, ch 시위, th 두께비, o 두께 방향 기준}] */
  function surf(st, ax, camber) {
    var NC = 12, cs = [], pos = [], uv = [], idx = [], R;
    for (var i = 0; i <= NC; i++) cs.push((1 - Math.cos(Math.PI * i / NC)) / 2);
    function yt(c, tf) { return 5 * tf * (0.2969 * Math.sqrt(c) - 0.126 * c - 0.3516 * c * c + 0.2843 * c * c * c - 0.1036 * c * c * c * c); }
    st.forEach(function (q, k) {
      var ring = []; for (i = NC; i >= 0; i--) ring.push([cs[i], 1]); for (i = 1; i <= NC; i++) ring.push([cs[i], -1]);
      R = ring.length;
      ring.forEach(function (rp) {
        var c = rp[0], t = yt(c, q.th) * q.ch * rp[1], cb = (camber || 0) * q.ch * 4 * c * (1 - c), z = q.le + c * q.ch;
        if (ax === 'x') pos.push(q.s, q.o + cb + t, z); else pos.push(q.o + t, q.s, z);
        uv.push(c, k / (st.length - 1));
      });
    });
    for (var k = 0; k < st.length - 1; k++) for (var j = 0; j < R - 1; j++) { var a = k * R + j, b = (k + 1) * R + j; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    var last = st[st.length - 1], cen = pos.length / 3; if (ax === 'x') pos.push(last.s, last.o, last.le + last.ch * 0.4); else pos.push(last.o, last.s, last.le + last.ch * 0.4); uv.push(0.4, 1);
    for (j = 0; j < R - 1; j++) idx.push((st.length - 1) * R + j, cen, (st.length - 1) * R + j + 1);
    var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g;
  }
  function mirror(g) { var m = g.clone(); m.scale(-1, 1, 1); var ix = m.index.array; for (var i = 0; i < ix.length; i += 3) { var t = ix[i]; ix[i] = ix[i + 2]; ix[i + 2] = t; } m.index.needsUpdate = true; m.computeVertexNormals(); return m; }
  function lathe(pts, seg) { var g = new T.LatheGeometry(pts.slice().reverse().map(function (p) { return new T.Vector2(p[0], -p[1]); }), seg || 24);      /* 꼬리 → 기수 순서여야 면이 바깥을 향함 */ g.rotateX(-Math.PI / 2); return g; }      /* pts: [반지름, z] — 회전축 = Z */

  /* ---------- 도장(동체 무늬) ---------- */
  var FW = 1024, FH = 2048;
  function X(phi) { return phi / 360 * FW; }
  function Y(z) { return FH - (z + 29) / 58.5 * FH; }
  var DOORS = [-20.3, -7.5, 5.5, 17.5];
  function fusTex(vela) {
    return tex(FW, FH, function (c) {
      c.fillStyle = '#f3f5f7'; c.fillRect(0, 0, FW, FH);
      if (!vela) { c.fillStyle = '#d8dde2'; c.fillRect(X(128), 0, X(104), FH); }
      else {
        var pb = function (z) { if (z < -12) return 180; if (z < 8) return 180 - 55 * smooth((z + 12) / 20); return 125 - 85 * smooth((z - 8) / 21.5); };
        var band = function (a, b, col) { c.fillStyle = col; c.beginPath(); var z; for (z = -14; z <= 29.6; z += 0.5) c.lineTo(X(pb(z) - a), Y(z)); for (z = 29.6; z >= -14; z -= 0.5) c.lineTo(X(pb(z) - b), Y(z)); c.closePath(); c.fill(); c.beginPath(); for (z = -14; z <= 29.6; z += 0.5) c.lineTo(X(360 - pb(z) + a), Y(z)); for (z = 29.6; z >= -14; z -= 0.5) c.lineTo(X(360 - pb(z) + b), Y(z)); c.closePath(); c.fill(); };
        c.fillStyle = '#1f6fd0'; c.beginPath(); var z;
        for (z = -12; z <= 29.6; z += 0.5) c.lineTo(X(pb(z)), Y(z)); for (z = 29.6; z >= -12; z -= 0.5) c.lineTo(X(360 - pb(z)), Y(z)); c.closePath(); c.fill();
        band(9, 5, '#bfe3ff'); band(4.2, 3, '#1a5cb0');
        /* 이름: VELA AIR(가상 항공사) — 양옆, 창문 위 */
        [[47, 1], [313, -1]].forEach(function (q) {
          c.save(); c.translate(X(q[0]), Y(-11.5)); c.rotate(q[1] > 0 ? -Math.PI / 2 : Math.PI / 2); c.scale(1, 1);
          c.fillStyle = '#14408a'; c.font = 'italic 800 78px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.scale(-1, 1); c.save(); c.scale(1.45, 1); c.fillText('VELA AIR', 0, 0); c.restore();
          c.fillStyle = '#1f6fd0'; star(c, -282, -2, 26); c.restore();
        });
      }
      /* 문 · 창문 */
      c.strokeStyle = '#b3bac2'; c.lineWidth = 2.5;
      [68, 292].forEach(function (pw) {
        DOORS.forEach(function (dz) { var y0 = Y(dz + 0.53), w = Y(dz - 0.53) - y0, x0 = X(pw < 180 ? 50 : 272), ww = X(38); rr(c, x0, y0, ww, w, 6); c.stroke(); });
        c.fillStyle = '#1b2632';
        for (var wz = -17.6; wz <= 15.6; wz += 0.95) {
          if (DOORS.some(function (d) { return Math.abs(d - wz) < 1.0; })) continue;
          if (wz > -1.5 && wz < 1.0) continue;      /* 날개 위 비상구 자리 */
          rr(c, X(pw) - 13, Y(wz) - 5.5, 26, 11, 4.5); c.fill();
        }
      });
      /* 조종석 창 */
      c.fillStyle = '#10161d';
      [1, -1].forEach(function (sd) {
        function ph(p) { return sd > 0 ? p : 360 - p; }
        [[[2.5, -27.3], [22, -27.05], [40, -26.6], [43, -24.85], [24, -25.4], [3.5, -25.9]], [[46, -25.05], [60, -25.6], [64, -24.05], [48, -24.6]]].forEach(function (poly) {      /* 앞 창(큰 것) · 옆 창 — 아랫선이 동체 중심보다 약 1m 위 */
          c.beginPath(); poly.forEach(function (p, i) { if (i) c.lineTo(X(ph(p[0])), Y(p[1])); else c.moveTo(X(ph(p[0])), Y(p[1])); }); c.closePath(); c.fill();
        });
      });
    });
  }
  function star(c, x, y, r) { c.beginPath(); for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4, q = i % 2 ? r * 0.32 : r; c.lineTo(x + Math.sin(a) * q, y - Math.cos(a) * q); } c.closePath(); c.fill(); }
  function finTex() {
    return tex(512, 512, function (c, w, h) {
      var g = c.createLinearGradient(0, h, 0, 0); g.addColorStop(0, '#174f9a'); g.addColorStop(1, '#2a7ee0'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#bfe3ff'; c.lineWidth = 16; c.beginPath(); c.arc(w * 0.95, h * 1.25, h * 0.95, Math.PI * 1.08, Math.PI * 1.42); c.stroke();
      c.fillStyle = '#ffffff'; star(c, w * 0.6, h * 0.42, 70); c.fillStyle = '#bfe3ff'; star(c, w * 0.42, h * 0.62, 26); star(c, w * 0.76, h * 0.66, 20); star(c, w * 0.5, h * 0.2, 16);
    });
  }
  function noiseTex(n, base, amp, seed) {
    return tex(n, n, function (c, w, h) { var R = rnd(seed || 7); c.fillStyle = base; c.fillRect(0, 0, w, h); for (var k = 0; k < w * h / 18; k++) { var v = Math.floor(R() * 255); c.fillStyle = 'rgba(' + v + ',' + v + ',' + v + ',' + amp + ')'; c.fillRect(R() * w, R() * h, 1 + R() * 3, 1 + R() * 3); } });
  }

  /* ---------- 형상(한 번만 만들어 모든 항공기가 함께 씀) ---------- */
  function geos() {
    if (K.g) return K.g;
    var g = K.g = {}, zs = [], z;
    for (var k = 0; k <= 12; k++) zs.push(-29 + 8 * Math.pow(k / 12, 1.6));
    for (z = -19.5; z <= 12; z += 1.5) zs.push(z);
    for (z = 12.9; z < 29.5; z += 0.9) zs.push(z); zs.push(29.5);
    var fus = lathe(zs.map(function (q) { return [fr(q), q]; }), 32), p = fus.attributes.position, uv = fus.attributes.uv, n = zs.length; zs = zs.slice().reverse();
    for (var i = 0; i < p.count; i++) { var j = i % n; p.setY(i, p.getY(i) + fy(zs[j])); uv.setY(i, (zs[j] + 29) / 58.5); }      /* 무늬 0° = 동체 위 */
    g.fus = fus;
    var wingR = surf([
      { s: 2.0, le: -5.9, ch: 12.2, th: 0.13, o: -1.75 }, { s: 9.5, le: -1.3, ch: 7.6, th: 0.11 }, { s: 18, le: 4.0, ch: 5.2, th: 0.10 },
      { s: 26.5, le: 9.3, ch: 3.0, th: 0.09 }, { s: 29, le: 11.6, ch: 1.9, th: 0.08 }, { s: 30.1, le: 13.1, ch: 0.9, th: 0.07 }
    ].map(function (q) { q.o = -1.75 + (q.s - 2.0) * 0.105 + 0.5 * Math.pow((q.s - 2.0) / 28.1, 2); return q; }), 'x', 0.02);
    g.wing = wingR; g.wingL = mirror(wingR);
    var hs = surf([{ s: 0.6, le: 21.4, ch: 6.0, th: 0.1 }, { s: 5, le: 24.2, ch: 4.0, th: 0.1 }, { s: 10.2, le: 27.2, ch: 1.8, th: 0.09 }].map(function (q) { q.o = 1.25 + q.s * 0.12; return q; }), 'x');
    g.hs = hs; g.hsL = mirror(hs);
    g.fin = surf([{ s: 2.2, le: 19.0, ch: 9.9, th: 0.11, o: 0 }, { s: 7, le: 23.4, ch: 6.5, th: 0.1, o: 0 }, { s: 12.6, le: 27.5, ch: 3.0, th: 0.09, o: 0 }], 'y');
    g.nac = lathe([[1.36, -3.7], [1.58, -3.55], [1.7, -2.9], [1.71, -1.4], [1.62, 0.5], [1.44, 2.2], [1.24, 3.4], [1.16, 3.7]], 28);
    g.core = lathe([[1.0, 3.3], [0.95, 4.3], [0.6, 5.2], [0.05, 5.9]], 20);
    g.spin = lathe([[0.02, -3.85], [0.32, -3.6], [0.5, -3.2]], 16);
    g.fan = new T.CircleGeometry(1.36, 28); g.fan.rotateY(Math.PI); g.fan.translate(0, 0, -3.2);
    g.pylon = surf([{ s: 1.3, le: -2.2, ch: 6.4, th: 0.09, o: 0 }, { s: 2.25, le: -1.2, ch: 6.0, th: 0.09, o: 0 }], 'y');
    g.fair = new T.SphereGeometry(1, 24, 12); g.fair.scale(3.0, 1.35, 11.5);
    g.wheel = new T.CylinderGeometry(0.62, 0.62, 0.42, 16); g.wheel.rotateZ(Math.PI / 2);
    g.nwheel = new T.CylinderGeometry(0.48, 0.48, 0.32, 14); g.nwheel.rotateZ(Math.PI / 2);
    g.strut = new T.CylinderGeometry(0.17, 0.17, 1, 8); g.strut.translate(0, 0.5, 0);
    g.beam = new T.BoxGeometry(0.26, 0.26, 2.0);
    return g;
  }
  function mats() {
    if (K.m) return K.m;
    var std = function (o) { var q = new T.MeshStandardMaterial(Object.assign({ roughness: 0.38, metalness: 0.08 }, o)); envOn(q); return q; };
    var m = K.m = {
      body: std({ map: wrapS(fusTex(false)) }), bodyV: std({ map: wrapS(fusTex(true)) }),
      wing: std({ color: 0xdfe3e8, roughness: 0.5, metalness: 0.22, side: T.DoubleSide }),
      nac: std({ color: 0xe8ebee, side: T.DoubleSide }), nacV: std({ color: 0x1f6fd0, side: T.DoubleSide }),
      dark: std({ color: 0x1e2226, roughness: 0.7, side: T.DoubleSide }), metal: std({ color: 0x8b9097, metalness: 0.55, roughness: 0.35, side: T.DoubleSide }),
      finV: std({ map: finTex(), side: T.DoubleSide }), fair: std({ color: 0xd9dde2 }),
      tire: std({ color: 0x1a1c1f, roughness: 0.85, metalness: 0 }), strut: std({ color: 0x9ea4aa, metalness: 0.5, roughness: 0.4 })
    };
    m.fin = {}; return m;
  }
  function wrapS(t) { t.wrapS = T.RepeatWrapping; return t; }
  function finMat(col) { var m = mats(); if (!m.fin[col]) { m.fin[col] = new T.MeshStandardMaterial({ color: new T.Color(col), roughness: 0.4, metalness: 0.08, side: T.DoubleSide }); envOn(m.fin[col]); } return m.fin[col]; }
  /* 둘레 빛(하늘 · 땅을 비추는 반사) — 동체가 어둡게 보이지 않게 */
  function envOn(q) { (K.envM = K.envM || []).push(q); if (K.env) { q.envMap = K.env; q.envMapIntensity = K.envI == null ? 1 : K.envI; } }
  M.env = function (renderer) {
    if (K.env && K.envR === renderer) return K.env; K.envR = renderer;
    var sc = new T.Scene(), mat = new T.ShaderMaterial({ side: T.BackSide, vertexShader: 'varying vec3 vd; void main(){ vd = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vd; void main(){ float h = normalize(vd).y; vec3 c = h > 0.0 ? mix(vec3(0.86,0.9,0.95), vec3(0.36,0.55,0.84), pow(h, 0.6)) : mix(vec3(0.74,0.76,0.77), vec3(0.34,0.37,0.32), pow(-h, 0.5)); gl_FragColor = vec4(c, 1.0); }' });
    sc.add(new T.Mesh(new T.SphereGeometry(10, 32, 16), mat));
    var pm = new T.PMREMGenerator(renderer), rt = pm.fromScene(sc, 0.03); pm.dispose(); K.env = rt.texture;
    (K.envM || []).forEach(function (q) { q.envMap = K.env; q.needsUpdate = true; }); return K.env;
  };
  M.envLevel = function (v) { if (Math.abs((K.envI == null ? -1 : K.envI) - v) < 0.01) return; K.envI = v; (K.envM || []).forEach(function (q) { q.envMapIntensity = v; }); };

  /* 항공기 한 대 — o: { vela: 벨라 에어 도장, col: 꼬리 색, lights: 등(기본 켬) } */
  M.plane = function (o) {
    o = o || {}; var g = geos(), m = mats(), root = new T.Group(), b = new T.Group(); b.position.y = CL; root.add(b);
    var det = root.userData.det = [];
    function add(geo, mat, x, y, z, name) { var me = new T.Mesh(geo, mat); me.position.set(x || 0, y || 0, z || 0); if (name) me.name = name; b.add(me); return me; }
    function addD(geo, mat, x, y, z) { var me = add(geo, mat, x, y, z); det.push(me); return me; }
    add(g.fus, o.vela ? m.bodyV : m.body, 0, 0, 0, 'fus');
    add(g.wing, m.wing); add(g.wingL, m.wing); add(g.hs, m.wing); add(g.hsL, m.wing);
    add(g.fin, o.vela ? m.finV : finMat(o.col || '#3366aa'), 0, 0, 0, 'tail');
    addD(g.fair, m.fair, 0, -2.3, 1.6);
    [1, -1].forEach(function (sd) {
      var x = sd * 9.9, y = -2.85, z = -2.4;
      add(g.nac, o.vela ? m.nacV : m.nac, x, y, z); addD(g.core, m.metal, x, y, z); addD(g.spin, m.metal, x, y, z); addD(g.fan, m.dark, x, y, z);
      addD(g.pylon, m.wing, x, y, z);
    });
    /* 바퀴(땅 기준 좌표) */
    var gear = new T.Group(); gear.name = 'gear'; root.add(gear);
    function gm(geo, mat, x, y, z, sy) { var me = new T.Mesh(geo, mat); me.position.set(x, y, z); if (sy) me.scale.y = sy; gear.add(me); }
    [1, -1].forEach(function (sd) {
      var x = sd * 4.9;
      [2.55, 4.25].forEach(function (z) { gm(g.wheel, m.tire, x + 0.5, 0.62, z); gm(g.wheel, m.tire, x - 0.5, 0.62, z); });
      gm(g.beam, m.strut, x, 0.62, 3.4); gm(g.strut, m.strut, x, 0.62, 3.4, 2.0);
    });
    gm(g.nwheel, m.tire, 0.27, 0.48, -20.6); gm(g.nwheel, m.tire, -0.27, 0.48, -20.6); gm(g.strut, m.strut, 0, 0.48, -20.6, 1.75);
    root.userData.gear = gear;
    if (o.lights !== false && H.lightPoints) {
      var tipY = CL - 1.75 + 28.1 * 0.105 + 0.5, V = function (x, y, z) { return new T.Vector3(x, y, z); };
      var nav = H.lightPoints([V(-30.2, tipY, 13.6), V(30.2, tipY, 13.6), V(0, CL + 2.5, 29.7)], 0xffffff, 6);
      nav.geometry.setAttribute('color', new T.BufferAttribute(new Float32Array([1, 0.12, 0.12, 0.15, 1, 0.35, 1, 1, 1]), 3)); nav.material.vertexColors = true;
      var strobe = H.lightPoints([V(-30.2, tipY, 13.9), V(30.2, tipY, 13.9), V(0, CL + 2.6, 29.9)], 0xffffff, 14);
      var beacon = H.lightPoints([V(0, CL + 2.95, -3), V(0, CL - 2.95, 3)], 0xff2a1a, 9);
      var land = H.lightPoints([V(-4.6, CL - 1.4, -4.2), V(4.6, CL - 1.4, -4.2), V(0, 2.2, -20.4)], 0xfff6e0, 12);
      [nav, strobe, beacon, land].forEach(function (q) { root.add(q); });
      root.userData.L = { nav: nav, strobe: strobe, beacon: beacon, land: land };
    }
    return root;
  };
  /* 멀리 있으면 작은 부품은 그리지 않음(휴대폰 부담 줄이기) */
  M.lod = function (pl, dist) { var near = dist < 5000; if (pl.userData.near === near) return; pl.userData.near = near; pl.userData.det.forEach(function (q) { q.visible = near; }); if (!near) pl.userData.gear.visible = false; };
  /* 등 깜빡임 — night 0(낮) ~ 1(밤), land: 착륙등 */
  M.lights = function (pl, now, night, land) {
    var L = pl.userData.L; if (!L) return; var t = now / 1000;
    L.nav.material.opacity = 0.18 + 0.82 * night; L.nav.material.size = 4 + 3 * night;
    var s = (t + (pl.id % 7) * 0.13) % 1.2; L.strobe.visible = s < 0.05 || (s > 0.14 && s < 0.19);
    var bc = (t + (pl.id % 5) * 0.21) % 1.0; L.beacon.visible = bc < 0.1; L.beacon.material.opacity = 0.6 + 0.4 * night;
    L.land.visible = !!land; L.land.material.size = 9 + 9 * night; L.land.material.opacity = 0.45 + 0.55 * night;
  };

  /* ---------- 주기장에 서 있는 항공기(한꺼번에 그림) ---------- */
  M.parked = function (list) {
    var grp = new T.Group(); if (!list.length) return grp;
    var tpl = M.plane({ col: '#ffffff', lights: false }); tpl.updateMatrixWorld(true);
    var mt = new T.Matrix4(), q = new T.Quaternion(), one = new T.Vector3(1, 1, 1), ims = [], col = new T.Color();
    tpl.traverse(function (me) {
      if (!me.isMesh) return; var im = new T.InstancedMesh(me.geometry, me.material, list.length); im.frustumCulled = false; im.userData.local = me.matrixWorld.clone(); im.userData.tail = me.name === 'tail'; ims.push(im); grp.add(im);
    });
    grp.userData.ims = ims; grp.userData.list = list;
    list.forEach(function (it, i) {
      q.setFromAxisAngle(new T.Vector3(0, 1, 0), it.yaw); it.base = new T.Matrix4().compose(it.pos, q, one);
      ims.forEach(function (im) { mt.multiplyMatrices(it.base, im.userData.local); im.setMatrixAt(i, mt); if (im.userData.tail) { col.set(it.col); im.setColorAt(i, col); } });
    });
    return grp;
  };
  M.parkedHide = function (grp, hide) {      /* hide(i) = 참이면 그 자리에 실제 교통이 있어 숨김 */
    var ims = grp.userData.ims, list = grp.userData.list; if (!ims) return; var mt = new T.Matrix4(), z = new T.Matrix4().makeScale(0, 0, 0), ch = false;
    list.forEach(function (it, i) { var h = !!hide(it); if (h === !!it.hid) return; it.hid = h; ch = true; ims.forEach(function (im) { if (h) im.setMatrixAt(i, z); else { mt.multiplyMatrices(it.base, im.userData.local); im.setMatrixAt(i, mt); } }); });
    if (ch) ims.forEach(function (im) { im.instanceMatrix.needsUpdate = true; });
  };

  /* ---------- 공항 건물(지상 관제 지도의 건물 자리 D.decor를 그대로 세움) ---------- */
  function facade(kind) {
    var key = 'fac_' + kind; if (K[key]) return K[key];
    var day = tex(128, 128, function (c, w, h) {
      if (kind === 'hangar') { c.fillStyle = '#c9cdd1'; c.fillRect(0, 0, w, h); for (var x = 0; x < w; x += 8) { c.fillStyle = x % 16 ? '#b9bec3' : '#d5d9dd'; c.fillRect(x, 0, 4, h); } c.fillStyle = '#9da3a9'; c.fillRect(0, h * 0.82, w, h * 0.18); return; }
      c.fillStyle = kind === 'bridge' ? '#a9b0b7' : '#56718a'; c.fillRect(0, 0, w, h);
      if (kind === 'bridge') { c.fillStyle = '#6f7d8a'; c.fillRect(0, h * 0.35, w, h * 0.3); return; }
      var g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(190,214,236,.55)'); g.addColorStop(1, 'rgba(40,60,80,.2)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = '#d6dce2'; for (var x2 = 0; x2 < w; x2 += 32) c.fillRect(x2, 0, 3, h); c.fillRect(0, 0, w, 5); c.fillRect(0, h / 2, w, 4);
    });
    var night = tex(128, 128, function (c, w, h) { c.fillStyle = '#000'; c.fillRect(0, 0, w, h); if (kind === 'hangar') { c.fillStyle = 'rgba(255,214,160,.4)'; c.fillRect(0, h * 0.1, w, 6); return; } if (kind === 'bridge') { c.fillStyle = 'rgba(255,224,180,.55)'; c.fillRect(0, h * 0.38, w, h * 0.24); return; } var R = rnd(5); for (var x = 0; x < w; x += 32) for (var y = 0; y < h; y += 64) { var v = 0.45 + R() * 0.5; c.fillStyle = 'rgba(255,' + Math.round(214 + R() * 30) + ',170,' + v + ')'; c.fillRect(x + 4, y + 8, 26, 52); } });
    [day, night].forEach(function (t) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(kind === 'hangar' ? 1 / 12 : 1 / 16, kind === 'bridge' ? 1 / 3.6 : 1 / 10); });
    return (K[key] = new T.MeshLambertMaterial({ map: day, emissive: 0xffffff, emissiveMap: night, emissiveIntensity: 0 }));
  }
  function roofMat(shade) { var key = 'roof' + shade; if (K[key]) return K[key]; var t = noiseTex(128, shade, 0.12, 11); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(1 / 60, 1 / 60); return (K[key] = new T.MeshLambertMaterial({ map: t })); }
  M.buildings = function (D, Pf, elev) {
    var grp = new T.Group(), mats = []; grp.userData.mats = mats; if (!D.decor) return grp;
    var CC = { apron: '@apron', bld: '@bld', bld2: '@bld2', grass: '@g', grass2: '@g2' }, list = [];
    try { D.decor(function (u1, v1, u2, v2, col) { list.push([u1, v1, u2, v2, String(col)]); }, CC); } catch (e) { return grp; }
    var KIND = { '@bld': ['term', 0, 15, '#c5cacf'], '@bld2': ['term', 0, 21, '#d4d8dc'], '#5d666e': ['term', 0, 24.5, '#aeb5bc'], '#6a7178': ['hangar', 0, 23, '#b8bdc2'], '#9aa3ab': ['bridge', 3.8, 7.4, '#9aa1a8'], '#6b6f58': ['hangar', 0, 8, '#8f937e'], '#7f846a': ['hangar', 0, 10, '#9a9f88'] };
    list.forEach(function (r) {
      var k = KIND[r[4]]; if (!k) return;
      var cs = [[r[0], r[1]], [r[2], r[1]], [r[2], r[3]], [r[0], r[3]]].map(function (q) { var p = D.uv2xy(q[0], q[1]); return Pf(p.x, p.y, 0); });
      var sh = new T.Shape(); cs.forEach(function (p, i) { if (i) sh.lineTo(p.x, -p.z); else sh.moveTo(p.x, -p.z); });
      var geo = new T.ExtrudeGeometry(sh, { depth: k[2] - k[1], bevelEnabled: false }); geo.rotateX(-Math.PI / 2);
      var wall = facade(k[0]); if (mats.indexOf(wall) < 0) mats.push(wall);
      var me = new T.Mesh(geo, [roofMat(k[3]), wall]); me.position.y = elev + k[1]; grp.add(me);
    });
    return grp;
  };
  /* 관제탑 */
  M.tower = function (pos, elev) {
    var g = new T.Group(), w = new T.MeshLambertMaterial({ color: 0xe3e6e9 }), gl = new T.MeshPhongMaterial({ color: 0x1d3a46, specular: 0x8fb3c4, shininess: 90, emissive: 0x3a5a40, emissiveIntensity: 0 }), dk = new T.MeshLambertMaterial({ color: 0x7c848c });
    function m(geo, mat, y) { var o = new T.Mesh(geo, mat); o.position.set(pos.x, elev + y, pos.z); g.add(o); return o; }
    m(new T.CylinderGeometry(4.2, 7.5, 92, 16), w, 46); m(new T.CylinderGeometry(9.5, 6, 6, 16), w, 95); m(new T.CylinderGeometry(9.8, 9.8, 1.2, 16), dk, 98.6);
    m(new T.CylinderGeometry(11.5, 9.8, 7.5, 12, 1, true), gl, 103); m(new T.CylinderGeometry(12.6, 11.5, 1.6, 12), w, 107.6); m(new T.CylinderGeometry(0.25, 0.25, 9, 6), dk, 113);
    g.userData.glass = gl; return g;
  };

  /* ---------- 하늘 · 바다 ---------- */
  M.skyShader = {
    vertexShader: 'varying vec3 vd; void main(){ vd = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: [
      'uniform vec3 top; uniform vec3 hor; uniform vec3 sunDir; uniform vec3 sunCol; uniform float day; varying vec3 vd;',
      'void main(){',
      '  vec3 d = normalize(vd); float h = d.y; vec3 sd = normalize(sunDir); float s = max(dot(d, sd), 0.0);',
      '  float hz = pow(1.0 - clamp(h, 0.0, 1.0), 5.0);',
      '  vec3 c = mix(top, hor, hz);',
      '  c = mix(c, top * 0.78, smoothstep(0.45, 1.0, h) * 0.45);',
      '  float low = 1.0 - clamp(sd.y * 3.2, 0.0, 1.0);',
      '  c += vec3(1.0, 0.56, 0.28) * pow(s, 3.0) * hz * low * 0.55 * day;',
      '  c += sunCol * (pow(s, 2200.0) * 9.0 + pow(s, 70.0) * 0.32 + pow(s, 7.0) * 0.10) * day;',
      '  if (h < 0.0) c = hor;',
      '  gl_FragColor = vec4(c, 1.0);',
      '}'].join('\n')
  };
  M.seaNormal = function () {
    var n = 256, cv = document.createElement('canvas'); cv.width = cv.height = n; var c = cv.getContext('2d'), im = c.createImageData(n, n), hgt = new Float32Array(n * n), R = rnd(31), W = [];
    for (var k = 0; k < 14; k++) W.push([1 + Math.floor(R() * 9), Math.floor(R() * 9) - 4, R() * 6.28, 0.5 + R()]);
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) { var v = 0; W.forEach(function (w) { v += Math.sin((x * w[0] + y * w[1]) / n * 6.2832 + w[2]) / (w[0] + Math.abs(w[1])) * w[3]; }); hgt[y * n + x] = v; }
    for (y = 0; y < n; y++) for (x = 0; x < n; x++) { var dx = hgt[y * n + (x + 1) % n] - hgt[y * n + (x + n - 1) % n], dy = hgt[((y + 1) % n) * n + x] - hgt[((y + n - 1) % n) * n + x], nx = -dx * 6, ny = -dy * 6, l = Math.hypot(nx, ny, 1), i = (y * n + x) * 4; im.data[i] = (nx / l * 0.5 + 0.5) * 255; im.data[i + 1] = (ny / l * 0.5 + 0.5) * 255; im.data[i + 2] = (1 / l * 0.5 + 0.5) * 255; im.data[i + 3] = 255; }
    c.putImageData(im, 0, 0); var t = new T.CanvasTexture(cv); t.wrapS = t.wrapT = T.RepeatWrapping; return t;
  };
  M.seaMat = function (horCol) {
    var nm = M.seaNormal(); nm.repeat.set(1600, 1600);
    var m = new T.MeshPhongMaterial({ color: 0x1d3f5c, specular: 0xa9bdd0, shininess: 140, normalMap: nm, normalScale: new T.Vector2(0.45, 0.45) });
    m.onBeforeCompile = function (sh) { sh.uniforms.seaHor = { value: horCol }; sh.fragmentShader = 'uniform vec3 seaHor;\n' + sh.fragmentShader.replace('#include <opaque_fragment>', 'outgoingLight = mix(outgoingLight, seaHor * 0.92, clamp(pow(1.0 - max(dot(normal, normalize(vViewPosition)), 0.0), 5.0), 0.0, 1.0) * 0.7);\n#include <opaque_fragment>'); };
    m.userData.nm = nm; return m;
  };
})();
