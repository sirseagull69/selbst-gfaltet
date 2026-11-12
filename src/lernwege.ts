// Lernwege: "slug" verweist auf einen erschienenen Artikel, sonst geplant
export const LERNWEGE = [
  {
    nr: '01', titel: 'Falt dir deine eigene KI', kurz: 'Vom „Was ist Ollama?“ bis zum eigenen Assistenten, den du vom Handy aus erreichst. Nach dem Bauplan von origami.',
    chips: ['Einsteiger', 'Windows'],
    teile: [
      { titel: 'Ich hab mir eine KI gebaut, die auf meinem PC wohnt' },
      { titel: 'Welche Grafikkarte reicht? 8 GB gegen 24 GB' },
      { titel: 'Eine eigene Chat-Oberfläche bauen' },
      { titel: 'Werkzeuge: Die KI darf Dateien lesen, aber nicht löschen' },
      { titel: 'Freigaben: Die KI fragt, bevor sie etwas Gefährliches tut' },
      { titel: 'Sicher von unterwegs erreichbar machen' },
    ],
  },
  {
    nr: '02', titel: 'Claude Code ohne Informatikstudium', kurz: 'Eigene Werkzeuge bauen, auch wenn du nie programmieren gelernt hast. Und wo man aufpassen muss.',
    chips: ['Einsteiger', 'Code'],
    teile: [
      { titel: 'Wie ich ohne Ausbildung programmieren gelernt habe' },
      { titel: 'Dein erstes kleines Tool' },
      { titel: 'Git verstehen, ohne Angst vor dem Terminal' },
      { titel: 'Online stellen: Vercel und Supabase in einfach' },
      { titel: 'Was die KI nicht für dich entscheiden sollte' },
    ],
  },
  {
    nr: '03', titel: 'Warum macht meine KI das?', kurz: 'Problemdiagnose: Sie ignoriert Regeln, ist langsam, hängt sich auf. Ursache finden, beheben.',
    chips: ['Hilfe', 'Nachschlagen'],
    teile: [
      { titel: 'Sie ignoriert meine Regeln' },
      { titel: 'Die erste Antwort dauert ewig, danach geht\'s schnell' },
      { titel: 'Sie schreibt nur noch Leerzeilen und alles hängt' },
      { titel: 'Sie wiederholt sich oder schreibt ihren Namen drunter' },
      { titel: 'Sie schreibt Werkzeug-Aufrufe als Text, statt sie auszuführen' },
      { titel: 'Sie denkt endlos nach und antwortet nie' },
    ],
  },
];
