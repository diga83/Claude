// Traditional interpretive meanings. These are the conventions astrologers
// use to read a chart; they are symbolic, not empirically validated.

export const SIGN_INFO = {
  Aries: { element: 'Fire', mode: 'Cardinal', ruler: 'Mars', keywords: 'bold, direct, pioneering, impatient', style: 'with courage and urgency, preferring to act first and reflect later' },
  Taurus: { element: 'Earth', mode: 'Fixed', ruler: 'Venus', keywords: 'steady, sensual, loyal, stubborn', style: 'patiently and practically, valuing comfort, security and things that last' },
  Gemini: { element: 'Air', mode: 'Mutable', ruler: 'Mercury', keywords: 'curious, witty, adaptable, restless', style: 'through words, ideas and variety, thriving on conversation and new information' },
  Cancer: { element: 'Water', mode: 'Cardinal', ruler: 'Moon', keywords: 'nurturing, protective, intuitive, moody', style: 'through care and emotional attunement, guarding the people and places that feel like home' },
  Leo: { element: 'Fire', mode: 'Fixed', ruler: 'Sun', keywords: 'warm, proud, creative, dramatic', style: 'generously and expressively, wanting to shine and to be recognised for it' },
  Virgo: { element: 'Earth', mode: 'Mutable', ruler: 'Mercury', keywords: 'precise, helpful, analytical, self-critical', style: 'through skill and refinement, noticing details others miss and wanting to be useful' },
  Libra: { element: 'Air', mode: 'Cardinal', ruler: 'Venus', keywords: 'diplomatic, fair, charming, indecisive', style: 'through relationship and balance, weighing every side and seeking harmony' },
  Scorpio: { element: 'Water', mode: 'Fixed', ruler: 'Mars / Pluto', keywords: 'intense, private, perceptive, transformative', style: 'with depth and intensity, committing fully and seeing beneath the surface' },
  Sagittarius: { element: 'Fire', mode: 'Mutable', ruler: 'Jupiter', keywords: 'adventurous, honest, philosophical, restless', style: 'by exploring and questing for meaning, through travel, study and big-picture thinking' },
  Capricorn: { element: 'Earth', mode: 'Cardinal', ruler: 'Saturn', keywords: 'ambitious, disciplined, responsible, reserved', style: 'strategically and with long-term discipline, building authority step by step' },
  Aquarius: { element: 'Air', mode: 'Fixed', ruler: 'Saturn / Uranus', keywords: 'independent, inventive, idealistic, detached', style: 'in original, unconventional ways, often on behalf of a group or an idea' },
  Pisces: { element: 'Water', mode: 'Mutable', ruler: 'Jupiter / Neptune', keywords: 'compassionate, imaginative, spiritual, elusive', style: 'through empathy and imagination, sensing what is unspoken and dissolving boundaries' },
};

export const PLANET_INFO = {
  Sun: { glyph: '☉', rules: 'identity, vitality and life purpose', short: 'your core self' },
  Moon: { glyph: '☽', rules: 'emotions, instincts and what makes you feel safe', short: 'your emotional needs' },
  Mercury: { glyph: '☿', rules: 'thinking, speaking and learning', short: 'your mind' },
  Venus: { glyph: '♀', rules: 'love, beauty, pleasure and values', short: 'your heart and values' },
  Mars: { glyph: '♂', rules: 'drive, desire, anger and courage', short: 'your drive' },
  Jupiter: { glyph: '♃', rules: 'growth, luck, faith and opportunity', short: 'your sense of opportunity' },
  Saturn: { glyph: '♄', rules: 'discipline, limits, responsibility and time', short: 'your sense of duty' },
  Uranus: { glyph: '♅', rules: 'change, freedom and sudden awakening', short: 'your need for freedom' },
  Neptune: { glyph: '♆', rules: 'dreams, spirituality, illusion and compassion', short: 'your ideals' },
  Pluto: { glyph: '♇', rules: 'power, transformation and rebirth', short: 'your power' },
  'North Node': { glyph: '☊', rules: 'your direction of growth in this life', short: 'your path of growth' },
  Ascendant: { glyph: 'AC', rules: 'your outward manner and how life meets you', short: 'your persona and body' },
  Midheaven: { glyph: 'MC', rules: 'career, reputation and public direction', short: 'your career and reputation' },
  Rahu: { glyph: '☊', rules: 'obsession, ambition and the unfamiliar', short: 'worldly hunger' },
  Ketu: { glyph: '☋', rules: 'detachment, past mastery and liberation', short: 'detachment' },
};

