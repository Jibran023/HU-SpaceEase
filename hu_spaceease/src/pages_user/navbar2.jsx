import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ isAdmin }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDashboard = (e) => {
        e.preventDefault();
        // Navigate to the superuser dashboard if isAdmin is true, otherwise go to normal dashboard
        navigate(isAdmin ? '/superuser' : '/dashboard');
    };

    // const handleViewRoom = (e) => {
    //     e.preventDefault();
    //     navigate('/viewrooms');
    // };

    const handleBookRoom = (e) => {
        e.preventDefault();
        navigate('/books');
    };

    const handleStatus = (e) => {
        e.preventDefault();
        navigate('/viewstatus');
    };

    const handleMap = (e) => {
        e.preventDefault();
        navigate('/HUmap');
    };

    const handleRoomRequests = (e) => {
        e.preventDefault();
        navigate('/roomrequests');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/'); // Navigate to the login page
    };

    const handleRefresh = () => {
        window.location.reload(); // Refresh the page
    };

    return (
        <div className="navbar">
            <h1 className="navbar-title">HU-SpaceEase</h1>
            <div className="navbar-icons">
                <a href="#!" className="navbar-link" onClick={handleBookRoom}>Book a Room</a>
                
                {/* Add "Manage Room Requests" link if isAdmin is true */}
                {isAdmin && (
                    <a href="#!" className="navbar-link" onClick={handleRoomRequests}>Manage Room Requests</a>
                )}
                
                {/* <a href="#!" className="navbar-link" onClick={handleViewRoom}>View All Rooms</a> */}
                <a href="#!" className="navbar-link" onClick={handleStatus}>View Status</a>
                <a href="#!" className="navbar-link" onClick={handleMap}>HU-Map</a>
                
                <FontAwesomeIcon icon={faHome} className="navbar-icon" onClick={handleDashboard} />
                <div className="dropdown">
                    <FontAwesomeIcon icon={faBars} className="navbar-icon" onClick={toggleDropdown} />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogin}>Logout</button>
                            <button onClick={handleRefresh}>Refresh</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
