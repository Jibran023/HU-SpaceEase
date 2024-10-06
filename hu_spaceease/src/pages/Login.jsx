// import React from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Add your login logic here (e.g., API call to authenticate)

//     // On successful login, navigate to the dashboard
//     navigate('/dashboard');
//   };

//   return (
//     <>
//       <div className='navbar2'>
//         <div className='logo-container'>
//           <img src="images/hu_loho.PNG" alt="Habib University Logo" className='navbar-logo'/>
//         </div>
//       </div>

//       <div className="login-wrapper">
//         <div className="semi-circle">
//           <div className='login-container'>
//             <h1 className='main-heading'>HU-SpaceEase</h1>
//             <div className='form-background'>
//               <h2 className='login-heading'>Welcome!</h2>
//               <form onSubmit={handleLogin}>
//                 <div className='input-group'>
//                   <label htmlFor='email'>Email</label>
//                   <input type='email' id='email' placeholder='Enter your HU email' />
//                 </div>
//                 <div className='input-group'>
//                   <label htmlFor='password'>Password</label>
//                   <input type='password' id='password' placeholder='Enter your password' />
//                 </div>
//                 <button type='submit'>Login</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const images = [
    'images/audi.jpg',
    'images/audi2.jpg',
    'images/audi3.jpg',
    'images/audi4.jpg',
  ]; // Array of background images
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Set an interval to change the image every 3 seconds
    const interval = setInterval(() => {
      setFade(false); // Trigger fade-out effect
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image index
        setFade(true); // Trigger fade-in effect
      }, 1000); // 1 second delay for fade-out
    }, 4000); // Change image every 4 seconds (includes 1s fade-out)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <div
        className={`login-wrapper ${fade ? 'fade-in' : 'fade-out'}`}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className='semi-circle'>
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
      </div>
    </>
  );
}

export default Login;
