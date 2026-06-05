#!/usr/bin/env python3
"""Build a journal-article-style .docx of the 6-7 narrative review (matches user's preferred format)."""
import re
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = "/home/user/Claude/Phatic-Only_Slang_6-7_JournalReview.docx"
FIG = "/home/user/Claude/figs"
SERIF = "Times New Roman"

INLINE = re.compile(r'(\*\*.+?\*\*|\*[^*]+?\*|https?://[^\s)]+)')

def style_run(r, size=11, bold=None, italic=None, color=None):
    r.font.name = SERIF
    r.font.size = Pt(size)
    if bold is not None: r.bold = bold
    if italic is not None: r.italic = italic
    if color is not None: r.font.color.rgb = color

def add_hyperlink(paragraph, url, text, size=10):
    part = paragraph.part
    r_id = part.relate_to(url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True)
    h = OxmlElement('w:hyperlink'); h.set(qn('r:id'), r_id)
    run = OxmlElement('w:r'); rPr = OxmlElement('w:rPr')
    rF = OxmlElement('w:rFonts'); rF.set(qn('w:ascii'), SERIF); rF.set(qn('w:hAnsi'), SERIF); rPr.append(rF)
    sz = OxmlElement('w:sz'); sz.set(qn('w:val'), str(size*2)); rPr.append(sz)
    col = OxmlElement('w:color'); col.set(qn('w:val'), '0000FF'); rPr.append(col)
    u = OxmlElement('w:u'); u.set(qn('w:val'), 'single'); rPr.append(u)
    run.append(rPr)
    t = OxmlElement('w:t'); t.set(qn('xml:space'), 'preserve'); t.text = text; run.append(t)
    h.append(run); paragraph._p.append(h)

def add_md(p, text, size=11, base_bold=None, base_italic=None):
    pos = 0
    for m in INLINE.finditer(text):
        if m.start() > pos:
            r = p.add_run(text[pos:m.start()]); style_run(r, size, base_bold, base_italic)
        tok = m.group(0)
        if tok.startswith('**'):
            r = p.add_run(tok[2:-2]); style_run(r, size, True, base_italic)
        elif tok.startswith('http'):
            add_hyperlink(p, tok, tok, size)
        elif tok.startswith('*'):
            r = p.add_run(tok[1:-1]); style_run(r, size, base_bold, True)
        pos = m.end()
    if pos < len(text):
        r = p.add_run(text[pos:]); style_run(r, size, base_bold, base_italic)

# ---------- document ----------
doc = Document()
ns = doc.styles['Normal']
ns.font.name = SERIF; ns.font.size = Pt(11)
ns.paragraph_format.line_spacing = 1.0
ns.paragraph_format.space_after = Pt(6)
sec = doc.sections[0]
for s in ('top', 'bottom', 'left', 'right'):
    setattr(sec, f'{s}_margin', Inches(1))

def para(align=None, before=0, after=6, line=1.0):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(before); pf.space_after = Pt(after); pf.line_spacing = line
    if align is not None: p.alignment = align
    return p

def h1(text):
    p = para(before=12, after=4)
    r = p.add_run(text); style_run(r, 13, True)

def h2(text):
    p = para(before=8, after=2)
    r = p.add_run(text); style_run(r, 12, True)

def body(text):
    p = para(align=WD_ALIGN_PARAGRAPH.JUSTIFY)
    add_md(p, text, 11)

def bullet(text):
    p = para(align=WD_ALIGN_PARAGRAPH.JUSTIFY, after=3)
    p.paragraph_format.left_indent = Inches(0.3)
    p.paragraph_format.first_line_indent = Inches(-0.18)
    r = p.add_run('•  '); style_run(r, 11)
    add_md(p, text, 11)

def numbered(items):
    for i, it in enumerate(items, 1):
        p = para(align=WD_ALIGN_PARAGRAPH.JUSTIFY, after=3)
        p.paragraph_format.left_indent = Inches(0.35)
        p.paragraph_format.first_line_indent = Inches(-0.22)
        r = p.add_run(f'{i}.  '); style_run(r, 11)
        add_md(p, it, 11)

def figure(png, caption_md):
    p = para(align=WD_ALIGN_PARAGRAPH.CENTER, before=8, after=2)
    p.add_run().add_picture(f"{FIG}/{png}", width=Inches(5.9))
    c = para(align=WD_ALIGN_PARAGRAPH.CENTER, after=8)
    add_md(c, caption_md, 9, base_bold=True)

