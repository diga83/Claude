# Agentic Artificial Intelligence in Education: A Narrative Review of Pedagogical Roles, Learning Outcomes, and Governance Challenges

*Deep-research synthesis · compiled 4 June 2026 · all load-bearing claims passed 3-vote adversarial verification unless flagged otherwise.*

---

## Abstract

The 2024–2026 wave of "agentic" AI — systems that plan, use tools, hold memory, and pursue multi-step goals with limited human intervention — is reframing how artificial intelligence is positioned in education. This narrative review synthesizes ~40 sources (peer-reviewed studies, preprints, and institutional policy instruments) across five dimensions: (1) what makes AI *agentic* versus generative; (2) the pedagogical roles agentic systems now occupy; (3) the empirical evidence on learning outcomes; (4) governance, ethics, and policy challenges; and (5) risks and research gaps. The headline finding is a **dissociation**: agentic and generative AI reliably improve *immediate task output* and engagement, yet — when poorly designed — can *depress retained learning, transfer, and self-regulation*. Governance frameworks (UNESCO, EU AI Act, OECD) are maturing but largely predate the *agentic* (action-taking, autonomous) framing, leaving a recognized accountability gap. The evidence base is young, preprint-heavy, and already shows quality-control failures, including a high-profile 2026 meta-analysis retraction.

---

## 1. Conceptual Framing: What Makes AI "Agentic"?

**Agentic AI is distinguished from generative AI by autonomy and goal-directedness.** Where a generative chatbot produces content reactively on request, agentic AI "sets an objective and executes multi-step workflows to reach it," decomposing goals into sub-tasks, retaining context across steps, and actively invoking tools. The defining technical markers converge across the literature: **autonomy, planning, tool use, persistent memory, and multi-agent orchestration** (Kamalov et al., *Evolution of AI in Education: Agentic Workflows*, arXiv:2504.20082, Apr 2025).

The anchoring conceptual taxonomy separates two paradigms: **"AI Agents"** — modular, single-purpose LLM-driven systems for narrow task automation — from **"Agentic AI"**, "a paradigmatic shift marked by multi-agent collaboration, dynamic task decomposition, persistent memory, and orchestrated autonomy" (Sapkota, Roumeliotis & Karkee, arXiv:2505.10468, May 2025; peer-reviewed in Elsevier *Information Fusion*). ✅ *Verified 3/3.*

Education-specific frameworks are emerging but **not yet standardized**:
- The **APCP framework** charts four escalating levels of AI agency in collaborative learning — AI as (1) Adaptive Instrument, (2) Proactive Assistant, (3) Co-Learner, (4) Peer Collaborator — grounded in sociocultural / CSCL theory (Yan, *From Passive Tool to Socio-cognitive Teammate*, arXiv:2508.14825, Aug 2025; curated by Stanford SCALE).
- A **task-centric taxonomy** divides educational LLM agents into *Teaching-Assistance* agents and *Student-Support* agents over a shared architecture of perception, profiling, memory, reasoning, and action (Yang, Wang et al., *LLM Agents for Education*, EMNLP 2025 Findings; arXiv:2503.11733).
- General-purpose **L0–L5 autonomy scales** (modeled on automotive SAE levels) exist but are not education-specific (arXiv:2506.12469, Jun 2025).

> **Conceptual fault-line to flag:** terminology is inconsistent — many education papers use "AI agent" and "agentic AI" interchangeably, while Sapkota et al. argue they are distinct paradigms. Likewise, the claimed leap *beyond* classical intelligent tutoring systems (ITS) is asserted more than empirically demonstrated. And institutional bodies (UNESCO, OECD) deliberately avoid "agentic/autonomous" language, foregrounding *human agency* — a normative tension running through the whole field.

---

## 2. Pedagogical Roles

Agentic systems now occupy at least six distinguishable roles:

### 2.1 Autonomous / personalized 1:1 tutor
- **Khanmigo** (Khan Academy) is the most widely deployed AI tutor across math, humanities, and coding. Evidence is **mixed**: a peer-reviewed controlled study (n=69 undergraduates) found learning gains but **no statistically significant advantage over Google-search and paper-only comparison groups**, though students rated its step-by-step Socratic guidance positively (*Journal of Teaching and Learning*, 19(4), 2025).
- **GenMentor** maps learner goals to required skills via a fine-tuned goal-to-skill model and schedules adaptive paths (ACM Web Conference 2025; arXiv:2501.15749).

