// task1
let x = 10;
let y = 20;

[x, y] = [y, x];

console.log(x); 
console.log(y); 
//end task1

// task2
function getMin_Max(...numbers) {
    //(...) spreed operator to gather all arguments into an array called numbers
    return {
        min: Math.min(...numbers),
        max: Math.max(...numbers)
    };
}
let result= getMin_Max(10, 5, 30, 8)
console.log(result.min); 
console.log(result.max); 
//end task2

// task3
var fruits = ["apple", "strawberry", "banana", "orange", "mango"];
let allStrings = fruits.every(fruit => typeof fruit === "string");

console.log(allStrings); 

// some return true if at least one element in the array satisfies the condition, otherwise it returns false.
let someStartsWithA = fruits.some(fruit => fruit.startsWith("a"));

console.log(someStartsWithA); 
let filteredFruits = fruits.filter(fruit =>
    fruit.startsWith("b") || fruit.startsWith("s")
);

console.log(filteredFruits);


let likedFruits = fruits.map(fruit => `I like ${fruit}`);

console.log(likedFruits);


likedFruits.forEach(fruit => console.log(fruit));
// end task3

function createCourse({ courseName, courseDuration, courseOwner, ...others }) {

    if (Object.keys(others).length > 0) {
        throw new Error("Invalid property detected!");
    }

    console.log(`Course Name: ${courseName}`);
    console.log(`Duration: ${courseDuration}`);
    console.log(`Owner: ${courseOwner}`);
}
createCourse({
    courseName: "JavaScript",
    courseDuration: "3 Months",
    
});

createCourse({
    courseName: "JS",
    courseDuration: "3 Months",
    courseOwner: "Ahmed",
    price: 5000
});


