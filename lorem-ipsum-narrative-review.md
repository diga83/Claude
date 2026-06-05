# *Lorem ipsum dolor sit amet*: A Narrative Review of the Origins, Material History, and Contemporary Function of the World's Standard Placeholder Text

## Abstract

**Background.** "*Lorem ipsum dolor sit amet…*" is the most widely reproduced passage of pseudo-Latin in the world, embedded by default in typesetting, desktop-publishing, and web-design workflows. Despite its ubiquity, its history is poorly documented in scholarly literature and is dominated by an oft-repeated but unverified origin myth. **Objective.** This narrative review synthesizes primary, peer-reviewed, and authoritative secondary sources across three disciplines—classical reception, design history, and human–computer interaction (HCI)—to construct a critically appraised account of the text's classical substrate, its material transmission, its functional rationale, and the risks attending its use. **Method.** A thematically structured narrative review with explicit source-quality appraisal, foregrounding the unusually thin evidentiary base and grading each claim by source tier. **Findings.** The placeholder is a corrupted derivation of Cicero's *De finibus bonorum et malorum* (45 BCE), specifically the Epicurean argument voiced by the character Torquatus at 1.10.32–33; the often-cited "use since the 1500s" is an undocumented conjecture, while the earliest *attested* use is the 1960s Letraset dry-transfer era, resting on a 1914 Loeb translation. The functional defence of placeholder text is contested by a "content-first" design discourse, though no controlled study isolates placeholder versus realistic copy as a variable; the prototype-fidelity literature is the closest empirical proxy. Contemporary risks—accessibility, search-engine indexing of leaked filler, and machine-translation "hallucination" (illustrated by the 2014 Google Translate episode)—are documented largely outside peer review. **Conclusion.** *Lorem ipsum* is best understood as a case of accidental classical reception: a fragment of Ciceronian ethics, mechanically corrupted and materially transmitted, whose persistence reveals as much about design epistemology and machine language processing as about the text itself.

**Keywords:** *lorem ipsum*; placeholder text; greeking; classical reception; Cicero; *De finibus*; typography; Letraset; prototype fidelity; content strategy; web accessibility; machine translation

---

## 1. Introduction

Few strings of text are reproduced as often, or read as seldom, as "*Lorem ipsum dolor sit amet, consectetur adipiscing elit*." It is the default filler of the design professions—the neutral grey noise against which layout, typography, and visual hierarchy are judged before real content exists. Yet the passage is neither neutral nor original: it is a damaged descendant of a first-century BCE philosophical treatise, transmitted across two millennia through accidents of pagination, the commercial typography of the 1960s, and the desktop-publishing revolution of the 1980s, before becoming a structural feature of the contemporary web.

This review treats *lorem ipsum* as an object worthy of interdisciplinary scholarly attention precisely because it sits at the intersection of three fields that rarely converse: **classical reception** (how an ancient text survives, mutates, and acquires new meaning), **design history** (how artifacts and practices of visual communication propagate), and **human–computer interaction** (how placeholder content functions, and fails, in the design and evaluation of interfaces). The phrase is, in effect, a 2,000-year-old text living an unintended second life inside software—a fact that makes it a compact case study in the reception of antiquity within digital material culture.

The review pursues four questions. First, what is the text's classical substrate, and what does the original passage actually say? Second, how was it materially transmitted from treatise to typographic commodity, and which parts of that story are documented versus conjectural? Third, what is the functional rationale for placeholder text, and how robust is the empirical and professional case for and against it? Fourth, what contemporary risks—accessibility, search-engine optimization (SEO), and machine processing—does the text's ubiquity create?

A recurring methodological theme is the **thinness and unevenness of the evidence base**. The most-repeated historical claims circulate in self-published and encyclopedic form; the design-practice arguments are overwhelmingly grey literature; and the empirical HCI questions most relevant to placeholder text have not been studied directly. Rather than smoothing over these gaps, this review foregrounds them, grading claims by source quality so that the secure core can be distinguished from the speculative periphery.

## 2. Method

This is a **narrative (interpretive) review** rather than a systematic review, appropriate to a question that is historical and conceptual rather than effect-estimating, and to a literature too heterogeneous for meta-analytic synthesis (Greenhalgh et al., 2018, as a general rationale for the form). The procedure had four stages.

