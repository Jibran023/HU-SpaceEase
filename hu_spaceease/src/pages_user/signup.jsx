import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Logic to handle sign-up (e.g., form validation, backend API call)
    navigate('/dashboard'); // Navigate to dashboard upon successful signup
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <input type="text" className="form-control" placeholder="Full Name" required />
          <input type="email" className="form-control" placeholder="Email" required />
          <input type="password" className="form-control" placeholder="Password" required />
          <input type="password" className="form-control" placeholder="Confirm Password" required />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <div className="form-links">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
