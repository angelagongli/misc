// Day 3: Rucksack Reorganization

const fs = require("fs");

const rawData = fs.readFileSync('data/rucksackContents.txt', (err, data) => {
    if (err) {
        console.log("Error reading rucksackContents.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let priorityAll = 0;
let found;
for (let i = 0; i < rawArr.length; i++) {
    let halfway = rawArr[i].length/2;
    let compartment1 = [];
    let compartment2 = [];
    for (let j = 0; j < halfway; j++) {
        let item1 = rawArr[i].charAt(j);
        let item2 = rawArr[i].charAt(halfway + j);
        if (compartment2.includes(item1)) {
            found = item1;
        } else if (compartment1.includes(item2)) {
            found = item2;
        } else {
            compartment1.push(item1);
            compartment2.push(item2);
        }
        if (found) {
            if (found == found.toLowerCase()) {
                priorityAll += found.charCodeAt() - "a".charCodeAt() + 1;
            } else {
                priorityAll += found.charCodeAt() - "A".charCodeAt() + 27;
            }
            found = null;
            break;
        }
    }
}
console.log(priorityAll);
