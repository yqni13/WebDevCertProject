const fx = document.getElementById('fx');
const rand = (min, max) => min + Math.random() * (max - min);

// Spawnt eine Welle aus "+"-Symbolen am unteren Rand des Containers.
function heal(container, { count = 14, width = 160 } = {}) {
const ring = document.createElement('div');
ring.className = 'ring';
container.appendChild(ring);
ring.addEventListener('animationend', () => ring.remove());

for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'plus';
    p.style.setProperty('--x',     rand(8, width - 8) + 'px');
    p.style.setProperty('--s',     rand(14, 30) + 'px');
    p.style.setProperty('--h',     rand(110, 230) + 'px');
    p.style.setProperty('--dx',    rand(-18, 18) + 'px');
    p.style.setProperty('--d',     rand(1.1, 1.9) + 's');
    p.style.setProperty('--delay', rand(0, 0.7) + 's');
    p.appendChild(document.createElement('i'));
    p.addEventListener('animationend', e => { if (e.target === p) p.remove(); });
    container.appendChild(p);
}
}

document.getElementById('once').addEventListener('click', () => heal(fx));

let timer = null;
const loopBtn = document.getElementById('loop');
loopBtn.addEventListener('click', () => {
const on = loopBtn.getAttribute('aria-pressed') !== 'true';
loopBtn.setAttribute('aria-pressed', on);
clearInterval(timer);
if (on) { heal(fx, { count: 8 }); timer = setInterval(() => heal(fx, { count: 8 }), 800); }
});

heal(fx); // einmal beim Laden zeigen