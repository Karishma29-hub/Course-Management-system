
const express = require("express");
const router = express.Router();

const { body, param } = require("express-validator");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const {
    getMyProgress,
    updateMyProgress
} = require("../controllers/learningProgressController");

// Student CRUD validation
const validateStudentId = [
    param("id")
        .isMongoId()
        .withMessage("Invalid student ID")
];

const validateStudent = [
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
        .withMessage("Department must be between 2 and 100 characters"),

    body("password")
        .optional()
        .isString()
        .isLength({ min: 12, max: 72 })
        .withMessage("Password must be between 12 and 72 characters")
];

// Learning progress validation
const validateProgress = [
    body("courseId")
        .isMongoId()
        .withMessage("Invalid course ID"),

    body("completedLessons")
        .isInt({ min: 0 })
        .withMessage("Completed lessons must be a non-negative integer")
        .toInt(),

    body("totalLessons")
        .isInt({ min: 1 })
        .withMessage("Total lessons must be at least 1")
        .toInt(),

    body("completedLessons")
        .custom((value, { req }) => {
            if (value > req.body.totalLessons) {
                throw new Error(
                    "Completed lessons cannot exceed total lessons"
                );
            }
            return true;
        })
];

// Student learning progress: authenticated users
router.get("/progress", authMiddleware, getMyProgress);

router.put(
    "/progress",
    authMiddleware,
    validateProgress,
    validateRequest,
    updateMyProgress
);

// Student management: admins only
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getAllStudents
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("department").notEmpty().withMessage("Department is required"),
        ...validateStudent
    ],
    validateRequest,
    createStudent
);

router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateStudentId,
    validateRequest,
    getStudentById
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateStudentId,
    validateStudent,
    validateRequest,
    updateStudent
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateStudentId,
    validateStudent,
    validateRequest,
    updateStudent
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateStudentId,
    validateRequest,
    deleteStudent
);

module.exports = router;
