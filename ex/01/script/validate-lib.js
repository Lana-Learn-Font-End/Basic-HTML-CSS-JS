class FormValidator {
    constructor(formElement) {
        this.element = formElement;
        this._fields = Array
            .from(this.element.querySelectorAll("input, textarea, select"))
            .map(e => new FieldValidator(e));
    }

    on(type, listener) {
        this.element.addEventListener(type, listener);
    }

    fields(selector) {
        const fieldElements = Array.from(this.element.querySelectorAll(selector));
        return this._fields.filter(field => fieldElements.includes(field.element));
    }

    field(selector) {
        const fieldElement = this.element.querySelector(selector);
        return this._fields.find(field => field.element === fieldElement);
    }

    validate() {
        this._fields.forEach(field => field.validate());
    }

    hasError() {
        return !!this._fields.find(field => field.hasError());
    }

    getErrors() {
        return this._fields
            .filter(field => field.hasError())
            .map(errField => errField.message);
    }

    getErrorFunctions() {
        return this._fields
            .filter(field => field.hasError())
            .map(errField => errField.validateFunction);
    }

    resetValidateState() {
        this._fields.forEach(field => field.resetValidateState());
    }
}

class FieldValidator {
    constructor(inputElement) {
        this.element = inputElement;
        this.message = "";
        this.validateFunction = undefined;
        this.validateFns = [];
        this.validateMsg = [];
        this.resetValidateState();
    }

    on(type, listener) {
        this.element.addEventListener(type, listener);
        return this;
    }

    validateBy(fn, msg = "") {
        if (fn) {
            this.validateFns.push(fn);
            this.validateMsg.push(msg);
        }
        return this;
    }

    validate() {
        for (let i = 0; i < this.validateFns.length; i++) {
            const fn = this.validateFns[i];
            const msg = this.validateMsg[i];
            if (!fn(this.element.value)) {
                this.toggleValidateState(false);
                this.message = msg;
                this.validateFunction = fn;
                return;
            }
        }
        this.toggleValidateState(true);
        this.message = "";
        this.validateFunction = undefined;
    }

    setError(message) {
        this.toggleValidateState(false);
        this.message = message;
    }

    hasError() {
        return this.element.dataset.validate === "invalid";
    }

    toggleValidateState(isValid) {
        if (isValid) {
            if (this.hasError())
                this.element.dataset.validate = "valid";
            this.element.dispatchEvent(new Event("valid"));
        } else if (!isValid) {
            if (!this.hasError())
                this.element.dataset.validate = "invalid";
            this.element.dispatchEvent(new Event("invalid"));
        }
    }

    resetValidateState() {
        this.validateFunction = undefined;
        this.element.dataset.validate = "";
        this.message = "";
    }
}


function element(selector) {
    return document.querySelector(selector);
}

function elements(selector) {
    return Array.from(document.querySelectorAll(selector));
}
