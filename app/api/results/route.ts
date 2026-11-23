import { createElement } from 'react';
import { render } from '@react-email/render';
import ResultsEmail, { subjectFor } from '@/emails/ResultsEmail';
import { byKey } from '@/lib/patterns';
import { compute } from '@/lib/scoring';
import { decodeResults, encodeResults } from '@/lib/share';

// Sends the branded results email through Resend, and passes the person to CloseEase as a lead.
// Needs RESEND_API_KEY. Everything else has a sensible default. See README.

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? '').trim().slice(0, 40);
  const email = String(body?.email ?? '').trim();
  const ref = String(body?.ref ?? '').trim().slice(0, 40);
  const shared = typeof body?.code === 'string' ? decodeResults(body.code) : null;
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !shared) {
    return Response.json({ sent: false, error: 'Missing name, email or answers' }, { status: 400 });
  }

  const result = compute(shared.answers, shared.picks, shared.tiebreak);
  const top = byKey(result.ranked[0]);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : new URL(req.url).origin);
  const code = encodeResults({ ...shared, name });
  const resultsUrl = `${siteUrl}/?r=${code}`;
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || resultsUrl;

  // 1. CloseEase lead (optional): tagged with their top pattern and referral code.
  const leadsUrl = process.env.CLOSEEASE_LEADS_URL;
  if (leadsUrl) {
    await fetch(leadsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: name,
        email,
        source: ref ? `Stress Test (code ${ref})` : 'Stress Test',
        tags: ['stress-test', `pattern-${top.key}`, ...(ref ? [`ref-${ref}`] : [])].join(','),
        message: `Stress Test top pattern: ${top.short} (${result.scores[top.key]}%). Inner critic ${result.scores.critic}%. Results: ${resultsUrl}`,
      }),
    }).catch(() => null);
  }

  // 2. The results email.
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ sent: false, error: 'Email is not set up yet' });

  const props = {
    name,
    top,
    ranked: result.ranked.map((k) => ({ pattern: byKey(k), score: result.scores[k] })),
    critic: result.scores.critic,
    resultsUrl,
    bookingUrl,
    siteUrl,
    address: process.env.BUSINESS_ADDRESS || undefined,
  };
  const element = createElement(ResultsEmail, props);
  const [html, text] = await Promise.all([render(element), render(element, { plainText: true })]);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESULTS_FROM_EMAIL || 'Joe Heraldo <results@headtrashdojo.com>',
      to: [email],
      subject: subjectFor(top),
      html,
      text,
      ...(process.env.RESULTS_REPLY_TO ? { reply_to: process.env.RESULTS_REPLY_TO } : {}),
    }),
  });
  if (!res.ok) return Response.json({ sent: false, error: 'Resend refused the email' }, { status: 502 });
  return Response.json({ sent: true });
}
