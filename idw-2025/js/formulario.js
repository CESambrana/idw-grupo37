const datos = {
    name: "",
    especialidad: "",
    imageUrl: ""
};

const formulario = document.querySelector("#doctor-form");

formulario.addEventListener("input", (e) => {
    datos[e.target.id] = e.target.value;
});

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById('name-input').value.trim();
    const especialidad = document.getElementById('especialidad-input').value.trim();
    const imageUrl = document.getElementById('image-url-input').value.trim();

    if (name === "" || especialidad === "" || imageUrl === "") {
        mostrarError("Todos los campos son obligatorios");
        return;
    }

    const newDoctorData = { name, especialidad, imageUrl };
    addDoctor(newDoctorData); // función definida en admin.js

    formulario.reset();
    displayDoctor(); // 🔥 actualiza la lista sin recargar
});

function mostrarError(mensaje) {
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("text-danger", "mt-2");
    formulario.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}

