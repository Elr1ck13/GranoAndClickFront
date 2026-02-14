import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { Router } from './modules/router.js';
import { translations } from './api/i18n.js'; 
import { assetMap } from './api/urls.js'; 

document.addEventListener("DOMContentLoaded", async () => {
    const pageElement = document.querySelector("div[id]") || document.body;
    
    const currentLang = 'es'; 

    resolveDynamicImages(pageElement);

    applyTranslations(currentLang);

    Navbar.init("navbar-container", pageElement);
    Footer.init("footer-container", pageElement);

    // event delegation
    setupNavigation(pageElement);
});


function applyTranslations(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.dataset.i18n;
        const text = translations[lang][key];
        if (text) {
            el.innerHTML = text; 
        }
    });
}

function resolveDynamicImages(pageElement) {
    const dynamicImages = document.querySelectorAll("img[data-img]");
    dynamicImages.forEach(img => {
        const assetKey = img.dataset.img; 
        const fileName = assetMap[assetKey]; 
        
        if (fileName) {
            img.src = Router.getAsset(pageElement, fileName);
        } else {
            console.warn(`La clave de imagen "${assetKey}" no está definida en el assetMap.`);
        }
    });
}

function setupNavigation(pageElement) {
    document.addEventListener("click", (e) => {
        const target = e.target.closest("[data-route]");
        if (!target) return;

        e.preventDefault();
        const page = target.dataset.route;
        const hash = target.dataset.hash ? `#${target.dataset.hash}` : "";
        
        const url = Router.getLink(pageElement, page);
        window.location.href = url + hash;
    });
}