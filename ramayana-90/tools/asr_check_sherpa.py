# speech check with Whisper base.en (sherpa-onnx): transcribe each voices/<id>.wav, compare word for word
import sys, json, re, sherpa_onnx, soundfile as sf, numpy as np
M = sys.argv[1]; lines = json.load(open(sys.argv[2])); vd = sys.argv[3]
r = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=f'{M}/base.en-encoder.onnx', decoder=f'{M}/base.en-decoder.onnx', tokens=f'{M}/base.en-tokens.txt', language='en', task='transcribe')
norm = lambda s: re.sub(r"[^a-z0-9' ]", ' ', s.lower()).split()
bad = 0
for l in lines:
    x, sr = sf.read(f"{vd}/{l['id']}.wav", dtype='float32')
    if x.ndim > 1: x = x.mean(1)
    s = r.create_stream(); s.accept_waveform(sr, x); r.decode_stream(s); got = s.result.text.strip()
    ok = norm(got) == norm(l.get('asr', l['text'])); bad += not ok
    print('✓' if ok else '✗', l['id'], got)
sys.exit(1 if bad else 0)
