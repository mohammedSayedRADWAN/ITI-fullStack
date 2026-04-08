/*
  QuickSort in JavaScript - Simple + Optimized + UI-ready

  1) QuickSort works by divide-and-conquer:
     - choose a pivot
     - partition array around pivot
     - recursively sort left/right subarrays
  2) Pivot selection affects performance (median/random is better than first/last)
  3) Partitioning rearranges in-place to avoid extra allocations
*/

// Simple QuickSort (functional style, allocates arrays):
function simpleQuicksort(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (arr.length <= 1) return [...arr];

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...simpleQuicksort(left), pivot, ...simpleQuicksort(right)];
}

// Optimized QuickSort (in-place, O(1) extra data, O(log n) recursion stack):
function quicksort(arr, low = 0, high = arr.length - 1) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quicksort(arr, low, pivotIndex - 1);
    quicksort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i += 1;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// UI helper: parse user input like  10 7 8 and return sorted numbers.
function quicksortUI(input) {
  if (typeof input !== 'string') throw new TypeError('Input must be a string');

  const values = input
    .split(/\s*,\s*|\s+/)
    .filter((token) => token.length > 0)
    .map((token) => Number(token));

  if (values.some((value) => Number.isNaN(value))) {
    throw new Error('Invalid number in input. Use comma or space separated numbers.');
  }

  quicksort(values); // in-place sorting
  return values;
}

/*
  Comparison: QuickSort vs MergeSort vs HeapSort vs Array.sort

  QuickSort:
    - avg O(n log n), worst O(n^2)
    - space O(log n) recursion + O(1) extra
    - unstable
    - fastest for in-memory random data

  MergeSort:
    - O(n log n) all cases
    - space O(n) for arrays (stable)
    - good for linked lists or stable requirement

  HeapSort:
    - O(n log n) all cases
    - space O(1)
    - unstable, lower cache locality

  Array.prototype.sort (JS engine specific):
    - usually stable in modern engines; O(n log n), hybrid
    - can switch strategy (QuickSort/IntroSort/Merge/Insertion)
    - handles string conversion; use comparator for numbers
*/

/*
  Complexity section:
  - Best: O(n log n) (balanced partitions)
  - Average: O(n log n)
  - Worst: O(n^2) (sorted/reverse input with poor pivot)
  - Space (optimized): O(log n) stack
  - Space (simple): O(n) for intermediate arrays

  Pitfalls:
  - pivot selection matters
  - recursion depth can overflow on large, pathological inputs
  - not stable: equal elements can reorder
*/

// Quick manual test when running directly with Node:
if (typeof process !== 'undefined' && process.argv.length > 1 && require.main === module) {
  const arr = [10, 7, 8, 9, 1, 5];
  console.log('Before:', arr.slice());
  quicksort(arr);
  console.log('After:', arr);

  const input = '3, 6, 8, 10, 1, 2, 1';
  console.log('QuicksortUI:', quicksortUI(input));
}

// Export for module use (if needed):
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { simpleQuicksort, quicksort, partition, quicksortUI };
}

