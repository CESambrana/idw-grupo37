// Función para cerrar sesión  
function cerrarSesion() {  
  sessionStorage.removeItem("accessToken");  
  sessionStorage.removeItem("userId");  
  sessionStorage.removeItem("username");  
  window.location.href = "index.html";  
}  
  
// Obtener obras sociales del localStorage  
function getObrasSociales() {  
  const data = localStorage.getItem('obrasSocialesData');  
  return data ? JSON.parse(data) : [  
    { id: '1', nombre: "Osde", img: "img/osde.jpg", porcentaje: 30 },  
    { id: '2', nombre: "Sancor Salud", img: "img/sancor-salud-portada.jpg", porcentaje: 25 },  
    { id: '3', nombre: "Galeno", img: "img/galeno.png", porcentaje: 20 },  
    { id: '4', nombre: "Medifé", img: "img/medife.png", porcentaje: 15 },  
    { id: '5', nombre: "Swiis Medical", img: "img/LOGO-Swiss-Medical-Medicina-Privada-3.jpg", porcentaje: 35 },  
    { id: '6', nombre: "Oser", img: "img/oser.jpg", porcentaje: 10 }  
  ];  
}  
  
// Guardar obras sociales en localStorage  
function guardarObrasSociales(obras) {  
  localStorage.setItem('obrasSocialesData', JSON.stringify(obras));  
}  
  
// Agregar nueva obra social  
function addObraSocial(obraData) {  
  const obras = getObrasSociales();  
  const newObra = {  
    id: Date.now().toString(),  
    ...obraData  
  };  
  obras.push(newObra);  
  guardarObrasSociales(obras);  
  console.log("Obra social agregada:", newObra);  
}  
  
// Eliminar obra social  
function removeObraSocial(id) {  
  if (confirm("¿Estás seguro de eliminar esta obra social?")) {  
    let obras = getObrasSociales();  
    obras = obras.filter(obra => obra.id !== id);  
    guardarObrasSociales(obras);  
    displayObrasSociales();  
    console.log("Obra social eliminada:", id);  
  }  
}  
  
// Variable global para edición  
let editingObraId = null;  
  
// Editar obra social  
function editObraSocial(id) {  
  const obras = getObrasSociales();  
  const obra = obras.find(o => o.id === id);  
    
  if (obra) {  
    document.getElementById('nombre-input').value = obra.nombre;  
    document.getElementById('porcentaje-input').value = obra.porcentaje;  
    document.getElementById('image-url-input').value = obra.img;  
      
    editingObraId = id;  
      
    const submitBtn = document.querySelector('#obra-social-form button[type="submit"]');  
    submitBtn.textContent = 'Actualizar Obra Social';  
    submitBtn.classList.remove('btn-primary');  
    submitBtn.classList.add('btn-warning');  
      
    document.getElementById('obra-social-form').scrollIntoView({ behavior: 'smooth' });  
  }  
}  
  
// Actualizar obra social  
function updateObraSocial(id, obraData) {  
  let obras = getObrasSociales();  
  const index = obras.findIndex(o => o.id === id);  
    
  if (index !== -1) {  
    obras[index] = { id, ...obraData };  
    guardarObrasSociales(obras);  
    displayObrasSociales();  
    console.log("Obra social actualizada:", obras[index]);  
  }  
}  
  
// Mostrar obras sociales  
function displayObrasSociales() {  
  const obras = getObrasSociales();  
  const container = document.getElementById('obras-sociales-container');  
  container.innerHTML = '';  
  
  obras.forEach(obra => {  
    const col = document.createElement('div');  
    col.className = 'col-md-6 col-lg-4 mb-4';  
      
    col.innerHTML = `  
      <div class="card shadow-sm h-100">  
        <img src="${obra.img}" alt="${obra.nombre}" class="card-img-top" style="height:150px; object-fit:contain; padding:10px;">  
        <div class="card-body">  
          <h5 class="card-title">${obra.nombre}</h5>  
          <p class="card-text text-success fw-bold">Descuento: ${obra.porcentaje}%</p>  
          <button class="btn btn-warning btn-sm me-2" onclick="editObraSocial('${obra.id}')">✏️ Editar</button>  
          <button class="btn btn-danger btn-sm" onclick="removeObraSocial('${obra.id}')">🗑️ Eliminar</button>  
        </div>  
      </div>  
    `;  
      
    container.appendChild(col);  
  });  
}  
  
// Event listener del formulario  
document.addEventListener('DOMContentLoaded', () => {  
  displayObrasSociales();  
    
  const form = document.getElementById('obra-social-form');  
  form.addEventListener('submit', (event) => {  
    event.preventDefault();  
  
    const obraData = {  
      nombre: document.getElementById('nombre-input').value.trim(),  
      porcentaje: parseInt(document.getElementById('porcentaje-input').value),  
      img: document.getElementById('image-url-input').value.trim()  
    };  
  
    if (obraData.nombre && obraData.porcentaje >= 0 && obraData.img) {  
      if (editingObraId) {  
        updateObraSocial(editingObraId, obraData);  
        editingObraId = null;  
          
        const submitBtn = form.querySelector('button[type="submit"]');  
        submitBtn.textContent = 'Agregar Obra Social';  
        submitBtn.classList.remove('btn-warning');  
        submitBtn.classList.add('btn-primary');  
      } else {  
        addObraSocial(obraData);  
      }  
        
      form.reset();  
      displayObrasSociales();  
    } else {  
      alert("Por favor, completa todos los campos correctamente.");  
    }  
  });  
});