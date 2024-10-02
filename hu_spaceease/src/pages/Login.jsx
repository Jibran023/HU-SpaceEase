import React from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Get the navigation function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    // Add your login logic here (e.g., API call to authenticate)

    // On successful login, navigate to the dashboard
    navigate('/dashboard');
  };

    return (
      <>
        <div className='navbar2'>
          <div className='logo-container'>
            <img src="images/hu_loho.PNG" alt="Habib University Logo" className='navbar-logo'/>
          </div>
        </div>
        <div className='app-container'>
          <div className='image-container'>
            <img src="images/audi.jpg" alt="Login Image" className="login-image" />
          </div>
          <div className='login-container'>
          <h1 className='main-heading'>HU-SpaceEase</h1>
            <div className='form-background'>
              <h2 className='login-heading'>Welcome!</h2>
              <form onSubmit={handleLogin}>
                <div className='input-group'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' id='email' placeholder='Enter your HU email' />
                </div>
                <div className='input-group'>
                  <label htmlFor='password'>Password</label>
                  <input type='password' id='password' placeholder='Enter your password' />
                </div>
                <button type='submit'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Login