import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true // Ensures user_id is unique for each user
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique for each user
        match: [/.+@habibuniversity\.edu$/, 'Email must be a valid Habib University email'] // Simple regex validation
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'faculty', 'student'], // Restricts role to specific values
        default: 'user' // Default role if none is provided
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the model as default for ES module compatibility
export default mongoose.model('User', UserSchema);
