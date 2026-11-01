const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function registerUser({ name, email, password, department }, role) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        const error = new Error("Email is already registered");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        department: department.trim(),
        role
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
        createdAt: user.createdAt
    };
}

async function registerStudent(data) {
    return registerUser(data, "student");
}

async function registerAdmin(data) {
    return registerUser(data, "admin");
}

async function loginStudent({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role
    };
}

module.exports = {
    registerStudent,
    registerAdmin,
    loginStudent
};