const fs = require('fs');

const dataByLine = fs.readFileSync('input2.txt').toString().split(/\n/);
let treeData = [];
let isVisible = [];

dataByLine.forEach(function(value, index){
    treeData.push([]);
    isVisible.push([]);
    for (let i = 0; i < value.length; i++) {
        treeData[index].push(parseInt(value[i]));
        isVisible[index].push(false);
    }
});

console.log(treeData);

function sweep(){
    // left to right sweep
    for (let i = 0; i < treeData.length; i++) {
        let highest = 0;
        for (let j = 0; j < treeData.length; j++) {
            if ( highest == 0 || treeData[i][j] > highest ) {
                isVisible[i][j] = true;
                highest = treeData[i][j];
            } 
        }
    }

    // right to left sweep
    for (let i = 0; i < treeData.length; i++) {
        let highest = 0;
        for (let j = treeData.length - 1; j >= 0; j--) {
            if ( highest == 0 || treeData[i][j] > highest ) {
                isVisible[i][j] = true;
                highest = treeData[i][j];
            } 
        }
    }

    // top to bottom sweep
    for (let j = 0; j < treeData.length; j++) {
        let highest = 0;
        for (let i = 0; i < treeData.length; i++) {
            if ( highest == 0 || treeData[i][j] > highest ) {
                isVisible[i][j] = true;
                highest = treeData[i][j];
            } 
        }
    }

    // bottom to top sweep
    for (let j = 0; j < treeData.length; j++) {
        let highest = 0;
        for (let i = treeData.length - 1; i >= 0; i--) {
            if ( highest == 0 || treeData[i][j] > highest ) {
                isVisible[i][j] = true;
                highest = treeData[i][j];
            } 
        }
    }

}

function countVisible(){
    const gridLength = isVisible.length;
    let sum = 0;
    for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
            if (isVisible[i][j] == true) {
                sum += 1;
            }
        }
    }
    return sum;
}

// console.log(isVisible);
sweep();
console.log(isVisible);

console.log(countVisible());