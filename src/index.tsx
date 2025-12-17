import { createRoot } from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Could not find root element to mount to");
}

const ROOT = createRoot(container);

ROOT.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
