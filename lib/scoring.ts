import { PATTERNS, type PatternKey } from './patterns';
import { SCENARIOS, STATEMENTS } from './questions';

export type Answers = Record<number, number>;        // statement id -> 1..5
export type Picks = Record<string, PatternKey>;       // scenario id -> chosen pattern
export type Scores = Record<PatternKey, number>;      // 0..100

/** Statements: two per pattern, averaged, turned into 0 to 100. */
function statementScores(answers: Answers): Scores {
  const out = {} as Scores;
  const keys = [...new Set(STATEMENTS.map((s) => s.pattern))];
  for (const k of keys) {
    const qs = STATEMENTS.filter((s) => s.pattern === k);
    const avg = qs.reduce((a, q) => a + (answers[q.id] ?? 3), 0) / qs.length;
    out[k] = ((avg - 1) / 4) * 100;
  }
  return out;
}

/** Scenarios: how often they picked a pattern out of the times it was offered. */
function scenarioScores(picks: Picks): Partial<Scores> {
  const out: Partial<Scores> = {};
  for (const p of PATTERNS) {
    const offered = SCENARIOS.filter((s) => s.options.some((o) => o.pattern === p.key)).length;
    const chosen = Object.values(picks).filter((k) => k === p.key).length;
    out[p.key] = offered ? (chosen / offered) * 100 : 0;
  }
  return out;
}

/**
 * "Flat" answers: everything rated about the same (for example all 3s, or all 5s).
 * Then the statements can't tell the patterns apart, so the pressure moments carry more weight.
 */
export function isFlat(answers: Answers) {
  const v = STATEMENTS.map((s) => answers[s.id] ?? 3);
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / v.length);
  return sd < 0.6;
}

export type Result = {
  scores: Scores;           // final 0..100 per pattern (critic from statements only)
  ranked: PatternKey[];     // patterns, strongest first, critic excluded
  flat: boolean;
  needsTiebreak: boolean;   // top two within 6 points and no tiebreak answered yet
};

export function compute(answers: Answers, picks: Picks, tiebreak?: PatternKey): Result {
  const st = statementScores(answers);
  const sc = scenarioScores(picks);
  const flat = isFlat(answers);
  const wS = flat ? 0.5 : 0.7;
  const scores = { critic: Math.round(st.critic) } as Scores;
  for (const p of PATTERNS) {
    scores[p.key] = Math.round(wS * st[p.key] + (1 - wS) * (sc[p.key] ?? 0));
  }
  if (tiebreak) {
    // The tiebreak separates the top two: the one they chose stays ahead by a clear margin.
    const [a, b] = PATTERNS.map((p) => p.key).sort((x, y) => scores[y] - scores[x]);
    const other = tiebreak === a ? b : a;
    const high = Math.max(scores[a], scores[b]);
    scores[tiebreak] = high;
    scores[other] = Math.max(0, high - 5);
  }
  const ranked = PATTERNS.map((p) => p.key).sort((a, b) => scores[b] - scores[a]);
  const needsTiebreak = !tiebreak && scores[ranked[0]] - scores[ranked[1]] <= 6;
  return { scores, ranked, flat, needsTiebreak };
}
