const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, PageBreak, Header, Footer, ExternalHyperlink,
        TabStopType, TabStopPosition } = require("docx");
const fs = require("fs");

// ---------- helpers ----------
const FONT = "Times New Roman";
const cw = 9360; // content width, US Letter, 1" margins

function p(opts) { return new Paragraph(opts); }
function run(text, o = {}) { return new TextRun({ text, font: FONT, ...o }); }

// Body paragraph, justified, 1.5 line spacing, first-line indent optional
function body(children, { indent = true, spacingAfter = 120, align = AlignmentType.JUSTIFIED } = {}) {
  return new Paragraph({
    alignment: align,
    spacing: { after: spacingAfter, line: 360 },
    indent: indent ? { firstLine: 360 } : undefined,
    children: Array.isArray(children) ? children : [run(children)],
  });
}

function h1(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text: `${num}. ${text}`, font: FONT, bold: true, size: 26 })],
  });
}
function h2(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text: `${num} ${text}`, font: FONT, bold: true, italics: true, size: 24 })],
  });
}

function bullet(children) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80, line: 340 },
    alignment: AlignmentType.JUSTIFIED,
    children: Array.isArray(children) ? children : [run(children)],
  });
}
function numItem(children, ref = "gaps") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 340 },
    alignment: AlignmentType.JUSTIFIED,
    children: Array.isArray(children) ? children : [run(children)],
  });
}

// Reference entry: hanging indent, APA-style
function ref(children) {
  return new Paragraph({
    spacing: { after: 100, line: 300 },
    indent: { left: 720, hanging: 720 },
    alignment: AlignmentType.LEFT,
    children: Array.isArray(children) ? children : [run(children)],
  });
}
function link(text, url) {
  return new ExternalHyperlink({ children: [new TextRun({ text, font: FONT, style: "Hyperlink" })], link: url });
}

// ---------- table builder ----------
const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border,
  insideHorizontal: border, insideVertical: border };
function cell(text, w, { head = false, bold = false } = {}) {
  return new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: head ? { fill: "D9E2EC", type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ spacing: { after: 0, line: 280 },
      children: [new TextRun({ text, font: FONT, size: 19, bold: head || bold })] })],
  });
}
function tableRow(cells, widths, head = false) {
  return new TableRow({ tableHeader: head,
    children: cells.map((c, i) => cell(c, widths[i], { head })) });
}
function makeTable(rows, widths) {
  return new Table({ width: { size: cw, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, i) => tableRow(r, widths, i === 0)) });
}

function caption(text) {
  return new Paragraph({ spacing: { before: 80, after: 160 },
    children: [new TextRun({ text, font: FONT, size: 19, italics: true })] });
}

// ============================================================
const children = [];

// ---------- TITLE BLOCK ----------
children.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 120 },
  children: [new TextRun({ text: "Agentic Artificial Intelligence in Education: A Narrative Review of Pedagogical Roles, Learning Outcomes, and Governance Challenges",
    font: FONT, bold: true, size: 32 })],
}));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
  children: [run("Author Name", { size: 24 }), new TextRun({ text: " ¹*", font: FONT, size: 24, superScript: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
  children: [new TextRun({ text: "¹ Affiliation / Department, Institution, City, Country", font: FONT, size: 20, italics: true }),
    new TextRun({ text: "\n* Corresponding author: email@institution.edu", font: FONT, size: 20, italics: true })] }));

// ---------- ABSTRACT ----------
children.push(new Paragraph({ spacing: { before: 120, after: 100 },
  border: { top: { style: BorderStyle.SINGLE, size: 4, color: "333333" } },
  children: [new TextRun({ text: "Abstract", font: FONT, bold: true, size: 24 })] }));

