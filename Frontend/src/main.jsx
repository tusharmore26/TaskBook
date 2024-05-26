import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { TasksContextProvider } from "./context/taskContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
