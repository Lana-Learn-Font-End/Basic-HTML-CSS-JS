function isEmail(str) {
    return str.match(/^\w+@\w+(\.\w+)+\s*$/);
}

function notBlank(str) {
    return !!str.trim();
}

function matchPattern(str, pattern) {
    return str.match(pattern);
}

function isNumber(str) {
    if (str === 0 || str) {
        return !isNaN(Number(str));
    }
    return false;
}

function maxLength(str, max) {
    return str.length <= max;
}

function minLength(str, min) {
    return str.length >= min;
}

function notEmpty(str) {
    return !!str;
}
