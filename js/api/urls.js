export const assetMap = {
    "main-hero-left": "background/heroCoffe.png",
    "main-hero-right": "background/heroCake.png",
    "main-prod-1": "background/CafePremium.png",
    "main-prod-2": "background/Capuchino.png",
    "main-prod-3": "background/Reposteria.png",
    "main-large-prod-1": "background/VariosPasteles.png",
    "main-large-prod-2": "background/Panes.png",

    "logo-brand": "brand/brandLogo.png",
    "navbar-logo-admin": "brand/adminLogo.png",
    "navbar-logo-user": "brand/userLogo.png",
    
    "footer-logo":"brand/brandLogoFooter.png"
};

export const getPaths = (pageId) => {
    const isIndex = pageId === "indexHere";

    return {
        index: isIndex ? "./index.html" : "../index.html",
        pages: (fileName) => isIndex ? `./html/${fileName}` : `./${fileName}`,
        imagesBase: isIndex ? "./assets/images" : "../assets/images",
        brand: (file) => {
            const base = isIndex ? "./assets/images/brand" : "../assets/images/brand";
            return `${base}/${file}`;
        }
    };
};