import { nav, company } from "./nav.mjs";

const logoMark = `
      <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
        <path d="M6 40 30 6l6 12-18 22z" fill="currentColor"/>
        <path d="M22 40 44 10l2 13-13 17z" fill="#ff6a1f"/>
      </svg>`;

const phoneIcon = `<svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 5.2 2 2 0 0 1 5 3z" stroke-linejoin="round"/>
        </svg>`;

export const arrowIcon = `<svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h13m-5-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;

function navMarkup(active) {
  return nav.map((item) => {
    const current = item.key === active || item.href === active ? ' aria-current="true"' : "";
    if (!item.children) return `      <a href="${item.href}"${current}>${item.label}</a>`;
    const sub = item.children
      .map((c) => `          <li><a href="${c.href}">${c.label}</a></li>`)
      .join("\n");
    return `      <div class="nav__group">
        <a href="${item.href}"${current} aria-haspopup="true">${item.label}
          <svg class="nav__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <ul class="nav__panel">
${sub}
        </ul>
      </div>`;
  }).join("\n");
}

export function page({ slug, title, description, active = "", body, bodyClass = "" }) {
  const isHome = slug === "index";
  return `<!DOCTYPE html>
<html lang="de" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#f4f6fa" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#080b11" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/van.css">
<script>
(function () {
  var root = document.documentElement;
  root.className = root.className.replace("no-js", "js");
  try {
    var saved = localStorage.getItem("falke-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
})();
</script>${isHome ? `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${company.name}",
  "url": "https://falke-tuerautomation.de/",
  "email": "${company.mail}",
  "telephone": "+49 2272 9089270",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${company.street}",
    "postalCode": "${company.zip}",
    "addressLocality": "${company.city}",
    "addressCountry": "DE"
  },
  "areaServed": ["Köln", "Düsseldorf", "Bonn", "Aachen"],
  "openingHours": "Mo-Fr 08:00-16:30"
}
</script>` : ""}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
<a class="skip-link" href="#main">Zum Inhalt springen</a>

<div class="topbar">
  <div class="topbar__inner">
    <span class="topbar__hours">${company.hours}</span>
    <a class="topbar__phone" href="tel:${company.phoneHref}">${phoneIcon}${company.phone}</a>
    <a class="topbar__cta" href="kontakt.html">Kontakt</a>
  </div>
</div>

<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="brand" href="index.html" aria-label="${company.name} – Startseite">${logoMark}
      <span class="brand__text">
        <span class="brand__name">Falke</span>
        <span class="brand__sub">Türautomation</span>
      </span>
    </a>

    <nav class="nav" id="nav" aria-label="Hauptnavigation" data-nav>
${navMarkup(active)}
      <a class="nav__contact" href="kontakt.html">Kontakt</a>
    </nav>

    <div class="header__cta">
      <a class="header__phone" href="tel:${company.phoneHref}">${phoneIcon}<span>${company.phone}</span></a>
      <button class="theme-toggle" type="button" data-theme-toggle
              aria-label="Zwischen hellem und dunklem Design wechseln">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2"/>
          <path d="M12 2.6v2.2m0 14.4v2.2M2.6 12h2.2m14.4 0h2.2M5.3 5.3l1.6 1.6m10.2 10.2 1.6 1.6m0-13.4-1.6 1.6M6.9 17.1l-1.6 1.6" stroke-linecap="round"/>
        </svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" data-nav-toggle>
        <span></span><span class="visually-hidden">Menü</span>
      </button>
    </div>
  </div>
</header>

<main id="main">
${body}
</main>

<footer class="site-footer">
  <div class="shell">
    <div class="footer__grid">
      <div>
        <a class="brand footer__brand" href="index.html">${logoMark}
          <span class="brand__text">
            <span class="brand__name">Falke</span>
            <span class="brand__sub">Türautomation</span>
          </span>
        </a>
        <p style="margin-top:var(--sp-5)">
          Service, Wartung und Modernisierung automatischer Türsysteme, Rettungswegtechnik,
          Zutrittskontrolle und Türschließer – herstellerunabhängig im Rheinland.
        </p>
      </div>
      <div>
        <h4>Leistungen</h4>
        <ul>
          <li><a href="leistung-schiebetueren.html">Automatische Schiebetüren</a></li>
          <li><a href="leistung-drehtuerantriebe.html">Drehtürantriebe</a></li>
          <li><a href="leistung-zutrittskontrolle.html">Zutrittskontrolle</a></li>
          <li><a href="leistung-rettungswegsysteme.html">Rettungswegsysteme</a></li>
          <li><a href="leistung-obentuerschliesser.html">Obentürschließer</a></li>
          <li><a href="leistung-pruefung-wartung.html">Prüfung &amp; Wartung</a></li>
        </ul>
      </div>
      <div>
        <h4>Unternehmen</h4>
        <ul>
          <li><a href="ueber-uns.html">Wir stellen uns vor</a></li>
          <li><a href="team.html">Das Team</a></li>
          <li><a href="referenzen.html">Referenzen</a></li>
          <li><a href="karriere.html">Komm in unser Team</a></li>
          <li><a href="stellen.html">Offene Stellen</a></li>
          <li><a href="downloads.html">Downloads</a></li>
        </ul>
      </div>
      <div>
        <h4>Kontakt</h4>
        <ul>
          <li><a href="tel:${company.phoneHref}">${company.phone}</a></li>
          <li><a href="mailto:${company.mail}">${company.mail}</a></li>
          <li>${company.street}<br>${company.zip} ${company.city}</li>
          <li>${company.hours}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year>2026</span> ${company.name} – ${company.owner}</p>
      <p><a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Datenschutz</a></p>
    </div>
  </div>
</footer>

<script src="assets/js/van.js" defer></script>
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}
