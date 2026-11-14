#!/bin/bash
# quad.sh name t1,t2,t3,t4  -> out/name.jpg (2x2 montage at half size)
cd "$(dirname "$0")/.."; export PLAYWRIGHT_PATH=/opt/node-tools/node_modules/playwright
rm -f out/q_*.jpg; node tools/capture.mjs frames out/q "$2" && ffmpeg -y -loglevel error -pattern_type glob -i 'out/q_*.jpg' -vf "scale=960:-1,tile=2x2" -frames:v 1 -q:v 3 out/$1.jpg; rm -f out/q_*.jpg
