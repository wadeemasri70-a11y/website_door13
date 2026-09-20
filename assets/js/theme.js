/* =========================================================================
   Tag- und Nachtthema
   -------------------------------------------------------------------------
   Die Seite startet immer hell; die Systemeinstellung wird bewusst nicht
   ausgewertet. Wer umschaltet, behält seine Wahl auf allen Seiten.

   Gemerkt wird sie dreifach abgesichert:
     1. localStorage – der Normalfall,
     2. Cookie – wenn der Speicher gesperrt ist (privates Fenster),
     3. Adresszeile – wenn beides nicht geht (eingebettete Vorschauen mit
        abgeschotteter Herkunft). Dann trägt jeder interne Verweis die Wahl
        als ?theme= weiter.

   Dieses Skript steht ohne "defer" im <head>, damit das Thema vor dem ersten
   Bild steht – sonst blitzt die falsche Fassung auf.
   ========================================================================= */

(function () {
  "use strict";

  var KEY = "falke-theme";
  var root = document.documentElement;

  function gueltig(wert) {
    return wert === "light" || wert === "dark" ? wert : null;
  }

  function ausAdresse() {
    var treffer = /[?&]theme=(light|dark)/.exec(location.search);
    return treffer ? treffer[1] : null;
  }

  function ausSpeicher() {
    try {
      var wert = gueltig(window.localStorage.getItem(KEY));
      if (wert) return wert;
    } catch (e) { /* Speicher gesperrt */ }
    var keks = /(?:^|;\s*)falke-theme=(light|dark)/.exec(document.cookie);
    return keks ? keks[1] : null;
  }

  /* Versucht zu speichern und meldet, ob es geklappt hat. */
  function merken(wert) {
    try {
      window.localStorage.setItem(KEY, wert);
      if (window.localStorage.getItem(KEY) === wert) return true;
    } catch (e) { /* weiter zum Cookie */ }
    try {
      document.cookie = KEY + "=" + wert + ";path=/;max-age=31536000;samesite=lax";
      return document.cookie.indexOf(KEY + "=" + wert) !== -1;
    } catch (e) {
      return false;
    }
  }

  function aktuell() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function anwenden(wert) {
    if (wert === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }

  /* Letzte Rückfallebene: die Wahl an alle internen Verweise hängen. */
  function verweiseMitnehmen(wert) {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var ziel = links[i].getAttribute("href");
      if (!ziel || /^(#|https?:|mailto:|tel:|data:)/.test(ziel)) continue;
      var teile = ziel.split("#");
      var pfad = teile[0].replace(/[?&]theme=(light|dark)/, "");
      links[i].setAttribute(
        "href",
        pfad + (pfad.indexOf("?") === -1 ? "?" : "&") + "theme=" + wert +
        (teile[1] ? "#" + teile[1] : "")
      );
    }
  }

  /* Sofort, noch vor dem ersten Rendern */
  root.className = root.className.replace("no-js", "js");
  var ausAdresseGesetzt = ausAdresse();
  anwenden(ausAdresseGesetzt || ausSpeicher() || "light");

  document.addEventListener("DOMContentLoaded", function () {
    if (ausAdresseGesetzt) verweiseMitnehmen(aktuell());

    var schalter = document.querySelector("[data-theme-toggle]");
    if (!schalter) return;

    function beschriften() {
      var dunkel = aktuell() === "dark";
      schalter.setAttribute(
        "aria-label",
        dunkel ? "Zum hellen Design wechseln" : "Zum dunklen Design wechseln"
      );
      schalter.setAttribute("aria-pressed", String(dunkel));
    }

    schalter.addEventListener("click", function () {
      var naechstes = aktuell() === "dark" ? "light" : "dark";
      anwenden(naechstes);
      if (!merken(naechstes)) verweiseMitnehmen(naechstes);
      beschriften();
    });

    beschriften();
  });
})();
