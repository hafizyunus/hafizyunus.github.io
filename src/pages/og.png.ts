// Share image (1200×630) shown when a link to the site is posted on LinkedIn, WhatsApp, etc.
// Generated at build time from content/site.yaml, so it updates with your name/headline.
import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { config } from '../lib/site';

const font = (pkg: string, file: string) => readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);

const COLORS = { paper: '#ffffff', ink: '#1a1a1a', muted: '#6f6c68', rule: '#e8e6e1', accent: '#2f5d50' };

// satori takes a React-like element tree; plain objects avoid needing JSX here.
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async () => {
  const host = new URL(config.site.url).host;

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '80px 90px',
      background: COLORS.paper,
      borderLeft: `14px solid ${COLORS.accent}`,
    },
    [
      h('div', { display: 'flex' }),
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h('div', { fontFamily: 'Newsreader', fontSize: 104, fontWeight: 500, color: COLORS.ink, lineHeight: 1.05 }, `${config.person.name}.`),
        h('div', { marginTop: 28, fontFamily: 'Inter', fontSize: 34, color: COLORS.muted, maxWidth: 940, lineHeight: 1.4 }, config.site.description),
      ]),
      h('div', { display: 'flex', fontFamily: 'Inter', fontSize: 26, color: COLORS.accent }, host),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Newsreader', data: font('newsreader', 'newsreader-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'Newsreader', data: font('newsreader', 'newsreader-latin-500-normal.woff'), weight: 500, style: 'normal' },
      { name: 'Inter', data: font('inter', 'inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
    ],
  });
  const png = new Resvg(svg).render().asPng();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
