import { ReactElement, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { uwpscLogo } from "../../assets";
import { Icon } from "../Icon";

import styles from "./ResponsiveNavbar.module.css";

// TODO: uncomment links as they become available
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

export function ResponsiveNavbar(): ReactElement {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <Link className={styles.logo} to="/">
        <img src={uwpscLogo} alt="University of Waterloo Poker Studies Club" />
      </Link>
      <nav>
        <ul className={`${styles.links} ${menuOpen ? styles["menu-open"] : ""}`}>
          {links.map((link) => (
            <li
              className={`${link.href === location.pathname ? styles["link-active"] : ""}`}
              key={link.label}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles["menu-icon"]} onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen && <Icon scale={2} iconType="bars" />}
        {menuOpen && <Icon scale={2} iconType="close" />}
      </div>
    </header>
  );
}
