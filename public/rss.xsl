<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="de">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>RSS-Feed · Selbst gfaltet</title>
<style>
  :root{--papier:#f5f4ee;--karo:rgba(40,60,110,.07);--tinte:#1d2742;--bleistift:#5d6478;--ori:#c2410c;--marker:#ffe36e;--blatt:#fff}
  @media (prefers-color-scheme:dark){:root{--papier:#131a2b;--karo:rgba(180,200,255,.05);--tinte:#e9ecf5;--bleistift:#a3abc2;--ori:#ff8a4c;--marker:#8a7420;--blatt:#1b2338}}
  body{margin:0;background:var(--papier);color:var(--tinte);font:18px/1.6 Georgia,"Times New Roman",serif;
    background-image:linear-gradient(var(--karo) 1px,transparent 1px),linear-gradient(90deg,var(--karo) 1px,transparent 1px);background-size:24px 24px}
  .wrap{max-width:760px;margin:0 auto;padding:32px 20px 60px}
  .logo{display:flex;align-items:center;gap:10px;font:800 1.3rem "Segoe UI",system-ui,sans-serif;color:var(--tinte);text-decoration:none}
  .logo img{width:44px;height:44px}
  h1{font:800 clamp(2rem,6vw,3rem)/1.1 "Segoe UI",system-ui,sans-serif;margin:28px 0 8px}
  .mark{background:linear-gradient(transparent 55%,var(--marker) 55%,var(--marker) 90%,transparent 90%)}
  .kasten{background:var(--blatt);border:2px solid var(--tinte);border-radius:14px;padding:18px 20px;margin:20px 0 30px}
  .kasten b{font-family:"Segoe UI",system-ui,sans-serif}
  .adresse{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
  code{font:.9rem Consolas,monospace;background:var(--papier);border:1.5px solid #d9d8cf;border-radius:8px;padding:8px 10px;word-break:break-all;flex:1;min-width:0}
  .hand{font-family:"Segoe Print","Comic Sans MS",cursive;color:var(--ori)}
  h2{font:700 1.2rem "Segoe UI",system-ui,sans-serif;margin:0 0 12px}
  .artikel{display:block;background:var(--blatt);border:2px solid var(--tinte);border-radius:12px;padding:14px 16px;margin:0 0 12px;color:inherit;text-decoration:none}
  .artikel:hover{box-shadow:4px 4px 0 var(--tinte);transform:translate(-2px,-2px)}
  .artikel b{display:block;font:700 1.05rem "Segoe UI",system-ui,sans-serif}
  .artikel span{display:block;color:var(--bleistift);font-size:.95rem;margin-top:4px}
  a{color:var(--ori)}
</style>
</head>
<body><div class="wrap">
  <a class="logo" href="/"><img src="/anim/winkt-abendrot.svg" alt=""/>Selbst gfaltet</a>
  <h1>Das ist der <span class="mark">RSS-Feed</span></h1>
  <p class="hand">Sieht komisch aus? Ist für Feed-Reader gedacht, nicht fürs Lesen im Browser.</p>
  <div class="kasten">
    <b>So nutzt du ihn:</b> Kopier die Adresse unten in deinen Feed-Reader (zum Beispiel Feedly, Inoreader oder die Feed-Funktion in Outlook oder Thunderbird). Dann siehst du dort automatisch jeden neuen Artikel, ohne Anmeldung und ohne Mail.
    <div class="adresse"><code>https://www.selbstgfaltet.de/rss.xml</code></div>
    <p style="margin:12px 0 0">Lieber per Mail? Dann nimm den <a href="/#newsletter">Newsletter</a>, da gibt's das Startpaket dazu.</p>
  </div>
  <h2>Die Artikel im Feed</h2>
  <xsl:for-each select="rss/channel/item">
    <a class="artikel"><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
      <b><xsl:value-of select="title"/></b>
      <span><xsl:value-of select="description"/></span>
    </a>
  </xsl:for-each>
  <p><a href="/">Zurück zu Selbst gfaltet</a></p>
</div></body>
</html>
</xsl:template>
</xsl:stylesheet>
