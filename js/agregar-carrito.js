document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".agregar-carrito");

  botonesAgregar.forEach(btn => {
    btn.addEventListener("click", () => {
      const productoDiv = btn.closest(".producto" || ".oferta");
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      const cantidad = parseInt(productoDiv.querySelector(".cantidad").value, 10);

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Si el producto ya está en el carrito, sumamos cantidades
      const index = carrito.findIndex(item => item.nombre === nombre);
      if (index > -1) {
        carrito[index].cantidad += cantidad;
      } else {
        carrito.push({ nombre, precio, cantidad });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert(`✅ ${nombre} agregado al carrito (${cantidad})`);
    });
  });
});
