import { API_URLS } from './urls.js';
let nombre = document.getElementById("nombre");
let numeroTarjeta = document.getElementById("numeroTarjeta");
let ccv = document.getElementById("ccv");
let mesVencimiento = document.getElementById("mesVencimiento");
let yearVencimiento = document.getElementById("yearVencimiento");
let correo = document.getElementById("correo");
let pagar = document.getElementById("pagar");
let mostrarTotal = document.getElementById("total");
let campos = document.getElementsByClassName("campos");
const btnAtras = document.getElementById("btnAtras");
const btnCancelar = document.getElementById("btnCancelar");
let compraExitosa = false;
const alertMessages = document.getElementById("alert-messages");

let errors = [];

let regs = {
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{3,}(?:[\s][A-Za-záéíóúñ]{2,}){0,70}$/,
  numTarjeta: /^(?!([1-9])\1{9})[1-9]\d{9}$/,
  ccv: /^(?!([0-9])\1{2})\d{3}$/,
  mesExpiracion: /^(0[1-9]|1[0-2])$/,
  yearExpiracion: /^(2[6-9]|[3-9][0-9])$/,
  email:
    /^(?=.{3,50}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
function cleanAlert() {
  if (alertMessages.lastChild) {
    while (alertMessages.lastChild) {
      alertMessages.removeChild(alertMessages.lastChild);
    }
  }
}

function cleanErrors() {
  Array.from(campos).forEach((campo) => {
    campo.classList.remove("input-invalid-glow", "input-valid-glow");
    campo.style.border = "";
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
  }

  applyGlowClass(element, true);
  return true;
}

function validateInfo() {
  let veredict = true;
  errors = [];

  veredict &= validateField(nombre, regs.name, "Nombre");
  veredict &= validateField(
    numeroTarjeta,
    regs.numTarjeta,
    "Número de tarjeta"
  );
  veredict &= validateField(ccv, regs.ccv, "CCV");
  veredict &= validateField(
    mesVencimiento,
    regs.mesExpiracion,
    "Mes de expiracion"
  );
  veredict &= validateField(
    yearVencimiento,
    regs.yearExpiracion,
    "Año de expiracion"
  );
  veredict &= validateField(correo, regs.email, "Correo");
  return veredict;
}

function showErrors() {
  const listaCampos = errors
    .map((campo) => {
      const campoMayuscula = campo.charAt(0).toUpperCase() + campo.slice(1);
      return `<li>${campoMayuscula}</li>`;
    })
    .join("");

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
}

pagar.addEventListener("click", function (event) {
  event.preventDefault();
  cleanErrors();
  if (validateInfo()) {
    const carrito = JSON.parse(localStorage.getItem("products")) || {};
    const total = localStorage.getItem("TotalGeneral") || "0";
    const token = localStorage.getItem("authToken");
    const detallesArray = Object.values(carrito).map(item => ({
    productoId: item.id,
    cantidad: item.cantidad || 1,
    precioUnitario: parseFloat(String(item.precio).replace(/[^0-9.]/g, "")),
    subtotal: parseFloat(String(item.precio).replace(/[^0-9.]/g, "")) * (item.cantidad || 1)
}));

    const pedidoDTO = {
    total: parseFloat(total),
    costoEnvio: 0.00,
    detalles: Object.values(carrito).map(item => {
        // Limpiamos el precio de cualquier símbolo para que el Java reciba un número puro
        const precioLimpio = parseFloat(String(item.precio).replace(/[^0-9.]/g, ""));
        return {
            productoId: item.id,
            cantidad: item.cantidad || 1,
            precioUnitario: precioLimpio,
            subtotal: precioLimpio * (item.cantidad || 1)
        };
    })
};
    enviarPedidoAlBackend(pedidoDTO, token);
  }


  async function enviarPedidoAlBackend(dto, token) {
    if (!token) {
        alert("Debes iniciar sesión para completar tu compra.");
        window.location.href = "login.html";
        return;
    }
    try {
      const response = await fetch(API_URLS.pedidos, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dto)
      });

if (response.ok) {
            compraExitosa = true;

        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-success alert-success-glow">
          <p class="custom-alert-title">¡Compra Exitosa!</p>
          <p>Tu pedido ha sido registrado correctamente.</p>
          <p><strong>Gracias por tu compra</strong></p>
          </div>`);
        localStorage.removeItem("products");
        localStorage.removeItem("TotalGeneral");
        setTimeout(() => window.location.href = "finalizado.html", 2500);
      } else {
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.error("Error al procesar pedido:", error);
    }
  }
});

// En tu función de pago.js
async function realizarCompra() {
    const token = localStorage.getItem("authToken");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalLocal = localStorage.getItem("TotalGeneral") || "0";

    const pedidoDTO = {
        costoEnvio: 0.00,
        total: parseFloat(totalLocal),
        // Solo enviamos los detalles, el usuario lo pone el Backend
        detalles: carrito.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad,
            precioUnitario: item.precio
            // El subtotal lo calcula el backend o el DTO
        }))
    };

    const response = await fetch(API_URLS.pedidos, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pedidoDTO)
    });

    if (response.ok) {
        displayAlert("¡Compra Exitosa!", "Tu pedido está siendo preparado.", true);
        localStorage.removeItem("carrito");
        localStorage.removeItem("TotalGeneral");
    }
}

btnAtras.addEventListener("click", function() {
    if (compraExitosa) {
        // Si ya pagó, no hay carrito que ver, va al inicio
        window.location.href = "../index.html";
    } else {
        // Si no ha pagado, regresa al carrito con sus productos intactos
        window.location.href = "./carrito.html";
    }
});

// --- BOTÓN CANCELAR ---
btnCancelar.addEventListener("click", function() {
    // Confirmación para evitar accidentes
    const confirmar = confirm("¿Estás seguro de cancelar? Se vaciará tu carrito y volverás al inicio.");
    if (confirmar) {
        // Borramos los productos y el total
        localStorage.removeItem("products");
        localStorage.removeItem("TotalGeneral");
        // Redirigimos al inicio
        window.location.href = "../index.html";
    }
});

window.addEventListener("load", function () {
  let total =
    this.localStorage.getItem("TotalGeneral") != null
      ? this.localStorage.getItem("TotalGeneral")
      : "0";
  mostrarTotal.insertAdjacentText(
    "afterbegin",
    `${Number(total).toFixed(2)}`);
});

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  event.returnValue = "";
});

