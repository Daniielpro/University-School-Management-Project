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
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "dashboard.html"; 
    } else {
        alert('Error: ' + result.error);
    }
});
