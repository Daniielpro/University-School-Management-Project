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


function loadService(service) {
    const iframe = document.getElementById("service-frame");

    let serviceURL = "";
    switch (service) {
        case "Exam-reminder":
            serviceURL = "http://localhost:8081/";
            break;
        case "File-management":
            serviceURL = "http://localhost:8091/"; 
            break;
        case "link-management":
            serviceURL = "http://54.175.232.102:8087/"; 
            break;
        case "weekly-planner":
            serviceURL = "http://localhost:3020/";
            break;
        case "Teacher-service":
            serviceURL = "http://localhost:8083/"; 
            break;
        case "Student-schedule":
            serviceURL = "http://localhost:8080/"; 
            break;
        case "Tareas Service":
            serviceURL = "http://localhost:8084/"; 
            break;
        case "Calculate":
            serviceURL = "http://localhost:3010/"; 
             break;
         case "Academic-events":
            serviceURL = "http://localhost:8097/"; 
            break;        
        default:
            serviceURL = "";
    }

    if (serviceURL) {
        iframe.src = serviceURL;
        iframe.style.display = "block";
    }
}