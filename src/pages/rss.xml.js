import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export async function GET(context) {
  const artikel = (await getCollection('artikel')).sort((a, b) => +b.data.datum - +a.data.datum);
  return rss({
    title: 'Selbst gfaltet',
    description: 'Falt dir deine eigene KI. Anleitungen, Messungen und Pannen aus der Werkstatt.',
    site: context.site,
    items: artikel.map((a) => ({ title: a.data.titel, pubDate: a.data.datum, description: a.data.beschreibung, link: `/blog/${a.id}/` })),
    customData: '<language>de-de</language>',
    stylesheet: '/rss.xsl',
  });
}
