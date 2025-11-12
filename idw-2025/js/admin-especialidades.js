// admin-especialidades.js
const STORAGE_KEY = "especialidadesData";
let especialidades = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingId = null;

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(especialidades));
}

function displayEspecialidades() {
  const tbody = document.getElementById("tablaEspecialidades");
  tbody.innerHTML = "";
  especialidades.forEach(e => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.id}</td>
      <td>${e.nombre}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editEspecialidad(${e.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteEspecialidad(${e.id})">Eliminar</button>
      </td>`;
    tbody.appendChild(tr);
  });
}
