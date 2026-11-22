'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Logo } from './Logo';
import { QUESTIONS, SCALE } from '@/lib/questions';
import { INNER_CRITIC, PATTERNS, type Pattern } from '@/lib/patterns';
import { score, topPattern, type Answers } from '@/lib/scoring';

type Step = 'intro' | 'quiz' | 'gate' | 'results';
type Details = { name: string; email: string; ref: string };

const STORE = 'htd-stress-test';
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '#book';

export function StressTest() {
  const params = useSearchParams();
  const demo = params.get('demo') !== null;
  const refCode = params.get('ref') ?? '';

  const [step, setStep] = useState<Step>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [details, setDetails] = useState<Details>({ name: '', email: '', ref: refCode });
  const [loaded, setLoaded] = useState(false);

  // Keep progress if they refresh the page.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved) {
        setStep(saved.step);
        setIndex(saved.index);
        setAnswers(saved.answers);
        setDetails({ ...saved.details, ref: saved.details.ref || refCode });
      }
    } catch {}
    setLoaded(true);
  }, [refCode]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORE, JSON.stringify({ step, index, answers, details }));
    } catch {}
  }, [loaded, step, index, answers, details]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setStep('intro');
  };

  const fillSample = () => {
    const a: Answers = {};
    for (const q of QUESTIONS) a[q.id] = 1 + Math.floor(Math.random() * 5);
    setAnswers(a);
    setDetails((d) => ({ ...d, name: d.name || 'Sample', email: d.email || 'sample@example.com' }));
    setStep('results');
  };

  return (
    <div className="shell">
      <header className="site-top">
        <Logo className="logo" />
        <div className="slashes" aria-hidden>
          <span className="slash navy" />
          <span className="slash red" />
        </div>
      </header>

      <main className="main">
        {step === 'intro' && <Intro onStart={() => setStep('quiz')} demo={demo} onSample={fillSample} />}
        {step === 'quiz' && (
          <Quiz
            index={index}
            answers={answers}
            onAnswer={(id, v) => setAnswers((a) => ({ ...a, [id]: v }))}
            onBack={() => (index === 0 ? setStep('intro') : setIndex(index - 1))}
            onNext={() => (index === QUESTIONS.length - 1 ? setStep('gate') : setIndex(index + 1))}
          />
        )}
        {step === 'gate' && <Gate details={details} onChange={setDetails} onSubmit={() => setStep('results')} />}
        {step === 'results' && <Results answers={answers} name={details.name} onRestart={restart} />}
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
      <p className="pill">See how you respond when the pressure is on</p>
      <p className="lead">
        Everyone handles stress in their own way. Some of us take charge, some keep the peace, some go quiet.
        This test shows you the pattern your stress tends to fall into, and what it costs you.
      </p>
      <div className="cards3">
        <div className="mini"><span className="num">30</span><p>short statements</p></div>
        <div className="mini"><span className="num">1 to 5</span><p>slide to show how much each one sounds like you</p></div>
        <div className="mini red"><span className="num">5 min</span><p>and no right or wrong answers</p></div>
      </div>
      <button className="btn" onClick={onStart}>Start the test</button>
      {demo && (
        <button className="link" onClick={onSample}>Demo: skip to sample results</button>
      )}
    </section>
  );
}

