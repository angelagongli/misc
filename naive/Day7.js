// Day 7: No Space Left On Device

const fs = require("fs");

const rawData = fs.readFileSync('data/terminalOutput.txt', (err, data) => {
    if (err) {
        console.log("Error reading terminalOutput.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let dir = "";
let allDirs = [];
let folderStructure = {};
for (let i = 0; i < rawArr.length; i++) {
    if (/^\W/.test(rawArr[i].charAt(0))) {
        // This only works if the user (me in the puzzle prompt) only ever moves
        // one level at a time, which I apparently do
        if (rawArr[i].substring(2,4) == "cd") {
            if (rawArr[i].includes("..")) {
                dir = dir.substring(0, dir.lastIndexOf("/"));
            } else {
                if (rawArr[i].substring(5).trim() == "/") {
                    dir = "/";
                    allDirs.push(dir);
                    folderStructure[dir] = 0;
                } else {
                    dir += (dir == "/" ? "" : "/") + rawArr[i].substring(5).trim();
                }
            }
        }
    } else {
        if (rawArr[i].substring(0,3) == "dir") {
            allDirs.push(rawArr[i].substring(4).trim());
            folderStructure[dir + (dir == "/" ? "" : "/") + rawArr[i].substring(4).trim()] = 0;
        } else {
            folderStructure[dir] += parseInt(rawArr[i].split(" ")[0]);
        }
    }
}
let sumFolderStructure = {};
for (let i = 0; i < allDirs.length; i++) {
    let j = allDirs[i];
    let sumOfSizes = 0;
    for (let folder in folderStructure) {
        if (folder.includes(j)) {
            sumOfSizes += folderStructure[folder];
        }
    }
    sumFolderStructure[j] = sumOfSizes;
}
let sumAllSmallDirs = allDirs.reduce((accumulator, current) =>
    accumulator + (sumFolderStructure[current] <= 100000 ? sumFolderStructure[current] : 0),
    0);
console.log(sumAllSmallDirs);
