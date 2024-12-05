import React, { useEffect, useState, useRef } from "react";
import "./Style.css";

const BarberPage = () => {
    const [hoverEffect, setHoverEffect] = useState(false);
    const barberSectionRef = useRef(null);

    useEffect(() => {
        // Funksioni i scroll-it që aktivizohet kur përdoruesi scrolldon
        const handleScroll = () => {
            if (barberSectionRef.current) {
                const rect = barberSectionRef.current.getBoundingClientRect();
                setHoverEffect(rect.top < window.innerHeight && rect.bottom >= 0);
            }
        };

        // Shto event listener për scroll
        window.addEventListener("scroll", handleScroll);

        // Pastrimi i event listener-it kur komponenti largohet
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Bëje këtë vetëm një herë kur komponenti të ngarkohet

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
