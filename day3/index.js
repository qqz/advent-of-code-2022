const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);
const contents = [];

dataByLine.forEach( function( value ) {
    if (value !== '') {
        contents.push(value);
    }
});

let sum = 0;

contents.forEach( function(line) {
    const halfIndex = line.length / 2;
    const firstHalf = line.substring(0, halfIndex);
    const secondHalf = line.substring(halfIndex);
    sum += getValue(findDuplicate(firstHalf, secondHalf));
});

console.log(sum);

function findDuplicate(aString, bString) {
    for ( let i = 0; i < aString.length; i++ ) {
        for ( let j = 0; j< bString.length; j++) {
            if (aString[i] == bString[j]) {
                return aString[i];
            }
        }
    }
}

function getValue(letter){
    const alphabetValueString = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < alphabetValueString.length; i++) {
        if (letter == alphabetValueString[i]) {
            return i;
        }
    }
}