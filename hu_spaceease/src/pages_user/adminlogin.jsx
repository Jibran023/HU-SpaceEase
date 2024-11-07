// // AdminLogin.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css';

// function AdminLogin() {
//   const navigate = useNavigate();

//   const handleAdminLogin = (e) => {
//     e.preventDefault();
//     // Logic to handle admin authentication can go here
//     navigate('/superuser'); // Navigate to the superuser dashboard after successful login
//   };

//   const handleBackToLogin = (e) => {
//     e.preventDefault();
//     navigate('/'); // Navigate back to the normal login page
//   };

//   return (
//     <div className="admin-login-wrapper">
//       <div className="admin-login-container">
//         <h1 className="admin-login-heading">Admin Login</h1>
//         <form onSubmit={handleAdminLogin}>
//           <div className="input-group">
//             <label htmlFor="admin-email">Email</label>
//             <input type="email" id="admin-email" placeholder="Enter your admin email" required />
//           </div>
//           <div className="input-group">
//             <label htmlFor="admin-password">Password</label>
//             <input type="password" id="admin-password" placeholder="Enter your password" required />
//           </div>
//           <button type="submit" className="admin-login-button">Login</button>
//         </form>
//         <button onClick={handleBackToLogin} className="back-button">Back to User Login</button>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;


















// AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success && data.role === 'admin') {
        // Save admin's name to use in "added_by" field later
        localStorage.setItem('adminName', data.name);
        navigate('/superuser'); // Navigate to the superuser dashboard if the role is admin
      } else {
        setError('Invalid admin credentials or not an admin');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
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
            <input type="email" id="admin-email" placeholder="Enter your admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="admin-password">Password</label>
            <input type="password" id="admin-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="admin-login-button">Login</button>
        </form>
        <button onClick={handleBackToLogin} className="back-button">Back to User Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
