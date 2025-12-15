const form = document.getElementById("loginForm");
const localCorreo = document.getElementById("emails");
const localPass = document.getElementById("pass");
const btnSend = document.getElementById("send");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const regs = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=])(?!.*\s)[A-Za-z\d~!@#$%^&*()_\-+=]{8,12}$/,
};
function alertMessages(msg){
    console.log(msg);

}

function compararPassword() {
  if (usuarios.length === 0) return false;
  
  for (const usuario of usuarios) {
    
    if (usuario.password=== localPass.value && usuario.correo === localCorreo.value) {
      alertMessages("Bienvenido "+ usuario.nombre);
      return true
    } 
  }
  alertMessages("Alguno de los campos no es correcto");
    return false;

}

function validateField(element, regex, errorField) {
  if (!regex.test(element.value)) {
    return false;
  }
  return true;
}

function existeCorreo() {
  for (const usuario of usuarios) {
    if (usuario.correo === localCorreo.value) {
      return true;
    }
  }
  alertMessages("Alguno de los campos no es válido");
  return false;
}

function validaPrevio() {
  let veredict = true;

  veredict &= validateField(localCorreo, regs.email, "Correo");
  veredict &= validateField(localPass, regs.password, "Contraseña");

  return veredict;
}
function loadAdmins(){
    
  fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
        usuarios.push(data[0])
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    })
    .catch((error) => {
      console.log(error.message);
    });
}
function usuarioAceptado() {
      window.location.href = "../html/productos.html";
}
btnSend.addEventListener("click", function (event) {
  event.preventDefault();
  if (validaPrevio()) {
    if (existeCorreo()) {
      if(compararPassword()){
        usuarioAceptado();
        form.reset();
      }
    }
  } else {
    alertMessages("Alguno de los campos no es válido");
  }
});

window.addEventListener("load",function (event) {
      if (usuarios.length === 0) loadAdmins();
});