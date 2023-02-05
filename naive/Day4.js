// Day 4: Camp Cleanup

const fs = require("fs");

const rawData = fs.readFileSync('data/sectionAssignmentPairs.txt', (err, data) => {
    if (err) {
        console.log("Error reading sectionAssignmentPairs.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let fullyContainCount = 0;
for (let i = 0; i < rawArr.length; i++) {
    let [ sec1, sec2 ] = rawArr[i].split(",");
    let [ x1, y1 ] = sec1.split("-");
    let [ x2, y2 ] = sec2.split("-");
    if ((x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1)) {
        fullyContainCount++;
    }
}
console.log(fullyContainCount);
