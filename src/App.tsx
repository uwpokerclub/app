import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProvideAuth from "./utils/ProvideAuth";
import PrivateRoute from "./utils/PrivateRoute";

import "./App.scss";

import Navbar from "./components/Navbar/Navbar";

import EventsIndex from "./pages/events/EventsIndex";
import Home from "./pages/home/Home";
import MembersIndex from "./pages/members/MembersIndex";
import SemestersIndex from "./pages/semesters/SemestersIndex";
import RankingsIndex from "./pages/rankings/RankingsIndex";
import LoginIndex from "./pages/login/LoginIndex";

export default function App() {
  return (
    <ProvideAuth>
      <Router forceRefresh>
        <Navbar />

        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <Switch>
              <Route path="/login">
                <LoginIndex />
              </Route>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/members">
                <MembersIndex />
              </PrivateRoute>
              <PrivateRoute path="/events">
                <EventsIndex />
              </PrivateRoute>
              <PrivateRoute path="/semesters">
                <SemestersIndex />
              </PrivateRoute>
              <PrivateRoute path="/rankings">
                <RankingsIndex />
              </PrivateRoute>
            </Switch>
          </div>
          <div className="col-md-1" />
        </div>
      </Router>
    </ProvideAuth>
  );
}
