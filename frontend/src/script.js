import { loadAllHtmlComponents } from "./app/shared/loader/loader.js";
import { Contact } from "./app/components/pages/contact/contact.component.js";
import { Skills } from "./app/components/pages/skills/skills.component.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllHtmlComponents();
    const skills = new Skills();
    skills.init();
    const contact = new Contact();
    await contact.init();
})