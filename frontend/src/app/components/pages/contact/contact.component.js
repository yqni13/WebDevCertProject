import { Healing } from "../../common/animation/healing/healing.component.js";

export class Contact {
    constructor() {
        this.form = document.getElementById("contact-form");
        this.healing = new Healing();
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
        const effectTime = 7500;
        switch(signal) {
            case "Healing": {
                setTimeout(() => { 
                    alert(`${name} was healed.`);
                    this.resetForm();
                }, effectTime);
                await this.healing.play(document.getElementById('contact-form'), { duration: effectTime });
                break;
            }
            case "Fight": {
                console.log("Signal: Fight");
                break;
            }
            case "Software Development": {
                alert(`${this.form.elements["name"].value}, you chose Software Development. Let me show you the real me...`);
                setTimeout(() => {
                    navigation.navigate("https://yqni13.com");
                }, 1000);
                break;
            }
            case "Danger": 
            default:
                console.log("Signal: Danger");
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
