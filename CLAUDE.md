# Selbst gfaltet – Regeln für Claude

> **Quelle der Wahrheit ist Notion:** Seite „Selbst gfaltet“ (https://app.notion.com/p/416a871cd769810eb3e7f4a390e6eafd) mit der Datenbank „Artikel“ (Redaktionsplan). Vor jeder Arbeit dort lesen und danach dort aktualisieren (Status, PR-Link, neue Regeln, Ideen). Bei Widerspruch gilt Notion. Diese Datei wird mitgezogen.

Blog von Nils Pohler: „Falt dir deine eigene KI“. Zeigt Schritt für Schritt, wie man sich einen eigenen KI-Assistenten nach dem Bauplan von **origami** baut. Live: https://www.selbstgfaltet.de (Vercel baut jeden Push auf `main` automatisch).

## Technik
- Astro 5, Artikel als MDX in `src/content/artikel/`, Schema in `src/content.config.ts`.
- Werkzeuge in `src/pages/werkzeuge.astro` (oben Übersicht in drei Gruppen Planen / Ausprobieren / Mitnehmen, jedes Werkzeug genau einmal verlinkt; darunter Lokal oder Claude?, Passt das auf meinen PC?, Prompt-Baukasten, Glossar; Fehler-Diagnose am 12.11. entfernt), Spickzettel in `src/pages/spickzettel.astro`. Werkstatt (15 Wünsche in Alltagssprache, 25 Bauteile nur aus echten origami-Funktionen, 5 Vorlagen; daraus Faltplan mit Schaubild „Deine KI“ nach Nils' Canvas-Entwurf, Abhaken, Plan im Browser gespeichert) in `src/pages/werkstatt.astro` + `src/components/werkstatt/DeineKI.astro`; die fertige CLAUDE.md bleibt exklusiv im Startpaket. Downloads in `src/pages/downloads.astro`, Dateien in `public/downloads/` (ki-check.ps1, modell-pruefstand.ps1, falt-tuev.ps1 frei, jedes mit `SicherheitsCheck`-Kasten: prüft beim Build automatisch auf Löschen, Installieren, Systemänderungen, Netz außer localhost, Admin-Rechte; fällt eine Prüfung durch, bricht der Build ab. Neue Skripte bekommen immer diesen Kasten; Startpaket (Dateiname steht in `mail/willkommen.html`) mit dem origami-Bauplan nur über die Willkommens-Mail, nirgends auf der Seite verlinken). Skripte als UTF-8 mit BOM und CRLF speichern (sonst kaputte Umlaute in Windows PowerShell 5.1), nur lesend, nur localhost. Alles läuft im Browser, nichts wird verschickt. Messwerte nur echte aus origami.
- Lernwege heißen auf der Seite „Faltanleitungen“ (Seite `/anleitungen`, `/lernwege` leitet um). Daten in `src/lernwege.ts` (Teil mit `slug` = erschienen), Glossar in `src/glossar.ts`.
- Eigenes Profil: nicht zu nah an anderen Blogs bauen. Eigene Begriffe aus der Origami-Welt (Faltplan, Faltanleitung, Werkstatt), Startseite führt zum Faltplan, keine Ortsangabe (Gäu) auf der Seite außer im Impressum.
- Bausteine in `src/components/`: `KurzGesagt`, `AblaufOrigami` (Schaubild), `WasMacht`, `Schritte` (mit Terminal-Tipp-Animation), `Messung`, `VorherNachher`, `OriSagt`, `Checkliste` (Ori jubelt bei allen Haken).
- Ori-Animationen in `public/anim/` (`-abendrot` = heller Modus, `-hell` = dunkler Modus). Quelle ist origami (`public/anim/` dort) bzw. der Canvas „origami Animationen v2“ (alle 84 Animationen, Seite „Alle Animationen“). In `public/anim/` liegen 80 der 84 (alle außer den Kickbase-Animationen), möglichst abwechseln statt immer dieselben. Ori sieht überall exakt gleich aus, keine eigenen Vogel-Zeichnungen. Alle Animationen laufen in Schleife (`repeatCount="indefinite"`, nie `fill="freeze"`).
- Schriften selbst gehostet über `@fontsource` (keine Google-Fonts-Links, Datenschutz).
- Prüfen: `npm run build` muss ohne Fehler durchlaufen.
- Vorschaubilder beim Teilen (Open Graph) entstehen beim Build automatisch in `src/pages/og/[bild].png.ts` im Papier-Design. Artikel brauchen nichts extra, neue feste Seiten in `src/og.ts` eintragen (sonst kriegen sie das Startseiten-Bild). Jedes Vorschaubild hat eine eigene Ori-Animation (`OG_SEITEN`, `OG_ARTIKEL_ORI`), keine doppelt; das Standbild dazu liegt in `src/og-ori/` (aus `public/anim` gerendert, Moment mit der meisten Pose).
- Artikel haben im Frontmatter `kurz` (max. 160 Zeichen) für Google und Vorschau, `beschreibung` bleibt der lange Vorspann auf der Seite. Seitenbeschreibungen ca. 110–160 Zeichen.
- Raster im CSS immer mit `minmax(0,1fr)` statt `1fr`, sonst scrollt die Seite auf dem Handy seitlich.

## Inhalt
- **Ton:** Du-Form, locker, kurz, ehrlich, ein bisschen Schwäbisch. Pannen gehören dazu. Kein Marketing-Sprech, keine Emojis.
- **Jeder Artikel** hat mindestens: `KurzGesagt`, einen visuellen Baustein (Schaubild, `WasMacht`, `Messung` oder `VorherNachher`), `Schritte` wenn man etwas nachbauen kann, eine `Checkliste` am Ende, 1–2 `OriSagt`.
- **Ori:** Spitzname von origami (die KI heißt origami, Ori ist der Kosename). origami ist eine **Sie**: sie, ihr, „die KI“, nie „er“ oder „der Assistent“. Papiervogel, sassy wie GLaDOS, trocken, nie gemein. Kommentiert am Rand (`ori`, `oriSpruch` im Frontmatter).
- **Nur echte Zahlen** aus Nils' Messungen bzw. der origami-Doku. Nichts erfinden, nichts schätzen ohne es zu sagen.
- **Kein Name von Nils** auf der Seite (Titel, Texte, Footer, RSS), nur im Impressum und in der Datenschutzerklärung. Einzige Ausnahme (seit 13.11.): der Vorname im Footer („Selbst gfaltet · von Nils mit zu viel Kaffee“), nie der Nachname, sonst nirgends. Auch keine Ortsangabe.
- **Keine Firmendaten:** Arbeitgeber, Kollegen, Dienstleister, Server, interne Vorfälle nie nennen. Keine Adressen, Zugangsdaten oder die Fernzugriffs-Adresse von origami.
- Fachbegriffe beim ersten Auftauchen einfach erklären, neue Begriffe ins Glossar.

## Ablauf für neue Artikel
1. Material kommt aus dem Änderungsverlauf der origami-Doku (claude.ai-Projekt „Origami“, Doku „Dokumentation“). Aus diesem Projekt heraus ist die Doku nicht lesbar. Lesbar sind Nils' Artifacts, vor allem „origami von innen“ (Aufbau, Aufgabenteilung, Werkzeuge, Schutzschicht, Gedächtnis, Netz, Speicher, Pläne) und „Modell-Dreikampf origami“. Fehlt was, Nils fragen.
2. Entwurf immer in einem eigenen Branch `entwurf/<slug>`, nie direkt auf `main`, dazu einen Pull Request anlegen.
3. Jeden Entwurf direkt im Chat zeigen (Artikeltext plus Vorschau-Link `selbst-gfaltet-git-<branch>-lootkurs.vercel.app`), nicht nur den PR verlinken. Nils liest, ändert den Ton und gibt frei. Sagt er „passt“, merged Claude den PR selbst.
4. Persönliches von Nils darf rein (Findus, Hobbys), aber nichts von der Arbeit und kein Werdegang im Detail (kein FSJ, keine abgebrochene Ausbildung, kein Einzelhandel), nur „Quereinsteiger, ohne Studium“. lootkurs.de kommt auf dem Blog nicht namentlich vor, höchstens als „Preisvergleichsprogramm auf Basis von …“. Pokémon-Spiele und -Projekte kommen nicht vor.
5. Seit dem Neustart im Nov 2026: keine Fehlersuche-Artikel mehr, lieber coole Artikel und mehr über Nils selbst. Persönliches bei Bedarf bei Nils erfragen.
6. Nach jeder Änderung den Redaktionsplan in Notion aktualisieren (Status, PR-Link).
7. Seit 12.11.: ein neuer Artikel pro Woche, nicht mehrere auf einmal. `datum` = Tag, an dem er live geht. Der Newsletter geht mit jedem neuen Artikel raus, aber erst ab dem Artikel nächster Woche (für `wie-origami-lernt` keiner).

## Erschienen
- `modell-dreikampf`: Gemma 4 26B gegen Qwen3.6 35B und Qwen3.5 9B (Test vom 9.11.)
- `lokal-oder-claude`: Aufgabenteilung in drei Stufen, Gemma gegen Claude (Test vom 8.11.)
- `in-gemma-reingeschaut`: 30 Schichten, 128 Experten, Röntgen, Speicher und Tempo
- `schutzschicht`: die neun Schutzlagen, Erlaubnisliste statt Sperrliste
- `ki-surft-selbst`: Suche, Seiten lesen, Browser per Playwright, Absenden-Sperre
- `von-unterwegs`: Tunnel, Login, nur-lokal-Bereiche, Tagesablauf, Windows-Grenzen (Ports, Auslagerungsdatei)
- `programmieren-ohne-ausbildung`, `erstes-tool`, `was-die-ki-nicht-entscheidet`: Lernweg 02 (Claude Code ohne Informatikstudium)
- `wie-origami-lernt`: Gedächtnis, Fixes aus Daumen runter, geplantes LoRA-Training (12.11., kein Lernweg)
- Lernweg 01 (6 Teile) und Lernweg 02 (3 Teile) sind komplett erschienen. Lernweg 02 am 12.11. nachgeschärft (Installer, eigene Claude-Pannen), Werdegang-Details später wieder raus.
- Die ersten vier Artikel (108 Sekunden, Leerzeilen-Panne, Regeln in den Code, Eigene KI auf dem PC) wurden am 12.11. bewusst gelöscht.
- „Wer faltet hier eigentlich?“ (Artikel über Nils) am 12.11. verworfen. Nicht wieder anlegen.

## Ideen
- Lernweg 03 „Warum macht meine KI das?“ wurde am 12.11. rausgenommen (die Artikel dazu waren gelöscht). Kann zurückkommen, wenn es wieder Fehler-Artikel gibt.

## Domain & Mail
- Domain selbstgfaltet.de liegt bei IONOS. DNS: A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com. Vercel leitet selbstgfaltet.de auf www um.
- `fragen@selbstgfaltet.de` ist eine IONOS-Weiterleitung (kein Postfach, man kann davon nicht senden). Mail-Einträge (MX, SPF, DKIM, DMARC) bei IONOS nicht anfassen.
- `noindex` ist raus, Google darf die Seite aufnehmen. Sitemap: `/sitemap-index.xml`, steht auch in `public/robots.txt` und ist in der Google Search Console eingereicht (Bestätigung per TXT-Eintrag bei IONOS, nicht löschen).
- Besucherzählung: Vercel Web Analytics (ohne Cookies), steht in der Datenschutzerklärung. Neue Dienste immer dort nachtragen.

- Ori am Rand wandert mit: `<OriRand ori="…" spruch="…" />` unter eine Überschrift setzen, ab da wechselt Ori Animation und Spruch. Nur vorhandene Animationen aus `public/anim/` nehmen. Jeder Artikel bekommt eigene, zum Abschnitt passende Wechsel und Sprüche, kein Spruch doppelt über alle Artikel.

## Druck-Dokumente: Papier-Design (seit 13.11.)
Das ist das origami-Hausdesign für alles, was wir rausgeben: gedruckt, als PDF oder als Datei (Faltplan, Spickzettel, Startpaket, alles Künftige). Nie „nackig“ wie ein Formular. Bausteine: `src/components/papier/` (PapierDeko, PapierLogo, PapierFuss) + `src/styles/papier.css`, Seiten in `.pp-blatt`.
- **Kopf auf jeder Seite:** Logo (Ori `ruhezustand` + „Selbst gfaltet“). Seite 1 zusätzlich Titel mit gelbem Klebestreifen (`#ffe36e`), Folgeseiten kleiner Kopf mit Logo + Untertitel.
- **Fußzeile auf jeder Seite:** Linie, links Mini-Ori + „selbstgfaltet.de“, rechts in Handschrift „Falte X von Y“ (nie „Seite“).
- **Große orange Ecke oben rechts:** volles Dreieck, überall nahtlos bis an den Rand (im Druck 27 mm groß und bündig an der Papierecke; schneidet der Drucker die äußersten mm ab, bleibt trotzdem ein sauberes Dreieck; nie eingerückt; `#ff8a4c` mit dunkler Facette `#c2410c`), dazu feine gestrichelte Faltlinien (`#ece5d6`). Druck ohne Seitenrand (`@page margin:0`), Abstand innen über `.pp-blatt`.
- **Ori am Rand:** 1–2 Kommentare pro Seite in Handschrift (`#c2410c`) mit vorhandener Animation. Jeder Spruch passt genau zum Schritt daneben, sassy und trocken, nie gemein, kein Spruch doppelt (auch nicht mit den Artikeln).
- Das Design gilt auch für die Vorschau auf der Seite (Bildschirm = Blatt). Auf dem Handy kleinere Ecke, Ori-Sprüche aus.
- Schrift lesbar halten (Fließtext ca. 13,5 px). Faltplan = ein Blatt beidseitig, Schritte 1–5 vorne, 6–10 hinten. Vor dem Freigeben PDF erzeugen und anschauen (genau 2 Seiten, nichts abgeschnitten).

## Newsletter
- Brevo (Brevo GmbH, Berlin), Double-Opt-in. Anmeldefeld `src/components/Newsletter.astro` unter jedem Artikel und auf der Startseite.
- Die Formular-Adresse aus Brevo steht in `src/newsletter.ts`. Solange leer, ist das Feld unsichtbar und der Datenschutz-Abschnitt fehlt. Seit 12.11. eingetragen und live.
- Verschickt wird nur bei neuen Artikeln.
- Vorlage für die Bestätigungs-Mail: `mail/bestaetigung.html` (Platzhalter `{{ doubleoptin }}`), Bild `public/mail/ori-winkt.png`. Absender soll `fragen@selbstgfaltet.de` sein, nicht die Gmail-Adresse.
- Willkommens-Mail nach Bestätigung (Brevo „Finale Bestätigungs-E-Mail“): `mail/willkommen.html`, mit dem Link zum Startpaket (origami-Bauplan, exklusiv für Newsletter-Leser). KI-Check und Prüfstand bleiben frei.
- Weiterleitungen aus Brevo: nach Absenden `/newsletter/fast-geschafft`, nach Bestätigung `/newsletter/dabei` (nicht in der Sitemap).
