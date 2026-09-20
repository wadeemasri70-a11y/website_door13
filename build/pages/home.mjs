import { serviceCards, referenceTeaser, treeBlock, partnerStrip } from "../blocks.mjs";
import { services, projects, certificate, partners } from "../data.mjs";

/* Rumpf der Startseite. Die drei Raster (Leistungen, Referenzteaser,
   Zertifizierung) entstehen aus den Daten in data.mjs – alles andere steht
   hier, weil es genau einmal vorkommt. */
export function homeBody() {
  return `  <!-- ============================ HERO ============================ -->
  <section class="hero" id="top">
    <div class="hero__doors" aria-hidden="true"><i></i><i></i></div>
    <div class="shell hero__inner">
      <p class="eyebrow">Türautomation im Rheinland · seit 2020</p>
      <h1>Türen, die <em>zuverlässig</em> öffnen. Service, der ankommt.</h1>
      <p class="hero__lede">
        Wir warten, reparieren und modernisieren automatische Türanlagen, Brandschutztüren,
        Feststellanlagen und Tore – herstellerunabhängig, nach Norm und mit eigenen
        Servicetechnikern im Raum Köln, Düsseldorf, Bonn und Aachen.
      </p>
      <div class="hero__actions">
        <a class="btn btn--accent" href="kontakt.html">
          Wartung anfragen
          <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h13m-5-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a class="btn btn--ghost" href="#unser-angebot">Leistungen ansehen</a>
      </div>

      <div class="hero__meta">
        <div><b>11</b><span>Kolleginnen &amp; Kollegen</span></div>
        <div><b>7</b><span>Servicetechniker</span></div>
        <div><b>4</b><span>Regionen im Einsatz</span></div>
        <div><b>24 h</b><span>Störungsannahme</span></div>
      </div>
    </div>
  </section>

  <!-- ========================== PARTNER ========================== -->
  <section class="section section--white section--slim" aria-label="Partner und Mitgliedschaften">
    <div class="shell">
${partnerStrip(partners)}
    </div>
  </section>

  <!-- ==================== 3-D-AKT: DER SERVICEWAGEN ==================== -->
  <section class="act" data-act aria-labelledby="act-title">
    <div class="act__stage" data-stage>

      <div class="stage__light" aria-hidden="true"></div>
      <div class="stage__floor" aria-hidden="true"></div>

      <div class="stage__intro" data-intro>
        <p class="eyebrow">Unser Servicefahrzeug</p>
        <h2 id="act-title">Unser Servicewagen – einmal rundherum.</h2>
        <p>Sieben Techniker, voll ausgerüstete Transporter, Ersatzteile an Bord.
           Meistens ist die Tür am selben Tag wieder in Betrieb.</p>
      </div>

      <div class="stage__scene" data-scene aria-hidden="true"></div>

      <!-- Fallback ohne JavaScript: flache Seitenansicht -->
      <div class="van-fallback">
        <svg viewBox="0 0 960 420" role="img" aria-label="Servicefahrzeug von Falke Türautomation">
          <rect x="60" y="90" width="620" height="230" rx="14" fill="#f4f5f6"/>
          <path d="M680 200h120l30 40v80H680z" fill="#e4e6e7"/>
          <path d="M680 200 760 120h-80z" fill="#1c1f20"/>
          <rect x="60" y="250" width="740" height="70" fill="#e01c0e"/>
          <rect x="60" y="300" width="740" height="20" fill="#1c1f20"/>
          <circle cx="250" cy="330" r="56" fill="#14191f"/><circle cx="250" cy="330" r="24" fill="#8d9192"/>
          <circle cx="700" cy="330" r="56" fill="#14191f"/><circle cx="700" cy="330" r="24" fill="#8d9192"/>
        </svg>
        <img src="assets/img/logo-falke.png" alt="" width="600" height="200">
      </div>

      <div class="hotspots">
        <div class="hotspot" style="left:7%;top:26%" data-from="0.18" data-to="0.52">
          <b>Eigene Techniker</b>
          <span>Kein Subunternehmer: sieben Servicetechniker, ein Disponent, feste Ansprechpartner.</span>
        </div>
        <div class="hotspot" style="right:7%;top:38%" data-from="0.40" data-to="0.72">
          <b>Ersatzteile an Bord</b>
          <span>Gängige Antriebe, Sensoren und Verschleißteile fahren mit – das spart den zweiten Termin.</span>
        </div>
        <div class="hotspot" style="left:11%;bottom:22%" data-from="0.62" data-to="0.94">
          <b>Herstellerunabhängig</b>
          <span>GEZE, dormakaba, Assa Abloy und mehr – Ihr gesamter Anlagenbestand aus einer Hand.</span>
        </div>
      </div>

      <p class="stage__hint" data-hint><span class="mouse" aria-hidden="true"></span> Scrollen</p>
    </div>
  </section>

  <!-- ========================= LEISTUNGEN ========================= -->
  <section class="section section--paper" id="unser-angebot">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Leistungen</p>
        <h2>Alles rund um die automatische Tür – aus einer Hand.</h2>
        <p>Von der Beratung über die Montage bis zur wiederkehrenden Prüfung.
           Wir betreuen Bestandsanlagen genauso sorgfältig wie neue Projekte.</p>
      </div>

${serviceCards(services)}
        </div>
  </section>

  <!-- ========================== WARTUNG ========================== -->
  <section class="section section--dark" id="normen-pflichten">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Wartung &amp; Prüfung</p>
        <h2>Geprüft nach Norm. Dokumentiert für Ihre Unterlagen.</h2>
        <p>Betreiber automatischer Türen sind zur wiederkehrenden Prüfung verpflichtet.
           Wir übernehmen Fristenverwaltung, Prüfung und Prüfbuch – Sie bekommen ein Protokoll,
           das jeder Sachverständige akzeptiert.</p>
      </div>

      <div class="stats" data-reveal>
        <div class="stat"><b>2020</b><span>gegründet von René Falke</span></div>
        <div class="stat"><b>11</b><span>Mitarbeitende im Team</span></div>
        <div class="stat"><b>7</b><span>Servicetechniker im Außendienst</span></div>
        <div class="stat"><b>1×</b><span>Prüfung pro Jahr, mindestens</span></div>
      </div>

      <ul class="norms" data-reveal>
        <li>DIN EN 16005</li>
        <li>DIN 18650</li>
        <li>DIN 14677</li>
        <li>ASR A1.7</li>
        <li>DGUV-konforme Dokumentation</li>
      </ul>
    </div>
  </section>

  <!-- ========================= HERSTELLER ========================= -->
  <section class="section section--white">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Herstellerunabhängig</p>
        <h2>Ein Ansprechpartner für Ihren gesamten Anlagenbestand.</h2>
        <p>Wir sind an keine Marke gebunden. Das heißt: eine Wartungsliste, ein Vertrag,
           ein Techniker – auch wenn in Ihrem Gebäude fünf verschiedene Fabrikate hängen.</p>
      </div>
      <ul class="makers" data-reveal>
        <li>GEZE</li><li>dormakaba</li><li>Assa Abloy</li><li>Record</li>
        <li>Tormax</li><li>Besam</li><li>Hörmann</li><li>weitere auf Anfrage</li>
      </ul>
    </div>
  </section>

  <!-- ======================== ZERTIFIZIERUNG ========================
       Inhalt und Urkunde stammen aus dem bestehenden Auftritt
       (Partnerschaft mit Planet Tree). Weitere Nachweise lassen sich
       über build/data.mjs als zusätzliche Karten ergänzen.            -->
  <section class="section section--paper" id="zertifizierung">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Zertifizierung</p>
        <h2>Ein Wartungsvertrag. Ein Baum.</h2>
        <p>Für jeden abgeschlossenen Wartungsvertrag pflanzen wir gemeinsam mit unserem
           Partner Planet Tree einen Baum – mit Urkunde, Standort und Koordinaten.</p>
      </div>

${treeBlock(certificate)}
    </div>
  </section>

  <!-- ========================= REFERENZEN ========================= -->
  <section class="section section--white" id="referenzen">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Referenzen</p>
        <h2>Türen, die täglich tausendfach auf- und zugehen.</h2>
        <p>Öffentliche Auftraggeber, Kliniken, Banken und Industrie vertrauen auf unseren Service.
           Ein Auszug aus laufenden Projekten und Wartungsverträgen.</p>
      </div>

${referenceTeaser(projects)}
        </div>
  </section>

  <!-- =========================== ABLAUF =========================== -->
  <section class="section section--dark" id="ablauf">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Ablauf</p>
        <h2>Vier Schritte – vom Anruf bis zum Prüfprotokoll.</h2>
      </div>
      <div class="steps">
        <article class="step" data-reveal>
          <h3>Anruf &amp; Aufnahme</h3>
          <p>Sie schildern Anlage und Störung. Unser Disponent erfasst Standort, Fabrikat und Dringlichkeit.</p>
        </article>
        <article class="step" data-reveal style="--reveal-delay:80ms">
          <h3>Termin &amp; Anfahrt</h3>
          <p>Wir planen den Einsatz in die Tour ein – mit passenden Ersatzteilen im Fahrzeug.</p>
        </article>
        <article class="step" data-reveal style="--reveal-delay:160ms">
          <h3>Arbeit an der Anlage</h3>
          <p>Instandsetzung, Einstellung, Sicherheitsprüfung. Größere Arbeiten stimmen wir vorher ab.</p>
        </article>
        <article class="step" data-reveal style="--reveal-delay:240ms">
          <h3>Protokoll &amp; Fristen</h3>
          <p>Sie erhalten die Dokumentation – und wir erinnern Sie an die nächste fällige Prüfung.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ======================== NOTDIENSTBAND ======================== -->
  <section class="section section--white">
    <div class="shell">
      <div class="alarm" data-reveal>
        <div>
          <h2>Tür blockiert, Tor steht, Anlage meldet Störung?</h2>
          <p>Rufen Sie an, statt zu mailen. Wir nehmen die Störung sofort auf und sagen Ihnen
             ehrlich, wann ein Techniker bei Ihnen sein kann.</p>
        </div>
        <a class="btn" href="tel:+4915116567504">
          <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 5.2 2 2 0 0 1 5 3z" stroke-linejoin="round"/>
          </svg>
          0151 165 675 04
        </a>
      </div>
    </div>
  </section>

  <!-- ========================= UNTERNEHMEN ========================= -->
  <section class="section section--dark" id="ueber-uns">
    <div class="shell">
      <div class="region">
        <div data-reveal>
          <p class="eyebrow">Unternehmen &amp; Einsatzgebiet</p>
          <h2>Aus Bedburg – unterwegs im ganzen Rheinland.</h2>
          <p class="lede" style="color:var(--steel-400);margin-top:var(--sp-5)">
            René Falke hat das Unternehmen 2020 nach über zehn Jahren in der Türtechnik gegründet.
            Heute sind wir elf Kolleginnen und Kollegen, davon sieben Servicetechniker.
            Unser Schwerpunkt: Bestandsanlagen am Laufen halten, statt sie vorschnell zu ersetzen.
          </p>
          <ul class="norms" data-reveal>
            <li>Köln</li><li>Düsseldorf</li><li>Bonn</li><li>Aachen</li><li>Rhein-Erft-Kreis</li>
          </ul>
        </div>

        <div class="region__map" data-reveal aria-label="Einsatzgebiet: Köln, Düsseldorf, Bonn, Aachen" role="img">
          <div class="pin pin--hq" style="left:46%;top:44%"><i></i><b>Bedburg</b></div>
          <div class="pin" style="left:62%;top:54%"><i></i><b>Köln</b></div>
          <div class="pin" style="left:70%;top:26%"><i></i><b>Düsseldorf</b></div>
          <div class="pin" style="left:64%;top:74%"><i></i><b>Bonn</b></div>
          <div class="pin" style="left:22%;top:66%"><i></i><b>Aachen</b></div>
        </div>
      </div>
    </div>
  </section>

  <!-- =========================== KONTAKT =========================== -->
  <section class="section section--paper" id="kontakt">
    <div class="shell">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Beratung &amp; Kontakt</p>
        <h2>Sagen Sie uns, welche Tür Ärger macht.</h2>
        <p>Beschreiben Sie Anlage und Standort – wir melden uns in der Regel am selben Werktag
           mit einer Einschätzung zurück.</p>
      </div>

      <div class="contact">
        <dl class="contact__data" data-reveal>
          <div class="contact__row">
            <dt>Telefon</dt>
            <dd><a class="link-line" href="tel:+4922729089270">02272 908 92 70</a>
              <small>Mobil / Notdienst: <a href="tel:+4915116567504">0151 165 675 04</a></small></dd>
          </div>
          <div class="contact__row">
            <dt>E-Mail</dt>
            <dd><a class="link-line" href="mailto:info@falke-tuerautomation.de">info@falke-tuerautomation.de</a></dd>
          </div>
          <div class="contact__row">
            <dt>Anschrift</dt>
            <dd>Kasterer Str. 12<small>50181 Bedburg</small></dd>
          </div>
          <div class="contact__row">
            <dt>Sprechzeiten</dt>
            <dd>Mo – Fr, 8:00 – 16:30 Uhr<small>Störungsannahme darüber hinaus telefonisch</small></dd>
          </div>
        </dl>

        <form class="form" data-reveal data-form novalidate>
          <div class="field--row">
            <div class="field">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="firma">Firma / Objekt</label>
              <input id="firma" name="firma" type="text" autocomplete="organization">
            </div>
          </div>
          <div class="field--row">
            <div class="field">
              <label for="email">E-Mail</label>
              <input id="email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="telefon">Telefon</label>
              <input id="telefon" name="telefon" type="tel" autocomplete="tel">
            </div>
          </div>
          <div class="field">
            <label for="anliegen">Anliegen</label>
            <select id="anliegen" name="anliegen">
              <option>Wartungsvertrag / wiederkehrende Prüfung</option>
              <option>Störung / Reparatur</option>
              <option>Neue Anlage / Angebot</option>
              <option>Modernisierung bestehender Antriebe</option>
              <option>Sonstiges</option>
            </select>
          </div>
          <div class="field">
            <label for="nachricht">Nachricht</label>
            <textarea id="nachricht" name="nachricht" placeholder="Fabrikat, Standort, seit wann besteht die Störung?" required></textarea>
          </div>
          <p class="form__status" data-form-status hidden role="status"></p>
          <button class="btn btn--accent" type="submit">
            Anfrage senden
            <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h13m-5-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p class="form__note">
            Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der Anfrage zu.
            Hinweise dazu in der Datenschutzerklärung.
          </p>
        </form>
      </div>
    </div>
  </section>`;
}
