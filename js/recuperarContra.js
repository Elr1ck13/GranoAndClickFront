const form = document.getElementById("recuperarForm");
const STORAGE_KEY = "usuarios";

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

function validarCorreo(correo) {
  return regexCorreo.test(correo);
}

function validarContrasena(password) {
  const regex =
    /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=])(?!.*\s)[A-Za-z\d~!@#$%^&*()_\-+=]{8,12}$/;
  return regex.test(password);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const correo = document.getElementById("correoRecupera").value.trim();
  const nuevaContra = document.getElementById("nuevaContra").value;
  const repetirContra = document.getElementById("repetirNueva").value;

  if (!correo || !nuevaContra || !repetirContra) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!validarCorreo(correo)) {
    alert("Ingresa un correo válido. Ejemplo: usuario@dominio.com");
    return;
  }

  if (nuevaContra !== repetirContra) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (!validarContrasena(nuevaContra)) {
    alert(
      "La contraseña debe tener entre 8 y 12 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial."
    );
    return;
  }

  const usuarios = getUsuarios();

  const usuarioIndex = usuarios.findIndex((user) => user.correo === correo);

  if (usuarioIndex === -1) {
    alert("El correo no está registrado");
    return;
  }

  usuarios[usuarioIndex].contraseña = nuevaContra;
  setUsuarios(usuarios);

  alert("Contraseña actualizada correctamente");
  form.reset();
});
