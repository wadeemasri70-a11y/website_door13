(function () {
  "use strict";

  var STIL_HELL = [
    { elementType: "geometry", stylers: [{ color: "#f0f1f2" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#6b6f70" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f0f1f2" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#d6d8d9" }] },
    { featureType: "administrative.land_parcel", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e7e8e9" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#8d9192" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e1e3e3" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8d9192" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dcdedf" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#575a5b" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#dadcdd" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9a9e9f" }] }
  ];

  var STIL_DUNKEL = [
    { elementType: "geometry", stylers: [{ color: "#1a1d1e" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8d9192" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#121415" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2b2f30" }] },
    { featureType: "administrative.land_parcel", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#212425" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1e2222" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2e2f" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9a9e9f" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3a3f40" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#101313" }] }
  ];

  var MARKER =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="58" viewBox="0 0 44 58">' +
      '<path d="M22 57C22 57 41 34.8 41 21.9 41 10.4 32.5 1 22 1S3 10.4 3 21.9C3 34.8 22 57 22 57z" ' +
      'fill="#e01c0e" stroke="#ffffff" stroke-width="2"/>' +
      '<circle cx="22" cy="21.5" r="7" fill="#ffffff"/></svg>'
    );

  function dunkel() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function weltpunkt(lat, lng, zoom) {
    var kachel = 256 * Math.pow(2, zoom);
    var sinus = Math.sin((lat * Math.PI) / 180);
    sinus = Math.min(Math.max(sinus, -0.9999), 0.9999);
    return {
      x: ((lng + 180) / 360) * kachel,
      y: (0.5 - Math.log((1 + sinus) / (1 - sinus)) / (4 * Math.PI)) * kachel
    };
  }

  function punkteSetzen(box) {
    var liste = box.querySelector("[data-map-punkte]");
    if (!liste || !box.dataset.orte) return;

    var orte = JSON.parse(box.dataset.orte);
    var zoom = parseFloat(box.dataset.zoom) || 9;
    var mitte = weltpunkt(parseFloat(box.dataset.lat), parseFloat(box.dataset.lng), zoom);
    var breite = box.clientWidth;
    var hoehe = box.clientHeight;

    liste.innerHTML = "";
    orte.forEach(function (ort) {
      var punkt = weltpunkt(ort.lat, ort.lng, zoom);
      var links = breite / 2 + (punkt.x - mitte.x);
      var oben = hoehe / 2 + (punkt.y - mitte.y);
      if (links < 12 || links > breite - 12 || oben < 12 || oben > hoehe - 12) return;

      var eintrag = document.createElement("li");
      eintrag.className = "map__punkt" + (ort.sitz ? " map__punkt--sitz" : "");
      eintrag.style.left = ((links / breite) * 100).toFixed(2) + "%";
      eintrag.style.top = ((oben / hoehe) * 100).toFixed(2) + "%";
      eintrag.innerHTML = '<i></i><b>' + ort.name + "</b>";
      liste.appendChild(eintrag);
    });
  }

  function rahmen(box) {
    var frame = document.createElement("iframe");
    frame.className = "map__frame";
    frame.src =
      "https://maps.google.com/maps?ll=" +
      encodeURIComponent(box.dataset.lat + "," + box.dataset.lng) +
      "&q=" + encodeURIComponent(box.dataset.ziel) +
      "&z=" + (parseInt(box.dataset.zoom, 10) || 15) +
      "&hl=de&output=embed";
    frame.loading = "lazy";
    frame.title = box.dataset.title + " auf Google Maps";
    frame.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    frame.allowFullscreen = true;
    box.querySelector("[data-map-canvas]").appendChild(frame);
    box.classList.add("map--aktiv", "map--rahmen");

    if (box.dataset.variante === "region") {
      punkteSetzen(box);
      window.addEventListener("resize", function () { punkteSetzen(box); });
    }
  }

  function laden(box) {
    var schluessel = box.dataset.mapsKey;
    if (!schluessel) {
      rahmen(box);
      return;
    }

    box.classList.add("map--laedt");

    window.falkeMapBereit = function () {
      var mitte = {
        lat: parseFloat(box.dataset.lat) || 51.0,
        lng: parseFloat(box.dataset.lng) || 6.57
      };
      var karte = new google.maps.Map(box.querySelector("[data-map-canvas]"), {
        center: mitte,
        zoom: parseInt(box.dataset.zoom, 10) || 15,
        styles: dunkel() ? STIL_DUNKEL : STIL_HELL,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "cooperative",
        backgroundColor: dunkel() ? "#1a1d1e" : "#f0f1f2"
      });

      var markierung = new google.maps.Marker({
        map: karte,
        position: mitte,
        title: box.dataset.title || "",
        icon: {
          url: MARKER,
          scaledSize: new google.maps.Size(34, 45),
          anchor: new google.maps.Point(17, 45)
        }
      });

      if (box.dataset.address) {
        new google.maps.Geocoder().geocode(
          { address: box.dataset.address },
          function (treffer, status) {
            if (status === "OK" && treffer[0]) {
              karte.setCenter(treffer[0].geometry.location);
              markierung.setPosition(treffer[0].geometry.location);
            }
          }
        );
      }

      new MutationObserver(function () {
        karte.setOptions({ styles: dunkel() ? STIL_DUNKEL : STIL_HELL });
      }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      box.classList.remove("map--laedt");
      box.classList.add("map--aktiv");
    };

    var skript = document.createElement("script");
    skript.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      encodeURIComponent(schluessel) +
      "&loading=async&callback=falkeMapBereit";
    skript.async = true;
    skript.onerror = function () {
      box.classList.remove("map--laedt");
      box.classList.add("map--fehler");
    };
    document.head.appendChild(skript);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var boxen = document.querySelectorAll("[data-map]");
    for (var i = 0; i < boxen.length; i++) {
      (function (box) {
        var knopf = box.querySelector("[data-map-load]");
        if (knopf) knopf.addEventListener("click", function () { laden(box); });
      })(boxen[i]);
    }
  });
})();
