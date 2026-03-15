abstract class Shape {
    abstract calculateArea(): number;
}

class Circle extends Shape {
    constructor(public radius: number) { super(); }
    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

const myCircle = new Circle(10);
console.log(myCircle.calculateArea());