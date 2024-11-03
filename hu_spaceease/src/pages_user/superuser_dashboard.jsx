import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar2'; // Assuming this is your Navbar component's file path
import ServicesSection from './services_section';
import RoomCards from './few_rooms_dashboard';

function SuperUserDashboard() {
    const navigate = useNavigate();

    const images = [
        'images/audi.jpg',
        'images/audi3.jpg',
        'images/audi4.jpg',
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            {/* Pass isAdmin={true} to show "Manage Room Requests" in Navbar */}
            <Navbar isAdmin={true} />
            
            <div className="title-banner">
                HU-SpaceEase - Superuser Dashboard
            </div>
            <div className="slideshow-container">
                <img
                    src={images[currentImageIndex]}
                    alt="Slideshow"
                    className="slideshow-image"
                />
            </div>
            
            <RoomCards />
            <ServicesSection />

            <div className="footer-bar">
                <div className="footer-content">
                    <a href="mailto:servicedesk@habib.edu.pk" className="footer-link">servicedesk@habib.edu.pk</a>
                    <a href="https://habibuniversity.sharepoint.com/sites/Student/application-handbook" className="footer-link">Application Handbook</a>
                </div>
            </div>
        </>
    );
}

export default SuperUserDashboard;
