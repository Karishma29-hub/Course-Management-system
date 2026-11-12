
const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
    getProfile,
    updateProfile
} = require("../controllers/profileController");

// Validate profile update fields
const profileValidators = [
    body("name")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 2, max: 80 })
        .withMessage("Name must be between 2 and 80 characters"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),

    body("department")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Department must be between 2 and 100 characters")
];

// Get logged-in user's profile
router.get(
    "/",
    authMiddleware,
    getProfile
);

// Update logged-in user's profile
router.put(
    "/",
    authMiddleware,
    profileValidators,
    validateRequest,
    updateProfile
);

module.exports = router;
