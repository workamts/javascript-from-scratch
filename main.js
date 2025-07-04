/*==============================
=   JavaScript From Scratch - JS
=   File: main.js
==============================*/

/*==============================
=   Menu de navegacion movil
==============================*/

const menuBtn = document.getElementById('header-menu-btn');
const closeBtn = document.getElementById('header-menu-close');
const menu = document.getElementById('header-menu');
const overlay = document.getElementById('menu-overlay');

// Elementos del menú
function openMenu() {
    menu.classList.add('open');
    document.body.classList.add('menu-open');
}

// Función para abrir el menú
function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
}

// Eventos para abrir/cerrar el menú
menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);



/*==============================
=   ScrollSpy y enlaces activos
==============================*/

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('#header-menu-list a');
    const sectionIds = Array.from(links)
        .map(link => link.getAttribute('href'))
        .filter(href => href && href.startsWith('#'))
        .map(href => href.slice(1));
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    let isClickScrolling = false;
    let clickTimeout = null;

    // Observer para deteObserver to detect the visible sectionctar la sección visible
    const observer = new IntersectionObserver((entries) => {
        if (isClickScrolling) return; // If you are scrolling by clicking, do not change

        let maxRatio = 0;
        let visibleId = null;
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                visibleId = entry.target.id;
            }
        });

        if (visibleId) {
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${visibleId}`);
            });
        }
    }, {
        threshold: [0.5, 0.7, 1.0]
    });

    sections.forEach(section => observer.observe(section));

    // When clicked, only that link remains active during the animated scroll.
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                isClickScrolling = true;
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });

                closeMenu();

                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    isClickScrolling = false;
                }, 600);
            }
        });
    });
});