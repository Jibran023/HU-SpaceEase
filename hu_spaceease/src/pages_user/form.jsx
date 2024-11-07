// import React, { useState } from 'react';
// import './form.css'; 

// function FormRoom() {
//     const [userData, setUserData] = useState({
//         name: "John Doe",
//         studentID: "123456789",
//         batch: "2023",
//         room: "Library" 
//     });

//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [time, setTime] = useState('');
//     const [reason, setReason] = useState('');
//     const [acceptedTerms, setAcceptedTerms] = useState(false);
//     const [acceptedAdminRights, setAcceptedAdminRights] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!startDate || !endDate || !time || !reason || !acceptedTerms || !acceptedAdminRights) {
//             setError('Please fill in all fields and accept the terms.');
//         } else if (new Date(startDate) > new Date(endDate)) {
//             setError('Start date cannot be later than the end date.');
//         } else {
//             setError('');
//             console.log('Booking details:', { ...userData, startDate, endDate, time, reason });
//         }
//     };

//     const roomImages = {
//         Library: 'public\\images\\audi.jpg',
//         Auditorium: 'public\\images\\audi.jpg',
//         "Classroom A": 'public\\images\\audi.jpg'
//     };

//     return (
//         <div className="book-room-container">
//             <h1 className="book-room-header">Book a Room</h1>

//             <form className="book-room-form" onSubmit={handleSubmit}>
//                 <label htmlFor="name">Your Name</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={userData.name}
//                     readOnly
//                 />

//                 <label htmlFor="batchNumber">Batch Number</label>
//                 <input
//                     type="text"
//                     id="batchNumber"
//                     value={userData.batch}
//                     readOnly
//                 />

//                 <label htmlFor="userID">Student ID</label>
//                 <input
//                     type="text"
//                     id="userID"
//                     value={userData.studentID}
//                     readOnly
//                 />

//                 <label htmlFor="room">Room Name</label>
//                 <input
//                     type="text"
//                     id="room"
//                     value={userData.room}
//                     readOnly
//                 />

//                 <label htmlFor="startDate">Start Date</label>
//                 <input
//                     type="date"
//                     id="startDate"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                 />

//                 <label htmlFor="endDate">End Date</label>
//                 <input
//                     type="date"
//                     id="endDate"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                 />

//                 <label htmlFor="time">Booking Time</label>
//                 <input
//                     type="time"
//                     id="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                 />

//                 <label htmlFor="reason">Reason for Booking</label>
//                 <textarea
//                     id="reason"
//                     value={reason}
//                     onChange={(e) => setReason(e.target.value)}
//                     placeholder="Enter the reason for booking"
//                 ></textarea>

//                 <div className="checkbox-group">
//                     <input
//                         type="checkbox"
//                         id="terms"
//                         checked={acceptedTerms}
//                         onChange={() => setAcceptedTerms(!acceptedTerms)}
//                     />
//                     <label htmlFor="terms">
//                         I accept the rules and regulations for booking the room.
//                     </label>
//                 </div>

//                 <div className="checkbox-group">
//                     <input
//                         type="checkbox"
//                         id="adminRights"
//                         checked={acceptedAdminRights}
//                         onChange={() => setAcceptedAdminRights(!acceptedAdminRights)}
//                     />
//                     <label htmlFor="adminRights">
//                         The admin reserves the right to cancel the booking if you don't show up within 5-10 minutes.
//                     </label>
//                 </div>

//                 {error && <p className="error-message">{error}</p>}

//                 <button type="submit">Submit Booking</button>
//             </form>

//             {userData.room && (
//                 <div className="room-image-container">
//                     <img
//                         src={roomImages[userData.room]}
//                         alt={`${userData.room} Image`}
//                         className="room-image"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default FormRoom;








import React, { useState, useEffect } from 'react';
import './form.css';

function FormRoom() {
    const [userData, setUserData] = useState({
        name: "",
        studentID: "",
        batch: "2023",
        room: "Library"
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedAdminRights, setAcceptedAdminRights] = useState(false);
    const [error, setError] = useState('');

    // UseEffect to retrieve user info from localStorage on component mount
    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const userId = localStorage.getItem('userId');

        // Set the retrieved name and userId in userData state
        setUserData(prevData => ({
            ...prevData,
            name: userName || "",     // Fallback to empty if not found
            studentID: userId || ""   // Fallback to empty if not found
        }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate || !time || !reason || !acceptedTerms || !acceptedAdminRights) {
            setError('Please fill in all fields and accept the terms.');
        } else if (new Date(startDate) > new Date(endDate)) {
            setError('Start date cannot be later than the end date.');
        } else {
            setError('');
            console.log('Booking details:', { ...userData, startDate, endDate, time, reason });
        }
    };

    const roomImages = {
        Library: 'public\\images\\audi.jpg',
        Auditorium: 'public\\images\\audi.jpg',
        "Classroom A": 'public\\images\\audi.jpg'
    };

    return (
        <div className="book-room-container">
            <h1 className="book-room-header">Book a Room</h1>

            <form className="book-room-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={userData.name}
                    readOnly
                />

                <label htmlFor="batchNumber">Batch Number</label>
                <input
                    type="text"
                    id="batchNumber"
                    value={userData.batch}
                    readOnly
                />

                <label htmlFor="userID">Student ID</label>
                <input
                    type="text"
                    id="userID"
                    value={userData.studentID}
                    readOnly
                />

                <label htmlFor="room">Room Name</label>
                <input
                    type="text"
                    id="room"
                    value={userData.room}
                    readOnly
                />

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

                <label htmlFor="time">Booking Time</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <label htmlFor="reason">Reason for Booking</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter the reason for booking"
                ></textarea>

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

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Submit Booking</button>
            </form>

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

export default FormRoom;
