/* ═══════════════════════════════════════════════════════════════════════════
   EDEXCEL GCSE (9-1) COMPUTER SCIENCE 1CP2 — QUESTION BANK
   MCQs: {q, o[], a (correct index), e (explanation), ch, d (difficulty 1-3)}
   Essays: {q, marks, ch, mark_scheme[], keywords[]}
   ═══════════════════════════════════════════════════════════════════════════ */

const MCQ_BANK = [
  // ═══════ CHAPTER 1 — DECOMPOSITION & ABSTRACTION ═══════
  {q:"What is decomposition?", o:["Hiding unnecessary detail","Breaking a problem into smaller sub-problems","Writing machine code","Sorting a list"], a:1, e:"Decomposition breaks a large problem into smaller, manageable parts.", ch:1, d:1},
  {q:"What is abstraction?", o:["Breaking a problem into parts","Removing or hiding unnecessary detail","Converting denary to binary","Testing a program"], a:1, e:"Abstraction focuses on essentials by removing irrelevant detail.", ch:1, d:1},
  {q:"A London Underground map is a classic example of:", o:["Decomposition","Abstraction","Iteration","Validation"], a:1, e:"The map removes real distances and geography, keeping only stations and links.", ch:1, d:1},
  {q:"Which is a benefit of decomposition?", o:["The program runs faster automatically","Sub-problems can be solved and tested independently","No testing is needed","It removes all errors"], a:1, e:"Smaller sub-problems are easier to solve, test and divide among a team.", ch:1, d:1},
  {q:"Computational thinking includes decomposition, abstraction, pattern recognition and:", o:["Compiling","Algorithm design","Encryption","Defragmentation"], a:1, e:"The four pillars are decomposition, abstraction, pattern recognition and algorithm design.", ch:1, d:1},
  {q:"Splitting a game into 'draw screen', 'handle input' and 'update score' is an example of:", o:["Abstraction","Decomposition","Compression","Selection"], a:1, e:"The problem is broken into sub-tasks — decomposition.", ch:1, d:1},
  {q:"Pattern recognition means:", o:["Spotting similarities between problems","Drawing flowcharts","Removing detail","Hiding code"], a:0, e:"Recognising patterns lets you reuse solutions to similar problems.", ch:1, d:1},
  {q:"Treating a variable name like 'score' instead of a memory address is an example of:", o:["Abstraction","Overflow","Iteration","A syntax error"], a:0, e:"Variables abstract away the underlying memory address.", ch:1, d:2},
  {q:"Why does decomposition help a team of programmers?", o:["It makes the CPU faster","Different members can work on different sub-problems at once","It removes the need for an OS","It encrypts the code"], a:1, e:"Independent sub-problems can be developed in parallel.", ch:1, d:2},
  {q:"When modelling a weather system, abstraction helps you decide:", o:["Which language to use","Which details are essential and which to ignore","How fast the internet is","Which printer to use"], a:1, e:"Abstraction is choosing the essential details for the model.", ch:1, d:2},
  {q:"A car sat-nav uses a simplified road model rather than every real-world detail. This is:", o:["Decomposition","Abstraction","A logic error","Compression"], a:1, e:"The road network is abstracted to what matters for navigation.", ch:1, d:2},
  {q:"Which task is the FIRST step when solving a large programming problem computationally?", o:["Write the final code","Decompose it into sub-problems","Compile it","Encrypt it"], a:1, e:"Break the problem down before designing algorithms for each part.", ch:1, d:2},
  {q:"A student designs a quiz app and lists 'ask question', 'check answer', 'keep score' as separate routines. The benefit is that each routine can be:", o:["Run without a CPU","Developed and tested separately, then reused","Stored in ROM only","Written in machine code only"], a:1, e:"Decomposed routines are independently testable and reusable.", ch:1, d:3},
  {q:"Why is abstraction useful when a problem is very complex?", o:["It deletes the hard parts permanently","It reduces detail so you can focus on the parts that matter","It doubles the processing speed","It removes the need for variables"], a:1, e:"Hiding irrelevant detail makes a complex problem manageable.", ch:1, d:3},
  {q:"Which pair correctly matches the technique to its description?", o:["Decomposition = remove detail; Abstraction = break into parts","Decomposition = break into parts; Abstraction = remove detail","Both mean the same thing","Both mean sorting data"], a:1, e:"Decomposition = break into parts; abstraction = remove unnecessary detail.", ch:1, d:3},

  // ═══════ CHAPTER 2 — ALGORITHMS, FLOWCHARTS & TRACE TABLES ═══════
  {q:"Which flowchart symbol represents a decision?", o:["Rectangle","Parallelogram","Diamond","Oval"], a:2, e:"A diamond shows a decision with yes/no branches.", ch:2, d:1},
  {q:"A parallelogram in a flowchart represents:", o:["A process","Input or output","A decision","Start/stop"], a:1, e:"Parallelograms are used for input and output.", ch:2, d:1},
  {q:"An oval (terminator) in a flowchart shows:", o:["A calculation","The start or end","A loop","A decision"], a:1, e:"The terminator marks where the algorithm starts or stops.", ch:2, d:1},
  {q:"What does a trace table record?", o:["The user interface design","Variable values step by step as an algorithm runs","Network speeds","The colour scheme"], a:1, e:"A trace table tracks each variable line by line.", ch:2, d:1},
  {q:"A program runs but produces the wrong answer. This is a:", o:["Syntax error","Logic error","Power failure","Compression error"], a:1, e:"Logic errors run but give incorrect results.", ch:2, d:1},
  {q:"A missing colon at the end of an if statement causes a:", o:["Logic error","Syntax error","Overflow","Runtime data loss"], a:1, e:"Breaking the language's grammar rules is a syntax error.", ch:2, d:1},
  {q:"An algorithm is best defined as:", o:["A programming language","A step-by-step sequence of instructions to solve a problem","A type of CPU","A storage device"], a:1, e:"An algorithm is a precise sequence of steps that solves a problem.", ch:2, d:1},
  {q:"Which is NOT a way of expressing an algorithm in 1CP2?", o:["Flowchart","Written description","Program code","Machine voltage diagram"], a:3, e:"Algorithms are expressed as flowcharts, written descriptions or code.", ch:2, d:1},
  {q:"A rectangle in a flowchart represents:", o:["Input/output","A process or calculation","A decision","Start/stop"], a:1, e:"A rectangle is a process step such as a calculation or assignment.", ch:2, d:2},
  {q:"In the code total = total + num inside a loop, the variable total is:", o:["A constant","A running total (accumulator)","A flowchart symbol","An array index"], a:1, e:"It accumulates a running total each iteration.", ch:2, d:2},
  {q:"Trace this: x = 5; x = x + 3; x = x * 2. What is x?", o:["10","13","16","8"], a:2, e:"5 + 3 = 8, then 8 * 2 = 16.", ch:2, d:2},
  {q:"Why would you use a trace table on a piece of code you didn't write?", o:["To compile it faster","To work out what the code does and its output","To encrypt it","To shrink the file"], a:1, e:"Tracing reveals the behaviour and output of unfamiliar code.", ch:2, d:2},
  {q:"Which best describes a logic error?", o:["Code that won't run at all","Code that runs but gives an unintended result","A missing bracket","A power cut"], a:1, e:"A logic error runs but the algorithm is wrong.", ch:2, d:2},
  {q:"A flowchart loop that checks a condition and repeats is showing:", o:["Sequence","Selection","Iteration","Abstraction"], a:2, e:"Repetition driven by a condition is iteration.", ch:2, d:2},
  {q:"For count = 1; while count <= 3: print(count); count = count + 1 — what is printed?", o:["1 2 3","1 2 3 4","0 1 2","1 2"], a:0, e:"Prints 1, 2, 3 then count becomes 4 and the loop stops.", ch:2, d:3},
  {q:"A student swaps > for >= in a grade-boundary check and some marks are graded wrongly. This is an example of a:", o:["Syntax error caught by the interpreter","Logic error found only by testing","Hardware fault","Network error"], a:1, e:"The code still runs, so it is a logic error found through testing.", ch:2, d:3},

  // ═══════ CHAPTER 3 — SEARCHING, SORTING & TRUTH TABLES ═══════
  {q:"Which search requires the list to be sorted first?", o:["Linear search","Binary search","Bubble search","Random search"], a:1, e:"Binary search halves a sorted list each step.", ch:3, d:1},
  {q:"A linear search works by:", o:["Halving the list","Checking each item in turn","Sorting then splitting","Comparing neighbours"], a:1, e:"It checks items one by one from the start.", ch:3, d:1},
  {q:"Bubble sort works by:", o:["Splitting the list in half","Comparing adjacent items and swapping if out of order","Choosing a pivot","Searching from the middle"], a:1, e:"Adjacent pairs are compared and swapped until sorted.", ch:3, d:1},
  {q:"Merge sort is best described as:", o:["Compare and swap","Divide and conquer","Trial and error","First in first out"], a:1, e:"It divides the list then merges the parts in order.", ch:3, d:1},
  {q:"For A AND B, the output is True when:", o:["At least one input is True","Both inputs are True","Both inputs are False","Neither is True"], a:1, e:"AND requires both inputs to be True.", ch:3, d:1},
  {q:"For A OR B, the output is True when:", o:["Both inputs are False","At least one input is True","Both inputs are True only","Never"], a:1, e:"OR is True when at least one input is True.", ch:3, d:1},
  {q:"NOT True evaluates to:", o:["True","False","1","Error"], a:1, e:"NOT inverts the value, so NOT True is False.", ch:3, d:1},
  {q:"A linear search can be used on:", o:["Only sorted lists","Unsorted or sorted lists","Only numbers","Only two items"], a:1, e:"Linear search does not need the list to be sorted.", ch:3, d:1},
  {q:"Binary search on a sorted list of about 1000 items needs at most roughly:", o:["1000 checks","500 checks","10 checks","100 checks"], a:2, e:"Each check halves the list: 2^10 = 1024, so about 10 checks.", ch:3, d:2},
  {q:"After ONE pass of a bubble sort on 4, 2, 7, 1 the list is:", o:["1, 2, 4, 7","2, 4, 1, 7","2, 4, 7, 1","1, 7, 4, 2"], a:1, e:"(4,2)→swap 2,4,7,1; (4,7)→no; (7,1)→swap 2,4,1,7.", ch:3, d:2},
  {q:"Which sort generally needs MORE memory?", o:["Bubble sort","Merge sort","Both equal","Neither uses memory"], a:1, e:"Merge sort needs extra space for the sub-lists.", ch:3, d:2},
  {q:"NOT (A AND B) is True when:", o:["A and B are both True","At least one of A or B is False","A and B are both True only","Never"], a:1, e:"A AND B is True only when both are True, so NOT is True otherwise.", ch:3, d:2},
  {q:"Evaluate (True OR False) AND False:", o:["True","False","Error","1"], a:1, e:"True OR False = True; True AND False = False.", ch:3, d:2},
  {q:"Why is binary search faster than linear search on large lists?", o:["It uses less memory","It discards half the remaining items each comparison","It needs no comparisons","It runs on the GPU"], a:1, e:"Halving the search space each step needs far fewer comparisons.", ch:3, d:2},
  {q:"A truth table for an expression with 3 inputs has how many rows?", o:["3","6","8","9"], a:2, e:"2^3 = 8 rows.", ch:3, d:3},
  {q:"A list is short and changes constantly. The better search is often:", o:["Binary, because it is always fastest","Linear, because no re-sorting is needed each change","Merge search","No search is possible"], a:1, e:"Keeping a changing list sorted for binary search is costly, so linear can be more sensible.", ch:3, d:3},

  // ═══════ CHAPTER 4 — BINARY & NUMBER SYSTEMS ═══════
  {q:"How many bits are in a nibble?", o:["2","4","8","16"], a:1, e:"A nibble is 4 bits.", ch:4, d:1},
  {q:"How many bits are in a byte?", o:["4","8","16","32"], a:1, e:"A byte is 8 bits.", ch:4, d:1},
  {q:"What is binary 00001010 in denary?", o:["8","10","12","20"], a:1, e:"8 + 2 = 10.", ch:4, d:1},
  {q:"What is denary 6 in binary?", o:["0110","1100","0011","1010"], a:0, e:"4 + 2 = 6 = 0110.", ch:4, d:1},
  {q:"Which number system is base 16?", o:["Binary","Denary","Hexadecimal","Octal"], a:2, e:"Hexadecimal is base 16.", ch:4, d:1},
  {q:"In hexadecimal, the digit A represents:", o:["10","11","12","15"], a:0, e:"Hex A = 10.", ch:4, d:1},
  {q:"How many colours/values can 8 bits represent?", o:["8","16","128","256"], a:3, e:"2^8 = 256.", ch:4, d:1},
  {q:"What is binary 11111111 in denary (unsigned)?", o:["255","256","127","128"], a:0, e:"All eight bits set = 255.", ch:4, d:1},
  {q:"What is denary 200 in binary?", o:["11001000","10101000","11000100","11010000"], a:0, e:"128 + 64 + 8 = 200 = 11001000.", ch:4, d:2},
  {q:"What is 00110101 + 00001010 in binary?", o:["00111111","01000000","00111110","00101111"], a:0, e:"53 + 10 = 63 = 00111111.", ch:4, d:2},
  {q:"An 8-bit addition gives a 9-bit result. This is called:", o:["Underflow","Overflow","A carry table","Rounding"], a:1, e:"A result too big for the available bits is overflow.", ch:4, d:2},
  {q:"In 8-bit two's complement, the most significant bit has place value:", o:["+128","-128","+255","-1"], a:1, e:"The sign bit is worth -128 in 8-bit two's complement.", ch:4, d:2},
  {q:"A logical left shift of 1 place multiplies an unsigned number by:", o:["2","4","10","0.5"], a:0, e:"Each left shift multiplies by 2.", ch:4, d:2},
  {q:"Convert binary 10110110 to hexadecimal.", o:["B6","6B","A6","B5"], a:0, e:"1011 = B, 0110 = 6, so B6.", ch:4, d:2},
  {q:"What is -5 in 8-bit two's complement?", o:["11111011","10000101","11111010","00000101"], a:0, e:"+5 = 00000101; flip = 11111010; +1 = 11111011.", ch:4, d:3},
  {q:"Why is hexadecimal used instead of long binary strings?", o:["It is faster for the CPU","It is more compact and easier for humans to read","It uses less electricity","It needs no conversion"], a:1, e:"One hex digit replaces four bits, making values shorter and less error-prone.", ch:4, d:3},

  // ═══════ CHAPTER 5 — DATA REPRESENTATION ═══════
  {q:"In ASCII, each character is stored as:", o:["A pixel","A unique binary code","A sound sample","A hex colour"], a:1, e:"A character set maps each character to a unique binary code.", ch:5, d:1},
  {q:"How many bits does standard ASCII use per character?", o:["4","7","16","32"], a:1, e:"Standard ASCII is a 7-bit code.", ch:5, d:1},
  {q:"A bitmap image is made up of:", o:["Vectors","Pixels","Samples","Frequencies"], a:1, e:"Bitmaps are grids of pixels.", ch:5, d:1},
  {q:"Colour depth is:", o:["The number of pixels","The number of bits used per pixel","The screen brightness","The image width"], a:1, e:"Colour depth is bits per pixel.", ch:5, d:1},
  {q:"How many colours can a colour depth of 1 bit represent?", o:["1","2","8","256"], a:1, e:"2^1 = 2 colours (black and white).", ch:5, d:1},
  {q:"The number of times per second a sound wave is sampled is the:", o:["Bit depth","Sample rate","Colour depth","Resolution"], a:1, e:"Sample rate is samples per second, in hertz.", ch:5, d:1},
  {q:"If ASCII 'A' is 65, what is 'C'?", o:["66","67","68","70"], a:1, e:"Codes are sequential: A=65, B=66, C=67.", ch:5, d:1},
  {q:"Image resolution means:", o:["Bits per pixel","The number of pixels (width × height)","The file format","The colour palette"], a:1, e:"Resolution is the number of pixels across and down.", ch:5, d:1},
  {q:"How many colours can 4 bits per pixel represent?", o:["4","8","16","32"], a:2, e:"2^4 = 16 colours.", ch:5, d:2},
  {q:"An image is 10 × 10 pixels at 3 bits colour depth. Its size in bits is:", o:["30","100","300","900"], a:2, e:"10 × 10 × 3 = 300 bits.", ch:5, d:2},
  {q:"Image file size in bits is calculated by:", o:["width + height + depth","width × height × colour depth","width × height ÷ depth","sample rate × duration"], a:1, e:"bits = width × height × colour depth.", ch:5, d:2},
  {q:"Sound file size in bits is calculated by:", o:["sample rate × bit depth × seconds","width × height × depth","sample rate ÷ duration","bits per pixel × pixels"], a:0, e:"bits = sample rate × bit depth × duration.", ch:5, d:2},
  {q:"Increasing the sample rate of a recording will:", o:["Lower quality and size","Increase quality and size","Only change volume","Convert it to analogue"], a:1, e:"More samples improve quality but enlarge the file.", ch:5, d:2},
  {q:"A 2-second clip at 8000 Hz sample rate and 8-bit depth (mono) is how many bits?", o:["16000","64000","128000","8000"], a:2, e:"8000 × 8 × 2 = 128000 bits.", ch:5, d:3},
  {q:"Why does sampling lose some information from a sound wave?", o:["It stores every possible value","It only measures the wave at intervals, not continuously","It uses lossy compression","It deletes the file"], a:1, e:"Sampling takes discrete measurements, missing values between samples.", ch:5, d:3},
  {q:"To store more colours in an image you must increase the:", o:["Sample rate","Colour depth","Bandwidth","Latency"], a:1, e:"More bits per pixel (colour depth) allow more colours.", ch:5, d:3},

  // ═══════ CHAPTER 6 — STORAGE, COMPRESSION & ENCRYPTION ═══════
  {q:"In the 1CP2 spec, how many bytes are in 1 kilobyte?", o:["1000","1024","8","100"], a:0, e:"Edexcel uses decimal units: 1 KB = 1000 bytes.", ch:6, d:1},
  {q:"Which compression lets the original file be perfectly restored?", o:["Lossy","Lossless","Both","Neither"], a:1, e:"Lossless keeps all the original data.", ch:6, d:1},
  {q:"Which file type should NEVER use lossy compression?", o:["A photo","A music track","Program source code","A video"], a:2, e:"Losing data would corrupt code; lossless only.", ch:6, d:1},
  {q:"Run-length encoding (RLE) is a type of:", o:["Lossy compression","Lossless compression","Encryption","Sorting"], a:1, e:"RLE is lossless — it stores runs as count+value.", ch:6, d:1},
  {q:"Encryption is used to:", o:["Make files smaller","Make data unreadable without the key","Speed up the network","Remove malware"], a:1, e:"Encryption protects confidentiality with a key.", ch:6, d:1},
  {q:"A Caesar cipher works by:", o:["Removing vowels","Shifting each letter a fixed number of places","Reversing the text","Compressing the text"], a:1, e:"Each letter is shifted by the key value.", ch:6, d:1},
  {q:"1 MB equals how many KB (1CP2 decimal units)?", o:["1000","1024","8","100"], a:0, e:"1 MB = 1000 KB in decimal units.", ch:6, d:1},
  {q:"The smallest unit of data is the:", o:["Byte","Bit","Nibble","Kilobyte"], a:1, e:"A bit (0 or 1) is the smallest unit.", ch:6, d:1},
  {q:"Run-length encoding of AAAABBBCC is:", o:["4A3B2C","A4B3C2","ABC432","43A2BC"], a:0, e:"4 A's, 3 B's, 2 C's → 4A3B2C.", ch:6, d:2},
  {q:"Why is compression useful when transferring files over a network?", o:["It encrypts them","It reduces file size so they transfer faster","It sorts them","It adds colour"], a:1, e:"Smaller files use less bandwidth and transfer faster.", ch:6, d:2},
  {q:"Using a Caesar cipher with key 3, 'CAB' encrypts to:", o:["FDE","EDC","DCB","ZXY"], a:0, e:"C→F, A→D, B→E.", ch:6, d:2},
  {q:"A Caesar cipher with key 1 decrypts 'IBM' to:", o:["HAL","JCN","GZK","IBM"], a:0, e:"Shift each letter back by 1: I→H, B→A, M→L.", ch:6, d:2},
  {q:"When can RLE actually make a file LARGER?", o:["When there are long runs","When there are no repeated values","When the file is encrypted","Never"], a:1, e:"With no runs, storing count+value adds data.", ch:6, d:2},
  {q:"Which is the main weakness of the Caesar cipher?", o:["It cannot be decrypted","There are only 25 possible keys to try","It needs the internet","It deletes data"], a:1, e:"With so few keys it is easily broken by trying them all.", ch:6, d:3},
  {q:"A 5000-byte file compresses to 2000 bytes losslessly. What is true?", o:["Some data is permanently lost","The original can be fully restored","It must be a photo","It is now encrypted"], a:1, e:"Lossless compression preserves all the original data.", ch:6, d:3},
  {q:"Why is lossless compression essential for a spreadsheet of exam marks?", o:["Marks must be exactly preserved","It makes them colourful","It speeds up the CPU","It encrypts them"], a:0, e:"Losing any data would change the marks — lossless is required.", ch:6, d:3},

  // ═══════ CHAPTER 7 — HARDWARE ═══════
  {q:"The von Neumann stored program concept means:", o:["Programs are printed on paper","Instructions and data share the same main memory","Programs never change","Data is stored only in the CPU"], a:1, e:"Instructions and data are held together in main memory.", ch:7, d:1},
  {q:"Which CPU component decodes instructions?", o:["ALU","Control unit","Cache","Register"], a:1, e:"The control unit decodes instructions and coordinates the CPU.", ch:7, d:1},
  {q:"Which CPU component performs calculations?", o:["Control unit","ALU","Register","Clock"], a:1, e:"The ALU does arithmetic and logic.", ch:7, d:1},
  {q:"Which memory is volatile?", o:["ROM","RAM","DVD","SSD"], a:1, e:"RAM loses its contents without power.", ch:7, d:1},
  {q:"Start-up (bootstrap) instructions are stored in:", o:["RAM","Cache","ROM","A register"], a:2, e:"ROM is non-volatile so the startup code survives power-off.", ch:7, d:1},
  {q:"Which storage has no moving parts?", o:["Hard disk drive","DVD","Solid state drive","Magnetic tape"], a:2, e:"SSDs use flash memory with no moving parts.", ch:7, d:1},
  {q:"A washing-machine controller is an example of:", o:["A mainframe","An embedded system","A WAN","Utility software"], a:1, e:"An embedded system is built in for one dedicated task.", ch:7, d:1},
  {q:"The order of the CPU cycle is:", o:["Decode, Fetch, Execute","Fetch, Decode, Execute","Execute, Fetch, Decode","Fetch, Execute, Decode"], a:1, e:"Fetch → Decode → Execute, then repeat.", ch:7, d:1},
  {q:"Increasing clock speed improves performance because:", o:["More cycles run per second","RAM becomes larger","Storage doubles","The screen brightens"], a:0, e:"Higher GHz means more fetch-decode-execute cycles per second.", ch:7, d:2},
  {q:"Cache memory speeds up the CPU because:", o:["It is huge","It holds frequently-used data close to the CPU","It is non-volatile","It replaces the hard disk"], a:1, e:"Frequently used data is fetched quickly from fast cache.", ch:7, d:2},
  {q:"Which best justifies more cores in a CPU?", o:["Bigger monitor","Several tasks can be processed at the same time","More storage","Longer cables"], a:1, e:"Each core can process instructions independently/in parallel.", ch:7, d:2},
  {q:"Why does a computer need secondary storage as well as RAM?", o:["RAM is non-volatile","RAM is volatile, so data must be kept permanently elsewhere","Secondary storage is faster than RAM","RAM cannot hold programs"], a:1, e:"RAM loses data on power-off; secondary storage is non-volatile.", ch:7, d:2},
  {q:"Which storage is best for cheaply archiving very large backups?", o:["SSD","Magnetic tape/HDD","Cache","ROM"], a:1, e:"Magnetic storage gives high capacity at low cost per GB.", ch:7, d:2},
  {q:"A register differs from RAM because it is:", o:["Larger and slower","Tiny and extremely fast, inside the CPU","Non-volatile storage","An input device"], a:1, e:"Registers are tiny, very fast stores inside the CPU.", ch:7, d:3},
  {q:"For a laptop used while travelling, the best internal storage is usually:", o:["SSD — fast and durable with no moving parts","Magnetic tape","Optical disc","ROM"], a:0, e:"SSDs resist knocks and are fast, ideal for portable use.", ch:7, d:3},
  {q:"Which statement about embedded systems is TRUE?", o:["They run many different programs","They perform one dedicated task with firmware in ROM","They have no processor","They are always mainframes"], a:1, e:"Embedded systems do one fixed job; firmware sits in ROM.", ch:7, d:3},

  // ═══════ CHAPTER 8 — SOFTWARE & LANGUAGES ═══════
  {q:"Which is system software?", o:["A web browser","The operating system","A spreadsheet","A game"], a:1, e:"The OS is system software; the others are applications.", ch:8, d:1},
  {q:"Which is NOT a function of an operating system?", o:["File management","Memory management","Editing a photo","Process management"], a:2, e:"Photo editing is done by application software.", ch:8, d:1},
  {q:"Defragmentation software:", o:["Removes viruses","Reorganises file fragments on a hard disk","Encrypts files","Compresses photos"], a:1, e:"Defragmentation reunites scattered file pieces on a HDD.", ch:8, d:1},
  {q:"Machine code is:", o:["English-like keywords","Binary instructions the CPU runs directly","A flowchart","Pseudocode"], a:1, e:"Machine code is binary, executed directly by the CPU.", ch:8, d:1},
  {q:"A compiler translates:", o:["Line by line as it runs","The whole program at once into an executable","Only machine code","Nothing"], a:1, e:"A compiler translates the whole program, producing an executable.", ch:8, d:1},
  {q:"An interpreter translates:", o:["The whole program at once","One line at a time as it runs","Only ROM","Only assembly"], a:1, e:"An interpreter executes the code line by line.", ch:8, d:1},
  {q:"Anti-malware is an example of:", o:["Application software","Utility software","A programming language","An operating system"], a:1, e:"Anti-malware is utility (system) software.", ch:8, d:1},
  {q:"Python is an example of a:", o:["Low-level language","High-level language","Machine code","Assembler"], a:1, e:"Python is a high-level, English-like language.", ch:8, d:1},
  {q:"Why must high-level code be translated?", o:["The CPU only runs machine code","It is too colourful","RAM is volatile","It is encrypted"], a:0, e:"The CPU can only execute machine code.", ch:8, d:2},
  {q:"An advantage of an interpreter during development is:", o:["It produces an executable","It stops at the first error, helping debugging","It runs faster than machine code","It needs no computer"], a:1, e:"Stopping at the first error makes errors easier to find.", ch:8, d:2},
  {q:"An advantage of a compiled program is:", o:["It runs quickly without re-translation","It needs the source every time","It has no errors","It cannot be distributed"], a:0, e:"The executable runs fast without re-translating.", ch:8, d:2},
  {q:"Which is application software?", o:["Device driver","Operating system","Word processor","Defragmenter"], a:2, e:"A word processor is application software.", ch:8, d:2},
  {q:"A full backup copies everything; an incremental backup copies:", o:["Nothing","Only data changed since the last backup","The whole disk twice","Only the OS"], a:1, e:"Incremental backups copy only what has changed.", ch:8, d:2},
  {q:"Assembly language is:", o:["A high-level language","A low-level language using mnemonics","Machine code in binary","An operating system"], a:1, e:"Assembly uses mnemonics and is low-level, translated by an assembler.", ch:8, d:3},
  {q:"A finished app is to be sold to customers. The better translator choice is a:", o:["Compiler — fast standalone executable","Interpreter — needs the source each run","Neither","Assembler only"], a:0, e:"A compiled executable runs fast and hides the source.", ch:8, d:3},
  {q:"Which does NOT typically benefit from defragmentation?", o:["Magnetic hard disk","Solid state drive","HDD with many files","An old spinning disk"], a:1, e:"SSDs have no moving parts and don't need defragmentation.", ch:8, d:3},

  // ═══════ CHAPTER 9 — NETWORKS ═══════
  {q:"A network within one building is a:", o:["WAN","LAN","PAN","The internet"], a:1, e:"A LAN covers a single site.", ch:9, d:1},
  {q:"The internet is an example of a:", o:["LAN","WAN","PAN","ROM"], a:1, e:"The internet is the largest WAN.", ch:9, d:1},
  {q:"Which protocol SENDS email?", o:["POP3","IMAP","SMTP","FTP"], a:2, e:"SMTP sends mail; POP3/IMAP retrieve it.", ch:9, d:1},
  {q:"What does bandwidth measure?", o:["Delay","Maximum data per second","Cable length","Signal colour"], a:1, e:"Bandwidth is maximum data transferred per second.", ch:9, d:1},
  {q:"In a star topology, devices connect to a central:", o:["Bus","Switch","Satellite","Modem only"], a:1, e:"Star topology uses a central switch.", ch:9, d:1},
  {q:"Which transmission medium is fastest over long distances?", o:["Copper cable","Fibre optic","Bluetooth","Twisted pair only"], a:1, e:"Fibre optic carries data as light, fast over long distances.", ch:9, d:1},
  {q:"HTTPS differs from HTTP because it:", o:["Is slower for no reason","Encrypts the data in transit","Only works on a LAN","Sends email"], a:1, e:"HTTPS adds encryption to protect web data.", ch:9, d:1},
  {q:"Latency is:", o:["Maximum data per second","The delay before data arrives","The cable type","The IP address"], a:1, e:"Latency is the time delay, measured in ms.", ch:9, d:1},
  {q:"How many layers are in the TCP/IP model?", o:["3","4","7","2"], a:1, e:"Four: application, transport, internet, link.", ch:9, d:2},
  {q:"If a single device's cable fails in a star network:", o:["The whole network fails","Only that device is affected","All data is lost","The switch breaks"], a:1, e:"Only the device on the broken cable is disconnected.", ch:9, d:2},
  {q:"Which topology re-routes data if one link fails?", o:["Bus","Star","Mesh","Single cable"], a:2, e:"Mesh has multiple paths, so data can re-route.", ch:9, d:2},
  {q:"A 20 MB file is sent over a 10 Mbps link. Roughly how long does it take?", o:["2 s","8 s","16 s","20 s"], a:2, e:"20 MB = 160 megabits; 160 ÷ 10 = 16 s.", ch:9, d:2},
  {q:"Which protocol retrieves email and syncs it across devices?", o:["SMTP","IMAP","FTP","HTTP"], a:1, e:"IMAP keeps mail synced on the server across devices.", ch:9, d:2},
  {q:"A disadvantage of a bus topology is:", o:["It has many backup paths","A fault in the main cable stops the whole network","It needs a switch per device","It is the fastest"], a:1, e:"All devices share one cable, so a break halts everything.", ch:9, d:3},
  {q:"Why is layering the TCP/IP model useful?", o:["It makes cables shorter","Each layer can be developed/changed independently","It removes the need for protocols","It encrypts everything"], a:1, e:"Layering separates concerns so layers are interchangeable and easier to maintain.", ch:9, d:3},
  {q:"A 50 MB file must download in 5 seconds. The minimum speed needed is:", o:["10 Mbps","50 Mbps","80 Mbps","400 Mbps"], a:2, e:"50 MB = 400 megabits; 400 ÷ 5 = 80 Mbps.", ch:9, d:3},

  // ═══════ CHAPTER 10 — NETWORK SECURITY ═══════
  {q:"Phishing is an example of:", o:["A hardware fault","Social engineering","Utility software","Compression"], a:1, e:"Phishing manipulates people, not machines.", ch:10, d:1},
  {q:"Malware disguised as legitimate software is a:", o:["Worm","Virus","Trojan","Firewall"], a:2, e:"A trojan looks legitimate but hides a malicious payload.", ch:10, d:1},
  {q:"Which malware self-replicates across a network without user action?", o:["Worm","Trojan","Spyware","Adware"], a:0, e:"Worms spread themselves across networks.", ch:10, d:1},
  {q:"A DoS attack works by:", o:["Stealing a password by phone","Flooding a server so real users can't access it","Encrypting backups","Watching someone type"], a:1, e:"Denial of Service overwhelms a service with traffic.", ch:10, d:1},
  {q:"SQL injection targets:", o:["The CPU","Databases behind input forms","Printers","The power supply"], a:1, e:"Malicious SQL in an input field can attack the database.", ch:10, d:1},
  {q:"A firewall:", o:["Backs up files","Monitors and filters network traffic by rules","Removes scratches from discs","Compresses data"], a:1, e:"A firewall filters traffic to block threats.", ch:10, d:1},
  {q:"Watching someone enter a PIN over their shoulder is:", o:["Pharming","Shoulder surfing","A worm","Encryption"], a:1, e:"Shoulder surfing is a social engineering technique.", ch:10, d:1},
  {q:"Penetration testing is:", o:["An illegal attack","Authorised testing to find weaknesses first","A type of malware","A backup method"], a:1, e:"Pen testing legally probes systems to find vulnerabilities.", ch:10, d:1},
  {q:"Two-factor authentication improves security because it:", o:["Uses only a password","Requires two different proofs of identity","Encrypts the disk","Speeds up login"], a:1, e:"Two separate proofs make unauthorised access far harder.", ch:10, d:2},
  {q:"Ransomware typically:", o:["Speeds up the PC","Encrypts files and demands payment","Backs up data","Cleans the disk"], a:1, e:"Ransomware encrypts files and demands a ransom.", ch:10, d:2},
  {q:"Validating and sanitising input form data mainly helps prevent:", o:["Overheating","SQL injection","Power cuts","Slow Wi-Fi"], a:1, e:"Checking input stops malicious SQL being executed.", ch:10, d:2},
  {q:"Which is a PHYSICAL security measure?", o:["A firewall","A locked server room with CCTV","Anti-malware","Encryption"], a:1, e:"Locks and CCTV are physical protections.", ch:10, d:2},
  {q:"Why are humans often called the weakest link in security?", o:["They type slowly","Social engineering can trick them into giving access","They never make mistakes","They control the CPU"], a:1, e:"People can be deceived by phishing and similar attacks.", ch:10, d:2},
  {q:"Encrypting data that is intercepted means the attacker:", o:["Sees it in plain text","Cannot read it without the key","Gets the password","Deletes it"], a:1, e:"Encryption makes intercepted data unreadable without the key.", ch:10, d:3},
  {q:"'Defence in depth' means:", o:["Relying on one strong password","Using several layers of different protections","Turning off the firewall","Only physical security"], a:1, e:"Multiple overlapping protections guard against many threats.", ch:10, d:3},
  {q:"An audit trail (transaction log) is mainly useful for:", o:["Speeding up the LAN","Recording actions so incidents can be investigated","Compressing files","Encrypting email"], a:1, e:"Logs let administrators trace what happened after an incident.", ch:10, d:3},

  // ═══════ CHAPTER 11 — ISSUES & IMPACT ═══════
  {q:"E-waste is a problem because discarded devices contain:", o:["Only paper","Toxic materials like lead and mercury","Nothing harmful","Pure water"], a:1, e:"E-waste contains toxins that harm the environment.", ch:11, d:1},
  {q:"Unauthorised access to a computer breaks which law?", o:["Data Protection Act 2018","Computer Misuse Act 1990","Copyright Act 1988","Health & Safety Act"], a:1, e:"Hacking is illegal under the Computer Misuse Act 1990.", ch:11, d:1},
  {q:"Which law controls how personal data is handled?", o:["Computer Misuse Act 1990","Data Protection Act 2018","Copyright Act 1988","Freedom of Information Act"], a:1, e:"The DPA 2018 governs personal data.", ch:11, d:1},
  {q:"Copying and sharing software without a licence breaks:", o:["Computer Misuse Act 1990","Data Protection Act 2018","Copyright, Designs and Patents Act 1988","No law"], a:2, e:"Software is protected by the Copyright Act 1988.", ch:11, d:1},
  {q:"Open-source software:", o:["Always costs money","Has source code anyone can view and modify","Cannot be shared","Hides its source code"], a:1, e:"Open-source code is public and modifiable.", ch:11, d:1},
  {q:"The digital divide refers to:", o:["A broken screen","The gap between those with and without good access to technology","Two monitors","A type of cable"], a:1, e:"It is the gap in access to digital technology and the internet.", ch:11, d:1},
  {q:"Algorithmic bias often arises from:", o:["Fast CPUs","Biased training data","Too much RAM","Encryption"], a:1, e:"Biased data leads to unfair automated decisions.", ch:11, d:1},
  {q:"Proprietary software is:", o:["Free with open code","Sold under licence with hidden source code","Always illegal","Stored in ROM"], a:1, e:"Proprietary software has closed source and a paid licence.", ch:11, d:1},
  {q:"Which is an ENVIRONMENTAL benefit of digital technology?", o:["More e-waste","Remote working reducing travel emissions","Toxic disposal","Higher energy use"], a:1, e:"Remote working and monitoring can cut travel and waste.", ch:11, d:2},
  {q:"The Computer Misuse Act 1990 has how many main offences?", o:["1","2","3","5"], a:2, e:"Unauthorised access; access with intent; unauthorised modification.", ch:11, d:2},
  {q:"A concern about widespread CCTV and online monitoring is:", o:["Faster downloads","Loss of personal privacy","Cheaper devices","More storage"], a:1, e:"Surveillance raises privacy concerns balanced against security.", ch:11, d:2},
  {q:"Spreading a virus deliberately is an offence under:", o:["Copyright Act 1988","Computer Misuse Act 1990","Data Protection Act 2018","No law"], a:1, e:"Unauthorised modification (malware) breaks the Computer Misuse Act.", ch:11, d:2},
  {q:"An advantage of open-source software for a school is:", o:["Guaranteed paid support","No licence fees and code can be adapted","Hidden source code","It is always faster"], a:1, e:"No licence cost and adaptable code suit limited budgets.", ch:11, d:2},
  {q:"Planned obsolescence contributes to e-waste because:", o:["Devices last forever","Devices are replaced frequently, creating more waste","It saves materials","It uses no energy"], a:1, e:"Short device lifecycles increase discarded electronics.", ch:11, d:3},
  {q:"When evaluating a self-driving car's decision, a key ethical issue is:", o:["Screen resolution","Accountability for the decisions the algorithm makes","Cable length","File size"], a:1, e:"Who is responsible for an autonomous system's choices is a core ethical issue.", ch:11, d:3},
  {q:"Under the Data Protection Act 2018, organisations must:", o:["Sell data freely","Keep personal data secure and use it lawfully","Ignore privacy","Encrypt nothing"], a:1, e:"The DPA requires lawful, secure handling of personal data.", ch:11, d:3},

  // ═══════ CHAPTER 12 — PYTHON PROGRAMMING ═══════
  {q:"Which Python data type stores True or False?", o:["int","float","bool","str"], a:2, e:"bool holds True/False.", ch:12, d:1},
  {q:"What does len(\"data\") return?", o:["3","4","5","Error"], a:1, e:"d-a-t-a = 4 characters.", ch:12, d:1},
  {q:"input() always returns a value of type:", o:["int","float","str","bool"], a:2, e:"input() returns a string; cast it for maths.", ch:12, d:1},
  {q:"Which loop is count-controlled?", o:["while","for","if","def"], a:1, e:"A for loop repeats a set number of times.", ch:12, d:1},
  {q:"In Python, list indexing starts at:", o:["0","1","-1","2"], a:0, e:"The first item is index 0.", ch:12, d:1},
  {q:"Which keyword defines a subprogram?", o:["func","def","sub","define"], a:1, e:"def defines a function or procedure.", ch:12, d:1},
  {q:"A range check is an example of:", o:["Iteration","Validation","Compression","Casting"], a:1, e:"Validation checks input is within allowed bounds.", ch:12, d:1},
  {q:"Which file mode OVERWRITES an existing file?", o:["\"r\"","\"w\"","\"a\"","\"x\""], a:1, e:"\"w\" write mode overwrites the file.", ch:12, d:1},
  {q:"What is the value of 17 % 5?", o:["3","3.4","2","12"], a:2, e:"% is the remainder: 17 ÷ 5 = 3 r 2.", ch:12, d:2},
  {q:"What does 17 // 5 evaluate to?", o:["3","3.4","2","4"], a:0, e:"// is floor division: 3.", ch:12, d:2},
  {q:"What does range(1, 5) produce?", o:["1,2,3,4,5","1,2,3,4","0,1,2,3,4","1,5"], a:1, e:"The stop value 5 is excluded: 1,2,3,4.", ch:12, d:2},
  {q:"What is \"computer\"[0:4]?", o:["comp"," compu","omp","cput"], a:0, e:"Slice positions 0,1,2,3 = 'comp'.", ch:12, d:2},
  {q:"A function differs from a procedure because a function:", o:["Cannot take parameters","Returns a value","Cannot be called","Runs faster"], a:1, e:"A function returns a value; a procedure does not.", ch:12, d:2},
  {q:"What does 3 ** 2 evaluate to?", o:["6","9","8","5"], a:1, e:"** is power: 3 squared = 9.", ch:12, d:2},
  {q:"A local variable is one that:", o:["Exists everywhere in the program","Exists only inside the subprogram where it's created","Is stored in ROM","Cannot change"], a:1, e:"Local variables exist only within their subprogram.", ch:12, d:2},
  {q:"Which is a BOUNDARY test value for a field accepting 1 to 100?", o:["50","1","cat","-20"], a:1, e:"Boundary values are at the edges, e.g. 1 (and 100).", ch:12, d:3},
  {q:"grid = [[1,2],[3,4]]. What is grid[1][0]?", o:["1","2","3","4"], a:2, e:"Row 1 is [3,4]; index 0 is 3.", ch:12, d:3},
  {q:"Why must you cast input() before doing arithmetic?", o:["It returns a float","It returns a string, which can't be added as a number","It returns a bool","It returns nothing"], a:1, e:"input() gives a string, so int()/float() casting is needed.", ch:12, d:3},
  {q:"Accessing scores[10] on a 5-item list causes a:", o:["Syntax error","IndexError (runtime error)","Logic error","Compression error"], a:1, e:"An out-of-range index raises a runtime IndexError.", ch:12, d:3},
  {q:"Which test data is designed to be REJECTED by validation (range 1-100)?", o:["50","100","-5","1"], a:2, e:"Erroneous data like -5 should be rejected.", ch:12, d:3}
];

