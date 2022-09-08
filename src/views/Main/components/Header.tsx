import React from "react";

import './Header.scss'

import { logo } from "../../../assets"
// import { navLinks } from "../../../constants";

const Header = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top px-4 py-2">
        <a className="navbar-brand" href="/"><img src={logo} alt="UWPSC Logo"/></a>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerContent">
          <img src={menu} alt="" />
        </button> */}

        {/*
        <div className="collapse navbar-collapse" id="headerContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/join">Join</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">Events</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://discord.gg/2k4h9sM" target="_blank" rel="noreferrer">Discord</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/prizes">Prizes</a>
            </li>
            <li className="nav-item my-auto">
              <a className="nav-link nav-alt px-2 py-1" href="/register">Register</a>
            </li>
          </ul>
        </div>
        */}
      </nav>
    </>
  );
};

export default Header;
