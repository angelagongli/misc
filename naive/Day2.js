// Day 2: Rock Paper Scissors

const fs = require("fs");

const rawData = fs.readFileSync('data/rockPaperScissors.txt', (err, data) => {
    if (err) {
        console.log("Error reading rockPaperScissors.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let score = 0;
for (let i = 0; i < rawArr.length; i++) {
    let [opp, self] = rawArr[i].split(/\s/);
    if (opp == 'A') {
        console.log("Opp plays Rock");
        if (self == 'X') {
            console.log("I play Rock");
            score += 4;
        } else if (self == 'Y') {
            console.log("I play Paper");
            score += 8;
        } else {
            console.log("I play Scissors");
            score += 3;
        }
    } else if (opp == 'B') {
        console.log("Opp plays Paper");
        if (self == 'X') {
            console.log("I play Rock");
            score += 1;
        } else if (self == 'Y') {
            console.log("I play Paper");
            score += 5;
        } else {
            console.log("I play Scissors");
            score += 9;
        }
    } else {
        console.log("Opp plays Scissors");
        if (self == 'X') {
            console.log("I play Rock");
            score += 7;
        } else if (self == 'Y') {
            console.log("I play Paper");
            score += 2;
        } else {
            console.log("I play Scissors");
            score += 6;
        }
    }
    console.log(`Round ${i + 1}: ${score}`);
}
console.log("Final score: " + score);
