import { UI } from "../modules/ui.js";
import { Router } from "../modules/router.js";
import { assetMap } from '../api/urls.js';
import { translations } from "../api/i18n.js";
import { PrivacyService } from "../components/privacyService.js"; // <-- Importamos el servicio

export const Footer = {
  init: (containerId, pageId) => {
    const container = UI.getContainer(containerId);
    if (!container) return;

    const data = {
      logo: Router.getAsset(pageId, assetMap["footer-logo"]),
      index: Router.getLink(pageId, "index.html"),
      contact: Router.getLink(pageId, "contact.html"),
      year: new Date().getFullYear()
    };

    container.innerHTML = renderTemplateFooter(data);
    setupListeners(container, pageId);
  }
};

function renderTemplateFooter(data) {
  return `
    <footer class="footer-gradient py-3">
      <div class="container">
        <div class="row align-items-center flex-column flex-md-row text-center text-md-start">
          <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            <a href="${data.index}" class="footer-brand"><img src="${data.logo}" height="35"></a>
            <div class="footer-copyright">© ${data.year} Todos los derechos reservados.</div>
          </div>
          <div class="col-md-6 d-flex flex-column align-items-center align-items-md-end">
            <nav class="footer-links-nav d-flex gap-2">
              <a class="footer-links" href="${data.contact}">${translations["contact-link"]}</a>
              <button type="button" class="btn-privacy-trigger footer-links btn btn-link p-0 ">
                ${translations["privacy-notice"]}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>`;
}

function setupListeners(container, pageId) {
  const btn = container.querySelector(".btn-privacy-trigger");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      PrivacyService.show(pageId); 
    });
  }
}