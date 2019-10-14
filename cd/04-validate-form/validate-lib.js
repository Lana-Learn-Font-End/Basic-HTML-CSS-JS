/*
usage: new FieldValidator(inputDOMElement)
        .on('event')
        .validate(validatorFn, param1, param2, ...).message()
        .validate...
        .on('event2')
        .validate...
        [.setValidMessage('valid!')];

it will create an <small> for display error at initialization
untouched: data-validate
valid input value: data-validate=valid
invalid input value: data-validate=invalid
*/
class FieldValidator {
    constructor(input) {
        this.inputElement = input;
        this.messageElement = null;
        this.initMessageElement();
        this.resetValidateState();

        this.validMessage = "";
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
    validate(func, ...args) {
        let existedListeners = this.validatorFnListenerMap.get(this.event);
        if (!existedListeners) {
            /*
            if we use this.event inside addEventListener's listener,
            it will use current this.event value, not the event that fired
            */
            const firedEvent = this.event;
            this.validatorFnListenerMap.set(this.event, []);
            this.inputElement.addEventListener(this.event, () => {
                const listeners = this.validatorFnListenerMap.get(firedEvent);
                for (const listener of listeners) {
                    if (!listener.validator()) {
                        this.messageElement.innerText = listener.errorMessage;
                        this.toggleValidateState(false);
                        return;
                    }
                }
                this.messageElement.innerText = this.validMessage;
                this.toggleValidateState(true);
            })
        }
        existedListeners = this.validatorFnListenerMap.get(this.event);
        existedListeners.push({
            validator: () => func(this.inputElement.value, ...args),
            errorMessage: "",
        });
        return this;
    }

    /*
    set data-validate on input element and error element
    if input is valid: data-validate="valid"
    if input is valid: data-validate="invalid"
    */
    toggleValidateState(isValid) {
        if (isValid) {
            this.inputElement.dataset.validate = "valid";
            this.messageElement.dataset.validate = "valid";
        } else {
            this.inputElement.dataset.validate = "invalid";
            this.messageElement.dataset.validate = "invalid";
        }
    }

    /*
    set an error message for the latest validator listener of
    current event
    */
    message(message) {
        const listeners = this.validatorFnListenerMap.get(this.event);
        if (listeners && listeners.length > 0) {
            const lastIndex = listeners.length - 1;
            listeners[lastIndex].errorMessage = message;
        }
        return this;
    }

    /*
    set the message when the input value pass all validator
    */
    setValidMessage(message) {
        this.validMessage = message;
        return this;
    }

    hasError() {
        return this.inputElement.dataset === "invalid";
    }

    /*
    reset data-validate value
    */
    resetValidateState() {
        this.messageElement.dataset.validate = "";
        this.inputElement.dataset.validate = "";
    }
}
