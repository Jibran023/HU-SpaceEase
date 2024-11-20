import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages_user/Login.jsx";
import Dashboard from "./pages_user/dashboard.jsx";
import Viewstatus from "./pages_user/view_status.jsx";
import HUmap from "./pages_user/hu_map.jsx";
import RoomBooking from "./pages_user/books.jsx";
import FormRoom from "./pages_user/form.jsx";
import About from "./pages_user/about.jsx";
import Signup from "./pages_user/signup.jsx";
import SuperUserDashboard from "./pages_user/superuser_dashboard.jsx";
import RoomRequests from "./pages_user/roomrequests.jsx";
import AdminLogin from "./pages_user/adminlogin.jsx";
import ChangePassword from "./pages_user/ChangePassword.jsx";
import ProtectedRoute from "./pages_user/protectedRoute.jsx"; // Import ProtectedRoute
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <RoomBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewstatus"
          element={
            <ProtectedRoute>
              <Viewstatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/HUmap"
          element={
            <ProtectedRoute>
              <HUmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms"
          element={
            <ProtectedRoute>
              <FormRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/About"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superuser"
          element={
            <ProtectedRoute>
              <SuperUserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roomrequests"
          element={
            <ProtectedRoute>
              <RoomRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ChangePassword"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
