const API_URL = "http://3.144.149.118";

async function apiGetSesion() {
    const token = localStorage.getItem("authToken");
    if(!token){
        return null;
    }
    const res = await fetch(`${API_URL}/api/login/sesion`,{
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if(!res.ok){
        return null;
    }
    return await res.json();
}