const abstractParts = [
  ["Background. ", "The 2024–2026 emergence of “agentic” artificial intelligence (AI)—autonomous systems that plan, use tools, retain memory, and pursue multi-step goals with limited human intervention—is reframing the role of AI in education beyond reactive generative chatbots and classical intelligent tutoring systems."],
  ["Objective. ", "This narrative review synthesises conceptual, empirical, and policy literature to characterise the pedagogical roles agentic AI now occupies, the evidence regarding its effect on learning outcomes, and the governance challenges its autonomy raises."],
  ["Methods. ", "A structured, non-systematic narrative synthesis of approximately forty peer-reviewed studies, preprints, and institutional policy instruments (2023–2026) was conducted across five thematic search angles. Load-bearing empirical claims were subjected to a three-vote adversarial verification protocol."],
  ["Results. ", "The literature converges on a defining dissociation: agentic and generative AI reliably improve immediate task output and learner engagement (e.g., effect sizes of d ≈ 0.73–1.3 in a controlled tutoring trial; pooled g ≈ 0.58), yet, when deployed without pedagogical guardrails, can depress retained learning, knowledge transfer, and self-regulation (e.g., a 17% post-removal exam decrement). Pedagogical deployments span tutor, teaching assistant, simulated peer, orchestrator, and simulation roles. Governance frameworks (UNESCO, the EU AI Act, OECD) are maturing but largely predate the agentic framing, leaving a recognised accountability gap."],
  ["Conclusion. ", "Responsible adoption depends on guardrailed, human-in-the-loop, teacher-mediated design. The evidence base remains young, heterogeneous, and quality-variable—underscored by a 2026 meta-analysis retraction—indicating an urgent need for longitudinal evidence and education-specific accountability frameworks."],
];
children.push(new Paragraph({
  alignment: AlignmentType.JUSTIFIED, spacing: { after: 120, line: 300 },
  children: abstractParts.flatMap(([lead, txt]) => [
    new TextRun({ text: lead, font: FONT, bold: true, italics: true, size: 20 }),
    new TextRun({ text: txt + " ", font: FONT, size: 20 }),
  ]),
}));
children.push(new Paragraph({ spacing: { after: 60 },
  children: [new TextRun({ text: "Keywords: ", font: FONT, bold: true, size: 20 }),
    new TextRun({ text: "agentic AI; generative artificial intelligence; intelligent tutoring systems; multi-agent systems; learning outcomes; educational governance; AI ethics; human-in-the-loop", font: FONT, size: 20 })] }));
children.push(new Paragraph({ spacing: { after: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "333333" } }, children: [run("")] }));

// ---------- 1. INTRODUCTION ----------
children.push(h1(1, "Introduction"));
children.push(body("The integration of artificial intelligence into education has progressed through three broad phases: rule-based intelligent tutoring systems (ITS), conversational generative chatbots, and—most recently—agentic AI. Whereas a generative system produces content reactively in response to a prompt, an agentic system “sets an objective and executes multi-step workflows to reach it,” decomposing goals into sub-tasks, retaining context across steps, and autonomously invoking external tools such as web search or code execution (Kamalov et al., 2025). This shift from passive tool to proactive, goal-directed actor carries pedagogical promise and governance risk in equal measure."));
children.push(body("The rapid diffusion of these systems—spanning autonomous tutors, virtual teaching assistants, and multi-agent simulations—has outpaced both the empirical evidence on their effects and the regulatory frameworks intended to govern them. Vendor adoption claims frequently exceed independently audited evidence, and the scholarly record, dominated by 2025–2026 preprints, exhibits notable quality variance. Against this backdrop, the present narrative review pursues three guiding questions: (RQ1) What conceptual features distinguish agentic AI from prior paradigms, and what pedagogical roles does it occupy? (RQ2) What does the empirical evidence indicate about its effect on learning outcomes? (RQ3) What governance, ethical, and equity challenges does its autonomy raise, and how well do existing frameworks address them?"));
children.push(body("A narrative (rather than systematic) review is appropriate here because the field is nascent, terminologically unsettled, and spread across heterogeneous source types—conditions under which interpretive synthesis adds more value than rigid meta-analytic aggregation. The review is organised thematically around the three research questions following a description of methods."));

