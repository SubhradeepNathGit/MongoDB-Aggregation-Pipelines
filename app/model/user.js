const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    status: { type: String, required: true, enum: ["active", "inactive"] }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
