const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/oneToOneDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
