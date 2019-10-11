class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [[]];
        this.fill();
    }

    fill(value = 0) {
        for (let row = 0; row < this.rows; row++) {
            this.data[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.data[row][col] = value;
            }
        }
    }

    /**
     * Execute callback function on each value of matrix
     * @param callback function that take current value as argument
     */
    forEach(callback) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                callback(this.data[row][col]);
            }
        }
    }
}


function sumDiagonal(matrix) {
    let mainDiagonalSum = 0;
    let subDiagonalSum = 0;
    if (matrix.rows === matrix.cols) {
        for (let i = 0; i < matrix.rows; i++) {
            mainDiagonalSum += matrix.data[i][i];
        }
        for (let i = 0; i < matrix.rows; i++) {
            const col = matrix.cols - i - 1;
            subDiagonalSum += matrix.data[i][col];
        }
        return {mainDiagonalSum, subDiagonalSum}
    }
}

function sumEven(matrix) {
    let sum = 0;
    matrix.forEach(value => {
        if (value % 2 === 0) {
            sum += value;
        }
    });
    return sum;
}

function getMultipleOf3And5(matrix) {
    const multipleOf3And5 = [];
    matrix.forEach(value => {
        if (value !== 0 && isMultipleOf3And5(value)) {
            multipleOf3And5.push(value);
        }
    });
    return multipleOf3And5;
}

function isMultipleOf3And5(number) {
    return number % 3 === 0 && number % 5 === 0;
}
