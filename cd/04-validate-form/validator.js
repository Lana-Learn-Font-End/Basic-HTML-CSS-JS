function notBlank(str) {
    if (str) {
        return str.trim();
    }
    return false;
}

function is(str, value) {
    return str === value;
}
