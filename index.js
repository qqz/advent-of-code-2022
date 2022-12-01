const fs = require('fs');
const readline = require('readline');

async function getMaxCaloriesFromFileInput() {

  // Read the data from the input file and load this into dataString
  const fileStream = fs.createReadStream('elves.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let dataString = '';
  for await (const line of rl) {
    dataString += line + ',';
  }

  // Split data string by individual elf and prepare an array to keep track of sums
  let stringForEachElf = dataString.split(',,');
  let sumOfEachElf = [];

  // Get the sum for each elf and add to array
  stringForEachElf.forEach(function(elfString){
    const sum = elfString
                .split(',')
                .map(x => parseInt(x))
                .filter(x => isNaN(x) == false)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue, 
                  0
                );
    if ( Number.isInteger(sum) && Number.isNaN(sum) == false){
      sumOfEachElf.push(sum);
    }
  })

  // Get the max of the sums
  const maxCaloriesByOneElf = Math.max.apply( null, sumOfEachElf );
  
  console.log(maxCaloriesByOneElf); // Log answer out to console
}

getMaxCaloriesFromFileInput();