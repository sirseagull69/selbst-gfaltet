// Lernwege: "slug" verweist auf einen erschienenen Artikel, sonst geplant
export const LERNWEGE = [
  {
    nr: '01', titel: 'Eigene KI bauen: Falt dir deine eigene KI', kurz: 'Von „Welches Modell passt?“ bis zur KI, die sicher auf deinem PC arbeitet. Nach dem Bauplan von origami, mit echten Messwerten. Am besten, wenn du mit Claude Code schon mal was gebaut hast, siehe Anleitung 02.',
    chips: ['Für Bastler', 'Windows'],
    teile: [
      { titel: "Lokale KI-Modelle im Test: Drei Modelle, eine Grafikkarte", slug: 'modell-dreikampf' },
      { titel: "Gemma 4 von innen: Ich hab meiner KI ins Gehirn geschaut", slug: 'in-gemma-reingeschaut' },
      { titel: "Lokale KI oder Claude? Wie meine KI entscheidet, wer antwortet", slug: 'lokal-oder-claude' },
      { titel: "KI-Agent absichern: Neun Lagen Papier zwischen KI und PC", slug: 'schutzschicht' },
      { titel: "KI-Agent im Browser: Meine KI surft selbst", slug: 'ki-surft-selbst' },
      { titel: "Lokale KI von unterwegs nutzen: PC daheim, KI dabei", slug: 'von-unterwegs' },
    ],
  },
  {
    nr: '02', titel: 'Claude Code für Einsteiger: ohne Informatikstudium', kurz: 'Eigene Werkzeuge bauen, auch wenn du nie programmieren gelernt hast. Und wo man aufpassen muss.',
    chips: ['Einsteiger', 'Code'],
    teile: [
      { titel: "Programmieren lernen mit KI: Wie ich's ohne Ausbildung gelernt hab", slug: 'programmieren-ohne-ausbildung' },
      { titel: "Claude Code Anleitung: Dein erstes kleines Tool", slug: 'erstes-tool' },
      { titel: "Vibe Coding mit Claude Code: Was die KI nicht entscheiden sollte", slug: 'was-die-ki-nicht-entscheidet' },
    ],
  },
];
