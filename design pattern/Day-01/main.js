//These classes define the specific behavior for different student types.
class undergraduated {
  constructor(name) {
    this.name = name;

    this.type = "undergraduated";
  }
  study() {
    return `${this.name} is studying core modules`;
  }
}

class postgraduated {
  constructor(name) {
    this.name = name;
    this.type = "postgraduated";
  }
  study() {
    return `${this.name} is studying advanced modules`;
  }
}









//The factory encapsulates the logic.
// The rest of your app doesn't need to know which class name to call; it just provides a string or a type.
class StudentFactory {
    static instanse = null; 
constructor() { 
    // shared layer for all students
    if (StudentFactory.instanse) {
        return StudentFactory.instanse; 
    }
this.count = 0;
//save current instance of factory to static propertyto ensure that only one instance exists (singleton pattern)
StudentFactory.instanse = this;
}
   createStudent(name, type) {
    let student;
    if (type.toLowerCase() === "undergraduated") {
student = new undergraduated(name);
    } else if (type.toLowerCase() === "postgraduated") {
      student = new postgraduated(name);
    } else {
      throw new Error("Invalid student type");
    }
     this.count++;
    return student
  }
  getStudentCount() {       
    return `Total students created: ${this.count}`;
  } 
}




//prevent direct instantiation of student classes and centralize the creation logic in the factory.
//prevent Tight Coupling
//provide a single point of maintenance for student creation logic, making it easier to manage and extend in the future.
try {
    const factory1 = new StudentFactory();
    const factory2 = new StudentFactory();
    console.log(factory1 === factory2); // Output: true (both variables point to the same instance)
  const student1 = factory1.createStudent("Alice", "undergraduated");
  console.log(student1.study()); // Output: Alice is studying core modules

  const student2 = factory2.createStudent("Bob", "postgraduated");
  console.log(student2.study()); // Output: Bob is studying advanced modules
  const student3 = factory1.createStudent("Charlie", "postgraduated");
  console.log(student3.study()); // Output: Charlie is studying advanced modules

  console.log(`Are factories identical? ${factory1 === factory2}`); // true
  console.log(factory1.getStudentCount()); // Output: Total students created: 3
} catch (error) {
  console.error(error.message);
}
