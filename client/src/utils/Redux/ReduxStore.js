import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./productSlice/DataSlice.js";
import cartReducer from "./productSlice/CartSlice.js";
import userReducer from "./userSlice/UserSlice.js";
import authenticateReducer from "./userSlice/UserSlice.js"
const store = configureStore({
  reducer: {
    Product: ProductReducer,
    cart: cartReducer,
    user: userReducer,
    authenticate:authenticateReducer
  },
});
export default store;