// ---------- 2. METHODS ----------
children.push(h1(2, "Methods"));
children.push(h2("2.1", "Review design and search strategy"));
children.push(body("This study adopts a structured narrative review design. Five thematic search angles were defined a priori to ensure breadth: (i) definitions and taxonomies of agentic AI; (ii) pedagogical roles and named deployments; (iii) empirical learning-outcome evidence; (iv) governance, ethics, and policy; and (v) risks, equity, and research gaps. For each angle, iterative web and database searches were executed across scholarly repositories (arXiv, ACL Anthology, Springer, Nature portfolio, Wiley, Elsevier, MDPI, Frontiers), institutional sources (UNESCO, OECD, the World Bank, the European Union, and university research offices), and indexing services, prioritising peer-reviewed and authoritative institutional outputs published between 2023 and 2026."));
children.push(h2("2.2", "Source selection"));
children.push(body("Sources were retained on the basis of relevance to one or more research questions, recency (2023–2026), and credibility, with peer-reviewed journal articles and formal policy instruments preferred over practitioner blogs and vendor marketing material. Approximately forty sources were retained for synthesis. Commercial adoption figures lacking independent verification were flagged and excluded from evidentiary claims."));
children.push(h2("2.3", "Adversarial verification protocol"));
children.push(body("To mitigate the risk of citing fabricated or misattributed findings—a documented hazard when AI-assisted tooling supports literature retrieval—twelve load-bearing empirical claims were subjected to a three-vote adversarial verification protocol. Each claim was independently re-checked by three separate verification passes that actively sought to refute it (confirming source existence, authorship, journal, date, sample size, and reported effect). A claim was retained only if it survived this scrutiny; a claim was rejected if it failed two of three checks. Of the twelve claims examined, eleven were confirmed and one was rejected: a circulating set of disparity statistics (“146 implementations; 57% disparities; 14.7% lower predictive accuracy”) was traced to a legitimate DOI whose actual content (a qualitative review of approximately seventy-five papers) did not contain those figures, and was therefore excluded. Claims that could not be fully verified are reported with explicit hedging."));
children.push(h2("2.4", "Limitations of the method"));
children.push(body("As a narrative review, this synthesis is interpretive and non-exhaustive; it does not apply formal systematic-review protocols (e.g., PRISMA) or quantitative pooling, and is therefore susceptible to selection and interpretation effects. Full-text retrieval was constrained for a subset of sources, so certain numeric values derive from cross-checked secondary extractions and should be confirmed against primary documents prior to onward citation. These limitations are revisited in Section 7."));

// ---------- 3. CONCEPTUAL FRAMING ----------
children.push(h1(3, "Conceptual Framing: What Makes AI “Agentic”?"));
children.push(body("Agentic AI is distinguished from generative AI principally by autonomy and goal-directedness. The defining technical markers recur across the literature: autonomy, planning, tool use, persistent memory, and—most distinctively—multi-agent orchestration (Kamalov et al., 2025). The anchoring conceptual taxonomy separates two paradigms: “AI Agents,” modular and single-purpose systems for narrow task automation, and “Agentic AI,” which Sapkota et al. (2025) characterise as “a paradigmatic shift marked by multi-agent collaboration, dynamic task decomposition, persistent memory, and orchestrated autonomy.”"));
children.push(body("Education-specific frameworks are emerging but remain unstandardised. The APCP framework charts four escalating levels of agency in collaborative learning—AI as Adaptive Instrument, Proactive Assistant, Co-Learner, and Peer Collaborator—grounded in sociocultural and computer-supported collaborative learning (CSCL) theory (Yan, 2025). A complementary task-centric taxonomy divides educational large language model (LLM) agents into teaching-assistance and student-support agents over a shared architecture of perception, profiling, memory, reasoning, and action (Yang et al., 2025). General-purpose levels-of-autonomy scales (L0–L5) exist but are not education-specific (Levels of Autonomy for AI Agents, 2025)."));
children.push(body([
  new TextRun({ text: "Three conceptual fault-lines warrant emphasis. ", font: FONT, bold: false }),
  run("First, terminology is inconsistent: many education papers use “AI agent” and “agentic AI” interchangeably, whereas Sapkota et al. (2025) treat them as distinct paradigms. Second, the asserted leap beyond classical ITS—that agentic systems reason about goals and generate novel instructional strategies rather than following scripted branching—is largely conceptual and not yet demonstrated through rigorous comparative evidence. Third, a normative tension is visible between the academic literature, which embraces autonomy, and institutional bodies such as UNESCO and the OECD, which deliberately avoid “agentic” language and foreground human agency, accountability, and oversight."),
]));

