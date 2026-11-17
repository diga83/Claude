# Introduction to Vishnu in 10 Minutes

A fully code-generated 2D animated explainer (1920×1080, 30 fps, exactly 600 s).

- `vishnu-in-10-minutes.mp4` — the finished video
- `SCRIPT.md` — timestamped narration + visual script
- `script.json` — source script (edit this to change narration/captions)

## Rebuild
```bash
pip install kokoro-onnx soundfile scipy pillow numpy   # + Kokoro model files in $KOKORO_DIR
python3 tts.py        # narration (Kokoro, soft female voice blend) -> audio/lines, build/lines.json
python3 timeline.py   # fit narration to 600 s -> build/timeline.js, build/voice.wav
python3 music.py      # original ambient score + mix -> build/final_audio.wav
node render.js 0 18000 build/video.mp4   # Playwright frame render (split the range to parallelise)
```
`index.html` is a deterministic, seekable player (`window.seek(t)`): `art.js` holds the character/prop library,
`art_v.js` the Vishnu-specific art, `v1–v4.js` the 46 scenes, `engine.js` captions, chapter cards and timing. Open `index.html` in a browser for a live preview.
