// react
import React from "react";
import ReactDOM from "react-dom/client";

// components
import App from "./components/App/App.tsx";

// redux
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

// styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