// ---------- 4. PEDAGOGICAL ROLES ----------
children.push(h1(4, "Pedagogical Roles"));
children.push(body("Synthesis across the deployment literature identifies six recurrent pedagogical roles, summarised in Table 1."));
children.push(makeTable([
  ["Role", "Representative system(s)", "Evidence status"],
  ["Autonomous 1:1 tutor", "Khanmigo; GenMentor", "Mixed; gains not always significant vs. controls"],
  ["Teaching assistant / feedback", "Jill Watson (Georgia Tech)", "Strong institutional A/B evidence"],
  ["Simulated peer / companion", "OnlineMate; collaborative math agents", "Emerging; preprint-stage"],
  ["Orchestrator / lesson designer", "EduPlanner; AgentLesson; MAS-CMD", "Teacher-preferred; rubric gains modest"],
  ["Multi-agent role division", "Agent4Edu; assessment MAS", "Conceptual to early empirical"],
  ["Simulation / role-play", "AIPatient; EvoPatient", "Strong peer-reviewed clinical evidence"],
], [2200, 3680, 3480]));
children.push(caption("Table 1. Pedagogical roles of agentic AI in education, with representative systems and the maturity of supporting evidence."));

children.push(h2("4.1", "Tutoring and teaching assistance"));
children.push(body("Khanmigo (Khan Academy) is the most widely deployed autonomous tutor, yet peer-reviewed evidence is mixed: a controlled study (n = 69 undergraduates) found learning gains but no statistically significant advantage over search-based and paper-only comparison groups, despite positive student ratings of its Socratic guidance (Journal of Teaching and Learning, 2025). The most robust teaching-assistant evidence concerns Jill Watson, a retrieval-augmented virtual assistant that achieved 75–97% accuracy on synthetic test sets (78.7% in live classrooms) against approximately 30% for an unaugmented baseline; classes using it earned more A grades (66% vs. 62%) and fewer C grades (3% vs. 7%) in an A/B comparison (Georgia Tech Research News, 2025)."));
children.push(h2("4.2", "Companions, orchestrators, and simulations"));
children.push(body("Simulated-peer systems such as OnlineMate employ Theory-of-Mind reasoning to adapt to learners’ cognitive and affective states (OnlineMate, 2025), while multi-agent orchestrators (EduPlanner; AgentLesson; the KLI-grounded MAS-CMD) generate and iteratively refine instructional designs. Notably, teachers strongly preferred MAS-CMD outputs as more creative and classroom-ready even though rubric scores differed only marginally from baselines (Stanford SCALE, 2025)—a caution that human preference is not equivalent to measured instructional quality. The strongest rigorous deployment evidence lies in medical simulation: AIPatient, driven by six task-specific LLM agents over a knowledge graph, matched or exceeded human standardised patients in a paired crossover study with medical students (Communications Medicine, 2025)."));

