// --- 5. DOUBLY LINKED LIST ---
class DLLNode {
    constructor(data) {
        this.data = data;
        this.next = null; // Right hand (forward)
        this.prev = null; // Left hand (backward)
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Adding to the very beginning
    insertAtBeginning(data) {
        const newNode = new DLLNode(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            // New node looks ahead to the current head
            newNode.next = this.head;
            // The current head looks back at the new node
            this.head.prev = newNode;
            // Now, move the head crown to the new node
            this.head = newNode;
        }
    }

    // Adding to the very end
    insertAtEnd(data) {
        const newNode = new DLLNode(data);
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            // New node looks back at the current tail
            newNode.prev = this.tail;
            // The current tail looks ahead to the new node
            this.tail.next = newNode;
            // Now, move the tail crown to the new node
            this.tail = newNode;
        }
    }

    // The "Handshake" deletion from the middle
    deleteFromPosition(index) {
        if (!this.head) return "List is empty";
        let curr = this.head;
        
        // Walk to the specific position
        for (let i = 0; i < index && curr; i++) {
            curr = curr.next;
        }

        if (!curr) return "Position not found";

        // If it's the head we're deleting
        if (curr === this.head) return this.deleteFromBeginning();
        // If it's the tail we're deleting
        if (curr === this.tail) return this.deleteFromEnd();

        // THE MAGIC: Bridge the node before it with the node after it
        // (A) <-> (B) <-> (C)  => (B) is curr. We link (A) directly to (C)
        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;
        return curr.data;
    }

    // Printing in both directions
    printForward() {
        let curr = this.head, res = [];
        while(curr) { res.push(curr.data); curr = curr.next; }
        console.log("Forward Order:", res.join(" <-> "));
    }

    printBackward() {
        let curr = this.tail, res = [];
        while(curr) { res.push(curr.data); curr = curr.prev; } // Using the 'prev' pointer!
        console.log("Backward Order:", res.join(" <-> "));
    }
}


// Quick Test for Doubly Linked List
console.log("--- Doubly Linked List Test ---");
const myList = new DoublyLinkedList();
myList.insertAtBeginning(10);
myList.insertAtEnd(20);
myList.insertAtEnd(30);

myList.printForward();  // 10 <-> 20 <-> 30
myList.printBackward(); // 30 <-> 20 <-> 10

myList.deleteFromPosition(1); // Remove '20'
myList.printForward();  // 10 <-> 30