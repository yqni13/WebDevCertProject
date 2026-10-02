import { loadAllHtmlComponents } from "./app/shared/loader/loader.js";
import { initAbout } from "./app/components/pages/about/about.component.js";
import { Contact } from "./app/components/pages/contact/contact.component.js";
import { initExperience } from "./app/components/pages/experience/experience.component.js";
import { initHome } from "./app/components/pages/home/home.component.js";
import { initSkills } from "./app/components/pages/skills/skills.component.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllHtmlComponents();
    initHome();
    initAbout();
    initSkills();
    initExperience();
    const contact = new Contact();
    await contact.init();
})