let words = ["put", "your", "words", "here"];
words = words.map(word => word.toUpperCase());
let maxLength = 0;
let connectors = [];

for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
        maxLength = words[i].length;
    }
    // How do I steer clear of collision?
    for (let j = 0; j < words.length; j++) {
        if (i != j) {
            for (let k = 0; k < words[i].length; k++) {
                if (words[j].indexOf(words[i].charAt(k)) != -1) {
                    connectors.push(new Array(i, j, words[i].charAt(k)));
                }
            }
        }
    }
}

// Give the longest word plenty of room
let bareMatrix = [];
for (let i = 0; i < maxLength * 2 + 1; i++) {
    bareMatrix[i] = [];
    for (let j = 0; j < maxLength * 2 + 1; j++) {
        bareMatrix[i].push(".");
    }
}

// Helper
function printMatrix(matrix) {
    console.log("Printing...");
    for (let i = 0; i < matrix.length; i++) {
        let row = "";
        for (let j = 0; j < matrix[i].length; j++) {
            row += matrix[i][j];
        }
        console.log(row);
    }
}

// Allowable orientation list by quadrant/axis
let orientationList = [
    ["W2E", "E2W", "N2S", "S2N", "NW2SE", "SE2NW", "SW2NE", "NE2SW"],
    ["E2W", "N2S", "NE2SW"],
    ["W2E", "N2S", "NW2SE"],
    ["W2E", "S2N", "SW2NE"],
    ["E2W", "S2N", "SE2NW"],
    ["W2E", "N2S", "S2N", "NW2SE", "SW2NE"],
    ["E2W", "N2S", "S2N", "SE2NW", "NE2SW"],
    ["W2E", "E2W", "N2S", "NW2SE", "NE2SW"],
    ["W2E", "E2W", "S2N", "SE2NW", "SW2NE"]
];

function addWord(word, orientation, x1, y1) {
    let x = x1;
    let y = y1;
    let dx = 0;
    let dy = 0;
    if (["W2E", "NW2SE", "SW2NE"].includes(orientation)) {
        dy = 1;
        if (orientation == "NW2SE") {
            dx = 1;
        } else if (orientation == "SW2NE") {
            dx = -1;
        }
    } else if (["E2W", "SE2NW", "NE2SW"].includes(orientation)) {
        dy = -1;
        if (orientation == "SE2NW") {
            dx = -1;
        } else if (orientation == "NE2SW") {
            dx = 1;
        }
    } else if (orientation == "N2S") {
        dx = 1;
    } else if (orientation == "S2N") {
        dx = -1;
    }
    console.log(`bareMatrix[${x}][${y}]: ${word.charAt(0)}`);
    bareMatrix[x][y] = word.charAt(0);
    for (let k = 1; k < word.length; k++) {
        console.log(`bareMatrix[${x + dx}][${y + dy}]: ${word.charAt(k)}`);
        bareMatrix[x + dx][y + dy] = word.charAt(k);
        x += dx;
        y += dy;
    }
}

// Attach/insert words into the word find one by one
for (let i = 0; i < words.length; i++) {
    // Generate the coords of the first letter
    let x = Math.floor(Math.random() * (maxLength * 2 + 1));
    let y = Math.floor(Math.random() * (maxLength * 2 + 1));
    // Then depending on what quadrant 1-4/axis the first letter lands in/on,
    // Generate the word's orientation accordingly
    let quadrant = 0; // Origin
    if (x < maxLength && y > maxLength) {
        quadrant = 1;
    } else if (x < maxLength && y < maxLength) {
        quadrant = 2;
    } else if (x > maxLength && y < maxLength) {
        quadrant = 3;
    } else if (x > maxLength && y > maxLength) {
        quadrant = 4;
    } else if (x == maxLength && y < maxLength) {
        quadrant = 5; // Western x-axis
    } else if (x == maxLength && y > maxLength) {
        quadrant = 6; // Eastern x-axis
    } else if (x < maxLength && y == maxLength) {
        quadrant = 7; // Northern y-axis
    } else if (x > maxLength && y == maxLength) {
        quadrant = 8; // Southern y-axis
    }
    let orientation = orientationList[quadrant][Math.floor(Math.random() * orientationList[quadrant].length)];
    console.log(`Adding word ${words[i]} to bareMatrix at (${x},${y})
    [quadrant ${quadrant}] in ${orientation} direction...`);
    addWord(words[i], orientation, x, y);
    printMatrix(bareMatrix);
}

// Pad the bare matrix full of filler letters
let fullMatrix = [];
for (let i = 0; i < maxLength * 2 + 1; i++) {
    fullMatrix[i] = [];
    for (let j = 0; j < maxLength * 2 + 1; j++) {
        if (bareMatrix[i][j] != ".") {
            fullMatrix[i].push(bareMatrix[i][j]);
        } else {
            fullMatrix[i].push(String.fromCharCode('A'.charCodeAt() + Math.floor(Math.random() * 26)));
        }
    }
}
printMatrix(fullMatrix);

// Pretty print the word find filled up with filler letters
function prettyPrint(matrix) {
    console.log("Pretty printing...");
    for (let i = -1; i < matrix.length + 1; i++) {
        let row = "";
        // It's always a square, so just measure by one side and make sure array index isn't off by one
        for (let j = -1; j < matrix.length + 1; j++) {
            if (i == -1 || i == matrix.length || j == -1 || j == matrix.length) {
                row += "* ";
            } else {
                row += matrix[i][j] + " ";
            }
        }
        console.log(row);
    }
}
prettyPrint(fullMatrix);

// Do not put word list as the message is a surprise to find, just put what part of speech every word is?
