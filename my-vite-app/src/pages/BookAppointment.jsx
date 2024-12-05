import React, { useState, useEffect } from 'react';
import './BookAppointment.css';

const BookAppointment = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [peopleGroup, setPeopleGroup] = useState('adults');
  const [service, setService] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const availableTimes = [
    { label: '09:00 AM', value: '09:00' },
    { label: '09:30 AM', value: '09:30' },
    { label: '10:00 AM', value: '10:00' },
    { label: '10:30 AM', value: '10:30' },
    { label: '11:00 AM', value: '11:00' },
    { label: '11:30 AM', value: '11:30' },
    { label: '12:00 PM', value: '12:00' },
    { label: '12:30 PM', value: '12:30' },
    { label: '03:00 PM', value: '15:00' },
    { label: '03:30 PM', value: '15:30' },
    { label: '04:00 PM', value: '16:00' },
    { label: '04:30 PM', value: '16:30' },
    { label: '05:00 PM', value: '17:00' },
    { label: '05:30 PM', value: '17:30' },
    { label: '06:00 PM', value: '18:00' },
    { label: '06:30 PM', value: '18:30' },
    { label: '07:00 PM', value: '19:00' },
    { label: '07:30 PM', value: '19:30' },
    { label: '08:00 PM', value: '20:00' },
  ];

  const fetchAppointments = async (date) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reserved-times?date=${date}`);
      const data = await response.json();
      
      const formattedReservedTimes = data.map((timeString) => {
        return timeString.split(':').slice(0, 2).join(':'); 
      });
  
      setAppointments(formattedReservedTimes); 
    } catch (error) {
      console.error("Error fetching reserved times:", error);
    }
  };
  const verifyPhoneNumber = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/verify-phone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        });

        if (!response.ok) {
            throw new Error('Verification failed');
        }

        const data = await response.json();
        if (data.success) {
            setSuccessMessage('A verification code has been sent to your phone.');
        }
    } catch (error) {
        console.error('Error verifying phone number:', error);
        setSuccessMessage('Failed to send verification code.');
    }
};

  const filteredTimes = availableTimes.filter((time) => !appointments.includes(time.value));

  useEffect(() => {
    if (date) {
      fetchAppointments(date);
    }
  }, [date]);

  const saveAppointment = async (newAppointment) => {
    const isTimeReserved = appointments.includes(newAppointment.selectedTime);

    if (isTimeReserved) {
      setSuccessMessage('This time slot is already reserved. Please choose another time.');
      return; 
    }

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      fetchAppointments(newAppointment.date); 
    } catch (error) {
      console.error('Error saving appointment:', error);
      setSuccessMessage('Failed to book appointment.');
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newAppointment = {
      fullName,
      phoneNumber,
      date,
      selectedTime,
      service,
    };
    
    await saveAppointment(newAppointment);
    
    if (!appointments.includes(selectedTime)) {
      setSuccessMessage('Takimi u rezervua me sukses!');
      setIsModalOpen(true);
    }
  };
  
  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
  };

  const handleServiceSelect = (serviceName) => {
    setService(service === serviceName ? '' : serviceName);
  };

  useEffect(() => {
    if (date) {
      fetchAppointments(date);
      setSelectedTime('');
    }
  }, [date]);

  const isSunday = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() === 0; 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFullName('');
    setPhoneNumber('');
    setDate('');
    setSelectedTime('');
    setService('');
  };

  return (
    <section className="book-appointment">
      <div className="divider"></div>

      <h2>Book Your Appointment</h2>
      <p>Fill out the form below to schedule your appointment.</p>
      <form onSubmit={handleSubmit}>
    <div className="form-group">
  <label htmlFor="fullName">Full Name:</label>
  <input
    type="text"
    id="fullName"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    placeholder="John Doe" // Placeholder shembull
    required
  />
</div>
<div className="form-group">
  <label htmlFor="phoneNumber">Phone Number:</label>
  <input
    type="tel"
    id="phoneNumber"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    pattern="^\+?[0-9\s\-]{7,15}$" 
    placeholder="+358 40 1234567" 
    required
  />
</div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => {
              const selectedDate = e.target.value;
              if (!isSunday(selectedDate)) {
                setDate(selectedDate);
              } else {
                alert("Sunday is not available.");
              }
            }}
            required
          />
        </div>

        {date && !selectedTime && (
          <div className="time-selection">
            <h3>Select a Time:</h3>
            <div className="time-button">
              {availableTimes.map((time) => {
                const isReserved = appointments.includes(time.value);
                return (
                  <div
                    key={time.value}
                    className={`time-button ${time.value === selectedTime ? 'selected' : ''} ${isReserved ? 'reserved' : ''}`}
                    onClick={() => !isReserved && handleTimeSelect(time.value)} 
                    style={isReserved ? { textDecoration: 'line-through', opacity: 0.6 } : {}}
                  >
                    {time.label}
                    {isReserved && <span className="reserved-text">(Reserved)</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedTime && (
          <div className="selected-time">
            <h3>Selected Time: {selectedTime}</h3>
          </div>
        )}

        <div className="form-group">
          <label>Group:</label>
          <select value={peopleGroup} onChange={(e) => setPeopleGroup(e.target.value)}>
            <option value="adults">Adults (12+ years)</option>
            <option value="children">Children (1-12 years)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Services:</label>
          <div className="service-options">
            {["Men's Haircut", 'Beard Trim'].map((serviceName) => (
              <button
                type="button"
                key={serviceName}
                className={`service-label ${service === serviceName ? 'active-service' : ''}`}
                onClick={() => handleServiceSelect(serviceName)}
              >
                {serviceName}
              </button>
            ))}
          </div>
        </div>

        {service && (
          <div className="selected-service">
            <h3>Selected Service: {service}</h3>
          </div>
        )}

        <div className="submit-button-container">
          <button type="submit">Book Appointment</button>
        </div>
      </form>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}

   {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      <h2>Your Appointment Details</h2>
      <div className="booking-details">
        <p><strong>Full Name:</strong> {fullName}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {selectedTime}</p>
        <p><strong>Service:</strong> {service}</p>
      </div>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

    </section>
  );
};

export default BookAppointment;
