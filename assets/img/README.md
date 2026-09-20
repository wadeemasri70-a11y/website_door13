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

**Achtung:** Das sind die verkleinerten Fassungen aus der Mediathek
(225 × 300 bzw. 300 × 225 px). Für große Darstellungen bitte die Originale
nachliefern – mindestens 1600 px Kantenlänge, als JPG oder WebP auf ≤ 300 KB
komprimiert. Die Zuordnung steht in `build/data.mjs`.

## Zertifizierung

| Datei | Verwendung |
|---|---|
| `zertifikat-planet-tree.png` | Musterurkunde „ein Baum je Wartungsvertrag“ |
| `partner-planet-tree.png` | Logo des Partners Planet Tree |

Weitere Nachweise (z. B. Sachkundenachweise, Herstellerschulungen) lassen sich
als zusätzliche Karten ergänzen – Datei hier ablegen und in `build/data.mjs`
beim Objekt `certificate` eintragen.
