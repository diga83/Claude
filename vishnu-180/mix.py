# score (sampled + plucked-string model, 70 BPM, G major) + procedural foley from events.json + narration -> out/mix.wav
# run: $LIB/.venv/bin/python mix.py   (LIB = the Lemo-Opuscar library folder)
import json, os, sys
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); LIB = os.environ.get('LIB', '/root/lemo-opuscar')
sys.path.insert(0, LIB)
from core.audio import sampler as S, pluck as P
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import uniform_filter1d, minimum_filter1d

SR = 48000
EVJ = json.load(open(f'{HERE}/events.json')); DUR = EVJ['dur']; EV = EVJ['ev']; N = int(DUR * SR) + SR
BEAT = 60 / 70; BAR = BEAT * 4; bar = lambda n: n * BAR
rng = np.random.default_rng(17); S.seed(5)

def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def noise(n): return rng.standard_normal(n)
def pink(n):
    w = np.fft.rfft(noise(n)); f = np.arange(len(w)); f[0] = 1
    return np.fft.irfft(w / np.sqrt(f), n) * 20
def norm(x, p=1.0): return x / (np.abs(x).max() + 1e-9) * p
def st(x, pan=0.0): return np.stack([x * np.cos((pan + 1) * np.pi / 4) * 1.414, x * np.sin((pan + 1) * np.pi / 4) * 1.414], 1)
def put(buf, t, x, g=1.0):
    if x.ndim == 1: x = st(x)
    i = int(t * SR); j = min(len(buf), i + len(x))
    if j > i: buf[i:j] += x[:j - i] * g
def rms(x): return np.sqrt(np.mean(x ** 2) + 1e-12)

# ================= score =================
ev = []
def n(t, inst, p, d, v, pan=0, **k): ev.append(dict(t=t, inst=inst, pitch=p, dur=d, vel=v, pan=pan, **k))
mus = np.zeros((N, 2))
SC = dict(G=bar(10), V=bar(15.5), D=bar(25.5), K=bar(31), S=bar(36))
ARP = {'G': ['G2', 'D3', 'G3', 'A3', 'B3', 'A3', 'G3', 'D3'], 'Em': ['E2', 'B2', 'E3', 'F#3', 'G3', 'F#3', 'E3', 'B2'], 'C': ['C3', 'G3', 'C4', 'D4', 'E4', 'D4', 'C4', 'G3'],
       'D': ['D3', 'A3', 'D4', 'E4', 'F#4', 'E4', 'D4', 'A3'], 'Am': ['A2', 'E3', 'A3', 'B3', 'C4', 'B3', 'A3', 'E3']}
PAD = {'G': ['B3', 'D4'], 'Em': ['G3', 'B3'], 'C': ['E4', 'G4'], 'D': ['F#4', 'A4'], 'Am': ['C4', 'E4']}
def harp_bar(b, ch, v=.34, step=2, pan=-.25):
    for k in range(0, 8, step): n(bar(b) + k * BEAT / 2, 'harp', ARP[ch][k], BEAT * 1.6, v * (1 if k == 0 else .8), pan)
def pad(b, ch, v=.16):
    for p in PAD[ch]: n(bar(b), 'vibraphone_bowed', p, BAR, v, .3, attack=.6, release=1.2)
def flute(b, k, p, d, v=.36): n(bar(b) + k * BEAT, 'flute', p, d * BEAT, v, .15, release=.8)
def section(b0, b1, prog, v=.32, step=2, pv=.15):
    for i, b in enumerate(range(b0, b1)): ch = prog[i % len(prog)]; harp_bar(b, ch, v, step); pad(b, ch, pv)
