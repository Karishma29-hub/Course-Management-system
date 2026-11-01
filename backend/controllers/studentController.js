
const students = require("../data/students");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

function getAllStudents(req, res) {
    const safeStudents = students.map(({ passwordHash, ...student }) => student);

    res.status(200).json({
        success: true,
        count: safeStudents.length,
        students: safeStudents
    });
}

function getStudentById(req, res) {
    const student = students.find((item) => item.id === req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { passwordHash, ...safeStudent } = student;

    res.status(200).json({
        success: true,
        student: safeStudent
    });
}

async function createStudent(req, res) {
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
            message: "Password must be 8–72 characters"
        });
    }

    const duplicate = students.find(
        (student) => student.email.toLowerCase() === normalizedEmail
    );

    if (duplicate) {
        return res.status(409).json({
            success: false,
            message: "Email is already registered"
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 12);

        const student = {
            id: uuidv4(),
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
            department: department.trim(),
            createdAt: new Date().toISOString()
        };

        students.push(student);

        const { passwordHash: hiddenPassword, ...safeStudent } = student;

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: safeStudent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create student"
        });
    }
}

function updateStudent(req, res) {
    const student = students.find((item) => item.id === req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, email, department } = req.body;

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

    if (email !== undefined) {
        const normalizedEmail = email.trim().toLowerCase();

        const duplicate = students.find(
            (item) =>
                item.email.toLowerCase() === normalizedEmail &&
                item.id !== student.id
        );

        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        student.email = normalizedEmail;
    }

    if (name !== undefined) student.name = name.trim();
    if (department !== undefined) student.department = department.trim();

    const { passwordHash, ...safeStudent } = student;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: safeStudent
    });
}

function deleteStudent(req, res) {
    const index = students.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
