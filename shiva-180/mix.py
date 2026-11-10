# score (sampled + plucked-string model, 72 BPM, D minor) + procedural foley from events.json + narration -> out/mix.wav
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
mus = np.zeros((N, 2))
P = [bar(17), bar(21.5), bar(26), bar(30.5), bar(35)]; SYL = [bar(42), bar(42.5), bar(43), bar(43.5), bar(44)]
def tanpura(b0, b1, v=.22, pan=-.35):   # the drone figure: Pa Sa Sa Sa, one note per beat
    for b in range(b0, b1):
        for k, p in enumerate(['A2', 'D3', 'D3', 'D2']): n(bar(b) + k * BEAT, 'harp', p, BEAT * 3, v * (1 if k == 0 else .75), pan)
def drone(t0, t1, v=.24):
    n(t0, 'cellos', 'D2', t1 - t0, v, -.2, attack=2.5, release=1.2); n(t0 + .4, 'cellos', 'A2', t1 - t0 - .4, v * .8, .2, attack=2.5, release=1.2)
def flute(b, k, p, d, v=.38): n(bar(b) + k * BEAT, 'flute', p, d * BEAT, v, .15, release=.8)
# churning: drone + tanpura; it drops away as the poison spreads, returns softly when it is held
drone(.3, 7.2, .26); tanpura(0, 2, .2)
n(6.6, 'cellos', 'D1', 5.4, .3, 0, attack=3, release=1)
drone(15.2, 30.4, .22); tanpura(5, 9, .18)
for b, k, p, d in [(5, 2, 'A4', 2), (6, 0, 'F5', 2), (6, 2, 'E5', 2), (7, 0, 'D5', 4), (8, 0, 'C5', 2), (8, 2, 'D5', 2)]: flute(b, k, p, d, .34)
# Kailash: high and open
drone(30.2, bar(13) + 1, .2); tanpura(9, 13, .16)
for b, k, p, d in [(10, 0, 'D5', 2), (10, 2, 'F5', 1), (10, 3, 'G5', 1), (11, 0, 'A5', 4), (12, 0, 'G5', 2), (12, 2, 'F5', 2)]: flute(b, k, p, d, .36)
n(bar(9) + .2, 'vibraphone_bowed', 'D5', BAR * 4, .14, .3, attack=1, release=1.5); n(bar(9) + .2, 'vibraphone_bowed', 'A4', BAR * 4, .13, -.3, attack=1, release=1.5)
# the index: one soft harp note per element (rising)
drone(bar(13), P[0] + 1, .18); tanpura(13, 17, .14)
for i, p in enumerate(['D4', 'F4', 'A4', 'C5', 'D5']): n(bar(15.25) + i * BEAT, 'harp', p, 2, .3, -.2 + i * .1)
# the five pages: the drone runs through; each element its own colour
drone(P[0], 133.0, .2)
tanpura(17, 39, .13)
for b, k, p, d in [(18, 2, 'F4', 2), (19, 0, 'G4', 2), (19, 2, 'A4', 4), (20, 2, 'C5', 2)]: flute(b, k, p, d, .32)   # earth
for t0 in [P[1] + 3.3, P[1] + 8.3, P[1] + 12.0]: n(t0, 'glockenspiel', 'A6', 1.6, .22, .3); n(t0 + BEAT, 'glockenspiel', 'D7', 1.6, .18, -.3)   # water drops (between the words)
n(P[2], 'violas', 'D3', 15, .26, -.3, attack=3, release=.6); n(P[2] + 3, 'violins_trem', 'A3', 12, .24, .3, attack=4, release=.6)   # fire
n(P[3], 'vibraphone_bowed', 'F4', 15, .16, .3, attack=2, release=1.5); n(P[3], 'vibraphone_bowed', 'C5', 15, .14, -.3, attack=2, release=1.5)   # air
for b, k, p, d in [(31.5, 0, 'C5', 2), (31.5, 2, 'D5', 2), (32.5, 0, 'F5', 4), (33.5, 0, 'E5', 4)]: flute(b, k, p, d, .3)
# space: drum and the ring; then a held silence before the curtain parts
n(P[4], 'violas', 'A3', 7, .24, -.3, attack=2, release=.5)
# the syllables: a note after each one, never on it; the mantra; the title bell
drone(135.2, 166.0, .2); tanpura(41, 50, .14)
for i, (t, p) in enumerate(zip(SYL, ['D5', 'F5', 'G5', 'A5', 'D6'])): n(t + BEAT, 'hand_chimes', p, .9, .3, -.6 + i * .3, release=.5)
for b, k, p, d in [(46.5, 0, 'A4', 2), (46.5, 2, 'D5', 2), (47.5, 0, 'F5', 4), (48.5, 0, 'E5', 2), (48.5, 2, 'D5', 6)]: flute(b, k, p, d, .34)
# the end: only the drone, thinning, then the last chime for the blue dot
drone(166.0, 179.0, .16); n(174.0, 'hand_chimes', 'D6', 3, .3, 0)
for e in EV:
    if e['type'] == 'tbell': n(e['t'], 'tubular_bells', 'D4', 6, .5, 0)
    if e['type'] == 'bells': n(e['t'], 'nepal_bells', None, None, .5, .1)
    if e['type'] == 'chime': n(e['t'], 'hand_chimes', 'A5', 2.5, .35, 0)
