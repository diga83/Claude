---
name: avoid-ai-writing-tells
description: >-
  Write and edit prose that doesn't read as machine-generated. Use this whenever
  you are drafting or revising human-facing writing — articles, blog posts,
  essays, documentation, README prose, marketing copy, reports, emails, bios,
  encyclopedia or wiki entries, or any text a person will read — and especially
  when the user asks for writing that sounds human, natural, or not "like AI,"
  or asks you to remove AI tells, de-slop, or humanize a draft. Based on
  Wikipedia's "Signs of AI writing" field guide. Apply it by default to any
  substantial writing task even when the user doesn't name it; skip it only for
  code, data, and terse mechanical output where prose style is irrelevant.
---

# Avoid AI Writing Tells

## Why this exists

Language models regress to the mean: they reach for the most statistically
average phrasing that fits the widest range of cases. So a specific fact —
"inventor of the first train-coupling device" — drifts toward a generic,
inflated one — "a revolutionary titan of industry." The subject becomes *less
specific and more exaggerated at the same time.* That trade is the root of
almost every tell below. The fix is almost always the same move in reverse:
**cut the inflation, restore the specific.**

These are not arbitrary style rules. Each pattern is a symptom of vague,
padded, or unsupported writing. Fixing the surface tell without fixing the
underlying vagueness just hides the problem. When you catch yourself writing
one of these, ask what concrete thing you were avoiding saying, and say that
instead.

This guide is descriptive, not a set of bans. Any one of these can appear in
good human writing. The signal is **density** — several of them stacked
together. Aim for prose that would not raise a single flag, then move on;
don't contort a sentence to dodge a word that genuinely fits.

## The core habits

Most tells collapse into four failures. Learn these and the rest follow.

1. **Inflated significance.** Explaining why the subject matters, its legacy,
   its place in a "broader movement," instead of just stating what it is.
