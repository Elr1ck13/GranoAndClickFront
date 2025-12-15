
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
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{2,}(?:[\s][A-Za-záéíóúñ]{2,}){0,98}$/,
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
  userName.style.border = "none";
  userLastName.style.border = "none";
  userEmail.style.border = "none";
  userConfirmEmail.style.border = "none";
  userPhone.style.border = "none";
  userBirthDate.style.border = "none";
  userAddress.style.border ="none";
  userPostalCode.style.border = "none";
  userPassword.style.border = "none";
  userConfirmPassword.style.border ="none";
  cleanAlert();
  errors = [];
}

function validateField(element, regex, errorField) {
  if (!regex.test(element.value)) {
    element.style.border = "0.12rem solid red";
    errors.push(errorField);
    return false;
  }//if
  return true;
}

function isAdult(birthDateString){
    const birthDate =  new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
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



  if(!userBirthDate.value){
    userBirthDate.style.border = "0.12rem solid red";
    errors.push("Fecha de Nacimiento");
    veredict = false;
  }else if(!isAdult(userBirthDate.value)){
    userConfirmPassword.style.border = "0.12rem solid red";
    errors.push("Fecha de Nacimiento");
    veredict = false;
  }//else birth

  if(userConfirmPassword.value.trim() === ""){
    userConfirmPassword.style.border = "0.12rem solid red";
    errors.push("Confirmar Contraseña");
    veredict = false;
  }else if(userConfirmPassword.value !== userPassword.value){
    userConfirmPassword.style.border = "0.12rem solid red";
    errors.push("Contraseñas no coinciden");
    veredict = false;
  }//else password

  if(userConfirmEmail.value.trim() === ""){
    userConfirmEmail.style.border = "0.12rem solid red";
    errors.push("Confirmar Correo");
    veredict = false;
  }else if(userConfirmEmail.value !== userEmail.value){
    userConfirmEmail.style.border = "0.12rem solid red";
    errors.push("Correos no coinciden");
    veredict = false;
  }//else email

  return veredict;
}

function userExist(email, userList) {
  email = email.toLowerCase().trim();
  for (const user of userList) {
    if (user.correo === email){
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
      if (validateInfo()) {
        if (!userExist(userEmail.value, users)) {
          cleanErrors();
          createObjectUser();
          alertMessages.insertAdjacentHTML(
            "beforeend",
            `<div class="alert alert-success"><strong>Usuario agregado correctamente.</strong></div>`
          );
          form.reset();
        } else {
          alertMessages.insertAdjacentHTML(
            "beforeend",
            `<div class="alert alert-danger"><strong> El correo: ${userEmail.value} ya esta registrado</strong>`
          );
        }
      } else {
        let msg = `Lo sentimos, pero los siguientes campos no son válidos: </br>`;
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger"><strong>${msg + errors.join("<br>")}</strong>`
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

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

btnCancel.addEventListener("click", function (event){
    event.preventDefault();
    cleanErrors();
    form.reset();
});