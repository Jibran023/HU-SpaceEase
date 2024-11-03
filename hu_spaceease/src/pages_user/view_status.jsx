import React from 'react';
import './view_status.css';

function ViewStatus() {
    // Sample data for user requests
    const requests = [
        { id: 1, roomName: 'Room A', date: '2024-11-01', status: 'Pending' },
        { id: 2, roomName: 'Room B', date: '2024-10-25', status: 'Approved' },
        { id: 3, roomName: 'Room C', date: '2024-10-20', status: 'Rejected' },
    ];

    return (
        <div className="view-status-container">
            <h1 className="status-heading">Your Room Requests</h1>
            <table className="status-table">
                <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.roomName}</td>
                            <td>{request.date}</td>
                            <td className={`status-${request.status.toLowerCase()}`}>
                                {request.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewStatus;
