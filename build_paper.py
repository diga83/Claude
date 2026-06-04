#!/usr/bin/env python3
"""Build the narrative-review manuscript as a .docx, matching the supplied template:
Letter page / 1in margins / Times New Roman 11; structured abstract; numbered
Heading 1 (13 bold) and Heading 2 (12 bold italic); bordered tables with shaded
header (#D9E2EC); 6.15in centred figures with 9pt bold captions; Declarations;
hanging-indent references (10pt)."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

FIG = "/home/user/Claude/figures"
doc = Document()

# ---------- document defaults: Times New Roman 11, en-GB ----------
def set_default_font(document, name="Times New Roman", half_pt=22, lang="en-GB"):
    styles_el = document.styles.element
    dd = styles_el.find(qn("w:docDefaults"))
    if dd is None:
        dd = OxmlElement("w:docDefaults"); styles_el.insert(0, dd)
    rpd = dd.find(qn("w:rPrDefault"))
    if rpd is None:
        rpd = OxmlElement("w:rPrDefault"); dd.append(rpd)
    rpr = rpd.find(qn("w:rPr"))
    if rpr is None:
        rpr = OxmlElement("w:rPr"); rpd.append(rpr)
    rf = OxmlElement("w:rFonts")
    for a in ("w:ascii","w:eastAsia","w:hAnsi","w:cs"):
        rf.set(qn(a), name)
    rpr.append(rf)
    sz = OxmlElement("w:sz"); sz.set(qn("w:val"), str(half_pt)); rpr.append(sz)
    szcs = OxmlElement("w:szCs"); szcs.set(qn("w:val"), str(half_pt)); rpr.append(szcs)
    lg = OxmlElement("w:lang"); lg.set(qn("w:val"), lang); rpr.append(lg)

set_default_font(doc)

normal = doc.styles["Normal"]
normal.font.name = "Times New Roman"
normal.font.size = Pt(11)
pf = normal.paragraph_format
pf.line_spacing_rule = WD_LINE_SPACING.SINGLE
pf.space_after = Pt(6)

h1 = doc.styles["Heading 1"]
h1.font.name = "Times New Roman"; h1.font.size = Pt(13); h1.font.bold = True
h1.font.italic = False; h1.font.color.rgb = RGBColor(0,0,0)
h1.paragraph_format.space_before = Pt(14); h1.paragraph_format.space_after = Pt(7)
h1.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE

h2 = doc.styles["Heading 2"]
h2.font.name = "Times New Roman"; h2.font.size = Pt(12); h2.font.bold = True
h2.font.italic = True; h2.font.color.rgb = RGBColor(0,0,0)
h2.paragraph_format.space_before = Pt(10); h2.paragraph_format.space_after = Pt(5)
h2.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE

# page size Letter, 1in margins
sec = doc.sections[0]
sec.page_width = Inches(8.5); sec.page_height = Inches(11)
for m in ("left_margin","right_margin","top_margin","bottom_margin"):
    setattr(sec, m, Inches(1))

# ---------- helpers ----------
def para(text=None, justify=True, size=None, bold=False, italic=False,
         after=6, before=0, align=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.space_before = Pt(before)
    if align is not None:
        p.alignment = align
    elif justify:
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if text is not None:
        r = p.add_run(text)
        if size: r.font.size = Pt(size)
        r.bold = bold; r.italic = italic
    return p

def runs_para(segments, justify=True, size=10, after=6):
    """segments: list of (text, bold, italic)."""
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY if justify else WD_ALIGN_PARAGRAPH.LEFT
    for t,b,i in segments:
        r = p.add_run(t); r.font.size = Pt(size); r.bold = b; r.italic = i
    return p

def H1(t): doc.add_heading(t, level=1)
def H2(t): doc.add_heading(t, level=2)

def figure(img, caption):
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(8); p.paragraph_format.space_after = Pt(3)
    p.add_run().add_picture(img, width=Inches(6.15))
    c = doc.add_paragraph(); c.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    c.paragraph_format.space_after = Pt(10)
    head, rest = caption.split(". ", 1)
    r1 = c.add_run(head + ". "); r1.bold = True; r1.font.size = Pt(9)
    r2 = c.add_run(rest); r2.bold = True; r2.font.size = Pt(9)

def _shade(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), fill)
    tcPr.append(shd)

def _set_cell(cell, text, bold=False, size=9.5, align=WD_ALIGN_PARAGRAPH.LEFT):
    p = cell.paragraphs[0]
    for r in list(p.runs):
        r._element.getparent().remove(r._element)
    p.alignment = align
    p.paragraph_format.space_after = Pt(2); p.paragraph_format.space_before = Pt(2)
    r = p.add_run(text); r.bold = bold; r.font.size = Pt(size); r.font.name = "Times New Roman"

def table_caption(caption):
    c = doc.add_paragraph(); c.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    c.paragraph_format.space_before = Pt(8); c.paragraph_format.space_after = Pt(3)
    head, rest = caption.split(". ", 1)
    r1 = c.add_run(head + ". "); r1.bold = True; r1.font.size = Pt(9.5)
    r2 = c.add_run(rest); r2.font.size = Pt(9.5)

def make_table(headers, rows, widths=None):
    t = doc.add_table(rows=1, cols=len(headers))
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    # borders
    tblPr = t._tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top","left","bottom","right","insideH","insideV"):
        e = OxmlElement(f"w:{edge}")
        e.set(qn("w:val"),"single"); e.set(qn("w:sz"),"4")
        e.set(qn("w:space"),"0"); e.set(qn("w:color"),"auto")
        borders.append(e)
    tblPr.append(borders)
    for j,h in enumerate(headers):
        _set_cell(t.rows[0].cells[j], h, bold=True, size=9.5)
        _shade(t.rows[0].cells[j], "D9E2EC")
    for row in rows:
        cells = t.add_row().cells
        for j,val in enumerate(row):
            _set_cell(cells[j], val, bold=False, size=9.5)
    if widths:
        for j,w in enumerate(widths):
            for r in t.rows:
                r.cells[j].width = Inches(w)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    return t

def ref(text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)
    p.paragraph_format.line_spacing = 1.25
    p.paragraph_format.space_after = Pt(5)
    r = p.add_run(text); r.font.size = Pt(10)

# ================= TITLE BLOCK =================
para("Teaching Academic Writing in the Age of Generative AI: A Narrative Review of "
     "Process Pedagogy, Feedback, and Authorial Agency",
     justify=False, size=16, bold=True, after=10, align=WD_ALIGN_PARAGRAPH.CENTER)
para("Author Name ¹*", justify=False, size=12, after=2, align=WD_ALIGN_PARAGRAPH.CENTER)
para("¹ Affiliation / Department, Institution, City, Country   *Corresponding author: email@institution.edu",
     justify=False, size=10, after=12, align=WD_ALIGN_PARAGRAPH.CENTER)

# ================= ABSTRACT =================
para("Abstract", justify=False, size=12, bold=True, after=4)
abstract = [
 ("Background. ", True, True),
 ("Reviews of generative artificial intelligence (GenAI) in higher-education writing have "
  "concentrated on two questions—how students use these tools and how their use threatens academic "
  "integrity—leaving the teaching dimension, namely how writing instruction itself is being "
  "redesigned, comparatively under-theorised and unconsolidated. ", False, False),
 ("Objective. ", True, True),
 ("This narrative review synthesises pedagogy- and theory-facing scholarship to construct an "
  "integrative framework for AI-aware writing instruction that is distinct from the student-use and "
  "integrity reviews already published. ", False, False),
 ("Methods. ", True, True),
 ("A structured, non-systematic narrative synthesis of approximately fifty conceptual and empirical "
  "sources (2022–2026)—spanning automated writing evaluation, feedback literacy, authorial voice and "
  "agency, process pedagogy, and learning theory—was read thematically across three openings: AI "
  "feedback as pedagogy, voice and agency as instructional aims, and the field's theoretical "
  "fragmentation. ", False, False),
 ("Findings. ", True, True),
 ("AI feedback is strongest at the surface level of language and weakest where rhetorical judgement is "
  "required, and is most defensible when embedded in structures that demand student evaluative "
  "judgement. Authorial ownership and durable learning are sensitive to where and how AI intervenes: "
  "ideation-stage, scaffolded, and documented configurations preserve agency, whereas text-generative "
  "automation erodes it and can yield product gains without learning gains. The literature is "
  "empirically active but draws piecemeal on incompatible theories of agency. ", False, False),
 ("Contribution. ", True, True),
 ("We propose the stance–structure continuum, a framework that positions theoretical stance "
  "(instrumental–mediational to relational–distributed) against instructional structure (the locus, "
  "scaffolding, and documentation of human–AI composing), with feedback literacy and authorial agency "
  "as the outcome layer. ", False, False),
 ("Conclusions. ", True, True),
 ("The framework reframes GenAI from a threat to be policed into a site for teaching rhetorical "
  "judgement, voice, and feedback literacy, and offers instructors and researchers a shared vocabulary "
  "for designing and studying AI-aware writing instruction.", False, False),
]
runs_para(abstract, size=10, after=8)
runs_para([("Keywords: ", True, False),
           ("generative AI; writing pedagogy; academic writing; feedback literacy; authorial agency; "
            "process pedagogy; sociocultural theory; posthumanism; higher education", False, False)],
          size=10, after=10)

# ================= 1. INTRODUCTION =================
H1("1. Introduction")
para("Within months of the public release of ChatGPT in late 2022, the teaching of academic writing "
  "was described, in turn, as obsolete, endangered, and transformed. Commentators announced “the end "
  "of the essay”; institutions scrambled to draft detection policies; and a rapidly growing scholarly "
  "literature set out to measure what students were doing with the new tools and whether it constituted "
  "cheating. Two framings have dominated this first wave of research. The first treats GenAI primarily "
  "as a student behaviour to be characterised—documenting patterns of use, perceptions, and "
  "self-reported benefits and risks. The second treats GenAI primarily as a threat to academic "
  "integrity, foregrounding plagiarism, authorship disclosure, and the often unreliable detection of "
  "machine-generated text. Both framings are important, and both have generated valuable syntheses. Yet "
  "both share a common feature: they position the student, not the teacher, as the unit of analysis, and "
  "they ask what writers do with AI rather than how writing is—or should be—taught when AI is in the "
  "room.")
para("This review takes the teaching dimension as its object. Our premise is that the most consequential "
  "questions raised by GenAI for higher education are pedagogical and theoretical, not merely "
  "behavioural or regulatory. When a tool can produce a competent draft from a one-line prompt, the "
  "long-standing rationale for teaching writing as a recursive process of planning, drafting, and "
  "revision is destabilised (Elturki, 2026); when that tool also delivers fluent, instant commentary on "
  "student texts, the economy of classroom feedback is reorganised (Crosthwaite & Sun, 2026); and when "
  "authorship becomes distributed across human and machine contributors, the cultivation of a writer's "
  "voice and agency—historically a central aim of writing instruction—can no longer be assumed as a "
  "by-product of composing alone (Godwin-Jones, 2024; Joshi & Vogel, 2025).")
para("Three specific openings motivate this synthesis. First, AI-mediated feedback is now an empirically "
  "active area—spanning automated writing evaluation (AWE), combined instructor-plus-AI feedback, and "
  "student revision behaviour—yet it has not been consolidated through a feedback-literacy lens. Second, "
  "authorship and voice are discussed almost exclusively as integrity problems rather than as "
  "pedagogical aims, that is, as capacities that instruction can deliberately cultivate within human–AI "
  "composing (Burriss & Leander, 2024; Sandstead & Kibler, 2025). Third, the field is theoretically "
  "fragmented, drawing in piecemeal fashion on process pedagogy, sociocultural theory, posthumanism, and "
  "feedback literacy, with no integrative framework for AI-aware writing instruction (Chen et al., 2025; "
  "Jeon & Lee, 2026). Accordingly, this article makes a pedagogy-and-theory-centred contribution, "
  "organised around three research questions: (RQ1) How is AI-mediated feedback functioning as "
  "pedagogy, and how might a feedback-literacy lens reframe it? (RQ2) How can writing instruction "
  "cultivate authorial voice and agency within human–AI composing? (RQ3) Can the field's fragmented "
  "theoretical resources be integrated into a single framework for AI-aware writing instruction? We "
  "argue that one principle unifies the strongest findings across all three: the locus and structure of "
  "AI intervention, not its presence or quantity, determines whether instruction cultivates or erodes "
  "writerly capacity (Fan et al., 2025; Siddiqui et al., 2025).")

# ================= 2. METHODS =================
H1("2. Methods")
H2("2.1 Review design and search strategy")
para("This study adopts a structured narrative (interpretive) review design rather than a systematic or "
  "meta-analytic one, because our aim is conceptual integration across heterogeneous literatures rather "
  "than the estimation of a pooled effect or an exhaustive accounting of a bounded corpus. Narrative "
  "review is appropriate when a field is theoretically fragmented and the reviewer's contribution lies "
  "in synthesising disparate traditions into a coherent framework. Five thematic search angles were "
  "defined to mirror the three openings and their theoretical underpinnings: (i) AI-mediated feedback "
  "and AWE; (ii) authorial voice and agency; (iii) process pedagogy reworked for GenAI; (iv) "
  "theoretical frameworks (sociocultural, posthuman, activity-theoretic); and (v) existing reviews, to "
  "position the contribution. Searches combined three term clusters—technology (“generative AI,” "
  "“ChatGPT,” “large language model,” “automated writing evaluation”), instructional object "
  "(“writing instruction,” “academic writing,” “written feedback,” “revision”), and lens "
  "(“feedback literacy,” “authorial voice,” “agency,” “process pedagogy,” “sociocultural,” "
  "“posthuman”)—across Scopus, Web of Science, ERIC, and Google Scholar, supplemented by citation "
  "chaining and hand-searching of leading venues.")
H2("2.2 Source selection")
para("Sources were retained on the basis of relevance to one or more research questions, recency "
  "(2022–2026 for the GenAI literature), and venue quality, prioritising peer-reviewed empirical "
  "studies and conceptual contributions in journals such as Computers and Composition, the Journal of "
  "Second Language Writing, Assessing Writing, Assessment & Evaluation in Higher Education, Computer "
  "Assisted Language Learning, Language Learning & Technology, the RELC Journal, and the British Journal "
  "of Educational Technology. Foundational works in writing studies and learning theory (Emig, 1977; "
  "Flower & Hayes, 1981; Ivanič, 1998; Vygotsky, 1978) were included where the contemporary literature "
  "reworks them. Consistent with narrative-review practice, inclusion was purposive rather than "
  "exhaustive; we deliberately retained sources that frame voice and agency as compliance problems, "
  "because the asymmetry between that dominant framing and the minority treating them as pedagogical "
  "aims is itself part of our argument.")
H2("2.3 Analytic approach")
para("The corpus was read thematically. Each source was coded for its pedagogical focus (feedback, "
  "agency, process), its theoretical commitments, its empirical warrant where applicable (design, "
  "sample, key finding), and the gaps its authors identify. We then synthesised across these codes to "
  "construct the integrative framework presented in Section 7. To mitigate the risk of citing "
  "misattributed findings, all quantitative claims and the metadata of all cited works were verified "
  "against the primary publisher record. Two limitations of scope, returned to in Section 9, are noted "
  "at the outset: the evidence base skews toward second-language (L2) and English-as-a-foreign-language "
  "(EFL) writing contexts and toward English-medium instruction.")

# ================= 3. THE GAP =================
H1("3. The Review Landscape and the Pedagogical Lacuna")
para("To establish the contribution of a teaching-and-theory synthesis, it is necessary to characterise "
  "what existing reviews do and do not cover. The published review literature on GenAI in writing "
  "clusters into four buckets (Figure 1), none of which consolidates the teaching dimension in the "
  "integrated way we propose.")
figure(f"{FIG}/figure2_gap_map.png",
       "Figure 1. The review landscape and the pedagogical lacuna. Existing reviews consolidate student "
       "use, academic integrity, feedback effects, and general adoption; the teaching-and-theory "
       "synthesis advanced here addresses three unfilled openings.")
H2("3.1 Student use and academic integrity")
para("The first and largest bucket documents student use and its risks. Syntheses of recent evidence "
  "report that GenAI can improve the cohesion, clarity, and fluency of student writing while raising "
  "concerns about over-reliance, diminished creativity, and unequal access, and they conclude—typically "
  "as a closing recommendation rather than a developed model—that such tools work best within "
  "“guided, reflective pedagogy” (Sanz-Tejeda et al., 2026). The second bucket centres academic "
  "integrity. Systematic reviews in this vein synthesise how GenAI influences academic honesty, find "
  "that institutions lack consistent guidelines, and discuss redesigned assessment methods, "
  "detection tools, and ethical guidelines as the principal responses (Bittle & El-Gayar, 2025). "
  "Crucially, this bucket frames those responses through an integrity-policing lens: the problem to be "
  "solved is the detection and deterrence of misconduct, not the cultivation of writing ability.")
H2("3.2 Feedback effects and writing-instruction reviews")
para("A third bucket synthesises the effects of AI-mediated feedback. Meta-analyses report sizeable "
  "average effects of AWE on writing quality (Zhai & Ma, 2023), and a PRISMA-informed scoping review of "
  "51 GenAI L2 written-feedback studies finds that most research addresses improvements to writing "
  "quality and stakeholder perceptions, with varied uptake and revision behaviour (Crosthwaite & Sun, "
  "2026). These are reviews of feedback effects and tool functionality; they do not theorise feedback "
  "as a learnable competency. A fourth, smaller bucket comes closest to our concern. Xiao et al.'s "
  "(2025) scoping review of ChatGPT-powered EFL writing instruction—the most pedagogy-proximate review "
  "we identified—analysed 16 empirical studies and concluded that the field remains at the stage of "
  "“initial potential and applications,” EFL-bounded and lacking longitudinal evidence. The two most "
  "recent and adjacent reviews illustrate the boundary precisely. Abdellatif et al. (2026) "
  "systematically review 19 studies on writing assessment in the AI era and call to “move beyond "
  "detection toward comprehensive pedagogical redesign,” but their synthesis is assessment-centric and "
  "offers neither a feedback-literacy lens nor an account of authorial agency. Slimi (2026) reviews "
  "GenAI's impact on authorship, pedagogy, and integrity, but treats these as four parallel thematic "
  "strands rather than integrating them into a single pedagogical framework.")
H2("3.3 The lacuna")
para("Read together, these reviews leave three openings unfilled. On the teaching dimension, none "
  "delivers a consolidated account of how writing instruction—across feedback, voice, and process—is "
  "being reworked. On feedback, the syntheses are effect-size and perception focused; the construct of "
  "feedback literacy (Carless & Boud, 2018), although directly applicable, is largely absent. On "
  "authorship, agency appears as a student concern or as one theme among many, never as an instructional "
  "objective that drives design.")
para("Frameworks have begun to appear, but they occupy a different register from the synthesis attempted "
  "here. Several are competency taxonomies that classify what learners should know: Giray's (2025) "
  "adaptation of Selber's multiliteracies to academic writing distinguishes functional, critical, and "
  "rhetorical AI literacies, while Wang and Wang's (2025) empirically grounded APSE model specifies four "
  "dimensions of L2 writers' critical AI literacy—awareness, positionality, strategy, and evaluation. "
  "Others are general learning-loop architectures: the AI-Educational Development Loop (Yu et al., 2026) "
  "bridges classical educational theories with human-in-the-loop AI for feedback-sensitive tasks, and "
  "practitioner rubrics such as the VAPOR heuristic (Online Learning Consortium, 2026) help students "
  "monitor authorial markers while composing with AI. Each is valuable, but each addresses a part of the "
  "problem—learner competencies, a generic feedback loop, or an authorial-voice checklist—rather than "
  "consolidating how writing instruction is being redesigned across feedback, voice, and process, and "
  "none resolves the field's theoretical fragmentation. The contribution of this review is therefore "
  "specific: not the first framework for AI in writing, but the first to integrate the teaching "
  "literature across these three strands and to recast the field's rival theories of agency as poles of "
  "a single design-and-theory continuum. The remainder of this article develops that synthesis.")

# ================= 4. FEEDBACK =================
H1("4. AI-Mediated Feedback as Pedagogy: A Feedback-Literacy Lens")
H2("4.1 The effect-size base and the surface–deep divide")
para("The evidentiary base for AI-mediated feedback is, on its surface, encouraging. Zhai and Ma's "
  "(2023) meta-analysis of 26 studies (N = 2,468) reported a large overall effect of AWE on writing "
  "quality (g = 0.861, p < .001), with stronger effects for post-secondary than secondary students, for "
  "EFL/ESL than first-language writers, and for argumentative over other genres. Yet aggregate effects "
  "conceal a qualitative pattern that recurs across the recent GenAI literature: AI feedback is "
  "strongest at the surface level of language—grammar, mechanics, lexis—and, for generative chat, at "
  "the level of organisation, while it is weakest precisely where higher-order rhetorical judgement is "
  "required. Crosthwaite and Sun's (2026) scoping review of 51 L2 written-feedback studies documents "
  "improvements in writing quality alongside persistent reservations about deeper, context-sensitive "
  "revision, for which students and instructors continue to regard human feedback as indispensable. The "
  "pedagogical implication is that the value of AI feedback is not self-executing: a tool that reliably "
  "flags surface error but unreliably addresses argument can either support or stunt development, "
  "depending on how its use is taught.")
H2("4.2 From feedback provision to feedback literacy")
para("This is where the construct of student feedback literacy becomes indispensable—and where the "
  "existing reviews are silent. Carless and Boud (2018) define feedback literacy as the capacities and "
  "dispositions that enable students to make sense of and use feedback to improve their work, organised "
  "around four features: appreciating feedback, making judgements, managing affect, and taking action. "
  "Their central claim is that the primary barrier to feedback uptake is not the quality of the feedback "
  "but students' capacity to engage with it productively. Transposed to GenAI, this reframes the "
  "research question: the pertinent issue is not only whether ChatGPT can generate accurate commentary, "
  "but whether students can appreciate its affordances and limits, judge its suggestions against "
  "rhetorical goals, manage the affective experience of an always-available evaluator, and translate its "
  "output into principled revision.")
para("The emerging engagement literature suggests that, left untaught, these capacities are fragile. Yan "
  "and Zhang's (2024) mixed-method multiple case study of four L2 writers using ChatGPT as a provider of "
  "automated written corrective feedback found that behavioural engagement varied with learners' "
  "language proficiency and technological competence, that participants frequently failed to regulate "
  "their learning metacognitively, and that the tool created an affectively engaging but cognitively "
  "demanding and time-consuming environment. The pattern is telling: an abundance of fluent feedback did "
  "not translate into deep engagement, and learners without metacognitive scaffolding tended toward "
  "superficial uptake. This implies that instruction must now cultivate a recognisably extended feedback "
  "literacy—one that adds the evaluation of machine-generated commentary, the construction of effective "
  "prompts, and ethical judgement about when and how to act on AI suggestions to Carless and Boud's "
  "original four features.")
H2("4.3 Hybrid feedback and the redistribution of feedback labour")
para("If AI feedback excels at surface concerns and human feedback at rhetorical ones, the pedagogical "
  "question becomes one of orchestration rather than substitution. A consistent finding is that hybrid "
  "configurations—combining instructor or peer feedback with AI feedback—outperform either alone, and "
  "that the two sources tend to be complementary rather than redundant. Engeness and Gamlem (2025), "
  "working from a Vygotskian and Galperinian cultural-historical perspective, theorise AI-generated "
  "feedback as a cultural tool within an Assessment-for-Learning process and derive design principles "
  "for AI environments (instantiated in their Essay Assessment Technology) that structure feedback "
  "across language, content, and organisation so as to support internalisation rather than dependency. "
  "The PAIRR model—Peer and AI Review plus Reflection—developed by Sperber et al. (2025) across "
  "composition and writing-intensive courses, pairs AI feedback with traditional peer review and a "
  "reflective component; the authors report that AI and peer feedback were often mutually reinforcing, "
  "that divergences proved complementary, and, importantly, that the act of evaluating AI output itself "
  "built students' AI literacy and ethical judgement. The design principle that emerges is that AI "
  "feedback is most defensible pedagogically when it is embedded in a structure that requires students "
  "to exercise evaluative judgement over it—precisely the judgement-making feature at the heart of "
  "feedback literacy—rather than to receive it passively.")

# ================= 5. VOICE & AGENCY =================
H1("5. Authorial Voice and Agency as a Pedagogical Aim")
H2("5.1 From integrity panic to agency cultivation")
para("The second opening concerns how the literature treats authorship. Here an asymmetry is striking. "
  "The dominant discourse positions authorship as a compliance problem: the challenge is to attribute, "
  "disclose, or detect AI contribution, and the governing anxiety is that GenAI “blurs the lines” of "
  "who wrote what. Slimi's (2026) critical review captures this centre of gravity, identifying the "
  "reconfiguration of authorship and attribution, and the dynamics of integrity, trust, and detection, "
  "as two of its four dominant themes. This framing is not wrong, but it is partial. It treats voice and "
  "authorship as something to be protected from contamination rather than as capacities to be developed, "
  "and in doing so it sidelines a question that is, pedagogically, more fundamental: how can writing "
  "instruction cultivate authorial agency and voice when students legitimately compose with AI?")
H2("5.2 Voice as jointly constructed—and therefore teachable")
para("A minority but growing strand answers that question by treating voice and agency as instructional "
  "aims. Its theoretical resources predate GenAI. Ivanič's (1998) account of writing and identity holds "
  "that the discoursal self a writer constructs in a text is assembled from socially available "
  "linguistic and rhetorical resources, and that voice is not the sole possession of an autonomous "
  "author but is jointly constructed in the interaction of writer and reader. This is consequential for "
  "the AI debate, because it means that distributed authorship is not a rupture introduced by machines "
  "but an intensification of a condition that always obtained. Sandstead and Kibler (2025), writing on "
  "voice in L2 writing in the age of AI, treat voice as the presence of the author's identity in the "
  "text, argue that it is a necessary construct for discussions of AI and writing, and observe that "
  "GenAI tends to “gloss over” the idiosyncratic linguistic and rhetorical choices through which "
  "writer identity becomes legible—with the corollary that lower-proficiency students, who may trust AI "
  "output more readily, are most at risk of having their emerging voice overwritten. If voice is jointly "
  "constructed and can be masked, it can also be taught; the instructional task is to make rhetorical "
  "choice-making visible and to position the student as the agent who authorises, rejects, or adapts AI "
  "contributions. Godwin-Jones (2024) supplies the complementary concept: agency in AI-mediated learning "
  "is emergent and distributed among teachers, students, and tools, and tasks can be designed to balance "
  "student control with AI support so that the learner remains the orchestrating agent.")
H2("5.3 The locus-of-intervention evidence")
para("What elevates this strand from exhortation to design science is a small but pointed body of "
  "experimental evidence indicating that authorial ownership and agency are sensitive to where and how "
  "AI intervenes in the writing process. Joshi and Vogel (2025) show across two experiments that writing "
  "with AI lowers psychological ownership of the resulting text, but that longer, more elaborated "
  "prompts raise ownership (with benefits plateauing once a prompt reaches roughly 75–100% of the target "
  "length); they further demonstrate a simple interface intervention—requiring a press-and-hold to "
  "submit very short prompts—that nudges users toward the more elaborated input associated with greater "
  "ownership. Siddiqui et al. (2025) report a randomised controlled trial (N = 90) comparing a "
  "chat-based LLM assistant, an integrated tool that scaffolds distinct writing subprocesses, and a "
  "no-AI control; students using the integrated, subprocess-targeted tool exhibited greater agency over "
  "their writing and deeper knowledge transformation than those using the generic chat assistant. The "
  "convergent message is that it is the locus and structure of AI support—ideation versus sentence "
  "generation, integrated subprocess scaffolding versus open-ended chat, elaborated versus minimal "
  "prompting—rather than the simple fact of AI use, that determines whether composing builds or erodes "
  "the writer's sense of authorship. Agency, in short, is a design variable, and therefore a teachable "
  "one.")

# ================= 6. PROCESS & THEORY =================
H1("6. Reworking Process Pedagogy and Theoretical Fragmentation")
H2("6.1 Process pedagogy after the collapse of the draft")
para("The third opening concerns the process tradition that has anchored writing instruction for half a "
  "century. Emig's (1977) argument that writing is a unique mode of learning, and Flower and Hayes's "
  "(1981) cognitive-process model of recursive planning, translating, and reviewing, established the "
  "rationale for teaching writing as a process: the labour of drafting and revision is not a means to a "
  "product but the site where thinking is formed. GenAI unsettles this rationale at its root, because it "
  "can deliver a polished draft before any of that labour has occurred. Elturki (2026) names the "
  "resulting tension directly and proposes a “Process Pedagogy 2.0”: an AI-aware reorientation, "
  "grounded in posthumanism and postplagiarism, that centres human decision-making, rhetorical "
  "reasoning, and ethical engagement within hybrid human–AI writing ecologies, and that operationalises "
  "these commitments through transparency, visible thinking, and dialogic engagement—including "
  "assessment redesign, structured documentation of AI use, “tech-off” reflections, and revision "
  "tracking. Graham (2023), writing from composition studies, argues that the discipline's post-process "
  "insights already equip it to teach in AI-rich conditions, and that large language models mark not the "
  "end of writing instruction but its relocation toward rhetorical and contextual judgement.")
H2("6.2 The empirical pivot: when does process survive automation?")
para("The strongest empirical reason to take process seriously under GenAI is evidence that outsourcing "
  "the process can improve products while degrading learning. Fan et al. (2025), in a randomised study "
  "(N = 117) comparing ChatGPT support, human expert support, a writing-analytics tool, and a control, "
  "found that the ChatGPT group produced the largest gains in essay scores but showed no corresponding "
  "advantage in knowledge gain or transfer—a dissociation the authors term “metacognitive laziness,” "
  "in which learners offload planning, monitoring, and evaluation to the model. Yet this is not a "
  "counsel of prohibition, because the same offloading can be turned to advantage when it is "
  "deliberately scaffolded: studies of structured cognitive-offload cycles—in which AI handles "
  "lower-order tasks so that students can concentrate on analysis, critique, and reflection—report gains "
  "in critical thinking and text quality relative to conventional instruction, provided the offloading "
  "is embedded in a designed cycle of generation, critique, revision, and reflection. The mediating "
  "variable across these apparently contradictory results is instructional design. Whether AI offloading "
  "produces metacognitive laziness or higher-order gain depends on whether the process has been "
  "pedagogically restructured around it—a finding that becomes load-bearing for the framework in "
  "Section 7 (Figure 2).")
figure(f"{FIG}/figure3_synthesis.png",
       "Figure 2. From three strands to one organising principle. Synthesis across the feedback, agency, "
       "and process literatures converges on a single principle, which the stance–structure framework "
       "operationalises.")
H2("6.3 The theoretical patchwork: tool versus actant")
para("Across the feedback, agency, and process strands, the contemporary literature reaches into a "
  "common theoretical toolbox—Vygotsky, Galperin, Latour, Barad, Engeström—but does so in piecemeal "
  "fashion, rarely reconciling the incompatible commitments these traditions carry. Two broad camps can "
  "be distinguished. The first, sociocultural and activity-theoretic, treats AI as a mediating artifact "
  "subordinate to human activity and treats agency as a human achievement supported by tools. Engeness "
  "and Gamlem's (2025) cultural-historical design of AI feedback, and Chen et al.'s (2025) "
  "activity-theoretic analysis of graduate writers—which finds that disciplinary norms shape how "
  "students deploy AI as a mediating artifact, with arts students prioritising coherence and rhetoric "
  "and science students prioritising clarity and technical accuracy—exemplify this orientation. The "
  "second camp, posthuman and actor-network, treats agency as distributed and relational rather than "
  "humanly possessed. Burriss and Leander (2024) build a critical posthumanist literacy in which agency "
  "is “not a human possession but an accomplishment among… human and non-human actors,” and Jeon and "
  "Lee (2026) reassemble networked learning through actor-network theory, arguing that legitimate "
  "knowledge decisions emerge through entanglements of humans and nonhuman elements so that learning "
  "agency can no longer be located in humans alone.")
para("The fault line between these camps is not merely terminological; it is ontological. For the "
  "sociocultural tradition, the writer wields the tool; for the posthuman tradition, writer and tool are "
  "co-constituted in intra-action. The tension surfaces vividly when scholars borrow vocabulary across "
  "the divide—describing AI as a “cognitive scaffold” (a Vygotskian term) within an avowedly posthuman "
  "frame—a category blend that signals the absence of synthesis rather than its achievement. No source "
  "we reviewed integrates the sociocultural and activity-theoretic tradition with the posthuman and "
  "actor-network tradition; the field offers parallel vocabularies for the same classroom phenomena. "
  "This is the fragmentation our framework is designed to address.")

# ================= 7. FRAMEWORK =================
H1("7. Toward an Integrative Framework: The Stance–Structure Continuum")
para("The preceding sections yield a single organising insight. Across feedback, agency, and process "
  "alike, the decisive variable is not whether AI is present, nor how much of it is used, but the locus "
  "and structure of its intervention. Superficial feedback uptake gives way to productive engagement "
  "when AI commentary is embedded in a structure demanding evaluative judgement (Section 4); ownership "
  "erodes at the sentence and whole-draft locus but is preserved at the ideation and subprocess locus "
  "and through elaborated prompting (Section 5); and offloading breeds metacognitive laziness unless the "
  "process is restructured into a designed cycle of generation, critique, and reflection (Section 6). We "
  "formalise this insight as a two-axis framework for AI-aware writing instruction, with a third, "
  "outcome layer (Figure 3). Unlike the AI-literacy taxonomies that classify the competencies learners "
  "should acquire, the framework is organised around an instructional design principle—the locus and "
  "structure of intervention—and is explicitly theory-bearing, positioning the field's rival accounts of "
  "agency as poles of a single continuum rather than as competing ontologies.")
figure(f"{FIG}/figure1_stance_structure.png",
       "Figure 3. The Stance–Structure Continuum for AI-aware writing instruction. The vertical axis "
       "represents theoretical stance (instrumental–mediational to relational–distributed); the "
       "horizontal axis represents instructional structure (locus, scaffolding, documentation). "
       "Quadrants describe characteristic configurations; the outcome layer specifies the capacities the "
       "framework is designed to cultivate.")
H2("7.1 Axis 1: theoretical stance")
para("The first axis runs from an instrumental–mediational stance, in which AI is a tool wielded by an "
  "agentive human writer (the sociocultural and activity-theoretic pole), to a relational–distributed "
  "stance, in which agency and authorship are distributed across a human–AI assemblage (the posthuman "
  "and actor-network pole). We advance the framework's central theoretical claim here: these are not "
  "competing truths about what AI “really” is, but describable positions that vary with the writer's "
  "stance, the task, and the design of instruction. Empirical work supports treating stance as a "
  "variable rather than a verdict: studies document both instrumental orientations (AI as a trainable "
  "tool refined through iterative prompting) and relational orientations (AI as a quasi-agentive "
  "collaborator) within the same setting, and activity-theoretic work shows the orientation shifting by "
  "discipline (Chen et al., 2025). The pedagogical pay-off of placing these traditions on a single axis "
  "is that an instructor can choose a stance deliberately—cultivating instrumental control when the aim "
  "is to protect an emerging voice, and exploring distributed authorship when the aim is to teach "
  "critical reflection on human–machine entanglement—rather than inheriting one camp's ontology by "
  "default.")
H2("7.2 Axis 2: instructional structure")
para("The second axis specifies the structure of AI integration along three design parameters that the "
  "evidence identifies as decisive. The first is locus: at which point in the writing process AI is "
  "invited to contribute—invention and ideation, sentence-level generation, feedback and revision, or "
  "whole-draft production—where earlier-stage loci preserve ownership and later-stage loci erode it "
  "(Joshi & Vogel, 2025; Siddiqui et al., 2025). The second is scaffolding: whether AI use is wrapped in "
  "a designed cycle that requires students to set goals, evaluate outputs, and reflect, which the "
  "process evidence identifies as the difference between metacognitive laziness and higher-order gain "
  "(Fan et al., 2025). The third is documentation: whether the human contribution is made visible "
  "through process artifacts—prompt logs, revision tracking, “tech-off” reflections—as in Process "
  "Pedagogy 2.0 (Elturki, 2026) and the reflective component of PAIRR (Sperber et al., 2025). Together "
  "these parameters convert the abstract injunction to use AI “thoughtfully” into specifiable "
  "instructional design choices. Table 1 maps the four configurations the two axes generate.")
table_caption("Table 1. The four stance–structure configurations for AI-aware writing instruction, with "
              "characteristic designs, likely outcomes, and exemplars.")
make_table(
    ["Configuration", "Stance × structure", "Likely outcome", "Representative work"],
    [["Substitution",
      "Instrumental stance; low structure (text-generative locus, no scaffolding)",
      "Product gains without learning gains; ownership erosion; “metacognitive laziness”",
      "Fan et al. (2025)"],
     ["Scaffolded tool use",
      "Instrumental stance; high structure (ideation locus, evaluative scaffolding, documentation)",
      "Builds voice, feedback literacy, and transfer; preserves agency",
      "Elturki (2026); Sperber et al. (2025); Siddiqui et al. (2025)"],
     ["Uncritical entanglement",
      "Relational stance; low structure (distributed authorship accepted without reflection)",
      "Diffuse agency; cognitive surrogacy; voice overwritten",
      "Yan & Zhang (2024)"],
     ["Critical co-authorship",
      "Relational stance; high structure (distributed stance made an object of reflection)",
      "Builds critical AI / postdigital literacy; reflexive agency",
      "Burriss & Leander (2024); Jeon & Lee (2026)"]],
    widths=[1.2, 2.1, 1.7, 1.5])
H2("7.3 The outcome layer")
para("The two axes are oriented toward an outcome layer that distinguishes AI-aware writing instruction "
  "from mere AI adoption: the cultivation of feedback literacy (the capacity to appreciate, judge, and "
  "act on feedback, including machine feedback; Carless & Boud, 2018) and authorial agency (the capacity "
  "to authorise, adapt, and overrule AI contributions in the service of a rhetorical purpose and a "
  "recognisable voice). This layer also supplies the framework's empirical test. "
  "Distributed-cognition outcomes—whether offloading produces knowledge transformation and transfer or "
  "merely improved products—operationalise the framework's predictions: instruction located at "
  "agency-preserving loci, wrapped in evaluative scaffolding, and made visible through documentation "
  "should yield gains in feedback literacy, ownership, and transfer, whereas instruction that automates "
  "text production without such structure should yield product gains without learning gains, consistent "
  "with the dissociation Fan et al. (2025) report.")
H2("7.4 Using the framework")
para("The framework is intended to be generative for both design and research. As a design tool, it "
  "lets an instructor locate a given assignment in the stance–structure space and ask whether its "
  "configuration serves the intended outcome: a first-year composition task aiming to build voice might "
  "adopt an instrumental–mediational stance, an ideation-stage locus, heavy evaluative scaffolding, and "
  "prompt-log documentation; a graduate seminar interrogating authorship in the postdigital condition "
  "might deliberately occupy the relational–distributed pole to make entanglement an object of "
  "reflection. As a research tool, the framework reframes the field's central question from “does AI "
  "help or harm writing?” to “under which stance–structure configurations does AI-mediated instruction "
  "cultivate feedback literacy and authorial agency?”—a question that integrates, rather than merely "
  "juxtaposes, the process, feedback, and theory literatures the field has so far kept apart.")

# ================= 8. DISCUSSION / IMPLICATIONS =================
H1("8. Implications for Practice")
para("Several practical implications follow. First, writing programmes should treat feedback literacy "
  "as an explicit curricular outcome in the GenAI era, teaching students to evaluate machine-generated "
  "commentary against rhetorical goals rather than to accept or reject it wholesale; the "
  "evaluative-judgement component of feedback literacy is now a transferable academic competency, not an "
  "optional refinement. Second, assignment design should attend to the locus of AI intervention, "
  "favouring configurations that invite AI at the stages of invention and revision—where it can prompt "
  "thinking—over configurations that delegate sentence- and draft-level production, where ownership and "
  "learning are most at risk. Third, the visible-thinking strategies of Process Pedagogy 2.0—prompt "
  "logs, revision histories, and reflective “tech-off” writing—offer a practical means of relocating "
  "assessment from the product, which AI can now supply, to the process, which remains the site of "
  "learning. Fourth, hybrid feedback arrangements such as PAIRR show that AI can expand formative "
  "feedback capacity—especially in writing-intensive courses where instructor feedback is scarce—without "
  "displacing the human and peer feedback on which deeper revision depends, provided students are "
  "required to exercise judgement over the AI's contribution. Finally, instructors can make their "
  "theoretical stance a deliberate pedagogical choice rather than a default inheritance, cultivating "
  "instrumental control over AI where the aim is to protect an emerging voice and opening up distributed "
  "authorship for critical examination where the aim is to develop students' critical understanding of "
  "writing in a postdigital world.")

# ================= 9. LIMITATIONS =================
H1("9. Limitations")
para("This review has several limitations. As a narrative rather than systematic synthesis, its corpus "
  "was selected purposively, and although we searched major databases and hand-searched leading venues, "
  "we make no claim to exhaustive coverage. The evidence base is uneven in two respects that temper the "
  "framework's generality. It skews heavily toward second-language and EFL writing contexts and toward "
  "English-medium instruction, so its applicability to first-language composition and to writing in "
  "other languages should be established rather than assumed. It also leans on a small number of "
  "experimental studies with modest samples—several agency findings rest on single- or double-digit "
  "participant counts—and on a fast-moving body of very recent work, including 2026 publications whose "
  "findings have not yet been independently replicated. Because the field is developing rapidly, some "
  "syntheses we relied upon are themselves preliminary, and the pace of model improvement means that "
  "empirical claims about what AI feedback can and cannot do are provisional. Finally, the integrative "
  "framework is a conceptual contribution derived from the literature; it has not itself been "
  "empirically validated, and its testing is a priority for future research.")

# ================= 10. FUTURE RESEARCH (numbered list) =================
H1("10. Directions for Future Research")
para("Four priorities follow most directly from the framework:")
gaps = [
 "Design-based and experimental research that manipulates the locus, scaffolding, and documentation of "
 "AI integration and measures effects not only on text quality but on feedback literacy, psychological "
 "ownership, and knowledge transfer—extending the locus-of-intervention paradigm into authentic, "
 "longitudinal classroom settings.",
 "Validated instruments for AI-era feedback literacy and authorial agency, so that the framework's "
 "outcome layer can be measured consistently across studies rather than operationalised ad hoc.",
 "Systematic investigation of the product-gain versus learning-gain dissociation across tasks and "
 "disciplines, to identify the scaffolding conditions under which offloading supports rather than "
 "supplants higher-order thinking.",
 "Conceptual and empirical testing of the proposed theoretical integration: whether "
 "instrumental–mediational and relational–distributed stances index describable differences in how "
 "writers compose with AI, and whether instruction can move students along that axis deliberately.",
]
for g in gaps:
    lp = doc.add_paragraph(style="List Number")
    lp.paragraph_format.space_after = Pt(4)
    lp.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    lp.add_run(g)

# ================= 11. CONCLUSION =================
H1("11. Conclusion")
para("The first wave of scholarship on generative AI in higher-education writing asked, understandably, "
  "what students do with the tools and whether it is permissible. This review has argued that the more "
  "durable questions are pedagogical and theoretical: how the teaching of writing is being redesigned, "
  "how feedback and voice can be cultivated rather than merely policed, and how the field's scattered "
  "theoretical resources might be integrated. Synthesising the teaching-facing literature across "
  "feedback, agency, and process, we found a field that is empirically active but conceptually "
  "fragmented, and we identified a principle that unifies its strongest findings: the locus and "
  "structure of AI intervention, not its presence or quantity, determine whether instruction cultivates "
  "or erodes writerly capacity. The stance–structure continuum we propose turns that principle into a "
  "framework that writing instructors can use to design, and researchers can use to study, AI-aware "
  "writing instruction. In reframing generative AI from a threat to be detected into a site for teaching "
  "rhetorical judgement, voice, and feedback literacy, the framework returns the field's attention to "
  "the question that ought to have been central all along—not what AI does to writing, but how, with AI "
  "in the room, we teach writing well.")

# ================= DECLARATIONS =================
H1("Declarations")
runs_para([("Funding: ", True, False),
           ("The author(s) received no specific funding for this work.", False, False)], size=10, after=3)
runs_para([("Conflicts of interest: ", True, False),
           ("The author(s) declare no competing interests.", False, False)], size=10, after=3)
runs_para([("Data availability: ", True, False),
           ("This review analyses publicly available published sources; no new data were generated.", False, False)],
          size=10, after=3)
runs_para([("Use of AI tools: ", True, False),
           ("AI-based tools were used to support literature discovery and drafting; all sources and "
            "quantitative claims were verified by the author(s) against the primary publisher record.", False, False)],
          size=10, after=8)

# ================= REFERENCES =================
H1("References")
references = [
 "Abdellatif, M. S., Alshehri, M. A., Lamouchi, A., Rahmath, M., & Nemt-allah, M. A. (2026). Reimagining "
 "writing assessment for the AI era: A systematic review on balancing AI support and authentic skill "
 "growth. Frontiers in Psychology, 17, 1809174. https://doi.org/10.3389/fpsyg.2026.1809174",
 "Bittle, K., & El-Gayar, O. (2025). Generative AI and academic integrity in higher education: A "
 "systematic review and research agenda. Information, 16(4), 296. https://doi.org/10.3390/info16040296",
 "Burriss, S. K., & Leander, K. M. (2024). Critical posthumanist literacy: Building theory for reading, "
 "writing, and living ethically with everyday artificial intelligence. Reading Research Quarterly, "
 "59(4), 560–569. https://doi.org/10.1002/rrq.565",
 "Carless, D., & Boud, D. (2018). The development of student feedback literacy: Enabling uptake of "
 "feedback. Assessment & Evaluation in Higher Education, 43(8), 1315–1325. "
 "https://doi.org/10.1080/02602938.2018.1463354",
 "Chen, J., Wang, Z., & Zhou, X. (2025). AI-assisted writing: Exploring academic writing strategies of "
 "graduate students across disciplines through activity theory. Higher Education Studies, 15(4), "
 "243–255. https://doi.org/10.5539/hes.v15n4p243",
 "Crosthwaite, P., & Sun, S. (2026). Generative AI and L2 written feedback studies: A scoping review. "
 "RELC Journal, 57(1), 207–219. https://doi.org/10.1177/00336882251386530",
 "Elturki, E. (2026). AI-aware process writing pedagogy: Rethinking the process-based approach. TESOL "
 "Journal, 17(2), e70127. https://doi.org/10.1002/tesj.70127",
 "Emig, J. (1977). Writing as a mode of learning. College Composition and Communication, 28(2), "
 "122–128. https://doi.org/10.2307/356095",
 "Engeness, I., & Gamlem, S. M. (2025). Exploring AI-driven feedback as a cultural tool: A "
 "cultural-historical perspective on design of AI environments to support students' writing process. "
 "Integrative Psychological and Behavioral Science, 59, 23. https://doi.org/10.1007/s12124-025-09894-8",
 "Fan, Y., Tang, L., Le, H., Shen, K., Tan, S., Zhao, Y., Shen, Y., Li, X., & Gašević, D. (2025). "
 "Beware of metacognitive laziness: Effects of generative artificial intelligence on learning "
 "motivation, processes, and performance. British Journal of Educational Technology, 56(2), 489–530. "
 "https://doi.org/10.1111/bjet.13544",
 "Flower, L., & Hayes, J. R. (1981). A cognitive process theory of writing. College Composition and "
 "Communication, 32(4), 365–387. https://doi.org/10.2307/356600",
 "Giray, L. (2025). AI literacy framework for academic writing in the age of artificial intelligence. "
 "Internet Reference Services Quarterly. Advance online publication. "
 "https://doi.org/10.1080/10875301.2025.2605067",
 "Godwin-Jones, R. (2024). Distributed agency in second language learning and teaching through "
 "generative AI. Language Learning & Technology, 28(2), 5–31. https://hdl.handle.net/10125/73570",
 "Graham, S. S. (2023). Post-process but not post-writing: Large language models and a future for "
 "composition pedagogy. Composition Studies, 51(1), 162–168.",
 "Ivanič, R. (1998). Writing and identity: The discoursal construction of identity in academic writing. "
 "John Benjamins. https://doi.org/10.1075/swll.5",
 "Jeon, M., & Lee, K. (2026). Reassembling AI-embraced networked learning through actor-network theory. "
 "In L. Declercq, J. Loeckx, M. De Laat, N. B. Dohn, & T. Ryberg (Eds.), Proceedings of the Fifteenth "
 "International Conference on Networked Learning 2026. Aalborg University.",
 "Joshi, N., & Vogel, D. (2025). Writing with AI lowers psychological ownership, but longer prompts can "
 "help. In Proceedings of the 7th ACM Conference on Conversational User Interfaces (CUI '25). "
 "Association for Computing Machinery. https://doi.org/10.1145/3719160.3736608",
 "Online Learning Consortium. (2026, May). The VAPOR framework for critical AI literacy across "
 "disciplines. OLC Insights. https://onlinelearningconsortium.org/olc-insights/2026/05/vapor-framework/",
 "Sandstead, M. G., & Kibler, A. K. (2025). Voice in L2 writing in the age of AI. Journal of Second "
 "Language Writing, 69, 101212. https://doi.org/10.1016/j.jslw.2025.101212",
 "Sanz-Tejeda, A., Domínguez-Oller, J. C., Baldaquí-Escandell, J. M., Gómez-Díaz, R., & "
 "García-Rodríguez, A. (2026). The impact of generative AI on academic reading and writing: A synthesis "
 "of recent evidence (2023–2025). Frontiers in Education, 10, 1711718. "
 "https://doi.org/10.3389/feduc.2025.1711718",
 "Siddiqui, M. N., Feliciano, V., Pea, R., & Subramonyam, H. (2025). AI in the writing process: How "
 "purposeful AI support fosters student writing. arXiv. https://doi.org/10.48550/arXiv.2506.20595",
 "Slimi, Z. (2026). A systematic critical review of generative AI's impact on authorship, pedagogy, and "
 "integrity (2023–2025). Frontiers in Education, 11, 1769680. https://doi.org/10.3389/feduc.2026.1769680",
 "Sperber, L., MacArthur, M., Minnillo, S., Stillman, N., & Whithaus, C. (2025). Peer and AI review + "
 "reflection (PAIRR): A human-centered approach to formative assessment. Computers and Composition, 76, "
 "102921. https://doi.org/10.1016/j.compcom.2025.102921",
 "Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes (M. Cole, "
 "V. John-Steiner, S. Scribner, & E. Souberman, Eds.). Harvard University Press.",
 "Wang, C., & Wang, Z. (2025). Investigating L2 writers' critical AI literacy in AI-assisted writing: "
 "An APSE model. Journal of Second Language Writing, 67. "
 "https://www.sciencedirect.com/science/article/pii/S1060374325000128",
 "Xiao, F., Zhu, S., & Xin, W. (2025). Exploring the landscape of generative AI (ChatGPT)-powered "
 "writing instruction in English as a foreign language education: A scoping review. ECNU Review of "
 "Education, 8(1), 1–19. https://doi.org/10.1177/20965311241310881",
 "Yan, D., & Zhang, S. (2024). L2 writer engagement with automated written corrective feedback provided "
 "by ChatGPT: A mixed-method multiple case study. Humanities and Social Sciences Communications, 11, "
 "1066. https://doi.org/10.1057/s41599-024-03543-y",
 "Yu, N., Zhang, J., Mitra, S., Smith, R., & Rich, A. (2026). AI-Educational Development Loop (AI-EDL): "
 "A conceptual framework to bridge AI capabilities with classical educational theories. arXiv. "
 "https://doi.org/10.48550/arXiv.2508.00970",
 "Zhai, N., & Ma, X. (2023). The effectiveness of automated writing evaluation on writing quality: A "
 "meta-analysis. Journal of Educational Computing Research, 61(4), 875–900. "
 "https://doi.org/10.1177/07356331221127300",
]
for r in references:
    ref(r)

out = "/home/user/Claude/Teaching_Academic_Writing_GenAI_Narrative_Review.docx"
doc.save(out)
print("SAVED:", out)
print("paragraphs:", len(doc.paragraphs), "| tables:", len(doc.tables),
      "| images:", len(doc.inline_shapes), "| refs:", len(references))
