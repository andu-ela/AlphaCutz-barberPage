import React, { useRef, useEffect } from 'react';
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
import 'aos/dist/aos.css';

function App() {
  const bookAppointmentRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const scrollToBookAppointment = () => {
    if (bookAppointmentRef.current) {
      bookAppointmentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar
            scrollToBookAppointment={scrollToBookAppointment}
            scrollToServices={scrollToServices}
            scrollToAbout={scrollToAbout}
            scrollToFooter={scrollToFooter}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <div ref={aboutRef} data-aos="fade-up">
                    <BarberPage scrollToAbout={scrollToAbout} />
                  </div>
                  <div ref={servicesRef} data-aos="fade-right">
                    <FeaturedServices scrollToBookAppointment={scrollToBookAppointment} />
                  </div>
                  <div ref={bookAppointmentRef} className="book-appointment-container" data-aos="zoom-in">
                    <BookAppointment />
                  </div>
                  <div ref={footerRef} className="footer" data-aos="fade-up">
                    <Footer />
                  </div>
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