### 2.2 Teaching assistant / grading & feedback agent
- **Jill Watson** (Georgia Tech) is the canonical virtual TA — a RAG + LLM system that answers student questions and gives assignment feedback, deployable as an LTI tool inside Canvas/Blackboard. It achieved **75–97% accuracy on synthetic test sets (78.7% in real classrooms) versus ~30% for an OpenAI Assistant baseline**, and classes using it earned **more A grades (66% vs 62%) and fewer C grades (3% vs 7%)** in an OMSCS A/B test (Georgia Tech Research News, 2 Sep 2025). ✅ *Verified 3/3.*

### 2.3 Simulated peer / learning companion
- **OnlineMate** uses Theory-of-Mind reasoning to play a peer-like companion, inferring and adapting to learners' cognitive and psychological states (arXiv:2509.14803, 2025).
- In multi-agent math tutoring, **peer-to-peer collaboration** (agents as equals cross-verifying intermediate results) outperformed Socratic, reciprocal-teaching, and debate configurations (AIED 2025; arXiv:2507.17753).

### 2.4 Orchestrator / lesson & curriculum designer
- **EduPlanner** (arXiv:2504.05370) and **AgentLesson** (Springer, 2025, Writer + Evaluator agents) generate and iteratively refine instructional designs.
- A KLI-grounded multi-agent "learning designer" (**MAS-CMD**, Stanford SCALE, arXiv:2508.16659) was **strongly preferred by teachers (n=20)** as more creative and classroom-ready — even though rubric scores showed only small/insignificant differences versus baselines, a useful caution that human preference ≠ measured quality.

### 2.5 & 2.6 Multi-agent role-division and simulation/role-play
The most rigorous deployment evidence is in **medical simulation**: **AIPatient**, driven by six task-specific LLM agents over a knowledge graph built from MIMIC-III data, **matched or outperformed human standardized patients** (including on emotional realism and reliability) in a paired crossover study with medical students (*Communications Medicine* / Nature, s43856-025-01283-x, 2025). ✅ *Verified.* **EvoPatient** extends this with coevolving doctor–patient agents (ACL 2025).

> **Caveat on adoption figures:** vendor reach numbers (e.g., Khanmigo's "170M+ users," Squirrel AI's "3,000 centers") come from marketing material, not independent audits — treat as claims, not evidence.

---

## 3. Learning Outcomes: The Central Dissociation

The empirical record splits cleanly, and the split *is* the thesis: **AI boosts immediate output and engagement, but design determines whether it builds or erodes durable learning.**

### 3.1 Positive / efficacy evidence
| Study | Design | Headline result |
|---|---|---|
| **Kestin et al.**, *Scientific Reports* 2025 (Harvard PS2 physics) | Within-subjects crossover RCT, N=194 analyzed | AI tutor produced **~2× the learning gains** of in-class active learning, **effect size ~0.73–1.3 SD** (z = −5.6, p < 10⁻⁸), in *less* time, with higher self-reported engagement |
| **World Bank WP 11125**, "From Chalkboards to Chatbots" (Nigeria) | RCT, N≈800, 6 weeks, GPT-4 via Microsoft Copilot, after-school English | **+0.31 SD composite** (+0.23 SD English); framed as ≈**1.5–2 years of schooling**; largest gains for **girls** and higher-baseline students |
| **Liu et al.**, *J. Computer Assisted Learning* 2025 | Meta-analysis, 37 studies | ChatGPT on academic achievement **g = 0.577, 95% CI [0.395, 0.759]** |

All ✅ verified 3/3. **Important hedges:** Kestin's AI lesson was carefully researcher-engineered (best-case prompt design) over short single-topic lessons; the Nigeria "1.5–2 years" figure is an *extrapolated equivalence*; both ran in teacher-mentored, not autonomous-AI, settings.

