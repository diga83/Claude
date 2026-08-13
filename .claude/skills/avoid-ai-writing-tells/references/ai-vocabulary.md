# AI Vocabulary and Phrase Watchlists

The complete watchlists behind the core skill. Consult this for a careful
de-slop pass. Remember the rules: **density is the signal, not any single word**
(one is coincidence, a cluster is a signature); a word being overused by AI does
**not** mean its synonyms are; and context matters (a literal "underscore" mark
or "landscape" photo is fine — the tell is figurative/abstract use).

## Contents

- Single overused words
- How the overused set shifts by model era
- Phrase watchlists by category
- Copula and plain-verb swaps
- Chatbot residue phrases
- Structural / formatting tells

## Single overused words

These spiked in text after late 2022 and cluster together. Figurative or
abstract senses are the tells.

`additionally` (esp. sentence-initial), `align with`, `boasts` (= "has"),
`bolstered`, `crucial`, `deep dive`, `delve`, `emphasizing`, `enduring`,
`enhance`, `fostering`, `garner`, `highlight` (verb), `interplay`,
`intricate`/`intricacies`, `key` (adjective), `landscape` (abstract noun),
`meticulous`/`meticulously`, `pivotal`, `robust`, `showcase`, `tapestry`
(abstract noun), `testament`, `underscore` (verb), `valuable`, `vibrant`,
`nuanced`, `multifaceted`, `realm`, `seamless`, `resonate`, `cornerstone`,
`beacon`, `ever-evolving`/`ever-changing`.

Grok-specific extra overuse: pseudo-scientific `causal`, `empirical`,
`correlate`, and continued `underscore`.

## How the overused set shifts by model era

Rough guide to how "earlier" vs "later" output reads (not hard cutoffs):

- **2023 – mid-2024 (GPT-4 era):** additionally, boasts, bolstered, crucial,
  delve, emphasizing, enduring, garner, intricate/intricacies, interplay, key,
  landscape, meticulous, pivotal, underscore, tapestry, testament, valuable,
  vibrant.
- **Mid-2024 – mid-2025 (GPT-4o era):** align with, bolstered, crucial,
  emphasizing, enhance, enduring, fostering, highlighting, pivotal, showcasing,
  underscore, vibrant.
- **Mid-2025 on (GPT-5 era):** emphasizing, enhance, highlighting, showcasing,
  plus the "notability/coverage" phrasings below. Blatant superlatives ("the
  best") fade; positivity gets subtler.

Takeaway: `delve`/`tapestry` read as *old* AI; a piece heavy on
`showcasing`/`highlighting`/`enhance` plus coverage-name-dropping reads as
*recent* AI. Both are tells.

## Phrase watchlists by category

**Significance / legacy / trend inflation**
stands/serves as, is a testament/reminder, plays a crucial/pivotal/vital/
significant/key role, underscores/highlights its importance/significance,
reflects a broader, symbolizing its ongoing/enduring/lasting, contributing to
the, setting the stage for, marking/shaping the, represents/marks a shift, key
turning point, evolving landscape, focal point, indelible mark, deeply rooted.

**Notability / coverage / media name-dropping** (esp. 2025+)
independent coverage, local/regional/national media outlets, music/business/
tech outlets, trade publications, profiled in, written by a leading expert,
maintains an active/strong social media presence, featured in [outlet list].

**Superficial "-ing" analysis tails**
highlighting…, underscoring…, emphasizing…, ensuring…, reflecting…,
symbolizing…, contributing to…, cultivating/fostering…, encompassing…,
enhancing…, offering valuable insights, aligning/resonating with….

**Promotional / puffery**
boasts a, vibrant, rich, profound, enhancing, showcasing, exemplifies,
commitment to, natural beauty, nestled, in the heart of, groundbreaking,
renowned, featuring, diverse array, must-visit, breathtaking.

**Vague attribution / weasel**
industry reports, observers have cited/noted, experts argue, some critics
argue, several sources/publications (when few or none are cited), such as
(before a list implied to be non-exhaustive), it is widely regarded/believed.

**"Challenges / future" outline formula**
Despite its… faces several challenges…, Despite these challenges, Challenges
and Legacy, Future Outlook, Future Prospects.

**Negative parallelism**
not only… but (also)…, it's not just X, it's Y, not X, but Y, no X, no Y, just
Z, X rather than Y (Grok-favored).

**Editorializing didactic disclaimers** (older models)
it's important/critical/crucial to note/remember/consider, (it is) worth
noting, no discussion would be complete without, may vary.

**Section-summary wrap-ups** (older models)
In summary, In conclusion, Overall.

## Copula and plain-verb swaps

Restore the plain word on the left; the right side is the AI reflex.

- is / are / was  ←  serves as, stands as, functions as, operates as,
  represents, marks
- has / have  ←  boasts, features, maintains, offers
- is (defining a term)  ←  refers to
- wrote  ←  authored
- used  ←  utilized, leveraged
- made / built  ←  crafted, engineered
- moved  ←  relocated
- tried  ←  attempted, endeavored
- died  ←  passed away
- began as / was  ←  ventured into … as, embarked on a career as

Note: "has been featured" (past perfect) is fine — the tell is `features` /
`boasts` as a present-tense substitute for `has`.

## Chatbot residue phrases

Never leave these in delivered text.

**Collaborative filler:** I hope this helps, Of course!, Certainly!, You're
absolutely right!, Great question!, Would you like…, is there anything else,
let me know if…, here is a…, below is a…, a more detailed breakdown.

**Knowledge-cutoff / gap disclaimers:** as of my last knowledge/training
update, up to my last update, while specific details are limited/scarce, not
widely available/documented/disclosed, in the provided/available sources, based
on available information, the artist/subject maintains a low profile / keeps
personal details private (as filler for missing facts).

**Prompt-refusal residue:** as an AI language model, as a large language model,
I cannot offer … advice but I can, I'm sorry, but….

**Placeholders:** [insert X], [Name], [date], 2025-xx-xx, `access-date` values
that don't match the writing date.

## Structural / formatting tells

- **Title Case headings** → use sentence case.
- **Skipped heading levels** / thematic breaks (`---`, `----`) before each
  heading.
- **Excessive boldface**, especially bolding every instance of a term or
  "key takeaways" runs.
- **Inline-header vertical lists:** `- **Header:** description` repeated down a
  list where prose would do.
- **Em-dash overuse**, spaced ` — `, in a punched-up sales rhythm where a
  comma/colon/parentheses fits.
- **Emoji decorating** headings or bullets.
- **Curly/straight quote and apostrophe** inconsistency within one piece.
- **Markdown leaking** into a non-Markdown target (stray `**`, `##`, fenced
  ```` ``` ````), or wikitext/Markdown mixed together.
- **Unnecessary tiny tables** for what should be prose or a single sentence.
- **"X and Y" section headers** (esp. "Awards and recognition," bare
  "Recognition") used reflexively.

## Fabrication (quality, not just style)

- Invented sources, DOIs that resolve to unrelated articles, invalid ISBNs
  (bad checksums), book citations with no page number or that don't verify.
- Broken external links that were never real (not in the Internet Archive).
- Citing a real source you didn't actually read or that doesn't support the
  claim. A convincing fake reference is worse than no reference.
