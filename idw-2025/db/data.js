// const STORAGE_KEY = 'doctorsData'; // Clave para LocalStorage


// const initialDoctors = [
//     { id: '1', name: 'Dr. Juan Pérez', specialty: 'Cardiología', license: 'MP12345' },
//     { id: '2', name: 'Dra. Ana Gómez', specialty: 'Pediatría', license: 'MP67890' }
// ];


// function getDoctors() {
//     const data = localStorage.getItem(STORAGE_KEY);
//     // Devuelve el array de objetos, o un array vacío si hay un problema
//     return data ? JSON.parse(data) : [];
// }

// // Guardar/Actualizar la lista completa
// function saveDoctors(doctorsArray) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(doctorsArray));
// }


// /**
//  * Inicializa LocalStorage si es la primera visita.
//  */
// function initializeLocalStorage() {
//     // Comprobar si la clave ya existe en LocalStorage
//     if (!localStorage.getItem(STORAGE_KEY)) {
//         // Si no existe, guardar el array inicial como una cadena JSON
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDoctors));
//         console.log("LocalStorage inicializado con datos de médicos por defecto.");
//     }
// }


// // Llamar a la función al cargar la aplicación
// initializeLocalStorage();




// // Añadir un nuevo médico
// function addDoctor(doctorData) {
//     const doctors = getDoctors();
//     // Generar un ID único (puedes usar la fecha, un contador, o una librería)
//     const newId = Date.now().toString(); 
//     const newDoctor = { id: newId, ...doctorData };
    
//     doctors.push(newDoctor);
//     saveDoctors(doctors);
//     return newDoctor;
// }



// // 5. ELIMINAR: Remover un médico por su ID
// function removeDoctor(id) {
//     if (confirm("¿Estás seguro de que quieres eliminar a este médico?")) {
//         let doctors = getDoctors();
//         // Filtrar (excluir) el médico con el ID dado
//         doctors = doctors.filter(d => d.id !== id);
        
//         saveDoctors(doctors); // 👈 Guardar el array actualizado
//         displayDoctors();     // Refrescar la vista
//     }
// }