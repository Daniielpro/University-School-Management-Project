document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        });
    }
    const usuario = localStorage.getItem("usuario") || "Usuario Desconocido";

    document.getElementById("user-info").textContent = `👤 ${usuario}`;
});

// Función para cambiar el contenido del `iframe`
function loadService(service) {
    const iframe = document.getElementById("service-frame");

    let serviceURL = "";
    switch (service) {
        case "tasks":
            serviceURL = "http://localhost:4000/"; // Suponiendo que las tareas están en este puerto
            break;
        case "boards":
            serviceURL = "http://localhost:5000/"; // Suponiendo que los tableros están en este puerto
            break;
        case "calendar":
            serviceURL = "http://localhost:6000/"; // Suponiendo que el calendario está aquí
            break;
        case "weekly-planner":
            serviceURL = "http://localhost:3020/";
            break;
        default:
            serviceURL = "";
    }

    if (serviceURL) {
        iframe.src = serviceURL;
        iframe.style.display = "block";
    }
}