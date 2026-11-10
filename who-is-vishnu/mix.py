# score (sampled + plucked-string model, 72 BPM, climbing with the avatars) + procedural foley from events.json + narration -> out/mix.wav
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
E = {}
for e in EV: E.setdefault(e['type'], []).append(e)
bands = [e['t'] for e in E['band']]; END10 = bands[-1] + 11.5
# each band gets the next chord up the D major scale: the harmony climbs with the camera
CH = [('D', ['D3', 'A3', 'D4', 'F#4']), ('Em', ['E3', 'B3', 'E4', 'G4']), ('F#m', ['F#3', 'C#4', 'F#4', 'A4']), ('G', ['G3', 'D4', 'G4', 'B4']), ('A', ['A3', 'E4', 'A4', 'C#5']),
      ('Bm', ['B3', 'F#4', 'B4', 'D5']), ('G', ['G3', 'D4', 'B4', 'D5']), ('A', ['A3', 'E4', 'C#5', 'E5']), ('Bm', ['B3', 'F#4', 'D5', 'F#5']), ('D', ['D4', 'A4', 'D5', 'F#5'])]
BASS = ['D2', 'E2', 'F#2', 'G2', 'A2', 'B2', 'G2', 'A2', 'B2', 'D3']
def harp_run(t0, t1, notes, v=.3, step=BEAT / 2, pan=-.25):
    t, k = t0, 0
    while t < t1 - .1: n(t, 'harp', notes[[0, 1, 2, 3, 2, 1][k % 6]], BEAT * 1.4, v * (1 if k % 6 == 0 else .8), pan); t += step; k += 1
# the question: a held D, a glockenspiel note per dot
n(.3, 'cellos', 'D2', 21.2, .24, -.2, attack=3, release=1.2); n(.8, 'vibraphone_bowed', 'A4', 20, .14, .3, attack=2, release=1.5)
for e in E.get('dot', [])[:10]: n(e['t'], 'glockenspiel', ['D6', 'E6', 'F#6', 'G6', 'A6', 'B6', 'C#7', 'D7', 'E7', 'F#7'][e['i']], 1.2, .24, -.5 + e['i'] * .1)
harp_run(5.0, 21.0, ['D3', 'A3', 'D4', 'E4'], .24, BEAT)
for t0, p, d in [(9.0, 'A4', 2.4), (11.6, 'F#4', 1.6), (13.4, 'E4', 2.4), (16.6, 'D5', 3.0)]: n(t0, 'flute', p, d, .32, .15, release=.8)
# the climb
for i, s in enumerate(bands):
    t1 = bands[i + 1] - .2 if i < 9 else END10
    nm, notes = CH[i]
    n(s - .6, 'cellos', BASS[i], t1 - s + .8, .24, -.2, attack=1.2, release=1.0)
    for p in notes[1:3]: n(s, 'vibraphone_bowed', p, t1 - s, .12, .3, attack=.8, release=1.2)
    harp_run(s + 2.0, t1, notes, .26 + .01 * i, BEAT / 2 if i in (3, 9) else BEAT)
    n(s - .6, 'glockenspiel', notes[3] if notes[3][-1] in '567' else notes[3][:-1] + str(int(notes[3][-1]) + 1), 1.6, .26, .4)   # a bright note as each band arrives
# the ten, gathered; the gold line descends; again, and again
n(END10, 'cellos', 'D2', 37.0, .24, -.2, attack=2.5, release=1.5); n(END10 + .4, 'cellos', 'A2', 36.6, .2, .2, attack=2.5, release=1.5)
harp_run(END10 + 1.0, 169.0, ['D3', 'A3', 'D4', 'F#4'], .24, BEAT)
for e in E.get('touch', []): n(e['t'], 'glockenspiel', ['F#7', 'E7', 'D7', 'C#7', 'B6', 'A6', 'G6', 'F#6', 'E6', 'D6'][e['i']], 1.2, .24, .5 - e['i'] * .1)   # the descent, note by note downward
for t0, p, d in [(136.0, 'A4', 2.0), (138.6, 'D5', 2.0), (152.4, 'F#5', 2.4), (155.4, 'A5', 2.0), (157.8, 'D6', 4.0), (162.4, 'A5', 5.0)]: n(t0, 'flute', p, d, .34, .15, release=1.2)
n(156.4, 'tubular_bells', 'D4', 6, .5, 0)
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
RAINS = []
for e in EV:
    t, k = e['t'], e['type']
    if k == 'brush': put(fx, t, brush(e['d'], e.get('g', .4) * .8, e.get('pan0', -.5), e.get('pan1', .5)))
    elif k == 'pencil': put(fx, t, pencil(e['d'], .12))
    elif k == 'sea': put(fx, t, bed(e['d'], 60, 700, .05, 2.0, .3))
    elif k == 'dive': put(fx, t, sweep(e['d'], .3))
    elif k == 'rain': put(fx, t, bed(e['d'], 2000, 8000, .03, 1.0, .1))
    elif k == 'waves': put(fx, t, bed(e['d'], 80, 900, .05, 1.5, .4))
    elif k == 'deep': put(fx, t, bed(e['d'], 40, 300, .07, 1.5, .3))
    elif k == 'roar': m = int(1.6 * SR); tt = np.arange(m) / SR; put(fx, t, st(norm(lp(pink(m), 400) * np.sin(np.pi * tt / 1.6) ** .6 * (1 + .5 * np.sin(2 * np.pi * 22 * tt)), .3), 0))
    elif k == 'step': put(fx, t, st(S.hit('bass_drum', None, .4 + .4 * e['g']), 0), .6 * e['g'])
    elif k == 'leaves': put(fx, t, bed(e['d'], 2000, 7000, .012, 1.5, .5))
    elif k == 'river': put(fx, t, bed(e['d'], 400, 3500, .035, 1.5, .1))
    elif k == 'moo': m = int(1.2 * SR); tt = np.arange(m) / SR; put(fx, t, st(norm(bp(np.sin(2 * np.pi * np.cumsum(140 - 30 * tt) / SR) + .3 * pink(m) * .02, 80, 900) * np.sin(np.pi * tt / 1.2) ** 1.5, .07), -.4))
    elif k == 'birds':
        for i in range(14): put(fx, t + rng.uniform(.3, e['d']), st(chirp(rng.uniform(.03, .06)), rng.uniform(-.7, .7)))
    elif k == 'wind': put(fx, t, bed(e['d'], 300, 2600, .03, 1.5, .45))
    elif k == 'gallop':
        for i in range(int(e['d'] / .36)): put(fx, t + i * .36 + (i % 3) * .06, st(norm(lp(noise(int(.06 * SR)), 600) * np.exp(-np.arange(int(.06 * SR)) / SR * 50), .06), .3))
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
