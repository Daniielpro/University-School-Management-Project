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
        case "Exam-reminder":
            serviceURL = "http://localhost:8081/"; // Suponiendo que las tareas están en este puerto
            break;
        case "File-management":
            serviceURL = "http://localhost:8091/"; // Suponiendo que los tableros están en este puerto
            break;
        case "link-management":
            serviceURL = "http://localhost:8087/"; // Suponiendo que el calendario está aquí
            break;
        case "weekly-planner":
            serviceURL = "http://localhost:3020/";
            break;
        case "Exam-reminder":
            serviceURL = "http://localhost:8081/"; // Suponiendo que las tareas están en este puerto
            break;
        case "File-management":
            serviceURL = "http://localhost:8091/"; // Suponiendo que los tableros están en este puerto
            break;
        case "link-management":
            serviceURL = "http://localhost:8087/"; // Suponiendo que el calendario está aquí
            break;
        case "weekly-planner":
            serviceURL = "http://localhost:3020/";
            break;
        case "Exam-reminder":
            serviceURL = "http://localhost:8081/"; // Suponiendo que las tareas están en este puerto
            break;
        case "File-management":
            serviceURL = "http://localhost:8091/"; // Suponiendo que los tableros están en este puerto
            break;
        case "link-management":
            serviceURL = "http://localhost:8087/"; // Suponiendo que el calendario está aquí
            break;
        case "weekly-planner":
            serviceURL = "http://localhost:3020/";
            break;
        case "Teacher-service":
            serviceURL = "http://localhost:8083/"; // Suponiendo que las tareas están en este puerto
            break;
        case "Student-schedule":
            serviceURL = "http://localhost:8080/"; // Suponiendo que los tableros están en este puerto
            break;
        case "Tareas Service":
            serviceURL = "http://localhost:8084/"; // Suponiendo que el calendario está aquí
            break;
        default:
            serviceURL = "";
    }

    if (serviceURL) {
        iframe.src = serviceURL;
        iframe.style.display = "block";
    }
}