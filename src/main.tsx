import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GameManager from "./Context/GameManager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameManager>
      <App />
    </GameManager>
  </StrictMode>
);
