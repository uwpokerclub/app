import React, { ReactElement } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthProvider from "./shared/utils/AuthProvider";

import RequireAuth from "./shared/utils/RequireAuth";
import { Login, Admin, Main } from "./views";

export default function App(): ReactElement {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/admin/login/*" element={<Login />} />
          <Route path="/admin/*" element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
