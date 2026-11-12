
const Message = require("../models/Message");
const Notification = require("../models/Notification");

// Get chat history between the logged-in user and another user
exports.getChatHistory = async (req, res, next) => {
    try {
        const otherUserId = req.params.userId;
        const currentUserId = req.user.sub;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, recipient: otherUserId },
                { sender: otherUserId, recipient: currentUserId }
            ]
        })
            .sort({ createdAt: 1 })
            .limit(100)
            .populate("sender", "name email")
            .populate("recipient", "name email")
            .lean();

        return res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        next(error);
    }
};

// Get notifications for the logged-in user
exports.getNotifications = async (req, res, next) => {
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
};

// Mark a notification as read
exports.markNotificationRead = async (req, res, next) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.notificationId,
                recipient: req.user.sub
            },
            { isRead: true },
            {
                new: true,
                runValidators: true
            }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        return res.status(200).json({
            success: true,
            notification
        });

    } catch (error) {
        next(error);
    }
};
