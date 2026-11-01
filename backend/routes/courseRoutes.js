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

// Public: students and visitors can view courses
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Admin only: manage courses
router.post("/", authMiddleware, adminMiddleware, createCourse);
router.put("/:id", authMiddleware, adminMiddleware, updateCourse);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

module.exports = router;