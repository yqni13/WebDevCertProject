import { loadAllHtmlComponents } from "./app/shared/loader/loader.js";
import { Contact } from "./app/components/pages/contact/contact.component.js";
import { Skills } from "./app/components/pages/skills/skills.component.js";
import { Nav } from "./app/components/common/nav/nav.component.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllHtmlComponents();
    const nav = new Nav();
    nav.init();
    const skills = new Skills();
    await skills.init();
    const contact = new Contact();
    await contact.init();
})

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
}, false);