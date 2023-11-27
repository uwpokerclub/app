import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import "../main.scss";

import Join from "../views/Join";
import { Navigate, useLocation } from "react-router-dom";
import ResponsiveNavbar from "../../../shared/components/ResponsiveNavbar/ResponsiveNavbar";
import Gallery from "../views/Gallery";
import Sponsors from "../views/Sponsors";
import { ResultsEmbed } from "./ElectionEmbed";

function Main(): ReactElement {
  const location = useLocation();

  return (
    <>
      <ResponsiveNavbar />
      <Routes>
        <Route
          path="/*"
          element={<Navigate to="/join" state={{ from: location }} replace />}
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/join" element={<Join />} />
        <Route path="/election" element={<ResultsEmbed />} />
      </Routes>
    </>
  );
}

export default Main;