def table(caption_md, headers, rows, widths=None):
    cap = para(before=8, after=2)
    add_md(cap, caption_md, 10, base_bold=True)
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = 'Table Grid'; t.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = t.rows[0].cells
    for j, htext in enumerate(headers):
        hp = hdr[j].paragraphs[0]; hp.paragraph_format.space_after = Pt(2)
        add_md(hp, htext, 9.5, base_bold=True)
    for row in rows:
        cells = t.add_row().cells
        for j, val in enumerate(row):
            cp = cells[j].paragraphs[0]; cp.paragraph_format.space_after = Pt(2)
            add_md(cp, val, 9.5)
    if widths:
        for j, w in enumerate(widths):
            for r in t.rows:
                r.cells[j].width = Inches(w)
    para(after=6)

# ===== TITLE BLOCK =====
p = para(align=WD_ALIGN_PARAGRAPH.CENTER, before=0, after=6)
r = p.add_run('Phatic-Only Slang and the Limits of Meaning-Based Lexical Theory: '
              'A Sociolinguistic Review of the “6-7” Meme')
style_run(r, 16, True)
p = para(align=WD_ALIGN_PARAGRAPH.CENTER, after=2)
r = p.add_run('[Author Name] ¹*'); style_run(r, 12)
p = para(align=WD_ALIGN_PARAGRAPH.CENTER, after=10)
r = p.add_run('¹ [Department / Faculty, Institution, City, Country]    '
              '* Corresponding author: [email]'); style_run(r, 10)

# ===== ABSTRACT =====
p = para(after=2)
r = p.add_run('Abstract'); style_run(r, 12, True)
ABSTRACT = ('**Background.** In October 2025 Dictionary.com named “67” (rendered *6-7*, '
 'pronounced *six-seven*) its Word of the Year while conceding that the term is “impossible '
 'to define.” A non-sequitur interjection that spread among Generation Alpha through TikTok, '
 'basketball highlight edits, and a Philadelphia drill song, *6-7* appears to carry no '
 'referential content yet remains demonstrably meaningful to those who use it. **Objective.** '
 'This narrative review asks what such a phatic-only slang term reveals about the limits of '
 'meaning-based—referential and truth-conditional—lexical theory, and which frameworks best '
 'account for it. **Methods.** A structured narrative review synthesised conceptual, empirical, '
 'and lexicographic literature across five thematic search angles; extracted claims were '
 'rendered falsifiable and subjected to an adversarial verification pass that actively sought '
 'to refute them. **Findings.** Linguists and lexicographers converge on a single reading: '
 '*6-7* is semantically near-void but socially potent, operating as an in-group shibboleth '
 'through semantic bleaching, expressive (use-conditional) meaning, and sociolinguistic '
 'indexicality. It instantiates Malinowski’s (1923) phatic communion and Jakobson’s (1960) '
 'phatic function. **Conclusions.** *6-7* does not refute referential semantics so much as map '
 'its boundary; a complete theory of the lexicon requires use-based, expressive, and indexical '
 'supplementation. The paradox of a dictionary defining the indefinable is best read not as an '
 'embarrassment but as a diagnostic signal about what lexical meaning can be.')
p = para(align=WD_ALIGN_PARAGRAPH.JUSTIFY, after=6)
add_md(p, ABSTRACT, 10, base_bold=True)
p = para(align=WD_ALIGN_PARAGRAPH.JUSTIFY, after=10)
add_md(p, 'Keywords: phatic communion; phatic function; lexical semantics; expressive meaning; '
          'sociolinguistic indexicality; slang; internet linguistics; brainrot; Generation Alpha', 10, base_bold=True)

# ===== 1. INTRODUCTION =====
h1('1. Introduction')
body("The lexicographer’s traditional task—pairing a word-form with a definition—presupposes "
"that words have meanings of the kind a definition can capture. Most do. But a recurring "
"challenge to meaning-based lexical theory comes from expressions that resist this pairing: "
"interjections, expletives, discourse particles, greetings, and the formulaic small talk that "
"linguists since Malinowski (1923) have grouped under the heading of *phatic* language. These "
"items perform real communicative work, yet they are difficult or impossible to define in "
"referential terms.")
body("The viral slang term *6-7* is a near-perfect specimen of this class, and its 2025 "
"elevation to Word of the Year by a dictionary—an institution whose entire enterprise is "
"definition—sharpens the theoretical problem into something approaching paradox. When "
"Dictionary.com’s Director of Lexicography, Steve Johnson, says the term is “part inside joke, "
"part social signal and part performance” and that “when people say it, they’re not just "
"repeating a meme; they’re shouting a feeling” (Smithsonian Magazine, 2025), he is describing "
"an item whose value lies almost entirely outside the denotational dimension that meaning-based "
"theory privileges.")
body("This review pursues four aims. First, it documents the empirical phenomenon: the origins, "
"spread, and reception of *6-7* (Section 3). Second, it situates the term within the theory of "
"phatic communication (Section 4). Third, it lays out the commitments of meaning-based lexical "
"theory—referential, truth-conditional, and lexical-semantic approaches (Section 5). Fourth, it "
"argues that phatic-only slang like *6-7* tests the limits of those approaches, and that the "
"most adequate accounts come from use-based, expressivist, and indexical frameworks (Sections "
"6–7). The synthesis is interdisciplinary, treating the meme not as a curiosity but as "
"naturally occurring evidence about the architecture of lexical meaning.")

