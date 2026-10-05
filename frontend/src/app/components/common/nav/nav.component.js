export class Nav {
    constructor() {
        this.fullMenu = document.getElementById('nav-menu-full');
    }

    init() {
        document.getElementById('nav-menu-open-btn').addEventListener('click', () => this.open());
        document.getElementById('nav-menu-close-btn').addEventListener('click', () => this.close());

        document.querySelectorAll(".nav-menu-li").forEach((item) => {
            item.addEventListener('click', () => {
                document.getElementById(item.dataset.nav).scrollIntoView({behavior: 'smooth', block: 'start'});
                this.close();
            })
        })
    }

    open() {
        this.fullMenu.style.setProperty('display', 'flex');
    }

    close() {
        this.fullMenu.style.setProperty('display', 'none');
    }
}