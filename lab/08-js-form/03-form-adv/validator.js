class InputValidator {
    constructor(id) {
        this.input = document.getElementById(id);
        this.message = document.getElementById(`${id}-error`);
        this.input.addEventListener("change", () => this.validate());

        this.errorMessage = "Invalid";
        this.validMessage = "";
        this.validateFns = [];
    }

    validate() {
        this.errorMessage = "";
        this.validateFns.forEach(fn => fn());
        if (this.hasError()) {
            this.input.dataset.validate = "invalid";
            this.message.dataset.validate = "invalid";
            this.message.innerText = this.errorMessage;
        } else {
            this.input.dataset.validate = "valid";
            this.message.dataset.validate = "valid";
            this.message.innerText = this.validMessage;
        }
    }

    hasError() {
        // cast string to boolean, then put one more !
        // to reverse the boolean value
        return !!this.errorMessage;
    }

    setErrorMessage(message) {
        this.errorMessage = message;
    }

    setValidMessage(message) {
        this.validMessage = message;
    }

    required(message) {
        this.validateFns.push(() => {
            if (!this.input.value) {
                this.setErrorMessage(message);
            }
        });
        return this;
    }
}

class TextInputValidator extends InputValidator {
    constructor(id) {
        super(id);
    }

    notBlank(message) {
        this.validateFns.push(() => {
            if (!this.input.value.trim()) {
                this.setErrorMessage(message);
            }
        });
        return this;
    }

    matchPattern(pattern, message) {
        this.validateFns.push(() => {
            if (!this.input.value.match(pattern)) {
                this.setErrorMessage(message);
            }
        });
        return this;
    }

    maxLength(max, message) {
        this.validateFns.push(() => {
            if (this.input.value > max) {
                this.setErrorMessage(message);
            }
        });
        return this;
    }

    minLength(min, message) {
        this.validateFns.push(() => {
            if (this.input.value < min) {
                this.setErrorMessage(message);
            }
        });
        return this;
    }

    isEmail(message) {
        this.validateFns.push(() => {
            const emailRegex = /^\w+@\w+(\.\w+)+\s*$/;
            if (!this.input.value.match(emailRegex)) {
                this.setErrorMessage(message);
            }
        });
        return this;
    }
}
