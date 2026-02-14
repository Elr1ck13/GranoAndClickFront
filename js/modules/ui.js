export const UI = {
    /**
     * Valida la existencia de un contenedor y lo retorna.
     * @param {string} containerId
     * @returns {HTMLElement|null}
     */
    getContainer: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`No se encontró el contenedor '#${containerId}'`);
            return null;
        }
        return container;
    }
};