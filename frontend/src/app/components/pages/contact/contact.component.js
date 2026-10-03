import { Destruction } from "../../common/animation/destruction/destruction.component.js";
import { Healing } from "../../common/animation/healing/healing.component.js";
import { Portal } from "../../common/animation/portal/portal.component.js";

export class Contact {
    constructor() {
        this.form = document.getElementById("contact-form");
        this.healing = new Healing();
        this.portal = new Portal();
        this.destruction = new Destruction();
    }
    async init() {
        this.form.addEventListener('submit', async (event) => this.handleSubmit(event));
    }

    async handleSubmit(event) {
        event.preventDefault(); // Disable browser reload.
        if (!this.validateForm())
            return;

        await this.execSignalEvent();
    }

    async execSignalEvent() {
        const name = this.form.elements["name"].value;
        const signal = this.form.elements["signal"].value;
        const host = document.getElementById('contact-form');
        const effectTime = 7500;
        switch(signal) {
            case "Healing": {
                setTimeout(() => { 
                    alert(`${name} was healed.`);
                    this.resetForm();
                }, effectTime - 1000);
                await this.healing.play(host, { duration: effectTime });
                break;
            }
            case "Support": {
                setTimeout(() => {
                    alert(`${name} was supported by a destruction spell.`);
                    this.resetForm();
                }, 4000);
                await this.destruction.play(host, { duration: 4000 });
                break;
            }
            case "Software Development": {
                alert(`${name}, you chose Software Development. Let me show you the real me...`);
                setTimeout(() => {
                    navigation.navigate("https://yqni13.com");
                }, 1000);
                break;
            }
            case "Danger": {
                setTimeout(() => {
                    alert(`${name} escaped through the portal.`)
                    this.resetForm();
                }, effectTime);
                await this.portal.play(host, { duration: effectTime });
                break;
            }
            default:
                console.log("Signal didn't reach the Magician.");
        }
    }
    
    validateForm() {
        const name = this.form.elements["name"].value.trim();
        const signal = this.form.elements["signal"].value;

        if (name.length === 0) {
            alert("Name is required.");
            return false;
        } else if (name.length > 50) {
            alert("Name must be 50 chars or less.");
            return false;
        } else if (signal.length === 0) {
            alert("Choose a signal.");
            return false;
        }

        return true;
    }

    resetForm() {
        this.form.elements["name"].value = "";
        this.form.elements["signal"].value = "";
    }
}
