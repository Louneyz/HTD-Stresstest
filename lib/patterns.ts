// The ten stress patterns. Internal keys follow the saboteurs Joe teaches,
// but the app only ever describes them, it never shows the names.
// All copy is written in Joe's voice, talking straight to the reader.

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
  /** Finishes "When the pressure's on, ..." */
  headline: string;
  /** Short label for the bar chart */
  short: string;
  /** One plain line under the label, so the bar makes sense at a glance */
  line: string;
  body: string;
  signs: string[];
  upside: string;
  cost: string;
  /** Joe's video for this pattern. Leave empty until it is recorded. */
  videoUrl: string;
};

export const INNER_CRITIC: Pattern = {
  key: 'critic',
  headline: 'you’re hardest on yourself',
  short: 'Your inner critic',
  line: 'The voice that finds fault with you and everyone else.',
  body:
    'There’s a voice that finds fault. With you, with the people around you, with how things went. Everyone has one. It’s usually the one that sets off everything else, and turning its volume down is where most of the work starts.',
  signs: [],
  upside: '',
  cost: '',
  videoUrl: '',
};

export const PATTERNS: Pattern[] = [
  {
    key: 'controller',
    headline: 'you take over',
    short: 'Takes over',
    line: 'You grab control when things feel uncertain.',
    body:
      'When things feel uncertain, you grab the wheel. It works, mostly. Things get done. But the people around you stop stepping up, because you always step in first. From the inside it feels like leadership. From the outside it can feel like you don’t trust them.',
    signs: ['Everything still runs through you', 'You redo work instead of handing it back', 'Your shoulders don’t drop until you’re in charge'],
    upside: 'You make things happen, and people know where they stand.',
    cost: 'Your team stops growing, and you end up carrying all of it.',
    videoUrl: '',
  },
  {
    key: 'achiever',
    headline: 'you prove yourself with the next win',
    short: 'Chases the win',
    line: 'Your worth rides on your results.',
    body:
      'Your worth rides on your results. A win feels great for about a day, then the bar moves. Rest feels like falling behind. You’ve built a lot this way. The problem is it never feels like enough.',
    signs: ['You’re onto the next goal before you’ve enjoyed the last one', 'How your results look matters a lot to you', 'Switching off is harder than working'],
    upside: 'You’re driven, and you deliver.',
    cost: 'Burnout, and the people at home getting what’s left.',
    videoUrl: '',
  },
  {
    key: 'rational',
    headline: 'you think instead of feel',
    short: 'Thinks, not feels',
    line: 'You go to logic and set feelings aside.',
    body:
      'Under pressure you go to logic. Feelings feel messy, so you set them aside. Yours and everybody else’s. You’re the calm one in the room. But calm can read as cold, and people stop telling you what’s really going on.',
    signs: ['You start solving when someone needs you to listen', 'Decisions made on feelings frustrate you', 'People have called you distant when things get tense'],
    upside: 'You keep a clear head when others panic.',
    cost: 'People feel judged or unseen, and trust gets thin.',
    videoUrl: '',
  },
  {
    key: 'vigilant',
    headline: 'you brace for what could go wrong',
    short: 'Braced for trouble',
    line: 'Your mind keeps scanning for what could go wrong.',
    body:
      'Your mind is always on watch. It runs every risk, every what if, everything that might slip. It keeps you prepared. It also keeps you tired, because the watch never really ends.',
    signs: ['Lying awake running through what could go wrong', 'Checking things twice, then once more', 'Finding it hard to relax, even on a good day'],
    upside: 'You see risks other people miss.',
    cost: 'A constant hum of tension that wears on you and everyone near you.',
    videoUrl: '',
  },
  {
    key: 'pleaser',
    headline: 'you look after everyone else first',
    short: 'Puts others first',
    line: 'You look after everyone else before yourself.',
    body:
      'You help. You say yes. You’re the one people lean on. It feels good, and it keeps people close. But your own needs end up last, and somewhere underneath, the resentment builds quietly.',
    signs: ['Saying yes when you mean no', 'Giving help is easy, asking for it isn’t', 'Feeling hurt when nobody notices the effort'],
    upside: 'You’re generous, and people feel cared for.',
    cost: 'Exhaustion, and help that comes with strings you never say out loud.',
    videoUrl: '',
  },
  {
    key: 'avoider',
    headline: 'you keep the peace',
    short: 'Keeps the peace',
    line: 'You put off the hard stuff to keep things pleasant.',
    body:
      'You steer toward what feels good and away from what feels hard. The tough conversation can wait. The ugly task can wait. You keep things pleasant. Meanwhile the problem doesn’t wait. It grows.',
    signs: ['Putting off conversations you know you need to have', 'Doing the easy things first, every time', 'Saying it’s fine when it isn’t'],
    upside: 'You bring calm, and people feel at ease around you.',
    cost: 'Small problems turn into big ones, and people never get the real you.',
    videoUrl: '',
  },
  {
    key: 'restless',
    headline: 'you look for the next thing',
    short: 'Chases the next thing',
    line: 'You stay busy so you don’t have to sit still.',
    body:
      'When it gets heavy, you get busy. A new idea, a new project, something to fill the space. It keeps the hard feelings at arm’s length. It also means very little gets your full attention, including the people in front of you.',
    signs: ['Getting bored quickly', 'Starting more than you finish', 'Staying busy so you don’t have to sit still'],
    upside: 'You bring energy and fresh ideas.',
    cost: 'Scattered focus, and missing what’s right in front of you.',
    videoUrl: '',
  },
  {
    key: 'stickler',
    headline: 'it has to be right',
    short: 'Has to be right',
    line: 'Mistakes sting, so it all has to be done properly.',
    body:
      'You need it done properly. Order and detail feel like safety, so mistakes sting. Yours and other people’s. High standards are a good thing. Until nothing is ever good enough.',
    signs: ['Redoing work instead of letting it be good enough', 'Small mistakes bothering you long after', 'Getting frustrated when people are late or messy'],
    upside: 'Your standards are high, and your work is reliable.',
    cost: 'Pressure on you, and people who feel they can never get it right.',
    videoUrl: '',
  },
  {
    key: 'victim',
    headline: 'you feel it harder, and it stays',
    short: 'Feels it harder',
    line: 'Setbacks hit deep, and they stay with you.',
    body:
      'When something goes wrong, it hits deep and it lingers. It can feel like these things always happen to you. Sometimes you pull back and hope someone notices. You feel things fully, and that’s real. It just keeps you stuck in the hurt.',
    signs: ['Replaying setbacks for days', 'Feeling misunderstood', 'Going quiet so people will ask what’s wrong'],
    upside: 'You feel deeply, and you understand other people’s pain.',
    cost: 'Your energy goes into the hurt instead of what comes next.',
    videoUrl: '',
  },
];

export const ALL_PATTERNS: Pattern[] = [INNER_CRITIC, ...PATTERNS];
export const byKey = (k: PatternKey) => ALL_PATTERNS.find((p) => p.key === k)!;
