import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  return (
    <div className={css.headerContainer}>
      <header className={css.pageHeader}>
        <nav className={css.pageNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(css.menuLink, isActive && css.active)
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              clsx(css.menuLink, isActive && css.active)
            }
          >
            Movies
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
