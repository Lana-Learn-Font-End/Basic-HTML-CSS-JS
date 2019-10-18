const form = new FormValidator(document.getElementById("add-content"));
form.field("#order")
    .validateBy(notBlank, "Xin nhập thứ tự hiển thị")
    .validateBy(isNumber, "Thứ tự phải là số có 3 chữ số và nhỏ hơn 99")
    .validateBy(val => maxLength(val, 3), "Thứ tự chỉ được phép tối đa 3 chữ số")
    .validateBy(val => range(val, 0, 99), "Thứ tự phải nằm từ 0 đến 99");
form.field("#name")
    .validateBy(notBlank, "Tên danh mục không được để trống")
    .validateBy(allUppercase, "Tên danh mục phải viết hoa");
form.field("#link")
    .validateBy(notBlank, "Xin điền meta link")
    .validateBy(isLink, "Meta link không hợp lệ");

form.on("submit", (event) => {
    event.preventDefault();
    form.validate();
    if (form.hasError()) {
        alert(form.getErrorMessages()[0]);
    } else {
        form.element.submit();
    }
});
form.on("reset", () => {
    form.resetValidateState();
});


function notBlank(str) {
    return str.trim();
}

function isLink(str) {
    //TODO: match unicode character in str
    return str.trim().match(/\s/);
}


function isNumber(str) {
    if (str === 0 || str) {
        return !isNaN(Number(str));
    }
    return false;
}

function maxLength(str, length) {
    return str.length <= length;
}

function range(str, min, max) {
    const number = Number(str);
    return number >= min && number <= max;
}

function allUppercase(str) {
    return str.match(/^[A-Z\s]+$/);
}

