
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getChatHistory,
  getNotifications,
  markNotificationRead
} = require("../controllers/chatController");

// All routes require authentication
router.use(authMiddleware);

// Get chat history with another user
router.get("/messages/:userId", getChatHistory);

// Get notifications for the logged-in user
router.get("/notifications", getNotifications);

// Mark a notification as read
router.patch(
  "/notifications/:notificationId/read",
  markNotificationRead
);

module.exports = router;
