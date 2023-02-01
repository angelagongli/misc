// Day 1: Calorie Counting

const fs = require("fs");

const rawData = fs.readFileSync('data/elfCalories.txt', (err, data) => {
    if (err) {
        console.log("Error reading elfCalories.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let i = 0;
let rollupArr = [0];
rawArr.forEach(element => {
    if (Number(element) == 0) {
        i++;
        rollupArr[i] = 0;
    } else {
        rollupArr[i] += parseInt(element);
    }
});
let max = rollupArr.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(max);
