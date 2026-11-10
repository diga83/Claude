#!/bin/sh
# The Creator's Hour (Brahma, 120 s): one command from sources to brahma-120.mp4 (+ .srt).
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
node -e "const s=require('fs').readFileSync('$HERE/main.js','utf8');const b=s.slice(s.indexOf('const SUBS'),s.indexOf('window.VOICE'));const r=[...b.matchAll(/\[([\d.]+), ([\d.]+), '((?:[^'\\\\]|\\\\.)*)'\]/g)].map(m=>({t0:+m[1]-.15,t1:+m[1]+ +m[2]+.45,text:m[3]}));require('fs').writeFileSync('$HERE/out/cues.json',JSON.stringify(r))"
"$PY" core/render/srt.py "$HERE/out/cues.json" "$HERE/brahma-120.srt"
sh core/render/mux.sh "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/brahma-120.mp4" 30 1
