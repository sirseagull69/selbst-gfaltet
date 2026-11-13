import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { OG_SEITEN, OG_ARTIKEL_ORI } from '../../og';

type Daten = { kicker: string; titel: string; ori: string; unter?: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const artikel = await getCollection('artikel');
  const seiten = Object.entries(OG_SEITEN).map(([bild, d]) => ({ params: { bild }, props: d }));
  const blog = artikel.map((a) => ({
    params: { bild: `blog--${a.id}` },
    props: { kicker: 'Aus dem Blog', titel: a.data.titel, ori: OG_ARTIKEL_ORI[a.id] ?? a.data.ori, unter: a.data.kurz } as Daten,
  }));
  return [...seiten, ...blog];
};

const nm = (p: string) => readFileSync(resolve('node_modules', p));
const FONTS = [
  { name: 'Bricolage', data: nm('@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff'), weight: 800 as const, style: 'normal' as const },
  { name: 'Serif', data: nm('@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Caveat', data: nm('@fontsource/caveat/files/caveat-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];

const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
// Ori als Standbild: pro Animation der Moment mit der meisten Pose (vorab aus public/anim gerendert, src/og-ori)
function oriBild(name: string) {
  let p = resolve('src/og-ori', `${name}.png`);
  if (!existsSync(p)) p = resolve('src/og-ori', 'ruhezustand.png');
  return `data:image/png;base64,${readFileSync(p).toString('base64')}`;
}
const ECKE = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="0,0 100,0 100,100" fill="#ff8a4c"/><polygon points="38,0 100,0 100,62" fill="#c2410c"/><polygon points="0,0 38,0 100,62 100,100" fill="#ffc9a8" opacity=".35"/></svg>');
const FALTEN = svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><g stroke="#ddd5c4" stroke-width="2" stroke-dasharray="10 9" fill="none"><line x1="0" y1="630" x2="1200" y2="0"/><line x1="0" y1="315" x2="1200" y2="315"/></g></svg>');

// kleines Hilfsding statt React
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) =>
  ({ type, props: { style, children, ...extra } });

export const GET: APIRoute = async ({ props }) => {
  const d = props as Daten;
  const gross = d.unter ? (d.titel.length > 40 ? 46 : 52) : (d.titel.length > 40 ? 56 : 64);
  const baum = h('div', {
    width: 1200, height: 630, display: 'flex', position: 'relative', background: '#f5f4ee',
    backgroundImage: 'linear-gradient(rgba(40,60,110,.07) 2px, transparent 2px), linear-gradient(90deg, rgba(40,60,110,.07) 2px, transparent 2px)',
    backgroundSize: '36px 36px', fontFamily: 'Serif', color: '#1d2742',
  }, [
    h('img', { position: 'absolute', left: 0, top: 0, width: 1200, height: 630, opacity: 0.6 }, undefined, { src: FALTEN, width: 1200, height: 630 }),
    h('img', { position: 'absolute', right: 0, top: 0, width: 170, height: 170 }, undefined, { src: ECKE, width: 170, height: 170 }),
    // Kopf
    h('div', { position: 'absolute', left: 64, top: 44, display: 'flex', alignItems: 'center', gap: 12 }, [
      h('img', { width: 60, height: 60 }, undefined, { src: oriBild('ruhezustand'), width: 60, height: 60 }),
      h('div', { fontFamily: 'Bricolage', fontSize: 32 }, 'Selbst gfaltet'),
    ]),
    // Blatt mit Titel
    h('div', {
      position: 'absolute', left: 64, top: 128, width: 640, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: '#ffffff', border: '2px solid #1d2742', borderRadius: 6, padding: '44px 44px 40px',
      boxShadow: '8px 8px 0 rgba(29,39,66,.12)',
    }, [
      h('div', { position: 'absolute', top: -18, left: 260, width: 170, height: 34, background: '#ffe36e', opacity: 0.92, transform: 'rotate(-3deg)' }),
      h('div', { fontFamily: 'Caveat', fontSize: 38, color: '#c2410c', marginBottom: 8 }, d.kicker),
      h('div', { fontFamily: 'Bricolage', fontSize: gross, lineHeight: 1.06, letterSpacing: -1 }, d.titel),
      ...(d.unter ? [h('div', { fontSize: 24, lineHeight: 1.35, color: '#5d6478', marginTop: 16 }, d.unter)] : []),
    ]),
    // Ori
    h('img', { position: 'absolute', right: 50, top: 150, width: 330, height: 330 }, undefined, { src: oriBild(d.ori), width: 330, height: 330 }),
    // Fuß
    h('div', { position: 'absolute', left: 64, right: 64, bottom: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #d9d8cf', paddingTop: 14 }, [
      h('div', { fontSize: 26, color: '#5d6478' }, 'selbstgfaltet.de'),
      h('div', { fontFamily: 'Caveat', fontSize: 34, color: '#c2410c' }, 'Falt dir deine eigene KI'),
    ]),
  ]);
  const svg = await satori(baum as any, { width: 1200, height: 630, fonts: FONTS });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
