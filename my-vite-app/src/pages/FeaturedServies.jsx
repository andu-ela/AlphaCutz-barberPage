import React from 'react';
import './FeaturedServices.css'; 

const FeaturedServices = ({ scrollToBookAppointment }) => {
  const data = [
    { title: 'Men Haircut', description: 'The men s haircut service offers style and elegance with personalized cuts, ranging from classic to modern.', backgroundColor: '#697565' },
    { title: 'Beard Trim', description: 'Beard care ensures a polished appearance, providing perfectly shaped styles and flawless results.', backgroundColor: '#414a4c' },
    { title: 'Children Haircut', description: 'The children s haircut service creates a pleasant and calm experience, making the haircut an enjoyable adventure for little ones.', backgroundColor: '#475c6c' },
  ];

  return (
    <div className="container1">
      {data.map((service, index) => (
        <div className="cards" key={index}>
          <div className="box">
            <div className="content" style={{ backgroundColor: service.backgroundColor }}>
        
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button onClick={scrollToBookAppointment}>Book Now!</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedServices;
