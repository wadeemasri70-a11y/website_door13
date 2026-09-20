import * as B from "../blocks.mjs";
import { projects } from "../content/index.mjs";

export const pages = [
  {
      slug: "referenzen", active: "referenzen.html",
      title: "Projekte & Referenzen – Türlösungen von Falke im Einsatz",
      description: "Einblicke in unsere Projekte: Türsysteme für öffentliche Gebäude, Schulen, Kliniken, Banken und Kultur – individuell umgesetzt.",
      body: [
        B.pageHero({
          eyebrow: "Referenzen",
          h1: "Lösungen, die Türen öffnen.",
          lead: "Unsere Projekte sprechen für sich: Von automatischen Schiebetüren bis zu komplexer Sicherheitstechnik entwickeln wir Lösungen, die Menschen und Gebäude sicher verbinden. Zu unseren Auftraggebern zählen unter anderem die RWTH Aachen, der Rhein-Sieg-Kreis und die Stadt Köln."
        }),
        B.section({
          variant: "paper",
          html: `      <div class="projects">
    ${projects.map((p, i) => `        <article class="project" data-reveal${i ? ` style="--reveal-delay:${(i % 2) * 80}ms"` : ""}>
              <div class="project__img" style="background-image:url('${p.img}')" role="img" aria-label="${p.alt}"></div>
              <div class="project__body">
                <span class="ref__tag">${p.tag}</span>
                <h2>${p.title}</h2>
                <p>${p.text}</p>
                <p class="project__date">${p.date}</p>
              </div>
            </article>`).join("\n")}
          </div>`
        }),
        B.ctaBand({
          h2: "Ein ähnliches Projekt im Haus?",
          p: "Ob Nachrüstung im Bestand oder Neuanlage – wir schauen uns die Situation an und sagen ehrlich, was sinnvoll ist.",
          label: "Projekt besprechen"
        })
      ].join("\n\n")
  }
];
