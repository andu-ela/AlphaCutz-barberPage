import React, { useRef } from 'react';
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


function App() {
  const bookAppointmentRef = useRef(null);
  const servicesRef = useRef(null);  
  const aboutRef = useRef(null); 
  const footerRef = useRef(null); 


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
          /> {/* Kalojmë të gjitha funksionet si props */}
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div ref={aboutRef}> 
                  <BarberPage scrollToAbout={scrollToAbout} />
                </div>
                <div ref={servicesRef}>  
                  <FeaturedServices scrollToBookAppointment={scrollToBookAppointment} />
                </div>
             
                <div ref={bookAppointmentRef} className="book-appointment-container">
                  <BookAppointment />
                </div>
                <div ref={footerRef} className='footer'>
                  <Footer/>
                </div>

              </>
            } />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
