#!/bin/sh
# (LIB below: the Lemo-Opuscar library folder printed by its setup.sh)
# Trimurti: one command from sources to trimurti.mp4 (+ .srt). Needs the Lemo-Opuscar library at $LIB.
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
node -e "const s=require('fs').readFileSync('$HERE/main.js','utf8');const r=[...s.matchAll(/\['v\d\d', ([\d.]+), ([\d.]+), '((?:[^'\\\\]|\\\\.)*)'\]/g)].map(m=>({t0:+m[1]-.15,t1:+m[1]+ +m[2]+.45,text:m[3]}));require('fs').writeFileSync('$HERE/out/cues.json',JSON.stringify(r))"
"$PY" core/render/srt.py "$HERE/out/cues.json" "$HERE/trimurti.srt"
sh core/render/mux.sh "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/trimurti.mp4" 30 1
