import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/dashboard.jsx';
import Viewrooms from './pages/view_rooms.jsx';
// import Bookroom from './pages/book_a_room.jsx';
import Viewstatus from './pages/view_status.jsx';
import HUmap from './pages/hu_map.jsx';
import RoomBooking from './pages/books.jsx'
import FormRoom from './pages/form.jsx';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<RoomBooking/>}/>
          <Route path="/viewrooms" element={<Viewrooms />} />
          <Route path="/viewstatus" element={<Viewstatus />} />
          <Route path="/HUmap" element={<HUmap />} />
          <Route path="/forms" element={<FormRoom />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
