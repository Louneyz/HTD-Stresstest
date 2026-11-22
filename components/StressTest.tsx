'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Logo } from './Logo';
import { CORE_COUNT, SCALE, SCENARIOS, STATEMENTS } from '@/lib/questions';
import { INNER_CRITIC, byKey, type Pattern, type PatternKey } from '@/lib/patterns';
import { compute, type Answers, type Picks } from '@/lib/scoring';

type Step = 'intro' | 'statements' | 'scenarios' | 'tiebreak' | 'gate' | 'results';
type Details = { name: string; email: string; ref: string };
type State = { step: Step; si: number; ci: number; answers: Answers; picks: Picks; tiebreak?: PatternKey; details: Details };

const STORE = 'htd-stress-test-v2';
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '#book';
const blank = (ref: string): State => ({ step: 'intro', si: 0, ci: 0, answers: {}, picks: {}, details: { name: '', email: '', ref } });

export function StressTest() {
  const params = useSearchParams();
  const demo = params.get('demo') !== null;
  const refCode = params.get('ref') ?? '';
  const [s, setS] = useState<State>(blank(refCode));
  const [loaded, setLoaded] = useState(false);
  const set = (patch: Partial<State>) => setS((x) => ({ ...x, ...patch }));

  // Keep progress if they refresh.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved) setS({ ...saved, details: { ...saved.details, ref: saved.details.ref || refCode } });
    } catch {}
    setLoaded(true);
  }, [refCode]);
  useEffect(() => {
    if (loaded) try { localStorage.setItem(STORE, JSON.stringify(s)); } catch {}
  }, [loaded, s]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [s.step]);

  const result = useMemo(() => compute(s.answers, s.picks, s.tiebreak), [s.answers, s.picks, s.tiebreak]);
  const afterScenarios = () => set({ step: result.needsTiebreak ? 'tiebreak' : 'gate' });

  const sample = () => {
    const answers: Answers = {};
    for (const q of STATEMENTS) answers[q.id] = 1 + Math.floor(Math.random() * 5);
    const picks: Picks = {};
    for (const sc of SCENARIOS) picks[sc.id] = sc.options[Math.floor(Math.random() * 4)].pattern;
    setS((x) => ({ ...x, answers, picks, tiebreak: undefined, step: 'results', details: { ...x.details, name: x.details.name || 'Sam' } }));
  };

  return (
    <div className="shell">
      <header className="site-top">
        <Logo className="logo" />
        <div className="slashes" aria-hidden><span className="slash navy" /><span className="slash red" /></div>
      </header>

      <main className="main">
        {s.step === 'intro' && <Intro onStart={() => set({ step: 'statements' })} demo={demo} onSample={sample} />}

        {s.step === 'statements' && (
          <StatementStep
            index={s.si}
            answers={s.answers}
            onAnswer={(id, v) => setS((x) => ({ ...x, answers: { ...x.answers, [id]: v } }))}
            onBack={() => (s.si === 0 ? set({ step: 'intro' }) : set({ si: s.si - 1 }))}
            onNext={() => (s.si === STATEMENTS.length - 1 ? set({ step: 'scenarios' }) : set({ si: s.si + 1 }))}
          />
        )}

        {s.step === 'scenarios' && (
          <ScenarioStep
            index={s.ci}
            picks={s.picks}
            onPick={(id, k) => setS((x) => ({ ...x, picks: { ...x.picks, [id]: k } }))}
            onBack={() => (s.ci === 0 ? set({ step: 'statements', si: STATEMENTS.length - 1 }) : set({ ci: s.ci - 1 }))}
            onNext={() => (s.ci === SCENARIOS.length - 1 ? afterScenarios() : set({ ci: s.ci + 1 }))}
          />
        )}

        {s.step === 'tiebreak' && (
          <Tiebreak a={byKey(result.ranked[0])} b={byKey(result.ranked[1])} onPick={(k) => set({ tiebreak: k, step: 'gate' })} />
        )}

        {s.step === 'gate' && <Gate details={s.details} onChange={(d) => set({ details: d })} onSubmit={() => set({ step: 'results' })} />}

        {s.step === 'results' && <Results result={result} name={s.details.name} onRestart={() => setS(blank(refCode))} />}
      </main>

      <footer className="band">
        <b>Master yourself. Lead with intention.</b>
        <span>Be sage. Be resilient. Be the habit.</span>
      </footer>
    </div>
  );
}

