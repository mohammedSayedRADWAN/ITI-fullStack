const { random, removeDuplicates } = require('../utilities');

describe("Utilities functions", () => {



    describe("random", () => {
        it("should return a number", () => {
            expect(typeof random(2, 9)).toBe("number");
        });

        it("should return a number within the range [min, max]", () => {
            const min = 5;
            const max = 7;
            const result = random(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        it("should return NaN if only one argument is passed", () => {
            expect(random(3)).toBeNaN();
        });
    });

    describe("removeDuplicates", () => {
        it("should return an array", () => {
            expect(Array.isArray(removeDuplicates([1, 2, 2, 3]))).toBe(true);
        });

        it("should return an array with the correct length", () => {
            expect(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]).length).toBe(9);
        });

        it("should return an array with unique elements", () => {
            expect(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it("should return an empty array if the array is empty", () => {
            expect(removeDuplicates([])).toEqual([]);
        });


    });
});
