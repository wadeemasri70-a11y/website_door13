# Falke Türautomation – Relaunch-Entwurf

Ein statisches Ein-Seiten-Konzept für [falke-tuerautomation.de](https://falke-tuerautomation.de/):
neue Typografie, neues Raster, klarere Abschnitte – und als erzählerischer Kern ein
Servicetransporter mit Firmenlogo, der beim ersten Scrollen aus einer flachen
Illustration in einen dreidimensionalen Körper aufklappt und sich einmal umrunden lässt.

**Keine Abhängigkeiten, kein Build-Schritt, kein WebGL.** HTML, CSS und drei kleine
Skripte – `index.html` im Browser öffnen genügt.

---

## Aufbau

```
build/                     Seitengenerator (Node, nur zur Entwicklung)
  content/                 die Inhalte, getrennt nach Thema
    company.mjs            Firmendaten + Navigation
    services.mjs           die sechs Leistungsbereiche
    projects.mjs           Referenzprojekte
    partners.mjs           Partner & Mitgliedschaften
    certificate.mjs        Zertifizierung (Planet Tree)
    index.mjs              Sammelstelle für alle Inhalte
  pages/                   je ein Modul pro Seitengruppe
    start.mjs  home.mjs    Startseite
    leistungen.mjs         Übersicht, 6 Leistungsseiten, Wartungsanfrage
    referenzen.mjs  unternehmen.mjs  kontakt.mjs  rechtliches.mjs
  layout.mjs               Kopf, Topbar, Navigation, Fußzeile
  blocks.mjs               wiederverwendbare Inhaltsbausteine
  build.mjs                Läufer: schreibt alle Seiten
  pngtool.py               PNG-Werkzeug (helle Logofassung, Favicon)
  upscale.sh / .html       rechnet Fotos hoch und schärft nach

assets/css/tokens.css      Palette, Rollen (Themen), Typografie, Raum, Bewegung
assets/css/base.css        Reset, Typografie, Layout-Primitive, Buttons
assets/css/layout.css      Topbar, Kopfzeile, Navigation, Fußzeile
assets/css/content.css     Hero, Abschnitte, Karten, Text, Projekte, Kontakt
assets/css/van.css         Bühne und Aussehen des 3-D-Transporters

assets/js/theme.js         Tag-/Nachtthema (ohne defer im <head>)
assets/js/van.js           baut den Transporter, fährt ihn am Scroll entlang
assets/js/map.js           Karte auf Klick, Einsatzgebiet mit leuchtenden Punkten
assets/js/doors.js         Schiebetür am Seitenende, öffnet auf Annäherung
assets/js/main.js          Kopfzeile, Navigation, Reveals, Formular

18 erzeugte HTML-Dateien im Wurzelverzeichnis
```

## Seiten erzeugen

Die 18 Seiten teilen sich Kopf, Navigation und Footer. Geändert wird deshalb
nicht die einzelne HTML-Datei, sondern der Generator:

```bash
npm run build             # schreibt alle .html-Dateien neu
```

Es gibt keine Abhängigkeiten – `npm install` ist nicht nötig, Node ab Version 18
genügt. Eine neue Seite entsteht, indem ein Steckbrief
(`{ slug, title, description, body }`) in eines der Module unter `build/pages/`
aufgenommen wird; `build.mjs` findet sie von selbst.

* Navigation und Firmendaten: `build/content/company.mjs`
* Texte der Leistungs- und Referenzseiten: `build/content/`
* Rumpf der Startseite: `build/pages/home.mjs`

Die erzeugten Dateien liegen flach im Wurzelverzeichnis (`leistung-schiebetueren.html`),
damit sie ohne Server – auch per Doppelklick – funktionieren. Auf dem Webserver
lassen sich daraus über Rewrites wieder sprechende Adressen bauen
(`/leistung/schiebetueren/`).

## Der 3-D-Transporter

* **Technik:** CSS-3-D-Transforms (`transform-style: preserve-3d`) statt WebGL. Der Wagen
  besteht aus rund 60 Flächen, die `assets/js/van.js` aus einer Geometrie-Tabelle (`G`)
  erzeugt – Maße ändern heißt: Zahlen in `G` ändern.
* **Dramaturgie:** Der Scroll-Fortschritt der Sektion (0 … 1) steuert alles:
  | Fortschritt | Was passiert |
  |---|---|
  | 0,00 – 0,05 | Flache Seitenansicht, wie eine gedruckte Illustration |
  | 0,05 – 0,34 | Der Körper klappt auf: Tiefe, Licht, Schatten, Drehung auf −30° |
  | 0,34 – 0,66 | Dreiviertelansicht von vorn, Räder drehen, Hinweise erscheinen |
  | 0,66 – 0,90 | Umrundung bis zur Heckansicht (+32°) |
  | 0,90 – 1,00 | Zurück in die ruhige Dreiviertelansicht |
* **Leistung:** Die Animation läuft nur, wenn die Bühne sichtbar und der Tab aktiv ist
  (IntersectionObserver + `visibilitychange`), und rechnet pro Frame nur ein paar
  CSS-Variablen. Kein Bild, kein Modell, keine Netzwerklast.
* **`prefers-reduced-motion`:** statt Scroll-Choreografie eine feste, ruhige
  Dreiviertelansicht; die Hinweistexte stehen dann als normale Spalten darunter.
* **Ohne JavaScript:** Die Seite zeigt eine flache SVG-Seitenansicht des Wagens
  (direkt in `index.html`), alle Inhalte bleiben lesbar.

### Zustände prüfen

```
index.html?p=0.45           friert die Inszenierung bei 45 % ein
index.html?solo=1&p=0.45    zeigt nur die Bühne (praktisch für Screenshots)
```

## Tag- und Nachtthema

`assets/css/tokens.css` definiert erst die Palette, darüber eine **Rollen-Ebene**
(`--bg-1`, `--fg`, `--bg-contrast`, `--card-bg`, `--stage-bg` …). Alle Bausteine
greifen nur auf diese Rollen zu – ein Thema ist damit ein Satz Variablen, kein
zweites Stylesheet.

* **Die Seite startet immer hell.** Die Systemeinstellung wird bewusst nicht
  ausgewertet: Wer nichts anklickt, sieht überall dasselbe.
* Der Schalter im Kopf setzt `data-theme="dark"` auf `<html>` und merkt sich die
  Wahl dreifach abgesichert:
  1. `localStorage` – der Normalfall,
  2. Cookie – wenn der Speicher gesperrt ist (privates Fenster),
  3. Adresszeile – wenn beides scheitert (eingebettete Vorschauen mit
     abgeschotteter Herkunft). Dann tragen die internen Verweise die Wahl als
     `?theme=dark` weiter, und die Seite bleibt auch beim Wechsel dunkel.
* `assets/js/theme.js` steht **ohne `defer`** im `<head>` und setzt das Thema
  vor dem ersten Bild – sonst blitzt die falsche Fassung auf.

Ein weiteres Thema entsteht, indem der Rollenblock unter
`:root[data-theme="…"]` kopiert und mit anderen Werten gefüllt wird.

## Karte

Die Karte auf Startseite und Kontaktseite lädt **erst auf Klick**. Vorher steht
dort eine graue Vorschau mit Anschrift und Stecknadel sowie der Hinweis, dass
beim Laden eine Verbindung zu Google entsteht – die in Deutschland übliche
Zwei-Klick-Lösung. Wer nicht klickt, sendet nichts an Google.

Danach gibt es zwei Ausbaustufen, je nachdem ob ein Schlüssel hinterlegt ist:

**Ohne Schlüssel (Standard).** Für die Anschrift steht in `maps.embed` die
offizielle Einbettungsadresse aus Google Maps (*Teilen → Karte einbetten*), die
den Betrieb punktgenau trifft. Fehlt sie, baut `assets/js/map.js` die Adresse aus
Koordinaten und Zoomstufe zusammen. Grau wird die Karte über einen CSS-Filter
(`grayscale`), im Nachtthema zusätzlich invertiert. Kein Konto, keine
Abrechnung, keine Einrichtung.

**Mit Schlüssel.** Steht in `build/content/company.mjs` ein `maps.key`, wird
stattdessen die Maps-JavaScript-API geladen: echte Kartenfarben statt Filter
(`STIL_HELL` / `STIL_DUNKEL` in `assets/js/map.js`), Stecknadel im Markenrot,
Zoomregler, und die Anschrift wird beim Laden geokodiert.

```js
maps: {
  key: "AIza…",
  address: "Kasterer Str. 12, 50181 Bedburg",
  lat: 51.0, lng: 6.5667, zoom: 15,
  link: "https://www.google.com/maps/search/?api=1&query=…"
}
```

Der Schlüssel stammt aus der Google Cloud Console (*Maps JavaScript API* und
*Geocoding API* aktivieren, Abrechnungskonto hinterlegen). **Unbedingt auf die
eigene Domain beschränken** (HTTP-Referrer), sonst kann ihn jeder verwenden.

### Einsatzgebiet

Die Karte auf der Startseite zeigt nicht die Anschrift, sondern das Gebiet:
`map({ variante: "region" })`. Über der Einbettung liegen die Orte aus
`maps.region.orte` als leuchtende Punkte – Bedburg als heller Sitzpunkt, die
übrigen im Markenrot mit Pulsring. Die Positionen rechnet `weltpunkt()` in
`assets/js/map.js` über die Mercator-Projektion aus Mittelpunkt und Zoomstufe
und setzt sie in Prozent; bei Größenänderung wird neu gerechnet. Damit Punkte
und Karte zusammenbleiben, nimmt die Einbettung hier keine Mauseingaben an.

## Kopfzeile

Am Seitenanfang steht die Kopfzeile hoch und trägt das Logo groß, mit Luft
darunter, bevor der Hero beginnt. Nach rund 80 Pixeln Scrollweg setzt
`assets/js/main.js` die Klasse `is-stuck`; Leiste und Logo fahren auf ihr
kompaktes Maß zurück und die Leiste bekommt Milchglas und Haarlinie. Gesteuert
wird das über vier Token – `--header-gross`/`--header-h` und
`--logo-gross`/`--logo-h`; die gerade gültige Höhe steht als `--kopf-jetzt` auf
der Kopfzeile, damit das Menü auf schmalen Geräten in beiden Zuständen direkt
darunter aufgeht. Der Hero rechnet mit der großen Höhe, Ankersprünge mit der
kleinen.

## Schiebetür vor dem Kontakt

Der Kontaktbereich liegt hinter einem Türportal: zwei Flügel aus Milchglas,
Bodenschiene, Sensorleiste mit Melder. Beim Herunterscrollen fahren die Flügel
auseinander und geben den Abschnitt frei – wie ein Eingang, der auf den Melder
reagiert.

Gebaut wird das Portal mit `tuerPortal({ html, weit })` aus `build/layout.mjs`.
Seiten mit eigenem Kontaktabschnitt (Startseite, Kontakt, Wartungsanfrage) legen
ihn mit `weit: true` selbst in das Portal – dort rahmt die Tür „Beratung &
Kontakt“ samt Formular und Karte. Alle übrigen Seiten bekommen vom Layout ein
schmales Portal mit Telefon und E-Mail ans Seitenende; es entfällt automatisch,
sobald eine Seite schon ein `data-doors` mitbringt. Die Flügel nehmen keine
Mauseingaben an, das Formular bleibt also auch hinter geschlossener Tür
bedienbar.

Wie weit die Tür offen steht, ergibt sich aus dem Abstand zum unteren
Bildrand: `assets/js/doors.js` verteilt den Weg über 1,25 Bildschirmhöhen und
zieht den Wert mit 5,5 % pro Bild nach. Beide Zahlen bestimmen das Tempo –
kleiner heißt langsamer. `assets/js/doors.js` liest den Abstand zum unteren
Bildrand, glättet ihn und schreibt ihn als `--open` (0 bis 1); die Flügel
verschieben sich über `translate3d`, der Melder wechselt bei `--open > 0.06`
auf Rot. Gerechnet wird nur, solange der Abschnitt sichtbar ist
(`IntersectionObserver` plus `requestAnimationFrame`). Bei
`prefers-reduced-motion` steht die Tür von vornherein offen.

Der Melder zeigt drei Zustände: grau bei geschlossener Tür, rot sobald sie
aufgeht, und grün (`--melder-frei`), sobald eine Anfrage aus dem Formular
heraus ist – `assets/js/main.js` setzt dafür die Klasse `tuer--frei`.

## Soziale Netzwerke

Unter den Kontaktdaten und unter dem Claim in der Fußzeile steht eine Leiste
mit vier Zeichen: Facebook, Instagram, YouTube, LinkedIn. Jedes trägt einen
eigenen `viewBox`, der genau um sein Zeichen liegt (`sozialZeichen[…].feld`).
Dadurch füllen alle vier dieselbe Fläche und sitzen auf derselben Achse – mit
einem gemeinsamen `0 0 24 24` wären sie unterschiedlich groß und LinkedIn säße
tiefer. Im Ruhezustand sind sie grau
und in einem Ring gefasst; bei Mausberührung oder Tastaturfokus nehmen Zeichen
und Ring die Hausfarbe des jeweiligen Dienstes an – Instagram über einen
Verlauf, der einmal pro Seite in `<svg class="verlaeufe">` definiert ist.

Gepflegt wird die Leiste in `build/content/company.mjs`:

```js
social: [
  { key: "facebook", name: "Facebook", url: "https://www.facebook.com/…" },
  …
]
```

**Solange `url` leer ist, steht das Zeichen ohne Verweis da** – sichtbar, aber
nicht anklickbar. Sobald die Adressen der Profile eingetragen sind, werden
automatisch Verweise daraus, die in einem neuen Tab öffnen.

Die Zeichen sind als Pfade in `build/layout.mjs` (`sozialZeichen`) hinterlegt
und den bekannten Marken nachgezeichnet. Wer es ganz genau will, ersetzt sie
durch die offiziellen Dateien aus den Presse-Kits der vier Anbieter.

## Einblicke (Über uns)

Die Seite „Wir stellen uns vor“ trägt eine Bildstrecke aus zwölf Aufnahmen:
Montage, Fuhrpark, Büro, Partner und Engagement. Gepflegt wird sie in
`build/content/galerie.mjs` – Pfad, Alternativtext, Bildunterschrift und die
Maße; `breit: true` lässt ein Bild über zwei Spalten laufen. Die Dateien liegen
in `assets/img/ueber-uns/` und sind mit `build/upscale.sh` hochgerechnet und
nachgeschärft, wobei die EXIF-Daten (samt GPS) wegfallen.

Die Bildunterschriften beschreiben, was zu sehen ist; wer die Aufnahmen kennt,
sollte sie durchgehen und genauer fassen.

Die Strecke läuft dreispaltig und quadratisch: `grid-template-columns:
repeat(3, minmax(0, 1fr))`, jedes Bild `aspect-ratio: 1 / 1` mit
`object-fit: cover`. Unter 52rem sind es zwei Spalten, unter 30rem eine.

## Bilder auf den Projektkacheln

Die Kacheln auf Startseite und Referenzen bekommen ihr Foto als
`style="background-image:url(…)"` direkt am Element – **nicht** über eine
eigene Eigenschaft. Chromium löst einen relativen Pfad in einer eigenen
Eigenschaft gegen das Stylesheet auf, in dem `var()` steht, also gegen
`assets/css/`; die Kachel bliebe dann schwarz.

## Zahlen, die hochlaufen

Jede fett gesetzte Kennzahl trägt `data-zahl`. `assets/js/zahlen.js` zerlegt den
Text in Vorsatz, Zahl und Nachsatz – „24 h“, „1×“ und „seit 2021“ funktionieren
damit genauso wie „2020“ –, setzt die Zahl auf null und lässt sie in 850 ms
hochlaufen, sobald das Feld ins Bild kommt. Texte ohne Ziffern („Hessen Forst“)
bleiben unangetastet. Bei `prefers-reduced-motion` passiert nichts, und wenn der
Beobachter nach vier Sekunden nicht ausgelöst hat, steht die echte Zahl trotzdem
da.

## Planet Tree

Der Abschnitt zur Baumpflanzung trägt das Grün des Partners: `--planet`
(`#197F15` am Tag, `#6BC85F` in der Nacht) färbt jedes fett gesetzte Wort im
Text und die drei Eckdaten. Der Wert ist aus dem Logo `partner-planet-tree.png`
ausgelesen und trifft damit den Rahmen der Urkunde daneben.

## Fabrikate

Der Abschnitt „Herstellerunabhängig“ zeigt statt einer Wortliste Plaketten in
derselben Form und Größe wie die Partnerleiste am Seitenanfang – Platte 76 px
hoch, Zeichen 42 px –, nur laufen sie nicht als Band, sondern brechen in Zeilen
um. Gepflegt wird die Reihe in `build/content/hersteller.mjs`; ohne `file`
erscheint der Name als Textplakette (Record, „weitere auf Anfrage“).

Die Dateien entstehen mit `build/kachel.sh <quelle> <ziel> <höhe> <luftx>
<lufty> eng`: Das Werkzeug schneidet den Rand um das Zeichen weg und legt es
mittig auf eine weiße Fläche mit gleichem Abstand ringsum. Damit wirken die
Zeichen optisch gleich groß, obwohl die Vorlagen unterschiedlich beschnitten
waren. Ohne `eng` entsteht stattdessen eine 16:9-Fläche.

Bei Mausberührung legt sich ein weiches gelbes Leuchten um die Plakette
(`--neon`). Die Reihenfolge ist nach Farbe gesetzt: HÖRMANN (Orange auf Blau)
und TORMAX (rote Sterne) sind die kräftigsten und stehen weder neben- noch
untereinander. Die Plakette bleibt in beiden Themen weiß, sonst verschwinden
die dunklen Schriftzüge im Nachtmodus.

## Partner

Die Leiste „Partner & Mitgliedschaften“ läuft als Band direkt unter dem Hero und
in der Leistungsübersicht – bei Mausberührung hält sie an. Gepflegt wird sie in
`build/content/partners.mjs`. Ist `file` leer, zeigt die Leiste eine Textplakette
in gleicher Form; mit Pfad erscheint das Logo:

```js
{ name: "GEZE", note: "Servicepartner", file: "assets/img/partner/geze.png" }
```

## Zertifizierung

Der Abschnitt „Zertifizierung“ auf der Startseite zeigt zuerst die
Sachkundenachweise (FTA, GEZE, Hörmann) als Dokumentkarten – ein Klick öffnet
die Urkunde – und darunter die Partnerschaft mit Planet Tree: je
Wartungsvertrag ein Baum im Hessen Forst. Beides steht in
`build/content/certificate.mjs`.

**Vor dem Livegang prüfen:** Die Urkunden zeigen Namen und Unterschriften der
Kolleginnen und Kollegen.

## Anpassen

**Farben, Schrift, Abstände** stehen ausschließlich in `assets/css/tokens.css`.
Die Signalfarbe `--signal` ist das am Original-Logo gemessene Rot `#E01C0E`,
das Grau `#4F5455` stammt aus der Wortmarke. Ergänzt um die Theme-Farben des
bestehenden Auftritts (`#C22724`, `#575A5B`, `#EAEBEC`).

**Schriftart:** Montserrat wie im bestehenden Auftritt. Für die Vorschau lädt
`build/layout.mjs` sie von Google Fonts – **vor dem Livegang selbst hosten**
(Dateien nach `assets/fonts/`, per `@font-face` einbinden, die beiden
`<link>`-Zeilen entfernen). In Deutschland ist das Einbinden über Google
datenschutzrechtlich heikel.

**Logo:** `assets/img/logo-falke.png` ist das Original aus dem bestehenden
Auftritt. Die helle Fassung fürs Nachtthema und das Favicon wurden daraus mit
`build/pngtool.py` erzeugt. Verwendet wird es in `build/layout.mjs`
(Kopf, Fuß) und in `assets/js/van.js` (Konstante `LOGO`, Fahrzeugbeschriftung).

**Bilder:** siehe `assets/img/README.md` – die Referenzkarten erwarten je ein Bild
über `--ref-img` direkt im HTML.

**Formular:** `assets/js/main.js` öffnet ohne Backend eine vorbereitete E-Mail.
Für ein echtes Postfach die Konstante `FORM_ENDPOINT` auf die Ziel-URL setzen.

## Inhalt – bitte gegenlesen

Die Texte, Telefonnummern, Adresse und Referenzen wurden aus öffentlich
zugänglichen Quellen zusammengetragen, weil die Originalseite aus dieser
Umgebung nicht abrufbar war. **Vor dem Livegang fachlich prüfen**, insbesondere:
Rufnummern, Anschrift, Sprechzeiten, Mitarbeiterzahlen und die Referenzliste.
Gleiches gilt für die Bildplatzhalter – sie sind bewusst abstrakt und sollen
durch echte Anlagenfotos ersetzt werden.

## Veröffentlichen

Alles ist statisch – der Ordner läuft auf jedem Webspace.

**GitHub Pages** ist vorbereitet: `.github/workflows/pages.yml` baut die Seiten
bei jedem Push und veröffentlicht sie. Einmalig einschalten unter
*Settings → Pages → Source: GitHub Actions*; danach steht der Entwurf unter
`https://<konto>.github.io/<repository>/`. Der Ablauf legt dort eine
`robots.txt` ab, die Suchmaschinen aussperrt, damit der Entwurf dem echten
Auftritt keine Konkurrenz in der Suche macht.

**Eigene Domain:** Dateien hochladen, `index.html` ist der Einstieg. Sprechende
Adressen wie `/leistung/schiebetueren/` lassen sich per Rewrite auf die flachen
Dateinamen abbilden.

---

## دليل سريع (بالعربي)

- كل شي ستاتيك: بتفتح `index.html` بالمتصفّح مباشرة، بدون build وبدون مكتبات.
- في ثيمين كاملين (نهاري وليلي). الافتراضي بيتبع إعداد الجهاز، وزر الشمس/القمر
  بالهيدر بيبدّل وبيتذكّر الاختيار. كل الألوان أدوار (roles) بملف `tokens.css`.
- قسم الشهادات صار عن شراكة Planet Tree (شجرة لكل عقد صيانة) بالشهادة الأصلية.
- السيارة ثلاثية الأبعاد مبنية بـ CSS 3D (مش WebGL) — أخفّ وبتشتغل على كل الأجهزة.
  بعد أول scroll بتتحوّل من رسمة مسطّحة لمجسّم بيدور حواليه.
- الألوان والخطوط والمسافات كلها بملف واحد: `assets/css/tokens.css`.
- بدّل اللوغو بـ 3 أماكن: الهيدر والفوتر داخل `index.html`، وثابت `LOGO`
  بأول `assets/js/van.js` (اللي عالسيارة).
- الصور واللوغو والألوان كلها من الموقع الأصلي (وصلت كملف محفوظ). التفاصيل
  والمقاسات المطلوبة بـ `assets/img/README.md`. صور المشاريع مصغّرة
  (225×300) — لازم النسخ الأصلية للعرض الكبير.
- النصوص وأرقام التلفون والعنوان مجموعة من مصادر عامة — لازم تتأكّد منها قبل النشر.
