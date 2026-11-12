
const User = require("../models/User");

// Get the logged-in user's profile
async function getProfile(req, res, next) {
    try {
        const user = await User.findById(req.user.sub)
            .select("-passwordHash")
            .lean();

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

// Update the logged-in user's profile
async function updateProfile(req, res, next) {
    try {
        const { name, email, department } = req.body || {};

        const updates = {};

        if (name !== undefined) {
            if (
                typeof name !== "string" ||
                name.trim().length < 2 ||
                name.trim().length > 80
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Name must be between 2 and 80 characters"
                });
            }

            updates.name = name.trim();
        }

        if (email !== undefined) {
            if (
                typeof email !== "string" ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Enter a valid email address"
                });
            }

            updates.email = email.trim().toLowerCase();
        }

        if (department !== undefined) {
            if (
                typeof department !== "string" ||
                department.trim().length < 2 ||
                department.trim().length > 100
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Department must be between 2 and 100 characters"
                });
            }

            updates.department = department.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one valid field to update"
            });
        }

        // Only update the authenticated user's own profile
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
