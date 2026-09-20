export const nav = [
  {
    label: "Leistungen", href: "leistungen.html",
    children: [
      { label: "Unser Angebot", href: "leistungen.html" },
      { label: "Automatische Schiebetüren", href: "leistung-schiebetueren.html" },
      { label: "Drehtürantriebe", href: "leistung-drehtuerantriebe.html" },
      { label: "Zutrittskontrolle & Sicherheit", href: "leistung-zutrittskontrolle.html" },
      { label: "Rettungswegsysteme", href: "leistung-rettungswegsysteme.html" },
      { label: "Obentürschließer", href: "leistung-obentuerschliesser.html" },
      { label: "Prüfung & Wartung", href: "leistung-pruefung-wartung.html" },
      { label: "Wartungsanfrage", href: "wartungsanfrage.html" },
      { label: "Normen & Pflichten", href: "index.html#normen-pflichten" },
      { label: "Zertifizierung", href: "index.html#zertifizierung" }
    ]
  },
  {
    label: "Über uns", href: "ueber-uns.html",
    children: [
      { label: "Wir stellen uns vor", href: "ueber-uns.html" },
      { label: "Das Team", href: "team.html" },
      { label: "Komm in unser Team", href: "karriere.html" }
    ]
  },
  { label: "Referenzen", href: "referenzen.html" },
  {
    label: "Aktuelles", href: "stellen.html",
    children: [
      { label: "Offene Stellen", href: "stellen.html" },
      { label: "Downloads", href: "downloads.html" }
    ]
  }
];

export const company = {
  name: "Falke Türautomation",
  street: "Kasterer Str. 12",
  zip: "50181",
  city: "Bedburg",
  phone: "02272 / 908 927 0",
  phoneHref: "+4922729089270",
  mobile: "0151 165 675 04",
  mobileHref: "+4915116567504",
  mail: "info@falke-tuerautomation.de",
  hours: "Mo – Fr, 8:00 – 16:30 Uhr",
  owner: "Rene Falke",
  maps: {
    key: "",
    address: "Kasterer Str. 12, 50181 Bedburg",
    lat: 51.0,
    lng: 6.5667,
    zoom: 15,
    link: "https://www.google.com/maps/search/?api=1&query=Kasterer+Str.+12,+50181+Bedburg",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.1240391212436!2d6.51477492356229!3d50.99537997170135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf4560888c0ffb%3A0xc9895cb687ed7305!2zS2FzdGVyZXIgU3RyLiAxMiwgNTAxODEgQmVkYnVyZy1Qw7x0eiwg2KPZhNmF2KfZhtmK2Kc!5e0!3m2!1sde!2sde!4v1789917532205!5m2!1sde!2sde",
    region: {
      lat: 50.98,
      lng: 6.59,
      zoom: 9,
      orte: [
        { name: "Bedburg", lat: 51.0, lng: 6.5667, sitz: true },
        { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
        { name: "Köln", lat: 50.9375, lng: 6.9603 },
        { name: "Bonn", lat: 50.7374, lng: 7.0982 },
        { name: "Aachen", lat: 50.7753, lng: 6.0839 }
      ]
    }
  }
};
