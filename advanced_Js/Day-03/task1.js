class Person {
  constructor(name = "new person") {
    this.name = name;
  }
  getInfo() {
    return this.name;
  }
}

// class student
class Student extends Person {
  static counter = 0;
  #grades = [];
  constructor(name) {
    super(name);
    Student.counter++;
    this.id = Math.floor(100 + Math.random() * 900);
    // super made this of std obj refer to parent class (person)
  }
  setGrade(grade) {
    this.#grades.push(grade);
  }
  // Add a method getAverage()
  getAverage() {
    let sum = 0;
    this.#grades.forEach((grade) => {
      sum += grade;
    });
    return sum / this.#grades.length;
  }

  //Add a method getFinalGrade() that returns A, B, C, D, or F
  getFinalGrade() {
    let avg = this.getAverage();
    let finalGrade = "";
    if (avg >= 90) {
      finalGrade = "A";
    } else if (avg >= 80) finalGrade = "B";
    else if (avg >= 70) finalGrade = "C";
    else if (avg >= 60) finalGrade = "D";
    else finalGrade = "F";

    return finalGrade;
  }
  // overwrite here
  getInfo() {
    // super.getInfo() بتروح تجيب الاسم من كلاس Person
    // this.getFinalGrade() بتجيب الحرف (A, B, C...) من نفس الكلاس
    return `${super.getInfo()} - Final Grade: ${this.getFinalGrade()}`;
  }
}

let st1 = new Student("Ahmed");
let st2 = new Student("Sara");
let st3 = new Student("Yassin");

st1.setGrade(95);
st1.setGrade(90);
st1.setGrade(100);

st2.setGrade(80);
st2.setGrade(85);
st2.setGrade(75);

st3.setGrade(60);
st3.setGrade(65);
st3.setGrade(62);

console.log(st1.getInfo());
console.log(st2.getInfo());
console.log(st3.getInfo());

console.log("num of students " + Student.count);

//crud operation
let studentDatabase = [];
// add students
function createStudent(name) {
  let newStudent = new Student(name);
  studentDatabase.push(newStudent);
  console.log(`${name} added successed`);

  return newStudent.id;
}
function getAllStudent() {
  studentDatabase.forEach((student) => {
    console.log(student.getInfo());
  });
}

function getStudentById(id) {
  let found = studentDatabase.find((std) => std.id === Number(id));
  return found ? found : "student not found";
}

function updateStudentGrades(id, grade) {
  let student = getStudentById(id);
  if (typeof student !== "string") {
    student.setGrade(grade);
    console.log(
      `student ${student.name} updated grade with ${grade} successed `,
    );
  } else {
    console.log(student);
  }
}
function deleteStudent(id) {
  studentDatabase = studentDatabase.filter((std) => std.id !== id);
  console.log("student deleted successed");
}

let ahmedID = createStudent("Ahmed");
let SaraID = createStudent("Sara");

updateStudentGrades(ahmedID, 90);
updateStudentGrades(SaraID, 80);
updateStudentGrades(ahmedID, 100);

getAllStudent(); 

deleteStudent(ahmedID);
getAllStudent(); 
