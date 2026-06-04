#!/usr/bin/env python3
"""Build the full narrative-review manuscript as a .docx file."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn

doc = Document()

# ---------- Base styles ----------
normal = doc.styles["Normal"]
normal.font.name = "Times New Roman"
normal.font.size = Pt(12)
normal.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
normal.paragraph_format.space_after = Pt(0)

# East-asian font binding
rpr = normal.element.get_or_add_rPr()
rfonts = rpr.get_or_add_rFonts()
rfonts.set(qn("w:eastAsia"), "Times New Roman")

for i in range(1, 4):
    h = doc.styles[f"Heading {i}"]
    h.font.name = "Times New Roman"
    h.font.color.rgb = RGBColor(0, 0, 0)
    h.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    h.paragraph_format.space_before = Pt(12)
    h.paragraph_format.space_after = Pt(6)
    if i == 1:
        h.font.size = Pt(14); h.font.bold = True
    elif i == 2:
        h.font.size = Pt(12); h.font.bold = True
    else:
        h.font.size = Pt(12); h.font.bold = True; h.font.italic = True

def H(text, level=1):
    doc.add_heading(text, level=level)

def P(text, indent=True, justify=True, after=0, italic=False, bold=False):
    p = doc.add_paragraph()
    if indent:
        p.paragraph_format.first_line_indent = Inches(0.5)
    if justify:
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.space_after = Pt(after)
    r = p.add_run(text)
    r.italic = italic; r.bold = bold
    return p

def center(text, bold=False, italic=False, size=12, after=0, indent=False):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.first_line_indent = Inches(0)
    r = p.add_run(text)
    r.bold = bold; r.italic = italic; r.font.size = Pt(size)
    return p

def ref(text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)
    p.paragraph_format.space_after = Pt(6)
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.add_run(text)
    return p

# ================= TITLE PAGE =================
for _ in range(3):
    doc.add_paragraph()
center("Teaching Academic Writing in the Age of Generative AI: "
       "A Narrative Review of Process Pedagogy, Feedback, and Authorial Agency",
       bold=True, size=15, after=12)
doc.add_paragraph()
center("[Author Name(s) Withheld for Review]", size=12, after=2)
center("[Institutional Affiliation]", italic=True, size=11, after=2)
center("[Corresponding author email]", italic=True, size=11, after=12)
doc.add_paragraph()
center("Manuscript prepared as a narrative review for submission to a Scopus-indexed Q1 journal", italic=True, size=11)
center("(e.g., Computers and Composition; Journal of Second Language Writing; "
       "Assessing Writing; Computers and Education: Artificial Intelligence)", italic=True, size=11)

doc.add_page_break()

# ================= ABSTRACT =================
H("Abstract", level=1)
P("Existing reviews of generative artificial intelligence (GenAI) in higher-education writing "
  "have concentrated overwhelmingly on two questions: how students use these tools, and how their "
  "use threatens academic integrity. The teaching dimension—how writing instruction itself is being "
  "redesigned—remains comparatively undertheorised and unconsolidated. This narrative review addresses "
  "that lacuna by synthesising recent empirical and conceptual scholarship (2022–2026) alongside foundational "
  "writing-studies theory across three interlocking strands: (1) AI-mediated feedback as a pedagogical practice, "
  "read through a feedback-literacy lens rather than as a question of feedback accuracy or effect size; "
  "(2) authorial voice and agency as cultivable instructional aims rather than as compliance problems; and "
  "(3) the reworking of process pedagogy under conditions in which AI can produce polished prose from the outset. "
  "Reviewing this evidence reveals a field that is empirically active but theoretically fragmented, drawing "
  "piecemeal on process pedagogy, sociocultural theory, posthumanism, and feedback literacy without an integrative "
  "account of AI-aware writing instruction. We argue that a single principle organises the strongest findings across "
  "all three strands: the locus and structure of AI intervention—not its mere presence or quantity—determines "
  "whether instruction cultivates or erodes writerly capacity. Building on this principle, we propose a "
  "stance–structure framework that positions theoretical orientation (instrumental–mediational to "
  "relational–distributed) against instructional design (the locus, scaffolding, and documentation of human–AI "
  "composing), with feedback literacy and authorial agency as the outcome layer. The framework reframes GenAI from a "
  "threat to be policed into a site for teaching rhetorical judgement, and offers writing instructors, programme "
  "designers, and researchers a shared vocabulary for designing—and studying—AI-aware writing pedagogy.",
  indent=False)
doc.add_paragraph()
kp = doc.add_paragraph()
kp.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
kr = kp.add_run("Keywords: ")
kr.bold = True
kp.add_run("generative AI; writing pedagogy; academic writing; feedback literacy; authorial agency; "
           "process pedagogy; sociocultural theory; posthumanism; higher education")

doc.add_page_break()

# ================= 1. INTRODUCTION =================
H("1. Introduction", level=1)
P("Within months of the public release of ChatGPT in late 2022, the teaching of academic writing was "
  "described, in turn, as obsolete, endangered, and transformed. Commentators announced “the end of the "
  "essay”; institutions scrambled to draft detection policies; and a rapidly growing scholarly literature "
  "set out to measure what students were doing with the new tools and whether it constituted cheating. Two "
  "framings have dominated this first wave of research. The first treats GenAI primarily as a student "
  "behaviour to be characterised—documenting patterns of use, perceptions, and self-reported benefits and "
  "risks. The second treats GenAI primarily as a threat to academic integrity, foregrounding plagiarism, "
  "authorship disclosure, and the (often unreliable) detection of machine-generated text. Both framings are "
  "important, and both have generated valuable syntheses. Yet both share a common feature: they position the "
  "student, not the teacher, as the unit of analysis, and they ask what writers do with AI rather than how "
  "writing is—or should be—taught when AI is in the room.")
P("This review takes the teaching dimension as its object. Our premise is that the most consequential "
  "questions raised by GenAI for higher education are pedagogical and theoretical, not merely behavioural or "
  "regulatory. When a tool can produce a competent draft from a one-line prompt, the long-standing rationale "
  "for teaching writing as a recursive process of planning, drafting, and revision is destabilised "
  "(Elturki, 2026); when that tool also delivers fluent, instant commentary on student texts, the economy of "
  "classroom feedback is reorganised (Crosthwaite & Sun, 2026); and when authorship becomes distributed across "
  "human and machine contributors, the cultivation of a writer’s voice and agency—historically a central "
  "aim of writing instruction—can no longer be assumed as a by-product of composing alone (Godwin-Jones, 2024; "
  "Joshi & Vogel, 2025). These are problems of instruction and of theory, and they are precisely the problems "
  "that the dominant student-use and integrity reviews leave to one side.")
P("Three specific openings motivate this synthesis. First, AI-mediated feedback is now an empirically active "
  "area—spanning automated writing evaluation (AWE), combined instructor-plus-AI feedback, and student "
  "revision behaviour—yet it has not been consolidated through a feedback-literacy lens. The field has largely "
  "asked whether AI feedback improves texts; it has less often asked how students learn to appreciate, judge, "
  "and act on feedback when its source is a generative model (Carless & Boud, 2018; Yan & Zhang, 2024). Second, "
  "authorship and voice are discussed almost exclusively as integrity problems—as matters of attribution and "
  "detection—rather than as pedagogical aims, that is, as capacities that instruction can deliberately "
  "cultivate within human–AI composing (Burriss & Leander, 2024; Sandstead & Kibler, 2025). Third, the field is "
  "theoretically fragmented, drawing in piecemeal fashion on process pedagogy, sociocultural theory, "
  "posthumanism, and feedback literacy, with no integrative framework for AI-aware writing instruction "
  "(Chen et al., 2025; Jeon & Lee, 2026).")
P("Accordingly, this article makes a pedagogy-and-theory-centred contribution. It does not aim to inventory "
  "every reported use of ChatGPT, nor to adjudicate questions of misconduct. Instead, it synthesises the "
  "teaching-facing literature across the three openings above and advances an integrative framework—the "
  "stance–structure continuum—for designing and studying AI-aware writing instruction. We argue that a single "
  "organising principle runs through the strongest empirical findings in all three strands: the locus and "
  "structure of AI intervention, rather than its presence or quantity, determines whether instruction cultivates "
  "or erodes writerly capacity (Fan et al., 2025; Siddiqui et al., 2025). The remainder of the paper develops "
  "this claim. Section 2 describes the narrative-review method. Section 3 maps the existing review landscape and "
  "defends the gap. Sections 4 through 6 synthesise the three strands in turn. Section 7 presents the integrative "
  "framework. Sections 8 through 10 consider implications, limitations, and directions for research.")

# ================= 2. METHOD =================
H("2. A Narrative Review Approach", level=1)
P("We adopt a narrative (interpretive) review rather than a systematic or meta-analytic design, because our "
  "aim is conceptual integration across heterogeneous literatures rather than the estimation of a pooled effect "
  "or an exhaustive accounting of a bounded corpus. Narrative review is the appropriate method when a field is "
  "theoretically fragmented and the reviewer’s contribution lies in synthesising disparate traditions into a "
  "coherent framework. Where systematic reviews already exist for sub-questions within our scope—for instance, "
  "scoping reviews of GenAI L2 written feedback (Crosthwaite & Sun, 2026) and meta-analyses of AWE effectiveness "
  "(Zhai & Ma, 2023)—we draw on their aggregated findings rather than duplicate them, and position our synthesis "
  "at the level of pedagogy and theory that those reviews do not address.")
P("Sources were identified through iterative searching of Scopus, Web of Science, ERIC, and Google Scholar, "
  "supplemented by citation chaining from key articles and hand-searching of leading venues, including "
  "Computers and Composition, the Journal of Second Language Writing, Assessing Writing, Assessment & Evaluation "
  "in Higher Education, Computer Assisted Language Learning, Language Learning & Technology, the RELC Journal, "
  "Computers and Education: Artificial Intelligence, the British Journal of Educational Technology, and "
  "Postdigital Science and Education. Search terms combined three conceptual clusters: (a) the technology "
  "(“generative AI,” “ChatGPT,” “large language model,” “automated writing evaluation”); (b) the "
  "instructional object (“writing instruction,” “writing pedagogy,” “academic writing,” “composition,” "
  "“written feedback,” “revision”); and (c) the pedagogical and theoretical lenses of interest "
  "(“feedback literacy,” “authorial voice,” “agency,” “process pedagogy,” “sociocultural,” "
  "“posthuman,” “activity theory”).")
P("Consistent with narrative-review practice, inclusion was purposive rather than exhaustive. We prioritised "
  "peer-reviewed empirical studies and conceptual contributions published between 2022 and 2026 that addressed "
  "the teaching of writing with GenAI, together with foundational works in writing studies and learning theory "
  "(e.g., Emig, 1977; Flower & Hayes, 1981; Ivanič, 1998; Vygotsky, 1978) that the contemporary literature "
  "reworks. We deliberately retained sources that frame voice and agency as compliance problems, because the "
  "asymmetry between that dominant framing and the minority that treats them as pedagogical aims is itself part "
  "of our argument. Analytically, we read the corpus thematically, coding each source for its pedagogical focus "
  "(feedback, agency, process), its theoretical commitments, its empirical warrant (where applicable), and the "
  "gaps its authors identify; we then synthesised across these codes to construct the integrative framework "
  "presented in Section 7. We note two limitations of scope at the outset, returned to in Section 9: the "
  "evidence base skews toward second-language (L2) and English-as-a-foreign-language (EFL) writing contexts, "
  "and toward English-medium instruction.")

# ================= 3. THE GAP =================
H("3. The Review Landscape and the Pedagogical Lacuna", level=1)
P("To establish the contribution of a teaching-and-theory synthesis, it is necessary to characterise what "
  "existing reviews do and do not cover. The published review literature on GenAI in writing clusters into four "
  "buckets, none of which consolidates the teaching dimension in the integrated way we propose.")
H("3.1 Student use and academic integrity", level=2)
P("The first and largest bucket documents student use and its risks. Syntheses of recent evidence report that "
  "GenAI can improve the cohesion, clarity, and fluency of student writing while raising concerns about "
  "over-reliance, diminished creativity, and unequal access, and they conclude—typically as a closing "
  "recommendation rather than a developed model—that such tools work best within “guided, reflective "
  "pedagogy” (Sanz-Tejeda et al., 2026). The second bucket centres academic integrity. Systematic reviews in "
  "this vein synthesise how GenAI influences academic honesty, find that institutions lack consistent guidelines, "
  "and identify assessment redesign as the primary institutional pressure point (Bittle & El-Gayar, 2025). "
  "Crucially, this bucket frames assessment redesign through an integrity-policing lens: the problem to be solved "
  "is the detection and deterrence of misconduct, not the cultivation of writing ability.")
H("3.2 Feedback effects and writing-instruction reviews", level=2)
P("A third bucket synthesises the effects of AI-mediated feedback. Meta-analyses report sizeable average effects "
  "of AWE on writing quality (Zhai & Ma, 2023), and a PRISMA-informed scoping review of 51 GenAI L2 "
  "written-feedback studies finds that most research addresses improvements to writing quality and stakeholder "
  "perceptions, with varied uptake and revision behaviour (Crosthwaite & Sun, 2026). These are reviews of "
  "feedback effects and tool functionality; they do not theorise feedback as a learnable competency. A fourth, "
  "smaller bucket comes closest to our concern. Xiao et al.’s (2025) scoping review of ChatGPT-powered EFL "
  "writing instruction—the most pedagogy-proximate review we identified—analysed 16 empirical studies and "
  "concluded that the field remains at the stage of “initial potential and applications,” EFL-bounded and "
  "lacking longitudinal evidence. The two most recent and most adjacent reviews, both published in 2026, "
  "illustrate the boundary precisely. Abdellatif et al. (2026) systematically review 19 studies on writing "
  "assessment in the AI era and call to “move beyond detection toward comprehensive pedagogical redesign”—but "
  "their synthesis is assessment-centric and offers neither a feedback-literacy lens nor an account of authorial "
  "agency. Slimi (2026) offers a critical review of GenAI’s impact on authorship, pedagogy, and integrity, but "
  "treats these as four parallel thematic strands—authorship and attribution; pedagogy and assessment; "
  "integrity, trust, and detection; and ethical-sociopolitical ramifications—rather than integrating them into a "
  "single pedagogical framework.")
H("3.3 The lacuna", level=2)
P("Read together, these reviews leave three openings unfilled. On the teaching dimension, only the assessment- "
  "and EFL-bounded reviews engage instructional redesign, and none delivers a consolidated account of how writing "
  "instruction—across feedback, voice, and process—is being reworked. On feedback, the syntheses are "
  "effect-size and perception focused; the construct of feedback literacy (Carless & Boud, 2018), although "
  "directly applicable, is largely absent. On authorship, agency appears as a student concern or as one theme "
  "among many, never as an instructional objective that drives design. And across all of them, an integrative "
  "theory is absent: the reviews are inventories, effect syntheses, or thematic maps. The remainder of this "
  "article addresses these openings and works toward the integrative account they lack.")

# ================= 4. FEEDBACK =================
H("4. AI-Mediated Feedback as Pedagogy: A Feedback-Literacy Lens", level=1)
H("4.1 The effect-size base and the surface–deep divide", level=2)
P("The evidentiary base for AI-mediated feedback is, on its surface, encouraging. Zhai and Ma’s (2023) "
  "meta-analysis of 26 studies (N = 2,468) reported a large overall effect of AWE on writing quality "
  "(g = 0.861, p < .001), with stronger effects for post-secondary than secondary students, for EFL/ESL than "
  "first-language writers, and for argumentative over other genres. Yet aggregate effects conceal an important "
  "qualitative pattern that recurs across the more recent GenAI literature: AI feedback is strongest at the "
  "surface level of language—grammar, mechanics, lexis—and, for generative chat, at the level of organisation, "
  "while it is weakest precisely where higher-order rhetorical judgement is required. Crosthwaite and Sun’s "
  "(2026) scoping review of 51 L2 written-feedback studies documents improvements in writing quality alongside "
  "persistent reservations about deeper, context-sensitive revision, for which students and instructors continue "
  "to regard human feedback as indispensable. The pedagogical implication is that the value of AI feedback is "
  "not self-executing: a tool that reliably flags surface error but unreliably addresses argument can either "
  "support or stunt development, depending on how its use is taught.")
H("4.2 From feedback provision to feedback literacy", level=2)
P("This is where the construct of student feedback literacy becomes indispensable—and where the existing "
  "reviews are silent. Carless and Boud (2018) define feedback literacy as the capacities and dispositions that "
  "enable students to make sense of and use feedback to improve their work, organised around four features: "
  "appreciating feedback, making judgements, managing affect, and taking action. Their central claim is that the "
  "primary barrier to feedback uptake is not the quality of the feedback but students’ capacity to engage with "
  "it productively. Transposed to GenAI, this claim reframes the entire research question. The pertinent issue "
  "is not only whether ChatGPT can generate accurate commentary, but whether students can appreciate its "
  "affordances and limits, judge its suggestions against rhetorical goals, manage the affective experience of an "
  "always-available evaluator, and translate its output into principled revision.")
P("The emerging engagement literature suggests that, left untaught, these capacities are fragile. Yan and "
  "Zhang’s (2024) mixed-method multiple case study of four L2 writers using ChatGPT as a provider of automated "
  "written corrective feedback found that behavioural engagement varied with learners’ language proficiency and "
  "technological competence, that participants frequently failed to regulate their learning metacognitively, and "
  "that the tool created an affectively engaging but cognitively demanding and time-consuming environment. The "
  "pattern is telling: an abundance of fluent feedback did not translate into deep engagement, and learners "
  "without metacognitive scaffolding tended toward superficial uptake. This is feedback literacy’s "
  "diagnosis—low uptake despite available feedback—reappearing in the GenAI setting, and it implies that "
  "instruction must now cultivate a recognisably extended feedback literacy: one that adds the evaluation of "
  "machine-generated commentary, the construction of effective prompts, and ethical judgement about when and how "
  "to act on AI suggestions to Carless and Boud’s original four features.")
H("4.3 Hybrid feedback and the redistribution of feedback labour", level=2)
P("If AI feedback excels at surface concerns and human feedback at rhetorical ones, the pedagogical question "
  "becomes one of orchestration rather than substitution. A consistent finding across the recent literature is "
  "that hybrid configurations—combining instructor (or peer) feedback with AI feedback—outperform either alone, "
  "and that the two sources tend to be complementary rather than redundant. Engeness and Gamlem (2025), working "
  "from a Vygotskian and Galperinian cultural-historical perspective, theorise AI-generated feedback as a "
  "cultural tool within an Assessment-for-Learning process and derive design principles for AI environments "
  "(instantiated in their Essay Assessment Technology) that structure feedback across language, content, and "
  "organisation so as to support internalisation rather than dependency. The PAIRR model—Peer and AI Review plus "
  "Reflection—developed by Sperber, MacArthur, Minnillo, and colleagues (2025) across composition and "
  "writing-intensive courses, pairs AI feedback with traditional peer review and a reflective component; the "
  "authors report that AI and peer feedback were often mutually reinforcing, that divergences proved "
  "complementary, and, importantly, that the act of evaluating AI output itself built students’ AI literacy and "
  "ethical judgement. The design principle that emerges is that AI feedback is most defensible pedagogically when "
  "it is embedded in a structure that requires students to exercise evaluative judgement over it—precisely the "
  "judgement-making feature at the heart of feedback literacy—rather than to receive it passively.")

# ================= 5. VOICE & AGENCY =================
H("5. Authorial Voice and Agency as a Pedagogical Aim", level=1)
H("5.1 From integrity panic to agency cultivation", level=2)
P("The second opening concerns how the literature treats authorship. Here an asymmetry is striking. The "
  "dominant discourse positions authorship as a compliance problem: the challenge is to attribute, disclose, or "
  "detect AI contribution, and the governing anxiety is that GenAI “blurs the lines” of who wrote what. Slimi’s "
  "(2026) critical review captures this centre of gravity, identifying the reconfiguration of authorship and "
  "attribution, and the dynamics of integrity, trust, and detection, as two of its four dominant themes. This "
  "framing is not wrong, but it is partial. It treats voice and authorship as something to be protected from "
  "contamination rather than as capacities to be developed—and in doing so it sidelines a question that is, "
  "pedagogically, more fundamental: how can writing instruction cultivate authorial agency and voice when "
  "students legitimately compose with AI?")
H("5.2 Voice as jointly constructed—and therefore teachable", level=2)
P("A minority but growing strand answers that question by treating voice and agency as instructional aims. Its "
  "theoretical resources predate GenAI. Ivanič’s (1998) account of writing and identity holds that the "
  "“discoursal self” a writer constructs in a text is assembled from socially available linguistic and "
  "rhetorical resources, and that voice is not the sole possession of an autonomous author but is jointly "
  "constructed in the interaction of writer and reader. This is a consequential premise for the AI debate, "
  "because it means that distributed authorship is not a rupture introduced by machines but an intensification of "
  "a condition that always obtained. Sandstead and Kibler (2025), writing on voice in L2 writing in the age of "
  "AI, develop this line directly: they treat voice as the presence of the author’s identity in the text, argue "
  "that it is a necessary construct for discussions of AI and writing, and observe that GenAI tends to “gloss "
  "over” the idiosyncratic linguistic and rhetorical choices through which writer identity becomes legible—with "
  "the corollary that lower-proficiency students, who may trust AI output more readily, are most at risk of "
  "having their emerging voice overwritten. If voice is jointly constructed and can be masked, it can also be "
  "taught; the instructional task is to make rhetorical choice-making visible and to position the student as the "
  "agent who authorises, rejects, or adapts AI contributions.")
P("The concept of agency in these accounts is best understood as distributed rather than as a possession of the "
  "lone writer. Godwin-Jones (2024) argues that agency in AI-mediated language learning is emergent and "
  "distributed among teachers, students, and tools, and—critically for pedagogy—that tasks can be designed to "
  "balance student control with AI support so that the learner remains the orchestrating agent. The pedagogical "
  "reframing this licenses is significant: rather than asking whether AI use compromises authorship, instructors "
  "can design composing tasks in which exercising agency over AI—deciding what to solicit, what to keep, and what "
  "to overrule—is the lesson.")
H("5.3 The locus-of-intervention evidence", level=2)
P("What elevates this strand from exhortation to design science is a small but pointed body of experimental "
  "evidence indicating that authorial ownership and agency are sensitive to where and how AI intervenes in the "
  "writing process. Joshi and Vogel (2025) show across two experiments that writing with AI lowers psychological "
  "ownership of the resulting text, but that longer, more elaborated prompts raise ownership (with benefits "
  "plateauing once a prompt reaches roughly 75–100% of the target length); they further demonstrate a simple "
  "interface intervention—requiring a press-and-hold to submit very short prompts—that nudges users toward the "
  "more elaborated input associated with greater ownership. Siddiqui, Feliciano, Pea, and Subramonyam (2025) "
  "report a randomised controlled trial (N = 90) comparing a chat-based LLM assistant, an integrated tool that "
  "scaffolds distinct writing subprocesses, and a no-AI control; students using the integrated, "
  "subprocess-targeted tool exhibited greater agency over their writing and deeper knowledge transformation than "
  "those using the generic chat assistant. The convergent message of this work is that it is the locus and "
  "structure of AI support—ideation versus sentence generation, integrated subprocess scaffolding versus "
  "open-ended chat, elaborated versus minimal prompting—rather than the simple fact of AI use, that determines "
  "whether composing builds or erodes the writer’s sense of authorship. Agency, in short, is a design variable, "
  "and therefore a teachable one.")

# ================= 6. PROCESS & THEORY =================
H("6. Reworking Process Pedagogy and Confronting Theoretical Fragmentation", level=1)
H("6.1 Process pedagogy after the collapse of the draft", level=2)
P("The third opening concerns the process tradition that has anchored writing instruction for half a century. "
  "Emig’s (1977) argument that writing is a unique mode of learning, and Flower and Hayes’s (1981) "
  "cognitive-process model of recursive planning, translating, and reviewing, established the rationale for "
  "teaching writing as a process: the labour of drafting and revision is not a means to a product but the site "
  "where thinking is formed. GenAI unsettles this rationale at its root, because it can deliver a polished draft "
  "before any of that labour has occurred. Elturki (2026) names the resulting tension directly and proposes a "
  "“Process Pedagogy 2.0”: an AI-aware reorientation, grounded in posthumanism and “postplagiarism,” that "
  "centres human decision-making, rhetorical reasoning, and ethical engagement within hybrid human–AI writing "
  "ecologies, and that operationalises these commitments through transparency, “visible thinking,” and dialogic "
  "engagement—including assessment redesign, structured documentation of AI use, “tech-off” reflections, and "
  "revision tracking. Graham (2023), writing from composition studies, argues that the discipline’s "
  "post-process insights—its attention to the situated, social, and contextual nature of writing—already equip "
  "it to teach in AI-rich conditions, and that large language models mark not the end of writing instruction but "
  "its relocation toward rhetorical and contextual judgement.")
H("6.2 The empirical pivot: when does process survive automation?", level=2)
P("The strongest empirical reason to take process seriously under GenAI is evidence that outsourcing the process "
  "can improve products while degrading learning. Fan et al. (2025), in a randomised study (N = 117) comparing "
  "ChatGPT support, human expert support, a writing-analytics tool, and a control, found that the ChatGPT group "
  "produced the largest gains in essay scores but showed no corresponding advantage in knowledge gain or "
  "transfer—a dissociation the authors term “metacognitive laziness,” in which learners offload planning, "
  "monitoring, and evaluation to the model. Yet this is not a counsel of prohibition, because the same offloading "
  "can be turned to advantage when it is deliberately scaffolded: studies of structured “cognitive-offload” "
  "cycles—in which AI handles lower-order tasks so that students can concentrate on analysis, critique, and "
  "reflection—report gains in critical thinking and text quality relative to conventional instruction, provided "
  "the offloading is embedded in a designed cycle of generation, critique, revision, and reflection. The "
  "mediating variable across these apparently contradictory results is instructional design. Whether AI "
  "offloading produces metacognitive laziness or higher-order gain depends on whether the process has been "
  "pedagogically restructured around it—a finding that becomes a load-bearing element of the framework in "
  "Section 7.")
H("6.3 The theoretical patchwork: tool versus actant", level=2)
P("Across the feedback, agency, and process strands, the contemporary literature reaches into a common "
  "theoretical toolbox—Vygotsky, Galperin, Latour, Barad, Engeström—but does so in piecemeal fashion, rarely "
  "reconciling the incompatible commitments these traditions carry. Two broad camps can be distinguished. The "
  "first, sociocultural and activity-theoretic, treats AI as a mediating artifact subordinate to human activity "
  "and treats agency as a human achievement supported by tools. Engeness and Gamlem’s (2025) cultural-historical "
  "design of AI feedback, and Chen et al.’s (2025) activity-theoretic analysis of graduate writers—which finds "
  "that disciplinary norms shape how students deploy AI as a mediating artifact, with arts students prioritising "
  "coherence and rhetoric and science students prioritising clarity and technical accuracy—exemplify this "
  "orientation. The second camp, posthuman and actor-network, treats agency as distributed and relational rather "
  "than humanly possessed. Burriss and Leander (2024) build a “critical posthumanist literacy” in which agency "
  "is “not a human possession but an accomplishment among… human and non-human actors,” and Jeon and Lee (2026) "
  "reassemble networked learning through actor-network theory, arguing that legitimate knowledge decisions emerge "
  "through entanglements of humans and nonhuman elements—documents, interfaces, regulations, algorithms—so that "
  "learning agency can no longer be located in humans alone.")
P("The fault line between these camps is not merely terminological; it is ontological. For the sociocultural "
  "tradition, the writer wields the tool; for the posthuman tradition, writer and tool are co-constituted in "
  "intra-action. The tension surfaces vividly when scholars borrow vocabulary across the divide—describing AI as "
  "a “cognitive scaffold” (a Vygotskian term) within an avowedly posthuman frame—a category blend that signals "
  "the absence of synthesis rather than its achievement. The deepest split, in our reading, is the "
  "tool-versus-actant question: is AI a mediating artifact within a human activity system, or a symmetrical "
  "actant in a sociomaterial network? No source we reviewed integrates the sociocultural and activity-theoretic "
  "tradition with the posthuman and actor-network tradition; the field offers parallel vocabularies for the same "
  "classroom phenomena. This is the fragmentation our framework is designed to address.")

# ================= 7. FRAMEWORK =================
H("7. Toward an Integrative Framework: The Stance–Structure Continuum", level=1)
P("The preceding sections yield a single organising insight. Across feedback, agency, and process alike, the "
  "decisive variable is not whether AI is present, nor how much of it is used, but the locus and structure of "
  "its intervention. Superficial feedback uptake gives way to productive engagement when AI commentary is "
  "embedded in a structure demanding evaluative judgement (Section 4); ownership erodes at the sentence and "
  "whole-draft locus but is preserved at the ideation and subprocess locus and through elaborated prompting "
  "(Section 5); and offloading breeds metacognitive laziness unless the process is restructured into a designed "
  "cycle of generation, critique, and reflection (Section 6). We propose to formalise this insight as a "
  "two-axis framework for AI-aware writing instruction, with a third, outcome layer.")
H("7.1 Axis 1: theoretical stance (instrumental–mediational ↔ relational–distributed)", level=2)
P("The first axis runs from an instrumental–mediational stance, in which AI is a tool wielded by an agentive "
  "human writer (the sociocultural and activity-theoretic pole), to a relational–distributed stance, in which "
  "agency and authorship are distributed across a human–AI assemblage (the posthuman and actor-network pole). We "
  "advance the framework’s central theoretical claim here: these are not competing truths about what AI "
  "“really” is, but describable positions that vary with the writer’s stance, the task, and the design of "
  "instruction. Empirical work supports treating stance as a variable rather than a verdict: studies of "
  "contrasting writers document both instrumental orientations (AI as a trainable tool refined through iterative "
  "prompting) and relational orientations (AI as a quasi-agentive collaborator) within the same instructional "
  "setting, and activity-theoretic work shows the orientation shifting by discipline (Chen et al., 2025). The "
  "pedagogical pay-off of placing these traditions on a single axis is that an instructor can choose a stance "
  "deliberately—cultivating instrumental control when the aim is to protect an emerging voice, and exploring "
  "distributed authorship when the aim is to teach critical reflection on human–machine entanglement—rather than "
  "inheriting one camp’s ontology by default.")
H("7.2 Axis 2: instructional structure (locus, scaffolding, documentation)", level=2)
P("The second axis specifies the structure of AI integration along three design parameters that the evidence "
  "identifies as decisive. The first is locus: at which point in the writing process AI is invited to "
  "contribute—invention and ideation, sentence-level generation, feedback and revision, or whole-draft "
  "production. The agency evidence indicates that earlier-stage, ideation-oriented loci preserve ownership "
  "whereas later-stage, text-generative loci erode it (Joshi & Vogel, 2025; Siddiqui et al., 2025). The second "
  "is scaffolding: whether AI use is wrapped in a designed cycle that requires students to set goals, evaluate "
  "outputs, and reflect, which the process evidence identifies as the difference between metacognitive laziness "
  "and higher-order gain (Fan et al., 2025). The third is documentation: whether the human contribution is made "
  "visible through process artifacts—prompt logs, revision tracking, “tech-off” reflections—as in Elturki’s "
  "(2026) Process Pedagogy 2.0 and the reflective component of PAIRR (Sperber et al., 2025). Together these "
  "parameters convert the abstract injunction to use AI “thoughtfully” into specifiable instructional design "
  "choices.")
H("7.3 The outcome layer: feedback literacy and authorial agency", level=2)
P("The two axes are oriented toward an outcome layer that distinguishes AI-aware writing instruction from mere "
  "AI adoption: the cultivation of feedback literacy (the capacity to appreciate, judge, and act on "
  "feedback—including machine feedback—per Carless & Boud, 2018) and authorial agency (the capacity to "
  "authorise, adapt, and overrule AI contributions in the service of a rhetorical purpose and a recognisable "
  "voice). This layer also supplies the framework’s empirical test. Distributed-cognition outcomes—whether "
  "offloading produces knowledge transformation and transfer or merely improved products—operationalise the "
  "framework’s predictions: instruction located at agency-preserving loci, wrapped in evaluative scaffolding, "
  "and made visible through documentation should yield gains in feedback literacy, ownership, and transfer, "
  "whereas instruction that automates text production without such structure should yield product gains without "
  "learning gains, consistent with the dissociation Fan et al. (2025) report.")
H("7.4 Using the framework", level=2)
P("The framework is intended to be generative for both design and research. As a design tool, it lets an "
  "instructor locate a given assignment in the stance–structure space and ask whether its configuration serves "
  "the intended outcome: a first-year composition task aiming to build voice might adopt an "
  "instrumental–mediational stance, an ideation-stage locus, heavy evaluative scaffolding, and prompt-log "
  "documentation; a graduate seminar interrogating authorship in the postdigital condition might deliberately "
  "occupy the relational–distributed pole to make entanglement an object of reflection. As a research tool, the "
  "framework reframes the field’s central question from “does AI help or harm writing?” to “under which "
  "stance–structure configurations does AI-mediated instruction cultivate feedback literacy and authorial "
  "agency?”—a question that integrates, rather than merely juxtaposes, the process, feedback, and theory "
  "literatures the field has so far kept apart.")

# ================= 8. IMPLICATIONS =================
H("8. Implications for Practice", level=1)
P("Several practical implications follow. First, writing programmes should treat feedback literacy as an "
  "explicit curricular outcome in the GenAI era, teaching students to evaluate machine-generated commentary "
  "against rhetorical goals rather than to accept or reject it wholesale; the evaluative-judgement component of "
  "feedback literacy is now a transferable academic competency, not an optional refinement. Second, assignment "
  "design should attend to the locus of AI intervention, favouring configurations that invite AI at the stages "
  "of invention and revision—where it can prompt thinking—over configurations that delegate sentence- and "
  "draft-level production, where ownership and learning are most at risk. Third, the visible-thinking strategies "
  "of Process Pedagogy 2.0—prompt logs, revision histories, and reflective “tech-off” writing—offer a practical "
  "means of relocating assessment from the product, which AI can now supply, to the process, which remains the "
  "site of learning. Fourth, hybrid feedback arrangements such as PAIRR show that AI can expand formative "
  "feedback capacity—especially in writing-intensive courses where instructor feedback is scarce—without "
  "displacing the human and peer feedback on which deeper revision depends, provided students are required to "
  "exercise judgement over the AI’s contribution. Finally, instructors can make their theoretical stance a "
  "deliberate pedagogical choice rather than a default inheritance, cultivating instrumental control over AI "
  "where the aim is to protect an emerging voice and opening up distributed authorship for critical examination "
  "where the aim is to develop students’ critical understanding of writing in a postdigital world.")

# ================= 9. LIMITATIONS =================
H("9. Limitations", level=1)
P("This review has several limitations. As a narrative rather than systematic synthesis, its corpus was "
  "selected purposively, and although we searched major databases and hand-searched leading venues, we make no "
  "claim to exhaustive coverage; a different reviewer might weight the literature differently. The evidence base "
  "is uneven in two respects that temper the framework’s generality. It skews heavily toward second-language "
  "and EFL writing contexts and toward English-medium instruction, so its applicability to first-language "
  "composition and to writing in other languages should be established rather than assumed. It also leans on a "
  "small number of experimental studies with modest samples—several of the agency findings rest on single- or "
  "double-digit participant counts—and on a fast-moving body of very recent work, including 2026 publications "
  "whose findings have not yet been independently replicated. Because the field is developing rapidly, some "
  "syntheses we relied upon are themselves preliminary, and the pace of model improvement means that empirical "
  "claims about what AI feedback can and cannot do are provisional. Finally, the integrative framework we propose "
  "is a conceptual contribution derived from the literature; it has not itself been empirically validated, and "
  "Section 10 treats its testing as a priority for future research.")

# ================= 10. FUTURE RESEARCH =================
H("10. Directions for Future Research", level=1)
P("Four directions follow most directly from the framework. First, the stance–structure continuum invites "
  "experimental and design-based research that manipulates the locus, scaffolding, and documentation of AI "
  "integration and measures effects not only on text quality but on feedback literacy, psychological ownership, "
  "and knowledge transfer—extending the locus-of-intervention paradigm (Joshi & Vogel, 2025; Siddiqui et al., "
  "2025) into authentic, longitudinal classroom settings, which remain rare. Second, the field needs validated "
  "instruments for AI-era feedback literacy and authorial agency, so that the framework’s outcome layer can be "
  "measured consistently across studies rather than operationalised ad hoc. Third, the dissociation between "
  "product gains and learning gains (Fan et al., 2025) deserves systematic investigation across tasks and "
  "disciplines to identify the scaffolding conditions under which offloading supports rather than supplants "
  "higher-order thinking. Fourth, the theoretical integration we propose should be tested conceptually and "
  "empirically: do instrumental–mediational and relational–distributed stances in fact index describable "
  "differences in how writers compose with AI, as the framework predicts, and can instruction move students "
  "along that axis deliberately? Pursuing these questions would move the field beyond the student-use and "
  "integrity framings that have defined its first wave, toward a cumulative science of how academic writing is "
  "taught—and learned—in the age of generative AI.")

# ================= 11. CONCLUSION =================
H("11. Conclusion", level=1)
P("The first wave of scholarship on generative AI in higher-education writing asked, understandably, what "
  "students do with the tools and whether it is permissible. This review has argued that the more durable "
  "questions are pedagogical and theoretical: how the teaching of writing is being redesigned, how feedback and "
  "voice can be cultivated rather than merely policed, and how the field’s scattered theoretical resources might "
  "be integrated. Synthesising the teaching-facing literature across feedback, agency, and process, we found a "
  "field that is empirically active but conceptually fragmented, and we identified a principle that unifies its "
  "strongest findings: the locus and structure of AI intervention, not its presence or quantity, determine "
  "whether instruction cultivates or erodes writerly capacity. The stance–structure continuum we propose turns "
  "that principle into a framework that writing instructors can use to design, and researchers can use to study, "
  "AI-aware writing instruction. In reframing generative AI from a threat to be detected into a site for "
  "teaching rhetorical judgement, voice, and feedback literacy, the framework returns the field’s attention to "
  "the question that ought to have been central all along—not what AI does to writing, but how, with AI in the "
  "room, we teach writing well.")

# ================= REFERENCES =================
doc.add_page_break()
H("References", level=1)
references = [
 "Abdellatif, M. S., Alshehri, M. A., Lamouchi, A., Rahmath, M., & Nemt-allah, M. A. (2026). Reimagining "
 "writing assessment for the AI era: A systematic review on balancing AI support and authentic skill growth. "
 "Frontiers in Psychology, 17, 1809174. https://doi.org/10.3389/fpsyg.2026.1809174",

 "Bittle, K., & El-Gayar, O. (2025). Generative AI and academic integrity in higher education: A systematic "
 "review and research agenda. Information, 16(4), 296. https://doi.org/10.3390/info16040296",

 "Burriss, S. K., & Leander, K. M. (2024). Critical posthumanist literacy: Building theory for reading, "
 "writing, and living ethically with everyday artificial intelligence. Reading Research Quarterly, 59(4), "
 "560–569. https://doi.org/10.1002/rrq.565",

 "Carless, D., & Boud, D. (2018). The development of student feedback literacy: Enabling uptake of feedback. "
 "Assessment & Evaluation in Higher Education, 43(8), 1315–1325. "
 "https://doi.org/10.1080/02602938.2018.1463354",

 "Chen, J., Wang, Z., & Zhou, X. (2025). AI-assisted writing: Exploring academic writing strategies of "
 "graduate students across disciplines through activity theory. Higher Education Studies, 15(4), 243–255. "
 "https://doi.org/10.5539/hes.v15n4p243",

 "Crosthwaite, P., & Sun, S. (2026). Generative AI and L2 written feedback studies: A scoping review. RELC "
 "Journal, 57(1), 207–219. https://doi.org/10.1177/00336882251386530",

 "Elturki, E. (2026). AI-aware process writing pedagogy: Rethinking the process-based approach. TESOL Journal, "
 "17(2), e70127. https://doi.org/10.1002/tesj.70127",

 "Emig, J. (1977). Writing as a mode of learning. College Composition and Communication, 28(2), 122–128. "
 "https://doi.org/10.2307/356095",

 "Engeness, I., & Gamlem, S. M. (2025). Exploring AI-driven feedback as a cultural tool: A cultural-historical "
 "perspective on design of AI environments to support students’ writing process. Integrative Psychological "
 "and Behavioral Science, 59, 23. https://doi.org/10.1007/s12124-025-09894-8",

 "Fan, Y., Tang, L., Le, H., Shen, K., Tan, S., Zhao, Y., Shen, Y., Li, X., & Gašević, D. (2025). Beware of "
 "metacognitive laziness: Effects of generative artificial intelligence on learning motivation, processes, and "
 "performance. British Journal of Educational Technology, 56(2), 489–530. "
 "https://doi.org/10.1111/bjet.13544",

 "Flower, L., & Hayes, J. R. (1981). A cognitive process theory of writing. College Composition and "
 "Communication, 32(4), 365–387. https://doi.org/10.2307/356600",

 "Godwin-Jones, R. (2024). Distributed agency in second language learning and teaching through generative AI. "
 "Language Learning & Technology, 28(2), 5–31. https://hdl.handle.net/10125/73570",

 "Graham, S. S. (2023). Post-process but not post-writing: Large language models and a future for composition "
 "pedagogy. Composition Studies, 51(1), 162–168.",

 "Ivanič, R. (1998). Writing and identity: The discoursal construction of identity in academic writing. John "
 "Benjamins. https://doi.org/10.1075/swll.5",

 "Jeon, M., & Lee, K. (2026). Reassembling AI-embraced networked learning through actor-network theory. In L. "
 "Declercq, J. Loeckx, M. De Laat, N. B. Dohn, & T. Ryberg (Eds.), Proceedings of the Fifteenth International "
 "Conference on Networked Learning 2026. Aalborg University.",

 "Joshi, N., & Vogel, D. (2025). Writing with AI lowers psychological ownership, but longer prompts can help. "
 "In Proceedings of the 7th ACM Conference on Conversational User Interfaces (CUI ’25). Association for "
 "Computing Machinery. https://doi.org/10.1145/3719160.3736608",

 "Sandstead, M. G., & Kibler, A. K. (2025). Voice in L2 writing in the age of AI. Journal of Second Language "
 "Writing, 69, 101212. https://doi.org/10.1016/j.jslw.2025.101212",

 "Sanz-Tejeda, A., Domínguez-Oller, J. C., Baldaquí-Escandell, J. M., Gómez-Díaz, R., & "
 "García-Rodríguez, A. (2026). The impact of generative AI on academic reading and writing: A synthesis of "
 "recent evidence (2023–2025). Frontiers in Education, 10, 1711718. "
 "https://doi.org/10.3389/feduc.2025.1711718",

 "Siddiqui, M. N., Feliciano, V., Pea, R., & Subramonyam, H. (2025). AI in the writing process: How purposeful "
 "AI support fosters student writing. arXiv. https://doi.org/10.48550/arXiv.2506.20595",

 "Slimi, Z. (2026). A systematic critical review of generative AI’s impact on authorship, pedagogy, and "
 "integrity (2023–2025). Frontiers in Education, 11, 1769680. https://doi.org/10.3389/feduc.2026.1769680",

 "Sperber, L., MacArthur, M., Minnillo, S., Stillman, N., & Whithaus, C. (2025). Peer and AI review + "
 "reflection (PAIRR): A human-centered approach to formative assessment. Computers and Composition, 76, "
 "102921. https://doi.org/10.1016/j.compcom.2025.102921",

 "Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes (M. Cole, V. "
 "John-Steiner, S. Scribner, & E. Souberman, Eds.). Harvard University Press.",

 "Xiao, F., Zhu, S., & Xin, W. (2025). Exploring the landscape of generative AI (ChatGPT)-powered writing "
 "instruction in English as a foreign language education: A scoping review. ECNU Review of Education, 8(1), "
 "1–19. https://doi.org/10.1177/20965311241310881",

 "Yan, D., & Zhang, S. (2024). L2 writer engagement with automated written corrective feedback provided by "
 "ChatGPT: A mixed-method multiple case study. Humanities and Social Sciences Communications, 11, 1066. "
 "https://doi.org/10.1057/s41599-024-03543-y",

 "Zhai, N., & Ma, X. (2023). The effectiveness of automated writing evaluation on writing quality: A "
 "meta-analysis. Journal of Educational Computing Research, 61(4), 875–900. "
 "https://doi.org/10.1177/07356331221127300",
]
for r in references:
    ref(r)

out = "/home/user/Claude/Teaching_Academic_Writing_GenAI_Narrative_Review.docx"
doc.save(out)
print("SAVED:", out)

# quick word count
wc = sum(len(p.text.split()) for p in doc.paragraphs)
print("Approx body word count:", wc)
print("References:", len(references))
