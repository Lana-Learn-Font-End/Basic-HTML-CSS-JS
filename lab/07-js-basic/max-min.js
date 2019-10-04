"use strict";

function getMaxMin(numbers) {
    let max, min;
    for (let i = 0; i < numbers.length; i++) {
        if (i === 0) {
            max = numbers[i];
            min = numbers[i];
        }
        if (numbers[i] > max) {
            max = numbers[i];
        }
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    return {max, min}
}
