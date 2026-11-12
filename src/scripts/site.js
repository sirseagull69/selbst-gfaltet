const ruhig = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
let zaehler = 0;
export function nochmal(img) {
  const s = img.getAttribute('src').split('?')[0];
  img.setAttribute('src', s + '?r=' + (++zaehler));
}
window.oriNochmal = nochmal;

// Ori-Animationen: starten neu, wenn sie ins Bild kommen; beim Drüberfahren nochmal
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
  es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.tagName === 'IMG') nochmal(el);
    else { el.classList.add('zeigen'); if (el.matches('pre.tippen')) tippe(el); }
    io.unobserve(el);
  });
}, { threshold: 0.35 }) : null;
document.querySelectorAll('img.ori').forEach((img) => {
  img.addEventListener('mouseenter', () => nochmal(img));
  img.addEventListener('click', () => nochmal(img));
  if (io) io.observe(img);
});
document.querySelectorAll('.vergleich, .messung, pre.tippen').forEach((el) => io ? io.observe(el) : el.classList.add('zeigen'));

// Terminal tippt sich selbst
function tippe(pre) {
  if (ruhig || pre.dataset.lief) return;
  pre.dataset.lief = '1';
  const text = pre.textContent, aus = pre.dataset.ausgabe || '';
  let i = 0;
  pre.textContent = '';
  (function schritt() {
    pre.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(schritt, 45 + Math.random() * 50);
    else setTimeout(() => {
      if (aus) { const s = document.createElement('span'); s.className = 'aus'; s.textContent = aus; pre.appendChild(s); }
      pre.classList.add('fertig');
    }, 350);
  })();
}

// Kategorie-Filter
document.querySelectorAll('.tabs').forEach((tabs) => {
  const liste = tabs.nextElementSibling;
  const max = +liste.dataset.max || 999;
  function filtern(f) {
    let n = 0;
    liste.querySelectorAll('.eintrag').forEach((e) => {
      const passt = (f === 'alle' || e.dataset.kat === f) && n < max;
      if (passt) { n++; e.hidden = false; e.classList.remove('neu'); void e.offsetWidth; if (!ruhig) e.classList.add('neu'); }
      else e.hidden = true;
    });
  }
  tabs.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
    tabs.querySelectorAll('.tab').forEach((x) => { x.classList.toggle('aktiv', x === b); x.setAttribute('aria-pressed', x === b); });
    filtern(b.dataset.f);
  }));
  filtern('alle');
});

// Checklisten: Ori jubelt, wenn alles abgehakt ist
document.querySelectorAll('.checkliste').forEach((cl) => {
  const cbs = cl.querySelectorAll('input[type=checkbox]');
  const g = cl.querySelector('.geschafft');
  cbs.forEach((c) => c.addEventListener('change', () => {
    const alle = [...cbs].every((x) => x.checked);
    if (alle && !g.classList.contains('da')) { g.classList.add('da'); g.querySelectorAll('img.ori').forEach(nochmal); }
    if (!alle) g.classList.remove('da');
  }));
});

// Farbmodus: Auto → Hell → Dunkel
const knopf = document.getElementById('thema');
if (knopf) {
  const namen = { auto: 'Auto', hell: 'Hell', dunkel: 'Dunkel' };
  let modus = 'auto';
  try { modus = localStorage.getItem('thema') || 'auto'; } catch (e) {}
  const setze = (m) => {
    modus = m;
    const root = document.documentElement;
    if (m === 'hell') root.dataset.theme = 'light';
    else if (m === 'dunkel') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    knopf.dataset.modus = m;
    document.getElementById('thematext').textContent = namen[m];
    knopf.setAttribute('aria-label', `Farbmodus: ${namen[m]}. Klicken zum Wechseln`);
    try { m === 'auto' ? localStorage.removeItem('thema') : localStorage.setItem('thema', m); } catch (e) {}
  };
  setze(modus);
  knopf.addEventListener('click', () => {
    setze({ auto: 'hell', hell: 'dunkel', dunkel: 'auto' }[modus]);
    document.querySelectorAll('img.ori').forEach((i) => i.offsetParent && nochmal(i));
  });
}

// Ori am Rand wandert mit: an jeder <OriRand>-Markierung wechselt sie Animation und Spruch
const rand = document.querySelector('.randnotiz');
const marken = [...document.querySelectorAll('.ori-wechsel')];
if (rand && marken.length) {
  const bilder = rand.querySelectorAll('img.ori');
  const spruch = rand.querySelector('.hand');
  const start = { ori: rand.dataset.ori, spruch: rand.dataset.spruch || '' };
  let jetzt = start.ori + '|' + start.spruch;
  function setze(z) {
    const key = z.ori + '|' + z.spruch;
    if (key === jetzt) return;
    jetzt = key;
    spruch.classList.add('weg');
    setTimeout(() => {
      bilder.forEach((img) => {
        const modus = img.classList.contains('ori-dark') ? 'hell' : 'abendrot';
        img.setAttribute('src', `/anim/${z.ori}-${modus}.svg?r=${++zaehler}`);
      });
      spruch.textContent = z.spruch;
      spruch.classList.remove('weg');
    }, ruhig ? 0 : 200);
  }
  let wartet = false;
  function pruefe() {
    wartet = false;
    const linie = innerHeight * 0.3;
    let aktiv = start;
    for (const m of marken) {
      if (m.getBoundingClientRect().top < linie) aktiv = { ori: m.dataset.ori, spruch: m.dataset.spruch || '' };
      else break;
    }
    setze(aktiv);
  }
  addEventListener('scroll', () => { if (!wartet) { wartet = true; requestAnimationFrame(pruefe); } }, { passive: true });
  pruefe();
}
