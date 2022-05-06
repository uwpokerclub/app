import React, { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../utils/AuthProvider";

import "./Navbar.scss";

export default function Navbar(): ReactElement {
  const naviagate = useNavigate();
  const auth = useAuth();

  const handleLogout = (): void => {
    auth.signOut(() => {
      naviagate("/logout");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          UW Poker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ justifyContent: "inherit" }}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/events" className="nav-link">
                Events
              </Link>
            </li>
            <li>
              <Link to="/semesters" className="nav-link">
                Semesters
              </Link>
            </li>
            <li>
              <Link to="/rankings" className="nav-link">
                Rankings
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            <button
              type="button"
              onClick={() => handleLogout()}
              className="btn btn-primary navbar-btn logout-btn btn-responsive"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}