def drone(t0, t1, p='G2', v=.22): n(t0, 'cellos', p, t1 - t0, v, -.2, attack=2.5, release=1.2); n(t0 + .4, 'cellos', {'G2': 'D3', 'C2': 'G2', 'D2': 'A2'}[p], t1 - t0 - .4, v * .8, .2, attack=2.5, release=1.2)
# the ocean and the endless serpent: drone, a slow harp, the flute when the sky turns blue
drone(.3, SC['G'] + 1); section(1, 10, ['G', 'Em', 'C', 'D'], .3, 2)
for b, k, p, d in [(5, 2, 'D5', 2), (6, 0, 'G5', 2), (6, 2, 'F#5', 2), (7, 0, 'E5', 4), (8, 0, 'D5', 2), (8, 2, 'B4', 2), (9, 0, 'D5', 4)]: flute(b, k, p, d)
# Garuda: brighter, harp in eighths
drone(SC['G'], SC['V'] + 1, 'D2', .2); section(10, 15, ['D', 'G', 'Em', 'D', 'C'], .34, 1)
for b, k, p, d in [(11, 0, 'A5', 2), (11, 2, 'F#5', 2), (12, 0, 'D6', 3), (13, 0, 'B5', 2), (13, 2, 'A5', 2)]: flute(b, k, p, d, .38)
# Vamana: small and plucky, then a swell as he grows; the steps are drums (from events)
section(15, 19, ['G', 'C', 'G', 'D'], .28, 2)
n(64.4, 'violas', 'G3', 11.4, .3, -.3, attack=5, release=1.0); n(65.0, 'violins_trem', 'D4', 10.6, .3, .3, attack=5, release=1.0)
n(64.6, 'cellos', 'G1', 15, .28, 0, attack=4, release=1.5)
drone(78.6, SC['D'] + 1, 'C2', .2); section(23, 25, ['C', 'G'], .26, 2)
# the three doors: calm, a chime per door
drone(SC['D'], SC['K'] + 1, 'G2', .2); section(25, 31, ['Em', 'C', 'G', 'D'], .26, 2)
for b, k, p, d in [(26, 2, 'B4', 2), (27, 0, 'E5', 4), (29.5, 0, 'G5', 2), (29.5, 2, 'F#5', 2)]: flute(b, k, p, d, .3)
# the promise: the flute takes the lead
drone(SC['K'], SC['S'] + 1, 'D2', .2); section(31, 36, ['G', 'D', 'Em', 'C'], .28, 2)
for b, k, p, d in [(32.5, 2, 'G5', 2), (33.5, 0, 'A5', 2), (33.5, 2, 'B5', 2), (34.5, 0, 'D6', 4), (35.5, 0, 'B5', 3)]: flute(b, k, p, d, .38)
# the river stone and the endless line
drone(SC['S'], 179, 'G2', .2); section(36, 52, ['Em', 'C', 'G', 'D'], .25, 2)
for b, k, p, d in [(44, 0, 'B4', 2), (44, 2, 'D5', 2), (45, 0, 'G5', 4), (46, 0, 'F#5', 2), (46, 2, 'E5', 2), (49, 0, 'D5', 2), (49, 2, 'G5', 2), (50, 0, 'B5', 4), (51, 0, 'G5', 6)]: flute(b, k, p, d, .34)
for e in EV:
    if e['type'] == 'tbell': n(e['t'], 'tubular_bells', 'G4', 6, .5, 0)
    if e['type'] == 'door': n(e['t'] + .3, 'hand_chimes', ['B5', 'D6', 'G6'][e['i']], 2, .3, -.4 + .4 * e['i'])
    if e['type'] == 'conch': n(e['t'] + .4, 'horn', 'G3', 2.4, .4, -.3, attack=.4, release=.8)
    if e['type'] == 'coins': n(e['t'], 'glockenspiel', 'G6', 1.4, .28, .5)
mus += S.render(ev, dur=N / SR)[:N]
mus = S.room(mus, size=.6, mix=.24)[:N]
for a, b in [(71.2, 72.3), (82.6, 83.4)]:   # held breaths: before the first step, before the bow
    i, j = int(a * SR), int(b * SR); g = np.ones(N); g[i:j] = np.linspace(1, .08, j - i) ** 2; k = int((b + .5) * SR); g[j:k] = np.linspace(.08, 1, k - j); mus *= g[:, None]
os.makedirs(f'{HERE}/out', exist_ok=True); sf.write(f'{HERE}/out/score.wav', mus.astype(np.float32), SR)

