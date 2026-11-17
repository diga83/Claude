"""Narration: Kokoro TTS (soft female blend) -> per-line wavs + build/lines.json (durations & word timings)."""
import json, re, sys, os, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

M = os.environ.get('KOKORO_DIR', '/tmp/claude-0/models')
SPEED = float(os.environ.get('SPEED', '0.82'))
k = Kokoro(f'{M}/kokoro-v1.0.onnx', f'{M}/voices-v1.0.bin')
voice = 0.7 * k.get_voice_style('af_heart') + 0.3 * k.get_voice_style('af_nicole')

# Sanskrit names: default phonemes -> corrected IPA
NAMES = {
 'Narayanaya':'nɑːɹˈɑːjənˌɑːjə','Narayana':'nɑːɹˈɑːjənə','Vaikuntha':'vaɪkˈʊntə','Lakshmi':'lˈʌkʃmi','Shesha':'ʃˈeɪʃə','Garuda':'ɡˈʌɹʊdə',
 'Sudarshana':'sʊdˈʌɹʃənə','shankha':'ʃˈʌŋkə','chakra':'tʃˈʌkɹə','dharma':'dˈʌɹmə','Dashavatara':'dˌʌʃɑːvətˈɑːɹə','Matsya':'mˈʌtsjə',
 'Kurma':'kˈʊɹmə','Varaha':'vəɹˈɑːhə','Narasimha':'nˌʌɹəsˈɪmhə','Prahlada':'pɹəhlˈɑːdə','Vamana':'vˈɑːmənə','Parashurama':'pˌʌɹəʃʊɹˈɑːmə',
 'Rama':'ɹˈɑːmə','Ayodhya':'əjˈoʊdjɑː','Bhagavad':'bˈʌɡəvəd','Gita':'ɡˈiːtɑː','Kalki':'kˈʌlki','Gajendra':'ɡədʒˈeɪndɹə','Tirupati':'tˈɪɹʊpəti',
 'Badrinath':'bˈʌdɹinɑːt','Puri':'pˈʊɹi','Jagannath':'dʒˌʌɡənˈɑːt','tulsi':'tˈʊlsi','Ekadashi':'eɪkˈɑːdəʃi','Namo':'nˈʌmoʊ','Hari':'hˈʌɹi',
 'Balarama':'bˌʌləɹˈɑːmə','Vaishnavas':'vˈaɪʃnəvəz','Janmashtami':'dʒənmˈɑːʃtəmi','Navami':'nˈʌvəmi','Sita':'sˈiːtɑː','Ravana':'ɹˈɑːvənə','Ramayana':'ɹɑːmˈɑːjənə','Arjuna':'ˈʌɹdʒʊnə','Manu':'mˈʌnʊ','Dhruva':'dɹˈuːvə','Vedas':'vˈeɪdəz','Govinda':'ɡoʊvˈɪndə','Shiva':'ʃˈɪvə','Om':'ˈoʊm','Himalayas':'hɪmˈɑːləjəz',
}
ph = lambda t: k.tokenizer.phonemize(t, 'en-us')

def phonemes(text):
    # phonemize piecewise so names can be swapped reliably
    parts = re.split(r"(\b(?:%s)\b)" % '|'.join(NAMES), text)
    out = ''
    for p in parts:
        if p in NAMES: out += NAMES[p]
        elif p.strip():
            lead = ' ' if p[0] == ' ' else ''
            trail = ' ' if p[-1] == ' ' else ''
            q = ph(p.strip())
            if p.strip().startswith("'s"): q = 'z' + q[1:] if q[:1] in 'sz' else q
            out += lead + q + trail
        else: out += p
    return out

def trim(x, sr, thr=0.01):
    a = np.abs(x); idx = np.where(a > thr)[0]
    if not len(idx): return x
    s = max(0, idx[0] - int(0.03 * sr)); e = min(len(x), idx[-1] + int(0.12 * sr))
    return x[s:e]

script = json.load(open('script.json'))
os.makedirs('audio/lines', exist_ok=True)
out = []
for shot in script['shots']:
    for i, line in enumerate(shot['lines']):
        clean = line.replace('|', ' ').replace('*', '')
        clean = re.sub(r'\s+', ' ', clean).strip()
        say = clean.replace('—', ', ').replace('…', '... ')
        p = phonemes(say)
        x, sr = k.create(p, voice=voice, speed=SPEED, is_phonemes=True)
        x = trim(x.astype(np.float32), sr)
        fn = f"audio/lines/{shot['id']}_{i}.wav"
        sf.write(fn, x, sr)
        dur = len(x) / sr
        # word timings: energy-aware proportional split
        chunks = [c.strip() for c in line.split('|')]
        words = []
        for ci, c in enumerate(chunks):
            for w in c.split():
                em = '*' in w or False
                words.append({'w': w.replace('*', ''), 'c': ci, 'em': w.startswith('*') or w.endswith('*') or w.endswith('*,')})
        # handle multiword emphasis (*Om Namah Shivaya.*)
        inside = False
        j = 0
        for c in chunks:
            for w in c.split():
                if w.startswith('*'): inside = True
                words[j]['em'] = inside
                if w.rstrip(',').endswith('*'): inside = False
                j += 1
        wt = []
        for w in words:
            base = len(re.sub(r'[^A-Za-z]', '', w['w'])) + 1.5
            if re.search(r'[,;:]$', w['w']): base += 3.5
            if re.search(r'[.?!]$', w['w']): base += 1
            if w['w'] in ('—', '…') or w['w'].endswith('…') or w['w'].endswith('—'): base += 5
            wt.append(base)
        tot = sum(wt); t = 0.03
        for w, b in zip(words, wt):
            w['t'] = round(t, 3); t += b / tot * (dur - 0.15)
        out.append({'shot': shot['id'], 'i': i, 'file': fn, 'dur': round(dur, 3), 'text': clean, 'chunks': chunks, 'words': words})
        print(f"{dur:5.2f}s {clean}", flush=True)
json.dump(out, open('build/lines.json', 'w'), indent=0, ensure_ascii=False)
tot = sum(o['dur'] for o in out)
print('TOTAL speech', round(tot, 1), 'lines', len(out), 'words', sum(len(o['words']) for o in out))
