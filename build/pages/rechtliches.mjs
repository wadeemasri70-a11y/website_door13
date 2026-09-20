import * as B from "../blocks.mjs";
import { company } from "../content/index.mjs";

function rechtsseite(slug, titel, ueberschrift, hinweis) {
  return {
    slug,
    title: `${titel} – ${company.name}`,
    description: `${titel} von ${company.name}, ${company.street}, ${company.zip} ${company.city}.`,
    body: [
      B.pageHero({ eyebrow: "Rechtliches", h1: ueberschrift, lead: hinweis }),
      B.section({
        variant: "paper",
        html: B.prose([
          `<p><strong>${company.name}</strong><br>${company.owner}<br>${company.street}<br>${company.zip} ${company.city}</p>`,
          `<p>Telefon: <a href="tel:${company.phoneHref}">${company.phone}</a><br>E-Mail: <a href="mailto:${company.mail}">${company.mail}</a></p>`,
          `<p class="form__note">Hinweis: Der rechtsverbindliche Text ist aus dem bestehenden Auftritt zu übernehmen
           bzw. anwaltlich zu prüfen. Diese Seite liefert nur Struktur und Gestaltung.</p>`
        ])
      })
    ].join("\n\n")
  };
}

export const pages = [
  rechtsseite("impressum", "Impressum", "Impressum", "Angaben gemäß § 5 TMG."),
  rechtsseite("datenschutz", "Datenschutzerklärung", "Datenschutz",
    "Informationen zur Verarbeitung personenbezogener Daten.")
];
