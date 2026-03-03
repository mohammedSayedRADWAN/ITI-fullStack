class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  getAnualSalary() {
    return this.salary * 12;
  }
  getInfo() {
    return `Name: ${this.name} - Annual Salary: ${this.getAnualSalary()}`;
  }
  static getTotalPayout(employees) {
    let total = 0;
    employees.forEach((employee) => {
      total += employee.getAnualSalary();
    });
    return total;
  }
}

class Manager extends Employee {
  constructor(name, salary, Bouns) {
    super(name, salary);
    this.Bouns = Bouns;
  }
  getAnualSalary() {
    return super.getAnualSalary() + this.Bouns;
  }
  getInfo() {
    return `Manger: ${this.name} - Annual Salary: ${this.getAnualSalary()}`;
  }
}

let e1 = new Employee("Hassan", 5000);
let e2 = new Manager("Mona", 10000, 5000);

let staff = [e1, e2];

console.log(e1.getInfo());
console.log(e2.getInfo());

console.log("Total Company Payout: " + Employee.getTotalPayout(staff));
