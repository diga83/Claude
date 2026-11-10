# score (sampled + plucked-string model, 75 BPM in D) + procedural foley from events.json + narration -> out/mix.wav
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
BEAT = .8; BAR = 3.2; bar = lambda n: n * BAR
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
ARP = {'D': ['D3', 'A3', 'D4', 'E4', 'F#4', 'E4', 'D4', 'A3'], 'Bm': ['B2', 'F#3', 'B3', 'C#4', 'D4', 'C#4', 'B3', 'F#3'],
       'G': ['G2', 'D3', 'G3', 'A3', 'B3', 'A3', 'G3', 'D3'], 'A': ['A2', 'E3', 'A3', 'B3', 'C#4', 'B3', 'A3', 'E3'], 'Em': ['E3', 'B3', 'E4', 'F#4', 'G4', 'F#4', 'E4', 'B3']}
PAD = {'D': ['F#4', 'A4'], 'Bm': ['D4', 'F#4'], 'G': ['D4', 'G4'], 'A': ['C#4', 'E4'], 'Em': ['E4', 'G4']}
def harp_bar(b, ch, v=.4, step=2, pan=-.25):
    for k in range(0, 8, step): n(bar(b) + k * BEAT / 2, 'harp', ARP[ch][k], BEAT * 1.6, v * (1 if k == 0 else .8), pan)
def pad(b, ch, v=.18):
    for p in PAD[ch]: n(bar(b), 'vibraphone_bowed', p, BAR, v, .3, attack=.6, release=1.2)
# the egg: a low drone under dark water, glock for gold
n(.2, 'cellos', 'D2', 34.8, .3, -.2, attack=3, release=1); n(2.0, 'cellos', 'A2', 33, .22, .2, attack=3, release=1)
for t, p in [(.3, 'A6'), (2.2, 'D7'), (5.0, 'F#6')]: n(t, 'glockenspiel', p, 2, .3, .1)
for b in (2, 3): pad(b, 'D', .14)
# creation: the harp wakes at the split, the flute at the lotus
for i, b in enumerate(range(4, 11)): ch = ['D', 'Bm', 'G', 'A', 'D', 'G', 'A'][i]; harp_bar(b, ch, .38, 1 if b >= 5 else 2); pad(b, ch)
for b, k, p, d in [(5, 2, 'A4', 2), (6, 0, 'D5', 2), (6, 2, 'F#5', 2), (7, 0, 'E5', 3), (9, 0, 'A5', 2), (9, 2, 'F#5', 2), (10, 0, 'E5', 4)]: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .42, .15, release=.6)
# the hands: lighter, harp in quarters, flute phrases between the spoken lines
n(bar(11), 'cellos', 'D2', bar(22) - bar(11), .2, -.2, attack=2, release=1)
for i, b in enumerate(range(11, 22)): ch = ['D', 'G', 'Bm', 'A'][i % 4]; harp_bar(b, ch, .3, 2, -.3); pad(b, ch, .14)
for t0, notes in [(44.0, ['F#5', 'E5', 'D5']), (52.6, ['A5', 'F#5', 'E5']), (60.4, ['B5', 'A5', 'F#5']), (68.4, ['D6', 'A5'])]:
    for j, p in enumerate(notes): n(t0 + j * BEAT, 'flute', p, BEAT * (2 if j == len(notes) - 1 else 1), .34, .2, release=.6)
