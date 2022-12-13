const fs = require('fs');

const dataByLine = fs.readFileSync('input.txt').toString().split(/\n/);
let packetData  = [[]];

dataByLine.forEach(function(value){

    if (value == ''){
        packetData.push([]);
    }

    if (value !== '') {
        packetData[packetData.length - 1].push(JSON.parse(value));
    }
});

let total = 0;

packetData.forEach(function(value, index){
    if (compareTwoArrays(value[0], value[1]) == true) {
        total += index + 1; // index is +1 since we start at 0
    }
});

console.log(total);

function compareTwoArrays(array1, array2){
    
    console.log('comparing...', array1, array2);

    if ( array1 == undefined && array2 == undefined) {
        return false;
    }
    if (array1 == undefined ) {
        return true;
    }
    if (array2 == undefined) {
        return false;
    }
    // If this is the last item in the array
    if (array1.length == 0) {
        return true;
    }
    if (array2.length == 0) {
        return false
    }

    let head1 = array1[0];
    let head2 = array2[0];

    // if this is not an array
    if (typeof(head1) == 'number') {
        head1 = [head1];
    }
    if (typeof(head2) == 'number') {
        head2 = [head2];
    }

    console.log('heads!', head1, head2); 
    console.log('arrays!', array1, array2);


    console.log('comp! --one more time', array1.length, array2.length);
    if (array1.length == 1 && array2.length == 1 && head1.length > 0 && head2.length > 0) {
        return head1 <= head2;
    }
    
    console.log('second!', head1, head2); 

    array1.shift(); // array1 is now tail
    array2.shift(); // array2 is now tail

    for (let i = 0; i < head1.length; i++){
        console.log('checking ', head1[i]);
        if (typeof(head1[i]) !== 'number' || typeof(head2[i] !== 'number')) {
            console.log('recursing...')
            return compareTwoArrays(head1, head2) && compareTwoArrays(array1,array2);
        }
        if (head2[i] < head1[i]){
            return false;
        }
        if (head1[i] < head2[i]) {
            return true;
        }
    }
    return true;
}

