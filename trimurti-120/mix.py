# score (sampled + plucked-string model, 80 BPM in E) + procedural foley from events.json + narration -> out/mix.wav
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
BEAT = .75; BAR = 3.0; bar = lambda n: n * BAR
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
def guitar(t, p, d, v, pan=-.25): put(mus, t, st(P.pluck('nylon_guitar', p, d + 1.5, vel=v), pan), .5)
# question: cello drone on E, a flute asks
n(.3, 'cellos', 'E2', 9.2, .3, -.2, attack=2.5, release=1.2)
FQ = [(.5, 0, 'B4', 2), (.5, 2, 'E5', 1), (.5, 3, 'F#5', 1), (1.5, 0, 'G#5', 3), (1.5, 3, 'F#5', 1), (2.5, 0, 'E5', 3)]
for b, k, p, d in FQ: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .45, .15, release=.6)
# Brahma: fingerpicked guitar (pluck model), bowed vibraphone pad, flute from the burst
ARP = {'E': ['E3', 'B3', 'E4', 'F#4', 'G#4', 'F#4', 'E4', 'B3'], 'C#m': ['C#3', 'G#3', 'C#4', 'E4', 'G#4', 'E4', 'C#4', 'G#3'],
       'A': ['A2', 'E3', 'A3', 'B3', 'C#4', 'B3', 'A3', 'E3'], 'B': ['B2', 'F#3', 'B3', 'C#4', 'D#4', 'C#4', 'B3', 'F#3'],
       'Em': ['E3', 'B3', 'E4', 'F#4', 'G4', 'F#4', 'E4', 'B3'], 'C': ['C3', 'G3', 'C4', 'D4', 'E4', 'D4', 'C4', 'G3']}
PAD = {'E': ['G#4', 'B4'], 'C#m': ['E4', 'G#4'], 'A': ['E4', 'A4'], 'B': ['D#4', 'F#4'], 'Em': ['G4', 'B4'], 'C': ['E4', 'G4']}
def arp_bar(b, ch, v=.5, step=1):
    for k in range(0, 8, step): guitar(bar(b) + k * BEAT / 2, ARP[ch][k], BEAT, v * (1 if k == 0 else .78))
def pad(b, ch, v=.2, bars=1):
    for p in PAD[ch]: n(bar(b), 'vibraphone_bowed', p, BAR * bars, v, .3, attack=.6, release=1.2)
