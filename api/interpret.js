/* Somnia — AI dream interpretation endpoint (Vercel/Node serverless).
   Calls the Claude API with structured JSON output. Deploy notes in README.md.
   Required env: ANTHROPIC_API_KEY. Optional: ANTHROPIC_MODEL, ANTHROPIC_EFFORT. */
import Anthropic from '@anthropic-ai/sdk';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-8';
const EFFORT = process.env.ANTHROPIC_EFFORT || 'low';

const LENSES = {
  balanced: 'a balanced blend of modern dream psychology and classic symbolism',
  psychology: 'modern dream psychology (continuity hypothesis: dreams reflect waking concerns; cite the emotional content as the primary signal)',
  jungian: 'Jungian analysis (archetypes, the shadow, compensation; treat dream figures as parts of the dreamer’s psyche)',
  freudian: 'a Freudian-inspired reading (manifest vs latent content, wish fulfillment — clearly framed as a historical interpretive tradition)',
  spiritual: 'cross-cultural and spiritual dream traditions (note which culture each idea comes from; frame as tradition, not fact)'
};

// Keep the system prompt byte-stable: it is the cacheable prefix.
const SYSTEM_PROMPT = `You are Somnia, a thoughtful dream interpreter on a dream-interpretation website.

Principles you always follow:
- Dream symbols have no fixed universal meanings; interpretations are reflective prompts, never facts or predictions. Never predict the future or diagnose.
- The dream's emotion is the most informative signal. Connect it to plausible waking-life themes as questions, not verdicts.
- Be warm, specific, and grounded. Quote concrete details from the dreamer's own description rather than speaking in generalities.
- If the dream involves trauma, grief, self-harm, or recurring nightmares causing distress, be gentle and include a recommendation to talk to a professional in gentle_note (mention that Imagery Rehearsal Therapy exists for recurring nightmares).
- Never include medical, legal, or financial advice.

Output requirements:
- summary: 1-2 sentences capturing the dream's emotional core.
- emotional_tone: the feelings present in the dream, named plainly.
- symbols: 3-6 notable elements from THIS dream, each with a meaning written for this dreamer's context (not dictionary boilerplate).
- reading: 3-5 paragraphs in the requested interpretive lens. Speak directly to the dreamer ("you"). Reference their actual imagery.
- reflection_questions: 3-5 specific questions that connect the dream to waking life.
- gentle_note: 1-3 sentences of perspective, including any care recommendation if warranted.`;

const READING_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'emotional_tone', 'symbols', 'reading', 'reflection_questions', 'gentle_note'],
  properties: {
    summary: { type: 'string' },
    emotional_tone: { type: 'string' },
    symbols: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'meaning'],
        properties: {
          name: { type: 'string' },
          meaning: { type: 'string' }
        }
      }
    },
    reading: { type: 'string' },
    reflection_questions: { type: 'array', items: { type: 'string' } },
    gentle_note: { type: 'string' }
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'AI interpretation is not configured on this deployment.' });
  }

  const { dream, lens } = req.body || {};
  if (typeof dream !== 'string' || dream.trim().length < 20) {
    return res.status(400).json({ error: 'Please describe your dream in at least a sentence or two.' });
  }
  if (dream.length > 6000) {
    return res.status(400).json({ error: 'Dream description is too long (max 6,000 characters).' });
  }
  const lensText = LENSES[lens] || LENSES.balanced;

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: EFFORT,
        format: { type: 'json_schema', schema: READING_SCHEMA }
      },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content:
            'Interpret this dream through ' + lensText + '.\n\n<dream>\n' + dream.trim() + '\n</dream>'
        }
      ]
    });

    if (response.stop_reason === 'refusal') {
      return res.status(200).json({
        error: 'This dream couldn’t be interpreted automatically. The free on-device reading is still available.'
      });
    }
    if (response.stop_reason === 'max_tokens') {
      return res.status(502).json({ error: 'The reading was cut short — please try again.' });
    }

    const textBlock = response.content.find(function (b) { return b.type === 'text'; });
    if (!textBlock) {
      return res.status(502).json({ error: 'No reading was generated — please try again.' });
    }

    const reading = JSON.parse(textBlock.text);
    return res.status(200).json({ reading: reading, model: response.model });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError || (err && err.type === 'overloaded_error')) {
      return res.status(429).json({ error: 'The dream interpreter is busy right now — please try again in a moment.' });
    }
    console.error('interpret error:', err && err.message);
    return res.status(502).json({ error: 'Something went wrong generating your reading. Please try again.' });
  }
}