# ===== 2. METHODS =====
h1('2. Methods')
h2('2.1 Review design and search strategy')
body("This study adopts a structured narrative—rather than systematic—review design, appropriate "
"because the object spans a fast-moving cultural phenomenon and several mature but separate "
"theoretical literatures that no single systematic protocol indexes well. Five thematic search "
"angles were defined a priori: (i) the trajectory of the *6-7* meme; (ii) phatic communication "
"and the phatic function; (iii) meaning-based versus use-based theories of lexical meaning; "
"(iv) slang formation, internet linguistics, and memetics; and (v) the theoretical nexus joining "
"phatic-only expression to lexical theory. Each angle was pursued through an independent fan-out "
"of web searches across encyclopaedic, scholarly, lexicographic, and journalistic sources in "
"June 2026 (Figure 1).")
body("The review is organised around three research questions. **RQ1:** What are the documented "
"origins, spread, and use of *6-7*, and what do users and experts take it to mean? **RQ2:** How "
"do meaning-based theories of the lexicon handle—or fail to handle—an item with no referential "
"content? **RQ3:** Which theoretical frameworks best account for a phatic-only slang term, and "
"what does the case imply for lexical theory more broadly?")
h2('2.2 Source selection')
body("Sources were retained on the basis of relevance and authority. Three tiers were "
"distinguished: (a) primary theoretical texts (e.g., Malinowski, 1923; Jakobson, 1960; "
"Wittgenstein, 1953; Potts, 2005, 2007; Eckert, 2008); (b) peer-reviewed or scholarly secondary "
"sources and reference works; and (c) reputable journalism and lexicographic statements, used "
"chiefly for the contemporary phenomenon and always preferring pieces that quote named linguists "
"(e.g., Taylor Jones, Valerie Fridland, Adam Aleksic, Cynthia Gordon). Popular sources were not "
"used to support theoretical claims.")
h2('2.3 Adversarial verification protocol')
body("To mitigate the risk of citing fabricated, misremembered, or misattributed findings, each "
"substantive claim was rendered as a falsifiable statement and assigned a provisional confidence "
"level. High-stakes claims and all medium- or low-confidence claims were then subjected to an "
"adversarial verification pass in which independent counter-searches actively sought to refute "
"them; a claim survived only under corroboration from multiple independent sources, and was "
"otherwise corrected or struck. No claim was struck. Two citation corrections were applied: "
"Firth’s “company it keeps” dictum was re-sourced to “A Synopsis of Linguistic Theory, "
"1930–1955” (Firth, 1957) rather than to *Papers in Linguistics*, and the term “indexical "
"field” was credited to Eckert (2008) rather than to her 2018 book. Verbatim quotations from "
"primary texts (Malinowski, Jakobson, Wittgenstein §43, Kaplan, Potts) were confirmed across "
"multiple sources; the Wittgenstein §43 quotation follows the Anscombe translation.")
h2('2.4 Limitations of the method')
body("As a narrative review, this synthesis is interpretive and non-exhaustive. The phenomenon "
"is recent, so the contemporary evidence base leans on lexicographic statements and journalism "
"quoting linguists rather than on peer-reviewed studies of *6-7* itself. The phatic-only items "
"under study are characteristically ephemeral, and one origin claim—the *10-67* police-code "
"etymology—remains unverified speculation. These constraints bound the strength, though not the "
"direction, of the conclusions.")
figure('fig1_workflow.png',
       'Figure 1. Structured narrative-review and adversarial-verification workflow.')

