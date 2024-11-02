const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Wejito:<db_password>@huspaceease.g1age.mongodb.net/?retryWrites=true&w=majority&appName=HUSpaceease', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");

    // Define a simple schema
    const sampleSchema = new mongoose.Schema({
        name: String,
        age: Number,
        email: String
    });

    // Create a model based on the schema
    const Sample = mongoose.model('Sample', sampleSchema);

    // Insert a sample document
    Sample.create({ name: "John Doe", age: 25, email: "john.doe@example.com" })
    .then(doc => console.log("Sample data added:", doc))
    .catch(err => console.error("Error adding sample data:", err));
})
.catch(err => console.error("Error connecting to MongoDB:", err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
