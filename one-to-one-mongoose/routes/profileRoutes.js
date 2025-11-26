const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');

// Add a new profile (One-to-One)
router.post('/add-profile', async (req, res) => {
    try {
        const { bio, socialMediaLinks, user } = req.body;

        // Check if the user exists
        const existingUser = await User.findById(user);
        if (!existingUser) return res.status(404).json({ error: 'User not found' });

        // Ensure user doesn't already have a profile
        const existingProfile = await Profile.findOne({ user });
        if (existingProfile) return res.status(400).json({ error: 'Profile already exists for this user' });

        const profile = new Profile({ bio, socialMediaLinks, user });
        await profile.save();

        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all profiles with populated user info
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user'); // Populate user reference
        res.json(profiles);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