# ===== 3. PHENOMENON =====
h1('3. The “6-7” Phenomenon: Origins, Spread, and Reception')
h2('3.1 Origins')
body("The proximate origin of *6-7* is “Doot Doot (6 7),” a Philadelphia drill song by the "
"rapper Skrilla (produced by 1Ellis). The track leaked to streaming platforms in December 2024 "
"and was officially released via Priority Records on 7 February 2025, later appearing on the "
"deluxe edition of Skrilla’s *Zombie Love Kensington Paradise* (Wikipedia contributors, n.d.-b). "
"Crucially, the phrase was born semantically underdetermined: Skrilla has declined to fix its "
"meaning, reportedly saying “I never put an actual meaning on it, and I still would not want "
"to,” and elsewhere describing it as representing “what comes up in my head” (Complex, 2025; "
"WHYY, 2025). Proposed sources—a Philadelphia or Chicago street, or, per linguist Taylor Jones, "
"the police ten-code *10-67* used to report a death—remain speculative (CNN, 2025). The "
"indeterminacy is not a gap in our knowledge; it is constitutive of the term.")
h2('3.2 Spread')
body("The phrase migrated from music to mass meme through basketball. Highlight edits paired the "
"lyric with footage of players listed at six-foot-seven, most prominently LaMelo Ball (2.01 m), "
"exploiting the literal height coincidence (Bleacher Report, n.d.). On 31 March 2025 a YouTube "
"AAU-basketball video by Cam Wilder featured a young boy—later dubbed the “67 Kid”—shouting “six "
"seven” with a palms-up, alternating up-and-down hand gesture; the clip became a primary vector "
"of virality (Wikipedia contributors, n.d.-a). By autumn 2025 the term saturated NBA and WNBA "
"media, NFL celebrations, and celebrity content—Shaquille O’Neal reportedly joined in while "
"admitting he did not understand it, a telling detail for a term whose use is detached from "
"comprehension. Dictionary.com (2025) reported that *67* appeared in digital media roughly six "
"times more frequently in October 2025 than across all of 2024, with searches up more than "
"sixfold since June 2025 (Figure 2).")
figure('fig2_timeline.png',
       'Figure 2. Timeline of the “6-7” meme, December 2024–November 2025.')
h2('3.3 Reception')
body("In use, *6-7* functions as an interjection or non-sequitur—shouted on hearing either "
"number, deployed as a punchline, or chanted communally—rather than as a contentful predicate. "
"It is loosely glossed as “so-so” or “maybe this, maybe that,” mirrored by the see-sawing "
"gesture, but the gloss is post-hoc and unstable (Dictionary.com, 2025). Reception data "
"reinforce an in-group/out-group dynamic: teachers have banned the phrase and tallied its "
"frequency (one Sioux Falls science teacher, Gabe Dannenbring, reported hearing it roughly 75 "
"times in a single day), and on 24 November 2025 UK Prime Minister Keir Starmer was publicly "
"corrected by a head teacher after leading schoolchildren in the gesture during a school visit "
"(CNN, 2025; IBTimes UK, 2025). The comedy of these episodes turns on who is and is not “in on "
"the joke”—a sociolinguistic fact, not a semantic one.")

# ===== 4. PHATIC FRAME =====
h1('4. The Phatic Frame: Communion, Contact, and Contentless Talk')
h2('4.1 Malinowski’s phatic communion')
body("The vocabulary for analysing contentless-but-functional language originates with the "
"anthropologist Bronisław Malinowski, whose 1923 essay “The Problem of Meaning in Primitive "
"Languages” appeared as a supplement to Ogden and Richards’s *The Meaning of Meaning*. There "
"Malinowski coined the term—“actuated by the demon of terminological invention”—for “a type of "
"speech in which ties of union are created by a mere exchange of words” (Malinowski, 1923). "
"Phatic communion is the language of “free, aimless, social intercourse,” in which words “fulfil "
"a social function, and that is their principal aim,” being “neither the result of intellectual "
"reflection, nor do they necessarily arouse reflection in the listener.” Language is here “a "
"mode of action, rather than as a countersign of thought”; it bonds rather than informs. This is, "
"almost verbatim, what lexicographers now say about *6-7*.")
h2('4.2 Jakobson’s phatic function')
body("Roman Jakobson formalised the idea within his six-function model of communication "
"(Jakobson, 1960). The phatic function corresponds to the *contact* factor, comprising “messages "
"primarily serving to establish, to prolong, or to discontinue communication, to check whether "
"the channel works”—exemplified by “Hello, do you hear me?” and “Are you listening?” Jakobson "
"credited Malinowski for the term and observed that the phatic function is “the first verbal "
"function acquired by infants,” who communicate before they can exchange information. That "
"developmental priority resonates with Fridland’s (2026) analysis of *6-7* as the "
"developmentally normal creation of socially meaningful language by adolescents—“not brain rot” "
"but “linguistically normal.” The phatic function is not a degenerate use of language; it is "
"foundational.")
h2('4.3 Phatic culture online')
body("The frame extends to digital communication. Miller (2008) argues that network sociality "
"has produced an online culture “dominated by non-dialogic, non-informational” exchange, in "
"which “the connection, not the content, is what matters.” Practices such as Snapchat “streaks”—"
"daily exchanges whose entire point is maintaining a connection counter—are paradigmatically "
"phatic (see Miller, 2008, and subsequent phatic-media research). A meme that spreads as a "
"shouted gesture, propagating connection rather than proposition, is the lexical-item-scale "
"instance of exactly this phenomenon.")

