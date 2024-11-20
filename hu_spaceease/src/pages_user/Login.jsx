import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the logged-in user's credentials in localStorage
        localStorage.setItem("isLoggedIn", true); // Add a new flag for authentication
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", data.name); // Assuming `name` is in the response
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("userRole", data.user_role);

        // Navigate to the appropriate page based on role
        if (data.user_role === "student") {
          navigate("/dashboard");
        } else if (data.user_role === "admin") {
          navigate("/superuser");
        }
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Redirect to Signup page
  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  // Redirect to Admin login page
  const handleAdminPage = (e) => {
    e.preventDefault();
    navigate("/adminlogin");
  };

  return (
    <div className="login-wrapper">
      <div className="semi-circle">
        <div className="login-container">
          <h1 className="main-heading">HU-SpaceEase</h1>
          <div className="form-background">
            <h2 className="login-heading">Welcome!</h2>
            <form>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your HU email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" onClick={handleLogin}>
                Log in
              </button>
            </form>
            <div className="form-links">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={handleSignup}>
                  Sign Up
                </a>
              </p>
            </div>
            <div className="admin-login">
              <p>
                Sign-in as Admin?{" "}
                <a href="#" onClick={handleAdminPage}>
                  Admin Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
