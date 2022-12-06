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

let total1 = 0, total2 = 0;

for (let i = 0; i < set1.length; i++) {
    if ( isContainedBy(set1[i], set2[i]) ) {
        total1 += 1;
    }
    if ( overlaps(set1[i], set2[i])) {
        total2 += 1;
    }
}

console.log("Part 1: contained by total", total1);
console.log("Part 2: any overlap total", total2);

function isContainedBy(array1, array2){
    if( array1[0] <= array2[0] && array1[1] >= array2[1] ||   // If array2 is completely contained in array1
        array2[0] <= array1[0] && array2[1] >= array1[1] )    // or array1 is completely contained in array2
        return true;
}

function overlaps(array1, array2) {
    if (array1[1] < array2[0] ||
        array1[0] > array2[1] ) {
            return false;
    }
    else {
        return true;
    }
}

function getTwoHyphenatedNumbers(string){
    return string.split('-').map(x => parseInt(x));
}