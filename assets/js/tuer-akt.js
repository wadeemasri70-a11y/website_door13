(function () {
  "use strict";

  function klemme(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function abschnitt(p, von, bis) { return klemme((p - von) / (bis - von)); }
  function weich(t) { return 1 - Math.pow(1 - t, 3); }

  var teile = [
    ["--schiene", 0.04, 0.20],
    ["--pfosten", 0.16, 0.34],
    ["--balken", 0.30, 0.48],
    ["--sensor", 0.44, 0.58],
    ["--strom", 0.56, 0.64],
    ["--fluegel", 0.60, 0.78],
    ["--offen", 0.80, 0.94],
    ["--durch", 0.90, 1.00]
  ];

  function start() {
    var akt = document.querySelector("[data-act]");
    if (!akt) return;
    var buehne = akt.querySelector("[data-stage]");
    var montage = akt.querySelector("[data-montage]");
    var hinweis = akt.querySelector("[data-hint]");
    var vorspann = akt.querySelector("[data-intro]");
    var punkte = Array.prototype.slice.call(akt.querySelectorAll("[data-from]"));
    if (!montage || !buehne) return;

    var hoeheVorspann = 0;
    function messen() { hoeheVorspann = vorspann ? vorspann.offsetHeight : 0; }

    function setzen(p) {
      for (var i = 0; i < teile.length; i++) {
        montage.style.setProperty(teile[i][0], weich(abschnitt(p, teile[i][1], teile[i][2])).toFixed(4));
      }
      var schwund = weich(abschnitt(p, 0.08, 0.26));
      if (vorspann) {
        vorspann.style.setProperty("--intro-opacity", (1 - schwund).toFixed(3));
        vorspann.style.setProperty("--p", p.toFixed(3));
      }
      buehne.style.setProperty("--scene-shift", (hoeheVorspann * schwund * 0.5).toFixed(1) + "px");
      if (hinweis) hinweis.style.setProperty("--hint-opacity", (1 - klemme(p * 14)).toFixed(3));
      for (var k = 0; k < punkte.length; k++) {
        var h = punkte[k];
        h.classList.toggle("is-on", p >= parseFloat(h.dataset.from) && p <= parseFloat(h.dataset.to));
      }
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      messen();
      setzen(0.87);
      for (var j = 0; j < punkte.length; j++) punkte[j].classList.add("is-on");
      return;
    }

    var ziel = 0, stand = 0, raf = 0, sichtbar = true;

    function lesen() {
      var kasten = akt.getBoundingClientRect();
      var weg = akt.offsetHeight - buehne.clientHeight;
      ziel = weg > 0 ? klemme(-kasten.top / weg) : 0;
    }

    function planen() { if (!raf) raf = requestAnimationFrame(takt); }

    function takt() {
      raf = 0;
      stand += (ziel - stand) * 0.14;
      if (Math.abs(ziel - stand) < 0.0002) stand = ziel;
      setzen(stand);
      if (sichtbar && stand !== ziel) planen();
    }

    function beiScroll() { lesen(); if (sichtbar) planen(); }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (eintraege) {
        sichtbar = eintraege[0].isIntersecting;
        if (sichtbar) { lesen(); planen(); }
        else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      }, { rootMargin: "120px" }).observe(akt);
    }

    window.addEventListener("scroll", beiScroll, { passive: true });
    window.addEventListener("resize", function () { messen(); beiScroll(); });

    messen();
    lesen();
    stand = ziel;
    setzen(stand);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
