/* Inhalte der Zertifizierung.
   Die Urkunden liegen als Scans vor; ein Klick öffnet die volle Datei. */

/* Sachkundenachweise und Herstellerschulungen */
export const qualifications = [
  {
    file: "assets/img/zertifikat/fta-sachkunde.jpg",
    title: "FTA-Sachkunde: automatische Schiebe- und Drehflügeltüren",
    meta: "Fachverband Türautomation e. V. · 2025, gültig bis 2029",
    alt: "Zertifikat des Fachverbands Türautomation über die Sachkunde für automatische Schiebe- und Drehflügeltüren"
  },
  {
    file: "assets/img/zertifikat/geze-gs262.jpg",
    title: "GEZE GS 262: Praxis und Sachkunde automatische Schiebetürsysteme",
    meta: "GEZE GmbH · 2023",
    alt: "GEZE-Zertifikat über die Sachkunde für automatische Schiebetürsysteme"
  },
  {
    file: "assets/img/zertifikat/hoermann-t30.jpg",
    title: "Hörmann Akademie: Montagetraining T30-Schiebetür",
    meta: "Hörmann Montagezentrum Steinhagen · 2025",
    alt: "Urkunde der Hörmann Akademie über das Montagetraining T30-Schiebetür"
  }
];

/* Ein Baum je Wartungsvertrag – Partnerschaft mit Planet Tree */
export const certificate = {
  sheet: "assets/img/zertifikat-planet-tree.png",
  partner: "assets/img/partner-planet-tree.png",
  alt: "Musterurkunde: Falke Türautomation hat einen Baum gepflanzt – Planet Tree, Hessen Forst",
  text: [
    "Wartung ist bei uns nicht nur eine Pflichtübung: Für jeden abgeschlossenen Wartungsvertrag pflanzen wir gemeinsam mit <strong>Planet Tree</strong> einen Baum im Hessen Forst.",
    "Unsere Kundinnen und Kunden erhalten dafür eine persönliche Urkunde mit dem Standort des Baumes samt Koordinaten – nachvollziehbar statt nur behauptet."
  ],
  facts: [
    { b: "1 Baum", span: "pro Wartungsvertrag" },
    { b: "Hessen Forst", span: "Aufforstungsfläche" },
    { b: "seit 2021", span: "Partnerschaft mit Planet Tree" }
  ]
};
