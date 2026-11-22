import type { PatternKey } from './patterns';

// PART 1: 20 statements, two per pattern, written as real moments rather than traits.
export type Statement = { id: number; pattern: PatternKey; text: string };

const RAW: [PatternKey, string][] = [
  ['controller', 'When a project starts slipping, I step in and take over.'],
  ['pleaser', 'I say yes to things I don’t have time for, so I don’t let anyone down.'],
  ['vigilant', 'I lie awake running through what could go wrong.'],
  ['critic', 'When something goes wrong, my first thought is what I did wrong.'],
  ['restless', 'I get bored fast and start looking for the next thing.'],
  ['avoider', 'I put off hard conversations, hoping they’ll sort themselves out.'],
  ['achiever', 'I feel good about myself mostly when I’m winning.'],
  ['stickler', 'If it’s not done properly, I’d rather do it myself.'],
  ['rational', 'When people get emotional, I go straight to solving the problem.'],
  ['victim', 'When things go wrong, it feels like they always happen to me.'],
  ['controller', 'I get tense when the decision isn’t mine to make.'],
  ['avoider', 'When a task feels unpleasant, I find something easier to do first.'],
  ['critic', 'I notice what’s wrong with someone’s work before I notice what’s right.'],
  ['achiever', 'When I hit a goal, I’m onto the next one before I’ve enjoyed it.'],
  ['pleaser', 'Helping other people is easy for me. Asking for help isn’t.'],
  ['stickler', 'Small mistakes bother me long after everyone else has moved on.'],
  ['vigilant', 'Even when things are going well, I’m waiting for something to slip.'],
  ['rational', 'People have told me I seem cold when things get tense.'],
  ['restless', 'I keep myself busy so I don’t have to sit with how I feel.'],
  ['victim', 'When I’m upset, I want people to notice without me having to say it.'],
];

export const STATEMENTS: Statement[] = RAW.map(([pattern, text], i) => ({ id: i + 1, pattern, text }));

export const SCALE = [
  { value: 1, label: 'Not me' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'That’s me' },
];

// PART 2: 5 pressure moments. They pick the reaction closest to what they'd
// actually do. Forced choice stops anyone rating everything high, and every
// pattern shows up at least twice across the five.
export type Scenario = { id: string; setup: string; options: { pattern: PatternKey; text: string }[] };

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    setup: 'It’s 9pm. Your biggest client emails: they’re unhappy, and they want a call first thing tomorrow.',
    options: [
      { pattern: 'controller', text: 'I start working out the fix tonight and plan exactly how the call will go.' },
      { pattern: 'vigilant', text: 'I barely sleep. I’m running through every way this could go wrong.' },
      { pattern: 'avoider', text: 'I’ll deal with it in the morning. No point ruining my night.' },
      { pattern: 'pleaser', text: 'I reply right away, apologize, and offer whatever they need.' },
    ],
  },
  {
    id: 's2',
    setup: 'A project you really care about just missed its deadline.',
    options: [
      { pattern: 'stickler', text: 'I go through it piece by piece to find exactly where it went wrong.' },
      { pattern: 'achiever', text: 'My first worry is how this makes me look.' },
      { pattern: 'victim', text: 'Of course. Something always goes wrong for me.' },
      { pattern: 'restless', text: 'I’m already thinking about the next project.' },
    ],
  },
  {
    id: 's3',
    setup: 'Someone on your team pushes back on your idea in front of everyone.',
    options: [
      { pattern: 'controller', text: 'I hold my ground. It’s my call.' },
      { pattern: 'rational', text: 'I walk them through the logic until they see it.' },
      { pattern: 'pleaser', text: 'I back down. It’s not worth the friction.' },
      { pattern: 'avoider', text: 'I say it’s fine and move on, even if it isn’t.' },
    ],
  },
  {
    id: 's4',
    setup: 'You’ve got a whole Saturday with nothing planned.',
    options: [
      { pattern: 'restless', text: 'I fill it fast. An empty day makes me antsy.' },
      { pattern: 'achiever', text: 'I get some work done. Rest can wait.' },
      { pattern: 'vigilant', text: 'I can’t fully relax. Something’s probably waiting for me.' },
      { pattern: 'stickler', text: 'I finally fix the things that aren’t the way I like them.' },
    ],
  },
  {
    id: 's5',
    setup: 'Someone close to you says you’ve seemed distant lately.',
    options: [
      { pattern: 'rational', text: 'I ask for specific examples so I can understand it.' },
      { pattern: 'victim', text: 'It stings for days. I’m doing my best.' },
      { pattern: 'avoider', text: 'I tell them I’m fine. It’s just a busy stretch.' },
      { pattern: 'pleaser', text: 'I worry I’ve let them down and try to make it up to them.' },
    ],
  },
];

export const CORE_COUNT = STATEMENTS.length + SCENARIOS.length;
