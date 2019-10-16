function isEmail(str) {
    return str.match(/^\w+@\w+(\.\w+)+\s*$/);
}

function notBlank(str) {
    return !!str.trim();
}

function allUppercase(str) {
    return str.match(/^[A-Z\s]+$/);
}

function isPhoneNumber(str) {
    return str.match(/^0[19][0-9]{1,9}/);
}
