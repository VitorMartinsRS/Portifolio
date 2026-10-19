"use strict";
function required(selector, parent = document) {
    const element = parent.querySelector(selector);
    if (!element)
        throw new Error(`Elemento ausente: ${selector}`);
    return element;
}
const root = document.documentElement;
const themeToggle = required('.theme-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motion = () => reducedMotion.matches ? 'auto' : 'smooth';
function setTheme(theme) {
    root.dataset.theme = theme;
    required('span', themeToggle).textContent = theme === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
}
let savedTheme = null;
try {
    savedTheme = localStorage.getItem('portfolio-theme');
}
catch { /* Armazenamento opcional. */ }
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try {
        localStorage.setItem('portfolio-theme', theme);
    }
    catch { /* Mantém o tema nesta visita. */ }
});
const backToTop = required('.back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: motion() }));
const updateTopButton = () => { backToTop.hidden = window.scrollY <= 120; };
window.addEventListener('scroll', updateTopButton, { passive: true });
updateTopButton();
const dialog = required('.project-dialog');
let projectOpener = null;
if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-project]').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
                return;
            event.preventDefault();
            projectOpener = card;
            required('h2', dialog).textContent = required('h4', card).textContent;
            const image = required('img', dialog);
            image.src = card.href;
            image.alt = required('img', card).alt;
            required('.dialog-description', dialog).textContent = required('.project-meta p', card).textContent;
            dialog.showModal();
        });
    });
    required('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    required('.dialog-contact', dialog).addEventListener('click', () => { projectOpener = null; dialog.close(); });
    dialog.addEventListener('close', () => projectOpener?.focus({ preventScroll: true }));
    dialog.addEventListener('click', (event) => {
        const rect = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom))
            dialog.close();
    });
}
