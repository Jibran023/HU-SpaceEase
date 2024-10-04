import React, { useState } from 'react';
import './books.css';

const RoomBooking = () => {
  // Sample data for rooms
  const rooms = [
    {
      id: 1,
      type: 'Classroom',
      name: 'Classroom 101',
      description: 'A medium-sized classroom with seating capacity for 40 students.',
      image: './images/audi4.jpg', // Replace with your image URL
    },
    {
      id: 2,
      type: 'Hall',
      name: 'Main Hall',
      description: 'A spacious hall suitable for events and seminars.',
      image: './images/audi4.jpg',
    },
    {
      id: 3,
      type: 'Classroom',
      name: 'Classroom 202',
      description: 'A small classroom perfect for group studies.',
      image: './images/audi4.jpg',
    },
    {
      id: 4,
      type: 'Lab',
      name: 'Computer Lab',
      description: 'Equipped with high-end computers for coding and simulations.',
      image: './images/audi4.jpg',
    },
    {
        id: 5,
        type: 'Lab',
        name: 'Computer Lab',
        description: 'Equipped with high-end computers for coding and simulations.',
        image: './images/audi4.jpg',
      },
      {
        id: 6,
        type: 'Lab',
        name: 'Computer Lab',
        description: 'Equipped with high-end computers for coding and simulations.',
        image: './images/audi4.jpg',
      },
  ];

  const [filter, setFilter] = useState('All');

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter rooms based on the selected type
  const filteredRooms = filter === 'All' ? rooms : rooms.filter(room => room.type === filter);

  return (
    <div className="room-booking-container">
      {/* Filter Section */}
      <div className="filter-section">
        <select onChange={handleFilterChange} value={filter}>
          <option value="All">Enter Type</option>
          <option value="Classroom">Classrooms</option>
          <option value="Hall">Halls</option>
          <option value="Lab">Labs</option>
        </select>
      </div>

      {/* Rooms Display Section */}
      <div className="rooms-section">
        {filteredRooms.map(room => (
          <div key={room.id} className="room-item">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <img src={room.image} alt={room.name} className="room-image"/>
            <div>
              <button className="book-button">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomBooking;
