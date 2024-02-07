import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import HomePage from "../src/pages/HomePage";
import DeckPage from "../src/pages/DeckPage";
import StorePage from "./pages/store-page/StorePage";
import RivalsPage from "../src/pages/rivals-page/RivalsPage";
import DuelPage from "../src/pages/DuelPage";
import { MacroGameContextProvider } from "MacroGameContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MacroGameContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<HomePage />}>
            <Route path="/deck" element={<DeckPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/rivals" element={<RivalsPage />} />
          </Route>
          <Route path="/duel" element={<DuelPage />} />
        </Routes>
      </HashRouter>
    </MacroGameContextProvider>
  </React.StrictMode>
);
