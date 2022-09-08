import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import "../main.scss"

import Header from "./Header";

// import LandingPage from "../views/LandingPage";
import Join from "../views/Join";
import { Navigate, useLocation } from "react-router-dom";

/*********************************
 *   TODO
 * 
 * /join:
 * -make full <li> items into link
 * 
 * Header:
 **********************************/

function Main(): ReactElement {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Navigate to="/join" state={{ from: location }} replace />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  )
}

export default Main;