/* ═══════════════════════════════════════════════════════════════════════════
   ESSAY / EXTENDED-RESPONSE BANK
   ═══════════════════════════════════════════════════════════════════════════ */

const ESSAY_BANK = [
  // CHAPTER 1
  {q:"Explain what is meant by decomposition. Give one benefit. [3 marks]", marks:3, ch:1, mark_scheme:["Definition: breaking a problem into smaller sub-problems (1)","Each sub-problem is simpler/easier to solve (1)","Benefit e.g. sub-problems can be tested or worked on independently / by a team (1)"], keywords:["break","smaller","sub-problem","simpler","team","test","independent"]},
  {q:"Explain what is meant by abstraction, using an example. [3 marks]", marks:3, ch:1, mark_scheme:["Definition: removing or hiding unnecessary detail (1)","To focus on the essential features of the problem (1)","Example e.g. a Tube map ignores real distances/geography (1)"], keywords:["remove","hide","detail","essential","map","example","ignore"]},
  {q:"Describe how decomposition and abstraction could be used to plan a simple quiz program. [4 marks]", marks:4, ch:1, mark_scheme:["Decompose into sub-tasks e.g. ask question, check answer, keep score (1+1)","Abstraction: focus only on essential data such as the question, options and correct answer (1)","Ignore irrelevant detail such as exact screen colours when planning the logic (1)"], keywords:["decompose","sub-task","question","score","abstraction","essential","ignore"]},
  {q:"Explain why decomposing a large program helps a team of programmers. [3 marks]", marks:3, ch:1, mark_scheme:["The problem is split into independent sub-problems (1)","Different team members can work on different parts at the same time (1)","Parts can be tested separately and reused, saving time (1)"], keywords:["split","independent","team","same time","test","reuse"]},
  {q:"State what is meant by pattern recognition in computational thinking. [2 marks]", marks:2, ch:1, mark_scheme:["Identifying similarities or common features between problems (1)","So that a known solution can be reused/adapted (1)"], keywords:["similarit","pattern","common","reuse","adapt"]},

  // CHAPTER 2
  {q:"Describe the purpose of a trace table. [2 marks]", marks:2, ch:2, mark_scheme:["Records the value of each variable line by line as the algorithm runs (1)","Used to find logic errors / predict the output (1)"], keywords:["variable","line by line","value","logic error","output","trace"]},
  {q:"Explain the difference between a syntax error and a logic error. [4 marks]", marks:4, ch:2, mark_scheme:["Syntax error: breaks the rules/grammar of the language e.g. missing colon (1)","The program will not run/translate (1)","Logic error: the program runs but gives the wrong result (1)","Found by testing rather than by the translator (1)"], keywords:["syntax","grammar","won't run","logic","wrong result","testing"]},
  {q:"Name and describe three flowchart symbols. [3 marks]", marks:3, ch:2, mark_scheme:["Terminator (oval): start or end (1)","Process (rectangle): a calculation/instruction (1)","Decision (diamond): a yes/no branch — OR parallelogram for input/output (1)"], keywords:["terminator","oval","process","rectangle","decision","diamond","input","output"]},
  {q:"Trace this algorithm and state the final value of total: total = 0; for i in range(1,4): total = total + i. [3 marks]", marks:3, ch:2, mark_scheme:["i=1: total = 1 (1)","i=2: total = 3 (1)","i=3: total = 6; final total = 6 (1)"], keywords:["1","3","6","total","trace"]},
  {q:"Explain what an algorithm is and state two ways it can be expressed. [3 marks]", marks:3, ch:2, mark_scheme:["A precise step-by-step sequence of instructions to solve a problem (1)","Way 1: flowchart (1)","Way 2: written description OR program code (1)"], keywords:["step","instructions","problem","flowchart","code","written"]},

  // CHAPTER 3
  {q:"Explain why a binary search needs a sorted list. [3 marks]", marks:3, ch:3, mark_scheme:["Binary search checks the middle item and discards one half (1)","It relies on items to the left being smaller and right being larger (1)","On an unsorted list it could discard the half containing the target and fail (1)"], keywords:["middle","discard","half","sorted","smaller","larger","fail"]},
  {q:"Compare a linear search and a binary search. [4 marks]", marks:4, ch:3, mark_scheme:["Linear checks each item in turn; binary halves the list (1)","Linear works on unsorted lists; binary needs a sorted list (1)","Binary needs far fewer comparisons on large lists (1)","Linear is simpler / fine for small or changing lists (1)"], keywords:["each item","halve","sorted","unsorted","comparison","fewer","large"]},
  {q:"Describe how a bubble sort orders a list. [3 marks]", marks:3, ch:3, mark_scheme:["Compare each adjacent pair of items (1)","Swap them if they are in the wrong order (1)","Repeat passes until a pass makes no swaps (1)"], keywords:["adjacent","compare","swap","pass","no swaps"]},
  {q:"Complete the output column of a truth table for NOT (A AND B) and explain the result for A=1, B=1. [3 marks]", marks:3, ch:3, mark_scheme:["A AND B is True (1) only when both are 1 (1)","NOT inverts it, so for A=1,B=1 the output is 0/False (1)"], keywords:["and","both","not","invert","false","0"]},
  {q:"Explain one advantage and one disadvantage of merge sort compared with bubble sort. [4 marks]", marks:4, ch:3, mark_scheme:["Advantage: merge sort is much faster on large lists (1) because it divides and conquers (1)","Disadvantage: it uses more memory (1) for the sub-lists / is more complex to code (1)"], keywords:["faster","large","divide","memory","complex","sub-list"]},

  // CHAPTER 4
  {q:"Convert the denary number 156 to 8-bit binary, showing your working. [3 marks]", marks:3, ch:4, mark_scheme:["128 fits (156-128=28) → 1 (1)","16 fits (28-16=12), 8 fits (12-8=4), 4 fits (4-4=0) (1)","Answer 10011100; check 128+16+8+4=156 (1)"], keywords:["128","working","10011100","place value","check"]},
  {q:"Explain what an overflow error is. [2 marks]", marks:2, ch:4, mark_scheme:["The result of a calculation needs more bits than are available (1)","e.g. an 8-bit addition producing a 9-bit answer, so it cannot be stored correctly (1)"], keywords:["more bits","available","8-bit","9-bit","carry","store"]},
  {q:"Convert -18 to 8-bit two's complement, showing your method. [3 marks]", marks:3, ch:4, mark_scheme:["+18 = 00010010 (1)","Flip the bits → 11101101 (1)","Add 1 → 11101110 (1)"], keywords:["00010010","flip","add 1","11101110","two's complement"]},
  {q:"Explain why hexadecimal is commonly used in computing. [3 marks]", marks:3, ch:4, mark_scheme:["Each hex digit represents exactly four binary bits (1)","So hex is shorter and more compact than binary (1)","Easier for people to read/write, reducing errors; used for colours, MAC addresses, memory (1)"], keywords:["four bits","compact","shorter","read","error","colour","mac"]},
  {q:"Perform a logical left shift of two places on 00000110 and state its effect. [3 marks]", marks:3, ch:4, mark_scheme:["Start 00000110 = 6 (1)","After left shift 2 → 00011000 (1)","Value is 24, i.e. multiplied by 4 (1)"], keywords:["00011000","24","multiply","four","left shift"]},

  // CHAPTER 5
  {q:"A bitmap image is 200 × 100 pixels with a colour depth of 8 bits. Calculate the file size in bytes. [3 marks]", marks:3, ch:5, mark_scheme:["bits = 200 × 100 × 8 = 160000 bits (1)","bytes = 160000 ÷ 8 (1)","= 20000 bytes (20 KB) (1)"], keywords:["160000","divide","8","20000","bytes","width","height"]},
  {q:"Explain how colour depth affects the quality and file size of an image. [4 marks]", marks:4, ch:5, mark_scheme:["Colour depth is the number of bits per pixel (1)","More bits allow more colours (2^n) so better quality (1)","But each pixel needs more bits (1)","so the overall file size increases (1)"], keywords:["bits per pixel","colours","2^n","quality","file size","increase"]},
  {q:"Explain how sound is converted from analogue to digital. [3 marks]", marks:3, ch:5, mark_scheme:["The analogue wave is sampled (measured) at regular intervals (1)","Each sample is stored as a binary value (bit depth) (1)","More samples per second (higher sample rate) gives a closer match to the original (1)"], keywords:["sample","interval","binary","bit depth","sample rate","wave"]},
  {q:"State how a character is represented in ASCII and give an example. [2 marks]", marks:2, ch:5, mark_scheme:["Each character has a unique binary code in the character set (1)","Example e.g. 'A' = 65 (1)"], keywords:["unique","binary","code","character set","65","example"]},
  {q:"A sound is recorded for 3 seconds at a sample rate of 8000 Hz with a bit depth of 8. Calculate the file size in bits. [3 marks]", marks:3, ch:5, mark_scheme:["size = sample rate × bit depth × seconds (1)","= 8000 × 8 × 3 (1)","= 192000 bits (1)"], keywords:["8000","8","3","192000","sample rate","bit depth"]},

  // CHAPTER 6
  {q:"Explain the difference between lossy and lossless compression. [4 marks]", marks:4, ch:6, mark_scheme:["Lossless: file size reduced but no data is lost (1)","Original can be perfectly restored — used for text/code (1)","Lossy: some data is permanently removed (1)","Smaller files but original cannot be restored — used for images/sound (1)"], keywords:["lossless","no data lost","restore","lossy","permanent","smaller","text","image"]},
  {q:"Describe how run-length encoding compresses data and give an example. [3 marks]", marks:3, ch:6, mark_scheme:["Runs of the same value are stored as a count and the value (1)","e.g. AAAB becomes 3A1B (1)","It is lossless, so the original is fully recoverable (1)"], keywords:["run","count","value","example","lossless","rle"]},
  {q:"Encrypt the word 'CODE' using a Caesar cipher with a key of 2. Show the result. [2 marks]", marks:2, ch:6, mark_scheme:["Shift each letter +2: C→E, O→Q, D→F, E→G (1)","Result: EQFG (1)"], keywords:["shift","two","EQFG","caesar","letter"]},
  {q:"Explain why encryption is important when sending data over the internet. [3 marks]", marks:3, ch:6, mark_scheme:["Data can be intercepted while travelling across the network (1)","Encryption scrambles it using a key so it is unreadable (1)","Only someone with the correct key can decrypt and read it (1)"], keywords:["intercept","scramble","key","unreadable","decrypt","confidential"]},
  {q:"A file is 8 MB. Convert this to KB and to bytes using 1CP2 (decimal) units. [2 marks]", marks:2, ch:6, mark_scheme:["8 MB = 8000 KB (1)","= 8,000,000 bytes (1)"], keywords:["8000","decimal","bytes","8000000","convert"]},

  // CHAPTER 7
  {q:"Describe the three stages of the fetch-decode-execute cycle. [3 marks]", marks:3, ch:7, mark_scheme:["Fetch: the next instruction is copied from main memory to the CPU (1)","Decode: the control unit works out what the instruction means (1)","Execute: the instruction is carried out e.g. ALU performs a calculation (1)"], keywords:["fetch","memory","decode","control unit","execute","alu"]},
  {q:"Explain two differences between RAM and ROM. [4 marks]", marks:4, ch:7, mark_scheme:["RAM is volatile — loses contents without power (1+1)","ROM is non-volatile — keeps its contents (1)","RAM holds running programs/data; ROM holds fixed startup instructions (1)"], keywords:["volatile","power","non-volatile","running","startup","read only"]},
  {q:"Explain how clock speed and number of cores affect CPU performance. [4 marks]", marks:4, ch:7, mark_scheme:["Higher clock speed = more cycles per second (1) = more instructions processed (1)","More cores = more instructions processed at the same time/in parallel (1)","if the software supports multiple cores (1)"], keywords:["clock","cycles","instructions","cores","parallel","same time"]},
  {q:"A film studio needs fast, durable storage for editing on location. Recommend a storage type and justify it. [4 marks]", marks:4, ch:7, mark_scheme:["Solid state drive / SSD (1)","No moving parts, so durable against knocks while travelling (1)","Fast read/write so large video files load quickly (1)","Light and silent, suiting portable use (1)"], keywords:["ssd","solid state","durable","no moving parts","fast","portable"]},
  {q:"Define an embedded system and give two examples. [3 marks]", marks:3, ch:7, mark_scheme:["A computer built into a larger device to perform one dedicated task (1)","Example 1 e.g. washing machine controller (1)","Example 2 e.g. car braking system / microwave (1)"], keywords:["dedicated","built in","task","washing machine","car","microwave"]},

  // CHAPTER 8
  {q:"State three functions of an operating system. [3 marks]", marks:3, ch:8, mark_scheme:["Memory management (1)","File management (1)","Process / peripheral / user management or security (1)"], keywords:["memory","file","process","peripheral","user","security"]},
  {q:"Explain two differences between a compiler and an interpreter. [4 marks]", marks:4, ch:8, mark_scheme:["Compiler translates the whole program at once / produces an executable (1+1)","Interpreter translates and runs one line at a time / no executable (1)","Compiler reports errors after compiling; interpreter stops at the first error (1)"], keywords:["whole","executable","line","interpreter","error","compile"]},
  {q:"Explain the difference between high-level and low-level languages. [4 marks]", marks:4, ch:8, mark_scheme:["High-level uses English-like keywords, easier to read/write (1) and is portable (1)","Low-level (machine code/assembly) is close to the hardware (1)","specific to one processor and harder to write (1)"], keywords:["english","read","portable","machine code","assembly","hardware","processor"]},
  {q:"Describe two types of utility software. [4 marks]", marks:4, ch:8, mark_scheme:["Anti-malware: scans for and removes malicious software (1+1)","Backup OR defragmentation OR compression, correctly described (1+1)"], keywords:["anti-malware","scan","backup","defragment","compression","utility"]},
  {q:"Explain why a high-level program must be translated before it can run. [3 marks]", marks:3, ch:8, mark_scheme:["The CPU can only execute machine code (binary) (1)","High-level keywords cannot be run directly by the CPU (1)","A compiler or interpreter converts the source to machine code (1)"], keywords:["machine code","cpu","binary","directly","compiler","interpreter","translate"]},

  // CHAPTER 9
  {q:"Explain the difference between a LAN and a WAN. [3 marks]", marks:3, ch:9, mark_scheme:["A LAN covers a small area such as one building/site (1)","usually owned by one organisation (1)","A WAN covers a large geographical area, often using third-party infrastructure — the internet is the largest WAN (1)"], keywords:["lan","small","building","wan","large","geographical","internet"]},
  {q:"Describe the star topology and give one advantage and one disadvantage. [4 marks]", marks:4, ch:9, mark_scheme:["Each device connects to a central switch (1)","Advantage: one cable fault affects only that device (1)","Advantage/extra: good performance as devices have their own connection (1)","Disadvantage: if the central switch fails the whole network stops (1)"], keywords:["central","switch","device","cable","fault","switch fails","advantage","disadvantage"]},
  {q:"A 30 MB file is downloaded over a 12 Mbps connection. Calculate the time taken. [3 marks]", marks:3, ch:9, mark_scheme:["30 MB = 240 megabits (×8) (1)","time = 240 ÷ 12 (1)","= 20 seconds (1)"], keywords:["240","megabits","divide","12","20","seconds","×8"]},
  {q:"Explain the purpose of the SMTP, POP3 and IMAP protocols. [3 marks]", marks:3, ch:9, mark_scheme:["SMTP is used to send email (1)","POP3 downloads email to one device (often deleting the server copy) (1)","IMAP retrieves email while keeping it synced on the server across devices (1)"], keywords:["smtp","send","pop3","download","imap","sync","server"]},
  {q:"Explain why the TCP/IP model is organised into layers. [3 marks]", marks:3, ch:9, mark_scheme:["Each layer has a specific job (application, transport, internet, link) (1)","Layers can be developed or changed independently (1)","Making the system simpler to build and troubleshoot (1)"], keywords:["layer","job","independent","develop","troubleshoot","tcp/ip"]},

  // CHAPTER 10
  {q:"Explain what social engineering is and give one example. [3 marks]", marks:3, ch:10, mark_scheme:["Manipulating people rather than machines into giving away access/information (1)","It exploits human trust / the weakest link (1)","Example: phishing / shoulder surfing / pretexting (1)"], keywords:["people","manipulate","trust","phishing","shoulder surfing","example"]},
  {q:"Describe the differences between a virus, a worm and a trojan. [3 marks]", marks:3, ch:10, mark_scheme:["Virus: attaches to a host file and replicates when the file is run (1)","Worm: self-replicates and spreads across networks without a host (1)","Trojan: disguised as legitimate software, hides a malicious payload (1)"], keywords:["virus","host","worm","self-replicate","network","trojan","disguise"]},
  {q:"Describe how a denial of service (DoS) attack works and one way to reduce its impact. [3 marks]", marks:3, ch:10, mark_scheme:["The server is flooded with a huge number of requests (1)","so genuine users cannot access the service (1)","Mitigation: firewall / traffic filtering / more server capacity (1)"], keywords:["flood","requests","server","users","firewall","filter"]},
  {q:"Explain three methods an organisation can use to protect its network. [6 marks]", marks:6, ch:10, mark_scheme:["Authentication e.g. strong passwords / 2FA to verify users (1+1)","Firewall to filter incoming/outgoing traffic by rules (1+1)","Encryption of stored/transmitted data OR anti-malware OR access control / physical security, described (1+1)"], keywords:["authentication","password","2fa","firewall","filter","encryption","anti-malware","access"]},
  {q:"Explain what penetration testing is and why an organisation would use it. [3 marks]", marks:3, ch:10, mark_scheme:["Authorised testing that deliberately probes a system for weaknesses (1)","Carried out by ethical hackers/security testers (1)","So vulnerabilities can be fixed before real attackers exploit them (1)"], keywords:["authorised","probe","weakness","ethical","vulnerabilit","before","fix"]},

  // CHAPTER 11
  {q:"Discuss the environmental impact of digital devices. [6 marks]", marks:6, ch:11, mark_scheme:["Manufacture uses energy, water and rare/raw materials (1)","Use consumes electricity, e.g. data centres for streaming (1)","Disposal creates e-waste containing toxic materials like lead/mercury (1)","Short device lifecycles/planned obsolescence increase waste (1)","Positives: remote working/monitoring can cut travel and resource use (1)","Conclusion weighing the negatives against the positives (1)"], keywords:["manufacture","energy","material","electricity","e-waste","toxic","recycle","remote","conclusion"]},
  {q:"Describe the three main offences under the Computer Misuse Act 1990. [3 marks]", marks:3, ch:11, mark_scheme:["Unauthorised access to computer material (hacking) (1)","Unauthorised access with intent to commit a further offence (1)","Unauthorised modification of material, e.g. spreading malware (1)"], keywords:["unauthorised","access","intent","modification","malware","hacking"]},
  {q:"Explain what is meant by algorithmic bias and why it is a concern. [3 marks]", marks:3, ch:11, mark_scheme:["An algorithm's decisions unfairly favour or disadvantage certain groups (1)","Often because the data used to train/design it is biased (1)","Concern: unfair outcomes, e.g. in facial recognition or job selection (1)"], keywords:["unfair","bias","group","training data","outcome","example"]},
  {q:"Compare open-source and proprietary software. [4 marks]", marks:4, ch:11, mark_scheme:["Open-source: source code is public and can be modified (1) often free of licence cost (1)","Proprietary: source code is hidden / closed (1) sold under a paid licence, with official support (1)"], keywords:["open-source","public","modify","free","proprietary","hidden","licence","support"]},
  {q:"Explain how the Data Protection Act 2018 affects how an organisation handles personal data. [3 marks]", marks:3, ch:11, mark_scheme:["Personal data must be collected and used lawfully/fairly (1)","It must be kept secure and only used for stated purposes (1)","Individuals have rights over their data, e.g. to see or have it deleted (1)"], keywords:["personal data","lawful","secure","purpose","rights","delete","dpa"]},

  // CHAPTER 12
  {q:"Write a function that takes a list of numbers and returns the largest. [4 marks]", marks:4, ch:12, mark_scheme:["def with a parameter for the list (1)","Initialise a variable to the first element (1)","Loop through the list comparing each item (1)","Return the largest value (1)"], keywords:["def","parameter","biggest","for","if","return","largest"]},
  {q:"State the output of print(17 // 5, 17 % 5) and explain each operator. [3 marks]", marks:3, ch:12, mark_scheme:["17 // 5 = 3 (integer/floor division) (1)","17 % 5 = 2 (remainder/modulus) (1)","Output: 3 2 (1)"], keywords:["3","2","floor","integer","modulus","remainder"]},
  {q:"Write a validation loop that only accepts a number between 1 and 10. [3 marks]", marks:3, ch:12, mark_scheme:["Cast the input to an int (1)","while loop with condition num < 1 or num > 10 (1)","Re-prompt inside the loop until valid (1)"], keywords:["int","input","while","or","re-prompt","validation"]},
  {q:"Explain the difference between a function and a procedure, and between local and global variables. [4 marks]", marks:4, ch:12, mark_scheme:["A function returns a value; a procedure does not (1+1)","A local variable exists only inside its subprogram (1)","A global variable is accessible throughout the program (and is discouraged) (1)"], keywords:["function","return","procedure","local","global","subprogram","scope"]},
  {q:"Describe normal, boundary and erroneous test data for an input that must be 1 to 100. [3 marks]", marks:3, ch:12, mark_scheme:["Normal: a typical valid value e.g. 50 (1)","Boundary: a value at the edge e.g. 1 or 100 (and just outside) (1)","Erroneous: an invalid value to be rejected e.g. -5 or 'cat' (1)"], keywords:["normal","valid","boundary","edge","erroneous","invalid","reject"]}
];

if (typeof window !== 'undefined') {
  window.MCQ_BANK = MCQ_BANK;
  window.ESSAY_BANK = ESSAY_BANK;
}
