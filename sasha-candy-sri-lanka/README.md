# Sasha & Candy Learn About Sri Lanka

A 120-second 2D animated short (16:9, 1080p) made entirely in code.

- `Sasha_and_Candy_Learn_About_Sri_Lanka.mp4` — the finished video
- `SCRIPT.md` — full timed script: narration, picture, on-screen text, sound
- `index.html`, `src/` — the animation (canvas); open through a local web server to preview
- `src/rig.js` — the Sasha and Candy character rigs (head/body turn, walk cycle, gestures, blink, per-sound mouth shapes, squash and stretch)
- `assets/` — fonts
- `tools/` — `voice.py` (narration), `visemes.py` (mouth-shape track), `mix.py` (music + effects), `capture.mjs` (render)

Rebuild: `python3 tools/voice.py && python3 tools/visemes.py && python3 tools/mix.py`, then
`node tools/capture.mjs video out/video.mp4 0 3600` and mux with `out/mix.wav`.
