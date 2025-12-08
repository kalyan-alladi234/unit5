const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
    expiresAt: Date
});
module.exports = mongoose.model("ResetToken", resetTokenSchema);
