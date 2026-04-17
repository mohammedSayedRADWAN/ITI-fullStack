import { create } from 'zustand';

// We Pass a callback function that the set 'set' method
export const useCounterStore = create((set) => ({
  // Define States + Initial Values
  count: 0,

  // The Action (Modify The State using set method)
  // `set` take a a callback giving you access to the previous state
  reset: () => set({ count: 0 }),
  increment: () => set((prev) => ({ count: prev.count + 1 })),
  decrement: () => set((prev) => ({ count: prev.count - 1 })),
}));
