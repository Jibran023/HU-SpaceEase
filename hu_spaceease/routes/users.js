import express from 'express';
const router = express.Router()
import User from '../models/user.js'

//getting all the users
router.get('/abc', async (req, res) => {
    try {
    //     const userNew = await User({
    //         email: "student1@habibuniversity.edu",
    // password: "hashed_password_1",
    // role: "student",
    // name: "Ali",
    // department: "Computer Science",
    // position: "Member" // Only use "position" if it's required for your use case
    //     });
    //     userNew.save();
        const users = await User.find()
        console.log(users);
        res.status(200).send(users)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

//creating one 
router.post('/:user_id', async (req, res) => {
    // Destructure the request body
    const { email, password, role, name, department, position } = req.body;

    // Create a new user instance
    const user = new User({
        user_id: req.params.user_id, // Get user_id from the URL parameter
        email,
        password, // Ensure to hash this password before saving it in production
        role,
        name,
        department,
        position,
    });

    try {
        // Save the new user to the database
        const savedUser = await user.save();
        res.status(201).json(savedUser); // Respond with the created user and a 201 status
    } catch (error) {
        // Handle validation errors or other issues
        res.status(400).json({ message: error.message });
    }
});


// Route for booking a room
router.post('/api/book-room', async (req, res) => {
    const { studentId, roomId, bookingTime, reason } = req.body;

    try {
        // Create a new booking entry
        const newBooking = new Booking({
            studentId,
            roomId,
            bookingTime,
            reason,
        });

        // Save the booking to the database
        await newBooking.save();

        // Respond with success
        res.status(201).json({ message: 'Room booking request submitted successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting booking request', error });
    }
});

// Export the router to use in your main application file
export default router;