# The Patient Tortoise: original score (shamisen, shakuhachi, koto, taiko, hyoshigi, a small bell) + paper foley + narration -> out/mix.wav
# Instrument recipes (hyoshigi, taiko, shime, shamisen, shakuhachi) are adapted from the Lemo-Opuscar Ukiyo-e demo's music/score.py.
# run: $LIB/.venv/bin/python mix.py
import json, os, sys
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); LIB = os.environ.get('LIB', '/root/lemo-opuscar'); sys.path.insert(0, LIB)
from core.audio import sampler as S, pluck as P
from core.audio.sfx import SR, add
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import uniform_filter1d, minimum_filter1d
EVJ = json.load(open(f'{HERE}/events.json')); DUR = EVJ['dur']; EV = EVJ['ev']; N = int(DUR * SR) + SR
rng = np.random.default_rng(1703); S.seed(17)
def bpf(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lpf(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hpf(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def st(x, pan=0.0): return np.stack([x * np.cos((pan + 1) * np.pi / 4) * 1.414, x * np.sin((pan + 1) * np.pi / 4) * 1.414], 1)
def norm(x, p=1.0): return x / (np.abs(x).max() + 1e-9) * p
def rms(x): return np.sqrt(np.mean(x ** 2) + 1e-12)
mus = np.zeros((N, 2)); fx = np.zeros((N, 2))
def put(buf, x, t, g=1.0, pan=0.0):
    if x.ndim == 1: x = st(x, pan)
    i = int(t * SR); j = min(len(buf), i + len(x))
    if j > i: buf[i:j] += x[:j - i] * g
# ——————————————— hyoshigi (two hardwood sticks struck together) ———————————————
def hyoshigi(v=1.0):
    L = int(.5 * SR); t = np.arange(L) / SR
    y = np.zeros(L)
    for f, a, tau in [(1180, 1., .05), (2460, .7, .035), (3870, .45, .022), (5300, .25, .012), (760, .35, .07)]:
        y += a * np.sin(2 * np.pi * f * t + rng.random() * 6) * np.exp(-t / tau)
    cl = rng.standard_normal(L) * np.exp(-t / .0018); y += 1.6 * bpf(cl, 1500, 9000)
    y /= np.abs(y).max()
    s1 = S.hit('claves', None, .9); s2 = S.hit('woodblock', 'a', .9)
    out = np.zeros(L); out[:min(L, len(s1))] += s1[:L] / (np.abs(s1).max() + 1e-9) * .8; out[:min(L, len(s2))] += s2[:L] / (np.abs(s2).max() + 1e-9) * .45
    out += y * .9
    # the two pieces hit almost together: a second transient 3 ms later
    d = int(.003 * SR); out[d:] += .35 * out[:-d]
    return (out / np.abs(out).max() * .85 * v).astype(np.float32)

# ——————————————— taiko ———————————————
def odaiko(v=1.0, big=False):
    L = int(2.4 * SR); t = np.arange(L) / SR
    f = 58 + 62 * np.exp(-t / .045)                       # pitch drops after the head is struck
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t / (.55 if big else .42)) + .35 * np.sin(1.59 * ph + 1) * np.exp(-t / .22) + .18 * np.sin(2.14 * ph) * np.exp(-t / .12)
    don = bpf(rng.standard_normal(L), 90, 900) * np.exp(-t / .02) * .8   # the "don" of the struck head
    stick = bpf(rng.standard_normal(L), 1200, 5000) * np.exp(-t / .004) * .25  # stick
    syn = body + don + stick
    syn /= np.abs(syn).max()
    out = syn * .85
    for inst, var, g in [('gran_cassa', 'hit', .55), ('toms', 'low_mallet', .35), ('frame_drum', 'large', .3)]:
        s = S.hit(inst, var, min(1, .55 + .45 * v)); s = s[:L] / (np.abs(s).max() + 1e-9)
        out[:len(s)] += s * g
    out = lpf(out, 3500)
    return (out / np.abs(out).max() * v).astype(np.float32)
def cut(x, d):
    n = int(d * SR)
    if n >= len(x): return x
    x = x[:n].copy(); k = min(n, int(.08 * SR)); x[-k:] *= np.linspace(1, 0, k); return x
def shime(v=.6):
    L = int(.6 * SR); t = np.arange(L) / SR
    f = 390 + 140 * np.exp(-t / .01); ph = 2 * np.pi * np.cumsum(f) / SR
    y = np.sin(ph) * np.exp(-t / .07) + .5 * bpf(rng.standard_normal(L), 800, 4000) * np.exp(-t / .006)
    s = S.hit('frame_drum', 'small_muted', .7); s = s[:L] / (np.abs(s).max() + 1e-9)
    y = y / np.abs(y).max() * .7; y[:len(s)] += s * .5
    return (y / np.abs(y).max() * v).astype(np.float32)

# ——————————————— shamisen ———————————————
def sam(p, v=.7, dur=None, **kw):
    kw.setdefault('buzz', .7)
    return P.pluck('shamisen', p, dur, v, **kw)

# ——————————————— shakuhachi (recorder+flute samples → vibrato removed, slides, breath noise) ———————————————
def _f0track(y, f):
    hop, Nw = 480, 2048; out = []
    for s in range(0, max(1, len(y) - Nw), hop):
        fr = y[s:s + Nw] * np.hanning(Nw); sp = np.abs(np.fft.rfft(fr, 8 * Nw)); fq = np.fft.rfftfreq(8 * Nw, 1 / SR)
        m = (fq > f * .85) & (fq < f * 1.18); out.append(fq[m][np.argmax(sp[m])] if sp[m].max() > 1e-6 else f)
    return np.array(out), hop
def shaku(p, dur, v=.7, slide=-1.5, fall=0.0, kari=0.0, swell=.5, breath=1.0, rel=.35):
    """p: actual pitch; slide: attack slides in from this many semitones below (0 = no slide); fall: meri drop in semitones at the phrase end (negative); kari: upward lift at the phrase end (positive)
    swell: amount of crescendo in the middle of the note; breath: proportion of breath noise"""
    m = S.midi(p); f = 440 * 2 ** ((m - 69) / 12)
    ext = dur + rel + .8
    a = S.note('recorder', max(m, S.midi('F4') - 3), ext, .7, release=.2)
    b = S.note('flute', max(m, S.midi('C4')), ext, .6, release=.2)
    n = min(len(a), len(b)); y = .62 * a[:n] / (np.abs(a).max() + 1e-9) + .38 * b[:n] / (np.abs(b).max() + 1e-9)
    y = y.astype(np.float64)
    # 1) remove amplitude tremolo: divide by the smoothed envelope
    w = int(.06 * SR); e = np.sqrt(np.convolve(y ** 2, np.ones(w) / w, 'same')) + 1e-4
    e = np.convolve(e, np.ones(w) / w, 'same'); y = y / e
    y[:int(.03 * SR)] *= np.linspace(0, 1, int(.03 * SR))
    # 2) remove pitch vibrato + apply slides: variable-rate resampling
    tr, hop = _f0track(y, f); dev = 12 * np.log2(tr / np.median(tr[3:]))  # semitones
    dev = np.clip(dev, -.6, .6)
    tt = np.arange(n) / SR; devs = np.interp(tt, np.arange(len(dev)) * hop / SR + 1024 / SR, dev)
    L = int((dur + rel) * SR); to = np.arange(L) / SR
    bend = np.zeros(L)
    if slide: sl = .16; bend += np.where(to < sl, slide * (1 - np.sin(np.clip(to / sl, 0, 1) * np.pi / 2)), 0)
    if fall: k = np.clip((to - (dur - .45)) / .5, 0, 1); bend += fall * k * k
    if kari: k = np.clip((to - (dur - .3)) / .3, 0, 1); bend += kari * np.sin(k * np.pi / 2)
    dv = np.interp(to + .05, tt, devs)
    phase = .05 * SR + np.concatenate([[0], np.cumsum(2 ** ((bend[:-1] - dv[:-1]) / 12))])
    phase = np.minimum(phase, n - 2)
    z = np.interp(phase, np.arange(n), y)
    # 3) our own envelope: breath first, tone after; swells in the middle then falls back (shakuhachi-style breathing)
    at = .12; envl = np.clip(to / at, 0, 1) ** 1.6
    mid = 1 + swell * np.sin(np.clip(to / max(dur, .1), 0, 1) * np.pi) ** 1.5 * .8
    relk = np.clip((to - dur) / rel, 0, 1); envl = envl * mid * (1 - relk) ** 2
    z = z * envl
    # a bit darker, a bit hollower
    z = lpf(z, 3200) * .8 + bpf(z, 900, 1600) * .5
    # 4) breath noise: 1–4 kHz band-passed noise, stronger at the attack (muraiki, the forced breathy attack)
    nz = bpf(rng.standard_normal(L), 1000, 4000, 3)
    be = .22 * envl + .9 * np.exp(-np.clip(to, 0, None) / .07) * np.clip(to / .012, 0, 1)
    z = z / (np.abs(z).max() + 1e-9) + breath * .5 * nz / (np.abs(nz).max() + 1e-9) * be
    z[-min(len(z), 480):] *= np.linspace(1, 0, min(len(z), 480))
    return (z / (np.abs(z).max() + 1e-9) * v).astype(np.float32)


def koto(p, v=.6, dur=None, **kw): return P.pluck('koto', p, dur, v, **kw)
def gliss(t, notes, step=.07, v=.5, pan=.2):
    for k, p in enumerate(notes): put(mus, koto(p, v * (.7 + .3 * k / len(notes))), t + k * step, .55, pan)
IN = ['D3', 'Eb3', 'G3', 'A3', 'Bb3', 'D4', 'Eb4', 'G4', 'A4', 'Bb4', 'D5', 'Eb5', 'G5']   # miyako-bushi on D
E = {}
for e in EV: E.setdefault(e['type'], []).append(e)
T = dict(print=[.3, 15.8, 37.9, 49.4, 70.4, 85.4], imp=[54.0, 57.6, 61.2, 64.8])

# ---- I: the title, the ocean ----
for g in range(4): put(mus, hyoshigi(.8 + .07 * g), T['print'][0] + g * .42, .9, (-.25, .2, -.1, .15)[g])
put(mus, P.strum('shamisen', ['D3', 'A3', 'D4'], None, .8, spread=.018, buzz=.8, t60=2.2), 1.2, .9, -.15)
put(mus, shaku('A4', 1.6, .6, slide=-2, swell=.6), 3.0, .8, .1); put(mus, shaku('G4', 1.0, .5, fall=-1.0), 4.9, .7, .1)
put(mus, shaku('D4', 4.0, .38, slide=-1, swell=.6, breath=.8, rel=.6), 7.4, .7, .1)
put(mus, shaku('Eb4', 1.2, .45, slide=-1), 13.2, .7, .1); put(mus, shaku('D4', 1.4, .45, fall=-1), 14.5, .7, .1)
gliss(15.2, IN[:9], .06, .45)
# ---- II: the churning: a shamisen ostinato over taiko; clappers accelerate as the mountain sinks ----
beat = 60 / 96
for b in range(int((32.6 - 17.0) / beat)):
    t = 17.0 + b * beat
    put(mus, sam(['D3', 'D3', 'A3', 'D3', 'Bb3', 'A3', 'G3', 'A3'][b % 8], .55 if b % 2 else .7, .5), t, .6, -.25)
    if b % 4 == 0: put(mus, odaiko(.55), t, .55, 0)
    if b % 4 == 2: put(mus, shime(.4), t, .4, .2)
for b, (p, d) in enumerate([('A4', 1.6), ('Bb4', .8), ('A4', 1.4), ('G4', 2.0)]): put(mus, shaku(p, d, .42, slide=-1.5 if b == 0 else 0, fall=-1 if b == 3 else 0), 27.0 + sum(x[1] for x in [('A4', 1.6), ('Bb4', .8), ('A4', 1.4), ('G4', 2.0)][:b]) + .2 * b, .55, .1)
t, gap = 30.0, .6
while t < 35.3: put(mus, hyoshigi(.75 + .2 * (t - 30) / 5), t, .8, (-.2, .2)[int(t * 10) % 2]); t += gap; gap = max(.07, gap * .82)
put(mus, odaiko(1.0, big=True), 32.8, .9, 0); put(mus, odaiko(.9, big=True), 35.4, .9, 0)
# ma (37.0-38.6): nothing at all
# ---- III: Kurma: one sawari note left ringing; a slow heartbeat; the breath of the shakuhachi ----
put(mus, sam('D3', .8, None, buzz=1.0, t60=4.0), 38.7, .9, 0)
for k in range(6): put(mus, odaiko(.35), 41.0 + k * 1.3, .35, 0)
put(mus, shaku('G4', 2.4, .4, slide=-2, swell=.7), 44.8, .55, .1); put(mus, shaku('A4', 1.0, .4), 47.4, .5, .1)
# ---- IV: treasures: a koto glissando lands just before each one is named ----
put(mus, P.strum('koto', ['D4', 'A4', 'D5'], None, .5, spread=.05), 49.6, .5, .2)
for t0 in T['imp']: gliss(t0 - .62, IN[3 + T['imp'].index(t0):3 + T['imp'].index(t0) + 7], .07, .42)
for k in range(10): put(mus, sam(['D3', 'A3'][k % 2], .35, .5), 52.0 + k * 1.6, .35, -.3)
put(mus, shaku('D5', 2.0, .38, slide=-1), 66.4, .5, .1); put(mus, shaku('A4', 1.4, .36, fall=-1), 68.4, .5, .1)
gliss(69.2, IN[2:11], .06, .4)
# ---- V: Lakshmi: a small bell, koto, a long breath line ----
put(mus, S.hit('nepal_bells', None, .5), 70.6, .5, .2)
for k in range(10): put(mus, koto(['D4', 'G4', 'A4', 'D5', 'A4'][k % 5], .35), 71.0 + k * 1.3, .4, .25)
put(mus, shaku('G4', 2.2, .34, slide=-1.5), 81.0, .55, .1); put(mus, shaku('A4', 1.4, .34, kari=.5), 83.4, .5, .1)
put(mus, S.hit('nepal_bells', None, .55), 80.9, .55, .3)
gliss(84.2, IN[1:10], .06, .4)
# ---- VI: amrita: taiko builds as the pot rises ----
for k in range(8): put(mus, odaiko(.3 + .08 * k), 86.2 + k * .62, .45, 0)
gliss(91.5, IN[4:13], .05, .45)
put(mus, P.strum('shamisen', ['D3', 'A3', 'D4'], None, .7, spread=.02, buzz=.8, t60=2.4), 91.5, .7, -.15)
# ---- the whole scroll; the way home to the tortoise; the wash; the seal ----
for b, (p, d) in enumerate([('A4', 2.0), ('Bb4', 1.0), ('A4', 1.4), ('G4', 2.4), ('D4', 3.0)]): put(mus, shaku(p, d, .45, slide=-1.5 if b in (0, 3) else 0, fall=-1.2 if b == 4 else 0), 95.4 + [0, 2.3, 3.6, 5.3, 8.0][b], .6, .1)
for k in range(12): put(mus, sam(['D3', 'A3', 'D4', 'A3'][k % 4], .4, .6), 96.0 + k * 1.2, .35, -.25)
put(mus, shaku('D4', 3.6, .3, slide=-1, swell=.5, breath=.9, rel=.8), 109.0, .45, .1)
put(mus, odaiko(.8, big=True), 115.6, .8, 0); put(mus, sam('D3', .8, None, buzz=1.0, t60=4.2), 115.7, .8, 0)
mus = S.room(mus.astype(np.float32), size=.5, mix=.2)[:N]

# ================= paper foley =================
def bed(d, lo, hi, g, fade=1.5, mod=.15):
    m = int(d * SR); tt = np.arange(m) / SR; x = bpf(rng.standard_normal(m), lo, hi)
    e = np.minimum(1, np.minimum(tt / fade, (d - tt) / fade)) * (1 + mod * np.sin(2 * np.pi * tt * .23))
    return np.stack([norm(x * e, 1) * g, norm(np.roll(x, 900) * e, 1) * g], 1)
def baren(d=.45):   # the rubbing pad: band-passed noise with a slow circular modulation
    m = int(d * SR); tt = np.arange(m) / SR
    x = bpf(rng.standard_normal(m), 400, 3200) * (.55 + .45 * np.sin(2 * np.pi * tt * 6)) * np.sin(np.pi * tt / d) ** 1.2
    return norm(x, .16)
def slide(d):
    m = int(d * SR); tt = np.arange(m) / SR; x = bpf(rng.standard_normal(m), 600, 4500) * np.sin(np.pi * np.clip(tt / d, 0, 1)) ** 1.5
    return norm(x, .12)
def seal(big=False):
    m = int(.5 * SR); tt = np.arange(m) / SR
    th = np.sin(2 * np.pi * np.cumsum(110 * (1 + .6 * np.exp(-tt * 40))) / SR) * np.exp(-tt * 18)
    peel = bpf(rng.standard_normal(m), 1500, 6000) * np.exp(-np.maximum(0, tt - .12) * 60) * (tt > .12) * .3
    return norm(th + peel, .4 if big else .25)
for e in EV:
    t, k = e['t'], e['type']
    if k == 'baren': put(fx, baren(), t, 1, (-.3, .2, -.1, .3)[e['g']])
    elif k == 'slip': put(fx, slide(.3), t, .8, .2)
    elif k == 'seal': put(fx, seal(e.get('big')), t + .05, 1, 0)
    elif k == 'slide': put(fx, slide(e['d']), t, 1, -.3 if not e.get('down') else 0)
    elif k == 'wash': put(fx, slide(e['d']), t, 1.2, 0)
    elif k == 'garland': m = int(e['d'] * SR); put(fx, norm(bpf(rng.standard_normal(m), 2000, 7000) * np.hanning(m), .05), t, 1, .4)
for t0, d, lo, hi, g in [(0, 15, 100, 900, .035), (15.8, 21, 120, 1200, .05), (38.6, 10, 40, 300, .07), (49.4, 20, 100, 900, .035), (70.4, 14, 100, 900, .03), (85.4, 10, 100, 900, .035)]: put(fx, bed(d, lo, hi, g, 1.5), t0)
for e in [x for x in EV if x['type'] == 'slide' and 30 < x['t'] < 40]: put(fx, bed(5.0, 80, 900, .04, 1.0), 31.0)   # churned water as it sinks
put(fx, bed(DUR, 200, 4000, .005, 1, 0), 0)

# ================= voice =================
vo = np.zeros(N); speech = np.zeros(N, bool)
def limit1(x, ceil):
    a = np.abs(x); g = np.ones_like(x); over = a > ceil; g[over] = ceil / a[over]; look = int(.005 * SR)
    return x * uniform_filter1d(minimum_filter1d(g, look * 2 + 1), look)
for e in EV:
    if e['type'] != 'voice': continue
    x, sr = sf.read(f"{HERE}/voices/{e['id']}.wav", dtype='float64')
    if x.ndim > 1: x = x.mean(1)
    x = hpf(resample_poly(x, SR, sr), 90); x = limit1(x, rms(x[np.abs(x) > .01]) * 3.5)
    i = int(e['t'] * SR); vo[i:i + len(x)] += x[:N - i]; speech[i:i + len(x)] = True
sp = uniform_filter1d(speech.astype(float), int(.3 * SR))
bed_ = mus * (1 - .6 * sp)[:, None] + fx * (1 - .45 * sp)[:, None]   # music ~8 dB, ambience ~5 dB under the voice
i0, i1 = int(37.0 * SR), int(38.6 * SR); bed_[i0:i1] = 0; k = int(.08 * SR); bed_[i0 - k:i0] *= np.linspace(1, 0, k)[:, None]   # ma: true silence
vo *= rms(bed_.mean(1)[speech]) * 10 ** (12 / 20) / rms(vo[speech])
out = (bed_ + st(vo, 0))[:int(DUR * SR)]
os.makedirs(f'{HERE}/out', exist_ok=True)
sf.write(sys.argv[1] if len(sys.argv) > 1 else f'{HERE}/out/mix.wav', norm(out, .89).astype(np.float32), SR)
print('dur', DUR, 'voice/bed dB', round(20 * np.log10(rms(vo[speech]) / rms(bed_.mean(1)[speech])), 1))
