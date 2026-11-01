
const User = require("../models/User");

async function getProfile(req, res, next) {
    try {
        const user = await User.findById(req.user.sub)
            .select("-passwordHash");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}

async function updateProfile(req, res, next) {
    try {
        const { name, email, department } = req.body || {};

        // Validate provided fields
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

        // Prepare updates
        const updates = {};

        if (name !== undefined) {
            updates.name = name.trim();
        }

        if (email !== undefined) {
            updates.email = email.trim().toLowerCase();
        }

        if (department !== undefined) {
            updates.department = department.trim();
        }

        // Update profile in MongoDB
        const user = await User.findByIdAndUpdate(
            req.user.sub,
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ).select("-passwordHash");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile,
    updateProfile
};
