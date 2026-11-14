<#
  modell-pruefstand.ps1 – Welches lokale Modell taugt auf DEINEM PC?
  Von Selbst gfaltet (https://www.selbstgfaltet.de)

  Schickt dieselben Aufgaben an deine Ollama-Modelle und misst:
  Zeit pro Antwort, Tempo beim Einlesen und Schreiben, und wie oft gar keine
  Antwort kommt (das Modell "denkt" nur und schreibt nichts hin).
  So bin ich im Modell-Dreikampf vorgegangen.

  Das Skript redet nur mit Ollama auf deinem PC (localhost:11434).
  Es ändert nichts am System. Ergebnisse landen in einem neuen Ordner
  "pruefstand-<Datum>" neben dem Skript.

  Starten:  powershell -ExecutionPolicy Bypass -File "$HOME\Downloads\modell-pruefstand.ps1"
  Nur bestimmte Modelle:  ... -Modelle gemma4:26b,qwen3.5:9b
  Eigene Aufgaben (eine pro Zeile):  ... -Aufgaben .\meine-aufgaben.txt
#>
param(
  [string[]]$Modelle,
  [string]$Aufgaben,
  [int]$TimeoutSek = 600,
  [string]$Ollama = 'http://localhost:11434'
)

$ErrorActionPreference = 'Stop'
$standard = @(
  'Erkläre in drei Sätzen, was eine Grafikkarte macht. Für jemanden ohne Technikwissen.',
  'Schreib eine kurze, freundliche Mail an einen Nachbarn: Das Paket für ihn liegt bei mir, er kann es heute ab 18 Uhr abholen.',
  'Fasse diesen Text in einem Satz zusammen: Ein lokales Sprachmodell läuft direkt auf dem eigenen Rechner. Die Daten verlassen den PC nicht, dafür braucht man genug Grafikspeicher und Geduld beim ersten Laden.',
  'Schreib einen PowerShell-Befehl, der anzeigt, wie viel Platz auf Laufwerk C: frei ist. Nur der Befehl, kurz erklärt.',
  'Eine Mail sagt: "Ihr Konto wird gesperrt, klicken Sie sofort hier und geben Sie Ihr Passwort ein." Woran erkennst du, dass das Phishing ist? Drei Punkte.',
  'Mein WLAN ist langsam, aber nur am Laptop, am Handy nicht. Was prüfe ich zuerst? Gib drei Schritte in der richtigen Reihenfolge.',
  'Rechne: 249 Euro plus 19 Prozent Mehrwertsteuer. Nur das Ergebnis und eine Zeile Rechenweg.',
  'Schreib eine einfache HTML-Seite mit einem Knopf, der beim Klick "Hallo" anzeigt. Nur der Code.',
  'Nenne Vor- und Nachteile, ob man eine KI lokal oder in der Cloud betreibt. Je zwei Punkte, kurz.',
  'Antworte nur mit dem Wort "fertig".'
)
if ($Aufgaben) {
  if (-not (Test-Path $Aufgaben)) { Write-Host "Datei nicht gefunden: $Aufgaben" -ForegroundColor Red; exit 1 }
  # [string]: Get-Content hängt Zusatzinfos an jede Zeile, ConvertTo-Json machte daraus ein Objekt statt Text (Ollama lehnte ab)
  $liste = @(Get-Content $Aufgaben -Encoding UTF8 | ForEach-Object { [string]$_ } | Where-Object { $_.Trim() -ne '' })
} else { $liste = $standard }

function GB([double]$b) { [math]::Round($b / 1GB, 1) }

Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '  Modell-Prüfstand von Selbst gfaltet  ·  www.selbstgfaltet.de' -ForegroundColor Cyan
Write-Host '============================================================' -ForegroundColor Cyan

try { $tags = Invoke-RestMethod -Uri "$Ollama/api/tags" -TimeoutSec 5 }
catch { Write-Host 'Ollama antwortet nicht. Läuft es? (ollama.com)' -ForegroundColor Red; exit 1 }
$vorhanden = @($tags.models | ForEach-Object { $_.name })
if (-not $Modelle -or $Modelle.Count -eq 0) { $Modelle = $vorhanden }
$Modelle = @($Modelle | ForEach-Object { $_ -split ',' } | ForEach-Object { $_.Trim() } | Where-Object { $_ })
$fehlt = @($Modelle | Where-Object { $vorhanden -notcontains $_ })
if ($fehlt.Count -gt 0) { Write-Host ('Nicht heruntergeladen: ' + ($fehlt -join ', ') + '  (ollama pull <name>)') -ForegroundColor Red; exit 1 }
if ($Modelle.Count -eq 0) { Write-Host 'Kein Modell gefunden. Erst eins laden, z. B.: ollama pull qwen3.5:9b (passt auf 8 GB Grafikkarte)' -ForegroundColor Red; exit 1 }

$basis = $PSScriptRoot; if (-not $basis) { $basis = (Get-Location).Path }
$ordner = Join-Path $basis ('pruefstand-' + (Get-Date -Format 'yyyy-MM-dd-HHmm'))
New-Item -ItemType Directory -Path $ordner -Force | Out-Null
Write-Host ("  " + $Modelle.Count + " Modell(e), " + $liste.Count + " Aufgaben. Ergebnisse: " + $ordner) -ForegroundColor Gray
Write-Host '  Das kann dauern. Große Modelle brauchen pro Aufgabe auch mal Minuten.' -ForegroundColor Gray

$ergebnisse = New-Object System.Collections.Generic.List[object]
foreach ($m in $Modelle) {
  Write-Host ''
  Write-Host ("== $m ==") -ForegroundColor Cyan
  Write-Host '  Lade Modell und wärme vor ...' -ForegroundColor Gray
  try { Invoke-RestMethod -Uri "$Ollama/api/generate" -Method Post -ContentType 'application/json; charset=utf-8' -Body ([Text.Encoding]::UTF8.GetBytes((@{ model = $m; prompt = 'Hallo'; stream = $false } | ConvertTo-Json))) -TimeoutSec $TimeoutSek | Out-Null } catch {}
  $md = New-Object System.Collections.Generic.List[string]
  $md.Add("# Antworten von $m") | Out-Null
  $md.Add('') | Out-Null
  $md.Add('Bewerte selbst: Stimmt es? Hilft es dir? Gib jeder Antwort 0 bis 10 Punkte.') | Out-Null
  $nr = 0
  foreach ($a in $liste) {
    $nr++
    Write-Host ("  Aufgabe $nr/" + $liste.Count + " ... ") -NoNewline -ForegroundColor Gray
    $body = [Text.Encoding]::UTF8.GetBytes((@{ model = $m; prompt = $a; stream = $false } | ConvertTo-Json))
    $uhr = [Diagnostics.Stopwatch]::StartNew()
    $status = 'ok'; $antwort = ''; $r = $null
    try { $r = Invoke-RestMethod -Uri "$Ollama/api/generate" -Method Post -ContentType 'application/json; charset=utf-8' -Body $body -TimeoutSec $TimeoutSek }
    catch { $status = 'Fehler/Zeitlimit' }
    $uhr.Stop()
    $sek = [math]::Round($uhr.Elapsed.TotalSeconds, 1)
    $lesen = $null; $schreiben = $null
    if ($r) {
      $antwort = [string]$r.response
      if ($r.prompt_eval_duration -and [double]$r.prompt_eval_duration -gt 0) { $lesen = [math]::Round([double]$r.prompt_eval_count / ([double]$r.prompt_eval_duration / 1e9), 1) }
      if ($r.eval_duration -and [double]$r.eval_duration -gt 0) { $schreiben = [math]::Round([double]$r.eval_count / ([double]$r.eval_duration / 1e9), 1) }
      if ($antwort.Trim() -eq '') {
        if ($r.thinking -and ([string]$r.thinking).Trim() -ne '') { $status = 'nur gedacht, nichts geschrieben' } else { $status = 'leer' }
      }
    }
    $farbe = 'Green'; if ($status -ne 'ok') { $farbe = 'Yellow' }
    Write-Host ("$sek s  ($status)") -ForegroundColor $farbe
    $ergebnisse.Add([pscustomobject]@{ Modell = $m; Aufgabe = $nr; Sekunden = $sek; EinlesenTokS = $lesen; SchreibenTokS = $schreiben; Status = $status; Frage = $a }) | Out-Null
    $md.Add('') | Out-Null
    $md.Add("## Aufgabe $nr  ·  $sek s  ·  $status") | Out-Null
    $md.Add('') | Out-Null
    $md.Add("**Frage:** $a") | Out-Null
    $md.Add('') | Out-Null
    if ($antwort.Trim() -ne '') { $md.Add($antwort) | Out-Null } else { $md.Add('_(keine Antwort)_') | Out-Null }
  }
  $datei = Join-Path $ordner ('antworten-' + ($m -replace '[^a-zA-Z0-9._-]', '_') + '.md')
  $md | Out-File -FilePath $datei -Encoding utf8
}

$ergebnisse | Export-Csv -Path (Join-Path $ordner 'messwerte.csv') -NoTypeInformation -Encoding UTF8 -Delimiter ';'

Write-Host ''
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '  Ergebnis' -ForegroundColor Cyan
Write-Host '============================================================' -ForegroundColor Cyan
$zus = New-Object System.Collections.Generic.List[string]
$zus.Add('| Modell | Ø Zeit pro Aufgabe | Einlesen (Tokens/s) | Schreiben (Tokens/s) | ohne Antwort |') | Out-Null
$zus.Add('|---|---|---|---|---|') | Out-Null
foreach ($m in $Modelle) {
  $e = @($ergebnisse | Where-Object { $_.Modell -eq $m })
  $zeit = [math]::Round(($e | Measure-Object Sekunden -Average).Average, 1)
  $l = @($e | Where-Object { $_.EinlesenTokS }); $lesen = '-'; if ($l.Count) { $lesen = [math]::Round(($l | Measure-Object EinlesenTokS -Average).Average, 1) }
  $s = @($e | Where-Object { $_.SchreibenTokS }); $schr = '-'; if ($s.Count) { $schr = [math]::Round(($s | Measure-Object SchreibenTokS -Average).Average, 1) }
  $leer = @($e | Where-Object { $_.Status -ne 'ok' }).Count
  $zeile = "| $m | $zeit s | $lesen | $schr | $leer von " + $e.Count + " |"
  $zus.Add($zeile) | Out-Null
  $farbe = 'Green'; if ($leer -gt 0) { $farbe = 'Yellow' }
  Write-Host ("  $m") -ForegroundColor White
  Write-Host ("    Ø $zeit s pro Aufgabe · Einlesen $lesen Tok/s · Schreiben $schr Tok/s · ohne Antwort: $leer von " + $e.Count) -ForegroundColor $farbe
}
$zus.Add('') | Out-Null
$zus.Add('Gemessen mit dem Modell-Prüfstand von www.selbstgfaltet.de. Die Antworten stehen in den Dateien antworten-<modell>.md in diesem Ordner. Bewerte sie selbst.') | Out-Null
$zus | Out-File -FilePath (Join-Path $ordner 'zusammenfassung.md') -Encoding utf8
Write-Host ''
Write-Host '  Tipp: Zähl nicht nur die Zeit. Ein Modell, das oft gar nichts schreibt, hilft dir nicht, egal wie schnell es ist.' -ForegroundColor Gray
Write-Host ("  Alles gespeichert in: " + $ordner) -ForegroundColor Cyan
Write-Host '  Die Antworten zum Lesen und Bewerten stehen in den Dateien antworten-<modell>.md (mit dem Editor öffnen).' -ForegroundColor Cyan
if ($Host.Name -eq 'ConsoleHost' -and -not $env:KI_CHECK_KEIN_WARTEN) { Write-Host ''; Read-Host '  Enter zum Schließen' | Out-Null }
