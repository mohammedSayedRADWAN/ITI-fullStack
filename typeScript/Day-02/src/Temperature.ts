//task6
class Temperature {
    private _celsius: number = 0;

    get celsius(): number { return this._celsius; }

    set celsius(value: number) {
        if (value < -273.15) throw new Error("Below absolute zero!");
        this._celsius = value;
    }
}

const temp = new Temperature();
temp.celsius = 25; 
console.log(temp.celsius); // 25





















// task7
class Employee {
    constructor(
        readonly id: number,
        private salary: number,
        protected department: string
    ) {}

    public getDetails(): string {
        return `ID: ${this.id}, Dept: ${this.department}`;
    }
}

class Manager extends Employee {
    private teamSize: number;
    constructor(id: number, salary: number, dept: string, teamSize: number) {
        super(id, salary, dept);
        this.teamSize = teamSize;
    }

    public getDetails(): string {
        return `${super.getDetails()}, Team Size: ${this.teamSize}`;
    }
}

const mng = new Manager(1, 5000, "IT", 10);
console.log(mng.getDetails());



// Task 8: Generic Class
class Box<T> {
    private value: T | undefined;
    setValue(val: T) { this.value = val; }
    getValue(): T | undefined { return this.value; }
}

const numBox = new Box<number>();
numBox.setValue(100);

// Task 9: Generic Function
function identity<T>(arg: T): T {
    return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(42));

//task 10

const colors: Record<"red" | "green" | "blue", string> = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
};

console.log(colors.red); // #FF0000