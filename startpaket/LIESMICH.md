# Startpaket (nur über die Willkommens-Mail)

Die ZIP liegt in `public/downloads/startpaket-a292e06fb335.zip` und enthält `origami-bauplan/` mit
`LIESMICH.txt`, `CLAUDE.md`, `SCHRITTE.md` und `origami-bauplan.pdf`.

`origami-bauplan.pdf` wird aus `bauplan-druck.html` (hier im Ordner) erzeugt, im origami-Hausdesign
(siehe CLAUDE.md, „Druck-Dokumente“). Ändert sich `SCHRITTE.md`, auch die HTML anpassen und neu bauen:

    npm ci   # einmal, für die Schriften in node_modules
    chrome --headless --no-pdf-header-footer --allow-file-access-from-files \
      --print-to-pdf=origami-bauplan.pdf file://$PWD/startpaket/bauplan-druck.html

PDF prüfen (genau 2 Seiten), in die ZIP legen, ZIP-Namen nicht ändern (steht in `mail/willkommen.html`).