# ===== 5. MEANING-BASED THEORY =====
h1('5. Meaning-Based Lexical Theory and Its Commitments')
h2('5.1 Referential and truth-conditional semantics')
body("The dominant strand of formal semantics ties meaning to the world. Frege’s (1892/1948) "
"distinction between sense (*Sinn*) and reference (*Bedeutung*) keeps reference central: “the "
"morning star” and “the evening star” differ in sense yet share a referent, Venus. "
"Truth-conditional semantics, developed by Davidson (1967) on Tarski’s theory of truth, holds "
"that to give the meaning of a sentence is to give its truth conditions, so that a word’s "
"meaning is its contribution to those conditions. The difficulty is immediate: *6-7* has no "
"plausible truth-conditional contribution. It is not a predicate, names nothing, and a sentence "
"is no more or less true for containing it—by the lights of strict truth-conditional semantics, "
"not so much false as not truth-apt.")
h2('5.2 Lexical semantics')
body("Lexical semantics studies word meaning and the sense relations—synonymy, hyponymy, "
"antonymy, polysemy—that structure the lexicon (Jurafsky & Martin, 2023). Identifying lexical "
"meaning purely with reference makes it hard to account for synonymy and analytic entailment, "
"and the field accordingly distinguishes an inferential aspect of lexical competence (relations "
"among senses) from a referential aspect (naming and application) (Stanford Encyclopedia of "
"Philosophy, n.d.). *6-7* enters into neither set of relations robustly: it has no synonyms, no "
"hypernym, no entailments. There is no *sense* for the inferential machinery to operate on—which "
"is why a dictionary can simultaneously crown it and confess it cannot define it.")
h2('5.3 Use-based alternatives')
body("The principal rival tradition makes *use*, not reference, primary. Wittgenstein’s (1953) "
"*Philosophical Investigations* furnishes the slogan: “the meaning of a word is its use in the "
"language” (§43, Anscombe translation). Meaning resides in language-games and is organised by "
"family resemblance rather than shared essence; notably, Wittgenstein hedged—“not for all” "
"cases—and *6-7* falls squarely in the use-governed, non-ostensive class he had in mind. Three "
"further frameworks bear on slang: Firth’s (1957) distributional dictum (“you shall know a word "
"by the company it keeps”); usage-based linguistics, which models grammar as a network of "
"constructions learned from use; and construction grammar (Goldberg, 1995), which treats lexical "
"and syntactic units alike as form–meaning pairings. Each permits “meaning” to be a "
"conventionalised pairing of a form with a *function*—including a purely social function—rather "
"than with a referent (Table 2).")
h2('5.4 Non-referential items as a standing problem')
body("*6-7* is not *sui generis*; it joins a class formal semantics has long handled at its "
"margins. Discourse markers are traditionally analysed as non-truth-conditional—removing “so” or "
"“you know” does not change a sentence’s truth value—and Relevance Theory treats such "
"connectives as encoding procedural rather than conceptual meaning (Blakemore, 2002). "
"Interjections are likewise characterised as content that is not truth-conditional in any way. "
"The existence of this margin is the wedge: meaning-based theory has always needed a "
"supplementary account for items whose meaning is not denotational. *6-7* simply pushes that "
"supplement to the centre.")
table('Table 2. Theories of lexical meaning and their fit for a phatic-only item.',
      ['Tradition', 'Key figures', 'Locus of meaning', 'Account of “6-7”'],
      [['Referential / truth-conditional', 'Frege; Davidson', 'Reference; contribution to truth conditions', 'No content; not truth-apt'],
       ['Lexical semantics', 'Cruse; Jurafsky & Martin', 'Sense and sense-relations', 'No sense; enters no relations'],
       ['Use theory', 'Wittgenstein', 'Use within language-games', 'Meaning *is* its use'],
       ['Usage-based / construction grammar', 'Firth; Bybee; Goldberg', 'Conventionalised form–function pairing', 'Form paired with a social function'],
       ['Expressive / use-conditional', 'Kaplan; Potts; Gutzmann', 'Speaker attitude / affect', 'Expressive interjection'],
       ['Indexical / third-wave', 'Silverstein; Eckert', 'Social indexing of identity/stance', 'Indexes in-group membership']],
      widths=[1.6, 1.3, 1.7, 1.6])
figure('fig3_cline.png',
       'Figure 3. A cline of lexical meaning from referential to phatic, locating “6-7.”')