function Quiz({
  index, answers, onAnswer, onBack, onNext,
}: {
  index: number;
  answers: Answers;
  onAnswer: (id: number, v: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const q = QUESTIONS[index];
  const value = answers[q.id];
  const pct = Math.round((index / QUESTIONS.length) * 100);
  const last = index === QUESTIONS.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 5) onAnswer(q.id, n);
      if (e.key === 'Enter' && value) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q.id, value, onAnswer, onNext]);

  return (
    <section className="quiz">
      <div className="progress">
        <span>Statement {index + 1} of {QUESTIONS.length}</span>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="qcard">
        <p className="kicker">How much does this sound like you?</p>
        <h2 key={q.id}>{q.text}</h2>

        <input
          className={`slider ${value ? '' : 'unset'}`}
          type="range" min={1} max={5} step={1}
          value={value ?? 3}
          onChange={(e) => onAnswer(q.id, Number(e.target.value))}
          onPointerUp={(e) => onAnswer(q.id, Number((e.target as HTMLInputElement).value))}
          aria-label="How much this sounds like you, from 1 to 5"
        />
        <div className="scale">
          {SCALE.map((s) => (
            <button
              key={s.value}
              className={value === s.value ? 'on' : ''}
              onClick={() => onAnswer(q.id, s.value)}
            >
              <b>{s.value}</b>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="nav">
        <button className="ghost" onClick={onBack}>Back</button>
        <button className="btn" disabled={!value} onClick={onNext}>{last ? 'See my results' : 'Next'}</button>
      </div>
    </section>
  );
}

function Gate({ details, onChange, onSubmit }: { details: Details; onChange: (d: Details) => void; onSubmit: () => void }) {
  const valid = details.name.trim() && /\S+@\S+\.\S+/.test(details.email);
  return (
    <section className="gate">
      <p className="kicker">All done</p>
      <h1 className="h1s">Your results are ready</h1>
      <p className="pill">Tell us where to send them</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          // Skeleton: this is where the details go to CloseEase as a new lead,
          // with the referral code as the source. See README.
          onSubmit();
        }}
      >
        <label>First name<input value={details.name} onChange={(e) => onChange({ ...details, name: e.target.value })} autoComplete="given-name" /></label>
        <label>Email<input type="email" value={details.email} onChange={(e) => onChange({ ...details, email: e.target.value })} autoComplete="email" /></label>
        {details.ref && <p className="refnote">Invited with code <b>{details.ref}</b></p>}
        <button className="btn" disabled={!valid}>Show my results</button>
        <p className="fine">We will email you a copy of your results. Your details stay with Headtrash Dojo.</p>
      </form>
    </section>
  );
}

function Results({ answers, name, onRestart }: { answers: Answers; name: string; onRestart: () => void }) {
  const scores = useMemo(() => score(answers), [answers]);
  const top = topPattern(scores);
  const ranked = [...PATTERNS].sort((a, b) => scores[b.key] - scores[a.key]);

  return (
    <section className="results">
      <p className="kicker">{name ? `${name}, here are your results` : 'Your results'}</p>
      <h1 className="h1s">When pressure rises, {top.headline}</h1>
      <p className="pill">Your strongest stress pattern</p>

      <div className="grid2">
        <div className="card">
          <p>{top.explanation}</p>
          <h3>How it shows up</h3>
          <ul className="ticks">{top.signs.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="pair">
            <div><span>The upside</span><p>{top.upside}</p></div>
            <div className="red"><span>What it costs you</span><p>{top.cost}</p></div>
          </div>
        </div>
        <Video pattern={top} />
      </div>

      <h2 className="sect">Your full picture</h2>
      <div className="grid2">
        <div className="card">
          {ranked.map((p) => (
            <div key={p.key} className={`row ${p.key === top.key ? 'top' : ''}`}>
              <div className="rl"><span>{p.short}</span><b>{scores[p.key]}%</b></div>
              <div className="rb"><i style={{ width: `${Math.max(scores[p.key], 2)}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="card critic">
          <span className="tag">Everyone has one</span>
          <h3>The inner critic: {scores.critic}%</h3>
          <p>{INNER_CRITIC.explanation}</p>
        </div>
      </div>

      <div className="cta">
        <div>
          <p className="kicker light">Next step</p>
          <h2>Go over your results with Joe</h2>
          <p>Book a spot in a discovery webinar. Joe walks through what your results mean, and what to do with them.</p>
        </div>
        <a className="btn white" href={BOOKING_URL}>Book your discovery webinar</a>
      </div>

      <button className="link" onClick={onRestart}>Take the test again</button>
    </section>
  );
}

function Video({ pattern }: { pattern: Pattern }) {
  if (pattern.videoUrl) {
    return (
      <div className="video">
        <iframe src={pattern.videoUrl} title="A message from Joe" allow="autoplay; fullscreen" allowFullScreen />
      </div>
    );
  }
  return (
    <div className="video empty">
      <span className="play" aria-hidden>▶</span>
      <b>A short video from Joe about this pattern</b>
      <p>Recorded once, it plays for everyone who gets this result.</p>
    </div>
  );
}
