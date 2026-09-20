/* =========================================================================
   main.js – Header, Navigation, Reveals, Formular. Ohne Abhängigkeiten.
   ========================================================================= */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header: Zustand beim Scrollen ------------------------------------ */
  const header = document.querySelector("[data-header]");
  if (header) {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none";
    document.body.prepend(sentinel);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        header.classList.toggle("is-stuck", !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(sentinel);
    }
  }

  /* ---- Mobile Navigation ------------------------------------------------ */
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    const setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) setOpen(false);
    });
  }

  /* ---- Scroll-Reveal ----------------------------------------------------- */
  const revealables = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (n) { n.classList.add("is-in"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
    revealables.forEach(function (n) { io.observe(n); });
    /* Sicherheitsnetz: Inhalt darf nie dauerhaft unsichtbar bleiben */
    window.setTimeout(function () {
      revealables.forEach(function (n) { n.classList.add("is-in"); });
    }, 3000);
  }

  /* ---- Aktiver Navigationspunkt ----------------------------------------- */
  const sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  const links = new Map();
  document.querySelectorAll("[data-nav] a[href^='#']").forEach(function (a) {
    links.set(a.getAttribute("href").slice(1), a);
  });
  if (sections.length && links.size && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const link = links.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Formular ---------------------------------------------------------
     Ohne Backend: die Anfrage wird als vorbereitete E-Mail geöffnet.
     Für ein echtes Postfach hier den Endpoint eintragen (FORM_ENDPOINT).   */
  const FORM_ENDPOINT = "";
  const MAILTO = "info@falke-tuerautomation.de";
  const form = document.querySelector("[data-form]");
  const status = document.querySelector("[data-form-status]");

  function say(text) {
    if (!status) return;
    status.hidden = false;
    status.textContent = text;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const required = ["name", "email", "nachricht"];
      const missing = required.filter(function (k) { return !String(data.get(k) || "").trim(); });
      if (missing.length) {
        say("Bitte füllen Sie Name, E-Mail und Nachricht aus.");
        const first = form.querySelector("[name='" + missing[0] + "']");
        if (first) first.focus();
        return;
      }

      if (FORM_ENDPOINT) {
        say("Anfrage wird gesendet …");
        fetch(FORM_ENDPOINT, { method: "POST", body: data })
          .then(function (r) {
            say(r.ok
              ? "Danke – Ihre Anfrage ist eingegangen. Wir melden uns zurück."
              : "Das Senden hat nicht geklappt. Bitte rufen Sie uns kurz an: 02272 908 92 70.");
            if (r.ok) form.reset();
          })
          .catch(function () {
            say("Keine Verbindung. Bitte rufen Sie uns an: 02272 908 92 70.");
          });
        return;
      }

      const subject = "Anfrage: " + (data.get("anliegen") || "Türautomation");
      const body = [
        "Name: " + data.get("name"),
        "Firma / Objekt: " + (data.get("firma") || "–"),
        "E-Mail: " + data.get("email"),
        "Telefon: " + (data.get("telefon") || "–"),
        "Anliegen: " + data.get("anliegen"),
        "",
        data.get("nachricht")
      ].join("\n");
      window.location.href =
        "mailto:" + MAILTO +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      say("Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage. Alternativ: 02272 908 92 70.");
    });
  }

  /* ---- Jahreszahl im Footer --------------------------------------------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
