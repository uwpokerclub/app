import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import "../main.scss"

import Join from "../views/Join";
import { Navigate, useLocation } from "react-router-dom";
import ResponsiveNavbar from "../../../shared/components/ResponsiveNavbar/ResponsiveNavbar";

function Main(): ReactElement {
  const location = useLocation();

  return (
    <>
      <ResponsiveNavbar />
      <Routes>
        <Route path="/*" element={<Navigate to="/join" state={{ from: location }} replace />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  )
}

export default Main;