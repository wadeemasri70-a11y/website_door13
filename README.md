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
  layout.mjs            Kopf, Topbar, Navigation, Footer
  blocks.mjs            Wiederverwendbare Inhaltsbausteine
  data.mjs              Leistungen, Referenzprojekte, Zertifikate
  build.mjs             schreibt die HTML-Dateien
  _home-raw.html        Rumpf der Startseite (Marker für generierte Raster)
index.html              Startseite (Semantik, Inhalte, JSON-LD)
leistungen.html         Unser Angebot + 6 Leistungsseiten
referenzen.html         Projekte (Inhalte des bestehenden Auftritts)
ueber-uns/team/karriere/stellen/downloads/kontakt/impressum/datenschutz
assets/css/tokens.css   Farbe, Typo-Skala, Abstände, Bewegung – eine Quelle der Wahrheit
assets/css/base.css     Reset, Typografie-Rhythmus, Layout-Primitive, Buttons, Reveals
assets/css/components.css  Header, Hero, Karten, Referenzen, Ablauf, Kontakt, Footer
assets/css/van.css      Die Bühne und das Aussehen des 3-D-Transporters
assets/js/van.js        Baut den Transporter aus CSS-3-D-Flächen und fährt ihn am Scroll entlang
assets/js/main.js       Header, Navigation, Reveals, Formular
assets/img/             Logo, Favicon, Platzhalter für Referenzbilder
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

Die Seite hat zwei vollwertige Themen. `assets/css/tokens.css` definiert erst die
Palette, darüber eine **Rollen-Ebene** (`--bg-1`, `--fg`, `--bg-contrast`,
`--card-bg`, `--stage-bg` …). Alle Bausteine greifen nur auf diese Rollen zu –
ein Thema ist damit ein Satz Variablen, kein zweites Stylesheet.

* Voreinstellung folgt dem Betriebssystem (`prefers-color-scheme`).
* Der Schalter im Header setzt `data-theme="light"` oder `"dark"` auf `<html>`
  und merkt sich die Wahl im Browser (`localStorage`, Schlüssel `falke-theme`).
* Ein winziges Skript im `<head>` setzt das Thema vor dem ersten Bild – kein
  Aufblitzen der falschen Farben.

Ein neues Thema (z. B. ein Kundenthema) entsteht, indem der Rollenblock unter
`:root[data-theme="…"]` kopiert und mit anderen Werten gefüllt wird.

## Zertifikate

Der Abschnitt „Qualifikationen“ zeigt vier Nachweise als Dokumentkarten;
ein Klick öffnet die volle Datei. Die mitgelieferten
`assets/img/zertifikat-1…4.svg` sind **ausdrücklich als Platzhalter markiert** –
sie müssen gegen die echten Urkunden getauscht und Titel und Aussteller im
HTML eingetragen werden. Weitere Karten entstehen durch Duplizieren eines
`<li class="cert">`.

## Anpassen

**Farben, Schrift, Abstände** stehen ausschließlich in `assets/css/tokens.css`.
Die Signalfarbe (`--signal`) ist ein Vorschlag – ein Firmenton wird dort einmal
gesetzt und gilt sofort überall (Buttons, Lackierung des Wagens, Akzente).

**Schriftart:** Der Stack beginnt mit „Inter“ und fällt sonst auf die Systemschrift
zurück. Soll Inter garantiert erscheinen, die Schriftdateien selbst hosten
(`@font-face`, `font-display: swap`) – bewusst keine Google-Fonts-Einbindung,
das spart eine Fremdverbindung und ist datenschutzfreundlicher.

**Logo:** `assets/img/logo-falke.svg` (hell) und `-invers.svg` (dunkel) sind
Platzhalter im Falke-Duktus. Das Original ersetzt sie an drei Stellen:
Kopfzeile und Footer (Inline-SVG in `index.html`) sowie die Fahrzeugbeschriftung
(Konstante `LOGO` am Anfang von `assets/js/van.js`).

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
- قسم الشهادات جاهز: بدّل `assets/img/zertifikat-1…4.svg` بالشهادات الحقيقية
  واكتب العنوان والجهة المانحة بالـHTML.
- السيارة ثلاثية الأبعاد مبنية بـ CSS 3D (مش WebGL) — أخفّ وبتشتغل على كل الأجهزة.
  بعد أول scroll بتتحوّل من رسمة مسطّحة لمجسّم بيدور حواليه.
- الألوان والخطوط والمسافات كلها بملف واحد: `assets/css/tokens.css`.
- بدّل اللوغو بـ 3 أماكن: الهيدر والفوتر داخل `index.html`، وثابت `LOGO`
  بأول `assets/js/van.js` (اللي عالسيارة).
- الصور: حطّ صورهم الأصلية بمجلد `assets/img/` حسب الشرح بـ `assets/img/README.md`.
  الصور الحالية placeholders لأنّ الموقع الأصلي كان محجوب عن هالبيئة فما قدرت أنزّلها.
- النصوص وأرقام التلفون والعنوان مجموعة من مصادر عامة — لازم تتأكّد منها قبل النشر.
