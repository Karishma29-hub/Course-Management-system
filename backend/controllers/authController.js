const authService = require("../services/authService");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
    try {
        const user = await authService.registerStudent(req.body);

        return res.status(201).json({
            message: "Student registered successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

async function registerAdmin(req, res, next) {
    try {
        const user = await authService.registerAdmin(req.body);

        return res.status(201).json({
            message: "Admin registered successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const user = await authService.loginStudent(req.body);

        const token = jwt.sign(
            {
                sub: user.id,
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    registerAdmin,
    login
};