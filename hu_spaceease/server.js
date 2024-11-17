// // import express, { json } from 'express';
// // import { connect, Schema, model } from 'mongoose';
// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(json());

// // // Connect to MongoDB
// // connect('mongodb://localhost:27017/Web_Dev project', { useNewUrlParser: true, useUnifiedTopology: true });

// // // Define User and Room Schemas
// // const userSchema = new Schema({
// //     user_id: String,
// //     email: String,
// //     password: String, // Ensure this is hashed in production
// //     role: String,
// //     name: String,
// //     department: String,
// //     enrollment_year: Number,
// //     position: String // Optional for admin
// // });

// // const roomSchema = new Schema({
// //     room_id: String,
// //     room_number: String,
// //     building: String,
// //     capacity: Number,
// //     floor: Number,
// //     features: [String],
// //     is_booked: Boolean,
// //     booking: {
// //         booked_by_user_id: String,
// //         date: String,
// //         time_slot: String,
// //         event: String,
// //         approved: Boolean,
// //         approved_by_admin_id: String,
// //         approval_date: String
// //     }
// // });

// // // Define Main Schema
// // const mainSchema = new Schema({
// //     rooms: [roomSchema],
// //     users: [userSchema]
// // });

// // const MainData = model('MainData', mainSchema);

// // // Login API
// // app.post('/api/login', async (req, res) => {
// //     const { email } = req.body;

// //     try {
// //         // Find the user by email
// //         const data = await MainData.findOne();
// //         const user = data.users.find(user => user.email === email);

// //         if (user) {
// //             return res.status(200).json({ message: 'User verified successfully!', user });
// //         } else {
// //             return res.status(404).json({ message: 'User not found!' });
// //         }
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Server error', error: error.message });
// //     }
// // });

// // // Start server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });






// // //second api
// // const mongoose = require('mongoose');

// // // Define Booking model
// // const Booking = mongoose.model('Booking', new mongoose.Schema({
// //     studentId: { type: String, required: true },
// //     roomId: { type: String, required: true },
// //     bookingTime: { type: Date, required: true },
// //     reason: { type: String, required: true },
// //     status: { type: String, default: 'Pending' }, // You can have other statuses like 'Approved', 'Rejected'
// // }));

// // // Route for booking a room
// // app.post('/api/book-room', async (req, res) => {
// //     const { studentId, roomId, bookingTime, reason } = req.body;

// //     try {
// //         // Create a new booking entry
// //         const newBooking = new Booking({
// //             studentId,
// //             roomId,
// //             bookingTime,
// //             reason,
// //         });

// //         // Save the booking to the database
// //         await newBooking.save();

// //         // Respond with success
// //         res.status(201).json({ message: 'Room booking request submitted successfully', booking: newBooking });
// //     } catch (error) {
// //         res.status(500).json({ message: 'Error submitting booking request', error });
// //     }
// // });
// // const bookingRequest = async () => {
// //     const response = await fetch('http://localhost:3000/api/book-room', {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //             studentId: '12345',
// //             roomId: '101',
// //             bookingTime: '2024-11-10T14:00:00Z', // Replace with your desired date and time
// //             reason: 'Study Group Meeting'
// //         }),
// //     });

// //     const result = await response.json();
// //     console.log(result);
// // };

// // bookingRequest();import express from 'express';

// import express from 'express';
// import cors from 'cors';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import userRoutes from './routes/users.js';

// // Use the absolute path to the JSON file
// const usersData = JSON.parse(fs.readFileSync('C:\\Users\\USER\\OneDrive\\Desktop\\semester 5\\HU-SpaceEase\\Web_Dev_project.users.json', 'utf8'));

// const app = express();

// // Enable CORS for requests from your frontend
// app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(express.json()); // Parse JSON bodies

// // Attach usersData to each request
// app.use((req, res, next) => {
//     req.usersData = usersData; // Attach usersData to each request
//     next();
// });

// // Use user routes under the /api path
// app.use('/api', userRoutes);

// // Start the server
// app.listen(3000, () => console.log("Server started on port 3000"));



// server.js
// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// // MongoDB connection URI from .env
// const uri = process.env.MONGODB_URI;

// // Create a new MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connectToMongoDB() {
//     try {
//         // Connect to MongoDB
//         await client.connect();
//         console.log('Connected to MongoDB');

//         // Access a database (replace 'myDatabase' with your database name)
//         const database = client.db('myDatabase');

//         // Perform any operations here
//         const collection = database.collection('myCollection');
//         console.log('Accessed collection:', collection.collectionName);

//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     } finally {
//         // Close the connection
//         await client.close();
//         console.log('Connection to MongoDB closed');
//     }
// }

// // Run the connection function
// connectToMongoDB();


//latest code 
// server.js

// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // MongoDB connection URI from .env
// const uri = process.env.MONGODB_URI;

// // Create a new MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const connectToMongoDB = async () => {
//     try {
//         // Connect to MongoDB
//         await client.connect();
//         console.log('Connected to MongoDB');

//         // Access a database (replace 'myDatabase' with your database name)
//         const database = client.db('Web_Dev_project');

//         // Perform any operations here
//         const collection = database.collection('Users');
//         console.log('Accessed collection:', collection.collectionName);

//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     // } finally {
//     //     // Close the connection
//     //     await client.close();
//     //     console.log('Connection to MongoDB closed');
//     // }
//     }
// };

// // Run the connection function
// connectToMongoDB();





//latest tareen code 

import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'; // Import your router
import cors from 'cors'; // Import the CORS middleware



// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI from .env
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api', userRoutes); // Use the routes in the `/api` path
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Add allowed headers
}));

const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Access a database
        const database = client.db('Web_Dev_Project');

        // Store the collection in app.locals for reuse
        app.locals.usersCollection = database.collection('Users');
        console.log('Accessed collection: Users');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit if the database connection fails
    }
};
// Start the server after connecting to MongoDB
const PORT = 3000;

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
