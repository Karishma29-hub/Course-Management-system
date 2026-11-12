
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 150
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 3000
        },
        instructor: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        duration: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
