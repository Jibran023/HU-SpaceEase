import React from 'react';
import './Dashboard.css'; // You can define your custom styles here
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar2'; // Import the Navbar component

function Dashboard() {
    const navigate = useNavigate(); // Get the navigation function

    const handleviewroom = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        navigate('/viewrooms');
    };

    const handlebookroom = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        navigate('/bookaroom');
    };

    const handlestatus = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        navigate('/viewstatus');
    };

    const handleMap = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
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
        </>
    );
}

export default Dashboard;