mus += S.render(ev, dur=N / SR)[:N]
mus = S.room(mus, size=.6, mix=.24)[:N]
for a, b in [(125.4, 126.8), (162.6, 164.0)]:   # held silences: before the curtain opens; before the last line
    i, j = int(a * SR), int(b * SR); g = np.ones(N); g[i:j] = np.minimum(np.linspace(1, .05, j - i) ** 2, 1); k = int((b + .6) * SR); g[j:k] = np.linspace(.05, 1, k - j); mus *= g[:, None]
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
    elif k == 'sea': put(fx, t, bed(e['d'], 60, 700, .06, 2.0, .3))
    elif k == 'churn': m = int(e['d'] * SR); put(fx, t, st(norm(bp(pink(m), 200, 1200) * (1 + .5 * np.sin(np.arange(m) / SR * 2 * np.pi * 1.1)) * np.hanning(m), .12), 0))
    elif k == 'poison': m = int(e['d'] * SR); tt = np.arange(m) / SR; put(fx, t, st(norm(lp(pink(m), 300) * np.minimum(1, tt / 2) * np.minimum(1, (e['d'] - tt) / .8), .45), 0))
    elif k == 'gather': put(fx, t, sweep(e['d'], .25))
    elif k == 'wind': put(fx, t, bed(e['d'], 300, 2600, .04 * e.get('g', 1), 1.5, .45))
    elif k == 'leaves': put(fx, t, bed(e['d'], 2000, 7000, .012, 1.5, .5))
    elif k == 'spring':
        put(fx, t, bed(e['d'], 300, 2500, .03, 1.5, .2))
        for i in range(12): m_ = int(.15 * SR); put(fx, t + 1.5 + i * 1.1 + rng.uniform(0, .3), st(norm(np.sin(2 * np.pi * np.cumsum(900 * (1 + np.exp(-np.arange(m_) / SR * 40))) / SR) * np.exp(-np.arange(m_) / SR * 25), .08), rng.uniform(-.4, .4)))
    elif k in ('fire', 'fireS'): put(fx, t, crackle(e['d'], .4 if k == 'fire' else .3))
    elif k == 'drum': put(fx, t, st(S.hit('frame_drum', 'large' if e['g'] >= 1 else 'small', min(1, .55 + .4 * e['g'])), -.1), .45)
    elif k == 'rise': put(fx, t, sweep(e['d'], .22))
    elif k == 'cloth': m = int(e['d'] * SR); put(fx, t, st(norm(bp(noise(m), 400, 3000) * np.hanning(m) * (.7 + .3 * np.sin(np.arange(m) / SR * 2 * np.pi * 3)), .14), 0))
    elif k == 'mist': put(fx, t, sweep(e['d'], .3))
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
