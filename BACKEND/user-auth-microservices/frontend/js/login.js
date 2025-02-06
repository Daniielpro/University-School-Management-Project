document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert('Login successful');
        localStorage.setItem("isAuthenticated", "true"); // Aquí se guarda la sesión
        window.location.href = "dashboard.html"; // Asegúrate de que esta página exista
    } else {
        alert('Error: ' + result.error);
    }
});
