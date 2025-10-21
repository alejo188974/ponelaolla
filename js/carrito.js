import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


// 🔑 Credenciales Supabase
const supabaseUrl = "https://uyxtdfkryqpmikdtyalz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eHRkZmtyeXFwbWlrZHR5YWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMjcwODgsImV4cCI6MjA3MzgwMzA4OH0.OxCbCbFSyDkqK7UXF3RXqizM-vTZL_uLOw936O2H2a4"; // 🔐 Reemplazar con tu key
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const carritoContainer = document.getElementById("carrito-container");
  const totalEl = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciar-carrito");
  const form = document.getElementById("pedido-form");

  // 📦 Renderizar carrito
  function renderCarrito() {
    if (!carritoContainer || !totalEl) return; // 👉 Evita romper si faltan

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
      carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      totalEl.textContent = "0.00";
      return;
    }

    let total = 0;

    // tabla para mostrar productos
    const tabla = document.createElement("table");
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = tabla.querySelector("tbody");

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="eliminar-item" data-index="${index}">❌</button></td>
      `;
      tbody.appendChild(fila);
    });

    carritoContainer.appendChild(tabla);
    totalEl.textContent = total.toFixed(2);

    // 🔥 Eliminar productos individuales
    document.querySelectorAll(".eliminar-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(btn.dataset.index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      });
    });
  }

  // 🗑️ Vaciar carrito
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      renderCarrito();
      alert("Carrito vaciado.");
    });
  }

  // ✅ Enviar pedido
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      const cliente = document.getElementById("cliente")?.value || "";
      const telefono = document.getElementById("telefono")?.value || "";
      const direccion = document.getElementById("direccion")?.value || "";
      const forma_pago = document.getElementById("forma_pago")?.value || "";
      const comentario = document.getElementById("comentario")?.value || "";
      const fecha = new Date().toISOString();

      // 🔄 Guardamos cantidad real de cada producto en Supabase
      const productos = carrito.map((item) => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      }));
console.log("📦 Pedido a guardar:", {
  cliente,
  telefono,
  direccion,
  forma_pago,
  comentario,
  fecha,
  productos,
});
      const { error } = await supabase.from("pedidos").insert([
        {
          cliente,
          telefono,
          direccion,
          forma_pago,
          comentario,
          fecha,
          productos,
        },
      ]);

      if (error) {
        console.error("Error al guardar pedido:", error);
        alert("❌ Hubo un problema al enviar tu pedido.");
      } else {
        alert("✅ Pedido enviado correctamente. Te contactaremos por WhatsApp.");
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
      }
    });
  }

  // 🚀 Primera carga
  renderCarrito();
});