function Intro({ onStart, demo, onSample }: { onStart: () => void; demo: boolean; onSample: () => void }) {
  return (
    <section className="intro">
      <p className="kicker">Headtrash Dojo</p>
      <h1>The Stress Test</h1>
      <p className="pill">How do you handle it when the pressure’s on?</p>
      <p className="lead">
        Everybody handles stress differently. Some of us take over. Some keep the peace. Some go quiet and hope it passes.
        Most of us never notice which one we’re doing, because from the inside it just feels like common sense.
      </p>
      <p className="lead">This shows you. Answer like it’s a normal Tuesday, not your best day.</p>
      <div className="cards3">
        <div className="mini"><span className="num">{CORE_COUNT}</span><p>quick questions</p></div>
        <div className="mini"><span className="num">5 min</span><p>about as long as a coffee</p></div>
        <div className="mini red"><span className="num">0</span><p>right answers. Just honest ones.</p></div>
      </div>
      <button className="btn" onClick={onStart}>Start the test</button>
      <blockquote className="joe">
        “I built this so you’d have a name for what happens under pressure. Knowing the name isn’t the work. But it’s a good place to start.”
        <span>Joe</span>
      </blockquote>
      {demo && <button className="link" onClick={onSample}>Demo: skip to sample results</button>}
    </section>
  );
}

function Progress({ done, label }: { done: number; label: string }) {
  return (
    <div className="progress">
      <span>{label}</span>
      <div className="bar"><i style={{ width: `${Math.round((done / CORE_COUNT) * 100)}%` }} /></div>
    </div>
  );
}

function useKeys(handler: (key: string) => void, deps: unknown[]) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => handler(e.key);
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function StatementStep({ index, answers, onAnswer, onBack, onNext }: {
  index: number; answers: Answers; onAnswer: (id: number, v: number) => void; onBack: () => void; onNext: () => void;
}) {
  const q = STATEMENTS[index];
  const value = answers[q.id];
  useKeys((k) => {
    const n = Number(k);
    if (n >= 1 && n <= 5) onAnswer(q.id, n);
    if (k === 'Enter' && value) onNext();
  }, [q.id, value]);

  return (
    <section className="quiz">
      <Progress done={index} label={`Part 1 · ${index + 1} of ${STATEMENTS.length}`} />
      <div className="qcard">
        <p className="kicker">How much does this sound like you?</p>
        <h2 key={q.id}>{q.text}</h2>
        <input
          className={`slider ${value ? '' : 'unset'}`}
          type="range" min={1} max={5} step={1} value={value ?? 3}
          onChange={(e) => onAnswer(q.id, Number(e.target.value))}
          onPointerUp={(e) => onAnswer(q.id, Number((e.target as HTMLInputElement).value))}
          aria-label="How much this sounds like you, from 1 to 5"
        />
        <div className="scale">
          {SCALE.map((o) => (
            <button key={o.value} className={value === o.value ? 'on' : ''} onClick={() => onAnswer(q.id, o.value)}>
              <b>{o.value}</b><span>{o.label}</span>
            </button>
          ))}
        </div>
        {index === 0 && <p className="hint">Go with your first answer. The honest one, not the impressive one.</p>}
      </div>
      <div className="nav">
        <button className="ghost" onClick={onBack}>Back</button>
        <button className="btn" disabled={!value} onClick={onNext}>Next</button>
      </div>
    </section>
  );
}

function ScenarioStep({ index, picks, onPick, onBack, onNext }: {
  index: number; picks: Picks; onPick: (id: string, k: PatternKey) => void; onBack: () => void; onNext: () => void;
}) {
  const sc = SCENARIOS[index];
  const chosen = picks[sc.id];
  const last = index === SCENARIOS.length - 1;
  useKeys((k) => {
    const n = Number(k);
    if (n >= 1 && n <= sc.options.length) onPick(sc.id, sc.options[n - 1].pattern);
    if (k === 'Enter' && chosen) onNext();
  }, [sc.id, chosen]);

  return (
    <section className="quiz">
      <Progress done={STATEMENTS.length + index} label={`Part 2 · ${index + 1} of ${SCENARIOS.length}`} />
      <div className="qcard">
        <p className="kicker">Pressure moment</p>
        <h2 key={sc.id}>{sc.setup}</h2>
        <p className="sub">What would you actually do? Not what you’d like to do.</p>
        <div className="opts">
          {sc.options.map((o, i) => (
            <button key={o.pattern} className={chosen === o.pattern ? 'on' : ''} onClick={() => onPick(sc.id, o.pattern)}>
              <span className="ol">{String.fromCharCode(65 + i)}</span>{o.text}
            </button>
          ))}
        </div>
      </div>
      <div className="nav">
        <button className="ghost" onClick={onBack}>Back</button>
        <button className="btn" disabled={!chosen} onClick={onNext}>{last ? 'Finish' : 'Next'}</button>
      </div>
    </section>
  );
}

