const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add-user', userController.addUser);
router.get('/user-rentals/:userId', userController.getUserRentals);
router.post('/rent-book', userController.rentBook);
router.post('/return-book', userController.returnBook);

module.exports = router;
