/* =========================================================================
   Tag- und Nachtthema
   -------------------------------------------------------------------------
   Die Seite startet immer hell. Wer umschaltet, bekommt seine Wahl auf allen
   Seiten und beim nächsten Besuch zurück.

   Gespeichert wird doppelt: localStorage ist der Normalfall, das Cookie
   springt ein, wenn der Speicher gesperrt ist (private Fenster, eingebettete
   Vorschauen). Dieses Skript steht ohne "defer" im <head>, damit das Thema
   vor dem ersten Bild steht – sonst blitzt die falsche Fassung auf.
   ========================================================================= */

(function () {
  "use strict";

  var KEY = "falke-theme";
  var root = document.documentElement;

  function stored() {
    try {
      var v = window.localStorage.getItem(KEY);
      if (v === "light" || v === "dark") return v;
    } catch (e) { /* Speicher gesperrt */ }
    var m = document.cookie.match(/(?:^|;\s*)falke-theme=(light|dark)/);
    return m ? m[1] : null;
  }

  function remember(value) {
    try { window.localStorage.setItem(KEY, value); } catch (e) { /* s. o. */ }
    try {
      document.cookie = KEY + "=" + value + ";path=/;max-age=31536000;samesite=lax";
    } catch (e) { /* s. o. */ }
  }

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }

  /* Sofort, noch vor dem ersten Rendern */
  root.className = root.className.replace("no-js", "js");
  apply(stored() || "light");

  /* Schalter verdrahten, sobald die Kopfzeile steht */
  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) return;

    function label() {
      button.setAttribute(
        "aria-label",
        current() === "dark" ? "Zum hellen Design wechseln" : "Zum dunklen Design wechseln"
      );
      button.setAttribute("aria-pressed", String(current() === "dark"));
    }

    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      apply(next);
      remember(next);
      label();
    });

    label();
  });
})();
