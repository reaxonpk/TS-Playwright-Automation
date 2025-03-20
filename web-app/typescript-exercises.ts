// Exercise One
// Step One: Declare TypeScript interface "Country"
interface Country {
    name: string;
    capital: string;
    population: number;
    language: string;
}

// Step Two: Declare an object "country" with properties following "Country" interface
const country: Country = {
    name: "France",
    capital: "Paris",
    population: 67390000,
    language: "French"
};

// Step Three: Declare a function "displayCountryDetails" which receives "country" object
// and displays the details for it
function displayCountryDetails(country: Country): void {
    console.log(`Country: ${country.name}`);
    console.log(`Capital: ${country.capital}`);
    console.log(`Population: ${country.population}`);
    console.log(`Language: ${country.language}`);
}

// Call the function to display details
displayCountryDetails(country);

// Exercise Two
// Step One: Declare TypeScript interface "Student"
interface Student {
    id: number;
    name: string;
    age: number;
    grade: number;
}

// Step Two: Declare an object with properties following interface "Student"
const student1: Student = {
    id: 1,
    name: "David",
    age: 21,
    grade: 88
};

const student2: Student = {
    id: 2,
    name: "Emma",
    age: 23,
    grade: 92
};

const student3: Student = {
    id: 3,
    name: "Sophia",
    age: 20,
    grade: 85
};

// Step Three: Declare array "students" with objects of type "Student"
const students: Student[] = [student1, student2, student3];

// Step Four: Declare a function "getStudents" and pass the array students as parameter
// return only students' names as a result
function getStudents(students: Student[]): string[] {
    return students.map(student => student.name);
}

// Call and display result
console.log(getStudents(students));

// Exercise Three
// Declare a function "sortStudents" that receives students array result from the previous exercise
// and sorts them in ascending order
function sortStudents(students: Student[]): Student[] {
    return students.sort((a, b) => a.grade - b.grade);
}

// Call and display sorted students
console.log(sortStudents(students));