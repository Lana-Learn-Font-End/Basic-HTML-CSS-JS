function notBlank(str) {
    return str.trim();
}

function allUppercase(str) {
    return !str.split("").find(char => char !== char.toUpperCase());
}

function isMoreThan20Char(str) {
    return str.length > 20;
}

function isContainsBothNumberAndAlphabet(str) {
    //match string that contain number or alphabet or even unicode
    return !str.match(/[0-9\u00C0-\u024F\u1E00-\u1EFFa-zA-Z]/);
}

function isValidDate(str) {
    // match pattern dd/mm/yyyy or d/m/yyyy
    if (str.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
        const dateValue = str.split("/");
        const year = Number(dateValue[2]);
        const month = Number(dateValue[1]);
        const date = Number(dateValue[0]);

        if (isInRange(month, 1, 30) && isInRange(date, 1, 31)) {
            switch (month) {
                case 2:
                    return isLeap(year) ?
                        isInRange(date, 1, 29) :
                        isInRange(date, 1, 28);
                case 4:
                case 6:
                case 9:
                case 11:
                    return isInRange(date, 1, 30);
                default:
                    return isInRange(date, 1, 31);
            }
        }
    }
    return false;
}

function isLeap(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0
        }
        return true;
    }
    return false;
}

function isInRange(value, min, max) {
    return value >= min && value <= max;
}
