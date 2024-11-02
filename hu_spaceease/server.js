const express = require('express');
const app = express();
const port = 5000; // You can use any port you'd like

app.use(express.json()); // Middleware to parse JSON

// Sample route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Sample data storage (in-memory for simplicity)
let rooms = []; // This will hold room data; you can replace it with a database later

// Create Booking (C in CRUD)
app.post('/api/bookings', (req, res) => {
    const { room_id, user_id, date, time_slot, event } = req.body;

    // Find the room by ID
    const room = rooms.find(r => r.room_id === room_id);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    if (room.is_booked) {
        return res.status(400).json({ error: 'Room is already booked' });
    }

    // Update room details with the booking information
    room.is_booked = true;
    room.booking = {
        booked_by_user_id: user_id,
        date,
        time_slot,
        event,
        approved: false,
        approved_by_admin_id: null,
        approval_date: null
    };

    res.status(201).json({ message: 'Booking created successfully', room });
});

// Read Bookings (R in CRUD)
app.get('/api/bookings', (req, res) => {
    res.json(rooms);
});


// Update Booking (U in CRUD)
app.put('/api/bookings/:room_id', (req, res) => {
    const { room_id } = req.params;
    const { approved, approved_by_admin_id, approval_date } = req.body;

    const room = rooms.find(r => r.room_id === room_id);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    if (!room.is_booked) {
        return res.status(400).json({ error: 'Room is not booked' });
    }

    // Update booking approval status
    room.booking.approved = approved;
    room.booking.approved_by_admin_id = approved_by_admin_id;
    room.booking.approval_date = approval_date;

    res.json({ message: 'Booking updated successfully', room });
});


// Delete Booking (D in CRUD)
app.delete('/api/bookings/:room_id', (req, res) => {
    const { room_id } = req.params;

    const room = rooms.find(r => r.room_id === room_id);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    if (!room.is_booked) {
        return res.status(400).json({ error: 'Room is not booked' });
    }

    // Remove the booking
    room.is_booked = false;
    room.booking = null;

    res.json({ message: 'Booking deleted successfully', room });
});
