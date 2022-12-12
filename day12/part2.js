const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);
let lines = [],
    elevations = [],
    stepsToVisitTemplate = [],
    start = [], 
    end = [],
    finalScorePerStartPoint = [];

dataByLine.forEach(function(value){
    if (value !== '') {
        lines.push(value);
    }
});

// Build elevations grid and mark S and E for start and end
lines.forEach(function(value, index){
    elevations.push([]);
    stepsToVisitTemplate.push([]);
    for (let i = 0; i < value.length; i++){
        const currentLetter = value[i];
        elevations[index].push(currentLetter);
        stepsToVisitTemplate[index].push(0);
        if (currentLetter == "S" || currentLetter == "a") {
            start.push([index,i])
        } else if (currentLetter == "E"){
            end = [index,i];
        }
    }
});

// For each starting point, build a queue of places to visit adjacent to where you are currently
// Visit those places and keep track of the number of steps to the end
start.forEach(function(value){
    let toVisit = [value];
    let stepsToVisit = structuredClone(stepsToVisitTemplate);
    while (toVisit.length > 0) {
        const current = toVisit.shift();
        checkNextSquares(current[0], current[1], stepsToVisit, toVisit);
    }
    const stepsToReachEnd = stepsToVisit[end[0]][end[1]]
    if (stepsToReachEnd > 0) {
        finalScorePerStartPoint.push(stepsToReachEnd);
    }
});

console.log(Math.min(...finalScorePerStartPoint));

function checkNextSquares(x, y, stepsToVisit, toVisit){

    const north = [x-1, y];
    const east = [x, y+1];
    const south = [x+1, y];
    const west = [x, y-1];

    const directions = [north, east, south, west];

    directions.forEach(function(value){
        const newX = value[0];
        const newY = value[1];
        if (isPossibleToVisit(x, y, newX, newY) && stepsToVisit[newX][newY] == 0){
            stepsToVisit[newX][newY] = stepsToVisit[x][y] + 1;
            toVisit.push([newX, newY]);
        }
    });

}

function isPossibleToVisit(x0, y0, x1, y1){
    return withinGrid(x1,y1) && canReach(x0, y0, x1, y1);
}

function withinGrid(x, y) {
    return x >= 0 && 
            y >= 0 && 
            x < elevations.length && 
            y < elevations[0].length;
}

function canReach(x0, y0, x1, y1){
    let startPoint = elevations[x0][y0];
    let endPoint = elevations[x1][y1];
    if (startPoint == "S") {
        startPoint = "a";
    }
    if (endPoint == "E") {
        endPoint = "z";
    }
    return getValue(endPoint) <= getValue(startPoint) + 1;
}

function getValue(letter){
    const alphabetValueString = "0abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabetValueString.length; i++) {
        if (letter == alphabetValueString[i]) {
            return i;
        }
    }
}