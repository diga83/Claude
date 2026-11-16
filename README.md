# Quillcheck

A web app that checks essays and documents for AI-generated writing: an overall
likelihood score, sentence-level highlighting, the evidence behind the result,
saved history and a printable report.

## Features

- **Hybrid detection.** A built-in statistical engine works with no setup. Add an
  Anthropic API key and each scan also gets a second opinion from Claude; the two
  are blended into one score.
- **Sentence highlighting.** Every sentence is scored and marked as likely AI,
  uncertain or likely human, with the reasons shown on hover and in the report.
- **File upload.** PDF, DOCX and TXT (up to 8 MB), or pasted text.
- **Accounts and history.** Email/password sign-up; scans made while signed in are
  saved and can be reopened or deleted.
- **Downloadable report.** Each saved scan has a print-optimised report page;
  "Download PDF" uses the browser's Save as PDF.

## Running locally

```bash
npm install
cp .env.example .env.local   # optional for local use
npm run dev
```

Open http://localhost:3000. Anyone can run a scan; sign up to save them.

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `SESSION_SECRET` | In production | Signs login cookies. At least 32 random characters. |
| `ANTHROPIC_API_KEY` | No | Enables the AI second opinion (hybrid mode). |
| `DETECTOR_MODEL` | No | Model for the second opinion. Defaults to `claude-opus-5-5`. |
| `DATABASE_URL` | No | Defaults to a local SQLite file at `./data/app.db`. |
| `DATABASE_AUTH_TOKEN` | No | Token for a hosted libSQL/Turso database. |

## Deploying

The app is a standard Next.js project and deploys to Vercel or any Node host.
Serverless hosts have no persistent disk, so point `DATABASE_URL` at a hosted
libSQL database (for example Turso) instead of the local file. Tables are
created automatically on first use.

## How detection works

`src/lib/detector/statistical.ts` measures six stylistic signals: variation in
sentence length, over-used "AI" phrasing, formal connectives, personal voice,
formulaic structure, and surface irregularities. They are weighted into a
document score, and each sentence is scored on its own local evidence.

When an API key is present, `src/lib/detector/llm.ts` sends the numbered
sentences to Claude and asks for a calibrated probability, a short explanation
and the sentences it considers AI-written. The final score is 65% model review
and 35% statistical. If the two disagree strongly, confidence is lowered and the
report says so. If the model call fails, the scan falls back to statistical
analysis and notes the reason.

## Limits to be aware of

No AI detector is reliable enough to act on alone. Formal, heavily edited or
non-native English writing can be flagged incorrectly, and paraphrased AI text
can pass. The statistical engine is heuristic and has not been benchmarked
against a labelled dataset. Treat results as one input alongside drafts,
version history and a conversation with the author.

Other current limits: 60,000 characters per scan, English only, no OCR for
scanned PDFs, no plagiarism (source-matching) check, no password reset or email
verification, and no rate limiting on the scan endpoint.
