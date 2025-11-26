const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = new User({ name, email, age });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add new address to a user
router.post('/users/:userId/address', async (req, res) => {
    try {
        const { street, city, state, country, pincode } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const address = { street, city, state, country, pincode };
        user.addresses.push(address); // Add to addresses array
        await user.save();

        res.status(201).json({ message: 'Address added', addresses: user.addresses });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get summary of users and addresses
router.get('/users/summary', async (req, res) => {
    try {
        const users = await User.find();
        const totalUsers = users.length;
        const totalAddresses = users.reduce((sum, user) => sum + user.addresses.length, 0);
        const userList = users.map(u => ({ name: u.name, addressCount: u.addresses.length }));

        res.json({
            totalUsers,
            totalAddresses,
            users: userList
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get full details of a user
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a specific address from a user
router.delete('/users/:userId/address/:addressId', async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.addresses.id(addressId)?.remove(); // Remove the address by id
        await user.save();

        res.json({ message: 'Address deleted', addresses: user.addresses });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
