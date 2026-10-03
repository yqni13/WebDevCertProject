import { SkillList } from "../../common/modal/skill-list/skill-list.component.js";

export class Skills {
    constructor() {
        this.skillList = new SkillList();
        this.skills = null;
    }

    init() {
        document.querySelectorAll('.skills-category').forEach((field) => {
            field.addEventListener('click', () => {
                this.openSkillTree(field.dataset.skill);
            })
        })
    }

    async loadSkills() {
        if (this.skills)
            return this.skills;

        const response = await fetch('app/data/skills.json');
        if (!response.ok)
            throw new Error(`HTTP error. Status: ${response.status}`);

        this.skills = await response.json();
        return this.skills;
    }

    async openSkillTree(title) {
        try {
            const skillData = await this.loadSkills();
            await this.skillList.display(document.body, title, skillData[title.toLowerCase()]);
        } catch (err) {
            console.error('Failed to open skill tree: ', err);
        }
    }
}