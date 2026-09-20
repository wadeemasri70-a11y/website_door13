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
build/                  Seitengenerator (Node, nur zur Entwicklung)
  nav.mjs               Navigation + Firmendaten – eine Quelle für alle Seiten
  layout.mjs            Kopf, Topbar, Navigation, Fußzeile
  blocks.mjs            Wiederverwendbare Inhaltsbausteine
  data.mjs              Leistungen, Referenzprojekte, Partner, Zertifizierung
  pages/home.mjs        Rumpf der Startseite
  build.mjs             schreibt die HTML-Dateien
  pngtool.py            PNG-Werkzeug (helle Logofassung, Favicon)

assets/css/tokens.css   Palette, Rollen (Themen), Typografie, Raum, Bewegung
assets/css/base.css     Reset, Typografie, Layout-Primitive, Buttons, Reveals
assets/css/layout.css   Topbar, Kopfzeile, Navigation, Fußzeile
assets/css/content.css  Hero, Abschnitte, Karten, Text, Projekte, Kontakt
assets/css/van.css      Bühne und Aussehen des 3-D-Transporters

assets/js/theme.js      Tag-/Nachtthema (ohne defer im <head>)
assets/js/van.js        baut den Transporter, fährt ihn am Scroll entlang
assets/js/main.js       Kopfzeile, Navigation, Reveals, Formular

index.html              Startseite
leistungen.html         Unser Angebot + 6 Leistungsseiten
referenzen.html         Projekte des bestehenden Auftritts
ueber-uns / team / karriere / stellen / downloads / kontakt /
wartungsanfrage / impressum / datenschutz
```

## Seiten erzeugen

Die 18 Seiten teilen sich Kopf, Navigation und Footer. Geändert wird deshalb
nicht die einzelne HTML-Datei, sondern der Generator:

```bash
node build/build.mjs      # schreibt alle .html-Dateien neu
```

* Navigation und Firmendaten: `build/nav.mjs`
* Texte der Leistungs- und Referenzseiten: `build/data.mjs`
* Rumpf der Startseite: `build/_home-raw.html`

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
  Wahl – in `localStorage` und zusätzlich in einem Cookie. Das Cookie springt
  ein, wenn der Speicher gesperrt ist (privates Fenster, eingebettete Vorschau);
  so bleibt die Wahl auch beim Seitenwechsel erhalten.
* `assets/js/theme.js` steht **ohne `defer`** im `<head>` und setzt das Thema
  vor dem ersten Bild – sonst blitzt die falsche Fassung auf.

Ein weiteres Thema entsteht, indem der Rollenblock unter
`:root[data-theme="…"]` kopiert und mit anderen Werten gefüllt wird.

## Partner

Die Leiste „Partner & Mitgliedschaften“ steht direkt unter dem Hero und in der
Leistungsübersicht. Gepflegt wird sie in `build/data.mjs` (`partners`). Solange
`file` leer ist, zeigt die Leiste eine Textplakette in gleicher Form; sobald ein
Pfad eingetragen ist, erscheint das Logo:

```js
{ name: "GEZE", note: "Servicepartner", file: "assets/img/partner/geze.png" }
```

## Zertifizierung

Der Abschnitt „Zertifizierung“ auf der Startseite zeigt die Partnerschaft mit
Planet Tree: je Wartungsvertrag ein Baum im Hessen Forst, mit Musterurkunde und
Partnerlogo aus dem bestehenden Auftritt. Inhalt und Kennzahlen stehen in
`build/data.mjs` unter `certificate`; weitere Nachweise lassen sich dort
ergänzen.

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

Alles ist statisch: Ordner auf beliebigen Webspace legen (oder GitHub Pages,
Netlify, Vercel). `index.html` ist der Einstieg. Fehlende Unterseiten
(`/impressum/`, `/datenschutz/`) sind im Footer bereits verlinkt.

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
