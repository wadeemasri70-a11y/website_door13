(function () {
  "use strict";

  var felder = document.querySelectorAll("[data-zahl]");
  if (!felder.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var muster = /^(\D*?)(\d[\d.]*)(.*)$/;
  var dauer = 850;

  function zerlegen(feld) {
    var treffer = muster.exec(feld.textContent.trim());
    if (!treffer) return null;
    var ziel = parseInt(treffer[2].replace(/\./g, ""), 10);
    if (!isFinite(ziel)) return null;
    return {
      feld: feld,
      vorn: treffer[1],
      ziel: ziel,
      hinten: treffer[3],
      gruppiert: treffer[2].indexOf(".") > -1
    };
  }

  function setzen(stand, wert) {
    stand.feld.textContent =
      stand.vorn +
      (stand.gruppiert ? wert.toLocaleString("de-DE") : String(wert)) +
      stand.hinten;
  }

  function zaehlen(stand) {
    if (stand.gelaufen) return;
    stand.gelaufen = true;
    var start = 0;
    function bild(jetzt) {
      if (!start) start = jetzt;
      var lauf = Math.min((jetzt - start) / dauer, 1);
      setzen(stand, Math.round(stand.ziel * (1 - Math.pow(1 - lauf, 3))));
      if (lauf < 1) requestAnimationFrame(bild);
    }
    requestAnimationFrame(bild);
  }

  var staende = new WeakMap();
  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (eintrag) {
      if (!eintrag.isIntersecting) return;
      beobachter.unobserve(eintrag.target);
      var stand = staende.get(eintrag.target);
      if (stand) zaehlen(stand);
    });
  }, { threshold: 0.35 });

  var alle = [];
  for (var i = 0; i < felder.length; i++) {
    var stand = zerlegen(felder[i]);
    if (!stand) continue;
    staende.set(felder[i], stand);
    alle.push(stand);
    setzen(stand, 0);
    beobachter.observe(felder[i]);
  }

  window.setTimeout(function () {
    alle.forEach(function (stand) {
      if (stand.gelaufen) return;
      var kasten = stand.feld.getBoundingClientRect();
      if (kasten.top < window.innerHeight && kasten.bottom > 0) zaehlen(stand);
    });
  }, 4000);
})();
