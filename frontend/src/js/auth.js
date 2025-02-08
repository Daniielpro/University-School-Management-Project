
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        window.location.href = 'dashboard.html'; // Redirige al Dashboard
    } else {
        alert(`Error: ${data.error || 'Credenciales incorrectas'}`);
    }
});


document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'No se pudo registrar el usuario'}`);
    }
});
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');  // Eliminar el token
    alert('Sesión cerrada correctamente');
    window.location.href = 'login.html';  // Redirigir al login
});
