export const KATEGORIEN: Record<string, string> = {
  lokal: 'Lokale KI',
  sicherheit: 'Sicherheit',
  messung: 'Messungen',
  code: 'Claude Code',
  panne: 'Werkstatt-Panne',
};
export function datumDE(d: Date) {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
