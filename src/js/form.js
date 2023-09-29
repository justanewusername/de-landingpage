import "../styles/messageForm.pcss";
import FormValidation from "./formValidation";

export default class Form {
    static errorTextSelector = "#js-error-text";

    constructor(selector, callback, url) {
        this.url = url;
        this.instance = document.querySelector(selector);
        this.inputs = [...this.instance.querySelectorAll("[data-js-input]")];

        if (this.instance) {
            this.instance.addEventListener("submit", (e) =>
                this.#onSubmit(e, callback)
            );
        }
    }

    static async send(formData, url) {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error();
        }
        return await response.text();
    }

    #onSubmit(e, callback) {
        e.preventDefault();
        if (FormValidation.checkInputs(this.inputs)) {
            let formData = new FormData();
            this.inputs.forEach((item) => {
                formData.append(
                    item.getAttribute("data-js-input"),
                    item.getAttribute("data-js-input").value
                );
            });

            const btnElement = this.instance.querySelector("[data-js-submit]");
            btnElement.disabled = true;

            Form.send(formData, this.url)
                .then(() => {
                    this.instance.reset();
                    this.instance.querySelector(
                        Form.errorTextSelector
                    ).innerText = " ";
                    callback();
                })
                .catch((e) => {
                    this.instance.querySelector(
                        Form.errorTextSelector
                    ).innerText = "Problems submitting the form";
                })
                .finally(() => {
                    btnElement.disabled = false;
                });
        }
    }
}
