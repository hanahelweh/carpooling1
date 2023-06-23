import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaBars } from 'react-icons/fa';
const NavBar = () => {
  const [click, setClick] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => setClick(!click);
  const handleDropdown = () => setDropdownOpen(!dropdownOpen);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setIsLoggedIn(!!userId);
  }, [userId]);

  const handleLogin = () => {
    if (userId) {
      setIsLoggedIn(true);
      handleClick();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setDropdownOpen(false); // Hide the dropdown after logout
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false); // Hide the dropdown after an item is clicked
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white">
      <div className="container">
        <NavLink exact to="/" className="navbar-brand">
          <span style={{ color: "black" }}>Carpooling</span>
        </NavLink>
        <button
          className={`navbar-toggler ${click ? "collapsed" : ""}`}
          type="button"
          onClick={handleClick}
          style={{color:"black"}}
        >
          <FaBars />
        </button>
        <div className={`collapse navbar-collapse ${click ? "show" : ""}`}>
          <ul className="navbar-nav ml-auto bg-white w-100">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className={`nav-link ${click ? "w-100" : ""}`}
                style={{ color: "black" }}
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/publish"
                activeClassName="active"
                className={`nav-link ${click ? "w-100" : ""}`}
                style={{ color: "black" }}
                onClick={handleClick}
              >
                Publish a Ride
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/driverRidesPage"
                activeClassName="active"
                className={`nav-link ${click ? "w-100" : ""}`}
                style={{ color: "black" }}
                onClick={handleClick}
              >
                My Rides
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/passenger/requests"
                activeClassName="active"
                className={`nav-link ${click ? "w-100" : ""}`}
                style={{ color: "black" }}
                onClick={handleClick}
              >
                My Requests
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className={`nav-link ${click ? "w-100" : ""}`}
                style={{ color: "black" }}
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            <li className={`nav-item dropdown ${dropdownOpen ? "show" : ""}`}>
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                style={{ color: "black" }}
                aria-expanded={dropdownOpen ? "true" : "false"}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdown();
                }}
              >
                <i className="fa fa-user"></i>
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  dropdownOpen ? "show" : ""
                }`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleLogout();
                        handleDropdownItemClick();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      exact
                      to="/login"
                      activeClassName="active"
                      className="dropdown-item"
                      onClick={() => {
                        handleClick();
                        handleLogin();
                        handleDropdownItemClick();
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    exact
                    to="/profile"
                    activeClassName="active"
                    className="dropdown-item"
                    onClick={() => {
                      handleClick();
                      handleDropdownItemClick();
                    }}
                  >
                    Edit Profile
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
