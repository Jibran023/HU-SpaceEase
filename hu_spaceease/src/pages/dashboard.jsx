import React from 'react';
import './Dashboard.css'; 

import { useNavigate } from 'react-router-dom';
import Navbar from './navbar2'; 

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
    
    return (
        <>
            <Navbar /> 
            <div className="dashboard-container">
                <div className="grid-container">
                    <div className="grid-item" onClick={handlebookroom}>
                        <img src="images/door.png" alt="Rooms" className="icon" />
                        <p>Book a Room</p>
                    </div>
                    <div className="grid-item" onClick={handleviewroom}>
                        <img src="images/my_rooms.png" alt="Rooms1" className="icon" />
                        <p>View all Rooms</p>
                    </div>
                    <div className="grid-item" onClick={handlestatus}>
                        <img src="images/status.png" alt="Status" className="icon" />
                        <p>View Status</p>
                    </div>
                    <div className="grid-item" onClick={handleMap}>
                        <img src="images/map_logo.jpg" alt="Map" className="icon" />
                        <p>HU-Map</p>
                    </div>
                </div>
            </div>
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
