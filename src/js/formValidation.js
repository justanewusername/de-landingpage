export default class FormValidation {
    static emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    static nameRegex = /^[a-zA-Z ]{2,30}$/;

    static setInputErrorState(input, isValid = true) {
        input.classList.toggle("error_input", !isValid);
    }

    static isEmailValid(input) {
        return !!FormValidation.emailRegex.exec(input.value);
    }

    static isUsernameValid(input) {
        return !!FormValidation.nameRegex.exec(input.value);
    }

    static isDefaultInputValid(input) {
        return !!input.value.length;
    }

    static checkInputs(inputs = []) {
        const isInputValid = (input) => {
            const validationType = input.getAttribute("data-js-input");
            switch (validationType) {
                case "email":
                    return FormValidation.isEmailValid(input);
                case "username":
                    return FormValidation.isUsernameValid(input);
                default:
                    return FormValidation.isDefaultInputValid(input);
            }
        };
        return inputs
            .map((el) => {
                const isValid = isInputValid(el);
                FormValidation.setInputErrorState(el, isValid);
                return isValid;
            })
            .every((isValid) => !!isValid);
    }
}
