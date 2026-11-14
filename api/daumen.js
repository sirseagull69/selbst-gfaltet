// Daumen hoch/runter: der Browser fragt nur selbstgfaltet.de, diese Funktion (Vercel, Frankfurt) reicht
// die Stimme an die Datenbank weiter. So bekommt kein Dritter die IP der Leser zu sehen.
const RPC = 'https://ovosbxkwqgxxfekrtlov.supabase.co/rest/v1/rpc/blog_daumen';
const KEY = process.env.DAUMEN_KEY || 'sb_publishable_cvKxZ4tvDpez0OWyf-C-og_raV3cGVZ';

export const config = { regions: ['fra1'] };

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ fehler: 'nur POST' }); }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
  const slug = b && b.slug, neu = Number(b && b.neu), vorher = Number(b && b.vorher);
  if (typeof slug !== 'string' || !/^[a-z0-9-]{1,80}$/.test(slug) || ![-1, 0, 1].includes(neu) || ![-1, 0, 1].includes(vorher) || neu === vorher) {
    return res.status(400).json({ fehler: 'ungültig' });
  }
  try {
    const r = await fetch(RPC, { method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_slug: slug, p_neu: neu, p_vorher: vorher }) });
    const d = await r.json();
    if (!r.ok || !Array.isArray(d) || !d[0]) return res.status(502).json({ fehler: 'Datenbank' });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ hoch: d[0].hoch });
  } catch {
    return res.status(502).json({ fehler: 'Datenbank' });
  }
}
