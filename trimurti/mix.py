# score (sampled instruments, on the 72 BPM grid) + procedural foley from events.json + narration -> out/mix.wav
# run from anywhere:  $LIB/.venv/bin/python mix.py   (LIB on PYTHONPATH via the env var below)
import json, os, re, sys
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); LIB = os.environ.get('LIB', '/root/lemo-opuscar')
sys.path.insert(0, LIB)
from core.audio import sampler as S
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve

SR = 48000
EVJ = json.load(open(f'{HERE}/events.json')); DUR = EVJ['dur']; EV = EVJ['ev']; N = int(DUR * SR) + SR
src = open(f'{HERE}/main.js').read()
VO = [(m[0], float(m[1])) for m in re.findall(r"\['(v\d\d)', ([\d.]+),", src)]
BEAT = 60 / 72; BAR = BEAT * 4; bar = lambda n: n * BAR
rng = np.random.default_rng(7); S.seed(3)

def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def noise(n): return rng.standard_normal(n)
def pink(n):
    w = np.fft.rfft(noise(n)); f = np.arange(len(w)); f[0] = 1
    return np.fft.irfft(w / np.sqrt(f), n) * 20
def norm(x, p=1.0): return x / (np.abs(x).max() + 1e-9) * p
def st(x, pan=0.0):
    return np.stack([x * np.cos((pan + 1) * np.pi / 4) * 1.414, x * np.sin((pan + 1) * np.pi / 4) * 1.414], 1)
def put(buf, t, x):
    if x.ndim == 1: x = st(x)
    i = int(t * SR); j = min(len(buf), i + len(x))
    if j > i: buf[i:j] += x[:j - i]
def rms(x): return np.sqrt(np.mean(x ** 2) + 1e-12)

# ================= score =================
ev = []
def n(t, inst, p, d, v, pan=0, **k): ev.append(dict(t=t, inst=inst, pitch=p, dur=d, vel=v, pan=pan, **k))
# drone: cello D2 + A2 under the water, the lotus and the preserver; out for silence 1
for (a, b, v) in [(0.4, 35.0, .32), (bar(11), 45.8, .4), (bar(15), DUR - .2, .26)]:
    n(a, 'cellos', 'D2', b - a, v, -.2, attack=2.0, release=.8); n(a + .5, 'cellos', 'A2', b - a - .5, v * .8, .2, attack=2.0, release=.8)
n(T := .6, 'glockenspiel', 'A6', 2, .45, .1)
n(bar(1), 'hand_chimes', 'D5', 3, .35, -.3)
# lotus: harp arpeggios, one chord per bar; bowed vibraphone pad
CH = {'D': ['D3', 'A3', 'D4', 'E4', 'F#4', 'E4', 'D4', 'A3'], 'Bm': ['B2', 'F#3', 'B3', 'C#4', 'D4', 'C#4', 'B3', 'F#3'],
      'G': ['G2', 'D3', 'G3', 'A3', 'B3', 'A3', 'G3', 'D3'], 'A': ['A2', 'E3', 'A3', 'B3', 'C#4', 'B3', 'A3', 'E3'], 'Em': ['E3', 'B3', 'E4', 'F#4', 'G4', 'F#4', 'E4', 'B3']}
PAD = {'D': ['F#4', 'A4'], 'Bm': ['D4', 'F#4'], 'G': ['D4', 'G4'], 'A': ['C#4', 'E4'], 'Em': ['E4', 'G4']}
def harp_bar(b, ch, v=.42, step=2, pan=-.25):
    for k in range(0, 8, step if step else 1): n(bar(b) + k * BEAT / 2, 'harp', CH[ch][k], BEAT * 1.6, v * (1.0 if k == 0 else .8), pan)
def pad_bar(b, ch, v=.22, bars=1):
    for p in PAD[ch]: n(bar(b), 'vibraphone_bowed', p, BAR * bars, v, .3, attack=.6, release=1.2)
