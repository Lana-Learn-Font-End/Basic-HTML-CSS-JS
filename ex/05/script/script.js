const form = new FormValidator(document.getElementById("form"));

form.allField()
    .forEach(field => field.validateBy(notBlank, "Xin điền trường này"));
form.field("#date")
    .validateBy(isValidDate, "Ngày không hợp lệ");
form.fields("[id$=person]")
    .forEach(field => field.validateBy(allUppercase, "Tên phải viết hoa toàn bộ"));
form.fields("[id^=mail]")
    .forEach(field =>
        field
            .validateBy(isMoreThan20Char, "Quá ngắn, yêu cầu ít nhất 21 kí tự")
            .validateBy(isContainsBothNumberAndAlphabet, "Cần phải chứa cả kí tự và số")
    );

form.on("submit", (event) => {
    event.preventDefault();
    form.validate();
    if (form.hasError()) {
        renderAllErrorMessage(form);
    } else {
        form.element.submit();
    }
});

form.on("reset", () => {
    form.resetValidateState();
    renderAllErrorMessage(form);
});
