class CalculatorDisplay {
    constructor(selector) {
        this.output = document.querySelector(selector);
    }

    getValue() {
        return this.output.value;
    }

    setValue(value) {
        this.clear();
        this.append(value);
    }

    getLastValue() {
        return this.output.value.slice(-1);
    }

    clear() {
        this.output.value = "0";
    }

    append(value) {
        if (this.isValid(value))
            this.output.value !== "0" ?
                this.output.value += value :
                this.output.value = value;
    }

    isValid(value) {
        value = value.toString();
        return value.match(/[0-9\-+*/]/);
    }
}
