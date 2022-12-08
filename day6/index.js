const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);
const datastream = dataByLine[0];

function getMarkerIndex(markerLength) {
    for (let startLetterIndex = 0; startLetterIndex < datastream.length; startLetterIndex++) {
        let values = {};
        let noDuplicates;
        for (let j = 0; j < markerLength; j++) {
            const currentLetter = datastream[startLetterIndex + j];
            if (values[currentLetter]) {
                noDuplicates = false;
                break;
            } else {
                values[currentLetter] = true;
            }
        }

        if (noDuplicates !== false) {
            return startLetterIndex + markerLength;
        }
    }
}

console.log('Part 1: ', getMarkerIndex(4));
console.log('Part 2: ', getMarkerIndex(14));