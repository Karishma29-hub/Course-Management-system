
const express = require("express");
const { param } = require("express-validator");

const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

// Validate notification ID
const validateNotificationId = [
    param("id")
        .isMongoId()
        .withMessage("Invalid notification ID")
];

// Get all notifications for the logged-in user
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user.sub
        })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        next(error);
    }
});

// Mark a notification as read
router.patch(
    "/:id/read",
    authMiddleware,
    validateNotificationId,
    validateRequest,
    async (req, res, next) => {
        try {
            const notification = await Notification.findOneAndUpdate(
                {
                    _id: req.params.id,
                    recipient: req.user.sub
                },
                {
                    isRead: true
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });
            }

            return res.status(200).json({
                success: true,
                notification
            });

        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
