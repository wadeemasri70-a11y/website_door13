import { arrowIcon } from "./layout.mjs";
import { company } from "./content/index.mjs";

const esc = (s) => String(s).replace(/&(?![a-z#0-9]+;)/g, "&amp;");

export function pageHero({ eyebrow, h1, lead, actions = [] }) {
  const btns = actions.map((a, i) =>
    `<a class="btn ${i ? "btn--ghost" : "btn--accent"}" href="${a.href}">${a.label}${i ? "" : arrowIcon}</a>`
  ).join("\n        ");
  return `  <section class="page-hero">
    <div class="shell">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${h1}</h1>
      <p class="page-hero__lead">${lead}</p>
      ${btns ? `<div class="hero__actions">
        ${btns}
      </div>` : ""}
    </div>
  </section>`;
}

export function section({ id = "", variant = "paper", eyebrow, h2, lead, html = "" }) {
  return `  <section class="section section--${variant}"${id ? ` id="${id}"` : ""}>
    <div class="shell">
      ${h2 ? `<div class="section__head" data-reveal>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h2>${h2}</h2>
        ${lead ? `<p>${lead}</p>` : ""}
      </div>` : ""}
${html}
    </div>
  </section>`;
}

export function cards(items) {
  const body = items.map((c, i) => `        <article class="card" data-reveal${i ? ` style="--reveal-delay:${i * 80}ms"` : ""}>
          ${c.h3 ? `<h3>${c.h3}</h3>` : ""}
          ${c.p ? `<p>${c.p}</p>` : ""}
          ${c.list ? `<ul>${c.list.map((l) => `<li>${l}</li>`).join("")}</ul>` : ""}
          ${c.href ? `<p class="more"><a class="link-line" href="${c.href}">${c.linkLabel || "Mehr erfahren"} →</a></p>` : ""}
        </article>`).join("\n");
  return `      <div class="grid grid--3">
${body}
      </div>`;
}

export function prose(parts) {
  return `      <div class="prose" data-reveal>
${parts.map((p) => (p.startsWith("<") ? `        ${p}` : `        <p>${p}</p>`)).join("\n")}
      </div>`;
}

export function checks(items, title) {
  return `      <div class="checks" data-reveal>
        ${title ? `<h3>${title}</h3>` : ""}
        <ul>
${items.map((i) => `          <li>${i}</li>`).join("\n")}
        </ul>
      </div>`;
}

export function media({ src, alt, caption = "", ratio = "4 / 3", note = "" }) {
  return `      <figure class="media" data-reveal style="--media-ratio:${ratio}">
        <img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
        ${note ? `` : ""}
      </figure>`;
}

export function facts(items) {
  return `      <div class="stats" data-reveal>
${items.map((f) => `        <div class="stat"><b>${f.b}</b><span>${f.span}</span></div>`).join("\n")}
      </div>`;
}

export function norms(items) {
  return `      <ul class="norms" data-reveal>
${items.map((n) => `        <li>${n}</li>`).join("\n")}
      </ul>`;
}

export function ctaBand({ h2, p, label = "Anfrage senden", href = "kontakt.html" }) {
  return `  <section class="section section--white">
    <div class="shell">
      <div class="alarm" data-reveal>
        <div>
          <h2>${h2}</h2>
          <p>${p}</p>
        </div>
        <a class="btn" href="${href}">${label}</a>
      </div>
    </div>
  </section>`;
}

export function contactStrip() {
  return `  <section class="section section--dark">
    <div class="shell">
      <div class="contact-strip" data-reveal>
        <div>
          <p class="eyebrow">Direkter Draht</p>
          <h2>Lieber kurz anrufen?</h2>
          <p class="lede lede--on-contrast">
            ${company.hours} erreichen Sie unsere Disposition direkt.
            Außerhalb der Zeiten nehmen wir Störungen telefonisch auf.
          </p>
        </div>
        <div class="contact-strip__actions">
          <a class="btn btn--accent" href="tel:${company.phoneHref}">${company.phone}</a>
          <a class="btn btn--ghost" href="mailto:${company.mail}">${company.mail}</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function form({ id = "anfrage", kind = "kontakt" }) {
  const options = kind === "wartung"
    ? ["Wartungsvertrag / wiederkehrende Prüfung", "Einmalige Prüfung", "Störung / Reparatur", "Modernisierung bestehender Antriebe"]
    : ["Wartungsvertrag / wiederkehrende Prüfung", "Störung / Reparatur", "Neue Anlage / Angebot", "Modernisierung bestehender Antriebe", "Sonstiges"];
  return `      <form class="form" id="${id}" data-form novalidate>
        <div class="field--row">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="firma">Firma / Objekt</label>
            <input id="firma" name="firma" type="text" autocomplete="organization">
          </div>
        </div>
        <div class="field--row">
          <div class="field">
            <label for="email">E-Mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="telefon">Telefon</label>
            <input id="telefon" name="telefon" type="tel" autocomplete="tel">
          </div>
        </div>
        <div class="field">
          <label for="anliegen">Anliegen</label>
          <select id="anliegen" name="anliegen">
${options.map((o) => `            <option>${o}</option>`).join("\n")}
          </select>
        </div>
        <div class="field">
          <label for="nachricht">Nachricht</label>
          <textarea id="nachricht" name="nachricht" placeholder="Fabrikat, Standort, seit wann besteht die Störung?" required></textarea>
        </div>
        <p class="form__status" data-form-status hidden role="status"></p>
        <button class="btn btn--accent" type="submit">Anfrage senden${arrowIcon}</button>
        <p class="form__note">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der Anfrage zu.
          Hinweise dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.
        </p>
      </form>`;
}

export function contactData() {
  return `      <dl class="contact__data" data-reveal>
        <div class="contact__row">
          <dt>Telefon</dt>
          <dd><a class="link-line" href="tel:${company.phoneHref}">${company.phone}</a>
            <small>Mobil / Notdienst: <a href="tel:${company.mobileHref}">${company.mobile}</a></small></dd>
        </div>
        <div class="contact__row">
          <dt>E-Mail</dt>
          <dd><a class="link-line" href="mailto:${company.mail}">${company.mail}</a></dd>
        </div>
        <div class="contact__row">
          <dt>Anschrift</dt>
          <dd>${company.street}<small>${company.zip} ${company.city}</small></dd>
        </div>
        <div class="contact__row">
          <dt>Sprechzeiten</dt>
          <dd>${company.hours}<small>Störungsannahme darüber hinaus telefonisch</small></dd>
        </div>
      </dl>`;
}

export function serviceCards(services) {
  return `      <div class="grid grid--3">
${services.map((s, i) => `        <article class="card" data-reveal${i ? ` style="--reveal-delay:${(i % 3) * 80}ms"` : ""}>
          <div class="card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${s.icon}</svg>
          </div>
          <h3>${s.nav}</h3>
          <p>${s.lead}</p>
          <p class="more"><a class="link-line" href="${s.slug}.html">Zur Leistung →</a></p>
        </article>`).join("\n")}
      </div>`;
}

export function referenceTeaser(projects) {
  return `      <div class="refs">
${projects.slice(0, 3).map((p, i) => `        <article class="ref" data-reveal${i ? ` style="--reveal-delay:${i * 80}ms"` : ""} style="--ref-img:url('${p.img}')">
          <span class="ref__tag">${p.tag}</span>
          <h3>${p.title.split(":")[0]}</h3>
          <p>${p.text.slice(0, 130)}…</p>
        </article>`).join("\n")}
      </div>
      <p class="more more--wide"><a class="btn btn--ghost" href="referenzen.html">Alle Projekte ansehen</a></p>`;
}

export function treeBlock(c) {
  return `      <div class="tree" data-reveal>
        <figure class="tree__sheet">
          <img src="${c.sheet}" alt="${c.alt}" loading="lazy" width="774" height="1024">
        </figure>
        <div class="tree__body">
${c.text.map((t) => `          <p>${t}</p>`).join("\n")}
          <div class="tree__facts">
${c.facts.map((f) => `            <div><b>${f.b}</b><span>${f.span}</span></div>`).join("\n")}
          </div>
          <img class="tree__partner" src="${c.partner}" alt="Planet Tree – offizieller Partner" loading="lazy" width="205" height="206">
        </div>
      </div>`;
}

export function partnerStrip(partners, { heading = "Partner & Mitgliedschaften" } = {}) {
  const plate = (p, hidden) => {
    const body = p.file
      ? `<img src="${p.file}" alt="${hidden ? "" : esc(p.name) + " – " + esc(p.note)}" loading="lazy">`
      : `<span class="partner__name">${p.name}</span>
            <span class="partner__note">${p.note}</span>`;
    return `          <li class="partner${p.file ? " partner--logo" : ""}" style="--partner-color:${p.color}"${hidden ? ' aria-hidden="true"' : ""}>
            ${body}
          </li>`;
  };

  const lauf = [false, true, true]
    .map((hidden) => partners.map((p) => plate(p, hidden)).join("\n"))
    .join("\n");

  return `      <div class="partners" data-reveal>
        <p class="partners__label">${heading}</p>
        <div class="partners__viewport">
          <ul class="partners__track">
${lauf}
          </ul>
        </div>
      </div>`;
}

export function certificateCards(items) {
  return `      <ul class="certs">
${items.map((c, i) => `        <li class="cert" data-reveal${i ? ` style="--reveal-delay:${i * 80}ms"` : ""}>
          <a class="cert__sheet" href="${c.file}" target="_blank" rel="noopener">
            <img src="${c.file}" alt="${esc(c.alt)}" loading="lazy">
          </a>
          <div>
            <h3>${c.title}</h3>
            <p>${c.meta}</p>
          </div>
        </li>`).join("\n")}
      </ul>`;
}

export function bandImage({ src, alt, width, height, eyebrow, h2, lead }) {
  const kopf = eyebrow || h2 || lead
    ? `    <div class="shell">
      <div class="bandbild__kopf" data-reveal>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        ${h2 ? `<h2>${h2}</h2>` : ""}
        ${lead ? `<p>${lead}</p>` : ""}
      </div>
    </div>`
    : "";
  return `  <section class="bandbild">
${kopf}
    <figure class="bandbild__bild">
      <img src="${src}" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async">
    </figure>
  </section>`;
}

export function map({ hoehe = "" } = {}) {
  const m = company.maps;
  return `      <div class="map${hoehe ? " map--" + hoehe : ""}" data-map data-reveal
           data-maps-key="${m.key}"
           data-address="${esc(m.address)}"
           data-lat="${m.lat}" data-lng="${m.lng}" data-zoom="${m.zoom}"
           data-title="${esc(company.name)}"
           data-maps-link="${m.link}">
        <div class="map__canvas" data-map-canvas></div>
        <div class="map__vorschau">
          <svg class="map__pin" viewBox="0 0 44 58" aria-hidden="true">
            <path d="M22 57S41 34.8 41 21.9C41 10.4 32.5 1 22 1S3 10.4 3 21.9C3 34.8 22 57 22 57z"
                  fill="var(--accent)" stroke="var(--bg-2)" stroke-width="2"/>
            <circle cx="22" cy="21.5" r="7" fill="var(--bg-2)"/>
          </svg>
          <p class="map__adresse">${company.name}<br>${m.address}</p>
          <button class="btn btn--accent" type="button" data-map-load>Karte laden</button>
          <p class="map__hinweis">
            Beim Laden wird eine Verbindung zu Google Maps aufgebaut.
            <a href="${m.link}" target="_blank" rel="noopener">In Google Maps öffnen</a>
          </p>
        </div>
      </div>`;
}
