import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.scss";

import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"

export default function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/members">
          {/* TODO: Add members page  */}
        </Route>
        <Route exact path="/events">
          {/* TODO: Add events page */}
        </Route>
        <Route exact path="/semesters">
          {/* TODO: Add semesters page */}
        </Route>
        <Route exact path="/rankings">
          {/* TODO: Add rankings page */}
        </Route>
      </Switch>
    </Router>
  );
}
