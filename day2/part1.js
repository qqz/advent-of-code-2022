const fs = require('fs');

const dataByLine = fs.readFileSync('rps.txt').toString().split(/\n/);

let us = []; // array of all our moves
let them = []; // array of all their moves

dataByLine.forEach( function( value ) {
    if (value !== '') {
        us.push(value[2]);
        them.push(value[0]);
    }
});

// Points you get for selecting Rock, Paper, or Scissors
function getSelectionPoints() {
    let sum = 0;
    us.forEach( function( value ) {
        switch (value) {
            case "X":
                sum += 1;
                break;
            case "Y":
                sum += 2;
                break;
            case "Z":
                sum += 3;
                break;
        }
    });
    return sum;
}

// Points you get for outcome being win, lose, or draw
function getOutcomePoints() {
    let sum = 0;
    for ( let i = 0; i < us.length; i++ ){
        sum += getOutcomePointsPerRound( us[i], them[i] );
    }
    return sum;
}

function getOutcomePointsPerRound(ourMove, theirMove) {
    if (ourMove == "X") {
        switch (theirMove) {
            case "A": 
                return 3;
            case "B":
                return 0;
            case "C":
                return 6;
        }
    } else if (ourMove == "Y") {
        switch (theirMove) {
            case "A": 
                return 6;
            case "B":
                return 3;
            case "C":
                return 0;
        }
    } else if (ourMove == "Z") {
        switch (theirMove) {
            case "A": 
                return 0;
            case "B":
                return 6;
            case "C":
                return 3;
        }
    }
}

const total = getSelectionPoints() + getOutcomePoints();
console.log(total);