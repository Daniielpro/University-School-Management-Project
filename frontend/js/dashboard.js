// script.js
window.onload = function() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
        // Redirigir al login si no está autenticado
        window.location.href = "login.html";
    }

    // Mostrar el nombre del usuario en el dashboard
    const userEmail = localStorage.getItem("userEmail");
    document.getElementById("userEmail").textContent = userEmail;

    // Aquí puedes agregar más lógica para mostrar la vista de "Planner"
    // Si quieres mostrar el planner en el menú lateral
    const plannerLink = document.getElementById("plannerLink");
    plannerLink.addEventListener("click", function() {
        window.location.href = "dashboard.html"; // Asegúrate de crear esta vista
    });
};
