/*==============================
=   JavaScript From Scratch - JS
=   Page: Contact
=   File: contact.js
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

const form = document.querySelector('.contact__form');

const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

function validateName(input) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Please enter your name.');
        return false;
    } else if (!nameRegex.test(value)) {
        showError(input, 'Only letters and spaces (2-40 characters).');
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

function validateMessage(input) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Please enter your message.');
        return false;
    } else if (value.length < 10 || value.length > 500) {
        showError(input, 'Message must be between 10 and 500 characters.');
        return false;
    }
    clearError(input);
    return true;
}

if (form) {
    const name = form.elements['name'];
    const email = form.elements['email'];
    const message = form.elements['message'];

    name.addEventListener('input', () => validateName(name));
    email.addEventListener('input', () => validateEmail(email));
    message.addEventListener('input', () => validateMessage(message));

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const validName = validateName(name);
        const validEmail = validateEmail(email);
        const validMessage = validateMessage(message);

        if (validName && validEmail && validMessage) {
            form.reset();
            clearError(name);
            clearError(email);
            clearError(message);
            window.location.href = '../index.html';
        }
    });
}
