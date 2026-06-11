/* ═══════════════════════════════════════════════════════════════════
   VIDEO LIBRARY DATA
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
  { id: 'p1', label: 'Paper 1 — Theory', color: '#1D4ED8', icon: '📘' },
  { id: 'p2', label: 'Paper 2 — Practical', color: '#6D28D9', icon: '💻' },
  { id: 'exam', label: 'Exam Technique', color: '#B45309', icon: '🎯' },
  { id: 'worked', label: 'Worked Answers', color: '#15803D', icon: '✍️' }
];

const VIDEOS = [

  /* ───────── CHAPTER 1 — Digital Devices (spec 1.1 & 1.2) ───────── */
  { cat: 'p1', chapter: 1, spec: '1.1.1', title: 'Mainframes & Embedded Microprocessors', desc: 'What mainframes do, and how tiny embedded chips run everyday devices.', youtubeId: '', duration: '', free: true },
  { cat: 'p1', chapter: 1, spec: '1.1.2–1.1.4', title: 'Laptops, Desktops, Smartphones & Tablets', desc: 'Comparing the main personal computing devices and when each is used.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 1, spec: '1.1.5–1.1.6', title: 'Cameras, Consoles, Media Players & GPS', desc: 'Entertainment and navigation devices, and how GPS pinpoints location.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 1, spec: '1.1.7', title: 'Multifunctional Devices & Convergence', desc: 'How one device now does the job of many — the convergence trend.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 1, spec: '1.2.1–1.2.2', title: 'The 9 Features of Digital Devices', desc: 'Portability, performance, storage, UI, connectivity, media, energy, expansion, security.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 2 — Software (spec 1.3) ───────── */
  { cat: 'p1', chapter: 2, spec: '1.3.1–1.3.2', title: 'System Software vs Application Software', desc: 'The difference between the two main software categories, with examples.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.3.3', title: 'Operating System Functions', desc: 'Memory management, resource management, security, print spooling and more.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.3.4', title: 'Types of Application Software', desc: 'Office, web authoring, image/sound editing, presentation, control, project management.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.3.5', title: 'Software Licensing: Open Source vs Proprietary', desc: 'The two licensing models, their pros and cons, and exam-ready examples.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 2, spec: '1.3.6–1.3.7', title: 'Communication Software & Updates', desc: 'Remote access, file/message exchange, and why software is updated.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 3 — Peripherals, Storage & Capacity (spec 1.4 & 1.5) ───────── */
  { cat: 'p1', chapter: 3, spec: '1.4.1', title: 'Output Peripherals', desc: 'Monitors, printers (laser/inkjet/3D), plotters, projectors, speakers, control devices.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.4.2', title: 'Input Peripherals', desc: 'Keyboards, scanners, OMR, OCR, biometric scanners, sensors and more.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.5.1–1.5.3', title: 'Storage Devices vs Storage Media', desc: 'The key distinction examiners test, plus internal vs external storage.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.5.2', title: 'HDD vs SSD vs Optical Drives', desc: 'How each storage technology works and their characteristics compared.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.5.4–1.5.5', title: 'Storage Media & Recordable vs Rewritable', desc: 'Optical discs, flash memory, magnetic tape; R vs R/W explained.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 3, spec: '1.5.6', title: 'Storage Capacity Units (bit → TiB)', desc: 'Bit, byte, KiB, MiB, GiB, TiB — and why the spec uses binary units.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 4 — Memory, Processors & ICT Systems (spec 1.6–1.8) ───────── */
  { cat: 'p1', chapter: 4, spec: '1.6.1–1.6.2', title: 'RAM vs ROM', desc: 'Volatile vs non-volatile memory, their characteristics and differences.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 4, spec: '1.6.3', title: 'Flash Memory', desc: 'How flash memory works and where it is used.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 4, spec: '1.7.1', title: 'The CPU & Fetch-Decode-Execute Cycle', desc: 'Inside the processor: ALU, Control Unit, and the instruction cycle.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 4, spec: '1.7.2', title: 'Processor Speed & Performance', desc: 'Clock speed (GHz), cores, cache — what makes a CPU fast.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 4, spec: '1.8.1–1.8.4', title: 'Choosing Devices & Software (incl. Accessibility)', desc: 'Justifying hardware/software choices for scenarios and accessibility needs.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 5 — Connectivity & Networks (spec 2.1–2.3) ───────── */
  { cat: 'p1', chapter: 5, spec: '2.1.1–2.1.2', title: 'Communication Methods & Network Types', desc: 'Wired/wireless/satellite/broadcast; LAN, WAN, PAN and tethering.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 5, spec: '2.1.3–2.1.4', title: 'Wireless: Wi-Fi, Bluetooth, NFC, GPS, 4G', desc: 'The wireless technologies, and when to use Wi-Fi vs Bluetooth.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 5, spec: '2.2.1–2.2.3', title: 'Bandwidth, Latency & Data Transfer', desc: 'What affects speed/volume of data, and why latency matters.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 5, spec: '2.2.4', title: 'Broadband & Cellular Networks', desc: 'Features of fixed broadband, mobile broadband and cellular networks.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 5, spec: '2.3.1–2.3.3', title: 'Network Hardware & Identification', desc: 'Router, WAP, gateway, server; IP address, MAC address, ISP, browser.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 6 — Network Benefits & Security (spec 2.4 & 2.5) ───────── */
  { cat: 'p1', chapter: 6, spec: '2.4.1–2.4.2', title: 'Peer-to-Peer vs Client-Server Networks', desc: 'The two network models and the role of servers.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 6, spec: '2.4.3–2.4.4', title: 'Benefits of Networks', desc: 'Shared resources, centralised admin/backup, roaming profiles and more.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 6, spec: '2.5.1–2.5.2', title: 'Network Security Methods', desc: 'Passwords, firewalls, WEP/WPA, encryption, VPN, access rights, backups.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 7 — Operating Online (spec 3.1–3.5, 3.8) ───────── */
  { cat: 'p1', chapter: 7, spec: '3.1.1–3.1.2', title: 'Risks to Data & Security Methods', desc: 'Malware, phishing, pharming; firewalls, encryption, authentication, HTTPS.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '3.1.3', title: 'Online Payment Systems', desc: 'Card payments, third-party systems, contactless NFC, and how they stay secure.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '3.2.1–3.2.5', title: 'Impact on Individuals & Staying Safe', desc: 'Jobs, working practices, leisure, social effects, and online safety.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '3.3–3.5', title: 'Working from Home, Organisations & Society', desc: 'WFH pros/cons, business impacts, the digital divide.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 7, spec: '3.8', title: 'Laws, Health, Safety & Environment', desc: 'Data protection, monitoring, sustainability, RSI and health issues.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 8 — Online Communities & Information (spec 3.6, 3.7, 3.9) ───────── */
  { cat: 'p1', chapter: 8, spec: '3.6.1–3.7.1', title: 'Types of Online Community', desc: 'Social networking, gaming, VLEs, wikis/forums, blogs, social bookmarking.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 8, spec: '3.7.2–3.7.4', title: 'Online Communities: Use & Safety', desc: 'Global collaboration, acceptable-use policies, anonymity and safety.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 8, spec: '3.9.1–3.9.3', title: 'Finding & Searching for Information', desc: 'Choosing sources and using search engines effectively.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 8, spec: '3.9.4', title: 'Evaluating Sources — The CRAAB Method', desc: 'Currency, Relevance, Authority, Accuracy, Bias.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 8, spec: '3.9.5–3.9.6', title: 'Copyright & Plagiarism', desc: 'Permissions, acknowledging sources, and avoiding plagiarism.', youtubeId: '', duration: '' },

  /* ───────── CHAPTER 9 — Online Goods, Services & Cloud (spec 4.1–4.3) ───────── */
  { cat: 'p1', chapter: 9, spec: '4.1.1', title: 'Types of Online Service', desc: 'Shopping, banking, education, gaming, news, auctions, streaming.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 9, spec: '4.2.1–4.2.2', title: 'Impact of Online Services', desc: 'Effects on individual lifestyle and on how organisations do business.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 9, spec: '4.2.3–4.2.5', title: 'Transactional Data, Cookies & Targeted Marketing', desc: 'What data is collected, cookies, tracking and personalisation.', youtubeId: '', duration: '' },
  { cat: 'p1', chapter: 9, spec: '4.3.1–4.3.3', title: 'Cloud Computing', desc: 'Hosted applications and cloud storage vs local alternatives.', youtubeId: '', duration: '' },

  /* ───────── PAPER 2 — Practical Walkthroughs (spec 5 & 6) ───────── */
  { cat: 'p2', chapter: 10, spec: '5.1–5.4', title: 'Applying ICT: Planning & Choosing Software', desc: 'How to read a practical task, pick the right software and plan output.', youtubeId: '', duration: '', free: true },
  { cat: 'p2', chapter: 10, spec: '6.1', title: 'Word Processing Walkthrough', desc: 'Formatting, tables, page layout, document types and conventions.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.1', title: 'Mail Merge Step-by-Step', desc: 'A full mail merge from data source to finished letters.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.2', title: 'Database: Structure & Data Types', desc: 'Designing tables, choosing data types and setting validation.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.2', title: 'Database: Queries (AND / OR)', desc: 'Building queries with relational and logical operators — the AND/OR trap.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.3', title: 'Spreadsheets: Formulae & Functions', desc: 'SUM, AVERAGE, IF, VLOOKUP, COUNTIF and absolute/relative references.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.3', title: 'Spreadsheets: Charts & Printing', desc: 'Creating correctly-labelled charts and printing formulae view.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.4', title: 'Web Authoring & HTML Basics', desc: 'Templates, adding text/images/buttons, and basic HTML structure.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.5', title: 'Presentations: Master Slides & Transitions', desc: 'Master slides, placeholders, animations vs transitions, print layouts.', youtubeId: '', duration: '' },
  { cat: 'p2', chapter: 10, spec: '6.6–6.7', title: 'Graphics & File Management', desc: 'Bitmap vs vector, editing images, and sensible file/folder management.', youtubeId: '', duration: '' },

  /* ───────── EXAM TECHNIQUE & COMMAND WORDS ───────── */
  { cat: 'exam', chapter: null, spec: '—', title: 'How the 4IT1 Exam Works', desc: 'Paper structure, timing, marks and what to expect on the day.', youtubeId: '', duration: '', free: true },
  { cat: 'exam', chapter: null, spec: '—', title: 'Command Words: State, Identify, Give', desc: 'Short-answer command words and how much to write for each.', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: 'Command Words: Describe vs Explain', desc: 'The most-confused pair — and how to score full marks on each.', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: 'Command Words: Compare, Discuss, Evaluate', desc: 'Higher-mark command words and how to structure your answer.', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: 'Reading the Marks: How Much to Write', desc: 'Using the mark allocation to judge length and depth of answers.', youtubeId: '', duration: '' },
  { cat: 'exam', chapter: null, spec: '—', title: 'Time Management in the Exam', desc: 'Pacing yourself across the paper and what to do if you get stuck.', youtubeId: '', duration: '' },

  /* ───────── WORKED EXAM ANSWERS ───────── */
  { cat: 'worked', chapter: null, spec: '—', title: 'Worked Answer: A 6-Mark "Explain" Question', desc: 'Building a full-mark answer live, point by point.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '—', title: 'Worked Answer: Compare Two Technologies', desc: 'A model comparison answer using "whereas" structure.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '—', title: 'Worked Answer: Scenario / Case Study Question', desc: 'Applying knowledge to an unfamiliar scenario for top marks.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '—', title: 'Worked Answer: 3/6 vs 6/6 Compared', desc: 'Why one answer scores half marks and the other scores full.', youtubeId: '', duration: '' },
  { cat: 'worked', chapter: null, spec: '—', title: 'Worked Answer: Evaluate / "Discuss" Question', desc: 'Balancing both sides then reaching a justified conclusion.', youtubeId: '', duration: '' }
];

// Expose globally
if (typeof window !== 'undefined') {
  window.VIDEOS = VIDEOS;
  window.VIDEO_CATEGORIES = VIDEO_CATEGORIES;
}
