const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

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

// Student learning progress: any logged-in student
router.get("/progress", authMiddleware, getMyProgress);
router.put("/progress", authMiddleware, updateMyProgress);

// Student management: admins only
router.get("/", authMiddleware, adminMiddleware, getAllStudents);
router.post("/", authMiddleware, adminMiddleware, createStudent);
router.get("/:id", authMiddleware, adminMiddleware, getStudentById);
router.put("/:id", authMiddleware, adminMiddleware, updateStudent);
router.patch("/:id", authMiddleware, adminMiddleware, updateStudent);
router.delete("/:id", authMiddleware, adminMiddleware, deleteStudent);

module.exports = router;