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

// import express from 'express';
// const router = express.Router();

// // Getting all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching users", error: err.message });
//     }
// });

// // Get a user by ID
// router.get('/:user_id', async (req, res) => {
//     try {
//         const user = await User.findOne({ user_id: req.params.user_id });
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (err) {
//         res.status(500).json({ message: "Error retrieving user", error: err.message });
//     }
// });

// // router.get('/:user_id', async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         // Find the user by email
// //         const user = await User.findOne({ email });
// //         console.log(user);

// //         // Check if user exists and verify password
// //         // if (user && await bcrypt.compare(password, user.password)) {
// //         //     res.status(200).json({ success: true, role: user.role });
// //         // } else {
// //         //     res.status(401).json({ success: false, message: 'Invalid email or password' });
// //         // }
// //     } catch (error) {
// //         res.status(500).json({ message: "Error logging in", error: error.message });
// //     }
// // });

// // Route for booking a room
// router.post('/book-room', async (req, res) => {
//     const { studentId, roomId, bookingTime, reason } = req.body;

//     // Simple validation for required fields
//     if (!studentId || !roomId || !bookingTime || !reason) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

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
//         res.status(500).json({ message: "Error submitting booking request", error: error.message });
//     }
// });

// Login route with hashed password check
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const usersData = req.usersData;

//     const user = usersData.find(u => u.email === email && u.password === password);

//     if (user) {
//         res.status(200).json({
//             success: true,
//             role: user.role,
//             name: user.name,           // Send name in the response
//             user_id: user.user_id || user._id.$oid  // Send user_id or _id in the response
//         });
//     } else {
//         res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }
// });

// // Assuming `req.user` is available after login to identify the logged-in user
// // Assuming `req.user` is available after login to identify the logged-in user
// router.get('/user-info', (req, res) => {
//     const userEmail = req.query.email; // Get the email from the query
//     const usersData = req.usersData; // Access users data from the JSON file

//     // Find the user based on email
//     const user = usersData.find(u => u.email === userEmail);

//     if (user) {
//         // Return user's name and ID (user_id or _id depending on your preference)
//         res.status(200).json({ name: user.name, studentID: user.user_id || user._id.$oid });
//     } else {
//         res.status(404).json({ message: 'User not found' });
//     }
// });

// // const router = express.Router();

// // Get the path to your JSON file
// // const router = express.Router();

// // Get the path to your JSON file
// const usersFilePath = path.join('C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\Web_Dev_project.users.json');
// // Get the path to your rooms JSON file
// const roomsFilePath = path.join('C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\Web_Dev_project.Room.json');

// // Utility functions to read and write to the JSON file
// function readUsersFile() {
//   const data = fs.readFileSync(usersFilePath, 'utf8');
//   return JSON.parse(data);
// }

// function writeUsersFile(users) {
//   fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
// }

// // Generate a random ID for _id and user_id
// function generateRandomId() {
//   return Math.floor(Math.random() * 1000000000).toString();
// }

// function readRoomsFile() {
//     const data = fs.readFileSync(roomsFilePath, 'utf8');
//     return JSON.parse(data);
//   }

// function writeRoomsFile(rooms) {
//     fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
//   }

// // Signup route to create a new user
// router.post('/signup', (req, res) => {
//     try {
//       const { name, email, password } = req.body;

//       const users = readUsersFile();

//       const userExists = users.some(user => user.email === email);
//       if (userExists) {
//         return res.status(400).json({ message: 'User already exists' });
//       }

//       const newUser = {
//         _id: { "$oid": generateRandomId() },
//         user_id: generateRandomId(),
//         email,
//         password,
//         role: 'student',
//         name,
//         department: 'Computer Science',
//         position: 'Member',
//         createdAt: { "$date": new Date().toISOString() },
//         updatedAt: { "$date": new Date().toISOString() },
//         __v: 0
//       };

//       users.push(newUser);
//       writeUsersFile(users);

//       res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//       console.error('Error in /signup route:', error);
//       res.status(500).json({ message: 'An error occurred during signup', error: error.message });
//     }
//   });

//  // Route to insert a new room
// router.post('/insert-room', (req, res) => {
//     try {
//       const { roomName, building, capacity, floor, features, added_by } = req.body;

//       // Read the existing rooms
//       const rooms = readRoomsFile();

//       // Create new room object
//       const newRoom = {
//         _id: { "$oid": generateRandomId() },
//         room_id: `RM${rooms.length + 1}`,
//         room_number: (rooms.length + 1).toString().padStart(3, '0'),
//         room_name: roomName,
//         building,
//         capacity: parseInt(capacity, 10),
//         floor: parseInt(floor, 10),
//         features,
//         is_booked: false,
//         booking: null,
//         added_by: added_by || "unknown" // Default to "unknown" if not provided
//       };

//       // Add new room to rooms array and save to JSON file
//       rooms.push(newRoom);
//       writeRoomsFile(rooms);

//       // Respond with success
//       res.status(201).json({ message: 'Room added successfully', room: newRoom });
//     } catch (error) {
//       console.error('Error in /insert-room route:', error);
//       res.status(500).json({ message: 'An error occurred while adding the room', error: error.message });
//     }
//   });
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// Number of salt rounds for hashing
const SALT_ROUNDS = 10;

// Route to create a test user with a hashed password
router.get("/test", async (req, res) => {
  try {
    const randomUser = {
      user_id: `U-${Math.floor(Math.random() * 1000)}`, // Random ID
      email: `test${Math.floor(Math.random() * 1000)}@habibuniversity.edu`,
      password: await bcrypt.hash("password123", SALT_ROUNDS), // Hash the password
      role: "student", // Example role
      name: "John Doe", // Example name
      department: "Computer Science", // Example department
      position: "Undergraduate", // Example position
    };

    // Create a new user in the database
    const user = new User(randomUser);
    await user.save();

    return res.json(await User.find());
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// POST Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Get email and password from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if the password matches using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Respond with success and user's role
    res.status(200).json({
      success: true,
      name: user.name, // Assuming `name` exists in the User model
      user_id: user.user_id,
      user_role: user.role, // Use the key the frontend expects
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Authentication successful
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         name: user.name,
//       },
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Internal server error", details: err.message });
//   }
// });

router.post("/oldlogin", async (req, res) => {
  const { email, password } = req.body; // Get email and password from the request body

  try {
    // Find the user by email
    console.log(await User.find());
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if the password matches (no hashing involved)
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Set the logged-in user's ID
    const UserLoggedId = user.user_id;
    console.log(UserLoggedId);

    // Respond with success and user's role
    res
      .status(200)
      .json({ success: true, role: user.role, userId: UserLoggedId });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

router.put("/update-password", async (req, res) => {
  console.log(UserLoggedId);
  const { newPassword, confirmPassword } = req.body;
  console.log(newPassword, confirmPassword);

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Both new password and confirm password fields are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password do not match" });
  }

  // Find the user by the logged-in user's ID (UserLoggedId)
  try {
    const user = await User.findOne({ user_id: UserLoggedId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password directly (without hashing)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
});
export default router;
