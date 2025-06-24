const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numbers = [];

function askInput() {
    rl.question("Enter an integer (or 'q' to finish): ", (input) => {
        if (input.toLowerCase() === 'q') {
            if (numbers.length === 0) {
                console.log("No numbers entered. Exiting.");
                rl.close();
                return;
            }
            // Calculate mean
            const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
            
            // Calculate median
            numbers.sort((a, b) => a - b);
            let median;
            if (numbers.length % 2 === 0) {
                median = (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
            } else {
                median = numbers[Math.floor(numbers.length / 2)];
            }
            
            // Display results
            console.log(`Mean: ${mean}`);
            console.log(`Median: ${median}`);
            rl.close();
        } else if (!isNaN(input) && input.trim() !== '') {
            numbers.push(parseInt(input, 10));
            askInput();
        } else {
            console.log("Invalid input. Please enter an integer or 'q' to quit.");
            askInput();
        }
    });
}

// Start the program
askInput();