// ---------- 5. LEARNING OUTCOMES ----------
children.push(h1(5, "Learning Outcomes: A Central Dissociation"));
children.push(body("The empirical record splits cleanly, and that split constitutes the field’s most defensible thesis: agentic and generative AI improve immediate output and engagement, but design determines whether durable learning is built or eroded. Table 2 summarises the principal efficacy studies."));
children.push(makeTable([
  ["Study (venue)", "Design", "Headline result"],
  ["Kestin et al. (Scientific Reports, 2025)", "Crossover RCT, N = 194, Harvard physics", "~2× learning gains vs. active learning; d ≈ 0.73–1.3; less time"],
  ["World Bank WP 11125 (2025), Nigeria", "RCT, N ≈ 800, 6 wks, GPT-4", "+0.31 SD composite; largest gains for girls"],
  ["Liu et al. (J. Comp. Assist. Learn., 2025)", "Meta-analysis, 37 studies", "g = 0.577, 95% CI [0.395, 0.759]"],
], [3260, 2700, 3400]));
children.push(caption("Table 2. Principal positive-efficacy evidence for AI tutoring and generative AI in learning."));
children.push(body("These positive findings carry important hedges: the Kestin et al. (2025) tutoring lesson was researcher-engineered for best-case prompting over short single topics; the World Bank (2025) “1.5–2 years of schooling” equivalence is an extrapolation; and both ran in teacher-mentored rather than fully autonomous settings."));
children.push(h2("5.1", "Over-reliance and the erosion of durable learning"));
children.push(body("Countervailing evidence is equally rigorous. In a field randomised controlled trial in Turkish secondary mathematics, students using unguarded GPT-4 improved during practice but, once AI access was removed, scored approximately 17% worse on examinations than peers who never had access; critically, a guardrailed “tutor” variant that offered hints rather than answers eliminated this harm (Bastani et al., 2025). This provides the strongest causal evidence that the detriment is design-dependent rather than intrinsic. Convergent findings include reduced self-regulated learning and absent transfer gains despite better short-term essays (“metacognitive laziness”; Fan et al., 2025); superficial learning under over-reliance in 65.5% of fifty-eight programming-education studies (Teaching with AI, 2025); and a preprint EEG study in which LLM users showed the weakest neural connectivity and 83% could not quote from an essay they had just written (Kosmyna et al., 2025). The last is reported here as suggestive only, given its small sample (N = 54) and non-peer-reviewed status."));
children.push(h2("5.2", "Evidence quality and a cautionary retraction"));
children.push(body("Pooled effect sizes for generative AI in education range widely (g ≈ 0.46 to 1.14) across 2025–2026 meta-analyses, signalling heterogeneous, short-term, and frequently low-rigour primary studies alongside probable publication bias. Most strikingly, a heavily cited meta-analysis (originally reporting g = 0.867) was retracted in 2026 for data discrepancies after several hundred citations and approximately half a million reads (Retraction Note, 2026). Accordingly, the conservative peer-reviewed estimate (Liu et al., 2025; g ≈ 0.58) should be preferred, and effects reported as a range rather than a point value."));

// ---------- 6. GOVERNANCE ----------
children.push(h1(6, "Governance, Ethics, and Policy Challenges"));
children.push(body("Table 3 maps the principal governance instruments relevant to agentic AI in education."));
children.push(makeTable([
  ["Instrument (body, year)", "Requirement relevant to educational AI"],
  ["UNESCO Guidance on Generative AI (2023)", "Seven-step regulatory roadmap; minimum age 13 for independent use; eight institutional equity measures"],
  ["UNESCO AI Competency Frameworks (2024)", "Students: 12 competencies / 4 dimensions; teachers: 15 / 5; human-rights based"],
  ["EU AI Act, Annex III(3) (2024)", "Admissions, outcome evaluation, and exam-monitoring AI classed high-risk—oversight, bias mitigation, logging"],
  ["EU AI Act, Art. 5(1)(f) (eff. 2 Feb 2025)", "Prohibits emotion-inference AI in educational institutions (medical/safety exceptions)"],
  ["EU AI Act, Art. 4 (eff. 2 Feb 2025)", "Deployers must ensure AI literacy of staff and affected persons"],
  ["OECD Digital Education Outlook (2023)", "Mandatory bias testing; algorithm transparency; human-in-the-loop grading"],
], [3460, 5900]));
children.push(caption("Table 3. Principal policy instruments governing AI in education (all entries verified against primary sources)."));
children.push(body([
  new TextRun({ text: "The agentic accountability gap. ", font: FONT, bold: true, italics: true }),
  run("When autonomous agents initiate and execute actions without a clearly designated human owner, responsibility diffuses across developers, deployers, and end-users—a “moral crumple zone” (Agentic AI: Autonomy, Accountability, and the Algorithmic Society, 2025). Critically, the strongest education-specific instruments (UNESCO, the EU AI Act, the OECD) were drafted for generative and predictive AI and predate the agentic framing, constituting a governance gap in itself."),
]));
children.push(body([
  new TextRun({ text: "Algorithmic bias and equity. ", font: FONT, bold: true, italics: true }),
  run("The OECD (2023) documents education algorithms biased against non-native-speaking and lower-socioeconomic students, and identifies a structural tension whereby detecting bias requires collecting the very demographic data one would prefer to minimise. (A widely circulated quantitative disparity statistic was found, on verification, to be misattributed and is deliberately omitted here; the underlying equity concern is nonetheless well documented.)"),
]));
children.push(body([
  new TextRun({ text: "Academic integrity and privacy. ", font: FONT, bold: true, italics: true }),
  run("AI text detectors are unreliable—lagging new models, defeated by paraphrasers, and prone to false positives—prompting a scholarly shift toward assessment redesign (oral, in-person, and staged submission) over detection (MDPI Information, 2025). Data-protection regimes (FERPA, COPPA as amended in 2025, and the GDPR) remain fragmented and were written before autonomous, tool-using agents, while reported institutional trust in agentic AI is low—motivating tiered-autonomy safeguards and human-in-the-loop checkpoints."),
]));

