/* ═══════════════════════════════════════════════════════════════════════════
   IGCSE ICT 4IT1 — MASSIVE QUESTION BANK
   200+ MCQs across all chapters with difficulty levels
   80+ essay questions with mark schemes and keyword expectations
   ═══════════════════════════════════════════════════════════════════════════ */

// MCQs: {q, o[], a (correct index), e (explanation), ch (chapter), d (difficulty 1-3)}
// d: 1 = easy (recall), 2 = medium (apply), 3 = hard (analyse)

const MCQ_BANK = [
  // ═══════════════ CHAPTER 1: DIGITAL DEVICES (25 questions) ═══════════════
  {q:"Which device receives but does NOT transmit location data?", o:["Smartphone","GPS device","Tablet","Smart watch"], a:1, e:"A GPS device only receives signals from satellites. The chip itself is receive-only.", ch:1, d:1},
  {q:"Which feature describes 'how easily a device can be carried and used in different locations'?", o:["Performance","Connectivity","Portability","Expansion"], a:2, e:"Portability covers size, weight and battery life.", ch:1, d:1},
  {q:"What is 'convergence' in digital devices?", o:["Devices becoming more similar over time","Multiple users sharing one device","Connecting devices to networks","Combining hardware and software"], a:0, e:"Convergence = different device TYPES become more similar over time.", ch:1, d:1},
  {q:"Which device is best for a washing machine's wash cycle control?", o:["Mainframe","Embedded microprocessor","Tablet","Desktop"], a:1, e:"Embedded microprocessors perform ONE specific task built into a product.", ch:1, d:1},
  {q:"A 'desktop replacement laptop' is:", o:["A broken desktop's replacement","A high-spec laptop matching desktop performance","A small portable laptop","A laptop without battery"], a:1, e:"High-end laptop kept on a desk with external monitor — replaces a desktop while still portable.", ch:1, d:1},
  {q:"Which is NOT one of the 9 features of digital devices?", o:["Portability","Programming language","Connectivity","Security features"], a:1, e:"The 9 features: portability, performance, storage, UI, connectivity, media, energy, expansion, security.", ch:1, d:1},
  {q:"A SIM card is used to:", o:["Connect to Wi-Fi","Authenticate a phone to a mobile network","Store photos","Increase battery life"], a:1, e:"SIM identifies the phone to the cellular network operator.", ch:1, d:1},
  {q:"Which is a 'multifunctional device'?", o:["A printer that only prints","A smartphone","A keyboard","A mouse"], a:1, e:"A multifunctional device combines functions of several separate devices.", ch:1, d:1},
  {q:"Mainframes are used by:", o:["Individuals at home","Large organisations needing complex processing","Small shops","Schools only"], a:1, e:"Mainframes handle massive concurrent users and high-volume processing — banks, airlines, governments.", ch:1, d:1},
  {q:"Which device typically has a touchscreen but no built-in keyboard?", o:["Desktop","Laptop","Tablet","Mainframe"], a:2, e:"Tablets use touchscreen as primary input; keyboards are optional accessories.", ch:1, d:1},
  {q:"A nurse moving between hospital wards needs a device. The BEST choice is:", o:["Desktop","Mainframe","Tablet","Games console"], a:2, e:"Tablet = portable + touchscreen (works with gloves) + Wi-Fi for hospital network.", ch:1, d:2},
  {q:"For 4K video editing at a workstation, the BEST device is:", o:["Smartphone","Tablet","Desktop PC","Smartwatch"], a:2, e:"Desktop has highest performance, expansion, and large display — ideal for demanding professional software.", ch:1, d:2},
  {q:"A delivery driver needs navigation + delivery photo evidence. The BEST device is:", o:["Mainframe","Smartphone","Desktop","Plotter"], o2:[], a:1, e:"Smartphone has GPS + camera + 4G + portability in one device.", ch:1, d:2},
  {q:"Which combination of features matters most for a games console?", o:["Portability + battery life","High-performance GPU + controller input","Long battery + biometrics","Large keyboard + many ports"], a:1, e:"Games consoles need high-performance GPU and controller input; connect to TV via HDMI.", ch:1, d:2},
  {q:"A bank must process 10 million transactions per hour. The BEST system is:", o:["Network of laptops","Mainframe","Many tablets","Many smartphones"], a:1, e:"Mainframes handle massive concurrent processing reliably 24/7.", ch:1, d:2},
  {q:"A photographer needs to take photos AND edit them on the go. The BEST 2-device combo is:", o:["Camera + tablet","Mainframe + smartphone","Desktop + GPS","Games console + tablet"], a:0, e:"Dedicated camera = best photo quality; tablet = portable editing.", ch:1, d:2},
  {q:"Convergence has affected which TWO device types most?", o:["Mainframes and printers","Smartphones and tablets","Plotters and barcode scanners","Mice and keyboards"], a:1, e:"Smartphones and tablets now share most features — touchscreens, cameras, apps, internet.", ch:1, d:2},
  {q:"Which is a DISADVANTAGE of multifunctional devices?", o:["Saves money","Easier to carry","If broken, ALL functions lost","Data flows between functions"], a:2, e:"A single broken multifunctional device disables all its functions simultaneously.", ch:1, d:2},
  {q:"Why might a charity fieldworker use a laptop (NOT a smartphone) for video interviews in remote areas?", o:["Better battery","Bigger keyboard for note-taking + better video quality + larger storage","More apps available","Cheaper"], a:1, e:"Laptops have better keyboards, screens, storage and processing for serious video work.", ch:1, d:3},
  {q:"An elderly person needs a device for calls and texts only. The BEST choice is:", o:["Smartphone","Specialist phone","Tablet","Smartwatch"], a:1, e:"Specialist phones (sometimes 'feature phones') have simple interface, large buttons, long battery — perfect for basic use.", ch:1, d:2},
  {q:"Which factor would BEST justify a school choosing tablets over laptops for students?", o:["Tablets are more powerful","Tablets have better keyboards","Tablets are more portable + cheaper + longer battery","Tablets have more ports"], a:2, e:"Tablets are lighter, cheaper per unit, and have longer battery life — ideal for student use.", ch:1, d:3},
  {q:"In a GPS navigation system, what does the device do?", o:["Sends location to satellites","Receives signals from 3+ satellites and triangulates position","Both sends and receives","Connects to mobile data only"], a:1, e:"GPS receivers calculate position by triangulating signals from multiple satellites — receive only.", ch:1, d:2},
  {q:"Why might a doctor's clinic NOT use a desktop PC for each patient visit?", o:["Desktops are too expensive","Desktops are not portable enough to move between rooms","Desktops cannot run medical software","Desktops have no internet"], a:1, e:"Desktops are fixed — a tablet allows the doctor to carry patient records between consulting rooms.", ch:1, d:3},
  {q:"What does eSIM mean?", o:["Extra-large SIM","Virtual built-in SIM with no physical card","Encrypted SIM","Emergency SIM"], a:1, e:"eSIM = embedded SIM. Credentials downloaded digitally; no physical card needed.", ch:1, d:2},
  {q:"Which device type would be MOST AFFECTED by losing convergence with another device type?", o:["Mainframe","Standalone camera","Desktop","Plotter"], a:1, e:"Standalone cameras lost market share as smartphones converged toward them with high-quality cameras.", ch:1, d:3},

  // ═══════════════ CHAPTER 2: SOFTWARE (22 questions) ═══════════════
  {q:"The MOST important piece of system software is:", o:["Antivirus","Operating system","Word processor","Web browser"], a:1, e:"OS manages all hardware, memory, security, and provides the platform for everything else.", ch:2, d:1},
  {q:"What does 'memory management' as an OS function refer to?", o:["Backing up files","Allocating RAM to running programs","Managing hard disk space","Encrypting data"], a:1, e:"Memory management allocates RAM to programs so multiple can run simultaneously without conflict.", ch:2, d:1},
  {q:"Which is a feature of open-source software?", o:["Source code hidden","Always free of charge","Source code can be viewed and modified","Officially supported by manufacturer"], a:2, e:"Open-source means source code is public and modifiable (free is typical but not required).", ch:2, d:1},
  {q:"Print spooling allows users to:", o:["Print in colour","Print in higher quality","Continue working while documents print","Print multiple copies"], a:2, e:"Print spooling queues jobs in the background so the user can keep working.", ch:2, d:1},
  {q:"Antivirus software is an example of:", o:["Application software","Utility software","Programming language","Operating system"], a:1, e:"Utility software = system tools for maintenance/security. Antivirus is utility software.", ch:2, d:1},
  {q:"Which is NOT a function of an operating system?", o:["Memory management","Print spooling","Editing photos","User authentication"], a:2, e:"Photo editing is done by application software (like Photoshop), not the OS.", ch:2, d:1},
  {q:"Which is NOT a risk of failing to update software?", o:["Vulnerability to malware","Unfixed bugs causing crashes","File incompatibility","Higher electricity bills"], a:3, e:"Updates protect from malware, fix bugs, keep files compatible — but don't affect power use.", ch:2, d:1},
  {q:"Why would a school choose open-source software?", o:["Better support","To avoid licence costs","Easier to use","Faster"], a:1, e:"Open-source typically avoids licence fees, important for schools with limited budgets.", ch:2, d:2},
  {q:"Why would a business choose proprietary software (e.g. Adobe Photoshop)?", o:["Free of charge","Official support and training available","Source code visible","Anyone can modify"], a:1, e:"Proprietary software comes with paid official support — important for business-critical work.", ch:2, d:2},
  {q:"Which is application software (NOT system software)?", o:["Antivirus","Windows","File backup tool","Microsoft Excel"], a:3, e:"Excel is an application the user directly interacts with. Antivirus, Windows, backup tools are system software.", ch:2, d:1},
  {q:"Disk cleanup is an example of:", o:["Application software","Utility software","Programming language","Hardware"], a:1, e:"Disk cleanup is a utility — performs maintenance on the system.", ch:2, d:1},
  {q:"What does the OS do when two programs both need the printer?", o:["Crash","Print both at once and mix the output","Queue them using print spooling","Pick one randomly"], a:2, e:"OS uses print spooling to queue jobs in order so they print one at a time.", ch:2, d:2},
  {q:"Software updates are MOST important for:", o:["Making the screen brighter","Patching security vulnerabilities","Improving sound","Adding new icons"], a:1, e:"Security patches close known vulnerabilities that hackers/malware could exploit.", ch:2, d:2},
  {q:"Which is the BEST example of communication software?", o:["Microsoft Excel","Adobe Photoshop","Microsoft Teams","Antivirus"], a:2, e:"MS Teams is for communication (chat, video calls). Excel = data; Photoshop = images; Antivirus = utility.", ch:2, d:1},
  {q:"Which is NOT a category of application software?", o:["Web authoring","Office productivity","Operating system","Image editing"], a:2, e:"OS is system software, not application software.", ch:2, d:1},
  {q:"Linux is an example of:", o:["Application software","Proprietary OS","Open-source OS","Utility"], a:2, e:"Linux is an open-source operating system — source code public, free to modify.", ch:2, d:1},
  {q:"Database software (e.g. Access) is used to:", o:["Edit photos","Store and query structured data","Browse the web","Send email"], a:1, e:"Database software stores data in tables and lets users query it.", ch:2, d:1},
  {q:"Why might a user delay software updates?", o:["Updates might introduce new bugs OR change UI","Updates always make device slower","Updates cost money","Updates require internet"], a:0, e:"Real risks: new bugs, UI changes, or temporary instability. Some users prefer waiting until patches are tested.", ch:2, d:2},
  {q:"Which is utility software?", o:["Photo editor","File compression tool (e.g. WinZip)","Web browser","Word processor"], a:1, e:"File compression is utility software — performs a specific system task.", ch:2, d:1},
  {q:"What does an OS use to allow multiple users on one computer?", o:["User accounts and access rights","More RAM","Bigger hard drive","Faster CPU"], a:0, e:"User accounts (with passwords and permissions) separate users, controlled by the OS security function.", ch:2, d:2},
  {q:"For 'select most appropriate software for editing audio for a podcast', the answer is:", o:["Word processor","Audacity (sound editor)","Spreadsheet","Browser"], a:1, e:"Audacity is sound editing software — the right category for audio editing.", ch:2, d:2},
  {q:"Which is NOT an OS task?", o:["Managing hardware","Memory management","Creating Word documents","User authentication"], a:2, e:"Creating Word documents is what application software does — the OS just runs the application.", ch:2, d:1},

  // ═══════════════ CHAPTER 3: PERIPHERALS & STORAGE (25 questions) ═══════════════
  {q:"Which input device reads multiple-choice exam answer sheets?", o:["OCR","OMR","Barcode scanner","Biometric scanner"], a:1, e:"OMR (Optical Mark Recognition) detects marks at specific positions on a form.", ch:3, d:1},
  {q:"How many bytes are in 1 KiB?", o:["1,000","1,024","1,048,576","10,000"], a:1, e:"1 KiB = 2^10 = 1,024 bytes. Binary units multiply by 1024.", ch:3, d:1},
  {q:"Which storage media has NO moving parts and is most durable?", o:["HDD","Optical disc","SSD","Magnetic tape"], a:2, e:"SSDs use flash memory chips — no moving parts to break.", ch:3, d:1},
  {q:"A recordable CD-R can be:", o:["Written many times","Written only once","Written but not read","Read but not written"], a:1, e:"R = Recordable = write once. RW = Rewritable = write many times.", ch:3, d:1},
  {q:"Which output device draws large engineering plans with a pen?", o:["Laser printer","Inkjet printer","Plotter","3D printer"], a:2, e:"Plotters use pens to draw large vector graphics — engineering/architectural plans.", ch:3, d:1},
  {q:"OCR stands for:", o:["Optical Character Recognition","Online Cloud Resource","Optical Code Reader","Open Circuit Reading"], a:0, e:"OCR converts scanned text images into editable digital text.", ch:3, d:1},
  {q:"Which best describes the difference between 'storage device' and 'storage media'?", o:["They mean the same","Device = hardware reader; Media = what holds data","Device = old, Media = new","Device = small, Media = large"], a:1, e:"Device = the hardware unit (HDD unit); Media = what's actually written on (the disk).", ch:3, d:2},
  {q:"For long-term archival of very large data, the BEST medium is:", o:["SSD","HDD","Magnetic tape","Optical disc"], a:2, e:"Magnetic tape is slow but cheap per GB and lasts decades — ideal for archive.", ch:3, d:2},
  {q:"How many MiB are in 1 GiB?", o:["1,000","1,024","1,048,576","100"], a:1, e:"1 GiB = 1,024 MiB (each step is x1024).", ch:3, d:1},
  {q:"A laser printer is better than an inkjet for an office because:", o:["Lower upfront cost","Better photo quality","Faster + cheaper per page over time","Smaller size"], a:2, e:"Laser printers cost more upfront but print faster and have cheaper cost per page — better for high-volume office use.", ch:3, d:2},
  {q:"An inkjet printer is better than laser for home use because:", o:["Faster","Lower upfront cost + better for photos","Cheaper per page","More durable"], a:1, e:"Inkjets cost less to buy and produce better photos — good for low-volume home use.", ch:3, d:2},
  {q:"Which input device is BEST for digital artists?", o:["Mouse","Touch pad","Graphics tablet with stylus","Keyboard"], a:2, e:"Graphics tablets with stylus give precise pressure-sensitive control — essential for detailed digital art.", ch:3, d:2},
  {q:"A 3D printer is unique because it:", o:["Prints in 3 colours","Builds physical 3D objects layer by layer","Prints on 3D paper","Prints from 3 angles"], a:1, e:"3D printers build physical objects from a digital model by adding material layer by layer.", ch:3, d:1},
  {q:"For supermarket checkout, the BEST input device is:", o:["OMR","Barcode scanner","Biometric scanner","Graphics tablet"], a:1, e:"Barcode scanners read product codes quickly — designed for fast retail checkout.", ch:3, d:1},
  {q:"Chip & PIN is MORE SECURE than magnetic stripe because:", o:["Chips are smaller","Chip stores encrypted unique data harder to clone","Chips are cheaper","Chips are faster"], a:1, e:"Chips store encrypted authentication data that is much harder to clone than a magnetic stripe.", ch:3, d:2},
  {q:"An 'actuator' is an output device that:", o:["Reads data","Receives signals to control machinery","Stores data","Displays images"], a:1, e:"Actuators receive computer signals and physically move things (robot arms, motors, automated doors).", ch:3, d:1},
  {q:"For a security door using fingerprints, the input device is:", o:["OMR","OCR","Biometric scanner","Barcode reader"], a:2, e:"Biometric scanners read unique body features (fingerprint, face, iris) for identity checks.", ch:3, d:1},
  {q:"Sensors are used to detect:", o:["Only temperature","Only motion","Physical conditions like temp, light, pressure, motion","Only sound"], a:2, e:"Sensors detect any physical condition and convert it to digital signals — used widely in automated systems.", ch:3, d:1},
  {q:"Compared to HDD, an SSD typically has:", o:["More storage capacity per £","Faster access time + better durability","Lower noise but slower","Lower power use only"], a:1, e:"SSDs are faster and more durable (no moving parts); HDDs typically offer more capacity per £.", ch:3, d:2},
  {q:"Which is NOT a way to measure storage capacity?", o:["KiB","MiB","GiB","GHz"], a:3, e:"GHz measures CPU clock speed, not storage. Storage uses KiB, MiB, GiB, TiB.", ch:3, d:1},
  {q:"For data that must be portable AND inexpensive, the BEST media is:", o:["External HDD","USB flash drive","Mainframe","Magnetic tape"], a:1, e:"USB flash drives are small, cheap and very portable — ideal for transferring files.", ch:3, d:2},
  {q:"A receipt printer in a shop typically uses:", o:["Laser","Inkjet","Thermal","Plotter"], a:2, e:"Thermal printers heat special paper — quiet, fast, no ink needed. Standard for receipts.", ch:3, d:1},
  {q:"What does it mean if a CD is 'multisession'?", o:["Plays many songs","Can be written to in multiple sessions over time","Has multiple users","Was made multiple times"], a:1, e:"Multisession CDs allow writing in stages — add files later without erasing existing data.", ch:3, d:2},
  {q:"Why does a hospital use OMR for patient questionnaires?", o:["OMR is expensive","Fast bulk reading of standardised forms","Reads handwriting","Reads barcodes"], a:1, e:"OMR processes many forms quickly when answers are at fixed positions — perfect for standard questionnaires.", ch:3, d:2},
  {q:"For digitising a printed library book to be edited as text, the BEST input is:", o:["OMR","OCR","Barcode scanner","Magnetic stripe"], a:1, e:"OCR converts scanned text images into editable digital text — perfect for digitising printed material.", ch:3, d:2},

  // ═══════════════ CHAPTER 4: MEMORY & PROCESSORS (22 questions) ═══════════════
  {q:"What does it mean for memory to be 'volatile'?", o:["It explodes","Loses contents when power off","Very large","Cannot be modified"], a:1, e:"Volatile memory loses contents when power is removed. RAM is volatile; ROM is not.", ch:4, d:1},
  {q:"Which stage of fetch-decode-execute uses the ALU?", o:["Fetch","Decode","Execute","Store"], a:2, e:"The Execute stage is where the ALU performs the arithmetic or logical operation.", ch:4, d:1},
  {q:"A computer is slow with many programs open. The BEST upgrade is:", o:["Larger HDD","More RAM","Faster optical drive","Bigger monitor"], a:1, e:"More RAM lets more programs stay in fast memory, avoiding slow disk swaps.", ch:4, d:2},
  {q:"Where are BIOS instructions stored?", o:["RAM","Cache","ROM","Hard drive"], a:2, e:"BIOS is in ROM so it persists when power is off and runs before the OS loads.", ch:4, d:1},
  {q:"Which is NOT a factor affecting CPU speed?", o:["Clock speed","Number of cores","Cache size","Monitor resolution"], a:3, e:"Monitor resolution affects display quality, not CPU. Clock speed, cores, cache all affect CPU.", ch:4, d:1},
  {q:"Flash memory differs from ROM because:", o:["It is volatile","It can be rewritten","Faster than RAM","Needs constant power"], a:1, e:"Both are non-volatile, but flash CAN be rewritten by users; ROM is fixed at manufacture.", ch:4, d:2},
  {q:"What does RAM stand for?", o:["Read Access Memory","Random Access Memory","Read Allocated Memory","Real Active Memory"], a:1, e:"RAM = Random Access Memory — any location accessed in the same time.", ch:4, d:1},
  {q:"What does ROM stand for?", o:["Read Only Memory","Random Operating Memory","Real Output Memory","Run Order Memory"], a:0, e:"ROM = Read Only Memory — content fixed at manufacture, cannot be written by user.", ch:4, d:1},
  {q:"The ALU is part of the:", o:["RAM","ROM","CPU","Hard disk"], a:2, e:"The Arithmetic Logic Unit is inside the CPU — performs arithmetic and logic operations.", ch:4, d:1},
  {q:"Cache memory is:", o:["Slower than RAM","Same speed as RAM","Faster than RAM, very small","Slower than HDD"], a:2, e:"Cache is the fastest memory (faster than RAM), but very small — holds recently-used data.", ch:4, d:2},
  {q:"GHz measures:", o:["Storage capacity","RAM size","CPU clock speed","Screen resolution"], a:2, e:"GHz = gigahertz = billions of CPU cycles per second.", ch:4, d:1},
  {q:"Which has the MOST cores?", o:["Single-core","Dual-core","Quad-core","Octa-core"], a:3, e:"Octa = 8 cores. Dual = 2, Quad = 4. More cores = more parallel work.", ch:4, d:1},
  {q:"What happens to data in RAM when the computer is turned off?", o:["Saved to hard drive","Saved to ROM","Lost (volatile)","Encrypted"], a:2, e:"RAM is volatile — contents are lost when power is removed.", ch:4, d:1},
  {q:"For a video editing workstation, which combination is MOST important?", o:["Fast CPU + lots of RAM + GPU","Small monitor + slow CPU","Many ports + slow disk","Basic CPU + lots of optical drives"], a:0, e:"Video editing needs fast CPU + lots of RAM + powerful GPU for rendering.", ch:4, d:2},
  {q:"Why does an SSD make a computer feel faster than HDD?", o:["More storage","Faster read/write of files","Better graphics","Better sound"], a:1, e:"SSDs have much faster read/write speeds (no spinning disk) — apps load and files open quickly.", ch:4, d:2},
  {q:"USB drives and SD cards use which memory type?", o:["RAM","ROM","Flash memory","Magnetic memory"], a:2, e:"USB drives and SD cards use non-volatile flash memory — durable, no moving parts.", ch:4, d:1},
  {q:"In the fetch-decode-execute cycle, where is the result usually stored?", o:["In ROM","Back in RAM or a register","On the HDD","In the cache only"], a:1, e:"After execution, the result is stored back in RAM or held in a CPU register for next instructions.", ch:4, d:2},
  {q:"For a person with a visual impairment, which adaptation is BEST?", o:["Bigger monitor only","Screen magnifier + text-to-speech","Faster CPU","More RAM"], a:1, e:"Screen magnifier enlarges UI; text-to-speech reads content aloud — both essential for visual impairment.", ch:4, d:2},
  {q:"Why does adding more RAM help with multitasking?", o:["More programs can be held in fast memory","CPU runs faster","Storage increases","Screen is bigger"], a:0, e:"More RAM = more programs kept in fast memory simultaneously, fewer slow disk swaps.", ch:4, d:2},
  {q:"For dyslexia, which built-in accessibility feature is MOST useful?", o:["Sticky keys","High contrast","Text-to-speech + dyslexia-friendly fonts","Mouse trail"], a:2, e:"Text-to-speech reads content aloud; special fonts (e.g. OpenDyslexic) reduce letter confusion.", ch:4, d:2},
  {q:"What is the role of the cache?", o:["Long-term storage","Hold recently-used data near the CPU for fast access","Boot the OS","Backup the OS"], a:1, e:"Cache holds frequently-used instructions and data so the CPU doesn't wait for slow RAM.", ch:4, d:2},
  {q:"If a system has 16 GB RAM but only 8 GB is being used, the rest is:", o:["Wasted","Available for new programs","Stored on disk","Sent to the cloud"], a:1, e:"Unused RAM is available for new programs to use — having spare RAM is good for performance.", ch:4, d:2},

  // ═══════════════ CHAPTER 5: CONNECTIVITY & NETWORKS (24 questions) ═══════════════
  {q:"A network covering a single building owned by one organisation is a:", o:["WAN","LAN","PAN","MAN"], a:1, e:"LAN = Local Area Network = single site, one organisation.", ch:5, d:1},
  {q:"For wireless headphones connecting to a phone, the BEST tech is:", o:["Wi-Fi","Bluetooth","NFC","4G"], a:1, e:"Bluetooth: short-range, low-power, perfect for device-to-device audio pairing.", ch:5, d:1},
  {q:"A router's role is to:", o:["Store files","Filter viruses","Direct data between networks","Encrypt data"], a:2, e:"Router directs data between different networks — typically your LAN and the internet via the ISP.", ch:5, d:1},
  {q:"What is bandwidth?", o:["Delay before response","Max data transferred per second","Signal strength","Internet cost"], a:1, e:"Bandwidth = max data per second. Latency is delay; they are different.", ch:5, d:1},
  {q:"For contactless payment, the technology used is:", o:["Wi-Fi","Bluetooth","NFC","GPS"], a:2, e:"NFC operates over <10cm — secure for contactless payment.", ch:5, d:1},
  {q:"A WAP creates:", o:["A wired connection","A Wi-Fi zone for wireless devices","A backup of data","An encrypted tunnel"], a:1, e:"WAP = Wireless Access Point = creates a Wi-Fi zone joining wireless devices to a wired network.", ch:5, d:1},
  {q:"The internet is an example of a:", o:["LAN","WAN","PAN","ROM"], a:1, e:"The internet is the world's largest WAN — connects many networks globally.", ch:5, d:1},
  {q:"A PAN typically uses which technology?", o:["4G/5G","Wi-Fi","Bluetooth","Ethernet"], a:2, e:"PANs around one person typically use Bluetooth (phone + headphones + watch).", ch:5, d:1},
  {q:"For low latency in online gaming, the BEST connection is:", o:["Slow Wi-Fi","Wired Ethernet","Mobile 3G","Bluetooth"], a:1, e:"Wired Ethernet gives lowest latency and most stable connection — preferred for competitive gaming.", ch:5, d:2},
  {q:"5G is faster than 4G mainly because:", o:["Larger phones","Higher frequency + more bandwidth + lower latency","More cell towers","Bigger SIM cards"], a:1, e:"5G uses higher frequencies, wider bandwidth, and has lower latency than 4G — ultra-fast mobile data.", ch:5, d:2},
  {q:"What does ISP stand for?", o:["Internet Speed Provider","Internet Service Provider","Internal Server Port","Intranet Standard Protocol"], a:1, e:"ISP = Internet Service Provider = company providing internet access (BT, Comcast, Etisalat etc.).", ch:5, d:1},
  {q:"For sharing one phone's mobile data with a laptop, you use:", o:["Backup","Tethering","Encryption","DNS"], a:1, e:"Tethering shares a phone's cellular data with another device via Wi-Fi/USB/Bluetooth.", ch:5, d:1},
  {q:"GPS uses signals from:", o:["Cell towers","Wi-Fi hotspots","Satellites","ISPs"], a:2, e:"GPS receives signals from 24+ orbiting satellites to calculate position.", ch:5, d:1},
  {q:"For very short-range data exchange (tap to pair), use:", o:["Wi-Fi","Bluetooth","NFC","4G"], a:2, e:"NFC works at <10cm range — designed for very-short-range tap interactions.", ch:5, d:1},
  {q:"Bandwidth is typically measured in:", o:["Mbps","ms","GHz","KB"], a:0, e:"Mbps = megabits per second = standard bandwidth unit. ms = latency unit.", ch:5, d:1},
  {q:"Latency is typically measured in:", o:["Mbps","ms (milliseconds)","GHz","Bytes"], a:1, e:"Latency = delay = measured in milliseconds (ms). Lower is better.", ch:5, d:1},
  {q:"A search engine is:", o:["A type of router","Software that indexes the web and returns ranked results","Hardware for searching","An ISP"], a:1, e:"Search engines (Google, Bing) crawl and index the web, returning ranked results to queries.", ch:5, d:1},
  {q:"A web browser does which?", o:["Edits photos","Requests and displays web pages","Stores data","Encrypts emails"], a:1, e:"Browsers (Chrome, Firefox) request web pages from servers and display them to users.", ch:5, d:1},
  {q:"Filter software in a school typically:", o:["Speeds up Wi-Fi","Blocks harmful or inappropriate websites","Increases bandwidth","Adds new programs"], a:1, e:"Schools use filter software to block harmful/inappropriate sites and protect students.", ch:5, d:1},
  {q:"Which technology was used by old TV remote controls?", o:["Bluetooth","Wi-Fi","Infrared","NFC"], a:2, e:"Old TV remotes use infrared (IR) — line-of-sight short-range optical signal.", ch:5, d:1},
  {q:"What does ADSL stand for?", o:["Asymmetric Digital Subscriber Line","Always Direct Service Link","Auto Data Stream Link","Advanced Digital Speed Line"], a:0, e:"ADSL = Asymmetric DSL — broadband over phone lines, faster download than upload.", ch:5, d:2},
  {q:"Fibre optic broadband uses:", o:["Copper wires","Glass strands with light pulses","Radio waves","Satellites only"], a:1, e:"Fibre optic uses glass strands carrying light pulses — much faster than copper.", ch:5, d:2},
  {q:"What is the role of a gateway?", o:["Stores files","Entry/exit point between two different networks","Charges battery","Filters ads"], a:1, e:"A gateway is the connecting point between two different networks — often combined into a router.", ch:5, d:2},
  {q:"A booster/repeater:", o:["Speeds up the CPU","Extends Wi-Fi range by retransmitting","Encrypts traffic","Stores backup"], a:1, e:"Repeaters extend Wi-Fi range by receiving and re-broadcasting the signal further.", ch:5, d:2},

  // ═══════════════ CHAPTER 6: NETWORK SECURITY (22 questions) ═══════════════
  {q:"In a peer-to-peer network:", o:["A server controls everything","All computers are equal","Only one PC works","Mobile data only"], a:1, e:"In P2P, all devices are equal — each can act as both client and server.", ch:6, d:1},
  {q:"Which technique silently redirects users to a fake website?", o:["Phishing","Pharming","Spoofing","Hacking"], a:1, e:"Pharming silently manipulates DNS — no user mistake needed. Phishing requires user action.", ch:6, d:1},
  {q:"A transaction log is useful for:", o:["Speeding up network","Recording system actions for security analysis","Encrypting data","Reducing power"], a:1, e:"Transaction logs record all actions — vital for forensic analysis after a security incident.", ch:6, d:1},
  {q:"WPA2 is used for:", o:["Wired LAN security","Wi-Fi encryption","Firewall rules","Backups"], a:1, e:"WPA2/WPA3 = Wi-Fi Protected Access = encryption standards for wireless networks.", ch:6, d:1},
  {q:"MFA improves security because:", o:["Uses only passwords","Requires 2+ different proofs of identity","Faster login","Encrypts files"], a:1, e:"MFA requires multiple different proofs (password + phone code), making unauthorised access much harder.", ch:6, d:1},
  {q:"A firewall:", o:["Backs up files","Filters network traffic by rules","Encrypts data","Detects viruses"], a:1, e:"Firewalls monitor and filter incoming/outgoing network traffic based on security rules.", ch:6, d:1},
  {q:"Encryption converts:", o:["Hardware to software","Readable data to ciphertext using a key","Files to folders","Video to audio"], a:1, e:"Encryption uses a mathematical key to convert readable data into scrambled ciphertext.", ch:6, d:1},
  {q:"A client-server network is BEST for:", o:["Small homes","Schools and offices with many users","Single-person use","Two computers only"], a:1, e:"Client-server suits larger organisations needing centralised admin, backups, and security.", ch:6, d:1},
  {q:"Which is NOT a benefit of a LAN?", o:["Shared printer","Shared files","Faster individual computers","Centralised backups"], a:2, e:"A LAN doesn't speed up individual computers — it shares resources and enables communication.", ch:6, d:2},
  {q:"Ransomware does what?", o:["Speeds up your PC","Encrypts your files and demands payment","Backs up your files","Updates software"], a:1, e:"Ransomware encrypts the victim's files and demands payment for the decryption key.", ch:6, d:1},
  {q:"Social engineering means:", o:["Building social networks","Tricking PEOPLE to reveal information","Encrypting social media","Building network cables"], a:1, e:"Social engineering exploits human trust — tricks people into revealing info, not breaking the system.", ch:6, d:1},
  {q:"For safe browsing on public Wi-Fi, use a:", o:["Firewall only","VPN","Antivirus only","Backup"], a:1, e:"A VPN creates an encrypted tunnel — protects data on untrusted public Wi-Fi.", ch:6, d:2},
  {q:"Access rights specify:", o:["Network speed","Who can read/write/execute each file","CPU speed","Screen brightness"], a:1, e:"Access rights = permissions defining what each user can do with specific files/folders.", ch:6, d:1},
  {q:"A DOS attack:", o:["Steals passwords","Floods a server with traffic so it can't serve users","Encrypts files","Sends phishing emails"], a:1, e:"Denial of Service attacks overwhelm a server with traffic so legitimate users can't access it.", ch:6, d:1},
  {q:"Anti-malware software:", o:["Encrypts data","Detects/removes malicious software","Speeds up internet","Creates backups"], a:1, e:"Anti-malware scans for and removes viruses, ransomware, spyware and other malicious programs.", ch:6, d:1},
  {q:"Which server type stores user files centrally?", o:["File server","Print server","Web server","Email server"], a:0, e:"File server = stores user files centrally so any logged-in user can access from any computer.", ch:6, d:1},
  {q:"A web server:", o:["Stores user files","Hosts websites and responds to HTTP requests","Manages printing","Verifies passwords"], a:1, e:"Web servers host websites and serve pages to browsers via HTTP/HTTPS.", ch:6, d:1},
  {q:"Why is WPA2 better than WEP?", o:["WEP is faster","WPA2 has been broken; WEP is secure","WPA2 is much stronger encryption; WEP is broken","They are the same"], a:2, e:"WEP has well-known security flaws and is broken. WPA2 (and WPA3) provide much stronger encryption.", ch:6, d:2},
  {q:"For a small home with 5 devices, the BEST network type is:", o:["Client-server","Peer-to-peer","Mainframe","WAN"], a:1, e:"P2P is simple and cheap — perfect for small home networks where users share files casually.", ch:6, d:2},
  {q:"Biometric authentication uses:", o:["Passwords only","Unique body features (fingerprint, face, iris)","Phone codes","Email links"], a:1, e:"Biometrics rely on unique physical characteristics — fingerprint, face, iris — that can't be copied easily.", ch:6, d:1},
  {q:"For a 'discuss the benefits of a client-server network' question, you should mention:", o:["Only the costs","Centralised security + backups + admin","Just the disadvantages","How fast it is"], a:1, e:"Client-server: centralised admin, automated backups, strong security, easier scaling — main benefits.", ch:6, d:3},
  {q:"What is the role of an authentication server?", o:["Stores all files","Verifies usernames and passwords for login","Filters web traffic","Sends email"], a:1, e:"Authentication server verifies user credentials when logging in — central to access control.", ch:6, d:2},

  // ═══════════════ CHAPTER 7: OPERATING ONLINE (22 questions) ═══════════════
  {q:"Which attack does NOT require a user mistake?", o:["Phishing","Pharming","Spam","Social engineering"], a:1, e:"Pharming silently redirects via DNS attack. The others all need user action.", ch:7, d:1},
  {q:"A DISADVANTAGE of WFH for an employer is:", o:["Smaller office","Wider talent pool","Lower costs","Harder to manage staff"], a:3, e:"Managing remote staff is harder — meetings, oversight, and communication are more difficult.", ch:7, d:1},
  {q:"Under GDPR, the 'right to be forgotten' means:", o:["Forget your password","Delete search history","Request personal data deletion","Forget to log out"], a:2, e:"The right to erasure means individuals can ask organisations to delete their personal data.", ch:7, d:1},
  {q:"RSI is caused by:", o:["Looking at screen","Long typing or mouse use","Hot rooms","Reading too much"], a:1, e:"Repetitive Strain Injury = prolonged repeated movements (typing, mousing) + poor posture.", ch:7, d:1},
  {q:"The 'digital divide' refers to:", o:["Computer skills gap","Gap between those with and without good internet/devices","Hardware vs software","Different OS types"], a:1, e:"Digital divide = gap between those with good access to internet/devices and those without.", ch:7, d:1},
  {q:"Phishing typically arrives via:", o:["Physical post","Fraudulent emails or messages","TV ads","Phone calls only"], a:1, e:"Phishing usually uses fake emails (or messages) impersonating trusted organisations.", ch:7, d:1},
  {q:"Which is NOT a way to protect against phishing?", o:["Check sender address","Don't click suspicious links","Open all attachments","Verify with the organisation directly"], a:2, e:"Opening attachments INCREASES risk. Be cautious of unexpected attachments.", ch:7, d:1},
  {q:"For the 20-20-20 rule (eye strain prevention), every 20 minutes:", o:["Close eyes for 20 sec","Look 20 ft away for 20 sec","Drink 20 ml water","Walk 20 steps"], a:1, e:"20-20-20: every 20 min, look at something 20 ft (6m) away for 20 seconds — reduces eye strain.", ch:7, d:1},
  {q:"GDPR is short for:", o:["General Data Protection Regulation","Global Digital Privacy Rule","Government Data Privacy Reg","General Data Pricing Regulation"], a:0, e:"GDPR = General Data Protection Regulation — EU data protection law (2018).", ch:7, d:1},
  {q:"For an EMPLOYEE, an advantage of WFH is:", o:["More commute time","No commute + flexibility","Less work-life balance","Required dress code"], a:1, e:"WFH advantages for individuals: no commute, flexible hours, better work-life balance.", ch:7, d:1},
  {q:"WFH disadvantage for employee:", o:["Less work-life balance","Isolation + distractions at home","More overhead","Wider talent pool"], a:1, e:"WFH downsides for individuals: distractions at home, isolation from colleagues, less teamwork.", ch:7, d:1},
  {q:"A cause of the digital divide is:", o:["High income","Good education","Rural location with no broadband","Strong internet"], a:2, e:"Digital divide causes: cost, rural location with poor broadband, age, disability, low education.", ch:7, d:2},
  {q:"E-waste means:", o:["Email spam","Discarded electronic devices and components","Wasted electricity","Old paper files"], a:1, e:"E-waste = discarded electronic devices (old phones, computers, TVs) — environmental issue.", ch:7, d:1},
  {q:"For environmental responsibility with old devices, the BEST option is:", o:["Throw in normal bin","Recycle via WEEE scheme + donate working devices","Burn them","Bury them"], a:1, e:"WEEE Directive requires proper e-waste recycling; donating working devices reduces waste.", ch:7, d:2},
  {q:"What is identity theft?", o:["Forgetting your username","Criminals using stolen personal data to impersonate someone","Changing your name legally","Forgetting your ID card"], a:1, e:"Identity theft = criminals use stolen personal info (DOB, address, ID numbers) to impersonate the victim.", ch:7, d:1},
  {q:"Cyberbullying is characterised by:", o:["One-time joke","Repeated online harassment of a specific person","Constructive feedback","Public debate"], a:1, e:"Cyberbullying = repeated online harassment/intimidation/humiliation of a specific target.", ch:7, d:1},
  {q:"Health risk from a poorly arranged workstation:", o:["Eye colour change","Back and neck pain","Hearing loss","Skin disease"], a:1, e:"Poor posture (low monitor, bad chair) causes back, neck, and shoulder pain.", ch:7, d:1},
  {q:"Trip hazards in an ICT environment usually come from:", o:["Lots of files","Loose cables on the floor","Open windows","Many users"], a:1, e:"Loose cables on the floor are a major trip hazard — cable management is a basic safety requirement.", ch:7, d:1},
  {q:"Why might WFH be a security risk for employers?", o:["Office is safer","Home networks may be less secure than the office network","Employees work less","Employees lose passwords more"], a:1, e:"Home networks may have weak Wi-Fi security; employees may use personal devices/networks that are less protected.", ch:7, d:2},
  {q:"A common cause of stress from ICT use is:", o:["Limited app choice","Constant connectivity / info overload","Slow internet only","Old computers"], a:1, e:"Always-on connectivity, info overload, and pressure to respond instantly cause significant stress.", ch:7, d:2},
  {q:"For a HEARING-impaired user, the BEST adaptation is:", o:["Screen magnifier","Visual alerts + subtitles","Voice control","Bigger monitor"], a:1, e:"Visual alerts (flashing notifications) and subtitles help hearing-impaired users access audio info.", ch:7, d:2},
  {q:"Under data protection law, personal data must be:", o:["Kept forever","Sold to third parties","Accurate, secure and used only for stated purposes","Shared publicly"], a:2, e:"GDPR principles: lawful processing, accuracy, security, purpose limitation, storage limitation.", ch:7, d:2},

  // ═══════════════ CHAPTER 8: ONLINE COMMUNITIES (20 questions) ═══════════════
  {q:"Which is a Virtual Learning Environment (VLE)?", o:["Facebook","Google Classroom","TikTok","Pinterest"], a:1, e:"VLEs deliver courses and educational resources online — Google Classroom, Moodle are examples.", ch:8, d:1},
  {q:"In CRAAB, what does 'A' stand for (both)?", o:["Age and Authenticity","Authority and Accuracy","Audience and Argument","Author and Article"], a:1, e:"CRAAB = Currency, Relevance, Authority, Accuracy, Bias.", ch:8, d:1},
  {q:"An AUP (Acceptable Use Policy) is:", o:["Antivirus","Document users agree to defining behaviour rules","A wireless protocol","Backup procedure"], a:1, e:"AUP defines what users can/cannot do on a network — typically signed before access.", ch:8, d:1},
  {q:"The BEST way to avoid plagiarism is:", o:["Copy and paste","Paraphrase without citing","Quote or paraphrase AND cite sources","Use only your own ideas"], a:2, e:"To avoid plagiarism: paraphrase OR quote AND credit the original source.", ch:8, d:1},
  {q:"Beware of online misrepresentation because:", o:["Forums are illegal","People may not be who they claim","Forums use bandwidth","Forums need payment"], a:1, e:"Online identity can't be verified — strangers may pretend to be anyone.", ch:8, d:1},
  {q:"What is a 'wiki'?", o:["A type of antivirus","A website where users can collaboratively edit content","A messaging app","A search engine"], a:1, e:"Wikis (e.g. Wikipedia) allow users to collaboratively create and edit pages.", ch:8, d:1},
  {q:"Which is NOT a type of online community?", o:["Social networking","Online gaming","VLE","Storage device"], a:3, e:"Storage device is hardware, not a community. Communities: social, gaming, VLE, workspaces, wikis, blogs, bookmarking.", ch:8, d:1},
  {q:"A blog is BEST described as:", o:["A search engine","A user-created website typically arranged as dated posts","A type of malware","A video game"], a:1, e:"Blogs are websites where authors post entries (usually dated) on topics they care about.", ch:8, d:1},
  {q:"Copyright protection typically lasts for:", o:["10 years","About 70 years after the author's death","Forever","Until someone copies it"], a:1, e:"Copyright generally lasts ~70 years after the author's death (varies by country).", ch:8, d:2},
  {q:"Microsoft Teams and Slack are examples of:", o:["Wikis","Online workspaces","Online games","Social bookmarking"], a:1, e:"Online workspaces enable team collaboration: chat, files, video, project management.", ch:8, d:1},
  {q:"In CRAAB, 'Currency' means:", o:["The price","How RECENT the information is","The currency it's in","Who the author is"], a:1, e:"Currency = how up-to-date the information is. Important for fast-changing topics.", ch:8, d:1},
  {q:"In CRAAB, 'Bias' refers to:", o:["Mathematical formula","Whether the source is neutral or pushing an agenda","Page download speed","Author's age"], a:1, e:"Bias = whether the source has a neutral viewpoint or is pushing an agenda. Check funding and motivation.", ch:8, d:1},
  {q:"For evaluating a website's credibility, look at the:", o:["Number of images","Domain (.gov, .edu, .org) + author credentials + cited sources","Background colour","Number of ads"], a:1, e:"Credibility indicators: trusted domain (.gov, .edu, .org), expert authors, cited sources, recent updates.", ch:8, d:2},
  {q:"Online safety rule for personal information:", o:["Share freely","Never share full name, address, phone, school","Share with everyone","Post publicly"], a:1, e:"Never share personally identifying information online — protects against identity theft and stalking.", ch:8, d:1},
  {q:"What should you do if approached by an online stranger to meet?", o:["Meet them quickly","Tell a trusted adult; never meet alone","Share your home address","Send your photo"], a:1, e:"Always tell a trusted adult about online approaches; never meet strangers alone.", ch:8, d:1},
  {q:"What is social bookmarking?", o:["Saving and sharing web links","Marking textbooks","Reading books online","Buying books"], a:0, e:"Social bookmarking lets users save and share useful web links — Pinterest, Pocket are examples.", ch:8, d:1},
  {q:"For a school discussion forum, the most important AUP rules include:", o:["No bullying + appropriate content + password security","Type fast","Use only one device","Post lots of pictures"], a:0, e:"AUPs typically cover: no bullying/harassment, only appropriate content, password security, consequences of breach.", ch:8, d:2},
  {q:"A VLOG is:", o:["A virtual log","A video blog","A volume log","A virus log"], a:1, e:"Vlog = video blog — typically posted on YouTube/TikTok.", ch:8, d:1},
  {q:"Why should you cite sources in your work?", o:["To make it longer","To credit the original author and avoid plagiarism","To slow down readers","To use more words"], a:1, e:"Citations credit original authors and protect you from plagiarism allegations.", ch:8, d:1},
  {q:"In CRAAB, 'Authority' means:", o:["Government","Who wrote it and their expertise/credentials","The website's owner","The publication date"], a:1, e:"Authority asks: who is the author? are they an expert? what are their qualifications?", ch:8, d:1},

  // ═══════════════ CHAPTER 9: ONLINE GOODS & CLOUD (20 questions) ═══════════════
  {q:"A 'persistent cookie':", o:["Deleted when browser closes","Stays until expiry date","Cannot be deleted","Is edible"], a:1, e:"Persistent cookies remain on device until expiry — used for tracking across sessions.", ch:9, d:1},
  {q:"Google Docs is an example of:", o:["SaaS","PaaS","IaaS","LAN"], a:0, e:"Google Docs = Software as a Service (SaaS) — application delivered fully over the internet.", ch:9, d:1},
  {q:"Disadvantage of cloud storage:", o:["Auto backup","Access anywhere","Needs internet to access","Scalable"], a:2, e:"Without internet you cannot access cloud-stored files — a major disadvantage vs local storage.", ch:9, d:1},
  {q:"Targeted marketing uses data about:", o:["Only your name","Pages visited, items viewed, purchases, location","Just your email","Just your password"], a:1, e:"Targeted marketing builds detailed profiles from browsing, purchases, location and demographics.", ch:9, d:1},
  {q:"Renting cloud virtual servers is:", o:["SaaS","PaaS","IaaS","Email server"], a:2, e:"IaaS = Infrastructure as a Service = rental of compute infrastructure (VMs, storage, networks).", ch:9, d:1},
  {q:"A 'session cookie':", o:["Stays forever","Deleted when browser closes","Sent by attackers","Costs money"], a:1, e:"Session cookies last only for the current browser session — deleted on close.", ch:9, d:1},
  {q:"Online banking lets users:", o:["Only see balance","Manage accounts 24/7: transfers, payments, statements","Buy stocks only","Just deposit cheques"], a:1, e:"Online banking enables full account management: transfers, payments, statements, 24/7.", ch:9, d:1},
  {q:"Heroku (developer platform) is:", o:["SaaS","PaaS","IaaS","Antivirus"], a:1, e:"Heroku = Platform as a Service — developer tools and runtime environment in the cloud.", ch:9, d:2},
  {q:"Streaming entertainment differs from downloading because:", o:["It's free","Content plays in real time without full download","It's faster","It needs more storage"], a:1, e:"Streaming plays content as it arrives — no need to wait for full download or use device storage.", ch:9, d:1},
  {q:"An auction site (e.g. eBay) is BEST described as:", o:["A search engine","A user-to-user bidding platform","A streaming service","An OS"], a:1, e:"Auction sites let users sell to each other via bidding — eBay being the prime example.", ch:9, d:1},
  {q:"Privacy concern about targeted marketing:", o:["Ads load faster","Detailed personal profiles built without explicit consent","Web slower","Pages are bigger"], a:1, e:"Targeted marketing builds detailed profiles of behaviour/preferences — concerns about privacy and consent.", ch:9, d:2},
  {q:"For a small business, an advantage of cloud computing is:", o:["Always works without internet","Scalability — pay for what you use, easy to grow","Highest security always","Free forever"], a:1, e:"Cloud scales easily — small business pays only for what they use, can grow without hardware purchase.", ch:9, d:2},
  {q:"Booking systems are useful because:", o:["Only work in person","Show real-time availability and prevent double-booking","Only work in one country","Don't store data"], a:1, e:"Online booking systems show live availability and prevent overlapping reservations.", ch:9, d:2},
  {q:"What is 'retargeting' in marketing?", o:["Choosing a target","Ads for items you viewed appearing on other sites","Changing your target","Targeting children"], a:1, e:"Retargeting shows ads for products you previously viewed on different sites — encourages return purchase.", ch:9, d:2},
  {q:"Online education examples include:", o:["Only YouTube","Coursera, FutureLearn, edX","Only Wikipedia","Only Google"], a:1, e:"Online education platforms: Coursera, FutureLearn, edX, MOOCs — courses delivered online.", ch:9, d:1},
  {q:"Third-party cookies are typically used by:", o:["The site you visit only","Advertisers — for tracking across multiple sites","Antivirus","Your ISP"], a:1, e:"Third-party cookies come from advertising networks and track users across multiple sites.", ch:9, d:2},
  {q:"Why might a hospital prefer LOCAL storage over cloud for patient records?", o:["Cheaper","Faster + works without internet + full control over data","More portable","Bigger storage"], a:1, e:"Local: no internet dependency for critical access, full data control, potentially better latency.", ch:9, d:3},
  {q:"Why might a startup prefer CLOUD over local servers?", o:["Slower","Lower upfront cost + scalable + automatic backups","Less reliable","Heavier"], a:1, e:"Cloud: no upfront server cost, scales with the business, professional backups — ideal for startup speed.", ch:9, d:3},
  {q:"To discuss 'the impact of online shopping on high street shops', mention:", o:["Only positives","Both sides: convenience and choice for shoppers; pressure on physical retailers","Only weather","Only one shop"], a:1, e:"Discuss questions need BOTH sides: benefits for consumers AND impact on traditional retailers.", ch:9, d:3},
  {q:"News services online are mainly:", o:["Slower than TV","Real-time updates with multimedia and search","Always free","Only text"], a:1, e:"Online news: real-time updates, multimedia (video/audio/text), searchable archives, personalisation.", ch:9, d:1},

  // ═══════════════ CHAPTER 10: PAPER 2 SOFTWARE SKILLS (24 questions) ═══════════════
  {q:"A primary key must be:", o:["The largest field","Unique to each record","Always a number","Encrypted"], a:1, e:"Primary key uniquely identifies each record — no two can share the same primary key.", ch:10, d:1},
  {q:"To count cells containing 'Pass':", o:["=COUNT(B:B)","=COUNTA(B:B)","=COUNTIF(B:B,\"Pass\")","=SUM(B:B)"], a:2, e:"COUNTIF counts cells matching a condition.", ch:10, d:1},
  {q:"In =$A$1*B2 copied down, $A$1 will:", o:["Change to $A$2","Change to A1","Stay as $A$1","Become #REF!"], a:2, e:"$ makes the reference absolute — stays fixed when copied.", ch:10, d:1},
  {q:"BEST chart for percentages of a whole:", o:["Line","Pie","Scatter","Bar"], a:1, e:"Pie charts show parts of a whole — percentages adding to 100%.", ch:10, d:1},
  {q:"A vector image is BEST for:", o:["Photographs","Portraits","Logos that scale to any size","Screenshots"], a:2, e:"Vectors use mathematical descriptions — scale to any size without quality loss.", ch:10, d:1},
  {q:"Validation checks:", o:["Data is correct","Data is in the right format","User is trustworthy","Hardware works"], a:1, e:"Validation checks FORMAT (range, type, length, presence). Verification checks correctness against source.", ch:10, d:1},
  {q:"A foreign key:", o:["Is always a primary key","Links to another table's primary key","Encrypts data","Is unused"], a:1, e:"Foreign key creates a relationship by referencing the primary key of another table.", ch:10, d:1},
  {q:"=AVERAGE(C2:C30) returns:", o:["The sum","The mean of values in C2:C30","The largest value","The count"], a:1, e:"AVERAGE returns the mean (sum divided by count) of the specified range.", ch:10, d:1},
  {q:"For checking that a phone number contains only digits, use:", o:["Range check","Type check","Format check","Presence check"], a:2, e:"Format check matches a pattern (e.g. all digits, correct length).", ch:10, d:2},
  {q:"For ensuring age is between 5 and 120:", o:["Range check","Type check","Format check","Lookup check"], a:0, e:"Range check verifies a value falls between min and max bounds.", ch:10, d:2},
  {q:"=IF(B5>=50,\"Pass\",\"Fail\") will:", o:["Always return Pass","Always return Fail","Return Pass if B5 is 50+, else Fail","Cause an error"], a:2, e:"IF tests a condition; returns first value if TRUE, second if FALSE.", ch:10, d:1},
  {q:"Bitmap images:", o:["Use mathematical shapes","Are made of pixels","Always scale perfectly","Have unlimited resolution"], a:1, e:"Bitmaps are pixel grids — degrade when scaled up (pixelation).", ch:10, d:1},
  {q:"JPG is which type of image?", o:["Vector","Bitmap","Audio","Database"], a:1, e:"JPG is a bitmap (pixel-based) format — common for photos.", ch:10, d:1},
  {q:"SVG is which type?", o:["Vector","Bitmap","Audio","Database"], a:0, e:"SVG = Scalable Vector Graphics — mathematical shape descriptions.", ch:10, d:1},
  {q:"Mail merge combines:", o:["Two emails","A template + a data source = personalised copies","Two databases","Photo + text"], a:1, e:"Mail merge: template document + data source (spreadsheet/database) produces personalised copies.", ch:10, d:1},
  {q:"For a business letter, what comes between recipient address and 'Yours sincerely'?", o:["Date","Salutation, body, complimentary close","Phone number","Signature only"], a:1, e:"Letter structure: addresses + date + salutation + body + complimentary close + signature.", ch:10, d:1},
  {q:"A memo (memorandum) does NOT include:", o:["To: From: Date: Subject:","Salutation and complimentary close","Body text","Heading"], a:1, e:"Memos use header (To/From/Date/Subject) + body. No 'Dear X' or 'Yours sincerely'.", ch:10, d:1},
  {q:"VLOOKUP searches:", o:["The last row","The first column of a range and returns from another column","Only horizontally","Random cells"], a:1, e:"VLOOKUP scans the first column vertically for a match, then returns a value from a specified column.", ch:10, d:2},
  {q:"BEST chart for trends OVER TIME:", o:["Pie","Bar","Line","Scatter"], a:2, e:"Line charts excel at showing continuous trends over time — date on x-axis, value on y-axis.", ch:10, d:1},
  {q:"BEST chart for correlation between two variables:", o:["Pie","Bar","Line","Scatter"], a:3, e:"Scatter plots show the relationship between two variables (each point = one observation).", ch:10, d:2},
  {q:"What does =LEN(A2) return?", o:["The largest value","Number of characters in A2","Always 1","An error"], a:1, e:"LEN returns the number of characters in a text string.", ch:10, d:1},
  {q:"In a database, a 'record' is:", o:["A single field","One row containing all data about an entity","An entire table","A single value"], a:1, e:"Record = one row = all the data about one entity (e.g. one student's complete information).", ch:10, d:1},
  {q:"Why use absolute references ($A$1)?", o:["To make formulas look prettier","To lock cells you don't want to change when copied","To save space","No reason"], a:1, e:"Use $ to lock cells you DON'T want to change when copying (e.g. tax rate, conversion factor).", ch:10, d:2},
  {q:"Every chart MUST have:", o:["Animation","Title + axis labels with units + legend (if multiple series)","Background colour","Many fonts"], a:1, e:"Every chart needs a title, axis labels (with units), and a legend if it has multiple series.", ch:10, d:2}
];

