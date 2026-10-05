export class Nav {
    constructor() {
        this.fullMenu = document.getElementById('nav-menu-full');
        this.openBtn = document.getElementById('nav-menu-open-btn');
        this.closeBtn = document.getElementById('nav-menu-close-btn');
        this.isFullMenuOpen = false;
        document.onkeydown = (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        }
    }

    init() {
        document.getElementById('nav-menu-open-btn').addEventListener('click', () => this.open());
        document.getElementById('nav-menu-close-btn').addEventListener('click', () => this.close());

        document.querySelectorAll(".nav-menu-li").forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.close();
                document.getElementById(item.dataset.nav).scrollIntoView({behavior: 'smooth', block: 'start'});
            })
        })

        this.openBtn.focus();
    }

    open() {
        this.fullMenu.style.setProperty('display', 'flex');
        this.isFullMenuOpen = true;
        this.openBtn.setAttribute('aria-expanded', 'true');
        this.closeBtn.focus();
    }

    close() {
        this.fullMenu.style.setProperty('display', 'none');
        this.isFullMenuOpen = false;
        this.openBtn.setAttribute('aria-expanded', 'false');
        this.openBtn.focus();
    }
}