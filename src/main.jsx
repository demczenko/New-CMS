import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./router";
import { Providers } from "./context/providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>
);
