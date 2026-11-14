"""Music + sound effects + Sasha's voice -> out/mix.wav. Everything is synthesized here with numpy (no samples)."""
import json, os
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly
SR = 44100; T = json.load(open('audio/timing.json')); DUR = T['dur']; N = int(DUR * SR)
rng = np.random.default_rng(7)
L = T['lines']; SCN = {s['id']: s for s in T['scenes']}
def Wd(i, w):
    l = L[i]; k = l['cap'].find(w); return l['a'] + (l['b'] - l['a']) * (0 if k < 0 else k / len(l['cap'])) * .97
def add(buf, t, sig, gain=1.0, pan=0.0):
    a = int(t * SR)
    if a >= N or a < 0: return
    sig = sig[:N - a]; buf[a:a + len(sig), 0] += sig * gain * (1 - max(0, pan)); buf[a:a + len(sig), 1] += sig * gain * (1 + min(0, pan))
def tt(d): return np.arange(int(d * SR)) / SR
def env(t, a=.004, d=5): return np.minimum(1, t / a) * np.exp(-t * d)
def filt(x, lo=None, hi=None, order=2):
    if lo and hi: sos = butter(order, [lo, hi], 'bandpass', fs=SR, output='sos')
    elif lo: sos = butter(order, lo, 'highpass', fs=SR, output='sos')
    else: sos = butter(order, hi, 'lowpass', fs=SR, output='sos')
    return sosfilt(sos, x)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def kal(m, d=.9):  t = tt(d); f = hz(m); return (np.sin(2*np.pi*f*t) + .45*np.sin(2*np.pi*2*f*t)*np.exp(-t*9) + .2*np.sin(2*np.pi*4*f*t)*np.exp(-t*16)) * env(t, .003, 5.5)
def bell(m, d=1.4): t = tt(d); f = hz(m); return (np.sin(2*np.pi*f*t) + .35*np.sin(2*np.pi*2.76*f*t)*np.exp(-t*5) + .2*np.sin(2*np.pi*5.4*f*t)*np.exp(-t*9)) * env(t, .002, 3.6)
def bass(m, d=.55): t = tt(d); f = hz(m); return (np.sin(2*np.pi*f*t) + .3*np.sin(2*np.pi*2*f*t)) * env(t, .008, 4.5)
def pad(ms, d):
    t = tt(d); x = sum(np.sin(2*np.pi*hz(m)*(1+dt)*t + ph) for m in ms for dt, ph in ((0, 0), (.004, 1), (-.003, 2)))
    return x / (3*len(ms)) * np.minimum(1, t/.6) * np.minimum(1, (d - t)/.8)
def kick(): t = tt(.3); f = 45 + 80*np.exp(-t*30); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*14)
def tom(f0=150, d=.28): t = tt(d); f = f0*(.7 + .3*np.exp(-t*20)); return (np.sin(2*np.pi*np.cumsum(f)/SR) + .25*rng.standard_normal(len(t))*np.exp(-t*90)) * np.exp(-t*11)
def shaker(d=.07): t = tt(d); return filt(rng.standard_normal(len(t)), lo=5000) * np.exp(-t*55)
def clap(): t = tt(.12); return filt(rng.standard_normal(len(t)), 900, 3500) * np.exp(-t*38)
def sweep(d=.8, up=True):
    t = tt(d); n = rng.standard_normal(len(t)); out = np.zeros(len(t)); parts = 12; seg = len(t)//parts
    for i in range(parts):
        k = (i + .5)/parts; fc = 300*(12**(k if up else 1-k)); a, b = max(0, i*seg - seg//2), min(len(t), (i+1)*seg + seg//2)
        w = np.hanning(b - a); out[a:b] += filt(n[a:b], fc*.7, fc*1.4) * w
    return out * np.sin(np.pi*t/d)**1.5
def popfx(f0=520): t = tt(.11); f = f0*(1 + 1.2*t/.11); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*30)
def chime(root=84, n=7):
    out = np.zeros(int(1.9*SR))
    for i, st in enumerate([0, 4, 7, 12, 16, 19, 24][:n]): s = bell(root + st, 1.2); a = int(i*.065*SR); out[a:a+len(s)] += s*(.9 - i*.06)
    return out
def boing(): t = tt(.45); f = 220*(1 + .9*np.sin(np.pi*t/.45)) + 30*np.sin(2*np.pi*14*t); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*5) * np.minimum(1, t/.01)
def splash(): t = tt(.6); return filt(rng.standard_normal(len(t)), lo=2500) * np.exp(-t*7) * np.minimum(1, t/.03)
def noisebed(d, lo, hi, rate=.25, depth=.7):
    t = tt(d); n = filt(rng.standard_normal(len(t)), lo, hi); sw = 1 - depth*(.5 + .5*np.sin(2*np.pi*rate*t + rng.uniform(0, 6)))
    return n * sw * np.minimum(1, t/1.0) * np.minimum(1, (d - t)/1.0)

