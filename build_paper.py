# -*- coding: utf-8 -*-
"""Generate a Scopus Q1-style narrative review manuscript (Journal of Sociolinguistics
house style, APA 7th referencing) as a .docx file."""

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

DOCX = "/home/user/Claude/Clock-It_Narrative-Review.docx"

doc = Document()

# ---- Base styles ----
normal = doc.styles["Normal"]
normal.font.name = "Times New Roman"
normal.font.size = Pt(12)
normal.element.rPr.rFonts.set(qn("w:eastAsia"), "Times New Roman")
pf = normal.paragraph_format
pf.line_spacing_rule = WD_LINE_SPACING.DOUBLE
pf.space_after = Pt(0)

for sec in doc.sections:
    sec.top_margin = Inches(1)
    sec.bottom_margin = Inches(1)
    sec.left_margin = Inches(1)
    sec.right_margin = Inches(1)

def set_run(r, size=12, bold=False, italic=False, color=None):
    r.font.name = "Times New Roman"
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.italic = italic
    if color:
        r.font.color.rgb = color

def para(text="", *, align=None, indent=True, space_before=0, space_after=0,
         bold=False, italic=False, size=12, spacing="double"):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    if spacing == "double":
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    elif spacing == "single":
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    if align:
        p.alignment = align
    if indent:
        p.paragraph_format.first_line_indent = Inches(0.5)
    if text:
        r = p.add_run(text)
        set_run(r, size=size, bold=bold, italic=italic)
    return p

