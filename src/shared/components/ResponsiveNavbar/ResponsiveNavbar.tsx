import React, { ReactElement, useState } from "react";
import { logo } from "../../../assets";
import { Link, useLocation } from "react-router-dom";

import "./ResponsiveNavbar.scss";
import Icon from "../Icon/Icon";

// TODO: uncomment items as they become available
const links = [
  {
    label: "SPONSORS",
    href: "/sponsors",
  },
  // {
  //   label: "ABOUT",
  //   href: "/about",
  // },
  {
    label: "GALLERY",
    href: "/gallery",
  },
  // {
  //   label: "EVENTS",
  //   href: "/events",
  // },
  {
    label: "JOIN",
    href: "/join",
  },
];

function ResponsiveNavbar(): ReactElement {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ResponsiveNavbar">
      <Link className="ResponsiveNavbar__logo" to="/">
        <img src={logo} alt="University of Waterloo Poker Studies Club" />
      </Link>
      <nav>
        <ul
          className={`ResponsiveNavbar__links ${
            menuOpen ? "ResponsiveNavbar__menu-open" : ""
          }`}
        >
          {links.map((link) => (
            <li
              className={`${
                link.href === location.pathname
                  ? "ResponsiveNavbar__link-active"
                  : ""
              }`
            }
              key={link.label}
              onClick={()=> setMenuOpen(!menuOpen)}
            >
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="ResponsiveNavbar__menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen && <Icon scale={2} iconType="bars" />}
        {menuOpen && <Icon scale={2} iconType="close" />}
      </div>
    </header>
  );
}

export default ResponsiveNavbar;