### 3.2 Negative / over-reliance evidence
- **Bastani et al.**, *PNAS* 2025 — "**Generative AI without guardrails can harm learning**" (Turkish high-school math field RCT): students using *unguarded* GPT-4 improved during practice but, once AI was removed, scored **~17% worse on exams than peers who never had AI**. A **guardrailed "tutor" version that gave hints, not answers, eliminated the harm.** This is the strongest causal evidence that the damage is *design-dependent, not inherent*. ✅ *Verified 3/3.*
- **Fan et al.**, *British Journal of Educational Technology* 2025 ("Beware of metacognitive laziness," N=117): ChatGPT users produced better short-term essays but showed **no gain in knowledge transfer or intrinsic motivation and reduced self-regulated learning**.
- **Programming-education review** (arXiv:2510.03884, 58 studies): over-reliance produced **superficial learning in 65.5%** of studies.
- **MIT Media Lab, "Your Brain on ChatGPT"** (Kosmyna et al., arXiv:2506.08872): EEG study, N=54; LLM users showed weakest neural connectivity and **83% could not quote from the essay they had just written** (after session 1, easing to ~33% by session 3). ⚠️ *Verified to exist and report these figures, but it is a small-N, non-peer-reviewed preprint with heavy media amplification — cite as suggestive, not confirmatory.*

### 3.3 Evidence-quality warning
Pooled effect sizes for ChatGPT in education range wildly (**g ≈ 0.46 to 1.14**) across 2025–2026 meta-analyses, signaling heterogeneous, short-term, often low-rigor primary studies and likely publication bias. Most starkly, **a heavily cited meta-analysis (Nature *Humanities & Social Sciences Communications*, s41599-025-04787-y, originally g = 0.867) was RETRACTED in April 2026 for data discrepancies**, after ~504 citations and ~500,000 reads. ✅ *Verified 3/3.* Lead with the conservative peer-reviewed estimate (Liu, g ≈ 0.58) and report a *range*, not a point value.

---

## 4. Governance, Ethics, and Policy Challenges

### 4.1 Policy instruments (all verified)
| Instrument | Body | Year | Requires (re: education AI) |
|---|---|---|---|
| **Guidance for Generative AI in Education & Research** | UNESCO | 2023 | 7-step government regulatory roadmap; **minimum age 13** for independent GenAI use; 8 institutional measures for equity/inclusion |
| **AI Competency Frameworks** (Students; Teachers) | UNESCO | 2024 | Students: 12 competencies / 4 dimensions (incl. "Ethics of AI"); Teachers: 15 competencies / 5 dimensions; human-rights-based |
| **EU AI Act, Annex III(3)** | EU | 2024 (phased) | Classifies admissions, learning-outcome evaluation, level-assessment, and exam-monitoring AI as **high-risk** → risk management, bias mitigation, human oversight, logging |
| **EU AI Act, Art. 5(1)(f)** | EU | Effective **2 Feb 2025** | **Prohibits emotion-inference AI in educational institutions** (medical/safety exceptions only) |
| **EU AI Act, Art. 4** | EU | Effective 2 Feb 2025 | Deployers (incl. schools/universities) must ensure **AI literacy** of staff and affected persons |
| **OECD Digital Education Outlook 2023** | OECD | 2023 | Mandatory **bias testing** of edtech; algorithm transparency; **human-in-the-loop grading** |

### 4.2 Cross-cutting challenges
- **The agentic accountability gap.** When autonomous agents *initiate and execute actions* without a clearly defined human owner, responsibility diffuses across developers, deployers, and end-users — a "moral crumple zone" (arXiv:2502.00289, 2025). Critically, **the strongest education-specific instruments (UNESCO, EU AI Act, OECD) predate the agentic framing** and were written for generative/predictive AI — itself a governance gap.
- **Algorithmic bias.** The OECD documents concrete cases of education algorithms biased against non-English-speaking and lower-socioeconomic students, and flags a structural tension: detecting bias requires collecting the very demographic data one would prefer to minimize. *(Note: a circulating statistic — "57% of 146 implementations showed disparities; 14.7% lower accuracy for underrepresented students" — was traced to a misattributed DOI and **failed verification 3/3; it should not be cited.** The underlying equity concern is real and OECD-documented, but those specific numbers are not.)*
- **Academic integrity.** AI text detectors (e.g., Turnitin) are unreliable — they lag new models, are defeated by paraphrasers, and produce false positives; one Australian university paused automated enforcement after a 2025 false-flag incident. Scholars increasingly favor **assessment redesign** (oral, in-person, staged submission) over detection (MDPI *Information* systematic review, 2025; Kofinas et al., *BJET* 2025).
- **Data privacy.** Fragmented and strained: FERPA (records), COPPA (under-13, amended 2025), GDPR (age 16 threshold), plus 128+ US state laws — all written before autonomous, tool-using agents.
- **Low trust.** Reported institutional trust in agentic AI is strikingly low (~6% in one 2025 HBR Analytic Services figure — *single-source, treat as indicative*), motivating tiered-autonomy safeguards and human-in-the-loop checkpoints.

