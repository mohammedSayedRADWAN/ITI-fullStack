class Polygon {
            constructor(name) {
                this.name = name;
            }

            // Default area for a generic polygon
            getArea() {
                return 0;
            }

            // Custom toString to display object details in console 
            toString() {
                return `[Shape: ${this.name}] Area: ${this.getArea().toFixed(2)}`;
            }

            // Shared initialization for the Canvas Drawing context
            draw(ctx) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#2980b9";
            }
        }

        /**
         * Rectangle class inherits from Polygon 
         */
        class Rectangle extends Polygon {
            constructor(width, height) {
                super("Rectangle"); // Passes name to parent constructor
                this.width = width;
                this.height = height;
            }

            getArea() {
                return this.width * this.height;
            }

            toString() {
                // Combines parent toString with rectangle-specific params 
                return `${super.toString()}, Width: ${this.width}, Height: ${this.height}`;
            }

            draw(ctx, x, y) {
               super.draw(ctx);
                ctx.rect(x, y, this.width, this.height);
                ctx.stroke();
                ctx.fillStyle = "rgba(0, 123, 255, 0.2)";
                ctx.fill();
            }
        }

        /**
         * Circle class inherits from Polygon 
         */
        class Circle extends Polygon {
            constructor(radius) {
                super("Circle");
                this.radius = radius;
            }

            getArea() {
                return Math.PI * Math.pow(this.radius, 2);
            }

            toString() {
                return `${super.toString()}, Radius: ${this.radius}`;
            }

            draw(ctx, x, y) {
                super.draw(ctx);
                ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = "rgba(255, 99, 132, 0.2)";
                ctx.fill();
            }
        }

        // --- Execution for Task 1 ---
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        const myRect = new Rectangle(120, 70);
        const myCircle = new Circle(45);

        // Display results in Console 
        console.log("%c--- Task 1: Shapes ---", "color: blue; font-weight: bold;");
        console.log(myRect.toString());
        console.log(myCircle.toString());

        // Render shapes to Canvas 
        myRect.draw(ctx, 40, 40);
        myCircle.draw(ctx, 300, 150);


        // ==========================================
        // TASK 2: Proxy Data Validation 
        // ==========================================

        const validator = {
            set(target, prop, value) {
                if (prop === "name") {
                    // Rule: Only strings exactly 7 characters long 
                    if (typeof value !== "string" || value.length !== 7) {
                        throw new Error("Validation Error: 'name' must be exactly 7 characters.");
                    }
                }

                if (prop === "address") {
                    // Rule: Must be a string 
                    if (typeof value !== "string") {
                        throw new Error("Validation Error: 'address' must be a string.");
                    }
                }

                if (prop === "age") {
                    // Rule: Numerical value between 25 and 60 
                    if (typeof value !== "number" || value < 25 || value > 60) {
                        throw new Error("Validation Error: 'age' must be a number between 25 and 60.");
                    }
                }

                // If rules pass, use Reflect API to set the value (Self-Study Goal) 
                return Reflect.set(target, prop, value);
            }
        };

        // Create the dynamic proxy object 
        const userProfile = new Proxy({}, validator);

        // --- Execution for Task 2 ---
        console.log("%c--- Task 2: Proxy Validation ---", "color: green; font-weight: bold;");
        try {
            userProfile.name = "Student";    // Exactly 7 chars (S-t-u-d-e-n-t)
            userProfile.address = "Main St";
            userProfile.age = 30;           // Within 25-60 range
            console.log("Profile created successfully:", userProfile);
            
            // Testing an error (uncomment to see error in console):
            // userProfile.age = 20; 
        } catch (error) {
            console.error(error.message);
        }