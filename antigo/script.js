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
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark');
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
document.querySelectorAll('[data-carousel]').forEach((carousel, carouselIndex) => {
    const slides = Array.from(carousel.children).filter(slide => slide instanceof HTMLElement);
    if (slides.length === 0)
        return;
    if (!carousel.id)
        carousel.id = `media-carousel-${carouselIndex + 1}`;
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carrossel');
    carousel.tabIndex = 0;
    slides.forEach((slide, slideIndex) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${slideIndex + 1} de ${slides.length}`);
    });
    const controls = document.createElement('div');
    controls.className = 'carousel-controls media-carousel-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Controles do carrossel');
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'carousel-button';
    previous.setAttribute('aria-label', 'Mídia anterior');
    previous.setAttribute('aria-controls', carousel.id);
    previous.textContent = '←';
    const status = document.createElement('span');
    status.className = 'media-carousel-status';
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'carousel-button';
    next.setAttribute('aria-label', 'Próxima mídia');
    next.setAttribute('aria-controls', carousel.id);
    next.textContent = '→';
    controls.append(previous, status, next);
    carousel.insertAdjacentElement('afterend', controls);
    let activeIndex = 0;
    const updateControls = () => {
        status.textContent = `${activeIndex + 1} / ${slides.length}`;
        previous.disabled = activeIndex === 0;
        next.disabled = activeIndex === slides.length - 1;
    };
    const update = () => {
        activeIndex = Math.min(slides.length - 1, Math.round(carousel.scrollLeft / Math.max(carousel.clientWidth, 1)));
        updateControls();
        slides.forEach((slide, slideIndex) => {
            if (slideIndex !== activeIndex)
                slide.querySelectorAll('video').forEach(video => video.pause());
        });
    };
    const goTo = (index) => {
        const slide = slides[index];
        if (!slide)
            return;
        activeIndex = index;
        updateControls();
        carousel.scrollTo({ left: slide.offsetLeft, behavior: motion() });
    };
    previous.addEventListener('click', () => goTo(activeIndex - 1));
    next.addEventListener('click', () => goTo(activeIndex + 1));
    carousel.addEventListener('scroll', update, { passive: true });
    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(activeIndex - 1);
        }
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(activeIndex + 1);
        }
    });
    window.addEventListener('resize', update);
    update();
});
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
