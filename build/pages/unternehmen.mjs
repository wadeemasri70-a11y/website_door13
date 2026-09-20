import * as B from "../blocks.mjs";

/* Über uns, Team, Karriere, offene Stellen, Downloads. */

export const pages = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
];
