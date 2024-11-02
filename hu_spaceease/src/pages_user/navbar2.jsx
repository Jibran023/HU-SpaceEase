import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDashboard = (e) => {
        e.preventDefault();
        navigate('/Dashboard');
    };

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
                <a href="#!" className="navbar-link" onClick={handlebookroom}>Book a Room</a>
                <a href="#!" className="navbar-link" onClick={handleviewroom}>View All Rooms</a>
                <a href="#!" className="navbar-link" onClick={handlestatus}>View Status</a>
                <a href="#!" className="navbar-link" onClick={handleMap}>HU-Map</a>
                <FontAwesomeIcon icon={faHome} className="navbar-icon" onClick={handleDashboard} />
                <div className="dropdown">
                    <FontAwesomeIcon icon={faBars} className="navbar-icon" onClick={toggleDropdown} />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogin}>Login</button>
                            <button onClick={handleRefresh}>Refresh</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
