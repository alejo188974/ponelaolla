
  import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

  const supabaseUrl = "https://uyxtdfkryqpmikdtyalz.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eHRkZmtyeXFwbWlrZHR5YWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMjcwODgsImV4cCI6MjA3MzgwMzA4OH0.OxCbCbFSyDkqK7UXF3RXqizM-vTZL_uLOw936O2H2a4"; 
  const supabase = createClient(supabaseUrl, supabaseKey);

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedido-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      const cliente = document.getElementById("cliente").value;
      const telefono = document.getElementById("telefono").value;
      const direccion = document.getElementById("direccion").value;
      const forma_pago = document.getElementById("forma_pago").value;

      const { data, error } = await supabase
        .from("pedidos")
        .insert([
          {
            cliente,
            telefono,
            direccion,
            forma_pago,
            productos: carrito,
          }
        ]);

      if (error) {
        console.error(error);
        alert("❌ Hubo un error al enviar el pedido.");
      } else {
        alert("✅ Pedido enviado correctamente. Te contactaremos por WhatsApp.");
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
      }
    });
  });

