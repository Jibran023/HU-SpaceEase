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












// rooms.jsx (RoomBooking.jsx)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './books.css';
import InsertRoomForm from './insert_rooms';  // Import the new InsertRoomForm component

const RoomBooking = () => {
  const rooms = [
    { id: 1, type: 'Classroom', name: 'Classroom 101', description: 'A medium-sized classroom with seating capacity for 40 students.', image: './images/audi4.jpg' },
    { id: 2, type: 'Hall', name: 'Main Hall', description: 'A spacious hall suitable for events and seminars.', image: './images/audi4.jpg' },
    { id: 3, type: 'Classroom', name: 'Classroom 202', description: 'A small classroom perfect for group studies.', image: './images/audi4.jpg' },
    { id: 4, type: 'Lab', name: 'Computer Lab', description: 'Equipped with high-end computers for coding and simulations.', image: './images/audi4.jpg' },
    { id: 5, type: 'Lab', name: 'Physics Lab', description: 'Fully equipped for experimental physics.', image: './images/audi4.jpg' },
    { id: 6, type: 'Hall', name: 'Mini Auditorium', description: 'A smaller space ideal for presentations and meetings.', image: './images/audi4.jpg' },
  ];

  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [showInsertForm, setShowInsertForm] = useState(false);

  const handleBack = () => navigate(-1);
  const handleRefresh = () => window.location.reload();
  const handleFilterChange = (event) => setFilter(event.target.value);
  const filteredRooms = filter === 'All' ? rooms : rooms.filter(room => room.type === filter);

  const navigateToStatus = (e) => {
    e.preventDefault();
    navigate('/forms');
  };

  const handleInsertRoom = () => {
    setShowInsertForm(!showInsertForm); // Toggle the form visibility
  };

  // Function to handle submitting the new room data to the backend
  const handleInsertRoomSubmit = async (roomData) => {
    try {
      const response = await fetch('http://localhost:3000/api/insert-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...roomData,
          added_by: localStorage.getItem('adminName') || 'Unknown Admin'
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert('Room added successfully');
        setShowInsertForm(false); // Hide the form
      } else {
        alert(result.message || 'Failed to add room');
      }
    } catch (error) {
      console.error('Error adding room:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="room-booking-container">
      {/* Simple Navbar */}
      <div className="simple-navbar">
        <button onClick={handleBack} className="nav-button">Back</button>
        <button onClick={handleRefresh} className="nav-button">Refresh</button>
      </div>

      {/* Insert Room Button for Admins */}
      <button onClick={handleInsertRoom} className="insert-room-button">
        {showInsertForm ? 'Cancel' : 'Insert Room'}
      </button>

      {/* Show Insert Room Form if button is clicked */}
      {showInsertForm && <InsertRoomForm onSubmit={handleInsertRoomSubmit} />}

      <div className="filter-section">
        <select onChange={handleFilterChange} value={filter}>
          <option value="All">Enter Type</option>
          <option value="Classroom">Classrooms</option>
          <option value="Hall">Halls</option>
          <option value="Lab">Labs</option>
        </select>
      </div>

      <div className="rooms-section">
        {filteredRooms.map(room => (
          <div key={room.id} className="room-item">
            <div className="Details">
              <h3>{room.name}</h3>
              <p className="description-para">{room.description}</p>
              <img src={room.image} alt={room.name} className="room-image" />
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
