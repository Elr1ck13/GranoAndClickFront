import { getPaths } from '../api/urls.js';

export const Router = {
    getLink: (pageElement, fileName) => {
        const paths = getPaths(pageElement.id);
        if (fileName === "index.html") return paths.index;
        return paths.pages(fileName);
    },

    getAsset: (pageElement, assetPath) => {
        const paths = getPaths(pageElement.id);
        const isIndex = pageElement.id === "indexHere";
        const base = isIndex ? "./assets/images" : "../assets/images";
        return `${base}/${assetPath}`;
    }
};