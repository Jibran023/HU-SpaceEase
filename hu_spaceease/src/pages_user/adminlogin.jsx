// AdminLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Logic to handle admin authentication can go here
    navigate('/superuser'); // Navigate to the superuser dashboard after successful login
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate('/'); // Navigate back to the normal login page
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <h1 className="admin-login-heading">Admin Login</h1>
        <form onSubmit={handleAdminLogin}>
          <div className="input-group">
            <label htmlFor="admin-email">Email</label>
            <input type="email" id="admin-email" placeholder="Enter your admin email" required />
          </div>
          <div className="input-group">
            <label htmlFor="admin-password">Password</label>
            <input type="password" id="admin-password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="admin-login-button">Login</button>
        </form>
        <button onClick={handleBackToLogin} className="back-button">Back to User Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
