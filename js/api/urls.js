export const assetMap = {
    "main-hero-left": "background/heroRight.png",
    "main-hero-right": "background/heroLeft.png",
    "main-hero-center": "background/heroCenter.png",
    "main-prod-1": "background/mainProd1.png",
    "main-prod-2": "background/mainProd2.png",
    "main-prod-3": "background/mainProd3.png",
    "main-large-prod-1": "background/largeProd1.png",
    "main-large-prod-2": "background/largeProd2.png",

    "logo-brand": "brand/brandLogo.png",
    "navbar-logo-admin": "brand/adminLogo.png",
    "navbar-logo-user": "brand/userLogo.png",
    
    "footer-logo":"brand/brandLogoFooter.png"
};

export const getPaths = (pageId) => {
    const isIndex = pageId === "indexHere";

    return {
        index: isIndex ? "./index.html" : "../index.html",
        pages: (fileName) => isIndex ? `./pages/${fileName}` : `./${fileName}`,
        imagesBase: isIndex ? "./assets/images" : "../assets/images",
        brand: (file) => {
            const base = isIndex ? "./assets/images/brand" : "../assets/images/brand";
            return `${base}/${file}`;
        }
    };
};