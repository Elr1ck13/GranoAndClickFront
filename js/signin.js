
let users = [];

const form = document.getElementById("signinForm");
const userName = document.getElementById("userName");
const userLastName = document.getElementById("userLastName");
const userEmail = document.getElementById("userEmail");
const userConfirmEmail = document.getElementById("userConfirmEmail");
const userPhone = document.getElementById("userPhone");
const userBirthDate = document.getElementById("userBirthDate");
const userAddress = document.getElementById("userAddress");
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
  address: /^(?=.{10,150}$)(?!\s)(?!.*\s{2,})(?:calle|calz\.?|calzada|avenida|av\.?|av|boulevard|blvd\.?|prolongación|prol\.?|privada|priv\.?|carretera|carr\.?|camino|cno\.?|andador|fraccionamiento|fracc\.?|circuito|cto\.?|periférico|paseo|viaducto|eje)\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+\s+#\d+[A-Za-z0-9\-]*\s*(?:int\.?\s*#?\s*[A-Za-z0-9\-]+)?\s*,\s*[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+\s*,\s*[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/i,
  postalCode: /^(?!(?:00000|12345|23456|34567|45678|56789))(0[1-9]\d{3}|[1-9]\d{4})$/,
  phone: /^(?!0\d{2}|1\d{2}|2[0-1]\d|220)(?!(\d)\1{9}$)(?!0123456789$)(?!1234567890$)(?!9876543210$)(?!0101010101$)(?!(\d\d)\2{4}$)\d{10}$/,
  password: /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=])(?!.*\s)[A-Za-z\d~!@#$%^&*()_\-+=]{8,12}$/
};

function cleanAlert() {
  if (alertMessages.lastChild) {
    while (alertMessages.lastChild) {
      alertMessages.removeChild(alertMessages.lastChild);
    }
  }//if
}

function cleanErrors() {
  const inputs = [userName, userLastName, userEmail, userConfirmEmail, userPhone, userBirthDate, userAddress, userPostalCode, userPassword, userConfirmPassword];
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
  }//if

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
  }//if

  return age >= 18 && age <= 100;
}

function validateInfo() {
  let veredict = true;
  veredict &= validateField(userName, regs.name, "Nombre");
  veredict &= validateField(userLastName, regs.name, "Apellido");
  veredict &= validateField(userEmail, regs.email, "Correo");
  veredict &= validateField(userPhone, regs.phone, "Teléfono");
  veredict &= validateField(userAddress, regs.address, "Domicilio");
  veredict &= validateField(userPostalCode, regs.postalCode, "Código Postal");
  veredict &= validateField(userPassword, regs.password, "Contraseña");



  if (!userBirthDate.value) {
    applyGlowClass(userBirthDate, false);
    errors.push("Fecha de Nacimiento");
    veredict = false;
  } else if (!isAdult(userBirthDate.value)) {
    applyGlowClass(userBirthDate, false);
    errors.push("Fecha de Nacimiento");
    veredict = false;
  } else {
    applyGlowClass(userBirthDate, true);
  }

  if (userConfirmPassword.value.trim() === "") {
    applyGlowClass(userConfirmPassword, false);
    errors.push("Confirmar Contraseña");
    veredict = false;
  } else if (userConfirmPassword.value !== userPassword.value) {
    applyGlowClass(userConfirmPassword, false);
    errors.push("Contraseñas no coinciden");
    veredict = false;
  } else {
    applyGlowClass(userConfirmPassword, true);
  }

  if (userConfirmEmail.value.trim() === "") {
    applyGlowClass(userConfirmEmail, false);
    errors.push("Confirmar Correo");
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

function userExist(email, userList) {
  email = email.toLowerCase().trim();
  for (const user of userList) {
    if (user.correo === email) {
      return true;
    }
  }
  return false;
}

function createObjectUser() {
  const newIdNum = Math.floor(Date.now() / 1000);
  const userId = `${newIdNum}`;

    const userModel = {
        "id": userId,
        "nombre": userName.value,
        "apellido": userLastName.value,
        "correo": userEmail.value,
        "fechaNacimiento": userBirthDate.value,
        "direccion": userAddress.value,
        "codigoPostal": userPostalCode.value,
        "telefono": userPhone.value,
        "contraseña": userPassword.value,
    };
    saveUserInLocalStorage(userModel);
}

function saveUserInLocalStorage(user) {
  const usersSaved = JSON.parse(localStorage.getItem('usuarios')) || [];
  usersSaved.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usersSaved));
}

function addUser() {
  fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
      users = data;
      cleanAlert();
      if (validateInfo()) {
        if (!userExist(userEmail.value, users)) {
          cleanErrors();
          createObjectUser();


          alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-success alert-success-glow">
          <p class="custom-alert-title">¡Registro Exitoso!</p> <strong>Usuario agregado correctamente.</strong>
          </div>`);
          form.reset();
        } else {

          applyGlowClass(userEmail, false);
          applyGlowClass(userConfirmEmail, false);

          alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger alert-error-glow">
          <p class="custom-alert-title">Error: Usuario Existente</p>
          <strong>El correo: ${userEmail.value} ya está registrado.</strong>
          </div>`
          );
        }
      } else {
        const listaCampos = errors.map(campo => {
          const campoMayuscula = campo.charAt(0).toUpperCase() + campo.slice(1);
          return `<li>${campoMayuscula}</li>`;
        }).join("");

        const mensajeHTML = `
        <div class="alert alert-danger alert-error-glow">
        <p class="custom-alert-title">¡Error de Validación!</p>
        <p><strong>Los siguientes campos no son válidos:</strong></p>
        <ul class="custom-alert-list">
        ${listaCampos}
        </ul>
        </div>
      `;
        alertMessages.insertAdjacentHTML("beforeend", mensajeHTML);
      }
    })
    .catch((error) => {
      console.log(error.message);

      cleanAlert();
      alertMessages.insertAdjacentHTML(
      "beforeend",
      `<div class="alert alert-danger alert-error-glow">
      <p class="custom-alert-title">Error de Conexión</p> 
      <strong>Error al cargar datos: ${error.message}</strong>
      </div>`);
    });
}

const fieldsToValidate = [
  { element: userName, reg: regs.name },
  { element: userLastName, reg: regs.name },
  { element: userEmail, reg: regs.email },
  { element: userPhone, reg: regs.phone },
  { element: userAddress, reg: regs.address },
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

function handleAddUserFlow(event) {
  event.preventDefault();
  cleanErrors();
  addUser();
}

fetch("../data/usuarios.json")
  .then((res) => res.json())
  .then((data) => {
    users = data;
  });

btnCancel.addEventListener("click", function (event) {
  event.preventDefault();
  cleanErrors();
  form.reset();
});