const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const transporter = require("../config/mailer");
const { v4: uuidv4 } = require("uuid");

// Forgot Password
router.post("/forgot", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ message: "If email exists, reset link sent" });

    const token = uuidv4();

    await ResetToken.create({
        userId: user._id,
        token,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    });

    const resetLink = `http://localhost:5000/reset/${token}`;

    await transporter.sendMail({
        to: user.email,
        subject: "Reset Password",
        text: `Reset link: ${resetLink}`
    });

    res.json({ message: "Reset link sent" });
});

// Reset Password
router.post("/reset/:token", async (req, res) => {
    const reset = await ResetToken.findOne({
        token: req.params.token,
        expiresAt: { $gt: new Date() }
    });

    if (!reset) return res.json({ message: "Invalid/Expired" });

    const hashed = await bcrypt.hash(req.body.newPassword, 10);

    await User.findByIdAndUpdate(reset.userId, { password: hashed });

    await ResetToken.deleteOne({ token: req.params.token });

    res.json({ message: "Password reset successful" });
});

module.exports = router;
