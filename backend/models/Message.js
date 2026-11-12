
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 2000
        }
    },
    { timestamps: true }
);

// Index for messages sent by a user
messageSchema.index({
    sender: 1,
    recipient: 1,
    createdAt: -1
});

// Index for reverse conversation lookup
messageSchema.index({
    recipient: 1,
    sender: 1,
    createdAt: -1
});

module.exports = mongoose.model("Message", messageSchema);
