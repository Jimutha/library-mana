import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Disable React DevTools suggestion in development
if (process.env.NODE_ENV === "development") {
  const originalConsoleWarn = console.warn;
  console.warn = function filterWarnings(message, ...args) {
    if (
      typeof message === "string" &&
      message.includes("Download the React DevTools")
    ) {
      return;
    }
    originalConsoleWarn.apply(console, [message, ...args]);
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
