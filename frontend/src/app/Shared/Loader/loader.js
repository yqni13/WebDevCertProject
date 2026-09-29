export async function loadHtmlComponent(host) {
    const path = host.dataset.component;
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        host.innerHTML = await response.text();
    } catch (err) {
        console.error(`Failed to load component: "${path}":`, err);
        host.innerHTML = `<p>Failed to load: ${path}</p>`;
    }
}

export async function loadAllHtmlComponents() {
    const hosts = document.querySelectorAll('[data-component]');
    await Promise.all([...hosts].map(loadHtmlComponent));
}