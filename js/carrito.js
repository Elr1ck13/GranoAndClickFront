const btnRegresar = document.getElementById("btnRegresar");
const btnContinuar = document.getElementById("btnContinuar");
const InpTotal = document.getElementById("InpTotal");

let tabla;

function borrarProducto(id) {
  let productos = JSON.parse(localStorage.getItem("products")) || {};
  delete productos[id];
  localStorage.setItem("products", JSON.stringify(productos));
  cargarProductos();
}
function cargarProductos() {
  // 1. Validar que la tabla de DataTables esté inicializada
  if (!tabla) return;

  let productos = JSON.parse(localStorage.getItem("products")) || {};

  // 2. Limpiar filas existentes
  tabla.clear();

  let totalGeneral = 0;

  // 3. Usar Object.entries es más limpio para obtener [llave, valor]
  Object.entries(productos).forEach(([key, producto]) => {
    // Validación de seguridad para el objeto producto
    if (!producto || !producto.precio) return;

    let precioTexto = String(producto.precio);
    let precioNum = parseFloat(precioTexto.replace(/[^0-9.]/g, ""));


    let total = precioNum * (producto.cantidad || 1);
    totalGeneral += total;

    tabla.row.add([
      producto.nombre || "Sin nombre",
      producto.cantidad || 0,
      new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(precioNum),
      `$${total.toFixed(2)} MXN`,
      `<div class="text-center">
                <button class="btn btn-primary btn-sm borrar-btn" data-id="${key}">
                    <img src="../assets/borrar.png" alt="borrar" width="20" height="20">
                </button>
            </div>`,
    ]);
  });

  // 4. Dibujar la tabla actualizada
  tabla.draw();

  // 5. Reasignar eventos a los nuevos botones creados
  asignarEventosBorrar();

  // 6. Actualizar UI de Totales
  if (InpTotal) {
    InpTotal.value = `$${totalGeneral.toFixed(2)} MXN`;
  }
  localStorage.setItem("TotalGeneral", totalGeneral);
}

// Separamos la asignación de eventos para mayor claridad
function asignarEventosBorrar() {
  document.querySelectorAll(".borrar-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let id = this.getAttribute("data-id");
      borrarProducto(id);
      sePuedePagar();
    });
  });
}

function sePuedePagar() {
  const productos = JSON.parse(localStorage.getItem('products')) || {};
  if (btnContinuar) {
    btnContinuar.disabled = Object.keys(productos).length === 0;
  }
}

window.addEventListener("load", function () {
  // Inicializar DataTable
  tabla = $("#tablaCarrito").DataTable({
    language: {
      emptyTable: "No hay productos elegidos",
      info: "No hay cambios ni devoluciones.",
      infoEmpty: "Mostrando 0 de 0 productos elegidos"
    },
    paging: false,
    searching: false,
  });

  // Llamar a las funciones iniciales
  cargarProductos();
  sePuedePagar();
});

btnRegresar.addEventListener("click", function () {
  window.location.href = "./productos.html";
});

btnContinuar.addEventListener("click", function () {
  window.location.href = "./pago.html";
});
