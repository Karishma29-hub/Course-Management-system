
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
    try {
        const student = await authService.registerStudent(req.body);

        return res.status(201).json({
            message: "Student registered successfully",
            student
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const student = await authService.loginStudent(req.body);

        const token = jwt.sign(
            { id: student.id, email: student.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            student
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login };
