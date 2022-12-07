const fs = require('fs');
const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);

var stackDataByLineStrings = [];
var stackDataReferenceLine; // The line that reads 1 2 3 4 5... separating information about the stacks and information about the moves
var moveDataByLineStrings = [];
var indexesOfStacks;        // Index 1 will be at indexesOfStacks[1],  etc.
var stackData = [[]];       // Stack 1 data will be at stackData[1], etc.
var moveData = [];          // Move data for each move in format: [ X, Y, Z ] "move X from Y to Z"

dataByLine.forEach(function(value){
    if (value !== '') {    
        // If we haven't hit the stack data reference line yet 
        if (!stackDataReferenceLine) {
            if (isStackReferenceLine(value)) {
                stackDataReferenceLine = value;   // set stack data reference line # if this is 1 2 3 4 5...
            } else {
                stackDataByLineStrings.push(value);     // otherwise, add to stack data
            }
        }
        // Otherwise, we have already passed the stack data reference line. Add to move information
        else { 
            moveDataByLineStrings.push(value);
        }
    }
})

indexesOfStacks = getIndexesOfStacks(stackDataReferenceLine);

indexesOfStacks.forEach(function(indexValue, index) {
    stackData.push([]);
    for (let i = stackDataByLineStrings.length - 1; i >= 0; i--) {
        const letterToAdd = stackDataByLineStrings[i][indexValue];
        if (letterToAdd !== ' ' && letterToAdd !== '['){
            stackData[index].push(letterToAdd);
        }
    }
})

moveDataByLineStrings.forEach(function(moveString){
    moveData.push(moveString.match(/[\d]+/g)); // use regex to pull out move numbers
})

moveData.forEach(function(value){
    for (let i = 0; i < value[0]; i++){
        moveYtoZ(value[1], value[2]);
    }
});

console.log(getTopCrates());

function isStackReferenceLine(string){
    return string.split(/[ ]*/).filter(x => x !== '')[0] == 1; 
}

function getIndexesOfStacks(referenceLine) {
    const indexes = [0];
    for (let i = 0; i < referenceLine.length; i++) {
        if (referenceLine[i] !== " ") {
            indexes.push(i);
        }
    }
    return indexes;
}

function moveYtoZ(y, z) {
    const itemToMove = stackData[y].pop();
    stackData[z].push(itemToMove);
}

function getTopCrates() {
    let topCratesString = "";
    for (let i = 0; i < stackData.length; i++) {
        const topItem = stackData[i].pop();
        if (topItem){
            topCratesString += topItem;
        }
    }
    return topCratesString;
}