for b, ch in [(2, 'D'), (3, 'Bm'), (4, 'G')]: harp_bar(b, ch, .4, 2 if b == 2 else 1); pad_bar(b, ch)
n(bar(4), 'hand_chimes', 'A5', 3, .4, .2)   # the bloom opens
# burst: harp in eighths, the flute enters
for b, ch in [(5, 'D'), (6, 'G')]: harp_bar(b, ch, .45, 1); pad_bar(b, ch, .2)
MEL = [(5, 0, 'A4', 1), (5, 1, 'D5', 1), (5, 2, 'F#5', 2), (6, 0, 'E5', 1), (6, 1, 'D5', 1), (6, 2, 'B4', 1), (6, 3, 'A4', 1.6)]
for b, k, p, d in MEL: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .5, .15, release=.5)
# Vishnu: slower harp, low flute, cellos line
for b, ch in [(7, 'Bm'), (8, 'G'), (9, 'D'), (10, 'A')]: harp_bar(b, ch, .32, 2, -.35); pad_bar(b, ch, .18)
for b, k, p, d in [(7, 0, 'F#4', 3), (8, 0, 'D4', 2), (8, 2, 'E4', 2), (9, 0, 'F#4', 2), (9, 2, 'A4', 2), (10, 0, 'E4', 3.5)]: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .38, .2, release=.6)
for b, p in [(7, 'B2'), (8, 'G2'), (9, 'D3'), (10, 'A2')]: n(bar(b), 'cellos', p, BAR, .28, 0, attack=.4, release=.6)
n(bar(8) + BEAT * 2, 'hand_chimes', 'F#5', 3, .3, .4); n(bar(9), 'hand_chimes', 'A5', 3, .35, .5)
# silence 1: 35.0-36.67. Shiva: tremolo strings rising, bells at the ring of fire
n(bar(11) + BAR, 'violas', 'A3', 45.6 - bar(12), .3, -.3, attack=4.5, release=.3)
n(bar(12) + BAR / 2, 'violins_trem', 'D4', 45.6 - bar(12.5), .3, .3, attack=4.0, release=.3)
n(bar(13), 'nepal_bells', None, None, .55, .1)
# silence 2: 45.8-46.67, then the gong (from events). Plate: the lotus figure again, softer; the flute holds
for b, ch in [(15, 'D'), (16, 'G'), (17, 'D')]: harp_bar(b, ch, .3, 2, -.2); pad_bar(b, ch, .16)
for b, k, p, d in [(15, 0, 'A4', 2), (15, 2, 'D5', 2), (16, 0, 'B4', 4), (17, 0, 'A4', 4.5)]: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .34, .2, release=.8)
mus = S.render(ev, dur=N / SR)
mus = S.room(mus, size=.55, mix=.22)
mus = mus[:N]
for a, b in [(34.6, 36.67), (45.5, 46.67)]:   # make the silences real
    i, j = int(a * SR), int(b * SR); e = np.ones(N); e[i:j] = np.linspace(1, 0, j - i) ** 2; e[j:] = 1
    k = int((b - .02) * SR); e[i:j] = np.minimum(e[i:j], 1); mus[i:j] *= e[i:j, None]
os.makedirs(f'{HERE}/out', exist_ok=True); sf.write(f'{HERE}/out/score.wav', mus, SR)

# ================= foley =================
fx = np.zeros((N, 2))
def brush(d, g, pan0=-.5, pan1=.5):
    m = int(d * SR); p = np.arange(m) / m
    x = bp(noise(m), 1500, 7000) * (.6 + .4 * np.abs(np.sin(np.arange(m) / SR * 2 * np.pi * 9))) + bp(pink(m), 300, 1500) * .5
    y = norm(x * np.sin(np.pi * p) ** .8, .5) * g; pan = pan0 + (pan1 - pan0) * p
    return np.stack([y * np.cos((pan + 1) * np.pi / 4) * 1.414, y * np.sin((pan + 1) * np.pi / 4) * 1.414], 1)
def plink(g, f0=1400):
    m = int(1.2 * SR); t = np.arange(m) / SR
    x = np.sin(2 * np.pi * np.cumsum(f0 * (1 + 1.2 * np.exp(-t * 60))) / SR) * np.exp(-t * 7) + lp(noise(m), 3000) * np.exp(-t * 80) * .3
    return norm(x, .6) * g
def bed(d, lo, hi, g, fade=1.5, mod=.15):
    m = int(d * SR); t = np.arange(m) / SR; x = bp(pink(m), lo, hi)
    e = np.minimum(1, np.minimum(t / fade, (d - t) / fade)) * (1 + mod * np.sin(2 * np.pi * t * .23))
    return np.stack([norm(x * e, 1) * g, norm(np.roll(x, 900) * e, 1) * g], 1)
def chirp(g):
    m = int(.12 * SR); t = np.arange(m) / SR; f = 3200 + 1600 * np.sin(np.pi * t / .12) + rng.uniform(-300, 300)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .12) ** 2 * g
def crackle(d, g):
    m = int(d * SR); x = np.zeros(m)
    for _ in range(int(d * 26)):
        i = rng.integers(0, m - 600); L = rng.integers(60, 500); x[i:i + L] += noise(L) * np.exp(-np.arange(L) / (L / 4)) * rng.uniform(.3, 1)
    x = hp(x, 900) + bp(pink(m), 120, 600) * .35
    t = np.arange(m) / SR; e = np.minimum(1, np.minimum(t / .8, (d - t) / .6))
    return st(norm(x * e, .5) * g, .05)
def sweep(d, g, up=True):
    m = int(d * SR); t = np.arange(m) / SR; x = pink(m); y = np.zeros(m); seg_ = 4096
    for i in range(0, m, seg_):
        f = 300 + 4000 * ((i / m) if up else 1 - i / m); y[i:i + seg_] = bp(x[i:i + seg_], f * .7, min(f * 1.6, 20000))
    return st(norm(y * np.sin(np.pi * t / d) ** 1.5, .5) * g)