# ===== 6. THE CHALLENGE =====
h1('6. Phatic-Only Slang Against Meaning-Based Theory')
h2('6.1 The convergent expert verdict')
body("Independent commentators have reached the same conclusion using overlapping vocabulary "
"(Table 1). The agreement is notable: every analyst relocates the term’s value from *denotation* "
"to *social contact, identity, and affect*—that is, to the phatic and expressive dimensions.")
table('Table 1. Convergent expert characterizations of “6-7.”',
      ['Commentator (affiliation)', 'Characterization of the term', 'Source'],
      [['Taylor Jones (Univ. of Pennsylvania)', '“Semantically … almost void”; a “shibboleth” marking in-group membership; product of “semantic bleaching”', 'CNN (2025)'],
       ['Valerie Fridland (Univ. of Nevada, Reno)', '“Void of any semantic meaning”; “makes sense” through social, not referential, meaning', 'Fridland (2026)'],
       ['Adam Aleksic (“Etymology Nerd”)', '“Six-seven doesn’t need to have a meaning. What matters is that it lands and provokes a reaction”', 'Today (2024)'],
       ['Cynthia Gordon (Georgetown Univ.)', 'Trend “oriented to humor and play”; “only humorous … if a group of people are ‘insiders’”', 'Georgetown University (2025)'],
       ['Steve Johnson (Dictionary.com)', 'An interjection; “a burst of energy that spreads and connects people long before anyone agrees on what it actually means”', 'Smithsonian Magazine (2025)']],
      widths=[1.9, 3.0, 1.0])
h2('6.2 Semantic bleaching at internet speed')
body("Semantic bleaching—the loss of denotational content while form and function persist—is a "
"well-attested diachronic process. What *6-7* illustrates is bleaching compressed from centuries "
"into months: the term arguably entered circulation already bleached, its tenuous link to a song "
"lyric and a height statistic severed almost immediately (CNN, 2025). A comparable, slightly "
"earlier case is “yeet,” which University of Colorado Boulder (2021) linguists analysed as "
"undergoing “indexical bleaching” as it spread from African American English and attached "
"primarily to gesture and stance. Internet circulation thus functions as a high-speed laboratory "
"for processes historical linguistics usually observes only in slow motion.")
h2('6.3 Expressive meaning and descriptive ineffability')
body("The most precise formal home for *6-7* is the expressivist strand of semantics. Kaplan’s "
"(1999) “The Meaning of ‘Ouch’ and ‘Oops’” treats interjections as evidence for a semantics of "
"meaning as use, distinguishing expressive content (which displays a speaker’s attitude) from "
"descriptive, truth-apt content. Potts (2005, 2007) develops this into a systematic account of "
"expressives as contributing non-truth-conditional, speaker-oriented meaning—what Kaplan (1999) "
"and Gutzmann (2015) call use-conditional meaning—independent of at-issue content. Potts’s "
"diagnostic properties map onto *6-7* with uncanny precision (Table 3); descriptive "
"ineffability—speakers are never fully satisfied paraphrasing an expressive and resort instead to "
"examples of use—is exactly the behaviour of teenagers and lexicographers confronted with *6-7*. "
"That a dictionary’s "
"best account is “impossible to define … but meaningful to the people who use it” is the textbook "
"signature of expressive (use-conditional) meaning.")
table('Table 3. Potts’s (2007) diagnostic properties of expressives mapped onto “6-7.”',
      ['Property', 'Definition (Potts, 2007)', 'Manifestation in “6-7”'],
      [['Independence', 'Expressive content is *largely* independent of—and does not affect—the at-issue/descriptive content', 'Adds no proposition to any sentence it punctuates'],
       ['Nondisplaceability', 'Predicates something of the here-and-now of utterance', 'Performs the present moment; cannot report a past “6-7”'],
       ['Perspective dependence', 'Tied to a perspective, usually the speaker’s', 'Signals the speaker’s stance/affiliation, not a fact'],
       ['Descriptive ineffability', 'Speakers are never *fully satisfied* paraphrasing it in descriptive (non-expressive) terms', 'Defined by *when* it is said, not *what* it denotes'],
       ['Immediacy', 'Performs an act rather than describing one', 'Saying it *is* the social act'],
       ['Repeatability', 'Repetition strengthens rather than becoming redundant', 'Chanted, echoic deployment in classrooms and arenas']],
      widths=[1.4, 2.7, 2.4])
