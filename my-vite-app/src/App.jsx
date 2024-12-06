import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './pages/NavBar';
import Hero from './pages/HeroSection';
import BarberPage from './pages/BarberPage';
import FeaturedServices from './pages/FeaturedServies';
import BookAppointment from './pages/BookAppointment';
import Footer from './pages/Footer';
import AppointmentList from './pages/AppointmentList';
import Login from './pages/Login';
import { UserProvider } from './UserContext';
import AOS from 'aos';
import { Element } from 'react-scroll';
import 'aos/dist/aos.css';

function App() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 120,
    });
  }, []);

  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero data-aos="fade-up" />
                  <Element name="about" data-aos="fade-right">
                    <BarberPage />
                  </Element>
                  <Element name="services" data-aos="fade-left">
                    <FeaturedServices />
                  </Element>
                  <Element name="bookAppointment" className="book-appointment-container" data-aos="zoom-in">
                    <BookAppointment />
                  </Element>
                  <Element name="footer" className="footer" data-aos="slide-up">
                    <Footer />
                  </Element>
                </>
              }
            />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
