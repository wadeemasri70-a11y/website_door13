import { writeFileSync } from "node:fs";
import { page, arrowIcon } from "./layout.mjs";
import { company } from "./nav.mjs";
import { services, projects, partners } from "./data.mjs";
import { homeBody } from "./pages/home.mjs";
import * as B from "./blocks.mjs";

const out = (slug, html) => { writeFileSync(new URL(`../${slug}.html`, import.meta.url), html); console.log("→", slug + ".html"); };

/* ---------------------------------------------------------------- Startseite */
out("index", page({
  slug: "index",
  title: "Falke Türautomation – Automatische Türen, Wartung & Service im Rheinland",
  description: "Falke Türautomation aus Bedburg montiert, wartet und repariert automatische Türen, Rettungswegsysteme, Zutrittskontrolle und Türschließer – herstellerunabhängig im Raum Köln, Düsseldorf, Bonn und Aachen.",
  body: homeBody()
}));

/* --------------------------------------------------------- Leistungsübersicht */
out("leistungen", page({
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
}));

/* ------------------------------------------------------------ Leistungsseiten */
for (const s of services) {
  out(s.slug, page({
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
}

/* ------------------------------------------------------------ Wartungsanfrage */
out("wartungsanfrage", page({
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
}));

/* ------------------------------------------------------------------ Referenzen */
out("referenzen", page({
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
          <!-- Originalbild der bestehenden Seite: ${p.orig} -->
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
}));

/* ------------------------------------------------------------------- Über uns */
out("ueber-uns", page({
  slug: "ueber-uns", active: "ueber-uns.html",
  title: "Wir stellen uns vor – Falke Türautomation",
  description: "Gegründet 2020 von René Falke: elf Kolleginnen und Kollegen, davon sieben Servicetechniker, im Einsatz für automatische Türen im Rheinland.",
  body: [
    B.pageHero({
      eyebrow: "Über uns",
      h1: "Aus Bedburg – unterwegs im ganzen Rheinland.",
      lead: "René Falke hat das Unternehmen 2020 nach über zehn Jahren in der Türtechnik gegründet. Heute sind wir elf Kolleginnen und Kollegen, davon sieben Servicetechniker."
    }),
    B.section({
      variant: "paper",
      html: B.prose([
        "Unser Schwerpunkt liegt dort, wo andere abwinken: bei Bestandsanlagen. Wir halten Anlagen am Laufen, statt sie vorschnell zu ersetzen – das ist wirtschaftlicher für Sie und ehrlicher gegenüber dem, was verbaut ist.",
        "Weil wir herstellerunabhängig arbeiten, betreuen wir ganze Liegenschaften aus einer Hand: GEZE, dormakaba, Assa Abloy und weitere Fabrikate stehen bei uns auf derselben Wartungsliste.",
        "Zu unseren Auftraggebern zählen unter anderem die RWTH Aachen, der Rhein-Sieg-Kreis und die Stadt Köln, dazu Kliniken, Schulen, Kulturbauten, Banken und Industriebetriebe."
      ]) + "\n" + B.media({
        src: "assets/img/referenz/ordnungsamt-stolberg.jpg",
        alt: "Neue Aluminium-Türanlage am Ordnungsamt Stolberg",
        caption: "Aus einem unserer Projekte: Eingangsbereich Ordnungsamt Stolberg.",
        ratio: "4 / 3"
      }) + "\n" + B.facts([
        { b: "2020", span: "gegründet von René Falke" },
        { b: "11", span: "Mitarbeitende im Team" },
        { b: "7", span: "Servicetechniker im Außendienst" },
        { b: "4", span: "Regionen im Einsatz" }
      ])
    }),
    B.section({
      variant: "dark", eyebrow: "Einsatzgebiet", h2: "Köln, Düsseldorf, Bonn, Aachen – und alles dazwischen.",
      html: B.norms(["Köln", "Düsseldorf", "Bonn", "Aachen", "Rhein-Erft-Kreis", "Rhein-Sieg-Kreis"])
    }),
    B.contactStrip()
  ].join("\n\n")
}));

out("team", page({
  slug: "team", active: "ueber-uns.html",
  title: "Das Team – Falke Türautomation",
  description: "Sieben Servicetechniker, eine Disposition, ein Geschäftsführer: die Menschen hinter Falke Türautomation.",
  body: [
    B.pageHero({
      eyebrow: "Das Team",
      h1: "Menschen, die Sie beim Namen kennen.",
      lead: "Kein Callcenter, kein Subunternehmer: Sie sprechen mit der Disposition, und es kommt ein Techniker, der Ihre Anlage schon kennt."
    }),
    B.section({
      variant: "paper",
      html: `      <div class="grid grid--3">
        <article class="card" data-reveal>
          <h3>René Falke</h3>
          <p>Geschäftsführer, über zehn Jahre in der Türtechnik. Ansprechpartner für Projekte und Abnahmen.</p>
        </article>
        <article class="card" data-reveal style="--reveal-delay:80ms">
          <h3>Disposition</h3>
          <p>Nimmt Störungen auf, priorisiert und plant die Touren. Hier laufen alle Termine zusammen.</p>
        </article>
        <article class="card" data-reveal style="--reveal-delay:160ms">
          <h3>Sieben Servicetechniker</h3>
          <p>Im Rheinland unterwegs, mit Ersatzteilen an Bord und regelmäßig geschult auf die gängigen Fabrikate.</p>
        </article>
      </div>
      <!-- Teamfotos: hier je Person ein Bild einsetzen (assets/img/team-*.jpg) -->`
    }),
    B.ctaBand({
      h2: "Lust, bei uns mitzufahren?",
      p: "Wir suchen Servicetechnikerinnen und Servicetechniker für Türtechnik im Rheinland.",
      label: "Offene Stellen", href: "stellen.html"
    })
  ].join("\n\n")
}));

out("karriere", page({
  slug: "karriere", active: "ueber-uns.html",
  title: "Komm in unser Team – Karriere bei Falke Türautomation",
  description: "Arbeiten bei Falke Türautomation: Servicetechnik für automatische Türen im Rheinland, feste Touren, eigenes Fahrzeug, planbare Arbeitszeiten.",
  body: [
    B.pageHero({
      eyebrow: "Komm in unser Team",
      h1: "Schrauben statt Schichtplan.",
      lead: "Wir sind ein kleines Team mit klaren Abläufen: eigene Touren, eigenes Fahrzeug, keine Montage im Akkord – und ein Chef, der die Technik selbst kennt."
    }),
    B.section({
      variant: "paper",
      html: B.prose([
        "Bei uns arbeiten Menschen, die wissen wollen, warum eine Anlage ausfällt – nicht nur, welches Teil man tauscht. Dafür geben wir Zeit, Schulungen und das nötige Werkzeug.",
        "Quereinsteiger aus Elektro-, Metall- oder Anlagentechnik sind ausdrücklich willkommen. Wichtiger als der Lebenslauf ist, dass Sie sorgfältig arbeiten und mit Kunden reden können."
      ]) + "\n" + B.checks([
        "Feste Touren im Rheinland – abends zu Hause",
        "Eigenes, voll ausgestattetes Servicefahrzeug",
        "Herstellerschulungen auf gängige Fabrikate",
        "Unbefristet, mit planbaren Arbeitszeiten",
        "Kurze Wege: Der Chef fährt selbst mit"
      ], "Was wir bieten") + "\n" + B.media({
        src: "assets/img/referenz/bayarena-leverkusen.jpg",
        alt: "Montage eines Automatiktürantriebs in der BayArena Leverkusen",
        caption: "Ein Arbeitstag bei uns: Montage in der BayArena Leverkusen.",
        ratio: "16 / 10"
      })
    }),
    B.ctaBand({
      h2: "Klingt nach Ihnen?",
      p: "Schicken Sie uns ein paar Zeilen und Ihren Lebenslauf – ein Anschreiben nach Vorlage brauchen wir nicht.",
      label: "Bewerbung senden", href: "kontakt.html"
    })
  ].join("\n\n")
}));

out("stellen", page({
  slug: "stellen", active: "stellen.html",
  title: "Offene Stellen – Falke Türautomation",
  description: "Aktuelle Stellenangebote bei Falke Türautomation in Bedburg: Servicetechnik für automatische Türen und Tore im Rheinland.",
  body: [
    B.pageHero({
      eyebrow: "Aktuelles",
      h1: "Offene Stellen.",
      lead: "Aktuelle Ausschreibungen. Ist nichts dabei, freuen wir uns trotzdem über eine Initiativbewerbung."
    }),
    B.section({
      variant: "paper",
      html: `      <div class="grid grid--2">
        <article class="card" data-reveal>
          <h3>Servicetechniker:in Türautomatik (m/w/d)</h3>
          <p>Vollzeit · Bedburg und Umgebung · unbefristet</p>
          <ul>
            <li>Wartung, Prüfung und Reparatur automatischer Türanlagen</li>
            <li>Störungsbeseitigung im Rheinland</li>
            <li>Elektro-, Metall- oder Anlagentechnik – oder vergleichbare Praxis</li>
          </ul>
          <p style="margin-top:var(--sp-5)"><a class="link-line" href="kontakt.html">Jetzt bewerben →</a></p>
        </article>
        <article class="card" data-reveal style="--reveal-delay:80ms">
          <h3>Initiativbewerbung</h3>
          <p>Sie passen zu uns, aber gerade ist nichts ausgeschrieben? Schreiben Sie uns trotzdem – wir wachsen weiter.</p>
          <p style="margin-top:var(--sp-5)"><a class="link-line" href="kontakt.html">Kontakt aufnehmen →</a></p>
        </article>
      </div>
      <!-- Weitere Ausschreibungen: Karte duplizieren -->`
    })
  ].join("\n\n")
}));

out("downloads", page({
  slug: "downloads", active: "stellen.html",
  title: "Downloads – Formulare und Unterlagen",
  description: "Unterlagen zum Herunterladen: Wartungsunterlagen, Prüfprotokolle und Informationen rund um automatische Türanlagen.",
  body: [
    B.pageHero({
      eyebrow: "Downloads",
      h1: "Unterlagen zum Mitnehmen.",
      lead: "Prüfprotokolle, Betreiberinformationen und Formulare – hier zum Herunterladen."
    }),
    B.section({
      variant: "paper",
      html: `      <ul class="downloads" data-reveal>
        <!-- Dateien in assets/downloads/ ablegen und href anpassen -->
        <li><a href="#"><span>Betreiberpflichten automatischer Türen (PDF)</span><small>Platzhalter · Datei einsetzen</small></a></li>
        <li><a href="#"><span>Muster-Prüfprotokoll (PDF)</span><small>Platzhalter · Datei einsetzen</small></a></li>
        <li><a href="#"><span>Checkliste vor der Wartung (PDF)</span><small>Platzhalter · Datei einsetzen</small></a></li>
      </ul>`
    })
  ].join("\n\n")
}));

/* --------------------------------------------------------------------- Kontakt */
out("kontakt", page({
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
}));

/* ----------------------------------------------------------------- Rechtliches */
const legal = (slug, title, heading, note) => out(slug, page({
  slug, title: `${title} – ${company.name}`,
  description: `${title} von ${company.name}, ${company.street}, ${company.zip} ${company.city}.`,
  body: [
    B.pageHero({ eyebrow: "Rechtliches", h1: heading, lead: note }),
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
}));
legal("impressum", "Impressum", "Impressum", "Angaben gemäß § 5 TMG.");
legal("datenschutz", "Datenschutzerklärung", "Datenschutz", "Informationen zur Verarbeitung personenbezogener Daten.");

console.log("\nFertig.");
