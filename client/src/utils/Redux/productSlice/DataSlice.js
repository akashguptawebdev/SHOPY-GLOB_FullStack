import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "productData",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { setProducts, addProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
