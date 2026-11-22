// The ten stress patterns. Internal keys follow the saboteurs Joe teaches,
// but the app only ever shows the plain-language description, never the name.

export type PatternKey =
  | 'critic'
  | 'avoider'
  | 'controller'
  | 'achiever'
  | 'rational'
  | 'vigilant'
  | 'pleaser'
  | 'restless'
  | 'stickler'
  | 'victim';

export type Pattern = {
  key: PatternKey;
  /** Finishes the sentence "When pressure rises, ..." */
  headline: string;
  /** Short label used in the bar chart */
  short: string;
  explanation: string;
  signs: string[];
  upside: string;
  cost: string;
  /** Joe's video for this pattern. Leave empty until it is recorded. */
  videoUrl: string;
};

export const INNER_CRITIC: Pattern = {
  key: 'critic',
  headline: 'you are hardest on yourself',
  short: 'The inner critic',
  explanation:
    'The inner critic is the voice that finds fault with you, with other people and with the situation. Everyone has one, and it tends to set off the other patterns.',
  signs: [
    'Going over what you did wrong long after it is done',
    'Noticing faults in others before their effort',
    'Finding the flaw in a win',
  ],
  upside: 'It wants you to do well.',
  cost: 'Constant pressure that never says well done.',
  videoUrl: '',
};

export const PATTERNS: Pattern[] = [
  {
    key: 'avoider',
    headline: 'you keep the peace and put off the hard thing',
    short: 'Keeps the peace',
    explanation:
      'Under stress you steer toward what feels pleasant and away from what feels hard. Conflict, difficult tasks and uncomfortable feelings get pushed down the road, in the hope they sort themselves out.',
    signs: [
      'Putting off conversations you know you need to have',
      'Filling the day with easier tasks first',
      'Saying everything is fine when it is not',
    ],
    upside: 'You bring calm and make people feel at ease.',
    cost: 'Problems grow while they wait, and people never get the real you.',
    videoUrl: '',
  },
  {
    key: 'controller',
    headline: 'you take charge to feel safe',
    short: 'Takes charge',
    explanation:
      'When things feel uncertain, you grab the wheel. Taking charge settles your nerves, but it can leave the people around you feeling pushed, unheard or not trusted.',
    signs: [
      'Struggling to let others do it their way',
      'Pushing harder when results slip',
      'Feeling anxious when a plan is out of your hands',
    ],
    upside: 'You make things happen and people know where they stand.',
    cost: 'People stop bringing ideas, and you end up carrying it all alone.',
    videoUrl: '',
  },
  {
    key: 'achiever',
    headline: 'your worth rides on the next win',
    short: 'Chases the win',
    explanation:
      'Your sense of worth is tied to how you perform. A win feels good for a moment, then the bar moves. Rest can feel like falling behind.',
    signs: [
      'Moving to the next goal without enjoying the last one',
      'Worrying about how your results look to others',
      'Struggling to switch off',
    ],
    upside: 'You are driven and you deliver.',
    cost: 'Burnout, and relationships that come second to the next target.',
    videoUrl: '',
  },
  {
    key: 'rational',
    headline: 'you think your way out of feeling',
    short: 'Thinks, not feels',
    explanation:
      'You handle pressure by thinking it through. Logic feels safe and feelings feel messy, so emotions, yours and other people’s, get set aside.',
    signs: [
      'Analysing when someone needs you to listen',
      'Getting impatient with decisions made on feeling',
      'Coming across as cool or distant in tense moments',
    ],
    upside: 'You stay clear headed when others panic.',
    cost: 'People can feel judged or unseen, and trust gets thinner.',
    videoUrl: '',
  },
  {
    key: 'vigilant',
    headline: 'you scan for everything that could go wrong',
    short: 'Scans for danger',
    explanation:
      'Your mind is always on watch. Under stress it runs through every risk and everything that might slip, which keeps you prepared but rarely at rest.',
    signs: [
      'Lying awake running through what could go wrong',
      'Double checking your work and other people’s',
      'Finding it hard to relax, even on a good day',
    ],
    upside: 'You spot risks other people miss.',
    cost: 'Constant tension that wears down you and the people around you.',
    videoUrl: '',
  },
  {
    key: 'pleaser',
    headline: 'you give to be liked',
    short: 'Gives to be liked',
    explanation:
      'You look after everyone else first. Helping feels good and keeps people close, but your own needs end up last and resentment builds quietly.',
    signs: [
      'Saying yes when you mean no',
      'Finding it hard to ask for help',
      'Feeling hurt when your effort goes unnoticed',
    ],
    upside: 'You are generous and people feel cared for.',
    cost: 'Exhaustion, and help that comes with strings you never say out loud.',
    videoUrl: '',
  },
  {
    key: 'restless',
    headline: 'you chase the next thing',
    short: 'Chases the next thing',
    explanation:
      'Under pressure you reach for something new. Staying busy keeps difficult feelings at arm’s length, but very little gets your full attention.',
    signs: [
      'Getting bored quickly',
      'Starting more than you finish',
      'Keeping busy so you do not have to sit with how you feel',
    ],
    upside: 'You bring energy and fresh ideas.',
    cost: 'Scattered focus, and missing what is right in front of you.',
    videoUrl: '',
  },
  {
    key: 'stickler',
    headline: 'it has to be just right',
    short: 'Has to be right',
    explanation:
      'You need things done properly. Order and detail feel like control, so mistakes, yours and other people’s, sting more than they should.',
    signs: [
      'Redoing work rather than letting it be good enough',
      'Small mistakes bothering you long after',
      'Frustration when others are late or messy',
    ],
    upside: 'Your standards are high and your work is reliable.',
    cost: 'Stress for you, and for the people who feel they can never get it right.',
    videoUrl: '',
  },
  {
    key: 'victim',
    headline: 'you feel it harder and longer',
    short: 'Feels it harder',
    explanation:
      'When things go wrong, the feeling hits hard and stays. It can seem like things always happen to you, and pulling back becomes a way of showing something is wrong.',
    signs: [
      'Replaying setbacks for a long time',
      'Feeling misunderstood',
      'Withdrawing so others will notice',
    ],
    upside: 'You feel deeply and understand pain in others.',
    cost: 'Energy goes into the hurt instead of what comes next.',
    videoUrl: '',
  },
];

export const ALL_PATTERNS: Pattern[] = [INNER_CRITIC, ...PATTERNS];
export const byKey = (k: PatternKey) => ALL_PATTERNS.find((p) => p.key === k)!;
