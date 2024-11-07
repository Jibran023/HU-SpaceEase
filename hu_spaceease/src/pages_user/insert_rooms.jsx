// InsertRoomForm.jsx
import React, { useState } from 'react';

function InsertRoomForm({ onSubmit }) {
  const [roomName, setRoomName] = useState('');
  const [building, setBuilding] = useState('');
  const [capacity, setCapacity] = useState('');
  const [floor, setFloor] = useState('');
  const [features, setFeatures] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const featuresArray = features.split(',').map(feature => feature.trim());
    onSubmit({ roomName, building, capacity, floor, features: featuresArray });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} required />
      <input type="text" placeholder="Building" value={building} onChange={(e) => setBuilding(e.target.value)} required />
      <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
      <input type="number" placeholder="Floor" value={floor} onChange={(e) => setFloor(e.target.value)} required />
      <input type="text" placeholder="Features (comma-separated)" value={features} onChange={(e) => setFeatures(e.target.value)} required />
      <button type="submit">Add Room</button>
    </form>
  );
}

export default InsertRoomForm;
