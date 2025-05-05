import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout/layout";
import { Search } from "./pokemonPage";
import { Moves } from "./movesPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/moves" element={<Moves />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
