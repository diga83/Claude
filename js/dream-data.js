/* Somnia — dream symbol database.
   Interpretations blend modern dream psychology (continuity hypothesis,
   threat simulation), classic Freudian/Jungian readings, and cross-cultural
   traditions. None of these are validated science — symbol meaning is
   personal and contextual. Prevalence figures cite Nielsen et al. (2003),
   Amerisleep survey data, and related studies; see RESEARCH.md. */
const DREAM_DATA = {
  symbols: [
    /* ---------- Classic themes ---------- */
    {
      id: 'being-chased', name: 'Being Chased', category: 'Classic Themes',
      keywords: ['chased', 'chase', 'chasing', 'pursued', 'pursuing', 'running away', 'ran away', 'following me', 'followed me'],
      overview: 'The single most common dream theme on record — 81.5% of people in a landmark Canadian study reported being chased in a dream. It is also one of the top nightmares in surveys.',
      psychology: 'Threat simulation theory sees chase dreams as an evolved rehearsal of escaping danger. Modern clinicians often read them as avoidance: something in waking life — a conflict, deadline, emotion, or decision — that you are running from rather than facing.',
      symbolic: 'In Jungian work the pursuer is often the shadow: a disowned part of yourself demanding attention. Turning to face the chaser (especially in a lucid dream) is a classic integration exercise.',
      cultural: 'Chase dreams top the typical-dream lists in Canadian, German, and Chinese samples alike, making them one of the most cross-culturally universal dreams.',
      reflect: 'What are you avoiding right now? If you stopped running and turned around, who or what would you have to face?'
    },
    {
      id: 'falling', name: 'Falling', category: 'Classic Themes',
      keywords: ['falling', 'fell', 'fall', 'plummeting', 'dropped from', 'cliff'],
      overview: 'Reported by roughly three in four people, falling is among the most universal dreams and the most common nightmare theme in survey data (over 64%).',
      psychology: 'Usually read as a felt loss of control, insecurity, or instability — common during stressful transitions. Note that some “falling” jolts are simply hypnic jerks: a harmless muscle twitch at sleep onset with no symbolic meaning at all.',
      symbolic: 'Freud linked falling to anxiety and giving in to temptation. Jungians may read it as the ego losing its footing — an invitation to examine what support is missing.',
      freudian: 'Freud associated falling with anxiety and the fear of succumbing to an impulse or temptation.',
      reflect: 'Where in your life does the ground feel unsteady? What support would help you feel caught?'
    },
    {
      id: 'flying', name: 'Flying', category: 'Classic Themes',
      keywords: ['flying', 'flew', 'fly', 'floating', 'levitating', 'soaring', 'hovering'],
      overview: 'A predominantly joyful theme and a signature activity of lucid dreams. Survey data suggests men report flying dreams somewhat more often than women.',
      psychology: 'Modern interpretations emphasize confidence, ambition, rising above problems, or a new sense of control. Flying dreams often coincide with periods of achievement or release from pressure.',
      symbolic: 'Older research linked flying to the desire for freedom. Jungians read it as transcendence — with a caution about “inflation”: flying too far above earthly realities.',
      reflect: 'What constraint have you recently escaped — or wish you could? Did the flight feel free or precarious?'
    },
    {
      id: 'teeth-falling-out', name: 'Teeth Falling Out', category: 'Body',
      keywords: ['teeth', 'tooth', 'crumbling teeth', 'losing teeth'],
      overview: 'About a third of people report dreams of losing teeth. It is one of the few symbols with direct empirical study — and the results are surprisingly down-to-earth.',
      psychology: 'A 2018 study found teeth dreams correlated with real dental irritation (jaw tension, grinding on awakening) but not with psychological distress. Symbolic readings — anxiety about appearance, communication, aging, or powerlessness — remain popular but untested.',
      symbolic: 'Freud tied teeth-loss dreams to sexual anxiety; Jung read them as painful transition — something old breaking down so something new can emerge.',
      freudian: 'Freud interpreted teeth-loss dreams in terms of castration or repressed sexual anxiety.',
      cultural: 'Folk traditions from Greece to China have read teeth dreams as omens about the death of relatives or coming loss — none of which has any scientific support.',
      reflect: 'Are you clenching your jaw at night? If not — where do you fear losing face, power, or the ability to speak up?'
    },
    {
      id: 'naked-in-public', name: 'Naked in Public', category: 'Classic Themes',
      keywords: ['naked', 'nude', 'no clothes', 'undressed', 'underwear in public'],
      overview: 'The classic embarrassment dream: suddenly exposed in front of a crowd, often before performances, new jobs, or other scrutiny.',
      psychology: 'Contemporary psychology reads public nudity as vulnerability, shame, or fear of being “found out” — impostor feelings made visual. Your emotion in the dream matters: distress suggests fear of judgment, while unbothered nudity may signal authenticity.',
      symbolic: 'Freud saw exhibition dreams as a return to the shameless freedom of early childhood. Jungians read them as the persona slipping — the gap between your public mask and private self.',
      reflect: 'Where do you currently feel exposed or afraid of being seen as you really are?'
    },
    {
      id: 'exam', name: 'Exams & Being Unprepared', category: 'Classic Themes',
      keywords: ['exam', 'test', 'quiz', 'unprepared', 'forgot to study', 'school assignment', 'final exam', 'failing'],
      overview: 'School and exam themes exceed 60% lifetime prevalence and famously persist decades after graduation.',
      psychology: 'Usually recycled performance anxiety: they resurface when you feel tested or scrutinized at work or in life. Intriguingly, a study of French medical-school candidates found that those who dreamed about an upcoming exam — even badly — performed better on it, hinting at a rehearsal function.',
      symbolic: 'The exam can stand for any moment of judgment. Jungians might ask who the examiner is — an internalized critic, parent, or standard you never agreed to.',
      reflect: 'Who is grading you in waking life right now — and is the standard actually yours?'
    },
    {
      id: 'being-late', name: 'Being Late / Missing a Train', category: 'Classic Themes',
      keywords: ['late', 'missed the train', 'missed my flight', 'missed the bus', 'running late', 'missed it'],
      overview: 'A quintessential anxiety dream tied to time pressure and the fear that life is moving without you. “Arriving too late” ranks high on typical-dream inventories.',
      psychology: 'Under the continuity hypothesis it tends to appear in over-scheduled periods or around transitions — a compressed image of feeling behind.',
      symbolic: 'Some Jungian readings frame the missed departure as resistance to a life change you feel unready for: part of you may not want to catch that train.',
      reflect: 'What opportunity or deadline feels like it is slipping away? Is the rush real, or inherited?'
    },
    {
      id: 'trapped', name: 'Being Trapped or Paralyzed', category: 'Classic Themes',
      keywords: ['trapped', 'stuck', 'paralyzed', 'frozen', 'cannot move', "can't move", 'locked in', 'no way out', 'couldn’t move'],
      overview: 'Feeling trapped appeared in about half of surveyed nightmares. Dreams of being unable to move also have a physiological cousin: sleep paralysis, experienced at least once by roughly 8% of people.',
      psychology: 'Symbolically, trapped dreams are read as stuckness — a job, relationship, or obligation without a visible exit. Recurrent versions correlate with waking stress. True sleep paralysis is REM muscle atonia persisting into waking; it is harmless, though frightening.',
      symbolic: 'Jungians add: the trap may be built from unintegrated parts of yourself — the walls are often beliefs about what you “can’t” do.',
      cultural: 'Sleep paralysis has been interpreted across cultures as demons, the “old hag,” or spirit visitation — vivid mythology around a well-understood REM phenomenon.',
      reflect: 'Where in waking life do you feel you have no choices? Is that fully true, or does it just feel that way?'
    },
    {
      id: 'death', name: 'Death & Dying', category: 'Death & Endings',
      keywords: ['death', 'died', 'dying', 'dead', 'funeral', 'grave', 'coffin', 'killed'],
      overview: 'Death appeared in about 55% of nightmares in survey data, yet nearly every interpretive framework agrees it is rarely literal. (And no — dying in a dream does not harm you: 22% of adults report having dreamed of their own death.)',
      psychology: 'Death dreams cluster around major life changes. Dreaming of a loved one dying usually reflects attachment anxiety or anticipatory grief, not prophecy.',
      symbolic: 'Jungian and modern symbolic readings treat dream-death as transformation: the end of a phase, identity, or relationship making room for something new.',
      cultural: 'In many folk traditions death dreams are paradoxically auspicious — read as signs of long life, change, or renewal.',
      reflect: 'What chapter of your life is ending or needs to end? What would you like to carry forward from it?'
    },
    {
      id: 'deceased-loved-one', name: 'Deceased Loved Ones', category: 'People & Relationships',
      keywords: ['deceased', 'dead relative', 'dead mother', 'dead father', 'grandmother', 'grandfather', 'passed away', 'late husband', 'late wife'],
      overview: 'Visitation dreams — vivid, often peaceful dreams of someone who has died — are commonly reported by the bereaved and are frequently described as comforting.',
      psychology: 'Grief researchers view these dreams as part of continuing bonds and emotional processing. They are most frequent in the months after a loss and often shift in tone as grief evolves.',
      symbolic: 'The figure may also carry a quality you associate with them — guidance, safety, unfinished business — that your psyche is working with.',
      cultural: 'Many traditions treat visitation dreams as genuine contact with the departed; whatever your belief, most dreamers report them as meaningful and consoling.',
      reflect: 'What did you most need to hear from this person? What of theirs do you want to keep alive in yourself?'
    },

    /* ---------- People & relationships ---------- */
    {
      id: 'ex-partner', name: 'Ex-Partners', category: 'People & Relationships',
      keywords: ['ex', 'ex boyfriend', 'ex girlfriend', 'ex husband', 'ex wife', 'old flame', 'former partner'],
      overview: 'Studies suggest 5–8% of remembered dreams feature an ex, and one survey found 35% of actively dating people had an ex in their most recent dream.',
      psychology: 'Researchers stress these dreams rarely mean you want the person back. They more plausibly reflect memory consolidation, unresolved feelings, or the ex standing in for a quality or era of your life. They often spike during new relationships and major transitions.',
      symbolic: 'Ask what the ex represents — first love, betrayal, who you were then. The dream may be about that theme, not the person.',
      reflect: 'What did that relationship-era version of you have (or lack) that is relevant now?'
    },
    {
      id: 'cheating', name: 'Cheating & Being Cheated On', category: 'People & Relationships',
      keywords: ['cheating', 'cheated', 'affair', 'unfaithful', 'infidelity', 'betrayed'],
      overview: 'Very common: in a 2023 survey, 21% had dreamed of cheating on their partner and 23% of being cheated on within the past year — in happy and unhappy relationships alike.',
      psychology: 'There is no evidence these dreams reveal actual infidelity or secret desire. They more often process insecurity, jealousy, guilt, unmet needs, or fear of abandonment.',
      symbolic: '“Cheating” can also be non-romantic: divided loyalty between people, jobs, or versions of yourself.',
      reflect: 'Recurring versions are worth treating as a prompt for a waking conversation — about needs and reassurance, not accusation.'
    },
    {
      id: 'wedding', name: 'Weddings & Marriage', category: 'People & Relationships',
      keywords: ['wedding', 'marriage', 'married', 'bride', 'groom', 'engagement', 'proposal'],
      overview: 'Wedding dreams are common around commitments of every kind — not just romantic ones.',
      psychology: 'They tend to surface when you are weighing a binding decision: a relationship step, a job, a move. Anxious wedding dreams (wrong dress, missing ring, absent partner) usually mirror cold feet about commitment generally.',
      symbolic: 'Jungians read marriage as the union of opposites within the self — integrating two sides of your own nature.',
      cultural: 'Several folk traditions read wedding dreams as inverse omens; like all fixed meanings, this has no empirical support.',
      reflect: 'What union or commitment is on your mind — and which part of you has not said “I do” yet?'
    },
    {
      id: 'baby', name: 'Babies', category: 'People & Relationships',
      keywords: ['baby', 'babies', 'infant', 'newborn', 'toddler'],
      overview: 'Babies in dreams are commonly read as new beginnings: a nascent idea, relationship, or part of yourself that is vulnerable and needs care.',
      psychology: 'Dreams of forgetting or neglecting a baby are frequently reported by busy caregivers and high-responsibility workers — usually framed as worry over a neglected commitment, or a neglected part of oneself.',
      symbolic: 'In Jungian terms the baby can be the emerging Self — something genuinely new in you that is not yet able to survive on its own.',
      reflect: 'What new and fragile thing in your life needs more of your attention?'
    },
    {
      id: 'pregnancy', name: 'Pregnancy', category: 'People & Relationships',
      keywords: ['pregnant', 'pregnancy', 'giving birth', 'birth', 'labor', 'expecting'],
      overview: 'Dreamed by people who are not (and cannot be) pregnant, this is a classically Jungian symbol of something gestating.',
      psychology: 'For actually-pregnant dreamers, vivid pregnancy and birth dreams are well documented and tend to track trimester anxieties. For everyone else, the dream usually points at a project or identity in development.',
      symbolic: 'Something is growing in you that is not ready to be born — a plan, a talent, a decision. Anxious versions may signal worry about a fragile new undertaking.',
      reflect: 'What are you incubating right now? What would it need to be born safely?'
    },
    {
      id: 'stranger', name: 'Strangers', category: 'People & Relationships',
      keywords: ['stranger', 'unknown person', 'faceless', 'someone i didn’t know', 'unfamiliar man', 'unfamiliar woman'],
      overview: 'Most dream characters are people we know, but strangers — including faceless ones — are a regular feature, more common in men’s dreams in classic content-analysis norms.',
      psychology: 'A stranger often personifies something unfamiliar in your own life: a new role, an unacknowledged feeling, an undefined threat or possibility.',
      symbolic: 'Jung treated unknown figures as fresh messengers from the unconscious — the less you recognize them, the more they may carry something you have not met in yourself yet.',
      reflect: 'What did the stranger want? If they were a part of you, which part would they be?'
    },
    {
      id: 'celebrity', name: 'Celebrities', category: 'People & Relationships',
      keywords: ['celebrity', 'famous', 'actor', 'singer', 'star', 'idol'],
      overview: 'Celebrity dreams are common in media-saturated cultures and almost never about the celebrity.',
      psychology: 'The famous person usually embodies a quality — talent, confidence, status, glamour — that you admire, envy, or are developing. Continuity research finds dream characters track what occupies waking attention, including media.',
      symbolic: 'Ask what this person is famous for; that trait is usually the message.',
      reflect: 'What quality of theirs do you want more of — and what is one small way to claim it?'
    },
    {
      id: 'crowd', name: 'Crowds', category: 'People & Relationships',
      keywords: ['crowd', 'crowded', 'mob', 'audience', 'everyone was watching', 'crowds'],
      overview: 'Crowds amplify social emotion: belonging when warm, exposure or suffocation when hostile or dense.',
      psychology: 'Performance-anxiety dreams often stage an audience. Feeling lost in a crowd commonly mirrors anonymity or fear of being unremarkable; being watched by one mirrors scrutiny.',
      symbolic: 'The crowd can also represent the collective — social expectations drowning out your individual voice.',
      reflect: 'In waking life, do you currently feel watched, invisible, or carried along by others’ expectations?'
    },

    /* ---------- Animals ---------- */
    {
      id: 'snake', name: 'Snakes', category: 'Animals',
      keywords: ['snake', 'snakes', 'serpent', 'python', 'cobra', 'viper', 'bitten by a snake'],
      overview: 'One of the most searched dream symbols, and one of the most culturally contested — its meaning flips depending on tradition.',
      psychology: 'Modern psychology often grounds snake dreams in fear, a “toxic” person or situation, or simply evolved snake-vigilance (snakes captured human attention long before language).',
      symbolic: 'Freud read snakes as phallic symbols of repressed desire; Jung saw transformation and the shadow, citing skin-shedding and the ouroboros.',
      freudian: 'For Freud, the snake was a primary phallic symbol pointing to repressed sexual energy.',
      cultural: 'Genesis-shaped Western traditions code snakes as deception or temptation, while Hindu and Buddhist nāga traditions and Chinese symbolism can mark snake dreams as auspicious — wisdom, healing (the serpent of Asclepius), kundalini, or rebirth.',
      reflect: 'Was the snake threatening or simply present? What in your life is shedding its skin?'
    },
    {
      id: 'spider', name: 'Spiders', category: 'Animals',
      keywords: ['spider', 'spiders', 'web', 'cobweb', 'tarantula'],
      overview: 'A frequent fear-dream, though spiders carry creative symbolism too — the spider is, after all, a weaver.',
      psychology: 'Modern readings emphasize feeling stuck in a web of obligations, manipulation by someone close, or a lingering fear. Simple arachnophobia and recent exposure are mundane, well-supported triggers.',
      symbolic: 'Freud famously associated the dream spider with an engulfing or controlling mother figure, its web symbolizing entrapment; Jung placed spiders in shadow territory — repressed traits and creative potential.',
      reflect: 'Who or what has you feeling caught? Alternatively — what are you patiently weaving?'
    },
    {
      id: 'dog', name: 'Dogs', category: 'Animals',
      keywords: ['dog', 'dogs', 'puppy', 'hound', 'bitten by a dog'],
      overview: 'Dogs in dreams usually carry their waking associations: loyalty, friendship, protection — or, when hostile, betrayal by something trusted.',
      psychology: 'Continuity research finds pets and familiar animals appear in dreams roughly as they figure in daily life. An aggressive dog often dramatizes conflict with someone close, or your own “snapping point.”',
      symbolic: 'Jungians read the dog as instinct in domesticated form — your animal nature on friendly terms with you, or straining the leash.',
      reflect: 'Is your loyalty being rewarded right now — and are you being loyal to yourself?'
    },
    {
      id: 'cat', name: 'Cats', category: 'Animals',
      keywords: ['cat', 'cats', 'kitten', 'feline'],
      overview: 'Cats carry double symbolism: independence and intuition on one side, unpredictability on the other.',
      psychology: 'As with all animals, your personal history dominates — a cat-lover’s cat dream is not a cat-fearer’s. Hostile cats often appear during friction with someone whose affection feels conditional.',
      symbolic: 'Folklore and Jungian writers alike link cats to the feminine, the intuitive, and the parts of us that cannot be commanded.',
      reflect: 'Where could you use more independence — or where is someone’s independence unsettling you?'
    },
    {
      id: 'bird', name: 'Birds', category: 'Animals',
      keywords: ['bird', 'birds', 'eagle', 'owl', 'crow', 'raven', 'dove', 'sparrow'],
      overview: 'Birds blend the symbolism of flight — freedom, perspective, aspiration — with rich species-specific folklore.',
      psychology: 'Caged or injured birds frequently mirror constrained ambition or a silenced voice; soaring birds accompany hope and plans taking off.',
      symbolic: 'Jung treated birds as messengers between conscious and unconscious. Owls carry wisdom-and-omen folklore; doves peace; crows and ravens transformation and death-as-change.',
      cultural: 'Bird augury — reading birds as omens — appears in Roman, Norse, and many Indigenous traditions.',
      reflect: 'What part of you wants to take flight? What cage is it negotiating with?'
    },
    {
      id: 'fish', name: 'Fish', category: 'Animals',
      keywords: ['fish', 'fishes', 'goldfish', 'salmon', 'aquarium', 'fishing'],
      overview: 'Fish swim in water — the dream element most consistently linked to emotion and the unconscious — so they are often read as contents of the deep surfacing.',
      psychology: 'Catching a fish can mirror grasping an insight or opportunity; dead or dying fish often accompany a feeling that something once alive (a plan, a feeling) is suffocating.',
      symbolic: 'Jung used the fish as a symbol of the Self emerging from unconscious depths. Abundance readings are common too.',
      cultural: 'In Chinese tradition fish symbolize prosperity and surplus; in Christian symbolism, faith.',
      reflect: 'What insight keeps flickering just under the surface of your attention?'
    },
    {
      id: 'horse', name: 'Horses', category: 'Animals',
      keywords: ['horse', 'horses', 'riding', 'stallion', 'mare', 'pony'],
      overview: 'Horses classically symbolize vitality, drive, and power — and your relationship to the horse mirrors your relationship to those energies.',
      psychology: 'Riding with ease suggests harnessed momentum; a runaway or unrideable horse, drives or projects beyond control; an exhausted horse, burnout.',
      symbolic: 'Jung connected horses to instinctive life-energy (libido in his broad sense) carrying the rider — the ego — forward.',
      reflect: 'Is your energy carrying you where you want to go, or running away with you?'
    },
    {
      id: 'wolf', name: 'Wolves', category: 'Animals',
      keywords: ['wolf', 'wolves', 'howling'],
      overview: 'Wolves split between menace (the predator at the edge of the village) and nobility (the loyal pack animal).',
      psychology: 'Threatening wolves frequently personify a danger circling your life or a person you distrust. Wolves at a distance can simply mark wildness — instinct kept outside the fence.',
      symbolic: 'Jungians read the wolf as untamed instinct or the shadow’s hunger; pack imagery raises questions of belonging and hierarchy.',
      cultural: 'From Romulus’ she-wolf to Norse Fenrir, wolf folklore spans protector and devourer — your dream wolf inherits whichever you carry.',
      reflect: 'What instinct have you been keeping outside the fence — and is it hungry?'
    },
    {
      id: 'bear', name: 'Bears', category: 'Animals',
      keywords: ['bear', 'bears', 'grizzly'],
      overview: 'A bear in a dream tends to feel overwhelming: enormous strength that may be protective or destructive.',
      psychology: 'Bear encounters often dramatize confrontation with anger — yours or someone else’s — or an issue you have been hoping will hibernate.',
      symbolic: 'Jungian readers link the bear to the protective-devouring mother archetype and to introspective retreat (hibernation) before renewal.',
      reflect: 'What large, slow-moving issue is finally waking up? Can you meet it before it stands?'
    },
    {
      id: 'lion', name: 'Lions & Big Cats', category: 'Animals',
      keywords: ['lion', 'lions', 'tiger', 'panther', 'leopard', 'jaguar'],
      overview: 'Big cats embody power, status, and predatory grace — dreams about them are usually dreams about authority and courage.',
      psychology: 'Being stalked by a big cat often parallels a powerful person or pressure in waking life; befriending one, growing confidence.',
      symbolic: 'The lion is a classic symbol of sovereignty and the ego in its nobility — or its pride. Jungians ask whether you are the lion or its prey in your own kingdom.',
      reflect: 'Where is courage being demanded of you right now? Who holds the power in that arena?'
    },
    {
      id: 'insects', name: 'Insects & Bugs', category: 'Animals',
      keywords: ['insect', 'insects', 'bugs', 'cockroach', 'ants', 'bees', 'wasps', 'flies', 'swarm', 'beetle'],
      overview: 'Swarming, crawling, and infestation dreams trade on disgust — small problems multiplying beyond control.',
      psychology: 'Bug dreams commonly accompany accumulating minor stressors (“a thousand little things”), guilt that keeps crawling back, or health anxieties. Bees can be the exception: industry and community.',
      symbolic: 'Something is “bugging” you — dream language is often this literal. Infestations suggest neglected corners of life where small issues have bred.',
      reflect: 'Which small, ignored irritations have been multiplying? Name three you could clear this week.'
    },
    {
      id: 'rats-mice', name: 'Rats & Mice', category: 'Animals',
      keywords: ['rat', 'rats', 'mouse', 'mice', 'rodent', 'rodents'],
      overview: 'Rodents in dreams gnaw — at stores, at wires, at the edges of things — and they tend to symbolize exactly that.',
      psychology: 'Common readings: a worry quietly gnawing at you, a betrayal (“a rat”), or scarcity anxiety. Mice often carry timidity — feeling small or overlooked.',
      symbolic: 'What lives in your walls? Rodent dreams point at problems you hear scratching but have not looked at directly.',
      reflect: 'What worry do you hear scratching at night? What would it take to open that wall?'
    },
    {
      id: 'shark', name: 'Sharks', category: 'Animals',
      keywords: ['shark', 'sharks'],
      overview: 'Sharks combine water’s emotional symbolism with a hidden, circling threat — danger felt but not yet seen.',
      psychology: 'Shark dreams often accompany situations where you sense bad intent or risk beneath a calm surface: a deal, a colleague, a relationship dynamic.',
      symbolic: 'In emotional waters, the shark is the fear that keeps you from swimming deeper — sometimes legitimate caution, sometimes inherited dread.',
      reflect: 'What feels dangerous just below the surface of an otherwise calm situation?'
    },
    {
      id: 'butterfly', name: 'Butterflies', category: 'Animals',
      keywords: ['butterfly', 'butterflies', 'caterpillar', 'cocoon', 'moth'],
      overview: 'The most direct transformation symbol in nature — caterpillar, cocoon, wings.',
      psychology: 'Butterfly dreams often arrive mid-metamorphosis: career changes, recoveries, identity shifts. Moths, drawn to flame, sometimes carry obsession or fragile attraction.',
      symbolic: 'Jungians read the butterfly as the psyche itself (the Greek “psyche” means both soul and butterfly) — delicate, emerging, brief.',
      cultural: 'Zhuangzi’s famous parable — a man dreaming he is a butterfly, unsure on waking which is which — has made the butterfly a symbol of dream and reality trading places.',
      reflect: 'What stage of the metamorphosis are you in: still consuming, wrapped in the cocoon, or drying new wings?'
    },
    {
      id: 'dragon', name: 'Dragons & Monsters', category: 'Animals',
      keywords: ['dragon', 'monster', 'monsters', 'demon', 'creature', 'beast', 'zombie', 'zombies', 'vampire', 'ghost', 'ghosts'],
      overview: 'Mythic creatures let the dreaming mind give fear a body — and the body it chooses says something.',
      psychology: 'Monster dreams are common in children and resurge in adults under stress. The monster usually personifies a problem that feels larger than life: a diagnosis, a debt, a conflict, a memory.',
      symbolic: 'Jung saw the dragon-fight as the hero’s confrontation with the devouring unconscious — and the treasure it guards as what you gain by facing it. Ghosts often carry unfinished business; zombies, things that should be over but keep walking.',
      cultural: 'Western dragons hoard and must be slain; East Asian dragons bring rain, luck, and imperial power. Your dragon depends on your mythology.',
      reflect: 'If the monster guarded a treasure, what would the treasure be?'
    },

    /* ---------- Nature & elements ---------- */
    {
      id: 'water', name: 'Water & Oceans', category: 'Nature & Elements',
      keywords: ['water', 'ocean', 'sea', 'lake', 'river', 'waves', 'swimming', 'pool', 'underwater'],
      overview: 'Across Freudian, Jungian, and popular frameworks, water is the most agreed-upon symbol: emotion and the unconscious.',
      psychology: 'Calm water suggests equanimity; turbulent seas suggest being emotionally overwhelmed — a reading consistent with the continuity hypothesis, since stress reliably surfaces in dream affect.',
      symbolic: 'Depth matters: shallow water keeps feelings manageable, deep water means contents of the unconscious are near. Being underwater and breathing fine is a common image of surprising emotional capacity.',
      cultural: 'Many spiritual traditions add purification and renewal — baptism, ritual bathing, monsoon blessings.',
      reflect: 'What is the emotional weather in your life right now — and are you floating, swimming, or treading?'
    },
    {
      id: 'flood', name: 'Floods & Tsunamis', category: 'Nature & Elements',
      keywords: ['flood', 'flooding', 'tsunami', 'tidal wave', 'rising water', 'drowning'],
      overview: 'Floods are water’s symbolism at emergency scale: accumulated, unprocessed feeling breaking through.',
      psychology: 'Tsunami and flood dreams spike during grief, burnout, and overwhelm. Drowning dreams specifically tend to accompany feeling unable to keep up — emotionally or literally (and can co-occur with breathing issues during sleep; persistent gasping is worth mentioning to a doctor).',
      symbolic: 'The question a flood asks is structural: what containers (routines, supports, boundaries) failed, and what needs rebuilding on higher ground?',
      cultural: 'Flood myths worldwide pair destruction with a fresh start — the water recedes and the world is remade.',
      reflect: 'What feeling have you been holding back? Where could you let some of it out at low tide?'
    },
    {
      id: 'fire', name: 'Fire', category: 'Nature & Elements',
      keywords: ['fire', 'flames', 'burning', 'burned', 'burnt', 'wildfire', 'house on fire'],
      overview: 'Fire is the great double symbol: destruction and renewal, passion and consumption.',
      psychology: 'Modern interpretations split by context: controlled fire as drive, creativity, or anger finding expression; a house on fire as crisis, burnout, or consuming emotion.',
      symbolic: 'Jung treated fire as the transformer — destruction that enables renewal, tied to the “burning” work of becoming yourself. Freudian readings emphasized passion and libido.',
      cultural: 'Many religious traditions add purification (and in some, divine warning) meanings — the burning bush, ritual fire, phoenix rebirth.',
      reflect: 'What is burning in your life: fuel for something, or the thing itself? What would you save from the fire?'
    },
    {
      id: 'storm', name: 'Storms & Rain', category: 'Nature & Elements',
      keywords: ['storm', 'rain', 'raining', 'thunder', 'lightning', 'hurricane', 'tornado', 'wind'],
      overview: 'Weather is the dream’s mood lighting — storms externalize inner turbulence.',
      psychology: 'Approaching storms often mirror anticipated conflict or dread; tornadoes, chaos that feels targeted and capricious. Gentle rain reads as release — and many dreamers wake from rain dreams feeling cleansed.',
      symbolic: 'Watching a storm from shelter is a different dream than being caught in one: the first is awareness of trouble, the second immersion in it.',
      reflect: 'What storm do you see coming — and are you sheltered, or pretending the sky is clear?'
    },
    {
      id: 'snow', name: 'Snow & Ice', category: 'Nature & Elements',
      keywords: ['snow', 'ice', 'frozen', 'freezing', 'blizzard', 'winter', 'cold'],
      overview: 'Snow quiets a dream landscape; ice stops it. Both tend to be read as emotion suspended.',
      psychology: 'Frozen scenes often parallel numbness, emotional withdrawal, or a relationship in cold storage. Pristine snow can carry stillness and a clean slate; thin ice, a situation that will not bear your weight.',
      symbolic: 'What is frozen is preserved — Jungians note ice dreams may guard feelings until you are ready to thaw them.',
      reflect: 'What have you put on ice? Was that protection, avoidance, or both?'
    },
    {
      id: 'sun-moon-stars', name: 'Sun, Moon & Stars', category: 'Nature & Elements',
      keywords: ['sun', 'sunrise', 'sunset', 'moon', 'moonlight', 'stars', 'eclipse', 'night sky', 'comet'],
      overview: 'Celestial imagery tends to mark orientation: what you steer by, what illuminates, what cycles.',
      psychology: 'Sunrise dreams accompany hope and beginnings; eclipses, a feeling that something bright has been temporarily blocked. Star dreams often carry aspiration — or navigation, finding your way at night.',
      symbolic: 'Jung paired the sun with consciousness and the moon with the unconscious and the feminine principle; the moon’s phases made it a near-universal symbol of cycles and change.',
      cultural: 'Lunar omens and star-signs appear in nearly every tradition; dream books from Egypt to China read celestial dreams as messages about fortune and timing.',
      reflect: 'What are you steering by these days — and is it still giving light?'
    },
    {
      id: 'earthquake', name: 'Earthquakes & Disasters', category: 'Nature & Elements',
      keywords: ['earthquake', 'disaster', 'apocalypse', 'end of the world', 'volcano', 'explosion', 'collapse', 'building collapsed'],
      overview: 'When the ground itself fails, the dream is usually about foundations.',
      psychology: 'Earthquake and apocalypse dreams cluster around foundational shocks: job loss, diagnosis, divorce, world events. Pandemic-era research documented exactly this — collective stress flowing into disaster dreams.',
      symbolic: 'What you rebuild after the dream-quake matters: these dreams often end before the rebuilding, leaving that part to you.',
      reflect: 'Which foundation of your life has been shaken? What would rebuilding on bedrock look like?'
    },
    {
      id: 'forest', name: 'Forests & Trees', category: 'Nature & Elements',
      keywords: ['forest', 'woods', 'tree', 'trees', 'jungle', 'roots', 'branches'],
      overview: 'The forest is the classic threshold of the unknown — where the path disappears and stories begin.',
      psychology: 'Being lost in woods mirrors uncertainty about direction; clearings, moments of clarity. Single trees often carry personal growth symbolism — roots, seasons, fruit, deadwood.',
      symbolic: 'Jung read the forest as the unconscious itself: dark, alive, and full of things that find you. Fairy tales agree.',
      reflect: 'Are you on a path, off it, or discovering the path was someone else’s? What grows in your clearing?'
    },
    {
      id: 'mountain', name: 'Mountains & Cliffs', category: 'Nature & Elements',
      keywords: ['mountain', 'mountains', 'climbing', 'summit', 'peak', 'cliff edge', 'hill'],
      overview: 'Mountains stage effort and perspective: the climb, the summit, the view, the fall.',
      psychology: 'Climbing dreams track long-term goals — your position on the mountain often matches your felt progress. Cliff edges concentrate risk decisions: one more step or not.',
      symbolic: 'Summits offer the view but not a place to live; some Jungian readings caution that peak-fixation can be flight from the valley where life happens.',
      reflect: 'What are you climbing, and is the summit yours or assigned? What can you see from where you already are?'
    },

    /* ---------- Places & buildings ---------- */
    {
      id: 'house', name: 'Houses', category: 'Places & Buildings',
      keywords: ['house', 'home', 'mansion', 'apartment', 'childhood home', 'cottage'],
      overview: 'Since Jung’s famous multi-storey house dream — which he read as a map of the psyche, from conscious upper floors down to a prehistoric cellar — houses have conventionally symbolized the self.',
      psychology: 'The house’s condition is read as a self-state report: renovation during personal change, disrepair during depletion, intruders during boundary violations. Childhood homes pull in family history and who you were there.',
      symbolic: 'Floors as layers of mind, the basement as the unconscious, the attic as memory and ideals — symbolic tradition, not tested science, but the dominant framework.',
      reflect: 'Which room of your “house” needs attention? Who have you been letting in the front door?'
    },
    {
      id: 'unknown-rooms', name: 'Unknown Rooms', category: 'Places & Buildings',
      keywords: ['hidden room', 'secret room', 'new room', 'rooms i had never seen', 'extra room', 'door i had never noticed', 'hidden door'],
      overview: 'Discovering rooms you never knew existed — in a house you thought you knew — is one of the most beloved dream experiences.',
      psychology: 'Widely interpreted as encountering unexplored potential: capacities, ambitions, or sides of yourself with floor space you have not used.',
      symbolic: 'Jungians treat the unknown room as the unconscious offering you square footage — what the room contains (light, dust, treasure, dread) hints at how the discovery feels.',
      reflect: 'What ability or interest have you left furnished but unvisited? What would it take to move in?'
    },
    {
      id: 'school', name: 'School & Classrooms', category: 'Places & Buildings',
      keywords: ['school', 'classroom', 'high school', 'college', 'university', 'teacher', 'homework', 'locker'],
      overview: 'School settings persist in dreams decades after graduation — one of the most stable typical-dream environments across cultures.',
      psychology: 'School is where most of us first experienced evaluation, hierarchy, and belonging, so dreams reuse it whenever those themes recur at work or in life. Forgotten-locker-combination and lost-classroom dreams are performance anxiety in period costume.',
      symbolic: 'Ask what lesson is being repeated. Recurring school dreams sometimes ease when the waking-life “course” is finally passed.',
      reflect: 'What is life trying to teach you for the second (or tenth) time?'
    },
    {
      id: 'workplace', name: 'Work & the Office', category: 'Places & Buildings',
      keywords: ['at work', 'my work', 'office', 'boss', 'coworker', 'colleague', 'meeting', 'fired', 'my job', 'workplace'],
      overview: 'Work dreams are continuity-hypothesis exhibit A: the more your job occupies waking thought, the more it colonizes your dreams.',
      psychology: 'Common variants — being fired, missing meetings, impossible tasks — track job insecurity and overload. Dreaming of work constantly can be a sign the day never actually ends; wind-down routines help.',
      symbolic: 'Sometimes the office is a stage for older themes: the boss as parent-figure, the review as exam, the layoff as abandonment.',
      reflect: 'Is the dream about the job — or about what the job has come to mean (worth, safety, identity)?'
    },
    {
      id: 'hospital', name: 'Hospitals & Doctors', category: 'Places & Buildings',
      keywords: ['hospital', 'doctor', 'nurse', 'surgery', 'ambulance', 'sick', 'illness', 'diagnosis'],
      overview: 'Hospitals stage healing, dependency, and fear of bad news — sometimes all at once.',
      psychology: 'Health-anxiety dreams are common and usually track worry rather than illness. They also accompany caretaking seasons — when someone you love is the patient.',
      symbolic: 'Symbolically, something may be asking to be diagnosed and treated: a habit, a relationship, an old wound. Surgery dreams often parallel deliberate, painful change.',
      cultural: 'Dream-temple incubation in ancient Greece — sleeping in sanctuaries of Asclepius to receive healing dreams — made the hospital-dream connection literal two millennia ago.',
      reflect: 'What part of your life needs treatment you have been postponing? Who do you trust to help?'
    },
    {
      id: 'church-temple', name: 'Churches & Sacred Places', category: 'Places & Buildings',
      keywords: ['church', 'temple', 'mosque', 'cathedral', 'altar', 'praying', 'prayer', 'sacred'],
      overview: 'Sacred architecture in dreams marks contact with meaning — or unfinished business with it.',
      psychology: 'These dreams are frequent during moral dilemmas, grief, and questions of belonging to (or leaving) a tradition. The state of the building often mirrors the state of the relationship.',
      symbolic: 'Jung took sacred imagery seriously as the psyche’s language for wholeness — the temple as the Self’s architecture.',
      reflect: 'What do you currently hold sacred — and when did you last visit it?'
    },
    {
      id: 'elevator-stairs', name: 'Elevators & Stairs', category: 'Places & Buildings',
      keywords: ['elevator', 'lift', 'stairs', 'staircase', 'escalator', 'climbing stairs', 'falling down stairs'],
      overview: 'Vertical movement in dreams maps neatly onto rising and falling fortunes, moods, and ambitions.',
      psychology: 'Stuck or plummeting elevators concentrate career and status anxiety — ascent you cannot control. Endless staircases accompany efforts that never seem to arrive.',
      symbolic: 'Stairs you climb yourself differ from elevators that carry you: effort versus circumstance. Descending is not always bad — Jungians read going down as approaching the unconscious.',
      reflect: 'Which direction is your life moving — and whose hand is on the buttons?'
    },
    {
      id: 'bridge', name: 'Bridges', category: 'Places & Buildings',
      keywords: ['bridge', 'crossing', 'crossed over'],
      overview: 'Bridges are transition made visible: between places, phases, decisions, lives.',
      psychology: 'Bridge dreams cluster around decisions and life changes. The bridge’s condition — sturdy, swaying, broken mid-span — usually mirrors confidence in the transition.',
      symbolic: 'What lies on each bank matters as much as the bridge: what are you leaving, and what (if anything) can you see on the far side?',
      reflect: 'What crossing are you midway through? What would help you trust the next plank?'
    },
    {
      id: 'maze', name: 'Mazes & Being Lost', category: 'Places & Buildings',
      keywords: ['maze', 'labyrinth', 'lost', 'couldn’t find my way', 'could not find', 'wrong turn', 'endless corridors', 'hallways'],
      overview: 'Feeling lost featured in over half of surveyed nightmares — and the maze is its purest architecture.',
      psychology: 'Being lost in mazes, strange cities, or endless corridors maps onto uncertainty about direction in life. These dreams cluster around decision points and role changes.',
      symbolic: 'A labyrinth differs from a maze: it has one path and a center. Some dreams are mazes (find the exit); others are labyrinths (the wandering is the point).',
      reflect: 'Are you actually lost — or on a winding path that simply isn’t straight? What is at your center?'
    },

    /* ---------- Travel & movement ---------- */
    {
      id: 'car', name: 'Cars & Driving', category: 'Travel & Movement',
      keywords: ['car', 'driving', 'drove', 'vehicle', 'crash', 'accident', 'brakes', 'steering', 'passenger', 'truck'],
      overview: 'A car you are driving is conventionally read as your agency over life’s direction — and the dream takes that metaphor remarkably literally.',
      psychology: 'Failed brakes, runaway vehicles, or being a helpless passenger map onto feeling that events are steering you. A textbook continuity-hypothesis theme, common when work, health, or relationships feel unmanageable.',
      symbolic: 'Who is in the car matters: backseat drivers, absent drivers, and unknown passengers all assign roles in the question “who is steering my life?”',
      reflect: 'Where in your life are you the passenger when you want to drive — or driving something with no brakes?'
    },
    {
      id: 'airplane', name: 'Airplanes & Flights', category: 'Travel & Movement',
      keywords: ['airplane', 'plane', 'flight', 'airport', 'takeoff', 'landing', 'plane crash', 'boarding'],
      overview: 'Air travel dreams combine ambition (takeoff), trust (someone else is flying), and logistics anxiety (the airport).',
      psychology: 'Missed flights and endless airports track time pressure and fear of missing opportunities. Crash dreams typically spike with high-stakes ventures — projects you have boarded but do not control.',
      symbolic: 'A plane is collective: you travel with strangers toward a shared destination. Dreams may be asking whose itinerary you are on.',
      reflect: 'What venture have you boarded? Do you trust the pilot — and is the destination still yours?'
    },
    {
      id: 'train', name: 'Trains', category: 'Travel & Movement',
      keywords: ['train', 'railway', 'railroad', 'station', 'platform', 'subway', 'metro'],
      overview: 'Trains run on rails: direction is fixed, timing matters, and the chief anxieties are missing them or being on the wrong one.',
      psychology: 'Train dreams often accompany career tracks and life timetables — the feeling that paths are scheduled and departures final. (See also: Being Late.)',
      symbolic: 'The wrong train discovered mid-journey is one of the dream’s sharper questions: comfortable seat, wrong direction.',
      reflect: 'Are you on a track you chose? If you could change at the next station, would you?'
    },
    {
      id: 'boat', name: 'Boats & Ships', category: 'Travel & Movement',
      keywords: ['boat', 'ship', 'sailing', 'ferry', 'canoe', 'sinking', 'shipwreck', 'raft'],
      overview: 'A vessel on water is the self navigating emotion — the boat’s seaworthiness usually mirrors your coping.',
      psychology: 'Sinking ships accompany overwhelm and failing ventures; small rafts on big seas, vulnerability; steady sailing, hard-won equilibrium.',
      symbolic: 'Mythologies fill boats with meaning — the ferry between worlds, the ark that preserves through catastrophe. What your boat carries is worth noting.',
      reflect: 'How seaworthy do you feel? What cargo would you throw overboard to stay afloat?'
    },
    {
      id: 'road', name: 'Roads & Paths', category: 'Travel & Movement',
      keywords: ['road', 'path', 'highway', 'journey', 'walking', 'crossroads', 'fork in the road', 'trail'],
      overview: 'The road is the life-course metaphor the dreaming mind reaches for most readily.',
      psychology: 'Forks dramatize decisions; blocked roads, obstacles; endless highways, monotony or persistence. Walking versus driving changes the tempo of the question.',
      symbolic: 'Crossroads have ancient ritual weight — places of choice, meeting, and offerings. The dream may be marking a genuine decision point.',
      reflect: 'What fork are you standing at? What would you need to know to choose?'
    },

    /* ---------- Actions & events ---------- */
    {
      id: 'losing-something', name: 'Losing Something Valuable', category: 'Actions & Events',
      keywords: ['lost my wallet', 'lost my phone', 'lost my purse', 'lost my keys', 'losing', 'misplaced', 'lost something', 'can’t find'],
      overview: 'Losing valuables — wallet, phone, jewelry — is commonly read as anxiety about losing what the object represents: identity, connection, security, access.',
      psychology: 'These dreams cluster around insecurity and role changes. The frantic searching usually matters more than the object: it rehearses the feeling of being unprepared or incomplete.',
      symbolic: 'Ask what the lost item does for you in waking life — the dream is usually about that function, not the thing.',
      reflect: 'What do you fear losing right now — and how much of it is actually yours to lose?'
    },
    {
      id: 'being-attacked', name: 'Being Attacked', category: 'Actions & Events',
      keywords: ['attacked', 'attack', 'stabbed', 'shot', 'fight', 'fighting', 'violence', 'punched', 'assaulted', 'intruder', 'break in', 'robbed', 'robbery', 'burglar'],
      overview: 'Attack and intruder dreams featured in roughly half of surveyed nightmares — the threat-simulation theme at its most direct.',
      psychology: 'They commonly accompany feeling threatened in waking life: criticism, conflict, boundary violations, or genuine danger. Intruder dreams specifically track privacy and boundary stress. Frequent violent nightmares after trauma deserve professional support — effective treatments exist.',
      symbolic: 'Jungians sometimes read the attacker as a rejected part of the self forcing a meeting; the weapon and setting refine the question.',
      reflect: 'Who or what has breached your boundaries lately? What would defending yourself look like awake?'
    },
    {
      id: 'hiding', name: 'Hiding', category: 'Actions & Events',
      keywords: ['hiding', 'hid', 'hide', 'hiding from someone'],
      overview: 'The quieter sibling of the chase dream: instead of running, you hold your breath behind the door.',
      psychology: 'Hiding dreams parallel avoidance with a watchful edge — secrets kept, feelings unshared, conflicts dodged. They are also common in children and in adults revisiting childhood power dynamics.',
      symbolic: 'Note what you are hiding from and what shelter you chose; both tend to map onto waking strategies.',
      reflect: 'What are you keeping out of sight — and what is it costing to stay hidden?'
    },
    {
      id: 'cant-scream', name: 'Unable to Scream or Run', category: 'Actions & Events',
      keywords: ['couldn’t scream', 'could not scream', 'no voice', 'voiceless', 'couldn’t run', 'could not run', 'legs wouldn’t move', 'slow motion', 'running in place'],
      overview: 'Trying to scream with no sound, or run through air like syrup — among the most frustrating universal dream experiences.',
      psychology: 'Partly physiological: REM sleep paralyzes the body, and the dream incorporates the immobility. Symbolically, these dreams track feeling unheard or unable to act — voicelessness made literal.',
      symbolic: 'The question is usually about agency: where in waking life do you shout and nothing changes?',
      reflect: 'Who is not hearing you right now? Is there another channel your voice could take?'
    },
    {
      id: 'searching', name: 'Searching for Someone', category: 'Actions & Events',
      keywords: ['searching', 'looking for', 'couldn’t find her', 'couldn’t find him', 'find my way home', 'searching for'],
      overview: 'Endless searching — for a person, a room, a way home — is a staple of anxious dreaming.',
      psychology: 'Often mirrors longing or unfinished connection: someone you miss, an apology unmade, a version of home that no longer exists. Searching for a child commonly tracks caretaking worry.',
      symbolic: 'Sometimes the lost person is a part of you — the dream uses a face for a quality you have misplaced.',
      reflect: 'Who or what are you really looking for — and where did you last have it?'
    },
    {
      id: 'falling-behind', name: 'Forgetting Something Important', category: 'Actions & Events',
      keywords: ['forgot', 'forgotten', 'forgot the baby', 'forgot my lines', 'unprepared for', 'left behind', 'forgot to feed'],
      overview: 'Forgetting the baby, the lines, the assignment, the pet you apparently owned for years — guilt-flavored anxiety dreams with remarkable staying power.',
      psychology: 'These dreams track responsibility load. The forgotten thing is usually a stand-in for a commitment (or part of yourself) you fear neglecting.',
      symbolic: 'The neglected pet or plant discovered alive is a hopeful variant: what you abandoned survived, and can still be tended.',
      reflect: 'What commitment is quietly starving? What ten-minute act of tending could you do today?'
    },

    /* ---------- Objects ---------- */
    {
      id: 'money', name: 'Money & Treasure', category: 'Objects',
      keywords: ['money', 'cash', 'coins', 'gold', 'treasure', 'rich', 'wealth', 'winning the lottery', 'poor', 'broke'],
      overview: 'Finding money is popularly read as discovering self-worth, opportunity, or untapped resources; losing it as fear of insecurity or depleted energy.',
      psychology: 'Money dreams reliably track financial stress — continuity at its plainest — but also non-financial economies: time, energy, love given and owed.',
      symbolic: 'Jungian writers gloss money as psychic energy flowing toward or away from you. What you do with dream-money (hoard, spend, give, hide) sketches your relationship with your own resources.',
      cultural: 'Chinese tradition tends to read money dreams as luck and prosperity; some folk traditions use reversal-logic and call them omens of loss. No predictive reading has empirical support.',
      reflect: 'What resource feels scarce right now — and is it actually money?'
    },
    {
      id: 'phone', name: 'Phones & Failed Calls', category: 'Objects',
      keywords: ['phone', 'call', 'calling', 'couldn’t dial', 'phone broke', 'broken phone', 'no signal', 'texting', 'wouldn’t work'],
      overview: 'The phone that will not dial — wrong numbers, dead batteries, frozen screens at the critical moment — is the modern era’s signature anxiety dream.',
      psychology: 'Failed-call dreams track communication breakdown: someone you cannot reach, words you cannot get said, help that feels unreachable in a crisis.',
      symbolic: 'The device is connection itself; its failure asks where your lifelines actually stand.',
      reflect: 'Who have you been unable to truly reach — and have you tried a channel other than the usual one?'
    },
    {
      id: 'keys', name: 'Keys & Locks', category: 'Objects',
      keywords: ['key', 'keys', 'lock', 'locked', 'locked out', 'unlock', 'door wouldn’t open'],
      overview: 'Keys are access made portable: to homes, secrets, solutions, people.',
      psychology: 'Lost keys and locked doors track exclusion and blocked goals; finding a key, the click of a solution arriving. Being locked out of your own home is a particularly pointed image of self-alienation.',
      symbolic: 'Symbolic tradition makes the key knowledge — the answer that fits one specific lock. What the lock guards is the dream’s real subject.',
      reflect: 'What feels locked right now — and is it possible you are holding the key already?'
    },
    {
      id: 'mirror', name: 'Mirrors', category: 'Objects',
      keywords: ['mirror', 'reflection', 'looking at myself', 'didn’t recognize myself'],
      overview: 'Mirror dreams are identity dreams — and the reflection rarely behaves.',
      psychology: 'Distorted, absent, or unrecognizable reflections accompany identity shifts, self-image struggles, and dissociative stress. Recognizing yourself with surprise can mark genuine change.',
      symbolic: 'Jungians treat the mirror as confrontation with the self, shadow included. Folklore’s wariness of mirrors (veiling them in mourning, avoiding them at night) carries the same charge.',
      reflect: 'When you picture yourself lately, does the image match who you are becoming?'
    },
    {
      id: 'clothes', name: 'Clothes & Shoes', category: 'Objects',
      keywords: ['clothes', 'clothing', 'dress', 'suit', 'shoes', 'barefoot', 'wrong outfit', 'costume', 'uniform'],
      overview: 'Clothing is the persona — the self we dress for the world — so wardrobe malfunctions are identity events.',
      psychology: 'Wearing the wrong outfit tracks not-fitting-in anxiety; costumes and uniforms, roles assumed or imposed. Being barefoot splits between vulnerability and groundedness, depending on how it feels.',
      symbolic: 'New clothes often accompany new roles; old or borrowed clothes, identities outgrown or never yours.',
      reflect: 'What role have you been dressing for? Does it still fit?'
    },
    {
      id: 'food', name: 'Food & Eating', category: 'Objects',
      keywords: ['food', 'eating', 'feast', 'hungry', 'starving', 'meal', 'cooking', 'bread', 'fruit', 'cake'],
      overview: 'Food in dreams is nourishment in every register: physical, emotional, intellectual, relational.',
      psychology: 'Hunger dreams can be literal (late diets, fasting) but often track unmet needs — for affection, recognition, rest. Feasts mirror abundance or its longing; spoiled food, something nourishing gone wrong.',
      symbolic: 'Who you eat with matters: shared meals are communion, eating alone in company is its failure.',
      cultural: 'Despite folklore, controlled research found no evidence that cheese causes nightmares — though heavy late meals can fragment sleep and make dreams more memorable.',
      reflect: 'What appetite — for rest, connection, meaning — has been going unfed?'
    },
    {
      id: 'clock', name: 'Clocks & Time', category: 'Objects',
      keywords: ['clock', 'watch', 'time running out', 'countdown', 'deadline', 'hourglass'],
      overview: 'Clocks concentrate the pressure of finitude: deadlines, biological clocks, mortality at its most domesticated.',
      psychology: 'Time-pressure dreams accompany overload and big birthdays alike. Stopped clocks can read as suspension — grief, limbo, waiting rooms of life.',
      symbolic: 'The dream rarely shows the time accurately; it shows your relationship to time — racing it, losing it, watching it.',
      reflect: 'What deadline — real or imagined — is ticking loudest? Who set it?'
    },
    {
      id: 'door', name: 'Doors & Gates', category: 'Objects',
      keywords: ['door', 'doors', 'gate', 'doorway', 'threshold', 'entrance', 'exit'],
      overview: 'Doors are pure threshold: every one is a decision wearing hinges.',
      psychology: 'Rows of doors stage choice overload; the door you dare not open, an avoided truth; doors that appear where none existed, options arriving.',
      symbolic: 'Across ritual traditions, thresholds mark transformation — you exit a door as someone slightly different than entered. Jungians read the closed door as the not-yet-conscious.',
      reflect: 'Which door have you been standing in front of? What do you imagine is behind it — and how old is that fear?'
    },
    {
      id: 'book', name: 'Books & Writing', category: 'Objects',
      keywords: ['book', 'books', 'library', 'reading', 'writing', 'letter', 'unreadable', 'words kept changing'],
      overview: 'Text in dreams is famously unstable — words swim and change on re-reading (a fact lucid dreamers use as a reality check).',
      psychology: 'Books carry knowledge, stories, and records: searching a library mirrors searching for answers; an unreadable book, an answer not yet available to you. Writing dreams track the need to say or record something.',
      symbolic: 'The book of your life is a deep-running motif — finding your name in one is the dream asking how the story is going.',
      reflect: 'What are you trying to figure out right now — and have you consulted the people (or pages) that actually know?'
    },
    {
      id: 'ring', name: 'Rings & Jewelry', category: 'Objects',
      keywords: ['ring', 'jewelry', 'necklace', 'diamond', 'bracelet', 'lost my ring'],
      overview: 'Jewelry condenses value, bond, and identity into objects small enough to lose — which is exactly how dreams use them.',
      psychology: 'Lost rings track relationship and commitment anxiety with uncomfortable precision; found jewelry, discovered worth. Heirlooms carry family inheritance in both senses.',
      symbolic: 'The circle of a ring is an old symbol of wholeness and unbroken commitment; cracked or ill-fitting rings ask their own questions.',
      reflect: 'Which bond or promise has your attention? Does it still fit the finger it is on?'
    },

    /* ---------- States & experiences ---------- */
    {
      id: 'lucid', name: 'Lucid Dreams', category: 'States & Experiences',
      keywords: ['lucid', 'knew i was dreaming', 'realized i was dreaming', 'aware i was dreaming', 'controlled the dream'],
      overview: 'Knowing you are dreaming while dreaming. A 2016 meta-analysis estimates 55% of people experience it at least once, and about 23% monthly.',
      psychology: 'Lucidity is a trainable skill: the best-evidenced techniques are MILD (rehearsing the intention to notice you are dreaming) combined with briefly waking before dawn (WBTB). Strong dream recall is the foundation.',
      symbolic: 'Beyond recreation, lucid dreaming is used to confront recurring nightmares — turning toward the pursuer on home turf.',
      reflect: 'If you became lucid tonight, what would you do first? (See our lucid dreaming guide for training steps.)'
    },
    {
      id: 'recurring', name: 'Recurring Dreams', category: 'States & Experiences',
      keywords: ['recurring', 'again and again', 'same dream', 'keep having', 'every night', 'repeatedly'],
      overview: 'Up to 60–75% of adults experience at least one recurring dream in their lifetime — and they are disproportionately negative.',
      psychology: 'Researchers read recurrence as an unresolved theme knocking: the dream repeats because the underlying concern does. Recurring dreams often fade when the waking issue resolves or is finally addressed.',
      symbolic: 'Track the variations: what changes between repetitions is often the progress report.',
      reflect: 'What does the dream want handled? What has changed in it lately — if anything?'
    },
    {
      id: 'nightmare', name: 'Nightmares', category: 'States & Experiences',
      keywords: ['nightmare', 'nightmares', 'terrifying', 'horror', 'woke up screaming', 'night terror'],
      overview: 'About 85% of adults report at least one nightmare per year; 2–6% have them weekly. Occasional nightmares are completely normal.',
      psychology: 'Nightmares occur in REM sleep, mostly in the second half of the night. Frequent nightmares causing distress or daytime impairment may be nightmare disorder — and Imagery Rehearsal Therapy (rescripting the nightmare while awake) is an effective, recommended treatment.',
      symbolic: 'Threat simulation theory suggests nightmares are over-rehearsals of danger — useful in ancestral doses, miserable in chronic ones.',
      cultural: 'Note: night terrors are different — they arise from deep non-REM sleep, usually in children, with no remembered dream.',
      reflect: 'If nightmares are frequent and affecting your days, that is a solvable problem — see our nightmares guide, and consider talking to a professional.'
    },
    {
      id: 'sleep-paralysis', name: 'Sleep Paralysis', category: 'States & Experiences',
      keywords: ['sleep paralysis', 'couldn’t wake up', 'pressure on my chest', 'presence in the room', 'shadow figure', 'old hag'],
      overview: 'Waking unable to move or speak, often with chest pressure and a sensed presence. Around 8% of people experience it at least once; rates are higher in students and shift workers.',
      psychology: 'It is REM muscle paralysis persisting a few moments into wakefulness — harmless, though deeply unsettling. Irregular sleep, stress, and sleeping on your back increase the odds; regular sleep schedules reduce them.',
      symbolic: 'The hallucinated intruder is the brain’s threat system misfiring in the dark — which is why cultures worldwide built demons around it.',
      cultural: 'The “old hag” of Newfoundland, the Japanese kanashibari, the Brazilian pisadeira — sleep paralysis wears local folklore everywhere.',
      reflect: 'Frequent episodes plus daytime sleepiness are worth mentioning to a doctor (they can accompany narcolepsy or disrupted sleep).'
    },
    {
      id: 'deja-vu', name: 'Déjà Vu & Precognition', category: 'States & Experiences',
      keywords: ['deja vu', 'déjà vu', 'predicted', 'came true', 'prophetic', 'premonition', 'i dreamed this before'],
      overview: 'Between 17% and 38% of people report at least one apparently precognitive dream — but no precognition evidence has survived rigorous scientific scrutiny.',
      psychology: 'The skeptical accounting is strong: we dream thousands of dreams (coincidence gets many chances), remember hits and forget misses, retrofit vague content to events, and unconsciously process real cues. Déjà vu itself is a memory-system glitch — though some episodes genuinely trace to forgotten dreams that loosely matched the present.',
      symbolic: 'A dream that “came true” usually means your sleeping mind extrapolated well from what you already knew — which is still worth listening to.',
      reflect: 'What did you already know, half-consciously, that the dream put into a scene?'
    }
  ]
};
