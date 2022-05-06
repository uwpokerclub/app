import React, { ReactElement } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthProvider from "./shared/utils/AuthProvider";

import Login from "./views/Login/";
import RequireAuth from "./shared/utils/RequireAuth";
import Admin from "./views/Admin";

export default function App(): ReactElement {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login/*" element={<Login />} />
          <Route path="/*" element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
