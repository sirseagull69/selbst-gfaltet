// Lernwege: "slug" verweist auf einen erschienenen Artikel, sonst geplant
export const LERNWEGE = [
  {
    nr: '01', titel: 'Falt dir deine eigene KI', kurz: 'Von „Welches Modell passt?“ bis zur KI, die sicher auf deinem PC arbeitet. Nach dem Bauplan von origami, mit echten Messwerten.',
    chips: ['Einsteiger', 'Windows'],
    teile: [
      { titel: 'Drei KI-Modelle, eine Grafikkarte: Wer taugt was?', slug: 'modell-dreikampf' },
      { titel: 'Ich hab meiner KI ins Gehirn geschaut', slug: 'in-gemma-reingeschaut' },
      { titel: 'Lokal oder Claude? Wie meine KI entscheidet, wer antwortet', slug: 'lokal-oder-claude' },
      { titel: 'Neun Lagen Papier zwischen meiner KI und meinem PC', slug: 'schutzschicht' },
      { titel: 'Meine KI surft selbst', slug: 'ki-surft-selbst' },
      { titel: 'Mein PC steht zu Hause, meine KI hab ich dabei', slug: 'von-unterwegs' },
    ],
  },
  {
    nr: '02', titel: 'Claude Code ohne Informatikstudium', kurz: 'Eigene Werkzeuge bauen, auch wenn du nie programmieren gelernt hast. Und wo man aufpassen muss.',
    chips: ['Einsteiger', 'Code'],
    teile: [
      { titel: 'Wie ich ohne Ausbildung programmieren gelernt hab', slug: 'programmieren-ohne-ausbildung' },
      { titel: 'Dein erstes kleines Tool, ganz ohne Abo', slug: 'erstes-tool' },
      { titel: 'Was die KI nicht für dich entscheiden sollte', slug: 'was-die-ki-nicht-entscheidet' },
    ],
  },
];
