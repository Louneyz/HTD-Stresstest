import type { PatternKey } from './patterns';

export type Question = { id: number; pattern: PatternKey; text: string };

// 30 statements, three per pattern, mixed so no two in a row share a pattern.
// These are drafts for Joe to approve.
const RAW: [PatternKey, string][] = [
  ['critic', 'When something goes wrong, my first thought is what I did wrong.'],
  ['controller', 'When a situation feels out of my hands, I get tense until I take charge.'],
  ['pleaser', 'I say yes to things I do not have time for, so I do not let people down.'],
  ['restless', 'I get bored quickly and look for the next exciting thing.'],
  ['vigilant', 'I lie awake running through everything that could go wrong.'],
  ['avoider', 'I put off hard conversations, hoping they will sort themselves out.'],
  ['achiever', 'I feel good about myself mostly when I am winning or achieving.'],
  ['stickler', 'If it is not done properly, I would rather do it myself.'],
  ['rational', 'When emotions run high, I step back and analyse instead of feeling.'],
  ['victim', 'When things go wrong, it feels like it always happens to me.'],
  ['critic', 'I notice what people are doing wrong before I notice what they are doing right.'],
  ['avoider', 'When a task feels unpleasant, I find something easier to do first.'],
  ['controller', 'I find it hard to let others do things their own way.'],
  ['achiever', 'When one goal is done, I am already chasing the next without stopping to enjoy it.'],
  ['pleaser', 'I find it hard to ask for help, but easy to give it.'],
  ['stickler', 'Small mistakes bother me long after others have moved on.'],
  ['vigilant', 'I find it hard to relax, even when things are going well.'],
  ['rational', 'I get impatient with people who make decisions based on feelings.'],
  ['restless', 'I keep myself busy so I do not have to sit with how I feel.'],
  ['victim', 'My feelings about a setback stay with me for a long time.'],
  ['critic', 'Even after a win, I focus on what could have gone better.'],
  ['controller', 'Under pressure, I push people harder to get the result I want.'],
  ['avoider', 'I would rather keep the peace than say what I really think.'],
  ['achiever', 'I worry about how my results make me look to others.'],
  ['vigilant', 'I double check things because I expect something to slip.'],
  ['pleaser', 'I feel hurt when the effort I put into others goes unnoticed.'],
  ['rational', 'People have told me I come across as cold or distant when things get tense.'],
  ['stickler', 'I get frustrated when people are messy, late or disorganised.'],
  ['restless', 'I start more things than I finish.'],
  ['victim', 'I sometimes pull back so others will notice something is wrong.'],
];

export const QUESTIONS: Question[] = RAW.map(([pattern, text], i) => ({ id: i + 1, pattern, text }));

export const SCALE = [
  { value: 1, label: 'Not like me' },
  { value: 2, label: 'A little' },
  { value: 3, label: 'Somewhat' },
  { value: 4, label: 'Mostly' },
  { value: 5, label: 'Very like me' },
];
