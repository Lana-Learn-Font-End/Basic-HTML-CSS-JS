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
                this.data[row][col] = 0;
            }
        }
    }
}

function getInputTable(matrix) {
    const table = document.createElement("TABLE");
    table.id = "id";
    for (let row = 0; row < matrix.rows; row++) {
        const tr = table.insertRow(row);
        for (let col = 0; col < matrix.cols; col++) {
            const cell = tr.insertCell(col);
            const input = document.createElement("INPUT");
            input.value = matrix.data[row][col];
            input.onkeyup = () => {
                if (isNumber(input.value)) {
                    matrix.data[row][col] = Number(input.value);
                    input.style.color = "black";
                } else {
                    matrix.data[row][col] = 0;
                    input.style.color = "red";
                }
            };
            cell.appendChild(input);
        }
    }
    return table;
}

function extractSize(string) {
    // get fist 2 numbers that separate by "x"
    const size = string
        .split("x")
        .filter(value => isNumber(value));
    return {rows: Number(size[0]), cols: Number(size[1])}
}

function isValid(input) {
    // this regex test input format "number x number"
    return input.trim().match(/^(\d+\s*x\s*\d+)/g);
}

