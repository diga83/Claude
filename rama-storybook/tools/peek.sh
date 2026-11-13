#!/bin/bash
# peek.sh <name> "t1,t2,t3,t4" : full-size frames tiled side by side (half-res) into review/<name>.jpg
rm -rf review/_f; node tools/capture.mjs frames review/_f "$2" >/dev/null
n=$(ls review/_f | wc -l)
ffmpeg -v error -y -pattern_type glob -i 'review/_f/*.jpg' -vf "scale=540:960,tile=${n}x1" -frames:v 1 -q:v 3 review/$1.jpg
