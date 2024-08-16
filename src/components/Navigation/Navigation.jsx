import { NavLink, Route, Routes } from "react-router-dom";

import css from "./App.module.css";
import clsx from "clsx";

import HomePage frl

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
