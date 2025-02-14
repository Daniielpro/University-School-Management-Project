const API_CREATE = "http://34.236.1.24:8093/api/events";
const API_LIST = "http://34.236.1.24:8095/api/events";
const API_UPDATE = "http://34.236.1.24:8096/api/events/";
const API_DELETE = "http://34.236.1.24:8094/api/events/";

document.getElementById('eventForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;

    const response = await fetch(API_CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, date, location })
    });

    if (response.ok) {
        alert('Evento creado exitosamente');
        loadEvents(); // Recargar la lista de eventos
    } else {
        alert('Error al crear el evento');
    }
});

async function loadEvents() {
    const response = await fetch(API_LIST);
    const events = await response.json();
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${event.title}</strong> - ${event.date} - ${event.location}
            <button class="edit-btn" onclick="editEvent('${event._id}')">Editar</button>
            <button class="delete-btn" onclick="deleteEvent('${event._id}')">Eliminar</button>
        `;
        eventList.appendChild(li);
    });
}

async function deleteEvent(id) {
    const response = await fetch(API_DELETE + id, { method: 'DELETE' });
    if (response.ok) {
        alert('Evento eliminado correctamente');
        loadEvents();
    } else {
        alert('Error al eliminar el evento');
    }
}

async function editEvent(id) {
    const newTitle = prompt("Nuevo título del evento:");
    const newDescription = prompt("Nueva descripción:");
    const newDate = prompt("Nueva fecha (YYYY-MM-DD):");
    const newLocation = prompt("Nueva ubicación:");

    if (!newTitle || !newDescription || !newDate || !newLocation) return;

    const response = await fetch(API_UPDATE + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription, date: newDate, location: newLocation })
    });

    if (response.ok) {
        alert('Evento actualizado correctamente');
        loadEvents();
    } else {
        alert('Error al actualizar el evento');
    }
}

loadEvents();