function Tiebreak({ a, b, onPick }: { a: Pattern; b: Pattern; onPick: (k: PatternKey) => void }) {
  return (
    <section className="quiz">
      <div className="qcard">
        <p className="kicker">One last one</p>
        <h2>Two of your answers came out neck and neck. On a hard day, which sounds more like you?</h2>
        <div className="opts two">
          {[a, b].map((p, i) => (
            <button key={p.key} onClick={() => onPick(p.key)}>
              <span className="ol">{String.fromCharCode(65 + i)}</span>When the pressure’s on, {p.headline}.
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gate({ details, onChange, onSubmit }: { details: Details; onChange: (d: Details) => void; onSubmit: () => void }) {
  const valid = details.name.trim() && /\S+@\S+\.\S+/.test(details.email);
  return (
    <section className="gate">
      <p className="kicker">That’s it</p>
      <h1 className="h1s">Your results are ready</h1>
      <p className="pill">Where should I send them?</p>
      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        // Skeleton: this is where name, email and referral code go to CloseEase as a new lead. See README.
        onSubmit();
      }}>
        <label>First name<input value={details.name} onChange={(e) => onChange({ ...details, name: e.target.value })} autoComplete="given-name" /></label>
        <label>Email<input type="email" inputMode="email" value={details.email} onChange={(e) => onChange({ ...details, email: e.target.value })} autoComplete="email" /></label>
        {details.ref && <p className="refnote">Invited with code <b>{details.ref}</b></p>}
        <button className="btn" disabled={!valid}>Show me my results</button>
        <p className="fine">I’ll email you a copy so you can come back to it.</p>
      </form>
    </section>
  );
}

function Results({ result, name, onRestart }: { result: ReturnType<typeof compute>; name: string; onRestart: () => void }) {
  const { scores, ranked, flat } = result;
  const top = byKey(ranked[0]);
  return (
    <section className="results">
      <p className="kicker">{name ? `${name}, here’s what came back` : 'Here’s what came back'}</p>
      <h1 className="h1s">When the pressure’s on, {top.headline}.</h1>
      <p className="pill">Your strongest stress pattern</p>

      <div className="grid2">
        <div className="card">
          <p>{top.body}</p>
          <h3>You might notice</h3>
          <ul className="ticks">{top.signs.map((x) => <li key={x}>{x}</li>)}</ul>
          <div className="pair">
            <div><span>What it gives you</span><p>{top.upside}</p></div>
            <div className="red"><span>What it costs you</span><p>{top.cost}</p></div>
          </div>
          <p className="honest">Here’s the honest bit. This isn’t a flaw. It probably got you a long way. It’s just running on fear instead of on purpose.</p>
        </div>
        <Video pattern={top} />
      </div>

      {flat && (
        <p className="flat">Your answers were pretty even across the board. That can mean you were moving fast, or that pressure shows up for you in a lot of ways. Either way, your pressure moments counted for more in this result.</p>
      )}

      <h2 className="sect">The full picture</h2>
      <div className="grid2">
        <div className="card">
          {ranked.map((k) => (
            <div key={k} className={`row ${k === top.key ? 'first' : ''}`}>
              <div className="rl"><span>{byKey(k).short}</span><b>{scores[k]}%</b></div>
              <div className="rb"><i style={{ width: `${Math.max(scores[k], 2)}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="card critic">
          <span className="tag">Everyone has one</span>
          <h3>Your inner critic: {scores.critic}%</h3>
          <p>{INNER_CRITIC.body}</p>
        </div>
      </div>

      <div className="cta">
        <div>
          <p className="kicker light">What now</p>
          <h2>Knowing the name isn’t the work.</h2>
          <p>It’s a good start, though. Join me for a discovery webinar and we’ll go through your results together: what this pattern is costing you, and what a quieter version looks like.</p>
        </div>
        <a className="btn white" href={BOOKING_URL}>Book your discovery webinar</a>
      </div>

      <p className="small">This is a mirror, not a diagnosis. It shows how you tend to respond under pressure, so you can catch it sooner.</p>
      <button className="link" onClick={onRestart}>Take it again</button>
    </section>
  );
}

function Video({ pattern }: { pattern: Pattern }) {
  if (pattern.videoUrl) {
    return <div className="video"><iframe src={pattern.videoUrl} title="A message from Joe" allow="autoplay; fullscreen" allowFullScreen /></div>;
  }
  return (
    <div className="video empty">
      <span className="play" aria-hidden>▶</span>
      <b>A short video from me about this pattern</b>
      <p>Joe’s video for this result goes here.</p>
    </div>
  );
}
