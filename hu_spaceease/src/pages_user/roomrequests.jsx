// RoomRequests.jsx
import React, { useState, useEffect } from 'react';
import './roomrequests.css';

function RoomRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch room requests from an API or a static file
        // This is a placeholder for actual data fetching logic
        const fetchedRequests = [
            { id: 1, room: "Room A", requester: "John Doe", status: "Pending" },
            { id: 2, room: "Room B", requester: "Jane Smith", status: "Approved" },
            { id: 3, room: "Room C", requester: "Michael Brown", status: "Pending" },
        ];
        setRequests(fetchedRequests);
    }, []);

    const handleApprove = (id) => {
        // Logic to approve the request (e.g., API call to update status)
        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: "Approved" } : request
        ));
    };

    const handleReject = (id) => {
        // Logic to reject the request (e.g., API call to update status)
        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: "Rejected" } : request
        ));
    };

    return (
        <div className="room-requests-container">
            <h2>Room Requests</h2>
            <div className="requests-table">
                {requests.map(request => (
                    <div key={request.id} className="request-item">
                        <p><strong>Room:</strong> {request.room}</p>
                        <p><strong>Requester:</strong> {request.requester}</p>
                        <p><strong>Status:</strong> {request.status}</p>
                        {request.status === "Pending" && (
                            <div className="action-buttons">
                                <button onClick={() => handleApprove(request.id)} className="approve-button">Approve</button>
                                <button onClick={() => handleReject(request.id)} className="reject-button">Reject</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomRequests;
