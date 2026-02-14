import { UI } from "../modules/ui.js";
import { Router } from "../modules/router.js";
import { assetMap } from '../api/urls.js'; 


export const Footer = {
  init: (containerId, pageElement) => {
    const container = UI.getContainer(containerId);
    if (!container) return;
    const footerLogoFile = assetMap["footer-logo"];
    const iconPath = Router.getAsset(pageElement, footerLogoFile);
    const indexPage = Router.getLink(pageElement, "index.html");
    const contactoPage = Router.getLink(pageElement, "contacto.html");

    container.innerHTML = `
      <footer class="footer-gradient py-3">
        <div class="container">
          <div class="row align-items-center flex-column flex-md-row text-center text-md-start">
            <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
              <a href="${indexPage}" class="footer-brand" aria-label="Grano & Click">
                <img src="${iconPath}" alt="LogoFooter" height="35">
              </a>
              <div class="footer-copyright">© <span id="footer-year">${new Date().getFullYear()}</span> Todos los derechos reservados.</div>
            </div>
            <div class="col-md-6 d-flex flex-column align-items-center align-items-md-end">
              <nav class="footer-links d-flex flex-column flex-md-row gap-2" id="footer-nav">
                <a href="${contactoPage}">Contáctanos</a>
                <a href="#" class="info-aviso-privacidad">Aviso de Privacidad</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  setupEvents: () => {
    document.addEventListener("click", async (e) => {
      const link = e.target.closest(".info-aviso-privacidad");
      if (!link) return;
      e.preventDefault();

      const { showAviso } = await import("./legal.js");
      showAviso();
    });
  },
};
