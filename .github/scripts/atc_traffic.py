#!/usr/bin/env python3
"""AIRLINE SAGA 관제편 — 「실제 교통 근무」용 교통 받아 두기 (GitHub Actions가 15분마다 실행)
   adsb.lol(ODbL)에서 공항 둘레 항공기를 받아 작은 JSON으로 정리해 OUT 폴더(데이터 가지 traffic-data)에 씀.
   - <공항>.json        : 가장 최근
   - <공항>_am.json 등  : 정해진 시각(일본 · 한국 시각 07:30 · 12:00 · 18:00 무렵)의 기록 — 밤에도 붐비는 판으로 근무할 수 있게
   형식: {"apt","t"(유닉스 초),"src","ac":[[hex, 편명, 기종, 등록부호, 위도, 경도, 기압고도 ft 또는 "g"(지상), 대지속도 kt, 진행 방향°, 상승률 ft/분, 스쿼크]]}
   사용: python3 atc_traffic.py OUT폴더"""
import json, os, sys, time, urllib.request
from datetime import datetime, timezone, timedelta
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
APTS = {'rjtt': (35.5533, 139.7811, 80), 'rksi': (37.4602, 126.4407, 80)}      # 위도, 경도, 반지름(NM, adsb.lol 최대 250)
REC = {'am': (7, 30), 'noon': (12, 0), 'pm': (18, 0)}                            # 현지 시각(일본 · 한국 모두 UTC+9)
URL = 'https://api.adsb.lol/v2/point/{0}/{1}/{2}'
UA = {'User-Agent': 'AIRLINE-SAGA-ATC traffic snapshot (educational game; 15 min)'}

def get(lat, lon, r):
    for k in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(URL.format(lat, lon, r), headers=UA), timeout=30) as f: return json.load(f)
        except Exception as e:
            print('retry', k, e); time.sleep(5 + 10 * k)
    return None

def num(v, nd=0):
    try: return round(float(v), nd) if nd else int(round(float(v)))
    except Exception: return None

def pack(d):
    out = []
    for a in d.get('ac') or []:
        if a.get('lat') is None or a.get('lon') is None or (a.get('seen_pos') or 0) > 60: continue
        alt = a.get('alt_baro'); alt = 'g' if alt == 'ground' else num(alt)
        if alt is None: continue
        out.append([a.get('hex', ''), (a.get('flight') or '').strip(), a.get('t') or '', a.get('r') or '', num(a['lat'], 4), num(a['lon'], 4), alt,
                    num(a.get('gs')), num(a.get('track')), num(a.get('baro_rate') if a.get('baro_rate') is not None else a.get('geom_rate')), a.get('squawk') or ''])
    return out

def main():
    os.makedirs(OUT, exist_ok=True); now = datetime.now(timezone.utc); loc = now + timedelta(hours=9)
    for apt, (lat, lon, r) in APTS.items():
        d = get(lat, lon, r)
        if d is None: print(apt, 'failed'); continue
        rec = {'apt': apt.upper(), 't': int(now.timestamp()), 'src': 'ADSB.lol (ODbL 1.0)', 'ac': pack(d)}
        s = json.dumps(rec, separators=(',', ':'), ensure_ascii=False)
        open(os.path.join(OUT, apt + '.json'), 'w').write(s)
        for k, (h, m) in REC.items():      # 정해진 시각 ±7분 안이면 기록 판으로도 남김
            if abs((loc.hour * 60 + loc.minute) - (h * 60 + m)) <= 7: open(os.path.join(OUT, '%s_%s.json' % (apt, k)), 'w').write(s)
        print(apt, len(rec['ac']), 'aircraft'); time.sleep(2)
    open(os.path.join(OUT, 'README.md'), 'w').write('AIRLINE SAGA 관제편 「실제 교통 근무」 데이터 — GitHub Actions(atc-traffic)가 15분마다 덮어씀. 출처: ADSB.lol, ODbL 1.0 (https://www.adsb.lol)\n')

if __name__ == '__main__': main()
