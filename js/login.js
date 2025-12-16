const form = document.getElementById("loginForm");
const localCorreo = document.getElementById("emails");
const localPass = document.getElementById("pass");
const btnSend = document.getElementById("send");
const alertMessagesContainer = document.getElementById("alert-messages");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const regs = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  password:
    /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/,
};

function cleanAlerts() {
  if (alertMessagesContainer) {
    while (alertMessagesContainer.firstChild) {
      alertMessagesContainer.removeChild(alertMessagesContainer.firstChild);
    }
  }
}

function applyGlowClass(element, isValid) {
  element.style.border = "";
  if (isValid) {
    element.classList.remove("input-invalid-glow");
    element.classList.add("input-valid-glow");
  } else {
    element.classList.remove("input-valid-glow");
    element.classList.add("input-invalid-glow");
  }
}

function displayAlert(title, message, isSuccess = false) {
  cleanAlerts();
  const alertClass = isSuccess ? "alert-success-glow" : "alert-error-glow";
  const html = `
    <div class="alert ${isSuccess ? 'alert-success' : 'alert-danger'} ${alertClass}">
      <p class="custom-alert-title">${title}</p> 
      <p><strong>${message}</strong></p>
    </div>`;
  if (alertMessagesContainer) {
    alertMessagesContainer.insertAdjacentHTML("beforeend", html);
  } else {
    console.log(`ALERTA: ${title} - ${message}`);
  }
}

function validateField(element, regex, errorField) {
  const isValid = regex.test(element.value);
  applyGlowClass(element, isValid);
  return isValid;
}

function validaPrevio() {
  let veredict = true;

  const correoOk = validateField(localCorreo, regs.email, "Correo");
  veredict = correoOk;

  const passValue = localPass.value.trim();
  const passOk = passValue.length > 0;
  
  if (!passOk) {
    applyGlowClass(localPass, false);
  } else {
    applyGlowClass(localPass, true);
  }
  
  veredict = veredict && passOk;

  return veredict;
}

function compararPassword() {
  const email = localCorreo.value.trim();
  const password = localPass.value;

  if (usuarios.length === 0) {
    displayAlert("Error de Datos", "No hay usuarios registrados. Intenta registrar uno.");
    return false;
  }

  const usuarioEncontrado = usuarios.find(usuario => 
    usuario.correo === email && usuario.password === password
  );

  if (usuarioEncontrado) {
    let rolAsignado = 'client';
    if (usuarioEncontrado.id && usuarioEncontrado.id.startsWith('AD')) {
      rolAsignado = 'admin';
    }

    localStorage.setItem('userToken', usuarioEncontrado.correo);
    localStorage.setItem('userId', usuarioEncontrado.id);
    localStorage.setItem('userRole', rolAsignado);
    localStorage.setItem('userName', usuarioEncontrado.nombre);

    displayAlert("Acceso Concedido", `Bienvenido ${usuarioEncontrado.nombre}.`, true);
    return true;
  } else {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');

    applyGlowClass(localCorreo, false);
    applyGlowClass(localPass, false);

    displayAlert("Error de Acceso", "Credenciales incorrectas. Verifica tu correo y contraseña.");
    return false;
  }
}

function loadAdmins(){
  fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
            const nuevosUsuarios = data.filter(admin => !usuarios.some(u => u.id === admin.id));
            usuarios.push(...nuevosUsuarios);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        }
    })
    .catch((error) => {
      console.log("Error al cargar administradores iniciales:", error.message);
    });
}

function usuarioAceptado() {
    window.location.href = "../html/productos.html";
}

btnSend.addEventListener("click", function (event) {
  event.preventDefault();
  cleanAlerts(); 

  if (validaPrevio()) {
    if(compararPassword()){
      setTimeout(() => {
        usuarioAceptado();
        form.reset();
      }, 500); 
    }
  } else {
    displayAlert("Error de Validación", "Por favor, completa correctamente los campos requeridos.");
  }
});

localCorreo.addEventListener("input", () => {
  validateField(localCorreo, regs.email, "Correo");
  applyGlowClass(localPass, localPass.value.trim().length > 0); 
});

localPass.addEventListener("input", () => {
  const isValid = localPass.value.trim().length > 0;
  applyGlowClass(localPass, isValid);
});

window.addEventListener("load",function (event) {
  if (usuarios.length === 0) loadAdmins();
});