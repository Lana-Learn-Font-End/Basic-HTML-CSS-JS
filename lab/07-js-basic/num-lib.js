function isNumber(value) {
    // cover falsy value such as null, undefined, empty string...
    // cover 0 value is also falsy, but it is a valid number
    if (value === 0 || value) {
        return !isNaN(Number(value));
    }
    return false;
}