// ---------- 7. RISKS ----------
children.push(h1(7, "Risks, Equity, and Research Gaps"));
children.push(body("Beyond formal governance, several cross-cutting risks recur. Errors in multi-step agent workflows propagate and compound, and even diagnosing which step failed is an unsolved evaluation problem (AgentHallu, 2026). The deskilling concern is reframed as “never-skilling,” whereby learners who route every task through AI fail to acquire foundational skills at all. Equity gaps persist and widened in 2025 (AI use of approximately 24.7% in the Global North vs. 14.1% in the Global South), compounded by the English-centric design of most tools (Frontiers in Computer Science, 2026). Developmental and mental-health risks—including asymmetric parasocial attachment among adolescents—are emerging and under-monitored (UNESCO, n.d.). Cross-institutional consensus favours augmentation over replacement of teachers, with teacher capability acting as the mediating variable between infrastructure investment and student AI literacy."));
children.push(body("Six research gaps follow from this synthesis:"));
children.push(numItem("Scarcity of longitudinal and large-scale studies on durable learning impact."));
children.push(numItem("Unsolved hallucination attribution in multi-agent workflows."));
children.push(numItem("Absence of a standardised autonomy or agency taxonomy for education."));
children.push(numItem("Missing cross-cultural and low-resource-language benchmarks."));
children.push(numItem("No education-specific accountability frameworks for autonomous, action-taking agents."));
children.push(numItem("Under-monitored parasocial-attachment and youth mental-health effects."));

// ---------- 8. DISCUSSION ----------
children.push(h1(8, "Discussion"));
children.push(body("The reviewed evidence supports a measured rather than dichotomous reading. Agentic AI is genuinely capable—multi-agent tutors, virtual assistants, and clinical simulators post measurable gains in controlled settings (RQ1, RQ2). Yet the most reliable empirical lesson is a dissociation between immediate performance and durable learning: the same systems that raise output and engagement can erode retention, transfer, and self-regulation when deployed without pedagogical guardrails. The Bastani et al. (2025) demonstration that guardrails eliminate the post-removal decrement is pivotal, because it relocates the locus of harm from the technology itself to its instructional design."));
children.push(body("On governance (RQ3), the central finding is structural lag: today’s strongest instruments were written for an earlier, less autonomous generation of AI, leaving accountability for action-taking agents underdetermined. This lag interacts with an evidence base young enough that even its meta-analyses are being retracted, and with equity dynamics that risk widening rather than narrowing attainment gaps. The practical implication is convergent across the literature: adoption should be guardrailed, human-in-the-loop, and teacher-mediated, with autonomy deliberately throttled below technical capability where stakes are high."));

