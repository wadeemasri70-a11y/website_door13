import * as B from "../blocks.mjs";
import { services, partners } from "../content/index.mjs";

const uebersicht = {
  slug: "leistungen", active: "leistungen.html",
  title: "Unser Angebot – Leistungen von Falke Türautomation",
  description: "Automatische Schiebetüren, Drehtürantriebe, Zutrittskontrolle, Rettungswegsysteme, Obentürschließer sowie Prüfung und Wartung – alles aus einer Hand.",
  body: [
    B.pageHero({
      eyebrow: "Unser Angebot",
      h1: "Alles rund um die automatische Tür – aus einer Hand.",
      lead: "Sechs Leistungsbereiche, ein Ansprechpartner. Wir betreuen Bestandsanlagen genauso sorgfältig wie neue Projekte – herstellerunabhängig und nach Norm.",
      actions: [{ href: "kontakt.html", label: "Beratung anfragen" }, { href: "referenzen.html", label: "Referenzen ansehen" }]
    }),
    B.section({
      variant: "paper",
      html: B.media({
        src: "assets/img/referenz/volksbank-koeln-bonn.jpg",
        alt: "Automatische Schiebetüranlage der Volksbank Köln Bonn",
        caption: "Schiebetüranlage mit GEZE ECdrive, Volksbank Köln Bonn.",
        ratio: "16 / 10"
      }) + "\n" + B.serviceCards(services)
    }),
    B.section({
      variant: "white", id: "partner",
      html: B.partnerStrip(partners)
    }),
    B.section({
      variant: "dark", id: "herstellerunabhaengig",
      eyebrow: "Herstellerunabhängig",
      h2: "Ein Vertrag für Ihren gesamten Anlagenbestand.",
      lead: "Wir sind an keine Marke gebunden. Auch wenn in Ihrem Gebäude mehrere Fabrikate hängen: eine Wartungsliste, ein Techniker, ein Protokoll.",
      html: B.norms(["GEZE", "dormakaba", "Assa Abloy", "weitere Fabrikate auf Anfrage"])
    }),
    B.contactStrip()
  ].join("\n\n")
};

const detailseiten = services.map((s) => ({
  slug: s.slug, active: "leistungen.html",
  title: s.title,
  description: s.description,
  body: [
    B.pageHero({
      eyebrow: s.nav, h1: s.h1, lead: s.lead,
      actions: [{ href: "kontakt.html", label: "Anfrage stellen" }, { href: "leistungen.html", label: "Alle Leistungen" }]
    }),
    B.section({ variant: "paper", html: B.prose(s.intro) + "\n" + B.media(s.image) }),
    B.section({
      variant: "white", eyebrow: "Im Detail", h2: "Was wir an Ihrer Anlage machen.",
      html: B.cards(s.blocks)
    }),
    B.section({
      variant: "dark", eyebrow: "Normen", h2: s.checksTitle,
      html: B.checks(s.checks) + "\n" + B.norms(s.norms)
    }),
    s.extra ? B.section({
      variant: "white",
      eyebrow: s.extra.eyebrow, h2: s.extra.h2, lead: s.extra.lead,
      html: B.media(s.extra.image)
    }) : "",
    B.ctaBand({
      h2: "Passt das zu Ihrer Anlage?",
      p: "Schildern Sie uns kurz Fabrikat und Standort – wir melden uns in der Regel am selben Werktag mit einer Einschätzung.",
      label: "Jetzt anfragen"
    })
  ].join("\n\n")
}));

const wartungsanfrage = {
    slug: "wartungsanfrage", active: "leistungen.html",
    title: "Wartungsanfrage – Prüfung und Wartung anfragen",
    description: "Wartung oder wiederkehrende Prüfung Ihrer Türanlagen anfragen: Anlage beschreiben, Standort angeben – wir melden uns mit Termin und Angebot.",
    body: [
      B.pageHero({
        eyebrow: "Wartungsanfrage",
        h1: "Wartung anfragen – in zwei Minuten erledigt.",
        lead: "Sagen Sie uns, welche Anlagen Sie betreiben und wo sie stehen. Wir prüfen die Fristen, schlagen ein Intervall vor und nennen den Preis."
      }),
      B.section({
        variant: "paper",
        html: `      <div class="contact">
  ${B.contactData()}
  ${B.form({ id: "wartung", kind: "wartung" })}
        </div>`
      })
    ].join("\n\n")
};

export const pages = [uebersicht, ...detailseiten, wartungsanfrage];
