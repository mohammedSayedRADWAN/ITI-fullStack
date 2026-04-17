import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter', // The internal identifier for this slice
  initialState: { value: 0 },
  reducers: {
    // These are Reducers. RTK automatically generate "Actions" base on Reducers
    increment: (state) => {
      state.value += 1; // Immer handle the immutability behind the scene
    },

    decrement: (state) => {
      state.value -= 1;
    },

    reset: (state) => {
      state.value = 0;
    },

    incrementByFive: (state) => {
      state.value += 5;
    },

    // Reducers can accept additional data (Payloads)
    incrementByValue: (state, action) => {
      state.value += action.payload;
    },
  },
});

// We must export the generated Actions to use in the our components
export const { increment, decrement, reset, incrementByFive, incrementByValue } =
  counterSlice.actions;

// We export the Reducer to wire it into the main store
export default counterSlice.reducer;
