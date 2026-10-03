import { loadAllHtmlComponents } from "./app/shared/loader/loader.js";
import { Contact } from "./app/components/pages/contact/contact.component.js";
import { initSkills } from "./app/components/pages/skills/skills.component.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllHtmlComponents();
    initSkills();
    const contact = new Contact();
    await contact.init();
})