const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add new user
router.post('/add-user', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
