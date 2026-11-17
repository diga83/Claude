"""Lay narration on a 600 s timeline -> build/timeline.js + build/voice.wav"""
import json, numpy as np, soundfile as sf
TARGET = 600.0
script = json.load(open('script.json')); lines = json.load(open('build/lines.json'))
by = {}
for l in lines: by.setdefault(l['shot'], []).append(l)
ROM = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
INTRO, OUTRO, CARD = 2.0, 9.0, 2.7

def layout(k):
    t = INTRO; shots = []; chapters = []; prev = None
    for sh in script['shots']:
        pre = 0
        if sh['ch'] != prev:
            if prev is not None:
                pre = CARD; chapters.append({'t': t + 0.5, 'd': CARD + 0.3, 'name': sh['ch'], 'roman': ROM[len(chapters) + 1]})
            prev = sh['ch']
        start = t; t += pre + 0.9 * k
        ls = []
        for l in by[sh['id']]:
            ls.append({'t': round(t, 3), 'dur': l['dur'], 'words': l['words'], 'file': l['file']})
            t += l['dur'] + 0.62 * k
        t += 0.55 * k
        shots.append({'id': sh['id'], 'ch': sh['ch'], 'start': round(start, 3), 'pre': pre, 'lines': ls})
    return shots, chapters, t + OUTRO

lo, hi = 0.0, 6.0
for _ in range(50):
    k = (lo + hi) / 2
    if layout(k)[2] > TARGET: hi = k
    else: lo = k
shots, chapters, total = layout(k)
print('gap scale', round(k, 3), 'total', round(total, 2), 'shots', len(shots))
if k < 0.6 or k > 1.9: print('WARNING: gap scale out of comfortable range')
sr = 24000; voice = np.zeros(int(TARGET * sr) + sr, np.float32)
for sh in shots:
    for l in sh['lines']:
        x, _ = sf.read(l['file'], dtype='float32'); i = int(l['t'] * sr); voice[i:i + len(x)] += x; del l['file']
sf.write('build/voice.wav', voice[:int(TARGET * sr)], sr)
json.dump({'total': TARGET, 'shots': shots, 'chapters': chapters}, open('build/timeline.json', 'w'), ensure_ascii=False)
open('build/timeline.js', 'w').write('window.TL=' + json.dumps({'total': TARGET, 'shots': shots, 'chapters': chapters}, ensure_ascii=False) + ';')
for sh in shots: print(f"{sh['start']:7.2f} {sh['id']}")
