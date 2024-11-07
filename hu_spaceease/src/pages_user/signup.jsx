// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Signup.css';

// function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Logic to handle sign-up (e.g., form validation, backend API call)
//     navigate('/dashboard'); // Navigate to dashboard upon successful signup
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <h2>Create an Account</h2>
//         <form onSubmit={handleSignup}>
//           <input type="text" className="form-control" placeholder="Full Name" required />
//           <input type="email" className="form-control" placeholder="Email" required />
//           <input type="password" className="form-control" placeholder="Password" required />
//           <input type="password" className="form-control" placeholder="Confirm Password" required />
//           <button type="submit" className="btn btn-primary">Sign Up</button>
//         </form>
//         <div className="form-links">
//           <p>Already have an account? <Link to="/">Login</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;








import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the dashboard upon successful signup
        navigate('/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
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
