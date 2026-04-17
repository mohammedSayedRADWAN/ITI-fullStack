import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

// We must export the generated Actions to use in the our components

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// We export the Reducer to wire it into the main store
export default cartSlice.reducer;
