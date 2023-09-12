import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//importo dependencias de material ui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App.jsx";
import {AuthProvider} from "../src/providers/AuthProvider.jsx";
import {UserProvider} from "../src/providers/UserProvider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
          <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);






