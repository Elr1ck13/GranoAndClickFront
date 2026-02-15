export const allTranslations = {
    es: {
        // index
        // Hero Section
        "hero-brand": "GRANO & CLICK",

        // Features
        "feat-1-title": "Energía en Tiempo Récord.",
        "feat-1-desc": "Recibe tu café y repostería en minutos. Hemos optimizado la logística para que no pierdas el foco en tu trabajo.",

        "feat-2-title": "Excelencia Gourmet.",
        "feat-2-desc": "Garantizamos la más alta calidad en cada producto. Disfruta de una experiencia única, visualmente atractiva y deliciosa.",

        "feat-3-title": "Fácil y Rápido.",
        "feat-3-desc": "Compra en línea en pocos clics y siente la calidez de nuestro servicio digital. Siempre listos para ayudarte con un trato cordial.",

        // product section
        "section-classics-title": "Nuestros clásicos: Los favoritos de la comunidad.",

        // product names
        "main-prod-1": "Café <br> Espresso.",
        "main-prod-2": "Capuchino con Espuma.",
        "main-prod-3": "Repostería <br> Horneada.",

        // btn products
        "btn-call-1": "Disfrútame.",
        "btn-call-2": "Saboréame.",
        "btn-call-3": "Pruébame.",

        //navbar
        "home": "Inicio",
        "contact": "Contactanos",
        "products": "Productos",
        "aboutMe": "Sobre Mi",
        "login": "inicio de Sesión",
        "signin": "Registrarse",
        "car":"Carrito",
        "newProduct":"Nuevo Producto",
        "logout":"Log out",
        
        //footer
        "copyright": "Todos los derechos reservados",
        "privacy-notice": "Aviso de privacidad",
        "contact-link": "Contactanos"

    },
    en: {
        // index
        // Hero Section
        "hero-brand": "GRANO & CLICK",

        // Features
        "feat-1-title": "Energy in Record Time.",
        "feat-1-desc": "Get your coffee and pastries in minutes. We have optimized logistics so you don't lose focus on your work.",

        "feat-2-title": "Gourmet Excellence.",
        "feat-2-desc": "We guarantee the highest quality in every product. Enjoy a unique, visually appealing, and delicious experience.",

        "feat-3-title": "Quick and Easy.",
        "feat-3-desc": "Buy online in a few clicks and feel the warmth of our digital service. Always ready to help with friendly treatment.",

        // Product Section
        "section-classics-title": "Our classics: Community favorites.",

        // Product names
        "main-prod-1": "Espresso <br> Coffee.",
        "main-prod-2": "Foamy Cappuccino.",
        "main-prod-3": "Baked <br> Pastries.",

        // Buttons 
        "btn-call-1": "Enjoy me.",
        "btn-call-2": "Savor me.",
        "btn-call-3": "Try me.",

        //navbar
        "home": "Home",
        "contact": "Contact",
        "products": "Products",
        "aboutMe": "About Me",
        "login": "Log in",
        "signin": "Sign in ",
        "car":"Carrito",
        "newProduct":"Nuevo Producto",
        "logout":"Log out",

        //footer
        "copyright": "All rights reserved",
        "privacy-notice": "Privacy notice",
        "contact-link": "Contact us",

    }
};

const navLang = (navigator.language || navigator.userLanguage).split('-')[0];

const selectedLang = allTranslations[navLang] ? navLang : 'es';

export const translations = allTranslations[selectedLang];
export const currentLang = selectedLang;