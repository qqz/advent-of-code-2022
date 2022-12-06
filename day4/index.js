const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);

var set1 = [], 
    set2 = [];

dataByLine.forEach( function( value ) {
    if (value !== '') {
        const splitByComma = value.split(',');
        set1.push(getTwoHyphenatedNumbers(splitByComma[0]));
        set2.push(getTwoHyphenatedNumbers(splitByComma[1]));
    }
});

let total = 0;

for (let i = 0; i < set1.length; i++) {
    if ( isContainedBy(set1[i], set2[i]) ) {
        total += 1;
    }
}

console.log(total);

function isContainedBy(array1, array2){
    if( array1[0] <= array2[0] && array1[1] >= array2[1] ||   // If array2 is completely contained in array1
        array2[0] <= array1[0] && array2[1] >= array1[1] )    // or array1 is completely contained in array2
        return true;
}

function getTwoHyphenatedNumbers(string){
    return string.split('-').map(x => parseInt(x));
}