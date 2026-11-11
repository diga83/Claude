#!/bin/sh
# The Way Home (Rama, 90 s): one command from sources to rama-90.mp4 (+ .srt).
# LIB = the Lemo-Opuscar library folder printed by its setup.sh
set -e
LIB=${LIB:-/root/lemo-opuscar}
HERE=$(cd "$(dirname "$0")" && pwd)
export LIB
[ -f "$LIB/core/render/video.mjs" ] || { echo "set LIB to the library folder"; exit 1; }
PY="$LIB/.venv/bin/python"
cd "$HERE"
[ -f paper.jpg ] || "$PY" paper.py
[ -f fonts.css ] || node fetch_fonts.mjs
[ -f voices/dur.json ] || "$PY" "$LIB/core/tts/tts.py" tts/lines.json voices/
cd "$LIB"
node core/render/events.mjs "$HERE" --size 1080x1920
node core/render/video.mjs "$HERE" --size 1080x1920 --fps 30 --workers 4 --out "$HERE/out/video.mp4"
"$PY" "$HERE/mix.py"
node -e "const E=require('$HERE/events.json').ev.filter(e=>e.type==='sub').map(e=>({t0:e.t-.15,t1:e.t+e.d+.45,text:e.text}));require('fs').writeFileSync('$HERE/out/cues.json',JSON.stringify(E))"
"$PY" core/render/srt.py "$HERE/out/cues.json" "$HERE/rama-90.srt"
sh core/render/mux.sh "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/rama-90.mp4" 30 1
