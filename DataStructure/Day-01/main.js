/**
 * MERGE SORT
 * Logic: Split the array into halves until each part has only 1 element, 
 * then merge them back together in the correct order.
 * Time Complexity: O(n log n) - Very efficient for large data!
 */
function mergeSort(arr) {
    if (arr.length <= 1) return arr; // Base case: an array of 1 is already sorted

    // 1. Find the middle point
    const mid = Math.floor(arr.length / 2);
    
    // 2. Recursively split the left and right halves
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    // 3. Merge the sorted halves back together
    return merge(left, right);
}

function merge(left, right) {
    let sortedArray = [];
    
    // While both arrays have elements, compare the first items
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift()); // Take from left
        } else {
            sortedArray.push(right.shift()); // Take from right
        }
    }
    
    // Combine what's left (if any) and return
    return [...sortedArray, ...left, ...right];
}


/**
 * BINARY SEARCH
 * Logic: Keep splitting the search area in half. 
 * Target is either in the middle, the left half, or the right half.
 * Time Complexity: O(log n) - Super fast!
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // Found it! Return the index
        }

        if (arr[mid] < target) {
            left = mid + 1; // Target is in the right half
        } else {
            right = mid - 1; // Target is in the left half
        }
    }

    return -1; // Not found
}


/**
 * BONUS: QUICK SORT
 * Logic: Pick a 'pivot' element. Put everything smaller to its left 
 * and everything larger to its right. Repeat for both sides.
 * Time Complexity: O(n log n) average.
 */
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1]; // Picking the last element as pivot
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively sort left and right, then join with pivot
    return [...quickSort(left), pivot, ...quickSort(right)];
}


const myNumbers = [38, 27, 43, 3, 9, 82, 10];

// 1. Testing Sort
const sorted = mergeSort(myNumbers);
console.log("Sorted Array (Merge Sort):", sorted);

// 2. Testing Search (must use the sorted array)
const targetIndex = binarySearch(sorted, 9);
console.log("Index of number 9:", targetIndex);

// 3. Testing Bonus Sort
console.log("Quick Sort Result:", quickSort([5, 2, 9, 1, 5, 6]));