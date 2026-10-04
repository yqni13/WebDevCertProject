import { loadHtmlComponent } from "../../../../shared/loader/loader.js";

export class SkillList {
    static TEMPLATE = 'app/components/common/modal/skill-list/skill-list.component.html';

    constructor() {
        this.host = null;
        this.onKeydown = (e) => {
            if (e.key === 'Escape')
                this.close();
        };
    }

    async display(parent, topic, skills) {
        if (this.host)
            return;

        document.body.style.overflow = 'hidden';
        this.host = document.createElement('div');
        this.host.dataset.component = SkillList.TEMPLATE;
        parent.appendChild(this.host);

        const loaded = await loadHtmlComponent(this.host);
        if (!loaded) {
            this.close();
            return;
        }

        try {
            this.host.querySelector('#skill-list-title').textContent = topic;
            this.host.querySelector('#skill-list-content').append(this.buildContent(skills));
            this.host.querySelector('#skill-list-close')
                .addEventListener('click', () => this.close());
            document.addEventListener('keydown', this.onKeydown);
        } catch (error) {
            console.error('Failed to build skill list: ', error);
            this.close();
        }
    }

    buildContent(skills) {
        // Work on existing html templates and clone within loops.
        const categoryTemplate = this.host.querySelector('#skill-category-template');
        const entryTemplate = this.host.querySelector('#skill-entry-template');
        const fragment = document.createDocumentFragment();

        Object.entries(skills).forEach(([categoryName, list]) => {
            const category = categoryTemplate.content.cloneNode(true);
            category.querySelector('.skill-category-title').textContent = categoryName;
            const entries = category.querySelector('.skill-entries');

            list.forEach((skill) => {
                const entry = entryTemplate.content.cloneNode(true);
                entry.querySelector('.skill-icon i').className = `icon-base ${skill.icon}`;
                entry.querySelector('.skill-icon i').style.setProperty('color', `${skill.color}`);
                entry.querySelector('.skill-data-name').textContent = skill.name;
                entry.querySelector('.skill-data-level').textContent = skill.level;
                entry.querySelector('.skill-data-description').textContent = skill.description;
                entries.append(entry);
            });

            fragment.append(category);
        });

        return fragment;
    }

    close() {
        document.removeEventListener('keydown', this.onKeydown);
        document.body.style.overflow = 'visible';
        this.host?.remove();
        this.host = null;
    }
}