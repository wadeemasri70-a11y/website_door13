import { nav, company } from "./content/index.mjs";

const logoMark = `
      <img class="brand__logo" src="assets/img/logo-falke.png"
           alt="Falke Türautomation" width="600" height="200">
      <img class="brand__logo brand__logo--invers" src="assets/img/logo-falke-invers.png"
           alt="" aria-hidden="true" width="600" height="200">`;

const phoneIcon = `<svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 5.2 2 2 0 0 1 5 3z" stroke-linejoin="round"/>
        </svg>`;

export const arrowIcon = `<svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h13m-5-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;

function navMarkup(active, seite) {
  return nav.map((item) => {
    const current = item.key === active || item.href === active ? ' aria-current="true"' : "";
    if (!item.children) return `      <a href="${item.href}"${current}>${item.label}</a>`;
    const sub = item.children
      .map((c) => {
        const hier = c.href === seite ? ' aria-current="page"' : "";
        return `          <li><a href="${c.href}"${hier}>${c.label}</a></li>`;
      })
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

const sozialZeichen = {
  facebook: {
    feld: "2.1 2.1 19.8 19.8",
    inhalt: `<path fill-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zm1.29 10.83v6.87a9.9 9.9 0 0 1-2.5 0v-6.87H8.7v-2.6h2.09V8.55c0-2.06 1.24-3.2 3.13-3.2.9 0 1.84.16 1.84.16v2.02h-1.04c-1.02 0-1.34.64-1.34 1.29v1.51h2.28l-.36 2.6h-1.92z"/>`
  },
  instagram: {
    feld: "2.25 2.25 19.5 19.5",
    inhalt: `<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" fill="none" stroke="currentColor" stroke-width="1.9"/>
          <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.9"/>
          <circle cx="16.9" cy="7.1" r="1.25"/>`
  },
  youtube: {
    feld: "2 2 20 20",
    inhalt: `<path fill-rule="evenodd" d="M21.58 7.19a2.52 2.52 0 0 0-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41A2.52 2.52 0 0 0 2.42 7.19 26.3 26.3 0 0 0 2 12c0 1.61.14 3.22.42 4.81a2.52 2.52 0 0 0 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.52 2.52 0 0 0 1.77-1.78c.28-1.59.42-3.2.42-4.81s-.14-3.22-.42-4.81zM10.15 15.4V8.6L15.9 12l-5.75 3.4z"/>`
  },
  linkedin: {
    feld: "3.182 3.459 17.828 17.828",
    inhalt: `<path d="M6.85 21H3.6V8.98h3.25V21zM5.22 7.54a1.9 1.9 0 1 1 0-3.79 1.9 1.9 0 0 1 0 3.79zM21 21h-3.24v-6.4c0-1.35-.49-2.27-1.68-2.27-.92 0-1.46.62-1.7 1.22-.09.21-.11.5-.11.8V21H11.1s.04-11.1 0-12.02h3.24v1.7c.43-.67 1.2-1.62 2.93-1.62 2.14 0 3.74 1.4 3.74 4.42V21z"/>`
  }
};


export function sozialLeiste({ klasse = "", titel = "", einzug = "      " } = {}) {
  const glieder = company.social.map((s) => {
    const ziel = s.url ? ` href="${s.url}" target="_blank" rel="noopener"` : "";
    return `${einzug}    <li><a class="sozial__link sozial__link--${s.key}"${ziel} aria-label="${s.name}" title="${s.name}">
${einzug}      <svg viewBox="${sozialZeichen[s.key].feld}" fill="currentColor" aria-hidden="true">${sozialZeichen[s.key].inhalt}</svg>
${einzug}    </a></li>`;
  }).join("\n");
  return `${einzug}<div class="sozial${klasse ? " " + klasse : ""}">
${einzug}  ${titel ? `<p class="sozial__titel">${titel}</p>` : ""}
${einzug}  <ul class="sozial__liste">
${glieder}
${einzug}  </ul>
${einzug}</div>`;
}

export function tuerPortal({ html, weit = false, id = "" }) {
  return `<section class="tuer${weit ? " tuer--weit" : ""}" data-doors${id ? ` id="${id}"` : ""}>
  <div class="tuer__sensor" aria-hidden="true"><span class="tuer__led"></span></div>
  <div class="tuer__rahmen">
    <div class="tuer__inhalt">
${html}
    </div>
    <div class="tuer__fluegel tuer__fluegel--links" aria-hidden="true"></div>
    <div class="tuer__fluegel tuer__fluegel--rechts" aria-hidden="true"></div>
    <div class="tuer__schiene" aria-hidden="true"></div>
  </div>
</section>`;
}

const tuerAbschluss = tuerPortal({
  html: `      <p class="eyebrow">Kontakt</p>
      <h2>Sprechen wir über Ihre Türen.</h2>
      <p>${company.hours} erreichen Sie unsere Disposition direkt.</p>
      <div class="tuer__aktionen">
        <a class="btn btn--accent" href="tel:${company.phoneHref}">${company.phone}</a>
        <a class="btn btn--ghost" href="mailto:${company.mail}">${company.mail}</a>
      </div>`
});

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
<link rel="icon" href="assets/img/favicon-falke.png" type="image/png">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&display=swap">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/content.css">
<link rel="stylesheet" href="assets/css/van.css">
<script src="assets/js/theme.js"></script>${isHome ? `
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

<svg class="verlaeufe" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="instagram-verlauf" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#FDCB5C"/>
      <stop offset="0.3" stop-color="#F7703A"/>
      <stop offset="0.6" stop-color="#DD2A7B"/>
      <stop offset="1" stop-color="#8134AF"/>
    </linearGradient>
  </defs>
</svg>

<div class="topbar">
  <div class="topbar__inner">
    <span class="topbar__hours">${company.hours}</span>
    <a class="topbar__phone" href="tel:${company.phoneHref}">${phoneIcon}${company.phone}</a>
    <a class="topbar__cta" href="kontakt.html">Kontakt</a>
  </div>
</div>

<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="brand" href="index.html" aria-label="${company.name} – Startseite">${logoMark}</a>

    <nav class="nav" id="nav" aria-label="Hauptnavigation" data-nav>
${navMarkup(active, slug + ".html")}
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

${body.includes("data-doors") ? "" : tuerAbschluss}

<footer class="site-footer">
  <div class="shell">
    <div class="footer__grid">
      <div>
        <a class="brand footer__brand" href="index.html">${logoMark}</a>
        <p class="footer__claim">
          Service, Wartung und Modernisierung automatischer Türsysteme, Rettungswegtechnik,
          Zutrittskontrolle und Türschließer – herstellerunabhängig im Rheinland.
        </p>
${sozialLeiste({ klasse: "sozial--fuss", einzug: "        " })}
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
<script src="assets/js/map.js" defer></script>
<script src="assets/js/doors.js" defer></script>
<script src="assets/js/zahlen.js" defer></script>
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}
