document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert('Registration successful');
        // Redirigir a login o página principal
    } else {
        alert('Error: ' + result.error);
    }
    // script.js
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // Aquí puedes guardar los datos de forma simulada
    alert("Registrado con éxito. Ahora puedes iniciar sesión.");

    // Redirigir al login
    window.location.href = "login.html";
});

});