def rich(parts, *, align=None, indent=True, space_before=0, space_after=0,
         size=12, spacing="double", hanging=False):
    """parts: list of (text, bold, italic) tuples."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    if spacing == "double":
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    elif spacing == "single":
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    if align:
        p.alignment = align
    if hanging:
        p.paragraph_format.left_indent = Inches(0.5)
        p.paragraph_format.first_line_indent = Inches(-0.5)
    elif indent:
        p.paragraph_format.first_line_indent = Inches(0.5)
    for t, b, i in parts:
        r = p.add_run(t)
        set_run(r, size=size, bold=b, italic=i)
    return p

def h1(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    r = p.add_run(text)
    set_run(r, size=12, bold=True)
    return p

def h2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    r = p.add_run(text)
    set_run(r, size=12, bold=True, italic=True)
    return p

def center_run(text, bold=False, italic=False, size=12, space_after=0, space_before=0):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    r = p.add_run(text)
    set_run(r, size=size, bold=bold, italic=italic)
    return p

# ============================================================
# TITLE PAGE
# ============================================================
center_run("Clocking the Tea: A Narrative Review of the Verb to clock as a Site of "
           "Semantic Specialization, Enregisterment, and Racialized Appropriation",
           bold=True, size=14, space_after=12)

center_run("[Author Name]", size=12, space_after=0)
center_run("[Department], [Institution]", size=12, italic=True, space_after=12)

center_run("Author Note", bold=True, space_before=6, space_after=2)
para("[Author Name] " + chr(0x2013) + " ORCID: [0000-0000-0000-0000]. "
     "Correspondence concerning this article should be addressed to [Author Name], "
     "[Department], [Institution], [Address]. Email: [author@institution.edu]. "
     "The author declares no conflict of interest. This manuscript was prepared as a "
     "narrative (non-systematic) review; the source-identification procedure is described "
     "in Section 2. No human participants or primary data were involved.",
     indent=True, space_after=6)

doc.add_page_break()

# ============================================================
# ABSTRACT
# ============================================================
center_run("Abstract", bold=True, space_after=2)
abstract = ("This narrative review synthesizes the scholarly treatment of the English verb "
    "to clock and its imperative clock it in the sense of perceiving, recognizing, or "
    "exposing a person or a concealed truth. Drawing exclusively on peer-reviewed "
    "scholarship and scholarly lexicography, the review traces the item across four "
    "literatures: historical lexicography, transgender studies, the sociolinguistics of "
    "Black and Latinx queer vernacular, and critical media studies of drag. Three findings "
    "are advanced. First, the perception sense of to clock is lexicographically attested "
    "from the late 1920s, roughly half a century before its association with ballroom "
    "culture; the ballroom and transgender uses are therefore best analyzed as a semantic "
    "specialization of an existing slang verb rather than as its origin. Second, within "
    "transgender studies clocking names the recognition of transness and functions as the "
    "structural antonym of passing; recent philosophical work productively destabilizes the "
    "conventional valuation by theorizing passing as misrecognition and clocking as "
    "recognition. Third, the item participates in a now well-documented pathway of "
    "racialized appropriation, whereby African American and ballroom vernacular is "
    "recontextualized as generic " + chr(0x2018) + "internet" + chr(0x2019) + " or "
    + chr(0x2018) + "Gen Z" + chr(0x2019) + " language, with attendant indexical erasure. "
    "The review identifies a conspicuous lacuna: unlike its lexical siblings shade, reading, "
    "and tea, the item clock has received no dedicated empirical or lexicological study. The "
    "review specifies the methodological and archival steps required to close that gap and "
    "argues that to clock offers an unusually clear case for theorizing the interaction of "
    "semantic change, enregisterment, and raciolinguistic appropriation.")
para(abstract, indent=False, space_after=6)
rich([("Keywords: ", False, True),
      ("enregisterment; African American Vernacular English; transgender studies; "
       "ballroom culture; semantic change; linguistic appropriation; raciolinguistics; "
       "lexicography", False, False)],
     indent=False, space_after=0)

doc.add_page_break()

# ============================================================
# 1. INTRODUCTION
# ============================================================
h1("1  |  INTRODUCTION")

para("By the mid-2020s, the imperative clock it had become a conspicuous feature of "
     "anglophone digital culture, circulating on TikTok, in reality-television commentary, "
     "and across mainstream journalism as a way of flagging that a hidden truth has been "
     "perceived and named. Its trajectory is, on the surface, a familiar one: a piece of "
     "minoritized vernacular acquires mass currency and, in the process, sheds much of the "
     "context that gave it meaning. Yet the verb to clock is an unusually instructive case, "
     "because it sits at the intersection of three processes that sociolinguistics has "
     "tended to study separately: ordinary semantic change documented in the historical "
     "lexicographic record; the enregisterment of a minoritized variety with a "
     "characterological figure (Agha, 2003; Ilbury, 2020); and the racialized appropriation "
     "of African American Vernacular English (AAVE) and ballroom vocabulary into a "
     "putatively neutral " + chr(0x2018) + "internet language" + chr(0x2019) +
     " (Crowley, 2025; Ilbury & Walcott, 2026).")

para("This article offers a narrative review of how to clock and clock it have been treated "
     "across the relevant scholarship. The verb denotes, in its core modern sense, an act of "
     "recognition: to notice, to catch sight of, to read, or to expose. In transgender "
     "contexts it has a more specific and higher-stakes meaning " + chr(0x2013) + " to be "
     "clocked is to be perceived as transgender, the experiential and political opposite of "
     "passing (Schiffer, 2022; Serano, 2007; Wong, 2025). In Black and Latinx ballroom and "
     "drag culture it names the detection of a concealed truth or flaw and stands alongside "
     "the better-studied practices of reading and throwing shade (Barrett, 2017; Bailey, "
     "2013). The review asks three questions: (a) what does the historical and lexicographic "
     "record establish about the origins and development of the perception sense; (b) how has "
     "the transgender and ballroom sense been theorized; and (c) how has the item figured in "
     "scholarship on mediatization and appropriation?")

para("The central argument is that to clock rewards attention precisely because the "
     "scholarship that bears on it is fragmented across sub-disciplines that rarely cite one "
     "another. The lexicographic record locates the perception sense decades before the "
     "ballroom scene to which popular accounts attribute it; trans studies supplies the "
     "richest conceptual theorization but treats clock as borrowed vernacular rather than as "
     "an object of lexical analysis; and the sociolinguistics of appropriation supplies a "
     "powerful account of the item" + chr(0x2019) + "s contemporary circulation without "
     "examining the item itself. Reading these literatures together yields a coherent "
     "genealogy and exposes a clear gap for future empirical work.")

# ============================================================
# 2. METHOD
# ============================================================
h1("2  |  METHOD AND SCOPE")

para("This is a narrative, not a systematic, review (Greenhalgh et al., 2018); its aim is "
     "interpretive synthesis across heterogeneous literatures rather than exhaustive "
     "enumeration. Sources were identified through iterative database and web searching "
     "across five thematic angles " + chr(0x2013) + " historical lexicography; transgender "
     "studies; ballroom, drag, and AAVE sociolinguistics; the semantics and regional "
     "distribution of the verb; and media-studies treatments of drag " + chr(0x2013) +
     " using the lemmas clock, clocked, clocking, and clock it in combination with terms "
     "such as passing, reading, shade, enregisterment, and appropriation.")

para("Two inclusion principles were applied. First, the evidentiary base was restricted to "
     "peer-reviewed publications, scholarly monographs and edited volumes from university and "
     "established academic presses, and recognized scholarly lexicography (the Oxford English "
     "Dictionary, Green" + chr(0x2019) + "s Dictionary of Slang, the New Partridge Dictionary "
     "of Slang and Unconventional English, and Berrey and Van den Bark" + chr(0x2019) + "s "
     "American Thesaurus of Slang). General-purpose dictionaries and journalistic or "
     "explainer sources were deliberately excluded from the evidentiary base; where popular "
     "claims are mentioned, they are flagged as such and treated as hypotheses to be tested, "
     "not as findings. Crowd-sourced encyclopaedias were excluded entirely. Second, the "
     "controlled vocabulary Homosaurus was admitted as scholarly metadata infrastructure "
     "rather than as an analytic source.")

para("Two limitations follow from the review" + chr(0x2019) + "s procedure and should temper "
     "the confidence attached to the most fine-grained claims. The dated lexicographic "
     "citations reported in Section 3 derive from scholarly slang dictionaries consulted "
     "through catalogue and secondary evidence and should be confirmed against the "
     "subscription or print originals before being quoted verbatim. Where the literature "
     "supports only an inference rather than a direct statement " + chr(0x2013) + " for "
     "example, linking a monograph on surveillance to the slang lexeme clock " + chr(0x2013) +
     " this is stated explicitly. A confidence rating accompanies the synthesis in Section 8.")

para("For a convenience set of seven full-text sources central to the argument " +
     chr(0x2013) + " Wong (2025), Ilbury (2020), Ilbury and Walcott (2026), Crowley (2025), "
     "McKinnon (2017), Simmons (2014), and Zimman (2020) " + chr(0x2013) + " the full "
     "published or author-accepted texts were examined directly. A simple lexical check of "
     "this set returned a striking result that motivates the review" + chr(0x2019) + "s "
     "central claim: the lemma clock occurs only in Wong (2025), and is entirely absent from "
     "the other six, even though each engages the surrounding phenomena of passing, reading, "
     "enregisterment, or appropriation. This concrete absence, reported in Sections 5 and 8, "
     "is treated as evidence rather than as an artifact of sampling, since the set was "
     "selected precisely for its topical proximity to the item.")

# ============================================================
# 3. LEXICOGRAPHIC RECORD
# ============================================================
h1("3  |  THE LEXICOGRAPHIC RECORD: ETYMOLOGY AND THE PERCEPTION SENSE")

para("The noun clock entered English in the late fourteenth century, ultimately from "
     "Medieval Latin clocca " + chr(0x2018) + "bell" + chr(0x2019) + " (probably of Celtic "
     "origin), by way of Middle Dutch and Old North French (Oxford English Dictionary "
     "[OED], n.d.). From this base, slang lexicography records several distinct verbal "
     "developments that must be kept analytically separate, because popular accounts "
     "routinely conflate them.")

para("A first branch derives from the early-twentieth-century use of clock as a slang noun "
     "for the human face, by analogy with the face of a timepiece rather than through "
     "rhyming slang. From this " + chr(0x2018) + "face" + chr(0x2019) + " noun comes the verb "
     "to clock " + chr(0x2018) + "to strike or punch," + chr(0x2019) + " recorded from the "
     "early 1940s and frequently labeled Australian in origin; the American idiom to clean "
     "someone" + chr(0x2019) + "s clock belongs to the same family (OED, n.d.). This "
     "pugilistic sense is etymologically and semantically distinct from the perception sense "
     "that is the subject of this review, and the two should not be conflated.")

para("The perception sense " + chr(0x2013) + " to clock as " + chr(0x2018) + "to catch sight "
     "of, to notice, to watch, to recognize" + chr(0x2019) + " " + chr(0x2013) + " is the "
     "lexicographically pivotal one. The New Partridge Dictionary of Slang dates this sense "
     "to 1929, and a further early attestation appears in Berrey and Van den Bark" +
     chr(0x2019) + "s American Thesaurus of Slang (1942), glossed as " + chr(0x2018) + "to "
     "look at; see" + chr(0x2019) + " (Dalzell & Victor, 2006). Green" + chr(0x2019) + "s "
     "Dictionary of Slang offers the fullest gloss, defining the verb as " + chr(0x2018) +
     "to see, to recognize, to notice, to watch, to understand, to work something out" +
     chr(0x2019) + " (Green, n.d.). The crucial datum for the present argument is "
     "chronological: the general perception sense is securely attested in the historical "
     "record roughly half a century before the ballroom and transgender uses with which the "
     "item is popularly associated.")

para("Two genuine uncertainties remain in the record and should not be smoothed over. The "
     "first concerns regional origin. Although the perception sense is widely felt to be "
     "British or Commonwealth colloquial " + chr(0x2013) + " as in I clocked him the moment "
     "he walked in " + chr(0x2013) + " lexicographic evidence variously tags it as "
     "originally North American, producing a counterintuitive mismatch between perceived and "
     "documented provenance that the accessible sources do not resolve. The second concerns "
     "the precise earliest citation, with the 1929 Partridge dating and the 1942 thesaurus "
     "attestation representing the two leading candidates. Neither uncertainty disturbs the "
     "central chronological point, but both indicate that the historical sociolinguistics of "
     "this item remains under-described.")

# Table 1
h2("Table 1")
rich([("Documented senses of the verb ", False, True), ("to clock", False, True),
      (" and their approximate first attestation", False, True)],
     indent=False, space_after=2)

tbl = doc.add_table(rows=1, cols=3)
tbl.style = "Table Grid"
tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
hdr = tbl.rows[0].cells
hdr_text = ["Sense", "Approx. first attestation", "Source family"]
for c, t in zip(hdr, hdr_text):
    c.paragraphs[0].add_run(t).bold = True
    c.paragraphs[0].runs[0].font.name = "Times New Roman"
    c.paragraphs[0].runs[0].font.size = Pt(11)

rows = [
    ("Noun: timepiece (< L. clocca 'bell')", "c. 1350" + chr(0x2013) + "1400", "OED"),
    ("Noun: human face (timepiece analogy)", "early 20th c.", "OED; Green's"),
    ("Verb: to strike, punch (< 'face' noun)", "c. 1941 (orig. Australian)", "OED; etymonline"),
    ("Verb: to notice, see, recognize, watch", "1929 (Partridge); 1942 (Berrey & Van den Bark)",
     "New Partridge; Green's"),
    ("Verb: to register/record (a time, speed)", "20th c.", "OED; Green's"),
    ("Verb (specialized): to recognize someone as transgender",
     "later 20th c. (ballroom; not lexicographically dated)", "Trans studies; Homosaurus"),
]
for sense, date, src in rows:
    cells = tbl.add_row().cells
    for cell, txt in zip(cells, (sense, date, src)):
        para_c = cell.paragraphs[0]
        run = para_c.add_run(txt)
        run.font.name = "Times New Roman"
        run.font.size = Pt(11)
        para_c.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE

para("Note. Datings derive from scholarly slang lexicography and should be confirmed against "
     "the subscription or print originals (see Section 2).", indent=False, size=10,
     space_before=2, space_after=4)

# ============================================================
# 4. SPECIALIZATION
# ============================================================
h1("4  |  FROM PERCEPTION TO DETECTION: A SEMANTIC SPECIALIZATION")

para("A recurrent claim in popular writing is that to clock originated in the Black and "
     "Latinx ballroom culture of 1980s New York. The lexicographic evidence reviewed above "
     "renders this untenable as an account of origin while clarifying what is nonetheless "
     "correct in it. The verb of perception predates the ballroom scene; what ballroom and "
     "transgender communities contributed was not the verb but a high-stakes specialization "
     "of it, narrowing a general sense of " + chr(0x2018) + "noticing" + chr(0x2019) + " "
     "toward a specific and consequential referent: the detection that a person is "
     "transgender, in drag, or otherwise " + chr(0x2018) + "not real" + chr(0x2019) +
     " in the ballroom sense of realness (Bailey, 2013).")

para("This reframing matters analytically. Semantic specialization (narrowing) followed by "
     "later re-generalization is a well-attested pathway of lexical change, and to clock "
     "exhibits it cleanly: a broad perception verb narrows within a community of practice to "
     "a specific act of gender detection, then broadens again as it diffuses outward into the "
     "generic contemporary sense of " + chr(0x2018) + "noticing and naming a concealed "
     "truth." + chr(0x2019) + " Treating the ballroom usage as origin obscures this "
     "trajectory; treating it as specialization makes the item" + chr(0x2019) + "s history "
     "intelligible and reconciles the lexicographic and cultural literatures, which "
     "otherwise appear to contradict one another.")

# ============================================================
# 5. TRANS STUDIES
# ============================================================
h1("5  |  CLOCKING IN TRANSGENDER STUDIES: RECOGNITION, PASSING, AND SURVEILLANCE")

para("It is in transgender studies that clocking has received its most sustained conceptual "
     "treatment, even though the field generally adopts the term as community vernacular "
     "rather than subjecting it to lexical analysis. The pivotal contribution is Wong" +
     chr(0x2019) + "s (2025) analysis of the ambivalences of trans recognition. Working in "
     "social philosophy and drawing on Honneth, Wong defines the term directly: " + chr(0x201C) +
     "Clocking is literally recognition of a person" + chr(0x2019) + "s transness, which "
     "implies that person" + chr(0x2019) + "s failing to pass, being spotted in their "
     "transness, and losing realness" + chr(0x201D) + " (Wong, 2025), and elaborates that " +
     chr(0x201C) + "being clocked designates being spotted as trans, losing realness, failing "
     "to pass" + chr(0x201D) + " while " + chr(0x201C) + "clocking inscribes the demands of "
     "cis-normativity within an act of seeing a person as trans" + chr(0x201D) + " (Wong, "
     "2025). Wong then performs a deliberate inversion of the term" + chr(0x2019) + "s usual "
     "valuation: because the criteria of passing are themselves cis-normative, " + chr(0x201C) +
     "passing, not being clocked, is misrecognition; consequently, recognition is clocking" +
     chr(0x201D) + " (Wong, 2025), a position the article condenses into the formula that " +
     chr(0x201C) + "recognition is clocking, and clocking is recognition" + chr(0x201D) + ". "
     "This thesis stands as the sharpest scholarly disagreement in the corpus, directly "
     "contesting the lay framing in which being clocked is uniformly a harm. It is also, "
     "notably, the only source in the assembled set that uses the lexeme clock at all.")

para("Schiffer" + chr(0x2019) + "s (2022) ethnographic study brings the term into "
     "interactional sociology. Reflecting on fieldwork conducted as a transgender woman, "
     "Schiffer shows that whether or not she was clocked materially restructured her "
     "interactions with predominantly cisgender participants, and theorizes the resulting "
     "dynamic through Goffman, coining cistress for the guilt or anger that cisgender "
     "interlocutors display when cisnormative assumptions are disrupted. Here clocked "
     "functions as an ordinary analytic descriptor in the title and argument of a "
     "peer-reviewed article, evidencing the term" + chr(0x2019) + "s uptake into scholarly "
     "register.")

para("Serano" + chr(0x2019) + "s (2007) widely cited account " + chr(0x2013) + " a "
     "trade-press book by a scholar" + chr(0x2013) + "activist rather than a peer-reviewed "
     "work, and flagged as such " + chr(0x2013) + " frames being read or clocked as a product "
     "of the cis assumption: the concepts would not exist, she argues, without the prior "
     "assumption that everyone encountered is cisgender. Once transness is suspected, "
     "observers engage in what she calls ungendering, actively foregrounding gender "
     "incongruities that would ordinarily pass unremarked. The conceptual antonym of being "
     "clocked is theorized at length by Beauchamp (2019), whose monograph on transgender "
     "politics and U.S. surveillance analyzes going stealth and argues, counterintuitively, "
     "that heightened visibility can render transgender people more rather than less "
     "surveillable. Beauchamp" + chr(0x2019) + "s vocabulary centers on stealth, passing, and "
     "surveillance; the connection to the slang lexeme clock is conceptual rather than "
     "lexical, and is presented here as an inference.")

para("Finally, the emerging programme of trans linguistics (Zimman, 2020, 2024) theorizes "
     "how transness is perceived and recognized through vocal, grammatical, and discursive "
     "practice within structures of power. Notably, this subfield " + chr(0x2013) + " the one "
     "closest to the present topic " + chr(0x2013) + " does not appear to foreground the "
     "lexeme clock, a negative finding that reinforces the review" + chr(0x2019) + "s central "
     "observation: clock is community vocabulary that scholars have adopted and theorized "
     "around, not a term coined or systematically analyzed within sociolinguistics. Its "
     "formalization as the indexing concept Clocking (Gender) in the Homosaurus controlled "
     "vocabulary (Homosaurus, n.d.) is institutional recognition of the concept, not lexical "
     "analysis of the word.")

# ============================================================
# 6. READING AND SHADE
# ============================================================
h1("6  |  CLOCKING AMONG READING AND SHADE: THE PRAGMATICS OF BLACK QUEER VERNACULAR")

para("The item belongs to a Black and Latinx queer vernacular system whose other members are "
     "comparatively well studied. The foundational linguistic scholarship is Barrett" +
     chr(0x2019) + "s work on African American drag performance (Barrett, 1998, 2017), which "
     "analyzes the strategic styleswitching through which Black drag queens index multiple, "
     "sometimes conflicting, social personae, and which constitutes the intellectual home for "
     "the cluster reading, shade, and clocking. Bailey" + chr(0x2019) + "s (2013) ethnography "
     "of ballroom culture establishes the broader frame, treating ballroom vernacular as a "
     "practice of survival, kinship, and resistance and supplying the authoritative account "
     "of realness " + chr(0x2013) + " the performative achievement against which being "
     "clocked is the failure, with material consequences for safety, housing, and "
     "employment.")

para("The pragmatic literature distinguishes the cluster with some precision: clocking is the "
     "detection of a concealed truth or flaw; reading is the artful delivery of a pointed "
     "insult; and shade is the indirect, implicational form of reading. The speech act of "
     "reading has been analyzed as a form of mock impoliteness that builds in-group "
     "solidarity rather than division: McKinnon (2017) examines reading in the backstage "
     "talk of four drag queen performers and argues that what appears as insult functions to "
     "build a shared " + chr(0x2018) + "thick skin," + chr(0x2019) + " while McKinnon (2023) "
     "and Simmons (2014) extend the analysis to the mediatized " + chr(0x2018) + "Reading "
     "Challenge" + chr(0x2019) + " and to the speech codes of RuPaul" + chr(0x2019) +
     "s Drag Race respectively. It is telling that even within this comparatively developed "
     "literature " + chr(0x2013) + " and in keeping with the lexical check reported in "
     "Section 2 " + chr(0x2013) + " reading and shade are defined and exemplified far more "
     "sharply than clocking, which is glossed only in passing where it appears at all. The "
     "asymmetry is itself evidence of the lacuna this review identifies.")

# ============================================================
# 7. MEDIATIZATION AND APPROPRIATION
# ============================================================
h1("7  |  MEDIATIZATION, ENREGISTERMENT, AND RACIALIZED APPROPRIATION")

para("The contemporary circulation of clock it is best understood through the sociolinguistic "
     "literature on enregisterment and appropriation. Ilbury (2020) shows how AAVE features "
     "are stylized by non-Black gay men on social media to project a recognizable " +
     chr(0x2018) + "Sassy Queen" + chr(0x2019) + " persona that rests on an essentialized "
     "image of Black women, demonstrating the enregisterment of AAVE with a characterological "
     "figure rather than with its actual speaker community. Building on this, Ilbury and "
     "Walcott (2026) analyze a corpus of TikTok videos in which AAVE features are "
     "recontextualized as generic " + chr(0x2018) + "internet" + chr(0x2019) + " or " +
     chr(0x2018) + "Gen Z" + chr(0x2019) + " language; crucially, they show that two "
     "competing metalinguistic discourses " + chr(0x2013) + " " + chr(0x2018) + "this is a "
     "new internet register" + chr(0x2019) + " versus " + chr(0x2018) + "this is simply "
     "AAVE" + chr(0x2019) + " " + chr(0x2013) + " coexist among users themselves, so that the "
     "contradiction is internal to the data rather than imposed by analysts. The relabeling, "
     "they argue, threatens the raciolinguistic enregisterment of AAVE as a Black variety of "
     "English through indexical erasure.")

para("Crowley (2025) extends the analysis to the racial politics of attribution within "
     "transgender communities. In ethnographic interviews with transgender South Carolinians, "
     "linguistic innovations traced to Black trans communities were characterized as " +
     chr(0x2018) + "slang," + chr(0x2019) + " while those attributed to white communities were "
     "characterized as " + chr(0x2018) + "terminology," + chr(0x2019) + " and participants "
     "described a trajectory by which Black-originated terms travel outward until they " +
     chr(0x2018) + "just become queer slang," + chr(0x2019) + " losing their racial "
     "attribution en route. This is precisely the mechanism that an item such as clock it "
     "undergoes, and Crowley" + chr(0x2019) + "s account supplies the most direct model "
     "available for its erasure dynamics.")

para("Critical media studies of RuPaul" + chr(0x2019) + "s Drag Race situate this diffusion "
     "within a political economy of commodification. Goldmark (2015) examines how the "
     "programme" + chr(0x2019) + "s language of inclusion operates against an unmarked norm of "
     "English proficiency that complicates its multicultural address, while Hodes and Sandoval "
     "(2018) argue that the franchise commodifies and depoliticizes drag, evacuating its "
     "resistant history. These interpretive accounts stand in tension with celebratory "
     "framings of the programme as an engine of linguistic creativity, and with "
     "Butler" + chr(0x2019) + "s (1993) influential reading of ballroom performance as "
     "subversive of gender norms " + chr(0x2013) + " a tension already prefigured in hooks" +
     chr(0x2019) + "s (1992) critique. The same diffusion phenomenon, in short, is read by "
     "different scholars with opposite valence: as innovation or as erasure, as subversion or "
     "as reinscription. An adequate account of clock it must hold both readings in view.")

# ============================================================
# 8. DISCUSSION
# ============================================================
h1("8  |  DISCUSSION: A GENEALOGY AND A LACUNA")

para("Read together, the four literatures yield a coherent genealogy. A general slang verb of "
     "perception, attested from the late 1920s, was specialized within Black and Latinx "
     "ballroom and transgender communities into a high-stakes act of gender detection, the "
     "antonym of passing and realness. Theorized in transgender studies as a form of "
     "recognition with profound and ambivalent stakes (Schiffer, 2022; Wong, 2025), the item "
     "then diffused outward through mediatized drag and social media, re-generalizing into a "
     "broad contemporary sense of naming a concealed truth while undergoing the indexical "
     "erasure that attends the appropriation of AAVE and ballroom vernacular (Crowley, 2025; "
     "Ilbury & Walcott, 2026). This genealogy integrates the chronological evidence of "
     "lexicography with the conceptual and political analyses of the cultural literatures, "
     "and it dissolves the apparent contradiction between " + chr(0x2018) + "ballroom "
     "origin" + chr(0x2019) + " and " + chr(0x2018) + "earlier attestation" + chr(0x2019) +
     " by distinguishing origin from specialization.")

para("The review also makes plain a conspicuous lacuna. Despite the rich treatment of its "
     "lexical siblings, the item clock has attracted no dedicated empirical or lexicological "
     "study; it is everywhere adjacent and nowhere central. The point is not merely "
     "impressionistic: in the assembled set of seven full-text sources closest to the topic, "
     "the lemma clock appears only in Wong (2025) and is absent from the remaining six, each "
     "of which nonetheless theorizes passing, reading, enregisterment, or appropriation "
     "(Crowley, 2025; Ilbury, 2020; Ilbury & Walcott, 2026; McKinnon, 2017; Simmons, 2014; "
     "Zimman, 2020). Closing this gap would require "
     "three steps. First, a corpus-based diachronic study, modeled on existing work on shade "
     "and reading, could trace the item" + chr(0x2019) + "s frequency, collocational profile, "
     "and register migration across community, broadcast, and social-media data. Second, a "
     "lexicological study working directly with the OED, Green" + chr(0x2019) + "s, and "
     "Partridge archives could resolve the two open historical questions " + chr(0x2013) + " "
     "the regional origin of the perception sense and its earliest secure citation. Third, an "
     "interactional study could specify the pragmatics of clocking as a speech act in its own "
     "right, distinct from reading and shade. Each step is feasible with established methods.")

# Table 2: confidence
h2("Table 2")
rich([("Principal claims and confidence ratings", False, True)],
     indent=False, space_after=2)
tbl2 = doc.add_table(rows=1, cols=3)
tbl2.style = "Table Grid"
tbl2.alignment = WD_TABLE_ALIGNMENT.CENTER
h2cells = tbl2.rows[0].cells
for c, t in zip(h2cells, ["Claim", "Confidence", "Principal support"]):
    r = c.paragraphs[0].add_run(t); r.bold = True; r.font.name = "Times New Roman"; r.font.size = Pt(11)
claims = [
    ("Perception sense attested c. 1929" + chr(0x2013) + "1942, predating ballroom use",
     "High", "New Partridge; Berrey & Van den Bark; Green's"),
    ("Ballroom/trans use is a specialization, not the origin", "High",
     "Inference from lexicographic chronology"),
    ("'Strike' sense (1941) is a separate branch from the perception sense", "Med" + chr(0x2013) + "high", "OED"),
    ("In trans studies, clocking is the antonym of passing", "High", "Wong (2025); Schiffer (2022)"),
    ("Passing-as-misrecognition / clocking-as-recognition inversion", "High", "Wong (2025)"),
    ("Diffusion best framed as racialized appropriation/erasure", "High",
     "Ilbury (2020); Ilbury & Walcott (2026); Crowley (2025)"),
    ("clock vs reading vs shade are distinct speech acts", "Medium", "McKinnon (2017, 2023); Simmons (2014)"),
    ("Regional origin (US vs British) of perception sense", "Low (contested)", "OED vs. usage evidence"),
    ("No dedicated study of clock exists; lemma absent in 6 of 7 full-text sources", "High",
     "Lexical check; convergent negative finding"),
]
for cl, conf, sup in claims:
    cells = tbl2.add_row().cells
    for cell, txt in zip(cells, (cl, conf, sup)):
        pc = cell.paragraphs[0]
        rr = pc.add_run(txt); rr.font.name = "Times New Roman"; rr.font.size = Pt(11)
        pc.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE

para("", indent=False, space_after=2)

# ============================================================
# 9. CONCLUSION
# ============================================================
h1("9  |  CONCLUSION")
para("The verb to clock and its imperative clock it compress, in a single lexical item, three "
     "processes that sociolinguistics usually studies apart: documented semantic change, the "
     "enregisterment of a minoritized variety, and the racialized appropriation of that "
     "variety into a putatively neutral mainstream. The item" + chr(0x2019) + "s history is "
     "best told not as a story of ballroom invention but as one of specialization and "
     "re-generalization: a general perception verb narrowed within Black and Latinx "
     "transgender and ballroom communities into the consequential antonym of passing, then "
     "broadened again as it was mediatized and appropriated, shedding its racial indexicality "
     "along the way. That the field has theorized the politics of this item far more "
     "thoroughly than it has described the item itself is the review" + chr(0x2019) + "s "
     "central finding and its principal invitation to future work. To clock the tea, in the "
     "end, is to perform exactly the act of recognition this article recommends turning back "
     "upon the word itself.")

# ============================================================
# REFERENCES
# ============================================================
doc.add_page_break()
center_run("References", bold=True, space_after=4)

refs = [
    "Agha, A. (2003). The social life of cultural value. Language & Communication, 23(3"
    + chr(0x2013) + "4), 231" + chr(0x2013) + "273. https://doi.org/10.1016/S0271-5309(03)00012-0",
    "Bailey, M. M. (2013). Butch queens up in pumps: Gender, performance, and ballroom culture "
    "in Detroit. University of Michigan Press.",
    "Barrett, R. (1998). Markedness and styleswitching in performances by African American drag "
    "queens. In C. Myers-Scotton (Ed.), Codes and consequences: Choosing linguistic varieties "
    "(pp. 139" + chr(0x2013) + "161). Oxford University Press.",
    "Barrett, R. (2017). From drag queens to leathermen: Language, gender, and gay male "
    "subcultures. Oxford University Press.",
    "Beauchamp, T. (2019). Going stealth: Transgender politics and U.S. surveillance practices. "
    "Duke University Press.",
    "Berrey, L. V., & Van den Bark, M. (1942). The American thesaurus of slang. Thomas Y. Crowell.",
    "Butler, J. (1993). Bodies that matter: On the discursive limits of " + chr(0x201C) + "sex."
    + chr(0x201D) + " Routledge.",
    "Crowley, A. (2025). " + chr(0x201C) + "And it just becomes queer slang" + chr(0x201D) +
    ": Race, linguistic innovation, and appropriation within trans communities in the US South. "
    "Journal of Linguistic Anthropology, 35(2), e70008. https://doi.org/10.1111/jola.70008",
    "Dalzell, T., & Victor, T. (Eds.). (2006). The new Partridge dictionary of slang and "
    "unconventional English. Routledge.",
    "Goldmark, M. (2015). National drag: The language of inclusion in RuPaul" + chr(0x2019) +
    "s Drag Race. GLQ: A Journal of Lesbian and Gay Studies, 21(4), 501" + chr(0x2013) + "520. "
    "https://doi.org/10.1215/10642684-3123665",
    "Green, J. (n.d.). Clock, v. In Green" + chr(0x2019) + "s dictionary of slang. Retrieved "
    "June 8, 2026, from https://greensdictofslang.com/entry/acsmoaa",
    "Greenhalgh, T., Thorne, S., & Malterud, K. (2018). Time to challenge the spurious "
    "hierarchy of systematic over narrative reviews? European Journal of Clinical "
    "Investigation, 48(6), e12931. https://doi.org/10.1111/eci.12931",
    "Hodes, C., & Sandoval, J. (2018). RuPaul" + chr(0x2019) + "s Drag Race: A study in the "
    "commodification of white ruling-class femininity and the etiolation of drag. Studies in "
    "Costume & Performance, 3(2), 149" + chr(0x2013) + "166. https://doi.org/10.1386/scp.3.2.149_1",
    "Homosaurus. (n.d.). Clocking (gender) [homoit0001781]. In Homosaurus (v3). Retrieved "
    "June 8, 2026, from https://homosaurus.org/v3/homoit0001781",
    "hooks, b. (1992). Is Paris burning? In Black looks: Race and representation (pp. 145"
    + chr(0x2013) + "156). South End Press.",
    "Ilbury, C. (2020). " + chr(0x201C) + "Sassy queens" + chr(0x201D) + ": Stylistic "
    "orthographic variation in Twitter and the enregisterment of AAVE. Journal of "
    "Sociolinguistics, 24(2), 245" + chr(0x2013) + "264. https://doi.org/10.1111/josl.12366",
    "Ilbury, C., & Walcott, R. (2026). " + chr(0x201C) + "Gen Z language? Y" + chr(0x2019) +
    "all mean AAVE" + chr(0x201D) + ": The appropriation of African American Vernacular "
    "English as " + chr(0x201C) + "TikTok language." + chr(0x201D) + " Journal of "
    "Sociolinguistics. Advance online publication. https://doi.org/10.1111/josl.70024",
    "McKinnon, S. (2017). " + chr(0x201C) + "Building a thick skin for each other" + chr(0x201D) +
    ": The use of " + chr(0x201C) + "reading" + chr(0x201D) + " as an interactional practice "
    "of mock impoliteness in drag queen backstage talk. Journal of Language and Sexuality, "
    "6(1), 90" + chr(0x2013) + "127. https://doi.org/10.1075/jls.6.1.04mck",
    "McKinnon, S. (2023). " + chr(0x201C) + "Haute couture? More like haute glue!" + chr(0x201D) +
    ": The discourse of the reading challenge in RuPaul" + chr(0x2019) + "s Drag Race. Journal "
    "of Language and Sexuality, 12(1), 73" + chr(0x2013) + "97. https://doi.org/10.1075/jls.21013",
    "Oxford English Dictionary. (n.d.). Clock (n.1, v.). In Oxford English Dictionary. Retrieved "
    "June 8, 2026, from https://www.oed.com/dictionary/clock_n1",
    "Schiffer, D. J. (2022). Researching while trans: Being clocked and cooling cistress. "
    "Journal of Contemporary Ethnography, 51(5), 700" + chr(0x2013) + "725. "
    "https://doi.org/10.1177/08912416221081870",
    "Serano, J. (2007). Whipping girl: A transsexual woman on sexism and the scapegoating of "
    "femininity. Seal Press.",
    "Simmons, N. (2014). Speaking like a queen in RuPaul" + chr(0x2019) + "s Drag Race: Towards "
    "a speech code of American drag queens. Sexuality & Culture, 18(3), 630" + chr(0x2013) +
    "648. https://doi.org/10.1007/s12119-013-9213-2",
    "Wong, J. (2025). Ambivalences of trans recognition. Hypatia, 40(2), 269" + chr(0x2013) +
    "289. https://doi.org/10.1017/hyp.2024.61",
    "Zimman, L. (2020). Transgender language, transgender moment: Toward a trans linguistics. "
    "In K. Hall & R. Barrett (Eds.), The Oxford handbook of language and sexuality. Oxford "
    "University Press.",
    "Zimman, L. (2024). Cultivating trans linguistics. Gender and Language, 18(3). "
    "https://doi.org/10.3138/gl-2024-18.3-0001",
]
for ref in refs:
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(ref)
    set_run(r, size=12)

doc.save(DOCX)
print("Saved:", DOCX)
print("Paragraphs:", len(doc.paragraphs))
