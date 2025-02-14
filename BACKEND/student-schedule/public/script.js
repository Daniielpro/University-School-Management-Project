const API_URL = "http://35.153.238.113:8080/graphql"; 

document.addEventListener("DOMContentLoaded", loadEvents);

document.getElementById("event-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("event-id").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const eventData = { title, description, date, time };

    if (id) {
        updateEvent(id, eventData);
    } else {
        createEvent(eventData);
    }
});


function loadEvents() {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `query {
                events {
                    id
                    title
                    description
                    date
                    time
                }
            }`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("📢 Datos cargados desde GraphQL:", data);

        const eventList = document.getElementById("event-list");
        eventList.innerHTML = "";

        data.data.events.forEach(event => {
            if (!event.id) {
                console.error("⚠️ Error: Evento sin ID:", event);
                return;
            }

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${event.title}</td>
                <td>${event.description}</td>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>
                    <button onclick="editEvent('${event.id}', '${event.title}', '${event.description}', '${event.date}', '${event.time}')">Editar</button>
                    <button onclick="deleteEvent('${event.id}')">Eliminar</button>
                </td>
            `;

            eventList.appendChild(row);
        });
    })
    .catch(error => console.error("❌ Error cargando eventos:", error));
}


function createEvent(eventData) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `mutation {
                createEvent(
                    title: "${eventData.title}",
                    description: "${eventData.description}",
                    date: "${eventData.date}",
                    time: "${eventData.time}"
                ) {
                    id
                    title
                }
            }`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Evento creado:", data);
        document.getElementById("event-form").reset();
        loadEvents();
    })
    .catch(error => console.error("❌ Error creando evento:", error));
}


function updateEvent(id, eventData) {
    if (!id) {
        console.error("🚨 Error: ID del evento es nulo.");
        return;
    }

    console.log(`📢 Enviando solicitud para actualizar el evento con ID: ${id}`);

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `mutation {
                updateEvent(
                    id: "${id}",
                    title: "${eventData.title}",
                    description: "${eventData.description}",
                    date: "${eventData.date}",
                    time: "${eventData.time}"
                ) {
                    id
                    title
                }
            }`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Respuesta de GraphQL (Actualizar):", data);
        document.getElementById("event-form").reset();
        document.getElementById("event-id").value = "";
        loadEvents();
    })
    .catch(error => console.error("❌ Error actualizando evento:", error));
}


function editEvent(id, title, description, date, time) {
    console.log(`✏️ Editando evento con ID: ${id}`);
    document.getElementById("event-id").value = id;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("date").value = date;
    document.getElementById("time").value = time;
}


function deleteEvent(id) {
    if (!id) {
        console.error("🚨 Error: ID del evento es nulo.");
        return;
    }

    console.log(`🗑️ Enviando solicitud para eliminar el evento con ID: ${id}`);

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `mutation {
                deleteEvent(id: "${id}")
            }`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Respuesta de GraphQL (Eliminar):", data);
        loadEvents();
    })
    .catch(error => console.error("❌ Error eliminando evento:", error));
}
