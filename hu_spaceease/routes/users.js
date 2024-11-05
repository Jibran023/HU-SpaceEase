// import express from 'express';
// const router = express.Router();
// import User from '../models/user.js';
// import Booking from '../models/booking.js';

// // Getting all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).send(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Get a user by ID
// router.get('/:user_id', async (req, res) => {
//     try {
//         const user = await User.findOne({ user_id: req.params.user_id });
//         res.status(200).send(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Create a new user
// router.post('/:user_id', async (req, res) => {
//     const { email, password, role, name, department, position } = req.body;

//     const user = new User({
//         user_id: req.params.user_id,
//         email,
//         password,
//         role,
//         name,
//         department,
//         position,
//     });

//     try {
//         const savedUser = await user.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // Route for booking a room
// router.post('/book-room', async (req, res) => {
//     const { studentId, roomId, bookingTime, reason } = req.body;

//     try {
//         const newBooking = new Booking({
//             studentId,
//             roomId,
//             bookingTime,
//             reason,
//         });
//         await newBooking.save();
//         res.status(201).json({ message: 'Room booking request submitted successfully', booking: newBooking });
//     } catch (error) {
//         res.status(500).json({ message: 'Error submitting booking request', error });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
        
//         // Check if user exists and password matches
//         if (user && user.password === password) {  // NOTE: Replace with hashed password verification for production
//             res.status(200).json({ success: true, role: user.role });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// export default router;


import express from 'express';
import bcrypt from 'bcrypt';  // For password hashing
import User from '../models/user.js';
import Booking from '../models/booking.js';

const router = express.Router();

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
});

// Get a user by ID
router.get('/:user_id', async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.params.user_id });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user", error: err.message });
    }
});


// router.get('/:user_id', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         console.log(user);
        
//         // Check if user exists and verify password
//         // if (user && await bcrypt.compare(password, user.password)) {
//         //     res.status(200).json({ success: true, role: user.role });
//         // } else {
//         //     res.status(401).json({ success: false, message: 'Invalid email or password' });
//         // }
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in", error: error.message });
//     }
// });

// Route for booking a room
router.post('/book-room', async (req, res) => {
    const { studentId, roomId, bookingTime, reason } = req.body;

    // Simple validation for required fields
    if (!studentId || !roomId || !bookingTime || !reason) {
        return res.status(400).json({ message: "All fields are required" });
    }

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
        res.status(500).json({ message: "Error submitting booking request", error: error.message });
    }
});

// Login route with hashed password check
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if(user.password != password){
            console.log("correct de bhai");
             res.status(401).json({ success: false, message: 'Invalid email or password' });

        }
        else{
            res.status(200).json({ success: true, role: user.role });

        }
        
        // Check if user exists and verify password
    //     if (user && await bcrypt.compare(password, user.password)) {
    //     } else {
    //         res.status(401).json({ success: false, message: 'Invalid email or password' });
    //     }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

export default router;
