/*  Se necesita que en el html la pagina tenga un id en el primer div, con el con un nombre relativo a la pagina en la que se esta
por ejemplo
<div class="container" id ="aboutUsHere">

*/

function putHTML(place, textToPut, msg) {
  let container = document.getElementById(place);
  if (container) {
    container.insertAdjacentHTML("beforeend", textToPut);
  } else {
    console.error(msg);
  }
}

function getIconPath(page, iconName) {
  let path = "";
  if (page.id === "indexHere") {
    path = `./assets/${iconName}`
  } else {
    path = `../assets/${iconName}`
  }
  return path;
}
function getPagePaths(page, element) {

  let path = "";
  if ((page.id === "indexHere" && element === "index.html") || (page.id !== "indexHere" && element !== "index.html")) {
    path = `./${element}`
  } else if (page.id !== "indexHere" && element === "index.html") {
    path = `../${element}`
  } else if (page.id == "indexHere" && element !== "index.html") {
    path = `./html/${element}`
  }


  return path;
}

function cargarSweetAlertCondicionalmente() {
  if (typeof window.Swal === 'undefined' && typeof window.Swal2 === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(script);
  }
}

function buildFooter(page) {
  let indexPage = getPagePaths(page, "index.html");
  let iconPath = getIconPath(page, "LogoFooter.png");
  let contactoPage = getPagePaths(page, "contacto.html");
  cargarSweetAlertCondicionalmente();
  const footer = `
  <footer class="footer-gradient py-3">
    <div class="container">
      <div class="row align-items-center flex-column flex-md-row text-center text-md-start">
        <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
          <a href="${indexPage}" class="footer-brand" aria-label="Grano & Click">

            <img src="${iconPath}" alt="LogoFooter" height="35">

          </a>
          <div class="footer-copyright">© <span id="footer-year">2025</span> Todos los derechos reservados.</div>
        </div>
        <div class="col-md-6 d-flex flex-column align-items-center align-items-md-end">
          <nav class="footer-links d-flex flex-column flex-md-row gap-2" id= "footer-nav">
            <a href="${contactoPage}">Contáctanos</a>
          <a href="#" class="info-aviso-privacidad">Aviso de Privacidad</a>
            </nav>
        </div>
      </div>
    </div>
  </footer>
`;

  putHTML("footer-container", footer, "Error: No encontré el div con id 'footer-container'");

}

document.addEventListener("click", (e) => {
  const linkPrivacidad = e.target.closest(".info-aviso-privacidad");
  if (!linkPrivacidad) return;
  e.preventDefault();


  if (typeof Swal === 'undefined') {
    // Si el usuario hace clic antes de que el CDN cargue, muestra una alerta simple.
    console.error('SweetAlert2 aún no está cargado. Intente de nuevo en un momento.');
    alert('Aviso de Privacidad en revisión. Disponible pronto.');
    return;
  }

  avisoPrivacidad();
});


/*Aviso de Privacidad */
function avisoPrivacidad() {
  const page = document.querySelector("div");
  let avisoPage = getPagePaths(page, "avisoDePrivacidad.html");
  // Sweetalert
  Swal.fire({
    title: '🔒 Aviso de Privacidad',
    html: `
        <p style="text-align: left;">
            <strong>Grano & Click</strong> es responsable de la privacidad de sus datos.
            Recabamos datos de identificación, contacto y de entrega para:
        </p>
        <ul style="text-align: left; margin-bottom: 15px;">
            <li>Procesar y entregar sus pedidos.</li>
            <li>Gestionar su facturación.</li>
            <li>Fines de marketing.</li>
        </ul>
        <p>Para nuestro Aviso de Privacidad completo de click
          <a href="${avisoPage}" target="_blank"><strong>aquí</strong></a>
        </p>
    `,
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#63addfff',
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    background: '#023859',
    color: '#ffffff'
  });
}


