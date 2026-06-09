#!/usr/bin/env python3
"""Build the 6-7 narrative review in the finer-grained journal format (v2)."""
import re
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = "/home/user/Claude/Phatic-Only_Slang_6-7_NarrativeReview.docx"
FIG = "/home/user/Claude/figs"
SERIF = "Times New Roman"
JUST = WD_ALIGN_PARAGRAPH.JUSTIFY
CTR = WD_ALIGN_PARAGRAPH.CENTER
INLINE = re.compile(r'(\*\*.+?\*\*|\*[^*]+?\*|https?://[^\s)]+)')

def style_run(r, size=11, bold=None, italic=None):
    r.font.name = SERIF; r.font.size = Pt(size)
    if bold is not None: r.bold = bold
    if italic is not None: r.italic = italic

def add_hyperlink(p, url, text, size=10):
    rid = p.part.relate_to(url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", is_external=True)
    h = OxmlElement('w:hyperlink'); h.set(qn('r:id'), rid)
    run = OxmlElement('w:r'); rPr = OxmlElement('w:rPr')
    rF = OxmlElement('w:rFonts'); rF.set(qn('w:ascii'), SERIF); rF.set(qn('w:hAnsi'), SERIF); rPr.append(rF)
    sz = OxmlElement('w:sz'); sz.set(qn('w:val'), str(int(size*2))); rPr.append(sz)
    col = OxmlElement('w:color'); col.set(qn('w:val'), '0000FF'); rPr.append(col)
    u = OxmlElement('w:u'); u.set(qn('w:val'), 'single'); rPr.append(u)
    run.append(rPr)
    t = OxmlElement('w:t'); t.set(qn('xml:space'), 'preserve'); t.text = text; run.append(t)
    h.append(run); p._p.append(h)

def add_md(p, text, size=11, bold=None, italic=None):
    pos = 0
    for m in INLINE.finditer(text):
        if m.start() > pos:
            style_run(p.add_run(text[pos:m.start()]), size, bold, italic)
        tok = m.group(0)
        if tok.startswith('**'): style_run(p.add_run(tok[2:-2]), size, True, italic)
        elif tok.startswith('http'): add_hyperlink(p, tok, tok, size)
        elif tok.startswith('*'): style_run(p.add_run(tok[1:-1]), size, bold, True)
        pos = m.end()
    if pos < len(text): style_run(p.add_run(text[pos:]), size, bold, italic)

doc = Document()
ns = doc.styles['Normal']; ns.font.name = SERIF; ns.font.size = Pt(11)
ns.paragraph_format.line_spacing = 1.0; ns.paragraph_format.space_after = Pt(6)
sec = doc.sections[0]
for s in ('top', 'bottom', 'left', 'right'): setattr(sec, f'{s}_margin', Inches(1))

def para(align=None, before=0, after=6):
    p = doc.add_paragraph(); pf = p.paragraph_format
    pf.space_before = Pt(before); pf.space_after = Pt(after); pf.line_spacing = 1.0
    if align is not None: p.alignment = align
    return p

def h1(t): style_run(para(before=12, after=4).add_run(t), 13, True)
def body(t): add_md(para(align=JUST), t, 11)
def lead(label, txt):           # bold run-in lead paragraph
    p = para(align=JUST); style_run(p.add_run(label + ' '), 11, True); add_md(p, txt, 11)
def italic_p(t): add_md(para(align=JUST), t, 11, italic=True)

def figure(png, cap):
    para(align=CTR, before=8, after=2).add_run().add_picture(f"{FIG}/{png}", width=Inches(5.9))
    add_md(para(align=CTR, after=8), cap, 9, bold=True)

def table(cap, headers, rows, note=None, widths=None):
    add_md(para(before=8, after=2), cap, 10, bold=True)
    t = doc.add_table(rows=1, cols=len(headers)); t.style = 'Table Grid'; t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for j, htext in enumerate(headers):
        cp = t.rows[0].cells[j].paragraphs[0]; cp.paragraph_format.space_after = Pt(2)
        add_md(cp, htext, 9.5, bold=True)
    for row in rows:
        cells = t.add_row().cells
        for j, val in enumerate(row):
            cp = cells[j].paragraphs[0]; cp.paragraph_format.space_after = Pt(2)
            add_md(cp, val, 9)
    if widths:
        for j, w in enumerate(widths):
            for r in t.rows: r.cells[j].width = Inches(w)
    if note:
        np = para(after=6); style_run(np.add_run('Note. '), 9, italic=True); add_md(np, note, 9, italic=True)
    else:
        para(after=6)

# ===== TITLE BLOCK =====
style_run(para(align=CTR, after=6).add_run(
    'Phatic-Only Slang and the Limits of Meaning-Based Lexical Theory: '
    'A Sociolinguistic and Lexical-Semantic Review of the Origins, Spread, and Meaning of the “6-7” Meme'), 16, True)
style_run(para(align=CTR, after=2).add_run('[Author Name]¹*'), 12)
style_run(para(align=CTR, after=10).add_run(
    '¹ [Department / Faculty, Institution, City, Country]    * Corresponding author: [email]'), 10)

# ===== ABSTRACT =====
style_run(para(after=2).add_run('Abstract'), 12, True)
ABS = ('**Background.** In October 2025 Dictionary.com named “67” (rendered *6-7*, pronounced '
'*six-seven*) its Word of the Year while conceding that the term is “impossible to define.” A '
'non-sequitur interjection that spread among Generation Alpha through TikTok, basketball edits, and a '
'Philadelphia drill song, *6-7* appears to carry no referential content yet remains demonstrably '
'meaningful to its users. **Objective.** This narrative review asks what such a phatic-only slang term '
'reveals about the limits of meaning-based—referential and truth-conditional—lexical theory, and which '
'frameworks best account for it. **Method.** A structured narrative review synthesised conceptual, '
'empirical, and lexicographic literature across five thematic search angles; extracted claims were '
'rendered falsifiable and subjected to an adversarial verification pass that actively sought to refute '
'them. **Results.** Linguists and lexicographers converge: *6-7* is semantically near-void but socially '
'potent, operating as an in-group shibboleth through semantic bleaching, expressive (use-conditional) '
'meaning, and sociolinguistic indexicality. It instantiates Malinowski’s (1923) phatic communion and '
'Jakobson’s (1960) phatic function. **Conclusion.** *6-7* does not refute referential semantics so much '
'as map its boundary; a complete theory of the lexicon requires use-based, expressive, and indexical '
'supplementation. The paradox of a dictionary defining the indefinable is a diagnostic signal about '
'what lexical meaning can be.')
add_md(para(align=JUST, after=6), ABS, 10)
add_md(para(align=JUST, after=10),
    'Keywords: phatic communion; phatic function; lexical semantics; expressive meaning; '
    'sociolinguistic indexicality; slang; internet linguistics; brainrot; Generation Alpha', 10, bold=True)

# ===== 1. INTRODUCTION =====
h1('1. Introduction')
body("The lexicographer’s traditional task—pairing a word-form with a definition—presupposes that "
"words have meanings of the kind a definition can capture. Most do. But a recurring challenge to "
"meaning-based lexical theory comes from expressions that resist this pairing: interjections, "
"expletives, discourse particles, greetings, and the formulaic small talk that linguists since "
"Malinowski (1923) have grouped under the heading of *phatic* language. These items perform real "
"communicative work, yet they are difficult or impossible to define in referential terms.")
body("The viral slang term *6-7* is a near-perfect specimen of this class, and its 2025 elevation to "
"Word of the Year by a dictionary—an institution whose entire enterprise is definition—sharpens the "
"problem into something approaching paradox. When Dictionary.com’s Director of Lexicography, Steve "
"Johnson, says the term is “part inside joke, part social signal and part performance” and that “when "
"people say it, they’re not just repeating a meme; they’re shouting a feeling” (Smithsonian Magazine, "
"2025), he describes an item whose value lies almost entirely outside the denotational dimension that "
"meaning-based theory privileges.")
body("This review pursues four questions. First, what are the documented origins, spread, and use of "
"*6-7*? Second, how does phatic theory frame contentless-but-functional language? Third, what are the "
"commitments of meaning-based lexical theory, and where do they fail for an item with no referential "
"content? Fourth, which frameworks best account for a phatic-only slang term, and what does the case "
"imply for the lexicon more broadly? A recurring methodological theme is the thinness of the academic "
"evidence on *6-7* specifically, which the synthesis offsets by triangulating lexicographic "
"statements, named-linguist commentary, and established theory.")

# ===== 2. METHOD =====
h1('2. Method')
body("This is a narrative (interpretive) review rather than a systematic review, appropriate because "
"the object spans a fast-moving cultural phenomenon and several mature but separate theoretical "
"literatures that no single systematic protocol indexes well.")
lead('Source identification.', "Five thematic search angles were defined a priori—(i) the trajectory "
"of the *6-7* meme; (ii) phatic communication and the phatic function; (iii) meaning-based versus "
"use-based theories of lexical meaning; (iv) slang, internet linguistics, and memetics; and (v) the "
"theoretical nexus joining phatic-only expression to lexical theory—and pursued through an independent "
"fan-out of web searches across encyclopaedic, scholarly, lexicographic, and journalistic sources in "
"June 2026 (Figure 1).")
lead('Source selection and exclusion.', "Sources were retained on relevance and authority and sorted "
"into three tiers: (a) primary theoretical texts (e.g., Malinowski, 1923; Jakobson, 1960; "
"Wittgenstein, 1953; Potts, 2005, 2007; Eckert, 2008); (b) peer-reviewed or scholarly secondary "
"sources and reference works; and (c) reputable journalism and lexicographic statements, used chiefly "
"for the contemporary phenomenon and always preferring pieces that quote named linguists. Popular "
"sources were not used to support theoretical claims.")
lead('Quality appraisal and adversarial verification.', "Each substantive claim was rendered as a "
"falsifiable statement, assigned a source tier, and—where stakes or uncertainty were high—subjected "
"to an adversarial verification pass in which independent counter-searches actively sought to refute "
"it. A claim survived only under corroboration from multiple independent sources, and was otherwise "
"corrected or struck (Table 1). No claim was struck; two citation errors were corrected (the Firth "
"source and the attribution of “indexical field” to Eckert, 2008).")
lead('Synthesis.', "Findings were organised thematically rather than chronologically, moving from the "
"phenomenon (Sections 3–5) to phatic theory (Sections 6–7), to meaning-based theory and its limits "
"(Sections 8–9), to the frameworks that account for the case (Sections 10–12).")
italic_p("A structural limitation must be stated at the outset: no peer-reviewed study yet addresses "
"the *6-7* meme directly, so the contemporary evidence base rests on lexicographic statements and "
"journalism quoting linguists rather than on primary empirical research.")
figure('fig1_workflow.png',
       'Figure 1. The structured narrative-review and adversarial-verification workflow.')
table('Table 1. Evidence and verification appraisal of principal claims.',
      ['Claim', 'Best source(s)', 'Tier', 'Status'],
      [['Originates in Skrilla’s “Doot Doot (6 7)”', 'Complex, 2025; WHYY, 2025; Skrilla, 2025', 'Creator interview + primary release', 'Secure'],
       ['Official release 7 Feb 2025 (Priority Records)', 'Skrilla, 2025; Bleacher Report, n.d.', 'Primary release + press', 'Secure'],
       ['Has no fixed/definable meaning', 'Dictionary.com, 2025; Skrilla in Complex, 2025', 'Lexicographic + creator', 'Secure'],
       ['Spread via basketball / LaMelo Ball (6′7″)', 'Bleacher Report, n.d.; CNN, 2025', 'Reputable press', 'Secure'],
       ['“67 Kid” video, 31 Mar 2025 (Cam Wilder)', 'Know Your Meme, n.d.', 'Edited meme database', 'Strong (surname spelling varies)'],
       ['Dictionary.com WOTY 2025; “impossible to define”', 'Dictionary.com, 2025; Smithsonian, 2025; NPR, 2025', 'Lexicographer statement', 'Secure'],
       ['Functions as a shibboleth via “semantic bleaching”', 'Taylor Jones in CNN, 2025', 'Named linguist (press)', 'Secure'],
       ['“Void of semantic meaning”; carries social meaning', 'Fridland, 2026', 'Named linguist (academic outlet)', 'Secure'],
       ['*10-67* police-code etymology', 'Taylor Jones in CNN, 2025 (speculation)', 'Linguist conjecture', 'Conjecture — report as such'],
       ['Phatic-communion / phatic-function definitions', 'Malinowski, 1923; Jakobson, 1960', 'Primary text', 'Secure (verbatim)'],
       ['“Meaning is use” (§43)', 'Wittgenstein, 1953', 'Primary text', 'Secure (Anscombe trans.)'],
       ['Expressives are non-truth-conditional / use-conditional', 'Potts, 2005, 2007; Kaplan, 1999; Gutzmann, 2015', 'Peer-reviewed / primary', 'Secure'],
       ['“Indexical field” coined by Eckert', 'Eckert, 2008', 'Peer-reviewed', 'Secure (corrected from 2018)'],
       ['Firth “company it keeps” source', 'Firth, 1957 (Synopsis)', 'Primary', 'Secure (corrected source)']],
      note='“Tier” indicates source type; “Status” reports the outcome of the adversarial '
           'verification pass (Section 2). “Secure” = corroborated across independent sources or '
           'verified verbatim; “Strong” = well-attested with a minor residual uncertainty; '
           '“Conjecture” = unverified and flagged as such.',
      widths=[2.3, 2.1, 1.3, 1.3])

# ===== 3. ORIGINS =====
h1('3. The “6-7” Phenomenon: Origins and the Skrilla Source')
body("The proximate origin of *6-7* is “Doot Doot (6 7),” a Philadelphia drill song by the rapper "
"Skrilla (produced by 1Ellis). The track leaked to streaming platforms in December 2024 and was "
"officially released via Priority Records on 7 February 2025, later appearing on the deluxe edition of "
"Skrilla’s *Zombie Love Kensington Paradise* (Skrilla, 2025; Complex, 2025). Crucially, the phrase "
"was born semantically underdetermined: Skrilla has declined to fix its meaning, reportedly saying “I "
"never put an actual meaning on it, and I still would not want to,” and elsewhere describing it as "
"representing “what comes up in my head” (Complex, 2025; WHYY, 2025). Proposed sources—a Philadelphia "
"or Chicago street, or, per linguist Taylor Jones, the police ten-code *10-67* used to report a "
"death—remain speculative (CNN, 2025) and are reported here as conjecture (Table 1). The indeterminacy "
"is not a gap in our knowledge; it is constitutive of the term.")

# ===== 4. SPREAD =====
h1('4. Spread: Basketball, the “67 Kid,” and Viral Saturation')
body("The phrase migrated from music to mass meme through basketball. Highlight edits paired the lyric "
"with footage of players listed at six-foot-seven, most prominently LaMelo Ball (2.01 m), exploiting "
"the literal height coincidence (Bleacher Report, n.d.). On 31 March 2025 a YouTube AAU-basketball "
"video by Cam Wilder featured a young boy—later dubbed the “67 Kid”—shouting “six seven” with a "
"palms-up, alternating up-and-down hand gesture; the clip became a primary vector of virality "
"(Know Your Meme, n.d.). By autumn 2025 the term saturated NBA and WNBA media, NFL "
"celebrations, and celebrity content—Shaquille O’Neal reportedly joined in while admitting he did not "
"understand it, a telling detail for a term whose use is detached from comprehension. Dictionary.com "
"(2025) reported that *67* appeared in digital media roughly six times more frequently in October 2025 "
"than across all of 2024, with searches up more than sixfold since June 2025 (Figure 2).")
figure('fig2_timeline.png',
       'Figure 2. Timeline of the “6-7” meme, December 2024–November 2025.')

# ===== 5. RECEPTION =====
h1('5. Reception and the In-Group/Out-Group Line')
body("In use, *6-7* functions as an interjection or non-sequitur—shouted on hearing either number, "
"deployed as a punchline, or chanted communally—rather than as a contentful predicate. It is loosely "
"glossed as “so-so” or “maybe this, maybe that,” mirrored by the see-sawing gesture, but the gloss is "
"post-hoc and unstable (Dictionary.com, 2025). Reception data reinforce an in-group/out-group "
"dynamic: teachers have banned the phrase and tallied its frequency (one Sioux Falls science teacher, "
"Gabe Dannenbring, reported hearing it roughly 75 times in a single day), and on 24 November 2025 UK "
"Prime Minister Keir Starmer was publicly corrected by a head teacher after leading schoolchildren in "
"the gesture during a school visit (CNN, 2025; IBTimes UK, 2025). The comedy of these episodes turns "
"on who is and is not “in on the joke”—a sociolinguistic fact, not a semantic one.")

# ===== 6. PHATIC FRAME =====
h1('6. The Phatic Frame: Communion (Malinowski) and Function (Jakobson)')
body("The vocabulary for analysing contentless-but-functional language originates with the "
"anthropologist Bronisław Malinowski, whose 1923 essay “The Problem of Meaning in Primitive "
"Languages” appeared as a supplement to Ogden and Richards’s *The Meaning of Meaning*. There "
"Malinowski coined the term—“actuated by the demon of terminological invention”—for “a type of speech "
"in which ties of union are created by a mere exchange of words” (Malinowski, 1923). Phatic communion "
"is the language of “free, aimless, social intercourse,” in which words “fulfil a social function, and "
"that is their principal aim,” being “neither the result of intellectual reflection, nor do they "
"necessarily arouse reflection in the listener.” Language is here “a mode of action, rather than as a "
"countersign of thought”; it bonds rather than informs.")
body("Roman Jakobson formalised the idea within his six-function model of communication (Jakobson, "
"1960). The phatic function corresponds to the *contact* factor, comprising “messages primarily "
"serving to establish, to prolong, or to discontinue communication, to check whether the channel "
"works”—exemplified by “Hello, do you hear me?” and “Are you listening?” Jakobson credited Malinowski "
"for the term and observed that the phatic function is “the first verbal function acquired by "
"infants.” That developmental priority resonates with Fridland’s (2026) analysis of *6-7* as the "
"developmentally normal creation of socially meaningful language by adolescents—“not brain rot” but "
"“linguistically normal.” The phatic function is not a degenerate use of language; it is foundational.")

# ===== 7. PHATIC CULTURE ONLINE =====
h1('7. Phatic Culture Online')
body("The frame extends to digital communication. Miller (2008) argues that network sociality has "
"produced an online culture “dominated by non-dialogic, non-informational” exchange, in which “the "
"connection, not the content, is what matters.” Practices such as Snapchat “streaks”—daily exchanges "
"whose entire point is maintaining a connection counter—are paradigmatically phatic (see Miller, 2008, "
"and subsequent phatic-media research). A meme that spreads as a shouted gesture, propagating "
"connection rather than proposition, is the lexical-item-scale instance of exactly this phenomenon.")

# ===== 8. MEANING-BASED THEORY =====
h1('8. Meaning-Based Lexical Theory: Reference, Truth, and Sense')
body("The dominant strand of formal semantics ties meaning to the world. Frege’s (1892/1948) "
"distinction between sense (*Sinn*) and reference (*Bedeutung*) keeps reference central: “the morning "
"star” and “the evening star” differ in sense yet share a referent, Venus. Truth-conditional "
"semantics, developed by Davidson (1967) on Tarski’s (1944) theory of truth, holds that to give the meaning "
"of a sentence is to give its truth conditions, so that a word’s meaning is its contribution to those "
"conditions. The difficulty is immediate: *6-7* has no plausible truth-conditional contribution. It is "
"not a predicate, names nothing, and a sentence is no more or less true for containing it—by the "
"lights of strict truth-conditional semantics, not so much false as not truth-apt.")
body("Lexical semantics, in turn, studies word meaning and the sense relations—synonymy, hyponymy, "
"antonymy, polysemy—that structure the lexicon (Cruse, 1986; Jurafsky & Martin, 2023). Identifying lexical meaning "
"purely with reference makes it hard to account for synonymy and analytic entailment, so the field "
"distinguishes an inferential aspect of lexical competence (relations among senses) from a referential "
"aspect (naming and application) (Stanford Encyclopedia of Philosophy, n.d.). *6-7* enters into "
"neither set of relations robustly: it has no synonyms, no hypernym, no entailments. There is no "
"*sense* for the inferential machinery to operate on—which is why a dictionary can simultaneously "
"crown it and confess it cannot define it (Table 2).")

# ===== 9. USE-BASED ALTERNATIVES =====
h1('9. Use-Based Alternatives and the Non-Referential Margin')
body("The principal rival tradition makes *use*, not reference, primary. Wittgenstein’s (1953) "
"*Philosophical Investigations* furnishes the slogan: “the meaning of a word is its use in the "
"language” (§43, Anscombe translation). Meaning resides in language-games and is organised by family "
"resemblance rather than shared essence; Wittgenstein hedged—“not for all” cases—and *6-7* falls "
"squarely in the use-governed, non-ostensive class he had in mind. Three further frameworks bear on "
"slang: Firth’s (1957) distributional dictum (“you shall know a word by the company it keeps”); "
"usage-based linguistics, which models grammar as a network of constructions learned from use (Bybee, 2010); and "
"construction grammar (Goldberg, 1995), which treats lexical and syntactic units alike as "
"form–meaning pairings. Each permits “meaning” to be a conventionalised pairing of a form with a "
"*function*—including a purely social function—rather than with a referent.")
body("*6-7* is, moreover, not *sui generis*; it joins a class formal semantics has long handled at its "
"margins. Discourse markers are traditionally analysed as non-truth-conditional—removing “so” or “you "
"know” does not change a sentence’s truth value—and Relevance Theory treats such connectives as "
"encoding procedural rather than conceptual meaning (Blakemore, 2002). Interjections are likewise "
"characterised as content that is not truth-conditional in any way. The existence of this margin is "
"the wedge: meaning-based theory has always needed a supplementary account for non-denotational "
"items. *6-7* simply pushes that supplement to the centre.")
table('Table 2. Theories of lexical meaning and their fit for a phatic-only item.',
      ['Tradition', 'Key figures', 'Locus of meaning', 'Account of “6-7”'],
      [['Referential / truth-conditional', 'Frege; Davidson', 'Reference; contribution to truth conditions', 'No content; not truth-apt'],
       ['Lexical semantics', 'Cruse; Jurafsky & Martin', 'Sense and sense-relations', 'No sense; enters no relations'],
       ['Use theory', 'Wittgenstein', 'Use within language-games', 'Meaning *is* its use'],
       ['Usage-based / construction grammar', 'Firth; Bybee; Goldberg', 'Conventionalised form–function pairing', 'Form paired with a social function'],
       ['Expressive / use-conditional', 'Kaplan; Potts; Gutzmann', 'Speaker attitude / affect', 'Expressive interjection'],
       ['Indexical / third-wave', 'Silverstein; Eckert', 'Social indexing of identity/stance', 'Indexes in-group membership']],
      note='Meaning-based traditions (rows 1–2) yield a null result for *6-7*; use-based, expressive, '
           'and indexical traditions (rows 3–6) assign it a positive, non-referential value.',
      widths=[1.6, 1.3, 1.7, 1.6])
figure('fig3_cline.png',
       'Figure 3. A cline of lexical meaning from referential to phatic, locating “6-7.”')

# ===== 10. CONVERGENT VERDICT =====
h1('10. The Convergent Expert Verdict and Semantic Bleaching')
body("Independent commentators have reached the same conclusion using overlapping vocabulary (Table "
"3). Every analyst relocates the term’s value from *denotation* to *social contact, identity, and "
"affect*—that is, to the phatic and expressive dimensions.")
table('Table 3. Convergent expert characterizations of “6-7.”',
      ['Commentator (affiliation)', 'Characterization of the term', 'Source'],
      [['Taylor Jones (Univ. of Pennsylvania)', '“Semantically … almost void”; a “shibboleth” marking in-group membership; product of “semantic bleaching”', 'CNN, 2025'],
       ['Valerie Fridland (Univ. of Nevada, Reno)', '“Void of any semantic meaning”; “makes sense” through social, not referential, meaning', 'Fridland, 2026'],
       ['Adam Aleksic (“Etymology Nerd”)', '“Six-seven doesn’t need to have a meaning. What matters is that it lands and provokes a reaction”', 'Today, 2024'],
       ['Cynthia Gordon (Georgetown Univ.)', 'Trend “oriented to humor and play”; “only humorous … if a group of people are ‘insiders’”', 'Georgetown University, 2025'],
       ['Steve Johnson (Dictionary.com)', '“A burst of energy that spreads and connects people long before anyone agrees on what it actually means”', 'Smithsonian, 2025']],
      note='Affiliations as reported in the cited sources. The five commentators span academic '
           'sociolinguistics, content creation, and lexicography yet converge on a social, '
           'non-denotational reading.',
      widths=[1.9, 3.0, 1.0])
body("This convergence rests on a well-attested process: semantic bleaching—the loss of denotational "
"content while form and function persist. What *6-7* illustrates is bleaching compressed from "
"centuries into months: the term arguably entered circulation already bleached, its tenuous link to a "
"song lyric and a height statistic severed almost immediately (CNN, 2025). A comparable, slightly "
"earlier case is “yeet,” which University of Colorado Boulder (2021) linguists analysed as undergoing "
"“indexical bleaching” as it spread from African American English and attached primarily to gesture "
"and stance. Internet circulation thus functions as a high-speed laboratory for processes historical "
"linguistics usually observes only in slow motion.")

# ===== 11. EXPRESSIVE + INDEXICAL =====
h1('11. Expressive Meaning, Indexicality, and the Social Lexicon')
body("The most precise formal home for *6-7* is the expressivist strand of semantics. Kaplan’s (1999) "
"“The Meaning of ‘Ouch’ and ‘Oops’” treats interjections as evidence for a semantics of meaning as "
"use, distinguishing expressive content (which displays a speaker’s attitude) from descriptive, "
"truth-apt content. Potts (2005, 2007) develops this into a systematic account of expressives as "
"contributing non-truth-conditional, speaker-oriented meaning—what Kaplan (1999) and Gutzmann (2015) "
"call use-conditional meaning—independent of at-issue content. Potts’s diagnostic properties map onto "
"*6-7* with uncanny precision (Table 4); descriptive ineffability—speakers are never fully satisfied "
"paraphrasing an expressive and resort instead to examples of use—is exactly the behaviour of "
"teenagers and lexicographers confronted with *6-7*.")
table('Table 4. Potts’s (2007) diagnostic properties of expressives mapped onto “6-7.”',
      ['Property', 'Definition (Potts, 2007)', 'Manifestation in “6-7”'],
      [['Independence', 'Expressive content is *largely* independent of—and does not affect—the at-issue/descriptive content', 'Adds no proposition to any sentence it punctuates'],
       ['Nondisplaceability', 'Predicates something of the utterance situation (the here-and-now)', 'Performs the present moment; cannot report a past “6-7”'],
       ['Perspective dependence', 'Evaluated from a perspective, usually the speaker’s', 'Signals the speaker’s stance/affiliation, not a fact'],
       ['Descriptive ineffability', 'Speakers are never *fully satisfied* paraphrasing it in descriptive terms', 'Defined by *when* it is said, not *what* it denotes'],
       ['Immediacy', 'Like a performative, it achieves its act simply by being uttered', 'Saying it *is* the social act'],
       ['Repeatability', 'Repetition strengthens rather than becoming redundant', 'Chanted, echoic deployment in classrooms and arenas']],
      note='Property names and definitions follow Potts (2007); the right-hand column is the present '
           'author’s application to *6-7* and is interpretive rather than sourced.',
      widths=[1.4, 2.7, 2.4])
body("If *6-7* is not denotational, what *is* its meaning? Sociolinguistics answers: indexical. "
"Silverstein’s (2003) indexical order holds that forms acquire social meaning by indexing macro-social "
"categories in micro-level interaction. Eckert (2008, 2018) argues that the meanings of linguistic "
"variables are not fixed denotations but an *indexical field*—a constellation of ideologically related "
"meanings activated in situated use to construct identity and signal stance. On this view the "
"“meaning” of *6-7* just *is* its indexing of Generation Alpha in-group membership, playful stance, "
"and shared participation: real, learnable, and socially consequential, yet categorically different "
"from reference.")

# ===== 12. SLANG + MEMETICS =====
h1('12. Slang, Anti-Language, and Memetic Spread')
body("The sociology of slang independently predicts items like *6-7*. Eble (1996) identifies the "
"central purposes of slang as “cementing group identity and opposing authority,” with slang "
"“deliberately chosen … to mark … inclusion in … a social group.” Halliday’s (1976) anti-language "
"describes how oppositional groups generate vocabulary that “serves to create and maintain social "
"structure through conversation,” often via overlexicalization. *6-7*, as a shibboleth that bonds "
"adolescents and irritates authority figures, performs this prototypical solidarity-and-opposition "
"function with denotational content reduced essentially to zero.")
body("Finally, the mechanism of *6-7*’s spread is memetic rather than semantic. Dawkins (1976) coined "
"“meme” as “a unit of cultural transmission, or a unit of imitation” propagating by copying—by "
"replication, not by conveying fixed content. McCulloch (2019) shows that the “artfully disarrayed” "
"form of animal-meme language made it “more likely to spread,” attributing virality to sound, form, "
"and play rather than semantic payload. *6-7* spreads as Dawkinsian imitation: a catchy form plus a "
"gesture, replicating because it is “just funny to say.” The broader “brainrot” lexicon—*skibidi* (a "
"“pseudo word,” per Aleksic), *Ohio*, *gyat*—populates the same category, and Oxford’s selection of "
"“brain rot” as its 2024 Word of the Year marks the cultural recognition of deliberately contentless "
"online language (Oxford University Press, 2024; Today, 2024).")

# ===== 13. DISCUSSION =====
h1('13. Discussion')
body("Three themes emerge from this synthesis, summarised by the disciplinary convergence in Figure 4.")
figure('fig4_convergence.png',
       'Figure 4. Disciplinary convergence on phatic-only language as social rather than denotational.')
lead('First, the lexicographic paradox is a category signal, not an embarrassment.',
"Dictionary.com’s gloss (“meaningless, ubiquitous, and nonsensical … still … meaningful to the people "
"who use it because of the connection it fosters”) is a near-paraphrase of Malinowski’s phatic "
"communion and Potts’s expressive meaning. Merriam-Webster’s slang entry is equally telling: it "
"defines *six seven* as “a nonsensical expression connected to a song and a basketball player” "
"(Merriam-Webster, n.d.)—that is, by *what it attaches to* rather than by what it denotes, exactly the "
"behaviour descriptive ineffability predicts.")
lead('Second, the case scopes meaning-based theory rather than refuting it.',
"Referential and truth-conditional semantics were designed for the truth-apt, denotational core of "
"the lexicon and remain powerful there. What *6-7* does is make vivid the boundary the tradition "
"already acknowledges through its marginal treatment of interjections and discourse markers. "
"Meaning-based lexical theory is thus locally adequate but globally incomplete, requiring "
"supplementation by use-based (Wittgenstein; construction grammar), expressive (Kaplan; Potts), and "
"social-indexical (Silverstein; Eckert) dimensions.")
lead('Third, the convergence across disciplines is itself the finding.',
"Anthropology, structural linguistics, philosophy of language, sociolinguistics, media studies, and "
"internet linguistics—developed independently and decades apart—describe the same thing: language "
"whose function is to establish contact, mark belonging, and perform affect rather than to denote. "
"*6-7* is valuable precisely because it is phatic-only—a near-pure specimen that isolates these "
"dimensions from any confounding denotational content, as a controlled experiment isolates a "
"variable.")

# ===== 14. LIMITATIONS =====
h1('14. Limitations')
body("This review is constrained by its subject’s literature. No peer-reviewed study yet addresses "
"*6-7* directly, so the contemporary analysis leans on lexicographic statements and journalism "
"quoting named linguists rather than primary empirical research. “Meaninglessness,” moreover, is a "
"matter of degree: *6-7* retains a faint indexical sense (so-so, ambivalence) and a robust social "
"meaning, so claims that it means “nothing” should be read as “nothing *denotational*.” Phatic-only "
"terms are characteristically ephemeral; whether *6-7* lexicalises a stable sense, fades, or leaves a "
"constructional residue is an open empirical question well suited to longitudinal corpus study. "
"Finally, one origin claim—the *10-67* police-code etymology—remains unverified speculation (Table 1).")

# ===== 15. CONCLUSION =====
h1('15. Conclusion')
body("The “6-7” meme is a phatic-only slang term: an interjection whose communicative value is "
"constituted almost entirely by social contact, in-group indexing, and affective performance, with "
"denotational content bleached to near zero. Reviewed against meaning-based lexical theory, it does "
"not collapse the referential and truth-conditional tradition so much as map that tradition’s "
"edge—the same edge marked by interjections, expletives, and discourse particles. The most adequate "
"accounts come from use-based, expressivist, and social-indexical frameworks, all of which permit "
"“meaning” to be a conventionalised form–function pairing rather than a form–referent pairing. That a "
"dictionary could name “impossible to define” as the defining feature of its Word of the Year is, "
"read correctly, not a paradox but a precise empirical signal: the lexicon contains words whose "
"meaning is their use, their stance, and their power to bond—and any theory that equates lexical "
"meaning with reference will, at that boundary, run out of things to say exactly where *6-7* begins.")

# ===== DECLARATIONS =====
h1('Declarations')
for label, txt in [
    ('Funding.', 'The author(s) received no specific funding for this work.'),
    ('Conflicts of interest.', 'The author(s) declare no competing interests.'),
    ('Data availability.', 'This review analyses publicly available published and web sources; no new '
     'datasets were generated or analysed.'),
    ('Methodology and AI use.', 'Source discovery and a structured adversarial verification pass were '
     'conducted with AI-assisted web search; all claims were checked against cited sources, and the '
     'author(s) take responsibility for the final content.')]:
    p = para(align=JUST, after=4); style_run(p.add_run(label + ' '), 10, True); add_md(p, txt, 10)

# ===== REFERENCES =====
h1('References')
REFS = [
 'Blakemore, D. (2002). *Relevance and linguistic meaning: The semantics and pragmatics of discourse markers*. Cambridge University Press.',
 'Bleacher Report. (n.d.). *How NBA star LaMelo Ball accidentally sparked the TikTok “6-7” meme*. https://bleacherreport.com/articles/25240758-how-nba-star-lamelo-ball-accidentally-sparked-tiktok-6-7-meme',
 'Bybee, J. (2010). *Language, usage and cognition*. Cambridge University Press.',
 'CNN. (2025, October 18). *The “6-7” meme can be annoying. Kids are shouting it for a reason*. https://www.cnn.com/2025/10/18/us/6-7-meme-slang-explained-cec',
 'Complex. (2025). *Skrilla’s “6-7” meme, explained*. https://www.complex.com/music/a/khal/skrilla-6-7-meme-explained',
 'Cruse, D. A. (1986). *Lexical semantics*. Cambridge University Press.',
 'Davidson, D. (1967). Truth and meaning. *Synthese, 17*(3), 304–323. https://doi.org/10.1007/BF00485035',
 'Dawkins, R. (1976). *The selfish gene*. Oxford University Press.',
 'Dictionary.com. (2025, October 28). *Dictionary.com’s 2025 word of the year is “67.”* https://www.dictionary.com/articles/word-of-the-year-2025',
 'Eble, C. (1996). *Slang and sociability: In-group language among college students*. University of North Carolina Press.',
 'Eckert, P. (2008). Variation and the indexical field. *Journal of Sociolinguistics, 12*(4), 453–476. https://doi.org/10.1111/j.1467-9841.2008.00374.x',
 'Eckert, P. (2018). *Meaning and linguistic variation: The third wave in sociolinguistics*. Cambridge University Press.',
 'Firth, J. R. (1957). A synopsis of linguistic theory, 1930–1955. In *Studies in linguistic analysis* (pp. 1–32). Blackwell.',
 'Frege, G. (1948). Sense and reference (M. Black, Trans.). *The Philosophical Review, 57*(3), 209–230. https://doi.org/10.2307/2181485 (Original work published 1892)',
 'Fridland, V. (2026, April 15). Slanguage: How “6-7” makes sense even though it means nothing. *The Conversation*. https://theconversation.com/slanguage-how-6-7-makes-sense-even-though-it-means-nothing-270006',
 'Georgetown University. (2025). *Linguistics professor explains the “six-seven” meme*. https://www.georgetown.edu/news/six-seven-meme-linguistics/',
 'Goldberg, A. E. (1995). *Constructions: A construction grammar approach to argument structure*. University of Chicago Press.',
 'Gutzmann, D. (2015). *Use-conditional meaning: Studies in multidimensional semantics*. Oxford University Press.',
 'Halliday, M. A. K. (1976). Anti-languages. *American Anthropologist, 78*(3), 570–584. https://doi.org/10.1525/aa.1976.78.3.02a00050',
 'IBTimes UK. (2025, November 25). *Keir Starmer apologises after being told off by teacher for doing “6-7” meme during school visit*. https://www.ibtimes.co.uk/keir-starmer-apologises-after-being-told-off-teacher-doing-6-7-meme-during-school-visit-1757929',
 'Jakobson, R. (1960). Linguistics and poetics. In T. A. Sebeok (Ed.), *Style in language* (pp. 350–377). MIT Press.',
 'Jurafsky, D., & Martin, J. H. (2023). Lexical semantics. In *Speech and language processing* (3rd ed. draft, Chapter 19). https://web.stanford.edu/class/linguist1/Rdgs/JM19.pdf',
 'Kaplan, D. (1999). *The meaning of “ouch” and “oops”: Explorations in the theory of meaning as use* [Unpublished manuscript]. University of California, Los Angeles.',
 'Know Your Meme. (n.d.). *67 kid*. Literally Media. Retrieved June 4, 2026, from https://knowyourmeme.com/memes/67-kid',
 'Malinowski, B. (1923). The problem of meaning in primitive languages. In C. K. Ogden & I. A. Richards, *The meaning of meaning* (pp. 296–336). Kegan Paul.',
 'McCulloch, G. (2019). *Because internet: Understanding the new rules of language*. Riverhead Books.',
 'Merriam-Webster. (n.d.). Six seven. In *Merriam-Webster slang dictionary*. Retrieved June 4, 2026, from https://www.merriam-webster.com/slang/six-seven',
 'Miller, V. (2008). New media, networking and phatic culture. *Convergence, 14*(4), 387–400. https://doi.org/10.1177/1354856508094659',
 'NPR. (2025, October 31). *What does “67” mean? Dictionary.com’s 2025 word of the year has no definition*. https://www.npr.org/2025/10/31/nx-s1-5593052/67-dictionary-word-of-the-year-2025',
 'Oxford University Press. (2024). *“Brain rot” named Oxford word of the year 2024*. https://corp.oup.com/news/brain-rot-named-oxford-word-of-the-year-2024/',
 'Potts, C. (2005). *The logic of conventional implicatures*. Oxford University Press.',
 'Potts, C. (2007). The expressive dimension. *Theoretical Linguistics, 33*(2), 165–198. https://doi.org/10.1515/TL.2007.011',
 'Silverstein, M. (2003). Indexical order and the dialectics of sociolinguistic life. *Language & Communication, 23*(3–4), 193–229. https://doi.org/10.1016/S0271-5309(03)00013-2',
 'Skrilla. (2025). *Doot doot (6 7)* [Song]. Priority Records.',
 'Smithsonian Magazine. (2025, October 30). *The term “67” is impossible to define. It just became Dictionary.com’s word of the year for 2025*. https://www.smithsonianmag.com/smart-news/the-term-67-is-impossible-to-define-it-just-became-dictionary-coms-word-of-the-year-for-2025-180987650/',
 'Stanford Encyclopedia of Philosophy. (n.d.). *Word meaning*. https://plato.stanford.edu/entries/word-meaning/',
 'Tarski, A. (1944). The semantic conception of truth and the foundations of semantics. *Philosophy and Phenomenological Research, 4*(3), 341–376. https://doi.org/10.2307/2102968',
 'Today. (2024, June 27). *What does “skibidi” mean?* https://www.today.com/parents/teens/skibidi-slang-meaning-rcna153557',
 'University of Colorado Boulder. (2021, May 3). *To “yeet” or not to “yeet”: African American slang beyond Vine*. https://www.colorado.edu/linguistics/2021/05/03/yeet-or-not-yeet-african-american-slang-beyond-vine',
 'WHYY. (2025). *The meaning of “6-7” and its Philadelphia roots*. https://whyy.org/articles/meaning-6-7-skrilla-philadelphia/',
 'Wittgenstein, L. (1953). *Philosophical investigations* (G. E. M. Anscombe, Trans.). Blackwell.',
]
for ref in REFS:
    p = para(after=4)
    p.paragraph_format.left_indent = Inches(0.5); p.paragraph_format.first_line_indent = Inches(-0.5)
    add_md(p, ref, 10)

doc.save(OUT)
print("Saved", OUT)
