interface Person {
    name: string;
    lastName: string;
    age: number;
    email: string;
    phoneNumber: number;
}

// Step 2: Create TypeScript interface "PersonInfo" extending "Person"
interface PersonInfo extends Person {
    country?: string;
    greeting?: () => string;
}

// Step 3: Create an object of type "Person"
const person1: Person = {
    name: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    phoneNumber: 1234567890
};

// Step 4: Create an object of type "PersonInfo"
const person2: PersonInfo = {
    name: "Jane",
    lastName: "Smith",
    age: 28,
    email: "jane.smith@example.com",
    phoneNumber: 9876543210,
    country: "USA",
    greeting: () => "Welcome to TypeScript!"
};

console.log(person1);
console.log(person2);
if (person2.greeting) console.log(person2.greeting());
