// import express, { json } from 'express';
// import { connect, Schema, model } from 'mongoose';
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(json());

// // Connect to MongoDB
// connect('mongodb://localhost:27017/Web_Dev project', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define User and Room Schemas
// const userSchema = new Schema({
//     user_id: String,
//     email: String,
//     password: String, // Ensure this is hashed in production
//     role: String,
//     name: String,
//     department: String,
//     enrollment_year: Number,
//     position: String // Optional for admin
// });

// const roomSchema = new Schema({
//     room_id: String,
//     room_number: String,
//     building: String,
//     capacity: Number,
//     floor: Number,
//     features: [String],
//     is_booked: Boolean,
//     booking: {
//         booked_by_user_id: String,
//         date: String,
//         time_slot: String,
//         event: String,
//         approved: Boolean,
//         approved_by_admin_id: String,
//         approval_date: String
//     }
// });

// // Define Main Schema
// const mainSchema = new Schema({
//     rooms: [roomSchema],
//     users: [userSchema]
// });

// const MainData = model('MainData', mainSchema);

// // Login API
// app.post('/api/login', async (req, res) => {
//     const { email } = req.body;

//     try {
//         // Find the user by email
//         const data = await MainData.findOne();
//         const user = data.users.find(user => user.email === email);

//         if (user) {
//             return res.status(200).json({ message: 'User verified successfully!', user });
//         } else {
//             return res.status(404).json({ message: 'User not found!' });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });






// //second api
// const mongoose = require('mongoose');

// // Define Booking model
// const Booking = mongoose.model('Booking', new mongoose.Schema({
//     studentId: { type: String, required: true },
//     roomId: { type: String, required: true },
//     bookingTime: { type: Date, required: true },
//     reason: { type: String, required: true },
//     status: { type: String, default: 'Pending' }, // You can have other statuses like 'Approved', 'Rejected'
// }));

// // Route for booking a room
// app.post('/api/book-room', async (req, res) => {
//     const { studentId, roomId, bookingTime, reason } = req.body;

//     try {
//         // Create a new booking entry
//         const newBooking = new Booking({
//             studentId,
//             roomId,
//             bookingTime,
//             reason,
//         });

//         // Save the booking to the database
//         await newBooking.save();

//         // Respond with success
//         res.status(201).json({ message: 'Room booking request submitted successfully', booking: newBooking });
//     } catch (error) {
//         res.status(500).json({ message: 'Error submitting booking request', error });
//     }
// });
// const bookingRequest = async () => {
//     const response = await fetch('http://localhost:3000/api/book-room', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             studentId: '12345',
//             roomId: '101',
//             bookingTime: '2024-11-10T14:00:00Z', // Replace with your desired date and time
//             reason: 'Study Group Meeting'
//         }),
//     });

//     const result = await response.json();
//     console.log(result);
// };

// bookingRequest();


import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';  // Keep the .js extension for ES modules

const app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Web_Dev_project', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
mongoose
  .connect("mongodb://localhost:27017/Web_Dev_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log("Connected to database"));

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));

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
