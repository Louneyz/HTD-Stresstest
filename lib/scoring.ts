import { ALL_PATTERNS, PATTERNS, type PatternKey } from './patterns';
import { QUESTIONS } from './questions';

export type Answers = Record<number, number>;
export type Scores = Record<PatternKey, number>;

/** Each pattern's score is 0 to 100: three answers of 1 give 0, three answers of 5 give 100. */
export function score(answers: Answers): Scores {
  const out = {} as Scores;
  for (const p of ALL_PATTERNS) {
    const qs = QUESTIONS.filter((q) => q.pattern === p.key);
    const sum = qs.reduce((a, q) => a + (answers[q.id] ?? 3), 0);
    out[p.key] = Math.round(((sum - qs.length) / (qs.length * 4)) * 100);
  }
  return out;
}

/** The top pattern, leaving out the inner critic, which everyone has. */
export function topPattern(scores: Scores) {
  return [...PATTERNS].sort((a, b) => scores[b.key] - scores[a.key])[0];
}