function buildNavBar(page) {
  console.log("PAGE:", page, "ID:", page?.id);
  let iconPath = getIconPath(page, "LogoBien.png");
  let indexPage = getPagePaths(page, "index.html");
  let usPage = getPagePaths(page, "sobreNosotros.html");
  let contactoPage = getPagePaths(page, "contacto.html");
  let productPage = getPagePaths(page, "productos.html")
  let logPage = getPagePaths(page, "login.html");
  let signPage = getPagePaths(page, "signin.html");
  let formularioCreacion = getPagePaths(page, "formularioCreacion.html");
  let carritoPage = getPagePaths(page, "carrito.html");

  const header = document.getElementById("encabezado");

  const navBar = `
    <nav class="navbar navbar-dark navbar-expand-lg mt-2">
      <div class="container" id="navBar">
        <a class="navbar-brand" href="${indexPage}">
          <img src="${iconPath}" alt="Logo" height="35" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#mainNavbarContent" aria-controls="mainNavbarContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavbarContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="${indexPage}">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${productPage}">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${contactoPage}">Contáctanos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${usPage}">Sobre nosotros</a>
            </li>
            <li class="nav-item only-admin d-none">
              <a class="nav-link nav-admin-cta" href="${formularioCreacion}">Agregar producto</a>
            </li>
          </ul>
          <ul class="navbar-nav d-flex align-items-center">
            <li class="nav-item only-guest">
              <a class="nav-link" href="${logPage}">Iniciar sesión</a>
            </li>
            <li class="nav-item me-3 only-guest">
              <a class="nav-link" href="${signPage}">Registrarse</a>
            </li>
            <li class="nav-item dropdown only-user d-none" style="padding-right:1rem">
              <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src"" alt="Avatar usuario" class="user-avatar-nav">
                <span class="user-name-nav"></span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li><a class="dropdown-item" href="#">Perfil</a></li>
                <li><a class="dropdown-item" href="#">Mis pedidos</a></li>
                <li><hr class="dropdown-dividier"></li>
                <li><a class="dropdown-item logout-btn" href="#">Cerrar sesión</a></li>
              </ul>
            </li>
            <li class="nav-item" id="carrito">
              <a class="btn" href="${carritoPage}" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-cart2" viewBox="0 1.8 16 16">
                  <path
                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
                Carrito
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  putHTML("encabezado", navBar, "Error: no encontré el header con id `encabezado`");

  applyNavFromLocalStorage(page);
}
function applyNavFromLocalStorage(page){
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName");

  const guest = document.querySelectorAll(".only-guest");
  const user = document.querySelectorAll(".only-user");
  const admin = document.querySelectorAll(".only-admin");

  const nameSpan = document.querySelector(".user-name-nav");
  const avatarImg = document.querySelector(".user-avatar-nav");

  const show = (els) => els.forEach(el => el.classList.remove("d-none"));
  const hide = (els) => els.forEach(el => el.classList.add("d-none"));

  if(!token){
    show(guest);
    hide(user);
    hide(admin);
    return
  }

  hide(guest);
  show(user);

  if(role === "admin"){
    show(admin);
  }else{
    hide(admin);
  }//if

  if(nameSpan){
    nameSpan.textContent = `Hola, ${userName || "Usuario"}`;
  }
  if(avatarImg){
    avatarImg.src = getIconPath(page, role === "admin" ? "IconoLogo.png" : "IconoLogoAzul.png");
  }
}

document.addEventListener("click", (e) =>{
  const btn = e.target.closest(".logout-btn");
  if(!btn){
    return;
  }
  e.preventDefault();
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");

  const page = document.querySelector("div");
  const indexPage = getPagePaths(page, "index.html");

  window.location.href = indexPage;
});

/*function logOut() {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userId');

  let page = document.querySelector("div");
  buildNavBar(page);
  window.location.href = 'index.html';
}*/

window.addEventListener("load", function () {
  let page = document.querySelector("div");
  buildFooter(page);
  buildNavBar(page);
});
