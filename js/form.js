
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Limpiar errores anteriores
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    let hayErrores = false;

    // Validaciones
    if (nombre === "") {
        document.getElementById("error-nombre").textContent = "Este campo es obligatorio.";
        hayErrores = true;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        document.getElementById("error-email").textContent = "Este campo es obligatorio.";
        hayErrores = true;
    } else if (!emailRegex.test(email)) {
        document.getElementById("error-email").textContent = "El formato del email no es válido.";
        hayErrores = true;
    }

    if (telefono === "") {
        document.getElementById("error-telefono").textContent = "Este campo es obligatorio.";
        hayErrores = true;
    } else if (!/^[0-9]+$/.test(telefono)) {
        document.getElementById("error-telefono").textContent = "El teléfono solo debe contener números.";
        hayErrores = true;
    }

    if (mensaje === "") {
        document.getElementById("error-mensaje").textContent = "Este campo es obligatorio.";
        hayErrores = true;
    }

    // Si no hay errores, enviar
    if (!hayErrores) {
        alert("Formulario enviado correctamente ✅");
      form.submit(); // O reemplazar con envío por AJAX
    }
    });
});



// `document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("form-contacto");

//     form.addEventListener("submit", function (e) {
//     e.preventDefault(); // Evita el envío hasta validar

//     const nombre = document.getElementById("nombre").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const telefono = document.getElementById("telefono").value.trim();
//     const mensaje = document.getElementById("mensaje").value.trim();

//     // Expresión regular para validar el email
//     const emailRegex = ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$;

//     if (nombre === "" || email === "" || telefono === "" || mensaje === "") {
//         alert("Por favor, completá todos los campos.");
//         return;
//     }

//     if (!emailRegex.test(email)) {
//         alert("Por favor, ingresá un email válido.");
//         return;
//     }

//     if (!/^[0-9]+$/.test(telefono)) {
//         alert("El teléfono solo debe contener números.");
//         return;
//     }

//     // Si todo está bien
//     alert("Formulario enviado correctamente ✅");
//     form.submit(); // Podés reemplazar esto por una función que lo mande por AJAX si querés
//     });
// });




