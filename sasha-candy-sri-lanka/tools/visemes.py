"""Mouth shapes for the lip-sync: phonemes of every line (from the voice model's own phonemizer), spread over the
speech found in that line's audio. Writes src/timing.js with T.vis = [[time, shape], ...]."""
import json, re
import numpy as np, soundfile as sf
from kokoro_onnx.tokenizer import Tokenizer
S = json.load(open('script.json')); T = json.load(open('audio/timing.json')); v, sr = sf.read('audio/voice.wav'); tok = Tokenizer()
says = [l['say'] for sc in S['scenes'] for l in sc['lines']]
VIS = {**{c: 'M' for c in 'mbp'}, **{c: 'F' for c in 'fv'}, **{c: 'L' for c in 'lθð'}, **{c: 'U' for c in 'uʊw'}, **{c: 'O' for c in 'oɔɒ'},
       **{c: 'A' for c in 'aɑæʌ'}, **{c: 'I' for c in 'i'}, **{c: 'E' for c in 'ɛeɪəɐɜᵻ'}, **{c: 'S' for c in 'szʃʒtdnkɡgɹjhŋʧʤcxrɾ'}}
LONG = {'A': 1.25, 'O': 1.2, 'E': .9, 'I': .9, 'U': 1.0, 'M': .7, 'F': .7, 'L': .6, 'S': .55}
def chunks(x):                       # stretches of speech inside one line
    hop = sr // 100; n = len(x) // hop; rms = np.sqrt(np.mean(x[:n*hop].reshape(n, hop)**2, axis=1)); loud = rms > .035 * rms.max()
    out, st, gap = [], None, 0
    for i, q in enumerate(loud):
        if q:
            if st is None: st = i
            gap = 0
        elif st is not None:
            gap += 1
            if gap >= 13: out.append((st / 100, (i - gap + 1) / 100)); st = None
    if st is not None: out.append((st / 100, n / 100))
    return out
vis = []
for l, say in zip(T['lines'], says):
    ph = tok.phonemize(say, 'en-us'); groups = [p for p in re.split(r'[,.!?;:]+', ph) if p.strip()]
    seq = [[(VIS[c], LONG[VIS[c]] * (1.4 if i + 1 < len(g) and g[i + 1] == 'ː' else 1)) if c in VIS else (('R', .35) if c == ' ' else None) for i, c in enumerate(g)] for g in groups]
    seq = [[p for p in g if p] for g in seq]
    a, b = int(l['a'] * sr), int(l['b'] * sr); ch = chunks(v[a:b])
    if len(ch) != len(seq):          # pause count does not match the punctuation: treat the line as one stretch
        seq = [[p for g in seq for p in g + [('R', .6)]]]; ch = [(ch[0][0], ch[-1][1])]
    for g, (c0, c1) in zip(seq, ch):
        tot = sum(w for _, w in g); tcur = l['a'] + c0
        for code, w in g:
            if not vis or vis[-1][1] != code: vis.append([round(tcur, 3), code])
            tcur += (c1 - c0) * w / tot
        vis.append([round(l['a'] + c1, 3), 'R'])
T['vis'] = vis
open('src/timing.js', 'w').write('window.TIMING=' + json.dumps(T) + ';')
print(len(vis), 'mouth shapes;', ''.join(c for t, c in vis if t < 6)[:80])
