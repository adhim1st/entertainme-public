import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <p className="navbar-brand">Entertain Me</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className="nav-link navbar-button"
                aria-current="page"
                href="#"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/create-movie"
                className="nav-link navbar-button"
                href="#"
              >
                Create Movie
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favourite-movie"
                className="nav-link navbar-button"
                href="#"
              >
                Favourite Movie
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
