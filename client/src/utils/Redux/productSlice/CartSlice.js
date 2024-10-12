import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemId = action.payload._id;
      const itemData = action.payload;

      // Find the item in the cart by its ID
      const existingItem = state.items.find((item) => item._id === itemId);

      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the item with quantity 1
        state.items.push({ ...itemData, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      // Filter out the item with the given ID
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    clearCart: (state) => {
      // Clear the cart by resetting the array
      state.items = [];
    },
    decreaseQuantity: (state, action) => {
      // Find the item in the cart by its ID
      const findItem = state.items.find((item) => item._id === action.payload);
    
      // Check if the item exists in the cart
      if (findItem) {
        // Decrease the quantity by 1
        findItem.quantity -= 1;
    
        // If quantity becomes 0, remove the item from the cart
        if (findItem.quantity === 0) {
          state.items = state.items.filter(item => item._id !== action.payload);
        }
      }
    },
  },
});

export const { addItem, removeItem, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
