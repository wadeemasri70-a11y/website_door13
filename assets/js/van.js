(function () {
  "use strict";

  const G = {
    L: 600, H: 300, W: 230,
    hoodL: 120, hoodTop: -10,
    bumperL: 28,
    R: 60, TW: 44,
    axleFront: 225, axleRear: -180,
    seg: 14
  };
  G.frontX = G.L / 2;
  G.noseX = G.frontX + G.hoodL;
  G.bottomY = G.H / 2;
  G.topY = -G.H / 2;
  G.axleY = G.bottomY + 28;
  G.groundY = G.axleY + G.R;
  G.halfW = G.W / 2;

  G.wsDx = G.hoodL;
  G.wsDy = G.hoodTop - G.topY;
  G.wsLen = Math.hypot(G.wsDx, G.wsDy);
  G.wsAngle = -(90 - (Math.atan2(G.wsDy, G.wsDx) * 180) / Math.PI);

  const NS = "http://www.w3.org/2000/svg";

  const LOGO = '<img src="assets/img/logo-falke.png" alt="" width="600" height="200" style="width:100%;height:auto">';

  const px = (n) => n + "px";
  const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const seg = (p, a, b) => clamp01((p - a) / (b - a));

  function el(tag, cls, parent) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (parent) parent.appendChild(n);
    return n;
  }

  function panel(parent, cls, w, h, cx, cy, cz, rot) {
    const n = el("div", "f " + cls, parent);
    n.style.width = px(w);
    n.style.height = px(h);
    n.style.marginLeft = px(-w / 2);
    n.style.marginTop = px(-h / 2);
    n.style.transform = `translate3d(${px(cx)}, ${px(cy)}, ${px(cz)}) ` + (rot || "");
    return n;
  }

  function boxSolid(parent, opts) {
    const { x = 0, y = 0, z = 0, l, h, w, cls = "f--dark", skipBottom = true } = opts;
    const out = {};
    out.near = panel(parent, cls, l, h, x, y, z + w / 2, "");
    out.far = panel(parent, cls + " f--vol", l, h, x, y, z - w / 2, "rotateY(180deg)");
    out.front = panel(parent, cls + " f--vol", w, h, x + l / 2, y, z, "rotateY(90deg)");
    out.back = panel(parent, cls + " f--vol", w, h, x - l / 2, y, z, "rotateY(-90deg)");
    out.top = panel(parent, cls + " f--vol", l, w, x, y - h / 2, z, "rotateX(90deg)");
    if (!skipBottom) out.bottom = panel(parent, cls + " f--vol", l, w, x, y + h / 2, z, "rotateX(-90deg)");
    return out;
  }

  function detail(parent, cls, w, h, left, top, extra) {
    const n = el("div", "detail " + cls, parent);
    n.style.width = px(w);
    n.style.height = px(h);
    n.style.left = px(left);
    n.style.top = px(top);
    if (extra) n.setAttribute("style", n.getAttribute("style") + ";" + extra);
    return n;
  }

  function buildVan(root) {
    const van = el("div", "van", root);

    const sh = el("div", "van-shadow", van);
    sh.style.width = px(1000);
    sh.style.height = px(300);
    sh.style.marginLeft = px(-500);
    sh.style.marginTop = px(-150);
    sh.style.transform = `translate3d(${px(30)}, ${px(G.groundY + 6)}, 0) rotateX(90deg)`;

    panel(van, "f--roof f--vol", G.L, G.W, 0, G.topY, 0, "rotateX(90deg)");
    panel(van, "f--dark f--vol", G.L + G.hoodL + G.bumperL, G.W, (G.hoodL + G.bumperL) / 2, G.bottomY, 0, "rotateX(-90deg)");
    const rear = panel(van, "f--rear f--vol", G.W, G.H, -G.frontX, 0, 0, "rotateY(-90deg)");
    panel(van, "f--far f--vol", G.L, G.H, 0, 0, -G.halfW, "rotateY(180deg)");
    const nearSide = panel(van, "f--side", G.L, G.H, 0, 0, G.halfW, "");

    const hoodH = G.bottomY - G.hoodTop;
    const hoodCx = G.frontX + G.hoodL / 2;
    const hoodCy = G.hoodTop + hoodH / 2;
    panel(van, "f--roof f--vol", G.hoodL, G.W, hoodCx, G.hoodTop, 0, "rotateX(90deg)");
    const noseFace = panel(van, "f--nose f--vol", G.W, hoodH, G.noseX, hoodCy, 0, "rotateY(90deg)");
    const hoodNear = panel(van, "f--side", G.hoodL, hoodH, hoodCx, hoodCy, G.halfW, "");
    panel(van, "f--far f--vol", G.hoodL, hoodH, hoodCx, hoodCy, -G.halfW, "rotateY(180deg)");

    const wsCx = (G.frontX + G.noseX) / 2;
    const wsCy = (G.topY + G.hoodTop) / 2;
    panel(van, "f--glass f--vol detail--windshield", G.W - 14, G.wsLen,
      wsCx, wsCy, 0, `rotateZ(${G.wsAngle}deg) rotateY(90deg)`);

    [G.halfW + 0.4, -(G.halfW + 0.4)].forEach(function (zz, i) {
      const t = panel(van, "f--glass" + (i ? " f--vol" : ""), G.hoodL, G.wsDy, wsCx, wsCy, zz,
        i ? "rotateY(180deg)" : "");
      t.style.clipPath = i ? "polygon(100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 100%, 0 100%)";
      t.style.background = "linear-gradient(200deg, #3b4d63, #16202c)";
    });

    boxSolid(van, {
      x: G.noseX + G.bumperL / 2, y: G.bottomY - 30, z: 0,
      l: G.bumperL, h: 62, w: G.W + 12, cls: "f--skirt"
    });
    [G.halfW + 26, -(G.halfW + 26)].forEach(function (zz) {
      boxSolid(van, { x: G.frontX - 26, y: -46, z: zz, l: 16, h: 44, w: 26, cls: "f--skirt" });
      boxSolid(van, { x: G.frontX - 26, y: -20, z: zz - Math.sign(zz) * 14, l: 8, h: 10, w: 28, cls: "f--skirt" });
    });
    boxSolid(van, { x: 120, y: G.topY - 15, z: 0, l: 104, h: 30, w: 148, cls: "f--skirt" });
    const dome = el("div", "beacon__dome", van);
    dome.style.width = px(96);
    dome.style.height = px(120);
    dome.style.marginLeft = px(-48);
    dome.style.marginTop = px(-60);
    dome.style.transform = `translate3d(${px(120)}, ${px(G.topY - 31)}, 0) rotateX(90deg)`;

    liverySide(nearSide, hoodNear);
    liveryNose(noseFace, hoodH);
    liveryRear(rear);

    const wheels = [];
    [G.axleFront, G.axleRear].forEach(function (ax) {
      wheels.push(wheel(van, ax, G.axleY, G.halfW - G.TW / 2 - 1));
    });

    return { van: van, wheels: wheels };
  }

  function liverySide(side, hoodSide) {
    const lx = (x) => x + G.L / 2;
    const ly = (y) => y + G.H / 2;

    const liv = el("div", "livery", side);
    el("div", "livery__sweep livery__sweep--dark", liv);
    el("div", "livery__sweep", liv);

    detail(side, "detail--skirt", G.L, 30, 0, G.H - 30);

    detail(side, "detail--glass", 122, 92, lx(150), ly(-128), "border-radius:6px 16px 6px 6px");
    detail(side, "detail--seam", 2, G.H - 46, lx(128), 10);
    detail(side, "detail--seam", 2, G.H - 46, lx(282), 10);
    detail(side, "detail--handle", 28, 7, lx(158), ly(-6));

    detail(side, "detail--seam", 2, G.H - 60, lx(-70), 16);
    detail(side, "detail--handle", 24, 6, lx(-60), ly(-10));

    [G.axleFront, G.axleRear].forEach(function (ax) {
      const r = 78;
      detail(side, "detail--arch", r * 2, r, lx(ax) - r, G.H - r + 4);
    });

    const logo = el("div", "livery__logo", liv);
    logo.style.cssText = `left:${px(lx(-252))};top:${px(ly(-126))};width:${px(246)}`;
    logo.innerHTML = LOGO;

    const claim = el("div", "livery__claim", liv);
    claim.textContent = "Wir öffnen Türen";
    claim.style.cssText = `left:${px(lx(-246))};top:${px(ly(-28))};font-size:16px;color:#4f5455`;

    const contact = el("div", "livery__contact", liv);
    contact.innerHTML =
      '02272 908 92 70 <span style="font-size:.72em;opacity:.9">&nbsp;·&nbsp; falke-tuerautomation.de</span>';
    contact.style.cssText = `left:${px(lx(-252))};top:${px(ly(52))};font-size:21px`;

    detail(hoodSide, "detail--skirt", G.hoodL, 24, 0, G.bottomY - G.hoodTop - 24);
  }

  function liveryNose(nose, h) {
    const w = G.W;
    detail(nose, "", w, 12, 0, 26, "background:linear-gradient(90deg,var(--accent),var(--accent-strong));opacity:.92");
    detail(nose, "detail--grille", 150, 30, (w - 150) / 2, 46);
    detail(nose, "detail--light", 46, 20, 14, 42, "border-radius:4px 10px 10px 4px");
    detail(nose, "detail--light", 46, 20, w - 60, 42, "border-radius:10px 4px 4px 10px");
    detail(nose, "detail--plate", 80, 20, (w - 80) / 2, h - 44).textContent = "BM·FA 13";
  }

  function liveryRear(rear) {
    const w = G.W, h = G.H;
    detail(rear, "detail--seam", 3, h - 30, w / 2 - 1.5, 12);
    detail(rear, "detail--glass", 78, 54, 16, 28, "border-radius:5px");
    detail(rear, "detail--glass", 78, 54, w - 94, 28, "border-radius:5px");
    detail(rear, "detail--tail", 22, 50, 10, h - 120);
    detail(rear, "detail--tail", 22, 50, w - 32, h - 120);
    detail(rear, "detail--plate", 80, 20, (w - 80) / 2, h - 48).textContent = "BM·FA 13";
    detail(rear, "detail--handle", 36, 8, w / 2 - 46, h / 2 + 10);
    detail(rear, "detail--handle", 36, 8, w / 2 + 10, h / 2 + 10);
    detail(rear, "", w - 40, 34, 20, h - 92,
      "background:linear-gradient(90deg,var(--accent),var(--accent-strong));border-radius:3px");
  }

  function wheel(parent, x, y, z) {
    const w = el("div", "wheel", parent);
    w.style.transform = `translate3d(${px(x)}, ${px(y)}, ${px(z)})`;
    const hub = el("div", "wheel__hub", w);

    const R = G.R, TW = G.TW, N = G.seg;
    const segW = (2 * Math.PI * R) / N * 1.08;
    for (let i = 0; i < N; i++) {
      const s = el("div", "wheel__tread", hub);
      s.style.width = px(segW);
      s.style.height = px(TW);
      s.style.marginLeft = px(-segW / 2);
      s.style.marginTop = px(-TW / 2);
      s.style.transform = `rotateZ(${(360 / N) * i}deg) translateY(${px(R)}) rotateX(-90deg)`;
      s.style.background = i % 2 ? "#14191f" : "#1a2027";
    }
    [TW / 2, -TW / 2].forEach((zz, i) => {
      const d = el("div", "wheel__disc", hub);
      d.style.width = px(R * 2);
      d.style.height = px(R * 2);
      d.style.marginLeft = px(-R);
      d.style.marginTop = px(-R);
      d.style.transform = `translateZ(${px(zz)})` + (i ? " rotateY(180deg)" : "");
    });
    return w;
  }

  function init() {
    const act = document.querySelector("[data-act]");
    if (!act) return;
    const stage = act.querySelector("[data-stage]");
    const scene = act.querySelector("[data-scene]");
    const hint = act.querySelector("[data-hint]");
    const intro = act.querySelector("[data-intro]");
    const hotspots = Array.prototype.slice.call(act.querySelectorAll("[data-from]"));
    if (!scene) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const built = buildVan(scene);
    const van = built.van;

    let baseScale = 1, introHeight = 0;
    function measure() {
      const vw = scene.clientWidth || window.innerWidth;
      const vh = stage.clientHeight || window.innerHeight;
      introHeight = intro ? intro.offsetHeight : 0;
      const narrow = vw < 860;
      baseScale = Math.min((vw * (narrow ? 0.86 : 0.80)) / 1020, (vh * (narrow ? 0.50 : 0.58)) / 470);
      baseScale = Math.max(0.14, Math.min(baseScale, 0.92));
    }

    function renderStatic() {
      measure();
      van.style.setProperty("--s", baseScale * 0.92);
      stage.style.setProperty("--scene-shift", "0px");
      stage.style.setProperty("--depth", 1);
      stage.style.setProperty("--vol", 1);
      stage.style.setProperty("--flat", 0);
      stage.style.setProperty("--persp", "2400px");
      van.style.setProperty("--ry", "-27deg");
      van.style.setProperty("--rx", "-9deg");
      van.style.setProperty("--dy", "-20px");
      hotspots.forEach((h) => h.classList.add("is-on"));
    }

    if (reduced.matches) {
      renderStatic();
      return;
    }

    let target = 0, current = 0, raf = 0, visible = true, running = false;

    function readProgress() {
      const rect = act.getBoundingClientRect();
      const total = act.offsetHeight - stage.clientHeight;
      target = total > 0 ? clamp01(-rect.top / total) : 0;
    }

    function apply(p) {
      const unfold = easeOut(seg(p, 0.05, 0.34));

      const turnA = easeInOut(seg(p, 0.05, 0.40));
      const turnB = easeInOut(seg(p, 0.42, 0.66));
      const turnC = easeInOut(seg(p, 0.66, 0.90));
      const settle = easeOut(seg(p, 0.90, 1.0));

      const ry = lerp(0, -30, turnA) + lerp(0, -24, turnB) + lerp(0, 86, turnC) + lerp(0, -58, settle);
      const rx = lerp(0, -9, unfold) + lerp(0, -3, turnC);
      const rz = lerp(0, -0.6, easeInOut(seg(p, 0.34, 0.62)));

      stage.style.setProperty("--depth", unfold.toFixed(4));
      stage.style.setProperty("--vol", easeOut(seg(p, 0.05, 0.15)).toFixed(4));
      stage.style.setProperty("--flat", (1 - easeOut(seg(p, 0.02, 0.16))).toFixed(4));
      stage.style.setProperty("--persp", Math.round(lerp(7000, 2300, unfold)) + "px");

      van.style.setProperty("--ry", ry.toFixed(2) + "deg");
      van.style.setProperty("--rx", rx.toFixed(2) + "deg");
      van.style.setProperty("--rz", rz.toFixed(2) + "deg");
      van.style.setProperty("--s", (baseScale * lerp(0.74, 1.0, easeOut(seg(p, 0.10, 0.52)))).toFixed(4));
      van.style.setProperty("--dx", Math.round(lerp(10, 80, easeInOut(seg(p, 0.1, 1)))) + "px");
      van.style.setProperty("--dy",
        (-26 + Math.sin(p * 46) * 1.6 * unfold).toFixed(2) + "px");

      const spin = p * 2200;
      for (let i = 0; i < built.wheels.length; i++) {
        built.wheels[i].firstChild.style.transform = "rotateZ(" + spin.toFixed(1) + "deg)";
      }

      const introFade = easeOut(seg(p, 0.10, 0.28));
      if (intro) {
        intro.style.setProperty("--intro-opacity", (1 - introFade).toFixed(3));
        intro.style.setProperty("--p", p.toFixed(3));
      }
      stage.style.setProperty("--scene-shift", (introHeight * introFade * 0.5).toFixed(1) + "px");
      if (hint) hint.style.setProperty("--hint-opacity", (1 - clamp01(p * 14)).toFixed(3));

      for (let i = 0; i < hotspots.length; i++) {
        const h = hotspots[i];
        const from = parseFloat(h.dataset.from), to = parseFloat(h.dataset.to);
        h.classList.toggle("is-on", p >= from && p <= to);
      }
    }

    function tick() {
      raf = 0;
      current = lerp(current, target, 0.14);
      if (Math.abs(current - target) < 0.0002) current = target;
      apply(current);
      if (visible && Math.abs(current - target) > 0.0002) schedule();
      else running = false;
    }
    function schedule() {
      if (!raf) { running = true; raf = requestAnimationFrame(tick); }
    }
    function onScroll() {
      readProgress();
      if (visible) schedule();
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) { readProgress(); schedule(); }
        else if (raf) { cancelAnimationFrame(raf); raf = 0; running = false; }
      }, { rootMargin: "120px" }).observe(act);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
      else { readProgress(); schedule(); }
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { measure(); readProgress(); schedule(); });
    reduced.addEventListener && reduced.addEventListener("change", function (e) {
      if (e.matches) { if (raf) cancelAnimationFrame(raf); renderStatic(); }
    });

    measure();
    readProgress();
    current = target;
    apply(current);

    const q = new URLSearchParams(location.search);
    if (q.has("p")) {
      const fixed = clamp01(parseFloat(q.get("p")) || 0);
      window.removeEventListener("scroll", onScroll);

      if (q.get("solo") === "1") {
        Array.prototype.forEach.call(
          document.querySelectorAll("body > header, body > footer, main > section"),
          function (n) { if (n !== act) n.style.display = "none"; }
        );
        act.style.height = "100vh";
        document.body.insertBefore(act, document.body.firstChild);
      } else {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        const total = act.offsetHeight - stage.clientHeight;
        window.scrollTo(0, act.offsetTop + total * fixed);
      }
      current = target = fixed;
      apply(fixed);
      window.addEventListener("scroll", function () { apply(fixed); }, { passive: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