for e in EV:
    t, k = e['t'], e['type']
    if k == 'brush': put(fx, t, brush(e['d'], e.get('g', .4) * .8, e.get('pan0', -.5), e.get('pan1', .5)))
    elif k == 'drop': put(fx, t, st(plink(e.get('g', 1) * .9), 0))
    elif k == 'water': put(fx, t, bed(e['d'], 150, 900, .05, 2.5))
    elif k == 'deep': put(fx, t, bed(e['d'], 40, 260, .09, 2.0, .35))
    elif k == 'wind': put(fx, t, bed(e['d'], 300, 2500, .045 * e.get('g', 1), 1.5, .4))
    elif k == 'birds':
        for i in range(26): put(fx, t + rng.uniform(.3, e['d']), st(chirp(rng.uniform(.04, .09)), rng.uniform(-.7, .7)))
    elif k == 'burst':
        for i in range(8): put(fx, t + i * .1, brush(.7, .35, rng.uniform(-.9, 0), rng.uniform(0, .9)))
    elif k == 'bloom': put(fx, t, st(S.note('glockenspiel', 'D6', 2, .35), .1) * .6)
    elif k == 'conch': put(fx, t - .2, st(S.note('horn', 'D3', 2.6, .45, attack=.5, release=.8), -.1) * .35)
    elif k == 'disc': put(fx, t, sweep(1.3, .35))
    elif k == 'drum': put(fx, t, st(S.hit('frame_drum', 'large' if e['g'] >= 1 else 'small', min(1, .55 + .4 * e['g'])), -.1) * .55)
    elif k == 'fire': put(fx, t, crackle(e['d'], .7))
    elif k == 'gong': put(fx, t, st(S.hit('gong', None, .7), 0) * .9)
    elif k == 'mist': put(fx, t, sweep(e['d'], .45 * e.get('g', 1), up=True))
    elif k == 'pencil':
        m = int(e['d'] * SR); x = bp(noise(m), 2500, 8000) * (.5 + .5 * (np.sin(np.arange(m) / SR * 2 * np.pi * 7) > 0)) * np.hanning(m)
        put(fx, t, st(norm(x, .12), .3))
put(fx, 0, bed(DUR, 200, 4000, .006, 1, 0))   # paper room tone, always there
IRn = int(1.4 * SR); IR = np.stack([noise(IRn), noise(IRn)], 1) * np.exp(-np.arange(IRn) / SR * 4)[:, None]
IR = np.stack([lp(IR[:, 0], 5000), lp(IR[:, 1], 5000)], 1); IR /= np.sqrt((IR ** 2).sum(0))
fx = fx * .82 + np.stack([fftconvolve(fx[:, c], IR[:, c])[:N] for c in range(2)], 1) * .18

# ================= voice =================
vo = np.zeros(N); speech = np.zeros(N, bool)
def limit1(x, ceil):
    look = int(.005 * SR); env = np.maximum.accumulate(np.abs(x))   # cheap peak follower with lookahead
    a = np.abs(x); g = np.ones_like(x)
    over = a > ceil; g[over] = ceil / a[over]
    from scipy.ndimage import minimum_filter1d, uniform_filter1d
    g = minimum_filter1d(g, look * 2 + 1); g = uniform_filter1d(g, look)
    return x * g
for vid, s in VO:
    x, sr = sf.read(f'{HERE}/voices/{vid}.wav', dtype='float64')
    if x.ndim > 1: x = x.mean(1)
    x = resample_poly(x, SR, sr); x = hp(x, 90)
    r = rms(x[np.abs(x) > .01]); x = limit1(x, r * 3.5)
    i = int(s * SR); vo[i:i + len(x)] += x[:N - i]; speech[i:i + len(x)] = True
# duck the music AND the foley ~5 dB under speech (0.3 s smoothed), then voice ~12 dB over that bed
from scipy.ndimage import uniform_filter1d
duck = 1 - .45 * uniform_filter1d(speech.astype(float), int(.3 * SR))
duck_fx = 1 - .72 * uniform_filter1d(speech.astype(float), int(.3 * SR))   # foley (brush hiss) masks consonants: duck it deeper
bed_ = mus * .9 * duck[:, None] + fx * duck_fx[:, None]
vo *= (rms(bed_.mean(1)[speech]) * 10 ** (12 / 20)) / rms(vo[speech])
mus_d = bed_
out = bed_ + st(vo, 0); sf.write(f'{HERE}/out/vo.wav', (vo / np.abs(vo).max() * .9).astype(np.float32), SR)
if os.environ.get('STEMS'): sf.write(f'{HERE}/out/s_mus.wav', (mus * .9 * duck[:, None] + st(vo, 0)).astype(np.float32), SR); sf.write(f'{HERE}/out/s_fx.wav', (fx * duck_fx[:, None] + st(vo, 0)).astype(np.float32), SR)
out = out[:int(DUR * SR)]
out = norm(out, .89)
sf.write(sys.argv[1] if len(sys.argv) > 1 else f'{HERE}/out/mix.wav', out.astype(np.float32), SR)
print('dur', DUR, 'voice/bed dB', round(20 * np.log10(rms(vo[speech]) / rms(mus_d.mean(1)[speech])), 1))
