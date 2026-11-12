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
      { titel: 'Meine KI surft selbst' },
      { titel: 'Sicher von unterwegs erreichbar machen' },
    ],
  },
  {
    nr: '02', titel: 'Claude Code ohne Informatikstudium', kurz: 'Eigene Werkzeuge bauen, auch wenn du nie programmieren gelernt hast. Und wo man aufpassen muss.',
    chips: ['Einsteiger', 'Code'],
    teile: [
      { titel: 'Wie ich ohne Ausbildung programmieren gelernt habe' },
      { titel: 'Dein erstes kleines Tool' },
      { titel: 'Was die KI nicht für dich entscheiden sollte' },
    ],
  },
];
