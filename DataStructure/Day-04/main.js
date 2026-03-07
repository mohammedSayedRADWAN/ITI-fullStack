/**
 * THE BUILDING BLOCK (Node)
 * Think of this as a person at a fork in the road holding a number.
 * They have a left hand for smaller numbers and a right hand for bigger ones.
 */
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null; // The king of the tree
    }

    // --- 1. INSERTION ---
    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode; // First one in becomes the Root
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            // New guy is smaller? Try to put him on the left
            if (node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            // New guy is bigger? Try to put him on the right
            if (node.right === null) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    // --- 2. SEARCH ---
    search(node, data) {
        if (node === null) return false; // Hit a dead end
        if (data === node.data) return true; // Found it!

        // If not found yet, choose a side and keep walking
        return data < node.data 
            ? this.search(node.left, data) 
            : this.search(node.right, data);
    }

    // --- 3. DELETION (The Tricky Part) ---
    delete(data) {
        // We update the root because the root itself might be deleted
        this.root = this.deleteNode(this.root, data);
    }

    deleteNode(node, data) {
        if (node === null) return null;

        if (data < node.data) {
            node.left = this.deleteNode(node.left, data);
        } else if (data > node.data) {
            node.right = this.deleteNode(node.right, data);
        } else {
            // WE FOUND IT! Now handle the 3 scenarios:

            // Scenario A: No kids (Leaf)
            if (!node.left && !node.right) return null;

            // Scenario B: One kid (Right or Left)
            if (!node.left) return node.right; // Right child takes the spot
            if (!node.right) return node.left; // Left child takes the spot

            // Scenario C: Two kids
            // We find the smallest value in the right branch (Successor) to replace us
            let tempNode = this.findMin(node.right);
            node.data = tempNode.data;
            // Now delete that duplicate successor from the right branch
            node.right = this.deleteNode(node.right, tempNode.data);
        }
        return node;
    }

    findMin(node) {
        // Just keep sliding left to find the smallest number
        while (node.left !== null) node = node.left;
        return node;
    }

    // --- 4. TRAVERSALS (Printing) ---

    // In-order: Left -> Root -> Right (Result: Sorted 1, 2, 3...)
    printInOrder(node) {
        if (node) {
            this.printInOrder(node.left);
            console.log(node.data);
            this.printInOrder(node.right);
        }
    }

    // Pre-order: Root -> Left -> Right (Result: Root comes first)
    printPreOrder(node) {
        if (node) {
            console.log(node.data);
            this.printPreOrder(node.left);
            this.printPreOrder(node.right);
        }
    }

    // Post-order: Left -> Right -> Root (Result: Root comes last)
    printPostOrder(node) {
        if (node) {
            this.printPostOrder(node.left);
            this.printPostOrder(node.right);
            console.log(node.data);
        }
    }
}

const myTree = new BinarySearchTree();

// Let's create a balanced-ish tree
[15, 10, 20, 8, 12, 18, 25].forEach(val => myTree.insert(val));

console.log("--- Sorted (In-Order) ---");
myTree.printInOrder(myTree.root);

console.log("--- Structure (Pre-Order) ---");
myTree.printPreOrder(myTree.root);

console.log("\nDeleting 10 (Node with two kids: 8 and 12)...");
myTree.delete(10);

console.log("--- New Sorted Order ---");
myTree.printInOrder(myTree.root);