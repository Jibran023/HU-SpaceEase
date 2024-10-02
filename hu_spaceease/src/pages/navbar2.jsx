import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 


function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Get the navigation function

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        

        
        navigate('/');
    };

    const handleRefresh = () => {
        // our refresh logic will go here
        console.log("Refreshed");
    };

    const handleDashboard = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        navigate('/Dashboard');
    };


    return (
        <div className="navbar">
            <h1 className="navbar-title">HU-SpaceEase</h1>
            <div className="navbar-icons">
                <FontAwesomeIcon icon={faHome} className="navbar-icon" onClick={handleDashboard}/>
                <div className="dropdown">
                    <FontAwesomeIcon icon={faBars} className="navbar-icon" onClick={toggleDropdown}/>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleRefresh}>Refresh</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
