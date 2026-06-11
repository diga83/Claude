/* ═══════════════════════════════════════════════════════════════════════════
   IGCSE ICT 4IT1 — DATA FILE
   Chapter metadata, glossary terms, and quiz questions
   ═══════════════════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  {
    id: 1, paper: 1, file: "chapter-1.html",
    title: "Digital Devices",
    spec: "1.1 & 1.2",
    color: "#1B3A6B", colorDark: "#0F2447", colorLight: "#DBEAFE",
    summary: "Types of devices, 9 features, multifunctional & convergence, GPS.",
    sections: 6
  },
  {
    id: 2, paper: 1, file: "chapter-2.html",
    title: "Software",
    spec: "1.3",
    color: "#1D4ED8", colorDark: "#1E3A8A", colorLight: "#DBEAFE",
    summary: "System & application software, OS functions, app types, licensing, updates.",
    sections: 7
  },
  {
    id: 3, paper: 1, file: "chapter-3.html",
    title: "Peripherals, Storage & Capacity",
    spec: "1.4 & 1.5",
    color: "#0F766E", colorDark: "#134E4A", colorLight: "#CCFBF1",
    summary: "Input & output devices, HDD/SSD/optical/flash/tape, capacity units.",
    sections: 6
  },
  {
    id: 4, paper: 1, file: "chapter-4.html",
    title: "Memory, Processors & ICT Systems",
    spec: "1.6, 1.7 & 1.8",
    color: "#6D28D9", colorDark: "#4C1D95", colorLight: "#EDE9FE",
    summary: "RAM vs ROM, flash, fetch-decode-execute, processor speed, selecting systems.",
    sections: 7
  },
  {
    id: 5, paper: 1, file: "chapter-5.html",
    title: "Connectivity & Networks",
    spec: "2.1–2.3",
    color: "#C2410C", colorDark: "#7C2D12", colorLight: "#FFEDD5",
    summary: "LAN/WAN/PAN, wireless tech, bandwidth & latency, network components.",
    sections: 7
  },
  {
    id: 6, paper: 1, file: "chapter-6.html",
    title: "Network Benefits & Security",
    spec: "2.4 & 2.5",
    color: "#B91C1C", colorDark: "#7F1D1D", colorLight: "#FEE2E2",
    summary: "P2P vs client-server, LAN benefits, server types, threats, security methods.",
    sections: 6
  },
  {
    id: 7, paper: 1, file: "chapter-7.html",
    title: "Operating Online",
    spec: "3.1–3.5, 3.8",
    color: "#15803D", colorDark: "#14532D", colorLight: "#DCFCE7",
    summary: "Online risks, security, WFH, digital divide, GDPR, health & safety.",
    sections: 7
  },
  {
    id: 8, paper: 1, file: "chapter-8.html",
    title: "Online Communities & Information",
    spec: "3.6, 3.7 & 3.9",
    color: "#3730A3", colorDark: "#312E81", colorLight: "#E0E7FF",
    summary: "Community types, online safety, AUP, CRAAB framework, copyright.",
    sections: 6
  },
  {
    id: 9, paper: 1, file: "chapter-9.html",
    title: "Online Goods, Services & Cloud",
    spec: "4.1–4.3",
    color: "#334155", colorDark: "#1E293B", colorLight: "#F1F5F9",
    summary: "8 online services, cookies, targeted marketing, SaaS/PaaS/IaaS, cloud vs local.",
    sections: 6
  },
  {
    id: 10, paper: 2, file: "chapter-10.html",
    title: "Software Skills Reference",
    spec: "5 & 6",
    color: "#065F46", colorDark: "#064E3B", colorLight: "#D1FAE5",
    summary: "Word processing, databases, spreadsheets, web authoring, presentations, graphics.",
    sections: 7
  }
];

/* ═══════════════════════════════════════════════════════════════════════════
   GLOSSARY — 100+ terms across the spec
   ═══════════════════════════════════════════════════════════════════════════ */

