const form = new FormValidator(document.getElementById("form"));

form.allField()
    .forEach(field => field.validateBy(notBlank, "Xin điền trường này"));

form.field("#date")
    .validateBy(isValidDate, "Ngày không hợp lệ");

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
});
