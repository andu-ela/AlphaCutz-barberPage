import React, { useEffect, useState, useRef } from "react";
import "./Style.css";

const BarberPage = () => {
    const [hoverEffect, setHoverEffect] = useState(false);
    const barberSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (barberSectionRef.current) {
                const rect = barberSectionRef.current.getBoundingClientRect();
                setHoverEffect(rect.top < window.innerHeight && rect.bottom >= 0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={barberSectionRef} className={`barber-container ${hoverEffect ? "hovered" : ""}`}>
            <p className="barber-description">
                Welcome to AlphaCutz  <br /> <br /> Where style meets care! We provide personalized
                haircuts, beard grooming, and modern services to help you look and feel your best.
                Visit us for a relaxing and professional experience in the hands of our skilled
                barbers. Book your appointment now and refresh your look!
            </p>
        </div>
    );
};

export default BarberPage;
