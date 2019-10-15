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

    getFieldsError() {
        const errors = [];
        for (const [id, field] of this.fields) {
            if (field.hasError()) {
                errors.push(id);
            }
        }
        return errors;
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

/*
usage: new FieldValidator(inputDOMElement)
        .on('event')
        .validate(validatorFn, param1, param2, ...).errorMessage()
        .validate...
        .on('event2')
        .validate...
        .validMessage('valid!');

it will create an <small> for display error at initialization
untouched: data-validate
valid input value: data-validate=valid
invalid input value: data-validate=invalid
*/
class FieldValidator {
    constructor(inputElement) {
        this.inputElement = inputElement;
        this.messageElement = null;
        this.initMessageElement();
        this.resetValidateState();

        this._validExecute = undefined;
        this._validMessage = "";
        this.event = "change";
        this.validatorFnListenerMap = new Map();
    }

    initMessageElement() {
        this.messageElement = document.createElement("SMALL");
        this.inputElement.parentNode.insertBefore(this.messageElement, this.inputElement.nextSibling);
    }

    /*
    switch event-type for listener
    previous validate execute when old event trigger, not this new event
    */
    on(event) {
        this.event = event;
        return this;
    }

    /*
    add an validator that execute (in turn) when event trigger
    */
    validateBy(func, ...args) {
        let existedListeners = this.validatorFnListenerMap.get(this.event);
        if (!existedListeners) {
            /*
            if we use this.event inside addEventListener's listener,
            it will use current this.event value, not the event that fired
            */
            const firedEvent = this.event;
            this.validatorFnListenerMap.set(this.event, []);
            this.inputElement.addEventListener(this.event, evt => {
                const listeners = this.validatorFnListenerMap.get(firedEvent);
                for (const listener of listeners) {
                    if (!listener.validator()) {
                        // only change message, not re-toggle if error already exist
                        this.toggleValidateState(false);
                        this.messageElement.innerText = listener.error;
                        if (listener.execute) listener.execute(evt);
                        return;
                    }
                }
                this.messageElement.innerText = this._validMessage;
                if (this._validExecute) this.validExecute(evt);
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

    /*
    set data-validate on input element and error element
    if input is valid: data-validate="valid"
    if input is valid: data-validate="invalid"
    */
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

    /*
    set an error message for the latest validator listener of
    current event
    */
    errorMessage(message) {
        const listeners = this.validatorFnListenerMap.get(this.event);
        if (listeners && listeners.length > 0) {
            const lastIndex = listeners.length - 1;
            listeners[lastIndex].error = message;
        }
        return this;
    }

    /*
    set an function that execute when latest validator listener of
    current event fail
    */
    errorExecute(func) {
        const listeners = this.validatorFnListenerMap.get(this.event);
        if (listeners && listeners.length > 0) {
            const lastIndex = listeners.length - 1;
            listeners[lastIndex].execute = func;
        }
        return this;
    }

    /*
    set the message when the input value pass all validator
    */
    validMessage(message) {
        this._validMessage = message;
        return this;
    }

    validExecute(func) {
        this._validExecute = func;
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

    /*
    reset data-validate value
    */
    resetValidateState() {
        this.messageElement.dataset.validate = "";
        this.inputElement.dataset.validate = "";
    }

    setError(message) {
        this.toggleValidateState(false);
        this.messageElement.innerText = message;
    }
}
