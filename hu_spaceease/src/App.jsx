import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages_user/Login.jsx';
import Dashboard from './pages_user/dashboard.jsx';
import Viewstatus from './pages_user/view_status.jsx';
import HUmap from './pages_user/hu_map.jsx';
import RoomBooking from './pages_user/books.jsx'
import FormRoom from './pages_user/form.jsx';
import About from './pages_user/about.jsx';
import Signup from './pages_user/signup.jsx';
import SuperUserDashboard from './pages_user/superuser_dashboard.jsx';
import RoomRequests from './pages_user/roomrequests.jsx';
import AdminLogin from './pages_user/adminlogin.jsx';
import './App.css'
import ChangePassword from './pages_user/ChangePassword.jsx';

function App() {

return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<RoomBooking/>}/>
        <Route path="/viewstatus" element={<Viewstatus />} />
        <Route path="/HUmap" element={<HUmap />} />
        <Route path="/forms" element={<FormRoom />} />
        <Route path="/About" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/superuser" element={<SuperUserDashboard />} />
        <Route path="/roomrequests" element={<RoomRequests />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />

      </Routes>
    </Router>
  </>
)
}

export default App