---

## 5. Risks, Equity, and Research Gaps

- **Compounding errors.** Unlike single-turn hallucinations, errors in multi-step agent workflows *propagate and compound*; even *diagnosing which step failed* is an open evaluation problem (AgentHallu, arXiv:2601.06818, 2026).
- **"Never-skilling."** The risk reframes from *deskilling* (losing a held skill) to **never-skilling** — students who route every task through AI never acquire foundational skills in the first place (Harvard Gazette, 2026; corroborating the Bastani/Fan findings above).
- **Equity / digital divide.** AI use among working-age adults runs ~24.7% (Global North) vs ~14.1% (Global South), a gap that *widened* in 2025; most tools are English-centric, marginalizing multilingual and Indigenous contexts. The divide is one of *interpretation and literacy*, not only access (Frontiers in Computer Science, 2026; arXiv:2406.02966).
- **Parasocial / mental-health risk.** Adolescents are in the peak window for attachment formation, raising concern about asymmetric bonds with AI agents; ~1 in 5 young people report using chatbots for mental-health advice (UNESCO, "Ghost in the Chatbot"; JMIR Mental Health, 2025).
- **Teacher role.** Cross-institutional consensus (OECD, McKinsey) is *augment, not replace* — teachers as "ethical guardians" — but **teacher capability is the mediating variable**: infrastructure investment without sustained professional development does not translate into student AI literacy (arXiv:2603.20056, 2026).

### Open research gaps
1. Scarcity of **longitudinal and large-scale** studies on durable impact.
2. **Hallucination attribution** in multi-agent workflows is unsolved.
3. No standardized **autonomy/agency taxonomy** for education.
4. Cross-cultural / **low-resource-language** benchmarks are missing.
5. **Education-specific accountability frameworks** for autonomous, action-taking agents do not yet exist.
6. Under-monitored **parasocial-attachment and youth mental-health** effects.

---

## 6. Conclusion

Agentic AI in education is real, fast-moving, and genuinely capable — multi-agent tutors, virtual TAs, and simulated patients now post measurable gains in controlled settings. But the field's most defensible empirical lesson is a *dissociation*: the same systems that lift immediate output and engagement can erode retained learning, transfer, and self-regulation when deployed without pedagogical guardrails. Governance is catching up but structurally lags the autonomy curve — today's strongest instruments were written for an earlier, less agentic generation of AI. And the evidence base, though growing, is young enough that even its meta-analyses are being retracted. The responsible path forward is neither hype nor refusal but **guardrailed, human-in-the-loop, teacher-mediated design**, paired with the longitudinal evidence and education-specific accountability frameworks the field still lacks.

---

## Verification Note

This report was produced via a fan-out/verify pipeline: 5 parallel search angles → claim extraction → **3 independent adversarial fact-checkers** voting on 12 load-bearing claims (a claim "dies" at 2/3 refutes). **Result: 11/12 confirmed; 1 refuted** (the "146 implementations / 57% / 14.7%" disparity statistics — a real DOI hijacked onto fabricated numbers — was removed). Figures marked ⚠️ or "single-source" are reported with explicit hedges. A known limitation: full-text PDF retrieval was blocked in this environment, so numeric values derive from search-engine extractions cross-checked by three independent verifiers; exact confidence intervals should be confirmed against source PDFs before formal publication.

---

## References

