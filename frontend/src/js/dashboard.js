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
            serviceURL = "http://3.228.90.193:8081/";
            break;
        case "File-management":
            serviceURL = "http://23.23.90.47:8091/"; 
            break;
        case "link-management":
            serviceURL = "http://3.218.222.100:8087/"; 
            break;
        case "weekly-planner":
            serviceURL = "http://52.23.24.3:3020/";
            break;
        case "Teacher-service":
            serviceURL = "http://35.153.238.113:8083/"; 
            break;
        case "Student-schedule":
            serviceURL = "http://35.153.238.113:8080/"; 
            break;
        case "Tareas Service":
            serviceURL = "http://35.153.238.113:8084/"; 
            break;
        case "Calculate":
            serviceURL = "http://3.228.90.193:3010/"; 
             break;
         case "Academic-events":
            serviceURL = "http://34.236.1.24:8097/"; 
            break;        
        default:
            serviceURL = "";
    }

    if (serviceURL) {
        iframe.src = serviceURL;
        iframe.style.display = "block";
    }
}