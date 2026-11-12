
const express = require("express");
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

const authController = require("../controllers/authController");

const validateRequest = require("../middleware/validateRequest");

const {
    registrationValidators,
    loginValidators
} = require("../validators/authValidators");

// Limit login attempts to 10 requests per 15 minutes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});

// Student registration
router.post(
    "/register",
    registrationValidators,
    validateRequest,
    authController.register
);

// Admin registration
router.post(
    "/admin-register",
    registrationValidators,
    validateRequest,
    authController.registerAdmin
);

// Login
router.post(
    "/login",
    loginLimiter,
    loginValidators,
    validateRequest,
    authController.login
);

module.exports = router;
