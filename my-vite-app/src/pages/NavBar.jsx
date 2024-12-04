import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";
import React from 'react'; 


const Navbar = ({
  scrollToBookAppointment,
  scrollToServices,
  scrollToAbout,
  scrollToFooter,
}) => {
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
                <a
                  href="#book-appointment"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToBookAppointment();
                    setIsOpen(false);
                  }}
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToServices();
                    setIsOpen(false);
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAbout();
                    setIsOpen(false);
                  }}
                >
                  About Us
                </a>
              </li>
              {user && (
                <li>
                  <a href="/appointments">Appointments</a>
                </li>
              )}
              <li>
                <a
                  href="#footer"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToFooter();
                    setIsOpen(false);
                  }}
                >
                  Contact
                </a>
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
