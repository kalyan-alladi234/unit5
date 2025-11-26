const mongoose = require('mongoose');

// Address subdocument schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' }, // Default value
    pincode: { type: String, required: true }
});

// User schema with addresses as subdocuments
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'] // Simple email validation
    },
    age: { type: Number, min: 0 },
    addresses: [addressSchema] // Array of subdocuments
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
