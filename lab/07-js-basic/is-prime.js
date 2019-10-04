"use strict";

function isPrime(number) {
    if (number >= 2) {
        const maxPossible = Math.round(Math.sqrt(number));
        for (let i = 2; i <= maxPossible; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
    return false;
}