const GLOSSARY = [
  {t:"Access rights", d:"Rules set by an administrator defining what each user can do with specific files, folders or resources (read, write, execute, delete).", ch:6},
  {t:"Actuator", d:"An output device that receives signals from the computer and physically controls machinery (robot arm, traffic light, automated door).", ch:3},
  {t:"ADSL", d:"Asymmetric DSL. Broadband delivered over existing copper telephone lines; download faster than upload.", ch:5},
  {t:"ALU", d:"Arithmetic Logic Unit. Component inside the CPU that performs arithmetic and logical operations.", ch:4},
  {t:"Anti-malware", d:"Software that detects, quarantines and removes malicious software.", ch:6},
  {t:"Application software", d:"Programs the user directly interacts with to perform tasks (Word, Excel, browsers, games).", ch:2},
  {t:"AUP", d:"Acceptable Use Policy. Document users agree to before using a network/site, defining acceptable behaviour.", ch:8},
  {t:"Bandwidth", d:"Maximum amount of data that can be transmitted per second across a network. Measured in Mbps or Gbps.", ch:5},
  {t:"Backup", d:"A copy of data stored separately from the original so it can be restored if lost or corrupted.", ch:6},
  {t:"Biometric scanner", d:"A device that reads unique biological characteristics (fingerprint, iris, face) for identity verification.", ch:3},
  {t:"BIOS / UEFI", d:"Basic Input/Output System. Start-up instructions stored in ROM that run before the OS loads.", ch:4},
  {t:"Bit", d:"The smallest unit of digital data — a single binary digit (0 or 1).", ch:3},
  {t:"Bitmap image", d:"An image stored as a grid of individual pixels (JPG, PNG, GIF). Degrades when scaled up.", ch:10},
  {t:"Bluetooth", d:"Short-range wireless communication for direct device-to-device pairing without a router. ~10m range.", ch:5},
  {t:"Booking system", d:"Online service allowing users to reserve travel, events, accommodation in real time.", ch:9},
  {t:"Broadband", d:"High-speed internet connection. Includes ADSL, cable, fibre optic, and mobile (4G/5G).", ch:5},
  {t:"Browser", d:"Software that requests and displays web pages (Chrome, Firefox, Safari, Edge).", ch:5},
  {t:"Byte", d:"8 bits. The standard unit of digital data — one byte typically represents one character of text.", ch:3},
  {t:"Cache", d:"Extremely fast memory inside or near the CPU that stores recently used instructions and data.", ch:4},
  {t:"Client-server network", d:"A network architecture where a dedicated server provides services to client devices.", ch:6},
  {t:"Cloud computing", d:"Delivering computing services (storage, applications, processing) over the internet from remote data centres.", ch:9},
  {t:"Compression", d:"Reducing file size so it takes less storage and transfers faster. Lossy (JPG, MP3) or lossless (ZIP, PNG).", ch:3},
  {t:"Connectivity", d:"How a device can connect to other devices/networks: Wi-Fi, BT, NFC, 4G, USB, Ethernet.", ch:1},
  {t:"Convergence", d:"Different types of digital devices becoming more similar over time, sharing features.", ch:1},
  {t:"Cookie", d:"A small text file stored on a user's device by a website to remember their session or preferences.", ch:9},
  {t:"Copyright", d:"Legal protection automatically given to creators of original works from the moment of creation.", ch:8},
  {t:"CPU", d:"Central Processing Unit. The main processor; carries out program instructions using the fetch-decode-execute cycle.", ch:4},
  {t:"CRAAB", d:"Framework for evaluating online information: Currency, Relevance, Authority, Accuracy, Bias.", ch:8},
  {t:"Cyberbullying", d:"Repeated use of digital technology to bully, threaten or humiliate a specific person.", ch:7},
  {t:"Data protection law", d:"Legal framework governing how organisations collect, store, use and protect personal data (GDPR / DPA 2018).", ch:7},
  {t:"Database", d:"Organised collection of structured data, typically in tables with fields and records.", ch:10},
  {t:"Desktop", d:"A stationary computer designed for use at a single location; high-performance, easily upgraded.", ch:1},
  {t:"Digital divide", d:"The gap between those with good access to internet and digital technology and those without.", ch:7},
  {t:"DOS attack", d:"Denial of Service. Flooding a server with traffic so it can't serve real users.", ch:6},
  {t:"DPA 2018", d:"UK Data Protection Act 2018. Domestic law implementing GDPR principles.", ch:7},
  {t:"Embedded microprocessor", d:"A small chip built into a product (washing machine, microwave) doing one specific automated task.", ch:1},
  {t:"Encryption", d:"Converting readable data into scrambled ciphertext using a mathematical key.", ch:6},
  {t:"Ethernet", d:"Standard wired networking technology for LANs, using twisted-pair cabling (RJ45).", ch:5},
  {t:"Fetch-Decode-Execute cycle", d:"The fundamental 4-stage CPU process: Fetch from RAM → Decode → Execute → Store result.", ch:4},
  {t:"Fibre optic", d:"High-speed broadband transmitted as light pulses through glass strands.", ch:5},
  {t:"Field (database)", d:"One column in a database table; stores one attribute (e.g. LastName).", ch:10},
  {t:"Firewall", d:"Hardware or software that monitors and filters network traffic based on security rules.", ch:6},
  {t:"Flash memory", d:"Non-volatile electronic storage with no moving parts (SSDs, USB drives, SD cards).", ch:4},
  {t:"Foreign key", d:"A field in one table that links to the primary key of another table.", ch:10},
  {t:"GDPR", d:"General Data Protection Regulation. EU-wide data protection law (2018).", ch:7},
  {t:"GPS", d:"Global Positioning System. Satellite-based positioning. Receive-only.", ch:1},
  {t:"Hacking", d:"Unauthorised access to a system.", ch:7},
  {t:"HDD", d:"Hard Disk Drive. Storage using spinning magnetic platters. Larger capacity but slower than SSD.", ch:3},
  {t:"HTML", d:"HyperText Markup Language. The code used to create web pages.", ch:10},
  {t:"HTTP / HTTPS", d:"Web protocols. HTTPS uses encryption (TLS) to protect data in transit.", ch:6},
  {t:"Hub", d:"Basic network device that broadcasts all incoming data to every connected device.", ch:5},
  {t:"IaaS", d:"Infrastructure as a Service. Cloud rental of virtual machines, storage, networks.", ch:9},
  {t:"Identity theft", d:"Stealing personal data to fraudulently impersonate someone.", ch:7},
  {t:"IF function", d:"Spreadsheet conditional: =IF(test, value_if_true, value_if_false).", ch:10},
  {t:"Input device", d:"Hardware that sends data INTO the computer (keyboard, mouse, scanner, sensor).", ch:3},
  {t:"IP address", d:"Logical address assigned to a device on a network by a router.", ch:5},
  {t:"ISP", d:"Internet Service Provider. Company that provides internet connectivity.", ch:5},
  {t:"KiB / MiB / GiB / TiB", d:"Binary capacity units. 1 KiB = 1024 bytes. Each step is x1024 (NOT x1000).", ch:3},
  {t:"LAN", d:"Local Area Network. A network within a limited area (single building/site).", ch:5},
  {t:"Laptop", d:"A portable battery-powered computer with built-in screen, keyboard and trackpad.", ch:1},
  {t:"Latency", d:"Time delay between data being sent and the response. Measured in ms. Lower is better.", ch:5},
  {t:"Mail merge", d:"Process combining a template document with a data source to produce multiple personalised copies.", ch:10},
  {t:"Mainframe", d:"Very large powerful computer used by large organisations for high-volume processing.", ch:1},
  {t:"Malware", d:"Malicious software intentionally designed to damage or disrupt systems.", ch:6},
  {t:"Media support", d:"Audio, video and image formats the device can play/display.", ch:1},
  {t:"Memory management", d:"OS function that allocates RAM to running programs.", ch:2},
  {t:"MFA", d:"Multi-Factor Authentication. Two or more proofs of identity (password + phone code).", ch:6},
  {t:"Multifunctional device", d:"One device that combines functions of several (smartphone = phone + camera + GPS + browser).", ch:1},
  {t:"NFC", d:"Near-Field Communication. Wireless communication over very short distances (<10cm). Used for contactless payment.", ch:5},
  {t:"OCR", d:"Optical Character Recognition. Converts scanned images of text into editable digital text.", ch:3},
  {t:"OMR", d:"Optical Mark Recognition. Detects whether a mark exists at specific positions on a form.", ch:3},
  {t:"Open source software", d:"Software whose source code is publicly available; can be modified and redistributed.", ch:2},
  {t:"Operating system", d:"Most important piece of system software; manages hardware, memory, resources, security and user interface.", ch:2},
  {t:"Optical media", d:"CDs, DVDs, Blu-ray. Data stored as pits and lands read by a laser.", ch:3},
  {t:"Output device", d:"Hardware that sends data OUT of the computer (monitor, printer, speakers).", ch:3},
  {t:"PaaS", d:"Platform as a Service. Cloud platform with development tools and runtime environment.", ch:9},
  {t:"PAN", d:"Personal Area Network. Very short-range network around one person (phone + headphones + smartwatch).", ch:5},
  {t:"Peer-to-peer network", d:"Network where all devices are equal — each acts as both client and server.", ch:6},
  {t:"Performance", d:"Device feature describing speed: CPU clock speed (GHz), RAM amount, GPU power.", ch:1},
  {t:"Peripheral device", d:"Any input, output or storage device connected externally to the computer.", ch:3},
  {t:"Pharming", d:"A technical attack that silently redirects users from legitimate websites to fake ones via DNS manipulation.", ch:7},
  {t:"Phishing", d:"A social engineering attack using fraudulent messages to trick users into revealing credentials.", ch:7},
  {t:"Pixel", d:"Smallest unit of a bitmap image — one coloured dot in a grid.", ch:10},
  {t:"Plagiarism", d:"Presenting someone else's work or ideas as your own without proper acknowledgement.", ch:8},
  {t:"Portability", d:"Device feature: size, weight, battery life — how easily moved and used in different places.", ch:1},
  {t:"Primary key", d:"A field that uniquely identifies each record in a database table.", ch:10},
  {t:"Print spooling", d:"OS function that queues multiple print jobs so users can keep working.", ch:2},
  {t:"Proprietary software", d:"Software with hidden source code, sold under paid licence (Windows, Adobe Photoshop).", ch:2},
  {t:"Protocol", d:"Set of rules for data communication (HTTP, FTP, SMTP, TCP/IP).", ch:5},
  {t:"RAM", d:"Random Access Memory. Volatile working memory — stores currently running programs.", ch:4},
  {t:"Ransomware", d:"Malware that encrypts the victim's files and demands payment for the decryption key.", ch:7},
  {t:"Record", d:"One row in a database table — all data about one entity.", ch:10},
  {t:"Relative reference", d:"Spreadsheet cell ref like A1 that adjusts when copied. Absolute is $A$1.", ch:10},
  {t:"ROM", d:"Read Only Memory. Non-volatile permanent memory containing start-up instructions.", ch:4},
  {t:"Router", d:"Network device that directs data packets between different networks.", ch:5},
  {t:"RSI", d:"Repetitive Strain Injury. Health problem from prolonged repeated movements (typing, mousing).", ch:7},
  {t:"SaaS", d:"Software as a Service. Complete applications delivered over the internet (Google Docs).", ch:9},
  {t:"Sensor", d:"Input device that detects physical conditions (temperature, light, motion) and converts them to digital signals.", ch:3},
  {t:"Server", d:"Powerful computer dedicated to providing services (files, websites, email) to other devices.", ch:6},
  {t:"SIM card", d:"Subscriber Identity Module. Chip that authenticates a phone to a mobile network operator.", ch:1},
  {t:"Smartphone", d:"Phone with full computing features: full OS, apps, internet, camera, GPS.", ch:1},
  {t:"Social engineering", d:"Manipulating people into revealing confidential information — exploits human trust.", ch:7},
  {t:"SSD", d:"Solid State Drive. Storage using flash memory chips; no moving parts; very fast.", ch:3},
  {t:"Streaming", d:"Delivering audio/video content continuously in real time without full download first.", ch:9},
  {t:"System software", d:"Programs that manage hardware and provide a platform for apps (OS + utility software).", ch:2},
  {t:"Tablet", d:"Portable touchscreen device — larger than phone, lighter than laptop, no physical keyboard.", ch:1},
  {t:"Targeted marketing", d:"Delivering ads tailored to an individual based on their collected data profile.", ch:9},
  {t:"Tethering", d:"Sharing a phone's mobile data connection with another device.", ch:5},
  {t:"Touchscreen", d:"Display that detects finger or stylus contact — combines input and output.", ch:3},
  {t:"Transaction log", d:"Record of all system actions kept for security analysis.", ch:6},
  {t:"Utility software", d:"System software tools performing maintenance/security tasks (antivirus, backup, disk cleanup).", ch:2},
  {t:"Validation", d:"Automatic rule-checking that data entered meets defined criteria before being accepted.", ch:10},
  {t:"Vector image", d:"Image made of mathematical shape descriptions — scales without quality loss (SVG, AI).", ch:10},
  {t:"Verification", d:"Human checking that data entered matches the source document (e.g. proofreading).", ch:10},
  {t:"VLE", d:"Virtual Learning Environment. Online platform for delivering courses and resources.", ch:8},
  {t:"VLOOKUP", d:"Spreadsheet function: searches first column of a range, returns value from another column.", ch:10},
  {t:"VPN", d:"Virtual Private Network. Creates an encrypted tunnel; hides data and IP address.", ch:6},
  {t:"WAN", d:"Wide Area Network. A network covering a large geographical area connecting multiple LANs.", ch:5},
  {t:"WAP", d:"Wireless Access Point. Device that creates a Wi-Fi zone.", ch:5},
  {t:"Wi-Fi", d:"Wireless networking technology connecting devices to a LAN via a wireless access point.", ch:5},
  {t:"WPA2 / WPA3", d:"Wi-Fi Protected Access. Strong wireless encryption standards.", ch:6}
];

