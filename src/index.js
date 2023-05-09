import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { store, persistor } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider loading={null} store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
