import React, { ReactElement } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthProvider from "./shared/utils/AuthProvider";

import RequireAuth from "./shared/utils/RequireAuth";
import { Login, Admin, Main, Settings} from "./views";
import { TournamentClock } from "./shared/components";
import { EVENT_LEVELS } from "./constants";

export default function App(): ReactElement {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/settings" element={
            <RequireAuth>
              <Settings />
            </RequireAuth>} />
          <Route path="/admin/login/*" element={<Login />} />
          <Route path="/admin/*" element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          } />
          <Route path="/tournament-clock" element={<TournamentClock levels={EVENT_LEVELS} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
