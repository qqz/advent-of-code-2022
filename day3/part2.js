const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);
const alphabetValueString = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const elvesPerGroup = 3;
let elfGroups = [[]];
let elvesInGroup = 0;
let total = 0;

dataByLine.forEach( function( value ) {
    if (value !== '') {
        elfGroups[elfGroups.length - 1].push(value);
        elvesInGroup++;
        if (elvesInGroup == elvesPerGroup) {
            elvesInGroup = 0;
            elfGroups.push([]);
        }
    }
});

elfGroups = elfGroups.filter(x => x.length > 0);

elfGroups.forEach(function(elfGroup){
    // Keep track of whether letter occurs for each elf in associative arrays. 
    // For simplicty, first elf will be at index 0, second at index 1, and third at index 2
    elfValues = [ {}, {}, {} ]; 
    
    elfGroup.forEach(function(elfString, elfIndex){
        
        for (let i = 0; i < elfString.length; i++) {
            const value = elfString[i];
            elfValues[elfIndex][value] = true;
        }
    })

    // i here is also the value of the letter
    for (let i = 0; i < alphabetValueString.length; i++) {
        let currentLetter = alphabetValueString[i];
        if ( elfValues[0][currentLetter] == true && 
             elfValues[1][currentLetter] == true &&
             elfValues[2][currentLetter] == true) {
                
                total += i;
                break;
        }
    }
})

console.log(total);