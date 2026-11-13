// Vorschaubilder (Open Graph) für geteilte Links. Schlüssel = Pfad ohne Schrägstriche.
// Artikel kommen automatisch aus der Sammlung, hier nur die festen Seiten.
export const OG_SEITEN: Record<string, { kicker: string; titel: string; ori: string }> = {
  start: { kicker: 'Gebaut, gemessen, aufgeschrieben', titel: "Falt dir deine eigene KI. Ich zeig dir, wie's geht.", ori: 'start-landung' },
  anleitungen: { kicker: 'Der Reihe nach', titel: 'Faltanleitungen: Eigene KI Schritt für Schritt', ori: 'schreibt' },
  blog: { kicker: 'Alles aus der Werkstatt', titel: 'Eigene KI bauen, messen, absichern', ori: 'liest' },
  werkzeuge: { kicker: 'Planen, ausprobieren, mitnehmen', titel: 'Werkzeuge für deine eigene KI', ori: 'rechnet' },
  werkstatt: { kicker: 'Planen, bevor du faltest', titel: 'Die Werkstatt: Stell dir deine eigene KI zusammen', ori: 'plant' },
  downloads: { kicker: 'Kostenlos, mit Sicherheits-Check', titel: 'PC-Check, Modell-Prüfstand und Falt-TÜV', ori: 'sicherheit' },
  faltplan: { kicker: 'Zum Ausdrucken', titel: 'Der Faltplan: 10 Schritte, 10 Fallen', ori: 'fertig' },
  spickzettel: { kicker: 'Zum Ausdrucken', titel: 'Spickzettel für Ollama und Claude Code', ori: 'terminal' },
  origami: { kicker: 'Der Bauplan hinter Ori', titel: 'origami: deine KI, bei dir zu Hause.', ori: 'sassy' },
  ueber: { kicker: "Servus, ich bin's", titel: 'Quereinsteiger, ohne Studium, mit eigener KI', ori: 'winkt' },
};

// Eigene Ori pro Artikel-Vorschaubild, keine doppelt (auch nicht mit den Seiten oben)
export const OG_ARTIKEL_ORI: Record<string, string> = {
  'erstes-tool': 'webseite',
  'in-gemma-reingeschaut': 'spiegel',
  'ki-surft-selbst': 'browser',
  'lokal-oder-claude': 'uebergabe-claude',
  'modell-dreikampf': 'misst',
  'programmieren-ohne-ausbildung': 'lernt',
  'schutzschicht': 'wartet-freigabe',
  'von-unterwegs': 'login',
  'was-die-ki-nicht-entscheidet': 'denkt-nach-3',
  'wie-origami-lernt': 'gemerkt',
};

export function ogSchluessel(pfad: string): string {
  return pfad.replace(/^\/+|\/+$/g, '').replace(/\//g, '--') || 'start';
}
