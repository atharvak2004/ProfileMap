import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create a root and render the app
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);