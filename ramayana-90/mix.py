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

# ================= score: continuous, one chord per chapter, never a silence =================
ev = []
def n(t, inst, p, d, v, pan=0, **k): ev.append(dict(t=t, inst=inst, pitch=p, dur=d, vel=v, pan=pan, **k))
def harp_run(t0, t1, notes, v=.26, step=BEAT / 2, pan=-.25):
    t, k = t0, 0
    while t < t1 - .05: n(t, 'harp', notes[[0, 1, 2, 3, 2, 1][k % 6]], BEAT * 1.6, v * (1 if k % 6 == 0 else .8), pan); t += step; k += 1
PANEL = sorted([e for e in EV if e['type'] == 'panel'], key=lambda e: e['k'])
CH = [('D', ['D3', 'A3', 'D4', 'F#4'], 'D2'), ('G', ['G2', 'D3', 'G3', 'B3'], 'G2'), ('Bm', ['B2', 'F#3', 'B3', 'D4'], 'B2'), ('Em', ['E3', 'B3', 'E4', 'G4'], 'E2'), ('A', ['A2', 'E3', 'A3', 'C#4'], 'A2'),
      ('G', ['G2', 'D3', 'G3', 'B3'], 'G2'), ('Bm', ['B2', 'F#3', 'B3', 'D4'], 'B2'), ('D', ['D3', 'A3', 'D4', 'F#4'], 'D2'), ('Em', ['E3', 'B3', 'E4', 'G4'], 'E2'), ('A', ['A2', 'E3', 'A3', 'C#4'], 'A2'),
      ('Bm', ['B2', 'F#3', 'B3', 'D4'], 'B2'), ('G', ['G2', 'D3', 'G3', 'B3'], 'G2'), ('D', ['D3', 'A3', 'D4', 'F#4'], 'D2')]
for e in PANEL:
    k = e['k']; t0 = max(0.0, e['t'] - .1); t1 = t0 + e['d'] + (.4 if k < 12 else 0)
    nm, notes, bass = CH[k]
    n(t0, 'cellos', bass, t1 - t0 + .6, .22, -.2, attack=.4 if k else .05, release=1.0)
    for p in notes[1:3]: n(t0, 'vibraphone_bowed', p, t1 - t0 + .4, .12, .3, attack=.3 if k else .05, release=1.0)
    harp_run(t0, t1, notes, .25 if k != 10 else .3)
    n(t0 + .05, 'glockenspiel', notes[3][:-1] + str(int(notes[3][-1]) + 2), 1.4, .2, .4)
# the flute sings quietly between and under the lines (ducked by the voice)
FL = [('A4', 'D5', 'F#5'), ('B4', 'D5', 'G5'), ('F#4', 'B4', 'D5'), ('G4', 'B4', 'E5'), ('A4', 'C#5', 'E5'), ('G4', 'B4', 'D5'), ('F#4', 'B4', 'D5'), ('A4', 'D5', 'F#5'), ('G4', 'B4', 'E5'), ('A4', 'C#5', 'E5'), ('B4', 'D5', 'F#5'), ('B4', 'D5', 'G5'), ('D5', 'F#5', 'A5')]
for e in PANEL:
    k = e['k']; t0 = max(0.0, e['t']) + .3
    for j, p in enumerate(FL[k]): n(t0 + j * BEAT * 2, 'flute', p, BEAT * 2.2, .22, .15, release=.8)
