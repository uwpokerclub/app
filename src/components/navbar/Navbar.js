import React from "react";

import { Link } from "react-router-dom";

import "./Navbar.scss"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">UW Poker</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/members" className="nav-link">Members</Link>
            </li>
            <li>
              <Link to="/events" className="nav-link">Events</Link>
            </li>
            <li>
              <Link to="/semesters" className="nav-link">Semesters</Link>
            </li>
            <li>
              <Link to="/rankings" className="nav-link">Rankings</Link>
            </li>
          </ul>

          <div className="navbar-right">
            <Link to="/login/logout" className="btn btn-primary navbar-btn logout-btn btn-responsive">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
