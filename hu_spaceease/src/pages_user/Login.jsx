// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';


// function Login() {
//   const navigate = useNavigate();
  
//   const images = [
//     'images/audi.jpg',
//     'images/audi2.jpg',
//     'images/audi3.jpg',
//     'images/audi4.jpg',
//   ];
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//         setFade(true);
//       }, 1000);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate('/dashboard');
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     navigate('/signup');
//   };

//   const handleAdminPage = (e) => {
//     e.preventDefault();
//     navigate('/adminlogin'); // Navigate to the admin login page
//   };

//   return (
//     <>
//       <div
//         className={`login-wrapper ${fade ? 'fade-in' : 'fade-out'}`}
//         style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
//       >
//         <div className='semi-circle'>
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
//               <div className='form-links'>
//                 <p>Don't have an account? <a href="#" onClick={handleSignup}>Sign Up</a></p>
//               </div>
//               <div className='admin-login'>
//                 <p>Sign-in as Admin? <a href="#" onClick={handleAdminPage}>Admin Login</a></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const navigate = useNavigate();
  
//   const images = [
//     'images/audi.jpg',
//     'images/audi2.jpg',
//     'images/audi3.jpg',
//     'images/audi4.jpg',
//   ];
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//         setFade(true);
//       }, 1000);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         // Navigate to the dashboard on successful login
//         navigate('/dashboard');
//       } else {
//         alert('Login failed: ' + response.data.message);
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     navigate('/signup');
//   };

//   const handleAdminPage = (e) => {
//     e.preventDefault();
//     navigate('/adminlogin'); // Navigate to the admin login page
//   };

//   return (
//     <>
//       <div
//         className={`login-wrapper ${fade ? 'fade-in' : 'fade-out'}`}
//         style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
//       >
//         <div className='semi-circle'>
//           <div className='login-container'>
//             <h1 className='main-heading'>HU-SpaceEase</h1>
//             <div className='form-background'>
//               <h2 className='login-heading'>Welcome!</h2>
//               <form onSubmit={handleLogin}>
//                 <div className='input-group'>
//                   <label htmlFor='email'>Email</label>
//                   <input 
//                     type='email' 
//                     id='email' 
//                     placeholder='Enter your HU email' 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required 
//                   />
//                 </div>
//                 <div className='input-group'>
//                   <label htmlFor='password'>Password</label>
//                   <input 
//                     type='password' 
//                     id='password' 
//                     placeholder='Enter your password' 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                   />
//                 </div>
//                 <button type='submit'>Login</button>
//               </form>
//               <div className='form-links'>
//                 <p>Don't have an account? <a href="#" onClick={handleSignup}>Sign Up</a></p>
//               </div>
//               <div className='admin-login'>
//                 <p>Sign-in as Admin? <a href="#" onClick={handleAdminPage}>Admin Login</a></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

//.............................................................................
// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const navigate = useNavigate();
  
//   const images = [
//     'images/audi.jpg',
//     'images/audi2.jpg',
//     'images/audi3.jpg',
//     'images/audi4.jpg',
//   ];
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//         setFade(true);
//       }, 1000);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate('/dashboard');
//     // e.preventDefault();
//     // try {
//     //   const response = await axios.post('http://localhost:5000/api/login', {
//     //     email,
//     //     password,
//     //   });
//   }
//   //     if (response.data.success) {
//   //       // Navigate to the appropriate dashboard based on the user role
//   //       if (response.data.role === 'admin') {
//   //         navigate('/admin/dashboard'); // Admin dashboard
//   //       } else {
//   //         navigate('/dashboard'); // Student dashboard
//   //       }
//   //     } else {
//   //       alert('Login failed: ' + response.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error logging in:', error);
//   //     alert('An error occurred. Please try again.');
//   //   }
//   // };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     navigate('/signup');
//   };

//   const handleAdminPage = (e) => {
//     e.preventDefault();
//     navigate('/adminlogin'); // Navigate to the admin login page
//   };

//   return (
//     <>
//       <div
//         className={`login-wrapper ${fade ? 'fade-in' : 'fade-out'}`}
//         style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
//       >
//         <div className='semi-circle'>
//           <div className='login-container'>
//             <h1 className='main-heading'>HU-SpaceEase</h1>
//             <div className='form-background'>
//               <h2 className='login-heading'>Welcome!</h2>
//               <form onSubmit={handleLogin}>
//                 <div className='input-group'>
//                   <label htmlFor='email'>Email</label>
//                   <input 
//                     type='email' 
//                     id='email' 
//                     placeholder='Enter your HU email' 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required 
//                   />
//                 </div>
//                 <div className='input-group'>
//                   <label htmlFor='password'>Password</label>
//                   <input 
//                     type='password' 
//                     id='password' 
//                     placeholder='Enter your password' 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                   />
//                 </div>
//                 <button type='submit'>Login</button>
//               </form>
//               <div className='form-links'>
//                 <p>Don't have an account? <a href="#" onClick={handleSignup}>Sign Up</a></p>
//               </div>
//               <div className='admin-login'>
//                 <p>Sign-in as Admin? <a href="#" onClick={handleAdminPage}>Admin Login</a></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;



//....................................................................................
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
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

      if (response.ok && data.success) {
        // Navigate based on role
        if (data.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleAdminPage = (e) => {
    e.preventDefault();
    navigate('/adminlogin');
  };

  return (
    <div className='login-wrapper'>
      <div className='semi-circle'>
        <div className='login-container'>
          <h1 className='main-heading'>HU-SpaceEase</h1>
          <div className='form-background'>
            <h2 className='login-heading'>Welcome!</h2>
            <form onSubmit={handleLogin}>
              <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input 
                  type='email' 
                  id='email' 
                  placeholder='Enter your HU email' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input 
                  type='password' 
                  id='password' 
                  placeholder='Enter your password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type='submit'>Login</button>
            </form>
            <div className='form-links'>
              <p>Don't have an account? <a href="#" onClick={handleSignup}>Sign Up</a></p>
            </div>
            <div className='admin-login'>
              <p>Sign-in as Admin? <a href="#" onClick={handleAdminPage}>Admin Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