2. **Unsupported authority.** Vague attributions ("experts argue," "observers
   note"), claims of coverage or recognition, opinions with no named source.
3. **Mechanical symmetry.** Rule-of-three lists, "not just X but Y," parallel
   clauses, present-participle tails — structure standing in for substance.
4. **Padded neutrality.** Reaching past plain words (`is`, `has`, `used`) for
   fancier ones (`serves as`, `boasts`, `utilized`), and past plain facts for
   promotional tone.

## What to avoid

### Inflated significance and legacy

Don't tell the reader that ordinary facts are pivotal, foundational, or part of
a broader trend. Drop sentences that exist only to assert importance.

- Watch phrases: *stands/serves as a testament to, plays a crucial/pivotal/
  vital/significant role, underscores/highlights its importance, reflects a
  broader, marking a turning point, setting the stage for, leaving an indelible
  mark, cementing its legacy, in an evolving landscape, deeply rooted.*
- Don't situate a subject amid vague "debates" or "public discussions," and
  don't append conservation status, ecosystem connections, or "ongoing
  research" to a species that has none of note just to sound weighty.

> ✗ The institute's founding marked a pivotal moment in the evolution of
> regional statistics, part of a broader movement toward decentralization.
> ✓ The institute was founded in 1989 to produce official statistics for
> Catalonia.

### Promotional / travel-brochure tone

Even asked for a neutral register, models drift into advertisement prose. Strip
it.

- Watch words: *boasts a, vibrant, rich (cultural) heritage, nestled, in the
  heart of, breathtaking, renowned, groundbreaking, must-visit, diverse array,
  commitment to, natural beauty, seamless, showcasing, exemplifies.*
- State what a thing is and does. Let the facts carry the weight.

### Vague attribution and overgeneralized opinion (weasel wording)

Don't attribute claims to an unnamed crowd, and don't inflate one source into
many.

- Watch phrases: *industry reports, observers have noted, experts argue, some
  critics say, it is widely regarded, several sources* (when you cite one or
  none), *studies show* (unnamed).
- Attribute to a specific named source, or cut the claim. Don't imply a list is
  non-exhaustive ("such as…") when you only have those examples.

### Superficial "-ing" analysis

Don't glue a present-participle tail onto a sentence to editorialize about
significance.

> ✗ The population reached 56,998, creating a lively community and further
> enhancing its significance as a dynamic hub of culture.
> ✓ The 2008 census recorded 56,998 residents.

- Watch tails: *highlighting the importance of…, reflecting a broader…,
  underscoring its role in…, cementing its status as…, further enhancing…,
  contributing to….* These are almost always unsupported synthesis. Delete
  them or replace with a sourced, concrete consequence.

### Negative parallelism and "rule of three"

- Avoid *"not only X but also Y," "it's not just X, it's Y," "no X, no Y, just
  Z," "X rather than Y"* as a reflexive rhythm. Use them only when you are
  genuinely correcting a specific misconception.
- Avoid the reflexive triple — *"innovative, transformative, and
  groundbreaking."* Three is fine when three real things exist; it's a tell
  when the count is padding and the items are near-synonyms. Prefer one precise
  word or a differently sized, non-parallel list.

### "AI vocabulary" and copula avoidance

- A cluster of *delve, tapestry, testament, underscore, pivotal, crucial,
  foster, garner, boasts, showcase, robust, intricate, meticulous, landscape,
  realm, vibrant, seamless, nuanced, multifaceted* in one piece is one of the
  strongest tells. One is coincidence; a dozen is a signature.
- Don't swap plain copulas and verbs for fancier ones by reflex: prefer *is /
  are / has* over *serves as / stands as / functions as / boasts / features /
  offers*; *wrote* over *authored*; *used* over *utilized*; *made* over
  *crafted*; *died* over *passed away*.
- See `references/ai-vocabulary.md` for the full lists (including how the
  overused set has shifted across model generations) and richer phrase tables.
  Consult it when doing a careful de-slop pass or when you want the complete
  watchlist.

### Formulaic structure

- No tacked-on **"Challenges" / "Future Prospects" / "Legacy"** sections built
  on the formula *"Despite its [praise], X faces challenges…"* ending in vague
  optimism.
- No **"In conclusion," "Overall," "In summary"** wrap-up paragraph that
  restates what was just said.
- Avoid the ubiquitous **"Awards and recognition"** and other **"X and Y"**
  header pairs when a simpler, more specific heading works.
- Don't open an article on a list or descriptive title by defining it as if it
  were a proper noun ("The *List of songs about Mexico* is a curated
  compilation…").

### Formatting tells

- **Headings:** sentence case, not Title Case. Don't skip heading levels.
- **Boldface:** sparingly. Don't bold every key term or run "key takeaways"
  lists where each bullet starts with a **bold lead-in:** followed by a colon
  and description.
- **Lists:** prefer prose when a few items read fine in a sentence. Reserve
  bullets for genuinely list-like material.
- **Em dashes:** fine in moderation; models overuse them where a comma, colon,
  or parentheses is more natural, and in a punched-up, sales-y rhythm. Don't
  pepper a piece with spaced em dashes.
- **Emoji:** don't use emoji to decorate headings or bullets.
- **Quotes/apostrophes:** be consistent; don't mix curly and straight marks.
- **Markup:** match the target format (Markdown vs. wikitext vs. plain text);
  don't leave stray `**`, `##`, or ```` ``` ```` fences in output meant for a
  system that doesn't render them.

### Chatbot residue and fabrication

Never let these reach the page:

- Meta/collaborative filler: *"I hope this helps," "Certainly!," "Of course!,"
  "You're absolutely right," "Would you like me to…," "Let me know if…," "Here
  is a…"* Deliver the content, not the conversation around it.
- Knowledge-cutoff and gap disclaimers: *"As of my last update," "while
  specific details are limited," "not widely documented," "based on available
  sources."* If you don't know, say so plainly or leave it out — don't
  speculate and then dress the speculation as fact. Never invent that a person
  "maintains a low profile" to paper over missing information.
- Unfilled placeholders: *[insert date], [Name], 2025-xx-xx.* Fill them or
  remove them.
- **Fabricated citations.** Don't invent sources, DOIs, ISBNs, page numbers, or
  URLs, and don't cite a real source you didn't actually use. A plausible-
  looking fake reference is worse than none.

## What good human writing looks like

Steer *toward* these — they read as human because AI avoids them:

- **Plain copulas and verbs:** "there is a," "it has," "was the first."
- **Specific, unusual, verifiable facts** over generic praise — the sharper and
  more particular, the better.
- **Simple words** where they fit: *wrote, used, moved, tried, died* — not
  *authored, utilized, relocated, attempted, passed away.*
- **Definite statements** when warranted ("was the only," "the first to…"),
  rather than hedging everything into vagueness.
- **Natural, uneven rhythm** — varied sentence length, no relentless parallel
  scaffolding. Occasional plain, even blunt sentences.
- **Register that matches the venue** and the subject's regional variety of
  English (don't default American English onto a plainly British or Indian
  topic).

## Revision checklist

When cleaning a draft (yours or someone else's), pass through once for each:

1. **Significance padding** — delete sentences and clauses whose only job is to
   assert importance, legacy, or "broader" relevance.
2. **Participle tails** — cut or ground every "-ing" editorial add-on.
3. **Weasel attribution** — name the source or remove the claim.
4. **Vocabulary** — hunt the AI-vocab cluster; swap fancy verbs back to plain
   ones; restore `is`/`has`.
5. **Symmetry** — break up rule-of-three and "not only… but" rhythms that
   aren't earning their structure.
6. **Structure** — remove formulaic Challenges/Conclusion sections and
   summary restatements; fix Title Case headings.
7. **Formatting** — thin out bold, unnecessary bullets, and stray em dashes;
   strip emoji and residue.
8. **Substance check (most important)** — for each tell you removed, confirm
   you replaced vagueness with something concrete, not just deleted words.
   If a passage still says nothing after cleanup, it needs a real fact, not a
   smoother sentence.

The goal isn't to pass a detector — it's writing that's specific, honest, and
plain enough that the question never comes up.