export const SIGN_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export const HOUSE_INFO = [
  null,
  { area: 'self, body and first impressions', theme: 'personal reinvention' },
  { area: 'money, possessions and self-worth', theme: 'income and resources' },
  { area: 'communication, siblings, learning and local travel', theme: 'learning, writing and conversations' },
  { area: 'home, family, roots and private life', theme: 'home and family' },
  { area: 'creativity, romance, children and play', theme: 'romance, creativity and joy' },
  { area: 'work, daily routine and health', theme: 'work routines and health' },
  { area: 'partnerships, marriage and open enemies', theme: 'partnerships and commitments' },
  { area: 'shared resources, intimacy and transformation', theme: 'shared money, intimacy and deep change' },
  { area: 'travel, higher learning, beliefs and publishing', theme: 'travel, study and broader horizons' },
  { area: 'career, status and public reputation', theme: 'career and public standing' },
  { area: 'friends, networks, hopes and communities', theme: 'friendships, networks and future goals' },
  { area: 'solitude, the unconscious, endings and spiritual retreat', theme: 'rest, closure and inner work' },
];

const ord = (n) => n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');
export { ord };

export function placementText(name, sign, house) {
  const p = PLANET_INFO[name];
  const s = SIGN_INFO[sign];
  let t = `${name} in ${sign}: this placement expresses ${p.short} ${s.style}.`;
  if (house) t += ` Placed in the ${ord(house)} house, it focuses on ${HOUSE_INFO[house].area}.`;
  return t;
}

export const BIG_THREE = {
  Sun: (sign) => `Your Sun sign describes the kind of person you are becoming. As a ${sign} (${SIGN_INFO[sign].keywords}), you find purpose ${SIGN_INFO[sign].style}.`,
  Moon: (sign) => `Your Moon sign shows what you need to feel safe. With the Moon in ${sign}, you are emotionally ${SIGN_INFO[sign].keywords.split(', ').slice(0, 2).join(' and ')}, processing feelings ${SIGN_INFO[sign].style}.`,
  Ascendant: (sign) => `Your rising sign is the lens others first see you through. ${sign} rising comes across as ${SIGN_INFO[sign].keywords.split(', ').slice(0, 3).join(', ')}, and meets new situations ${SIGN_INFO[sign].style}.`,
};

const ASPECT_PHRASE = {
  conjunction: (a, b) => `${a} and ${b} are fused together, acting as one.`,
  sextile: (a, b) => `Opportunities link ${a} with ${b} when you make the effort.`,
  square: (a, b) => `Friction between ${a} and ${b} pushes you to grow.`,
  trine: (a, b) => `${a} and ${b} support each other naturally.`,
  opposition: (a, b) => `A tug-of-war between ${a} and ${b} asks for balance.`,
};

export function aspectText(a, asp, b) {
  return capitalize(ASPECT_PHRASE[asp](PLANET_INFO[a].short, PLANET_INFO[b].short));
}

// --- Predictive texts ------------------------------------------------------

const TRANSIT_PLANET = {
  Jupiter: { tone: 'expansion and opportunity', advice: 'Say yes to growth, but watch for overconfidence and excess.', duration: 'weeks' },
  Saturn: { tone: 'pressure, testing and consolidation', advice: 'Commit, simplify and do the work; what you build now tends to last.', duration: 'months' },
  Uranus: { tone: 'sudden change and liberation', advice: 'Stay flexible; unexpected events push you toward a freer life.', duration: 'about a year' },
  Neptune: { tone: 'dissolution, inspiration and uncertainty', advice: 'Trust intuition and creativity, but double-check facts and promises.', duration: 'one to two years' },
  Pluto: { tone: 'deep transformation and power shifts', advice: 'Let go of what is finished; something stronger grows in its place.', duration: 'two years or more' },
};

