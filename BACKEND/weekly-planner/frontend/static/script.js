const API_BASE_URL_CREATE = "http://localhost:8001/activities"; // Microservicio para crear
const API_BASE_URL_READ = "http://localhost:8002/activities";   // Microservicio para leer
const API_BASE_URL_UPDATE = "http://localhost:8003/activities"; // Microservicio para actualizar
const API_BASE_URL_DELETE = "http://localhost:8004/activities"; // Microservicio para eliminar

document.addEventListener("DOMContentLoaded", () => {
    const activityForm = document.getElementById("activityForm");
    const updateForm = document.getElementById("updateForm");

    if (activityForm) {
        activityForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            await addActivity();
        });
    }

    if (updateForm) {
        updateForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            await updateActivity();
        });
    }

    loadActivities();
});

// Función para agregar actividad
async function addActivity() {
    const activity = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        day_of_week: document.getElementById("day_of_week").value,
        start_time: document.getElementById("start_time").value,
        end_time: document.getElementById("end_time").value
    };

    try {
        const response = await fetch(API_BASE_URL_CREATE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(activity)
        });

        if (response.ok) {
            alert("Activity added successfully!");
            document.getElementById("activityForm").reset();
            loadActivities();
        } else {
            alert("Failed to add activity.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para cargar actividades
async function loadActivities() {
    try {
        const response = await fetch(API_BASE_URL_READ);
        const activities = await response.json();

        const activitiesList = document.getElementById("activitiesList");
        if (!activitiesList) return;

        activitiesList.innerHTML = "";

        activities.forEach(activity => {
            const card = document.createElement("div");
            card.className = "card m-2";
            card.style.width = "18rem";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${activity.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${activity.day_of_week}: ${activity.start_time} - ${activity.end_time}</h6>
                    <p class="card-text">${activity.description}</p>
                    <button class="btn btn-warning btn-sm" onclick="editActivity(${activity.id})" data-bs-toggle="modal" data-bs-target="#updateModal">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteActivity(${activity.id})">Delete</button>
                </div>
            `;
            activitiesList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading activities:", error);
    }
}

// Función para eliminar actividad
async function deleteActivity(id) {
    try {
        const response = await fetch(`${API_BASE_URL_DELETE}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Activity deleted!");
            loadActivities();
        } else {
            alert("Failed to delete activity.");
        }
    } catch (error) {
        console.error("Error deleting activity:", error);
    }
}

// Función para cargar datos en el formulario de actualización
async function editActivity(id) {
    try {
        const response = await fetch(`${API_BASE_URL_READ}/${id}`);
        const activity = await response.json();

        document.getElementById("update_title").value = activity.title;
        document.getElementById("update_description").value = activity.description;
        document.getElementById("update_day_of_week").value = activity.day_of_week;
        document.getElementById("update_start_time").value = activity.start_time;
        document.getElementById("update_end_time").value = activity.end_time;
        document.getElementById("activity_id").value = activity.id;
    } catch (error) {
        console.error("Error fetching activity:", error);
    }
}

// Función para actualizar actividad
async function updateActivity() {
    const activity = {
        id: document.getElementById("activity_id").value,
        title: document.getElementById("update_title").value,
        description: document.getElementById("update_description").value,
        day_of_week: document.getElementById("update_day_of_week").value,
        start_time: document.getElementById("update_start_time").value,
        end_time: document.getElementById("update_end_time").value
    };

    try {
        const response = await fetch(`${API_BASE_URL_UPDATE}/${activity.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(activity)
        });

        if (response.ok) {
            alert("Activity updated!");
            loadActivities();
            document.getElementById("updateModalClose").click();
        } else {
            alert("Failed to update activity.");
        }
    } catch (error) {
        console.error("Error updating activity:", error);
    }
}
const socket = new WebSocket("ws://localhost:8005/ws");

// Manejar la conexión abierta
socket.onopen = () => {
    console.log("Conectado al WebSocket");
};

// Manejar mensajes recibidos
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📢 Notificación recibida:", data);

    // Mostrar la notificación en la página
    const notificationDiv = document.getElementById("notifications");
    const message = document.createElement("div");
    message.innerHTML = `<strong>${data.event}</strong>: ${data.data.title} actualizado`;
    message.classList.add("notification");
    notificationDiv.appendChild(message);

    // Opción: Eliminar la notificación después de unos segundos
    setTimeout(() => {
        notificationDiv.removeChild(message);
    }, 5000);
};

// Manejar errores
socket.onerror = (error) => {
    console.error("Error en WebSocket:", error);
};

