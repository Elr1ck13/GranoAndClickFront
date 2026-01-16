import { API_URLS } from "./urls.js";

const form = document.getElementById("recuperarForm");
const correoRecupera = document.getElementById("correoRecupera");
const nuevaContra = document.getElementById("nuevaContra");
const repetirNueva = document.getElementById("repetirNueva");
const btnActualizar = form.querySelector(".Btn");
const alertMessagesContainer = document.getElementById("alert-messages");
const telefonoRecupera = document.getElementById("telefonoRecupera");

// Función para limpiar las alertas
function cleanAlerts() {
  if (alertMessagesContainer) {
    while (alertMessagesContainer.firstChild) {
      alertMessagesContainer.removeChild(alertMessagesContainer.firstChild);
    }
  }
}

// Función para aplicar efectos de validación en los campos
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

// Función para mostrar las alertas de error o éxito
function displayAlert(title, message, isSuccess = false) {
  cleanAlerts();
  const alertClass = isSuccess ? "alert-success-glow" : "alert-error-glow";
  const html = `
    <div class="alert ${
      isSuccess ? "alert-success" : "alert-danger"
    } ${alertClass}">
      <p class="custom-alert-title">${title}</p> 
      <p><strong>${message}</strong></p>
    </div>`;
  alertMessagesContainer.insertAdjacentHTML("beforeend", html);
}

// Expresión regular para validar el correo electrónico
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Expresión regular para validar la contraseña (con mayúsculas, minúsculas, números y carácter especial)
const regexContrasena =
  /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/;
// Expresión regular para validar el teléfono
const regexTelefono = /^\d{10}$/;

// Función para validar el correo
function validarCorreo(correo) {
  return regexCorreo.test(correo);
}

// Función para validar la contraseña
function validarContrasena(password) {
  return regexContrasena.test(password);
}

// Función para validar el teléfono
function validarTelefono(telefono) {
  return regexTelefono.test(telefono);
}

// Función para manejar el evento de actualización de contraseña
btnActualizar.addEventListener("click", function (e) {
  e.preventDefault();
  cleanAlerts();

  const correo = correoRecupera.value.trim();
  const nueva = nuevaContra.value;
  const repetir = repetirNueva.value;
  const telefono = telefonoRecupera.value.trim();

  // Validación básica de campos
  if (!correo || !nueva || !repetir || !telefono) {
    displayAlert(
      "Campos Obligatorios",
      "Por favor, completa todos los campos."
    );
    if (!correo) applyGlowClass(correoRecupera, false);
    if (!nueva) applyGlowClass(nuevaContra, false);
    if (!repetir) applyGlowClass(repetirNueva, false);
    if (!telefono) applyGlowClass(telefonoRecupera, false);
    return;
  }

  // Validación de formato de correo
  if (!validarCorreo(correo)) {
    applyGlowClass(correoRecupera, false);
    displayAlert(
      "Error de Correo",
      "Ingresa un formato de correo electrónico válido."
    );
    return;
  } else {
    applyGlowClass(correoRecupera, true);
  }

  // Validación de que las contraseñas coincidan
  if (nueva !== repetir) {
    applyGlowClass(nuevaContra, false);
    applyGlowClass(repetirNueva, false);
    displayAlert(
      "Error de Contraseña",
      "Las contraseñas no coinciden. Inténtalo de nuevo."
    );
    return;
  }

  // Validación de formato de teléfono
  if (!validarTelefono(telefono)) {
    applyGlowClass(telefonoRecupera, false);
    displayAlert(
      "Teléfono inválido",
      "El teléfono debe tener exactamente 10 dígitos."
    );
    return;
  }

  // Validación de contraseña segura
  if (!validarContrasena(nueva)) {
    applyGlowClass(nuevaContra, false);
    applyGlowClass(repetirNueva, false);
    displayAlert(
      "Contraseña Insegura",
      "La contraseña debe tener 8-12 caracteres e incluir mayúsculas, minúsculas, números y un carácter especial (@#$%&*()_-+=)."
    );
    return;
  } else {
    applyGlowClass(nuevaContra, true);
    applyGlowClass(repetirNueva, true);
  }

  // Enviar los datos al servidor para actualizar la contraseña
  fetch(API_URLS.recuperar, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: correo,
      telefono: telefono,
      password: nueva,
      nPassword: repetir,
    }),
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire("¡Éxito!", "Tu contraseña ha sido actualizada", "success");
      } else {
        Swal.fire("Error", "Los campos no son correctos", "error");
      }
    })
    .catch((error) =>
      Swal.fire("Error", "No se pudo conectar con el servidor", "error")
    );
});
