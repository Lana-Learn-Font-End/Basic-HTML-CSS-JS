class ErrorElement {
    constructor(element) {
        this.element = element;
    }

    setErrorMessage(message) {
        this.element.innerText = message;
    }

    clearErrorMessage() {
        this.element.innerText = "";
    }

    isActive() {
        return !!this.element.innerText;
    }
}

function isBlank(str) {
    if (str) {
        return !str.trim();
    }
    return true;
}

function isEmail(str) {
    if (str) {
        return str.match(/^\w+@\w+(\.\w+)+\s*$/);
    }
    return false;
}
