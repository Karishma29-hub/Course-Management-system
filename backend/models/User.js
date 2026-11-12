
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 80
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        passwordHash: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
