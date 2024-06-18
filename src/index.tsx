import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import HomePage from "./pages/home-page/HomePage";
import DeckPage from "./pages/deck-page/DeckPage";
import StorePage from "./pages/store-page/StorePage";
import RivalsPage from "../src/pages/rivals-page/RivalsPage";
import DuelPage from "./pages/duel-page/DuelPage";
import { MacroGameContextProvider } from "MacroGameContext";
import { loadAllCardModels } from "duel/cards-collection/load-all-card-models";
import { loadAllCardModelsImages } from "card-images";

loadAllCardModels();
loadAllCardModelsImages();

function changeZoom() {
  setTimeout(() => {
    const windowWidth = window.innerWidth;
    const rootDiv: any = document.getElementById("root")?.firstChild;
    const pageWidth = rootDiv ? rootDiv.scrollWidth : windowWidth;
    const docStyle: any = document.body.style;
    const newZoom = (100 * windowWidth) / pageWidth;
    docStyle.zoom = newZoom + "%";
    changeZoom();
  }, 500);
}
changeZoom();

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
