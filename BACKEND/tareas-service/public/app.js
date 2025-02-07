document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8084/api";
    const tareaForm = document.getElementById("tarea-form");
    const tareaInput = document.getElementById("tarea");
    const fechaInput = document.getElementById("fechaEntrega");
    const profesorSelect = document.getElementById("profesor");
    const tareasList = document.getElementById("tareas-list");

    // Función para cargar los profesores en el select
    function cargarProfesores() {
        fetch(`${apiUrl}/profesores`)
            .then(response => response.json())
            .then(data => {
                profesorSelect.innerHTML = "";
                data.forEach(profesor => {
                    const option = document.createElement("option");
                    option.value = profesor.nombre;
                    option.textContent = profesor.nombre;
                    profesorSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error al cargar profesores:", error));
    }

    // Función para cargar las tareas
    function cargarTareas() {
        fetch(`${apiUrl}/tareas`)
            .then(response => response.json())
            .then(data => {
                tareasList.innerHTML = "";
                data.forEach(tarea => {
                    const li = document.createElement("li");
                    li.innerHTML = `${tarea.tarea} - ${tarea.fechaEntrega} - ${tarea.profesor} 
                                    <button class="delete" data-id="${tarea._id}">Eliminar</button>`;
                    tareasList.appendChild(li);
                });
            })
            .catch(error => console.error("Error al cargar tareas:", error));
    }

    // Agregar una nueva tarea
    tareaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nuevaTarea = {
            tarea: tareaInput.value,
            fechaEntrega: fechaInput.value,
            profesor: profesorSelect.value
        };

        fetch(`${apiUrl}/tareas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaTarea)
        })
        .then(response => response.json())
        .then(() => {
            tareaInput.value = "";
            fechaInput.value = "";
            cargarTareas();
        })
        .catch(error => console.error("Error al agregar tarea:", error));
    });

    // Eliminar tarea
    tareasList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const tareaId = event.target.dataset.id;

            fetch(`${apiUrl}/tareas/${tareaId}`, {
                method: "DELETE"
            })
            .then(() => cargarTareas())
            .catch(error => console.error("Error al eliminar tarea:", error));
        }
    });

    // Cargar profesores y tareas al inicio
    cargarProfesores();
    cargarTareas();
});

