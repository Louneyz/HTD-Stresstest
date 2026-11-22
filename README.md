# The Stress Test

A Headtrash Dojo skeleton: 30 statements, a 1 to 5 slider for each, an email step, then results showing the person's strongest stress pattern, a slot for Joe's video, their full picture, and a button to book a discovery webinar.

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

1. In Vercel, choose **Add New Project** and import this repo. It detects Next.js, so no settings are needed.
2. Optional: add the environment variable `NEXT_PUBLIC_BOOKING_URL` with the CloseEase booking page link for the discovery webinar. Without it, the button goes nowhere.

## Where things live

| File | What it holds |
|---|---|
| `lib/questions.ts` | The 30 statements (drafts for Joe to approve) and the 1 to 5 labels |
| `lib/patterns.ts` | The 10 stress patterns: plain-language headline, explanation, signs, upside, cost, and a `videoUrl` for Joe's video |
| `lib/scoring.ts` | Scoring: each pattern is 3 statements, turned into 0 to 100%. The top pattern leaves out the inner critic, which everyone has and is shown on its own |
| `components/StressTest.tsx` | The screens: intro, statements, email step, results |
| `app/globals.css` | All styling |

## How the patterns work

The ten patterns follow the saboteurs Joe teaches. The app never shows those names. It describes how each one behaves under stress instead ("you take charge to feel safe"). The internal keys in `lib/patterns.ts` map each one back for Joe's team.

## Not built yet (skeleton)

- **Saving the email.** The email step only moves to the results. The next step is sending the name, email and referral code to CloseEase as a new lead (`/api/public/leads/[key]`), with the code as the source.
- **Emailing the results.**
- **Joe's videos.** Paste each video's embed link into `videoUrl` in `lib/patterns.ts`.
- **Saving the result to their portal profile** once they buy a ticket.

Progress is kept in the browser, so a refresh does not lose answers.
