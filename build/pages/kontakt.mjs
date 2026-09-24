import * as B from "../blocks.mjs";

export const pages = [
  {
      slug: "kontakt", active: "kontakt.html",
      title: "Kontakt & Beratung – Falke Türautomation",
      description: "Kontakt zu Falke Türautomation in Bedburg: Telefon, E-Mail, Anschrift und Anfrageformular für Wartung, Störung und neue Anlagen.",
      body: [
        B.pageHero({
          eyebrow: "Beratung & Kontakt",
          h1: "Sagen Sie uns, welche Tür Ärger macht.",
          lead: "Beschreiben Sie Anlage und Standort – wir melden uns in der Regel am selben Werktag mit einer Einschätzung zurück."
        }),
        B.tuerPortal({
          weit: true,
          html: B.section({
            variant: "paper",
            html: `      <div class="contact">
    ${B.contactData()}
    ${B.form({ id: "kontakt", kind: "kontakt" })}
          </div>
${B.map({ hoehe: "breit" })}`
          })
        }),
        B.section({
          variant: "paper",
          eyebrow: "Wer abnimmt",
          h2: "Am anderen Ende sitzt jemand, der Türen kennt.",
          lead: "Störungsmeldung, Wartungsfrage oder ein Angebot – Ihre Anfrage landet direkt bei der Disposition.",
          html: B.media({
            src: "assets/img/ueber-uns/buero-kollege.jpg",
            alt: "Kollege im Buero von Falke Tuerautomation",
            caption: "Im Büro in Bedburg: Hier laufen Termine und Störungsmeldungen zusammen.",
            ratio: "3 / 2"
          })
        })
      ].join("\n\n")
  }
];
