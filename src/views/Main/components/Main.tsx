import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import "../main.scss"

import Header from "./Header";

import LandingPage from "../views/LandingPage";
import Join from "../views/Join";

/*********************************
 *   TODO
 * 
 * /join:
 * -make full <li> items into link
 * 
 * Header:
 **********************************/

function Main(): ReactElement {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  )
}

export default Main;