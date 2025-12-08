const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Place Order
router.post("/place", auth, async (req, res) => {
    const chefs = await User.find({ role: "chef" });

    if (!chefs.length) return res.json({ message: "No chef available" });

    const randomChef = chefs[Math.floor(Math.random() * chefs.length)];

    const newOrder = new Order({
        user: req.user.id,
        dish: req.body.dishId,
        assignedChef: randomChef._id
    });

    await newOrder.save();
    res.json({ message: "Order placed" });
});

// Chef updates status
router.patch("/update/:id", auth, async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (String(order.assignedChef) !== req.user.id)
        return res.json({ message: "Not your order" });

    order.status = req.body.status;
    await order.save();

    res.json({ message: "Status updated" });
});

module.exports = router;
