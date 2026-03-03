/**
 * The Product Class
 * Details are hidden; the client should not instantiate this directly.
 */
class Pizza {
    constructor() {
        this.dough = "";
        this.sauce = "";
        this.cheese = "";
        this.toppings = [];
    }

    getDetails() {
        return `Pizza [Dough: ${this.dough}, Sauce: ${this.sauce}, Cheese: ${this.cheese}, Toppings: ${this.toppings.join(", ") || "None"}]`;
    }
}

/**
 * The Builder Class
 * Encapsulates the construction logic and provides a step-by-step API.
 */
class PizzaBuilder {
    #pizza; // Private field: cannot be accessed from outside the class

    constructor() {
        this.#reset();
    }

    #reset() {
        this.#pizza = new Pizza();
    }

    setDough(doughType) {
        this.#pizza.dough = doughType;
        return this; // Enables method chaining 
    }

    setSauce(sauceType) {
        this.#pizza.sauce = sauceType;
        // Return the builder instance to allow chaining
        return this;
    }

    setCheese(cheeseType) {
        this.#pizza.cheese = cheeseType;
        // Return the builder instance to allow chaining
        return this;
    }

    addTopping(topping) {
        this.#pizza.toppings.push(topping);
        // Return the builder instance to allow chaining
        return this;
    }

    /**
     * Returns the final product and resets the builder for the next order.
     */
    build() {
        const product = this.#pizza;
        this.#reset(); 
        // Return the constructed product to the client and reset the builder for the next order
        return product;
    }
}

/**
 * Main Execution (Client)
 */
try {
    const builder = new PizzaBuilder();

    // Custom Order: Method Chaining
    const customPizza = builder
        .setDough("Thin Crust")
        .setSauce("Spicy Tomato")
        .setCheese("Mozzarella")
        .addTopping("Mushrooms")
        .addTopping("Black Olives")
        .build();

    console.log("Customer 1 Order:", customPizza.getDetails());

    // Minimalist Order
    const simplePizza = builder
        .setDough("Pan")
        .setCheese("Extra Cheddar")
        .build();

    console.log("Customer 2 Order:", simplePizza.getDetails());

} catch (error) {
    console.error("Construction Error:", error.message);
}