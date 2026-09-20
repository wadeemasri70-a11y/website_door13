/* =========================================================================
   Seitengenerator
   -------------------------------------------------------------------------
   Jedes Seitenmodul liefert eine Liste von Steckbriefen
   ({ slug, title, description, active, body }); layout.mjs baut daraus die
   fertige Seite, dieser Läufer schreibt sie ins Wurzelverzeichnis.

       node build/build.mjs        (oder: npm run build)
   ========================================================================= */

import { writeFileSync } from "node:fs";
import { page } from "./layout.mjs";

import { pages as start } from "./pages/start.mjs";
import { pages as leistungen } from "./pages/leistungen.mjs";
import { pages as referenzen } from "./pages/referenzen.mjs";
import { pages as unternehmen } from "./pages/unternehmen.mjs";
import { pages as kontakt } from "./pages/kontakt.mjs";
import { pages as rechtliches } from "./pages/rechtliches.mjs";

const alleSeiten = [
  ...start,
  ...leistungen,
  ...referenzen,
  ...unternehmen,
  ...kontakt,
  ...rechtliches
];

for (const seite of alleSeiten) {
  writeFileSync(new URL(`../${seite.slug}.html`, import.meta.url), page(seite));
  console.log("→", seite.slug + ".html");
}

console.log(`\n${alleSeiten.length} Seiten geschrieben.`);
