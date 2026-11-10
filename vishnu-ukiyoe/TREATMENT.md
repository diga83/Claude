# The Patient Tortoise: Vishnu and the Churning of the Ocean (treatment)

**Format:** 1080×1920 (9:16, a tall pillar print, as the series' other films), 24 fps (the camera moves on ones), 120 s · English voice-over, warm female narrator (Kokoro `af_bella`, speed 0.88), subtitles as printed cartouches + `.srt` · −14 LUFS, no grain (the paper is the grain).
**Style:** Ukiyo-e (fixed: washi, flat colour blocks slightly out of register, a sumi key block, bokashi skies, cartouches and red seals; figures small and flat; Japanese instruments).
**Approach:** one story told in full, the churning of the ocean of milk (Samudra Manthan), with Vishnu as Kurma, the tortoise who holds up the mountain. As in the series, the gods are shown through symbols and animals, not portraits: rows of tiny anonymous figures pull the rope; Lakshmi is a rising lotus; Vishnu is the tortoise and his discus. The ukiyo-e grammar is used as grammar only; no famous print, character or composition is copied.

## 1. Three candidate structures
1. **A series of views around one constant subject** (the serpent in every print). Elegant, but it repeats the Vishnu watercolour's "endless line".
2. **Alternate impressions** of one ocean block (dawn, night, storm). Beautiful, but there's no story.
3. **A handscroll of six prints (chosen)**, mounted one after another. The camera slides right to left from print to print, like stations: the ocean; the churning; a **tilt down past the border** to the tortoise beneath; the treasures as *alternate impressions* of one sea; Lakshmi; the nectar. Then a pull-back to the whole scroll, and only the seal remains.

## 2. Logline and arc
*To steady the world, a god becomes a tortoise and carries a mountain on his back.*
Setup: the gods are weak; Vishnu's advice. Turn: the mountain sinks; Kurma holds it. Development: the treasures, Lakshmi's choice, the nectar. Ending: the scroll seen whole; a seal alone.

## 3. Benchmark
- **Edo landscape series and illustrated handscrolls** (grammar only): tall pillar-print cropping, rows of small figures, banded water with paper foam, cartouches. *Don't take:* any specific print or its waves (no *Great Wave*), characters or compositions.

## 4. Shot list (each print appears block by block: key line, then colour blocks landing in register)
| # | t (s) | Print | Camera | Why |
|---|---|---|---|---|
| 1 | 0–14 | **I · The Ocean of Milk**: pale bokashi sky, banded milk-white sea (paper), a thin shore with tiny gods | locked; the print appears block by block | the bare world before the story |
| 2 | 14–40 | **II · The Churning**: Mount Mandara as a tall rock, the serpent Vasuki wound round it, gods (left) and demons (right) pulling; foam | handscroll slide in; the coils turn at 8 fps | the effort, in one tall view |
| 3 | 40–56 | **III · Kurma**: under the sea, a Prussian-blue bokashi; a giant tortoise bearing the mountain's base | **tilt down past the border** into the next sheet below | the turn: the god beneath |
| 4 | 56–75 | **IV · Treasures**: one sea key block reprinted four times (moon, white elephant, wishing tree, cow of plenty) | locked; colour blocks swap | alternate impressions |
| 5 | 75–92 | **V · Lakshmi**: a great lotus opens in gold rays; a garland drifts toward the discus | slow push | the choice |
| 6 | 92–104 | **VI · Amrita**: a gold pot rises from the waves | locked | the end of the work |
| 7 | 104–120 | The whole scroll | **pull back** from one sheet to all six; the prints wash to paper; one seal remains | the series seen whole |

## 5. Sound
Japanese instruments only: shamisen (plucked-string model with sawari) for the pulse of the churning; koto for the treasures; a breathy shakuhachi-like line (flute samples bent into each note) for the open moments; taiko-like drum (bass drum / toms) and hyoshigi (woodblock) clappers that accelerate as the mountain sinks; a small bell for Lakshmi. *Ma*: true silence before Kurma appears. Paper foley: a baren rub as each print appears, a scroll slide between prints, a seal thump. Voice ~8 dB over the music.

## 6. Type
Subtitles as horizontal cartouches (Shippori Mincho) with a small red seal; each view gets a vertical cartouche with its title in Yuji Syuku; seals stamp in. Pigments: Prussian blue, pale blue, beni red (rare), ochre, grey-green, a gold-yellow, sumi; paper is the white (the milk ocean is paper).

## Build notes
- `print.js`: the demo's engine adapted to a tall 1080×1920 sheet (frame, textures, reveal direction; the rubbing texture tiled so its offset leaves no seam).
- `prints.js`: the six prints as cached colour blocks (key, blues, secondary, reds/golds) plus live parts. Live parts: the turning coils and the pullers at 8 fps, foam at 12 fps, flippers, bubbles, fish, the four impressions, the garland, the rising pot.
- `main.js`: the mounting scroll (II and III hang as a vertical diptych), the camera, block-by-block printing, cartouches, seals, subtitle slips, the wash and the last seal; `events.json` drives `mix.py`.
- Timing changes against the plan: the voice is placed after TTS (see `VOICE` in `main.js`); the four treasure lines share one subtitle slip.
