# Selbst gfaltet – Regeln für Claude

> **Quelle der Wahrheit ist Notion:** Seite „Selbst gfaltet“ (https://app.notion.com/p/416a871cd769810eb3e7f4a390e6eafd) mit der Datenbank „Artikel“ (Redaktionsplan). Vor jeder Arbeit dort lesen und danach dort aktualisieren (Status, PR-Link, neue Regeln, Ideen). Bei Widerspruch gilt Notion. Diese Datei wird mitgezogen.

Blog von Nils Pohler: „Falt dir deine eigene KI“. Zeigt Schritt für Schritt, wie man sich einen eigenen KI-Assistenten nach dem Bauplan von **origami** baut. Live: https://www.selbstgfaltet.de (Vercel baut jeden Push auf `main` automatisch).

## Technik
- Astro 5, Artikel als MDX in `src/content/artikel/`, Schema in `src/content.config.ts`.
- Werkzeuge in `src/pages/werkzeuge.astro` (Token-Uhr, Lokal oder Claude?, Passt das auf meinen PC?, Prompt-Baukasten, Fehler-Diagnose, Glossar), Spickzettel in `src/pages/spickzettel.astro`. Downloads in `src/pages/downloads.astro`, Dateien in `public/downloads/` (ki-check.ps1, modell-pruefstand.ps1 frei; Startpaket (Dateiname steht in `mail/willkommen.html`) mit dem origami-Bauplan nur über die Willkommens-Mail, nirgends auf der Seite verlinken). Skripte als UTF-8 mit BOM und CRLF speichern (sonst kaputte Umlaute in Windows PowerShell 5.1), nur lesend, nur localhost. Alles läuft im Browser, nichts wird verschickt. Messwerte nur echte aus origami.
- Lernwege in `src/lernwege.ts` (Teil mit `slug` = erschienen), Glossar in `src/glossar.ts`.
- Bausteine in `src/components/`: `KurzGesagt`, `AblaufOrigami` (Schaubild), `WasMacht`, `Schritte` (mit Terminal-Tipp-Animation), `Messung`, `VorherNachher`, `OriSagt`, `Checkliste` (Ori jubelt bei allen Haken).
- Ori-Animationen in `public/anim/` (`-abendrot` = heller Modus, `-hell` = dunkler Modus). Quelle ist origami (`public/anim/` dort). Ori sieht überall exakt gleich aus, keine eigenen Vogel-Zeichnungen.
- Schriften selbst gehostet über `@fontsource` (keine Google-Fonts-Links, Datenschutz).
- Prüfen: `npm run build` muss ohne Fehler durchlaufen.

## Inhalt
- **Ton:** Du-Form, locker, kurz, ehrlich, ein bisschen Schwäbisch. Pannen gehören dazu. Kein Marketing-Sprech, keine Emojis.
- **Jeder Artikel** hat mindestens: `KurzGesagt`, einen visuellen Baustein (Schaubild, `WasMacht`, `Messung` oder `VorherNachher`), `Schritte` wenn man etwas nachbauen kann, eine `Checkliste` am Ende, 1–2 `OriSagt`.
- **Ori:** Spitzname von origami (die KI heißt origami, Ori ist der Kosename). origami ist eine **Sie**: sie, ihr, „die KI“, nie „er“ oder „der Assistent“. Papiervogel, sassy wie GLaDOS, trocken, nie gemein. Kommentiert am Rand (`ori`, `oriSpruch` im Frontmatter).
- **Nur echte Zahlen** aus Nils' Messungen bzw. der origami-Doku. Nichts erfinden, nichts schätzen ohne es zu sagen.
- **Keine Firmendaten:** Arbeitgeber, Kollegen, Dienstleister, Server, interne Vorfälle nie nennen. Keine Adressen, Zugangsdaten oder die Fernzugriffs-Adresse von origami.
- Fachbegriffe beim ersten Auftauchen einfach erklären, neue Begriffe ins Glossar.

## Ablauf für neue Artikel
1. Material kommt aus dem Änderungsverlauf der origami-Doku (claude.ai-Projekt „Origami“, Doku „Dokumentation“). Aus diesem Projekt heraus ist die Doku nicht lesbar. Lesbar sind Nils' Artifacts, vor allem „origami von innen“ (Aufbau, Aufgabenteilung, Werkzeuge, Schutzschicht, Gedächtnis, Netz, Speicher, Pläne) und „Modell-Dreikampf origami“. Fehlt was, Nils fragen.
2. Entwurf immer in einem eigenen Branch `entwurf/<slug>`, nie direkt auf `main`, dazu einen Pull Request anlegen.
3. Nils liest, ändert den Ton und gibt frei. Sagt er „passt“, merged Claude den PR selbst.
4. Persönliches von Nils darf rein (Werdegang, Findus), aber nichts von der Arbeit. lootkurs.de kommt auf dem Blog nicht namentlich vor, höchstens als „Preisvergleichsprogramm auf Basis von …“. Pokémon-Spiele und -Projekte kommen nicht vor.
5. Seit dem Neustart im Nov 2026: keine Fehlersuche-Artikel mehr, lieber coole Artikel und mehr über Nils selbst. Persönliches bei Bedarf bei Nils erfragen.
6. Nach jeder Änderung den Redaktionsplan in Notion aktualisieren (Status, PR-Link).

## Erschienen
- `modell-dreikampf`: Gemma 4 26B gegen Qwen3.6 35B und Qwen3.5 9B (Test vom 9.11.)
- `lokal-oder-claude`: Aufgabenteilung in drei Stufen, Gemma gegen Claude (Test vom 8.11.)
- `in-gemma-reingeschaut`: 30 Schichten, 128 Experten, Röntgen, Speicher und Tempo
- `schutzschicht`: die neun Schutzlagen, Erlaubnisliste statt Sperrliste
- `ki-surft-selbst`: Suche, Seiten lesen, Browser per Playwright, Absenden-Sperre
- `von-unterwegs`: Tunnel, Login, nur-lokal-Bereiche, Tagesablauf, Windows-Grenzen (Ports, Auslagerungsdatei)
- `programmieren-ohne-ausbildung`, `erstes-tool`, `was-die-ki-nicht-entscheidet`: Lernweg 02 (Claude Code ohne Informatikstudium)
- Lernweg 01 (6 Teile) und Lernweg 02 (3 Teile) sind komplett erschienen.
- Die ersten vier Artikel (108 Sekunden, Leerzeilen-Panne, Regeln in den Code, Eigene KI auf dem PC) wurden am 12.11. bewusst gelöscht.

## Ideen
- Lernweg 03 „Warum macht meine KI das?“ wurde am 12.11. rausgenommen (die Artikel dazu waren gelöscht). Kann zurückkommen, wenn es wieder Fehler-Artikel gibt.
- Wie origami lernt: Daumen runter, Fixes, später Training

## Domain & Mail
- Domain selbstgfaltet.de liegt bei IONOS. DNS: A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com. Vercel leitet selbstgfaltet.de auf www um.
- `fragen@selbstgfaltet.de` ist eine IONOS-Weiterleitung (kein Postfach, man kann davon nicht senden). Mail-Einträge (MX, SPF, DKIM, DMARC) bei IONOS nicht anfassen.
- `noindex` ist raus, Google darf die Seite aufnehmen. Sitemap: `/sitemap-index.xml`, steht auch in `public/robots.txt` und ist in der Google Search Console eingereicht (Bestätigung per TXT-Eintrag bei IONOS, nicht löschen).
- Besucherzählung: Vercel Web Analytics (ohne Cookies), steht in der Datenschutzerklärung. Neue Dienste immer dort nachtragen.

- Ori am Rand wandert mit: `<OriRand ori="…" spruch="…" />` unter eine Überschrift setzen, ab da wechselt Ori Animation und Spruch. Nur vorhandene Animationen aus `public/anim/` nehmen. Jeder Artikel bekommt eigene, zum Abschnitt passende Wechsel und Sprüche, kein Spruch doppelt über alle Artikel.

## Newsletter
- Brevo (Brevo GmbH, Berlin), Double-Opt-in. Anmeldefeld `src/components/Newsletter.astro` unter jedem Artikel und auf der Startseite.
- Die Formular-Adresse aus Brevo steht in `src/newsletter.ts`. Solange leer, ist das Feld unsichtbar und der Datenschutz-Abschnitt fehlt. Seit 12.11. eingetragen und live.
- Verschickt wird nur bei neuen Artikeln.
- Vorlage für die Bestätigungs-Mail: `mail/bestaetigung.html` (Platzhalter `{{ doubleoptin }}`), Bild `public/mail/ori-winkt.png`. Absender soll `fragen@selbstgfaltet.de` sein, nicht die Gmail-Adresse.
- Willkommens-Mail nach Bestätigung (Brevo „Finale Bestätigungs-E-Mail“): `mail/willkommen.html`, mit dem Link zum Startpaket (origami-Bauplan, exklusiv für Newsletter-Leser). KI-Check und Prüfstand bleiben frei.
- Weiterleitungen aus Brevo: nach Absenden `/newsletter/fast-geschafft`, nach Bestätigung `/newsletter/dabei` (nicht in der Sitemap).
