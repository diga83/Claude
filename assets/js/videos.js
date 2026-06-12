/* ═══════════════════════════════════════════════════════════════════
   VIDEO LIBRARY DATA — Edexcel International GCSE (9-1) Computer Science 4CP0
   ───────────────────────────────────────────────────────────────────
   HOW TO ADD A VIDEO:
   1. Film and upload your video to YouTube.
   2. From the video URL (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
      copy the 11-character ID after "v=" → here it is: dQw4w9WgXcQ
   3. Paste it into the "youtubeId" field for the matching video below.
   4. Save the file. The placeholder card automatically becomes a
      playable video. No other changes needed.

   Leave youtubeId as "" (empty) for videos not yet filmed — they show
   as "Coming soon" placeholders.

   OPTIONAL FIELDS:
   - duration: e.g. "6:30" (shows on the card; leave "" if unknown)
   - free: true  → marks the video as a free preview (shows a badge)
   ═══════════════════════════════════════════════════════════════════ */

const VIDEO_CATEGORIES = [
  { id: 'p1', label: 'Paper 1 — Principles', color: '#1D4ED8', icon: '📘' },
  { id: 'p2', label: 'Paper 2 — Python', color: '#6D28D9', icon: '💻' },
  { id: 'exam', label: 'Exam Technique', color: '#B45309', icon: '🎯' },
  { id: 'worked', label: 'Worked Answers', color: '#15803D', icon: '✍️' }
];

