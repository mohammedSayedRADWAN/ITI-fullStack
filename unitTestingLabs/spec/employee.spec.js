const Employee = require('../Employee');

describe("Employee class", () => {
    let emp;
    beforeEach(() => {
        emp = new Employee("Ahmed", 30, 3);
    });

    describe("calculateSalary", () => {
        it("should return 5000 if yearsOfExp is 5 or less", () => {
            emp.yearsOfExp = 5;
            expect(emp.calculateSalary()).toEqual(5000);
        });

        it("should return 9000 if yearsOfExp is more than 5", () => {
            emp.yearsOfExp = 6;
            expect(emp.calculateSalary()).toEqual(9000);
        });
    });

    describe("setSkills", () => {
        it("should set the skills correctly", () => {
            const skills = ["JavaScript", "Unit Testing", "Jasmine"];
            emp.setSkills(...skills);
            expect(emp.skills).toEqual(skills);
        });

        it("should return the skills array", () => {
            const skills = ["React", "Node"];
            expect(emp.setSkills(...skills)).toEqual(skills);
        });
    });

    describe("requestTimeOff", () => {
        let hrSystem;
        beforeEach(() => {
            hrSystem = {
                validateDays: jasmine.createSpy("validateDays"),
                submitRequest: jasmine.createSpy("submitRequest")
            };
        });

        it("should return denial message if validateDays returns false", () => {
            hrSystem.validateDays.and.returnValue(false);
            const result = emp.requestTimeOff(10, hrSystem);
            expect(result).toBe("Time off request denied: invalid number of days.");
            expect(hrSystem.validateDays).toHaveBeenCalledWith(10);
            expect(hrSystem.submitRequest).not.toHaveBeenCalled();
        });

        it("should return success message if validateDays returns true", () => {
            hrSystem.validateDays.and.returnValue(true);
            const result = emp.requestTimeOff(5, hrSystem);
            expect(result).toBe("Time off request submitted successfully");
            expect(hrSystem.validateDays).toHaveBeenCalledWith(5);
            expect(hrSystem.submitRequest).toHaveBeenCalledWith(emp.name, 5);
        });
    });
});
