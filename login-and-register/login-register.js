/*==============================
=   JavaScript From Scratch - JS
=   Page: Login and Register
=   File: login-register.js
==============================*/

/*==============================
=   Scroll-based Animations
==============================*/

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade__scale, .fade__right, .fade__bottom').forEach(el => observer.observe(el));


/*==============================
=   Form Validation
==============================*/

const form = document.querySelector('.login__register__form');

const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,80}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/;

function showError(input, message) {
    let error = input.parentElement.querySelector('.input__error');
    if (!error) {
        error = document.createElement('div');
        error.className = 'input__error';
        error.setAttribute('aria-live', 'polite');
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
    let error = input.parentElement.querySelector('.input__error');
    if (error) error.textContent = '';
    input.setAttribute('aria-invalid', 'false');
}

function validateFullName(input) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Please enter your full name.');
        return false;
    } else if (!nameRegex.test(value)) {
        showError(input, 'Only letters and spaces (2-80 characters).');
        return false;
    }
    clearError(input);
    return true;
}

function validateEmail(input) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Please enter your email.');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(input, 'Please enter a valid email address.');
        return false;
    }
    clearError(input);
    return true;
}

function validatePassword(input) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Please enter your password.');
        return false;
    } else if (!passwordRegex.test(value)) {
        showError(input, 'Password must be 8-32 characters, include uppercase, lowercase, and a number.');
        return false;
    }
    clearError(input);
    return true;
}

function validatePassword2(input, passwordInput) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Please confirm your password.');
        return false;
    } else if (value !== passwordInput.value.trim()) {
        showError(input, 'Passwords do not match.');
        return false;
    }
    clearError(input);
    return true;
}

if (form) {
    const fullname = form.elements['fullname'];
    const email = form.elements['email'];
    const password = form.elements['password'];
    const password2 = form.elements['password2'];

    fullname.addEventListener('input', () => validateFullName(fullname));
    email.addEventListener('input', () => validateEmail(email));
    password.addEventListener('input', () => validatePassword(password));
    password2.addEventListener('input', () => validatePassword2(password2, password));

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const validName = validateFullName(fullname);
        const validEmail = validateEmail(email);
        const validPassword = validatePassword(password);
        const validPassword2 = validatePassword2(password2, password);

        if (validName && validEmail && validPassword && validPassword2) {
            form.reset();
            clearError(fullname);
            clearError(email);
            clearError(password);
            clearError(password2);
            window.location.href = '../index.html';
        }
    });
}


/*==============================
=   Mostrar/ocultar contraseña
==============================*/
document.querySelectorAll('.toggle__password').forEach(btn => {
    btn.addEventListener('click', function () {
        const input = document.getElementById(this.dataset.target);
        if (!input) return;
        if (input.type === 'password') {
            input.type = 'text';
            this.querySelector('img').src = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/eye-slash.svg";
        } else {
            input.type = 'password';
            this.querySelector('img').src = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/eye.svg";
        }
    });
});