const VIDEOS = [

  /* ───────── CHAPTER 1 — Decomposition & Abstraction (Topic 1.1) ───────── */
  { cat: 'p1', chapter: 1, spec: '1.2', title: 'Decomposition: Breaking Problems Down', desc: 'Splitting a big problem into sub-problems you can solve (and program) separately.', youtubeId: '', duration: '', free: true },
  { cat: 'p1', chapter: 1, spec: '1.2', title: 'Abstraction: Hiding the Detail', desc: 'Removing unnecessary detail — why the Tube map is the classic example.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 1, spec: '1.2', title: 'Analysing Problems Computationally', desc: 'Identifying inputs, processes and outputs before you design an algorithm.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 2 — Algorithms (Topic 1.2) ───────── */
  { cat: 'p1', chapter: 2, spec: '1.1', title: 'Flowchart Symbols & How to Use Them', desc: 'Terminator, process, decision, input/output and subprogram symbols.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.1', title: 'Writing Pseudocode', desc: 'Expressing algorithms in structured, language-neutral pseudocode.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.1', title: 'Trace Tables Explained', desc: 'Recording variable values line by line to predict output and spot logic errors.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.1', title: 'Syntax, Logic & Runtime Errors', desc: 'The three error types, how each shows up and how to fix them.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 3 — Searching, Sorting & Truth Tables (Topics 1.2 & 1.3) ───────── */
  { cat: 'p1', chapter: 3, spec: '1.1 & 4.3', title: 'Linear Search vs Binary Search', desc: 'How each works, why binary needs a sorted list, and which is faster.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.1 & 4.3', title: 'Bubble Sort & Merge Sort', desc: 'Compare-and-swap passes vs divide-and-conquer — both sorts step by step.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.1 & 4.3', title: 'Truth Tables: AND, OR, NOT', desc: 'Building truth tables for logical statements, including bracketed expressions.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 4 — Binary & Number Systems (Topic 2.1) ───────── */
  { cat: 'p1', chapter: 4, spec: '3.1', title: 'Binary ↔ Denary Conversion', desc: 'Place values 128 to 1 — converting both ways quickly and accurately.', youtubeId: '', duration: '', free: true },
  { cat: 'p1', chapter: 4, spec: '3.1', title: 'Hexadecimal Conversions', desc: 'Hex digits 0–F, one hex digit per nibble, and hex ↔ binary ↔ denary.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 4, spec: '3.1', title: "Two's Complement: Signed Binary", desc: 'The MSB as −128, converting negative numbers, and spotting the sign bit.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 4, spec: '3.1', title: 'Binary Addition, Overflow & Shifts', desc: 'Carry rules, overflow errors, and logical vs arithmetic shifts (×2 / ÷2).', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 5 — Data Representation (Topic 2.2) ───────── */
  { cat: 'p1', chapter: 5, spec: '3.2', title: 'ASCII & Character Sets', desc: 'How text becomes binary — and using sequential codes to work out characters.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 5, spec: '3.2', title: 'Bitmap Images: Pixels, Resolution & Colour Depth', desc: 'How images are stored, and why 2^n gives the number of available colours.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 5, spec: '3.2', title: 'Sound Sampling: Sample Rate & Bit Depth', desc: 'Turning analogue sound into binary, and the quality/file-size trade-off.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 6 — Storage, Compression & Encryption (Topics 2.3 & 2.4) ───────── */
  { cat: 'p1', chapter: 6, spec: '3.3–3.4', title: 'Data Storage Units & File Size Calculations', desc: 'Decimal units (KB = 1,000 B) and calculating image, sound and text file sizes.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 6, spec: '3.3–3.4', title: 'Lossless vs Lossy Compression & RLE', desc: 'When each type is suitable, plus run-length encoding worked examples.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 6, spec: '3.3–3.4', title: 'Encryption & the Caesar Cipher', desc: 'Why we encrypt, and encrypting/decrypting with a Caesar cipher key.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 7 — Hardware (Topic 3.1) ───────── */
  { cat: 'p1', chapter: 7, spec: '4.1–4.2', title: 'Von Neumann Architecture & the Stored Program Concept', desc: 'Instructions and data together in main memory — the foundation of the modern computer.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '4.1–4.2', title: 'Inside the CPU & the Fetch-Decode-Execute Cycle', desc: 'CU, ALU, registers and clock — then following one instruction through the cycle.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '4.1–4.2', title: 'RAM, ROM & Cache', desc: 'Volatile vs non-volatile memory and the memory hierarchy.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '4.1–4.2', title: 'Secondary Storage & Embedded Systems', desc: 'Magnetic, optical and solid-state storage compared, plus dedicated embedded systems.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 8 — Software & Programming Languages (Topics 3.2 & 3.3) ───────── */
  { cat: 'p1', chapter: 8, spec: '4.4–4.5', title: 'OS Functions & Utility Software', desc: 'File, process, peripheral, memory and user management — plus anti-malware, backup, defragmentation and compression utilities.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 8, spec: '4.4–4.5', title: 'High-Level vs Low-Level Languages', desc: 'Machine code, assembly and high-level languages — strengths of each.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 8, spec: '4.4–4.5', title: 'Compilers vs Interpreters', desc: 'Whole-program vs line-by-line translation, and what that means for errors.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 9 — Networks (Topic 4.1) ───────── */
  { cat: 'p1', chapter: 9, spec: '5.1 & 5.3', title: 'LANs, WANs & Transmission Media', desc: 'Network types, wired vs wireless, and what affects network speed.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 9, spec: '5.1 & 5.3', title: 'Network Topologies: Bus, Ring, Star & Mesh', desc: 'How each topology is wired, plus the failure points examiners ask about.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 9, spec: '5.1 & 5.3', title: 'TCP/IP Layers & Protocols: HTTP(S), FTP, SMTP, POP3, IMAP', desc: 'The 4-layer model, plus which protocol does which job — including the email trio.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 9, spec: '5.1 & 5.3', title: 'Network Speed Calculations', desc: 'Bits vs bytes (×8), bandwidth, and time = file size ÷ speed without a calculator.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 10 — Network Security (Topic 4.2) ───────── */
  { cat: 'p1', chapter: 10, spec: '5.2', title: 'Social Engineering: Attacking the Person', desc: 'Phishing, pretexting and shoulder surfing — why humans are the weakest link.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 10, spec: '5.2', title: 'Malware: Viruses, Worms, Trojans & More', desc: 'The malware family tree, including ransomware, spyware and keyloggers.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 10, spec: '5.2', title: 'DoS Attacks & SQL Injection', desc: 'How technical attacks work and the damage they cause.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 10, spec: '5.2', title: 'Protecting Networks: Pen Testing & Defences', desc: 'Penetration testing, firewalls, access control, encryption and backups in layers.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 11 — Issues & Impact (Topic 5) ───────── */
  { cat: 'p1', chapter: 11, spec: '6.1', title: 'Environmental Impact: E-Waste & Energy', desc: 'Manufacturing, energy use and disposal of digital devices.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 11, spec: '6.1', title: 'Privacy, Surveillance & Algorithmic Bias', desc: 'Personal data collection, monitoring, and how AI systems can be unfair.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 11, spec: '6.1', title: 'The Three Laws: DPA, CMA & Copyright', desc: 'Data Protection Act 2018, Computer Misuse Act 1990 and Copyright, Designs and Patents Act 1988.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 11, spec: '6.1', title: 'Open Source vs Proprietary Licensing', desc: 'The two licensing models, their pros and cons, with exam-ready examples.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 12 — Python Programming (Topic 6, Paper 2) ───────── */
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Variables, Data Types & Casting', desc: 'int, float, bool, str — plus input(), print() and converting between types.', youtubeId: '', duration: '', free: true },
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Selection: if / elif / else', desc: 'Building conditions with comparison and logical operators.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Loops: for, while & range()', desc: 'Count-controlled vs condition-controlled iteration, and nested loops.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Strings, Lists & 2D Lists', desc: 'Indexing, slicing, string methods, append() and looping through 1D and 2D lists.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Functions, Parameters & Return Values', desc: 'def, arguments vs parameters, return, and local vs global scope.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Reading & Writing Files', desc: 'open() modes r/w/a, reading lines, writing records and closing files.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 12, spec: 'Topic 2', title: 'Validation & Testing Your Code', desc: 'Range/type/presence checks, try/except, and normal, boundary and erroneous test data.', youtubeId: '', duration: '' },

  /* ───────── EXAM TECHNIQUE ───────── */
  { cat: 'exam', chapter: null, spec: '—', title: 'How Paper 1 is Marked', desc: '2 hours, 80 marks, all topics — structure, timing and mark scheme habits.', youtubeId: '', duration: '', free: true },
  { cat: 'exam', chapter: null, spec: '—', title: 'Paper 2 Practical Walkthrough', desc: 'The 3-hour practical exam: the coding environment, the task files and how to submit (Python, C# or Java).', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: '6-Mark "Discuss" Questions', desc: 'Structuring balanced, levelled answers for the long questions on Paper 1.', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: 'Command Words: Describe vs Explain', desc: 'The most-confused pair — and how to score full marks on each.', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: 'No Calculator: Exam Arithmetic Tricks', desc: 'Fast ×8, ÷8, powers of 2 and conversion strategies for Paper 1 calculations.', youtubeId: '', duration: '' },

  /* ───────── WORKED ANSWERS ───────── */
  { cat: 'worked', chapter: null, spec: '1.2', title: 'Worked Answer: Trace Table Walkthrough', desc: 'Completing a full trace table on an unfamiliar algorithm, line by line.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '2.1', title: "Worked Answer: Two's Complement Conversions Live", desc: 'Converting positive and negative numbers both ways under exam conditions.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '2.2', title: 'Worked Answer: File Size Calculation', desc: 'An image and a sound file size question solved with full working shown.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '6.6', title: 'Worked Answer: Building a Validation Loop in Python', desc: 'Writing a while-loop input check live — the classic Paper 2 task.', youtubeId: '', duration: '' }
];

// Expose globally
if (typeof window !== 'undefined') {
  window.VIDEOS = VIDEOS;
  window.VIDEO_CATEGORIES = VIDEO_CATEGORIES;
}
