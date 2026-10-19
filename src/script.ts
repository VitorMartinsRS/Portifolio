type Theme = 'light' | 'dark';

function required<T extends Element>(selector: string, parent: ParentNode = document): T {
    const element = parent.querySelector<T>(selector);
    if (!element) throw new Error(`Elemento ausente: ${selector}`);
    return element;
}
const root = document.documentElement;
const themeToggle = required<HTMLButtonElement>('.theme-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motion = (): ScrollBehavior => reducedMotion.matches ? 'auto' : 'smooth';
function setTheme(theme: Theme): void {
    root.dataset.theme = theme;
    required('span', themeToggle).textContent = theme === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
}
let savedTheme: string | null = null;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Armazenamento opcional. */ }
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
    const theme: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Mantém o tema nesta visita. */ }
});
const backToTop = required<HTMLButtonElement>('.back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: motion()}));
const updateTopButton = (): void => { backToTop.hidden = window.scrollY <= 120; };
window.addEventListener('scroll', updateTopButton, {passive: true});
updateTopButton();

const dialog = required<HTMLDialogElement>('.project-dialog');
let projectOpener: HTMLAnchorElement | null = null;
if (typeof dialog.showModal === 'function') {
    document.querySelectorAll<HTMLAnchorElement>('[data-project]').forEach(card => {
        card.addEventListener('click', (event: MouseEvent) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            projectOpener = card;
            required('h2', dialog).textContent = required('h4', card).textContent;
            const image = required<HTMLImageElement>('img', dialog);
            image.src = card.href;
            image.alt = required<HTMLImageElement>('img', card).alt;
            required('.dialog-description', dialog).textContent = required('.project-meta p', card).textContent;
            dialog.showModal();
        });
    });
    required('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    required('.dialog-contact', dialog).addEventListener('click', () => { projectOpener = null; dialog.close(); });
    dialog.addEventListener('close', () => projectOpener?.focus({preventScroll: true}));
    dialog.addEventListener('click', (event: MouseEvent) => {
        const rect = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
}
