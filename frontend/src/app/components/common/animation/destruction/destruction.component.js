import { loadHtmlComponent } from "../../../../shared/loader/loader.js";

const rand = (min, max) => min + Math.random() * (max - min);

export class Destruction {
    static TEMPLATE = 'app/components/common/animation/destruction/destruction.component.html';
    static HIT = 0.34; // Time of impact as part of total duration (must fit --hit in CSS).

    constructor() {
        this.active = false;
    }

    // Show effect on parents bottom + removes after duration.
    // Needs "position: relative" in parent.
    async play(parent, { duration = 2200, count = 26 } = {}) {
        if (this.active) return; // Ignore multiple activation until process ends.
        this.active = true;

        const host = document.createElement('div');
        host.dataset.component = Destruction.TEMPLATE;
        parent.appendChild(host);
        await loadHtmlComponent(host);

        const root = host.querySelector('.destruction');
        root.style.setProperty('--total', duration + 'ms');
        this.spawn(root, duration / 1000, count);

        // Shake on impact.
        setTimeout(() => {
            parent.classList.add('destruction-shake');
            setTimeout(() => parent.classList.remove('destruction-shake'), 450);
        }, duration * Destruction.HIT);

        await new Promise(resolve => setTimeout(resolve, duration));
        host.remove();
        this.active = false;
    }

    spawn(root, total, count) {
        const hit = total * Destruction.HIT;
        for (let i = 0; i < count; i++) {
            const ember = Math.random() < 0.4; // Debris: orange and small, rest are dark "rocks".
            const shard = document.createElement('div');
            shard.className = 'destruction-beam__shard';
            shard.style.setProperty('--s', (ember ? rand(5, 9) : rand(9, 18)) + 'px');
            shard.style.setProperty('--c', ember ? '#ff9a3a' : '#4b3b36');
            shard.style.setProperty('--dx', rand(-170, 170) + 'px');
            shard.style.setProperty('--h', rand(90, 230) + 'px');
            shard.style.setProperty('--fall', rand(0, 16) + 'px');
            shard.style.setProperty('--rot', rand(-540, 540) + 'deg');

            // Starts on impact and ends with 'total' in seconds.
            shard.style.setProperty('--delay', (hit + rand(0, total * 0.04)) + 's');
            shard.style.setProperty('--d', rand(total * 0.35, total * 0.55) + 's');
            shard.appendChild(document.createElement('i'));
            root.appendChild(shard);
        }
    }
}