**Source identification.** Searches were conducted across general web indexes and scholarly catalogues using terms spanning the three disciplinary framings (e.g., *De finibus* 1.10.32; "consectetur" McClintock; Letraset dry-transfer 1966; prototype fidelity usability; placeholder accessibility WCAG; Google Translate lorem ipsum machine translation). Candidate sources were captured across five thematic angles (classical, philological, design-historical, HCI/accessibility, and contemporary-incident).

**Source selection and exclusion.** To meet the evidentiary standard of an academic review, **user-edited encyclopedias (e.g., Wikipedia) and low-authority commercial blogs were excluded from citation**, used at most to triangulate leads. Priority was given, in descending order, to: (a) primary texts and critical editions; (b) peer-reviewed journal and conference literature; (c) normative standards (W3C); (d) reputable press and named expert commentary; and (e) primary vendor or practitioner documents cited *as such*.

**Quality appraisal.** Each substantive claim was assigned a source tier and, where sources conflicted or evidence was absent, an explicit flag. This is reported inline (e.g., "[conjecture]") and consolidated in Table 2.

**Synthesis.** Findings were organized thematically rather than chronologically, tracing the text from classical substrate (§3–4), through attribution and material transmission (§5–7), to function, critique, and risk (§8–11), before discussion (§12–13).

A structural limitation must be stated at the outset: **no peer-reviewed study addresses *lorem ipsum* directly.** The placeholder's history lives in classicist commentary, design-trade history, and journalism; its functional effects must be inferred from adjacent experimental literature. The review's contribution is therefore integrative and critical rather than empirical. The overall procedure and the source-quality tiers applied during synthesis are summarized in Figure 1.

@@FIG figures/fig1_methods.png | Figure 1. The structured narrative-review and adversarial-verification workflow, with the source-quality tiers applied during synthesis.

## 3. The Classical Substrate: Cicero, Epicurean Ethics, and the Torquatus Passage

The text derives from Cicero's *De finibus bonorum et malorum* ("On the Ends of Good and Evil"), a dialogue on the highest good composed in 45 BCE (Cicero, 1914/1998). In Book 1, the Roman aristocrat **Lucius Manlius Torquatus** presents and defends Epicurean ethics—the doctrine that pleasure, rightly understood, is the highest good and that pain is avoided not for its own sake but as the contrary of pleasure (Annas & Betegh, 2016; Atkins & Bénatouïl, 2021). The specific source lies at sections **1.10.32–33**, in the passage beginning *"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit…"*—rendered by Rackham (Cicero, 1914) as, in substance, "Nor is there anyone who loves, pursues, or wishes to obtain pain itself because it is pain."

