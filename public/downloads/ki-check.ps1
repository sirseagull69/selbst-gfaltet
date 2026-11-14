<#
  ki-check.ps1 – Ist mein PC bereit für eine eigene KI?
  Von Selbst gfaltet (https://www.selbstgfaltet.de)

  Prüft Grafikkarte, Arbeitsspeicher, Festplatte, Ollama, Netzwerk-Ports und
  Auslagerungsdatei und sagt dir, worauf du achten musst.

  Das Skript LIEST NUR. Es ändert nichts an deinem PC und schickt nichts ins Internet.
  Einzige Verbindung: zu Ollama auf deinem eigenen PC (localhost:11434), falls es läuft.

  Starten:  PowerShell öffnen (nicht als Administrator) und eingeben:
            powershell -ExecutionPolicy Bypass -File "$HOME\Downloads\ki-check.ps1"
  Bericht speichern:  ... -File .\ki-check.ps1 -Bericht
#>
param([switch]$Bericht)

$ErrorActionPreference = 'SilentlyContinue'
$zeilen = New-Object System.Collections.Generic.List[string]
$hinweise = New-Object System.Collections.Generic.List[string]

function Schreib([string]$text, [string]$farbe = 'Gray') {
  Write-Host $text -ForegroundColor $farbe
  $zeilen.Add($text) | Out-Null
}
function Ok([string]$t)    { Schreib ("  [OK]    " + $t) 'Green' }
function Achtung([string]$t) { Schreib ("  [!]     " + $t) 'Yellow'; $hinweise.Add($t) | Out-Null }
function Info([string]$t)  { Schreib ("  [i]     " + $t) 'Gray' }
function Titel([string]$t) { Schreib ''; Schreib $t 'Cyan' }
function GB([double]$bytes) { [math]::Round($bytes / 1GB, 1) }

Schreib '============================================================' 'Cyan'
Schreib '  KI-Check von Selbst gfaltet  ·  www.selbstgfaltet.de' 'Cyan'
Schreib '  Liest nur, ändert nichts.' 'Cyan'
Schreib '============================================================' 'Cyan'

# ---------- Grafikkarte ----------
Titel 'Grafikkarte'
$gpuName = $null; $vramGB = $null
$smi = Get-Command nvidia-smi -ErrorAction SilentlyContinue
if ($smi) {
  $roh = & nvidia-smi --query-gpu=name,memory.total --format=csv,noheader,nounits 2>$null | Select-Object -First 1
  if ($roh -and $roh -match ',') {
    $teile = $roh.Split(',')
    $gpuName = $teile[0].Trim()
    $vramGB = [math]::Round([double]$teile[1].Trim() / 1024, 1)
  }
}
if (-not $vramGB) {
  $klasse = 'HKLM:\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}'
  $best = 0
  Get-ChildItem $klasse -ErrorAction SilentlyContinue | Where-Object { $_.PSChildName -match '^\d{4}$' } | ForEach-Object {
    $p = Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue
    $mem = $p.'HardwareInformation.qwMemorySize'
    if ($mem -and [double]$mem -gt $best) { $best = [double]$mem; $gpuName = $p.DriverDesc }
  }
  if ($best -gt 0) { $vramGB = GB $best }
}
if (-not $gpuName) {
  $vc = Get-CimInstance Win32_VideoController | Select-Object -First 1
  if ($vc) { $gpuName = $vc.Name }
}
if ($gpuName) { Info ("Gefunden: " + $gpuName) } else { Achtung 'Keine Grafikkarte erkannt.' }
if ($vramGB) {
  if ($vramGB -ge 16) { Ok ("Grafikspeicher (VRAM): $vramGB GB. Damit laufen auch mittelgroße Modelle komplett auf der Karte.") }
  elseif ($vramGB -ge 8) { Ok ("Grafikspeicher (VRAM): $vramGB GB. Reicht für kleine Modelle komplett, größere laufen teilweise im Arbeitsspeicher.") }
  else { Achtung ("Grafikspeicher (VRAM): nur $vramGB GB. Kleine Modelle gehen, größere werden langsam.") }
} else { Info 'Grafikspeicher konnte nicht ausgelesen werden.' }

# ---------- Arbeitsspeicher ----------
Titel 'Arbeitsspeicher'
$ramGB = $null
$cs = Get-CimInstance Win32_ComputerSystem
if ($cs) { $ramGB = GB $cs.TotalPhysicalMemory }
if ($ramGB) {
  if ($ramGB -ge 31) { Ok ("$ramGB GB. Gut, damit kann auch ein Modell laufen, das nicht ganz in die Grafikkarte passt.") }
  elseif ($ramGB -ge 15) { Achtung ("$ramGB GB. Für Modelle, die nicht in die Grafikkarte passen, wird es eng.") }
  else { Achtung ("$ramGB GB. Das ist wenig für lokale KI. Bleib bei kleinen Modellen.") }
} else { Info 'Arbeitsspeicher konnte nicht ausgelesen werden.' }

# ---------- Modelle grob einschätzen ----------
if ($vramGB -and $ramGB) {
  Titel 'Welche Modellgrößen passen ungefähr? (Schätzung)'
  Info 'Faustregel für 4-Bit-Modelle: ca. 0,6 GB pro Milliarde Parameter plus 1,5 GB.'
  foreach ($p in 4, 8, 14, 27, 32, 70) {
    $bedarf = [math]::Round($p * 0.6 + 1.5, 1)
    if ($bedarf -le $vramGB) { Ok ("${p}B (ca. $bedarf GB): passt komplett auf die Grafikkarte") }
    elseif (($bedarf - $vramGB) -le ($ramGB * 0.6)) { Info ("${p}B (ca. $bedarf GB): läuft, aber teilweise im Arbeitsspeicher, also langsamer") }
    else { Schreib ("  [x]     ${p}B (ca. $bedarf GB): zu groß") 'DarkGray' }
  }
  Info 'Zum Vergleich, gemessen: gemma4:26b läuft bei mir auf 8 GB VRAM mit 32 GB RAM, belegt rund 17 GB.'
}

# ---------- Festplatte ----------
Titel 'Festplatte'
$modellOrdner = $env:OLLAMA_MODELS
if (-not $modellOrdner) { $modellOrdner = Join-Path $env:USERPROFILE '.ollama\models' }
$laufwerk = $null
if ($modellOrdner) { $laufwerk = (Split-Path -Qualifier $modellOrdner) }
if (-not $laufwerk) { $laufwerk = $env:SystemDrive }
$ld = Get-CimInstance Win32_LogicalDisk -Filter ("DeviceID='" + $laufwerk + "'")
if ($ld) {
  $frei = GB $ld.FreeSpace
  if ($frei -ge 50) { Ok ("Frei auf ${laufwerk} $frei GB (dort landen die Modelle).") }
  elseif ($frei -ge 20) { Achtung ("Frei auf ${laufwerk} nur $frei GB. Ein großes Modell braucht schnell 15 bis 25 GB.") }
  else { Achtung ("Frei auf ${laufwerk} nur $frei GB. Das reicht kaum für ein Modell.") }
} else { Info 'Freier Speicher konnte nicht ausgelesen werden.' }

# ---------- Ollama ----------
Titel 'Ollama'
$ollama = Get-Command ollama -ErrorAction SilentlyContinue
if ($ollama) {
  $ver = (& ollama --version 2>$null | Select-Object -First 1)
  Ok ("Installiert. " + $ver)
} else {
  Achtung 'Ollama ist nicht installiert (oder nicht im Pfad). Holen kannst du es von ollama.com.'
}
$api = 'http://localhost:11434'
$tags = $null
try { $tags = Invoke-RestMethod -Uri "$api/api/tags" -TimeoutSec 3 } catch { $tags = $null }
if ($tags) {
  $anz = @($tags.models).Count
  if ($anz -gt 0) {
    Ok ("Läuft, $anz Modell(e) heruntergeladen:")
    $summe = 0
    foreach ($m in $tags.models) { $summe += [double]$m.size; Info ("   " + $m.name + "  (" + (GB $m.size) + " GB)") }
    Info ("Zusammen " + (GB $summe) + " GB auf der Platte. Nicht genutzte Modelle löschst du mit: ollama rm <name>")
  } else { Info 'Läuft, aber noch kein Modell geladen. Zum Beispiel: ollama pull gemma4:26b' }
  $ps = $null
  try { $ps = Invoke-RestMethod -Uri "$api/api/ps" -TimeoutSec 3 } catch { $ps = $null }
  if ($ps -and @($ps.models).Count -gt 0) {
    foreach ($m in $ps.models) {
      $gesamt = [double]$m.size; $gpu = [double]$m.size_vram
      if ($gesamt -gt 0) {
        $anteil = [math]::Round($gpu / $gesamt * 100)
        $text = $m.name + " ist gerade geladen: " + (GB $gesamt) + " GB, davon $anteil % auf der Grafikkarte."
        if ($anteil -ge 95) { Ok $text } else { Achtung ($text + " Der Rest rechnet langsamer über den Arbeitsspeicher. Vor allem lange Texte einlesen dauert dann.") }
      }
    }
  } else { Info 'Gerade ist kein Modell geladen. Starte eins (ollama run <name>) und lass den Check nochmal laufen, dann siehst du die Aufteilung GPU/Arbeitsspeicher.' }
} elseif ($ollama) {
  Info 'Ollama antwortet gerade nicht. Läuft es? (Symbol unten rechts in der Taskleiste)'
}

# ---------- Netzwerk-Ports ----------
Titel 'Netzwerk-Ports (Windows-Grenze)'
$netsh = & netsh int ipv4 show dynamicport tcp 2>$null
if ($netsh) {
  $zahlen = @([regex]::Matches(($netsh -join ' '), '\d+') | ForEach-Object { [int]$_.Value })
  if ($zahlen.Count -ge 2) {
    $start = $zahlen[0]; $anzahl = $zahlen[1]
    if ($anzahl -ge 30000) { Ok ("$anzahl freie Ports für ausgehende Verbindungen (ab $start).") }
    else {
      Achtung ("Nur $anzahl Ports für ausgehende Verbindungen (ab $start). Das ist der Windows-Standard. Bei mir ist origami genau daran einmal ausgefallen. Wenn deine KI viele Verbindungen aufmacht (Werkzeuge, Websuche), kann der Bereich zu klein werden.")
      Info 'Ändern geht als Administrator, z. B.: netsh int ipv4 set dynamicport tcp start=10000 num=55535'
      Info '(Das Skript ändert das NICHT selbst.)'
    }
  } else { Info 'Port-Bereich konnte nicht gelesen werden.' }
} else { Info 'Port-Bereich konnte nicht gelesen werden (nur unter Windows).' }

# ---------- Auslagerungsdatei ----------
Titel 'Auslagerungsdatei'
if ($cs -and $cs.AutomaticManagedPagefile) {
  Ok 'Wird von Windows automatisch verwaltet. Das ist meistens in Ordnung.'
} else {
  $pf = Get-CimInstance Win32_PageFileUsage
  if ($pf) {
    $mb = 0; foreach ($p in @($pf)) { $mb += [double]$p.AllocatedBaseSize }
    $pfGB = [math]::Round($mb / 1024, 1)
    if ($pfGB -ge 16) { Ok ("Fest eingestellt: $pfGB GB.") }
    else { Achtung ("Fest eingestellt auf nur $pfGB GB. Eine zu kleine Auslagerungsdatei war bei mir eine der Ursachen für einen Totalausfall. Für lokale KI lieber größer oder automatisch.") }
  } else { Achtung 'Keine Auslagerungsdatei gefunden. Für große Modelle ist das riskant.' }
}

# ---------- Zusammenfassung ----------
Titel 'Zusammenfassung'
if ($hinweise.Count -eq 0) { Ok 'Keine Auffälligkeiten. Viel Spaß beim Falten!' }
else {
  Schreib ("  " + $hinweise.Count + " Punkt(e) zum Anschauen:") 'Yellow'
  $i = 1; foreach ($h in $hinweise) { Schreib ("  $i. " + $h) 'Yellow'; $i++ }
}
Schreib ''
Schreib '  Mehr Erklärungen: www.selbstgfaltet.de/faltplan' 'Cyan'

if ($Bericht) {
  $ziel = Join-Path ([Environment]::GetFolderPath('Desktop')) ('ki-check-' + (Get-Date -Format 'yyyy-MM-dd-HHmm') + '.txt')
  $zeilen | Out-File -FilePath $ziel -Encoding utf8
  Write-Host ''
  Write-Host ("  Bericht gespeichert: " + $ziel) -ForegroundColor Cyan
}
if ($Host.Name -eq 'ConsoleHost' -and -not $env:KI_CHECK_KEIN_WARTEN) { Write-Host ''; Read-Host '  Enter zum Schließen' | Out-Null }
