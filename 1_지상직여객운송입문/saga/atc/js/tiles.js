/* AIRLINE SAGA — ATC 실제 항공사진 타일(실시간): 관제탑 · 지상관제(2D)와 조종사 체험 3D가 같이 씀
   - 하네다: 일본 국토지리원 「지리원 타일」 항공사진(출처 표시로 이용)
   - 세이라(가상): 미국 아이오와주 워펠로 부근 농경지 위에 얹음 — USGS The National Map 항공사진(미국 공공 저작물)
   - 아스테라(가상): 네덜란드 블리싱언(제일란트) 해안 위에 얹음 — PDOK 항공사진(Beeldmateriaal Nederland, CC BY 4.0)
   가상 공항은 실제 공항이 없는 곳을 골라 게임 공항 그림을 그 위에 덮음. 사진 서버가 막히면 예전 그림(게임 항공사진 · 지역 그림)으로 돌아감 */
(function () {
  'use strict';
  var ATC = window.ATC, D2R = Math.PI / 180;
  var SRC = {
    RJTT: { url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', maxZ: 18, lat: 35 + 33 / 60 + 12 / 3600, lon: 139 + 46 / 60 + 52 / 3600, th: 149.88, ctr: [35.553, 139.785], mask: true,
      attr: function () { return ATC.T('출처: 일본 국토지리원 「지리원 타일」(항공사진)을 가공해 표시'); }, href: 'https://maps.gsi.go.jp/development/ichiran.html' },
    XSRA: { url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', maxZ: 16, lat: 41.18, lon: -91.25, rot: 0, ctr: [41.18, -91.25],
      attr: function () { return ATC.T('항공사진: USGS The National Map(미국 아이오와주 — 게임 공항을 얹어 가공)'); }, href: 'https://www.usgs.gov/programs/national-geospatial-program/national-map' },
    XAST: { url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg', maxZ: 19, lat: 51.448, lon: 3.625, rot: 0, ctr: [51.448, 3.625], key: true,
      attr: function () { return ATC.T('항공사진: Beeldmateriaal Nederland / PDOK, CC BY 4.0(네덜란드 제일란트 — 게임 공항을 얹어 가공)'); }, href: 'https://www.pdok.nl/introductie/-/article/luchtfoto-pdok' }
  };
  function mdeg(lat) { var p = lat * D2R; return { la: 111132.92 - 559.82 * Math.cos(2 * p) + 1.175 * Math.cos(4 * p), lo: 111412.84 * Math.cos(p) - 93.5 * Math.cos(3 * p) }; }
  /* 경위도 → 레이더 xy(NM). 하네다는 지형 자료(gen_geo)와 같은 변환, 가상 공항은 기준점에서 동 · 북(rot만큼 돌림) */
  function proj(cf) {
    var m = mdeg(cf.lat);
    if (cf.th !== undefined) {
      var g = cf.th * D2R, ux = Math.sin(157 * D2R), uy = Math.cos(157 * D2R), vx = Math.sin(67 * D2R), vy = Math.cos(67 * D2R);
      return function (lo, la) { var X = (lo - cf.lon) * m.lo, Y = (la - cf.lat) * m.la, u = X * Math.sin(g) + Y * Math.cos(g), v = -X * Math.cos(g) + Y * Math.sin(g); return { x: (u * ux + v * vx) / 1852, y: (u * uy + v * vy) / 1852 }; };
    }
    var r = (cf.rot || 0) * D2R;
    return function (lo, la) { var X = (lo - cf.lon) * m.lo, Y = (la - cf.lat) * m.la; return { x: (X * Math.cos(r) - Y * Math.sin(r)) / 1852, y: (X * Math.sin(r) + Y * Math.cos(r)) / 1852 }; };
  }
  /* 반대(xy → 경위도): 변환이 거의 아핀이라 세 점으로 역행렬 */
  function inv(pr, cf) {
    var o = pr(cf.lon, cf.lat), a = pr(cf.lon + 0.01, cf.lat), b = pr(cf.lon, cf.lat + 0.01), ax = (a.x - o.x) / 0.01, ay = (a.y - o.y) / 0.01, bx = (b.x - o.x) / 0.01, by = (b.y - o.y) / 0.01, det = ax * by - bx * ay;
    return function (x, y) { var dx = x - o.x, dy = y - o.y; return { lon: cf.lon + (dx * by - dy * bx) / det, lat: cf.lat + (ax * dy - ay * dx) / det }; };
  }
  function tlon(x, z) { return x / Math.pow(2, z) * 360 - 180; }
  function tlat(y, z) { var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z); return Math.atan(Math.sinh(n)) / D2R; }
  function tx(lon, z) { return (lon + 180) / 360 * Math.pow(2, z); }
  function ty(lat, z) { var r = lat * D2R; return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * Math.pow(2, z); }
  var T = { tlon: tlon, tlat: tlat, tx: tx, ty: ty };
  T.cfg = function (apt) { var c = SRC[apt || ATC.aptId]; if (!c) return null; if (!c.pr) { c.pr = proj(c); c.inv = inv(c.pr, c); } return c; };
  T.url = function (c, z, x, y) { return c.url.replace('{z}', z).replace('{x}', x).replace('{y}', y); };
  /* 사진이 없는 칸(바다 등 흰색 · 검은색 한 빛) — 그리지 않음 */
  T.blank = function (im) {
    try { var cv = document.createElement('canvas'); cv.width = cv.height = 8; var c = cv.getContext('2d'); c.drawImage(im, 0, 0, 8, 8); var d = c.getImageData(0, 0, 8, 8).data, w = 0, k = 0;
      for (var i = 0; i < d.length; i += 4) { if (d[i] > 248 && d[i + 1] > 248 && d[i + 2] > 248) w++; if (d[i] < 6 && d[i + 1] < 6 && d[i + 2] < 6) k++; }
      return w > 56 || k > 56; } catch (e) { return false; }
  };
  /* 사진이 없는 곳(흰색)을 투명하게 — 네덜란드 밖 · 먼바다 */
  T.keyed = function (im) {
    try { var cv = document.createElement('canvas'); cv.width = cv.height = 256; var c = cv.getContext('2d'); c.drawImage(im, 0, 0); var D = c.getImageData(0, 0, 256, 256), d = D.data;
      for (var i = 0; i < d.length; i += 4) if (d[i] > 246 && d[i + 1] > 246 && d[i + 2] > 246) d[i + 3] = 0;
      c.putImageData(D, 0, 0); return cv; } catch (e) { return im; }
  };
  /* 2D 화면용 타일 저장소: 불러오는 중 · 다 됨 · 실패. 한 번에 16장까지 */
  var cache = {}, q = [], busy = 0, bad = 0, ok = 0, onNew = null;
  function pump() {
    while (busy < 16 && q.length) {
      var e = q.pop(); if (e.st !== 'q') continue; busy++; e.st = 'l';
      (function (e) { var im = new Image(); im.crossOrigin = 'anonymous'; im.onload = function () { busy--; e.st = T.blank(im) ? 'x' : 'ok'; e.im = e.st === 'ok' && e.key ? T.keyed(im) : im; ok++; if (onNew) onNew(); pump(); }; im.onerror = function () { busy--; e.st = 'err'; bad++; pump(); }; im.src = e.u; })(e);
    }
  }
  T.get = function (c, z, x, y) { var k = z + '/' + x + '/' + y, e = cache[k]; if (!e) { e = cache[k] = { k: k, u: T.url(c, z, x, y), st: 'q', key: !!c.key }; q.push(e); if (q.length > 160) { var o = q.shift(); if (o.st === 'q') { o.st = 'drop'; delete cache[o.k]; } } pump(); } else if (e.st === 'q') { var i = q.indexOf(e); if (i >= 0) { q.splice(i, 1); q.push(e); } } return e.st === 'ok' ? e.im : e.st === 'x' ? false : null; };
  T.stat = function () { return { ok: ok, bad: bad, busy: busy, q: q.length }; };
  T.onNew = function (f) { onNew = f; };
  T.failed = function () { return bad > 12 && bad > ok; };
  /* 2D(관제탑 · 지상관제) 그리기: toS(x, y) = 레이더 xy(NM) → 화면 px, s = 화면 1px당 m의 역수(px/m). 보이는 칸만 · 아래 단계부터 */
  T.draw2D = function (ctx, W, H, toS, fromS, s) {
    var c = T.cfg(); if (!c || T.failed()) return false;
    var p = [fromS(0, 0), fromS(W, 0), fromS(0, H), fromS(W, H)].map(function (xy) { return c.inv(xy.x, xy.y); });
    var lo0 = Math.min.apply(null, p.map(function (a) { return a.lon; })), lo1 = Math.max.apply(null, p.map(function (a) { return a.lon; })), la0 = Math.min.apply(null, p.map(function (a) { return a.lat; })), la1 = Math.max.apply(null, p.map(function (a) { return a.lat; }));
    var dpr = Math.min(2, window.devicePixelRatio || 1), mpp = 1 / s / dpr, z = Math.round(Math.log(156543 * Math.cos(c.ctr[0] * D2R) / mpp) / Math.LN2);
    z = Math.max(9, Math.min(c.maxZ, z)); var drawn = 0;
    function layer(z, need) {
      var x0 = Math.floor(tx(lo0, z)), x1 = Math.floor(tx(lo1, z)), y0 = Math.floor(ty(la1, z)), y1 = Math.floor(ty(la0, z));
      if ((x1 - x0 + 1) * (y1 - y0 + 1) > 140) return false;
      for (var x = x0; x <= x1; x++) for (var y = y0; y <= y1; y++) {
        var im = need ? T.get(c, z, x, y) : (cache[z + '/' + x + '/' + y] || {}).st === 'ok' ? cache[z + '/' + x + '/' + y].im : null; if (!im) continue;
        var a = c.pr(tlon(x, z), tlat(y, z)), b = c.pr(tlon(x + 1, z), tlat(y, z)), d = c.pr(tlon(x, z), tlat(y + 1, z)), A = toS(a.x, a.y), B = toS(b.x, b.y), Dd = toS(d.x, d.y);
        ctx.save(); ctx.transform((B[0] - A[0]) / 256, (B[1] - A[1]) / 256, (Dd[0] - A[0]) / 256, (Dd[1] - A[1]) / 256, A[0], A[1]); ctx.drawImage(im, -0.5, -0.5, 257, 257); ctx.restore(); drawn++;
      }
      return true;
    }
    ctx.save();
    for (var zz = Math.max(9, z - 3); zz < z; zz++) layer(zz, zz === z - 3);      /* 덜 선명한 단계를 먼저(불러오는 동안 빈칸 없이) */
    while (!layer(z, true) && z > 9) z--;
    ctx.restore();
    return drawn > 0;
  };
  ATC.Tiles = T;
})();
