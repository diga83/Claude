"""Inside Out soundtrack: narration + soft procedural sound effects + a quiet music bed, all made here with numpy.
No samples, no AI audio, no downloads.

  python3 tools/mix.py [project=.]          → data/mix.wav (48 kHz stereo)

Reads data/cues.json (node tools/capture.mjs cues), data/narration.wav if it exists (voice.py or words.py --audio),
and script.json "music": "bed" (the procedural score, default) · "none" · "audio/your-track.mp3" (your own royalty-free
track, any format ffmpeg reads). The music ducks under the voice.

Sound rules (STYLE.md): every effect is soft and rounded, nothing above ~5 kHz, no ticks / hats / glitches / beeps.
Cue types: whoosh slide pop plop gulp boing bubbles sizzle sparkle thud slam tock zip alarm  (+ gain, dur)
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
from scipy import signal
from scipy.io import wavfile

P = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
SR = 48000
rng = np.random.default_rng(11)
cj = json.loads((P / 'data/cues.json').read_text())
script = json.loads((P / 'script.json').read_text())
DUR = float(cj['duration'])
N = int(DUR * SR) + SR // 10


def lp(x, f, o=2): b, a = signal.butter(o, min(f, SR / 2 - 100) / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, o=2): b, a = signal.butter(o, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bp(x, f0, f1, o=2): b, a = signal.butter(o, [f0 / (SR / 2), f1 / (SR / 2)], 'band'); return signal.lfilter(b, a, x)
def db(x): return 10 ** (x / 20)
def tt(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=None):
    """attack a seconds then exponential release over the rest"""
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    rest = n - na; e[na:] = np.exp(-np.linspace(0, r or 5, rest)) if rest > 0 else 1; return e
def sweep(f0, f1, d, shape='exp'):
    t = tt(d); f = f0 * (f1 / f0) ** (t / d) if shape == 'exp' else f0 + (f1 - f0) * t / d
    return np.sin(2 * np.pi * np.cumsum(f) / SR)
def noise(d): return rng.standard_normal(int(d * SR))


# ---------- the effects ----------
def whoosh(d=0.38, **_):
    n = noise(d); lo, hi = lp(n, 500), lp(n, 2200)
    k = np.sin(np.pi * np.linspace(0, 1, len(n))); x = (lo * (1 - k) + hi * k) * k ** 1.5
    return x / (np.abs(x).max() + 1e-9) * 0.5
def slide(d=1.0, **_):
    n = lp(noise(d), 700); e = np.sin(np.pi * np.linspace(0, 1, len(n))) ** 2
    return n / (np.abs(n).max() + 1e-9) * e * 0.35 + sweep(260, 120, d) * e * 0.08
def pop(**_): x = sweep(560, 240, 0.11) * env(int(0.11 * SR), 0.002, 6); return lp(x, 3000) * 0.7
def plop(**_): x = sweep(700, 180, 0.14) * env(int(0.14 * SR), 0.002, 5); return lp(x, 2500) * 0.6
def gulp(**_):
    a = sweep(320, 140, 0.16) * env(int(0.16 * SR), 0.01, 4); b = sweep(240, 90, 0.2) * env(int(0.2 * SR), 0.01, 4)
    x = np.concatenate([a, np.zeros(int(0.04 * SR)), b]); return lp(x, 1800) * 0.8
def boing(**_):
    d = 0.42; t = tt(d); f = 200 * (1 + 0.6 * t / d) * (1 + 0.08 * np.sin(2 * np.pi * 18 * t))
    return lp(np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.004, 4), 2000) * 0.55
def bubbles(d=2.0, **_):
    x = np.zeros(int(d * SR))
    for _ in range(int(d * 7)):
        st = rng.integers(0, max(1, len(x) - int(0.08 * SR))); f = rng.uniform(380, 900); b = sweep(f, f * 1.6, 0.06) * env(int(0.06 * SR), 0.003, 5)
        x[st:st + len(b)] += b * rng.uniform(0.2, 0.5)
    return lp(x, 2500) * 0.5
def sizzle(d=1.0, **_):
    n = bp(noise(d), 1800, 4500); crack = (rng.random(len(n)) < 0.002).astype(float); crack = lp(crack, 300) * 40
    e = np.minimum(1, np.linspace(0, 6, len(n))) * np.linspace(1, 0.2, len(n)); return n * (0.4 + crack) * e * 0.12
def sparkle(d=1.2, **_):
    notes = [784, 880, 1047, 1175, 1319, 1568]; x = np.zeros(int(d * SR) + SR // 2)
    for k, f in enumerate(notes):
        st = int(k * d / len(notes) * SR); n = int(0.4 * SR); t = tt(0.4)
        x[st:st + n] += (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * env(n, 0.004, 6) * 0.22
    return lp(x, 4500)
def thud(**_):
    d = 0.35; t = tt(d); x = np.sin(2 * np.pi * (70 + 40 * np.exp(-t * 30)) * t) * env(len(t), 0.002, 7)
    return x * 0.9 + lp(noise(d), 220) * env(len(t), 0.001, 12) * 0.3
def slam(**_):
    d = 0.5; t = tt(d); x = np.sin(2 * np.pi * (60 + 60 * np.exp(-t * 25)) * t) * env(len(t), 0.002, 6)
    return np.tanh(1.6 * (x + lp(noise(d), 1200) * env(len(t), 0.001, 10) * 0.6)) * 0.9
def tock(**_): d = 0.09; t = tt(d); return (np.sin(2 * np.pi * 420 * t) + 0.3 * np.sin(2 * np.pi * 840 * t)) * env(len(t), 0.001, 9) * 0.35
def zip_(**_):
    d = 0.32; n = bp(noise(d), 400, 3000); k = np.linspace(0, 1, len(n))
    return (n / (np.abs(n).max() + 1e-9) * 0.35 + sweep(300, 1100, d) * 0.12) * np.sin(np.pi * k) ** 1.2
def alarm(d=2.0, **_):
    x = np.zeros(int(d * SR)); one = np.sin(2 * np.pi * 150 * tt(0.22)) * env(int(0.22 * SR), 0.02, 5)
    for st in np.arange(0, d - 0.25, 0.5): i = int(st * SR); x[i:i + len(one)] += one
    return lp(x, 900) * 0.55

def inhale(d=1.0, **_):
    n = bp(noise(d), 300, 2600); k = np.linspace(0, 1, len(n)); e = np.sin(np.pi * np.minimum(1, k * 1.15)) ** 1.5 * (0.6 + 0.4 * k)
    return n / (np.abs(n).max() + 1e-9) * e * 0.5
def heartbeat(**_):
    one = lambda d, f: np.sin(2 * np.pi * f * tt(d)) * env(int(d * SR), 0.004, 7)
    x = np.concatenate([one(0.16, 58), np.zeros(int(0.09 * SR)), one(0.2, 52) * 0.75]); return lp(x, 300) * 1.0

FX = dict(inhale=inhale, heartbeat=heartbeat, whoosh=whoosh, slide=slide, pop=pop, plop=plop, gulp=gulp, boing=boing, bubbles=bubbles, sizzle=sizzle,
          sparkle=sparkle, thud=thud, slam=slam, tock=tock, zip=zip_, alarm=alarm)
LEVEL = dict(inhale=-15, heartbeat=-8, whoosh=-17, slide=-19, pop=-14, plop=-15, gulp=-11, boing=-15, bubbles=-21, sizzle=-18, sparkle=-17,
             thud=-11, slam=-9, tock=-18, zip=-14, alarm=-17)


# ---------- the music bed: soft pad + plucked arpeggio, 100 BPM, I–vi–IV–V ----------
def music_bed():
    bpm = 100; beat = 60 / bpm; bar = beat * 4
    chords = [[261.6, 329.6, 392.0], [220.0, 261.6, 329.6], [174.6, 220.0, 261.6], [196.0, 246.9, 293.7]]
    x = np.zeros(N)
    nb = int(np.ceil(DUR / bar)) + 1
    for b in range(nb):
        ch = chords[b % 4]; st = int(b * bar * SR); n = int(bar * SR)
        if st >= N: break
        t = tt(bar); e = np.minimum(1, t / 0.4) * np.minimum(1, (bar - t) / 0.4)
        pad = sum(np.sin(2 * np.pi * f / 2 * t) + 0.25 * np.sin(2 * np.pi * f * t) for f in ch) * e * 0.10
        x[st:st + n] += pad[:max(0, min(n, N - st))]
        for k in range(8):                                                       # eighth-note pluck arpeggio
            f = ch[[0, 1, 2, 1, 2, 0, 1, 2][k]] * (2 if k % 4 == 2 else 1); ps = st + int(k * beat / 2 * SR); pn = int(0.5 * SR)
            if ps + pn >= N: continue
            pt = tt(0.5); pl = (np.sin(2 * np.pi * f * pt) + 0.35 * np.sin(4 * np.pi * f * pt)) * env(pn, 0.003, 7) * 0.12
            x[ps:ps + pn] += pl
    x = lp(x, 3200)
    fade = np.ones(N); fo = int(1.2 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade

def music_tension():
    """low drone + slow minor pulse, for mysterious / tense explainers (script.json "music": "tension")"""
    t = np.arange(N) / SR; x = np.zeros(N)
    for f, g in [(55, 0.5), (82.4, 0.3), (110, 0.2), (130.8, 0.12)]: x += np.sin(2 * np.pi * f * t + np.sin(t * 0.3) * 0.5) * g
    x *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 8) ** 2
    beat = 60 / 84; ping = lambda f: (np.sin(2 * np.pi * f * tt(1.2)) + 0.3 * np.sin(4 * np.pi * f * tt(1.2))) * env(int(1.2 * SR), 0.01, 5)
    seq = [220.0, 261.6, 196.0, 174.6]
    for k in range(int(DUR / (beat * 2))):
        i = int(k * beat * 2 * SR); pg = ping(seq[(k // 2) % 4]) * 0.35
        if i + len(pg) < N: x[i:i + len(pg)] += pg
    x = lp(x, 2200); fade = np.ones(N); fo = int(1.5 * SR); fade[-fo:] = np.linspace(1, 0, fo); fi = int(0.8 * SR); fade[:fi] *= np.linspace(0, 1, fi)
    return x / (np.abs(x).max() + 1e-9) * fade
# ---------- Luminous Myth effects ----------
def conch(**_):
    """shankha: a long warm horn swell with a slow rise"""
    d = 2.6; t = tt(d); f = 233 * (1 + 0.035 * np.minimum(1, t / 0.5)) * (1 + 0.004 * np.sin(2 * np.pi * 5 * t))
    ph = 2 * np.pi * np.cumsum(f) / SR; x = np.sin(ph) + 0.5 * np.sin(2 * ph) + 0.28 * np.sin(3 * ph) + 0.12 * np.sin(4 * ph)
    e = np.minimum(1, t / 0.35) * np.minimum(1, (d - t) / 1.2) ** 1.5
    return lp(x * e + bp(noise(d), 300, 1500) * e * 0.08, 2600) * 0.6
def bell(**_):
    d = 3.0; t = tt(d); x = sum(g * np.sin(2 * np.pi * f * t) * np.exp(-t * k) for f, g, k in [(587, 1, 1.6), (1174, 0.5, 2.4), (1761, 0.25, 3.5), (2349, 0.12, 5), (880, 0.2, 2.0)])
    return x * np.minimum(1, t / 0.004) * 0.5
def chime(note=0, **_):
    sc = [587.3, 659.3, 740.0, 880.0, 987.8, 1174.7, 1318.5]; f = sc[int(note) % 7]; d = 1.2; t = tt(d)
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 4) * np.minimum(1, t / 0.004) * 0.5
def shimmer(d=2.0, **_):
    x = np.zeros(int(d * SR) + SR)
    for k in range(int(d * 9)):
        f = rng.choice([1174.7, 1318.5, 1480, 1760, 1975.5, 2349.3]); st = int(k / 9 * SR + rng.uniform(0, 0.05) * SR); n = int(0.5 * SR); t = tt(0.5)
        x[st:st + n] += np.sin(2 * np.pi * f * t) * np.exp(-t * 7) * rng.uniform(0.15, 0.3) * (0.3 + 0.7 * k / (d * 9))
    return x
def rumble(d=2.0, **_):
    n = lp(noise(d), 90, 4); k = np.linspace(0, 1, len(n)); return n / (np.abs(n).max() + 1e-9) * np.sin(np.pi * k) ** 0.8 * 0.9 + np.sin(2 * np.pi * 42 * tt(d)) * np.sin(np.pi * k) * 0.4
def thunder(**_):
    d = 3.2; t = tt(d); n = noise(d); crack = lp(n, 1800) * np.exp(-t * 9) * 1.2
    roll = lp(n, 160, 3) * (np.exp(-t * 1.1) * (0.6 + 0.4 * np.sin(2 * np.pi * 1.7 * t) ** 2)) * 5
    return np.tanh(crack + roll) * 0.9
def rain(d=10.0, **_):
    n = bp(noise(d), 900, 4200); t = tt(d); e = np.minimum(1, t / 1.5) * np.minimum(1, (d - t) / 3.0)
    return n / (np.abs(n).max() + 1e-9) * e * (0.8 + 0.2 * np.sin(2 * np.pi * 0.2 * t)) * 0.5
def waves(d=3.0, **_):
    n = noise(d); t = tt(d); k = t / d; sw = 0.5 - 0.5 * np.cos(2 * np.pi * np.minimum(1, k * 1.0))
    x = lp(n, 500) * 1.0 + bp(n, 600, 2600) * 0.5 * sw
    return x / (np.abs(x).max() + 1e-9) * sw ** 1.2 * 0.7
def growl(**_):
    d = 1.8; t = tt(d); f = 62 * (1 - 0.25 * t / d); ph = 2 * np.pi * np.cumsum(f * (1 + 0.03 * np.sin(2 * np.pi * 23 * t))) / SR
    x = np.tanh(3 * (np.sin(ph) + 0.6 * np.sin(2 * ph) + 0.4 * np.sin(3 * ph))) * (0.6 + 0.4 * np.sin(2 * np.pi * 27 * t))
    return lp(x, 700) * np.sin(np.pi * t / d) ** 0.7 * 0.8
def hiss(d=1.4, **_):
    n = bp(noise(d), 2500, 4800); k = np.linspace(0, 1, len(n)); return n / (np.abs(n).max() + 1e-9) * np.sin(np.pi * k) ** 1.5 * 0.4

FX.update(conch=conch, bell=bell, chime=chime, shimmer=shimmer, rumble=rumble, thunder=thunder, rain=rain, waves=waves, growl=growl, hiss=hiss)
LEVEL.update(conch=-15, bell=-17, chime=-18, shimmer=-20, rumble=-13, thunder=-10, rain=-27, waves=-19, growl=-12, hiss=-20)


def music_myth():
    """tanpura-style drone in D, a slow bansuri-like melody (raga Bhupali: D E F# A B), harp plucks; a dark minor
    drone for the demon, a frame-drum pulse for the storm, and a brighter octave for the new dawn."""
    Ls = json.loads((P / 'data/lines.json').read_text())['lines']; S = lambda i: Ls[i]['start']
    demon, storm, dive, dawn = (S(15), S(17)), (S(17), S(24)), (S(24), S(26)), S(26)
    t = np.arange(N) / SR; x = np.zeros(N)
    win = lambda a, b, r=1.0: np.clip((t - a) / r, 0, 1) * np.clip((b - t) / r, 0, 1)
    dark = np.maximum(win(*demon), win(dive[0], dive[1] - 1.2)); stm = win(*storm, 1.5); calm = 1 - np.maximum(dark, stm)
    # drone: D2 A2 D3 with slow beating + tanpura buzz
    dr = sum(g * np.sin(2 * np.pi * f * t + 0.6 * np.sin(2 * np.pi * 0.11 * t + i)) for i, (f, g) in enumerate([(73.4, 0.5), (110, 0.32), (146.8, 0.42), (220, 0.14), (293.7, 0.10)]))
    buzz = sum(np.sin(2 * np.pi * 146.8 * h * t) / h for h in range(3, 9)) * 0.05 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.5 * t) ** 2)
    x += (dr + buzz) * 0.5 * (1 - 0.3 * dark)
    x += (np.sin(2 * np.pi * 77.8 * t) * 0.5 + np.sin(2 * np.pi * 174.6 * t) * 0.25) * dark * 0.7                    # Eb + F: unease
    beat = 60 / 66
    def tone(f, d, vib=5.2, g=1.0):
        tn = tt(d); ph = 2 * np.pi * np.cumsum(f * (1 + 0.006 * np.sin(2 * np.pi * vib * tn) * np.minimum(1, tn / 0.4))) / SR
        e = np.minimum(1, tn / 0.12) * np.minimum(1, (d - tn) / 0.3)
        return (np.sin(ph) + 0.22 * np.sin(2 * ph) + 0.06 * np.sin(3 * ph) + bp(noise(d), 1500, 4000)[:len(tn)] * 0.015) * e * g
    def put(sig, at, gain_env=None):
        i = int(at * SR); n = min(len(sig), N - i)
        if n > 0 and i >= 0: x[i:i + n] += sig[:n] * (gain_env[i:i + n] if gain_env is not None else 1)
    maj = [293.7, 329.6, 370.0, 440.0, 493.9, 587.3, 659.3, 740.0]
    phrases = [[(0, 2), (2, 1), (3, 1), (4, 3)], [(4, 1), (3, 1), (2, 2), (1, 1), (0, 3)], [(3, 2), (4, 1), (5, 3), (4, 2)], [(5, 1), (4, 1), (3, 1), (2, 1), (3, 2), (0, 3)],
               [(2, 1), (3, 1), (5, 2), (6, 1), (5, 3)], [(7, 2), (6, 1), (5, 1), (4, 2), (3, 3)]]
    at, k = 1.5, 0
    while at < DUR - 3:
        for deg, ln in phrases[k % len(phrases)]:
            d = ln * beat; put(tone(maj[deg] * (2 if at > dawn + 4 and k % 2 else 1), d * 1.05) * 0.34, at, calm); at += d
        at += beat * 2; k += 1
    # harp plucks on the drone tones every beat
    for b in range(int(DUR / beat)):
        f = [146.8, 220, 293.7, 220, 370, 293.7, 440, 220][b % 8]; tn = tt(1.4)
        put((np.sin(2 * np.pi * f * tn) + 0.4 * np.sin(4 * np.pi * f * tn) + 0.15 * np.sin(6 * np.pi * f * tn)) * np.exp(-tn * 3.2) * np.minimum(1, tn / 0.004) * 0.2, b * beat, 0.35 + 0.65 * calm)
    # frame drum for the storm: dum . ta dum . dum ta .
    pat = [1, 0, 0.5, 1, 0, 1, 0.5, 0]; st = beat / 4
    for b in range(int(DUR / st)):
        g = pat[b % 8]
        if not g: continue
        tn = tt(0.4); f0 = 62 if g == 1 else 120
        put((np.sin(2 * np.pi * (f0 + 50 * np.exp(-tn * 30)) * tn) * np.exp(-tn * (9 if g == 1 else 16)) + lp(noise(0.4), 500) * np.exp(-tn * 30) * 0.3) * 0.7 * g, b * st, np.maximum(stm, dark * 0.6))
    x = lp(x, 4200)
    fade = np.ones(N); fo = int(2.0 * SR); fade[-fo:] = np.linspace(1, 0, fo); fi = int(0.6 * SR); fade[:fi] *= np.linspace(0, 1, fi)
    return x / (np.abs(x).max() + 1e-9) * fade


def load_audio(f):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(f), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(out, dtype=np.float32).reshape(-1, 2).astype(np.float64); return a


mix = np.zeros((N, 2))
# voice
vf = P / 'data/narration.wav'
voice = None
if vf.exists():
    v = load_audio(vf)[:N]; voice = np.zeros((N, 2)); voice[:len(v)] = v
    rms = np.sqrt(np.mean(voice ** 2) + 1e-12); voice *= db(-19) / rms
    mix += voice
# music
mus = script.get('music', 'bed')
if mus and mus != 'none':
    m = music_bed() if mus == 'bed' else music_tension() if mus == 'tension' else music_myth() if mus == 'myth' else None
    if m is None:
        a = load_audio(P / mus)[:N]; m = np.zeros(N); m[:len(a)] = a.mean(1); m /= np.abs(m).max() + 1e-9
    m = np.stack([m, m], 1) * db(-23 if voice is not None else -20)
    if voice is not None:                                                        # duck under the voice
        lev = np.abs(voice.mean(1)); lev = signal.lfilter([1 - 0.9995], [1, -0.9995], lev); lev /= lev.max() + 1e-9
        m *= (1 - 0.55 * np.clip(lev * 3, 0, 1))[:, None]
    mix += m
# effects
for c in cj['cues']:
    fn = FX.get(c['type'])
    if not fn: print('unknown cue type, skipped:', c['type']); continue
    x = fn(**{k: v for k, v in (('d', c.get('dur')), ('note', c.get('note'))) if v is not None})
    x = lp(x, 5000) * db(LEVEL[c['type']]) * c.get('gain', 1.0) / (np.abs(x).max() + 1e-9) * 0.9
    i = int(c['t'] * SR); n = min(len(x), N - i)
    if n > 0 and i >= 0: pan = c.get('pan', 0.0); mix[i:i + n, 0] += x[:n] * (1 - max(0, pan)); mix[i:i + n, 1] += x[:n] * (1 + min(0, pan))
# master: gentle soft-clip, peak -1 dBFS
mix = np.tanh(mix * 1.2) / 1.2
mix *= db(-1) / (np.abs(mix).max() + 1e-9)
wavfile.write(P / 'data/mix.wav', SR, (mix * 32767).astype(np.int16))
print(f"data/mix.wav: {DUR:.2f} s · voice: {'yes' if voice is not None else 'NO (captions-only)'} · music: {mus} · {len(cj['cues'])} cues")
