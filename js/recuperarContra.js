const form = document.getElementById("recuperarForm");
const correoRecupera = document.getElementById("correoRecupera");
const nuevaContra = document.getElementById("nuevaContra");
const repetirNueva = document.getElementById("repetirNueva");
const btnActualizar = form.querySelector(".Btn"); // Seleccionar el botón "Actualizar"
const alertMessagesContainer = document.getElementById("alert-messages"); // Nuevo: Contenedor de mensajes
const telefonoRecupera = document.getElementById("telefonoRecupera");
const STORAGE_KEY = "usuarios";

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

function clearGlows() {
    applyGlowClass(correoRecupera, true);
    applyGlowClass(nuevaContra, true);
    applyGlowClass(repetirNueva, true);
    applyGlowClass(telefonoRecupera, true);
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


if (!localStorage.getItem(STORAGE_KEY)) {
  fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Usuarios cargados desde JSON a localStorage");
    })
    .catch((error) => console.error("Error al cargar usuarios.json", error));
}

function getUsuarios() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setUsuarios(usuarios) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexContrasena =
  /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/;
const regexTelefono = /^\d{10}$/;

function validarCorreo(correo) {
  return regexCorreo.test(correo);
}

function validarContrasena(password) {
  return regexContrasena.test(password);
}

function validarTelefono(telefono) {
  return regexTelefono.test(telefono);
}

btnActualizar.addEventListener("click", function (e) {
  e.preventDefault();
  cleanAlerts();
  clearGlows();

  const correo = correoRecupera.value.trim();
  const nueva = nuevaContra.value;
  const repetir = repetirNueva.value;
  const telefono = telefonoRecupera.value.trim();


  let validationPassed = true;

  if (!correo || !nueva || !repetir || !telefono) {
    displayAlert("Campos Obligatorios", "Por favor, completa todos los campos.");
    if (!correo) applyGlowClass(correoRecupera, false);
    if (!nueva) applyGlowClass(nuevaContra, false);
    if (!repetir) applyGlowClass(repetirNueva, false);
    if (!telefono) applyGlowClass(telefonoRecupera, false);
    return;
  }

  if (!validarCorreo(correo)) {
    applyGlowClass(correoRecupera, false);
    displayAlert("Error de Correo", "Ingresa un formato de correo electrónico válido.");
    return;
  } else {
    applyGlowClass(correoRecupera, true);
  }

  if (nueva !== repetir) {
    applyGlowClass(nuevaContra, false);
    applyGlowClass(repetirNueva, false);
    displayAlert("Error de Contraseña", "Las contraseñas no coinciden. Inténtalo de nuevo.");
    return;
  }

  if (!validarTelefono(telefono)) {
    applyGlowClass(telefonoRecupera, false);
    displayAlert(
      "Teléfono inválido",
      "El teléfono debe tener exactamente 10 dígitos."
    );
    return;
  }

  if (!validarContrasena(nueva)) {
    applyGlowClass(nuevaContra, false);
    applyGlowClass(repetirNueva, false);
    displayAlert(
      "Contraseña Insegura",
      "La contraseña debe tener 8-12 caracteres e incluir mayúsculas, minúsculas, números y un carácter especial (@#$%&*()_\-+=)."
    );
    return;
  } else {
    applyGlowClass(nuevaContra, true);
    applyGlowClass(repetirNueva, true);
  }
  const usuarios = getUsuarios();
  const usuarioIndex = usuarios.findIndex((user) => user.correo === correo);

  if (usuarioIndex === -1) {
    applyGlowClass(correoRecupera, false);
    displayAlert("Usuario No Encontrado", "El correo ingresado no se encuentra registrado.");
    return;
  }

  usuarios[usuarioIndex].password = nueva; 
  setUsuarios(usuarios);

  displayAlert("¡Éxito!", "Contraseña actualizada correctamente. Serás redirigido al Login.", true);
  form.reset();
  clearGlows();
  
  setTimeout(() => {
     window.location.href = "./login.html"; 
  }, 2000); 

});

correoRecupera.addEventListener("input", () => {
    applyGlowClass(correoRecupera, validarCorreo(correoRecupera.value));
});

nuevaContra.addEventListener("input", () => {
    const nuevaOk = validarContrasena(nuevaContra.value);
    applyGlowClass(nuevaContra, nuevaOk);
    
    const repetirCoincide = repetirNueva.value === nuevaContra.value;
    if (repetirNueva.value.length > 0) {
        applyGlowClass(repetirNueva, repetirCoincide);
    }
});

repetirNueva.addEventListener("input", () => {
    const repeticionOk = repetirNueva.value === nuevaContra.value;
    applyGlowClass(repetirNueva, repeticionOk);
});

telefonoRecupera.addEventListener("input", () => {
  telefonoRecupera.value = telefonoRecupera.value.replace(/\D/g, "");
  applyGlowClass(telefonoRecupera, validarTelefono(telefonoRecupera.value));
});

async function mostrarAlertaRecuperar() {
    const { value: formValues } = await Swal.fire({
        title: 'Recuperar Contraseña',
        html:
            '<input id="swal-correo" class="swal2-input" placeholder="Correo electrónico">' +
            '<input id="swal-telefono" class="swal2-input" placeholder="Teléfono registrado">' +
            '<input id="swal-pass" type="password" class="swal2-input" placeholder="Nueva contraseña">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        preConfirm: () => {
            return {
                correo: document.getElementById('swal-correo').value,
                telefono: document.getElementById('swal-telefono').value,
                nuevaContrasena: document.getElementById('swal-pass').value
            }
        }
    });

    if (formValues) {
        fetch('http://localhost:8080/api/usuarios/recuperar-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire('¡Éxito!', 'Tu contraseña ha sido actualizada', 'success');
            } else {
                Swal.fire('Error', 'El correo o el teléfono no coinciden', 'error');
            }
        })
        .catch(error => Swal.fire('Error', 'No se pudo conectar con el servidor', 'error'));
    }
}