let tareas = [
    { id: 1, descripcion: 'Aprender Javascript', completado: false },
    { id: 2, descripcion: 'Practicar CSS', completado: true },
    { id: 3, descripcion: 'No dejar todo a ultimo', completado: false }
];

document.getElementById('add-tarea').addEventListener('click', () => {
    const input = document.getElementById('ingreso-tarea');
    const descripcion = input.value.trim();

    if (descripcion) {
        const nuevaTarea = {
            id: tareas.length + 1,
            descripcion,
            completado: false
        };

        tareas.push(nuevaTarea);
        input.value = ''; 
        actualizarLista(); 
    }
});

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id); 
    actualizarLista();
}

function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.completado = !tarea.completado;
    actualizarLista();
}

function actualizarResumen() {
    const totalTareas = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completado).length;

    document.getElementById('total-tareas').textContent = totalTareas;
    document.getElementById('tareas-realizadas').textContent = tareasCompletadas;
}

function actualizarLista() {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = ''; 

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${tarea.completado ? 'line-through' : 'none'}">
                ${tarea.descripcion}
            </span>
            <div class="btn-container">
                <button onclick="eliminarTarea(${tarea.id})" class="btn btn-danger">Eliminar</button>
                <button onclick="cambiarEstado(${tarea.id})" class="btn btn-primary">
                    ${tarea.completado ? 'Desmarcar' : 'Marcar'}
                </button>
            </div>
        `;
        listaTareas.appendChild(li);
    });

    actualizarResumen();
}
