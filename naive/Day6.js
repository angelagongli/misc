// Day 6: Tuning Trouble

const fs = require("fs");

const rawData = fs.readFileSync('data/datastreamBuffers.txt', (err, data) => {
    if (err) {
        console.log("Error reading datastreamBuffers.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
for (let i = 0; i < rawArr.length; i++) {
    let recentFour = {};
    for (let j = 0; j < rawArr[i].length; j++) {
        if (recentFour[rawArr[i].charAt(j)]) {
            recentFour[rawArr[i].charAt(j)]++;
        } else {
            recentFour[rawArr[i].charAt(j)] = 1;
        }
        if (j > 3) {
            if (recentFour[rawArr[i].charAt(j - 4)] > 1) {
                recentFour[rawArr[i].charAt(j - 4)]--;
            } else {
                delete recentFour[rawArr[i].charAt(j - 4)];
            }
        }
        if (Object.entries(recentFour).length > 3) {
            console.log(`${rawArr[i]}: FOUND first marker after character ${j + 1}`);
            break;
        }
    }
}
