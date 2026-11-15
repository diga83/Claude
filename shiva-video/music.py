"""Original ambient score (tanpura drone, pads, bells, flute, drums) + voice mix -> build/final_audio.wav"""
import json, numpy as np, soundfile as sf
from scipy.signal import fftconvolve, resample_poly, butter, sosfilt
SR = 44100; TL = json.load(open('build/timeline.json')); T = TL['total']; N = int(T * SR)
rng = np.random.default_rng(7)
mus = np.zeros((N, 2), np.float32)
def add(x, t, g=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N or i < 0: return
    x = x[:N - i]; l = g * np.cos((pan + 1) * np.pi / 4); r = g * np.sin((pan + 1) * np.pi / 4)
    mus[i:i + len(x), 0] += x * l; mus[i:i + len(x), 1] += x * r
def tt(d): return np.arange(int(d * SR)) / SR
def pluck(f, d=6.0):
    t = tt(d); x = np.zeros_like(t)
    for n in range(1, 14):
        a = 1 / n ** 0.9 * (1 + 0.6 * np.sin(2 * np.pi * (0.25 + 0.07 * n) * t + n))
        x += a * np.sin(2 * np.pi * f * n * t + 0.3 * n) * np.exp(-t * (0.45 + 0.05 * n))
    return (x * np.minimum(1, t / 0.03)).astype(np.float32)
def bell(f, d=5.0, bright=1.0):
    t = tt(d); x = np.zeros_like(t)
    for r, a, k in [(1, 1, 1), (2.01, .5, 1.6), (2.76, .35 * bright, 2.2), (5.4, .2 * bright, 3.5), (8.9, .08 * bright, 5)]:
        x += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * k)
    return (x * np.minimum(1, t / 0.004)).astype(np.float32)
def flute(f, d):
    t = tt(d); vib = 1 + 0.006 * np.sin(2 * np.pi * 5.2 * t) * np.minimum(1, t / 0.6)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    x = np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.08 * np.sin(3 * ph)
    env = np.minimum(1, t / 0.25) * np.minimum(1, (d - t) / 0.5)
    return (x * env).astype(np.float32)
def drum(f=70, d=0.5, click=0.3):
    t = tt(d); x = np.sin(2 * np.pi * (f * t + 40 * (1 - np.exp(-t * 30)) / 30)) * np.exp(-t * 9) + click * rng.standard_normal(len(t)) * np.exp(-t * 80)
    return x.astype(np.float32)
D = 146.83
# --- tanpura: Pa Sa' Sa' Sa cycle
cyc = [(D * 0.75, -0.3), (D, 0.2), (D, -0.1), (D / 2, 0.0)]
pl = {f: pluck(f) for f, _ in cyc}
t = 0.5; i = 0
while t < T - 6:
    f, p = cyc[i % 4]; add(pl[f], t, 0.085, p); t += 1.55; i += 1
# --- pads: chord per ~15.5 s
chords = [[D / 2, D, D * 1.5, D * 2 * 1.25], [D / 2, D, D * 4 / 3, D * 5 / 3], [D / 2, D * 0.75, D * 1.125, D * 1.5], [D / 2, D, D * 1.5, D * 2 * 1.125]]
seg = 15.5; k = 0; t = 0
while t < T:
    d = seg + 4; tx = tt(d); ch = chords[k % 4]; x = np.zeros_like(tx)
    for j, f in enumerate(ch):
        for n, a in [(1, 1), (2, .3), (3, .1)]:
            x += a * np.sin(2 * np.pi * f * n * tx * (1 + 0.0015 * (j - 1.5)) + j) * (1 + 0.25 * np.sin(2 * np.pi * (0.11 + 0.03 * j) * tx + j))
    env = np.minimum(1, tx / 4) * np.minimum(1, (d - tx) / 4)
    add((x * env).astype(np.float32), t, 0.035, 0.3 * (-1) ** k); t += seg; k += 1
# --- bells & flute phrases (pentatonic on D)
penta = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3]
t = 6.0
while t < T - 8:
    add(bell(D * 2 * penta[rng.integers(0, 9)], 5, 0.6), t, 0.05 * rng.uniform(0.5, 1), rng.uniform(-0.7, 0.7))
    if rng.random() < 0.4: add(bell(D * 2 * penta[rng.integers(0, 9)], 5, 0.6), t + 0.4, 0.03, rng.uniform(-0.7, 0.7))
    t += rng.uniform(2.5, 6.5)
t = 16.0
while t < T - 20:
    n = rng.integers(3, 6); idx = rng.integers(2, 6); tp = t
    for _ in range(n):
        idx = int(np.clip(idx + rng.integers(-2, 3), 0, 8)); d = rng.uniform(1.4, 3.2)
        add(flute(D * 2 * penta[idx], d), tp, 0.05, 0.15); tp += d * 0.92
    t = tp + rng.uniform(9, 17)
# --- cues from the timeline
S = {s['id']: s for s in TL['shots']}
def wt(sid, word):
    for l in S[sid]['lines']:
        for w in l['words']:
            if w['w'].lower().startswith(word): return l['t'] + w['t']