# the war: a frame drum pulse; the snap of the bow; the end: bells and a long held chord
war = PANEL[10]; t = war['t']
while t < war['t'] + war['d']: n(t, 'frame_drum', 'large', None, .55, -.1); t += BEAT
n(PANEL[1]['t'] + 6.9, 'gong', None, None, .45, 0)
n(84.0, 'tubular_bells', 'D4', 6, .45, 0)
for p in ['D3', 'A3', 'D4', 'F#4', 'A4']: n(86.0, 'vibraphone_bowed', p, 4.0, .14, 0, attack=.6, release=.6)
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
AMB = {0: (200, 1500, .015), 1: (300, 2000, .012), 2: (150, 900, .012), 3: (2000, 7000, .012), 4: (150, 900, .012), 5: (2000, 7000, .014), 6: (200, 2600, .03), 7: (300, 2500, .02), 8: (60, 900, .04), 9: (60, 900, .045), 10: (100, 1200, .03), 11: (200, 1500, .015), 12: (200, 1500, .015)}
for e in EV:
    t, k = e['t'], e['type']
    if k == 'panel': lo, hi, g = AMB[e['k']]; put(fx, t, bed(e['d'] + .9, lo, hi, g, .5, .2))   # an ambience under every panel, overlapping: never a gap
    elif k == 'brush': put(fx, t, brush(e['d'], e.get('g', .4) * .8, e.get('pan0', -.5), e.get('pan1', .5)))
    elif k == 'pencil': put(fx, t, pencil(e['d'], .05))   # quieter: it lands near the start of each line
    elif k == 'snap': m_ = int(.4 * SR); put(fx, t, st(norm(hp(noise(m_), 800) * np.exp(-np.arange(m_) / SR * 18), .35), 0)); put(fx, t + .02, st(S.hit('bass_drum', None, .6), 0), .5)
    elif k == 'steps':
        for i in range(int(e['d'] / .42)): put(fx, t + i * .42, st(tick(.05, 200, 1200, .08), -.2 + .4 * (i % 2)))
    elif k == 'hooves':
        for i in range(int(e['d'] / .21)): put(fx, t + i * .21 + (i % 2) * .04, st(tick(.05, 300, 1600, .05), -.6 + 1.2 * i * .21 / e['d']))
    elif k == 'whoosh': put(fx, t, sweep(e['d'], .22))
    elif k == 'jewels':
        for i in range(14): m_ = int(.12 * SR); put(fx, t + i * .18, st(norm(np.sin(2 * np.pi * rng.uniform(3000, 5200) * np.arange(m_) / SR) * np.exp(-np.arange(m_) / SR * 40), .03), .2))
    elif k == 'wings':
        for i in range(8): put(fx, t + i * .36, st(norm(bp(noise(int(.25 * SR)), 200, 1600) * np.hanning(int(.25 * SR)), .07), 0))
    elif k == 'thud': put(fx, t, st(S.hit('bass_drum', None, .6), 0), .5)
    elif k == 'chatter':
        for i in range(20): m_ = int(.09 * SR); tt = np.arange(m_) / SR; put(fx, t + rng.uniform(0, e['d']), st(norm(np.sin(2 * np.pi * np.cumsum(rng.uniform(900, 1500) + 600 * np.sin(np.pi * tt / .09)) / SR) * np.sin(np.pi * tt / .09), .022), rng.uniform(-.8, .8)))
    elif k == 'ring': m_ = int(.8 * SR); put(fx, t, st(norm(np.sin(2 * np.pi * 2600 * np.arange(m_) / SR) * np.exp(-np.arange(m_) / SR * 5), .05), -.4))
    elif k == 'fire':
        m_ = int(e['d'] * SR); x = np.zeros(m_)
        for _ in range(int(e['d'] * 40)):
            i0 = rng.integers(0, m_ - 600); L = rng.integers(60, 500); x[i0:i0 + L] += noise(L) * np.exp(-np.arange(L) / (L / 4)) * rng.uniform(.3, 1)
        put(fx, t, st(norm(hp(x, 900) + bp(pink(m_), 120, 600) * .4, .25), 0))
    elif k == 'stone': m_ = int(.25 * SR); put(fx, t, st(norm(lp(noise(m_), 900) * np.exp(-np.arange(m_) / SR * 16), .05), 0))
    elif k == 'arrow': put(fx, t, sweep(.3, .12))
    elif k == 'bigarrow': put(fx, t, sweep(.5, .3))
    elif k == 'lamps':
        for i in range(24): m_ = int(.2 * SR); put(fx, t + i * e['d'] / 24, st(norm(bp(noise(m_), 2000, 7000) * np.exp(-np.arange(m_) / SR * 30), .03), rng.uniform(-.4, .4)))
    elif k == 'bells': put(fx, t, st(S.hit('nepal_bells', None, .5), .2), .6)
    elif k == 'bell2': put(fx, t, st(S.hit('nepal_bells', None, .45), -.2), .5)
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
