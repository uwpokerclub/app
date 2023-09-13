import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import NewLogin from "../views/NewLogin";
import NewSession from "../views/NewSession";

function Login(): ReactElement {
  return (
    <>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<NewSession />} />
            <Route path="/create" element={<NewLogin />} />
          </Routes>
        </div>
        <div className="col-md-1" />
      </div>
    </>
  );
}

export default Login;
