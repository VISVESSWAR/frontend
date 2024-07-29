import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import "./index.css";

export const server = "https://elearning-backend-yhjb.onrender.com";
// export const server = "http://localhost:3001";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
