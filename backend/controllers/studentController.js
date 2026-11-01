const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function getAllStudents(req, res, next) {
    try {
        const students = await User.find({ role: "student" })
            .select("-passwordHash");

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        next(error);
    }
}

async function getStudentById(req, res, next) {
    try {
        const student = await User.findOne({
            _id: req.params.id,
            role: "student"
        }).select("-passwordHash");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        next(error);
    }
}

async function createStudent(req, res, next) {
    try {
        const { name, email, password, department } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !email.trim() ||
            typeof password !== "string" ||
            typeof department !== "string" || !department.trim()
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

        if (password.length < 8 || password.length > 72) {
            return res.status(400).json({
                success: false,
                message: "Password must be 8-72 characters"
            });
        }

        const duplicate = await User.findOne({ email: normalizedEmail });

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

        res.status(201).json({
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

async function updateStudent(req, res, next) {
    try {
        const { name, email, department } = req.body;
        const updates = {};

        if (
            (name !== undefined &&
                (typeof name !== "string" || !name.trim())) ||
            (email !== undefined &&
                (typeof email !== "string" ||
                 !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) ||
            (department !== undefined &&
                (typeof department !== "string" || !department.trim()))
        ) {
            return res.status(400).json({
                success: false,
                message: "Provide valid name, email, and department values"
            });
        }

        if (name !== undefined) updates.name = name.trim();
        if (email !== undefined) updates.email = email.trim().toLowerCase();
        if (department !== undefined) updates.department = department.trim();

        const student = await User.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "student"
            },
            updates,
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

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        next(error);
    }
}

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

        res.status(200).json({
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