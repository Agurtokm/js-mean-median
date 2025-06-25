// product_check.js for programming assignment 2

// Load the tool that lets us read text typed in the console.
const readline = require('readline');

// Set up the connection between the console and our program.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Make a list to keep the numbers people give us.
const numbers = [];

// Ask the user to type a number or 'q' to stop.
rl.setPrompt('Please enter a whole number (or "q" to finish): ');
rl.prompt();

// Each time the user types something, check what it is.
rl.on('line', (input) => {
  // If they typed 'q', stop asking for more.
  if (input.trim().toLowerCase() === 'q') {
    rl.close(); // Go to the next step below
    return;
  }

  // Turn what they typed into a number.
  const n = parseInt(input, 10);

  // If it was not a valid number, show an error.
  if (Number.isNaN(n)) {
    console.error('That is not a valid number. Please try again.');
  } else {
    // If it was a number, add it to our list and say what we got.
    numbers.push(n);
    console.log('Got number:', n);
  }

  // Ask again for the next input.
  rl.prompt();
});

// When the user is done, look for two numbers whose product matches a third.
rl.on('close', () => {
  // Assume we haven't found a match yet.
  let found = false;

  // Try each pair of numbers (i and j) and compare to each possible number (k).
  for (let i = 0; i < numbers.length && !found; i++) {
    for (let j = i + 1; j < numbers.length && !found; j++) {
      for (let k = 0; k < numbers.length; k++) {
        // Make sure we're not using the same number twice.
        if (k !== i && k !== j) {
          if (numbers[i] * numbers[j] === numbers[k]) {
            console.log(`Yes! ${numbers[i]} × ${numbers[j]} = ${numbers[k]}`);
            found = true;
            break;
          }
        }
      }
    }
  }

  // If we did not find any match, tell the user.
  if (!found) {
    console.log('No matching product found.');
  }

  // End the program.
  process.exit(0);
});
