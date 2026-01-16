let products = [];
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const createProductBtn = document.getElementById("createProductBtn");
const alertMessages = document.getElementById("alert-messages");
const form = document.getElementById("productForm");
const productImage = document.getElementById("productImage");
let errors = [];

let regs = {
  name: /^[A-Za-zÀ-ÿ0-9\s]{3,35}$/,
  description: /^(?=.{5,70}$)[A-Za-z0-9 ]{5,70}$/,
  price: /^(?!0)([1-9][0-9]{0,2}|[1-9]{1,2})(\.\d{1,2})?$/, //maximo 999
  url: /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/(?!.*\s).*\.(jpg|jpeg|png|webp|svg|JPG|JPEG|PNG||WEBP|SVG))$/
};

function cleanAlert() {
  if (alertMessages.lastChild) {
    while (alertMessages.lastChild) {
      alertMessages.removeChild(alertMessages.lastChild);
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

function cleanErrors() {
  const inputs = [productName, productCategory, productDescription, productPrice, productImage];
  inputs.forEach(input => {
    input.classList.remove("input-invalid-glow", "input-valid-glow");
    input.style.border = "";
  });
  cleanAlert();
  errors = [];
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
  veredict &= validateField(productName, regs.name, "Nombre");
  if (productCategory.value !== "cafe" && productCategory.value !== "pasteleria") {
    applyGlowClass(productCategory, false);
    errors.push("Categoría");
    veredict = false;
  } else {
    applyGlowClass(productCategory, true);
  }
  veredict &= validateField(
    productDescription,
    regs.description,
    "Descripción"
  );
  veredict &= validateField(productPrice, regs.price, "Precio");
  veredict &= validateField(productImage, regs.url, "Url");

  return veredict;
}

function productExist(name, productList) {
  name = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  for (const product of productList) {
    if (
      product.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") === name
    )
      return true;
  }
  return false;
}
function validarImagen(url) {
  const defaultImage = "../assets/Producto/producto_nuevo.png";
  if (!url || url.trim() === "") {
    return Promise.resolve(defaultImage);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(url);
    };
    img.onerror = () => {
      resolve(defaultImage);
    };
    img.src = url;
  });
}

async function crearObjetoProducto(finalPhotoUrl) {
  const token = localStorage.getItem("token");
  const cat = productCategory.value;
  const prefijo = cat === "cafe" ? "cafe" : "past";

  try {
    const res = await fetch("http://localhost:8080/api/productos");
    const allProducts = await res.json();
    const productosCategoria = allProducts.filter(p => p.categoria === cat);

    let nuevoNumero = 1;
    if (productosCategoria.length > 0) {
      const numeros = productosCategoria.map(p => {
        const partes = p.subindice.split('_');
        return parseInt(partes[1]) || 0;
      });
      nuevoNumero = Math.max(...numeros) + 1;
    }
    const subindiceGenerado = `${prefijo}_${nuevoNumero.toString().padStart(3, '0')}`;

    const productoDTO = {
      subindice: subindiceGenerado,
      categoria: cat,
      nombre: productName.value,
      descripcion: productDescription.value,
      precio: parseFloat(productPrice.value),
      imagen_url: finalPhotoUrl,
      activo: true
    };

    const response = await fetch("http://localhost:8080/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productoDTO)
    });

    // RETORNAMOS TRUE SI SE GUARDÓ, FALSE SI NO
    return response.ok;

  } catch (error) {
    console.error("Error de red:", error);
    return false;
  }
}

function guardarProductoEnLocalStorage(producto) {
  const productosGuardados = JSON.parse(localStorage.getItem('productos_locales')) || [];
  productosGuardados.push(producto);
  localStorage.setItem('productos_locales', JSON.stringify(productosGuardados));
}

async function addProduct() {
  const res = await fetch("http://localhost:8080/api/productos");
  const data = await res.json();
  products = data;

  if (validateInfo()) {
    if (!productExist(productName.value, products)) {
      cleanErrors();
      const urlIngresada = productImage.value;
      const urlValidada = await validarImagen(urlIngresada);

      if (urlValidada !== urlIngresada) {
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger alert-error-glow">
          <p class="custom-alert-title">¡Advertencia de Imagen!</p>
          <p><strong>La URL de la imagen no es válida. Se usará la imagen por defecto.</strong></p>
          </div>`);
        applyGlowClass(productImage, false);
      } else {
        applyGlowClass(productImage, true);
      }

      const guardadoExitoso = await crearObjetoProducto(urlValidada);

      if (guardadoExitoso) {
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-success alert-success-glow">
        <p class="custom-alert-title">¡Registro Exitoso!</p>
        <p><strong>Producto agregado correctamente.</strong></p>
        </div>`);
        form.reset();
        setTimeout(cleanErrors, 2000);
      } else {
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger alert-error-glow">
                    <p class="custom-alert-title">Error de Servidor</p>
                    <p>No se pudo conectar con la base de datos o el token expiró.</p>
                    </div>`);
      }
    } else {
      alertMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger alert-error-glow">
      <p class="custom-alert-title">Error: Producto Existente</p>
      <p><strong>El producto ${productName.value} ya existe.</strong></p>
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
}
createProductBtn.addEventListener("click", handleAddProductFlow);

function handleAddProductFlow() {
  cleanErrors();
  addProduct();
}

fetch("http://localhost:8080/api/productos")
  .then((res) => res.json())
  .then((data) => {
    products = data;
  });
// --- NUEVOS LISTENERS PARA VALIDACIÓN EN TIEMPO REAL ---

const fieldsToValidate = [
  { element: productName, reg: regs.name },
  { element: productDescription, reg: regs.description },
  { element: productPrice, reg: regs.price },
  { element: productImage, reg: regs.url }
];

// 1. Listeners para validación basada en RegEx (Nombre, Descripción, Precio, URL)
fieldsToValidate.forEach(({ element, reg }) => {
  element.addEventListener("input", () => {
    const isValid = reg.test(element.value);
    applyGlowClass(element, isValid);
  });
});

// 2. Listener especial para Categoría (Select/Dropdown)
productCategory.addEventListener("change", () => {
  const isValid = productCategory.value === "cafe" || productCategory.value === "pasteleria";
  applyGlowClass(productCategory, isValid);
});