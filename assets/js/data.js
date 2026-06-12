/* ═══════════════════════════════════════════════════════════════════════════
   EDEXCEL GCSE (9-1) COMPUTER SCIENCE 4CP0 — DATA FILE
   Chapter metadata, glossary terms, and quiz questions
   ═══════════════════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  {
    id: 1, paper: 1, file: "chapter-1.html",
    title: "Decomposition & Abstraction",
    spec: "Spec 1.2",
    color: "#7C3AED", colorDark: "#5B21B6", colorLight: "#EDE9FE",
    summary: "Breaking problems into parts, removing unnecessary detail, analysing problems computationally.",
    sections: 6
  },
  {
    id: 2, paper: 1, file: "chapter-2.html",
    title: "Algorithms: Flowcharts, Pseudocode & Trace Tables",
    spec: "Spec 1.1",
    color: "#2563EB", colorDark: "#1E40AF", colorLight: "#DBEAFE",
    summary: "Expressing algorithms, flowchart symbols, pseudocode, tracing execution, finding & fixing errors.",
    sections: 7
  },
  {
    id: 3, paper: 1, file: "chapter-3.html",
    title: "Searching, Sorting & Truth Tables",
    spec: "Spec 1.1 & 4.3",
    color: "#0891B2", colorDark: "#155E75", colorLight: "#CFFAFE",
    summary: "Linear & binary search, bubble & merge sort, algorithm efficiency, AND/OR/NOT truth tables.",
    sections: 7
  },
  {
    id: 4, paper: 1, file: "chapter-4.html",
    title: "Binary & Number Systems",
    spec: "Spec 3.1",
    color: "#059669", colorDark: "#065F46", colorLight: "#D1FAE5",
    summary: "Binary ↔ denary ↔ hexadecimal, two's complement, binary addition, overflow, logical & arithmetic shifts.",
    sections: 7
  },
  {
    id: 5, paper: 1, file: "chapter-5.html",
    title: "Data Representation: Text, Images & Sound",
    spec: "Spec 3.2",
    color: "#0D9488", colorDark: "#115E59", colorLight: "#CCFBF1",
    summary: "ASCII character set, bitmap images, colour depth & resolution, sound sampling, file size calculations.",
    sections: 6
  },
  {
    id: 6, paper: 1, file: "chapter-6.html",
    title: "Storage, Compression & Encryption",
    spec: "Spec 3.3 & 3.4",
    color: "#CA8A04", colorDark: "#854D0E", colorLight: "#FEF9C3",
    summary: "Data storage units, lossless & lossy compression, run-length encoding, Caesar cipher encryption.",
    sections: 6
  },
  {
    id: 7, paper: 1, file: "chapter-7.html",
    title: "Hardware: CPU, Memory & Storage",
    spec: "Spec 4.1 & 4.2",
    color: "#EA580C", colorDark: "#9A3412", colorLight: "#FFEDD5",
    summary: "Von Neumann architecture, fetch-decode-execute, RAM/ROM/cache, secondary storage, embedded systems.",
    sections: 7
  },
  {
    id: 8, paper: 1, file: "chapter-8.html",
    title: "Software & Programming Languages",
    spec: "Spec 4.4 & 4.5",
    color: "#DC2626", colorDark: "#991B1B", colorLight: "#FEE2E2",
    summary: "Operating system functions, utility software, high vs low-level languages, compilers & interpreters.",
    sections: 6
  },
  {
    id: 9, paper: 1, file: "chapter-9.html",
    title: "Networks: Types, Topologies & Protocols",
    spec: "Spec 5.1 & 5.3",
    color: "#DB2777", colorDark: "#9D174D", colorLight: "#FCE7F3",
    summary: "LAN/WAN, wired & wireless media, bus/star/mesh topologies, TCP/IP layers, protocols, speed calculations.",
    sections: 7
  },
  {
    id: 10, paper: 1, file: "chapter-10.html",
    title: "Network Security & Cyberattacks",
    spec: "Spec 5.2",
    color: "#4F46E5", colorDark: "#3730A3", colorLight: "#E0E7FF",
    summary: "Social engineering, malware types, DoS & SQL injection, penetration testing, layers of protection.",
    sections: 6
  },
  {
    id: 11, paper: 1, file: "chapter-11.html",
    title: "Issues & Impact: Environment, Ethics & Law",
    spec: "Spec 6.1",
    color: "#475569", colorDark: "#1E293B", colorLight: "#F1F5F9",
    summary: "Environment, privacy & inclusion, intellectual property & licensing, and emerging trends: AI, quantum, DNA computing, nanotechnology.",
    sections: 6
  },
  {
    id: 12, paper: 2, file: "chapter-12.html",
    title: "Python Programming",
    spec: "Topic 2",
    color: "#15803D", colorDark: "#14532D", colorLight: "#DCFCE7",
    summary: "Variables & data types, selection, loops, lists & 2D lists, strings, functions, file handling, validation & testing.",
    sections: 8
  }
];

/* ═══════════════════════════════════════════════════════════════════════════
   GLOSSARY — 120+ terms across the 4CP0 specification
   ═══════════════════════════════════════════════════════════════════════════ */