# ---------------- music ----------------
mus = np.zeros((N, 2)); BPM = 104; beat = 60/BPM; bar = beat*4
MAJ = [[48, 64, 67, 72], [43, 62, 67, 71], [45, 64, 69, 72], [41, 60, 65, 69]]          # C  G  Am  F  (bass, chord tones)
MIN = [[45, 64, 69, 72], [41, 60, 65, 69], [48, 64, 67, 72], [43, 62, 67, 71]]          # Am F  C   G
MEL = [[76, None, 79, 76, 72, None, 74, 76], [74, None, 71, 74, 79, None, 74, None], [72, None, 76, 81, 79, None, 76, 72], [72, 74, 76, 72, 69, None, 67, None]]
def scene_at(t): return next((s['id'] for s in T['scenes'] if s['a'] <= t < s['b']), 'outro')
nb = int(DUR / bar) + 1
for b in range(nb):
    t0 = b * bar; sc = scene_at(t0 + .1); ch = (MIN if sc == 'perahera' else MAJ)[b % 4]
    under = sc == 'wild' and t0 > L[11]['a'] - .6
    full = sc in ('intro', 'tea', 'food', 'outro') or (sc == 'wild' and not under)
    if t0 > DUR - 3.2: break
    add(mus, t0, pad([ch[1], ch[2], ch[3]], bar + .4), .16 if sc in ('sigiriya', 'beach') or under else .09)
    for k in (0, 2): add(mus, t0 + k*beat, bass(ch[0] - 12 if ch[0] > 44 else ch[0], .6), .34)
    if sc == 'perahera':                                                               # festival drums
        pat = [1, 0, .5, .5, 1, 0, .6, 0, 1, .5, 0, .5, 1, 0, .7, .7]
        for i, v in enumerate(pat):
            if v: add(mus, t0 + i*beat/4, tom(110 if i % 4 == 0 else 165 + 25*(i % 3)), .5*v, pan=(-.3 if i % 2 else .3))
        for i in range(8): add(mus, t0 + i*beat/2, shaker(.05), .1)
        for i, n_ in enumerate([ch[3], ch[2], ch[3] + 2, ch[3]]): add(mus, t0 + i*beat, kal(n_ + 12, .5), .13)
        continue
    arp = [1, 2, 3, 2, 1, 2, 3, 2] if not sc == 'beach' else [1, None, 2, None, 3, None, 2, None]
    for i, a in enumerate(arp):
        if a is None: continue
        add(mus, t0 + i*beat/2 + (0.012 if i % 2 else 0), kal(ch[a], .8), .2 if i % 2 == 0 else .14, pan=.25 if i % 2 else -.25)
    if full:
        for k in (0, 2): add(mus, t0 + k*beat, kick(), .42)
        for k in (1, 3): add(mus, t0 + k*beat, clap(), .12)
        for i in range(8): add(mus, t0 + i*beat/2, shaker(), .11 if i % 2 else .07)
    if sc in ('intro', 'tea', 'food', 'outro', 'map', 'beach') or (sc == 'wild' and not under):
        for i, m in enumerate(MEL[b % 4]):
            if m is not None and not (sc in ('map', 'beach') and i % 2): add(mus, t0 + i*beat/2, bell(m, 1.0), .15, pan=.1)
    if sc == 'sigiriya':
        for i, m in enumerate([ch[3] + 12, ch[2] + 12, ch[1] + 12, ch[2] + 12]): add(mus, t0 + i*beat, bell(m, 1.6), .13)
# underwater: muffle the music
a, b_ = int((L[11]['a'] - .5)*SR), int(SCN['beach']['a']*SR); mus[a:b_] = np.stack([filt(mus[a:b_, c], hi=900) for c in (0, 1)], 1) * 1.4
add(mus, DUR - 3.3, pad([60, 64, 67, 72], 3.2), .3)
for i, m in enumerate([72, 76, 79, 84, 88]): add(mus, DUR - 3.2 + i*.11, bell(m, 2.6), .22)

# ---------------- sound effects ----------------
fx = np.zeros((N, 2))
for s in T['scenes'][1:]: add(fx, s['a'] - .42, sweep(.85), .42)
pops = [Wd(0, 'Sasha'), Wd(0, 'this'), Wd(0, 'Candy') - .15, 15.9, 16.3, 16.7, 17.1, 17.6, Wd(3, 'twenty') - .2, Wd(3, 'Ayubowan') - .15, L[4]['a'] + .1,
        Wd(5, 'Sigiriya') - .1, Wd(6, 'Fifteen'), Wd(6, 'king') - .1, Wd(6, 'almost') + .5, L[8]['a'] + .1, Wd(8, 'fill') - .5,
        Wd(9, 'Gentle') - .1, Wd(9, 'dancing') + .5, Wd(11, 'biggest') - .2, Wd(11, 'biggest') + .9, Wd(12, 'fishermen') - .1, Wd(12, 'baby') + .2,
        Wd(13, 'Perahera') + .45, Wd(15, 'rice') + .1, Wd(15, 'crispy') + .1, Wd(15, 'sweet') + .1, Wd(16, 'cinnamon') + .2, Wd(18, 'Bohoma') - .2]
