import type { Answers, Picks } from './scoring';
import type { PatternKey } from './patterns';
import { SCENARIOS, STATEMENTS } from './questions';

// Packs someone's answers into a short code for the "view your results online" link,
// so their results can be shown again without storing anything in a database.

export type Shared = { name: string; answers: Answers; picks: Picks; tiebreak?: PatternKey };

const b64url = (s: string) =>
  (typeof btoa === 'function' ? btoa(unescape(encodeURIComponent(s))) : Buffer.from(s, 'utf8').toString('base64'))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = (s: string) => {
  const t = s.replace(/-/g, '+').replace(/_/g, '/');
  return typeof atob === 'function' ? decodeURIComponent(escape(atob(t))) : Buffer.from(t, 'base64').toString('utf8');
};

export function encodeResults({ name, answers, picks, tiebreak }: Shared): string {
  const a = STATEMENTS.map((q) => answers[q.id] ?? 3).join('');
  const p = SCENARIOS.map((s) => Math.max(0, s.options.findIndex((o) => o.pattern === picks[s.id]))).join('');
  return b64url(JSON.stringify({ n: name.slice(0, 40), a, p, t: tiebreak ?? '' }));
}

export function decodeResults(code: string): Shared | null {
  try {
    const { n, a, p, t } = JSON.parse(unb64url(code));
    if (typeof a !== 'string' || a.length !== STATEMENTS.length || typeof p !== 'string' || p.length !== SCENARIOS.length) return null;
    const answers: Answers = {};
    STATEMENTS.forEach((q, i) => { const v = Number(a[i]); if (v >= 1 && v <= 5) answers[q.id] = v; });
    const picks: Picks = {};
    SCENARIOS.forEach((s, i) => { const o = s.options[Number(p[i])]; if (o) picks[s.id] = o.pattern; });
    return { name: String(n ?? ''), answers, picks, tiebreak: t || undefined };
  } catch {
    return null;
  }
}
