export {}
// Exercise 1: Check if a number is even or odd
let num: number = 7;
let isEven: boolean = num % 2 === 0;
console.log(`Is ${num} even? ${isEven}`);

// Exercise 2: Check if a string has more than 10 characters
let text: string = "Hello, TypeScript!";
let isLong: boolean = text.length > 10;
console.log(`Is the text longer than 10 characters? ${isLong}`);

// Exercise 3: Verify if a number is positive
let number: number = 5;
let isPositive: boolean = number > 0;
console.log(`Is ${number} positive? ${isPositive}`);

// Exercise 4: Determine if a number is negative or zero
let numCheck: number = -3;
let isNonPositive: boolean = numCheck <= 0;
console.log(`Is ${numCheck} negative or zero? ${isNonPositive}`);

// Exercise 5: Check if a string is empty
let message: string = "";
let isEmpty: boolean = message === "";
console.log(`Is the message empty? ${isEmpty}`);

// Exercise 6: Determine if a number is within a range (10 to 100 inclusive)
let rangeNumber: number = 50;
let isInRange: boolean = rangeNumber >= 10 && rangeNumber <= 100;
console.log(`Is ${rangeNumber} in the range 10-100? ${isInRange}`);

// Exercise 7: Check if a number is either 0 or 100
let specialNumber: number = 100;
let isZeroOrHundred: boolean = specialNumber === 0 || specialNumber === 100;
console.log(`Is ${specialNumber} either 0 or 100? ${isZeroOrHundred}`);

// Exercise 8: Verify if a boolean value is true
let flag: boolean = true;
let isTrue: boolean = flag === true;
console.log(`Is flag true? ${isTrue}`);

// Exercise 9: Check if a number is odd and greater than 50
let oddCheck: number = 53;
let isOddAndLarge: boolean = oddCheck % 2 !== 0 && oddCheck > 50;
console.log(`Is ${oddCheck} odd and greater than 50? ${isOddAndLarge}`);

// Exercise 10: Determine if a string starts with the letter 'A'
let word: string = "Apple";
let startsWithA: boolean = word.startsWith("A");
console.log(`Does "${word}" start with 'A'? ${startsWithA}`);