# ================= foley =================
fx = np.zeros((N, 2))
def brush(d, g, pan0=-.5, pan1=.5):
    m = int(d * SR); p = np.arange(m) / m
    x = bp(noise(m), 1500, 7000) * (.6 + .4 * np.abs(np.sin(np.arange(m) / SR * 2 * np.pi * 9))) + bp(pink(m), 300, 1500) * .5
    y = norm(x * np.sin(np.pi * p) ** .8, .5) * g; pan = pan0 + (pan1 - pan0) * p
    return np.stack([y * np.cos((pan + 1) * np.pi / 4) * 1.414, y * np.sin((pan + 1) * np.pi / 4) * 1.414], 1)
def bed(d, lo, hi, g, fade=1.5, mod=.15):
    m = int(d * SR); t = np.arange(m) / SR; x = bp(pink(m), lo, hi)
    e = np.minimum(1, np.minimum(t / fade, (d - t) / fade)) * (1 + mod * np.sin(2 * np.pi * t * .23))
    return np.stack([norm(x * e, 1) * g, norm(np.roll(x, 900) * e, 1) * g], 1)
def chirp(g):
    m = int(.12 * SR); t = np.arange(m) / SR; f = 3200 + 1600 * np.sin(np.pi * t / .12) + rng.uniform(-300, 300)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .12) ** 2 * g
def crackle(d, g, dens=26):
    m = int(d * SR); x = np.zeros(m)
    for _ in range(int(d * dens)):
        i = rng.integers(0, m - 600); L = rng.integers(60, 500); x[i:i + L] += noise(L) * np.exp(-np.arange(L) / (L / 4)) * rng.uniform(.3, 1)
    x = hp(x, 900) + bp(pink(m), 120, 600) * .35
    t = np.arange(m) / SR; e = np.minimum(1, np.minimum(t / .8, (d - t) / .6))
    return st(norm(x * e, .5) * g, .05)
def sweep(d, g):
    m = int(d * SR); t = np.arange(m) / SR; x = pink(m); y = np.zeros(m); sg = 4096
    for i in range(0, m, sg): f = 300 + 4000 * (i / m); y[i:i + sg] = bp(x[i:i + sg], f * .7, min(f * 1.6, 20000))
    return st(norm(y * np.sin(np.pi * t / d) ** 1.5, .5) * g)
def pencil(d, g=.12):
    m = int(d * SR); x = bp(noise(m), 2500, 8000) * (.5 + .5 * (np.sin(np.arange(m) / SR * 2 * np.pi * 7) > 0)) * np.hanning(m)
    return st(norm(x, g), .3)
def page():   # a sheet sliding over paper + a soft landing
    m = int(1.4 * SR); t = np.arange(m) / SR
    x = bp(noise(m), 600, 5000) * np.sin(np.pi * np.minimum(1, t / 1.3)) ** 1.2 + lp(noise(m), 300) * np.exp(-np.maximum(0, t - 1.25) * 30) * (t > 1.25) * 2
    return norm(x, .35)