const ASPECT_TONE = {
  conjunction: 'A major new chapter begins:',
  sextile: 'A helpful opening appears:',
  square: 'A turning point under tension:',
  trine: 'A supportive, easy period:',
  opposition: 'A culmination and moment of awareness:',
};

export function transitText(e) {
  const tp = TRANSIT_PLANET[e.planet];
  const target = PLANET_INFO[e.target];
  return `${ASPECT_TONE[e.aspect]} ${e.planet}'s ${tp.tone} meets ${target.short} (${target.rules}). ${tp.advice}`;
}

export const HOUSE_TRANSIT = {
  Jupiter: (h) => `Jupiter is moving through your ${ord(h)} house — traditionally the luckiest area of the year. Expect growth and opportunities around ${HOUSE_INFO[h].theme}.`,
  Saturn: (h) => `Saturn is moving through your ${ord(h)} house — the area of life asking for maturity and effort. Responsibilities and slow, solid progress around ${HOUSE_INFO[h].theme}.`,
};

export const PROGRESSED_MOON_SIGN = {
  Fire: 'an emotionally energetic phase: you want action, adventure and to be seen',
  Earth: 'a grounded phase: emotional focus on security, body, money and practical results',
  Air: 'a social, mental phase: you need conversation, ideas and new connections',
  Water: 'an inward phase: feelings, family and intimacy take centre stage',
};

export function lunarPhaseName(phase) {
  const names = ['New Moon', 'Crescent', 'First Quarter', 'Gibbous', 'Full Moon', 'Disseminating', 'Last Quarter', 'Balsamic'];
  const text = [
    'Seeding a new 30-year cycle: instinctive new beginnings.',
    'Pushing past old habits; effort to establish the new direction.',
    'Crisis in action: decisive building and commitment.',
    'Refining and perfecting what you have built.',
    'Culmination: relationships and results bring awareness.',
    'Sharing what you have learned; teaching and spreading ideas.',
    'Crisis in consciousness: reorienting beliefs and letting go.',
    'Release and preparation; closing the 30-year cycle.',
  ];
  const i = Math.floor(((phase + 22.5) % 360) / 45);
  return { name: names[i], text: text[i] };
}

export const DASHA_LORD_INFO = {
  Sun: 'authority, father, government, vitality and recognition',
  Moon: 'mind, mother, emotions, public life and nourishment',
  Mars: 'energy, property, siblings, courage, conflict and competition',
  Mercury: 'intellect, business, communication, trade and learning',
  Jupiter: 'wisdom, children, teachers, wealth, dharma and good fortune',
  Venus: 'love, marriage, luxury, art, vehicles and comforts',
  Saturn: 'work, discipline, delays, endurance, service and karma',
  Rahu: 'ambition, foreign things, technology, unconventional gains and obsession',
  Ketu: 'spirituality, detachment, research, sudden breaks and liberation',
};

const VEDIC_HOUSE = [
  null, 'self and health', 'wealth, family and speech', 'courage, siblings and efforts',
  'home, mother, vehicles and happiness', 'children, intelligence and romance',
  'enemies, debts, illness and service', 'marriage and partnerships',
  'longevity, sudden events and hidden matters', 'fortune, father, dharma and long journeys',
  'career, status and actions', 'gains, income and fulfilled desires', 'losses, expenses, foreign lands and moksha',
];

export function dashaText(lord, house) {
  let t = `The ${lord} period brings themes of ${DASHA_LORD_INFO[lord]}.`;
  if (house) t += ` ${lord} sits in your ${ord(house)} house, so results show up most in matters of ${VEDIC_HOUSE[house]}.`;
  return t;
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
