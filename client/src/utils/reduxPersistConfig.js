import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Redux/userSlice/UserSlice";
import ProductReducer from "./Redux/productSlice/DataSlice";
import cartReducer from "./Redux/productSlice/CartSlice";
// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Specify the user state to be persisted
};

// Combine reducers
const rootReducer = combineReducers({
  Product: ProductReducer,
  cart: cartReducer,
  user: userReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Optionally ignore paths within the action/state
        ignoredActionPaths: ["register", "rehydrate"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

// Create a persistor instance
export const persistor = persistStore(store);
export default store;