/* ═══════════════════════════════════════════════════════════════════════════
   QUIZ QUESTIONS — 50+ across all 10 chapters
   ═══════════════════════════════════════════════════════════════════════════ */

const QUIZ = {
  1: [
    {q:"Which device receives but does NOT transmit location data?", o:["Smartphone","GPS device","Tablet","Smart watch"], a:1, e:"A GPS device only receives signals from satellites. Apps may then send location elsewhere, but the GPS chip itself is receive-only."},
    {q:"Which feature describes 'how easily a device can be carried and used in different locations'?", o:["Performance","Connectivity","Portability","Expansion capability"], a:2, e:"Portability covers size, weight and battery life — how easily a device can be moved between locations."},
    {q:"What is meant by 'convergence' in digital devices?", o:["Devices becoming more similar over time","Multiple users connecting to one device","Connecting devices to a network","Combining hardware and software"], a:0, e:"Convergence is the process by which different device types become more similar, sharing more features."},
    {q:"Which device is best suited for use inside a washing machine?", o:["Mainframe","Embedded microprocessor","Tablet","Desktop"], a:1, e:"An embedded microprocessor performs ONE specific task (the wash cycle) and is built into the appliance."},
    {q:"A 'desktop replacement laptop' refers to:", o:["A broken desktop's replacement","A high-spec laptop matching desktop performance","A very small portable laptop","A laptop without a battery"], a:1, e:"A desktop replacement laptop has high-end specs matching a desktop, trading some portability for power."},
    {q:"Which is NOT one of the 9 features of digital devices?", o:["Portability","Programming language","Connectivity","Security features"], a:1, e:"The 9 features are: portability, performance, storage, UI, connectivity, media support, energy, expansion, security."},
    {q:"A SIM card is used to:", o:["Connect to Wi-Fi","Authenticate a phone to a mobile network operator","Store photos","Increase battery life"], a:1, e:"The SIM (Subscriber Identity Module) authenticates the phone to the cellular network so calls and mobile data work."}
  ],
  2: [
    {q:"Which is the MOST important piece of system software?", o:["Antivirus","Operating system","Word processor","Web browser"], a:1, e:"The OS is the most important — it manages hardware, memory, security, and provides the platform for everything else."},
    {q:"What does 'memory management' refer to as an OS function?", o:["Backing up files","Allocating RAM to running programs","Managing hard disk space","Encrypting data"], a:1, e:"Memory management = allocating RAM to programs so they don't conflict and multiple can run simultaneously."},
    {q:"Which is a feature of open-source software?", o:["Source code hidden","Always free of charge","Source code viewable and modifiable","Officially supported by manufacturer"], a:2, e:"Open-source means source code is public and may be modified/redistributed."},
    {q:"Print spooling allows users to:", o:["Print in colour","Print at higher quality","Continue working while documents print","Print multiple copies at once"], a:2, e:"Print spooling queues jobs so the printer works in the background — user can carry on with other tasks."},
    {q:"Which is NOT a risk of failing to update software?", o:["Vulnerability to malware","Unfixed bugs causing crashes","File incompatibility","Higher electricity bills"], a:3, e:"Updates protect from malware, fix bugs, and keep files compatible. They don't affect power consumption."},
    {q:"Antivirus software is an example of:", o:["Application software","Utility software","Programming language","Operating system"], a:1, e:"Antivirus is utility software — system tools that perform specific maintenance or security tasks."}
  ],
  3: [
    {q:"Which input device reads multiple-choice exam answer sheets?", o:["OCR","OMR","Barcode scanner","Biometric scanner"], a:1, e:"OMR (Optical Mark Recognition) detects whether marks have been made at specific positions on the page."},
    {q:"How many bytes are in 1 KiB?", o:["1,000","1,024","1,048,576","10,000"], a:1, e:"1 KiB (kibibyte) = 2^10 = 1,024 bytes. Binary units use x1024, not x1000."},
    {q:"Which storage media has NO moving parts and is most durable?", o:["HDD","Optical disc","SSD","Magnetic tape"], a:2, e:"SSDs use flash memory chips with no moving parts — durable against physical shock."},
    {q:"A recordable CD-R can be:", o:["Written many times","Written only once","Written but not read","Read but not written"], a:1, e:"Recordable (R) means write-once. Rewritable (RW) means erasable and rewritable many times."},
    {q:"Which output device draws large engineering plans with a pen?", o:["Laser printer","Inkjet printer","Plotter","3D printer"], a:2, e:"A plotter uses pens to draw large vector graphics — ideal for engineering and architectural plans."},
    {q:"Which best describes the difference between a 'storage device' and 'storage media'?", o:["They mean the same thing","Device = hardware reader; media = material data is stored on","Device = older; media = newer","Device = small; media = large"], a:1, e:"The storage device is the unit that reads/writes; the media is what's actually written on (disc, tape, chip)."}
  ],
  4: [
    {q:"What does it mean for memory to be 'volatile'?", o:["It can explode","It loses contents when power off","It is very large","It cannot be modified"], a:1, e:"Volatile memory loses contents when power is removed. RAM is volatile; ROM is non-volatile."},
    {q:"Which stage of the fetch-decode-execute cycle uses the ALU?", o:["Fetch","Decode","Execute","Store"], a:2, e:"The Execute stage is where the ALU performs the arithmetic or logical operation."},
    {q:"A user complains their computer is slow with many programs open. The BEST upgrade is:", o:["Larger HDD","More RAM","Faster optical drive","Bigger monitor"], a:1, e:"More RAM lets more programs stay in fast memory, avoiding slow disk swaps."},
    {q:"Where are BIOS instructions stored?", o:["RAM","Cache","ROM","Hard drive"], a:2, e:"BIOS is stored in ROM so it persists when power is off and runs before the OS loads."},
    {q:"Which is NOT a factor affecting CPU speed?", o:["Clock speed","Number of cores","Cache size","Monitor resolution"], a:3, e:"Monitor resolution affects display quality but not CPU speed. Clock speed, cores and cache all directly affect performance."},
    {q:"Flash memory differs from ROM because:", o:["It is volatile","It can be rewritten","It is faster than RAM","It needs constant power"], a:1, e:"Both flash and ROM are non-volatile, but flash CAN be rewritten by users; ROM is fixed at manufacture."}
  ],
  5: [
    {q:"A network covering a single building owned by one organisation is a:", o:["WAN","LAN","PAN","MAN"], a:1, e:"A LAN (Local Area Network) covers a single site, typically owned by one organisation."},
    {q:"For wireless headphones connecting to a phone, the BEST technology is:", o:["Wi-Fi","Bluetooth","NFC","4G"], a:1, e:"Bluetooth is designed for short-range device-to-device pairing — uses less power than Wi-Fi and is the standard for audio peripherals."},
    {q:"The role of a router is to:", o:["Store files","Filter viruses","Direct data between networks","Encrypt data"], a:2, e:"A router directs data packets between different networks — most commonly between your LAN and the internet via your ISP."},
    {q:"Which BEST describes bandwidth?", o:["Delay between sending and response","Maximum data per second","Signal strength","Cost of internet"], a:1, e:"Bandwidth is the maximum data transmitted per second. Latency is delay; they are different things."},
    {q:"For contactless payment, the technology used is:", o:["Wi-Fi","Bluetooth","NFC","GPS"], a:2, e:"NFC (Near-Field Communication) operates over <10cm, making it secure and ideal for contactless payment."},
    {q:"A WAP creates:", o:["A wired connection","A Wi-Fi zone for wireless devices","A backup of data","An encrypted tunnel"], a:1, e:"A WAP (Wireless Access Point) creates a Wi-Fi zone, allowing wireless devices to join a wired network."}
  ],
  6: [
    {q:"In a peer-to-peer network:", o:["A dedicated server controls everything","All computers are equal","Only one computer can be used","Internet is shared via cellular"], a:1, e:"In peer-to-peer (P2P), all devices are equal — each can act as both client and server. Best for small homes."},
    {q:"Which technique silently redirects users to a fake website?", o:["Phishing","Pharming","Spoofing","Hacking"], a:1, e:"Pharming silently manipulates DNS to redirect users — no user mistake needed. Phishing requires user action."},
    {q:"A transaction log is most useful for:", o:["Speeding up the network","Recording system actions for security analysis","Encrypting data","Reducing power use"], a:1, e:"A transaction log records all actions on a system — vital for tracing what happened after a security incident."},
    {q:"WPA2 is used for:", o:["Wired LAN security","Wi-Fi encryption","Firewall rules","Backing up data"], a:1, e:"WPA2/WPA3 are Wi-Fi Protected Access standards used to encrypt wireless network traffic."},
    {q:"Multi-Factor Authentication (MFA) improves security because:", o:["Uses only passwords","Requires two or more different proofs of identity","Makes login faster","Encrypts all files"], a:1, e:"MFA requires multiple different proofs (e.g. password + phone code), making unauthorised access much harder."},
    {q:"A firewall:", o:["Backs up your files","Filters network traffic by rules","Encrypts your data","Detects viruses"], a:1, e:"A firewall monitors and filters incoming/outgoing network traffic based on security rules."}
  ],
  7: [
    {q:"Which type of attack does NOT require a mistake from the user?", o:["Phishing","Pharming","Spam","Social engineering"], a:1, e:"Pharming silently redirects users via DNS attack — no clicking needed. The others all require user action."},
    {q:"A DISADVANTAGE of working from home for an employer is:", o:["Smaller office costs","Wider talent pool","Lower overheads","Harder to manage staff"], a:3, e:"Managing remote staff is harder — meetings, oversight, and communication become more difficult."},
    {q:"Under GDPR, the 'right to be forgotten' means:", o:["Forgetting your password","Deleting your search history","Requesting your personal data be deleted","Forgetting to log out"], a:2, e:"The right to erasure means individuals can request organisations delete their personal data."},
    {q:"RSI (Repetitive Strain Injury) is caused by:", o:["Looking at the screen","Long typing or mouse use","Hot rooms","Reading too much"], a:1, e:"RSI is caused by repetitive movements like prolonged typing or mousing — combined with poor posture."},
    {q:"The 'digital divide' refers to:", o:["Computer skills gap","Gap between those with and without good internet/devices","Hardware vs software","Different operating systems"], a:1, e:"The digital divide is the gap between people with good access to digital technology and the internet, and those who lack it."}
  ],
  8: [
    {q:"Which of these is a Virtual Learning Environment (VLE)?", o:["Facebook","Google Classroom","TikTok","Pinterest"], a:1, e:"A VLE delivers courses and educational resources online. Google Classroom and Moodle are examples."},
    {q:"What does the 'A' in CRAAB stand for (both times)?", o:["Age and Authenticity","Authority and Accuracy","Audience and Argument","Author and Article"], a:1, e:"CRAAB = Currency, Relevance, Authority, Accuracy, Bias. The two A's are Authority and Accuracy."},
    {q:"An AUP (Acceptable Use Policy) is:", o:["A type of antivirus","A document users agree to defining behaviour rules","A wireless protocol","A backup procedure"], a:1, e:"An AUP defines what users may and may not do on a network/system. Users agree to it before access."},
    {q:"The BEST way to avoid plagiarism is to:", o:["Copy and paste","Paraphrase without citing","Quote OR paraphrase AND cite sources","Use only your own ideas"], a:2, e:"To avoid plagiarism you must paraphrase or quote AND credit the original source with a citation."},
    {q:"Beware of misrepresentation online because:", o:["Forums are illegal","People may not be who they claim to be","Forums use too much bandwidth","Forums require payment"], a:1, e:"Online, people can pretend to be anyone — always be cautious about personal info and meeting up."}
  ],
  9: [
    {q:"A 'persistent cookie' is:", o:["Deleted when browser closes","One that stays until expiry date","One that cannot be deleted","An edible biscuit"], a:1, e:"Persistent cookies remain on your device until their expiry date — used for tracking across sessions."},
    {q:"Google Docs is an example of:", o:["SaaS","PaaS","IaaS","LAN"], a:0, e:"Google Docs is Software as a Service (SaaS) — a complete application delivered over the internet."},
    {q:"A disadvantage of cloud storage is:", o:["Automatic backup","Access from anywhere","No access without internet","Scalable capacity"], a:2, e:"Without an internet connection, you cannot access cloud-stored files — a key disadvantage versus local."},
    {q:"Targeted marketing uses data about:", o:["Only your name","Pages visited, items viewed, purchases, location","Just your email","Only your password"], a:1, e:"Targeted marketing builds a detailed profile from browsing behaviour, purchases, location and demographics."},
    {q:"Renting cloud-based virtual servers is:", o:["SaaS","PaaS","IaaS","Email server"], a:2, e:"Infrastructure as a Service (IaaS) is rental of computing infrastructure — virtual machines, storage, networks."}
  ],
  10: [
    {q:"In a database, a 'primary key' must be:", o:["The largest field","Unique to each record","Always a number","Encrypted"], a:1, e:"A primary key uniquely identifies each record — no two records can share the same primary key value."},
    {q:"To count cells in column B containing 'Pass':", o:["=COUNT(B:B)","=COUNTA(B:B)","=COUNTIF(B:B,\"Pass\")","=SUM(B:B)"], a:2, e:"COUNTIF counts cells matching a condition. =COUNTIF(B:B,\"Pass\") counts every 'Pass' in column B."},
    {q:"In =$A$1*B2 copied down, $A$1 will:", o:["Change to $A$2","Change to A1","Stay as $A$1","Become #REF!"], a:2, e:"The $ signs make $A$1 absolute — it stays fixed when copied. B2 (relative) would change to B3, B4, etc."},
    {q:"Which chart type is BEST for showing percentages of a whole?", o:["Line","Pie","Scatter","Bar"], a:1, e:"Pie charts show parts of a whole — percentages adding to 100%. Best with few categories at one point in time."},
    {q:"A vector image is BEST for:", o:["Photographs","Realistic portraits","Logos that scale to any size","Screenshots"], a:2, e:"Vector images use mathematical descriptions — they scale to any size without quality loss. Ideal for logos."},
    {q:"Validation checks:", o:["Data is correct","Data is in the right format","The user is trustworthy","The hardware is working"], a:1, e:"Validation checks if data is in the right FORMAT (range, type, length, presence). It can't tell if data is true."}
  ]
};

// Expose to other scripts
if (typeof window !== 'undefined') {
  window.CHAPTERS = CHAPTERS;
  window.GLOSSARY = GLOSSARY;
  window.QUIZ = QUIZ;
}