for c in TL['chapters']:
    add(bell(D, 8, 1.3), c['t'] + 0.2, 0.2); add(bell(D * 1.5, 7, 1.0), c['t'] + 0.25, 0.09)
b = wt('s02_damaru', 'drumbeat')
for i in range(9): add(drum(150, 0.3, 0.5), b + i * 0.62, 0.3 * (0.95 ** i)); add(drum(110, 0.3, 0.4), b + i * 0.62 + 0.31, 0.12 * (0.95 ** i)) if i else None
# dance chapter pulse
t0, t1 = S['s34_nataraja']['start'], S['s39_linga']['start']
t = t0 + 1; i = 0
while t < t1 - 1:
    g = min(1, (t - t0) / 6, (t1 - t) / 5)
    add(drum(62, 0.6, 0.15), t, 0.22 * g)
    for o, gg in [(0.35, .09), (0.525, .12), (0.7, .07), (1.05, .1), (1.225, .12)]: add(drum(160, 0.2, 0.5), t + o, gg * g, 0.4 * (-1) ** i)
    t += 1.4; i += 1
# drum swings in "Reading Shiva" damaru shot
t = S['s15_drum']['start'] + 0.5
while t < S['s16_ash']['start'] - 0.5: add(drum(150, 0.25, 0.5), t, 0.1); add(drum(120, 0.25, 0.4), t + 0.3, 0.07); t += 0.95
# rumble for poison & thunder for Rudra, rush for Ganga's fall
def noise(d, lo, hi):
    x = rng.standard_normal(int(d * SR)).astype(np.float32); return sosfilt(butter(2, [lo, hi], 'bandpass', fs=SR, output='sos'), x).astype(np.float32)
def shaped(d, lo, hi, a=1.5, r=2.0):
    x = noise(d, lo, hi); tx = tt(d); return x * np.minimum(1, tx / a) * np.minimum(1, (d - tx) / r)
a, e = wt('s25_poison', 'poison'), S['s28_throat']['start']; add(shaped(e - a, 30, 120), a, 0.35)
a, e = S['s31_fall']['start'], S['s33_river']['start']; add(shaped(e - a, 300, 5000, 1.0, 3.0), a, 0.05)
a = S['s43_rudra']['lines'][1]['t']
for o in [0.8, 3.2]: add(shaped(3.5, 25, 140, 0.05, 3.0), a + o, 0.6, 0.3)
tk = wt('s12_eye', 'opens'); add(bell(D * 4, 4, 2), tk + 0.25, 0.12); add(shaped(2.5, 200, 3000, 0.05, 2.2), tk + 0.25, 0.05)
# final Om-like swell and closing bell
e = S['s52_outro']['lines'][0]['t']; add(bell(D / 2, 10, 1.2), e + 2.5, 0.3); add(bell(D, 10, 1.0), e + 2.6, 0.18)
# --- reverb
tx = tt(3.2); ir = rng.standard_normal((len(tx), 2)).astype(np.float32) * np.exp(-tx * 2.1)[:, None]; ir[:int(0.012 * SR)] = 0; ir /= np.sqrt((ir ** 2).sum(0))
wet = np.stack([fftconvolve(mus[:, c], ir[:, c])[:N] for c in range(2)], 1)
mus = (0.6 * mus + 0.5 * wet).astype(np.float32)
mus = sosfilt(butter(2, 9000, 'low', fs=SR, output='sos'), mus, axis=0).astype(np.float32)
mus /= np.abs(mus).max()
# --- voice
v, vsr = sf.read('build/voice.wav', dtype='float32'); v = resample_poly(v, SR, vsr).astype(np.float32)[:N]; v = np.pad(v, (0, N - len(v)))
v = sosfilt(butter(2, 70, 'high', fs=SR, output='sos'), v).astype(np.float32)
v /= np.abs(v).max(); v *= 0.82
vw = fftconvolve(v, ir[:int(1.2 * SR), 0] * np.exp(-tx[:int(1.2 * SR)] * 2))[:N]
voice = np.stack([v + 0.06 * vw, v + 0.06 * np.roll(vw, 300)], 1)
# ducking
env = np.sqrt(sosfilt(butter(1, 3, 'low', fs=SR, output='sos'), v ** 2).clip(0)); env = np.minimum(1, env / 0.08)
env = sosfilt(butter(1, 1.2, 'low', fs=SR, output='sos'), env).clip(0, 1)
gain = 0.34 * (1 - 0.62 * env)
fade = np.minimum(1, np.arange(N) / (2.5 * SR)) * np.minimum(1, (N - np.arange(N)) / (3.5 * SR))
mix = voice + mus * (gain * fade)[:, None]
mix = np.tanh(mix * 1.05) ; mix *= 0.97 / np.abs(mix).max()
sf.write('build/final_audio.wav', mix, SR)
print('ok', T, 'voice rms', float(np.sqrt((v**2).mean())), 'music rms', float(np.sqrt(((mus*gain[:,None])**2).mean())))
