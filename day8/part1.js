const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);
let treeData = [];

dataByLine.forEach(function(value, index){
    treeData.push([]);
    for (let i = 0; i < value.length; i++) {
        treeData[index].push(parseInt(value[i]));
    }
});

function isVisible(i, j){
    if (i == 0 || j == 0 || i == treeData.length - 1 || j == treeData.length - 1) {
        return true;
    }

    if (isVisibleFromLeft(i,j) || isVisibleFromRight(i,j) || isVisibleFromTop(i,j) || isVisibleFromBottom(i,j)) {
        return true;
    }

    return false;
}

function isVisibleFromLeft(i, j){
    for (let n = 0; n < j; n++) {
        if (treeData[i][n] >= treeData[i][j]) {
            return false;
        }
    }
    return true;
}
function isVisibleFromRight(i, j){
    for (let n = treeData.length - 1; n > j; n--) {
        if (treeData[i][n] >= treeData[i][j]) {
            return false;
        }
    }
    return true;
}
function isVisibleFromTop(i, j){
    for (let n = 0; n < i; n++) {
        if (treeData[n][j] >= treeData[i][j]) {
            return false;
        }
    }
    return true;
}
function isVisibleFromBottom(i, j){
    for (let n = treeData.length - 1; n > i; n--) {
        if (treeData[n][j] >= treeData[i][j]) {
            return false;
        }
    }
    return true;
}

function getTotalVisibleTrees(){
    let sum = 0;

    for (let i = 0; i < treeData.length; i++) {
        for (let j = 0; j < treeData[0].length; j++) {
            if (isVisible(i, j) == true) {
                sum = sum + 1;
            }
        }
    }
    return sum;
}

console.log(getTotalVisibleTrees())