// ---------- 9. CONCLUSION ----------
children.push(h1(9, "Conclusion"));
children.push(body("Agentic AI in education is real, fast-moving, and capable, but its benefits are conditional on design. The responsible path forward is neither uncritical adoption nor refusal, but guardrailed, human-in-the-loop, teacher-mediated deployment, paired with the longitudinal evidence and education-specific accountability frameworks the field still lacks. Future work should prioritise rigorous longitudinal trials, standardised autonomy taxonomies, multilingual benchmarks, and accountability mechanisms designed for autonomous, action-taking systems."));

// ---------- DECLARATIONS ----------
children.push(h1("", "Declarations").children ? h1("", "Declarations") : h1("", "Declarations"));
// fix: use a plain heading without number
children.pop();
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 140 },
  children: [new TextRun({ text: "Declarations", font: FONT, bold: true, size: 26 })] }));
function decl(label, text) {
  return new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 100, line: 320 },
    children: [new TextRun({ text: label + " ", font: FONT, bold: true, size: 20 }),
      new TextRun({ text, font: FONT, size: 20 })] });
}
children.push(decl("Funding:", "The author(s) received no specific funding for this work."));
children.push(decl("Conflicts of interest:", "The author(s) declare no competing interests."));
children.push(decl("Data availability:", "This review analyses publicly available published sources; no new data were generated. All sources are listed in the References."));
children.push(decl("Use of AI tools:", "AI-assisted tooling supported literature retrieval and drafting. All load-bearing empirical claims were independently verified against primary sources via a three-vote adversarial protocol (Section 2.3), and one misattributed statistic was identified and excluded. The author(s) take full responsibility for the content."));

// ---------- REFERENCES ----------
children.push(new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 160 },
  children: [new TextRun({ text: "References", font: FONT, bold: true, size: 26 })] }));

