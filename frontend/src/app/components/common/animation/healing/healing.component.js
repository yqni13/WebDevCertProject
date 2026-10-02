import { loadHtmlComponent } from "../../../../shared/loader/loader.js";

const rand = (min, max) => min + Math.random() * (max - min);

export class Healing {
    static TEMPLATE = 'app/components/common/animation/healing/healing.component.html';

    constructor() {
        this.active = false;
    }

    // Show effect on parents bottom + removes after duration.
    // Needs "position: relative" in parent.
    async play(parent, { duration = 2000, count = 18 } = {}) {
        if (this.active)
            return; // Ignore multiple activation until process ends.

        this.active = true;

        const host = document.createElement('div');
        host.dataset.component = Healing.TEMPLATE;
        parent.appendChild(host);
        await loadHtmlComponent(host);

        this.spawn(host.querySelector('.healing'), duration / 1000, count);

        await new Promise(resolve => setTimeout(resolve, duration));
        host.remove();
        this.active = false;
    }

    spawn(root, total, count) {
        const ring = document.createElement('div');
        ring.className = 'healing__ring';
        root.appendChild(ring);

        for (let i = 0; i < count; i++) {
            const plus = document.createElement('div');
            plus.className = 'healing__plus';
            plus.style.setProperty('--x', rand(5, 95) + '%');
            plus.style.setProperty('--s', rand(14, 30) + 'px');
            plus.style.setProperty('--h', rand(110, 230) + 'px');
            plus.style.setProperty('--dx', rand(-18, 18) + 'px');

            // End delay & duration after 'total' seconds.
            plus.style.setProperty('--delay', rand(0, total * 0.3) + 's');
            plus.style.setProperty('--d', rand(total * 0.5, total * 0.7) + 's');
            plus.appendChild(document.createElement('i'));
            root.appendChild(plus);
        }
    }
}