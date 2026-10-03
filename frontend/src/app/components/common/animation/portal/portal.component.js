import { loadHtmlComponent } from "../../../../shared/loader/loader.js";

export class Portal {
    static TEMPLATE = 'app/components/common/animation/portal/portal.component.html';

    constructor() {
        this.active = false;
    }

    // Show effect on parents bottom + removes after duration.
    // Needs "position: relative" in parent.
    async play(parent, { duration = 2500 } = {}) {
        if (this.active) return; // Ignore multiple activation until process ends.
        this.active = true;

        const host = document.createElement('div');
        host.dataset.component = Portal.TEMPLATE;
        parent.appendChild(host);
        await loadHtmlComponent(host);

        host.querySelector('.portal').style.setProperty('--total', duration + 'ms');

        await new Promise(resolve => setTimeout(resolve, duration));
        host.remove();
        this.active = false;
    }
}