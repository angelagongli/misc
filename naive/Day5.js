// Day 5: Supply Stacks

const fs = require("fs");

const rawData = fs.readFileSync('data/rearrangementProcedure.txt', (err, data) => {
    if (err) {
        console.log("Error reading rearrangementProcedure.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let boundary = rawArr.findIndex(e => e.trim().length == 0);
let stackCount = Math.ceil(rawArr[0].length / 4);
let stacks = new Array(stackCount);
for (let i = 0; i < boundary - 1; i++) {
    for (let j = 0; j < stackCount; j++) {
        if (rawArr[i].charAt(j * 4 + 1) != " ") {
            if (stacks[j]) {
                stacks[j].unshift(rawArr[i].charAt(j * 4 + 1));
            } else {
                stacks[j] = [rawArr[i].charAt(j * 4 + 1)];
            }
        }
    }
}
for (let i = boundary + 1; i < rawArr.length; i++) {
    let procedureArr = rawArr[i].split(/\s/).map(e => parseInt(e));
    let crateCount = procedureArr[1];
    for (let j = 0; j < crateCount; j++) {
        stacks[procedureArr[5] - 1].push(stacks[procedureArr[3] - 1].pop());
    }
}
let topsOfStacks = "";
stacks.forEach(e => topsOfStacks += e[e.length - 1]);
console.log(topsOfStacks);
