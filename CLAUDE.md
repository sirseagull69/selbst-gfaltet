# Selbst gfaltet – Regeln für Claude

Blog von Nils Pohler: „Falt dir deine eigene KI“. Zeigt Schritt für Schritt, wie man sich einen eigenen KI-Assistenten nach dem Bauplan von **origami** baut. Live: https://selbstgfaltet.de (Vercel baut jeden Push auf `main` automatisch).

## Technik
- Astro 5, Artikel als MDX in `src/content/artikel/`, Schema in `src/content.config.ts`.
- Lernwege in `src/lernwege.ts` (Teil mit `slug` = erschienen), Glossar in `src/glossar.ts`.
- Bausteine in `src/components/`: `KurzGesagt`, `AblaufOrigami` (Schaubild), `WasMacht`, `Schritte` (mit Terminal-Tipp-Animation), `Messung`, `VorherNachher`, `OriSagt`, `Checkliste` (Ori jubelt bei allen Haken).
- Ori-Animationen in `public/anim/` (`-abendrot` = heller Modus, `-hell` = dunkler Modus). Quelle ist origami (`public/anim/` dort). Ori sieht überall exakt gleich aus, keine eigenen Vogel-Zeichnungen.
- Schriften selbst gehostet über `@fontsource` (keine Google-Fonts-Links, Datenschutz).
- Prüfen: `npm run build` muss ohne Fehler durchlaufen.

## Inhalt
- **Ton:** Du-Form, locker, kurz, ehrlich, ein bisschen Schwäbisch. Pannen gehören dazu. Kein Marketing-Sprech, keine Emojis.
- **Jeder Artikel** hat mindestens: `KurzGesagt`, einen visuellen Baustein (Schaubild, `WasMacht`, `Messung` oder `VorherNachher`), `Schritte` wenn man etwas nachbauen kann, eine `Checkliste` am Ende, 1–2 `OriSagt`.
- **Ori:** Papiervogel, sassy wie GLaDOS, trocken, nie gemein. Kommentiert am Rand (`ori`, `oriSpruch` im Frontmatter).
- **Nur echte Zahlen** aus Nils' Messungen bzw. der origami-Doku. Nichts erfinden, nichts schätzen ohne es zu sagen.
- **Keine Firmendaten:** Arbeitgeber, Kollegen, Dienstleister, Server, interne Vorfälle nie nennen. Keine Adressen, Zugangsdaten oder die Fernzugriffs-Adresse von origami.
- Fachbegriffe beim ersten Auftauchen einfach erklären, neue Begriffe ins Glossar.

## Ablauf für neue Artikel
1. Material kommt aus dem Änderungsverlauf der origami-Doku (claude.ai-Projekt „Origami“, Doku „Dokumentation“).
2. Entwurf immer in einem eigenen Branch `entwurf/<slug>`, nie direkt auf `main`.
3. Nils liest, ändert den Ton und gibt frei. Erst dann nach `main`.

## Offen
- Domain selbstgfaltet.de (IONOS) ist gekauft, `fragen@` leitet an Nils weiter. `noindex` ist raus.
- Newsletter (z. B. Brevo) erst, wenn gewünscht.
