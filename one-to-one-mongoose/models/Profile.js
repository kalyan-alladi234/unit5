const mongoose = require('mongoose');

// Profile Schema (One-to-One relationship with User)
const profileSchema = new mongoose.Schema({
    bio: String, // Optional
    socialMediaLinks: [String], // Optional array of links
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    // Reference to User
        required: true, // Must link to a user
        unique: true    // Ensure One-to-One relationship
    }
});

module.exports = mongoose.model('Profile', profileSchema);
