
 // Task 1: Interfaces a
 
interface User {
    name: string;
    age: number; 
}


const user1: User = {
    name: "Mohammed Sayed Radwan",
    age: 25
};




 //Task 2: Optional Properties
 
interface Profile {
    username?: string; 
    email?: string;    
}


const myProfile: Profile = {
    username: "mohamed",
    email: "mohammed@gmail.com"
};
console.log(myProfile);




// Task 3: Literal Types & Union Types
 

type Directions = "top" | "left" | "bottom" | "right";

function movePlayer(direction: Directions): void {
    console.log(`Action: Moving the player towards the ${direction}.`);
}


movePlayer("top");

// Calling movePlayer("north") would fail here because "north" 
// is not part of the AllowedDirections type, ensuring type safety.