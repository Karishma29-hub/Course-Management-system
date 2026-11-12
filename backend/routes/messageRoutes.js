
const express = require("express");
const { param } = require("express-validator");

const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

// Validate the other user's MongoDB ID
const validateUserId = [
    param("userId")
        .isMongoId()
        .withMessage("Invalid user ID")
];

router.get(
    "/:userId",
    authMiddleware,
    validateUserId,
    validateRequest,
    async (req, res, next) => {
        try {
            const { userId } = req.params;
            const currentUserId = req.user.sub;

            const messages = await Message.find({
                $or: [
                    { sender: currentUserId, recipient: userId },
                    { sender: userId, recipient: currentUserId }
                ]
            })
                .sort({ createdAt: -1 })
                .limit(100)
                .populate("sender", "name email")
                .populate("recipient", "name email")
                .lean();

            // Display the latest messages in chronological order
            messages.reverse();

            return res.status(200).json({
                success: true,
                messages
            });

        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
