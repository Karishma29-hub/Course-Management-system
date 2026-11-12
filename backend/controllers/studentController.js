
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all students
async function getAllStudents(req, res, next) {
    try {
        const students = await User.find({ role: "student" })
            .select("-passwordHash")
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {
        next(error);
    }
}

// Get student by ID
async function getStudentById(req, res, next) {
    try {
        const student = await User.findOne({
            _id: req.params.id,
            role: "student"
        })
            .select("-passwordHash")
            .lean();

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            student
        });

    } catch (error) {
        next(error);
    }
}

// Create student
async function createStudent(req, res, next) {
    try {
        const { name, email, password, department } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof department !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !department.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password, and department are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email"
            });
        }

        if (
            name.trim().length < 2 ||
            name.trim().length > 80 ||
            department.trim().length < 2 ||
            department.trim().length > 100 ||
            password.length < 12 ||
            password.length > 72
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid student details or password length"
            });
        }

        const duplicate = await User.findOne({
            email: normalizedEmail
        });

        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const student = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
            department: department.trim(),
            role: "student"
        });

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                department: student.department,
                role: student.role,
                createdAt: student.createdAt
            }
        });

    } catch (error) {
        next(error);
    }
}

// Update student
async function updateStudent(req, res, next) {
    try {
        const { name, email, department } = req.body || {};
        const updates = {};

        if (
            name === undefined &&
            email === undefined &&
            department === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "At least one field must be provided"
            });
        }

        if (
            (name !== undefined &&
                (typeof name !== "string" ||
                    name.trim().length < 2 ||
                    name.trim().length > 80)) ||

            (email !== undefined &&
                (typeof email !== "string" ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) ||

            (department !== undefined &&
                (typeof department !== "string" ||
                    department.trim().length < 2 ||
                    department.trim().length > 100))
        ) {
            return res.status(400).json({
                success: false,
                message: "Provide valid name, email, and department values"
            });
        }

        if (name !== undefined) {
            updates.name = name.trim();
        }

        if (email !== undefined) {
            updates.email = email.trim().toLowerCase();
        }

        if (department !== undefined) {
            updates.department = department.trim();
        }

        const student = await User.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "student"
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ).select("-passwordHash");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        next(error);
    }
}

// Delete student
async function deleteStudent(req, res, next) {
    try {
        const student = await User.findOneAndDelete({
            _id: req.params.id,
            role: "student"
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