for e in EV:
    t, k = e['t'], e['type']
    if k == 'brush': put(fx, t, brush(e['d'], e.get('g', .4) * .8, e.get('pan0', -.5), e.get('pan1', .5)))
    elif k == 'pencil': put(fx, t, pencil(e['d'], .12))
    elif k == 'sea': put(fx, t, bed(e['d'], 60, 700, .05, 2.0, .3))
    elif k == 'hiss': m = int(e['d'] * SR); put(fx, t, st(norm(bp(noise(m), 3000, 9000) * np.hanning(m), .06), -.5))
    elif k == 'coins':
        for i in range(4): m_ = int(.08 * SR); put(fx, t + i * .09, st(norm(np.sin(2 * np.pi * rng.uniform(3200, 4800) * np.arange(m_) / SR) * np.exp(-np.arange(m_) / SR * 50), .05), .5))
    elif k == 'wind': put(fx, t, bed(e['d'], 300, 2600, .035, 1.5, .45))
    elif k == 'wings':
        for i in range(int(e['d'] / 1.43)): put(fx, t + i * 2.86 / 2, st(norm(bp(noise(int(.35 * SR)), 200, 1600) * np.hanning(int(.35 * SR)), .1), 0))
    elif k == 'cry': m = int(.6 * SR); tt = np.arange(m) / SR; put(fx, t, st(norm(np.sin(2 * np.pi * np.cumsum(2400 - 900 * tt / .6) / SR) * np.sin(np.pi * tt / .6) ** 2 * (1 + .3 * np.sin(2 * np.pi * 30 * tt)), .06), .4))
    elif k == 'swell': put(fx, t, sweep(e['d'], .22))
    elif k == 'stars':
        for i in range(24): m_ = int(.25 * SR); put(fx, t + rng.uniform(0, e['d']), st(norm(hp(noise(m_), 6000) * np.exp(-np.arange(m_) / SR * 20), .03), rng.uniform(-.8, .8)))
    elif k == 'step': put(fx, t, st(S.hit('bass_drum', None, min(1, .5 + .5 * e['g'])), 0), .9 * e['g']); put(fx, t + .02, st(S.hit('gong', None, .45 * e['g']), 0), .4 * e['g'])
    elif k == 'temple': put(fx, t, bed(e['d'], 200, 1500, .015, 2.0, .1))
    elif k == 'door': m = int(.5 * SR); put(fx, t, st(norm(lp(noise(m), 500) * np.exp(-np.arange(m) / SR * 12), .12), -.4 + .4 * e['i']))
    elif k == 'river': put(fx, t, bed(e['d'], 400, 3500, .045, 2.0, .1))
put(fx, 0, bed(DUR, 200, 4000, .006, 1, 0))   # paper room tone
IRn = int(1.4 * SR); IR = np.stack([noise(IRn), noise(IRn)], 1) * np.exp(-np.arange(IRn) / SR * 4)[:, None]
IR = np.stack([lp(IR[:, 0], 5000), lp(IR[:, 1], 5000)], 1); IR /= np.sqrt((IR ** 2).sum(0))
fx = fx * .82 + np.stack([fftconvolve(fx[:, c], IR[:, c])[:N] for c in range(2)], 1) * .18

# ================= voice =================
vo = np.zeros(N); speech = np.zeros(N, bool)
def limit1(x, ceil):
    a = np.abs(x); g = np.ones_like(x); over = a > ceil; g[over] = ceil / a[over]; look = int(.005 * SR)
    g = uniform_filter1d(minimum_filter1d(g, look * 2 + 1), look); return x * g
for e in EV:
    if e['type'] != 'voice': continue
    x, sr = sf.read(f"{HERE}/voices/{e['id']}.wav", dtype='float64')
    if x.ndim > 1: x = x.mean(1)
    x = hp(resample_poly(x, SR, sr), 90); x = limit1(x, rms(x[np.abs(x) > .01]) * 3.5)
    i = int(e['t'] * SR); vo[i:i + len(x)] += x[:N - i]; speech[i:i + len(x)] = True
sp = uniform_filter1d(speech.astype(float), int(.3 * SR))
lst = np.ones(N)
bed_ = mus * .9 * lst[:, None] * (1 - .45 * sp)[:, None] + fx * (1 - .72 * sp)[:, None]   # music ~5 dB, foley ~11 dB under speech
vo *= rms(bed_.mean(1)[speech]) * 10 ** (12 / 20) / rms(vo[speech])
out = (bed_ + st(vo, 0))[:int(DUR * SR)]
if os.environ.get('STEMS'):
    for nm, b in [('mus', mus * .9 * lst[:, None] * (1 - .45 * sp)[:, None]), ('fx', fx * (1 - .72 * sp)[:, None]), ('vo', 0 * mus)]: sf.write(f'{HERE}/out/s_{nm}.wav', norm(b + st(vo, 0), .89).astype(np.float32), SR)
sf.write(sys.argv[1] if len(sys.argv) > 1 else f'{HERE}/out/mix.wav', norm(out, .89).astype(np.float32), SR)
print('dur', DUR, 'voice/bed dB', round(20 * np.log10(rms(vo[speech]) / rms(bed_.mean(1)[speech])), 1))
