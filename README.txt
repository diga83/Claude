EDEXCEL GCSE (9-1) COMPUTER SCIENCE (1CP2) — INTERACTIVE STUDY BOOK
====================================================================

A complete offline-capable study website for the Pearson Edexcel
GCSE (9-1) Computer Science specification (1CP2):

  Paper 1 (1CP2/01) Principles of Computer Science
    - written exam, 1h30, 75 marks, Topics 1-5  (Chapters 1-11)
  Paper 2 (1CP2/02) Application of Computational Thinking
    - onscreen Python exam, 2h, 75 marks, Topic 6  (Chapter 12)

GETTING STARTED
---------------
Open index.html in any browser. No server or build step is required.
The site works fully offline once loaded (it is a PWA).

WHAT'S INSIDE
-------------
- 12 full teaching chapters with spec checklists, model answers,
  common mistakes and practice questions
- 240+ multiple-choice questions and 80+ exam-style written questions
  with mark schemes
- 10 generated Paper 1 mock papers with a 90-minute timer
- CS calculators: binary/hex/two's complement converters, binary
  addition, shifts, image & sound file size, download time,
  Caesar cipher and RLE tools
- Interactive diagrams: CPU & von Neumann, fetch-decode-execute,
  network topologies, TCP/IP stack, bitmap binary explorer
- Mind maps, flashcards (spaced repetition), glossary, command-word
  drills, worked examples, revision guide, printable summaries,
  progress tracking, streaks and notes

REBUILDING THE SEARCH INDEX
---------------------------
If you edit any chapter HTML, regenerate the search index with:

    node build_search_index.js

IMAGE PLACEHOLDERS — HOW TO ADD YOUR IMAGES
-------------------------------------------
Every chapter has image placeholders showing "Image coming soon" with a
description of what image goes there and the exact filename to use.

TO ADD AN IMAGE:
1. Create or find the image (photo, diagram, screenshot, etc.)
2. Save it with the EXACT filename shown on the placeholder card
   (e.g. ch4-binary-place-values.png)
3. Put the file in: assets/images/
4. Refresh the chapter page — the placeholder is automatically replaced
   by your image, with the caption underneath.

No code editing needed. If a file is missing, the placeholder stays.

ADDING VIDEOS
-------------
Edit assets/js/videos.js — paste a YouTube video ID into the
"youtubeId" field of the matching entry. Empty IDs show as
"Coming soon" placeholder cards.
