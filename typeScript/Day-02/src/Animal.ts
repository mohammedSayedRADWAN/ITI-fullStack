// task2
class Animal {
    protected name: string;
    constructor(name: string) { this.name = name; }
    protected makeSound(): void { console.log("Some sound"); }
}

class Dog extends Animal {
    constructor(name: string) { super(name); }
    public makeSound(): void {
        console.log("Woof! My name is " + this.name);
    }
}

const myDog = new Dog("Rex");
myDog.makeSound(); // Woof! My name is Rex

// task3

class Person {
    readonly id: number;
    constructor(id: number) { this.id = id; }
}

const p = new Person(101);
// p.id = 102; // Error: Cannot assign to 'id' because it is a read-only property.


// task4
class MathUtils {
    static PI: number = 3.14;
    static calculateCircumference(radius: number): number {
        return 2 * this.PI * radius;
    }
}

console.log(MathUtils.calculateCircumference(5)); // 31.4

