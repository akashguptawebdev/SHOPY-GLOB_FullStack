import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import  from "./utils/Redux/ReduxStore.js";
import { BrowserRouter } from "react-router-dom";
import  { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import store ,{ persistor } from "./utils/reduxPersistConfig.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
