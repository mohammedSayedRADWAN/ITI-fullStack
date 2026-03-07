/**
 * 1. ARRAY-BASED STACK
 * Ideal when you know the maximum size in advance.
 */
class ArrayStack {
    constructor(capacity) {
        this.capacity = capacity;
        this.stack = new Array(capacity);
        this.top = -1; // -1 means the stack is currently empty
    }

    isEmpty() {
        return this.top === -1;
    }

    push(data) {
        // Check if there is room before adding
        if (this.top === this.capacity - 1) {
            console.log("Stack Overflow: Cannot add to a full stack");
            return;
        }
        // Increment top pointer and then insert the data
        this.stack[++this.top] = data;
    }

    pop() {
        // Ensure the stack isn't empty before removing
        if (this.isEmpty()) {
            console.log("Stack Underflow: Nothing to remove");
            return null;
        }
        // Grab the data, then decrement the top pointer
        const data = this.stack[this.top];
        this.stack[this.top--] = undefined; // Optional: help Garbage Collection
        return data;
    }

    print() {
        console.log("Array Stack:", this.stack.slice(0, this.top + 1));
    }
}

/**
 * 2. LINKED LIST STACK
 * Ideal for dynamic sizes; it grows as much as memory allows.
 */
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    constructor() {
        this.top = null; // The top of the stack is the head of the list
    }

    isEmpty() {
        return this.top === null;
    }

    push(data) {
        const newNode = new Node(data);
        // The new node points to the current top (stacking it on top)
        newNode.next = this.top;
        // The new node now becomes the official top
        this.top = newNode;
    }

    pop() {
        if (this.isEmpty()) return "Stack Underflow";
        
        const data = this.top.data;
        // Move the top pointer to the next node down the line
        this.top = this.top.next;
        return data;
    }

    print() {
        let curr = this.top, result = [];
        while(curr) {
            result.push(curr.data);
            curr = curr.next;
        }
        console.log("Linked List Stack (Top to Bottom):", result);
    }
}


/**
 * 3. ARRAY-BASED QUEUE (Circular)
 * Uses the Modulo operator (%) to reuse empty slots at the start of the array.
 */
class ArrayQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.queue = new Array(capacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0; // Track size to distinguish between Full and Empty
    }

    isEmpty() {
        return this.size === 0;
    }

    enQueue(data) {
        if (this.size === this.capacity) {
            console.log("Queue Overflow");
            return;
        }
        // Use Modulo to "wrap around" to index 0 if we hit the end
        this.rear = (this.rear + 1) % this.capacity;
        this.queue[this.rear] = data;
        this.size++;
    }

    deQueue() {
        if (this.isEmpty()) return "Queue Underflow";

        const data = this.queue[this.front];
        this.queue[this.front] = undefined;
        // Move front forward, also wrapping around if needed
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return data;
    }

    print() {
        let result = [];
        for (let i = 0; i < this.size; i++) {
            // Calculate the correct index in the circular buffer
            let index = (this.front + i) % this.capacity;
            result.push(this.queue[index]);
        }
        console.log("Array Queue:", result);
    }
}

/**
 * 4. LINKED LIST QUEUE
 * Uses two pointers (front & rear) to keep EnQueue and DeQueue at O(1) speed.
 */
class LinkedListQueue {
    constructor() {
        this.front = null; // Where we remove from
        this.rear = null;  // Where we add to
    }

    isEmpty() {
        return this.front === null;
    }

    enQueue(data) {
        const newNode = new Node(data);
        // If queue is empty, both front and rear point to the new node
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
            return;
        }
        // Link the current rear to the new node
        this.rear.next = newNode;
        // Move the rear pointer to the new node
        this.rear = newNode;
    }

    deQueue() {
        if (this.isEmpty()) return "Queue Underflow";
        
        const data = this.front.data;
        // Move the front pointer to the next person in line
        this.front = this.front.next;
        
        // If we just removed the last item, reset rear to null too
        if (this.front === null) {
            this.rear = null;
        }
        return data;
    }

    print() {
        let curr = this.front, result = [];
        while(curr) {
            result.push(curr.data);
            curr = curr.next;
        }
        console.log("Linked List Queue:", result);
    }
}



console.log("--- STACK  ---");
const myStack = new LinkedListStack(); 

myStack.push(10);
myStack.push(20);
myStack.push(30);

console.log("Popped item:", myStack.pop()); // Should log 30
myStack.print(); // Should log [20, 10]


// --- Queue ---
console.log("\n--- QUEUE TEST ---");
const myQueue = new ArrayQueue(3); 

myQueue.enQueue("User_A");
myQueue.enQueue("User_B");
myQueue.enQueue("User_C");

console.log("Served:", myQueue.deQueue()); // Should log User_A
myQueue.print(); // Should log [User_B, User_C]