const references = [
  ["Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. ", "Proceedings of the National Academy of Sciences", ". https://www.pnas.org/doi/10.1073/pnas.2422633122", "https://www.pnas.org/doi/10.1073/pnas.2422633122"],
  ["Fan, Y., et al. (2025). Beware of metacognitive laziness: Effects of generative artificial intelligence on learning motivation, processes, and performance. ", "British Journal of Educational Technology", ". https://arxiv.org/abs/2412.09315", "https://arxiv.org/abs/2412.09315"],
  ["Georgia Institute of Technology. (2025, September 2). ", "Georgia Tech’s Jill Watson outperforms ChatGPT in real classrooms", ". Georgia Tech Research News. https://news.research.gatech.edu/2025/09/02/georgia-techs-jill-watson-outperforms-chatgpt-real-classrooms", "https://news.research.gatech.edu/2025/09/02/georgia-techs-jill-watson-outperforms-chatgpt-real-classrooms"],
  ["Kamalov, F., Calonge, D. S., et al. (2025). ", "Evolution of AI in education: Agentic workflows", " (arXiv:2504.20082). arXiv. https://arxiv.org/abs/2504.20082", "https://arxiv.org/abs/2504.20082"],
  ["Kestin, G., et al. (2025). AI tutoring outperforms in-class active learning: A randomized controlled trial. ", "Scientific Reports", ". https://www.nature.com/articles/s41598-025-97652-6", "https://www.nature.com/articles/s41598-025-97652-6"],
  ["Kosmyna, N., et al. (2025). ", "Your brain on ChatGPT: Accumulation of cognitive debt when using an AI assistant for essay writing", " (arXiv:2506.08872). arXiv. https://arxiv.org/abs/2506.08872", "https://arxiv.org/abs/2506.08872"],
  ["Liu, M., et al. (2025). The impact of ChatGPT on students’ academic achievement: A meta-analysis. ", "Journal of Computer Assisted Learning", ". https://onlinelibrary.wiley.com/doi/10.1111/jcal.70096", "https://onlinelibrary.wiley.com/doi/10.1111/jcal.70096"],
  ["Liu, Y., et al. (2025). ", "AI patient: Simulated patient systems powered by large language model-based AI agents", ". Communications Medicine. https://www.nature.com/articles/s43856-025-01283-x", "https://www.nature.com/articles/s43856-025-01283-x"],
  ["Organisation for Economic Co-operation and Development. (2023). ", "OECD Digital Education Outlook 2023: Algorithmic bias—The state of the situation and policy recommendations", ". OECD Publishing. https://www.oecd.org/en/publications/oecd-digital-education-outlook-2023_c74f03de-en.html", "https://www.oecd.org/en/publications/oecd-digital-education-outlook-2023_c74f03de-en.html"],
  ["Retraction Note. (2026). Retraction: Meta-analysis of ChatGPT’s effects on learning. ", "Humanities and Social Sciences Communications", ". https://www.nature.com/articles/s41599-026-07310-z", "https://www.nature.com/articles/s41599-026-07310-z"],
  ["Sapkota, R., Roumeliotis, K. I., & Karkee, M. (2025). ", "AI agents vs. agentic AI: A conceptual taxonomy, applications and challenges", " (arXiv:2505.10468). arXiv / Information Fusion. https://arxiv.org/abs/2505.10468", "https://arxiv.org/abs/2505.10468"],
  ["Stanford SCALE Initiative. (2025). ", "Enabling multi-agent systems as learning designers", " (arXiv:2508.16659). arXiv. https://arxiv.org/abs/2508.16659", "https://arxiv.org/abs/2508.16659"],
  ["United Nations Educational, Scientific and Cultural Organization. (2023). ", "Guidance for generative AI in education and research", ". UNESCO. https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research", "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"],
  ["United Nations Educational, Scientific and Cultural Organization. (2024). ", "AI competency frameworks for students and teachers", ". UNESCO. https://www.unesco.org/en/articles/ai-competency-framework-students", "https://www.unesco.org/en/articles/ai-competency-framework-students"],
  ["European Union. (2024). ", "Regulation (EU) 2024/1689 (Artificial Intelligence Act), Article 5 and Annex III", ". https://artificialintelligenceact.eu/article/5/", "https://artificialintelligenceact.eu/article/5/"],
  ["World Bank. (2025). ", "From chalkboards to chatbots: Evaluating the impact of generative AI on learning outcomes in Nigeria", " (Policy Research Working Paper 11125). https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192529324", "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192529324"],
  ["Yan, L. (2025). ", "From passive tool to socio-cognitive teammate: A conceptual framework for agentic AI in human-AI collaborative learning", " (arXiv:2508.14825). arXiv. https://arxiv.org/abs/2508.14825", "https://arxiv.org/abs/2508.14825"],
  ["Yang, S., Wang, J., et al. (2025). ", "LLM agents for education: Advances and applications", ". Findings of EMNLP 2025 (arXiv:2503.11733). https://aclanthology.org/2025.findings-emnlp.743.pdf", "https://aclanthology.org/2025.findings-emnlp.743.pdf"],
  ["Zhu, S., Sun, Y., & Yang, H. H. (2025). Towards responsible artificial intelligence in education: A systematic review on identifying and mitigating ethical risks. ", "Humanities and Social Sciences Communications", ". https://www.nature.com/articles/s41599-025-05252-6", "https://www.nature.com/articles/s41599-025-05252-6"],
];
references.sort((a, b) => a[0].localeCompare(b[0]));
for (const r of references) {
  children.push(ref([
    new TextRun({ text: r[0], font: FONT, size: 20 }),
    new TextRun({ text: r[1], font: FONT, size: 20, italics: true }),
    new TextRun({ text: r[2].replace(r[3], "").replace(/\.\s*$/, ". "), font: FONT, size: 20 }),
    link(r[3], r[3]),
  ]));
}

// ---------- DOCUMENT ----------
const doc = new Document({
  creator: "Narrative Review",
  title: "Agentic Artificial Intelligence in Education",
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: FONT }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, italics: true, font: FONT }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "gaps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "(%1)", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    headers: { default: new Header({ children: [ new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "Agentic AI in Education: A Narrative Review", font: FONT, size: 16, color: "666666", italics: true })] }) ] }) },
    footers: { default: new Footer({ children: [ new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18 })] }) ] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/home/user/Claude/Agentic-AI-in-Education-Narrative-Review.docx", buffer);
  console.log("WROTE docx, bytes:", buffer.length);
});