Two points of scholarly precision matter. First, the doctrine is **Epicurean and is voiced by Torquatus**; a claim occasionally encountered that the passage belongs to "Hieronymus" is unsupported—Hieronymus of Rhodes figures elsewhere in Cicero's doxographic survey of ethical positions but is not the speaker here (Annas & Betegh, 2016; Parker, 2024). Second, the passage is not incidental filler in Cicero's argument but a node in his central exposition of the Epicurean calculus of pleasure and pain—an irony noted by classicist commentators: the world's standard *meaningless* text is excised from one of antiquity's more sustained discussions of how to live meaningfully (Antigone, 2021; O'Donnell, n.d.).

For scholarly citation of the original, the authoritative Latin is the Oxford Classical Text of Reynolds (Cicero, 1998), with the parallel Latin–English of the Loeb edition (Cicero, 1914) and the open digital edition of the Perseus Digital Library (n.d.) providing accessible reference points.

## 4. From Treatise to Type: The Philology of a Broken Text

What designers reproduce is not Cicero but a **systematically corrupted** version of him. Words are deleted, transposed, and invented; the result is grammatically and lexically "improper" Latin containing forms that do not exist in the language (e.g., *eiusmod*, *incididunt*, *aliquip*) (O'Donnell, n.d.; Antigone, 2021). The corruption is deliberate: the aim is text that *looks* like natural language—plausible word lengths and letter distribution—while carrying no semantic content to distract the eye.

The most telling artifact of corruption is the opening itself. "*Lorem*" is not a Latin word; it is the **severed second half of "do*lorem*"** (the accusative of *dolor*, "pain"), the original phrase being *dolorem ipsum*, "pain itself" (Antigone, 2021; O'Donnell, n.d.). The break occurs because, in the 1914 Loeb edition, the word *dolorem* falls across a page boundary, the running text resuming at "*lorem ipsum*" on the following page (Cicero, 1914). The placeholder thus begins mid-word, fossilizing a typographic accident. This same pagination fact establishes a firm *terminus post quem*: the dummy-text tradition in its present form cannot predate the 1914 translation it was cut from—an inference that directly contradicts the popular "1500s" origin story examined below (Slate, 2023).

**Table 1.** *The seed passage: original versus corrupted opening.*

| | Text |
|---|---|
| **Cicero, *De finibus* 1.10.32 (orig.)** | *…nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt; neque porro quisquam est, qui **dolorem ipsum** quia dolor sit amet, consectetur, adipisci velit…* |
| **Standard placeholder (corrupted)** | ***Lorem ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua…* |

*Note.* The placeholder retains recognizable fragments (*dolor sit amet, consectetur*) while introducing non-existent forms (*adipiscing, eiusmod, incididunt*). The leading *Do-* of *dolorem* is lost at a page break (Cicero, 1914; Antigone, 2021).

@@FIG figures/fig2_corruption.png | Figure 2. The corruption pathway from Cicero's original Latin (A), through the 1914 Loeb page break that severs "do-" from "lorem" (B), to the standard placeholder with its non-existent forms (C).

The conceptual category to which this object belongs—**pseudo-Latin**, language-shaped text without meaning—has a respectable place in classical scholarship on "fakes" and pseudepigrapha (Peirano, 2012). Peirano's analysis concerns ancient literary forgery rather than modern typographic filler, but it supplies the theoretical frame: *lorem ipsum* is a late, mechanical instance of the long-running cultural practice of producing texts that wear the authority of Latinity while withholding its sense.

## 5. The Attribution Problem: McClintock, the "consectetur" Clue, and the 1500s Myth

For most of the twentieth century the source of the dummy text was unknown to its users. Its identification is credited to **Richard McClintock**, a Latin scholar and publications director at Hampden-Sydney College, Virginia. McClintock noticed the genuine but rare Latin word *consectetur* in the filler and, tracing its classical occurrences, located the passage in *De finibus* (Adams, n.d.; Antigone, 2021; Priceonomics, n.d.). He communicated the discovery in a letter to the design magazine *Before & After* (McClintock, 1994), correcting the editors' earlier assertion that the text "says nothing." This letter is the **primary artifact** of the attribution; its exact issue (reported as vol. 4, no. 2) and pagination are documented only secondarily and warrant archival verification.

McClintock's contribution is, however, double-edged. The same letter is the apparent origin of the **most repeated and least supported claim** about the text: that it "has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it." This sentence, propagated verbatim through generator websites (Lipsum.com, n.d.), is by McClintock's own later acknowledgment a **guess unsupported by evidence** (Slate, 2023). No sixteenth-century specimen has been produced. The defensible position, triangulated across reputable and scholarly sources, is therefore:

- the **underlying translation** dates to 1914 (Cicero, 1914);
- the **earliest attested use as dummy text** is the 1960s (Antigone, 2021; Slate, 2023; see §6);
- the **1500s origin is conjecture** and should be reported as such ([conjecture]).

This distinction—between a *documented* twentieth-century history and an *asserted* Renaissance pedigree—is the single most important corrective this review can offer to the popular narrative.

## 6. Material Culture: Greeking, Letraset, and the Dry-Transfer Revolution

The practice that *lorem ipsum* serves is older than the text and has a name: **greeking**, the use of unreadable or simplified text to represent typeset matter so that a viewer attends to layout rather than content—the term echoing the idiom "it's all Greek to me" (PRINT Magazine, 2016). Greeking long predates the specific Ciceronian filler; what the twentieth century contributed was the standardization of *one* scrambled passage.

That standardization is firmly tied to **Letraset**, the British manufacturer whose dry-transfer ("rub-down") lettering sheets democratized professional typography in the 1960s, putting precise display type in the hands of designers, students, and amateurs decades before the personal computer (Lamacraft, 2013; Heller, 2018; Shaughnessy & Brook, 2015). The widely reported claim is that the modern *lorem ipsum* text was popularized through Letraset specimen sheets first issued in 1966. The Letraset *system* and its cultural impact are well documented in design-history sources of good standing—*Eye* magazine and the Unit Editions monograph foremost among them (Lamacraft, 2013; Shaughnessy & Brook, 2015).

Two finer attributions require caution. The frequently encountered claim that the typographic historian **James Mosley** (1935–2025), long-serving librarian of the St Bride Printing Library, personally produced the 1966 scramble by cutting up specific pages of a 1914 Cicero edition is, in the sources surveyed, traceable mainly to user-edited and forum material rather than to a publication by Mosley himself. Mosley is an entirely citable scholar when his own writings are referenced, but this specific attribution should be presented as **reported, not established** ([attributed/unverified]). The cleaner, defensible statement is that the version in current use derives from Letraset transfer sheets of the 1960s (Lamacraft, 2013; Shaughnessy & Brook, 2015), without over-specifying authorship.

## 7. Digitalization: Desktop Publishing and the Path to Ubiquity

The text's leap from analog typography to global default came with **desktop publishing (DTP)**. Aldus PageMaker, introduced for the Apple Macintosh in 1985, is conventionally credited—together with the graphical interface and the laser printer—with launching the DTP revolution, and with carrying bundled *lorem ipsum* into the digital templates from which it propagated to word processors, layout software, and ultimately content-management systems and web frameworks. The general trajectory (DTP as the vector for the text's ubiquity) is secure; a commonly repeated attribution of the bundled adaptation to an Aldus art director, **Laura Perry**, is sourced only encyclopedically and should be treated as **unverified** ([attributed/unverified]) or omitted from a scholarly account.

The outcome, however sourced, is not in doubt: by the 2000s, *lorem ipsum* had become an infrastructural default—generated on demand by countless tools and shipped inside design software—such that its presence in a layout signals "content pending" to practitioners worldwide. Figure 3 sets out this chronology, distinguishing the documented milestones from the rejected "1500s" conjecture.

@@FIG figures/fig3_timeline.png | Figure 3. Transmission of lorem ipsum from Cicero (45 BCE) to the contemporary web. The "in use since the 1500s" claim is shown as a rejected conjecture; the earliest attested use is the 1966 Letraset sheets. Not to scale.

## 8. The Functional Rationale and the "Content-First" Critique

Why use meaningless text at all? The professional rationale is that placeholder copy lets stakeholders evaluate **form**—typography, spacing, hierarchy, alignment—without the distraction, and the premature debate, that real words invite; and that text resembling natural language in its rhythm reads as more authentically "finished" in a mock-up than a repeated token would (a rationale articulated across design-practice literature and implicit in the greeking tradition; PRINT Magazine, 2016).

Against this stands an influential **content-first** critique, associated with practitioner-theorists of web design. Zeldman's (2008) aphorism—"Content precedes design. Design in the absence of content is not design, it's decoration"—crystallized the position; Wroblewski (2009) argued that designing against dummy text breeds "unrealistic assumptions and potentially serious design flaws," as layouts that look balanced under uniform filler "break under the weight of actual content." The critique's force is that fake content conceals the very properties—length variance, tone, edge cases, emptiness states—that determine whether a design works.

Crucially, the debate is not one-sided. McGrane (2010) offered the standard rebuttal that *lorem ipsum* is "a symptom, not the cause": the real failure is an organizational process that sequences design and content as separate tracks, and banning the filler does not fix that process. A balanced review must therefore present the content-first position as a **strong professional consensus rather than a settled empirical result**, with McGrane's counterpoint preserving the dialectic.

## 9. Empirical Evidence: Prototype Fidelity and Its Limits

The empirical question implicit in the content-first critique—does placeholder versus realistic content change the outcome of design evaluation?—has, strikingly, **not been tested directly** in the peer-reviewed literature. The closest evidence comes from research on **prototype fidelity** in usability testing, which manipulates realism along dimensions such as interactivity and aesthetics rather than textual content per se.

That literature is itself divided. Sauer and Sonderegger (2009; see also Sonderegger & Sauer, 2010) found that prototype fidelity and aesthetic realism measurably affect user behavior, perceived usability, and emotion, with lower-fidelity artifacts liable to distort subjective judgments. Earlier work by Catani and Biers (1998), however, found **no significant difference** in the number or severity of usability problems surfaced across low-, medium-, and high-fidelity prototypes, and comparable fidelity comparisons in mobile settings have returned mixed results (Lim et al., 2006). The honest synthesis is that **realism in the design artifact can influence evaluation, but the effect is inconsistent and context-dependent**, and none of these studies isolates *content* realism specifically.

The implication for *lorem ipsum* is twofold. The content-first claim that placeholder text *materially distorts* evaluation is **plausible and partially supported by analogy**, but it is not established by direct evidence; and the strongest empirical caution cuts both ways, since at least some fidelity research suggests evaluation outcomes are more robust to artifact realism than practitioners assume. This gap—between a confident professional discourse and an absent experimental base—is itself a finding.

## 10. Risks I: Accessibility and Search-Engine Leakage

Two practical risks attend the ubiquity of placeholder text, both documented chiefly outside peer review.

**Accessibility.** The accessibility literature most directly relevant concerns the misuse of the HTML `placeholder` *attribute* as a substitute for form labels—a related but distinct phenomenon from greeked body copy. Normative guidance from the W3C Web Accessibility Initiative (n.d.) and the Web Content Accessibility Guidelines (W3C, 2018, esp. SC 1.3.1, 3.3.2, 1.4.3) establishes that placeholder text is not a reliable label: it is not consistently announced by assistive technologies, disappears on input, and often fails contrast requirements. Accessibility-vendor and industry-research sources corroborate measurable harms to users with visual and cognitive disabilities (Deque Systems, n.d.; Nielsen Norman Group, 2014). By extension, meaningless filler left in a live interface presents nonsense to screen-reader users; this specific extension, however, rests on standards and expert guidance rather than on a dedicated peer-reviewed study—a gap worth noting.

**Search-engine leakage.** Because placeholder text is routinely forgotten during site builds and migrations, it leaks into production, where it harms both users and search performance. That this is a recognized, tooled-for failure mode is evidenced by its inclusion as a standard automated check in leading SEO crawlers, which flag any page whose body contains "Lorem ipsum dolor" as a defect to remediate (Screaming Frog, n.d.; Sitebulb, n.d.). These are vendor documents, but as primary records of professional practice they reliably attest that production leakage is common enough to warrant dedicated detection.

## 11. Risks II: Machine (Mis)translation and the 2014 Google Translate Episode

The most revealing contemporary episode concerns not human readers but machines. In August 2014, observers found that entering permutations of "lorem ipsum" into Google Translate (auto-detected Latin → English) produced incongruous modern outputs—"China," "NATO," "The Internet," "The Company"—prompting public speculation, including from security researchers, about covert channels or hidden messages (Krebs, 2014; TechCrunch, 2014; Pearson, 2014). Google removed the behavior within days, characterizing it as an alignment bug rather than a vulnerability (Krebs, 2014).

The authoritative explanation is linguistic, not conspiratorial. As the computational linguist Mark Liberman set out, the anomaly was an artifact of **statistical machine translation**: systems trained by aligning large parallel corpora had encountered scrambled Latin boilerplate sitting beside unrelated English content across the web, and produced spurious "translations" by false alignment (Liberman, 2014). The episode is, in retrospect, an early public demonstration of what the contemporary literature terms **translation "hallucination"**—output "completely decoupled from the input," characteristically triggered by anomalous or out-of-distribution inputs such as nonsense Latin (Guerreiro et al., 2023). That the redundancy and variability of machine translation can in principle carry hidden information was, separately, established in the security literature on translation-based steganography (Grothoff et al., 2005); the 2014 case, however, is best read not as deliberate steganography but as an *accidental* manifestation of the same underlying property. *Lorem ipsum* thus served, unintentionally, as a natural stress test exposing how statistical language models behave at the edges of their training distribution.

## 12. Discussion

Three themes emerge from this synthesis, which the interdisciplinary synthesis in Figure 4 draws together.

@@FIG figures/fig4_map.png | Figure 4. Lorem ipsum at the intersection of three scholarly lenses—classical reception, design history, and HCI/UX—converging on the reading of the text as an accidental case of classical reception.

**First, *lorem ipsum* is a case of accidental classical reception.** A fragment of Ciceronian ethics survived not through scholarly transmission but through mechanical accident—a page break in a 1914 translation, a 1960s lettering product, a 1980s software bundle—acquiring along the way a function (meaningless filler) opposite to its origin (an argument about the meaning of a good life). Studied this way, the placeholder is a miniature of how antiquity persists in modern material culture: fragmented, decontextualized, instrumentalized, and yet still legibly Latin enough to carry borrowed authority (Peirano, 2012, as a conceptual frame).

**Second, the popular history is substantially mythologized, and the scholarly record is thin.** The "1500s printer" is conjecture (Slate, 2023); the most cited personal attributions for the 1960s scramble and the 1980s digital adaptation rest on encyclopedic rather than primary sources and should be hedged. The secure spine of the history is short: a Ciceronian source identified by McClintock (1994), a 1914 translation, a 1960s Letraset popularization (Lamacraft, 2013; Shaughnessy & Brook, 2015), and a DTP-driven ascent to ubiquity. Much of what circulates beyond this spine is reception of the *story* rather than documentation of the *fact*.

**Third, the contemporary discourse outruns its evidence.** The content-first critique (Wroblewski, 2009; Zeldman, 2008) is professionally dominant yet empirically untested for the specific variable it indicts; the prototype-fidelity literature offers only an inconsistent proxy (Catani & Biers, 1998; Sauer & Sonderegger, 2009), and McGrane's (2010) rebuttal remains unrefuted. Likewise, the accessibility and SEO risks are real and well-attested in practice and standards (W3C, 2018; Screaming Frog, n.d.) but largely unstudied in peer review. The 2014 translation episode, finally, has migrated from rumor to a textbook illustration of MT hallucination (Guerreiro et al., 2023; Liberman, 2014), exemplifying how a humble design convention can illuminate the behavior of language technologies.

## 13. Limitations

This review is constrained by its subject's literature. No peer-reviewed scholarship addresses *lorem ipsum* directly; several load-bearing historical claims rest on a single primary artifact (McClintock, 1994) or on reputable-but-non-academic sources; and key empirical questions (placeholder vs. realistic content; screen-reader handling of greeked body copy) lack controlled study, forcing reliance on analogy and standards. Archival verification of the *Before & After* letter, of the Letraset specimen record (Shaughnessy & Brook, 2015), and of the disputed personal attributions would materially strengthen the historical account. The peer-reviewed sources central to the empirical and philological arguments (Grothoff et al., 2005; Lim et al., 2006; Sauer & Sonderegger, 2009; Sonderegger & Sauer, 2010; Guerreiro et al., 2023; Parker, 2024) were verified against the original publications; the remaining citations—including the primary critical editions and the design-historical and journalistic sources—rest on publisher and edition metadata rather than full-text inspection, and quoted wording from the Latin and its translation should be checked against the cited critical editions (Cicero, 1914, 1998; Perseus Digital Library, n.d.) before reproduction.

## 14. Conclusion

*Lorem ipsum* deserves its ubiquity but not its mythology. It is a corrupted excerpt of Cicero's *De finibus* (1.10.32–33), an Epicurean argument voiced by Torquatus, fossilized at a 1914 page break, standardized through 1960s dry-transfer typography, and globalized by desktop publishing—not a Renaissance survival. Its persistence is functionally rationalized and professionally contested, yet the empirical case on both sides remains underdeveloped, and its contemporary risks span accessibility, search visibility, and the failure modes of machine translation. Across all three of its disciplinary lives, the placeholder rewards attention less for what it says—nothing—than for what its survival reveals: about how classical texts are received and deformed, how design conventions propagate and ossify, and how language technologies behave when handed text that only pretends to mean.

---

## References

Adams, C. (n.d.). *What does the filler text "lorem ipsum" mean?* The Straight Dope. https://www.straightdope.com/21343427/what-does-the-filler-text-lorem-ipsum-mean

Annas, J., & Betegh, G. (Eds.). (2016). *Cicero's De Finibus: Philosophical approaches*. Cambridge University Press. https://doi.org/10.1017/CBO9781316335109

*Antigone*. (2021, June 11). *Lorem ipsum: Filler fail, killer tale*. Antigone Journal. https://antigonejournal.com/2021/06/lorem-ipsum-filler-fail/

Atkins, J. W., & Bénatouïl, T. (Eds.). (2021). *The Cambridge companion to Cicero's philosophy*. Cambridge University Press. https://doi.org/10.1017/9781108529013

Catani, M. B., & Biers, D. W. (1998). Usability evaluation and prototype fidelity: Users and usability professionals. *Proceedings of the Human Factors and Ergonomics Society Annual Meeting, 42*(19), 1331–1336. https://doi.org/10.1177/154193129804201901

Cicero, M. T. (1914). *De finibus bonorum et malorum* (H. Rackham, Trans.; Loeb Classical Library No. 40). Harvard University Press.

Cicero, M. T. (1998). *De finibus bonorum et malorum: Libri quinque* (L. D. Reynolds, Ed.; Oxford Classical Texts). Oxford University Press.

Deque Systems. (n.d.). *Accessible forms: The problem with placeholders*. https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/

Greenhalgh, T., Thorne, S., & Malterud, K. (2018). Time to challenge the spurious hierarchy of systematic over narrative reviews? *European Journal of Clinical Investigation, 48*(6), e12931. https://doi.org/10.1111/eci.12931

Grothoff, C., Grothoff, K., Alkhutova, L., Stutsman, R., & Atallah, M. (2005). Translation-based steganography. In *Information Hiding (IH 2005)* (Lecture Notes in Computer Science Vol. 4437, pp. 213–233). Springer. https://doi.org/10.1007/11558859_17

Guerreiro, N. M., Alves, D. M., Waldendorf, J., Haddow, B., Birch, A., Colombo, P., & Martins, A. F. T. (2023). Hallucinations in large multilingual translation models. *Transactions of the Association for Computational Linguistics, 11*, 1500–1517. https://doi.org/10.1162/tacl_a_00615

Heller, S. (2018, February 15). *When type was dry*. PRINT Magazine. https://www.printmag.com/daily-heller/when-type-was-dry-letraset/

Krebs, B. (2014, August 27). *Lorem ipsum: Of good & evil, Google & China*. Krebs on Security. https://krebsonsecurity.com/2014/08/lorem-ipsum-of-good-evil-google-china/

Lamacraft, J. (2013). Rub-down revolution. *Eye Magazine, (86)*. https://www.eyemagazine.com/feature/article/rub-down-revolution

Liberman, M. (2014, August 20). *Lorem China*. Language Log, University of Pennsylvania. https://languagelog.ldc.upenn.edu/nll/?p=14163

Lim, Y., Pangam, A., Periyasami, S., & Aneja, S. (2006). Comparative analysis of high- and low-fidelity prototypes for more valid usability evaluations of mobile devices. In *Proceedings of the 4th Nordic Conference on Human–Computer Interaction (NordiCHI '06)* (pp. 291–300). Association for Computing Machinery. https://doi.org/10.1145/1182475.1182506

Lipsum.com. (n.d.). *Lorem Ipsum: All the facts*. https://www.lipsum.com/

McClintock, R. (1994). [Letter identifying the Ciceronian source of *lorem ipsum*]. *Before & After, 4*(2).

McGrane, K. (2010, January 10). *In defense of lorem ipsum*. User Interface Engineering. https://articles.uie.com/lorem_ipsum_defense/

Nielsen Norman Group. (2014). *Placeholders in form fields are harmful*. https://www.nngroup.com/articles/form-design-placeholders/

O'Donnell, J. J. (n.d.). *Fake Latin*. Georgetown University. https://faculty.georgetown.edu/jod/texts/fakelatin.html

Parker, D. (2024). The inconsistency charge in Cicero's *De finibus* 1–2. *The Classical Quarterly, 74*(1), 124–134. https://doi.org/10.1017/S0009838824000107

Pearson, J. (2014, August 19). *The search for meaning in a cryptic Google translation of untranslatable words*. Vice (Motherboard). https://www.vice.com/en/article/the-search-for-meaning-in-a-cryptic-google-translation/

Peirano, I. (2012). *The rhetoric of the Roman fake: Latin pseudepigrapha in context*. Cambridge University Press.

Perseus Digital Library. (n.d.). *M. Tullius Cicero, De finibus bonorum et malorum, Liber Primus* (Section 32). Tufts University. http://www.perseus.tufts.edu/hopper/text?doc=urn:cts:latinLit:phi0474.phi048.perseus-lat1:1.32

PRINT Magazine. (2016, August 22). *It's all Greek to me: A brief history of Lorem Ipsum text*. https://www.printmag.com/culturally-related-design/history-of-lorem-ipsum-text/

Priceonomics. (n.d.). *The history of Lorem Ipsum*. https://priceonomics.com/the-history-of-lorem-ipsum/

Sauer, J., & Sonderegger, A. (2009). The influence of prototype fidelity and aesthetics of design in usability tests: Effects on user behaviour, subjective evaluation and emotion. *Applied Ergonomics, 40*(4), 670–677. https://doi.org/10.1016/j.apergo.2008.06.006

Screaming Frog. (n.d.). *Lorem ipsum placeholder*. SEO Spider issues. https://www.screamingfrog.co.uk/seo-spider/issues/content/lorem-ipsum-placeholder/

Shaughnessy, A., & Brook, T. (2015). *Letraset: The DIY typography revolution*. Unit Editions.

Sitebulb. (n.d.). *Contains Lorem Ipsum dummy text*. https://sitebulb.com/hints/on-page/contains-lorem-ipsum-dummy-text/

Slate. (2023, January 30). *The hero(ine) who invented Lorem Ipsum may never be known*. https://slate.com/news-and-politics/2023/01/lorem-ipsum-history-origins.html

Sonderegger, A., & Sauer, J. (2010). The influence of design aesthetics in usability testing: Effects on user performance and perceived usability. *Applied Ergonomics, 41*(3), 403–410. https://doi.org/10.1016/j.apergo.2009.09.002

TechCrunch. (2014, August 18). *The mystery of Lorem Ipsum*. https://techcrunch.com/2014/08/18/the-mystery-of-lorem-ipsum/

W3C. (2018). *Web Content Accessibility Guidelines (WCAG) 2.1*. World Wide Web Consortium. https://www.w3.org/TR/WCAG21/

W3C Web Accessibility Initiative. (n.d.). *Forms tutorial: Form instructions*. World Wide Web Consortium. https://www.w3.org/WAI/tutorials/forms/instructions/

Wroblewski, L. (2009). *Death to lorem ipsum*. LukeW Ideation + Design. https://www.lukew.com/ff/entry.asp?927=

Zeldman, J. (2008, May 6). *Content precedes design*. Jeffrey Zeldman Presents. https://zeldman.com/2008/05/06/content-precedes-design/

---

### Appendix A. Source-quality appraisal

**Table 2.** *Grading of principal claims by source tier and evidentiary status.*

| Claim | Best source(s) | Tier | Status |
|---|---|---|---|
| Derived from Cicero, *De finibus* 1.10.32–33 | Cicero, 1914/1998; Antigone, 2021 | Primary text + scholarly | Secure |
| Passage is Epicurean, voiced by Torquatus (not Hieronymus) | Annas & Betegh, 2016; *Classical Quarterly*, 2024 | Peer-reviewed | Secure |
| "*Lorem*" = truncated "do*lorem*" at a 1914 page break | Cicero, 1914; O'Donnell, n.d.; Antigone, 2021 | Primary + academic commentary | Strong |
| Source identified by McClintock via "consectetur" | McClintock, 1994; Adams, n.d.; Priceonomics, n.d. | Primary artifact + reputable press | Strong (verify issue/page) |
| "Used since the 1500s" | Slate, 2023 (debunk) | Reputable press | **Conjecture — reject as fact** |
| Earliest attested use = 1960s Letraset | Lamacraft, 2013; Shaughnessy & Brook, 2015; Slate, 2023 | Design-history + press | Strong |
| Mosley personally scrambled it (specific pages, 1966) | — (encyclopedic/forum only) | User-edited | **Unverified — attribute cautiously** |
| DTP (PageMaker, 1985) drove ubiquity | Design/tech history (general) | Reputable press | Trajectory secure; person (Perry) unverified |
| Placeholder distorts design evaluation | Wroblewski, 2009; cf. Sauer & Sonderegger, 2009; Catani & Biers, 1998 | Practitioner + peer-reviewed proxy | Plausible; not directly tested |
| Placeholder text harms accessibility | W3C, 2018; Deque, n.d.; NN/g, 2014 | Standards + vendor/industry | Well-attested (standards), under-studied (peer review) |
| Leaked filler is a recognized production/SEO risk | Screaming Frog, n.d.; Sitebulb, n.d. | Vendor docs | Attested in practice |
| 2014 Google Translate outputs = MT artifact, not cipher | Liberman, 2014; Guerreiro et al., 2023 | Academic linguistics + peer-reviewed | Secure (mechanism) |

*Note.* "Secure" = supported by primary or peer-reviewed sources; "Strong" = consistent reputable sourcing with minor verification outstanding; "Conjecture/Unverified" = circulates without adequate sourcing and is flagged accordingly.
