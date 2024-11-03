// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar2'; 
import ServicesSection from './services_section';
import RoomCards from './few_rooms_dashboard';

function Dashboard() {
    const navigate = useNavigate(); 

    const handleviewroom = (e) => {
        e.preventDefault(); 
        navigate('/viewrooms');
    };

    const handlebookroom = (e) => {
        e.preventDefault(); 
        navigate('/books');
    };

    const handlestatus = (e) => {
        e.preventDefault(); 
        navigate('/viewstatus');
    };

    const handleMap = (e) => {
        e.preventDefault(); 
        navigate('/HUmap');
    };

    // Slideshow feature
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

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <>
            <Navbar isAdmin={false} /> {/* Explicitly set isAdmin to false */}
            <div className="title-banner">
                HU-SpaceEase
            </div>
            <div className="slideshow-container">
                <img 
                    src={images[currentImageIndex]} 
                    alt="Slideshow" 
                    className="slideshow-image" 
                />
            </div>
            
            <RoomCards/>
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

export default Dashboard;  
