import { Router } from '../modules/router.js';
import { Auth } from '../api/auth.js';
import { translations } from '../api/i18n.js';
import { assetMap } from '../api/urls.js';
import { UI } from "../modules/ui.js";


export const Navbar = {
  /**
   * Navbar insertion
   * @param {string} containerId 
   * @param {HTMLElement} pageId 
   */
  init: (containerId, pageId) => {
    const container = UI.getContainer(containerId);
    if (!container) return console.error(`No se encontró el la etiqueta: ${containerId}`);

    const data = {
      icon: Router.getAsset(pageId, assetMap["logo-brand"]),
      index: Router.getLink(pageId, "index.html"),
      about: Router.getLink(pageId, "about.html"),
      contact: Router.getLink(pageId, "contact.html"),
      product: Router.getLink(pageId, "products.html"),
      login: Router.getLink(pageId, "login.html"),
      signin: Router.getLink(pageId, "signin.html"),
      newProduct: Router.getLink(pageId, "newProduct.html"),
      car: Router.getLink(pageId, "car.html")
    };

    container.innerHTML = renderTemplateNavbar(data);
    //sessionEvents(container);

  }
};

function renderTemplateNavbar(data) {
  return `
            <nav class="navbar navbar-dark navbar-expand-lg mt-2">
              <div class="container" id="navBar">
                <a class="navbar-brand" href="${data.index}">
                  <img alt="Logo" height="35" src="${data.icon}">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#mainNavbarContent">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNavbarContent">
                  <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" href="${data.index}">${translations["home"]}</a></li>
                    <li class="nav-item"><a class="nav-link" href="${data.product}">${translations["products"]}</a></li>
                    <li class="nav-item"><a class="nav-link" href="${data.contact}">${translations["contact"]}</a></li>
                    <li class="nav-item"><a class="nav-link" href="${data.about}">${translations["aboutMe"]}</a></li>
                    <li class="nav-item only-admin d-none">
                      <a class="nav-link nav-admin-cta" href="${data.newProduct}">${translations["newProduct"]}</a>
                    </li>
                  </ul>
                  <ul class="navbar-nav d-flex align-items-center">
                    <li class="nav-item only-guest"><a class="nav-link" href="${data.login}">${translations["login"]}</a></li>
                    <li class="nav-item  only-guest"><a class="nav-link" href="${data.signin}">${translations["signin"]}</a></li>
                    
                    <li class="nav-item dropdown only-user d-none" style="padding-right:1rem">
                      <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" id="accountDropdown" data-bs-toggle="dropdown">
                        <img src="" alt="Avatar" class="user-avatar-nav" style="width:30px; border-radius:50%">
                        <span class="user-name-nav"></span>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item logout-btn" href="#">${translations["logout"]}</a></li>
                      </ul>
                    </li>
                    <li class="nav-item only-user d-none" id="carrito">
                      <a class="btn" href="${data.car}" role="button">
                        <i class="bi bi-cart2"></i> ${translations["car"]}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        `;
}

function sessionEvents(conteiner) {
  //Events for logout btn
  container.addEventListener("click", (e) => {
    if (e.target.closest(".logout-btn")) {
      e.preventDefault();
      Auth.logout();
      window.location.href = indexPage;
    }
  });

  //Display according to session type
  applyNavFromBackEnd: (sesion, pageId) => {
    const guestEls = document.querySelectorAll(".only-guest");
    const userEls = document.querySelectorAll(".only-user");
    const adminEls = document.querySelectorAll(".only-admin");
    const nameSpan = document.querySelector(".user-name-nav");
    const avatarImg = document.querySelector(".user-avatar-nav");

    guestEls.forEach(el => el.classList.add("d-none"));
    userEls.forEach(el => el.classList.remove("d-none"));

    if (sesion) {
      const isAdmin = Auth.isAdmin(sesion);
      if (isAdmin) adminEls.forEach(el => el.classList.remove("d-none"));

      if (nameSpan) nameSpan.textContent = `Hola, ${sesion.nombre || 'Usuario'}`;
      if (avatarImg) {
        avatarImg.src = Router.getAsset(pageId, isAdmin ? "IconoLogo.png" : "IconoLogoAzul.png");
      }
    }
  }

}
