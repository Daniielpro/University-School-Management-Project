document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8083/api/maestros";

    const maestroForm = document.getElementById("maestro-form");
    const nombreInput = document.getElementById("nombre");
    const materiaInput = document.getElementById("materia");
    const maestroList = document.getElementById("maestro-list");

    // Función para obtener y mostrar los maestros
    function cargarMaestros() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                maestroList.innerHTML = "";
                data.forEach(maestro => {
                    const li = document.createElement("li");
                    li.innerHTML = `${maestro.nombre} - ${maestro.materia} 
                                    <button class="delete" data-id="${maestro.id}">Eliminar</button>`;
                    maestroList.appendChild(li);
                });
            })
            .catch(error => console.error("Error al obtener maestros:", error));
    }

    // Agregar un nuevo maestro
    maestroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nuevoMaestro = {
            nombre: nombreInput.value,
            materia: materiaInput.value
        };

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoMaestro)
        })
        .then(response => response.json())
        .then(() => {
            nombreInput.value = "";
            materiaInput.value = "";
            cargarMaestros();
        })
        .catch(error => console.error("Error al agregar maestro:", error));
    });

    // Eliminar maestro
    maestroList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const maestroId = event.target.dataset.id;

            fetch(`${apiUrl}/${maestroId}`, {
                method: "DELETE"
            })
            .then(() => cargarMaestros())
            .catch(error => console.error("Error al eliminar maestro:", error));
        }
    });

    // Cargar maestros al inicio
    cargarMaestros();
});
