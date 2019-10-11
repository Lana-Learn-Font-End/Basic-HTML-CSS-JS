class InputValidator {
    constructor(inputElement) {
        this.input = inputElement;
        this.errors = {}
    }

    isBlank(message) {
        return !input.value.trim();
    }

    isEmail(message) {
        return input.value.match(/^\w+@\w+(\.\w+)+\s*$/);
    }

    isNumber(message) {
        const value = input.value;
        if (value === 0 || value) {
            return !isNaN(Number(value));
        }
        return false;
    }
}
