class ErrorElement {
    constructor(element) {
        this.element = element;
    }

    setErrorMessage(message) {
        this.element.innerText = message;
    }

    clearErrorMessage(message) {
        this.element.innerText = "";
    }

    isActive() {
        if (this.element.innerText)
            return true;
        return false;
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

function isNumber(value) {
    if (value === 0 || value) {
        return !isNaN(Number(value));
    }
    return false;
}
