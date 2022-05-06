import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "../../../shared/components/Navbar/Navbar";

import Home from "../views/Home";
import Users from "../views/Users";
import Events from "../views/Events";
import Semesters from "../views/Semesters";
import Rankings from "../views/Rankings";

function Admin(): ReactElement {
  return (
    <>
      <Navbar />

      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/events/*" element={<Events />} />
            <Route path="/semesters/*" element={<Semesters />} />
            <Route path="/rankings/*" element={<Rankings />} />
          </Routes>
        </div>
        <div className="col-md-1" />
      </div>
    </>
  )
}

export default Admin;