document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerModal = document.getElementById('register-modal');
    const openRegisterModal = document.getElementById('open-register-modal');
    const closeRegisterModal = document.getElementById('close-register-modal');
    const loader = document.getElementById('loader');

    // Hide loader after page load
    setTimeout(() => {
        loader.classList.add('hidden');
        console.log('Loader hidden');
    }, 500);

    // Open register modal
    openRegisterModal.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('hidden');
        console.log('Register modal opened');
    });

    // Close register modal
    closeRegisterModal.addEventListener('click', () => {
        registerModal.classList.add('hidden');
        registerForm.reset();
        console.log('Register modal closed');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Login attempt:', { email, password });

        if (!email || !password) {
            showToast('Completa los campos', 'yellow');
            console.log('Toast: Completa los campos');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', email);
            showToast('Acceso Correcto', 'green');
            console.log('Toast: Acceso Correcto');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 3000);
        } else {
            showToast('Credenciales incorrectas', 'red');
            console.log('Toast: Credenciales incorrectas');
        }
    });

    // Handle register form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value.trim();
        const dni = document.getElementById('register-dni').value.trim();
        const sex = document.getElementById('register-sex').value;
        const birthdate = document.getElementById('register-birthdate').value;
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        console.log('Register attempt:', { name, dni, sex, birthdate, email, password, confirmPassword });

        if (!name || !dni || !sex || !birthdate || !email || !password || !confirmPassword) {
            showToast('Completa los campos', 'yellow');
            console.log('Toast: Completa los campos');
            return;
        }

        if (!/^\d{8}$/.test(dni)) {
            showToast('El DNI debe tener 8 dígitos', 'red');
            console.log('Toast: El DNI debe tener 8 dígitos');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Las contraseñas no coinciden', 'red');
            console.log('Toast: Las contraseñas no coinciden');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === email)) {
            showToast('El correo ya está registrado', 'red');
            console.log('Toast: El correo ya está registrado');
            return;
        }

        if (users.some(u => u.dni === dni)) {
            showToast('El DNI ya está registrado', 'red');
            console.log('Toast: El DNI ya está registrado');
            return;
        }

        users.push({ name, dni, sex, birthdate, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showToast('Registro exitoso', 'green');
        console.log('Toast: Registro exitoso');
        registerModal.classList.add('hidden');
        registerForm.reset();
    });
});