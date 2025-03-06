export {}
// 1. Create an array of strings and add a new element at the end of the array. Log the result.
let fruits: string[] = ["apple", "banana", "cherry"];
fruits.push("orange");
console.log("Updated fruits array:", fruits);

// 2. Create an array of numbers and remove the first element from the array. Log the result.
let numbers: number[] = [10, 20, 30, 40, 50];
numbers.shift();
console.log("Updated numbers array:", numbers);

// 3. Use the map method to create a new array and divide each number by 2  “num / 2”   from [1, 2, 3, 4, 5].  Log the result.
let dividedNumbers: number[] = [1, 2, 3, 4, 5].map(num => num / 2);
console.log("Numbers divided by 2:", dividedNumbers);

// 4. UUse the filter method to create a new array containing only numbers greater than 5 from [3, 7, 1, 9, 12, 4]. Log the result.
let filteredNumbers: number[] = [3, 7, 1, 9, 12, 4].filter(num => num > 5);
console.log("Numbers greater than 5:", filteredNumbers);

// 5. Use the sort method to sort an array of numbers [9, 3, 7, 2, 8, 5] in ascending order. Log the result.
let sortedNumbers: number[] = [9, 3, 7, 2, 8, 5].sort((a, b) => a - b);
console.log("Sorted numbers:", sortedNumbers);

// 6. Use the slice method to extract the first three elements from ['apple', 'banana', 'cherry', 'date', 'elderberry']. Log the result.
let someFruits: string[] = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
let slicedFruits: string[] = someFruits.slice(0, 3);
console.log("Sliced fruits:", slicedFruits);

// 7. Use the splice method to remove the second and third elements from ['car', 'bike', 'bus', 'train', 'boat'] . Log the result.
let vehicles: string[] = ['car', 'bike', 'bus', 'train', 'boat'];
vehicles.splice(1, 2); // Removes 'bike' and 'bus'
console.log("Updated vehicles array:", vehicles);

// 8. Write a function named “findLargest” that takes three numbers as parameters and returns the largest of them. Use if/else statement to find the largest number. Log the result.
function findLargest(a: number, b: number, c: number): number {
    if (a >= b && a >= c) return a;
    else if (b >= a && b >= c) return b;
    else return c;
}
console.log("Largest number:", findLargest(12, 25, 9));

// 9. FWrite a function “convertToCentimeters”  which receives parameter “inches” and add default value it and convert to centimeters. Log the result with default parameter and with passed parameter.
function convertToCentimeters(inches: number = 1): number {
    return inches * 2.54;
}
console.log("Default conversion (1 inch):", convertToCentimeters());
console.log("Custom conversion (10 inches):", convertToCentimeters(10));

// 10. Write a function named “calculateArea” that takes a required width parameter and an optional height parameter. If height is not provided, assume the shape is a square.
function calculateArea(width: number, height?: number): number {
    return height ? width * height : width * width;
}
console.log("Square area (5x5):", calculateArea(5));
console.log("Rectangle area (5x10):", calculateArea(5, 10));