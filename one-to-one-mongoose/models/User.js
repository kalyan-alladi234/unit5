const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   // Name is required
        minlength: 3      // Minimum length 3 characters
    },
    email: {
        type: String,
        required: true,   // Email is required
        unique: true      // Email must be unique
    }
});

module.exports = mongoose.model('User', userSchema);
