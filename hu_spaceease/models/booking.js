const mongoose = require('mongoose');

// Define Booking model
const Booking = mongoose.model('Booking', new mongoose.Schema({
    studentId: { type: String, required: true },
    roomId: { type: String, required: true },
    bookingTime: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // You can have other statuses like 'Approved', 'Rejected'
}));
