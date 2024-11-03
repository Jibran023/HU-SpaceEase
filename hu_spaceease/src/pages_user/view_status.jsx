// ViewStatus.jsx
import React, { useState, useEffect } from 'react';
import './view_status.css';

function ViewStatus() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Simulate fetching user requests data (replace this with actual data fetching logic)
        const fetchedRequests = [
            { id: 1, roomName: 'Room A', date: '2024-11-01', status: 'Pending' },
            { id: 2, roomName: 'Room B', date: '2024-10-25', status: 'Approved' },
            { id: 3, roomName: 'Room C', date: '2024-10-20', status: 'Rejected' },
        ];
        setRequests(fetchedRequests);
    }, []);

    return (
        <div className="view-status-container">
            <h1 className="status-heading">Your Room Requests</h1>
            <div className="requests-list">
                {requests.map((request) => (
                    <div key={request.id} className="request-item">
                        <p><strong>Room:</strong> {request.roomName}</p>
                        <p><strong>Date:</strong> {request.date}</p>
                        <p className={`status-${request.status.toLowerCase()}`}>
                            <strong>Status:</strong> {request.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewStatus;