const GLOSSARY = [
  {t:"Abstraction", d:"Removing or hiding unnecessary detail so that a problem can be focused on its essential features (e.g. a Tube map ignores real distances).", ch:1},
  {t:"Algorithm", d:"A precise, step-by-step sequence of instructions that solves a problem or performs a task. Can be written as a flowchart, pseudocode or program code.", ch:2},
  {t:"ALU", d:"Arithmetic Logic Unit. The CPU component that performs arithmetic (add, subtract) and logical (AND, OR, NOT, comparisons) operations.", ch:7},
  {t:"Anti-malware", d:"Utility software that scans for, detects, quarantines and removes malicious software such as viruses, worms and trojans.", ch:10},
  {t:"Argument", d:"The actual value passed into a subprogram when it is called. Received by the subprogram as a parameter.", ch:12},
  {t:"Arithmetic shift", d:"A binary shift that preserves the sign bit; used for multiplying or dividing signed (two's complement) numbers by powers of 2.", ch:4},
  {t:"ASCII", d:"American Standard Code for Information Interchange. A 7-bit character set giving each character a unique binary code (e.g. 'A' = 65).", ch:5},
  {t:"Authentication", d:"Verifying the identity of a user before granting access — passwords, biometrics, two-factor codes.", ch:10},
  {t:"Bandwidth", d:"The maximum amount of data that can be transmitted across a network per second; measured in bits per second (bps, Mbps, Gbps).", ch:9},
  {t:"Binary", d:"Base-2 number system using only the digits 0 and 1. All data and instructions in a computer are stored in binary.", ch:4},
  {t:"Binary search", d:"A search algorithm for SORTED lists: repeatedly compare the middle item and discard half the list each time. Much faster than linear search for large lists.", ch:3},
  {t:"Bit", d:"A single binary digit: 0 or 1. The smallest unit of data a computer can store.", ch:4},
  {t:"Bit depth (sound)", d:"The number of bits used to store each audio sample. Higher bit depth = more accurate amplitude values = larger files.", ch:5},
  {t:"Bitmap image", d:"An image stored as a grid of pixels, with each pixel's colour stored as a binary value.", ch:5},
  {t:"Boolean", d:"A data type with only two possible values: True or False.", ch:12},
  {t:"Bubble sort", d:"A sorting algorithm that repeatedly steps through the list, comparing adjacent pairs and swapping them if out of order, until a full pass makes no swaps.", ch:3},
  {t:"Bus (network) topology", d:"All devices share one central cable (the bus). Cheap but a main-cable failure stops the whole network and traffic causes collisions.", ch:9},
  {t:"Bus (CPU)", d:"A set of wires that carries data, addresses and control signals between CPU components and memory.", ch:7},
  {t:"Byte", d:"8 bits. Typically stores one ASCII character.", ch:4},
  {t:"Cache", d:"Very fast, small memory close to the CPU holding frequently used instructions/data so the CPU doesn't wait for slower RAM.", ch:7},
  {t:"Caesar cipher", d:"A simple substitution cipher that shifts each letter of the plaintext a fixed number of places along the alphabet (the key).", ch:6},
  {t:"Cloud storage", d:"Storing data on remote servers accessed via the internet. Convenient and scalable, but needs a connection and raises security considerations.", ch:7},
  {t:"Casting", d:"Converting a value from one data type to another, e.g. int(\"7\") or str(42) in Python.", ch:12},
  {t:"Character set", d:"The complete collection of characters a computer can represent, each mapped to a unique binary code (e.g. ASCII).", ch:5},
  {t:"Clock (CPU)", d:"The component that synchronises CPU operations by sending out regular electrical pulses; speed measured in hertz (GHz).", ch:7},
  {t:"Colour depth", d:"The number of bits used per pixel in a bitmap. More bits = more available colours = larger file size. n bits gives 2^n colours.", ch:5},
  {t:"Compiler", d:"A translator that converts the whole high-level program into machine code in one go, producing an executable file. Errors reported after compiling.", ch:8},
  {t:"Compression", d:"Reducing file size so files need less storage and transfer faster. Lossless keeps all data; lossy permanently discards some.", ch:6},
  {t:"Computational thinking", d:"Solving problems the way a computer scientist does: decomposition, abstraction, pattern recognition and algorithm design.", ch:1},
  {t:"Computer Misuse Act 1990", d:"UK law making unauthorised access to computer material, unauthorised access with intent, and unauthorised modification (e.g. spreading malware) illegal.", ch:11},
  {t:"Control unit (CU)", d:"CPU component that decodes instructions and coordinates the fetch-decode-execute cycle, sending control signals to other components.", ch:7},
  {t:"Copyright, Designs and Patents Act 1988", d:"UK law protecting original works (including software and code) from being copied or distributed without permission.", ch:11},
  {t:"CPU", d:"Central Processing Unit. Executes program instructions using the fetch-decode-execute cycle. Contains the CU, ALU and registers.", ch:7},
  {t:"Data Protection Act 2018", d:"UK law (implementing GDPR) controlling how organisations collect, store and process personal data. Gives individuals rights over their data.", ch:11},
  {t:"Decomposition", d:"Breaking a large problem down into smaller, more manageable sub-problems that can be solved independently.", ch:1},
  {t:"Denary", d:"Base-10 number system (digits 0–9) used by humans in everyday life. Also called decimal.", ch:4},
  {t:"Denial of Service (DoS)", d:"A cyberattack that floods a server with bogus requests so genuine users cannot access the service.", ch:10},
  {t:"DNS", d:"Domain Name Service — translates human-readable domain names (example.com) into IP addresses so data can be routed.", ch:9},
  {t:"Embedded system", d:"A computer system with a dedicated function built into a larger device (washing machine, car braking system). Uses a microcontroller; software stored in ROM.", ch:7},
  {t:"Encryption", d:"Scrambling data using an algorithm and key so it cannot be understood if intercepted; only someone with the key can decrypt it.", ch:6},
  {t:"Ethernet", d:"The standard for wired local area networks, using copper or fibre cables.", ch:9},
  {t:"Fetch-decode-execute cycle", d:"The repeating CPU process: fetch the next instruction from main memory, decode it in the control unit, execute it.", ch:7},
  {t:"Field", d:"A single item of data in a record, e.g. one column of a row in a data file.", ch:12},
  {t:"File size (image)", d:"width (px) × height (px) × colour depth (bits), converted to bytes by dividing by 8.", ch:5},
  {t:"File size (sound)", d:"sample rate × bit depth × duration (seconds), in bits; divide by 8 for bytes.", ch:5},
  {t:"Firewall", d:"Hardware or software that monitors incoming/outgoing network traffic and blocks anything that breaks its rules.", ch:10},
  {t:"Flowchart", d:"A diagram representing an algorithm using standard symbols: terminator, process, decision, input/output, subprogram.", ch:2},
  {t:"Function", d:"A subprogram that returns a value to the code that called it.", ch:12},
  {t:"Global variable", d:"A variable declared outside any subprogram, accessible from anywhere in the program. Use sparingly — harder to debug.", ch:12},
  {t:"GDPR", d:"General Data Protection Regulation — EU-wide data protection law implemented in the UK by the Data Protection Act 2018.", ch:11},
  {t:"Hexadecimal", d:"Base-16 number system using digits 0–9 and A–F. One hex digit represents exactly 4 bits, making binary easier for humans to read.", ch:4},
  {t:"IEC storage units", d:"Binary multiples: kibibyte KiB = 2^10 B, mebibyte MiB = 2^20, gibibyte GiB = 2^30, tebibyte TiB = 2^40. Decimal multiples: kB = 10^3, MB = 10^6, GB = 10^9, TB = 10^12.", ch:6},
  {t:"High-level language", d:"A programming language (Python, Java) using English-like keywords; portable, easier to write/debug, must be translated to machine code.", ch:8},
  {t:"HTTP / HTTPS", d:"HyperText Transfer Protocol — used to request and deliver web pages. HTTPS adds encryption so data cannot be read if intercepted.", ch:9},
  {t:"IDE", d:"Integrated Development Environment. Software for writing programs: editor, run/translate tools, debugger, error highlighting.", ch:12},
  {t:"IMAP", d:"Internet Message Access Protocol — retrieves email while keeping messages synchronised on the server across devices.", ch:9},
  {t:"Integer", d:"A whole-number data type, positive or negative, e.g. -3, 0, 42.", ch:12},
  {t:"Internet", d:"A global network of interconnected networks. The web (WWW) is a service that runs on it.", ch:9},
  {t:"Interpreter", d:"A translator that converts and executes a high-level program one line at a time. Stops at the first error; no executable file produced.", ch:8},
  {t:"IPv4 / IPv6", d:"IP addressing standards. IPv4 uses four numbers 0-255 separated by dots (192.168.1.1); IPv6 uses eight groups of hex digits, giving vastly more addresses.", ch:9},
  {t:"IP address", d:"A unique numerical address identifying a device on a network so data can be routed to it.", ch:9},
  {t:"Iteration", d:"Repeating a block of code: count-controlled (for) or condition-controlled (while) loops.", ch:12},
  {t:"LAN", d:"Local Area Network. Connects devices over a small geographical area (one building/site), usually owned by one organisation.", ch:9},
  {t:"Latency", d:"The delay between sending data and it arriving, measured in milliseconds. Lower is better.", ch:9},
  {t:"Linear search", d:"Check each item in the list one by one, from the start, until the target is found or the list ends. Works on unsorted lists.", ch:3},
  {t:"List", d:"A data structure storing an ordered, indexed collection of values, e.g. scores = [12, 9, 17].", ch:12},
  {t:"Local variable", d:"A variable declared inside a subprogram, existing only while that subprogram runs. Preferred over global variables.", ch:12},
  {t:"Logic error", d:"An error where the program runs but produces the wrong result (e.g. using > instead of >=). Found by testing, not by the translator.", ch:2},
  {t:"Logical operator", d:"AND (both true), OR (at least one true), NOT (inverts) — used to build conditions and truth tables.", ch:3},
  {t:"Logical shift", d:"Moving all bits left or right, filling vacated positions with 0. Left shift ×2 per place; right shift ÷2 per place (unsigned).", ch:4},
  {t:"Lossless compression", d:"Compression where the original data can be perfectly reconstructed (e.g. run-length encoding, ZIP, PNG). Essential for text and code.", ch:6},
  {t:"Lossy compression", d:"Compression that permanently removes data the user is unlikely to notice (JPEG, MP3). Smaller files, but the original can never be restored.", ch:6},
  {t:"Low-level language", d:"Machine code or assembly language. Close to the hardware, fast, but hard to write and specific to one processor type.", ch:8},
  {t:"MAC address", d:"A unique hardware address assigned to a network interface card at manufacture.", ch:9},
  {t:"Machine code", d:"Binary instructions executed directly by the CPU. The only language a processor understands.", ch:8},
  {t:"Magnetic storage", d:"Secondary storage using magnetised platters (hard disk drives) or tape. High capacity, low cost per GB, but moving parts make it fragile.", ch:7},
  {t:"Malware", d:"Malicious software: viruses (attach to files), worms (self-replicate across networks), trojans (disguised as legitimate software), ransomware, spyware, keyloggers.", ch:10},
  {t:"Merge sort", d:"A divide-and-conquer sort: repeatedly split the list in half until single items remain, then merge the halves back together in order. Efficient for large lists.", ch:3},
  {t:"Mesh topology", d:"Every node connects to several others (full or partial mesh). Very fault-tolerant — data can re-route — but expensive to cable.", ch:9},
  {t:"Most significant bit (MSB)", d:"The leftmost bit. In two's complement it acts as the sign bit: 1 means negative.", ch:4},
  {t:"Nibble", d:"4 bits — half a byte. One hexadecimal digit represents one nibble.", ch:4},
  {t:"Operating system", d:"Software managing the computer: file management, process management, peripheral management (drivers), memory management, user management and security.", ch:8},
  {t:"Optical storage", d:"CD/DVD/Blu-ray. Data stored as pits and lands read by laser. Cheap and portable, but slow and low capacity.", ch:7},
  {t:"Overflow error", d:"When the result of a calculation needs more bits than are available (e.g. an 8-bit addition resulting in a 9-bit answer).", ch:4},
  {t:"Parameter", d:"A variable in a subprogram definition that receives a value (argument) when the subprogram is called.", ch:12},
  {t:"PAN", d:"Personal Area Network — a very short-range network around one person, e.g. a phone paired with earbuds and a smartwatch via Bluetooth.", ch:9},
  {t:"Penetration testing", d:"Authorised testing of a system by deliberately probing for security weaknesses before real attackers find them.", ch:10},
  {t:"Pharming", d:"A cyberattack that silently redirects users from a legitimate website to a fake one (e.g. by DNS manipulation) to steal their details.", ch:10},
  {t:"Phishing", d:"Social engineering attack: fake emails/messages impersonating trusted organisations to trick users into revealing credentials or clicking malicious links.", ch:10},
  {t:"Pixel", d:"Picture element — one dot in a bitmap image. Each pixel's colour is stored as a binary number.", ch:5},
  {t:"POP3", d:"Post Office Protocol 3 — downloads email from a server to one device, typically deleting the server copy.", ch:9},
  {t:"Procedure", d:"A subprogram that performs a task but does not return a value.", ch:12},
  {t:"Process management", d:"OS function that schedules CPU time between running programs (processes), enabling multitasking.", ch:8},
  {t:"Protocol", d:"An agreed set of rules governing how devices communicate, e.g. TCP/IP, HTTP, FTP, SMTP.", ch:9},
  {t:"Pseudocode", d:"A structured way of writing algorithms that resembles code. Edexcel 4CP0 exams use a published pseudocode command set (SET...TO, SEND...TO DISPLAY, RECEIVE...FROM).", ch:2},
  {t:"RAM", d:"Random Access Memory — volatile main memory holding running programs and their data. Contents lost when power is off.", ch:7},
  {t:"Ransomware", d:"Malware that encrypts a victim's files and demands payment for the decryption key.", ch:10},
  {t:"Real (float)", d:"A data type for numbers with a fractional part, e.g. 3.14, -0.5.", ch:12},
  {t:"Record", d:"A collection of related fields treated as one unit, e.g. one line of a CSV file about one student.", ch:12},
  {t:"Register", d:"A tiny, extremely fast storage location inside the CPU holding one value during processing (e.g. the program counter).", ch:7},
  {t:"Resolution", d:"The number of pixels in an image (width × height). Higher resolution = more detail = larger file.", ch:5},
  {t:"ROM", d:"Read Only Memory — non-volatile memory containing the bootstrap/startup instructions. Contents survive power-off and cannot normally be changed.", ch:7},
  {t:"Sign and magnitude", d:"A way of representing signed integers: the MSB is the sign (0 = positive, 1 = negative) and the remaining bits give the size of the number.", ch:4},
  {t:"Router", d:"A device that forwards data packets between different networks, e.g. between a home LAN and the internet.", ch:9},
  {t:"Run-length encoding (RLE)", d:"Lossless compression storing repeated values as a (count, value) pair, e.g. WWWWWBB → 5W2B.", ch:6},
  {t:"Runtime error", d:"An error that occurs while the program is running, e.g. dividing by zero or accessing an index out of range.", ch:12},
  {t:"Sample rate", d:"The number of times per second an analogue sound wave is measured (sampled), in hertz. CD quality = 44,100 Hz.", ch:5},
  {t:"Selection", d:"Choosing which code branch to run based on a condition: if / elif / else.", ch:12},
  {t:"Sequence", d:"Program instructions executed one after another, in order.", ch:12},
  {t:"Shoulder surfing", d:"Watching someone enter a PIN or password over their shoulder — a social engineering technique.", ch:10},
  {t:"SMTP", d:"Simple Mail Transfer Protocol — used to SEND email between mail servers.", ch:9},
  {t:"Social engineering", d:"Manipulating people (rather than machines) into giving away access or information — phishing, pretexting, shoulder surfing.", ch:10},
  {t:"Solid state storage", d:"Flash-memory secondary storage (SSDs, USB sticks, SD cards). No moving parts: fast, durable, silent, but dearer per GB.", ch:7},
  {t:"SQL injection", d:"Entering malicious SQL code into an input box to trick a database into revealing or modifying data it shouldn't.", ch:10},
  {t:"Star topology", d:"Every device connects to a central switch. A cable failure affects only one device, but if the switch fails the network stops.", ch:9},
  {t:"String", d:"A data type holding a sequence of characters, e.g. \"hello\". Indexed from 0; can be sliced and concatenated.", ch:12},
  {t:"Subprogram", d:"A named, self-contained block of code (function or procedure) that can be called from elsewhere. Aids decomposition and reuse.", ch:12},
  {t:"Switch", d:"A LAN device that forwards frames only to the specific device they are addressed to, using MAC addresses.", ch:9},
  {t:"Syntax error", d:"Code that breaks the grammar rules of the language (missing bracket, misspelt keyword) so it will not translate/run.", ch:2},
  {t:"TCP/IP", d:"The protocol stack of the internet. Organised in four layers: application, transport, network, data link.", ch:9},
  {t:"Trace table", d:"A table recording the value of each variable line by line as an algorithm executes — used to find logic errors.", ch:2},
  {t:"Truth table", d:"A table listing every combination of inputs to a logic statement and the resulting output.", ch:3},
  {t:"Unicode", d:"A character set covering virtually every writing system. Uses more bits per character than ASCII, so it represents many more characters.", ch:5},
  {t:"Two's complement", d:"A way of representing signed integers in binary. The MSB has a negative place value (e.g. -128 in 8 bits).", ch:4},
  {t:"Unauthorised access", d:"Gaining access to a computer system without permission (hacking) — illegal under the Computer Misuse Act 1990.", ch:10},
  {t:"Utility software", d:"Software that maintains or protects the system: anti-malware, backup, defragmentation, compression tools.", ch:8},
  {t:"Validation", d:"Automatic checks that input data is sensible/allowed before accepting it: range check, presence check, length check, type check.", ch:12},
  {t:"Variable", d:"A named location in memory storing a value that can change while the program runs.", ch:12},
  {t:"Virus", d:"Malware that attaches itself to files and replicates when the infected file is opened or run.", ch:10},
  {t:"Vigenère cipher", d:"A polyalphabetic cipher that shifts each letter by an amount given by a repeating keyword — stronger than the Caesar cipher.", ch:6},
  {t:"Virtual memory", d:"Part of secondary storage used as an overflow for RAM when it is full. Allows more programs to run, but swapping is slow.", ch:7},
  {t:"Volatile memory", d:"Memory that loses its contents when power is removed (RAM). Non-volatile memory (ROM, flash) retains contents.", ch:7},
  {t:"Von Neumann architecture", d:"The stored program concept: instructions AND data held together in main memory; the CPU fetches and executes instructions one at a time.", ch:7},
  {t:"WAN", d:"Wide Area Network. Connects LANs over a large geographical area using third-party infrastructure. The internet is the largest WAN.", ch:9},
  {t:"Wi-Fi", d:"Wireless networking using radio waves via a wireless access point. Convenient but slower and less secure than cable.", ch:9},
  {t:"Worm", d:"Malware that self-replicates and spreads across networks without needing a host file or user action.", ch:10}
];