PROG = ['E', 'C#m', 'A', 'B']
for i, b in enumerate(range(3, 12)): ch = PROG[i % 4]; arp_bar(b, ch, .5 if b >= 8 else .42, 1 if b >= 5 else 2); pad(b, ch)
n(bar(3) + .2, 'cellos', 'E2', bar(12) - bar(3), .22, -.2, attack=2, release=1)
MEL = [(8, 0, 'B4', 1), (8, 1, 'E5', 1), (8, 2, 'G#5', 2), (9, 0, 'F#5', 1), (9, 1, 'E5', 1), (9, 2, 'C#5', 2), (10, 0, 'E5', 1.5), (10, 1.5, 'F#5', .5), (10, 2, 'B5', 2), (11, 0, 'G#5', 3.5)]
for b, k, p, d in MEL: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .48, .15, release=.5)
# Vishnu: slow cellos, low flute, a sparse harp; a chime per avatar (rising)
VP = [('E', 'E2'), ('C#m', 'C#2'), ('A', 'A2'), ('B', 'B2')]
for i, b in enumerate(range(12, 23, 2)):
    ch, low = VP[i % 4]
    n(bar(b), 'cellos', low, BAR * 2, .32, -.2, attack=.8, release=.8); n(bar(b), 'cellos', ARP[ch][1], BAR * 2, .24, .2, attack=.8, release=.8)
    for k in range(0, 8, 2):   # the harp rests under the spoken list of avatars
        if not 52.5 < bar(b) + k * BEAT < 69: n(bar(b) + k * BEAT, 'harp', ARP[ch][[2, 4, 3, 1][k // 2]], BEAT * 2, .3, -.3)
        if not 52.5 < bar(b + 1) + k * BEAT < 69: n(bar(b + 1) + k * BEAT, 'harp', ARP[ch][[2, 5, 4, 1][k // 2]], BEAT * 2, .26, -.3)
for b, k, p, d in [(12.5, 0, 'G#4', 4), (13.5, 2, 'E4', 4), (15, 0, 'B4', 6), (17, 0, 'C#5', 3)]: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .36, .2, release=.7)
CHIME = ['E5', 'F#5', 'G#5', 'B5', 'C#6', 'E6', 'F#6', 'G#6', 'B6', 'C#7']
# Shiva: E minor; low strings, tremolo swelling under the drum; bells at the wheel
n(bar(23) + .5, 'cellos', 'E2', 97.6 - bar(23) - .5, .34, -.2, attack=2.5, release=.4); n(bar(23) + 1, 'cellos', 'B2', 97.6 - bar(23) - 1, .26, .2, attack=2.5, release=.4)
for i, b in enumerate(range(24, 32, 2)):
    ch = ['Em', 'C', 'Em', 'B'][i]
    for k in range(0, 8, 2): guitar(bar(b) + k * BEAT, ARP[ch][k], BEAT * 2, .36, .3)
n(bar(27), 'violas', 'B3', 97.6 - bar(27), .3, -.3, attack=5, release=.3)
n(bar(28.5), 'violins_trem', 'E4', 97.6 - bar(28.5), .32, .3, attack=5, release=.3)
n(bar(30) + .4, 'nepal_bells', None, None, .55, .1)
# the ending: the opening question answered by the flute; guitar; a bell under the title
for b, k, p, d in [(34.5, 0, 'B4', 2), (34.5, 2, 'E5', 1), (34.5, 3, 'F#5', 1), (35.5, 0, 'G#5', 3), (35.5, 3, 'B5', 1), (36.5, 0, 'G#5', 2), (36.5, 2, 'F#5', 2), (37.5, 0, 'E5', 8)]: n(bar(b) + k * BEAT, 'flute', p, d * BEAT, .42, .15, release=1.2)
for i, b in enumerate(range(34, 40)): arp_bar(b, ['E', 'A', 'C#m', 'B', 'E', 'E'][i], .38, 2); pad(b, ['E', 'A', 'C#m', 'B', 'E', 'E'][i], .16)
n(bar(34), 'cellos', 'E2', DUR - bar(34) - .2, .24, -.2, attack=2, release=1)
n(bar(38), 'tubular_bells', 'E4', 5, .5, 0)
for e in EV:
    # (no chime per avatar: it masked the spoken names)
    if e['type'] == 'veda': n(e['t'], 'glockenspiel', ['G#6', 'B6', 'C#7', 'E7'][e['i']], 1.5, .4, [0, .6, 0, -.6][e['i']])
mus += S.render(ev, dur=N / SR)[:N]
mus = S.room(mus, size=.55, mix=.22)[:N]
for a, b in [(97.3, 98.2), (101.6, 102.4)]:   # the two silences
    i, j = int(a * SR), int(b * SR); mus[i:j] *= (np.linspace(1, 0, j - i) ** 2)[:, None]
i = int(98.2 * SR); j = int(102.4 * SR); mus[i:j] = 0
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
    elif k == 'pencil': put(fx, t, pencil(e['d'], .12 * e.get('g', 1)))
    elif k == 'page': put(fx, t, st(page(), .3))
    elif k == 'water': put(fx, t, bed(e['d'], 150, 900, .04, 2.5))
    elif k == 'deep': put(fx, t, bed(e['d'], 40, 260, .08, 2.0, .35))
    elif k == 'wind': put(fx, t, bed(e['d'], 300, 2500, .04, 1.5, .4))
    elif k == 'river': put(fx, t, bed(e['d'], 400, 3500, .05, 2.0, .1))
    elif k == 'birds':
        for i in range(18): put(fx, t + rng.uniform(.3, e['d']), st(chirp(rng.uniform(.04, .08)), rng.uniform(-.7, .7)))
    elif k == 'burst':
        for i in range(8): put(fx, t + i * .1, brush(.7, .3, rng.uniform(-.9, 0), rng.uniform(0, .9)))
    elif k == 'bloom': put(fx, t, st(S.note('glockenspiel', 'E6', 2, .35), .1), .6)
    elif k == 'wings':
        for i in range(3): put(fx, t + .3 + i * .28, st(norm(bp(noise(int(.2 * SR)), 300, 2000) * np.hanning(int(.2 * SR)), .12), -.5))
    elif k == 'conch': put(fx, t, st(S.note('horn', 'E3', 2.4, .45, attack=.5, release=.8), -.1), .3)
    elif k == 'disc': put(fx, t, sweep(1.3, .3))
    elif k == 'drum': put(fx, t, st(S.hit('frame_drum', 'large' if e['g'] >= 1 else 'small', min(1, .55 + .4 * e['g'])), -.1), .5)
    elif k == 'fire': put(fx, t, crackle(e['d'], .45))
    elif k == 'burn': put(fx, t, crackle(e['d'], .9, 70) + st(norm(lp(pink(int(e['d'] * SR)), 500) * np.hanning(int(e['d'] * SR)), .5), 0))
    elif k == 'mist': put(fx, t, sweep(e['d'], .35))
    elif k == 'slide': put(fx, t, st(page()[:int(1.2 * SR)], rng.uniform(-.4, .4)), .7)
    elif k == 'tap': put(fx, t, st(norm(lp(noise(int(.08 * SR)), 900) * np.exp(-np.arange(int(.08 * SR)) / SR * 60), .3), 0))
    elif k == 'bell': pass   # the tubular bell is in the score
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
lst = np.ones(N); i0, i1 = int((bar(17.75) - .3) * SR), int(69.0 * SR); lst[i0:i1] = .6; lst = uniform_filter1d(lst, int(.5 * SR))   # the avatar list: music 4 dB lower
bed_ = mus * .9 * lst[:, None] * (1 - .45 * sp)[:, None] + fx * (1 - .72 * sp)[:, None]   # music ~5 dB, foley ~11 dB under speech
vo *= rms(bed_.mean(1)[speech]) * 10 ** (12 / 20) / rms(vo[speech])
out = (bed_ + st(vo, 0))[:int(DUR * SR)]
if os.environ.get('STEMS'):
    for nm, b in [('mus', mus * .9 * lst[:, None] * (1 - .45 * sp)[:, None]), ('fx', fx * (1 - .72 * sp)[:, None]), ('vo', 0 * mus)]: sf.write(f'{HERE}/out/s_{nm}.wav', norm(b + st(vo, 0), .89).astype(np.float32), SR)
sf.write(sys.argv[1] if len(sys.argv) > 1 else f'{HERE}/out/mix.wav', norm(out, .89).astype(np.float32), SR)
print('dur', DUR, 'voice/bed dB', round(20 * np.log10(rms(vo[speech]) / rms(bed_.mean(1)[speech])), 1))
