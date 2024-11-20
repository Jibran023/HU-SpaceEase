// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import './books.css';

// const RoomBooking = () => {
//   const rooms = [
//     { id: 1, type: 'Classroom', name: 'Classroom 101', description: 'A medium-sized classroom with seating capacity for 40 students.', image: './images/audi4.jpg' },
//     { id: 2, type: 'Hall', name: 'Main Hall', description: 'A spacious hall suitable for events and seminars.', image: './images/audi4.jpg' },
//     { id: 3, type: 'Classroom', name: 'Classroom 202', description: 'A small classroom perfect for group studies.', image: './images/audi4.jpg' },
//     { id: 4, type: 'Lab', name: 'Computer Lab', description: 'Equipped with high-end computers for coding and simulations.', image: './images/audi4.jpg' },
//     { id: 5, type: 'Lab', name: 'Physics Lab', description: 'Fully equipped for experimental physics.', image: './images/audi4.jpg' },
//     { id: 6, type: 'Hall', name: 'Mini Auditorium', description: 'A smaller space ideal for presentations and meetings.', image: './images/audi4.jpg' },
//   ];

//   const navigate = useNavigate();
//   const [filter, setFilter] = useState('All');

//   const handleBack = () => navigate(-1);
//   const handleRefresh = () => window.location.reload();
//   const handleFilterChange = (event) => setFilter(event.target.value);
//   const filteredRooms = filter === 'All' ? rooms : rooms.filter(room => room.type === filter);

//   const navigateToStatus = (e) => {
//     e.preventDefault();
//     navigate('/forms');
//   };

//   return (
//     <div className="room-booking-container">
//       {/* Simple Navbar */}
//       <div className="simple-navbar">
//         <button onClick={handleBack} className="nav-button">Back</button>
//         <button onClick={handleRefresh} className="nav-button">Refresh</button>
//       </div>

//       <div className="filter-section">
//         <select onChange={handleFilterChange} value={filter}>
//           <option value="All">Enter Type</option>
//           <option value="Classroom">Classrooms</option>
//           <option value="Hall">Halls</option>
//           <option value="Lab">Labs</option>
//         </select>
//       </div>

//       <div className="rooms-section">
//         {filteredRooms.map(room => (
//           <div key={room.id} className="room-item">
//             <div className="Details">
//               <h3>{room.name}</h3>
//               <p className="description-para">{room.description}</p>
//               <img src={room.image} alt={room.name} className="room-image" />
//             </div>
//             <div className="Button-div">
//               <button className="book-button" onClick={navigateToStatus}>Book Now!</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default RoomBooking;










import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./books.css";

const RoomBooking = () => {
  const [rooms, setRooms] = useState([]); // State to hold room data
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  // Fetch room data from the API when the component loads
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/room-api/all"); // Fetch from backend
        const data = await response.json();
        if (response.ok) {
          setRooms(data.rooms); // Update state with room data
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleBack = () => navigate(-1);
  const handleRefresh = () => window.location.reload();
  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredRooms =
    filter === "All" ? rooms : rooms.filter((room) => room.type === filter);

  const navigateToStatus = (e) => {
    e.preventDefault();
    navigate("/forms");
  };

  return (
    <div className="room-booking-container">
      {/* Simple Navbar */}
      <div className="simple-navbar">
        <button onClick={handleBack} className="nav-button">Back</button>
        <button onClick={handleRefresh} className="nav-button">Refresh</button>
      </div>

      <div className="filter-section">
        <select onChange={handleFilterChange} value={filter}>
          <option value="All">Enter Type</option>
          <option value="Classroom">Classrooms</option>
          <option value="Hall">Halls</option>
          <option value="Lab">Labs</option>
        </select>
      </div>

      <div className="rooms-section">
        {filteredRooms.map((room) => (
          <div key={room._id} className="room-item">
            <div className="Details">
              <h3>{room.room_name || room.name}</h3>
              <p className="description-para">{room.description || `Capacity: ${room.capacity}`}</p>
              <img
                src={`http://localhost:5000/images/${room.image.split('/').pop()}`} // Dynamically resolve image URL
                alt={room.room_name || room.name}
                className="room-image"
              />
            </div>
            <div className="Button-div">
              <button className="book-button" onClick={navigateToStatus}>Book Now!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomBooking;