1. Kamalov, Calonge et al. (2025). *Evolution of AI in Education: Agentic Workflows.* arXiv:2504.20082. https://arxiv.org/abs/2504.20082
2. Sapkota, Roumeliotis & Karkee (2025). *AI Agents vs. Agentic AI: A Conceptual Taxonomy.* arXiv:2505.10468 / *Information Fusion*. https://arxiv.org/abs/2505.10468
3. Yan (2025). *From Passive Tool to Socio-cognitive Teammate (APCP framework).* arXiv:2508.14825. https://arxiv.org/abs/2508.14825
4. Yang, Wang et al. (2025). *LLM Agents for Education: Advances and Applications.* EMNLP 2025 Findings / arXiv:2503.11733. https://aclanthology.org/2025.findings-emnlp.743.pdf
5. *Levels of Autonomy for AI Agents* (2025). arXiv:2506.12469. https://arxiv.org/html/2506.12469v1
6. Kestin et al. (2025). *AI tutoring outperforms in-class active learning: an RCT.* Scientific Reports. https://www.nature.com/articles/s41598-025-97652-6
7. World Bank (2025). *From Chalkboards to Chatbots.* Policy Research WP 11125. https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192529324
8. Bastani et al. (2025). *Generative AI without guardrails can harm learning.* PNAS. https://www.pnas.org/doi/10.1073/pnas.2422633122
9. Fan et al. (2025). *Beware of metacognitive laziness.* British Journal of Educational Technology / arXiv:2412.09315. https://arxiv.org/abs/2412.09315
10. Kosmyna et al. (2025). *Your Brain on ChatGPT.* arXiv:2506.08872. https://arxiv.org/abs/2506.08872
11. Liu et al. (2025). *The Impact of ChatGPT on Students' Academic Achievement: A Meta-Analysis.* J. Computer Assisted Learning. https://onlinelibrary.wiley.com/doi/10.1111/jcal.70096
12. *Teaching with AI: A Systematic Review … Programming Education* (2025). arXiv:2510.03884. https://arxiv.org/abs/2510.03884
13. Wang & Fan (2025, **RETRACTED 2026**). Meta-analysis, Humanities & Social Sciences Communications, s41599-025-04787-y. Retraction note: https://www.nature.com/articles/s41599-026-07310-z
14. Zhu, Sun & Yang (2025). *Towards responsible AI in education.* Humanities & Social Sciences Communications, s41599-025-05252-6. https://www.nature.com/articles/s41599-025-05252-6
15. *Jill Watson outperforms ChatGPT in real classrooms* (2025). Georgia Tech Research News. https://news.research.gatech.edu/2025/09/02/georgia-techs-jill-watson-outperforms-chatgpt-real-classrooms
16. AIPatient (2025). *Communications Medicine* (Nature), s43856-025-01283-x. https://www.nature.com/articles/s43856-025-01283-x
17. GenMentor (2025). ACM Web Conference / arXiv:2501.15749. https://arxiv.org/abs/2501.15749
18. MAS-CMD learning designers (2025). Stanford SCALE / arXiv:2508.16659. https://arxiv.org/abs/2508.16659
19. OnlineMate (2025). arXiv:2509.14803. https://arxiv.org/abs/2509.14803
20. Khanmigo controlled study (2025). *Journal of Teaching and Learning*, 19(4). https://jtl.uwindsor.ca/index.php/jtl/article/view/10052
21. UNESCO (2023). *Guidance for generative AI in education and research.* https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research
22. UNESCO (2024). *AI Competency Framework for Students / Teachers.* https://www.unesco.org/en/articles/ai-competency-framework-students
23. EU AI Act, Article 5 & Annex III. https://artificialintelligenceact.eu/article/5/ · https://artificialintelligenceact.eu/annex/3/
24. OECD (2023). *Digital Education Outlook 2023* (algorithmic bias chapter). https://www.oecd.org/en/publications/oecd-digital-education-outlook-2023_c74f03de-en.html
25. *Agentic AI: Autonomy, Accountability, and the Algorithmic Society* (2025). arXiv:2502.00289. https://arxiv.org/pdf/2502.00289
26. MDPI *Information* (2025). *Generative AI and Academic Integrity in Higher Education: A Systematic Review.* https://www.mdpi.com/2078-2489/16/4/296
27. AgentHallu (2026). arXiv:2601.06818. https://arxiv.org/html/2601.06818v1
28. UNESCO. *Ghost in the Chatbot: The perils of parasocial attachment.* https://www.unesco.org/en/articles/ghost-chatbot-perils-parasocial-attachment
29. *AI and the digital divide in education* (2026). Frontiers in Computer Science. https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1759027/full
30. *From School AI Readiness to Student AI Literacy* (2026). arXiv:2603.20056. https://arxiv.org/pdf/2603.20056
