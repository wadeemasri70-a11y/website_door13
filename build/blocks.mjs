import { arrowIcon } from "./layout.mjs";
import { company } from "./nav.mjs";

const esc = (s) => String(s).replace(/&(?![a-z#0-9]+;)/g, "&amp;");

export function pageHero({ eyebrow, h1, lead, actions = [] }) {
  const btns = actions.map((a, i) =>
    `<a class="btn ${i ? "btn--ghost" : "btn--signal"}" href="${a.href}">${a.label}${i ? "" : arrowIcon}</a>`
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
          ${c.href ? `<p style="margin-top:var(--sp-5)"><a class="link-line" href="${c.href}">${c.linkLabel || "Mehr erfahren"} →</a></p>` : ""}
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

/* Bild-Slot: zeigt bis zum Austausch einen beschrifteten Platzhalter */
export function media({ src, alt, caption = "", ratio = "4 / 3", note = "" }) {
  return `      <figure class="media" data-reveal style="--media-ratio:${ratio}">
        <img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
        ${note ? `<!-- ${note} -->` : ""}
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
          <p class="lede" style="color:var(--fg-muted-on-contrast)">
            ${company.hours} erreichen Sie unsere Disposition direkt.
            Außerhalb der Zeiten nehmen wir Störungen telefonisch auf.
          </p>
        </div>
        <div class="contact-strip__actions">
          <a class="btn btn--signal" href="tel:${company.phoneHref}">${company.phone}</a>
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
        <button class="btn btn--signal" type="submit">Anfrage senden${arrowIcon}</button>
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
