import { medicos as medicosPorDefecto } from './data.js';


document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorMedicos");
  
  const localDoctors = localStorage.getItem("doctorData");
  const medicos = localDoctors ? JSON.parse(localDoctors) : medicosPorDefecto || [];

  if (medicos.length === 0) {
    contenedor.innerHTML = "<p class='text-muted text-center'>No hay médicos disponibles.</p>";
    return;
  }

  medicos.forEach(medico => {
    const card = document.createElement("div");
    card.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${medico.imageUrl}" class="card-img-top" alt="${medico.nombre || medico.name}">
        <div class="card-body text-center">
          <h5 class="card-title">Dr/a. ${medico.nombre || medico.name} ${medico.apellido || ""}</h5>
          <p class="text-muted">${medico.especialidad}</p>
          ${medico.descripcion ? `<p class="small">${medico.descripcion}</p>` : ""}
          ${medico.valorConsulta ? `<p><strong>Valor consulta:</strong> $${medico.valorConsulta}</p>` : ""}
          <button class="btn btn-primary reservar-btn" data-id="${medico.id}">
            Reservar turno
          </button>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });


  document.querySelectorAll(".reservar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      localStorage.setItem("medicoSeleccionado", id);
      window.location.href = "reserva.html";
    });
  });
});
