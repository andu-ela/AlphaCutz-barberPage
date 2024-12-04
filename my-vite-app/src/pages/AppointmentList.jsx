import React, { useEffect, useState } from 'react';
import './AppointmentList.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [filterDate, appointments]);

  const convertUTCDateToLocalDate = (date) => {
    const utcDate = new Date(date);
    const localDate = utcDate.toLocaleString('en-US', { timeZone: 'Europe/Tirane' });
    return new Date(localDate);
  };

  const filterAppointments = () => {
    let filtered = appointments;

    if (filterDate) {
      filtered = appointments.filter((appointment) => {
        const localAppointmentDate = convertUTCDateToLocalDate(appointment.date).toLocaleDateString('en-CA');
        const localFilterDate = new Date(filterDate).toLocaleDateString('en-CA');
        return localAppointmentDate === localFilterDate;
      });
    }

    setFilteredAppointments(filtered);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', options);
  };

  const formatTime = (timeString) => {
    const timeParts = timeString.split(':');
    if (timeParts.length < 2) return 'Invalid Time';
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const time = new Date(`1970-01-01T${hours}:${minutes}:00`);
    if (isNaN(time)) return 'Invalid Time';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const handleConfirm = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}/confirm`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, isConfirmed: true } : appointment
          )
        );
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };
  

const handleCancel = async (id) => {
  try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}/cancel`, {
          method: 'PATCH', 
      });
      if (response.ok) {
          setAppointments((prevAppointments) =>
              prevAppointments.map((appointment) =>
                  appointment.id === id ? { ...appointment, isConfirmed: false } : appointment
              )
          );
      }
  } catch (error) {
      console.error('Error canceling appointment:', error);
  }
};


return (
  <div className="container">
    {isLoading ? (
      <p>Loading appointments...</p>
    ) : (
      <>
        <div className="filter-container">
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            inline
          />
        </div>
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr className="header__item">
                <th>Date</th>
                <th>Time</th>
                <th>Client</th>
                <th>Number</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-content">
  {filteredAppointments.length === 0 ? (
    <tr>
      <td colSpan="7" className="no-appointments">
        No appointments found for the selected date.
      </td>
    </tr>
  ) : (
    filteredAppointments.map((appointment) => (
      <tr className="table-row" key={appointment.id}>
        <td className="table-data">{formatDate(appointment.date)}</td>
        <td className="table-data">{formatTime(appointment.selected_time)}</td>
        <td className="table-data">{appointment.full_name}</td>
        <td className="table-data">{appointment.phone_number}</td>
        <td className="table-data">{appointment.service}</td>
        <td className={`table-data status ${appointment.isConfirmed ? 'confirmed' : 'not-confirmed'}`}>
          {appointment.isConfirmed ? 'Confirmed' : 'Not Confirmed'}
        </td>
   <td className="table-data actions">
  {!appointment.isConfirmed ? (
    <button className="confirm-btn" onClick={() => handleConfirm(appointment.id)}>
      Confirm <FaCheckCircle style={{ color: 'green', marginLeft: '5px' }} />
    </button>
  ) : (
    <button className="cancel-btn" onClick={() => handleCancel(appointment.id)}>
      Cancel <FaTimesCircle style={{ color: 'red', marginLeft: '5px' }} />
    </button>
  )}
</td>

      </tr>
    ))
  )}
</tbody>
          </table>
        </div>
      </>
    )}
  </div>
);
};

export default AppointmentList;