/* ═══════════════════════════════════════════════════════════════════════════
   QUIZ QUESTIONS — chapter-end quizzes (6 per chapter)
   ═══════════════════════════════════════════════════════════════════════════ */

const QUIZ = {
  1: [
    {q:"What is decomposition?", o:["Removing unnecessary detail from a problem","Breaking a problem into smaller sub-problems","Writing a program in Python","Testing a program for errors"], a:1, e:"Decomposition breaks a large problem into smaller, manageable parts that can be solved (and even programmed) separately."},
    {q:"What is abstraction?", o:["Breaking a problem into parts","Removing or hiding unnecessary detail","Converting denary to binary","Repeating instructions in a loop"], a:1, e:"Abstraction focuses on what matters by removing irrelevant detail — like a Tube map ignoring real distances and street layouts."},
    {q:"A London Underground map is a classic example of:", o:["Decomposition","Iteration","Abstraction","Validation"], a:2, e:"The map abstracts away distances, geography and street detail, keeping only stations and connections — exactly what a passenger needs."},
    {q:"Splitting a game into 'draw screen', 'handle input' and 'update score' tasks is:", o:["Abstraction","Decomposition","Compression","Encryption"], a:1, e:"The problem has been decomposed into sub-problems, each of which could become a subprogram."},
    {q:"Which is a benefit of decomposition when programming in a team?", o:["The program runs faster","Different people can work on different sub-problems at the same time","No testing is needed","The code needs no comments"], a:1, e:"Once decomposed, sub-problems can be developed and tested independently — ideal for teamwork."},
    {q:"Which question would abstraction help you answer when modelling a school timetable?", o:["What colour should the timetable be?","Which details (rooms, teachers, periods) are essential and which can be ignored?","How fast is the school Wi-Fi?","Which printer to use?"], a:1, e:"Abstraction is about deciding which details are essential to the model and discarding the rest."}
  ],
  2: [
    {q:"Which flowchart symbol shows a decision?", o:["Rectangle","Parallelogram","Diamond","Oval"], a:2, e:"Diamond = decision (yes/no branch). Rectangle = process, parallelogram = input/output, oval = start/stop."},
    {q:"A parallelogram in a flowchart represents:", o:["A process","Input or output","A decision","Start or stop"], a:1, e:"Parallelograms show input (e.g. ask the user) or output (e.g. display a message)."},
    {q:"What is a trace table used for?", o:["Designing the user interface","Recording variable values step by step to follow an algorithm's execution","Encrypting data","Measuring network speed"], a:1, e:"Trace tables track each variable line by line — the standard way to find logic errors and predict output."},
    {q:"A program runs but gives the wrong answer. This is a:", o:["Syntax error","Logic error","Runtime crash","Compression error"], a:1, e:"Logic errors don't stop the program — it runs, but the algorithm itself is wrong, so the output is incorrect."},
    {q:"A missing closing bracket in code causes a:", o:["Logic error","Syntax error","Overflow error","Validation error"], a:1, e:"Breaking the grammar rules of the language is a syntax error — the translator refuses to run the line."},
    {q:"Pseudocode is best described as:", o:["A real programming language","A structured, language-neutral way of writing algorithms","Machine code","A flowchart symbol"], a:1, e:"Pseudocode expresses the logic of an algorithm without the strict syntax of a real language."}
  ],
  3: [
    {q:"Which search algorithm requires the list to be sorted first?", o:["Linear search","Binary search","Bubble search","Merge search"], a:1, e:"Binary search repeatedly halves the list around the middle item — that only works if the list is in order."},
    {q:"Binary search on a sorted list of 1000 items needs at most about how many checks?", o:["1000","500","10","100"], a:2, e:"Each comparison halves the list: 2^10 = 1024, so ~10 checks. Linear search could need all 1000."},
    {q:"Bubble sort works by:", o:["Splitting the list in half repeatedly","Comparing adjacent items and swapping if out of order","Choosing a random pivot","Searching from the middle"], a:1, e:"Bubble sort makes repeated passes, swapping adjacent out-of-order pairs until a pass makes no swaps."},
    {q:"Merge sort is described as:", o:["Compare-and-swap","Divide and conquer","Trial and error","First in, first out"], a:1, e:"Merge sort divides the list into halves until single items remain, then merges them back in order."},
    {q:"For the expression A AND B, the output is True when:", o:["Either input is True","Both inputs are True","Both inputs are False","A is False"], a:1, e:"AND only outputs True when BOTH inputs are True."},
    {q:"NOT (True OR False) evaluates to:", o:["True","False","1","Error"], a:1, e:"True OR False = True; NOT True = False. Work brackets first, like in maths."}
  ],
  4: [
    {q:"What is the denary value of binary 1011 0101?", o:["181","165","187","173"], a:0, e:"128+32+16+4+1 = 181."},
    {q:"What is denary 9 in 4-bit binary?", o:["1001","1010","1100","0110"], a:0, e:"9 = 8 + 1 = 1001."},
    {q:"In hexadecimal, the digit F represents:", o:["16","15","14","10"], a:1, e:"Hex digits run 0–9 then A=10 ... F=15."},
    {q:"In 8-bit two's complement, the most significant bit has the value:", o:["+128","-128","+256","-1"], a:1, e:"In two's complement the MSB place value is negative: -128 for 8 bits. A leading 1 means the number is negative."},
    {q:"What happens in an overflow error?", o:["The program loops forever","The result needs more bits than are available","Data is encrypted twice","A file is deleted"], a:1, e:"E.g. adding two 8-bit numbers and getting a 9-bit result — the extra bit cannot be stored."},
    {q:"A logical left shift of 2 places on an unsigned binary number:", o:["Divides it by 2","Divides it by 4","Multiplies it by 4","Has no effect"], a:2, e:"Each left shift multiplies by 2; two places = ×4 (provided no bits fall off the end)."}
  ],
  5: [
    {q:"In ASCII, each character is stored as:", o:["A unique binary code","A pixel","A sound sample","A hexadecimal colour"], a:0, e:"A character set maps each character to a unique binary code — ASCII 'A' is 65 (100 0001)."},
    {q:"If 'B' is 66 in ASCII, what is 'E'?", o:["68","69","70","67"], a:1, e:"ASCII codes are sequential: B=66, C=67, D=68, E=69."},
    {q:"Colour depth is:", o:["The number of pixels in an image","The number of bits used per pixel","The physical size of the screen","The brightness setting"], a:1, e:"Colour depth = bits per pixel. n bits per pixel allows 2^n colours."},
    {q:"How many different colours can 6 bits per pixel represent?", o:["6","12","36","64"], a:3, e:"2^6 = 64 colours."},
    {q:"The file size in bits of a bitmap is calculated by:", o:["width × height × colour depth","width + height + colour depth","width × height ÷ colour depth","sample rate × duration"], a:0, e:"Image file size (bits) = width × height × colour depth. Divide by 8 for bytes."},
    {q:"Increasing the sample rate of a sound recording:", o:["Decreases quality and file size","Increases quality and file size","Only changes the volume","Converts it to analogue"], a:1, e:"More samples per second = closer match to the original wave = better quality but larger file."}
  ],
  6: [
    {q:"How many bytes are in 1 kibibyte (KiB)?", o:["1,000","1,024","8,000","100"], a:1, e:"4CP0 uses both unit systems: binary IEC units (1 KiB = 2^10 = 1,024 B) and decimal units (1 kB = 1,000 B)."},
    {q:"Which compression type allows the original file to be perfectly restored?", o:["Lossy","Lossless","Both","Neither"], a:1, e:"Lossless keeps all the original data (e.g. RLE, ZIP). Lossy permanently discards data (JPEG, MP3)."},
    {q:"Run-length encoding compresses AAAABBBCC to:", o:["4A3B2C","A4B3C2","ABC432","9ABC"], a:0, e:"RLE stores each run as count+value: 4A 3B 2C."},
    {q:"Lossy compression is suitable for:", o:["Program source code","A legal text document","Photographs and music","A spreadsheet of exam marks"], a:2, e:"Small quality losses in photos/audio are barely noticeable. Text and code would be corrupted by losing data."},
    {q:"Using a Caesar cipher with key 3, 'CAB' encrypts to:", o:["FDE","EDC","DCB","ZXY"], a:0, e:"Shift each letter +3: C→F, A→D, B→E."},
    {q:"The main purpose of encryption is to:", o:["Make files smaller","Make intercepted data unreadable without the key","Speed up the network","Delete malware"], a:1, e:"Encryption protects confidentiality — intercepted ciphertext is useless without the decryption key."}
  ],
  7: [
    {q:"The 'stored program concept' means:", o:["Programs are stored on paper","Instructions and data are held together in main memory","Programs can never change","All data is stored in the CPU"], a:1, e:"In Von Neumann architecture, both instructions and data live in main memory; the CPU fetches instructions one at a time."},
    {q:"Which CPU component decodes instructions?", o:["ALU","Control unit","Cache","Register"], a:1, e:"The control unit decodes each instruction and sends control signals; the ALU does arithmetic/logic."},
    {q:"Which memory is volatile?", o:["ROM","RAM","SSD","DVD"], a:1, e:"RAM loses its contents when power is off. ROM and secondary storage are non-volatile."},
    {q:"The bootstrap/start-up instructions are stored in:", o:["RAM","Cache","ROM","A register"], a:2, e:"ROM is non-volatile, so the start-up program survives power-off and runs first at boot."},
    {q:"Which secondary storage has no moving parts?", o:["Hard disk drive","DVD drive","Solid state drive","Magnetic tape"], a:2, e:"SSDs use flash memory — fast, durable and silent, though more expensive per GB."},
    {q:"A washing machine controller is an example of:", o:["A supercomputer","An embedded system","A WAN","Utility software"], a:1, e:"An embedded system is a dedicated computer built into a larger device for one function."}
  ],
  8: [
    {q:"Which is NOT a function of an operating system?", o:["File management","Process management","Peripheral management","Composing emails"], a:3, e:"Email is written using application software. The OS manages files, processes, peripherals, memory and users."},
    {q:"Defragmentation software:", o:["Removes viruses","Rearranges file parts on a hard disk so they are contiguous","Encrypts the disk","Backs up files to the cloud"], a:1, e:"Defragmentation reunites scattered file fragments on magnetic disks, speeding up access. It's utility software."},
    {q:"Machine code is:", o:["English-like keywords","Binary instructions the CPU executes directly","Pseudocode","A flowchart"], a:1, e:"The CPU can only execute machine code — binary instructions specific to that processor."},
    {q:"A key advantage of high-level languages is:", o:["They need no translation","They are easier for humans to write, read and debug","They run faster than machine code","They only work on one processor"], a:1, e:"High-level languages use English-like statements and are portable across machines — but must be translated."},
    {q:"Which translator converts the whole program at once into an executable?", o:["Interpreter","Compiler","Assembler only","Linker"], a:1, e:"A compiler translates the entire program in one go, producing an executable that runs without the source."},
    {q:"An interpreter:", o:["Produces an executable file","Translates and runs the code one line at a time","Only works with machine code","Removes logic errors automatically"], a:1, e:"Interpreters execute line by line, stopping at the first error — handy for development and debugging."}
  ],
  9: [
    {q:"A network within one school building is a:", o:["WAN","LAN","PAN","The internet"], a:1, e:"A LAN covers a single site, typically owned and managed by one organisation."},
    {q:"In a star topology, what happens if one device's cable fails?", o:["The whole network fails","Only that device is disconnected","All data is lost","The switch reboots"], a:1, e:"Each device has its own cable to the central switch, so one failure affects only that device."},
    {q:"Which topology gives the most alternative routes for data?", o:["Bus","Star","Mesh","Ring"], a:2, e:"In a mesh, nodes interconnect with multiple paths — if one link fails, data re-routes."},
    {q:"Which protocol is used to SEND email?", o:["POP3","IMAP","SMTP","FTP"], a:2, e:"SMTP sends mail; POP3 and IMAP retrieve it."},
    {q:"How many layers are in the TCP/IP model used by 4CP0?", o:["3","4","7","2"], a:1, e:"Four layers: application, transport, network, data link."},
    {q:"A 40 MB file is downloaded over a 10 Mbps connection. Roughly how long does it take?", o:["4 seconds","32 seconds","40 seconds","8 seconds"], a:1, e:"40 MB = 320 megabits; 320 ÷ 10 = 32 seconds. Remember to convert bytes to bits (×8)."}
  ],
  10: [
    {q:"Phishing is an example of:", o:["A technical attack on hardware","Social engineering","Utility software","Lossless compression"], a:1, e:"Phishing manipulates the PERSON — a fake message tricks them into revealing credentials."},
    {q:"Malware that disguises itself as legitimate software is a:", o:["Worm","Virus","Trojan","Firewall"], a:2, e:"A trojan looks like a useful program; running it installs the malicious payload."},
    {q:"Which malware spreads itself across networks without user action?", o:["Worm","Trojan","Spyware","Adware"], a:0, e:"Worms self-replicate and travel between machines without needing a host file or a user to click."},
    {q:"A DoS attack works by:", o:["Stealing passwords by phone","Flooding a server with requests so real users can't get through","Encrypting backups","Watching over someone's shoulder"], a:1, e:"Denial of Service overwhelms a service with bogus traffic, making it unavailable."},
    {q:"SQL injection targets:", o:["The CPU","Databases behind input forms","The power supply","Printers"], a:1, e:"Malicious SQL typed into an input field can trick the database into revealing or changing data."},
    {q:"Penetration testing is:", o:["An illegal attack","Authorised probing of a system to find weaknesses before attackers do","A type of malware","A way to compress data"], a:1, e:"Organisations hire ethical hackers to legally test defences and report vulnerabilities."}
  ],
  11: [
    {q:"Which is an environmental problem caused by digital technology?", o:["E-waste containing toxic materials","Faster communication","Online banking","Video calls"], a:0, e:"Discarded devices (e-waste) contain lead, mercury and other toxins, and rare materials are lost."},
    {q:"Unauthorised access to a computer system breaks which UK law?", o:["Data Protection Act 2018","Computer Misuse Act 1990","Copyright, Designs and Patents Act 1988","Health and Safety Act"], a:1, e:"The Computer Misuse Act 1990 criminalises hacking, access with intent, and unauthorised modification."},
    {q:"Which law controls how organisations handle personal data?", o:["Computer Misuse Act 1990","Data Protection Act 2018","Copyright, Designs and Patents Act 1988","Freedom of Information Act"], a:1, e:"The DPA 2018 (implementing GDPR) sets the rules for collecting, storing and processing personal data."},
    {q:"Copying and sharing software without a licence breaks:", o:["Computer Misuse Act 1990","Data Protection Act 2018","Copyright, Designs and Patents Act 1988","No law"], a:2, e:"Software is an original work protected by the Copyright, Designs and Patents Act 1988."},
    {q:"Open-source software:", o:["Always costs money","Has source code anyone can view and modify","Cannot be distributed","Has hidden source code"], a:1, e:"Open-source licences make the source code public and modifiable; proprietary licences keep it closed."},
    {q:"Algorithmic bias occurs when:", o:["A computer overheats","An algorithm's decisions unfairly favour or disadvantage groups, often due to biased training data","Binary numbers overflow","A loop never ends"], a:1, e:"If the data used to train or design a system is biased, its automated decisions can be unfair."}
  ],
  12: [
    {q:"Which Python data type stores True/False?", o:["int","float","bool","str"], a:2, e:"Boolean (bool) holds True or False — used in conditions."},
    {q:"What does len(\"computer\") return?", o:["7","8","9","Error"], a:1, e:"len() counts characters: c-o-m-p-u-t-e-r = 8."},
    {q:"What is the value of 17 % 5 in Python?", o:["3","3.4","2","12"], a:2, e:"% is modulus — the remainder after division: 17 ÷ 5 = 3 remainder 2."},
    {q:"What does 17 // 5 evaluate to?", o:["3","3.4","2","3.5"], a:0, e:"// is integer (floor) division: 17 ÷ 5 = 3.4, floored to 3."},
    {q:"Which loop is best when you don't know in advance how many repetitions are needed?", o:["for loop","while loop","Neither","Both are identical"], a:1, e:"while (condition-controlled) repeats until a condition changes; for is count-controlled."},
    {q:"In Python, scores[0] refers to:", o:["The last item in the list","The first item in the list","The number of items","An error"], a:1, e:"List indexing starts at 0, so scores[0] is the first element."},
    {q:"A range check is an example of:", o:["Iteration","Validation","Compression","Translation"], a:1, e:"Validation checks input is acceptable — a range check ensures a value lies between set bounds."}
  ]
};

// Expose to other scripts
if (typeof window !== 'undefined') {
  window.CHAPTERS = CHAPTERS;
  window.GLOSSARY = GLOSSARY;
  window.QUIZ = QUIZ;
}