/* ═══════════════════════════════════════════════════════════════════════════
   ESSAY/EXTENDED QUESTIONS WITH MARK SCHEMES
   Each: {q, marks, ch, mark_scheme: [points worth N marks each], keywords: [must mention these]}
   ═══════════════════════════════════════════════════════════════════════════ */

const ESSAY_BANK = [
  // CHAPTER 1
  {
    q: "Explain what is meant by the term 'convergence' in digital devices. Give one example.",
    marks: 3, ch: 1,
    mark_scheme: [
      "Definition: process by which different types of digital devices become more similar in features over time (1)",
      "Specific example: e.g. smartphones and tablets now share touchscreens, cameras, GPS, internet (1)",
      "Consequence: boundary between device types has become unclear / one device can perform tasks that needed separate devices (1)"
    ],
    keywords: ["similar", "over time", "features", "example", "smartphone", "tablet"]
  },
  {
    q: "A nurse works in a hospital and needs to access patient records while moving between wards. Identify a suitable device and explain TWO reasons why it is suitable.",
    marks: 4, ch: 1,
    mark_scheme: [
      "Device named: tablet (1)",
      "Feature 1 (e.g. portability) developed with scenario — lightweight, easy to carry between wards (1+1)",
      "Feature 2 (e.g. touchscreen UI / Wi-Fi connectivity / battery life) developed with scenario detail (1+1)"
    ],
    keywords: ["tablet", "portability", "touchscreen", "lightweight", "Wi-Fi", "battery"]
  },
  {
    q: "Explain what is meant by a 'multifunctional device'. Give one advantage and one disadvantage.",
    marks: 4, ch: 1,
    mark_scheme: [
      "Definition: single device combining functions of several separate devices (1)",
      "Advantage with explanation: e.g. one device to carry / saves cost of buying separate devices (1+1)",
      "Disadvantage with explanation: e.g. if it breaks, ALL functions lost / specialist devices often do each job better (1+1)"
    ],
    keywords: ["one device", "many functions", "smartphone", "advantage", "disadvantage", "breaks", "broken", "lost"]
  },
  {
    q: "Describe how a GPS navigation device uses satellites to determine location.",
    marks: 4, ch: 1,
    mark_scheme: [
      "Satellites in orbit transmit signals containing position and time (1)",
      "GPS device receives signals from 3+ satellites (1)",
      "Device calculates distance from each satellite using signal travel time (1)",
      "Triangulation: 3 distances pinpoint one unique 2D location (4+ for 3D / altitude) (1)"
    ],
    keywords: ["satellite", "signal", "receive", "distance", "triangulat", "three", "3"]
  },
  {
    q: "A graphic designer works in a studio editing high-resolution images and 4K video. Identify a suitable device and explain TWO reasons why it is appropriate.",
    marks: 4, ch: 1,
    mark_scheme: [
      "Device: desktop PC (1)",
      "Performance: very fast CPU + lots of RAM for demanding software (1+1)",
      "Expansion / large display / mains power for sustained heavy use (1+1)"
    ],
    keywords: ["desktop", "performance", "RAM", "CPU", "GPU", "expansion", "monitor", "mains"]
  },

  // CHAPTER 2
  {
    q: "Describe THREE functions of an operating system.",
    marks: 6, ch: 2,
    mark_scheme: [
      "Memory management: allocates RAM to running programs (1+1)",
      "Resource management / hardware management: shares CPU, printers, files (1+1)",
      "Security: user accounts, passwords, access rights / Print spooling (1+1)"
    ],
    keywords: ["memory", "RAM", "hardware", "security", "spooling", "manage"]
  },
  {
    q: "Explain the differences between open-source and proprietary software. Give one example of each.",
    marks: 5, ch: 2,
    mark_scheme: [
      "Open-source: source code public and modifiable (1)",
      "Proprietary: source code hidden, illegal to modify, paid licence (1)",
      "Open-source typically free + community support (1)",
      "Proprietary typically paid + official vendor support (1)",
      "Examples: Open: Linux/Firefox/GIMP; Proprietary: Windows/Photoshop (1)"
    ],
    keywords: ["source code", "modifi", "free", "licence", "Linux", "Firefox", "Windows", "support"]
  },
  {
    q: "Explain TWO reasons why software should be updated regularly.",
    marks: 4, ch: 2,
    mark_scheme: [
      "Reason 1: patch security holes — fix vulnerabilities to protect from malware (1+1)",
      "Reason 2: fix bugs / add new features / maintain compatibility (1+1)"
    ],
    keywords: ["security", "patch", "bug", "fix", "malware", "vulnerability", "features", "compatib"]
  },
  {
    q: "Discuss the benefits of using utility software on a computer system.",
    marks: 6, ch: 2,
    mark_scheme: [
      "Antivirus: detects/removes malware to protect data (1+1)",
      "Backup software: protects against data loss / hardware failure / ransomware (1+1)",
      "Disk cleanup or compression: frees space / improves performance (1+1)"
    ],
    keywords: ["antivirus", "backup", "malware", "data loss", "cleanup", "compression", "performance"]
  },

  // CHAPTER 3
  {
    q: "Compare HDD and SSD storage on FOUR features.",
    marks: 8, ch: 3,
    mark_scheme: [
      "Speed: SSD much faster (no moving parts vs spinning disk) (1+1)",
      "Durability: SSD more durable (no moving parts vs fragile platters) (1+1)",
      "Capacity/cost: HDD typically larger capacity per £ (1+1)",
      "Power use / silent / portable: SSD lower power, silent (1+1)"
    ],
    keywords: ["SSD", "HDD", "speed", "fast", "durab", "moving parts", "capacity", "cost", "power"]
  },
  {
    q: "Explain the difference between OMR and OCR. Give one use of each.",
    marks: 4, ch: 3,
    mark_scheme: [
      "OMR: Optical Mark Recognition — detects marks at fixed positions (1)",
      "OMR use: multiple-choice exam papers, voting forms (1)",
      "OCR: Optical Character Recognition — converts scanned text to editable digital text (1)",
      "OCR use: digitising books, reading addresses on envelopes (1)"
    ],
    keywords: ["OMR", "OCR", "mark", "character", "text", "exam", "scan", "edit"]
  },
  {
    q: "A library wants to digitise its physical book collection so the books can be searched and edited as text. Recommend a suitable input device and justify your choice.",
    marks: 4, ch: 3,
    mark_scheme: [
      "Device: scanner with OCR software (1)",
      "Reason 1: scanner captures the page image (1)",
      "Reason 2: OCR converts image to editable text — searchable, editable (1+1)"
    ],
    keywords: ["OCR", "scanner", "text", "editable", "searchable", "digitis"]
  },

  // CHAPTER 4
  {
    q: "Compare RAM and ROM. Include FOUR differences.",
    marks: 8, ch: 4,
    mark_scheme: [
      "RAM is volatile (loses content); ROM is non-volatile (1+1)",
      "RAM is read/write; ROM is read-only (1+1)",
      "RAM holds running programs; ROM holds boot/start-up instructions (BIOS) (1+1)",
      "RAM size affects multitasking; ROM size is fixed at manufacture (1+1)"
    ],
    keywords: ["volatile", "non-volatile", "read", "write", "running", "boot", "BIOS", "RAM", "ROM"]
  },
  {
    q: "Describe the fetch-decode-execute cycle.",
    marks: 4, ch: 4,
    mark_scheme: [
      "Fetch: CPU retrieves next instruction from RAM (1)",
      "Decode: instruction is translated into actions (1)",
      "Execute: ALU performs the operation (1)",
      "Store: result returned to RAM (or register) for next cycle (1)"
    ],
    keywords: ["fetch", "decode", "execute", "RAM", "ALU", "instruction", "store"]
  },
  {
    q: "A user wants to speed up their slow computer. Recommend TWO hardware changes and explain how each helps.",
    marks: 4, ch: 4,
    mark_scheme: [
      "Add more RAM — more programs can stay in fast memory, fewer slow disk swaps (1+1)",
      "Upgrade HDD to SSD — much faster read/write so files open quickly (1+1) / OR faster CPU (1+1)"
    ],
    keywords: ["RAM", "SSD", "CPU", "memory", "speed", "fast", "swap"]
  },

  // CHAPTER 5
  {
    q: "Compare Wi-Fi and Bluetooth on FOUR features.",
    marks: 8, ch: 5,
    mark_scheme: [
      "Range: Wi-Fi ~50m, Bluetooth ~10m (1+1)",
      "Speed: Wi-Fi faster (>100Mbps), Bluetooth slower (~2Mbps) (1+1)",
      "Best use: Wi-Fi for internet/large files, Bluetooth for device pairing (1+1)",
      "Power use: Wi-Fi higher, Bluetooth lower (1+1)"
    ],
    keywords: ["Wi-Fi", "Bluetooth", "range", "speed", "power", "internet", "pairing"]
  },
  {
    q: "Explain the difference between bandwidth and latency. Give one situation where each is important.",
    marks: 4, ch: 5,
    mark_scheme: [
      "Bandwidth: max data transferred per second (1)",
      "Bandwidth important for: downloading large files, streaming HD video (1)",
      "Latency: delay between sending and response (1)",
      "Latency important for: video calls, online gaming (1)"
    ],
    keywords: ["bandwidth", "latency", "data", "second", "delay", "streaming", "gaming", "video"]
  },
  {
    q: "Describe THREE differences between a LAN and a WAN.",
    marks: 6, ch: 5,
    mark_scheme: [
      "LAN covers a small area (single site), WAN covers a large geographic area (1+1)",
      "LAN owned by one organisation, WAN often multi-organisation (1+1)",
      "LAN typically faster + cheaper; WAN slower + requires telecom infrastructure (1+1)"
    ],
    keywords: ["LAN", "WAN", "local", "wide", "area", "geographic", "organisation", "speed", "internet"]
  },

  // CHAPTER 6
  {
    q: "Discuss the benefits of a client-server network for a school. Include at least THREE benefits.",
    marks: 6, ch: 6,
    mark_scheme: [
      "Centralised admin: users managed centrally, easier policy enforcement (1+1)",
      "Centralised backups: automated, all important data protected (1+1)",
      "Centralised security: stronger security than P2P, access rights enforceable (1+1)"
    ],
    keywords: ["centralised", "server", "client", "backup", "security", "access rights", "admin"]
  },
  {
    q: "Explain the difference between phishing and pharming. Why is pharming considered more dangerous?",
    marks: 5, ch: 6,
    mark_scheme: [
      "Phishing: fraudulent email/message tricks user into giving credentials (1)",
      "Phishing relies on the USER MAKING A MISTAKE (clicking the link) (1)",
      "Pharming: silently redirects user from real site to fake one via DNS attack (1)",
      "Pharming requires NO user mistake — user types the correct URL but is redirected (1)",
      "Pharming is more dangerous because even careful users can be fooled (1)"
    ],
    keywords: ["phishing", "pharming", "DNS", "redirect", "user mistake", "silent", "fake", "URL"]
  },
  {
    q: "Describe FOUR methods to protect a network from unauthorised access.",
    marks: 8, ch: 6,
    mark_scheme: [
      "Firewall: filters network traffic by rules (1+1)",
      "Encryption / VPN: data unreadable to intercepters (1+1)",
      "Strong passwords + MFA: hard to guess + 2 factors (1+1)",
      "Access rights: limit what each user can do; biometric / anti-malware (1+1)"
    ],
    keywords: ["firewall", "encryption", "VPN", "password", "MFA", "access right", "biometric", "anti-malware"]
  },

  // CHAPTER 7
  {
    q: "Discuss the advantages and disadvantages of working from home for an EMPLOYEE.",
    marks: 6, ch: 7,
    mark_scheme: [
      "Advantage: no commute saves time/money/stress (1+1)",
      "Advantage: flexible hours, better work-life balance (1+1)",
      "Disadvantage: distractions at home, isolation from colleagues, no in-person collaboration (1+1)"
    ],
    keywords: ["commute", "flexible", "work-life", "isolation", "distraction", "advantage", "disadvantage"]
  },
  {
    q: "Explain what is meant by the 'digital divide' and discuss TWO of its consequences.",
    marks: 5, ch: 7,
    mark_scheme: [
      "Definition: gap between those with good access to internet/devices and those without (1)",
      "Consequence 1: excluded from online services (banking, government, shopping) (1+1)",
      "Consequence 2: excluded from online education / jobs requiring digital skills (1+1)"
    ],
    keywords: ["digital divide", "gap", "access", "internet", "excluded", "services", "education"]
  },
  {
    q: "Under data protection law (GDPR), describe THREE rights individuals have over their personal data.",
    marks: 6, ch: 7,
    mark_scheme: [
      "Right to access: ask what data is held (1+1)",
      "Right to erasure ('right to be forgotten'): request deletion (1+1)",
      "Right to correction: fix inaccurate data (1+1)"
    ],
    keywords: ["right", "access", "erasure", "forgotten", "delete", "correct", "GDPR", "personal data"]
  },
  {
    q: "Describe THREE health risks from prolonged ICT use and explain how each can be prevented.",
    marks: 6, ch: 7,
    mark_scheme: [
      "RSI (repetitive strain injury) from typing/mousing — take breaks + ergonomic keyboard (1+1)",
      "Eye strain from screens — 20-20-20 rule, anti-glare screen, brightness (1+1)",
      "Back/neck pain from poor posture — adjustable chair, monitor at eye level (1+1)"
    ],
    keywords: ["RSI", "eye strain", "back", "neck", "posture", "break", "ergonomic", "20-20-20"]
  },

  // CHAPTER 8
  {
    q: "Describe FOUR rules for staying safe in online communities.",
    marks: 4, ch: 8,
    mark_scheme: [
      "Never share personal data: name, address, school, phone (1)",
      "Strong unique passwords; don't reuse (1)",
      "Don't meet online strangers in person; tell trusted adult (1)",
      "Report cyberbullying; check privacy settings (1)"
    ],
    keywords: ["personal data", "password", "stranger", "meet", "bullying", "privacy", "share"]
  },
  {
    q: "Explain the CRAAB framework for evaluating online information.",
    marks: 5, ch: 8,
    mark_scheme: [
      "Currency: how recent is the information (1)",
      "Relevance: does it answer your question (1)",
      "Authority: who wrote it; are they an expert (1)",
      "Accuracy: are sources cited / verifiable (1)",
      "Bias: is it neutral or pushing an agenda (1)"
    ],
    keywords: ["CRAAB", "currency", "relevance", "authority", "accuracy", "bias", "recent", "expert"]
  },
  {
    q: "Explain what plagiarism is and describe TWO ways to avoid it.",
    marks: 4, ch: 8,
    mark_scheme: [
      "Plagiarism: presenting someone else's work or ideas as your own (1)",
      "Avoidance 1: paraphrase + cite the original source (1+1)",
      "Avoidance 2: quote with quotation marks + cite source (1+1)"
    ],
    keywords: ["plagiarism", "own", "paraphrase", "quote", "cite", "source", "credit"]
  },

  // CHAPTER 9
  {
    q: "Discuss the advantages and disadvantages of cloud storage compared to local storage.",
    marks: 6, ch: 9,
    mark_scheme: [
      "Cloud adv: access from any device with internet / automatic backup / scalable (1+1)",
      "Cloud disadv: requires internet, ongoing subscription cost (1+1)",
      "Trust provider with data; security concerns; local fully under user control (1+1)"
    ],
    keywords: ["cloud", "local", "access", "internet", "backup", "subscription", "security", "scalab"]
  },
  {
    q: "Explain what cookies are. Describe ONE benefit and ONE drawback for the user.",
    marks: 4, ch: 9,
    mark_scheme: [
      "Definition: small text files stored on user's device by a website (1)",
      "Benefit: remembers login/preferences/cart — more convenient (1+1)",
      "Drawback: tracks browsing across sites; privacy concerns / targeted ads (1+1)"
    ],
    keywords: ["cookie", "text file", "website", "remember", "login", "track", "privacy", "advertis"]
  },
  {
    q: "Describe the differences between SaaS, PaaS, and IaaS.",
    marks: 6, ch: 9,
    mark_scheme: [
      "SaaS: complete application delivered over internet (e.g. Google Docs) (1+1)",
      "PaaS: platform with development tools for developers (e.g. Heroku) (1+1)",
      "IaaS: rental of computing infrastructure — VMs, storage (e.g. AWS EC2) (1+1)"
    ],
    keywords: ["SaaS", "PaaS", "IaaS", "software", "platform", "infrastructure", "Google Docs", "Heroku", "AWS"]
  },

  // CHAPTER 10
  {
    q: "Explain the difference between validation and verification in databases. Give one example of each.",
    marks: 4, ch: 10,
    mark_scheme: [
      "Validation: automatic rule-checking that data meets format criteria before being accepted (1)",
      "Example: range check for age 5-120 (1)",
      "Verification: human checking that data entered matches the source document (1)",
      "Example: proofreading data entry / double entry (1)"
    ],
    keywords: ["validation", "verification", "format", "rule", "human", "proofread", "double", "example"]
  },
  {
    q: "Describe FOUR validation checks with examples.",
    marks: 8, ch: 10,
    mark_scheme: [
      "Presence check: field not blank (e.g. email required) (1+1)",
      "Range check: value within min/max (e.g. age 5-120) (1+1)",
      "Format check: matches pattern (e.g. date DD/MM/YYYY) (1+1)",
      "Length check / Type check / Lookup check (1+1)"
    ],
    keywords: ["validation", "presence", "range", "format", "length", "type", "lookup", "example"]
  },
  {
    q: "Compare bitmap and vector images on THREE features. Give one example file format of each.",
    marks: 7, ch: 10,
    mark_scheme: [
      "Made of: bitmap = pixels in grid; vector = mathematical shapes (1+1)",
      "Scaling: bitmap pixelates when enlarged; vector stays sharp (1+1)",
      "Best use: bitmap for photos; vector for logos/icons (1+1)",
      "Formats: bitmap = JPG/PNG; vector = SVG/AI (1)"
    ],
    keywords: ["bitmap", "vector", "pixel", "shape", "scal", "pixelat", "sharp", "JPG", "PNG", "SVG"]
  },
  {
    q: "Explain absolute and relative cell references in a spreadsheet. When should each be used?",
    marks: 4, ch: 10,
    mark_scheme: [
      "Relative (A1): reference adjusts when formula is copied (1)",
      "Use relative for: values that should change row by row (1)",
      "Absolute ($A$1): reference stays fixed when copied (1)",
      "Use absolute for: locked values like tax rate, conversion factor (1)"
    ],
    keywords: ["relative", "absolute", "$", "copy", "fix", "lock", "change", "tax", "conversion"]
  },
  {
    q: "Describe how mail merge works and explain ONE benefit for a business.",
    marks: 5, ch: 10,
    mark_scheme: [
      "Template document created with merge field placeholders (1)",
      "Data source (spreadsheet/database) holds list of recipients with details (1)",
      "Merge generates personalised copies, one per recipient (1)",
      "Benefit: produces hundreds of personalised letters quickly without retyping (1+1)"
    ],
    keywords: ["mail merge", "template", "data source", "merge field", "personalis", "spreadsheet"]
  },

  // ═══════════════ SCENARIO ESSAYS — Real exam-style application questions ═══════════════
  // These mirror the increasingly scenario-based nature of recent Edexcel papers.
  // Each question describes a specific real-world situation and asks the student to apply
  // ICT knowledge to that scenario.

  // CH 1 — Device selection scenarios
  {
    q: "A small mobile vet visits farms across rural areas to treat animals. They need a portable device to access patient records, take photographs of injuries, and send invoices to clients. Recommend a suitable device and justify your choice using THREE features.",
    marks: 6, ch: 1,
    mark_scheme: [
      "Device: smartphone or tablet (1)",
      "Portability — small/lightweight, works on the move between farms (1+1)",
      "Camera — built-in for photographing animal injuries (1+1)",
      "Connectivity (4G/5G) — works in rural areas without Wi-Fi; sends invoices anywhere (1+1)"
    ],
    keywords: ["smartphone", "tablet", "portab", "camera", "4G", "5G", "connectiv", "battery", "rural"]
  },
  {
    q: "A construction site manager needs a device to take site photos, fill in safety inspection forms, view building plans, and communicate with the office. The device must withstand dust and occasional drops. Identify a suitable device and justify your choice.",
    marks: 6, ch: 1,
    mark_scheme: [
      "Device: ruggedised tablet (1)",
      "Touchscreen UI — easy to use with work gloves on (1+1)",
      "Durable casing — withstands dust, drops, harsh site conditions (1+1)",
      "Portability + camera + 4G connectivity for site-to-office communication (1+1)"
    ],
    keywords: ["tablet", "rugged", "touchscreen", "durab", "camera", "portab", "4G"]
  },
  {
    q: "An online bookshop processes around 200,000 orders per day, with peaks of 50,000 orders per hour during sales events. The company needs reliable computing infrastructure. Discuss whether a mainframe computer or a network of high-end servers would be more suitable.",
    marks: 6, ch: 1,
    mark_scheme: [
      "Mainframe advantage: handles many simultaneous transactions reliably 24/7 (1+1)",
      "Mainframe disadvantage: very expensive to purchase and maintain (1)",
      "Network of servers advantage: scalable, cheaper, can add servers during peak (1+1)",
      "Balanced conclusion — for this volume either could work; cloud-based servers often best (1)"
    ],
    keywords: ["mainframe", "server", "concurrent", "scalab", "reliab", "expens", "cloud"]
  },

  // CH 2 — Software scenarios
  {
    q: "A primary school is choosing software for its students aged 5-11 to use for writing stories, drawing pictures, and learning. They have a limited budget. Recommend a SOFTWARE STRATEGY (open-source vs proprietary) and justify with TWO arguments on each side.",
    marks: 6, ch: 2,
    mark_scheme: [
      "Open-source advantages: no licensing cost; can be modified for educational needs (1+1)",
      "Open-source disadvantages: less professional support; may be harder for staff to learn (1+1)",
      "Conclusion with justification — for tight budget, open-source like LibreOffice + GIMP makes sense (1+1)"
    ],
    keywords: ["open-source", "licens", "cost", "support", "free", "modify", "school"]
  },
  {
    q: "A graphic design agency has been experiencing crashes and slow performance on all 20 computers. The IT manager believes utility software could help. Describe THREE different utility programs they should install and explain how each would help.",
    marks: 6, ch: 2,
    mark_scheme: [
      "Anti-malware — detects/removes malware causing slowdowns/crashes (1+1)",
      "Disk cleanup / defragmenter — frees space and reorganises files for faster access (1+1)",
      "Backup software — protects work in case of crash/corruption (1+1)"
    ],
    keywords: ["anti-malware", "antivirus", "disk cleanup", "backup", "utility", "performance", "defrag"]
  },
  {
    q: "A multinational corporation is debating whether to keep using Windows (proprietary) or switch all 5,000 office computers to Linux (open-source). Discuss this decision with at least TWO points on each side.",
    marks: 6, ch: 2,
    mark_scheme: [
      "Linux advantages: zero licensing cost (massive saving at 5,000 PCs); can be customised (1+1)",
      "Linux disadvantages: staff retraining costs; some business software incompatible (1+1)",
      "Windows advantages: established support; staff familiar; broad software compatibility (1+1)"
    ],
    keywords: ["Linux", "Windows", "licens", "training", "compatib", "support", "open-source"]
  },

  // CH 3 — Peripheral & storage scenarios
  {
    q: "A library is digitising 50,000 books so users can search the full text online. Recommend the input device(s) they should use and describe the process from physical book to searchable digital file.",
    marks: 6, ch: 3,
    mark_scheme: [
      "Device: scanner WITH OCR software (1+1)",
      "Process: pages photographed by scanner produces image of each page (1)",
      "OCR (Optical Character Recognition) converts page image into editable text (1+1)",
      "Text indexed for searching, stored in database (1)"
    ],
    keywords: ["scanner", "OCR", "image", "text", "searchable", "digital", "index"]
  },
  {
    q: "A YouTube content creator records 4K videos. Each one-hour recording is 30 GB. They produce 5 videos per week. Recommend a suitable storage strategy including PRIMARY and BACKUP storage, with capacities.",
    marks: 7, ch: 3,
    mark_scheme: [
      "Primary: fast SSD (e.g. 2 TB) for editing — needs speed for 4K (1+1)",
      "Calculation: 5 videos x 30GB x ~10 weeks = ~1.5 TB working storage required (1)",
      "Backup 1: large external HDD (e.g. 8 TB) — cheap per GB for archives (1+1)",
      "Backup 2: cloud storage for off-site protection against fire/theft (1+1)"
    ],
    keywords: ["SSD", "HDD", "cloud", "4K", "TB", "backup", "external"]
  },
  {
    q: "A hospital's pharmacy department is choosing how to identify medications: barcode scanners, QR codes, or RFID tags. Compare these three input methods and recommend the best for medication safety. Justify your choice.",
    marks: 8, ch: 3,
    mark_scheme: [
      "Barcode: cheap, mature, but needs line-of-sight, limited data (1+1)",
      "QR code: stores more data than barcode, still needs line-of-sight (1+1)",
      "RFID: reads without line-of-sight, faster bulk scanning, more expensive tags (1+1)",
      "Recommendation: RFID for inventory control + barcode for individual dispensing (justified for safety) (1+1)"
    ],
    keywords: ["barcode", "QR", "RFID", "line of sight", "scan", "tag", "data", "cost"]
  },

  // CH 4 — Memory / processor scenarios
  {
    q: "A user's 4-year-old laptop has become very slow. It has a HDD, 4 GB of RAM, and runs Windows 10. They cannot afford a new computer but want significantly better performance. Recommend TWO specific upgrades and explain how each would improve performance.",
    marks: 6, ch: 4,
    mark_scheme: [
      "Upgrade 1: replace HDD with SSD — much faster file access, apps and OS load in seconds (1+1+1)",
      "Upgrade 2: increase RAM from 4 GB to 8/16 GB — more programs in fast memory, less swapping (1+1+1)"
    ],
    keywords: ["SSD", "HDD", "RAM", "memory", "swap", "fast", "upgrade"]
  },
  {
    q: "A school's IT department is buying 30 new computers for the design technology lab. Students will use CAD software, 3D rendering, and video editing. List FOUR specifications they should prioritise and explain why each is important for these tasks.",
    marks: 8, ch: 4,
    mark_scheme: [
      "Powerful multi-core CPU — 3D rendering and video encoding are CPU-intensive (1+1)",
      "Dedicated GPU (graphics card) — CAD/3D needs GPU acceleration; integrated graphics insufficient (1+1)",
      "16+ GB RAM — large design files need lots of memory to manipulate (1+1)",
      "SSD storage — fast loading of large project files (1+1)"
    ],
    keywords: ["CPU", "GPU", "RAM", "SSD", "graphics", "core", "render"]
  },

  // CH 5 — Network scenarios
  {
    q: "A hotel wants to provide internet access to guests in all 200 rooms plus 5 lounges and a restaurant. The building is 6 stories high with thick concrete walls. Recommend a network design including the COMPONENTS needed and how they connect.",
    marks: 8, ch: 5,
    mark_scheme: [
      "Each floor: multiple Wireless Access Points (WAPs) to overcome thick walls (1+1)",
      "Wired Ethernet backbone connects all WAPs to central switches (1+1)",
      "Router connects internal LAN to ISP for internet (1+1)",
      "Firewall protects guest network; separate VLAN for staff/admin (1+1)"
    ],
    keywords: ["WAP", "wireless access point", "router", "ethernet", "switch", "firewall", "Wi-Fi"]
  },
  {
    q: "An online gaming company runs competitive multiplayer matches where players need response times under 30 milliseconds. The company has servers in 5 countries serving 2 million players. Explain TWO network considerations CRITICAL to their service and how they address them.",
    marks: 6, ch: 5,
    mark_scheme: [
      "Latency must be very low — servers must be geographically close to players to keep ping under 30ms (1+1+1)",
      "Bandwidth needed for many concurrent players — high-capacity fibre connections (1+1+1)"
    ],
    keywords: ["latency", "bandwidth", "ping", "fibre", "server", "geographic"]
  },
  {
    q: "A self-employed photographer travels constantly between locations. They need to upload large photo files (often 5 GB per session) to clients. Compare THREE connectivity options they could use, and recommend the best.",
    marks: 6, ch: 5,
    mark_scheme: [
      "5G/4G mobile data: works anywhere, but expensive at high data volumes (1+1)",
      "Public Wi-Fi: free but slow, unreliable, security risk (need VPN) (1+1)",
      "Tethering: phone hotspot — flexible but drains battery quickly (1)",
      "Recommendation: 5G with unlimited data plan + VPN for client work (1)"
    ],
    keywords: ["5G", "4G", "Wi-Fi", "tether", "hotspot", "mobile data", "VPN"]
  },

  // CH 6 — Security scenarios
  {
    q: "A small accountancy firm of 12 staff stores sensitive client tax records. Recently a competitor was attacked by ransomware and lost 3 weeks of work. The firm asks for security recommendations. Suggest FOUR specific measures and explain how each protects against threats.",
    marks: 8, ch: 6,
    mark_scheme: [
      "Regular automatic backups (preferably off-site/cloud) — restore data without paying ransom (1+1)",
      "Anti-malware software + regular updates — blocks known ransomware (1+1)",
      "Staff training on phishing — main entry point for ransomware (1+1)",
      "Strong passwords + MFA — prevents unauthorised access; access rights limit data exposure (1+1)"
    ],
    keywords: ["backup", "anti-malware", "ransomware", "phishing", "training", "MFA", "password"]
  },
  {
    q: "A school is moving from a peer-to-peer to a client-server network for 800 students and 60 staff. Discuss the benefits and any disadvantages, and recommend ONE additional security measure essential for this size of organisation.",
    marks: 8, ch: 6,
    mark_scheme: [
      "Benefit: centralised user accounts — easier to manage 860+ accounts (1+1)",
      "Benefit: centralised backups — automatic, no reliance on individual users (1+1)",
      "Benefit: access rights — students can't see staff files (1+1)",
      "Disadvantage: server hardware expensive; single point of failure (1)",
      "Additional measure: web filtering software (e.g. block harmful sites) — protects students (1)"
    ],
    keywords: ["client-server", "centralis", "access right", "backup", "user account", "filter", "server"]
  },
  {
    q: "An e-commerce website stores 50,000 customer credit card details. Describe FOUR specific security measures the company MUST implement to protect this data, and explain what each prevents.",
    marks: 8, ch: 6,
    mark_scheme: [
      "Encryption (e.g. AES) of stored card data — even if database stolen, data unreadable (1+1)",
      "HTTPS/TLS for all transactions — prevents data interception in transit (1+1)",
      "Firewall + intrusion detection — blocks unauthorised network access (1+1)",
      "Strong access controls + MFA for admin — limits who can access database (1+1)"
    ],
    keywords: ["encryption", "HTTPS", "TLS", "firewall", "MFA", "access", "card"]
  },

  // CH 7 — Operating online scenarios
  {
    q: "A medium-sized marketing agency has all 40 staff working from home since 2020. The directors want to bring everyone back to the office full-time, but staff are resisting. Evaluate the arguments on BOTH sides and reach a justified conclusion.",
    marks: 8, ch: 7,
    mark_scheme: [
      "Office advantages: easier collaboration, mentoring, team culture, security control (1+1)",
      "WFH advantages: no commute, work-life balance, wider talent pool, lower office costs (1+1)",
      "Disadvantages of each: office = inflexible, commute stress; WFH = isolation, security risks (1+1)",
      "Justified conclusion: hybrid model often best — e.g. 2-3 days office, rest WFH (1+1)"
    ],
    keywords: ["WFH", "office", "hybrid", "commute", "collaborat", "isolation", "flexib"]
  },
  {
    q: "A dental practice receives 200 patient inquiries via email per day, plus appointment requests through their website. They notice many emails appear to be phishing attempts. Recommend FOUR measures to protect both the practice and patient data.",
    marks: 8, ch: 7,
    mark_scheme: [
      "Staff training to recognise phishing emails (check sender, hover over links) (1+1)",
      "Anti-phishing/spam filter — blocks obvious phishing before reaching inbox (1+1)",
      "MFA on email accounts — even if password phished, account safe (1+1)",
      "Encrypted email for patient data + regular software updates (1+1)"
    ],
    keywords: ["phishing", "spam filter", "MFA", "training", "encryption", "update"]
  },
  {
    q: "Under GDPR a person has rights over their personal data. Describe a real-world scenario where a person might want to exercise the 'right to be forgotten', and explain what the organisation must legally do.",
    marks: 5, ch: 7,
    mark_scheme: [
      "Scenario: person leaves old gym; doesn't want them to keep using contact data for marketing (1+1)",
      "Person submits a Subject Access Request / erasure request (1)",
      "Organisation must delete personal data within 1 month (some exceptions apply) (1)",
      "Must confirm in writing that data is deleted (1)"
    ],
    keywords: ["right to be forgotten", "erasure", "GDPR", "delete", "personal data", "request"]
  },
  {
    q: "An office worker complains of back pain, eye strain, and headaches after long computer use. As their employer, describe FOUR specific actions you would take to address these health issues legally and practically.",
    marks: 8, ch: 7,
    mark_scheme: [
      "Workstation assessment — adjustable chair, monitor at eye level, ergonomic kit (1+1)",
      "Display Screen Equipment regulations — proper screen, lighting, anti-glare filter (1+1)",
      "Regular breaks — 20-20-20 rule for eye strain (1+1)",
      "Eye test offered (employer must legally provide for DSE users) (1+1)"
    ],
    keywords: ["ergonom", "chair", "monitor", "20-20-20", "break", "eye test", "RSI", "DSE"]
  },

  // CH 8 — Online community scenarios
  {
    q: "A college is launching an online forum where students can discuss schoolwork. Outline the FOUR key sections an Acceptable Use Policy (AUP) for the forum should contain, with an example rule for each.",
    marks: 8, ch: 8,
    mark_scheme: [
      "Acceptable behaviour: no bullying, harassment or discrimination (1+1)",
      "Content restrictions: only schoolwork topics; no inappropriate images or links (1+1)",
      "Privacy/security: no sharing personal info; strong passwords; report suspicious activity (1+1)",
      "Consequences: warnings → suspension → permanent ban depending on severity (1+1)"
    ],
    keywords: ["AUP", "acceptable", "behaviour", "content", "privacy", "consequence", "bullying"]
  },
  {
    q: "A 14-year-old is researching for a history project. They find a website claiming Britain never had a king named George VI. Apply the CRAAB framework to evaluate this source and recommend what they should do.",
    marks: 5, ch: 8,
    mark_scheme: [
      "Currency: check date of source — has it been updated recently? (1)",
      "Authority: who is the author? .gov / .edu / known historian? (1)",
      "Accuracy: does it cite sources / can claims be verified? (1)",
      "Bias: is there an agenda — denial of historical figures suggests bias (1)",
      "Recommendation: cross-reference with multiple credible sources (BBC, gov.uk, encyclopedia) (1)"
    ],
    keywords: ["CRAAB", "authority", "accuracy", "bias", "verify", "cross-reference", "currency"]
  },
  {
    q: "A YouTuber uses 30 seconds of a Beyoncé song in their cooking video. Two weeks later their channel is demonetised. Explain what has happened, what the YouTuber should have done, and what they could do now.",
    marks: 6, ch: 8,
    mark_scheme: [
      "What happened: copyright violation — used copyrighted music without permission/licence (1+1)",
      "Should have done: use royalty-free music OR obtain licence to use the song (1+1)",
      "Now: appeal if fair use applies; replace audio with royalty-free music; respect copyright in future (1+1)"
    ],
    keywords: ["copyright", "licens", "royalty-free", "permission", "fair use", "DMCA"]
  },

  // CH 9 — Cloud / online services scenarios
  {
    q: "A small dental practice with 3 dentists, 2 receptionists, and 800 patients is choosing how to store patient records: a local file server, cloud storage (e.g. Microsoft OneDrive), or a dedicated medical records SaaS application. Compare all three options and recommend ONE with justification.",
    marks: 9, ch: 9,
    mark_scheme: [
      "Local server: full control of data; works offline; high upfront cost; backup is responsibility (1+1)",
      "Cloud (OneDrive): low cost; accessible from any device; needs internet; general-purpose (not medical-specific) (1+1)",
      "Dedicated SaaS: medical-specific features (appointments, billing); compliant with health regulations; ongoing subscription (1+1)",
      "Recommendation with justification: SaaS — small practice can't manage server; specialist software fits workflow; vendor handles compliance (1+1+1)"
    ],
    keywords: ["cloud", "SaaS", "server", "local", "compliance", "subscription", "GDPR"]
  },
  {
    q: "A user purchases a new fridge online. They notice that for the next 2 weeks, fridge advertisements appear on almost every website they visit. Explain HOW this is technically achieved and identify ONE benefit and ONE concern for the user.",
    marks: 6, ch: 9,
    mark_scheme: [
      "Third-party cookies track user across websites (1+1)",
      "Advertising network knows user viewed/bought fridge — shows relevant ads (retargeting) (1+1)",
      "Benefit: ads more relevant; might find better prices/alternatives (1)",
      "Concern: privacy — detailed profile built without explicit consent (1)"
    ],
    keywords: ["cookie", "third-party", "track", "retarget", "advertis", "privacy", "profile"]
  },
  {
    q: "A traditional high street travel agent is losing customers to online booking sites. Discuss the impact of online booking on traditional travel agents and suggest TWO ways the high street agent could adapt to survive.",
    marks: 6, ch: 9,
    mark_scheme: [
      "Impact: customers can book 24/7 online cheaper than agent fees → fewer walk-in customers (1+1)",
      "Impact: high overhead costs (rent, staff) hard to compete with online margins (1)",
      "Adaptation 1: specialise in complex trips (multi-country, luxury) needing expert advice (1+1)",
      "Adaptation 2: build online presence + offer personal service / in-person consultation (1+1)"
    ],
    keywords: ["online booking", "high street", "compete", "adapt", "specialis", "expert", "service"]
  },
  {
    q: "A small charity wants to host a website with online donations. They expect 1,000 visitors per month, growing to 10,000 within 2 years. Recommend whether they should use cloud hosting or run their own server, with FOUR supporting reasons.",
    marks: 7, ch: 9,
    mark_scheme: [
      "Recommendation: cloud hosting (1)",
      "Low setup cost — no server hardware to buy (1+1)",
      "Scalable — automatically handles 10x growth without manual upgrades (1+1)",
      "Maintenance, security, backups handled by provider — charity has no IT staff (1+1)",
      "Reliability — cloud providers have 99.9%+ uptime, beyond a small charity's reach (1)"
    ],
    keywords: ["cloud", "host", "scalab", "maintenance", "uptime", "charity"]
  },

  // CH 10 — Practical scenarios
  {
    q: "A swimming club has 200 members. The treasurer currently tracks memberships in a paper folder. They want to move to a digital system. Design a database structure with TABLES and FIELDS, identifying primary keys and any relationships.",
    marks: 9, ch: 10,
    mark_scheme: [
      "Table 1: Members — Fields: MemberID (PK), Name, Address, DOB, ContactNumber, Email (1+1)",
      "Table 2: Memberships — Fields: MembershipID (PK), MemberID (FK), Type, StartDate, EndDate (1+1)",
      "Table 3: Payments — Fields: PaymentID (PK), MemberID (FK), Amount, Date, Method (1+1)",
      "Relationships: Members ↔ Memberships (1-to-many); Members ↔ Payments (1-to-many) (1+1+1)"
    ],
    keywords: ["table", "field", "primary key", "foreign key", "relationship", "MemberID", "PK", "FK"]
  },
  {
    q: "A teacher records all 30 students' test scores across 5 subjects in a spreadsheet. Describe FOUR features they should use to make the spreadsheet useful, and explain why each helps.",
    marks: 8, ch: 10,
    mark_scheme: [
      "Formulas (SUM, AVERAGE) — automatically calculate totals and averages per student/subject (1+1)",
      "Conditional formatting — colour cells red/green for fail/pass at a glance (1+1)",
      "Chart (e.g. bar chart) — visualise class performance per subject (1+1)",
      "Sort/filter — find top performers or students who failed in any subject (1+1)"
    ],
    keywords: ["formula", "AVERAGE", "SUM", "conditional", "chart", "filter", "sort"]
  },
  {
    q: "A restaurant wants to create a digital menu they can update easily. Compare using WORD PROCESSING software vs WEB AUTHORING software vs DESKTOP PUBLISHING software. Recommend the best and justify.",
    marks: 7, ch: 10,
    mark_scheme: [
      "Word processing (Word): familiar, simple — but limited layout/design control (1+1)",
      "Web authoring (HTML): can be updated easily online; needs technical knowledge (1+1)",
      "Desktop publishing (Publisher/InDesign): precise layout control, professional print-ready output (1+1)",
      "Recommendation with justification: depends — print menu = DTP; online menu = web authoring (1)"
    ],
    keywords: ["word processing", "web authoring", "DTP", "desktop publishing", "layout", "HTML"]
  },
  {
    q: "A florist creates a logo for her new business. She wants to use it on her van (large), business cards (small), website, and Instagram. Recommend the IMAGE FORMAT and explain why vector is preferable to bitmap for this specific use.",
    marks: 6, ch: 10,
    mark_scheme: [
      "Recommend vector format (SVG, AI, EPS) (1)",
      "Vector scales to any size without quality loss — works on van (huge) and business card (tiny) (1+1)",
      "Bitmap (JPG/PNG) would pixelate when enlarged for the van (1+1)",
      "Vector files smaller than bitmap for simple logos — faster web loading (1)"
    ],
    keywords: ["vector", "bitmap", "SVG", "scal", "pixelat", "logo", "JPG", "PNG"]
  },
  {
    q: "A bakery owner is creating a customer database with 500 entries. Identify FIVE specific validation checks she should apply, and give an example field for each.",
    marks: 10, ch: 10,
    mark_scheme: [
      "Presence check: Name field cannot be blank (1+1)",
      "Range check: Age must be between 18 and 120 (1+1)",
      "Format check: Email matches name@domain.com pattern (1+1)",
      "Length check: Phone number must be 10-11 digits (1+1)",
      "Lookup check: City selected from a dropdown of valid cities (1+1)"
    ],
    keywords: ["presence", "range", "format", "length", "lookup", "validation", "check"]
  },
  {
    q: "A travel blogger writes weekly newsletters to 5,000 subscribers, each personalised with the subscriber's name and the city closest to them. Explain how MAIL MERGE would automate this and identify the THREE components needed.",
    marks: 6, ch: 10,
    mark_scheme: [
      "Mail merge combines a template document with a data source (1+1)",
      "Component 1: Template — newsletter with merge fields like {{Name}}, {{City}} (1+1)",
      "Component 2: Data source — spreadsheet/database with subscribers' details (1+1)",
      "Component 3: Output — 5,000 personalised emails generated automatically (1)"
    ],
    keywords: ["mail merge", "template", "data source", "merge field", "personalis", "newsletter"]
  },

  // CROSS-TOPIC scenarios — testing application across multiple chapters
  {
    q: "A 6-form college is upgrading from a fully wired LAN to a hybrid with widespread Wi-Fi. They are also moving student work from local hard drives to cloud storage. Discuss TWO benefits and TWO concerns this brings, and identify ONE specific security measure for each change.",
    marks: 10, ch: 6,
    mark_scheme: [
      "Wi-Fi benefit: students can work anywhere on site with laptops/tablets (1+1)",
      "Cloud benefit: students access work from home; collaborative editing possible (1+1)",
      "Wi-Fi concern: signal can be intercepted — eavesdropping risk (1+1)",
      "Cloud concern: no internet = no access; data trusted to third party (1+1)",
      "Wi-Fi security: WPA3 encryption + filtering for inappropriate content (1)",
      "Cloud security: MFA on accounts + access rights per class/year group (1)"
    ],
    keywords: ["Wi-Fi", "cloud", "WPA", "MFA", "encryption", "access right", "collaborat"]
  },
  {
    q: "An online retailer wants to introduce facial recognition login for returning customers (instead of passwords). Discuss the SECURITY, USABILITY, and PRIVACY implications, and reach a justified conclusion.",
    marks: 9, ch: 6,
    mark_scheme: [
      "Security positive: biometric harder to fake than password; tied to physical person (1+1)",
      "Security negative: if facial data leaks, user can't change their face like a password (1+1)",
      "Usability: convenient — no password to remember; works on most devices with cameras (1+1)",
      "Privacy concern: storing facial biometric data is highly sensitive under GDPR (1+1)",
      "Justified conclusion: implement as OPTIONAL second factor alongside password; never sole login (1)"
    ],
    keywords: ["biometric", "facial recognition", "password", "GDPR", "MFA", "privacy", "convenience"]
  },
  {
    q: "A government department processes 50 million tax returns per year. They are choosing between continuing with their 20-year-old mainframe or moving to cloud computing. Discuss FOUR factors they must consider.",
    marks: 8, ch: 9,
    mark_scheme: [
      "Reliability: mainframes are extremely reliable; cloud has uptime SLAs but outages do happen (1+1)",
      "Security: tax data is highly sensitive — mainframe = full control; cloud = trust provider (1+1)",
      "Scalability: cloud scales for peak (e.g. tax deadline); mainframe needs over-provisioning (1+1)",
      "Cost: mainframe huge upfront cost + maintenance; cloud is ongoing operational expense (1+1)"
    ],
    keywords: ["mainframe", "cloud", "reliab", "security", "scalab", "cost", "uptime"]
  },
  {
    q: "A children's hospital wants to introduce tablets for patient entertainment, education, and to fill in mood surveys. Identify the safeguarding, technical, and accessibility considerations, with at least TWO points each.",
    marks: 8, ch: 7,
    mark_scheme: [
      "Safeguarding: web filtering blocks harmful content; AUP appropriate for child age (1+1)",
      "Safeguarding: no personal data shared via apps; supervised use (1+1)",
      "Technical: ruggedised cases (children may drop); cleaning protocol; battery life (1+1)",
      "Accessibility: large text option; screen reader; bright touch-friendly UI for various ages/abilities (1+1)"
    ],
    keywords: ["safeguard", "filter", "AUP", "rugged", "accessib", "screen reader", "supervis"]
  },
  {
    q: "An online auction site like eBay needs to handle 100,000 concurrent users during peak periods. Explain THREE technical requirements they must meet to ensure good user experience, with reasoning.",
    marks: 6, ch: 9,
    mark_scheme: [
      "High bandwidth + scalable cloud infrastructure — peaks during last seconds of auctions (1+1)",
      "Low latency database — bid 'wins' must be timestamped to the millisecond (1+1)",
      "Real-time updating: WebSocket connections so users see new bids without refreshing (1+1)"
    ],
    keywords: ["bandwidth", "scalab", "latency", "database", "real-time", "concurrent"]
  },
  {
    q: "A small online clothing retailer is suddenly hit with 50x more website traffic after a celebrity wears their product. Their site keeps crashing. Recommend TWO immediate actions and TWO long-term solutions.",
    marks: 8, ch: 9,
    mark_scheme: [
      "Immediate: move to cloud hosting that auto-scales with traffic (1+1)",
      "Immediate: use a content delivery network (CDN) to cache images/static content (1+1)",
      "Long-term: regularly load-test the site to find performance bottlenecks (1+1)",
      "Long-term: optimise database queries; consider caching layers (Redis, Memcached) (1+1)"
    ],
    keywords: ["cloud", "auto-scale", "CDN", "cache", "load test", "scalab", "traffic"]
  },
  {
    q: "A teacher wants to use AI image generation in lessons to create custom illustrations. Discuss the ethical considerations, including copyright, and provide guidance you would give the teacher.",
    marks: 6, ch: 8,
    mark_scheme: [
      "Ethical: AI models trained on copyrighted images — concerns about consent of original artists (1+1)",
      "Copyright: generated images often have unclear ownership; some platforms claim copyright (1+1)",
      "Guidance: check terms of service of AI tool; use only for non-commercial classroom use; credit when possible (1+1)"
    ],
    keywords: ["AI", "copyright", "ethics", "training data", "terms of service", "generative"]
  },
  {
    q: "A medical research project needs to collect health data from 10,000 volunteers via a smartphone app. Describe the data protection and consent processes that MUST be in place under GDPR.",
    marks: 7, ch: 7,
    mark_scheme: [
      "Clear, plain-language consent before any data collection — what data, why, for how long (1+1)",
      "Right to withdraw consent at any time + delete data (1+1)",
      "Data minimisation — collect only what's needed for the research (1)",
      "Encryption at rest + in transit; anonymisation where possible (1+1)"
    ],
    keywords: ["GDPR", "consent", "withdraw", "delete", "encryption", "anonymis", "minimis"]
  },
  {
    q: "A primary school teacher is choosing between a desktop, a laptop, and a tablet to use for whole-class teaching with the interactive whiteboard. Compare all three and recommend the best with reasoning.",
    marks: 7, ch: 1,
    mark_scheme: [
      "Desktop: powerful, but cannot be moved between classrooms (1+1)",
      "Laptop: portable, can be plugged into whiteboard, full keyboard for prep work (1+1)",
      "Tablet: most portable, touch-friendly for student involvement, but limited for typing lesson plans (1+1)",
      "Recommendation: laptop — best balance for teaching, planning, and presentation (1)"
    ],
    keywords: ["desktop", "laptop", "tablet", "portab", "whiteboard", "teach", "classroom"]
  },
  {
    q: "Discuss why an organisation should regularly perform DATA BACKUPS, including HOW OFTEN and WHERE to back up to. Use a small architecture firm of 8 staff as your example.",
    marks: 8, ch: 6,
    mark_scheme: [
      "Why: protection against hardware failure, ransomware, accidental deletion, fire (1+1)",
      "How often: incremental daily backup + full weekly backup minimum (1+1)",
      "Where 1: local NAS (network-attached storage) — fast restore (1+1)",
      "Where 2: cloud/off-site — protection against fire/theft of office (1+1)"
    ],
    keywords: ["backup", "incremental", "ransomware", "NAS", "off-site", "cloud", "restore"]
  },
  {
    q: "A mountain rescue team must communicate during emergencies in remote areas with no mobile signal. Compare TWO communication technologies they could use and recommend the best.",
    marks: 6, ch: 5,
    mark_scheme: [
      "Satellite phone: works anywhere with sky view; expensive but reliable (1+1)",
      "Two-way radios (VHF/UHF): cheap, no monthly cost, but limited range (1+1)",
      "Recommendation: combination — radios for team comms + satellite phone for HQ contact (1+1)"
    ],
    keywords: ["satellite", "radio", "VHF", "UHF", "remote", "signal", "rescue"]
  },
  {
    q: "A new online bank uses biometric login (fingerprint or face) ONLY. Some customers cannot use biometrics due to disability or medical conditions. Discuss the issues this raises, including EQUALITY and ACCESSIBILITY considerations.",
    marks: 7, ch: 7,
    mark_scheme: [
      "Equality issue: excludes customers who cannot use biometrics (disability, injury) (1+1)",
      "Legal: may breach Equality Act 2010 / disability discrimination laws (1+1)",
      "Accessibility: bank should provide ALTERNATIVE authentication (password + SMS code) (1+1)",
      "Best practice: offer biometric as one option of several, not the only method (1)"
    ],
    keywords: ["biometric", "accessib", "disabilit", "alternative", "equality", "discriminat"]
  },
  {
    q: "A 14-year-old student spends 6+ hours per day on social media. Their grades have dropped and they have trouble sleeping. Identify THREE specific impacts of excessive social media use and suggest TWO practical strategies parents could use.",
    marks: 7, ch: 7,
    mark_scheme: [
      "Impact 1: sleep disruption from screen time before bed (blue light, mental stimulation) (1+1)",
      "Impact 2: reduced study time = grade decline (1+1)",
      "Impact 3: mental health — comparison, FOMO, cyberbullying exposure (1+1)",
      "Strategy 1: screen time limits on apps; no phones in bedrooms after a set time (1)",
      "Strategy 2: open conversation about content; encourage offline hobbies (1)"
    ],
    keywords: ["social media", "screen time", "sleep", "mental health", "limit", "FOMO", "bullying"]
  },
  {
    q: "A delivery driver uses a smartphone app to receive jobs, navigate, take proof-of-delivery photos, and accept payment. List the SIX features of this smartphone that are essential and briefly justify each.",
    marks: 6, ch: 1,
    mark_scheme: [
      "GPS — navigation to addresses (1)",
      "4G/5G connectivity — receive jobs anywhere (1)",
      "Camera — proof of delivery photos (1)",
      "Touchscreen — sign for delivery; tap to accept jobs (1)",
      "Battery life — must last full shift (1)",
      "NFC — contactless payment acceptance (1)"
    ],
    keywords: ["GPS", "4G", "camera", "touchscreen", "battery", "NFC", "smartphone"]
  },
  {
    q: "A primary school's bring-your-own-device (BYOD) policy means students bring tablets or laptops from home. Identify FOUR risks this creates and recommend mitigations.",
    marks: 8, ch: 6,
    mark_scheme: [
      "Risk: unmanaged devices may have malware — require anti-malware before connecting (1+1)",
      "Risk: inconsistent software — provide cloud-based apps (Google Workspace, Office 365) (1+1)",
      "Risk: unequal access — school provides loaner devices for those without (1+1)",
      "Risk: lost/stolen devices with school data — encryption + remote wipe capabilities (1+1)"
    ],
    keywords: ["BYOD", "malware", "cloud", "encryption", "remote wipe", "anti-malware"]
  },
  {
    q: "A library wants to install self-service checkout kiosks where users borrow books by scanning their library card and the books. Describe the HARDWARE components needed and how they interact in a typical transaction.",
    marks: 8, ch: 3,
    mark_scheme: [
      "Touchscreen — user interface for the self-service experience (1)",
      "Barcode/RFID scanner — reads library card AND book identifiers (1+1)",
      "Receipt printer (often thermal) — prints due dates (1+1)",
      "Computer + connection to library database — checks user, marks books borrowed (1+1)",
      "Transaction: scan card → scan books → confirm → database updated → receipt printed (1)"
    ],
    keywords: ["touchscreen", "barcode", "RFID", "scanner", "printer", "thermal", "database"]
  },
  {
    q: "A small online clothing retailer wants to send personalised emails to each of their 5,000 customers with product recommendations based on their previous purchases. Describe how MAIL MERGE plus a DATABASE can achieve this, and outline the STEPS involved.",
    marks: 7, ch: 10,
    mark_scheme: [
      "Database holds customer details + purchase history (1+1)",
      "Query the database to find each customer's likely interests (e.g. 'last bought shoes' → email about new shoe range) (1+1)",
      "Mail merge template includes merge fields for name AND for product recommendations (1+1)",
      "System generates 5,000 personalised emails — each with customer's name and relevant products (1)"
    ],
    keywords: ["mail merge", "database", "personalis", "query", "merge field", "history", "recommend"]
  },
  {
    q: "Discuss the ENVIRONMENTAL impact of personal computing devices and identify THREE actions individuals can take to reduce this impact.",
    marks: 6, ch: 7,
    mark_scheme: [
      "Environmental impacts: e-waste, energy use, materials mining for components (rare earths) (1+1)",
      "Action 1: keep devices longer (don't upgrade unnecessarily); repair instead of replace (1+1)",
      "Action 2: recycle properly via WEEE; donate working devices (1+1)",
      "Action 3: use energy-saving settings; turn off when not in use (1)"
    ],
    keywords: ["e-waste", "WEEE", "energy", "recycle", "repair", "rare earth", "environment"]
  }
];

if (typeof window !== 'undefined') {
  window.MCQ_BANK = MCQ_BANK;
  window.ESSAY_BANK = ESSAY_BANK;
}
