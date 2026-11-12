
const { body } = require("express-validator");

const registrationValidators = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 80 })
        .withMessage("Name must be between 2 and 80 characters"),

    body("email")
        .trim()
        .isEmail().withMessage("Enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isString()
        .isLength({ min: 12, max: 72 })
        .withMessage("Password must be between 12 and 72 characters"),

    body("department")
        .trim()
        .notEmpty().withMessage("Department is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Department must be between 2 and 100 characters")
];

const loginValidators = [
    body("email")
        .trim()
        .isEmail().withMessage("Enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isString()
        .notEmpty().withMessage("Password is required")
];

module.exports = {
    registrationValidators,
    loginValidators
};
