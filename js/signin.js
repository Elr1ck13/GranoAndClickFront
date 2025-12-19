let users = [];

const form = document.getElementById("signinForm");
const userName = document.getElementById("userName");
const userLastName = document.getElementById("userLastName");
const userEmail = document.getElementById("userEmail");
const userConfirmEmail = document.getElementById("userConfirmEmail");
const userPhone = document.getElementById("userPhone");
const userBirthDate = document.getElementById("userBirthDate");
const userStreet = document.getElementById("userStreet");
const userNeighborhood = document.getElementById("userNeighborhood");
const userCounty = document.getElementById("userCounty");
const userPostalCode = document.getElementById("userPostalCode");
const userPassword = document.getElementById("userPassword");
const userConfirmPassword = document.getElementById("userConfirmPassword");
const btnSignin = document.getElementById("btnSignin");
const btnCancel = document.getElementById("btnCancel");

const alertMessages = document.getElementById("alert-messages");
let errors = [];

const regs = {
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{3,}(?:[\s][A-Za-záéíóúñ]{2,}){0,98}$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  street: /^(?=.{3,100}$)(?!.*\s{2,})(?=.*\b\d{1,5}\b)[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,'#\/\-°ª()]*$/,
  neighborhood: /^(?=.{3,80}$)(?!.*\s{2,})(?=.*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ])[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,'\-]*$/,
  county: /^(?=.{3,60}$)(?!.*\s{2,})[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ .'\-]*$/,
  postalCode: /^(?!(?:00000|12345|23456|34567|45678|56789))(0[1-9]\d{3}|[1-9]\d{4})$/,
  phone: /^(?!0\d{2}|1\d{2}|2[0-1]\d|220)(?!(\d)\1{9}$)(?!0123456789$)(?!1234567890$)(?!9876543210$)(?!0101010101$)(?!(\d\d)\2{4}$)\d{10}$/,
  password: /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/
};

function cleanAlert() {
  if (alertMessages.lastChild) {
    while (alertMessages.lastChild) {
      alertMessages.removeChild(alertMessages.lastChild);
    }
  } //if
}

function cleanErrors() {
  const inputs = [userName, userLastName, userEmail, userConfirmEmail, userPhone, userBirthDate, userStreet, userNeighborhood, userCounty, userPostalCode, userPassword, userConfirmPassword];
  inputs.forEach(input => {
    input.classList.remove("input-invalid-glow", "input-valid-glow");
    input.style.border = "";
  });

  cleanAlert();
  errors = [];
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

function validateField(element, regex, errorField) {
  const isValid = regex.test(element.value);

  if (!isValid) {
    applyGlowClass(element, false);
    errors.push(errorField);
    return false;
  } //if

  applyGlowClass(element, true);
  return true;
}

function isAdult(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  } //if

  return age >= 18 && age <= 100;
}

function validateInfo() {
  let veredict = true;
  errors = [];

  veredict = validateField(userName, regs.name, "Nombre") && veredict;
  veredict = validateField(userLastName, regs.name, "Apellido") && veredict;
  veredict = validateField(userEmail, regs.email, "Correo") && veredict;
  veredict = validateField(userPhone, regs.phone, "Teléfono") && veredict;
  veredict = validateField(userStreet, regs.street, "Calle y número") && veredict;
  veredict = validateField(userNeighborhood, regs.neighborhood, "Colonia") && veredict;
  veredict = validateField(userCounty, regs.county, "Municipio") && veredict;
  veredict = validateField(userPostalCode, regs.postalCode, "Código Postal") && veredict;

  if (!userBirthDate.value) {
    applyGlowClass(userBirthDate, false);
    errors.push("Fecha de Nacimiento (Requerida)");
    veredict = false;
  } else if (!isAdult(userBirthDate.value)) {
    applyGlowClass(userBirthDate, false);
    errors.push("Fecha de Nacimiento (Aceptamos únicamente personas de 18 hasta 100 años)");
    veredict = false;
  } else {
    applyGlowClass(userBirthDate, true);
  }

  const passIsValid = regs.password.test(userPassword.value);
  if (!passIsValid) {
    applyGlowClass(userPassword, false);
    const missingRequirements = getPasswordErrors(userPassword.value);
    errors.push(`Contraseña (Falta: ${missingRequirements.join(", ")})`);
    veredict = false;
  } else {
    applyGlowClass(userPassword, true);
  }

  if (userConfirmPassword.value !== userPassword.value || userConfirmPassword.value === "") {
    applyGlowClass(userConfirmPassword, false);
    errors.push("Confirmar Contraseña (Las contraseñas no coinciden)");
    veredict = false;
  } else {
    applyGlowClass(userConfirmPassword, true);
  }

  if (userConfirmEmail.value.trim() === "") {
    applyGlowClass(userConfirmEmail, false);
    errors.push("Confirmar Correo (Requerido)");
    veredict = false;
  } else if (userConfirmEmail.value !== userEmail.value) {
    applyGlowClass(userConfirmEmail, false);
    errors.push("Correos no coinciden");
    veredict = false;
  } else {
    applyGlowClass(userConfirmEmail, true);
  }

  return veredict;
}
function getPasswordErrors(pass) {
  let missing = [];
  if (pass.length < 8 || pass.length > 12) missing.push("poner de 8 a 12 caracteres");
  if (!/[A-Z]/.test(pass)) missing.push("poner mayúsculas");
  if (!/[a-z]/.test(pass)) missing.push("poner minúsculas");
  if (!/\d/.test(pass)) missing.push("poner al menos un número");
  if (!/[@#$%&*()_\-+=]/.test(pass)) missing.push("poner al menos un carácter especial (@#$%&*()_-+=)");
  if (/\s/.test(pass)) missing.push("sin espacios");

  const forbidden = /abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome/i;
  if (forbidden.test(pass)) missing.push("no debe usar palabras comunes (como 'admin' o '123456')");

  return missing;
}

function userExist(email, userList) {
  email = (email ?? "").toLowerCase().trim();
  for (const user of userList) {
    if (user.correo === email) {
      return true;
    }
  }
  return false;
}

function getUsersFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  } catch {
    return [];
  }
}

function createObjectUser() {
  const newIdNum = Math.floor(Date.now() / 1000);
  const userId = `${newIdNum}`;
  const userModel = {
    "id": userId,
    "nombre": userName.value,
    "apellido": userLastName.value,
    "correo": (userEmail.value ?? "").toLowerCase().trim(),
    "fechaNacimiento": userBirthDate.value,
    "calleNumero": userStreet.value,
    "colonia": userNeighborhood.value,
    "municipio": userCounty.value,
    "codigoPostal": userPostalCode.value,
    "telefono": userPhone.value,
    "password": userPassword.value,
  };
  saveUserInLocalStorage(userModel);
}

function saveUserInLocalStorage(user) {
  const usersSaved = JSON.parse(localStorage.getItem('usuarios')) || [];
  usersSaved.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usersSaved));
}