h2('6.4 Indexicality and third-wave sociolinguistics')
body("If *6-7* is not denotational, what *is* its meaning? Sociolinguistics answers: indexical. "
"Silverstein’s (2003) indexical order holds that forms acquire social meaning by indexing "
"macro-social categories in micro-level interaction. Eckert (2008, 2018) argues that the "
"meanings of linguistic variables are not fixed denotations but an *indexical field*—a "
"constellation of ideologically related meanings activated in situated use to construct identity "
"and signal stance. On this view the “meaning” of *6-7* just *is* its indexing of Generation "
"Alpha in-group membership, playful stance, and shared participation: real, learnable, and "
"socially consequential, yet categorically different from reference.")
h2('6.5 Slang as solidarity, and the anti-language')
body("The sociology of slang independently predicts items like *6-7*. Eble (1996) identifies the "
"central purposes of slang as “cementing group identity and opposing authority,” with slang "
"“deliberately chosen … to mark … inclusion in … a social group.” Halliday’s (1976) "
"anti-language describes how oppositional groups generate vocabulary that “serves to create and "
"maintain social structure through conversation,” often via overlexicalization. *6-7*, as a "
"shibboleth that bonds adolescents and irritates authority figures, performs this prototypical "
"solidarity-and-opposition function with denotational content reduced essentially to zero.")
h2('6.6 Memetics and internet linguistics')
body("Finally, the mechanism of *6-7*’s spread is memetic rather than semantic. Dawkins (1976) "
"coined “meme” as “a unit of cultural transmission, or a unit of imitation” propagating by "
"copying—by replication, not by conveying fixed content. McCulloch (2019) shows that the "
"“artfully disarrayed” form of animal-meme language made it “more likely to spread,” attributing "
"virality to sound, form, and play rather than semantic payload. *6-7* spreads as Dawkinsian "
"imitation: a catchy form plus a gesture, replicating because it is “just funny to say.” The "
"broader “brainrot” lexicon—*skibidi* (a “pseudo word,” per Aleksic), *Ohio*, *gyat*—populates "
"the same category, and Oxford’s selection of “brain rot” as its 2024 Word of the Year marks the "
"cultural recognition of deliberately contentless online language (Oxford University Press, 2024; "
"Today, 2024). Figure 4 summarises the disciplinary convergence.")
figure('fig4_convergence.png',
       'Figure 4. Disciplinary convergence on phatic-only language as social rather than denotational.')

# ===== 7. DISCUSSION =====
h1('7. Discussion')
h2('7.1 The lexicographic paradox as a category signal')
body("The headline irony—a dictionary crowning a word it cannot define—dissolves once the term "
"is correctly categorised. Dictionary.com’s gloss (“meaningless, ubiquitous, and nonsensical … "
"still … meaningful to the people who use it because of the connection it fosters”) is a "
"near-paraphrase of Malinowski’s phatic communion and Potts’s expressive meaning. "
"Merriam-Webster’s slang entry is equally telling: it defines *six seven* as “a nonsensical "
"expression connected to a song and a basketball player” (Merriam-Webster, n.d.)—that is, by "
"*what it attaches to* rather than by what it denotes, exactly the behaviour descriptive "
"ineffability predicts. The institution of definition meets its limit not because *6-7* is "
"sub-linguistic, but because the meaning-based, definitional model of the lexicon is the wrong "
"model for this class of item.")
h2('7.2 Not a refutation but a scoping')
body("It would overreach to say *6-7* “refutes” referential or truth-conditional semantics. "
"Those theories were designed for the truth-apt, denotational core of the lexicon and remain "
"powerful there. What *6-7* does is make vivid the boundary the tradition itself acknowledges "
"through its marginal treatment of interjections and discourse markers. Meaning-based lexical "
"theory is thus locally adequate but globally incomplete: it requires supplementation by a "
"use-based conception of meaning (Wittgenstein; construction grammar), an expressive dimension "
"(Kaplan; Potts), and a social-indexical dimension (Silverstein; Eckert). *6-7* is valuable "
"precisely because it is phatic-only—a near-pure specimen that isolates these dimensions from "
"any confounding denotational content, as a controlled experiment isolates a variable.")
h2('7.3 Limitations and open questions')
body("Several caveats temper these conclusions. The phenomenon is recent and the academic "
"literature on *6-7* specifically is thin, so the analysis leans on expert commentary and the "
"application of established theory. “Meaninglessness” is, moreover, a matter of degree: *6-7* "
"retains a faint indexical sense (so-so, ambivalence) and a robust social meaning, so claims "
"that it means “nothing” should be read as “nothing *denotational*.” Phatic-only terms are "
"characteristically ephemeral; whether *6-7* lexicalises a stable sense, fades, or leaves a "
"constructional residue is an open empirical question well suited to longitudinal corpus study.")

# ===== 8. CONCLUSION =====
h1('8. Conclusion')
body("The “6-7” meme is a phatic-only slang term: an interjection whose communicative value is "
"constituted almost entirely by social contact, in-group indexing, and affective performance, "
"with denotational content bleached to near zero. Reviewed against meaning-based lexical theory, "
"it does not collapse the referential and truth-conditional tradition so much as map that "
"tradition’s edge—the same edge marked by interjections, expletives, and discourse particles. "
"The most adequate accounts come from use-based, expressivist, and social-indexical frameworks, "
"all of which permit “meaning” to be a conventionalised form–function pairing rather than a "
"form–referent pairing. That a dictionary could name “impossible to define” as the defining "
"feature of its Word of the Year is, read correctly, not a paradox but a precise empirical "
"signal: the lexicon contains words whose meaning is their use, their stance, and their power to "
"bond—and any theory that equates lexical meaning with reference will, at that boundary, run out "
"of things to say exactly where *6-7* begins.")

