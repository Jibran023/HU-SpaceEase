import React, { useState, useEffect } from 'react';
import './form.css'; // Ensure this CSS file is linked

function Bookroom() {
    // Simulate fetching user data from login (this could come from context or props in a real app)
    const [userData, setUserData] = useState({
        name: "John Doe",
        studentID: "123456789",
        batch: "2023",
        room: "Library" // This should come from homepage or room selection logic
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedAdminRights, setAcceptedAdminRights] = useState(false);
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate || !time || !reason || !acceptedTerms || !acceptedAdminRights) {
            setError('Please fill in all fields and accept the terms.');
        } else if (new Date(startDate) > new Date(endDate)) {
            setError('Start date cannot be later than the end date.');
        } else {
            setError('');
            // Process form submission here
            console.log('Booking details:', { ...userData, startDate, endDate, time, reason });
        }
    };

    // Room images based on room selection
    const roomImages = {
        Library: 'C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\hu_spaceease\\public\\images\\audi.jpg',
        Auditorium: 'C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\hu_spaceease\\public\\images\\audi.jpg',
        "Classroom A": 'C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\hu_spaceease\\public\\images\\audi.jpg'
    };

    return (
        <div className="book-room-container">
            <h1 className="book-room-header">Book a Room</h1>

            {/* Form for booking */}
            <form className="book-room-form" onSubmit={handleSubmit}>
                {/* Name Field (Pre-filled, uneditable) */}
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={userData.name}
                    readOnly
                />

                {/* Batch Number Field (Pre-filled, uneditable) */}
                <label htmlFor="batchNumber">Batch Number</label>
                <input
                    type="text"
                    id="batchNumber"
                    value={userData.batch}
                    readOnly
                />

                {/* User ID (Pre-filled, uneditable) */}
                <label htmlFor="userID">Student ID</label>
                <input
                    type="text"
                    id="userID"
                    value={userData.studentID}
                    readOnly
                />

                {/* Room Name (Pre-filled, uneditable) */}
                <label htmlFor="room">Room Name</label>
                <input
                    type="text"
                    id="room"
                    value={userData.room}
                    readOnly
                />

                {/* Start and End Dates */}
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                {/* Booking Time */}
                <label htmlFor="time">Booking Time</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                {/* Reason for Booking */}
                <label htmlFor="reason">Reason for Booking</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter the reason for booking"
                ></textarea>

                {/* Terms and Conditions */}
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <label htmlFor="terms">
                        I accept the rules and regulations for booking the room.
                    </label>
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

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Submit Button */}
                <button type="submit">Submit Booking</button>
            </form>

            {/* Display Room Image */}
            {userData.room && (
                <div className="room-image-container">
                    <img
                        src={roomImages[userData.room]}
                        alt={`${userData.room} Image`}
                        className="room-image"
                    />
                </div>
            )}
        </div>
    );
}

export default Bookroom;
