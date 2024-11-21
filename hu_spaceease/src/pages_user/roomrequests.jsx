import React, { useState, useEffect } from 'react';
import './roomrequests.css';

function RoomRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchUnapprovedRooms = async () => {
        try {
            const response = await fetch("http://localhost:5000/room-api/unapproved-rooms");
            const data = await response.json();

            if (data.success) {
                const simplifiedRequests = data.rooms.map(room => {
                    console.log(room)
                    return {
                    id: room.id, 
                    room_name: room.room_name || "N/A", 
                    requester: room.requester || "Unknown", 
                    is_booked: room.is_booked || false,
                    RoomStatus: room.RoomStatus, 
                }});
                setRequests(simplifiedRequests);
            } else {
                console.error("Failed to fetch unapproved rooms:", data.message);
            }
        } catch (error) {
            console.error("Error fetching unapproved rooms:", error);
        } finally {
            setLoading(false);
        }
    };
    // Fetch unapproved rooms
    useEffect(() => {
        fetchUnapprovedRooms();
    }, []);

    // Handle approval
    const handleApprove = async (id, requester) => {
        try {
            const response = await fetch(`http://localhost:5000/room-api/approve-room/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_id: "U-401",  // Replace with the actual admin's ID
                    user_id: requester,  // Replace with the actual user's ID (requester's ID)
                    room_id: id,  // Send the room id in the request body
                }),
            });
    console.log(id);
    console.log(requester);
            const data = await response.json();
    
            if (data.success) {
                // Refetch the data to ensure consistency
                fetchUnapprovedRooms(); // Re-fetch the room list to get the updated status
            } else {
                console.error("Failed to approve room:", data.message);
            }
        } catch (error) {
            console.error("Error approving room:", error);
        }
    };
    
    // Handle rejection
    const handleReject = async (id,requester) => {
        try {
            const response = await fetch(`http://localhost:5000/room-api/reject-room/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_id: "U-401",  // Replace with the actual admin's ID
                    user_id: requester,  // Replace with the actual user's ID (requester's ID)
                    room_id: id,  // Send the room id in the request body
                }),
            });
    console.log(id);
    console.log(requester);
            const data = await response.json();
    
            if (data.success) {
                // Refetch the data to ensure consistency
                fetchUnapprovedRooms(); // Re-fetch the room list to get the updated status
            } else {
                console.error("Failed to approve room:", data.message);
            }
        } catch (error) {
            console.error("Error approving room:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="room-requests-container">
            <h2>Room Requests</h2>
            <div className="requests-table">
                {requests.map(request => (
                    <div key={request.id} className="request-item">
                        <p><strong>Room:</strong> {request.room_name}</p>
                        <p><strong>Requester:</strong> {request.requester}</p>
                        <p><strong>Status:</strong> {request.RoomStatus}</p>
                        {request.RoomStatus === 'Pending' && (
                            <div className="action-buttons">
                                <button
                                    onClick={() => handleApprove(request.id, request.requester)}
                                    className="approve-button"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(request.id, request.requester)}
                                    className="reject-button"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomRequests;
