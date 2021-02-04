import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.scss";

import Navbar from "./components/navbar/Navbar"

import EventsIndex from "./pages/events/EventsIndex"
import Home from "./pages/home/Home"
import MembersIndex from "./pages/members/MembersIndex"
import SemestersIndex from "./pages/semesters/SemestersIndex"
import RankingsIndex from "./pages/rankings/RankingsIndex"

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
            <Route path="/events">
              <EventsIndex />
            </Route>
            <Route path="/semesters">
              <SemestersIndex />
            </Route>
            <Route path="/rankings">
              <RankingsIndex />
            </Route>
          </Switch>
        </div>
        <div className="col-md-1"></div>
      </div>
    </Router >
  );
}
