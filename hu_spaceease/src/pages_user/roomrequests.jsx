import React, { useState, useEffect } from 'react';
import './roomrequests.css';

function RoomRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchUnapprovedRooms = async () => {
            try {
                const response = await fetch("http://localhost:5000/room-api/unapproved-rooms");
                const data = await response.json();

                if (data.success) {
                    // Simplified structure to match the old code
                    const simplifiedRequests = data.rooms.map(room => ({
                        id: room._id,
                        room: room.room_name || room.room_number || "N/A",
                        requester: room.booking?.booked_by_user_id || "Unknown",
                        status: room.is_booked ? "Pending" : "Available",
                    }));
                    setRequests(simplifiedRequests);
                } else {
                    console.error("Failed to fetch unapproved rooms:", data.message);
                }
            } catch (error) {
                console.error("Error fetching unapproved rooms:", error);
            }
        };

        fetchUnapprovedRooms();
    }, []);

    const handleApprove = (id) => {
        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: "Approved" } : request
        ));
    };

    const handleReject = (id) => {
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
