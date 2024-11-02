// RoomCards.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './few_rooms_dashboard.css';

const RoomCards = () => {
    const navigate = useNavigate();

    const rooms = [
        {
            id: 1,
            name: 'Classroom 101',
            description: 'A medium-sized classroom with seating capacity for 40 students.',
            image: './images/audi4.jpg',
        },
        {
            id: 2,
            name: 'Main Hall',
            description: 'A spacious hall suitable for events and seminars.',
            image: './images/audi4.jpg',
        },
        {
            id: 3,
            name: 'Computer Lab',
            description: 'Equipped with high-end computers for coding and simulations.',
            image: './images/audi4.jpg',
        },
    ];

    const handleViewMore = () => {
        navigate('/books'); // Navigate to the booking page
    };

    return (
        <div className="room-cards-container">
            <h2 className="featured-title">Featured Rooms</h2>
            <div className="room-cards">
                {rooms.map(room => (
                    <div key={room.id} className="room-card">
                        <div className="room-details">
                            <h3>{room.name}</h3>
                            <p>{room.description}</p>
                        </div>
                        <img src={room.image} alt={room.name} className="room-image" />
                        <button className="view-more-button" onClick={handleViewMore}>
                            View More Rooms
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomCards;
