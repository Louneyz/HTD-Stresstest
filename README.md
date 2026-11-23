# The Stress Test

A Headtrash Dojo skeleton. Version 2: 20 statements on a 1 to 5 slider, 5 pressure moments where they pick what they'd actually do, a tiebreak only when the top two are close, an email step, then results in Joe's voice with a slot for his video and a button to book a discovery webinar.

Version 1 (30 statements, plainer copy) is kept as the git tag `v1` and the branch `v1`, so both can be deployed and compared.

Branding matches the Headtrash Dojo Live pipeline PDF: navy `#052649`, red `#eb2427`, Poppins, the vector logo and the slash header.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- Add `?demo` to the address to show a "skip to sample results" link, handy in a meeting.
- Add `?ref=SARAH20` to see how a referral code is carried through to the email step.

## Put it on Vercel

1. In Vercel, choose **Add New Project** and import this repo. It detects Next.js, so no build settings are needed.
2. Add the environment variables from `.env.example`. Only `RESEND_API_KEY` is needed for the email to send; the rest have sensible defaults.

## The results email

When someone enters their name and email, the app calls `/api/results`, which:

1. Works out their scores with the same code the results page uses.
2. Fills the branded template in `emails/ResultsEmail.tsx` (React Email) and sends it through Resend.
3. Optionally sends them to CloseEase as a lead, tagged `stress-test`, `pattern-<their top pattern>` and `ref-<code>`.

No AI is involved: the same answers always produce the same email. The results page only says "a copy is on its way" once Resend has accepted the email.

The email's "View your results online" link carries their answers in the address (`/?r=...`), so their results come back without a database.

Email apps don't load Poppins or show SVG, so the logo is `public/email/logo.png`, the video thumbnail is `public/email/video.png`, and the bars are table cells.

## Where things live

| File | What it holds |
|---|---|
| `lib/questions.ts` | The 20 statements, the 5 pressure moments (drafts for Joe to approve) and the 1 to 5 labels |
| `lib/patterns.ts` | The 10 stress patterns: plain-language headline, explanation, signs, upside, cost, and a `videoUrl` for Joe's video |
| `lib/scoring.ts` | Scoring: statements count 70% and pressure moments 30%. If someone rates everything about the same, the pressure moments count 50%. A tiebreak question appears only when the top two are within 6 points. The inner critic is scored on its own |
| `components/StressTest.tsx` | The screens: intro, statements, email step, results |
| `app/globals.css` | All styling |
| `emails/ResultsEmail.tsx` | The results email template |
| `app/api/results/route.ts` | Sends the email and the CloseEase lead |
| `lib/share.ts` | Packs answers into the results link |

## How the patterns work

The ten patterns follow the saboteurs Joe teaches. The app never shows those names. It describes how each one behaves under stress instead ("you take charge to feel safe"). The internal keys in `lib/patterns.ts` map each one back for Joe's team.

## Not built yet (skeleton)

- **Joe's videos.** Paste each video's link into `videoUrl` in `lib/patterns.ts`. The email thumbnail links to it.
- **Saving the result to their portal profile** once they buy a ticket.

Progress is kept in the browser, so a refresh does not lose answers.
