
const express = require("express");
const router = express.Router();

const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { param, body } = require("express-validator");

// Validate MongoDB course ID
const validateCourseId = [
    param("id")
        .isMongoId()
        .withMessage("Invalid course ID")
];

// Validate course fields
const validateCourse = [
    body("title")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 2, max: 150 })
        .withMessage("Title must be between 2 and 150 characters"),

    body("description")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 5, max: 3000 })
        .withMessage("Description must be between 5 and 3000 characters"),

    body("instructor")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Instructor must be between 2 and 100 characters"),

    body("duration")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage("Duration must be between 1 and 50 characters")
];

// Public: view courses
router.get("/", getAllCourses);

router.get(
    "/:id",
    validateCourseId,
    validateRequest,
    getCourseById
);

// Admin only: create course
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validateCourse,
    validateRequest,
    createCourse
);

// Admin only: update course
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateCourseId,
    validateCourse,
    validateRequest,
    updateCourse
);

// Admin only: delete course
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateCourseId,
    validateRequest,
    deleteCourse
);

module.exports = router;
