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
        B.section({
          variant: "paper",
          html: `      <div class="contact">
    ${B.contactData()}
    ${B.form({ id: "kontakt", kind: "kontakt" })}
          </div>`
        })
      ].join("\n\n")
  }
];
