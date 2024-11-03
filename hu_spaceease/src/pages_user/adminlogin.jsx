// AdminLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Add specific styles for the admin login if needed

function AdminLogin() {
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Logic to handle admin authentication can go here
    navigate('/superuser'); // Navigate to the superuser dashboard after successful login
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
      </div>
    </div>
  );
}

export default AdminLogin;
