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
    } catch (e) {}
    var keks = /(?:^|;\s*)falke-theme=(light|dark)/.exec(document.cookie);
    return keks ? keks[1] : null;
  }

  function merken(wert) {
    try {
      window.localStorage.setItem(KEY, wert);
      if (window.localStorage.getItem(KEY) === wert) return true;
    } catch (e) {}
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

  root.className = root.className.replace("no-js", "js");
  var ausAdresseGesetzt = ausAdresse();
  anwenden(ausAdresseGesetzt || ausSpeicher() || "dark");

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