for i, p in enumerate(pops): add(fx, p, popfx(480 + 60*(i % 4)), .3, pan=.2*((i % 3) - 1))
for tm, root in [(1.0, 84), (Wd(1, 'Sri Lanka') - .1, 86), (14.0, 84), (Wd(6, 'palace') - .2, 88), (Wd(13, 'Perahera') - .15, 81), (Wd(16, 'cinnamon') - .3, 86), (Wd(17, 'heart') - .5, 84), (Wd(19, 'Bye') + 1.0, 84)]:
    add(fx, tm, chime(root), .22)
# aeroplane hum
d = SCN['intro']['b'] - L[1]['a'] - .3; t = tt(d); hum = filt(np.sign(np.sin(2*np.pi*88*t + 2*np.sin(2*np.pi*5*t))) * (.8 + .2*np.sin(2*np.pi*22*t)), hi=420) * np.minimum(1, t/1.2) * np.minimum(1, (d - t)/1.2)
add(fx, L[1]['a'] + .3, hum, .1)
# sea at the start, the beach and under water
add(fx, 0, noisebed(7.5, 300, 2400, .22), .09); s = SCN['beach']; add(fx, s['a'], noisebed(s['b'] - s['a'], 300, 2600, .2), .17)
a = L[11]['a'] - .5; add(fx, a, noisebed(SCN['beach']['a'] - a, 60, 500, .3, .4), .3)
for i in range(22): add(fx, a + .3 + rng.uniform(0, 5.5), popfx(900 + rng.uniform(0, 900)) * .5, .1, pan=rng.uniform(-.6, .6))
# train: chug + toot
s = SCN['tea']; t = tt(s['b'] - s['a'] - .6); chug = filt(rng.standard_normal(len(t)), 150, 1400) * (np.maximum(0, np.sin(2*np.pi*3.4*t))**6 + .5*np.maximum(0, np.sin(2*np.pi*3.4*t + 1.4))**6) * np.minimum(1, t/1) * np.minimum(1, (t[-1] - t)/1.5)
add(fx, s['a'] + .3, chug, .22)
for k, dd in ((0, .28), (.38, .7)): t = tt(dd); add(fx, s['a'] + 1.0 + k, (np.sin(2*np.pi*587*t) + np.sin(2*np.pi*740*t)) * np.minimum(1, t/.03) * np.minimum(1, (dd - t)/.08), .07)
add(fx, Wd(9, 'Gentle') + .5, splash(), .16); add(fx, Wd(9, 'Gentle') + 1.2, splash(), .1)
add(fx, Wd(10, 'leopards') - .3, boing(), .22)
# Candy's meow (a pitched-up "meow" from the local voice model)
from kokoro_onnx import Kokoro
k = Kokoro(os.path.expanduser('~/.kokoro/kokoro-v1.0.onnx'), os.path.expanduser('~/.kokoro/voices-v1.0.bin'))
m, _ = k.create('Meow!', voice='af_bella', speed=.75, lang='en-us'); m = np.asarray(m, dtype=np.float64); i = np.where(np.abs(m) > .01)[0]; m = m[i[0]:i[-1]]
m = resample_poly(m, 147, 80 * 2)[:]                 # 24k -> 44.1k, then played ~1.5x faster = higher pitch
m = np.interp(np.arange(0, len(m), .75), np.arange(len(m)), m) / np.abs(m).max()
add(fx, Wd(19, 'Bye') + 1.35, m, .5, pan=-.3)

# ---------------- voice + mix ----------------
v, vsr = sf.read('audio/voice.wav'); v = resample_poly(v, 147, 80)[:N]; v = np.pad(v, (0, N - len(v)))
e = np.abs(v); w = int(.25*SR); e = np.convolve(e, np.ones(w)/w, 'same'); duck = 1 - .5*np.clip(e/.04, 0, 1); w2 = int(.2*SR); duck = np.convolve(duck, np.ones(w2)/w2, 'same')
mus *= .62; fx *= .9
out = np.stack([v, v], 1) * 1.0 + mus * duck[:, None] + fx * (.6 + .4*duck[:, None])
fade = np.minimum(1, (DUR - np.arange(N)/SR)/.6); out *= fade[:, None]
out = np.tanh(out * 1.15) / np.tanh(1.15) * .93
sf.write('out/mix.wav', out, SR)
for n_, x in (('voice', v), ('music', mus), ('fx', fx)): print(n_, 'rms dB', round(20*np.log10(np.sqrt(np.mean(x**2)) + 1e-9), 1), 'peak', round(float(np.abs(x).max()), 2))
