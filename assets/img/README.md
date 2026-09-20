# Bilder

Alle Bilder stammen aus dem bestehenden Auftritt (Stand der gespeicherten
Referenzseite). Aus den JPEGs wurden die Exif-Daten entfernt – die Fotos
enthielten GPS-Koordinaten der Objekte.

## Marke

| Datei | Verwendung |
|---|---|
| `logo-falke.png` | Original-Logo, für helle Flächen (Kopf, Fuß, Fahrzeug) |
| `logo-falke-invers.png` | daraus erzeugte helle Fassung für das Nachtthema |
| `logo-falke-grau.png` | Graustufenfassung aus dem bestehenden Auftritt (Reserve) |
| `favicon-falke.png` | der freigestellte Falke als Browser-Symbol |

Die invertierte Fassung und das Favicon wurden mit `build/pngtool.py` aus dem
Original erzeugt. Liegt das Logo als Vektor (SVG, EPS, AI) vor, ist das die
bessere Grundlage – dann alle vier Dateien ersetzen und in `build/layout.mjs`
sowie `assets/js/van.js` (Konstante `LOGO`) den Pfad anpassen.

**Markenfarben** (am Logo gemessen): Rot `#E01C0E`, Grau `#4F5455`.
Dazu aus dem Theme des bestehenden Auftritts: `#C22724`, `#575A5B`, `#EAEBEC`.
Alle liegen in `assets/css/tokens.css`.

## Referenzprojekte

`referenz/*.jpg` – je ein Foto pro Projekt auf `referenzen.html` und zusätzlich
als Beispielbild auf den Leistungsseiten:

| Datei | Projekt | Original |
|---|---|---|
| `heinrich-hanselmann-schule.jpg` | Heinrich-Hanselmann-Schule | `heinrich-2-225x300.jpg` |
| `gymnasium-schleiden.jpg` | Gymnasium Schleiden | `20260410_171406635_iOS` |
| `ordnungsamt-stolberg.jpg` | Ordnungsamt Stolberg | `20250903_134232905_iOS` |
| `bundeskunsthalle-bonn.jpg` | Bundeskunsthalle Bonn | `Foto-20.12.23-14-35-27` |
| `volksbank-koeln-bonn.jpg` | Volksbank Köln Bonn | `20240716_142920402_iOS` |
| `bayarena-leverkusen.jpg` | BayArena Leverkusen | `20250219_154333067_iOS` |

Die Dateien im Ordner sind auf 750 px hochgerechnet (2,5×, mit
Unschärfemaske nachgeschärft) – erzeugt mit `build/upscale.sh`. Die
unveränderten Vorlagen aus der Mediathek liegen unter `referenz/original/`.

**Wichtig:** Hochrechnen erfindet keine Details, es macht die Kanten nur
sauberer. Die echten Originale liegen in der WordPress-Mediathek
(`…-2048x1536.jpg`, `…-scaled.jpg`) – sobald sie vorliegen, ersetzen sie
diese Dateien. Ziel: mindestens 1600 px Kantenlänge, JPG oder WebP,
auf ≤ 300 KB komprimiert. Die Zuordnung steht in `build/data.mjs`.

```bash
build/upscale.sh <quelle> <ziel> [faktor] [qualität] [schärfe]
build/upscale.sh foto.jpg assets/img/referenz/foto.jpg 2.5 0.85 0.6
```

## Partnerlogos

`partner/fta.jpg`, `partner/marx.png`, `partner/wuerth.jpg`, `partner/geze.png`
– unverändert aus dem bestehenden Auftritt. Gepflegt in
`build/content/partners.mjs`; ein weiterer Partner ist ein weiterer Eintrag.
Die Logos tragen weißen Grund, deshalb stehen sie auf weißen Plaketten – so
wirken sie in beiden Themen gleich.

## Team und Leistungen

| Datei | Verwendung |
|---|---|
| `team-fuhrpark.jpg` | Bildband auf Startseite und Teamseite (1890 × 512) |
| `ueber-uns.jpg` | Seite „Wir stellen uns vor“ |
| `leistung/schiebetueren.jpg` … | je ein Foto auf den sechs Leistungsseiten |

Die Leistungsfotos kamen als 2000 px breite Originale und wurden mit
`build/upscale.sh` auf 1400 px gerechnet; das Panorama stammt aus einem
Bildschirmfoto und liegt als JPEG vor. Gibt es das Original in höherer
Auflösung, ersetzt es die Datei ohne weitere Änderung.

## Zertifikate

`zertifikat/fta-sachkunde.jpg`, `zertifikat/geze-gs262.jpg`,
`zertifikat/hoermann-t30.jpg` – Sachkundenachweise und Herstellerschulungen,
gepflegt in `build/content/certificate.mjs`. Ein Klick auf die Karte öffnet
die Urkunde in voller Größe.

**Zu prüfen:** Die Urkunden zeigen Namen und Unterschriften. Vor dem Livegang
mit den betroffenen Kolleginnen und Kollegen abstimmen, ob sie so öffentlich
stehen sollen – alternativ die Namen unkenntlich machen.

## Zertifizierung

| Datei | Verwendung |
|---|---|
| `zertifikat-planet-tree.png` | Musterurkunde „ein Baum je Wartungsvertrag“ |
| `partner-planet-tree.png` | Logo des Partners Planet Tree |

Weitere Nachweise (z. B. Sachkundenachweise, Herstellerschulungen) lassen sich
als zusätzliche Karten ergänzen – Datei hier ablegen und in `build/data.mjs`
beim Objekt `certificate` eintragen.
