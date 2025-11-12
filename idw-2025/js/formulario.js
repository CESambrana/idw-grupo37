
document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.querySelector("#contacto-form");
    const nombreInput = document.querySelector("#nombre");
    const apellidoInput = document.querySelector("#apellido");
    const emailInput = document.querySelector("#email");
    const mensajeInput = document.querySelector("#mensaje");
    const mensajeDiv = document.querySelector("#form-mensaje"); 

    formulario.addEventListener("submit", function(e) {
        e.preventDefault(); 

       
        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        if (nombre === "" || apellido === "" || email === "" || mensaje === "") {
          
            mostrarMensaje("Todos los campos son obligatorios.", "danger");
            return; 
        }

        console.log("Datos del formulario:", { nombre, apellido, email, mensaje });

        mostrarMensaje("¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.", "success");
        
        formulario.reset();
    });

    function mostrarMensaje(mensaje, tipo) {
       
        mensajeDiv.innerHTML = "";

        
        const alerta = document.createElement("div");
        alerta.classList.add("alert", `alert-${tipo}`, "mt-3");
        alerta.setAttribute("role", "alert");
        alerta.textContent = mensaje;

        
        mensajeDiv.appendChild(alerta);

        
        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }
});

