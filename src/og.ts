// Vorschaubilder (Open Graph) für geteilte Links. Schlüssel = Pfad ohne Schrägstriche.
// Artikel kommen automatisch aus der Sammlung, hier nur die festen Seiten.
export const OG_SEITEN: Record<string, { kicker: string; titel: string; ori: string }> = {
  start: { kicker: 'Gebaut, gemessen, aufgeschrieben', titel: "Falt dir deine eigene KI. Ich zeig dir, wie's geht.", ori: 'ruhezustand' },
  anleitungen: { kicker: 'Der Reihe nach', titel: 'Faltanleitungen: Eigene KI Schritt für Schritt', ori: 'schreibt' },
  blog: { kicker: 'Alles aus der Werkstatt', titel: 'Eigene KI bauen, messen, absichern', ori: 'liest' },
  werkzeuge: { kicker: 'Planen, ausprobieren, mitnehmen', titel: 'Werkzeuge für deine eigene KI', ori: 'rechnet' },
  werkstatt: { kicker: 'Planen, bevor du faltest', titel: 'Die Werkstatt: Stell dir deine eigene KI zusammen', ori: 'vergleicht' },
  downloads: { kicker: 'Kostenlos, mit Sicherheits-Check', titel: 'PC-Check, Modell-Prüfstand und Falt-TÜV', ori: 'sicher' },
  faltplan: { kicker: 'Zum Ausdrucken', titel: 'Der Faltplan: 10 Schritte, 10 Fallen', ori: 'fertig' },
  spickzettel: { kicker: 'Zum Ausdrucken', titel: 'Spickzettel für Ollama und Claude Code', ori: 'terminal' },
  origami: { kicker: 'Der Bauplan hinter Ori', titel: 'origami: deine KI, bei dir zu Hause.', ori: 'sassy' },
  ueber: { kicker: "Servus, ich bin's", titel: 'Quereinsteiger, ohne Studium, mit eigener KI', ori: 'winkt' },
};

// Eigene Ori pro Artikel-Vorschaubild, keine doppelt (auch nicht mit den Seiten oben)
export const OG_ARTIKEL_ORI: Record<string, string> = {
  'erstes-tool': 'senden',
  'in-gemma-reingeschaut': 'wissen',
  'ki-surft-selbst': 'websuche',
  'lokal-oder-claude': 'uebergabe-claude',
  'modell-dreikampf': 'triumph',
  'programmieren-ohne-ausbildung': 'start-landung',
  'schutzschicht': 'wartet-freigabe',
  'von-unterwegs': 'login',
  'was-die-ki-nicht-entscheidet': 'seufzt',
  'wie-origami-lernt': 'gemerkt',
};

export function ogSchluessel(pfad: string): string {
  return pfad.replace(/^\/+|\/+$/g, '').replace(/\//g, '--') || 'start';
}
