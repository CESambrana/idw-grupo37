
document.addEventListener("DOMContentLoaded", function() {

    const RESERVAS_KEY = 'listaDeReservas';
    const DOCTOR_KEY = 'doctorData'; 

    function getMedicos() {
        const data = localStorage.getItem(DOCTOR_KEY);
        return data ? JSON.parse(data) : [];
    }

    const medicoSelect = document.getElementById("medico-select");

   
    function cargarMedicos() {
        
        const medicos = getMedicos(); 
        medicoSelect.innerHTML = ''; 
        
        const optionDefault = document.createElement("option");
        optionDefault.value = "";
        optionDefault.textContent = "Seleccione un médico...";
        optionDefault.disabled = true;
        optionDefault.selected = true;
        medicoSelect.appendChild(optionDefault);

        if (medicos.length === 0) {
            optionDefault.textContent = "No hay médicos disponibles";
            optionDefault.disabled = true;
        }

        
        medicos.forEach(medico => {
            const option = document.createElement("option");
            option.value = medico.name; 
            option.textContent = `${medico.name} - ${medico.especialidad}`;
            medicoSelect.appendChild(option);
        });
    }

    
    function getReservas() {
        const data = localStorage.getItem(RESERVAS_KEY);
        return data ? JSON.parse(data) : [];
    }

    function guardarReserva(reservaNueva) {
        const todasLasReservas = getReservas();
        todasLasReservas.push(reservaNueva);
        localStorage.setItem(RESERVAS_KEY, JSON.stringify(todasLasReservas));
    }

    function mostrarHistorial() {
        const listaContainer = document.getElementById("historial-lista");
        const btnLimpiar = document.getElementById("limpiar-historial");
        const reservas = getReservas();

        listaContainer.innerHTML = ''; 

        if (reservas.length === 0) {
            listaContainer.innerHTML = '<p class="text-muted">No hay reservas anteriores.</p>';
            btnLimpiar.classList.add("d-none"); 
        } else {
            btnLimpiar.classList.remove("d-none"); 
            
            const listGroup = document.createElement('ul');
            listGroup.className = 'list-group list-group-flush';

            reservas.reverse().forEach(reserva => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${reserva.paciente}</strong> (${reserva.email})<br>
                            <small class="text-muted">Médico: ${reserva.medico}</small>
                        </div>
                        <span class="badge bg-secondary rounded-pill">
                            ${new Date(reserva.id).toLocaleDateString()}
                        </span>
                    </div>
                `;
                listGroup.appendChild(li);
            });
            listaContainer.appendChild(listGroup);
        }
    }

    function limpiarHistorial() {
        if (confirm("¿Estás seguro de que quieres borrar todo el historial de reservas?")) {
            localStorage.removeItem(RESERVAS_KEY);
            mostrarHistorial(); 
        }
    }

   
    
    cargarMedicos();
    mostrarHistorial(); 

    document.getElementById("limpiar-historial").addEventListener("click", limpiarHistorial);

    const reservaForm = document.getElementById("reserva-form");
    reservaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombrePaciente = document.getElementById("nombre-paciente").value;
        const documento = document.getElementById("documento").value;
        const emailPaciente = document.getElementById("email-paciente").value;
        const medicoSeleccionado = medicoSelect.value;

        if (medicoSeleccionado === "") {
            alert("Por favor, seleccione un médico.");
            return;
        }

        const nuevaReserva = {
            id: Date.now(), 
            paciente: nombrePaciente,
            documento: documento,
            email: emailPaciente,
            medico: medicoSeleccionado
        };

        guardarReserva(nuevaReserva);

        document.getElementById("resumen-nombre").textContent = nombrePaciente;
        document.getElementById("resumen-medico").textContent = medicoSeleccionado;
        document.getElementById("resumen-email").textContent = emailPaciente;

        reservaForm.classList.add("d-none");
        document.getElementById("resumen").classList.remove("d-none");
        document.getElementById("historial-container").classList.add("d-none");
        
        reservaForm.reset();
        medicoSelect.value = ""; 
    });
});
