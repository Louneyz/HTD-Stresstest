import {
  Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Text,
} from '@react-email/components';
import type { Pattern, PatternKey } from '@/lib/patterns';
import { INNER_CRITIC } from '@/lib/patterns';

// The results email. A fixed template: the same answers always produce the same email.
// Email apps don't load Poppins or show SVG, so the logo is a PNG and the font falls back cleanly.

const NAVY = '#052649';
const RED = '#eb2427';
const BG = '#f3f5f8';
const MUTED = '#5c7188';
const font = "Poppins, 'Segoe UI', Helvetica, Arial, sans-serif";

export type ResultsEmailProps = {
  name: string;
  top: Pattern;
  ranked: { pattern: Pattern; score: number }[];
  critic: number;
  resultsUrl: string;
  bookingUrl: string;
  siteUrl: string;
  address?: string;
};

export function subjectFor(top: Pattern) {
  return `Your Stress Test results: when the pressure’s on, ${top.headline}`;
}

export default function ResultsEmail({ name, top, ranked, critic, resultsUrl, bookingUrl, siteUrl, address }: ResultsEmailProps) {
  const videoHref = top.videoUrl || resultsUrl;
  return (
    <Html lang="en">
      <Head />
      <Preview>{`Here’s what came back, ${name}. Plus a short video from me.`}</Preview>
      <Body style={{ backgroundColor: BG, margin: 0, padding: '24px 0', fontFamily: font, color: NAVY }}>
        <Container style={{ width: '100%', maxWidth: 600, backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden' }}>
          {/* Header: logo and the red slash */}
          <Section style={{ padding: '22px 28px 18px', borderBottom: `6px solid ${RED}` }}>
            <Row>
              <Column><Img src={`${siteUrl}/email/logo.png`} width="132" height="68" alt="The Headtrash Dojo" /></Column>
              <Column align="right" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: RED }}>The Stress Test</Column>
            </Row>
          </Section>

          <Section style={{ padding: '26px 28px 4px' }}>
            <Text style={{ margin: 0, fontSize: 16, lineHeight: '24px' }}>Hey {name},</Text>
            <Text style={{ margin: '10px 0 0', fontSize: 16, lineHeight: '24px' }}>Thanks for taking the Stress Test. Here’s what came back.</Text>
            <Heading as="h1" style={{ margin: '22px 0 0', fontSize: 30, lineHeight: '36px', fontWeight: 800, color: NAVY }}>
              When the pressure’s on, {top.headline}.
            </Heading>
            <Text style={{ display: 'inline-block', margin: '12px 0 0', backgroundColor: RED, color: '#ffffff', fontSize: 14, fontWeight: 700, padding: '6px 14px' }}>
              Your strongest stress pattern
            </Text>
          </Section>

          {/* Video: emails can't play video, so a thumbnail links to it */}
          <Section style={{ padding: '20px 28px 0' }}>
            <Link href={videoHref}>
              <Img src={`${siteUrl}/email/video.png`} width="544" alt="Watch a short video from Joe about this pattern" style={{ width: '100%', maxWidth: 544, height: 'auto', borderRadius: 14, display: 'block' }} />
            </Link>
          </Section>

          <Section style={{ padding: '20px 28px 0' }}>
            <Text style={{ margin: 0, fontSize: 15, lineHeight: '24px' }}>{top.body}</Text>
            <Text style={{ margin: '18px 0 6px', fontSize: 15, fontWeight: 800 }}>You might notice</Text>
            {top.signs.map((s) => (
              <Text key={s} style={{ margin: 0, padding: '7px 0', borderTop: '1px solid #e3e7ec', fontSize: 14, lineHeight: '20px' }}>
                <span style={{ color: RED, fontWeight: 800 }}>✓</span>&nbsp;&nbsp;{s}
              </Text>
            ))}
          </Section>

          <Section style={{ padding: '16px 28px 0' }}>
            <Row>
              <Column style={{ width: '50%', paddingRight: 6, verticalAlign: 'top' }}>
                <div style={{ backgroundColor: BG, borderRadius: 12, padding: '12px 14px' }}>
                  <Text style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: RED }}>What it gives you</Text>
                  <Text style={{ margin: '4px 0 0', fontSize: 13, lineHeight: '19px' }}>{top.upside}</Text>
                </div>
              </Column>
              <Column style={{ width: '50%', paddingLeft: 6, verticalAlign: 'top' }}>
                <div style={{ backgroundColor: '#fde4e4', borderRadius: 12, padding: '12px 14px' }}>
                  <Text style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: RED }}>What it costs you</Text>
                  <Text style={{ margin: '4px 0 0', fontSize: 13, lineHeight: '19px' }}>{top.cost}</Text>
                </div>
              </Column>
            </Row>
            <Text style={{ margin: '14px 0 0', backgroundColor: BG, borderRadius: 12, padding: '12px 14px', fontSize: 14, lineHeight: '21px' }}>
              Here’s the honest bit. This isn’t a flaw. It probably got you a long way. It’s just running on fear instead of on purpose.
            </Text>
          </Section>

          {/* The full picture: bars made from table cells, which every email app shows */}
          <Section style={{ padding: '26px 28px 0' }}>
            <Heading as="h2" style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>The full picture</Heading>
            <Text style={{ margin: '4px 0 12px', fontSize: 13, lineHeight: '19px', color: MUTED }}>
              Everyone has all of these. The bars show how loud each one was in your answers. Your top two or three are the ones worth watching.
            </Text>
            {ranked.map(({ pattern, score }, i) => (
              <div key={pattern.key} style={{ marginBottom: 12 }}>
                <Row>
                  <Column style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? RED : NAVY }}>{pattern.short}</Column>
                  <Column align="right" style={{ fontSize: 13, fontWeight: 800, color: i === 0 ? RED : NAVY }}>{score}%</Column>
                </Row>
                <Text style={{ margin: '1px 0 4px', fontSize: 12, lineHeight: '16px', color: MUTED }}>{pattern.line}</Text>
                <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td width={`${Math.max(score, 2)}%`} style={{ height: 8, backgroundColor: i === 0 ? RED : NAVY, borderRadius: 8 }} />
                      <td style={{ height: 8, backgroundColor: BG }} />
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </Section>

          <Section style={{ padding: '10px 28px 0' }}>
            <div style={{ backgroundColor: BG, borderRadius: 12, padding: '14px 16px' }}>
              <Text style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Your inner critic: {critic}%</Text>
              <Text style={{ margin: '4px 0 0', fontSize: 13, lineHeight: '20px' }}>{INNER_CRITIC.body}</Text>
            </div>
          </Section>

          {/* The next step */}
          <Section style={{ padding: '24px 28px 0' }}>
            <div style={{ backgroundColor: RED, borderRadius: 16, padding: '22px 22px 24px', color: '#ffffff' }}>
              <Text style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fca5a5' }}>What now</Text>
              <Heading as="h2" style={{ margin: '4px 0 0', fontSize: 22, lineHeight: '28px', fontWeight: 800, color: '#ffffff' }}>Knowing the name isn’t the work.</Heading>
              <Text style={{ margin: '8px 0 16px', fontSize: 14, lineHeight: '21px', color: '#ffffff' }}>
                It’s a good start, though. Join me for a discovery webinar and we’ll go through your results together: what this pattern is costing you, and what a quieter version looks like.
              </Text>
              <Button href={bookingUrl} style={{ backgroundColor: '#ffffff', color: RED, fontSize: 15, fontWeight: 800, padding: '12px 22px', borderRadius: 999 }}>
                Book your discovery webinar
              </Button>
            </div>
          </Section>

          <Section style={{ padding: '22px 28px 26px' }}>
            <Text style={{ margin: 0, fontSize: 15, lineHeight: '23px' }}>Talk soon,<br />Joe</Text>
            <Text style={{ margin: '16px 0 0', fontSize: 13 }}>
              <Link href={resultsUrl} style={{ color: RED, fontWeight: 700 }}>View your results online</Link>
            </Text>
          </Section>

          <Section style={{ backgroundColor: NAVY, padding: '18px 28px' }}>
            <Text style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#ffffff' }}>Master yourself. Lead with intention.</Text>
            <Text style={{ margin: '2px 0 0', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#fca5a5' }}>Be sage. Be resilient. Be the habit.</Text>
            <Hr style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '14px 0' }} />
            <Text style={{ margin: 0, fontSize: 11, lineHeight: '16px', color: 'rgba(255,255,255,0.7)' }}>
              You’re getting this because you took the Stress Test and asked for your results. This is a mirror, not a diagnosis.
              {address ? ` Headtrash Dojo, ${address}.` : ''}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export type { PatternKey };