# the swan: flute and harp, gentle
for i, b in enumerate(range(22, 27)): ch = ['G', 'D', 'Em', 'A', 'D'][i]; harp_bar(b, ch, .3, 2, -.3); pad(b, ch, .16)
n(bar(22), 'cellos', 'G2', BAR * 5, .2, -.2, attack=2, release=1)
# time: pad only, thinning to silence as the universe rests
n(bar(27) + .2, 'vibraphone_bowed', 'D4', 10, .2, 0, attack=1.5, release=2); n(bar(27) + .2, 'vibraphone_bowed', 'A4', 10, .18, .2, attack=1.5, release=2)
n(95.4, 'glockenspiel', 'D7', 2, .3, 0); n(96.0, 'glockenspiel', 'A6', 2, .25, .3)
# Pushkar before dawn: a drone returns, temple bells; the flute climbs with the light
n(100.6, 'cellos', 'D2', 19.2, .26, -.2, attack=4, release=1.5); n(101.0, 'cellos', 'A2', 18.8, .2, .2, attack=4, release=1.5)
for i, b in enumerate(range(32, 37)): ch = ['D', 'Bm', 'G', 'A', 'D'][i]; harp_bar(b, ch, .26 + .03 * i, 2, -.3); pad(b, ch, .14 + .02 * i)
for b, k, p, d in [(34, 0, 'A4', 2), (34, 2, 'D5', 2), (35, 0, 'E5', 2), (35, 2, 'F#5', 2), (36, 0, 'A5', 4), (37, 0, 'F#5', 5)]: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .4, .15, release=1.5)
for e in EV:
    if e['type'] == 'glock': n(e['t'], 'glockenspiel', e['p'], 1.8, .38, 0)
    if e['type'] == 'templebell': n(e['t'], 'nepal_bells', None, None, .5, .2)
    if e['type'] == 'tbell': n(e['t'], 'tubular_bells', 'D4', 6, .5, 0)
mus += S.render(ev, dur=N / SR)[:N]
mus = S.room(mus, size=.55, mix=.22)[:N]
i, j = int(98.8 * SR), int(100.6 * SR); mus[i:j] *= (np.linspace(1, 0, j - i) ** 2)[:, None]   # silence as the universe rests
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
    elif k == 'bloom': m = int(3.4 * SR); put(fx, t, st(norm(lp(pink(m), 900) * np.sin(np.pi * np.arange(m) / m) ** 2, .25), 0))
    elif k == 'deep': put(fx, t, bed(e['d'], 40, 260, .08, 2.0, .35))
    elif k == 'water': put(fx, t, bed(e['d'], 150, 900, .04, 2.0))
    elif k == 'lake': put(fx, t, bed(e['d'], 150, 900, .035, 2.0))
    elif k == 'crack':
        for i in range(5): m = int(.05 * SR); put(fx, t + i * .12 + rng.uniform(0, .04), st(norm(hp(noise(m), 1500) * np.exp(-np.arange(m) / SR * 90), .3), rng.uniform(-.5, .5)))
    elif k == 'swell': put(fx, t, sweep(e['d'], .3))
    elif k == 'pour':
        m = int(e['d'] * SR); x = bp(noise(m), 500, 3000) * (.6 + .4 * np.abs(np.sin(np.arange(m) / SR * 2 * np.pi * 5.5))); e_ = np.minimum(1, np.minimum(np.arange(m) / SR / .3, (e['d'] - np.arange(m) / SR) / .5))
        put(fx, t, st(norm(x * e_, .22), .35))
    elif k == 'bead': m = int(.04 * SR); put(fx, t, st(norm(bp(noise(m), 1800, 6000) * np.exp(-np.arange(m) / SR * 160), .18), -.4 + .8 * (e['i'] / 29)))
    elif k == 'wings':
        for i in range(3): put(fx, t + i * .28, st(norm(bp(noise(int(.2 * SR)), 300, 2000) * np.hanning(int(.2 * SR)), .14), -.4))
    elif k == 'swirl': m = int(e['d'] * SR); put(fx, t, st(norm(bp(pink(m), 300, 1400) * np.hanning(m) * (1 + .4 * np.sin(np.arange(m) / SR * 2 * np.pi * 1.2)), .14), 0))
    elif k == 'mist': put(fx, t, sweep(e['d'], .32))
    elif k == 'burst':
        for i in range(10): put(fx, t + i * .15, brush(.5, .25, rng.uniform(-.9, 0), rng.uniform(0, .9)))
    elif k == 'birds':
        for i in range(16): put(fx, t + rng.uniform(.3, e['d']), st(chirp(rng.uniform(.04, .08)), rng.uniform(-.7, .7)))
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
