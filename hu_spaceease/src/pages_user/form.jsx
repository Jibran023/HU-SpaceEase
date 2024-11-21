import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './form.css';

function FormRoom() {
const navigate = useNavigate();

  const { id: roomId } = useParams(); // Get the room ID from URL
  const [roomDetails, setRoomDetails] = useState(null); // State for room details
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedAdminRights, setAcceptedAdminRights] = useState(false);
  const [error, setError] = useState('');

  // Get user details from localStorage
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userId = localStorage.getItem('userId') || '';

  // Fetch room details from the backend
  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/room-api/${roomId}`);
      const data = await response.json();

      if (response.ok) {
        setRoomDetails(data.room); // Update state with room data
      } else {
        setError('Failed to load room details');
      }
    } catch (err) {
      setError('An error occurred while fetching room details');
    }
  };

  useEffect(() => {
   
    fetchRoomDetails();
  }, [roomId]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // Validate time slot (start time must be before end time)
    if (startTime >= endTime) {
      setError('End time must be after start time.');
      return;
    }

    // Validate checkbox acceptance
    if (!acceptedTerms || !acceptedAdminRights) {
      setError('Please accept the terms and conditions.');
      return;
    }

    const bookingDetails = {
      userName,
      userEmail,
      userId,
      roomId,
      roomName: roomDetails.room_name || roomDetails.name,
      startDate,
      time_slot: `${startTime}-${endTime}`,
      reason,
    };

    try {
      const response = await fetch('http://localhost:5000/room-api/book-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking submitted successfully!');
        // Reset form
        setStartDate('');
        setStartTime('');
        setEndTime('');
        setReason('');
        setAcceptedTerms(false);
        setAcceptedAdminRights(false);
        navigate("/dashboard");
        
      } else {
        setError(data.message || 'Failed to submit booking.');
      }
    } catch (err) {
      setError('An error occurred while submitting your booking.');
    }
  };

  if (!roomDetails) {
    return <p>Loading room details...</p>; // Display a loading message until data is fetched
  }

  return (
    <div className="book-room-container">
      <h1 className="book-room-header">Book {roomDetails.room_name || roomDetails.name}</h1>

      <form className="book-room-form" onSubmit={handleSubmit}>
        <label htmlFor="userName">Your Name</label>
        <input type="text" id="userName" value={userName} readOnly />

        <label htmlFor="userEmail">Email</label>
        <input type="email" id="userEmail" value={userEmail} readOnly />

        <label htmlFor="userId">User ID</label>
        <input type="text" id="userId" value={userId} readOnly />

        <label htmlFor="roomName">Room Name</label>
        <input type="text" id="roomName" value={roomDetails.room_name || roomDetails.name} readOnly />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <label htmlFor="reason">Reason for Booking</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter the reason for booking"
          required
        ></textarea>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
          />
          <label htmlFor="terms">I accept the rules and regulations for booking the room.</label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="adminRights"
            checked={acceptedAdminRights}
            onChange={() => setAcceptedAdminRights(!acceptedAdminRights)}
          />
          <label htmlFor="adminRights">
            The admin reserves the right to cancel the booking if you don't show up within 5-10 minutes.
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default FormRoom;
