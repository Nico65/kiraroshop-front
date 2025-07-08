import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./App.js";
=======
import App from "./App.tsx";
>>>>>>> 96bd993bd99769bdce7d80a1f1d5962cf4adde1a
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
    <App />
    </BrowserRouter>
  </React.StrictMode>,
);
