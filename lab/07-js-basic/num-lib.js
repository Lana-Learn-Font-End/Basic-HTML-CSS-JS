function isNumber(value) {
    // cover falsy value such as null, undefined, empty string...
    // cover 0 value is also falsy, but it is a valid number
    if (value === 0 || value) {
        return !isNaN(Number(value));
    }
    return false;
}

function promptNumber(message) {
    while (true) {
        const input = prompt(message);
        if (isNumber(input))
            return Number(input);
        else
            alert(`"${input}" is not a number`);
    }
}
