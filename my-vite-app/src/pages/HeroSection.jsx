import React from "react";
import "./Style.css";
import gentImage from '../assets/gent.png';
import image3 from '../assets/image-3.png'; 
import image1 from '../assets/photo5.png';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="flyinTxtCont">
        <div className="text-container">
          <span>A</span>
          <span>L</span>
          <span>P</span>
          <span>H</span>
          <span>A</span>
        </div>
        <div className="text-container">
          <span>C</span>
          <span>U</span>
          <span>T</span>
          <span>Z</span>
        </div>
      </div>

      <div className="card card1">
        <img src={image3} alt="Gent" className="card-image flip-image" />
      </div>
      <div className="card card2">
        <img src={gentImage} alt="Gent" className="card-image rotate-on-hover" />
        <div className="overlay"></div>
      </div>
      <div className="card card3">
        <img src={image1} alt="Image 3" className="card-image rotate-on-hover" />
      </div>
    </div>
  );
};

export default Hero;
