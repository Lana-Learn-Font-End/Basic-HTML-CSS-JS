class NumberDisplay {
    constructor(displayElement) {
        this.display = displayElement;
    }

    setValue(number) {
        if (isNumber(number)) {
            this.display.innerText = Number(number);
        }
    }

    appendValue(number) {
        if (isNumber(number)) {
            if (this.getValue() === 0)
                this.setValue(number);
            else
                this.display.innerText += number;
        }
    }

    getValue() {
        return Number(this.display.innerText);
    }
}

function isNumber(value) {
    // cover falsy value such as null, undefined, empty string...
    // cover 0 value is also falsy, but it is a valid number
    if (value === 0 || value) {
        return !isNaN(Number(value));
    }
    return false;
}
