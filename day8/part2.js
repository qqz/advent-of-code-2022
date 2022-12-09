const fs = require('fs');

const dataByLine = fs.readFileSync('sample.txt').toString().split(/\n/);
let treeData = [];
let scenicScores = [];

dataByLine.forEach(function(value, index){
    treeData.push([]);
    scenicScores.push([]);
    for (let i = 0; i < value.length; i++) {
        treeData[index].push(parseInt(value[i]));
        scenicScores[index].push(0);
    }
});

let highestScore = 0;

for (var i = 0; i < treeData.length; i++) {
    for (var j = 0; j < treeData.length; j++){
        let scenicScore = treesSeenToLeft(i,j) * treesSeenToRight(i,j) * treesSeenToTop(i,j) * treesSeenToBottom(i,j);
        if (scenicScore > highestScore) {
            highestScore = scenicScore;
        }
    }
}

console.log( highestScore );

function treesSeenToLeft(i, j){
    let sum = 0;
    for (let n = j - 1; n >= 0; n--) {
        if (treeData[i][n] >= treeData[i][j]) {
            return sum + 1;
        } else {
            sum += 1;
        }
    }
    return sum;
}

function treesSeenToRight(i, j) {
    let sum = 0; 
    for (let n = j + 1; n < treeData.length; n++) {
        if (treeData[i][n] >= treeData[i][j]) {
            return sum + 1;
        } else {
            sum += 1;
        }
    }
    return sum;
}
function treesSeenToTop(i, j){
    let sum = 0;
    for (let n = i - 1; n >= 0; n--) {
        if (treeData[n][j] >= treeData[i][j]) {
            return sum + 1;
        } else {
            sum += 1;
        }
    }
    return sum;
}
function treesSeenToBottom(i, j) {
    let sum = 0; 
    for (let n = i + 1; n < treeData.length; n++) {
        if (treeData[n][j] >= treeData[i][j]) {
            return sum + 1;
        } else {
            sum += 1;
        }
    }
    return sum;
}