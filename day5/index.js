const fs = require('fs');
const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);

var stackDataByLineStrings = [];
var stackDataReferenceLine; // The line that reads 1 2 3 4 5... separating information about the stacks and information about the moves
var moveDataByLineStrings = [];
var indexesOfStacks;        // Index 1 will be at indexesOfStacks[1],  etc.
var stackData9000 = [[]];   // Stack 1 data will be at stackData[1], etc.
var stackData9001 = [[]];
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
    stackData9000.push([]);
    stackData9001.push([]);
    for (let i = stackDataByLineStrings.length - 1; i >= 0; i--) {
        const letterToAdd = stackDataByLineStrings[i][indexValue];
        if (letterToAdd !== ' ' && letterToAdd !== '['){
            stackData9000[index].push(letterToAdd);
            stackData9001[index].push(letterToAdd);
        }
    }
})

moveDataByLineStrings.forEach(function(moveString){
    moveData.push(moveString.match(/[\d]+/g)); // use regex to pull out move numbers
})

// Part 1: CrateMover 9000
moveData.forEach(function(value){
    for (let i = 0; i < value[0]; i++){
        moveYtoZ(value[1], value[2], stackData9000);
    }
});

console.log('Part 1: ', getTopCrates(stackData9000));

// Part 2: CrateMover 9001
moveData.forEach(function(value){
    moveXofYtoZ(value[0], value[1], value[2], stackData9001);
});
console.log('Part 2: ', getTopCrates(stackData9001));

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

function moveYtoZ(y, z, stackData) {
    const itemToMove = stackData[y].pop();
    stackData[z].push(itemToMove);
    return stackData;
}

function moveXofYtoZ(x, y, z, stackData) {
    const itemsToMove = stackData[y].slice(-x);
    const newYStack = stackData[y].slice(0, -x);
    stackData[y] = newYStack;
    itemsToMove.forEach(function(value){
        stackData[z].push(value);
    })
    return stackData;
}

function getTopCrates(stackData) {
    let topCratesString = "";
    for (let i = 0; i < stackData.length; i++) {
        const topItem = stackData[i].pop();
        if (topItem){
            topCratesString += topItem;
        }
    }
    return topCratesString;
}