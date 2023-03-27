// Day 8: Treetop Tree House

const fs = require("fs");

const rawData = fs.readFileSync('data/treeMap.txt', (err, data) => {
    if (err) {
        console.log("Error reading treeMap.txt: " + err.message);
    }
});
const rawArr = rawData.toString().split("\n");
let treeMap = rawArr.map(e => e.trim().split(""));
let visibleCount = (treeMap.length + treeMap[0].length) * 2 - 4;
for (let i = 1; i < Math.ceil(treeMap.length / 2); i++) {
    for (let j = 1; j < Math.ceil(treeMap[i].length / 2); j++) {
        let treesToLookFor = [[i,j]];
        if (treeMap.length - 1 != i * 2) {
            treesToLookFor.push([treeMap.length - 1 - i,j]);
            if (treeMap[i].length - 1 != j * 2) {
                treesToLookFor.push([i,treeMap[i].length - 1 - j]);
                treesToLookFor.push([treeMap.length - 1 - i,treeMap[i].length - 1 - j]);
            }
        } else {
            if (treeMap[i].length - 1 != j * 2) {
                treesToLookFor.push([i,treeMap[i].length - 1 - j]);
            }
        }
        treesToLookFor.forEach(e => {
            let x = parseInt(e[0]);
            let y = parseInt(e[1]);
            let treeHeight = treeMap[x][y];
            let northernTallerCount = 0;
            let southernTallerCount = 0;
            let easternTallerCount = 0;
            let westernTallerCount = 0;
            for (let i = 0; i < treeMap.length; i++) {
                if (i < x && treeMap[i][y] >= treeHeight) {
                    northernTallerCount++;
                } else if (i == x && northernTallerCount == 0) {
                    break;
                } else if (i > x && treeMap[i][y] >= treeHeight) {
                    southernTallerCount++;
                }
            }
            for (let j = 0; j < treeMap[0].length; j++) {
                if (j < y && treeMap[x][j] >= treeHeight) {
                    westernTallerCount++;
                } else if (j == y && westernTallerCount == 0) {
                    break;
                } else if (j > y && treeMap[x][j] >= treeHeight) {
                    easternTallerCount++;
                }
            }
            if (northernTallerCount == 0 || southernTallerCount == 0 ||
                easternTallerCount == 0 || westernTallerCount == 0) {
                    visibleCount++;
            }
        });
    }
}
console.log(visibleCount);
