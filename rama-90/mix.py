# score (sampled + plucked-string model, 72 BPM, a journey) + procedural foley from events.json + narration -> out/mix.wav
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
BEAT = 60 / 72; BAR = BEAT * 4; bar = lambda n: n * BAR
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
def harp_run(t0, t1, notes, v=.26, step=BEAT, pan=-.25):
    t, k = t0, 0
    while t < t1 - .1: n(t, 'harp', notes[[0, 1, 2, 3, 2, 1][k % 6]], BEAT * 1.6, v * (1 if k % 6 == 0 else .8), pan); t += step; k += 1
def flute(t, p, d, v=.32): n(t, 'flute', p, d, v, .15, release=1.0)
def cello(t0, t1, p, v=.2): n(t0, 'cellos', p, t1 - t0, v, -.2, attack=1.5, release=1.0)
SEC = [(0, 10, 'D', ['D3', 'A3', 'D4', 'F#4'], 'D2'), (10, 24, 'Bm', ['B2', 'F#3', 'B3', 'D4'], 'B1'), (24, 40, 'Em', ['E3', 'B3', 'E4', 'G4'], 'E2'), (40, 52, 'G', ['G2', 'D3', 'G3', 'B3'], 'G2'),
       (52, 62, 'A', ['A2', 'E3', 'A3', 'C#4'], 'A2'), (62, 70, 'Bm', ['B2', 'F#3', 'B3', 'D4'], 'B1'), (70, 90, 'D', ['D3', 'A3', 'D4', 'F#4'], 'D2')]
for t0, t1, nm, notes, bass in SEC:
    cello(t0 + .2, t1 + .3, bass if bass[-1] != '1' else bass[:-1] + '2')
    harp_run(t0 + .4, t1, notes, .24, BEAT if nm not in ('A', 'D') or t0 < 50 else BEAT / 2)
for t0, p, d in [(1.0, 'A4', 1.6), (2.8, 'D5', 2.2), (6.8, 'F#5', 1.6), (8.6, 'E5', 1.4),          # Ayodhya
                 (20.0, 'D5', 1.6), (21.8, 'B4', 2.4),                                         # into the forest
                 (36.6, 'G5', 1.4), (38.2, 'E5', 1.8),                                          # the trail
                 (49.0, 'D5', 1.4), (50.6, 'B4', 1.4),                                          # the shore
                 (73.0, 'A4', 1.0), (74.2, 'D5', 1.0), (75.4, 'F#5', 1.4), (79.0, 'A5', 2.0), (81.4, 'D6', 3.0), (85.0, 'A5', 2.0), (87.2, 'D5', 2.4)]:
    flute(t0, p, d, .32)
for k in range(8): n(26.2 + k * .42, 'glockenspiel', ['B6', 'D7', 'E7', 'G7'][k % 4], .6, .16, .4)   # the golden deer
n(64.0, 'frame_drum', 'large', None, .8, 0); n(64.5, 'frame_drum', 'large', None, .9, 0); n(65.0, 'gong', None, None, .55, 0)
n(82.4, 'tubular_bells', 'D4', 6, .45, 0)
mus = S.render(ev, dur=N / SR)[:N]
mus = S.room(mus, size=.55, mix=.22)[:N]
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
def tick(g=.06, lo=300, hi=2000, d=.06):
    m = int(d * SR); return norm(bp(noise(m), lo, hi) * np.exp(-np.arange(m) / SR * (3 / d)), g)
for e in EV:
    t, k = e['t'], e['type']
    if k == 'brush': put(fx, t, brush(e['d'], e.get('g', .4) * .8, e.get('pan0', -.5), e.get('pan1', .5)))
    elif k == 'pencil': put(fx, t, pencil(e['d'], .12))
    elif k == 'steps':
        for i in range(int(e['d'] / .42)): put(fx, t + i * .42, st(tick(.05, 200, 1200, .08), -.2 + .4 * (i % 2)))
    elif k == 'leaves': put(fx, t, bed(e['d'], 2000, 7000, .012, 1.5, .5))
    elif k == 'hooves':
        for i in range(int(e['d'] / .21)): put(fx, t + i * .21 + (i % 2) * .04, st(tick(.05, 300, 1600, .05), -.6 + 1.2 * i * .21 / e['d']))
    elif k == 'whoosh': put(fx, t, sweep(e['d'], .3))
    elif k == 'jewels':
        for i in range(16): m_ = int(.12 * SR); put(fx, t + i * .2, st(norm(np.sin(2 * np.pi * rng.uniform(3000, 5200) * np.arange(m_) / SR) * np.exp(-np.arange(m_) / SR * 40), .03), .2))
    elif k == 'sea': put(fx, t, bed(e['d'], 60, 900, .05, 2.0, .35))
    elif k == 'chatter':
        for i in range(18): m_ = int(.09 * SR); tt = np.arange(m_) / SR; put(fx, t + rng.uniform(0, e['d']), st(norm(np.sin(2 * np.pi * np.cumsum(rng.uniform(900, 1500) + 600 * np.sin(np.pi * tt / .09)) / SR) * np.sin(np.pi * tt / .09), .025), rng.uniform(-.8, .8)))
    elif k == 'leap': put(fx, t, sweep(e['d'], .2))
    elif k == 'stone': m_ = int(.3 * SR); put(fx, t, st(norm(lp(noise(m_), 900) * np.exp(-np.arange(m_) / SR * 14), .06), 0))
    elif k == 'arrow': put(fx, t, sweep(.5, .3))
    elif k == 'thud': put(fx, t, st(S.hit('bass_drum', None, .7), 0), .7)
    elif k == 'lamps':
        for i in range(30): m_ = int(.2 * SR); put(fx, t + i * e['d'] / 30, st(norm(bp(noise(m_), 2000, 7000) * np.exp(-np.arange(m_) / SR * 30), .03), rng.uniform(-.4, .4)))
    elif k == 'bells': put(fx, t, st(S.hit('nepal_bells', None, .5), .2), .6)
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
