const cache = new Map();

export async function loadHtmlComponent(host) {
    const path = host.dataset.component;
    try {
        if (!cache.has(path)) {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
            cache.set(path, await response.text());
        }
        host.innerHTML = cache.get(path);
        return true;
    } catch (err) {
        console.error(`Failed to load component: "${path}":`, err);
        host.textContent = `Failed to load: ${path}`;
        return false;
    }
}

export async function loadAllHtmlComponents() {
    const hosts = document.querySelectorAll('[data-component]');
    await Promise.all([...hosts].map((host) => loadHtmlComponent(host)));
}