# ===== DECLARATIONS =====
h1('Declarations')
for label, txt in [
    ('Funding:', ' The author(s) received no specific funding for this work.'),
    ('Conflicts of interest:', ' The author(s) declare no competing interests.'),
    ('Data availability:', ' This review analyses publicly available published and web sources; '
     'no new datasets were generated or analysed.'),
    ('Methodology and AI use:', ' Source discovery and a structured adversarial verification pass '
     'were conducted with AI-assisted web search; all claims were checked against cited sources, '
     'and the author(s) take responsibility for the final content.')]:
    p = para(align=WD_ALIGN_PARAGRAPH.JUSTIFY, after=4)
    r = p.add_run(label); style_run(r, 10, True)
    add_md(p, txt, 10)

# ===== REFERENCES =====
h1('References')
REFS = [
 'Bleacher Report. (n.d.). *How NBA star LaMelo Ball accidentally sparked the TikTok “6-7” meme*. https://bleacherreport.com/articles/25240758-how-nba-star-lamelo-ball-accidentally-sparked-tiktok-6-7-meme',
 'Blakemore, D. (2002). *Relevance and linguistic meaning: The semantics and pragmatics of discourse markers*. Cambridge University Press.',
 'CNN. (2025, October 18). *The “6-7” meme can be annoying. Kids are shouting it for a reason*. https://www.cnn.com/2025/10/18/us/6-7-meme-slang-explained-cec',
 'Complex. (2025). *Skrilla’s “6-7” meme, explained*. https://www.complex.com/music/a/khal/skrilla-6-7-meme-explained',
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
 'Malinowski, B. (1923). The problem of meaning in primitive languages. In C. K. Ogden & I. A. Richards, *The meaning of meaning* (pp. 296–336). Kegan Paul.',
 'McCulloch, G. (2019). *Because internet: Understanding the new rules of language*. Riverhead Books.',
 'Merriam-Webster. (n.d.). Six seven. In *Merriam-Webster slang dictionary*. Retrieved June 4, 2026, from https://www.merriam-webster.com/slang/six-seven',
 'Miller, V. (2008). New media, networking and phatic culture. *Convergence, 14*(4), 387–400. https://doi.org/10.1177/1354856508094659',
 'Oxford University Press. (2024). *“Brain rot” named Oxford word of the year 2024*. https://corp.oup.com/news/brain-rot-named-oxford-word-of-the-year-2024/',
 'Potts, C. (2005). *The logic of conventional implicatures*. Oxford University Press.',
 'Potts, C. (2007). The expressive dimension. *Theoretical Linguistics, 33*(2), 165–198. https://doi.org/10.1515/TL.2007.011',
 'Silverstein, M. (2003). Indexical order and the dialectics of sociolinguistic life. *Language & Communication, 23*(3–4), 193–229. https://doi.org/10.1016/S0271-5309(03)00013-2',
 'Smithsonian Magazine. (2025, October 30). *The term “67” is impossible to define. It just became Dictionary.com’s word of the year for 2025*. https://www.smithsonianmag.com/smart-news/the-term-67-is-impossible-to-define-it-just-became-dictionary-coms-word-of-the-year-for-2025-180987650/',
 'Stanford Encyclopedia of Philosophy. (n.d.). *Word meaning*. https://plato.stanford.edu/entries/word-meaning/',
 'Today. (2024, June 27). *What does “skibidi” mean?* https://www.today.com/parents/teens/skibidi-slang-meaning-rcna153557',
 'University of Colorado Boulder. (2021, May 3). *To “yeet” or not to “yeet”: African American slang beyond Vine*. https://www.colorado.edu/linguistics/2021/05/03/yeet-or-not-yeet-african-american-slang-beyond-vine',
 'WHYY. (2025). *The meaning of “6-7” and its Philadelphia roots*. https://whyy.org/articles/meaning-6-7-skrilla-philadelphia/',
 'Wikipedia contributors. (n.d.-a). 6-7 (meme). In *Wikipedia*. Retrieved June 4, 2026, from https://en.wikipedia.org/wiki/6-7_(meme)',
 'Wikipedia contributors. (n.d.-b). Doot doot (6 7). In *Wikipedia*. Retrieved June 4, 2026, from https://en.wikipedia.org/wiki/Doot_Doot_(6_7)',
 'Wittgenstein, L. (1953). *Philosophical investigations* (G. E. M. Anscombe, Trans.). Blackwell.',
]
for ref in REFS:
    p = para(after=4)
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)
    add_md(p, ref, 10)

doc.save(OUT)
print("Saved", OUT)
