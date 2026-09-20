/* Inhalte der sechs Leistungsbereiche.
   Texte aus dem bestehenden Auftritt sind als solche gekennzeichnet;
   alle übrigen sind Entwürfe und vor dem Livegang zu prüfen. */

export const services = [
  {
    slug: "leistung-schiebetueren",
    nav: "Automatische Schiebetüren",
    title: "Automatische Schiebetüren – Montage, Service und Prüfung",
    description: "Automatische Schiebetüranlagen für Eingänge mit hoher Frequenz: Montage, Einstellung, Sicherheitsprüfung nach DIN 18650 und EN 16005 – herstellerunabhängig im Rheinland.",
    icon: `<path d="M3 4h18v3H3zM7 7v13M17 7v13M7 20H3m18 0h-4" stroke-linecap="round"/><path d="M9.5 13h1m3 0h1" stroke-linecap="round"/>`,
    h1: "Automatische Schiebetüren, die auch im Dauerbetrieb leise bleiben.",
    lead: "Linear- und Teleskopanlagen für Eingänge, die täglich tausendfach auf- und zugehen. Wir montieren, stellen ein, prüfen nach Norm – und halten die Anlage über Jahre in Form.",
    intro: [
      "Eine Schiebetür ist der erste Eindruck Ihres Gebäudes und gleichzeitig ein sicherheitsrelevantes Bauteil. Läuft sie unruhig, hört man das im ganzen Foyer; steht sie still, steht der Betrieb.",
      "Wir arbeiten herstellerunabhängig an Anlagen von GEZE, dormakaba, Assa Abloy, Record, Tormax und weiteren Fabrikaten – von der Neuanlage bis zur Instandsetzung einer Anlage, die schon zwanzig Jahre läuft."
    ],
    blocks: [
      { h3: "Neuanlage & Montage", p: "Von der Aufmaßaufnahme über die Montage von Laufschiene, Flügeln und Abdeckhaube bis zur Programmierung der Steuerung und Einweisung Ihres Personals." },
      { h3: "Sicherheitssensorik", p: "Präsenz- und Bewegungsmelder korrekt ausgerichtet, Nebenschließkanten gesichert, Öffnungs- und Haltezeiten auf die tatsächliche Nutzung eingestellt." },
      { h3: "Fluchtweg & Redundanz", p: "Anlagen in Rettungswegen brauchen geprüfte Steuerungen, Notöffnung und regelmäßige Funktionsprüfung. Wir planen und dokumentieren das mit." }
    ],
    checksTitle: "Was bei einer Montage dazugehört",
    checks: [
      "Präzise Vorbereitung der Befestigungspunkte",
      "Montage von Laufschiene, Türflügel und Abdeckhaube",
      "Anschluss und Programmierung der Steuerung",
      "Einstellung der Laufparameter nach Kundenvorgaben",
      "Sicherheitsprüfung gemäß DIN 18650 / EN 16005",
      "Übergabe und Einweisung des Kunden"
    ],
    norms: ["DIN 18650", "DIN EN 16005", "ASR A1.7", "DIN 18040 (Barrierefreiheit)"],
    image: { src: "assets/img/referenz/volksbank-koeln-bonn.jpg", alt: "Automatische Schiebetüranlage der Volksbank Köln Bonn", caption: "Projektbeispiel: Schiebetüranlage mit GEZE ECdrive, Volksbank Köln Bonn." }
  },
  {
    slug: "leistung-drehtuerantriebe",
    nav: "Drehtürantriebe",
    title: "Drehtürantriebe – barrierefreie Türen nachrüsten",
    description: "Drehtürantriebe für Praxen, Verwaltungen und Wohnanlagen: Nachrüstung im Bestand, barrierefreier Zugang nach DIN 18040, Wartung und Reparatur aller gängigen Fabrikate.",
    icon: `<path d="M4 20V4h9l7 5v11z" stroke-linejoin="round"/><path d="M13 4v5h7" stroke-linejoin="round"/><circle cx="10.5" cy="13.5" r="1.4"/>`,
    h1: "Drehtürantriebe: aus einer schweren Tür wird ein barrierefreier Zugang.",
    lead: "Ob Praxis, Verwaltung oder Wohnanlage – ein Antrieb am vorhandenen Türblatt macht den Eingang für alle nutzbar, ohne die Tür zu ersetzen.",
    intro: [
      "Viele Bestandstüren sind bauartbedingt schwer. Für Menschen mit Rollator, Kinderwagen oder Gehhilfe wird der Eingang damit zur Hürde. Ein Drehtürantrieb löst das im vorhandenen Türelement – deutlich wirtschaftlicher als ein Neubau.",
      "Wir arbeiten unter anderem mit GEZE Powerturn und dormakaba ED 250; beide sind für stark frequentierte Bereiche ausgelegt und lassen sich fein auf Ihre Tür einstellen."
    ],
    blocks: [
      { h3: "Nachrüstung im Bestand", p: "Antrieb, Gestänge und Steuerung passend zum vorhandenen Türelement – inklusive Prüfung, ob Beschlag und Zarge die Kräfte aufnehmen." },
      { h3: "Bedienung nach Wunsch", p: "Taster, Funk, Radar, Zeitsteuerung oder Anbindung an die Zutrittskontrolle. Auf Wunsch mit Sicherheitssensorik an Haupt- und Nebenschließkante." },
      { h3: "Doppelflügel & Schließfolge", p: "Bei zweiflügeligen Anlagen stimmen wir Schließfolgeregler und Antriebe so ab, dass die Tür sicher und in der richtigen Reihenfolge schließt." }
    ],
    checksTitle: "Typische Einsatzorte",
    checks: [
      "Arztpraxen und Gemeinschaftspraxen",
      "Verwaltungsgebäude und Ämter",
      "Schulen, Kitas und Kulturbauten",
      "Wohnanlagen und Seniorenwohnen",
      "Nebeneingänge und Durchgangstüren"
    ],
    norms: ["DIN 18650", "DIN EN 16005", "DIN 18040", "DIN SPEC 1104"],
    image: { src: "assets/img/referenz/bundeskunsthalle-bonn.jpg", alt: "Automatische Drehflügeltür der Bundeskunsthalle Bonn", caption: "Projektbeispiel: nachgerüsteter Drehflügelantrieb, Bundeskunsthalle Bonn." }
  },
  {
    slug: "leistung-zutrittskontrolle",
    nav: "Zutrittskontrolle & Sicherheit",
    title: "Zutrittskontrolle & Sicherheitstechnik für Türanlagen",
    description: "Zutrittskontrolle, Schließsysteme und Türüberwachung – geplant, montiert und mit der Türautomatik sauber verbunden.",
    icon: `<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" stroke-linecap="round"/><circle cx="12" cy="15.2" r="1.3"/>`,
    h1: "Wer darf wann durch welche Tür? Zutritt, sauber geregelt.",
    lead: "Zutrittskontrolle ist erst dann gut, wenn niemand über sie nachdenken muss: Der Berechtigte kommt durch, alle anderen nicht – und im Notfall geht die Tür trotzdem auf.",
    intro: [
      "Wir planen Zutrittslösungen immer zusammen mit der Türtechnik. Denn Leser, Motorschloss, Antrieb und Rettungswegsteuerung müssen zusammenspielen, sonst entsteht genau an der Tür ein Konflikt zwischen Sicherheit und Flucht.",
      "Vom einzelnen Transponderleser an der Nebentür bis zur vernetzten Anlage über mehrere Gebäude: Wir setzen um, was zu Ihrem Haus passt, und übergeben eine Dokumentation, mit der Ihre Haustechnik weiterarbeiten kann."
    ],
    blocks: [
      { h3: "Leser & Medien", p: "Transponder, Karte, Code oder Smartphone – inklusive Vergabe- und Sperrkonzept, damit ein verlorener Schlüssel kein Sicherheitsproblem mehr ist." },
      { h3: "Motorschlösser & Beschläge", p: "Selbstverriegelnde Panikschlösser, elektrische Türöffner und Beschläge, abgestimmt auf Brandschutz- und Rettungswegauflagen." },
      { h3: "Überwachung & Meldung", p: "Türzustand, Riegelkontakt und Sabotage werden gemeldet – auf Wunsch aufgeschaltet auf Leitstelle oder Gebäudeleittechnik." }
    ],
    checksTitle: "Worauf wir besonders achten",
    checks: [
      "Rettungsweg schlägt Zutrittskontrolle – immer",
      "Brandschutztüren dürfen nicht dauerhaft offen gehalten werden",
      "Ein Berechtigungskonzept, das auch in drei Jahren noch gepflegt wird",
      "Saubere Kabelwege und dokumentierte Klemmpläne",
      "Ersatzteilverfügbarkeit statt Insellösung"
    ],
    norms: ["EltVTR", "DIN EN 179 / 1125", "DIN EN 16005", "DSGVO-konforme Protokollierung"],
    image: { src: "assets/img/referenz/ordnungsamt-stolberg.jpg", alt: "Neue Aluminium-Türanlage am Ordnungsamt Stolberg", caption: "Projektbeispiel: Eingangsbereich Ordnungsamt Stolberg." }
  },
  {
    slug: "leistung-rettungswegsysteme",
    nav: "Rettungswegsysteme",
    title: "Rettungswegsysteme – Fluchttüren sicher und geprüft",
    description: "Rettungswegsicherung, Fluchttürsteuerungen, Not-Auf-Taster und Feststellanlagen: Montage, Prüfung und Instandhaltung nach DIN 14677 und EltVTR.",
    icon: `<path d="M4 20V4h9v16z" stroke-linejoin="round"/><path d="M16.5 8.5 21 12l-4.5 3.5M13 12h8" stroke-linecap="round" stroke-linejoin="round"/>`,
    h1: "Im Ernstfall zählt eine Sekunde – und eine Tür, die aufgeht.",
    lead: "Rettungswegtechnik ist die unsichtbarste Leistung am Bau: Sie fällt nur auf, wenn sie fehlt. Wir planen, montieren und prüfen sie so, dass sie im Ernstfall trägt.",
    intro: [
      "Türen in Rettungswegen stehen unter besonderen Auflagen: Sie müssen im Gefahrenfall ohne Hilfsmittel und ohne Vorwissen zu öffnen sein, dürfen aber im Alltag nicht jedem offenstehen. Dieser Widerspruch wird über geprüfte Steuerungen, Not-Auf-Taster und klare Verriegelungskonzepte aufgelöst.",
      "Dazu gehören auch Feststellanlagen an Brandschutztüren: Sie halten die Tür im Alltag offen und lassen sie bei Rauch sicher zufallen. Nach DIN 14677 sind sie mindestens jährlich von einer befähigten Person zu prüfen – diese Prüfung übernehmen wir inklusive Dokumentation."
    ],
    blocks: [
      { h3: "Fluchttürsteuerungen", p: "Zentralen, Not-Auf-Taster, Kurzzeitfreigabe und Alarmierung – montiert, in Betrieb genommen und mit der Türautomatik verbunden." },
      { h3: "Feststellanlagen", p: "Rauchschalter, Zentrale, Haftmagnet und Türschließer als geprüftes System. Jährliche Prüfung nach DIN 14677 mit Protokoll für Ihre Unterlagen." },
      { h3: "Panikbeschläge", p: "Beschläge nach DIN EN 179 und EN 1125, abgestimmt auf Nutzung, Personenzahl und Fluchtrichtung." }
    ],
    checksTitle: "Betreiberpflichten, die wir mit abdecken",
    checks: [
      "Jährliche Prüfung von Feststellanlagen (DIN 14677)",
      "Wiederkehrende Prüfung kraftbetätigter Türen (DIN EN 16005)",
      "Sicht- und Funktionsprüfung von Fluchttürsteuerungen",
      "Fristenverwaltung – wir erinnern rechtzeitig",
      "Mängel dokumentiert, priorisiert und beseitigt"
    ],
    norms: ["DIN 14677", "EltVTR", "DIN EN 179", "DIN EN 1125", "ASR A2.3"],
    image: { src: "assets/img/referenz/heinrich-hanselmann-schule.jpg", alt: "Automatische Schiebetüranlage am Haupteingang der Heinrich-Hanselmann-Schule", caption: "Projektbeispiel: Haupteingang Heinrich-Hanselmann-Schule." }
  },
  {
    slug: "leistung-obentuerschliesser",
    nav: "Obentürschließer",
    title: "Obentürschließer – richtig ausgewählt, richtig eingestellt",
    description: "Obentürschließer und Gleitschienensysteme: Auswahl nach Türgröße, Montage, Einstellung von Schließkraft und Dämpfung, Reparatur und Austausch.",
    icon: `<path d="M4 6h13a3 3 0 0 1 3 3v3" stroke-linecap="round"/><path d="M20 12a4 4 0 0 1-4 4H8" stroke-linecap="round"/><rect x="3" y="4" width="4" height="16" rx="1"/>`,
    h1: "Der Türschließer ist kein Zubehör. Er ist die Tür.",
    lead: "Schlägt eine Tür, klemmt sie oder fällt sie nicht ins Schloss, liegt es fast immer am Schließer oder an seiner Einstellung. Beides bekommen wir in den Griff.",
    intro: [
      "Ein Obentürschließer muss zur Türgröße, zum Gewicht und zur Einbausituation passen. Ist er zu schwach, schließt die Tür nicht sicher; ist er zu stark, kommen Kinder, ältere Menschen und Rollstuhlfahrende nicht mehr durch. Beides ist bei Brandschutz- und Rettungswegtüren ein Mangel.",
      "Wir prüfen Größe, Montageart und Einstellung, tauschen verschlissene Modelle und richten Gleitschienen so ein, dass die Tür ruhig, dicht und normgerecht schließt."
    ],
    blocks: [
      { h3: "Auswahl & Montage", p: "Gestänge oder Gleitschiene, Kopf- oder Bandseitenmontage, Größe nach EN 1154 – passend zur Tür statt nach Katalog." },
      { h3: "Einstellung", p: "Schließkraft, Schließgeschwindigkeit, Endschlag und Öffnungsdämpfung fein justiert. Barrierefrei heißt: geringe Bedienkraft bei sicherem Schließen." },
      { h3: "Schließfolgeregler", p: "Bei zweiflügeligen Türen sorgt der Regler dafür, dass Standflügel und Gangflügel in der richtigen Reihenfolge schließen – Voraussetzung für Rauchdichtigkeit." }
    ],
    checksTitle: "Woran Sie einen fälligen Schließer erkennen",
    checks: [
      "Die Tür schlägt hörbar ins Schloss",
      "Sie fällt nicht mehr vollständig zu",
      "Öl tritt am Gehäuse aus",
      "Die Tür lässt sich nur mit hohem Kraftaufwand öffnen",
      "Der Standflügel schließt vor dem Gangflügel"
    ],
    norms: ["DIN EN 1154", "DIN EN 1158", "DIN 18040", "DIN 14677"],
    image: { src: "assets/img/referenz/gymnasium-schleiden.jpg", alt: "Nachgerüstete Doppelflügeltür im Gymnasium Schleiden", caption: "Projektbeispiel: Doppelflügeltür mit Schließfolgeregelung, Gymnasium Schleiden." }
  },
  {
    slug: "leistung-pruefung-wartung",
    nav: "Prüfung & Wartung",
    title: "Prüfung & Wartung automatischer Türen – nach Norm dokumentiert",
    description: "Wiederkehrende Prüfung und Wartung von Türanlagen, Toren und Feststellanlagen nach DIN EN 16005, DIN 18650, DIN 14677 und ASR A1.7 – mit Fristenverwaltung und Protokoll.",
    icon: `<path d="M9 4h6v3H9zM7 7h10v13H7z" stroke-linejoin="round"/><path d="m9.7 13.4 1.7 1.7 3-3.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    h1: "Geprüft nach Norm. Dokumentiert für Ihre Unterlagen.",
    lead: "Betreiber kraftbetätigter Türen sind zur wiederkehrenden Prüfung verpflichtet. Wir übernehmen Fristen, Prüfung und Protokoll – Sie bekommen Unterlagen, die jeder Sachverständige akzeptiert.",
    intro: [
      "Mindestens einmal jährlich muss eine kraftbetätigte Tür von einer sachkundigen Person geprüft werden. Geprüft wird nicht nur, ob sie fährt, sondern ob Kräfte, Zeiten und Sensorik noch innerhalb der Grenzwerte liegen.",
      "Wir führen diese Prüfung für Ihren gesamten Anlagenbestand durch – unabhängig vom Fabrikat. Sie erhalten je Anlage ein Protokoll, eine Mängelliste mit Priorisierung und ein Angebot für die Beseitigung, falls etwas zu tun ist."
    ],
    blocks: [
      { h3: "Wartungsvertrag", p: "Feste Intervalle, fester Ansprechpartner, planbare Kosten. Wir melden uns, bevor die Frist abläuft – Sie müssen nichts nachhalten." },
      { h3: "Einmalige Prüfung", p: "Auch ohne Vertrag: Wir prüfen Ihre Anlagen, dokumentieren den Ist-Zustand und sagen Ihnen ehrlich, was wirklich gemacht werden muss." },
      { h3: "Mängelbeseitigung", p: "Verschleißteile, Sensorik, Steuerungen – meistens direkt beim Termin, weil die gängigen Teile im Fahrzeug mitfahren." }
    ],
    checksTitle: "Inhalt einer Prüfung",
    checks: [
      "Sicht- und Funktionsprüfung der gesamten Anlage",
      "Messung von Kräften, Öffnungs- und Schließzeiten",
      "Prüfung der Sicherheitssensorik und Notentriegelung",
      "Kontrolle von Befestigung, Laufwerk und Verschleißteilen",
      "Protokoll, Prüfplakette und Eintrag ins Prüfbuch"
    ],
    norms: ["DIN EN 16005", "DIN 18650", "DIN 14677", "ASR A1.7", "DGUV Vorschrift 3"],
    extra: {
      eyebrow: "Obendrauf",
      h2: "Ein Wartungsvertrag, ein Baum.",
      lead: "Für jeden abgeschlossenen Wartungsvertrag pflanzen wir gemeinsam mit Planet Tree einen Baum im Hessen Forst – mit Urkunde, Standort und Koordinaten.",
      image: {
        src: "assets/img/zertifikat-planet-tree.png",
        alt: "Musterurkunde: ein gepflanzter Baum im Hessen Forst",
        caption: "Musterurkunde, wie sie unsere Vertragskundinnen und -kunden erhalten.",
        ratio: "3 / 4"
      }
    },
    image: { src: "assets/img/referenz/bayarena-leverkusen.jpg", alt: "Automatiktür in der Gastronomie der BayArena Leverkusen", caption: "Projektbeispiel: dormakaba ED 250 F, BayArena Leverkusen." }
  }
];
