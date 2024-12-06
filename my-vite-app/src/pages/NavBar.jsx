import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "./NavBar.css";
import React from "react";

const Navbar = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 500);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <div>
      <button className="menu-button" onClick={toggleMenu}>
        <div className={`hamburger ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      {isOpen && (
        <div className={`fullscreen-menu ${isClosing ? "closing" : ""}`}>
          <div className="menu-content">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <Link
                  to="bookAppointment"
                  smooth={true}
                  duration={800}
                  offset={-50}
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="services"
                  smooth={true}
                  duration={800}
                  offset={-50}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  smooth={true}
                  duration={800}
                  offset={-50}
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
              </li>
              {user && (
                <li>
                  <a href="/appointments">Appointments</a>
                </li>
              )}
              <li>
                <Link
                  to="footer"
                  smooth={true}
                  duration={800}
                  offset={-50}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>

              {user ? (
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <a href="/login">Login</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