function addUser() {
  cleanErrors();

  fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
      users = data;
      const localUsers = getUsersFromLocalStorage();
      const allUsers = [...users, ...localUsers];

      if (!userExist(userEmail.value, allUsers)) {
        createObjectUser();
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-success alert-success-glow">
          <p class="custom-alert-title">¡Registro Exitoso!</p> 
          <p><strong>Usuario agregado correctamente. Serás redirigido al login.</strong></p>
          </div>`);
        form.reset();
        setTimeout(() => { window.location.href = "../html/login.html"; }, 2000);
      } else {
        applyGlowClass(userEmail, false);
        applyGlowClass(userConfirmEmail, false);
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger alert-error-glow">
          <p class="custom-alert-title">Error: Usuario Existente</p>
          <p><strong>El correo: ${userEmail.value} ya está registrado.</strong></p>
          </div>`
        );
      }
    })
    .catch((error) => {
      console.error("Error en addUser (fetch):", error.message);
      cleanAlert();
      alertMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger alert-error-glow">
        <p class="custom-alert-title">Error de Conexión</p> 
        <p><strong>Error al cargar datos o registrar: ${error.message}</strong></p>
        </div>`);
    });
}

function handleAddUserFlow(event) {
  event.preventDefault();
  cleanErrors();

  if (!validateInfo()) {
    const listaCampos = errors.map(campo => {
      const campoMayuscula = campo.charAt(0).toUpperCase() + campo.slice(1);
      return `<li>${campoMayuscula}</li>`;
    }).join("");

    const mensajeHTML = `
    <div class="alert alert-danger alert-error-glow">
    <p class="custom-alert-title">¡Error de Validación!</p>
    <p><strong>Los siguientes campos no son válidos o están incompletos:</strong></p>
    <ul class="custom-alert-list">
    ${listaCampos}
    </ul>
    </div>
    `;
    alertMessages.insertAdjacentHTML("beforeend", mensajeHTML);

    return;
  }

  addUser();
}

const fieldsToValidate = [
  { element: userName, reg: regs.name },
  { element: userLastName, reg: regs.name },
  { element: userEmail, reg: regs.email },
  { element: userPhone, reg: regs.phone },
  { element: userStreet, reg: regs.street },
  { element: userNeighborhood, reg: regs.neighborhood },
  { element: userCounty, reg: regs.county },
  { element: userPostalCode, reg: regs.postalCode },
  { element: userPassword, reg: regs.password }
];

fieldsToValidate.forEach(({ element, reg }) => {
  element.addEventListener("input", () => {
    const isValid = reg.test(element.value);
    applyGlowClass(element, isValid);

    if (element === userPassword || element === userEmail) {
      if (element === userPassword) {
        const isConfirmValid = userConfirmPassword.value.trim() !== "" && userConfirmPassword.value === userPassword.value;
        applyGlowClass(userConfirmPassword, isConfirmValid);
      }
      if (element === userEmail) {
        const isConfirmValid = userConfirmEmail.value.trim() !== "" && userConfirmEmail.value === userEmail.value;
        applyGlowClass(userConfirmEmail, isConfirmValid);
      }
    }
  });
});

userConfirmPassword.addEventListener("input", () => {
  const isConfirmValid = userConfirmPassword.value.trim() !== "" && userConfirmPassword.value === userPassword.value;
  applyGlowClass(userConfirmPassword, isConfirmValid);
});

userConfirmEmail.addEventListener("input", () => {
  const isConfirmValid = userConfirmEmail.value.trim() !== "" && userConfirmEmail.value === userEmail.value;
  applyGlowClass(userConfirmEmail, isConfirmValid);
});

userBirthDate.addEventListener("input", () => {
  const isValid = userBirthDate.value && isAdult(userBirthDate.value);
  applyGlowClass(userBirthDate, isValid);
});

btnSignin.addEventListener("click", handleAddUserFlow);

btnCancel.addEventListener("click", function (event) {
  event.preventDefault();
  cleanErrors();
  form.reset();
});