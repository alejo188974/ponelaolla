const listaPedidos = document.getElementById("listaPedidos");

// Cargar pedidos desde JSON
function cargarPedidos(){
    fetch('pedidos.json')
    .then(response => response.json())
    .then(data => mostrarPedidos(data))
    .catch(err => console.error("Error cargando pedidos:", err));
}

function mostrarPedidos(pedidos){
    listaPedidos.innerHTML = "";
    pedidos.forEach((p, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${p.cliente}</strong> - Total: $${p.total} <br>
                        Dirección: ${p.direccion} <br>
                        Teléfono: ${p.telefono} <br>
                        Forma de pago: ${p.pago} <br>
                        Productos: ${p.productos.map(prod => prod.nombre + " ($" + prod.precio + ")").join(", ")}
                        <br><button onclick="eliminarPedido(${index})">Completar / Eliminar</button><hr>`;
        listaPedidos.appendChild(li);
    });
}

function eliminarPedido(index){
    fetch('pedidos.json')
    .then(response => response.json())
    .then(data => {
        data.splice(index,1);
        // Reescribir JSON
        fetch('guardar-pedido.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(() => cargarPedidos());
    });
}

// Inicializar
cargarPedidos();
