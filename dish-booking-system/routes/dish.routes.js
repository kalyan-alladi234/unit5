const router = require("express").Router();
const Dish = require("../models/Dish");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

// Create Dish
router.post("/add", auth, roleCheck(["admin"]), async (req, res) => {
    const dish = new Dish(req.body);
    await dish.save();
    res.json({ message: "Dish added" });
});

// Get All Dishes
router.get("/", auth, async (req, res) => {
    const dishes = await Dish.find();
    res.json(dishes);
});

module.exports = router;
