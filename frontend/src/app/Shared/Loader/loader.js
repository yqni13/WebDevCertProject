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


export async function loadTotalComponent(host, name) {
    // const loadedStyles = new Set();
    // Pfade relativ zur Seite, funktioniert lokal und unter GitHub Pages (auch in Unterordnern)
    const url = ext =>
        new URL(`components/${name}/${name}.component.${ext}`, document.baseURI).href;

    // CSS nur einmal pro Komponente einbinden
    // if (!loadedStyles.has(name)) {
    //     const link = document.createElement('link');
    //     link.rel = 'stylesheet';
    //     link.href = url('css');
    //     document.head.appendChild(link);
    //     loadedStyles.add(name);
    // }

    // HTML laden und einsetzen
    const res = await fetch(url('html'));
    if (!res.ok) 
        throw new Error(`Komponente "${name}" nicht gefunden (${res.status})`);
    
    host.innerHTML = await res.text();

    // JS als Modul laden und init() aufrufen
    const module = await import(url('js'));
    return module.init?.(host);
}