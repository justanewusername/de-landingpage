import "../styles/popUp.pcss";

export default class PopUp {
    static popupSelector = "#popup";
    static popupContentSelector = "#js-popup-content";

    constructor(contentSelector, btnSelector = null) {
        this.popupElement = this.#createElements(contentSelector);
        if (this.popupElement == null) {
            return;
        }

        this.addListeners(btnSelector);
    }

    // each popup has its own layout
    #createElements(contentSelector) {
        let popupContent = document.createElement("div");
        popupContent.setAttribute("id", "js-popup-content");
        popupContent.classList.add("popup");

        const contentElement = document.querySelector(contentSelector);
        if (contentElement == null) {
            return null;
        }
        popupContent.appendChild(contentElement);
        contentElement.style.display = "flex";

        let popup = document.createElement("div");
        popup.setAttribute("id", "popup");
        popup.appendChild(popupContent);
        popup.classList.add("popup__background");

        popup.style.display = "none";
        document.body.appendChild(popup);
        return popup;
    }

    addListeners(btnSelector) {
        if (btnSelector != null) {
            const btnElement = document.querySelector(btnSelector);
            btnElement.onclick = () => {
                this.show();
            };
        }

        this.popupElement.onclick = (event) => {
            if (event.target !== event.currentTarget) return;
            this.hide();
        };
    }

    show() {
        this.popupElement.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    hide() {
        this.popupElement.style.display = "none";
        document.body.style.overflow = "";
    }
}
