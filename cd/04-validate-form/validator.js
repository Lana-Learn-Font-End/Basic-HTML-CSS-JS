function isEmail(str) {
    if (str) {
        return str.match(/^\w+@\w+(\.\w+)+\s*$/);
    }
    return false;
}

function notBlank(str) {
    if (str) {
        return str.trim();
    }
    return false;
}
