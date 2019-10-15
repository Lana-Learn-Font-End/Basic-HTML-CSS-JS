class FormValidator {
    constructor(formElement) {
        this.element = formElement;
        const inputs = Array.from(this.element.querySelectorAll("input[id]"));
        this.fields = new Map(inputs.map(e => [e.id, new FieldValidator(e)]));
    }

    hasError() {
        for (const field of this.fields.values()) {
            if (field.hasError()) {
                return true;
            }
        }
        return false;
    }

    validate() {
        for (const field of this.fields.values()) {
            field.validate();
        }
    }

    resetValidateState() {
        for (const field of this.fields.values()) {
            field.resetValidateState();
        }
    }
}

class FieldValidator {
    constructor(inputElement) {
        this.inputElement = inputElement;
        this.messageElement = null;
        this.initMessageElement();
        this.resetValidateState();

        this.event = "change";
        this.validatorFnListenerMap = new Map();
    }

    initMessageElement() {
        this.messageElement = document.createElement("SMALL");
        this.inputElement.parentNode.insertBefore(this.messageElement, this.inputElement.nextSibling);
    }

    on(event) {
        this.event = event;
        return this;
    }

    validateBy(func, ...args) {
        let existedListeners = this.validatorFnListenerMap.get(this.event);
        if (!existedListeners) {
            const firedEvent = this.event;
            this.validatorFnListenerMap.set(this.event, []);
            this.inputElement.addEventListener(this.event, evt => {
                const listeners = this.validatorFnListenerMap.get(firedEvent);
                for (const listener of listeners) {
                    if (!listener.validator()) {
                        this.toggleValidateState(false);
                        this.messageElement.innerText = listener.error;
                        if (listener.execute) listener.execute(evt);
                        return;
                    }
                }
                this.toggleValidateState(true);
            });
        }
        existedListeners = this.validatorFnListenerMap.get(this.event);
        existedListeners.push({
            validator: () => func(this.inputElement.value, ...args),
            error: "",
            execute: undefined
        });
        return this;
    }

    toggleValidateState(isValid) {
        const previousError = this.hasError();
        if (isValid) {
            if (previousError) {
                this.inputElement.dataset.validate = "valid";
                this.messageElement.dataset.validate = "valid";
            }
        } else if (!previousError) {
            this.inputElement.dataset.validate = "invalid";
            this.messageElement.dataset.validate = "invalid";
        }
    }

    errorMessage(message) {
        const listeners = this.validatorFnListenerMap.get(this.event);
        if (listeners && listeners.length > 0) {
            const lastIndex = listeners.length - 1;
            listeners[lastIndex].error = message;
        }
        return this;
    }

    errorExecute(func) {
        const listeners = this.validatorFnListenerMap.get(this.event);
        if (listeners && listeners.length > 0) {
            const lastIndex = listeners.length - 1;
            listeners[lastIndex].execute = func;
        }
        return this;
    }

    validate() {
        const events = this.validatorFnListenerMap.keys();
        for (const eventType of events) {
            this.inputElement.dispatchEvent(new Event(eventType));
        }
    }

    hasError() {
        return this.inputElement.dataset.validate === "invalid";
    }

    resetValidateState() {
        this.messageElement.dataset.validate = "";
        this.inputElement.dataset.validate = "";
    }

    setError(message) {
        this.toggleValidateState(false);
        this.messageElement.innerText = message;
    }
}
