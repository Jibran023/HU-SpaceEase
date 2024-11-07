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
import fs from 'fs';
import path from 'path';

// import express from 'express';
// const router = express.Router();

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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usersData = req.usersData;
    
    const user = usersData.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({
            success: true,
            role: user.role,
            name: user.name,           // Send name in the response
            user_id: user.user_id || user._id.$oid  // Send user_id or _id in the response
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});


// Assuming `req.user` is available after login to identify the logged-in user
// Assuming `req.user` is available after login to identify the logged-in user
router.get('/user-info', (req, res) => {
    const userEmail = req.query.email; // Get the email from the query
    const usersData = req.usersData; // Access users data from the JSON file

    // Find the user based on email
    const user = usersData.find(u => u.email === userEmail);

    if (user) {
        // Return user's name and ID (user_id or _id depending on your preference)
        res.status(200).json({ name: user.name, studentID: user.user_id || user._id.$oid });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// const router = express.Router();

// Get the path to your JSON file
// const router = express.Router();

// Get the path to your JSON file
const usersFilePath = path.join('C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\Web_Dev_project.users.json');

// Utility functions to read and write to the JSON file
function readUsersFile() {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
}

function writeUsersFile(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Generate a random ID for _id and user_id
function generateRandomId() {
  return Math.floor(Math.random() * 1000000000).toString();
}


// Signup route to create a new user
router.post('/signup', (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const users = readUsersFile();
  
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = {
        _id: { "$oid": generateRandomId() },
        user_id: generateRandomId(),
        email,
        password,
        role: 'student',
        name,
        department: 'Computer Science',
        position: 'Member',
        createdAt: { "$date": new Date().toISOString() },
        updatedAt: { "$date": new Date().toISOString() },
        __v: 0
      };
  
      users.push(newUser);
      writeUsersFile(users);
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error in /signup route:', error);
      res.status(500).json({ message: 'An error occurred during signup', error: error.message });
    }
  });
  


export default router;
