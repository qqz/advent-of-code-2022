const fs = require('fs');

const dataByLine = fs.readFileSync('rps.txt').toString().split(/\n/);

let them = []; // array of all their moves
let desiredOutcome = [];

dataByLine.forEach( function( value ) {
    if (value !== '') {
        them.push(value[0]);
        desiredOutcome.push(value[2]);
    }
});

// Points you get for selecting Rock, Paper, or Scissors
function getSelectionPoints() {
    let sum = 0;
    for (let i = 0; i < them.length; i++) {
        if (them[i] == "A") { // they selected Rock
            switch (desiredOutcome[i]) {
                case "X": // you want to lose, select Scissors
                    sum += 3;
                    break;
                case "Y": // you want to draw, select Rock
                    sum += 1;
                    break;
                case "Z": // you want to win, select Paper
                    sum += 2;
                    break;
            }
        } else if (them[i] == "B") { // they selected Paper
            switch (desiredOutcome[i]) {
                case "X": // you want to lose, select Rock
                    sum += 1;
                    break;
                case "Y": // you want to draw, select Paper
                    sum += 2;
                    break;
                case "Z": // you want to win, select Scissors
                    sum += 3;
                    break;
            }
        } else if (them[i] == "C") { // they selected Scissors
            switch (desiredOutcome[i]) {
                case "X": // you want to lose, select Paper
                    sum += 2;
                    break;
                case "Y": // you want to draw, select Scissors
                    sum += 3;
                    break;
                case "Z": // you want to win, select Rock
                    sum += 1;
                    break;
            }
        }
    }
    return sum;
}

// Points you get for outcome being win, lose, or draw
function getOutcomePoints() {
    let sum = 0;
    for ( let i = 0; i < desiredOutcome.length; i++ ){
        switch (desiredOutcome[i]) {
            case "X":
                sum += 0;
                break;
            case "Y": // you want to draw, select Scissors
                sum += 3;
                break;
            case "Z": // you want to win, select Rock
                sum += 6;
                break;
        }
    }
    return sum;
}

const total = getSelectionPoints() + getOutcomePoints();
console.log(total);