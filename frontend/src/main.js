import './css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM cargado correctamente.');

    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginBtn && registerBtn) {
        console.log('✅ Botones encontrados en el DOM.');

        loginBtn.addEventListener('click', () => {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });

        registerBtn.addEventListener('click', () => {
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    } else {
        console.error('❌ Error: No se encontraron los botones en el DOM.');
    }
});
