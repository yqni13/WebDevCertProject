import { loadAllHtmlComponents } from "./app/Shared/Loader/loader.js";
import { initHome } from "./app/components/pages/home/home.component.js";
import { initSkills } from "./app/components/pages/skills/skills.component.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllHtmlComponents();
    initHome();
    initSkills();
})