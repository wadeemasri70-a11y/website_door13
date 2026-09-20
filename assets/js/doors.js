(function () {
  "use strict";

  var tuer = document.querySelector("[data-doors]");
  if (!tuer) return;

  var reduziert = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduziert.matches) {
    tuer.style.setProperty("--open", "1");
    tuer.classList.add("tuer--offen");
    return;
  }

  var raf = 0;
  var sichtbar = true;
  var stand = 0;
  var ziel = 0;

  function messen() {
    var kasten = tuer.getBoundingClientRect();
    var hoehe = window.innerHeight || 800;
    var weg = hoehe * 0.72;
    var fortschritt = (hoehe - kasten.top) / weg;
    ziel = fortschritt < 0 ? 0 : fortschritt > 1 ? 1 : fortschritt;
  }

  function takt() {
    raf = 0;
    stand += (ziel - stand) * 0.16;
    if (Math.abs(ziel - stand) < 0.0015) stand = ziel;
    tuer.style.setProperty("--open", stand.toFixed(4));
    tuer.classList.toggle("tuer--offen", stand > 0.06);
    if (sichtbar && stand !== ziel) planen();
  }

  function planen() {
    if (!raf) raf = requestAnimationFrame(takt);
  }

  function beiScroll() {
    messen();
    if (sichtbar) planen();
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (eintraege) {
      sichtbar = eintraege[0].isIntersecting;
      if (sichtbar) { messen(); planen(); }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { rootMargin: "200px" }).observe(tuer);
  }

  window.addEventListener("scroll", beiScroll, { passive: true });
  window.addEventListener("resize", beiScroll);
  messen();
  stand = ziel;
  tuer.style.setProperty("--open", stand.toFixed(4));
})();
