
export const Auth = {
    // 1. get token
    getToken: () => {
        return localStorage.getItem("authToken") || localStorage.getItem("token");
    },

    // 2. Clean after closing session
    logout: () => {
        const keys = ["authToken", "token", "userEmail", "userRole", "userName"];
        keys.forEach(key => localStorage.removeItem(key));
    },

    clearStorage: () => Auth.logout(),

    // 3. Verify admin status
    isAdmin: (sesion) => {
        if (!sesion) return false;
        const role = (sesion.rol || sesion.role || sesion.tipoNombre || "").toString().toLowerCase();
        return role.includes("admin") || sesion.subindice === "Ad";
    },

    apiGetSesion: async () => {
        const token = Auth.getToken();
        if (!token) return null;

        try {
            /* real call:
               const response = await fetch('URL_DE_TU_API/sesion', {
                   headers: { 'Authorization': `Bearer ${token}` }
               });
               return await response.json();
            */
            
            // Simulation of auth:
            return JSON.parse(localStorage.getItem("userData")) || { nombre: "Usuario Demo", rol: "user" };
            
        } catch (error) {
            console.error("Error en fetch de sesión:", error);
            throw error;
        }
    }
};