/* ═══════════════════════════════════════════════════════════════════════════
   GCSE Computer Science 1CP2 — MASSIVE QUESTION BANK
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
  {q:"Every chart MUST have:", o:["Animation","Title + axis labels with units + legend (if multiple series)","Background colour","Many fonts"], a:1, e:"Every chart needs a title, axis labels (with units), and a legend if it has multiple series.", ch:10, d:2},

  // ─── Expansion pack: Chapter 1 (25 new) ───
  {"q":"In what form does a digital device process and store data?","o":["As continuous analogue signals","As printed characters","As discrete binary values (0s and 1s)","As radio waves only"],"a":2,"e":"A digital device is any electronic device that processes, stores or transmits data in binary form — 0s and 1s.","ch":1,"d":1},
  {"q":"Which characteristic best describes a mainframe computer?","o":["It supports thousands of simultaneous users with extremely high reliability","It is designed for a single user sitting at a desk","It is built into household appliances","It runs entirely on battery power"],"a":0,"e":"Mainframes serve thousands of simultaneous users, process millions of transactions and run reliably 24/7 in data centres.","ch":1,"d":1},
  {"q":"Which statement about an embedded microprocessor is correct?","o":["It can run many different user applications","It serves thousands of remote users at once","It requires a climate-controlled data centre","It performs one specific task and is not usually programmable by the user"],"a":3,"e":"Embedded microprocessors are small chips built into products to control one specific, limited function automatically.","ch":1,"d":1},
  {"q":"Which method of connecting a smartphone to the internet does NOT use the SIM card?","o":["4G mobile data","Wi-Fi through a wireless access point","5G mobile data","Mobile data while roaming abroad"],"a":1,"e":"Wi-Fi connects through a wireless access point and does not use the SIM at all; 4G/5G mobile data is routed via the SIM.","ch":1,"d":1},
  {"q":"Which device feature describes the audio, video and image file formats a device can play or display?","o":["Media support","Connectivity","Expansion capability","User interface"],"a":0,"e":"Media support covers the types of audio, video and image formats a device can handle, e.g. a smart TV with 4K HDR and surround sound.","ch":1,"d":1},
  {"q":"As a feature of digital devices, 'energy consumption' refers to:","o":["the purchase price of the device","the speed of the processor in GHz","how much power the device uses and how long its battery lasts","the number of apps that can be installed"],"a":2,"e":"Energy consumption is about power draw and battery duration — e.g. a smartphone lasting 24+ hours versus a mains-only gaming desktop.","ch":1,"d":1},
  {"q":"Which of the following is an example of a security feature built into a digital device?","o":["A larger touchscreen","Additional USB ports","A faster graphics processor","A fingerprint reader"],"a":3,"e":"Security features protect the device and its data from unauthorised access — fingerprint readers, face recognition, encryption and TPM chips.","ch":1,"d":1},
  {"q":"What is the minimum number of satellite signals a GPS receiver needs to calculate a basic 2D position?","o":["One","Three","Ten","Twenty-four"],"a":1,"e":"Signals from at least 3 satellites allow triangulation of a 2D position; 4 or more give a 3D position including altitude.","ch":1,"d":1},
  {"q":"The performance of a digital device is typically measured using:","o":["inches and grams","volts and amps","GHz for CPU speed and GB for RAM","Mbps and milliseconds"],"a":2,"e":"Performance means processing speed and power — measured in GHz for the CPU and GB for the RAM.","ch":1,"d":1},
  {"q":"What is the main purpose of a home entertainment system?","o":["Watching TV, streaming content and playing music at home","Processing high volumes of business transactions","Producing professional text documents","Tracking the locations of delivery vehicles"],"a":0,"e":"A home entertainment system combines a large display, surround sound and smart apps for watching, streaming and listening at home.","ch":1,"d":1},
  {"q":"A hiker is walking in remote mountains with no mobile signal. Which navigation option will still show their position?","o":["A web-based map that streams its map tiles","A social media check-in app","A video calling app with location sharing","A standalone GPS device with preloaded maps"],"a":3,"e":"GPS is receive-only and works without any internet connection; preloaded maps mean no mobile data is needed at all.","ch":1,"d":2},
  {"q":"A sixth-form student needs one device for typing essays in lessons and revising at home. The most suitable device is a:","o":["desktop computer","laptop computer","games console","specialist phone"],"a":1,"e":"A laptop balances portability with a full keyboard for essays, and its battery lasts a school day — ideal for study in two locations.","ch":1,"d":2},
  {"q":"An architect uses a high-performance laptop connected to an external monitor and keyboard at the office. What is the main benefit of this 'desktop replacement' setup?","o":["The laptop becomes more powerful when plugged into a monitor","The external monitor extends the laptop's battery life","One device serves both desk work and travel, avoiding the cost of two machines","The laptop no longer needs its own operating system"],"a":2,"e":"A desktop replacement laptop offers versatility: one device for both desk and travel, saving the cost and upkeep of two separate machines.","ch":1,"d":2},
  {"q":"A commuter's train has no Wi-Fi. How can their smartphone still load web pages during the journey?","o":["Using 4G/5G mobile data through the SIM card","Using Bluetooth to reach a web server","Using the GPS receiver to download pages","Using an HDMI cable to the train's screen"],"a":0,"e":"A smartphone has two internet routes: Wi-Fi via an access point, or 4G/5G mobile data authenticated by the SIM card.","ch":1,"d":2},
  {"q":"A logistics firm wants a manager to see the live position of all 30 of its vans on one screen. How is this achieved?","o":["Each van transmits its position directly to the GPS satellites","Drivers telephone their position to the office every hour","Each van's GPS position is sent over the mobile network to a central dashboard","Satellites photograph each van and email the images to the office"],"a":2,"e":"Fleet tracking: each vehicle's GPS receiver calculates its position, which is then sent via 4G/5G to a central dashboard. GPS itself is receive-only.","ch":1,"d":2},
  {"q":"A wildlife vlogger films animals from a long distance. Which feature makes a dedicated camera better than a smartphone for this work?","o":["A SIM card slot","Optical zoom and image stabilisation","Access to a larger app store","Support for contactless payments"],"a":1,"e":"Dedicated cameras and camcorders offer optical zoom and image stabilisation, capturing distant subjects far better than phone cameras.","ch":1,"d":2},
  {"q":"A travelling journalist needs a pocket-sized device that lasts a full working day for notes, photos and uploading stories. Which device and feature pairing is best?","o":["Desktop — expansion capability","Games console — media support","Tablet — large screen size","Smartphone — portability and long battery life"],"a":3,"e":"A smartphone is pocket-sized with all-day battery life, plus camera and 4G connectivity for uploading stories on the move.","ch":1,"d":2},
  {"q":"A vet's clinic receptionist books appointments at a fixed front desk all day. Why is a desktop computer a sensible choice?","o":["It offers high performance for the price, and portability is not required","It can be carried into the treatment rooms when needed","It has the longest battery life of any device","It connects to the mobile network using a SIM card"],"a":0,"e":"Desktops give the best performance per pound and are easily upgraded; their lack of portability does not matter at a fixed desk.","ch":1,"d":2},
  {"q":"A sales representative buys a tablet with a cellular (SIM) model rather than the Wi-Fi-only model. What is the benefit?","o":["The screen is brighter for outdoor use","The tablet charges more quickly","Internet access via 4G/5G in locations where no Wi-Fi is available","The tablet can make satellite phone calls"],"a":2,"e":"Cellular tablets contain a SIM, so they can use 4G/5G mobile data anywhere with network coverage — vital for workers on the move.","ch":1,"d":2},
  {"q":"A law firm issues laptops that hold confidential client files. Which feature best protects the data if a laptop is stolen?","o":["A high-resolution display","Encryption with fingerprint or face recognition login","A faster graphics card","Additional USB ports"],"a":1,"e":"Security features such as encryption and biometric login prevent a thief from accessing the data even with physical possession of the laptop.","ch":1,"d":2},
  {"q":"A family wants to play games together on their living-room TV. Which is the strongest justification for choosing a games console rather than a gaming desktop PC?","o":["A console has greater expansion capability","A console has a longer battery life","A console runs office software more efficiently","A console is designed for TV output and controller input, at a lower cost than an equivalent PC"],"a":3,"e":"Consoles are purpose-built for the living room: HDMI to the TV, controllers for several players, and high gaming performance for less than a comparable PC.","ch":1,"d":3},
  {"q":"Despite improvements in smartphone cameras, a professional photographer still buys a dedicated camera. Which analysis best explains this decision?","o":["Dedicated cameras are more portable than smartphones","Dedicated cameras can also make phone calls","Smartphones are unable to store photographs","A specialist device performs its single task better — a larger sensor and optical zoom give superior image quality"],"a":3,"e":"A key disadvantage of multifunctional devices is that specialist devices often perform each task better — crucial for professional work.","ch":1,"d":3},
  {"q":"A touring musician must record multi-track audio in hotel rooms using an external audio interface and editing software. Which evaluation of a tablet versus a laptop is most accurate?","o":["The laptop is better — its connectivity and performance suit external audio hardware and demanding software, despite being heavier","The tablet is better because a touchscreen improves sound quality","The tablet is better because it has more physical ports","Neither is suitable because audio recording requires a mainframe"],"a":0,"e":"Laptops offer USB connectivity for the audio interface and higher performance for editing software — worth the small loss of portability here.","ch":1,"d":3},
  {"q":"Which situation best illustrates the concept of convergence?","o":["A desktop PC being upgraded with extra RAM","A smart TV now offering apps, a web browser and video calling, like a computer","A printer running out of ink during a large job","A laptop battery degrading after years of use"],"a":1,"e":"Convergence is different device types becoming more similar in features over time — a TV gaining computer-like features is a clear example.","ch":1,"d":3},
  {"q":"A courier firm's drivers use a single smartphone for navigation, delivery photos and calls across a 10-hour shift. Which feature limitation is most likely to disrupt their work?","o":["Media support — the phone cannot display PDF files","User interface — the touchscreen is too simple for adults","Energy consumption — running GPS, camera and 4G together drains the battery before the shift ends","Expansion capability — extra RAM cannot be fitted"],"a":2,"e":"Multifunctional devices drain their battery faster when several functions run together — a real operational risk over a long shift.","ch":1,"d":3},

  // ─── Expansion pack: Chapter 2 (28 new) ───
  {"q":"Which statement describes a network operating system?","o":["It runs only on smartphones and tablets","It manages many users connected to a central server","It is designed for one user on one device","It is unable to manage security settings"],"a":1,"e":"A network OS (e.g. Windows Server) manages many users connected to a central server, with centralised accounts, access rights and backups.","ch":2,"d":1},
  {"q":"What is the purpose of a device driver?","o":["To delete temporary files from the disk","To create and format text documents","To let the operating system communicate with and control a hardware peripheral","To scan incoming files for viruses"],"a":2,"e":"Drivers are software that enable the OS to communicate with specific hardware, such as a printer or graphics card.","ch":2,"d":1},
  {"q":"What does a disk defragmenter do?","o":["Reorganises data on a hard disk drive into contiguous blocks so files load faster","Compresses files into smaller archives for transfer","Detects and removes malicious software","Copies data to a safe location for recovery"],"a":0,"e":"Defragmentation rearranges fragmented data on an HDD so files sit in contiguous blocks — it is not used on SSDs.","ch":2,"d":1},
  {"q":"Which type of software sends automated instructions to physical hardware such as a robot arm?","o":["Web authoring software","Presentation software","Spreadsheet software","Control software"],"a":3,"e":"Control software sends automated instructions to physical devices — robot arms, traffic lights and CNC machines.","ch":2,"d":1},
  {"q":"What is project management software used for?","o":["Editing and retouching digital photographs","Tracking tasks, deadlines, resources and team progress","Browsing and searching websites","Reorganising data on a hard disk"],"a":1,"e":"Project management software (e.g. Microsoft Project, Trello) tracks tasks, timelines, resources and progress across a team.","ch":2,"d":1},
  {"q":"Which operating system function organises data into folders and handles saving, copying and deleting?","o":["Print spooling","Memory management","File management","Error handling"],"a":2,"e":"File management organises files into folders and handles naming, saving, copying, moving and deletion of data.","ch":2,"d":1},
  {"q":"Special purpose application software is software that:","o":["is designed and built for one specific task only","can be used for many different types of task","manages the computer's hardware resources","is always free of charge to download"],"a":0,"e":"Special purpose software does one job only — e.g. an aircraft autopilot or CCTV monitoring software — and cannot be adapted to other tasks.","ch":2,"d":1},
  {"q":"Custom-written software is best described as software that is:","o":["downloaded free of charge from an app store","ready-made and used by many different organisations","always released as open source","developed specifically for one organisation's exact requirements"],"a":3,"e":"Custom-written (bespoke) software is built for a single organisation's precise needs — e.g. an NHS patient records system.","ch":2,"d":1},
  {"q":"The TWO purposes of communication software are to:","o":["scan for malware and back up user data","exchange messages and files, and provide remote access to systems","manage memory and queue print jobs","edit images and record sound"],"a":1,"e":"Communication software exchanges text, images, audio and video between computers AND provides remote access to other systems.","ch":2,"d":1},
  {"q":"What is a software patch?","o":["A complete new version of an operating system","A utility that compresses large files","A hardware component used to repair the CPU","A small, targeted update that fixes a specific bug or vulnerability"],"a":3,"e":"A patch is a small targeted update addressing one specific bug or security vulnerability, rather than a full new version.","ch":2,"d":1},
  {"q":"What does encryption software do?","o":["Encodes data so it can only be read by users who hold the decryption key","Increases the clock speed of the processor","Reorganises fragmented files on the disk","Queues print jobs so users can keep working"],"a":0,"e":"Encryption utilities (e.g. BitLocker) encode data so that only authorised users with the decryption key can read it.","ch":2,"d":1},
  {"q":"A vet's clinic has 12 computers connected to a central server. Which benefit would a network operating system provide?","o":["Each computer would no longer need any RAM","Faster broadband for staff working at home","Centralised user accounts and automatic backup of patient records to the server","Free specialist veterinary software"],"a":2,"e":"A network OS gives centralised control of accounts and access rights, and centralised backup of data to the server.","ch":2,"d":2},
  {"q":"A retired teacher buys a laptop purely for personal use at home. Which type of operating system is appropriate?","o":["A single-user operating system such as Windows 11 Home","A network operating system such as Windows Server","An enterprise mainframe operating system","No operating system is required for home use"],"a":0,"e":"A single-user OS manages one user on one device — exactly right for a personal home laptop; no OS at all means no software can run.","ch":2,"d":2},
  {"q":"A wedding photographer needs to retouch photographs and adjust their colours before sending them to clients. Which application type is required?","o":["Project management software","Database management software","Control software","Image editing software"],"a":3,"e":"Image editing software edits and manipulates digital images — retouching and colour adjustment are its core tasks.","ch":2,"d":2},
  {"q":"A freelancer is hired to design and build a company's new website. Which application type would they mainly use?","o":["Sound editing software","Web authoring software","Spreadsheet software","Presentation software"],"a":1,"e":"Web authoring software is used to design and create web pages and complete websites.","ch":2,"d":2},
  {"q":"A drinks factory installs an automated bottling line operated by robots. Which type of software runs the sequence of machine movements?","o":["Word processing software","Presentation software","Control software","Web authoring software"],"a":2,"e":"Control software sends automated instructions to physical hardware — here, the programmed sequence followed by the bottling robots.","ch":2,"d":2},
  {"q":"A construction project leader must track tasks, deadlines and which team members are assigned to each job. The most suitable software is:","o":["project management software","image editing software","a disk defragmenter","sound editing software"],"a":0,"e":"Project management software tracks tasks, deadlines, resources and team progress — exactly this scenario.","ch":2,"d":2},
  {"q":"An employee working from home needs to operate their office computer as if they were sitting in front of it. Which software meets this need?","o":["A spreadsheet package","Antivirus software","Presentation software","Remote desktop software"],"a":3,"e":"Remote desktop software fulfils the 'remote access' purpose of communication software — controlling another computer from a different location.","ch":2,"d":2},
  {"q":"A small bakery needs payroll software immediately and has no budget for software development. The best choice is:","o":["custom-written software","off-the-shelf software","hiring a developer to build a bespoke system","control software"],"a":1,"e":"Off-the-shelf software is ready-made, cheap and available immediately — ideal for a standard task like payroll on a small budget.","ch":2,"d":2},
  {"q":"An airline needs check-in software with unique requirements that no existing product on the market provides. The most suitable option is:","o":["off-the-shelf software","a free mobile app from an app store","custom-written software","a disk cleanup utility"],"a":2,"e":"When no existing product meets an organisation's unique requirements, custom-written software built to those exact needs is the answer.","ch":2,"d":2},
  {"q":"A sixth-form student's laptop is running out of storage because of temporary files and cached browser data. Which utility should they run?","o":["Disk cleanup","Firewall","Device driver manager","System monitor"],"a":0,"e":"Disk cleanup removes temporary files, cached data and junk files to free up storage space.","ch":2,"d":2},
  {"q":"A school IT technician must update 300 computers overnight without visiting each machine. Which update method is appropriate?","o":["Manual updates run on each computer in turn","Asking students to update their own machines","Posting USB sticks containing the update to each classroom","Enterprise deployment using network management software"],"a":3,"e":"Enterprise deployment lets an administrator push updates to every device on the network remotely — standard practice in large organisations.","ch":2,"d":2},
  {"q":"A delivery firm tests a new software update on five computers before installing it company-wide. What is the main reason for this approach?","o":["Updates cost less when bought in small quantities","The update may contain new bugs or incompatibilities, so testing first limits the damage","Five computers can download updates more quickly","Software developers legally require staged testing"],"a":1,"e":"Updates can introduce new bugs or incompatibility; testing on a few machines first contains any problems before a full rollout.","ch":2,"d":3},
  {"q":"A hospital schedules a major update to its ward computers for 3am on a Sunday rather than midday on a Monday. Which risk is it primarily managing?","o":["Interception of the download by hackers","New features confusing the nursing staff","Downtime — systems are unavailable during installation, which would disrupt patient care","Higher licence costs at peak times"],"a":2,"e":"Devices are unavailable during installation and restarts; scheduling updates for low-activity periods minimises disruptive downtime.","ch":2,"d":3},
  {"q":"Why should a user download a software patch only from the developer's official website?","o":["An unofficial source could supply a fake update that installs malware instead","Official downloads are always smaller files","Unofficial websites charge more money for patches","Patches from other websites install too quickly to verify"],"a":0,"e":"Downloading from unofficial or fake sources risks installing malware disguised as an update — only use the official developer source.","ch":2,"d":3},
  {"q":"A small charity has no software budget and no in-house IT expertise. Which evaluation of adopting an open source office suite is most balanced?","o":["It is unsuitable because open source software is always poor quality","It is ideal in every respect, with no drawbacks at all","It is unsuitable because charities cannot legally use open source software","It saves licence fees, but the charity must rely on community forums rather than guaranteed official support"],"a":3,"e":"Open source avoids licence costs but offers community support only — a genuine trade-off for an organisation without IT staff.","ch":2,"d":3},
  {"q":"A bank selects proprietary software for its core systems despite the high licence cost. Which justification is strongest?","o":["Proprietary software never contains any bugs","Guaranteed vendor support and well-tested reliability are essential for business-critical systems","The bank's staff prefer the company's branding","Proprietary software always runs faster than open source"],"a":1,"e":"For business-critical systems, dedicated official support and consistent, well-tested reliability outweigh the licence cost.","ch":2,"d":3},
  {"q":"An engineering firm has not updated any of its software for two years. Which consequence is the MOST serious?","o":["The program icons look out of date","Staff miss out on minor new features","Known security vulnerabilities remain open for attackers to exploit","The software uses slightly more RAM than newer versions"],"a":2,"e":"Unpatched, publicly known vulnerabilities can be exploited indefinitely — the most serious risk of failing to update.","ch":2,"d":3},

  // ─── Expansion pack: Chapter 3 (25 new) ───
  {"q":"How many bits are there in one byte?","o":["4","8","16","1,024"],"a":1,"e":"1 byte = 8 bits. One byte typically represents a single character of text.","ch":3,"d":1},
  {"q":"What is the typical capacity of a single-layer DVD?","o":["25 GB","700 MB","4.7 GB","50 GB"],"a":2,"e":"A single-layer DVD holds 4.7 GB (dual layer 8.5 GB). A CD holds 700 MB; single-layer Blu-ray holds 25 GB.","ch":3,"d":1},
  {"q":"Which peripheral device acts as both an input AND an output device?","o":["Touchscreen","Plotter","Trackball","Data projector"],"a":0,"e":"A touchscreen detects touch (input) and displays the screen image (output) — a combined I/O device.","ch":3,"d":1},
  {"q":"What is the capacity of a single-layer Blu-ray disc?","o":["4.7 GB","8.5 GB","700 MB","25 GB"],"a":3,"e":"Single-layer Blu-ray holds 25 GB; dual/triple layer discs hold 50–100 GB — enough for HD and 4K films.","ch":3,"d":1},
  {"q":"Which input device moves the on-screen cursor when the user rotates a ball, while the device itself stays still?","o":["Joystick","Graphics tablet","Trackball","Mouse"],"a":2,"e":"A trackball is like an upside-down mouse — the user rotates the ball and the device does not move, useful for CAD and accessibility.","ch":3,"d":1},
  {"q":"Which of these storage capacity units is the largest?","o":["GiB","MiB","KiB","TiB"],"a":3,"e":"From smallest to largest: KiB, MiB, GiB, TiB. Each step is 1,024 times the previous unit.","ch":3,"d":1},
  {"q":"How does a magnetic stripe reader obtain data from a card?","o":["By scanning a printed barcode on the card","By detecting changes in a magnetic field as the card is swiped","By reading an embedded microchip","By photographing the front of the card"],"a":1,"e":"The data is encoded in magnetic particles on the stripe; the reader detects changes in the magnetic field as the card is swiped through.","ch":3,"d":1},
  {"q":"Which output device would a teacher use to display a laptop screen to a whole classroom?","o":["Plotter","Braille embosser","Data projector","Control device"],"a":2,"e":"A data projector projects the computer's screen output onto a large wall or screen — ideal for classroom presentations.","ch":3,"d":1},
  {"q":"Which of the following is an example of storage MEDIA rather than a storage device?","o":["DVD drive","SSD controller","Read/write arm of an HDD","DVD disc"],"a":3,"e":"The DVD disc is the media (it physically holds the data); the DVD drive, controller and read/write arm are parts of the device mechanism.","ch":3,"d":1},
  {"q":"Which sensor would a burglar alarm use to detect a person moving inside a room?","o":["Humidity sensor","Motion (PIR) sensor","Gas sensor","Pressure sensor"],"a":1,"e":"A PIR (passive infrared) motion sensor detects the movement of warm objects, such as a person entering a room.","ch":3,"d":1},
  {"q":"A file is 3 GiB in size. How many MiB is this?","o":["3,000","1,024","3,072","30,720"],"a":2,"e":"1 GiB = 1,024 MiB, so 3 GiB = 3 x 1,024 = 3,072 MiB.","ch":3,"d":2},
  {"q":"A video file is exactly 6 MiB. How many bytes does it contain?","o":["6,000,000","6,144","6,291,456","6,442,450,944"],"a":2,"e":"1 MiB = 1,048,576 bytes, so 6 MiB = 6 x 1,048,576 = 6,291,456 bytes.","ch":3,"d":2},
  {"q":"A wedding photographer stores 500 photos, each 4 MiB in size. Approximately how much storage is needed in GiB?","o":["About 2 GiB","About 20 GiB","About 0.5 GiB","About 4 GiB"],"a":0,"e":"500 x 4 MiB = 2,000 MiB. 2,000 ÷ 1,024 ≈ 1.95 GiB, which is approximately 2 GiB.","ch":3,"d":2},
  {"q":"A sign-making company cuts large vinyl lettering for shop fronts. Which output device is most suitable?","o":["Inkjet printer","3D printer","Laser printer","Plotter fitted with a cutting tool"],"a":3,"e":"Plotters can use a cutting tool instead of a pen and work with very large formats — standard equipment for vinyl sign-making.","ch":3,"d":2},
  {"q":"An office worker with limited hand movement finds a standard mouse difficult to control. Which input device would be most suitable?","o":["Trackball","Joystick","Graphics tablet","Scanner"],"a":0,"e":"A trackball stays still while the user rotates the ball, requiring far less arm and wrist movement than a mouse — a common accessibility choice.","ch":3,"d":2},
  {"q":"A small business backs up its accounts to optical disc every Friday, erasing the previous week's backup. Which medium is most suitable?","o":["DVD-R","DVD-RW","CD-R","BD-R"],"a":1,"e":"DVD-RW is rewritable, so the same disc can be erased and reused each week. R formats are write-once and could not be erased.","ch":3,"d":2},
  {"q":"A hotel issues guests with key cards that are swiped to unlock room doors. Which input device reads these cards?","o":["Chip and PIN reader","Biometric scanner","Barcode scanner","Magnetic stripe reader"],"a":3,"e":"Hotel key cards typically store door data on a magnetic stripe, read by detecting the magnetic field as the card is swiped.","ch":3,"d":2},
  {"q":"A smartphone screen switches off automatically when held against the user's ear during a call. Which sensor enables this?","o":["Light sensor","Temperature sensor","Sound sensor","Proximity sensor"],"a":3,"e":"A proximity sensor detects the presence of nearby objects without contact, so the phone knows it is against the ear and disables the screen.","ch":3,"d":2},
  {"q":"A competitive gamer wants smoother motion when playing fast-moving games. Which monitor feature should they prioritise?","o":["Refresh rate (Hz)","Screen size (inches)","Panel type","Built-in speaker quality"],"a":0,"e":"Refresh rate is how many times per second the screen updates; 144Hz or 240Hz gives much smoother motion than standard 60Hz.","ch":3,"d":2},
  {"q":"A 64 GiB SD card is used to store video files that are each 2 GiB. What is the maximum number of these files the card can hold?","o":["16","32","64","128"],"a":1,"e":"64 GiB ÷ 2 GiB per file = 32 files.","ch":3,"d":2},
  {"q":"A customer buys a hard drive advertised as 1 TB, but the operating system reports approximately 931 GiB. What best explains this difference?","o":["Manufacturers use decimal units (1 TB = 10^12 bytes) while the OS reports in binary units (GiB, base 1,024)","The drive is faulty and has lost capacity in transit","The OS reserves 69 GiB of every drive for the BIOS","Formatting always destroys around 7% of any disk"],"a":0,"e":"1 TB (decimal) = 1,000,000,000,000 bytes, which is only about 931 GiB when divided by 1,024 three times. Nothing is missing — the units differ.","ch":3,"d":3},
  {"q":"A bank must keep 10 years of transaction records that are accessed at most once a year. Why is magnetic tape a stronger choice than SSDs for this archive?","o":["Tape has faster random access than SSD","Tape is easier to connect to a laptop than SSD","Tape offers the lowest cost per terabyte, and its slow sequential access is acceptable for rarely used data","Tape can be rewritten more times than SSD"],"a":2,"e":"For archives the key factors are cost per TB and longevity, not speed. Tape is by far the cheapest at scale, and slow access barely matters for data read once a year.","ch":3,"d":3},
  {"q":"A film studio distributes its new 4K film on BD-R rather than BD-RE discs. What is the strongest justification?","o":["BD-R discs hold more data than BD-RE discs","BD-R discs are read by lasers whereas BD-RE are not","BD-R is rewritable, so retailers can update the film","BD-R can only be written once, so the film content cannot be altered after manufacture"],"a":3,"e":"BD-R is write-once (recordable), so once the film is burned it cannot be erased or modified — protecting the content from tampering. Capacities of BD-R and BD-RE are similar.","ch":3,"d":3},
  {"q":"An architecture firm needs to produce both A0 site plans and everyday A4 client letters. Which combination of output devices best meets both needs?","o":["A plotter for both tasks","A laser printer for both tasks","A plotter for the A0 plans and a laser printer for the letters","An inkjet printer for the plans and a plotter for the letters"],"a":2,"e":"A plotter handles large-format, high-precision line drawings (A0) but is slow and unsuitable for text documents; a laser printer is fast and cheap per page for A4 letters.","ch":3,"d":3},
  {"q":"A student claims a USB flash drive is 'only storage media'. Which statement best evaluates this claim?","o":["Correct — a flash drive contains no device component","Partly correct — the flash memory chip is the media, but the drive also contains a controller circuit acting as the device","Incorrect — a flash drive is only a storage device and contains no media","Incorrect — USB drives store data on tiny magnetic platters"],"a":1,"e":"A USB flash drive combines both in one unit: the flash chip is the media that holds the data, while the USB controller circuit is the device that reads and writes it.","ch":3,"d":3},

  // ─── Expansion pack: Chapter 4 (28 new) ───
  {"q":"Which CPU component coordinates the fetching and decoding of instructions?","o":["ALU","Control Unit","Register","Cache"],"a":1,"e":"The Control Unit directs all operations inside the CPU — it fetches and decodes instructions and coordinates the timing of all components.","ch":4,"d":1},
  {"q":"What does the Program Counter hold?","o":["The result of the last calculation","The number of programs currently running","The memory address of the next instruction to fetch","The current CPU temperature"],"a":2,"e":"The Program Counter is a register that always holds the RAM address of the next instruction to be fetched.","ch":4,"d":1},
  {"q":"A CPU runs at 1 GHz. How many clock cycles does it complete per second?","o":["1 million","1 thousand","1 trillion","1 billion"],"a":3,"e":"1 GHz = 1,000,000,000 (1 billion) clock cycles per second.","ch":4,"d":1},
  {"q":"Which of these types of memory is non-volatile?","o":["ROM","RAM","Cache","Registers"],"a":0,"e":"ROM retains its contents permanently without power. RAM, cache and registers are all volatile — they lose data at shutdown.","ch":4,"d":1},
  {"q":"What is the Power-On Self Test (POST)?","o":["A check that the internet connection is working","A hardware check run by the BIOS when the computer starts up","A test of the user's password strength","An antivirus scan that runs weekly"],"a":1,"e":"The POST is performed by the ROM-based BIOS at start-up — it checks that hardware such as the CPU, RAM and storage is working before the OS loads.","ch":4,"d":1},
  {"q":"What are registers?","o":["Large memory chips fitted to the motherboard","Sections of the hard drive used for backups","Tiny, extremely fast storage locations inside the CPU","Copies of RAM kept in the cloud"],"a":2,"e":"Registers are tiny, extremely fast storage locations inside the CPU that hold the data being actively processed right now.","ch":4,"d":1},
  {"q":"Which is a typical size for the ROM chip in a modern computer?","o":["A few megabytes","16 GB","1 TB","512 GB"],"a":0,"e":"ROM is small — typically only a few MB — because it stores only the BIOS/UEFI start-up instructions, not programs or files.","ch":4,"d":1},
  {"q":"What is the FIRST stage of the CPU instruction cycle?","o":["Execute","Decode","Store","Fetch"],"a":3,"e":"The cycle begins with Fetch — the CPU retrieves the next instruction from RAM at the address held in the Program Counter.","ch":4,"d":1},
  {"q":"What is virtual memory?","o":["Memory built into the CPU itself","Space on the storage drive used as overflow when RAM is full","A type of online cloud storage","Extra RAM added by the user"],"a":1,"e":"When RAM is full, the OS uses part of the storage drive as temporary overflow memory — this is virtual memory, and it is much slower than real RAM.","ch":4,"d":1},
  {"q":"What is the purpose of the clock inside a CPU?","o":["To display the time on screen","To cool the processor during heavy use","To generate regular pulses that synchronise all CPU operations","To store the date when the power is off"],"a":2,"e":"The clock generates regular electrical pulses that synchronise the CPU's operations; its speed is measured in GHz.","ch":4,"d":1},
  {"q":"Which accessibility setting lets keyboard shortcuts such as Ctrl+C be pressed one key at a time?","o":["Sticky Keys","Magnifier","High contrast mode","Closed captions"],"a":0,"e":"Sticky Keys allows modifier combinations to be pressed sequentially rather than together — helpful for one-handed users or those with limited dexterity.","ch":4,"d":1},
  {"q":"A user's computer freezes and the storage drive activity light stays on whenever many applications are open at once. What is the most likely cause?","o":["The monitor resolution is set too high","The ROM chip has become full","RAM is full, so the OS is constantly swapping data to slower virtual memory","The CPU clock has stopped ticking"],"a":2,"e":"When RAM is full the OS swaps data to virtual memory on the storage drive, causing constant drive activity and severe slowdown or freezing.","ch":4,"d":2},
  {"q":"An elderly user wants a simple device mainly for video calls with family and reading the news. Which configuration is most appropriate?","o":["A server with 64 GB RAM and RAID storage","A touchscreen tablet with large text settings and a built-in webcam","A high-end gaming desktop with a dedicated GPU","A basic laptop connected to a plotter"],"a":1,"e":"A touchscreen is intuitive for inexperienced users, large text helps with vision, and a built-in webcam supports video calls — high performance is unnecessary.","ch":4,"d":2},
  {"q":"A blind university student needs to read web pages and write essays on a laptop. Which combination is most suitable?","o":["A larger monitor and high contrast mode","Sticky keys and a trackball","A faster CPU and more RAM","Screen reader software with a refreshable Braille display"],"a":3,"e":"A screen reader (e.g. NVDA or JAWS) converts on-screen text to speech, and a refreshable Braille display provides tactile reading — visual adjustments alone cannot help a blind user.","ch":4,"d":2},
  {"q":"A deaf employee needs to be alerted to incoming messages and follow training videos at work. Which adjustments are most suitable?","o":["Visual notification flashes and subtitles on videos","A screen reader and audio descriptions","Louder speakers and a subwoofer","Voice recognition input software"],"a":0,"e":"Visual alerts replace audio notifications, and subtitles/closed captions make the spoken content of training videos accessible to a deaf user.","ch":4,"d":2},
  {"q":"A writer with severe arthritis cannot type on a keyboard. Which input method would best allow her to produce documents?","o":["Voice recognition software","OMR forms","A higher resolution monitor","A mechanical keyboard with louder keys"],"a":0,"e":"Voice recognition (e.g. Dragon) converts spoken words into typed text, removing the need to use a keyboard at all.","ch":4,"d":2},
  {"q":"A user with photosensitive epilepsy is setting up a new smartphone. Which settings change is the most important for them?","o":["Increase the font size to 150%","Enable Bluetooth connectivity","Turn on closed captions","Reduce motion and disable flashing animations"],"a":3,"e":"Rapid visual changes and flashing content can trigger seizures, so reduce-motion settings and disabling animations are the priority adjustment.","ch":4,"d":2},
  {"q":"Why are programs copied from the SSD into RAM before the CPU runs them?","o":["RAM is non-volatile, so the data is safer there","RAM is far faster for the CPU to access than the storage drive","The SSD is not capable of storing program files","ROM requires it for security reasons"],"a":1,"e":"The CPU works directly with RAM because it is dramatically faster than any storage drive — working straight from storage would make the computer far slower.","ch":4,"d":2},
  {"q":"A data scientist runs machine learning models on very large datasets. Which hardware feature most directly enables parallel processing of these workloads?","o":["A multi-core CPU paired with a CUDA-capable GPU","A larger high-resolution monitor","A rewritable Blu-ray drive","A magnetic stripe reader"],"a":0,"e":"Machine learning relies on parallel processing — many cores and GPU compute units working simultaneously on parts of the dataset.","ch":4,"d":2},
  {"q":"A CPU is advertised as running at 3.5 GHz. How many clock cycles per second is this?","o":["3,500,000","350,000,000","3,500,000,000","35,000,000,000"],"a":2,"e":"1 GHz = 1 billion cycles per second, so 3.5 GHz = 3,500,000,000 cycles per second.","ch":4,"d":2},
  {"q":"A PC builder upgrades a system from DDR4 RAM to faster DDR5 RAM. Which performance factor is directly improved?","o":["Total storage capacity","The size of the ROM chip","The screen refresh rate","The speed at which data moves between RAM and the CPU"],"a":3,"e":"Faster RAM improves bus/transfer speed — data moves between memory and the CPU more quickly, reducing time the CPU spends waiting.","ch":4,"d":2},
  {"q":"A school server stores work for 300 students and must keep running even if one drive fails. Which feature should the server use?","o":["RAID storage across multiple drives","A single large optical disc","Extra VRAM on a graphics card","An external USB flash stick"],"a":0,"e":"RAID (Redundant Array of Independent Disks) spreads data across multiple drives so the system keeps working and no data is lost if one drive fails.","ch":4,"d":2},
  {"q":"A video editor must choose between a dual-core CPU at 4.0 GHz and a quad-core CPU at 3.0 GHz. Their rendering software uses all available cores. Which evaluation is most accurate?","o":["The dual-core is better because clock speed is the only factor that matters","The quad-core is likely better because rendering work can be split in parallel across four cores","Both CPUs will perform identically for rendering","Neither CPU can render video without a ROM upgrade"],"a":1,"e":"For software that parallelises well, four cores at 3.0 GHz provide more total processing capability than two cores at 4.0 GHz — clock speed alone is not decisive.","ch":4,"d":3},
  {"q":"A friend advises: 'Add more ROM so you can run more apps at once.' Which response best evaluates this advice?","o":["Correct — ROM holds all running applications","Correct — ROM and RAM are interchangeable terms","Incorrect — ROM only stores fixed start-up instructions; adding RAM is what improves multitasking","Incorrect — apps run from the GPU, not from memory"],"a":2,"e":"ROM is small, read-only and holds only the BIOS/UEFI; it cannot be 'added to' for apps. Running programs live in RAM, so more RAM improves multitasking.","ch":4,"d":3},
  {"q":"Two otherwise identical CPUs differ only in L3 cache: 8 MB versus 2 MB. Why is the 8 MB model likely faster for repeated calculations?","o":["More frequently used data can be kept close to the CPU, reducing slow fetches from RAM","A larger cache increases the storage drive's capacity","A larger cache automatically raises the clock speed","Cache replaces the need for an ALU"],"a":0,"e":"Cache stores frequently used instructions and data near the CPU; a larger cache means fewer time-consuming trips to the slower RAM.","ch":4,"d":3},
  {"q":"A student says their new phone 'has 256 GB of RAM'. What is the most accurate assessment of this statement?","o":["This is plausible for a modern budget phone","They are correct — phones need 256 GB of RAM for video calls","Phones do not contain any RAM at all","They have probably confused flash storage capacity with RAM, which in phones is typically 4–12 GB"],"a":3,"e":"256 GB is almost certainly the flash storage (for apps, photos, files). Phone RAM — the working memory — is far smaller, typically 4–12 GB.","ch":4,"d":3},
  {"q":"A laptop has a fast modern CPU but only 4 GB of RAM, and it struggles when many browser tabs are open. What is the best analysis of the bottleneck?","o":["The CPU is too slow for web browsing","Insufficient RAM forces the OS to use slow virtual memory, leaving the fast CPU waiting for data","The webcam is consuming all the memory","The BIOS needs updating to fix it"],"a":1,"e":"Each open tab consumes RAM. With only 4 GB the OS swaps to virtual memory on the drive, and the CPU — however fast — sits waiting for data.","ch":4,"d":3},
  {"q":"A finance dashboard shows falling prices in red and rising prices in green, with no other indicators. Why could this be a problem, and what is the best fix?","o":["Red and green render slowly, so a faster GPU is needed","Colour-blind users may not distinguish red from green; add text labels or use a colour-blind-friendly scheme","The colours drain RAM, so greyscale should be used to save memory","It is only a problem on OLED panels"],"a":1,"e":"Around 8% of males have red-green colour blindness, so meaning carried only by these colours is inaccessible. Labels, shapes or alternative palettes fix this.","ch":4,"d":3},

  // ─── Expansion pack: Chapter 5 (26 new) ───
  {"q":"Which communication method transmits data as a one-to-many signal using radio waves from a central tower?","o":["Satellite","Wired (cable)","Broadcast (TV/radio)","NFC"],"a":2,"e":"Broadcast (TV/radio) is one-to-many transmission via radio waves from a central tower — e.g. FM radio and terrestrial television.","ch":5,"d":1},
  {"q":"Which statement about GPS is correct?","o":["The device only receives signals from satellites","The device transmits its position back to satellites","GPS requires an internet connection to work","GPS connects to a wireless access point"],"a":0,"e":"GPS is receive-only: the device receives signals from multiple satellites to calculate its position and never transmits back.","ch":5,"d":1},
  {"q":"A MAC address is best described as:","o":["An address assigned by the router each time a device connects","A human-readable label such as OFFICE-PC-01","An address routers use to direct traffic across the internet","A permanent hardware address set into the network card at manufacture"],"a":3,"e":"A MAC address is permanently coded into the network interface card at manufacture and never changes. IP addresses are the changeable, router-assigned ones.","ch":5,"d":1},
  {"q":"Which of these is a correct description of an IP address?","o":["A permanent address burned into the network card","A logical address assigned by the router that can change","Six pairs of hexadecimal digits fixed at manufacture","The friendly name shown in the device's settings"],"a":1,"e":"An IP address is a logical address, usually assigned by the router (DHCP), and can change each time a device connects. MAC addresses are the fixed hexadecimal ones.","ch":5,"d":1},
  {"q":"What is the function of a switch in a LAN?","o":["Connects multiple wired devices and sends data only to the intended device","Broadcasts a Wi-Fi signal for wireless devices","Converts digital data into analogue phone-line signals","Provides the physical internet connection to the building"],"a":0,"e":"A switch connects multiple devices within a LAN and forwards data only to the intended device (using MAC addresses), making it more efficient than a hub.","ch":5,"d":1},
  {"q":"A modem is needed for ADSL broadband because it:","o":["Encrypts the Wi-Fi signal","Extends the range of the wireless network","Converts digital data into a signal suitable for the telephone line","Assigns IP addresses to devices on the network"],"a":2,"e":"A modem modulates/demodulates signals — converting digital computer data to a form that can travel over the analogue telephone or cable line, and back again.","ch":5,"d":1},
  {"q":"The typical range of a standard Bluetooth connection is approximately:","o":["1 metre","10 metres","100 metres","1 kilometre"],"a":1,"e":"Standard Bluetooth has a typical range of about 10 metres (Class 1 devices can reach up to 100m, but ~10m is typical).","ch":5,"d":1},
  {"q":"FTTP broadband means:","o":["Fibre optic to the street cabinet, then copper wire to the home","Broadband delivered over the TV coaxial cable network","Internet delivered via the mobile phone network","Fibre optic cable running directly to the building"],"a":3,"e":"FTTP = Fibre-to-the-Premises — full fibre directly to the building, giving speeds of 1 Gbps or more. Fibre to the cabinet then copper is FTTC.","ch":5,"d":1},
  {"q":"Which network type is typically managed by multiple organisations and ISPs rather than a single organisation?","o":["WAN","LAN","PAN","Home network"],"a":0,"e":"A WAN covers a large geographical area and relies on infrastructure run by multiple organisations and ISPs. A LAN is managed by a single organisation.","ch":5,"d":1},
  {"q":"Infra-red (IR) communication requires:","o":["A SIM card in both devices","A wireless access point","A clear line of sight between the devices","A fibre optic cable"],"a":2,"e":"IR is line-of-sight only — any obstacle blocks the signal. That is why a TV remote must be pointed at the TV.","ch":5,"d":1},
  {"q":"Which of the following provides the physical connection between a home router and the rest of the internet?","o":["The web browser","The ISP","The search engine","The switch"],"a":1,"e":"The ISP (Internet Service Provider) provides the physical connection and routes traffic between the home network and the global internet — a router alone cannot reach the internet.","ch":5,"d":1},
  {"q":"A student downloads a 100 MB file over a 50 Mbps connection. Approximately how long will the download take?","o":["2 seconds","8 seconds","16 seconds","50 seconds"],"a":2,"e":"100 megabytes = 100 × 8 = 800 megabits. 800 Mb ÷ 50 Mbps = 16 seconds. Remember to convert bytes to bits first.","ch":5,"d":2},
  {"q":"A 600 MB video file is downloaded over a 40 Mbps broadband connection. Approximately how long does the download take?","o":["15 seconds","2 minutes","8 minutes","20 minutes"],"a":1,"e":"600 MB = 4800 megabits. 4800 Mb ÷ 40 Mbps = 120 seconds = 2 minutes.","ch":5,"d":2},
  {"q":"A 4G connection sustains a steady 16 Mbps. How much data can be transferred in 30 seconds?","o":["16 MB","30 MB","48 MB","60 MB"],"a":3,"e":"16 Mbps × 30 s = 480 megabits = 480 ÷ 8 = 60 megabytes.","ch":5,"d":2},
  {"q":"A café wants to offer guest Wi-Fi across its seating area. Which component broadcasts the wireless signal that customers' phones connect to?","o":["Wireless access point","Modem","Switch","File server"],"a":0,"e":"The wireless access point (WAP) creates the Wi-Fi zone, letting wireless devices join the café's network. The modem and switch handle wired signals.","ch":5,"d":2},
  {"q":"A gamer has a 200 Mbps connection but still experiences lag in fast online matches. The MOST likely cause is:","o":["The bandwidth is too low for gaming","High latency on the connection","The game files are too large","The monitor's refresh rate"],"a":1,"e":"Gaming needs low latency more than high bandwidth. 200 Mbps is plenty of bandwidth; lag is caused by delay (latency) in messages reaching the server.","ch":5,"d":2},
  {"q":"Two houses use the same ADSL service, but the house 4 km from the telephone exchange gets much slower speeds than the one 1 km away. This is because:","o":["The further house has more devices connected","ADSL providers charge more at longer distances","The further house must be using Wi-Fi","The signal weakens over the longer copper line, reducing speed"],"a":3,"e":"ADSL runs over copper telephone lines, and signal strength (so speed) falls as distance from the exchange increases.","ch":5,"d":2},
  {"q":"A school's internet is fast during lessons but very slow at lunchtime. The most likely reason is:","o":["The ISP reduces speeds at midday","The server runs its backup at lunchtime","Many more students online at once share the same bandwidth","The Wi-Fi signal is physically weaker at midday"],"a":2,"e":"More simultaneous users means the connection's bandwidth is shared between more devices — congestion at peak times slows everyone down.","ch":5,"d":2},
  {"q":"A family's garden office gets no Wi-Fi signal from the router inside the house. The cheapest effective solution is to:","o":["Install a Wi-Fi booster/repeater between the house and the office","Buy a second broadband contract for the office","Replace the router with a switch","Use infra-red communication instead"],"a":0,"e":"A booster/repeater receives the existing Wi-Fi signal and retransmits it at full strength, extending coverage into the dead zone cheaply.","ch":5,"d":2},
  {"q":"A commuter on a train needs internet access on her laptop, which has no SIM card. Her best option is to:","o":["Connect the laptop with an Ethernet cable","Tether the laptop to her phone's 4G connection","Pair the laptop with her phone using NFC","Use GPS to download the data"],"a":1,"e":"Tethering shares the phone's 4G mobile data with the laptop via a Wi-Fi hotspot (or USB/Bluetooth) — ideal when travelling. NFC and GPS cannot provide internet access.","ch":5,"d":2},
  {"q":"A remote farmhouse uses satellite broadband with 80 Mbps bandwidth, yet video calls suffer long awkward pauses. The best explanation is:","o":["80 Mbps is too slow for video calling","Satellite signals cannot carry video data","The farmhouse needs a network switch","Satellite links have very high latency (~500ms+), delaying each exchange"],"a":3,"e":"Satellite has high bandwidth but very high latency because signals travel thousands of kilometres to space and back — real-time conversation suffers even though downloads are fast.","ch":5,"d":3},
  {"q":"Contactless payment terminals use NFC rather than Bluetooth partly because:","o":["NFC has a much faster data rate than Bluetooth","NFC works over much longer distances","NFC's very short range (under 10 cm) makes interception far harder","NFC requires a router connection for each payment"],"a":2,"e":"NFC works only within a few centimetres, so an attacker cannot easily intercept the transaction — the extreme short range is a security feature.","ch":5,"d":2},
  {"q":"A video-editing studio transfers multi-gigabyte files between fixed workstations all day. Which justification BEST supports choosing wired Ethernet over Wi-Fi?","o":["Wired gives sustained high speed and reliability with no wireless interference","Wired connections are easier to move around the studio","Wired connections remove the need for a switch","Wired connections do not need an ISP"],"a":0,"e":"For fixed workstations moving huge files, wired Ethernet's consistent high speed, reliability and freedom from interference outweigh Wi-Fi's portability — which these fixed machines don't need.","ch":5,"d":3},
  {"q":"A home has gigabit fibre broadband, but devices only ever reach about 100 Mbps. The router is ten years old. The BEST analysis is:","o":["The ISP is deliberately throttling the connection","The old router is a hardware bottleneck, limiting speeds below the line's capacity","Fibre connections always top out at 100 Mbps","Modern websites are simply slow to respond"],"a":1,"e":"Old or low-quality network hardware creates a bottleneck — an outdated router cannot pass data at the full gigabit speed the fibre line can deliver.","ch":5,"d":3},
  {"q":"A city flat cannot have a fibre cable installed. Which argument BEST supports using 5G mobile broadband as the main home connection?","o":["5G is always cheaper than fibre broadband","5G performs identically everywhere in the country","5G needs no hardware of any kind","5G offers fibre-like speeds and low latency without needing a cable installed"],"a":3,"e":"5G's high speed (up to gigabit-class) and low latency make it a realistic fibre substitute in cities — and no physical cable installation is required.","ch":5,"d":3},
  {"q":"A YouTuber regularly uploads hour-long 4K videos. Why is FTTP a better choice than ADSL for them specifically?","o":["FTTP has a lower monthly cost than ADSL","ADSL connections cannot access YouTube","ADSL upload is limited to about 1 Mbps, while FTTP offers far higher upload speeds","FTTP includes a better web browser"],"a":2,"e":"ADSL is asymmetric — upload tops out around 1 Mbps, making huge uploads painfully slow. FTTP can offer upload speeds up to 1 Gbps, ideal for content creators.","ch":5,"d":3},

  // ─── Expansion pack: Chapter 6 (28 new) ───
  {"q":"The role of a print server is to:","o":["Host websites for the organisation","Queue and manage print jobs sent to shared printers","Store all user files centrally","Verify usernames and passwords"],"a":1,"e":"A print server manages and queues (spools) print jobs from many users to shared printers, preventing conflicts and tracking usage.","ch":6,"d":1},
  {"q":"An email server:","o":["Sends, receives and stores email messages for users on the domain","Hosts web pages for browsers to request","Spools print jobs to shared printers","Backs up all network data overnight"],"a":0,"e":"An email server handles sending, receiving and storing email for all users on the organisation's domain, with central filtering and archiving.","ch":6,"d":1},
  {"q":"A backup server's main role is to:","o":["Check users' login credentials","Filter incoming network traffic","Automatically copy data to separate storage so it can be restored","Stream media files to client devices"],"a":2,"e":"A backup server automatically copies data from devices and servers to secure separate storage on a schedule, so data can be recovered after loss or failure.","ch":6,"d":1},
  {"q":"A roaming profile means that:","o":["Users can browse the internet from any country","The Wi-Fi signal follows users around the building","Mobile data takes over when Wi-Fi fails","A user's settings and files are available on any computer they log into"],"a":3,"e":"With roaming profiles, a user's desktop, settings and files are stored on the server and follow them to whichever networked computer they log into — enabling hotdesking.","ch":6,"d":1},
  {"q":"Which type of malware spreads itself across a network without any user action?","o":["Worm","Virus","Trojan horse","Adware"],"a":0,"e":"A worm is self-replicating and spreads across networks by itself. A virus needs an infected file to be opened; a Trojan needs the user to install it.","ch":6,"d":1},
  {"q":"Spyware is software that:","o":["Encrypts your files and demands payment","Displays unwanted advertisements","Secretly monitors activity such as keystrokes and browsing history","Queues print jobs on the network"],"a":2,"e":"Spyware secretly monitors the user — recording keystrokes (keylogging), screenshots and browsing — and sends the data to an attacker.","ch":6,"d":1},
  {"q":"A Trojan horse is malware that:","o":["Spreads automatically through network vulnerabilities","Disguises itself as legitimate software so the user installs it","Only infects email servers","Floods a server with fake traffic"],"a":1,"e":"A Trojan disguises itself as legitimate software (e.g. a free app); once installed it can open a backdoor for the attacker.","ch":6,"d":1},
  {"q":"A full backup:","o":["Copies only files changed since the last backup","Copies only files changed since the last full backup","Copies files continuously in real time to a mirror drive","Copies all data — every file — each time it runs"],"a":3,"e":"A full backup copies everything regardless of when it last changed. It needs the most storage but is the fastest to restore from.","ch":6,"d":1},
  {"q":"An incremental backup copies:","o":["All files on the system every time","Only data changed since the last full backup","Only operating system files","Only data changed since the last backup of any type"],"a":3,"e":"Incremental backups copy only what changed since the LAST backup (full or incremental) — quick and small, but restoring needs the whole chain.","ch":6,"d":1},
  {"q":"The purpose of a CAPTCHA on a login form is to:","o":["Prevent automated bots from attempting logins","Encrypt the user's password","Scan the device for malware","Record the user's transactions"],"a":0,"e":"CAPTCHA challenges prove the user is human, blocking automated bot attacks on login and registration forms.","ch":6,"d":1},
  {"q":"Adware typically:","o":["Deletes the operating system","Encrypts the user's documents","Floods the browser with unwanted advertisements","Records the user's fingerprints"],"a":2,"e":"Adware displays unwanted adverts (often pop-ups) and may redirect the browser to malicious sites; it usually arrives bundled with free software.","ch":6,"d":1},
  {"q":"A college wants students to open shared revision resources but not change or delete them. The IT technician should set students' :","o":["Accounts to full administrator access","Access rights on the shared folder to read-only","Files to be encrypted with WPA3","Profiles to roam between computers"],"a":1,"e":"Read-only access rights let students view and open files but prevent any modification or deletion — exactly the control required.","ch":6,"d":2},
  {"q":"A hospital must be able to prove exactly who viewed a patient record and when. Which security method provides this?","o":["A firewall","WPA3 encryption","Anti-malware software","Transaction logs / audit trails"],"a":3,"e":"Transaction logs record every access with username, timestamp and action — providing forensic evidence of exactly who viewed what and when.","ch":6,"d":2},
  {"q":"An office worker receives an email claiming to be from the IT department, with a link asking him to 'confirm' his password urgently. This is an example of:","o":["Phishing","Pharming","A worm","A denial of service attack"],"a":0,"e":"A fraudulent message impersonating a trusted source to trick the user into revealing credentials is phishing — note the urgency language and the link.","ch":6,"d":2},
  {"q":"A user types her bank's correct web address but is silently redirected to a fake copy of the site. Which check would MOST help her detect the attack?","o":["Looking for spelling mistakes in an email","Hovering over links before clicking them","Checking the site's HTTPS certificate matches the bank's domain","Counting the pop-up adverts on the page"],"a":2,"e":"This is pharming — the URL looks correct, so email checks don't help. A fake site usually cannot present a valid HTTPS certificate for the bank's real domain.","ch":6,"d":2},
  {"q":"Ransomware has encrypted every file on a charity's office computers. The fastest safe way to recover WITHOUT paying is to:","o":["Run a disk defragmentation","Restore the files from a recent offline backup","Reinstall the web browser","Change the Wi-Fi password"],"a":1,"e":"Backups are the last line of defence against ransomware — restoring from a clean offline backup recovers the data without paying the ransom.","ch":6,"d":2},
  {"q":"A firm runs a full backup every Sunday and a differential backup each night. The server fails on Thursday morning. To restore, the technician needs:","o":["Every backup made since Sunday","Only Wednesday night's differential backup","Sunday's full backup plus Wednesday night's differential","Sunday's full backup plus every nightly backup since"],"a":2,"e":"A differential backup contains all changes since the last FULL backup — so restoring needs just the full backup plus the most recent differential.","ch":6,"d":2},
  {"q":"A company runs a full backup on Sunday and incremental backups each night. Restoring after a Friday morning failure is slow because the technician must restore:","o":["Only the Sunday full backup","Only Thursday night's incremental backup","Only Wednesday and Thursday's incrementals","The full backup plus every nightly incremental in order since Sunday"],"a":3,"e":"Each incremental only holds changes since the previous backup, so the full backup and the entire chain of incrementals must be restored in order — the slowest restore method.","ch":6,"d":2},
  {"q":"Two flatmates want to share files occasionally between their two laptops at home. The most appropriate network model is:","o":["Peer-to-peer, because it is cheap and simple with no server needed","Client-server, because it provides roaming profiles","Client-server, because it provides centralised backup","Peer-to-peer, because it offers the strongest security"],"a":0,"e":"For two casual home users, P2P is ideal — no server hardware or IT expertise needed. Client-server benefits aren't worth the cost at this scale, and P2P is NOT the more secure option.","ch":6,"d":2},
  {"q":"A business installs new design software for all 150 staff overnight without visiting a single desk. Which client-server benefit makes this possible?","o":["Roaming profiles","Centralised administration — software deployed to all clients from the server","Shared peripherals","Media streaming"],"a":1,"e":"Centralised administration lets the IT team install software, push updates and apply policies to every client computer from the server in one operation.","ch":6,"d":2},
  {"q":"A criminal steals an employee's password through phishing but still cannot log in to the company system. The MOST likely reason is:","o":["The password was stored encrypted","The firewall blocked the password","The login page uses a CAPTCHA","Multi-factor authentication also requires a code from the employee's phone"],"a":3,"e":"MFA requires a second proof of identity (e.g. a phone code) — so a stolen password alone is not enough to gain access.","ch":6,"d":2},
  {"q":"A school's firewall is working correctly, yet a student's USB stick still infects a computer with a virus. This shows that:","o":["Firewalls filter network traffic; anti-malware is needed to deal with malicious software","The firewall needs a stronger administrator password","Firewalls only operate outside school hours","The virus must really have been a phishing email"],"a":0,"e":"A firewall controls network traffic only — it cannot scan files arriving on a USB stick. Anti-malware software detects and removes malicious programs; the two protect against different threats.","ch":6,"d":2},
  {"q":"A guest house's ten-year-old router only supports WEP wireless security. The owner should:","o":["Keep WEP, as it is still the most modern standard","Turn off wireless security completely to improve speed","Replace the router with one supporting WPA2 or WPA3","Hide the network name instead of using encryption"],"a":2,"e":"WEP is broken and can be cracked in minutes with free tools. The router should be replaced or upgraded so guests' traffic is protected by WPA2 or, ideally, WPA3.","ch":6,"d":2},
  {"q":"A school is choosing between peer-to-peer and client-server. Which statement BEST analyses the main risk of choosing client-server?","o":["Files cannot be shared between computers","If the central server fails, all users lose access to their files at once","User access rights can no longer be controlled","Backups become impossible to schedule"],"a":1,"e":"The server is a single point of failure — when it goes down, every client loses access simultaneously. (P2P failure affects only one user's machine.)","ch":6,"d":3},
  {"q":"A firm backs up nightly to a USB drive that stays plugged into the server. Ransomware strikes and both the server and the USB backup are encrypted. The BEST improvement is to:","o":["Back up twice per night to the same USB drive","Buy a larger USB drive","Encrypt the USB drive themselves first","Keep an offline or off-site backup disconnected from the network"],"a":3,"e":"Ransomware encrypts any connected drives. Only a backup that is disconnected (offline) or off-site/cloud remains safe and restorable — the 3-2-1 rule's '1 copy offsite'.","ch":6,"d":3},
  {"q":"A company is evaluating fingerprint login versus passwords for staff. Which is the strongest point IN FAVOUR of fingerprints?","o":["A fingerprint cannot be forgotten or shared like a password","Fingerprint scanners are always cheaper than password systems","Fingerprints can easily be reset if compromised","Fingerprints remove the need for any other security measure"],"a":0,"e":"Biometrics are 'something you are' — they can't be forgotten, written down or shared. (Weaknesses: they cannot be reset if spoofed, and scanners cost money — so the other options are wrong.)","ch":6,"d":3},
  {"q":"Why is pharming generally considered harder for users to detect than phishing?","o":["Pharming emails contain fewer spelling errors","Pharming only targets large companies","The victim types the correct URL and sees the expected address while on the fake site","Pharming attacks are always encrypted"],"a":2,"e":"Pharming corrupts DNS or router settings, so even a careful user typing the genuine URL is silently redirected — there is no suspicious email or link to spot.","ch":6,"d":3},
  {"q":"An IT manager suspects an employee with legitimate access is leaking confidential files. Which combination of measures BEST addresses this insider threat?","o":["A stronger firewall and anti-malware software","Tighter file access rights plus transaction logs recording who accesses what","WPA3 Wi-Fi encryption and a CAPTCHA","Daily full backups and a Wi-Fi booster"],"a":1,"e":"Insiders already have credentials, so perimeter tools don't help. Restricting access rights limits what they can reach, and transaction logs provide evidence of exactly who accessed which files.","ch":6,"d":3},

  // ─── Expansion pack: Chapter 7 (28 new) ───
  {"q":"Which security method converts data into unreadable ciphertext that can only be read with the correct key?","o":["Firewall","Access rights","Encryption","CAPTCHA"],"a":2,"e":"Encryption scrambles data into ciphertext so that intercepted data cannot be read without the decryption key.","ch":7,"d":1},
  {"q":"What is the purpose of a CAPTCHA on a login page?","o":["To prove the user is a human, not an automated bot","To encrypt the user's password","To scan the device for malware","To remember the user's login details"],"a":0,"e":"A CAPTCHA is a challenge-response test (e.g. distorted text or image puzzles) designed to block automated bot attacks.","ch":7,"d":1},
  {"q":"Why does a merchant ask for the CVV when a customer pays online with a bank card?","o":["It replaces the need for a PIN in shops","It encrypts the card number","It identifies the card's bank branch","It suggests the customer physically possesses the card and is not stored by the merchant"],"a":3,"e":"The CVV is the three-digit code on the back of the card — merchants must not store it, so quoting it suggests the buyer has the physical card.","ch":7,"d":1},
  {"q":"In digital wallets such as Apple Pay, what does 'tokenisation' mean?","o":["The PIN is stored on the merchant's server","The real card number is replaced by a unique device token","The payment is split into small instalments","The card details are emailed to the bank"],"a":1,"e":"Tokenisation replaces the real card number with a unique token, so the merchant never sees the actual card details.","ch":7,"d":1},
  {"q":"What do access rights (file permissions) control on a computer network?","o":["Which users can read, write or delete each file or folder","How fast files are downloaded","Which websites users can visit","How often files are backed up"],"a":0,"e":"Access rights set who can read, write or delete files — limiting damage from insider threats and accidental deletion.","ch":7,"d":1},
  {"q":"Under data protection law, the right to rectification allows an individual to:","o":["Demand compensation for any email received","Refuse to pay for goods bought online","Request that inaccurate personal data held about them is corrected","Access any other customer's records"],"a":2,"e":"The right to rectification lets individuals require an organisation to correct inaccurate or outdated personal data.","ch":7,"d":1},
  {"q":"Which environmental problem is most directly associated with large data centres?","o":["Noise pollution in city centres","Very high electricity consumption for servers and cooling","Plastic packaging waste","Water pollution from printer ink"],"a":1,"e":"Data centres consume vast amounts of electricity (~200 TWh per year globally) for servers and cooling, much of it from fossil fuels.","ch":7,"d":1},
  {"q":"Which set of symptoms is typical of Computer Vision Syndrome (CVS)?","o":["Tingling fingers and weak grip","Lower back pain and stiff shoulders","Ringing in the ears","Headaches, dry eyes and blurred vision"],"a":3,"e":"CVS (digital eye strain) causes headaches, dry or sore eyes and blurred vision after prolonged screen use — distinct from RSI or back pain.","ch":7,"d":1},
  {"q":"Which of these is an example of biometric authentication?","o":["A fingerprint scan to unlock a smartphone","A four-digit PIN","A memorable security question","A one-time code sent by text message"],"a":0,"e":"Biometrics use unique physical characteristics — fingerprint, face, iris or voice — to verify identity.","ch":7,"d":1},
  {"q":"What does the padlock icon and 'https://' in a browser address bar indicate?","o":["The website contains no advertising","The website has been checked for viruses","The connection is encrypted and the site's certificate has been verified","The website is owned by the government"],"a":2,"e":"HTTPS uses TLS encryption and an SSL certificate that verifies the server's identity — protecting data in transit.","ch":7,"d":1},
  {"q":"Which of the following is classed as sensitive personal data needing extra protection?","o":["A person's email address","A person's religion or biometric data","A person's delivery address","A person's phone number"],"a":1,"e":"Sensitive personal data — race, religion, political opinions, sexual orientation, biometric data, criminal record — gets extra legal protection.","ch":7,"d":1},
  {"q":"Amir types his bank's web address correctly into his browser but is taken to a convincing fake site that steals his login details. Which attack has occurred?","o":["Phishing","Accidental deletion","Identity theft","Pharming"],"a":3,"e":"Pharming manipulates DNS so users are silently redirected to a fake site even when they type the correct address — no deceptive message is needed.","ch":7,"d":2},
  {"q":"Priya is working from a café and needs to open confidential company files over the public Wi-Fi. Which technology should she use to keep the connection secure?","o":["A CAPTCHA","A VPN (Virtual Private Network)","An anti-adware program","A stronger Wi-Fi password on her laptop"],"a":1,"e":"A VPN creates an encrypted tunnel to the company's systems, protecting data from interception on public Wi-Fi.","ch":7,"d":2},
  {"q":"A shopper worries that criminals could intercept her contactless card payment at the till. Why is this very difficult in practice?","o":["Contactless cards do not transmit any data","The shop's CCTV prevents interception","NFC only works over a very short range of about 4 cm","Contactless payments are not linked to a bank account"],"a":2,"e":"NFC's very short range (under ~4 cm) makes real-world interception extremely hard; transaction limits and bank monitoring add further protection.","ch":7,"d":2},
  {"q":"Tom wants to buy from a small online shop he has never used before, without giving the shop his card details. Which payment method best achieves this?","o":["A third-party payment service such as PayPal","Typing his card number, expiry date and CVV on the shop's site","A bank transfer directly to the shop","Chip and PIN at the checkout"],"a":0,"e":"Third-party payment services process the payment so the merchant never sees the customer's card details.","ch":7,"d":2},
  {"q":"An online retailer automatically deletes customers' order records five years after the warranty ends. Which data protection principle is it following?","o":["Data must be accurate and up to date","Data must be used fairly and lawfully","Data must be kept secure","Data must not be kept longer than necessary"],"a":3,"e":"Retention policies that delete data once it is no longer needed follow the storage limitation principle.","ch":7,"d":2},
  {"q":"A high-street travel agency closes because most customers now book holidays through websites and apps. This is an example of:","o":["The digital divide","Job losses in traditional sectors caused by the internet","A failure of data protection law","Reduced physical activity caused by ICT"],"a":1,"e":"The internet has removed many traditional jobs (travel agents, bank tellers, checkout staff) while creating new digital roles.","ch":7,"d":2},
  {"q":"Students in a rural village have a 2 Mbps connection while students in a nearby city enjoy 1 Gbps fibre. This situation best illustrates:","o":["Unequal access to ICT within a country (local digital divide)","The global digital divide between continents","Information overload","Unrestricted network access"],"a":0,"e":"Differences in broadband quality between rural and urban areas within the same country are an example of local unequal access.","ch":7,"d":2},
  {"q":"A free fitness app records users' running routes and sells this location history to advertising companies. This is mainly an example of:","o":["Pharming","Copyright infringement","Monitoring of individuals raising privacy concerns","A health and safety risk"],"a":2,"e":"GPS and location tracking by apps is a form of monitoring; selling location data to advertisers raises serious privacy issues.","ch":7,"d":2},
  {"q":"Ella decides to stream films in HD rather than 4K to reduce her environmental impact. Why does this help?","o":["HD films are not stored in data centres","Lower quality streaming transfers less data, so servers use less energy","Her screen switches off automatically in HD","HD streaming does not use the internet"],"a":1,"e":"4K streaming uses around three times more data than HD, so servers and networks consume more energy delivering it.","ch":7,"d":2},
  {"q":"A teenager plays online games for three hours every evening with the volume high in his earphones and has started to notice ringing in his ears. What should he do?","o":["Switch to a larger monitor","Take a break every 20 minutes to look into the distance","Use an ergonomic keyboard","Follow the 60/60 rule — no more than 60% volume for 60 minutes at a time"],"a":3,"e":"Ringing in the ears (tinnitus) indicates early hearing damage; the 60/60 rule limits both volume and listening duration.","ch":7,"d":2},
  {"q":"An employee discovers her manager reads emails sent from her work email account. Which statement is correct?","o":["Employers are generally allowed to monitor work email accounts","All email monitoring is illegal without a court warrant","Only the government may read work emails","Monitoring is only legal if the employee is suspected of a crime"],"a":0,"e":"Employer monitoring of work email is generally legal; monitoring of personal email usually requires a warrant.","ch":7,"d":2},
  {"q":"A bank introduces 3D Secure, sending a one-time code to the customer's phone before an online payment completes. What is the main security benefit?","o":["It makes payments process more quickly","It hides the customer's address from the merchant","A criminal with stolen card details still cannot pay without the customer's phone","It removes the need for HTTPS on the payment page"],"a":2,"e":"3D Secure adds a second factor — possession of the customer's phone — so stolen card details alone are no longer enough to make a payment.","ch":7,"d":3},
  {"q":"A school portal suffers thousands of automated login attempts every night from bot networks trying password combinations. Which single measure most directly stops this attack?","o":["Security questions for account recovery","Adding a CAPTCHA to the login page","Backing up the portal database daily","An anti-adware scan of the server"],"a":1,"e":"A CAPTCHA requires proof of human interaction, directly defeating automated brute-force bots; the other measures do not block automated logins.","ch":7,"d":3},
  {"q":"Ransomware encrypts every file on a small firm's office computers and demands payment. Which security method allows the firm to recover its data WITHOUT paying?","o":["Running a firewall after the attack","Changing all staff passwords","Installing anti-spyware software","Restoring from backups kept separately from the network"],"a":3,"e":"Only backups stored separately (offline or cloud) allow encrypted files to be restored; firewalls and passwords cannot undo encryption already done.","ch":7,"d":3},
  {"q":"Why might satellite internet services help close the global digital divide more effectively than laying cable broadband in remote regions?","o":["They do not require expensive ground infrastructure to reach isolated areas","Satellite connections are always cheaper for users than cable","Satellites remove the need for users to own any devices","Cable broadband cannot carry video content"],"a":0,"e":"Satellite services can reach remote or developing areas without the huge cost and time of laying physical cables — though devices and subscriptions still cost money.","ch":7,"d":3},
  {"q":"A company has a strong firewall, yet staff still fall victim to phishing attacks. Why does the firewall fail to prevent this?","o":["Firewalls only work on home networks, not in companies","Phishing emails are too large for firewalls to scan","Phishing exploits human behaviour, and the email traffic looks legitimate to the firewall","The firewall blocks emails but not websites"],"a":2,"e":"Phishing is social engineering — the email arrives through legitimate channels and the user voluntarily gives away credentials, so traffic filtering cannot stop it alone.","ch":7,"d":3},
  {"q":"A council replaces all paper records with digital records held in a data centre. Which statement best evaluates the environmental impact?","o":["The change is entirely positive because no resources are used digitally","Paper use falls, but energy use by servers and eventual e-waste partly offset the gains","The change is entirely negative because servers always pollute more than paper","There is no environmental difference between paper and digital storage"],"a":1,"e":"Going digital saves paper, printing and transport, but data centres consume energy and hardware becomes e-waste — a balanced trade-off, not a free win.","ch":7,"d":3},

  // ─── Expansion pack: Chapter 8 (30 new) ───
  {"q":"Pinterest, where users save and tag links and images into themed boards, is an example of which type of online community?","o":["A virtual learning environment","An online workspace","A social bookmarking service","A user-generated reference site"],"a":2,"e":"Social bookmarking services let users save, tag, organise and share links to web content — Pinterest, Pocket and Diigo are examples.","ch":8,"d":1},
  {"q":"Which feature would you expect to find in a virtual learning environment (VLE)?","o":["Online assignment submission with automatic timestamps","Voice chat between players in real time","Upvoting and downvoting of links","Tagging saved bookmarks into collections"],"a":0,"e":"VLEs provide course materials, assignment submission, auto-marked quizzes, discussion forums and grade tracking for learners.","ch":8,"d":1},
  {"q":"What does the 'version history' feature of a wiki allow editors to do?","o":["Block other users from the site permanently","View every previous edit and revert vandalism","Prevent anyone from ever editing an article","Automatically translate articles into other languages"],"a":1,"e":"Version history stores every change ever made, so vandalism or errors can be seen and reverted instantly.","ch":8,"d":1},
  {"q":"Which search technique restricts results to pages from one particular website?","o":["Putting the website name in quotation marks","Using the OR operator","Using the minus (-) operator","Using the site: operator, e.g. site:bbc.co.uk"],"a":3,"e":"The site: operator limits results to a single domain — useful for searching only a trusted source.","ch":8,"d":1},
  {"q":"What is the effect of putting quotation marks around a phrase in a search engine?","o":["It excludes that phrase from all results","It returns only pages containing that exact phrase","It searches for each word separately","It limits results to recent pages"],"a":1,"e":"Quotation marks force the search engine to match the exact phrase, eliminating off-topic results.","ch":8,"d":1},
  {"q":"What is 'doxing'?","o":["Publicly sharing someone's private information, such as their address, without consent","Sending someone a single rude message","Saving bookmarks to a shared folder","Editing a wiki article without citing sources"],"a":0,"e":"Doxing is publishing a victim's private personal details online — creating real-world safety risks and extreme anxiety.","ch":8,"d":1},
  {"q":"Under a Creative Commons CC-BY licence, a user of the work must:","o":["Pay a royalty for every use","Never adapt or change the work","Credit the original creator","Use the work for non-commercial purposes only"],"a":2,"e":"CC-BY allows use, sharing and adaptation for any purpose — including commercial — provided the creator is credited.","ch":8,"d":1},
  {"q":"Why can geotagged photos posted online be a safety risk?","o":["They take longer to upload than normal photos","They reduce the image quality","They can be removed by the platform without warning","They contain location data revealing where the person is"],"a":3,"e":"Geotagging embeds location data in photos, which could let strangers work out someone's home, school or routine.","ch":8,"d":1},
  {"q":"In which type of online community do members typically collaborate in real time using voice chat, teams and leaderboards?","o":["Online gaming","Social bookmarking","A wiki","A blog"],"a":0,"e":"Online gaming communities (e.g. Fortnite, Minecraft) involve real-time play with voice/text chat, teams, clans and leaderboards.","ch":8,"d":1},
  {"q":"What does the minus (-) operator do in a search query such as 'python programming -snake'?","o":["Finds pages older than one year","Searches for both words as one phrase","Excludes results containing the word after the minus sign","Ranks results by popularity"],"a":2,"e":"The minus operator removes results containing the unwanted term — here filtering out biology pages about snakes.","ch":8,"d":1},
  {"q":"In online communities, 'flaming' refers to:","o":["Reporting a post to moderators","Posting deliberately hostile, aggressive arguments to upset a target","Sharing a post many times","Deleting your own account"],"a":1,"e":"Flaming is aggressive, hostile online arguing designed to upset the target — one recognised form of cyberbullying.","ch":8,"d":1},
  {"q":"Which of these sources is generally considered the MOST reliable for scientific research?","o":["A personal blog about science","A celebrity's social media post","A tabloid newspaper website","A peer-reviewed academic journal"],"a":3,"e":"Peer-reviewed journals are checked by independent experts before publication, giving them very high reliability.","ch":8,"d":1},
  {"q":"A student researching for homework finds a webpage with no publication date and no named author. Which TWO evaluation criteria does the page fail?","o":["Relevance and bias","Currency and authority","Accuracy and relevance","Bias and accuracy"],"a":1,"e":"No date means currency cannot be checked; no author means authority (credentials, expertise) cannot be established.","ch":8,"d":2},
  {"q":"Maya searches 'jaguar' for an animal report but the results are full of car websites. What is the best way to refine her search?","o":["Search for 'jaguar -car' to exclude car results","Search for 'jaguar' again in capital letters","Click through more pages of results","Use the filetype:pdf operator"],"a":0,"e":"The minus operator excludes the unwanted meaning — 'jaguar -car' (or adding 'animal') removes the car results.","ch":8,"d":2},
  {"q":"A student needs information published in the last month about a volcanic eruption. Which search technique is most appropriate?","o":["The OR operator to broaden the search","Quotation marks around the volcano's name","The date filter in the search tools, set to 'past month'","The site: operator on an encyclopaedia"],"a":2,"e":"Date filtering restricts results to recent content — essential for rapidly changing current events.","ch":8,"d":2},
  {"q":"A 13-year-old gamer is deliberately and repeatedly left out of his clan's team chats and matches. Which form of cyberbullying is this?","o":["Doxing","Impersonation","Flaming","Exclusion"],"a":3,"e":"Exclusion is deliberately leaving someone out of online groups, chats or gaming teams — causing loneliness and isolation.","ch":8,"d":2},
  {"q":"In an online game, a stranger claiming to be 14 asks Leah to move their chat to a private app and tell him which school she attends. What should Leah do first?","o":["Stop sharing information and tell a trusted adult","Agree, but only share her school's town","Send a photo so he can prove his age","Move to the private app but stay anonymous"],"a":0,"e":"The stranger may be misrepresenting his identity (possible grooming); Leah should not disclose personal details and should tell a trusted adult immediately.","ch":8,"d":2},
  {"q":"Jack copies a paragraph from a website into his coursework, changes a few words, and submits it without naming the source. Which statement is correct?","o":["It is acceptable because he changed some of the words","It is acceptable because coursework is non-commercial","It is plagiarism because the ideas are presented as his own without citation","It is only plagiarism if a teacher notices"],"a":2,"e":"Rewriting or paraphrasing without acknowledging the source is still plagiarism — the ideas remain someone else's.","ch":8,"d":2},
  {"q":"A designer needs an image for a client's paid advertising brochure. Which licence allows this if the creator is credited?","o":["CC-BY-NC (non-commercial only)","CC-BY","All Rights Reserved without permission","No licence is needed for images found on Google"],"a":1,"e":"CC-BY permits commercial use with attribution; CC-BY-NC forbids commercial use and All Rights Reserved requires explicit permission.","ch":8,"d":2},
  {"q":"Three musicians in the UK, Brazil and Japan co-write and record a song together without ever meeting. Which capability of online communities makes this possible?","o":["Social bookmarking of music websites","Search engine date filtering","Acceptable use policies","Global collaboration through cloud-based tools and file sharing"],"a":3,"e":"Cloud collaboration tools let people share, edit and discuss work across borders and time zones in real time.","ch":8,"d":2},
  {"q":"A student finds impressive health statistics on a commercial weight-loss company's website. Which evaluation criterion should concern her most?","o":["Bias — the company profits from selling its products","Currency — the page loads slowly","Relevance — the site is about health","Authority — the company is well known"],"a":0,"e":"A company selling weight-loss products has a commercial motive to cherry-pick favourable research — a clear bias risk.","ch":8,"d":2},
  {"q":"Liam posts publicly: 'Off to Spain for two weeks — house to ourselves when we're back!' Why is this post risky?","o":["It breaches copyright law","It counts as cyberbullying","It tells potential burglars exactly when his home will be empty","It will be removed under the platform's AUP"],"a":2,"e":"Announcing absence from home publicly is location/personal information disclosure — burglars can see when the house is empty.","ch":8,"d":2},
  {"q":"A student uses Wikipedia to start researching the First World War. What is the best practice for using it in her project?","o":["Copy the article since Wikipedia is free of copyright","Follow the article's references and cite those original sources","Cite Wikipedia itself as her main academic source","Avoid Wikipedia completely as it is always wrong"],"a":1,"e":"Wikipedia is a useful starting point — but you should follow its citations to primary sources and cite those, not the wiki itself.","ch":8,"d":2},
  {"q":"A teacher wants to find downloadable past exam papers in PDF format. Which search query element should she add?","o":["The OR operator","Quotation marks around 'exam'","A minus sign before 'PDF'","filetype:pdf"],"a":3,"e":"The filetype: operator restricts results to a specific document format — filetype:pdf returns only PDF files.","ch":8,"d":2},
  {"q":"A social networking platform's acceptable use policy sets a minimum age of 13. Which statement best explains why?","o":["Younger children cannot create passwords","Children under 13 have no interest in social media","It complies with child protection law and limits minors' exposure to inappropriate content","It reduces the amount of server storage the platform needs"],"a":2,"e":"Age limits exist for legal compliance (e.g. COPPA/GDPR rules on children's data) and to protect young children from unsuitable content and contact.","ch":8,"d":3},
  {"q":"Which statement best evaluates anonymity in online communities?","o":["It can protect whistleblowers and political dissidents, but also lets bullies act without accountability","It is entirely harmful and should be banned on every platform","It is entirely beneficial because privacy is always good","It only matters in online gaming communities"],"a":0,"e":"Anonymity is double-edged: it enables safe reporting of abuse and free speech under repressive regimes, yet shields harassers and fraudsters from consequences.","ch":8,"d":3},
  {"q":"A student researching a new medical treatment finds a 2015 journal article and a 2024 article from a reputable news organisation reporting a new clinical trial. What is the best evaluation?","o":["The 2015 article is better because journals always beat news sources","Both sources should be rejected as unreliable","Neither source matters as long as the essay is well written","The 2024 article is more current for a fast-changing topic, but its claims should be traced to the original trial"],"a":3,"e":"Currency matters greatly in medicine, but a news report is secondary — best practice is to use it to locate and verify the primary research.","ch":8,"d":3},
  {"q":"Why do schools treat paraphrasing without citation as seriously as direct copy-and-paste plagiarism?","o":["Because paraphrased text always contains spelling errors","Because the ideas still belong to the original author and are dishonestly presented as the student's own","Because paraphrasing is illegal under copyright law in all cases","Because detection software cannot read quotations"],"a":1,"e":"Plagiarism is about presenting another person's IDEAS as your own — changing the wording does not change whose ideas they are.","ch":8,"d":3},
  {"q":"Wikipedia editors temporarily lock an article about a contested election so that only experienced editors can change it. What is the most likely reason?","o":["The article has become too long to store","The topic is no longer of public interest","Locking pages increases advertising revenue","To prevent vandalism and edit wars while the topic is controversial"],"a":3,"e":"Controversial topics attract vandalism and biased editing; locking protects accuracy and the neutral point of view until disputes settle.","ch":8,"d":3},
  {"q":"A student notices that her search engine results increasingly show only viewpoints she already agrees with. Why is this 'filter bubble' a problem for school research?","o":["It makes web pages load more slowly","It prevents her from using quotation marks in searches","She may never see opposing viewpoints, so her work becomes one-sided","It automatically plagiarises her sources"],"a":2,"e":"Personalised results based on search history can hide alternative perspectives, undermining the balance and reducing exposure to counter-arguments.","ch":8,"d":3},

  // ─── Expansion pack: Chapter 9 (30 new) ───
  {"q":"On an online shopping website, what is the purpose of the shopping basket?","o":["It processes the customer's card payment","It permanently stores the customer's order history","It temporarily stores items the customer intends to buy before checkout","It displays delivery tracking information"],"a":2,"e":"The basket is temporary storage for selected items, letting the customer review them before paying at checkout.","ch":9,"d":1},
  {"q":"Which technology protects a customer's card details during a secure online checkout?","o":["HTTPS/TLS encryption of data in transit","A firewall on the customer's router","Compression of the payment file","A persistent cookie on the device"],"a":0,"e":"Secure checkout uses HTTPS/TLS encryption so card details cannot be read if intercepted in transit.","ch":9,"d":1},
  {"q":"On a shopping website, the product catalogue is best described as:","o":["A list of the customer's previous orders","The page where payment is taken","A folder of saved delivery addresses","A digital database of products with descriptions, images and stock levels"],"a":3,"e":"The product catalogue holds all products with descriptions, images, specifications and stock, and can be searched and filtered.","ch":9,"d":1},
  {"q":"Transactional data is best described as:","o":["Data used to encrypt online payments","Data about purchases, such as what was bought, when and for how much","Data stored about the website's server hardware","Data that only exists while the browser is open"],"a":1,"e":"Transactional data is generated by customer transactions — items bought, dates, amounts and payment method.","ch":9,"d":1},
  {"q":"A first-party cookie is set by:","o":["The website the user is currently visiting","An advertising network embedded in the page","The user's internet service provider","The browser manufacturer"],"a":0,"e":"First-party cookies are set directly by the site being visited; third-party cookies are set by external advertisers.","ch":9,"d":1},
  {"q":"What is meant by dynamic pricing?","o":["Charging extra for faster delivery","Rounding all prices to the nearest pound","Prices changing automatically based on demand, time or customer data","Displaying prices in the customer's local currency"],"a":2,"e":"Dynamic pricing adjusts prices automatically using factors such as demand, competitor prices, time and data about the customer.","ch":9,"d":1},
  {"q":"Cloud computing is best defined as:","o":["Any connection that uses wireless technology","Computing services delivered from remote servers via the internet","Software that is stored on a USB flash drive","A network that links computers in one building"],"a":1,"e":"Cloud means services (storage, applications, processing) delivered from remote data centres over the internet — it does not mean wireless.","ch":9,"d":1},
  {"q":"How are hosted (cloud) applications typically updated?","o":["Each user downloads and installs every update","The IT department reinstalls the software yearly","Updates are posted to users on physical media","The provider updates the software centrally and automatically"],"a":3,"e":"Hosted applications are updated centrally by the provider, so every user always runs the latest version.","ch":9,"d":1},
  {"q":"A virtual learning environment (VLE) allows students to:","o":["Access learning materials, submit work and join online classes","Make secure card payments to the school","Bid for second-hand textbooks","Stream films and music on demand"],"a":0,"e":"A VLE (e.g. Moodle) is an online education service for materials, submissions, feedback and online lessons.","ch":9,"d":1},
  {"q":"Why do websites operating in the UK display cookie consent banners?","o":["To advertise their premium services","To check the user's browser is up to date","It is a legal requirement under data protection law for non-essential cookies","To speed up how quickly pages load"],"a":2,"e":"GDPR/data protection law requires user consent before non-essential (analytics/advertising) cookies are placed on a device.","ch":9,"d":1},
  {"q":"The term e-commerce means:","o":["Sending business documents by email","Buying and selling goods and services over the internet","Advertising products on television","Storing company files on remote servers"],"a":1,"e":"E-commerce is the buying and selling of goods and services online, e.g. Amazon or ASOS.","ch":9,"d":1},
  {"q":"In entertainment services, 'on-demand' means content is:","o":["Broadcast at a fixed scheduled time","Only available as a physical disc","Free to access without an account","Available whenever the user chooses to access it"],"a":3,"e":"On-demand content can be played at any time chosen by the user, unlike scheduled TV broadcasts.","ch":9,"d":1},
  {"q":"A customer adds trainers to their online basket but leaves without paying. The next day the retailer emails them about the trainers. Which collected data made this possible?","o":["Items added to the basket, recorded even though no purchase was made","The customer's device battery level","The retailer's stock delivery schedule","The customer's home Wi-Fi password"],"a":0,"e":"Retailers record abandoned basket data and use it for reminder email campaigns to recover lost sales.","ch":9,"d":2},
  {"q":"A traveller notices that the price of the same flight increases each time they search for it. Which technique is the airline most likely using?","o":["Mail merge","Social proof","Dynamic pricing","A presence check"],"a":2,"e":"Dynamic pricing automatically adjusts prices using demand and data about the customer, such as repeated searches.","ch":9,"d":2},
  {"q":"A student often writes coursework on a train with no internet connection. Which option is most suitable for their word processing?","o":["A hosted application accessed through a browser","Locally installed software, because it runs offline","Cloud storage with no application","A web-based VLE"],"a":1,"e":"Locally installed software runs on the device itself, so it works without any internet connection.","ch":9,"d":2},
  {"q":"A school buys cheap, low-specification Chromebooks that run all applications in a web browser. Why are these devices adequate?","o":["Browsers do not need a processor","Chromebooks contain hidden high-end hardware","Schools do not run demanding software","Most processing and storage is done on remote cloud servers"],"a":3,"e":"With hosted applications, the cloud server does the heavy processing, so a basic device is sufficient.","ch":9,"d":2},
  {"q":"A supermarket loyalty card records every purchase a customer makes. How can the supermarket use this data?","o":["Send personalised vouchers based on the customer's buying habits","Change the customer's bank account details","Prevent the customer shopping elsewhere","Delete the customer's purchase records daily"],"a":0,"e":"Loyalty programmes build purchase profiles used for targeted offers and personalised vouchers.","ch":9,"d":2},
  {"q":"An online bookshop shows 'Customers who bought this also bought...' suggestions. Which technique is this an example of?","o":["Dynamic pricing","Personalised recommendations","A range check","Escrow payment"],"a":1,"e":"Recommendation engines analyse purchase and browsing history to suggest products likely to interest the user.","ch":9,"d":2},
  {"q":"A freelance designer works from home, a studio and client offices using different devices. What is the main benefit of cloud storage for them?","o":["Files open faster than from a local drive","No login is ever required","Files cannot ever be deleted","Files are accessible from any device with internet access"],"a":3,"e":"Cloud storage is accessed via the internet with a login, so the same files are available on every device and location.","ch":9,"d":2},
  {"q":"A team spread across three countries must edit the same report at the same time. Which feature of hosted applications supports this?","o":["Manual update installation","Emailing the file between offices","Real-time collaboration by multiple users on one document","High local hardware requirements"],"a":2,"e":"Hosted applications such as Google Docs allow several users to edit one shared document simultaneously.","ch":9,"d":2},
  {"q":"On an online auction site, which feature most helps a buyer judge whether a seller is trustworthy?","o":["Seller ratings and feedback from previous buyers","The colour scheme of the listing","The length of the item description","The time the auction ends"],"a":0,"e":"Seller ratings/feedback show how previous transactions went, helping buyers assess trustworthiness.","ch":9,"d":2},
  {"q":"A village has slow, unreliable broadband. Why is keeping a local bank branch particularly important there?","o":["Branches always offer better interest rates","Local services do not depend on an internet connection","Online banking is illegal in rural areas","Branches are open 24 hours a day"],"a":1,"e":"Local/physical services work without connectivity, which matters where internet access is poor or unreliable.","ch":9,"d":2},
  {"q":"A customer closes their account and asks an online retailer to delete all personal data held about them. Which data protection right are they using?","o":["Right to data portability","Right of access","Right to rectification","Right to erasure ('to be forgotten')"],"a":3,"e":"The right to erasure lets individuals request deletion of their personal data, subject to legal limits.","ch":9,"d":2},
  {"q":"Compared with a high-street shop, a pure online retailer typically has:","o":["Shorter opening hours","A smaller product range","Lower premises and staffing overheads","No need to invest in cybersecurity"],"a":2,"e":"With no physical stores, pure online retailers avoid rent and shop staffing costs, though they depend on logistics and digital systems.","ch":9,"d":2},
  {"q":"Why is dynamic pricing sometimes criticised as unfair to consumers?","o":["Different customers can pay different prices for the same product based on data about them","It always makes every product cheaper","It prevents businesses from making a profit","It only works for customers who pay in cash"],"a":0,"e":"Dynamic pricing can charge customers differently (e.g. by device or search history), which can feel discriminatory.","ch":9,"d":3},
  {"q":"A streaming service only ever recommends content similar to what a user already watches. What is the main concern with this?","o":["The service will run out of content","The user's subscription price will rise","Recommendations use too much bandwidth","It creates a filter bubble that narrows what the user is exposed to"],"a":3,"e":"Personalisation can trap users in a filter bubble, limiting discovery of new or different content and viewpoints.","ch":9,"d":3},
  {"q":"Why might a professional video-editing studio choose locally installed software rather than a hosted application?","o":["Locally installed software never needs updating","Local processing handles very large files faster and does not depend on the internet","Hosted applications cannot open video files","Local software is always free of charge"],"a":1,"e":"Demanding work with large files needs maximum local performance; hosted apps depend on connection speed and reliability.","ch":9,"d":3},
  {"q":"Web browsers blocking third-party cookies most directly reduces advertisers' ability to:","o":["Encrypt their own websites","Display any advertising at all","Track users across many different websites to target adverts","Store products in a shopping basket"],"a":2,"e":"Third-party cookies enable cross-site tracking; blocking them weakens behaviour-based ad targeting across sites.","ch":9,"d":3},
  {"q":"Which is the strongest argument AGAINST online services completely replacing local high-street services?","o":["Online services are always more expensive","Websites cannot display product photographs","Online shops never offer refunds","Local services provide employment, face-to-face advice and community value that online cannot replicate"],"a":3,"e":"Local services give jobs, immediate access, personal advice and social/community benefit — a balanced evaluation recognises this.","ch":9,"d":3},
  {"q":"A company stores its files with a cloud provider. Which statement best describes how security responsibility is shared?","o":["The provider secures its data centres, but the company must still protect its own account credentials","The provider is responsible for everything, including staff passwords","The company must physically guard the provider's servers","Neither party is responsible once data is encrypted"],"a":0,"e":"Cloud providers manage physical/data-centre security; users remain responsible for account security such as strong passwords.","ch":9,"d":3},

  // ─── Expansion pack: Chapter 10 (26 new) ───
  {"q":"What is the difference between the COUNT and COUNTA functions in a spreadsheet?","o":["COUNT adds values; COUNTA finds the average","COUNT counts only cells containing numbers; COUNTA counts all non-empty cells","COUNTA only counts blank cells","They are identical in every way"],"a":1,"e":"COUNT counts numeric cells only; COUNTA counts every non-empty cell, including text.","ch":10,"d":1},
  {"q":"What does the formula =PRODUCT(A2:A4) do?","o":["Multiplies together all the values in A2 to A4","Adds all the values in A2 to A4","Returns the largest value in A2 to A4","Counts the cells in A2 to A4"],"a":0,"e":"PRODUCT multiplies all values in the range — =PRODUCT(A2:A4) is the same as =A2*A3*A4.","ch":10,"d":1},
  {"q":"In a database table, a field is:","o":["One complete row of data","The unique identifier of the table","One column storing a single attribute for every record","A link between two tables"],"a":2,"e":"A field is a column holding one attribute (e.g. LastName) for every record in the table.","ch":10,"d":1},
  {"q":"Which data type is most suitable for a 'Has paid membership fee?' field?","o":["Alphanumeric","Currency","Date/Time","Logical/Boolean"],"a":3,"e":"Boolean (Yes/No, True/False) is designed for fields with exactly two possible states.","ch":10,"d":1},
  {"q":"Which validation check ensures a required field is not left empty?","o":["Presence check","Range check","Length check","Type check"],"a":0,"e":"A presence check rejects the entry if a required field has been left blank.","ch":10,"d":1},
  {"q":"In presentation software, changing the logo on the master slide will:","o":["Change the logo on the first slide only","Delete the logo from all slides","Apply the change to every slide automatically","Have no effect until each slide is edited"],"a":2,"e":"Master slide changes (background, fonts, logo) apply automatically to all slides — change once, affect all.","ch":10,"d":1},
  {"q":"The visual effect shown as one slide changes to the next is called:","o":["An animation","A transition","An action button","A placeholder"],"a":1,"e":"Transitions occur BETWEEN slides; animations apply to individual objects ON a slide.","ch":10,"d":1},
  {"q":"Which HTML tag is used to create a hyperlink?","o":["<img>","<b>","<br>","<a href=\"...\">"],"a":3,"e":"The anchor tag <a href=\"URL\">link text</a> creates a hyperlink to another page or site.","ch":10,"d":1},
  {"q":"In the mixed cell reference A$1, which part stays fixed when the formula is copied?","o":["The row only","The column only","Both the row and the column","Neither part"],"a":0,"e":"The $ locks whatever follows it — A$1 locks row 1 while the column letter can still change.","ch":10,"d":1},
  {"q":"Which presentation print option provides lines for the audience to write notes beside each slide?","o":["Full page slides","Notes pages","Handouts with 3 slides per page","Handouts with 6 slides per page"],"a":2,"e":"The 3-per-page handout prints slides in a left column with ruled lines for notes on the right.","ch":10,"d":1},
  {"q":"Which data type should be chosen for a DateOfBirth field in a database?","o":["Alphanumeric","Currency","Boolean","Date"],"a":3,"e":"Date fields store calendar dates in a standard format, allowing date validation and sorting.","ch":10,"d":1},
  {"q":"Cells A2:C4 contain product data — A: P1, P2, P3; B: Pen, Pad, Pencil; C: 0.50, 2.00, 0.30. What does =VLOOKUP(\"P2\",A2:C4,3,FALSE) return?","o":["Pad","2.00","P2","0.50"],"a":1,"e":"VLOOKUP finds P2 in the first column, then returns the value from column 3 of the range (column C) — 2.00.","ch":10,"d":2},
  {"q":"Cell B2 contains 10. What does =IF(B2>10,\"High\",\"Low\") return?","o":["High","10","An error","Low"],"a":3,"e":"The test B2>10 is FALSE because 10 is not greater than 10, so the second value, \"Low\", is returned.","ch":10,"d":2},
  {"q":"Cells B2:B6 contain 45, 62, 50, 78 and 31. What does =COUNTIF(B2:B6,\">50\") return?","o":["1","2","3","4"],"a":1,"e":"Only 62 and 78 are greater than 50 (50 itself is not), so COUNTIF returns 2.","ch":10,"d":2},
  {"q":"A query uses the criteria Year = 10 AND Score > 60. Which record is returned?","o":["Year 10, Score 58","Year 11, Score 72","Year 10, Score 65","Year 9, Score 90"],"a":2,"e":"AND requires both conditions to be true — only the record with Year 10 and a score above 60 matches.","ch":10,"d":2},
  {"q":"A vet's database stores details of pets. Which field should be the primary key?","o":["PetName","OwnerSurname","PetID","Breed"],"a":2,"e":"PetID is guaranteed unique for every record; names, surnames and breeds can all be duplicated.","ch":10,"d":2},
  {"q":"Cells A1:A4 contain 4, 8, 6 and 2. What does =AVERAGE(A1:A4) return?","o":["5","20","4","8"],"a":0,"e":"AVERAGE returns the mean: (4+8+6+2) ÷ 4 = 20 ÷ 4 = 5.","ch":10,"d":2},
  {"q":"A postcode field must contain between 5 and 8 characters. Which validation check enforces this?","o":["Presence check","Length check","Lookup check","Range check"],"a":1,"e":"A length check limits the number of characters; range checks apply to numeric values, not text length.","ch":10,"d":2},
  {"q":"The formula =B2*$D$1 in cell C2 is copied down to cell C5. What is the formula in C5?","o":["=B5*$D$1","=B2*$D$4","=B5*$D$4","=B2*$D$1"],"a":0,"e":"The relative reference B2 adjusts to B5 when copied down three rows, but the absolute reference $D$1 stays fixed.","ch":10,"d":2},
  {"q":"A student designs a poster to advertise the school play. Which design approach is most appropriate?","o":["Long paragraphs of detailed text in a small font","A contents page with numbered sections","A large eye-catching heading, minimal text and a dominant image","A TO/FROM/DATE/SUBJECT block at the top"],"a":2,"e":"Poster conventions: large heading, minimal text, strong images, bold colours and key details only.","ch":10,"d":2},
  {"q":"A club enlarges its JPG logo to print on a large banner and it appears blocky. Why?","o":["The printer ran out of ink","JPG files cannot be printed","The logo contained too many colours","JPG is a bitmap format, so its pixels become visible when enlarged"],"a":3,"e":"Bitmaps are pixel grids that pixelate when scaled up — a vector format (e.g. SVG) would scale without quality loss.","ch":10,"d":2},
  {"q":"An Age field has a range check allowing 11 to 18. Which incorrect entry would the check FAIL to detect?","o":["13 entered by mistake instead of 15","5","21","The text 'twelve'"],"a":0,"e":"13 is within the permitted range, so validation accepts it even though it is wrong — only verification against the source catches it.","ch":10,"d":3},
  {"q":"A query's criteria are changed from Town = 'Leeds' AND Age > 18 to Town = 'Leeds' OR Age > 18. What happens to the results?","o":["Fewer records are returned, because OR is stricter","The same number or more records are returned, because only one condition now needs to be true","No records are returned at all","Only records meeting both conditions are returned"],"a":1,"e":"OR matches records satisfying either condition, so the result set can only stay the same size or grow.","ch":10,"d":3},
  {"q":"When using VLOOKUP to find a product by its code, why should FALSE be used as the final argument?","o":["FALSE makes the formula calculate faster","FALSE allows the formula to search several sheets","TRUE only works with text values","FALSE forces an exact match, preventing a similar but wrong code being returned"],"a":3,"e":"FALSE = exact match; TRUE allows approximate matching, which could silently return the wrong product's data.","ch":10,"d":3},
  {"q":"A column chart comparing sales of four shops has its vertical axis starting at 90 instead of 0. What is the effect?","o":["Small differences between the bars are exaggerated, making the chart misleading","The chart becomes impossible to read","All the bars appear identical in height","The legend is removed automatically"],"a":0,"e":"Truncating the axis magnifies small differences — starting the scale at 0 gives an honest comparison.","ch":10,"d":3},
  {"q":"Why is a relational database with separate Customers and Orders tables better than one large table holding everything?","o":["It removes the need for any primary keys","Customer details are stored once and linked by key, avoiding duplication and inconsistency","Queries can no longer be run on the data","It doubles the storage space required"],"a":1,"e":"Linking tables with primary/foreign keys means each customer's details are stored once, reducing redundancy and update errors.","ch":10,"d":3},
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
  },

  // ─── Expansion pack: Chapter 1 (5 new) ───
  {"q":"Describe what is meant by an embedded microprocessor. Give TWO examples of products that contain one.","marks":4,"ch":1,"mark_scheme":["A small processing chip built directly into a product or appliance (1)","It automatically controls one specific, limited function of that product (1)","Example 1: e.g. washing machine — controls the wash cycle and temperature (1)","Example 2: e.g. microwave oven timer / car engine management unit (1)"],"keywords":["chip","built into","specific task","automatic","washing machine","microwave","control"]},
  {"q":"Explain TWO reasons why a business traveller would choose a laptop rather than a desktop computer.","marks":4,"ch":1,"mark_scheme":["Portability — built-in screen, keyboard and trackpad in one lightweight unit (1) so it can be used on trains, planes and in hotel rooms (1)","Battery power (1) means it can run for hours without mains electricity while travelling (1)"],"keywords":["portability","battery","lightweight","built-in","travel","mains"]},
  {"q":"A sixth-form student takes notes in lessons and writes long coursework essays at home. Discuss whether a tablet or a laptop is more suitable for this student.","marks":6,"ch":1,"mark_scheme":["Tablet: highly portable with long battery life (1) — light to carry between lessons all day (1)","Laptop: physical keyboard and higher performance (1) — faster, more accurate typing of long essays and runs coursework software (1)","Justified conclusion, e.g. laptop overall because essay writing is the main task, or tablet only if paired with a keyboard accessory (1+1)"],"keywords":["tablet","laptop","portability","keyboard","battery","performance","essays"]},
  {"q":"Convergence has allowed smartphones to take over the functions of many standalone devices. Discuss the impact of convergence on manufacturers of single-purpose devices such as digital cameras and satnavs.","marks":6,"ch":1,"mark_scheme":["Negative impact: smartphone cameras and GPS apps now replicate these functions (1), so demand for casual single-purpose devices has fallen sharply (1)","Response: manufacturers target specialists — e.g. professional cameras with large sensors and optical zoom that smartphones cannot match (1+1)","Some markets survive where specialist performance or independence from the internet matters (e.g. standalone satnavs with preloaded maps); conclusion that manufacturers must specialise to survive (1+1)"],"keywords":["convergence","smartphone","camera","satnav","specialist","demand","optical zoom"]},
  {"q":"Evaluate whether a smartphone could fully replace a laptop for a university student.","marks":8,"ch":1,"mark_scheme":["For: very high portability and long battery life (1) — usable anywhere on campus without mains power (1)","For: multifunctional — camera, GPS, communication apps and web access in one pocket-sized device (1+1)","Against: small touchscreen user interface (1) makes typing long assignments slow and inaccurate compared with a keyboard (1)","Against: lower performance and storage, and limited support for specialist academic software (1)","Justified conclusion: a smartphone complements but cannot fully replace a laptop for essay writing and specialist software (1)"],"keywords":["portability","battery","touchscreen","keyboard","performance","storage","multifunctional"]},

  // ─── Expansion pack: Chapter 2 (8 new) ───
  {"q":"Explain the difference between a single-user operating system and a network operating system. Give one example of where each would be used.","marks":4,"ch":2,"mark_scheme":["Single-user OS: manages one user on one device (1)","Example: Windows 11 on a home laptop (1)","Network OS: manages many users connected to a central server, with centralised accounts and access rights (1)","Example: Windows Server / Linux Server running a school or office network (1)"],"keywords":["single-user","network","server","many users","access rights","centralised"]},
  {"q":"Describe TWO different methods by which software updates are delivered to users.","marks":4,"ch":2,"mark_scheme":["Automatic updates: software checks the developer's server in the background (1) and downloads and installs without any user action (1)","App store updates: the store notifies the user, who updates one or all apps with a single tap, or it updates them automatically (1+1) [accept: manual check from settings menu / patch download / enterprise deployment by an administrator]"],"keywords":["automatic","background","download","install","app store","manual","deployment"]},
  {"q":"State what is meant by control software. Describe TWO advantages of using it to run machinery in a bottling factory.","marks":4,"ch":2,"mark_scheme":["Control software sends automated instructions to physical hardware devices (1)","Advantage 1: the machines can run continuously without breaks (1), increasing the factory's output (1)","Advantage 2: instructions are carried out precisely the same way every time, reducing errors and waste (1)"],"keywords":["control software","automated","instructions","hardware","continuous","precise","errors"]},
  {"q":"A travel agency with offices in three countries needs staff to collaborate in real time. Describe TWO types of communication software the agency could use and explain how each would help.","marks":6,"ch":2,"mark_scheme":["Type 1: video conferencing software, e.g. Microsoft Teams or Zoom (1)","Enables real-time meetings with audio, video and screen sharing (1) between staff in all three countries without travel costs (1)","Type 2: instant messaging software, e.g. Slack or WhatsApp (1)","Enables quick real-time text chat and file or image sharing (1) for day-to-day queries between offices (1)"],"keywords":["video conferencing","instant messaging","real time","screen sharing","files","offices","exchange"]},
  {"q":"An accountancy firm plans to install a major update to its accounts software on the day it is released. Discuss the risks of this plan and describe how the firm could reduce them.","marks":6,"ch":2,"mark_scheme":["Risk: the update may introduce new bugs not present in the old version (1), disrupting work on client accounts (1)","Risk: the update could fail mid-installation, corrupting or losing accounts data (1+1)","Reduction: back up all data before installing, and test the update on one machine first / wait until early problems have been patched by the developer (1+1)"],"keywords":["update","bugs","data loss","backup","test","incompatibility","corrupt"]},
  {"q":"A school with one IT technician must keep 200 computers up to date. Evaluate whether the school should rely on automatic updates.","marks":6,"ch":2,"mark_scheme":["For: updates download and install in the background without the technician visiting each machine (1), so security patches are applied promptly across all 200 computers (1)","Against: an untested update could introduce bugs or incompatibility on all machines at once (1), and forced restarts could disrupt lessons (1)","Justified conclusion: automatic updates scheduled overnight, with critical systems tested first, give the best balance for a single technician (1+1)"],"keywords":["automatic","security patch","background","bugs","downtime","technician","overnight"]},
  {"q":"A regional bus company needs software to plan routes, manage timetables and sell tickets. The software must work with the company's unique ticket machines. Evaluate whether the company should commission custom-written software or buy an off-the-shelf package.","marks":8,"ch":2,"mark_scheme":["Custom-written advantage: built to the company's exact requirements (1), including integration with its unique ticket machines (1)","Custom-written disadvantage: very expensive and takes months or years to develop and test (1+1)","Off-the-shelf advantage: available immediately, much cheaper, and already tested by many other users (1+1)","Off-the-shelf disadvantage and conclusion: a generic package is unlikely to support the unique ticket machines, so custom-written software is more suitable despite the cost (1+1)"],"keywords":["custom-written","off-the-shelf","requirements","expensive","development","immediately","integration"]},
  {"q":"A hospital's scanning equipment runs on software that the developer no longer supports. Managers must decide whether to keep using it or move to newer, supported software. Discuss the risks of each option and give a justified recommendation.","marks":8,"ch":2,"mark_scheme":["Risk of staying: known security vulnerabilities are never patched (1), leaving patient data open to attackers indefinitely (1)","Risk of staying: growing incompatibility with newer hardware and no developer help when faults occur (1+1)","Risk of moving: downtime while new software is installed, and the new software may be incompatible with the existing scanner hardware (1+1)","Recommendation: plan a managed migration to supported software, using full backups and staged testing on one scanner first to protect patient data (1+1)"],"keywords":["unsupported","vulnerability","patch","incompatibility","downtime","backup","migration"]},

  // ─── Expansion pack: Chapter 3 (8 new) ───
  {"q":"Describe how a chip and PIN reader is used when a customer pays for goods in a shop.","marks":4,"ch":3,"mark_scheme":["The card is inserted and the reader reads the data stored on the embedded microchip (1)","The customer is prompted to enter their PIN on the keypad (1)","The entered PIN is verified against the data held on the chip / by the bank (1)","The encrypted transaction data is sent to the bank for authorisation of the payment (1)"],"keywords":["chip","pin","microchip","keypad","verify","encrypted","bank","authorisation"]},
  {"q":"Explain why a touchscreen can be described as both an input device and an output device.","marks":4,"ch":3,"mark_scheme":["It is an input device because it detects the position of finger or stylus touches (1)","The touch data is sent into the computer for processing (1)","It is an output device because it displays text, images and video to the user (1)","Both functions are combined in one surface, e.g. the user taps an icon that the screen is displaying (1)"],"keywords":["input","output","touch","detect","display","stylus","screen"]},
  {"q":"Describe how a temperature sensor and a heater (actuator) work together to keep a greenhouse at a constant temperature.","marks":4,"ch":3,"mark_scheme":["The temperature sensor measures the air temperature and sends a digital signal to the computer/controller (1)","The computer compares the reading with the pre-set target temperature (1)","If the temperature is too low, the computer sends an output signal to switch on the heater (actuator) (1)","The sensor continues re-checking so the heater is switched off when the target is reached — a continuous automatic loop (1)"],"keywords":["sensor","actuator","temperature","signal","controller","compare","loop","automatic"]},
  {"q":"A 32 GiB SD card is used to store photographs that are each 8 MiB in size. Calculate the maximum number of photographs the card can hold. Show your working.","marks":4,"ch":3,"mark_scheme":["Convert the capacity to MiB: 32 x 1,024 = 32,768 MiB (1+1)","Divide by the file size: 32,768 ÷ 8 (1)","Answer: 4,096 photographs (1)"],"keywords":["gib","mib","1024","convert","divide","4096","capacity"]},
  {"q":"A family prints homework documents most days and occasionally prints colour photographs. Discuss whether they should buy an inkjet printer or a laser printer.","marks":6,"ch":3,"mark_scheme":["Inkjet: lower purchase price, suiting a home budget (1)","Inkjet: excellent photo quality for the occasional colour photographs (1)","Inkjet drawback: higher cost per page / ink cartridges are expensive and can dry up (1)","Laser: faster printing and lower cost per page for the frequent homework documents (1)","Laser drawback: higher upfront cost and poorer photo printing quality (1)","Justified conclusion weighing daily document printing against occasional photos (1)"],"keywords":["inkjet","laser","cost per page","toner","ink","photo quality","speed","upfront cost"]},
  {"q":"A small business backs up its accounts to optical disc every week. Evaluate the use of recordable (R) discs compared with rewritable (R/W) discs for these backups.","marks":6,"ch":3,"mark_scheme":["R discs can only be written once, so a new disc is needed every week (1)","R discs are cheaper per disc and create a permanent, tamper-proof archive of each week's accounts (1+1)","R/W discs can be erased and reused, reducing waste and ongoing cost (1)","R/W risks: previous backups can be overwritten or lost, and discs wear out after many rewrite cycles (1)","Justified recommendation, e.g. R/W for reusable weekly backups or R where a permanent audit trail is required (1)"],"keywords":["recordable","rewritable","write once","erase","reuse","archive","backup","overwrite"]},
  {"q":"A national museum must archive 200 TiB of digitised records that will rarely be accessed. Compare magnetic tape and external hard drives for this task and recommend one.","marks":6,"ch":3,"mark_scheme":["Tape has the lowest cost per terabyte, which matters greatly at 200 TiB scale (1)","Tape cartridges hold very large capacities (tens of TB each) and last for decades stored offline (1)","Tape drawback: very slow, sequential access makes finding individual files time-consuming (1)","External HDDs allow faster, direct (random) access to any file (1)","HDD drawbacks: higher cost per TB and fragile moving parts mean drives fail over time (1)","Recommendation: magnetic tape, because the records are rarely accessed so slow retrieval is acceptable (1)"],"keywords":["magnetic tape","hard drive","cost per terabyte","sequential","archival","capacity","access speed"]},
  {"q":"A gym currently uses magnetic stripe membership cards at its entrance gate. The owner is considering replacing them with fingerprint biometric scanners. Evaluate both options and recommend one.","marks":8,"ch":3,"mark_scheme":["Magnetic stripe: cards are cheap to issue and replace, and the technology is familiar to members (1)","Magnetic stripe drawbacks: cards can be lost or lent to friends, and stripes are easy to clone or copy (1+1)","Biometric: a fingerprint is unique to the member and cannot be lost, shared or forgotten (1+1)","Biometric drawbacks: higher installation cost; privacy concerns over storing biometric data; occasional failed reads (1+1)","Justified recommendation, e.g. biometric scanners to prevent card sharing, provided fingerprint data is stored securely (1)"],"keywords":["magnetic stripe","biometric","fingerprint","unique","clone","privacy","security","cost"]},

  // ─── Expansion pack: Chapter 4 (10 new) ───
  {"q":"Explain what happens when a computer's RAM becomes full while the user continues to open more programs.","marks":4,"ch":4,"mark_scheme":["The operating system uses virtual memory — space on the storage drive — as overflow (1)","Data is swapped between RAM and the drive as different programs are used (1)","The storage drive is much slower than RAM (1)","So the computer slows down noticeably and programs may freeze (1)"],"keywords":["virtual memory","ram","swap","storage drive","slow","overflow","operating system"]},
  {"q":"Describe the roles of the Control Unit and the Arithmetic Logic Unit (ALU) within the CPU.","marks":4,"ch":4,"mark_scheme":["The Control Unit fetches and decodes program instructions (1)","The Control Unit directs and coordinates the timing of all components inside the CPU (1)","The ALU performs arithmetic operations such as addition, subtraction, multiplication and division (1)","The ALU performs logical comparisons such as greater than, equal to, AND, OR, NOT (1)"],"keywords":["control unit","alu","decode","fetch","arithmetic","logical","coordinate","cpu"]},
  {"q":"Describe TWO characteristics of flash memory and state TWO devices in which it is used.","marks":4,"ch":4,"mark_scheme":["Characteristic: non-volatile — it retains data when the power is removed (1)","Characteristic: no moving parts / rewritable many times / low power consumption / compact (1)","Device: USB flash drive or SSD (1)","Device: SD card or smartphone internal storage (1)"],"keywords":["flash memory","non-volatile","no moving parts","rewritable","usb","ssd","sd card"]},
  {"q":"Explain why a computer cannot start up without ROM.","marks":4,"ch":4,"mark_scheme":["ROM holds the BIOS/UEFI start-up instructions permanently (1)","At power-on the CPU reads its first instructions from ROM, because RAM is empty at this point (1)","The BIOS performs the POST hardware check and then locates the operating system on the storage drive (1)","Without ROM the CPU would have no instructions to follow, so the OS could never be loaded (1)"],"keywords":["rom","bios","uefi","post","start-up","non-volatile","boot","instructions"]},
  {"q":"Explain THREE factors, other than clock speed, that affect the overall performance of a computer.","marks":6,"ch":4,"mark_scheme":["Number of cores — more cores allow several tasks/instructions to be processed in parallel at the same time (1+1)","Cache size — a larger cache keeps frequently used data close to the CPU, reducing slow fetches from RAM (1+1)","Amount of RAM / storage type — more RAM avoids slow virtual memory; an SSD loads the OS and programs far faster than an HDD (1+1)"],"keywords":["cores","cache","ram","ssd","parallel","virtual memory","performance","bus"]},
  {"q":"A computer shop advert claims: 'Doubling the clock speed of the CPU will double the speed of your computer.' Discuss this claim.","marks":6,"ch":4,"mark_scheme":["A higher clock speed does mean more instruction cycles are completed per second (1)","So tasks that depend mainly on the CPU would complete faster (1)","However, performance also depends on the number of cores, cache size and CPU architecture (1)","The amount of RAM and the storage speed can bottleneck the system regardless of GHz (1)","Therefore doubling GHz does not double real-world speed if other components limit performance (1)","Conclusion: the claim is exaggerated/misleading — clock speed is only one of several factors (1)"],"keywords":["clock speed","ghz","cores","cache","bottleneck","ram","factors","performance"]},
  {"q":"A charity supplies computers to users who cannot use a standard keyboard or mouse because of motor impairments. Describe THREE adaptations the charity could provide and explain how each one helps.","marks":6,"ch":4,"mark_scheme":["Voice recognition software — the user dictates text and speaks commands instead of typing (1+1)","Eye-tracking or head-mouse control — the cursor is moved by eye or head movement rather than by hand (1+1)","Switch access / sticky keys — a single switch scans through menu options, or keyboard shortcuts can be pressed one key at a time (1+1)"],"keywords":["voice recognition","eye tracking","switch access","sticky keys","motor impairment","dictate","accessibility"]},
  {"q":"Compare RAM and cache memory.","marks":6,"ch":4,"mark_scheme":["Location: cache is built into or next to the CPU; RAM sits on the motherboard (1+1)","Speed and size: cache is faster but tiny (a few MB); RAM is slower than cache but much larger (GB) (1+1)","Purpose: cache holds frequently used instructions/data to avoid fetches from RAM; RAM holds all currently running programs and open files (1+1)"],"keywords":["cache","ram","cpu","speed","size","frequently used","motherboard","volatile"]},
  {"q":"A university student starting a graphic design course must choose between a high-specification desktop computer and a mid-range laptop costing the same amount. Evaluate the two options and recommend one.","marks":8,"ch":4,"mark_scheme":["Desktop: more powerful CPU/GPU and more RAM for the same money — handles photo editing and rendering smoothly (1+1)","Desktop: supports a larger, colour-accurate monitor and is easier to upgrade later (1)","Desktop drawback: not portable — the student cannot work in lectures, studios or the library (1)","Laptop: portable for classes and client visits, with built-in screen, webcam and battery (1+1)","Laptop drawbacks: weaker GPU and less RAM at the same price; smaller screen is limiting for design work (1)","Justified recommendation linked to the student's needs, e.g. laptop for flexibility while using university lab machines for heavy rendering (1)"],"keywords":["desktop","laptop","gpu","ram","portable","monitor","upgrade","graphic design"]},
  {"q":"An employer is setting up a workstation for a partially sighted office worker. Evaluate the hardware devices and software accessibility settings that could be provided and recommend a suitable configuration.","marks":8,"ch":4,"mark_scheme":["Hardware: a large, high-resolution monitor so text and images can be enlarged without pixelation (1+1)","Hardware: a keyboard with large-print, high-contrast keys to make typing easier (1)","Software: screen magnification software to enlarge any selected part of the screen (1+1)","Software: a high-contrast colour theme and increased system font size (1)","Limitation: magnification shows less content at once, so text-to-speech can supplement for long documents (1)","Recommendation: combine the large monitor with magnifier and contrast settings, justified for everyday office tasks (1)"],"keywords":["magnifier","high contrast","font size","monitor","partially sighted","text-to-speech","accessibility","resolution"]},

  // ─── Expansion pack: Chapter 5 (8 new) ───
  {"q":"Describe the function of a router and a switch in a school's local area network.","marks":4,"ch":5,"mark_scheme":["Router directs/routes data packets between different networks using IP addresses (1)","Router connects the school's LAN to the internet via the ISP (1)","Switch connects multiple wired devices together within the LAN (1)","Switch forwards data only to the intended device, identified by its MAC address (1)"],"keywords":["router","switch","packets","ip address","mac address","lan","isp"]},
  {"q":"A family complains that their home broadband is much slower in the evenings, and slower than a neighbour who lives closer to the telephone exchange. Explain TWO factors that could affect the speed of data transfer for this family.","marks":4,"ch":5,"mark_scheme":["Network congestion at peak times (1) — many users online in the evening means data queues and each user gets a smaller share of bandwidth (1)","Distance from the exchange (1) — the signal weakens over a longer copper line, so a house further from the exchange receives lower speeds (1)"],"keywords":["congestion","peak times","bandwidth","distance","exchange","copper","users"]},
  {"q":"Describe TWO ways in which a laptop can be identified on a school network.","marks":4,"ch":5,"mark_scheme":["IP address — a logical/numerical address assigned by the router (1)","Used to route data packets to the device; it can change each time the laptop connects (1)","MAC address — a unique hardware address fixed into the network interface card at manufacture (1)","Identifies the device on the local network segment and never changes (1)"],"keywords":["ip address","mac address","router","unique","hardware","network interface card","permanent"]},
  {"q":"A fitness smartwatch connects to its owner's phone to sync activity data. Explain TWO reasons why Bluetooth is more suitable than Wi-Fi for this connection.","marks":4,"ch":5,"mark_scheme":["Bluetooth uses very little power (1), so the watch's small battery lasts far longer than it would using power-hungry Wi-Fi (1)","Bluetooth pairs the two devices directly with no router or network needed (1), so the watch can sync anywhere — for example during a run away from home (1)"],"keywords":["bluetooth","low power","battery","pairing","device-to-device","router","short range"]},
  {"q":"A commuter is deciding whether to tether her laptop to her smartphone's 4G connection instead of paying for a separate mobile broadband contract. Discuss the benefits and drawbacks of tethering for her.","marks":6,"ch":5,"mark_scheme":["Benefit: no separate contract or MiFi device is needed — she uses the phone she already owns, saving money (1)","Benefit: works anywhere there is mobile signal, e.g. on the train or in a café (1)","Drawback: tethering uses the phone's data allowance quickly, risking extra charges (1)","Drawback: acting as a hotspot drains the phone's battery rapidly (1)","Drawback: speed depends on 4G signal strength, which varies while travelling (1)","Justified conclusion weighing both sides against her usage, e.g. fine for email but not heavy streaming (1)"],"keywords":["tethering","hotspot","4g","data allowance","battery","signal","cost"]},
  {"q":"A household in a rural village can choose between ADSL broadband (up to 24 Mbps) and 4G mobile broadband. Evaluate the two options and recommend which the household should choose.","marks":6,"ch":5,"mark_scheme":["ADSL works over the existing phone line, is low cost and usually has unlimited data (1)","ADSL speed falls with distance from the exchange — a village home may get far below 24 Mbps (1)","4G can be faster (30–150 Mbps) where signal is good and needs no line installation (1)","4G rural coverage can be weak or patchy, and data allowances may be capped or expensive (1)","Comparison applied to the household's needs, e.g. streaming and number of users (1)","Justified recommendation based on local signal strength and distance from the exchange (1)"],"keywords":["adsl","4g","exchange","distance","coverage","data allowance","bandwidth"]},
  {"q":"A secondary school is refurbishing its network. The head teacher suggests using Wi-Fi only, with no wired connections at all. Discuss whether the school should use Wi-Fi only or a combination of wired and wireless connections.","marks":8,"ch":5,"mark_scheme":["Wi-Fi only: gives mobility — laptops and tablets can be used in any classroom (1)","Wi-Fi only: cheaper and easier than running cables throughout the building (1)","Wi-Fi drawback: interference from thick walls and other devices, plus congestion when hundreds of students connect (1)","Wi-Fi drawback: less secure — the signal can be intercepted from outside the building (1)","Wired: faster and more reliable for fixed machines such as servers and IT-suite desktops (1)","Wired: more secure because physical access to a cable is required (1)","A hybrid approach uses wired for servers/fixed PCs and wireless for mobile devices (1)","Justified conclusion, e.g. recommend the hybrid as it combines the strengths of both (1)"],"keywords":["wi-fi","wired","ethernet","interference","security","reliability","mobility","hybrid"]},
  {"q":"An island community 30 km from the mainland has no fixed broadband. A provider offers satellite broadband with high bandwidth. Discuss the benefits and drawbacks of satellite broadband for the community.","marks":8,"ch":5,"mark_scheme":["Benefit: available anywhere with a clear view of the sky — no undersea cable to the mainland is needed (1)","Benefit: high bandwidth supports streaming, downloads and several simultaneous users (1)","Drawback: very high latency (~500–700 ms) because signals travel to satellites in space and back (1)","Development: high latency makes video calls and online gaming awkward even though downloads are fast (1)","Drawback: bad weather can disrupt the signal and dish/equipment costs are high (1)","Comparison with an alternative, e.g. 4G mobile broadband if any mast coverage exists (1)","Recognition that bandwidth and latency are different measures affecting different applications (1)","Justified conclusion weighing the community's needs, e.g. accept it as the only viable option for general use (1)"],"keywords":["satellite","bandwidth","latency","milliseconds","weather","coverage","video calls"]},

  // ─── Expansion pack: Chapter 6 (5 new) ───
  {"q":"Describe the role of a print server and an email server in a company's client-server network.","marks":4,"ch":6,"mark_scheme":["Print server queues/spools print jobs sent by many users (1)","It manages them to shared printers, preventing conflicts and allowing usage to be tracked (1)","Email server sends, receives and stores email messages for users on the company domain (1)","It allows central filtering/archiving and access to mail from any device (1)"],"keywords":["print server","queue","spooling","shared printers","email server","store","domain"]},
  {"q":"Explain how setting file access rights protects data on a college network. Use examples of different user groups in your answer.","marks":4,"ch":6,"mark_scheme":["Access rights define what each user or group can do with files — read, read-write, or no access (1)","Students set to read-only on shared resources can view but not change or delete them (1)","Teachers/admin staff get read-write only on their own areas, keeping mark schemes and records hidden from students (1)","This limits the damage from accidental deletion or from a compromised student account (1)"],"keywords":["access rights","permissions","read-only","read-write","students","teachers","delete"]},
  {"q":"A veterinary clinic creates many new patient records every day and cannot afford to lose them. Discuss whether the clinic should use full, incremental or differential backups, and recommend a backup strategy.","marks":6,"ch":6,"mark_scheme":["A full backup copies everything — simplest and fastest to restore, but slow to run and needs the most storage (1)","An incremental backup copies only changes since the last backup — quick and small each night (1)","However an incremental restore is slow: the full backup plus every incremental must be restored in order (1)","A differential backup copies all changes since the last full backup — restore needs only the full plus the latest differential (1)","Application to the clinic: records change daily and are critical, so frequent backups with a reliable restore are needed (1)","Justified recommendation, e.g. weekly full backup plus nightly differential, with a copy stored off-site (1)"],"keywords":["full backup","incremental","differential","restore","storage","off-site","nightly"]},
  {"q":"A village library has six public computers used for browsing and printing. Discuss whether the library should set up a peer-to-peer or a client-server network, and recommend one.","marks":6,"ch":6,"mark_scheme":["P2P is cheap and simple — no server hardware or specialist IT staff are required (1)","With only six machines, the small scale suits peer-to-peer well (1)","P2P drawback: no central control of security, user accounts or updates on public machines (1)","Client-server allows central control of accounts, filtering and automatic backups (1)","Client-server drawback: the cost of a server and skilled staff is hard to justify for six computers (1)","Justified recommendation linked to the library's budget and needs, e.g. P2P with shared printer is sufficient (1)"],"keywords":["peer-to-peer","client-server","server","cost","central control","security","backup"]},
  {"q":"A travel agency allows staff to work from home, accessing customers' personal and payment details over the internet. Evaluate the security measures the agency should put in place, and reach a justified conclusion.","marks":8,"ch":6,"mark_scheme":["A VPN creates an encrypted tunnel between the home worker's device and the office server (1)","So any data intercepted on home or public Wi-Fi appears as unreadable ciphertext (1)","Multi-factor authentication means a stolen password alone cannot give access to customer data (1)","File access rights ensure each member of staff sees only the customer records they need (1)","Transaction logs record who accessed which records and when, deterring and detecting misuse (1)","Limitation: a VPN does not stop phishing or malware on home devices — anti-malware and staff training are also needed (1)","Limitation/trade-off: measures such as MFA add cost and slight inconvenience for staff (1)","Justified conclusion: a layered combination is required because no single measure protects against every threat (1)"],"keywords":["vpn","encryption","multi-factor authentication","access rights","transaction logs","phishing","anti-malware"]},

  // ─── Expansion pack: Chapter 7 (2 new) ───
  {"q":"Individuals' movements and communications can be monitored through CCTV, GPS tracking, website cookies and ISP records. Discuss the benefits and the privacy concerns of this monitoring.","marks":8,"ch":7,"mark_scheme":["Benefit: CCTV/monitoring helps detect and deter crime, providing evidence for police (1+1)","Benefit: banks/organisations monitor activity to detect fraud and protect customers (1+1)","Concern: constant surveillance invades privacy — people tracked without informed consent (1+1)","Concern: data collected (location, browsing) may be sold to advertisers or misused, e.g. stalking; conclusion weighing benefits against privacy cost (1+1)"],"keywords":["surveillance","privacy","cctv","gps","cookies","tracking","consent","security"]},
  {"q":"Evaluate the use of contactless NFC payment compared with Chip and PIN for everyday purchases.","marks":6,"ch":7,"mark_scheme":["Advantage of NFC: very fast and convenient — tap within ~4cm, no PIN needed below the limit (1+1)","Security of NFC: short range makes interception very difficult; transaction limit caps any loss (1+1)","Drawback vs Chip and PIN: a stolen contactless card can be used without any verification, whereas Chip and PIN requires a second factor; justified conclusion (1+1)"],"keywords":["nfc","contactless","chip and pin","transaction limit","stolen","verification","convenience"]},

  // ─── Expansion pack: Chapter 8 (8 new) ───
  {"q":"Describe TWO ways online communities allow people in different countries to collaborate on a shared project.","marks":4,"ch":8,"mark_scheme":["Video conferencing/messaging lets team members hold meetings across borders and time zones without travelling (1+1)","Cloud-based shared documents/workspaces let everyone edit the same files in real time from any location (1+1)"],"keywords":["video conferencing","cloud","collaboration","time zones","file sharing","global"]},
  {"q":"Explain TWO risks of disclosing your location through social media posts and geotagged photos.","marks":4,"ch":8,"mark_scheme":["Burglary risk: posting holiday plans or check-ins tells criminals when your home is empty (1+1)","Stalking/predator risk: geotagged photos reveal regular locations (home, school, routine) allowing someone to find you in person (1+1)"],"keywords":["geotagging","location","burglary","stalking","check-in","personal safety","privacy settings"]},
  {"q":"A student is using a search engine to research renewable energy for a geography project. Describe TWO techniques they could use to make their search more effective.","marks":4,"ch":8,"mark_scheme":["Use quotation marks around an exact phrase, e.g. \"offshore wind farms UK\", so only pages with that exact phrase are returned (1+1)","Use the site: operator or a date filter to restrict results to a reliable source or to recent pages (1+1)"],"keywords":["quotation marks","site:","exclude","minus","date filter","keywords","operator"]},
  {"q":"Explain TWO reasons why information found on a wiki may be unreliable.","marks":4,"ch":8,"mark_scheme":["Open editing means anyone can add content without credentials, so articles may contain errors, bias or deliberate vandalism (1+1)","Citations may be missing, dead or themselves unreliable, so claims cannot always be verified against trustworthy sources (1+1)"],"keywords":["wiki","open editing","vandalism","bias","citations","verify","reliability"]},
  {"q":"Discuss the advantages and disadvantages of allowing users to remain anonymous in online communities.","marks":6,"ch":8,"mark_scheme":["Advantage: anonymity protects vulnerable users — whistleblowers, abuse victims and political dissidents can speak safely (1+1)","Disadvantage: anonymity removes accountability — bullies, trolls and fraudsters can act without consequences (1+1)","Disadvantage/balance: people may misrepresent their identity (e.g. adults posing as children), creating grooming risks; conclusion weighing both sides (1+1)"],"keywords":["anonymity","whistleblowing","accountability","misrepresentation","trolling","grooming","identity"]},
  {"q":"Evaluate the usefulness of social media as a source of information for a school project.","marks":6,"ch":8,"mark_scheme":["Useful: extremely current — breaking news and first-hand accounts appear faster than traditional sources (1+1)","Limitation: posts are unverified, anyone can publish, and misinformation spreads rapidly (1+1)","Limitation/conclusion: posts are often biased or emotive; suitable only as a starting point that must be verified against reliable sources such as official or peer-reviewed sites (1+1)"],"keywords":["social media","unverified","misinformation","bias","currency","reliability","verify"]},
  {"q":"Discuss whether online gaming communities provide a positive environment for teenagers.","marks":6,"ch":8,"mark_scheme":["Positive: teamwork and friendship — players collaborate in teams/clans and communicate with people worldwide (1+1)","Negative: cyberbullying through voice/text chat (flaming, exclusion) and contact with anonymous strangers who may misrepresent themselves (1+1)","Negative/balance: excessive play risks addiction, reduced physical activity and pressure from in-game purchases; conclusion that benefits depend on moderation and safety measures (1+1)"],"keywords":["online gaming","teamwork","cyberbullying","voice chat","anonymity","addiction","moderation"]},
  {"q":"Discuss the measures a social networking platform should take to keep its young users safe, and the limitations of these measures.","marks":8,"ch":8,"mark_scheme":["Measure: enforce an acceptable use policy with age limits, content rules and consequences such as account bans (1+1)","Measure: provide blocking and reporting tools plus moderation so harmful content and bullies are removed (1+1)","Measure: default private accounts and privacy settings limiting who can contact young users or see their location (1+1)","Limitation: users can lie about their age and bullies can create new accounts, so platform measures must be combined with education and parental involvement; justified conclusion (1+1)"],"keywords":["acceptable use policy","moderation","reporting","blocking","privacy settings","age verification","cyberbullying"]},

  // ─── Expansion pack: Chapter 9 (5 new) ───
  {"q":"Describe the purpose of the shopping basket and the secure checkout on an online shopping website.","marks":4,"ch":9,"mark_scheme":["The shopping basket temporarily stores items the customer intends to buy (1)","The customer can add or remove items during the session and review them before paying (1)","The secure checkout takes payment using HTTPS/TLS encryption (1)","Card details are protected in transit so they cannot be intercepted and read by criminals (1)"],"keywords":["basket","checkout","encryption","https","payment","card details","temporary"]},
  {"q":"Explain ONE positive and ONE negative impact of streaming entertainment services on an individual's lifestyle.","marks":4,"ch":9,"mark_scheme":["Positive: instant on-demand access to millions of films/songs at any time on any device (1)","Development: cheaper and more convenient than buying physical media, with personalised recommendations (1)","Negative: encourages binge-watching and increased screen time / subscription costs build up (1)","Development: this can reduce sleep, physical activity or face-to-face socialising, or strain the individual's finances (1)"],"keywords":["on-demand","streaming","subscription","binge-watching","screen time","convenience"]},
  {"q":"Discuss the benefits and drawbacks of targeted marketing for both the customer and the business.","marks":6,"ch":9,"mark_scheme":["Benefit to customer: adverts and recommendations are relevant to their interests, saving time finding suitable products (1)","Benefit to business: higher click-through and conversion rates, so advertising spend is more effective (1)","Benefit to business: data profiles allow segmentation and personalised offers that build customer loyalty (1)","Drawback to customer: privacy concerns — detailed profiles are built from browsing, purchases and location, often without users realising (1)","Drawback to customer: encourages impulse buying and can create a filter bubble of similar products (1)","Drawback to business: retargeting can feel intrusive and damage trust, and the business must comply with GDPR consent rules (1)"],"keywords":["targeted marketing","personalisation","profile","privacy","retargeting","filter bubble","gdpr","consent"]},
  {"q":"A small business is deciding whether to use hosted applications (e.g. Google Workspace) instead of locally installed office software. Evaluate this decision.","marks":6,"ch":9,"mark_scheme":["For: nothing to install and updates are applied centrally and automatically, reducing the IT workload (1)","For: built-in real-time collaboration — staff can edit the same document simultaneously (1)","For: low hardware requirements and access from any device with a login, supporting remote working (1)","Against: a reliable internet connection is essential — staff cannot work during an outage (1)","Against: ongoing subscription costs may exceed a one-off licence over time, and customisation is limited (1)","Justified conclusion weighing both sides against the business's connectivity, budget and working patterns (1)"],"keywords":["hosted application","saas","subscription","collaboration","internet connection","automatic updates","offline"]},
  {"q":"Discuss whether online services should completely replace local high-street services. Refer to individuals, organisations and local communities in your answer.","marks":8,"ch":9,"mark_scheme":["For individuals: online services are available 24/7 from home, with easy price comparison (1)","For individuals: far greater choice — a global marketplace not limited by shelf space (1)","Against individuals: people without internet access or digital skills (e.g. some elderly or rural users) would be excluded (1)","Against individuals: loss of face-to-face advice and immediate access to goods and services (1)","For organisations: lower overheads (no rent or shop staff) and access to customers worldwide (1)","Against organisations/communities: high-street closures cause local job losses and the loss of community meeting places (1)","Some local services cannot be replaced — emergencies, immediate purchases and complex personal advice (1)","Balanced conclusion: a hybrid of online and local services is most realistic, with justification (1)"],"keywords":["24/7","convenience","digital divide","community","employment","high street","global","face-to-face"]},

  // ─── Expansion pack: Chapter 10 (3 new) ───
  {"q":"A teacher records test marks out of 100 in a spreadsheet. Explain how the IF function and the COUNTIF function could each be used by the teacher.","marks":4,"ch":10,"mark_scheme":["IF tests a condition and returns one of two values depending on the result (1)","e.g. =IF(B2>=50,\"Pass\",\"Fail\") automatically displays Pass or Fail next to each student's mark (1)","COUNTIF counts the cells in a range that meet a stated criterion (1)","e.g. =COUNTIF(C2:C31,\"Pass\") or =COUNTIF(B2:B31,\">=50\") counts how many students passed (1)"],"keywords":["if","countif","condition","criteria","pass","fail","function","range"]},
  {"q":"A gym stores member details in a database. Describe how to create a query to find all members who live in 'Leeds' AND who joined after 01/01/2023.","marks":4,"ch":10,"mark_scheme":["Create a new query and select the Members table with the required fields (1)","Enter the criterion Town = 'Leeds' on the Town field (1)","Enter the criterion JoinDate > 01/01/2023 on the JoinDate field (1)","Place both criteria on the same criteria row so BOTH must be true (AND), then run the query to display only matching records (1)"],"keywords":["query","criteria","and","field","greater than","run","records"]},
  {"q":"A student is creating a presentation for a school open evening. Evaluate the use of master slides, animations and transitions in this presentation.","marks":6,"ch":10,"mark_scheme":["A master slide sets a consistent background, fonts, colours and logo across every slide (1)","One change to the master updates all slides automatically, saving time and giving a professional, consistent look (1)","Animations can reveal bullet points one at a time, keeping the audience focused on the current point (1)","Transitions provide smooth visual movement between slides, adding polish (1)","However, excessive or varied animations and transitions distract from the content and appear unprofessional (1)","Conclusion: use the master slide throughout but apply simple animations/transitions sparingly and consistently (1)"],"keywords":["master slide","animation","transition","consistency","placeholder","audience","professional"]},
];

if (typeof window !== 'undefined') {
  window.MCQ_BANK = MCQ_BANK;
  window.ESSAY_BANK = ESSAY_BANK;
}
