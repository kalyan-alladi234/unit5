// Import express framework
const express = require("express");

// Import nodemailer for sending emails
const nodemailer = require("nodemailer");

// Load environment variables from .env file
require("dotenv").config();

const app = express();

// Create email transport configuration (Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: "gmail", // Using Gmail service
    auth: {
        user: process.env.EMAIL, // Your email from .env
        pass: process.env.PASSWORD, // Your Gmail App Password
    },
});

// Route to send email
app.get("/sendemail", async (req, res) => {
    try {
        // Email content details
        const mailOptions = {
            from: process.env.EMAIL, // Sender email
            to: [
                "kalyanalldi234@gmail.com",          // Your email address
                "venugopal.burli@masaischool.com" // Mentor email
            ],
            subject: "Test Email - NEM Student",
            text: "This is a testing Mail sent by NEM student, no need to reply.",
        };

        // Send email asynchronously
        await transporter.sendMail(mailOptions);

        // Send response to browser
        res.send("Email sent successfully ✔️");
    } catch (error) {
        console.log("Email sending error:", error);
        res.status(500).send("Failed to send email ❌");
    }
});

// Run server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
