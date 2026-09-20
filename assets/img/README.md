# Bilder einsetzen

Alle Bilder liegen in diesem Ordner. Die mitgelieferten SVG-Dateien sind
Platzhalter – gleiche Dateinamen behalten, dann ist nichts weiter zu tun.

## Referenzkarten

Jede Karte in `index.html` (Abschnitt „Referenzen“) bekommt ihr Bild über eine
CSS-Variable im `style`-Attribut:

```html
<article class="ref" style="--ref-img:url('assets/img/ref-hochschule.jpg')">
```

Erwartete Dateien (Platzhalter jeweils als `.svg` vorhanden):

| Datei              | Karte                          |
|--------------------|--------------------------------|
| `ref-hochschule`   | RWTH Aachen                    |
| `ref-verwaltung`   | Rhein-Sieg-Kreis & Stadt Köln  |
| `ref-bank`         | Volksbank Köln                 |
| `ref-klinik`       | Gemeinschaftspraxis Köln       |
| `ref-industrie`    | Produktion & Logistik          |
| `ref-schule`       | Schulen & Kulturbauten         |

**Format:** quer, mindestens 1200 × 900 px, JPG oder WebP, auf ≤ 250 KB
komprimiert. Über jedem Bild liegt ein dunkler Verlauf, damit die weiße Schrift
sitzt – Motive mit ruhiger unterer Bildhälfte wirken am besten.

## Logo

* `logo-falke.svg` – für helle Flächen
* `logo-falke-invers.svg` – für dunkle Flächen
* `favicon.svg` – Browser-Tab

Das Logo steckt zusätzlich inline in `index.html` (Kopfzeile, Footer) und in
`assets/js/van.js` (Konstante `LOGO`, die Beschriftung des Transporters).
Beim Austausch gegen das Original alle drei Stellen anpassen.

## Fotos vom Team oder von Anlagen

Noch nicht eingebaut, aber vorgesehen: Der Abschnitt „Unternehmen“ nimmt ohne
Layoutänderung ein Bild auf – einfach ein `<img>` in die linke Spalte setzen
oder die Karte `region__map` durch ein Foto ersetzen.
