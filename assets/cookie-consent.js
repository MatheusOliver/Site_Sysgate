(function () {
  var STORAGE_KEY = "sysgate_cookie_consent";

  function getStoredConsent() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeConsent(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* localStorage indisponível (modo privado, etc.) - segue sem persistir */
    }
  }

  function buildBanner() {
    var wrap = document.createElement("div");
    wrap.className = "cookie-consent";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-live", "polite");
    wrap.setAttribute("aria-label", "Aviso de cookies");
    wrap.hidden = true;

    wrap.innerHTML =
      '<div class="cookie-consent-head">' +
      '<div class="cookie-consent-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1"/><circle cx="14" cy="9" r="1"/><circle cx="10.5" cy="14.5" r="1"/><circle cx="15" cy="14" r="1"/></svg>' +
      "</div>" +
      "<div>" +
      '<div class="cookie-consent-title">Usamos cookies neste site</div>' +
      '<div class="cookie-consent-text">' +
      "Utilizamos cookies e tecnologias similares para melhorar sua " +
      "experiência de navegação e entender como este site é usado. " +
      'Saiba mais na nossa <a href="privacidade.html">Política de Privacidade</a>.' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="cookie-consent-actions">' +
      '<button type="button" class="cookie-consent-reject" data-action="reject">Somente essenciais</button>' +
      '<button type="button" class="cookie-consent-accept" data-action="accept">Aceitar todos</button>' +
      "</div>";

    document.body.appendChild(wrap);
    return wrap;
  }

  function init() {
    var existingConsent = getStoredConsent();
    if (existingConsent === "accepted" || existingConsent === "rejected") {
      return;
    }

    var banner = buildBanner();

    window.requestAnimationFrame(function () {
      banner.hidden = false;
      window.requestAnimationFrame(function () {
        banner.classList.add("visible");
      });
    });

    banner.addEventListener("click", function (event) {
      var action = event.target.getAttribute("data-action");
      if (!action) return;

      storeConsent(action === "accept" ? "accepted" : "rejected");
      banner.classList.remove("visible");
      window.setTimeout(function () {
        banner.hidden = true;
        banner.remove();
      }, 450);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
