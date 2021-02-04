import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.scss";

import Navbar from "./components/navbar/Navbar"

import Home from "./pages/home/Home"
import MembersIndex from "./pages/members/MembersIndex"
import SemestersIndex from "./pages/semesters/SemestersIndex"

export default function App() {
  return (
    <Router>
      <Navbar />

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/members">
              <MembersIndex />
            </Route>
            <Route exact path="/events">
              {/* TODO: Add events page */}
            </Route>
            <Route path="/semesters">
              <SemestersIndex />
            </Route>
            <Route exact path="/rankings">
              {/* TODO: Add rankings page */}
            </Route>
          </Switch>
        </div>
        <div className="col-md-1"></div>
      </div>
    </Router >
  );
}
