import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import Booking from '../models/booking.js';

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a user by ID
router.get('/:user_id', async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.params.user_id });
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/:user_id', async (req, res) => {
    const { email, password, role, name, department, position } = req.body;

    const user = new User({
        user_id: req.params.user_id,
        email,
        password,
        role,
        name,
        department,
        position,
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for booking a room
router.post('/book-room', async (req, res) => {
    const { studentId, roomId, bookingTime, reason } = req.body;

    try {
        const newBooking = new Booking({
            studentId,
            roomId,
            bookingTime,
            reason,
        });
        await newBooking.save();
        res.status(201).json({ message: 'Room booking request submitted successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting booking request', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // Check if user exists and password matches
        if (user && user.password === password) {  // NOTE: Replace with hashed password verification for production
            res.status(200).json({ success: true, role: user.role });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;


//give the route wali user js ka code to gpt and also give the login wala  code to gpt and ask it to help in connect the fronted to the bakcend for login verifcation.

//login apge made, give its code to gpt. ask it to create a fetch api tp validate the person being logged in
//then the user.js route file, connect fronent adn backend with the api fetch
